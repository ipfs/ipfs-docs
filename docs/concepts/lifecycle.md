---
title: The lifecycle of data in IPFS
description: Learn about the lifecycle of data in IPFS.
---

# The lifecycle of data in IPFS

- [1. Content-addressable representation](#1-content-addressable-representation)
- [2. Pinning](#2-pinning)
- [3. Retrieval](#3-retrieval)
- [4. Deleting](#4-deleting)
- [Learn more](#learn-more)

## 1. Content-addressable representation

The file is transformed into a content-addressable representation using a CID. The basic idea is that this representation makes files and directories **content-addressable** via CIDs by chunking files into smaller blocks, calculating their hashes, and constructing a [Merkle DAG](./merkle-dag.md).

## 2. Pinning

In this stage, the blocks of the CID are saved on an IPFS node (or pinning service) and made retrievable to the network. Simply saving the CID on the node does not mean the CID is retrievable, so pinning must be used. Pinning allows the node to advertise that it has the CID, and provide it to the network.

- **Advertising:** In this step, a CID is made discoverable to the IPFS network by advertising a record linking the CID and the server's IP address to the [DHT](./dht.md). Advertising is a continuous process that repeats typically every 12 hours. The term **publishing** is also commonly used to refer to this step.

- **Providing:** The content-addressable representation of the CID is persisted on one of web3.storage's IPFS nodes (servers running an IPFS node) and made publicly available to the IPFS network.

## 3. Retrieval

In this stage, an IPFS node fetches the blocks of the CID and constructs the Merkle DAG. This usually involves several steps:

- **Content routing:** The IPFS node finds other IPFS nodes providing the CIDs you are requesting. Content routing is facilitated by either the [DHT](./dht.md), asking already connected peers over [Bitswap](./bitswap.md), or making an HTTP call to a [delegated routing](https://github.com/ipfs/specs/blob/main/IPIP/0337-delegated-routing-http-api.md) server like the [network indexer](https://cid.contact/). The term **content discovery** is also commonly used to refer to this step.

- **Block fetching:** An IPFS node fetches the blocks of the Merkle DAG (of the file or folder) from providers.

- **Verification:** The IPFS node verifies the blocks fetched by hashing them and ensuring that the resulting hash is correct. Note that this type of retrieval is _trustless_; that is, blocks can come from any node in the network.

- **Local access:** Once all blocks are present, the Merkle DAG can be constructed, making the file or directory underlying the CID successfully replicated and accessible.

## 4. Deleting

At this point, the blocks associated with a CID are deleted from a node. **Deletion is always a local operation**. If a CID has been replicated to other nodes, it will continue to be available on the IPFS network.

:::callout
Once the CID is replicated by another node, it is typically advertised to DHT by default, even if it isn't explicitly pinned.
:::

## Learn more

Learn more about the lifecycle of data in IPFS in the following video:

@[youtube](iaVXRPsRCUc)
