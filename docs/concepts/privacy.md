---
title: Privacy
sidebarDepth: 0
description: Learn about user privacy and IPFS, the InterPlanetary File System.
related:
  'Article: IPFS Privacy (Textile)': https://medium.com/pinata/ipfs-privacy-711f4b72b2ea
---

# IPFS and privacy

As you explore IPFS and learn about its core concepts, it's important to understand that as a protocol for peer-to-peer data storage and delivery, IPFS in itself does not explicitly have a "privacy layer" built in. This is in line with key principles of protocol design, since different uses of IPFS over its (hopefully very long) life may call for different approaches to privacy, and implementing only one within the IPFS core could "box in" future builders and implementers due to a lack of modularity, flexibility, and future-proofing.

At its heart, IPFS is by design a public network: Nodes participating in the network store data affiliated with globally consistent [content addresses](/concepts/content-addressing) (CIDs), and advertise that they have those CIDs available for other nodes to use via publicly viewable [distributed hash tables](/concepts/dht/) (DHTs). Indeed, this is one of IPFS's core strengths — at its most basic, it's essentially a globally distributed "hard drive" of the network's available data, indexable both by the content that's available (those CIDs) and the participants who have the content (the nodes).

What this does mean, however, is that IPFS itself isn't explicitly protecting knowledge _about_ CIDs and who's providing or retrieving them. This isn't something unique to the distributed web, though; on both the dweb and the legacy web, traffic and other factors can be monitored in ways that can infer a lot about a network and its users. Some key details on this are outlined below, but in summary: **IPFS traffic, including which nodes are retrieving and/or reproviding which CIDs, occurs in the clear. If you're worried about the implications of this for your own personal use case, it's worth taking additional measures** such as encrypting sensitive content, accessing IPFS content [through Tor gateways](https://dweb-primer.ipfs.io/avenues-for-access/tor-transport), or even running a private IPFS network if appropriate.

::: tip
IPFS traffic, including which nodes are retrieving and/or reproviding what data, occurs in public. If you're worried about the implications of this for your personal use case, it's worth taking additional measures.
:::

## IPFS hashes are public

Because of how distributed hash tables (DHTs) work
Things can monitor the network

## User nodes' requests are public, too

## Gateways can be a workaround, but kind of defeat the point

And in any case, gateways could be trackign IPs and correlating with what CIDs are requested

## What about encryption?

Content is encrypted, but the traffic can still be tracked

## Private networks

Those are an option too, but a whole different use case
