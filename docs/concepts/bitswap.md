---
title: Bitswap
sidebarDepth: 0
description: Learn about Bitswap and how it plays into the overall architecture of IPFS, the InterPlanetary File System.
---

# Bitswap

Bitswap is a core module of IPFS for exchanging blocks of data. It directs the requesting and sending of blocks to and from other peers in the network. Bitswap is a _message-based protocol_ where all messages contain [want-lists](#want-lists) or blocks. Bitswap has a [Go implementation](https://github.com/ipfs/boxo/tree/main/bitswap) and a [JavaScript implementation](https://github.com/ipfs/js-ipfs-bitswap).

Bitswap has two main jobs:

- Acquire blocks requested by the client from the network.
- Send blocks in its possession to other peers who want them.

## How Bitswap works

IPFS breaks up files into chunks of data called _blocks_. These blocks are identified by a [content identifier (CID)](../concepts/content-addressing.md). 

### Want Lists

When nodes running the Bitswap protocol want to fetch a file, they send out `want-lists` to other peers. A `want-list` is a list of CIDs for blocks a peer wants to receive. Each node remembers which blocks its peers want. Each time a node receives a block, it checks if any of its peers want the block and sends it to them if they do.

Here is a simplified version of a `want-list`:

```javascript
Want-list {
  QmZtmD2qt6fJot32nabSP3CUjicnypEBz7bHVDhPQt9aAy, WANT,
  QmTudJSaoKxtbEnTddJ9vh8hbN84ZLVvD5pNpUaSbxwGoa, WANT,
  ...
}
```

### Discovery

To find peers that have a file, a node running the Bitswap protocol first sends a request called a _want-have_ to all the peers it is connected to. This _want-have_ request contains the CID of the root block of the file (the root block is at the top of the DAG of blocks that make up the file). Peers that have the root block send a _have_ response and are added to a session. Peers that don't have the block send a _dont-have_ response. Bitswap builds up a map of which nodes have and don't have each block.

![Diagram of the _want-have/want-block_ process.](./images/bitswap/diagram-of-the-want-have-want-block-process.png =740x537)

### Transfer

Bitswap sends _want-block_ to peers that have the block, and they respond with the block itself. If none of the peers have the root block, Bitswap queries the Distributed Hash Table (DHT) to ask who can provide the root block.

### Technical specification

- [Bitswap Protocol Specifications](https://specs.ipfs.tech/bitswap-protocol/)
  - [v1.0.0](https://specs.ipfs.tech/bitswap-protocol/#bitswap-1-0-0)
  - [v1.1.0](https://specs.ipfs.tech/bitswap-protocol/#bitswap-1-1-0)
  - [v1.2.0](https://specs.ipfs.tech/bitswap-protocol/#bitswap-1-2-0)

### Additional references

- [February 2020: New improvements to IPFS Bitswap](https://blog.ipfs.tech/2020-02-14-improved-bitswap-for-container-distribution/)
- [Technical overview of the Go implementation of Bitswap](https://docs.google.com/presentation/d/1mbFFGIIKNvboHyLn-k26egOSWkt9nXjlNbxpmCEQfqQ/edit#slide=id.p)
- [Article: Swapping bits and distributing hashes on the decentralized web (Textile)](https://medium.com/textileio/swapping-bits-and-distributing-hashes-on-the-decentralized-web-5da98a3507)
- ["About Bitswap" Go implementation poster from the IPFS developer summit in Berlin in July 2018](https://user-images.githubusercontent.com/74178/43230914-f818dab2-901e-11e8-876b-73ba6a084f76.jpg)
