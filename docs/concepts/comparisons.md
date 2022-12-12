---
title: 'IPFS Comparisons'
description: Comparing IPFS to other solutions.
---

# Storage Solution Comparisons

## How is IPFS different from other solutions?

IPFS is a general-purpose file system that uses a distributed hash table (DHT) to store and retrieve data. This sets it apart from other solutions with a more specific focus or using different data storage mechanisms. For example:

- [BitTorrent](https://www.bittorrent.com/) is a peer-to-peer (P2P) file-sharing protocol that uses a centralized tracker to manage the distribution of files among peers. It focuses on file-sharing rather than file storage.
- [Storj](https://storj.io/) and [Sia](https://sia.tech/) are decentralized cloud storage platforms that use distributed networks of nodes for data storage. They focus on providing cloud storage services rather than a general-purpose distributed file system.
- [Arweave](https://www.arweave.org/) is a decentralized, permanent storage platform that uses a novel data structure called a "blockweave" for data storage. It focuses on providing permanent storage rather than a file-sharing system.
- [Filecoin](https://filecoin.io/) is a decentralized storage network that allows users to rent out disk space. It focuses on providing a decentralized storage marketplace. It uses a proof-of-replication consensus mechanism and supports payment in various cryptocurrencies.
  > Filecoin is built on IPFS and uses the IPFS network for data storage and retrieval. Filecoin and IPFS are complementary technologies providing decentralized and efficient storage solutions.
- [Dat](https://datproject.org/) is a decentralized data-sharing tool that uses a distributed hash table (DHT) for data storage. It focuses on enabling data sharing and collaboration.
- [Holo](https://holochain.org/) is a decentralized hosting platform that uses a unique data storage and sharing mechanism called Holochain. It allows users to host and run web-based applications on a peer-to-peer network.
- [Swarm](https://swarm-gateways.net/bzz:/theswarm.eth/) is a decentralized storage and sharing platform built on the Ethereum blockchain. It uses smart contracts and cryptographic techniques to securely store and share data. It focuses on providing a decentralized, secure, and censorship-resistant storage solution.

## Comparing the key features of other solutions to IPFS

The following table outlines key features of storage mechanisms and how they compare to IPFS.
> Note that all these solutions use content-based addressing.

| technology            | storage mechanism         | data model            | consensus mechanism         | networking stack | identifier          | address composition | use cases                | similarity to IPFS |
| --------------------- | ------------------------- | --------------------- | --------------------------- | ---------------- | ------------------- | ------------------- | ------------------------ | ------------------ |
| [bittorrent](https://www.bittorrent.com/protocols/bittorrent-rfc.html) | P2P file-sharing          | -                      | -                             | TCP/IP           | torrent file        | filename + sha1 hash    | file sharing              | low                 |
| [storj](https://storj.io/docs/)                 | decentralized storage     | erasure coding             | proof-of-retrievability       | UDP              | farmer ID           | farmer ID + file metadata | encrypted cloud storage  | medium              |
| [arweave](https://www.arweave.org/docs)               | blockchain-based storage  | blockweave                 | proof-of-access              | TCP/IP           | block ID            | block ID            | permanent data archiving | low                 |
| [sia](https://sia.tech/docs/)                   | decentralized storage     | erasure coding             | proof-of-work                | UDP              | sector ID           | sector ID + file metadata | encrypted cloud storage  | medium              |
| [filecoin](https://filecoin.io/docs)              | blockchain-based storage  | merkle DAG                 | proof-of-replication         | libp2p           | cid                 | cid                 | decentralized data storage | high                |
| [dat](https://dat.foundation/docs/)                   | decentralized data-sharing| hyperdrive                 | Kademlia DHT                  | UDP           | dat key             | dat key             | decentralized data sharing| medium              |
| [Holo](https://developer.holochain.org/docs/)             | decentralized application | distributed hash table     | distributed hash table         | actor model             | agent ID            | agent ID            | decentralized applications | medium              |
| [Swarm](https://swarm-guide.readthedocs.io/)                 | decentralized storage     | distributed hash table     | proof-of-custody              | libp2p           | chunk ID            | chunk ID            | decentralized data storage    | high       |
