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

Bitswap is a core module of IPFS for exchanging blocks of data. It directs the requesting and sending of blocks to and from other peers in the network. Bitswap is a _message-based protocol_ where all messages contain [want-lists](#want-list) or blocks. Bitswap has a [Go implementation](https://github.com/ipfs/go-bitswap) and a [JavaScript implementation](https://github.com/ipfs/js-ipfs-bitswap).

Bitswap has two main jobs:

- Acquire blocks requested by the client from the network.
- Send blocks in its possession to other peers who want them.

## How Bitswap works

IPFS breaks up files into chunks of data called _blocks_. These blocks are identified by a [content identifier (CID)](/content/content-addressing). When nodes running the Bitswap protocol want to fetch a file, they send out `want-lists` to other peers. A `want-list` is a list of CIDs for blocks a peer wants to receive. Each node remembers which blocks its peers want. Each time a node receives a block it checks if any of its peers want the block, and sends it to them if they do.

Here is a simplifed version of a `want-list`:

```javascript
Want-list {
  QmZtmD2qt6fJot32nabSP3CUjicnypEBz7bHVDhPQt9aAy, WANT,
  QmTudJSaoKxtbEnTddJ9vh8hbN84ZLVvD5pNpUaSbxwGoa, WANT,
  ...
}
```

To find out which peers have the blocks that make up a file, a node running the Bitswap protocol first sends a request called a `want` to all the peers it is connected to. This _want-request_ contains CID of the root-block of data that makes up the larger chunk of data that makes up a file. If the peers don’t have the block, the node queries the Distributed Hash Table (DHT) to ask who has the root-block. Any peers that respond with the root-block are added to a session. So that the network isn't flooded with _want-requests_, Bitswap only sends `wants` to peers in the session.

The node sends out a `want` for each CID to several peers in the session in parallel, because not all peers will have all blocks. If the node starts receiving a lot of duplicate blocks, it sends a `want` for each CID to fewer peers. If the node gets timeouts waiting for blocks, it sends a `want` for each CID to more peers. In this way the node tries to maintain a high download speed without too many duplicate blocks.

### Additional references

- [February 2020: New improvements to IPFS Bitswap](https://blog.ipfs.io/2020-02-14-improved-bitswap-for-container-distribution/)
- [Technical overview of the Go implementation of Bitswap](https://docs.google.com/presentation/d/1mbFFGIIKNvboHyLn-k26egOSWkt9nXjlNbxpmCEQfqQ/edit#slide=id.p)
- [Article: Swapping bits and distributing hashes on the decentralized web (Textile)](https://medium.com/textileio/swapping-bits-and-distributing-hashes-on-the-decentralized-web-5da98a3507)
- "About Bitswap" Go implementation poster from the IPFS developer summit in Berlin in July 2018:
  !['About Bitswap' poster](https://user-images.githubusercontent.com/74178/43230914-f818dab2-901e-11e8-876b-73ba6a084f76.jpg 'Bitswap-Poster_Berlin-July-2018')
