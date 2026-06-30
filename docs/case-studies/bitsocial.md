---
title: 'Case study: Bitsocial & IPFS'
description: 'Explore how Bitsocial uses IPFS and libp2p to run serverless, cryptographically owned social networks without a blockchain or federation.'
---

# Case study: Bitsocial

::: callout
**"The end state is not one app. It is a market of clients, nodes, services, and communities, all sharing the same protocol, identities, and communities."**

_The Bitsocial project_
:::

## Overview

In this case study, you'll learn how [Bitsocial](https://bitsocial.net/) uses IPFS and libp2p as the entire backend for a peer-to-peer social network, replacing the centralized servers, databases, and platform moderation that traditional social media depends on. Communities are addressed by public key, content is addressed by CID, and posts move directly between peers, so a community can run from a laptop or a Raspberry Pi while users read and publish without an account on any company-controlled service.

## What is Bitsocial

Bitsocial is an open-source protocol for decentralized social media. Instead of one platform, it aims for "protocol competition": many independent apps, nodes, and services that all share the same underlying communities and identities and compete on interface, discovery, and hosting rather than on lock-in.

Communities and profiles are key-controlled property, not revocable platform accounts. A community's owner controls its moderation policy, but no protocol-level authority can confiscate a community or erase an identity from the network. Several apps already run on the protocol, including [5chan](https://bitsocial.net/docs/apps/5chan) (a decentralized imageboard) and [Seedit](https://bitsocial.net/docs/apps/seedit) (a Reddit-style forum), which share communities and identities but ship different front-ends.

## The story

Social networks have two hard infrastructure problems: where the world's content lives, and how you stop spam without a central authority. The usual answers each come with a tax. A centralized backend creates a single owner of the social graph, the moderation database, and the account namespace, which is exactly the choke point that turns a product decision into a network-wide ban. A blockchain removes the central owner but adds gas fees, throughput limits, storage bloat, and consensus overhead that social media does not actually need: there is no double-spend problem in posting, and old posts do not have to be permanently available on every node. Federation softens centralization but still leaves every community dependent on a server admin with full control, a domain, TLS, and an ongoing hosting bill.

Bitsocial's bet is that social media can be broken into replaceable layers (protocol, communities, identity, hosting, discovery, monetization, and apps) so that no single company has to own the whole social graph for the product to work. IPFS and libp2p supply the bottom layers: content-addressed storage and discovery, public-key naming, and direct peer-to-peer transfer.

## How Bitsocial works

A community is a keypair. The hash of its public key becomes its network address, the same way a file's hash becomes its address in content-addressed storage. The community publishes a signed record at that address pointing to its latest content, and updates it as new posts arrive.

**Reading a community:**

1. The client resolves the community's public-key address to its latest signed record. The record points to the current community state by CID.
1. The client fetches the community metadata (title, description, moderator list, challenge configuration) and the list of content pointers (the CIDs of the latest posts).
1. The client fetches each post by CID directly over libp2p and renders everything in a familiar social interface. Multiple community lookups run concurrently.

**Publishing a post:**

1. The app generates a keypair for the user on first use; this keypair is their identity.
1. The client joins the libp2p gossipsub topic keyed to the community's public key and requests an anti-spam challenge.
1. The community operator's node returns a challenge (for example a captcha). The user completes it.
1. The client submits the post plus the challenge answer over pubsub. The operator's node validates the answer and, if it passes, includes the post in the next content update published at the community's address.
1. Within a few minutes, every reader of the community sees the update.

## How Bitsocial uses IPFS

Bitsocial is built on IPFS and libp2p primitives end to end.

### Public-key addressing with IPNS

