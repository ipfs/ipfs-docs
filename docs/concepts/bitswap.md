---
title: Bitswap
sidebarDepth: 0
description: Learn about Bitswap and how it plays into the overall architecture of IPFS, the InterPlanetary File System.
related:
  'Article: Swapping bits and distributing hashes on the decentralized web (Textile)': https://medium.com/textileio/swapping-bits-and-distributing-hashes-on-the-decentralized-web-5da98a3507
  'GitHub repo: Go Bitswap implementation': https://github.com/ipfs/go-bitswap
  'GitHub repo: JavaScript Bitswap implementation': https://github.com/ipfs/js-ipfs-bitswap
---

# Bitswap

Bitswap is a core module of IPFS for exchanging blocks of data. It directs the requesting and sending of blocks to and from other peers in the network. Bitswap is a _message-based protocol_ where all messages contain [wantlists](#wantlist) or blocks. Bitswap has a [Go implementation](https://github.com/ipfs/go-bitswap) and a [JavaScript implementation](https://github.com/ipfs/js-ipfs-bitswap).

Bitswap has two main jobs:
- to acquire blocks requested by the client from the network.
- to send blocks in its possession to other peers who want them.

### Wantlist

A wantlist is a data structure that an IPFS node sends to the network to tell peers which blocks it wants. The wantlist contains [CIDs](https://docs-beta.ipfs.io/concepts/content-addressing/) (content-addressed identifiers that refer to particular blocks desired) along with priority and cancellation information.

### Message

A single Bitswap message may contain any of the following content:

-  **The sender’s wantlist.** This wantlist may either be the sender’s complete wantlist or just the changes to the sender’s wantlist that the receiver needs to know.
-  **Data blocks.** These are blocks that have been requested (i.e., blocks in the sender’s wantlist, as far as the receiver is aware at the time of message receipt).

### Session

IPFS content blocks are often connected to each other through a [Merkle DAG](https://docs-beta.ipfs.io/concepts/merkle-dag/). If a sender's block requests are related, a mechanism called a _Bitswap session_ in the Go implementation can optimize block requests sent to other peers. This mechanism can increase transfer speed and reduce the number of duplicate blocks on the network. Active peers are favored, as they are tracked relative to them having the requested blocks and how quickly they respond.

Another way to look at this is:
- If a remote peer(s) has one block,
- Then it is likely to have other blocks from the same DAG,
- So new blocks are preferentially requested from that/those peers,
- Thus skipping more expensive paths to content discovery.

### Provider/Providing

The provider system is responsible for announcing and reannouncing to the IPFS network that a node has content. If a node cannot find content with connected peers, it will query a content routing system (usually a form of [DHT](https://docs-beta.ipfs.io/concepts/dht/)) to locate a peer with the content.

### Additional references

[Article: Swapping bits and distributing hashes on the decentralized web (Textile)](https://medium.com/textileio/swapping-bits-and-distributing-hashes-on-the-decentralized-web-5da98a3507)

[Technical overview on the Go implementation of Bitswap](https://docs.google.com/presentation/d/1mbFFGIIKNvboHyLn-k26egOSWkt9nXjlNbxpmCEQfqQ/edit#slide=id.p)

"About Bitswap" Go implementation poster from the IPFS developer summit in Berlin in July 2018:
!['About Bitswap' poster](https://user-images.githubusercontent.com/74178/43230914-f818dab2-901e-11e8-876b-73ba6a084f76.jpg "Bitswap-Poster_Berlin-July-2018")
