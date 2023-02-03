---
title: How IPFS works
description: Learn how the InterPlanetary File System (IPFS) works and why it's an essential part of the future internet.
---

# How IPFS works

Data in IPFS is addressed by its contents (content addressing), rather than a location such as a server address (location addressing). Various subsystems in IPFS are responsible for addressing, routing, and transferring content-addressed data.


:::callout
This guide is part 2 of a 2-part introduction to the basic concepts of IPFS. For the first part, what IPFS is and the problems it addresses, see [What is IPFS?](../concepts/what-is-ipfs.md).
:::
In this conceptual guide, you'll learn about the different subsystems that IPFS is comprised of work and how they work.

## How IPFS represents data

IPFS represents data as content-addressed <VueCustomTooltip label="The term for a single unit of data in IPFS." underlined multiline is-medium>blocks</VueCustomTooltip>, and operates on those data blocks using the following subsystems:

- [Content IDentifier (CID)](#content-identifier-cid)
- [InterPlanetary Linked Data (IPLD)](#interplanetary-linked-data-ipld)
- [Content Addressable aRchive (CAR) files](#content-addressable-archive-car-files)

### Content IDentifier (CID)

In IPFS, data is chunked into <VueCustomTooltip label="The term for a single unit of data in IPFS." underlined multiline is-medium>blocks</VueCustomTooltip>, which are assigned a unique identifier called a <VueCustomTooltip label="An address used to point to data in IPFS, based on the content itself, as opposed to the location." underlined multiline is-medium>Content IDentifier (CID)</VueCustomTooltip>. In general, the CID is generated for each block by:

1. Computing a cryptographic hash of the block's data.
1. Combining that hash with other information about the block using the following <VueCustomTooltip label="A collection of interoperable, extensible protocols for making data self-describable." underlined multiline is-medium>multiformats</VueCustomTooltip>. 
   - <VueCustomTooltip label="A protocol for differentiating outputs from various well-established hash function." underlined multiline is-medium>Multihash</VueCustomTooltip> for information on the algorithm used to hash the data.
   - <VueCustomTooltip label="A protocol for differentiating the format of the target data." underlined multiline is-medium>Multicodec</VueCustomTooltip> for information on how to interpret the hashed data after it has been fetched.
   - <VueCustomTooltip label="A protocol for differentiating the encoding of base-encoded (e.g., base32, base36, base64, base58, etc.) binary data appearing in text." underlined multiline is-medium>Multibase</VueCustomTooltip> for information on how the hashed data is encoded.

:::callout
**CIDs will not match the hash of the data**
While a data block's CID is constructed using the cryptographic hash of the data block, a CID contains additional information (described above) that the has does not.
:::

CIDs are unique to the data from which they were computed, which provides IPFS with the following benefits:
- Data can fetched based on it's content, rather than it's location. 
- The CID of the data received can be computed and compared to the CID requested, to verify that the data is what was requested.

:::callout
**Learn more**
The CID protocol has two versions, v0 and v1. Currently, v1 is the preferred version. Each version computes the CID in a slightly different way, Learn more in [the CID deep dive](../concepts/content-addressing.md#cid-versions).
:::


### InterPlanetary Linked Data (IPLD)

IPFS uses <VueCustomTooltip label="A set of specifications in support of decentralized, content-addressable data structures for the web." underlined multiline is-medium>InterPlanetary Linked Data (IPLD)</VueCustomTooltip> to work with CIDs and content-addressed data. IPFS uses IPLD to structure, serialize, traverse and link content-addressed data. The IPLD linking mechanism allows IPFS to represent complex relationships between data, such as file directories and other hierarchical structures, using a <VueCustomTooltip label="Data structured as a graph whose nodes are directionally related to each other and don’t form a directional closed loop." underlined multiline is-medium>Directed Acyclic Graph (DAG)</VueCustomTooltip> called a <VueCustomTooltip label="A special type of DAG where each node has a unique identifier that is a hash of the node's contents." underlined multiline is-medium>Merkle DAG</VueCustomTooltip>. 

IPLD provides IPFS with the following benefits:

- Functionality to structure, serialize, traverse and link content-addressed data
- Interoperable protocols
- Easy upgradeability
- Backwards compatibility
- A single namespace for all hash-based protocols

:::callout
**Learn more**
Want to learn more about IPLD? See [the official docs](https://ipld.io/docs/intro/primer/).
:::

### Content Addressable aRchive (CAR) files

IPFS uses Content Addressable aRchive (CAR) files to store and transfer a serialized archive of IPLD content-addressed data. CAR files are similar to TAR files, in that they that are designed for storing collections of content addressed data.

## How IPFS routes data

While [the subsystems described above](#how-ipfs-represents-data) handle the representation of data, IPFS needs to route the data between <VueCustomTooltip label="Programs that implement the IPFS protocol and participate in the IPFS network. Also referred to as a peer." underlined>nodes</VueCustomTooltip> in the network. In other words, a node cannot simply find data in the network with a CID alone; it requires information about the IP addresses and ports of its <VueCustomTooltip label="Programs that implement the IPFS protocol and participate in the IPFS network. Also referred to as a node." underlined multiline is-left>peers</VueCustomTooltip>  on the network. To handle the routing of data, IPFS uses the following subsystems:

- [Kademlia Distributed Hash Table (DHT)]()
- [Bitswap]()
- [mDNS]()
- [Delegated routing over HTTP]()

### Kademlia Distributed Hash Table (DHT)

IPFS uses Kademlia, a <VueCustomTooltip label="A decentralized data store that maps data based on key-value pairs." underlined multiline is-left>Distributed Hash Table (DHT)</VueCustomTooltip> designed for decentralized peer-to-peer computer networks. Kademlia is used to map what the user is looking for to the peer that is storing the matching content. The Kademlia DHT can be thought as a huge table that stores information on who has what data, and where that data might be located. The Kademlia DHT provides IPFS with:

- A catalog and a navigation system for data on the IPFS network
- Logic for handling undialable peers
- Logic for refreshing the list of peers
- Logic for dropping peers from the DHT if they are inactive or not offline

:::callout
**Learn more**
Want to learn more about Kademlia and DHTs? See the [the Distributed Hash Tables (DHTs) conceptual guide](../concepts/dht.md#kademlia).
:::

### Bitswap

Lorem ipsum...

### mDNS

Lorem ipsum...

### Delegated routing over HTTP

Lorem ipsum...

## How IPFS transfers data

In addition to [routing data](#how-ipfs-routes-data), nodes in the IPFS network must efficiently distribute and deliver the content addressed data, taking into account that there are some nodes in the network who already have a copy of the data, and other nodes who do not have a copy of the data, but want one. To handle the transfer of data, IPFS uses the following subsystems:

- [Bitswap]()
- [IPFS HTTP Gateways]()
- [GraphSync]()
- [Sneakernet]()

### Bitswap

Lorem ipsum...

### IPFS HTTP Gateways

Lorem ipsum...

### GraphSync

Lorem ipsum...

### Sneakernet

Lorem ipsum...

## Learn more 

Lorem ipsum...