Each community is named by the hash of its public key, which is a libp2p key identity. The community publishes a signed [IPNS](https://docs.ipfs.tech/concepts/ipns/) record at that name pointing to the CID of its current state, and republishes a new record each time content changes. Only the latest version is kept; there is no need to preserve every historical state, which is what keeps the system lightweight compared to a blockchain. Because the name is derived from a keypair the owner holds, hosting can be delegated to any node without handing over custody of the community.

### Content addressing for posts and updates

The record at a community's address does not embed full post content. It stores metadata plus a list of CIDs that point to the actual posts and to the paginated update objects. Clients fetch each piece of content by CID and verify it against its hash on arrival, so a post that does not match its CID is rejected without any extra protocol work. Popular content naturally spreads across the peers that have fetched it, distributing load the way a popular torrent downloads faster.

### Gossipsub for the publish handshake

The publish flow is a real-time request-response exchange, so Bitsocial runs it over libp2p [gossipsub](https://docs.libp2p.io/concepts/pubsub/overview/) rather than the content-addressed layer. Publishers and the community node exchange the challenge and the answer on a topic keyed to the community's public key. Peers that relay too many failed challenge attempts are dropped from the topic, which keeps the messaging layer resistant to denial-of-service floods.

### Helia in the browser, Kubo on nodes

Community operators and self-hosters typically run [Kubo](https://github.com/ipfs/kubo) nodes. Browser clients run [Helia](https://github.com/ipfs/helia), the JavaScript IPFS implementation, so they can participate as real peers: resolve community names, fetch posts over libp2p, and publish directly without trusting a gateway. Optional HTTP gateways relay data between the peer-to-peer network and browsers that cannot run a node, but a gateway operator gains no custody over identities or communities and can be swapped out without losing data.

### Delegated HTTP routing for discovery

Rather than rely on DHT walk latency for every lookup, Bitsocial clients resolve IPNS records and find content providers through stateless [delegated HTTP routers](https://specs.ipfs.tech/routing/http-routing-v1/). Clients query several routers in parallel, so discovery is fast and survives any single router being down. The routers store only the network addresses of peers that announced themselves as providers; they never hold the content itself.

### Encrypted posts before they hit the network

Before a post enters the pubsub network, it is encrypted to the community operator's public key. Network observers can see that some peer published something, but not what it says or which author identity wrote it, adding a privacy layer on top of the baseline that peer-to-peer networks already provide.

## IPFS benefits

Several IPFS and libp2p properties were load-bearing in the design.

### No servers, no platform fees

Because a community is a keypair plus content-addressed data served over libp2p, a community node runs on consumer hardware with no domain, no TLS certificate, and no database to operate. There is no central backend to pay for, and therefore no economic pressure toward the consolidation that federation tends to slide into.

### Ownership that survives the host

Public-key addressing means a community or profile is controlled by its key, not by whoever is hosting it. Operators can keep a node online and apps can choose what to index, but neither can seize the identity. Moderation stays local: if one app filters you another can show you, and if one community rejects you another can accept you or you can run your own.

### Integrity for free

Content addressing makes every fetched post self-verifying. When a client assembles a community feed from posts gathered across many peers, each CID is a hash of its content, so tampered or substituted data is rejected at the client with no extra signature protocol on the content path.

### A protocol many apps can share

Because identities and communities live in IPFS and libp2p rather than inside any one app's database, multiple clients (imageboards, forums, and future profile-based apps) read and write the same network. New apps inherit the existing communities and identities instead of starting from an empty graph.

## Operational lessons

Running a consumer-facing social network on IPFS in the browser surfaced a few sharp edges worth flagging for other teams:

- **Browser clients need browser-dialable providers.** Most nodes announce only TCP multiaddrs, which a browser cannot dial. For browser peers to fetch content directly, providers have to announce WebSocket-Secure (via AutoTLS) or WebRTC-direct addresses. Where those addresses are missing, browser load times collapse back onto gateways. Auditing what transports your providers actually advertise is essential before assuming browser peers can participate.
- **Provider records expire, and reproviding can fall behind.** HTTP routers keep a provider announcement for only about 24 hours, so content has to be re-announced continuously. On a node whose IPNS target rotates frequently, a serial reprovider can fall behind and leave fresh content undiscoverable to browser peers. Announcing roots rather than every block, and keeping the provide queue small, keeps rotating content findable.
- **One dead router should not abort discovery.** When clients fan a lookup out across several HTTP routers in parallel, a single unreachable router can reject the whole merged result stream if errors are not isolated per router. Wrapping each router independently so one failure cannot cancel the others is necessary for resilient discovery.
- **IPNS over HTTP routers is fast, DHT-only is not.** Resolving community names through delegated HTTP routing rather than waiting on a DHT walk was the difference between near-instant and multi-second community loads.

## Bitsocial & IPFS: the future

Bitsocial's roadmap extends the same primitives outward: competing public RPC providers that keep communities and profiles always-on without taking custody, optional feed-algorithm services instead of one mandatory platform feed, and an economic layer so monetization does not depend on a single payment processor's goodwill. The aim is an ecosystem of apps that can rival every major category of social media, from text and forums to imageboards and short-form video, all sharing the same IPFS-addressed communities and identities underneath.

_Note: Details in this case study are current as of mid-2026. Bitsocial and the underlying infrastructure continue to evolve._
