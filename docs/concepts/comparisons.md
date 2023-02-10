---
title: 'IPFS Comparisons'
description: Comparing IPFS to other solutions.
---

# IPFS comparisons

IPFS is a general-purpose file system that uses a distributed hash table (DHT) to route and transfer content-addressed data. This sets it apart from other solutions with a more specific focus or use of a specific data storage mechanism. For example:

- [BitTorrent](https://www.bittorrent.com/) is a peer-to-peer (P2P) file-sharing protocol that uses a centralized tracker to manage the distribution of files among peers. It focuses on file-sharing rather than file storage.
- [Storj](https://storj.io/) and [Sia](https://sia.tech/) are decentralized cloud storage platforms that use distributed networks of nodes for data storage. They focus on providing cloud storage services rather than a general-purpose distributed file system.
- [Arweave](https://www.arweave.org/) is a decentralized, permanent storage platform that uses a novel data structure called a "blockweave" for data storage. It focuses on providing permanent storage rather than a file-sharing system.
- [Filecoin](https://filecoin.io/) is a decentralized storage network that allows users to rent out disk space. It focuses on providing a decentralized storage marketplace. It uses a proof-of-replication consensus mechanism and supports payment in various cryptocurrencies.

  :::callout
  Filecoin is built on IPFS and uses the IPFS network for data storage and retrieval. Filecoin and IPFS are complementary technologies providing decentralized and efficient storage solutions.
  :::

- [Hypercore](https://hypercore-protocol.org/) is a decentralized data-sharing tool that uses a distributed hash table (DHT) for data storage. It focuses on enabling data sharing and collaboration.
- [Holo](https://holochain.org/) is a decentralized hosting platform that uses a unique data storage and sharing mechanism called Holochain. It allows users to host and run web-based applications on a peer-to-peer network.
- [Swarm](https://swarm-gateways.net/bzz:/theswarm.eth/) is a decentralized storage and sharing platform built on the Ethereum blockchain. It uses smart contracts and cryptographic techniques to securely store and share data. It focuses on providing a decentralized, secure, and censorship-resistant storage solution.

## Comparing the key features of other solutions to IPFS

The following tables outline key features of different mechanisms and how they compare to IPFS.

:::callout
All of these solutions use content-based addressing.
::::

### General protocols

| technology            | storage mechanism         | data model            | networking stack | identifier          | address composition | links                 | use cases                | similarity to IPFS | hashing algorithm |
| --------------------- | ------------------------- | --------------------- | ---------------- | ------------------- | ------------------- | ---------------------- | -------------------- | ------------------ | --------------------- |
| [bittorrent](https://www.bittorrent.com/protocols/bittorrent-rfc.html) | P2P file-sharing          | merkle DAG             | TCP/IP           | torrent file        | filename + sha1 hash    | -                     | file sharing              | low                 | SHA-256          |
| [hypercore](https://hypercore-protocol.org/guides/)                   | decentralized data-sharing| merkle DAG                 | UDP           | dat key             | dat key             | dat://{key}            | decentralized data sharing| medium              | SHA-256          |
| [git](https://git-scm.com/)                                          |  version control| commit history          | TCP/IP           | commit hash        | commit hash           | -                     | version control           | medium              | SHA-1, SHA-256   |
| [Secure Scuttlebutt (SSB)](https://ssbc.github.io/scuttlebutt-protocol-guide/) | decentralized social network | append-only log       | Scuttlebutt Protocol | feed id            | feed id              | ssb://{feed id}         | decentralized social networking| high                | SHA-256          |

### Crypto-economic networks

| technology            | storage mechanism         | data model            | consensus mechanism         | networking stack | identifier          | address composition | use cases                | similarity to IPFS |
| --------------------- | ------------------------- | --------------------- | --------------------------- | ---------------- | ------------------- | ------------------- | ------------------------ | ------------------ |
| [filecoin](https://filecoin.io/docs)              | blockchain-based storage  | merkle DAG                 | proof-of-replication         | libp2p           | cid                 | cid                 | decentralized data storage | high                |
| [storj](https://storj.io/docs/)                 | decentralized storage     | erasure coding             | proof-of-retrievability       | UDP              | farmer ID           | farmer ID + file metadata | encrypted cloud storage  | medium              |
| [Holo](https://developer.holochain.org/docs/)             | decentralized application | distributed hash table     | distributed hash table         | actor model             | agent ID            | agent ID            | decentralized applications | medium              |
| [Swarm](https://swarm-guide.readthedocs.io/)                 | decentralized storage     | distributed hash table     | proof-of-custody              | libp2p           | chunk ID            | chunk ID            | decentralized data storage    | high       |
| [sia](https://sia.tech/docs/)                   | decentralized storage     | erasure coding             | proof-of-work                | UDP              | sector ID           | sector ID + file metadata | encrypted cloud storage  | medium              |
| [arweave](https://www.arweave.org/docs)               | blockchain-based storage  | blockweave                 | proof-of-access              | TCP/IP           | block ID            | block ID            | permanent data archiving | low                 |
