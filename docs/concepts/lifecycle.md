---
title: The lifecycle of data in IPFS
description: 
---

# The lifecycle of data in IPFS

The lifecycle of data in IPFS can be summarised as follows:

1. **Content-addressable representation**: The file is transformed into a content-addressable representation with a CID. The basic idea is that this representation makes files and directories **content-addressable** via CIDs by chunking files into smaller blocks, calculating their hashes, and constructing a [Merkle DAG](./merkle-dag.md).
2. **Pinning:** refers to the stage where the blocks of the CID are saved on an IPFS node (or pinning service) and made retrievable to the network. Since saving is not enough for the CID to be retrievable, pinning typically refers to two things:
   - **Advertising:** Making each CID discoverable to the IPFS network by advertising a record linking between the CID and the server's IP address to the [DHT](./dht.md). This advertising stage is a continuous process that repeats typically every 12 hours. The term **publishing** is also commonly used to refer to this step.
   - **Providing:** The content-addressable representation of the CID is persisted on one of web3.storage's IPFS nodes (servers running an IPFS node) and made publicly available to the IPFS network.
3. **Retrieval:** refers to when an IPFS node fetches the blocks of the CID and constructs the Merkle DAG. This usually involves several steps:
   - **Block fetching:** An IPFS node fetches the blocks of the Merkle DAG (of the file or folder) from providers.
   - **Verifying** the IPFS node verifies the blocks fetched by hashing them and ensuring the resulting hash is correct. Note that blocks can come from any node in the network and this type of retrieval is _trustless_.
   - **Local access:** once all the blocks are present, the Merkle DAG can be constructed making the file or directory underlying the CID successfully replicated and accessible.
4. **Deleting:** refers to the deletion of a CID from a node. Deletion is always a local operation. If a CID has been replicated by other nodes, it will continue to be available on the IPFS network.

> **Note:** once the CID is replicated by another node, it is typically advertised by default, even if it isn't explicitly pinned.

Learn more about the lifecycle of data in IPFS in the following video:

@[youtube](iaVXRPsRCUc)