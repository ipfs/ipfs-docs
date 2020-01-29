---
title: Bitswap
sidebarDepth: 0
issueUrl: https://github.com/ipfs/docs/issues/85
description: Learn about Bitswap and how it plays into the overall architecture of IPFS, the InterPlanetary File System.
related:
  'Article: Swapping bits and distributing hashes on the decentralized web (Textile)': https://medium.com/textileio/swapping-bits-and-distributing-hashes-on-the-decentralized-web-5da98a3507
  'GitHub repo: Go Bitswap implementation': https://github.com/ipfs/go-bitswap
  'GitHub repo: JavaScript Bitswap implementation': https://github.com/ipfs/js-ipfs-bitswap
---

# Bitswap

Bitswap is a core module of IPFS for exchanging blocks of data. It directs the requesting and sending of blocks to and from other peers in the network. It is a message based protocol, wherein all messages contain wantlists or blocks. Bitswap has a [go implementation](https://github.com/ipfs/go-bitswap) and a [JavaScript implementation](https://github.com/ipfs/js-ipfs-bitswap).

Bitswap has two main jobs:
- to acquire blocks requested by the client from the network
- to send blocks in its possession to other peers who want them

### Wantlist

A wantlist is a data structure that an IPFS node sends to the network to tell peers which blocks it wants. The wantlist contains [CIDs](https://docs-beta.ipfs.io/concepts/content-addressing/) (content-addressed identifiers that refer to particular blocks desired) along with priority and cancellation information.

### Message

A single Bitswap message may contain any of the following content:

-  The sender’s wantlist. This wantlist may either be the sender’s complete wantlist or just the changes to the sender’s wantlist that the receiver needs to know.
-  Data blocks. These are blocks that have been requested (i.e., blocks in the sender’s wantlist, as far as the receiver is aware at the time of message receipt).

### Session

IPFS content blocks are often connected to each other through a [MerkleDAG](https://docs-beta.ipfs.io/concepts/merkle-dag/). If a sender's block requests *are* related, a mechanism called a Bitswap session can optimize block requests sent to other peers. This can increase transfer speed and reduce the number of duplicate blocks on the network. Active peers are favored, as they are tracked relative to them having the requested blocks and how quickly they respond.

### Provider / Providing

The provider system is responsible for announcing and reannouncing to the IPFS network that a node has content. If a node cannot find content with connected peers, it will query a content routing system (usually a form of [DHT](https://docs-beta.ipfs.io/concepts/dht/)) to locate a peer with the content. Bitswap routes these requests through the ProviderQueryManager system. As a node receives blocks, it announces them on the provided content routing system.

### Deeper Examination

A diagram showing the major tasks of Bitswap and underlying components:

![alt text](https://github.com/ipfs/go-bitswap/blob/master/docs/go-bitswap.png "Go-Bitswap")

#### Message Queue

An IPFS node has a message queue for each active peer. The message queue has the next message to be sent to that peer. Updates to a message queue come from either the wantlist manager or the decision engine. Task workers watch the message queues and send waiting messages to the associated peers.

#### Want-Manager

The want-manager handles our requests for blocks. When CIDs are added or removed from our wantlist, these updates must be sent to connected peers. This data is sent to all relevant peers' message queues. Once a node receives a block that it asked for, it should send out a notification called a 'Cancel' to tell its peers that it no longer requires those blocks.

#### Decision Engine

The decision engine processes incoming messages that contain a wantlist. It checks the CID for each block in the wantlist against the local blockstore and creates a task in the peer request queue for each block it finds. Task workers pull the tasks off the queue, retrieve the block requested, and send it off.

The decision engine makes use of a Ledger as a record of the aggregate data exchanged between two peers. An IPFS node maintains one Ledger for each connected peer.

### Additional references

[Article: Swapping bits and distributing hashes on the decentralized web (Textile)](https://medium.com/textileio/swapping-bits-and-distributing-hashes-on-the-decentralized-web-5da98a3507)

Poster from the IPFS developer summit in Berlin in July 2018:
![alt text](https://user-images.githubusercontent.com/74178/43230914-f818dab2-901e-11e8-876b-73ba6a084f76.jpg "Bitswap-Poster_Berlin-July-2018")

