---
title: How IPFS works
description: Learn how the InterPlanetary File System (IPFS) works and why it's an essential part of the future internet.
---

# How IPFS works

 In this conceptual guide, you'll learn about the major subsystems that <VueCustomTooltip label="InterPlanetary File System"  abbreviation is-small>IPFS</VueCustomTooltip> is composed of, and how they work. The three key responsibilities of the IPFS subsystems are: 
- **Representing and addressing data**
- **Routing data**
- **Transferring data**

While these are the key responsibilities, IPFS's functionality spans beyond these three. 

Data in IPFS is addressed by its contents (<VueCustomTooltip label="A way to address data by its hash rather than its location (IPs)." underlined multiline>content addressing</VueCustomTooltip>), rather than a location, such as an IP address (location addressing).

:::callout
This guide is part 3 of a 3-part introduction to [the basic concepts of IPFS](../concepts/README.md#learn-the-basics). The first part, [What IPFS is and isn't](../concepts/what-is-ipfs.md), defines IPFS, while the second part, [**IPFS and the problems it solves**](../concepts/ipfs-solves.md), covers the problems with the internet and current protocols like HTTP that IPFS solves. 
:::

## Subsystems overview

All IPFS subsystems, ordered by purpose, are listed below, with links to the major subsystems discussed in this guide.

| Purpose | Subsystem |
| ------- | --------- |
| Representing and organizing the data | [CIDs](#content-identifier-cid), [IPLD, UnixFS](#interplanetary-linked-data-ipld), MFS, DAG-CBOR, DAG-JSON, [CAR files](#content-addressable-archive-car-files) |
| Content routing, linking between CID and IP addresses | [Kademlia DHT](#kademlia-distributed-hash-table-dht), [Delegated routing over HTTP](#delegated-routing-over-http), [Bitswap](#bitswap-for-content-routing), [mDNS](#mdns) |
| Transferring data | [Bitswap](#bitswap-for-data-transfer), [HTTP Gateways](#ipfs-http-gateways), [Sneakernet](#sneakernet), Graphsync, more in development |
| Addressing for data and peers | [Multiformats](#content-identifier-cid) |
| Bridging between IPFS and HTTP | [IPFS Gateways](#ipfs-http-gateways), Pinning API Spec |
| Peer-to-peer connectivity | libp2p (TCP, QUIC, WebRTC, WebTransport) |
| Mutability and dynamic naming | IPNS (Interplanetary Naming System), DNSLink |


## How IPFS represents and addresses data

IPFS represents data as content-addressed <VueCustomTooltip label="The term for a single unit of data in IPFS." underlined multiline is-medium>blocks</VueCustomTooltip>, and operates on those data blocks using the following subsystems:

- [Content Identifier (CID)](#content-identifier-cid)
- [InterPlanetary Linked Data (IPLD)](#interplanetary-linked-data-ipld)
- [Content Addressable aRchive (CAR) files](#content-addressable-archive-car-files)

### Content Identifier (CID)

In IPFS, data is chunked into <VueCustomTooltip label="The term for a single unit of data in IPFS." underlined multiline is-medium>blocks</VueCustomTooltip>, which are assigned a unique identifier called a <VueCustomTooltip label="An address used to point to data in IPFS, based on the content itself, as opposed to the location." underlined multiline is-medium>Content Identifier (CID)</VueCustomTooltip>.  In general, the CID is computed by combining the hash of the data with its <VueCustomTooltip label="Software capable of encoding and/or decoding data." underlined multiline is-medium>codec</VueCustomTooltip>. The codec is generated using <VueCustomTooltip label="A collection of interoperable, extensible protocols for making data self-describable." underlined multiline is-medium>Multiformats</VueCustomTooltip>.

CIDs are unique to the data from which they were computed, which provides IPFS with the following benefits:
- Data can be fetched based on its content, rather than its location. 
- The CID of the data received can be computed and compared to the CID requested, to verify that the data is what was requested.

:::callout
**Learn more**
Learn more about the concepts behind CIDs described here with the [the CID deep dive](../concepts/content-addressing.md#cid-versions).
:::


### InterPlanetary Linked Data (IPLD)

IPFS uses <VueCustomTooltip label="A set of specifications in support of decentralized, content-addressable data structures for the web." underlined multiline is-medium>InterPlanetary Linked Data (IPLD)</VueCustomTooltip> to work with CIDs and content-addressed data. IPFS uses IPLD to represent relationships between content-addressed data, such as file directories and other hierarchical structures, using a <VueCustomTooltip label="Data structured as a graph whose nodes are directionally related to each other and don’t form a directional closed loop." underlined multiline is-medium>Directed Acyclic Graph (DAG)</VueCustomTooltip> called a <VueCustomTooltip label="A special type of DAG where each node has a unique identifier that is a hash of the node's contents." underlined multiline is-medium>Merkle DAG</VueCustomTooltip>. Using IPLD for the general functionality, IPFS is able to provide a more tailored and specific mechanism for representing and addressing files, directories, and their symlinks, called [UnixFS](../concepts/file-systems.md#unix-file-system-unixfs). With UnixFS, IPFS can <VueCustomTooltip label="When an object is added to IPFS, it is split up into smaller parts, each part is hashed, and a CID is created for each part." underlined multiline is-medium>chunk</VueCustomTooltip> and link data too big to fit in a single block, and use the chunked representation to store and manage the data.

IPLD provides IPFS with the following benefits:

- The ability to represent and work with arbitrary data, whether that data is standard files and directories, linked data, a Merkle DAG, or another data type.
- Base functionality to structure, serialize, traverse and link content-addressed data, which can be leveraged by abstractions like UnixFS for more specific use cases.
- Interoperable protocols.
- Easy upgradeability.
- Backwards compatibility.

:::callout
**Learn more**
Want to learn more about IPLD? See [the official docs](https://ipld.io/docs/intro/primer/).
:::

### Content Addressable aRchive (CAR) files

IPFS uses Content Addressable aRchive (CAR) files to store and transfer a serialized archive of IPLD content-addressed data. CAR files are similar to TAR files, in that they that are designed for storing collections of content addressed data.

## How content routing works in IPFS

_Content routing_ refers to the way in which IPFS determines where to find a given CID on the network; specifically, which network peers are providing the CIDs you are requesting. In other words, a node cannot simply find data in the network with a CID alone; it requires information about the IP addresses and ports of its <VueCustomTooltip label="Programs that implement the IPFS protocol and participate in the IPFS network. Also referred to as a node." underlined multiline is-left>peers</VueCustomTooltip> on the network. To route content, IPFS uses the following subsystems:

- [Kademlia Distributed Hash Table (DHT)](#kademlia-distributed-hash-table-dht)
- [Bitswap](#bitswap-for-content-routing)
- [mDNS](#mdns)
- [Delegated routing over HTTP](#delegated-routing-over-http)

### Kademlia Distributed Hash Table (DHT)

IPFS uses Kademlia, a <VueCustomTooltip label="A decentralized data store that maps data based on key-value pairs." underlined multiline is-left>Distributed Hash Table (DHT)</VueCustomTooltip> designed for decentralized peer-to-peer networks. Kademlia helps you find peers in the IPFS network storing the data you are seeking. The Kademlia DHT can be thought of as a large table distributed across many nodes that stores information about which peers (IPs) have which data (CIDs). Kademlia provides a highly efficient, self-organizing system that withstands node churn. Kademlia uses <VueCustomTooltip label="Short for “library peer-to-peer”, libp2p is a collection of protocols, specifications, and libraries that facilitate connectivity between nodes in a peer-to-peer network." underlined multiline is-left> [libp2p](../concepts/libp2p.md)</VueCustomTooltip> to establish connectivity.

:::callout
**Learn more**

Want to learn more about Kademlia and DHTs? See the [Distributed Hash Tables (DHTs) conceptual guide](../concepts/dht.md#kademlia).
:::

### Bitswap (for content routing)

IPFS nodes use Bitswap, a <VueCustomTooltip label="Unlike a request-response protocol, all nodes in the system receive every message transmitted, and decide whether the message received should be immediately discarded, stored or processed." underlined multiline is-medium>message-based</VueCustomTooltip>,  <VueCustomTooltip label="A network of computers model in which each party has equivalent capabilities and can initiate a communication session." underlined multiline is-medium>peer-to-peer network</VueCustomTooltip> protocol for the transfer of data, that is _also_ used for routing data. With Bitswap, an IPFS node can ask any of the peers that it is connected to if they have any of the CIDs that node is looking for, all without traversing the [Kademlia DHT](#kademlia-distributed-hash-table-dht). Peers also store wantlists, so that if a peer receives the requested data at a later time, it can then send it to the node that originally requested. Like Kademlia, Bitswap uses <VueCustomTooltip label="Short for “library peer-to-peer”, libp2p is a collection of protocols, specifications, and libraries that facilitate connectivity between nodes in a peer-to-peer network." underlined multiline is-left> [libp2p](../concepts/libp2p.md)</VueCustomTooltip> to establish connectivity. 

:::callout
**Learn more**

Want to learn more about Bitswap? See the [Bitswap deep dive](../concepts/bitswap.md).

:::

### Delegated routing over HTTP

Delegated content routing is a mechanism for IPFS implementations to use for offloading content routing to another process/server using an HTTP API. For example, if an IPFS node does not implement the DHT, a delegated router can search the DHT for peers on its behalf. The main benefit of delegated routing is that nodes are not required to implement routing functionality themselves if they do not have the computing resources to do so, or wish to build an IPFS system with a custom backend for routing. So, delegated routing over HTTPS provides IPFS nodes with a standard interface that allows more flexibility in terms of how content routing works. 

:::callout
**Learn more**

For further information, see the [Delegated Content Routing HTTP API spec](https://specs.ipfs.tech/ipips/ipip-0337/)..

:::

### mDNS

To quickly and efficiently discover peers in local networks, IPFS uses Multicast Domain Name System (mDNS), a type of <VueCustomTooltip label="A system in which human-readable internet domain names are mapped to IP addresses." underlined multiline is-medium>DNS</VueCustomTooltip> protocol that resolves human-readable internet domain names to IP names without the use of a <VueCustomTooltip label="Any computer application that implements a system in which human-readable internet domain names are mapped to IP addresses (DNS)." underlined multiline is-medium>name server</VueCustomTooltip>.

The use of mDNS enables quick and efficient discovery of IPFS nodes in local networks without any coordination, e.g., without internet connectivity or access to [bootstrap nodes](./nodes.md#bootstrap).

## How IPFS transfers data

In addition to [routing data](#how-content-routing-works-in-ipfs), nodes in the IPFS network must efficiently distribute and deliver the content addressed data, taking into account that there are some nodes in the network who already have a copy of the data, and other nodes who do not have a copy of the data, but want one. To handle the transfer of data, IPFS uses the following subsystems:

- [Bitswap](#bitswap-for-data-transfer)
- [IPFS HTTP Gateways](#ipfs-http-gateways)
- [Sneakernet](#sneakernet)

### Bitswap (for data transfer)

As discussed in [How content routing works in IPFS](#bitswap-for-content-routing), IPFS nodes use Bitswap, a <VueCustomTooltip label="Unlike a request-response protocol, all nodes in the system receive every message transmitted, and decide whether the message received should be immediately discarded, stored or processed." underlined multiline is-medium>message-based</VueCustomTooltip>,  <VueCustomTooltip label="A network of computers model in which each party has equivalent capabilities and can initiate a communication session." underlined multiline is-medium>peer-to-peer network</VueCustomTooltip> protocol for both content routing and the transfer of data. With Bitswap, any peers that an IPFS node is connected to can transfer requested blocks directly to that node without needing to traverse the [DHT](#kademlia-distributed-hash-table-dht). Peers also store wantlists, so that if a peer receives requested data at a later time, it can then transfer it to the node that originally requested.

:::callout
**Learn more**

Want to learn more about Bitswap? See the [Bitswap deep dive](../concepts/bitswap.md).
:::

### IPFS HTTP Gateways

HTTP Gateways allow applications that do not support or implement all IPFS subsystems to fetch data from the IPFS network using an HTTP interface. In its simplest form, a gateway is an IPFS Node that also exposes an [HTTP Gateway API](https://github.com/ipfs/specs/blob/main/http-gateways/README.md).

:::callout
**Learn more**

Want to learn more about IPFS Gateways? See the [IPFS Gateway conceptual guide](../concepts/ipfs-gateway.md).
:::

### Sneakernet

For use cases where transfer of data over a network connection is not an option, IPFS supports the use of <VueCustomTooltip label="An informal term for the transfer of data between computers through removable devices (hard drives, flash drives, optical disks, etc.), which are physically transported between computers, as opposed to transferring the data over the network." underlined multiline is-small is-right>sneakernet</VueCustomTooltip> to transfer content-addressed data between IPFS nodes. Using IPFS, CAR files (discussed in [How IPFS represents and addresses data](#content-addressable-archive-car-files)) can be transferred between two network drives without any network connectivity. Because of IPFS, the data is [verifiable](../concepts/what-is-ipfs.md#verifiability) and will have the same CID on both sides of the air gap.

## Further reading

- Are you looking for a deep dive into the design, architecture and theory of IPFS? See the [original IPFS whitepaper](../concepts/further-reading/academic-papers.md#ipfs---content-addressed-versioned-p2p-file-system).
- Dive deeper into the related concepts of [immutability](../concepts/immutability.md), [hashing](../concepts/hashing.md), [content-addressing and CIDs](../concepts/content-addressing.md).
- Learn about [IPFS pinning, along with the differences between persistence, permanence, and pinning](../concepts/persistence.md).
- Understand [privacy and encryption in IPFS](../concepts/privacy-and-encryption.md).
- Learn more about [IPFS nodes, including the different types](../concepts/nodes.md).
