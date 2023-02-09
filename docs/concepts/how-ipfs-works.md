---
title: How IPFS works
description: Learn how the InterPlanetary File System (IPFS) works and why it's an essential part of the future internet.
---

# How IPFS works

Data in <VueCustomTooltip label="InterPlanetary File System"  abbreviation is-small>IPFS</VueCustomTooltip> is addressed by its contents (<VueCustomTooltip label="A way to address data by its hash rather than its location (IPs)." underlined multiline>content addressing</VueCustomTooltip>), rather than a location, such as a server address (location addressing). Various subsystems in IPFS are responsible for addressing, routing, and transferring content-addressed data.


:::callout
This guide is part 2 of a 2-part introduction to [the basic concepts of IPFS](../concepts/README.md#learn-the-basics). The first part, [IPFS and the problems it solves](../concepts/what-is-ipfs.md) defines what IPFS is and isn't, and problems it addresses. 
:::

In this conceptual guide, you'll learn about the different subsystems that IPFS is comprised of, and how they work.

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

- [Kademlia Distributed Hash Table (DHT)](#kademlia-distributed-hash-table-dht)
- [Bitswap](#bitswap)
- [mDNS](#mdns)
- [Delegated routing over HTTP](#delegated-routing-over-http)

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

IPFS nodes use Bitswap, a <VueCustomTooltip label="Unlike a request-response protocol, all nodes in the system receive every message transmitted, and decide whether the message received should be immediately discarded, stored or processed." underlined multiline is-medium>message-based protocol</VueCustomTooltip>, to fetch and send blocks of data. The process is as follows:

1. Requesting nodes broadcast a <VueCustomTooltip label="A list of the CIDs of data blocks that an IPFS node wants to receive from peers in the network." underlined>wantlist</VueCustomTooltip> message to peers in the network.
1. Peers receiving the wantlist eventually process and respond to the requester with one of the following:
   - A _have_ message, indicating the peer has a CID requested.
   - A _don't-have_ message, indicating the peer DOES NOT have a requested CID.
1. The requester sends a _want-block_ message to peers that responded with a _have_ message, which requests that the peer send the block of data specified by the requesters wantlist.
1. Peers send the block to the requester.
1. As soon as the requesting node receives the wanted block, it broadcasts a message to peers that it no longer needs the requested block.

:::callout
Peers also store wantlists, so that if a peer receives requested blocks at a later time, it can then send them to the node that originally requested the data blocks. 
:::

### mDNS

To quickly and efficiently discover peers, IPFS uses Multicast Domain Name System (mDNS), a type of <VueCustomTooltip label="A system in which human-readable internet domain names are mapped to IP addresses. The Domain Name System has been an essential component of the internet since 1985." underlined multiline is-medium>DNS</VueCustomTooltip> protocol that resolves human-readable internet domain names to IP names without the use of a <VueCustomTooltip label="Any computer application that implements a system in which human-readable internet domain names are mapped to IP addresses (DNS)." underlined multiline is-medium>name server</VueCustomTooltip>. The process for peer discovery is as follows:

1. Given a peer ID, a node broadcasts a query message to multiple peers in the network, asking that the peer having the given peer ID to identify itself.
2. The peer with the given peer ID then broadcasts a message with its IP address to other peers on the network, which can then use that information to update their own mDNS records.

The use of mDNS in IPFS has several benefits that make it a clear choice for peer discovery over traditional DNS:

- Nodes can broadcast messages requesting and reporting address information to multiple peers, increasing speed and efficiency of peer discovery
- Nodes do not rely on a centralized name server to discover other peers, improving network resilience, decentralization and censorship resistance

### Delegated routing over HTTP

Because IPFS is an open-source protocol with multiple implementations, an IPFS node is not required to implement full routing functionality itself. Instead, an IPFS node can request that a <VueCustomTooltip label="An IPFS node that perform tasks on behalf of network peers using the IPFS HTTP API." underlined multiline is-medium>delegated router</VueCustomTooltip> perform a routing task for it. For example, if an IPFS node does not implement the DHT, a delegated router can search the DHT for peers on its behalf. The main benefit of delegated routing is that nodes are not required to implement routing functionality themselves if they do not wish to, or do not have the computing resources to do so.

## How IPFS transfers data

In addition to [routing data](#how-ipfs-routes-data), nodes in the IPFS network must efficiently distribute and deliver the content addressed data, taking into account that there are some nodes in the network who already have a copy of the data, and other nodes who do not have a copy of the data, but want one. To handle the transfer of data, IPFS uses the following subsystems:

- [IPFS HTTP Gateways](#ipfs-http-gateways)
- [GraphSync]()
- [Sneakernet]()

### IPFS HTTP Gateways

HTTP Gateways allow applications that do not support or implement the IPFS protocol to interact with nodes on the IPFS network. There are multiple types of HTTP gateways, each optimized for specific tasks, and other factors like security and performance. Examples include:

- _<VueCustomTooltip label="An IPFS HTTP Gateway that can fetch data from the IPFS network using the HTTP GET method." underlined multiline is-small is-right>Read-only</VueCustomTooltip>_
- _<VueCustomTooltip label="An IPFS HTTP Gateway that can write data to the IPFS network using the HTTP POST, PUT and DELETE methods." underlined multiline is-small is-right>Writeable</VueCustomTooltip>_
- _<VueCustomTooltip label="An IPFS HTTP Gateway that can limit access to and from data on the IPFS network by acting as a reverse proxy." underlined multiline is-small is-right>Authentication</VueCustomTooltip>_

Additionally, there are multiple types of gateway providers:

- _<VueCustomTooltip label="An IPFS HTTP Gateway hosted as a local service i.e. at localhost:8080 on your local machine." underlined multiline is-small is-right>Local gateway</VueCustomTooltip>_
- _<VueCustomTooltip label="An IPFS HTTP Gateway hosted within a private network that handles access to the IPFS network for multiple computers within the private network, and may be configured to limit access to requests from specific domains." underlined multiline is-small is-right>Private gateway</VueCustomTooltip>_
- _<VueCustomTooltip label="An IPFS HTTP Gateway hosted and operated by a third-party, such as Protocol Labs." underlined multiline is-small is-right>Public gateway</VueCustomTooltip>_

### GraphSync

Lorem ipsum...

### Sneakernet

For use cases where transfer of data over a network connection is not an option, IPFS supports the use of <VueCustomTooltip label="An informal term for the transfer of data between computers through removable devices (hard drives, flash drives, optical disks, etc.), which are physically transported between computers, as opposed to transferring the data over the network." underlined multiline is-small is-right>sneakernet</VueCustomTooltip> to transfer content-addressed data between IPFS nodes. Sneakernets are a great option for data transfer in the following situations:

- Computer network maintenance is prohibitively expensive.
- Manual inspection of data for things like re-classification of information is necessary, such as a high-security environment.
- Data needs to be shared between networks with different security requirements.
- Bandwidth limitations make data transfer impractical.
- A particular system is incompatible or unable to connect with the local network, or is not on the same network. 
- Censorship circumvention is necessary.
- Data needs to be made available in places that don't have direct connections to a network.

Using IPFS, data transferred via sneakernet is [verifiable](../concepts/what-is-ipfs.md#verifiability) and will have the same CID on both sides of the air gap.

## Further reading

Lorem ipsum...