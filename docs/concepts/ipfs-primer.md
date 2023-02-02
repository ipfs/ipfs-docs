---
title: "Basic Concepts"
description: "This page gives a high-level overview of what IPFS is and how it works."
sidebarDepth: 3
---

# What is IPFS?

IPFS is a modular suite of protocols and standards for organizing and moving data, designed from the ground up with the principles of <VueCustomTooltip label="A way to address data by its hash rather than its location (IPs)." underlined>content addressing</VueCustomTooltip> and peer-to-peer networking.

IPFS can be thought of as both the implementations of the IPFS specs (like <VueCustomTooltip label="The earliest and most widely used implementation of IPFS, written in Go." underlined>Kubo</VueCustomTooltip>) and the decentralized network comprised of <VueCustomTooltip label="Computers participating in the IPFS network by running an IPFS implementation ." underlined>IPFS nodes</VueCustomTooltip>. IPFS _is not_ a blockchain.

In this conceptual guide, you'll learn about the problems that IPFS addresses and how the different subsystems that IPFS is comprised of work.

- [Problems that IPFS addresses](#problems-that-ipfs-addresses)
- [How IPFS represents data](#how-ipfs-represents-data)

## Problems that IPFS addresses

IPFS seeks to address problems with the current web and existing data representation / routing / transfer protocols like <VueCustomTooltip label="A protocol for transferring data over the internet, mainly used for web browsing. It enables communication between a client (e.g. a web browser) and a server, where the client sends a request and the server returns a response with the requested information." underlined multiline is-medium>HTTP</VueCustomTooltip> including:

- [Centralization](#centralization)
- [Performance](#performance)
- [Scalability](#scalablity)
- [Link rot](#link-rot)
- [Security](#security)
- [Data sovereignty and ownership](#data-sovereignty)
- [Verifiable off-chain storage](#verifiable-off-chain-storage)
- [Local-first software](#local-first-software)
- [Vendor lock-in](#vendor-lock-in)

### Centralization

IPFS is an open-source, decentralized system that eliminates the need for a central authority, making it more resilient and censorship-resistant than traditional centralized systems. No single entity or person controls, manages or owns IPFS; rather, it is a community-maintained project with multiple implementations of the protocol, multiple tools and apps leveraging that protocol, and multiple users and organizations contributing to it's design and development.

### Performance

IPFS provides faster access to data by storing it at multiple locations, and allowing users to access it from the nearest location using content addressing instead of <VueCustomTooltip label="Data identified and linked to by it's location. An example is HTTP." underlined>location-based addressing</VueCustomTooltip>. In other words, because data can be addressed based on it's contents, a node on the network can fetch that data from _any_ other node in the netork that has the data; thus, performance issues like latency are reduced. 

### Scalability

IPFS has no single point of failure, and users do not need to trust each other. In other words, the failure of a single or even multiple nodes in the network does not affect the functioning of the entire network, and 

### Link rot

IPFS eliminates the problem of broken links by allowing data to be addressed by its content, rather than by its location.

### Security

IPFS uses <VueCustomTooltip label="A function that takes some arbitrary input (content) and returns a fixed-length value. The exact same input data will always generate the same hash as output. There are numerous hash algorithms." underlined multiline is-medium>cryptographic hashes</VueCustomTooltip> to ensure the authenticity and integrity of files, making it difficult for malicious actors to tamper with or delete files.

### Data sovereignty 

IPFS protects <VueCustomTooltip label="The idea that individuals or organizations have control over their own data and the ability to determine who can access and use it." underlined multiline is-medium>data sovereignty</VueCustomTooltip> by enabling users to store and access data directly on a decentralized network of nodes, rather than centralized, third-party servers. This eliminates the need for intermediaries to control and manage data, giving users full control and ownership over their data.

### Verifiable off-chain storage

IPFS enables verifiable <VueCustomTooltip label="Storage outside of a blockchain for data processed by the blockchain. Used to store large amounts of data that would be inefficient to store directly on a blockchain, improving scalability and efficiency." underlined multiline is-medium>off-chain storage</VueCustomTooltip> by linking the off-chain data to an IPFS content-addressed data identifier (a <VueCustomTooltip label="An address used to point to data in IPFS, based on the content itself, as opposed to the location." underlined multiline is-medium>Content IDentifier (CID)</VueCustomTooltip>, explained in [How IPFS works](#content-identifier-cid)), which is stored on the IPFS network. This identifier contains a cryptographic hash of the data, allowing anyone to verify the integrity of the data without having to retrieve the data.

### Local-first software

IPFS benefits <VueCustomTooltip label="Software in which data is stored and processed locally, and is then synchronized and shared with other devices when a network connection is available. By keeping data local, local-first software reduces dependency on internet connectivity, and emphasizes data sovereignty and privacy." underlined multiline is-medium>local-first software</VueCustomTooltip> by providing a performant, decentralized, peer-to-peer data addressing, routing, and transfer protocol that prioritizes data storage and processing on individual devices. With IPFS, data can be stored, verified and processed locally, and then synchronized and shared with other IPFS nodes when a network connection is available.

### Vendor lock-in

IPFS prevents <VueCustomTooltip label="When a user is forced to continue using a product (such as a cloud computing service), because switching to another vendor is impractical, costly, legally constrained, or technically non-trivial / incompatible." underlined multiline is-medium>vendor lock-in</VueCustomTooltip> , as users have sovereignty over their data and infrastructure. In addition, because IPFS is open-source, community-maintained and modular, users are not obligated to use a particular subsystem (described in [How IPFS works](#how-ipfs-works)). Instead, users can customize IPFS to accomodate their preferred technologies, needs and values.

## How IPFS works

Data in IPFS is addressed by its contents (content addressing), rather than a location such as a server address (location addressing). Various subsystems in IPFS are responsible for addressing, routing, and transferring content-addressed data.

### How IPFS represents data

IPFS represents data as content-addressed <VueCustomTooltip label="The term for a single unit of data in IPFS." underlined multiline is-medium>blocks</VueCustomTooltip>, and operates on those data blocks using the following subsystems:

- [Content IDentifier (CID)](#content-identifier-cid)
- [InterPlanetary Linked Data (IPLD)](#interplanetary-linked-data-ipld)
- [Content Addressable aRchive (CAR) files](#content-addressable-archive-car-files)

#### Content IDentifier (CID)

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


#### InterPlanetary Linked Data (IPLD)

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

#### Content Addressable aRchive (CAR) files

IPFS uses Content Addressable aRchive (CAR) files to store and transfer a serialized archive of IPLD content-addressed data. CAR files are similar to TAR files, in that they that are designed for storing collections of content addressed data.

### How IPFS routes data

While [the subsystems described above](#how-ipfs-represents-data) handle the representation of data, IPFS needs to route the data between <VueCustomTooltip label="Programs that implement the IPFS protocol and participate in the IPFS network. Also referred to as a peer." underlined>nodes</VueCustomTooltip> in the network. In other words, a node cannot simply find data in the network with a CID alone; it requires information about the IP addresses and ports of its <VueCustomTooltip label="Programs that implement the IPFS protocol and participate in the IPFS network. Also referred to as a node." underlined multiline is-left>peers</VueCustomTooltip>  on the network. To handle the routing of data, IPFS uses the following subsystems:

- [Kademlia Distributed Hash Table (DHT)]()
- [Bitswap]()
- [mDNS]()
- [Delegated routing over HTTP]()

#### Kademlia Distributed Hash Table (DHT)

IPFS uses Kademlia, a <VueCustomTooltip label="A decentralized data store that maps data based on key-value pairs." underlined multiline is-left>Distributed Hash Table (DHT)</VueCustomTooltip> designed for decentralized peer-to-peer computer networks. Kademlia is used to map what the user is looking for to the peer that is storing the matching content. The Kademlia DHT can be thought as a huge table that stores information on who has what data, and where that data might be located. The Kademlia DHT provides IPFS with:

- A catalog and a navigation system for data on the IPFS network
- Logic for handling undialable peers
- Logic for refreshing the list of peers
- Logic for dropping peers from the DHT if they are inactive or not offline

:::callout
**Learn more**
Want to learn more about Kademlia and DHTs? See the [the Distributed Hash Tables (DHTs) conceptual guide](../concepts/dht.md#kademlia).
:::

#### Bitswap

Lorem ipsum...

#### mDNS

Lorem ipsum...

#### Delegated routing over HTTP

Lorem ipsum...

### How IPFS transfers data

In addition to [routing data](#how-ipfs-routes-data), nodes in the IPFS network must efficiently distribute and deliver the content addressed data, taking into account that there are some nodes in the network who already have a copy of the data, and other nodes who do not have a copy of the data, but want one. To handle the transfer of data, IPFS uses the following subsystems:

- [Bitswap]()
- [IPFS HTTP Gateways]()
- [GraphSync]()
- [Sneakernet]()

#### Bitswap

Lorem ipsum...

#### IPFS HTTP Gateways

Lorem ipsum...

#### GraphSync

Lorem ipsum...

#### Sneakernet

Lorem ipsum...

## Learn more 

Lorem ipsum...