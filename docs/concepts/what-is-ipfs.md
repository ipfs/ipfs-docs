---
title: What is IPFS?
description:  Learn about the problems that IPFS addresses, what IPFS is and isn't, and how the different subsystems that IPFS is comprised of work.
---

# What is IPFS?

IPFS is a modular suite of <VueCustomTooltip label="A set of standards, rules or procedures for transmitting data between computers, including how the information will be structured and how each computer will send and receive it. Notable examples include TCP/IP, HTTP/S, SMTP, and DNS." underlined multiline is-medium is-bottom>protocols</VueCustomTooltip> for organizing and moving data, designed from the ground up with the principles of <VueCustomTooltip label="A way to address data by its hash rather than its location (IPs)." underlined multiline>content addressing</VueCustomTooltip> and <VueCustomTooltip label="A network of computers model in which each party has equivalent capabilities and can initiate a communication session." underlined multiline is-medium>peer-to-peer networking</VueCustomTooltip>. Because IPFS is <VueCustomTooltip label="Software released under a license that grants users the rights to use, study, change, and distribute the software and its source code to anyone and for any purpose. Open-source software is often developed in a collaborative public manner that encourages contributions from users." underlined multiline is-medium>open-source</VueCustomTooltip>, there are multiple <VueCustomTooltip label="Software, written in any programming language, with functionality to process and transmit content-addressed data as specified by the IPFS protocol. Some implementations are optimized for specific use cases or devices, or use different subsystems to handle content-addressed data." underlined multiline is-medium>implementations</VueCustomTooltip> of IPFS. 

:::callout
This guide is part 1 of a 2-part introduction to [the basic concepts of IPFS](../concepts/README.md#learn-the-basics). The second part, [**How IPFS Works**](../concepts//how-ipfs-works.md), covers the different subsystems that IPFS is comprised of and how each one works.
:::

In this conceptual guide, you'll learn:

- [What IPFS is and isn't](#definining-ipfs)
- [Problems that IPFS addresses](#problems-that-ipfs-addresses)

## Definining IPFS

The term _IPFS_ can refer to multiple concepts:

- Software that implements the IPFS protocol specification (like <VueCustomTooltip label="The first implementation of IPFS, written in Go." underlined multiline>Kubo</VueCustomTooltip>) 
- A 
<VueCustomTooltip label="A network of computers in which multiple servers act as a single processing point, without having a central server to manage network activity." underlined multiline is-medium>decentralized network</VueCustomTooltip> comprised of <VueCustomTooltip label="Computers participating in an IPFS network by running an IPFS implementation. Also referred to as peers" underlined multiline>IPFS nodes</VueCustomTooltip> that anyone can join.
- A modular suite of protocols and standards for organizing and moving content-addressed data.

### What IPFS _isn't_

While IPFS shares similarities with, and is often used in architectures with the systems described below, IPFS is _not_:

- A _storage provider_: Rather, IPFS  provides a modular suite of protocols and standards for organizing and moving content-addressed data, which many storage solutions and other applications use as a fundamental part of their architecture.
- _A <VueCustomTooltip label="An organization that provides its users with on-demand computing resources, such as databases and storage, over the internet." underlined multiline is-medium>cloud service provider</VueCustomTooltip>_: IPFS can be deployed on and complement cloud infrastructure, but it in of itself is not a cloud service provider.

:::callout
**Learn more**
- To learn how IPFS is used by storage networks and other applications, see the [usage ideas and examples](../concepts/usage-ideas-examples.md).
- Looking for a deeper dive on IPFS compared to other similar technologies? See the [IPFS Comparisons page](../concepts/comparisons.md).
:::

## Problems that IPFS addresses

IPFS seeks to address problems with the current web and existing data representation / routing / transfer protocols like <VueCustomTooltip label="A protocol for transferring data over the internet, mainly used for web browsing. It enables communication between a client (e.g. a web browser) and a server, where the client sends a request and the server returns a response with the requested information." underlined multiline is-medium>HTTP</VueCustomTooltip> including:

- [Centralization](#centralization)
- [Performance](#performance)
- [Scalability](#scalablity)
- [Link rot](#link-rot)
- [Verifiability](#verifiability)
- [Data sovereignty and ownership](#data-sovereignty)
- [Off-chain storage](#off-chain-storage)
- [Local-first software](#local-first-software)
- [Vendor lock-in](#vendor-lock-in)

### Centralization

IPFS is an open-source, decentralized system that eliminates the need for a central authority, making it more resilient and censorship-resistant than traditional centralized systems. No single entity or person controls, manages or owns IPFS; rather, it is a community-maintained project with multiple implementations of the protocol, multiple tools and apps leveraging that protocol, and multiple users and organizations contributing to it's design and development.

### Performance

IPFS provides faster access to data by enabling it to be replicated to and retreived from multiple locations, and allowing users to access data from the nearest location using content addressing instead of <VueCustomTooltip label="Data identified and linked to by it's location. An example is HTTP." underlined multiline>location-based addressing</VueCustomTooltip>. In other words, because data can be addressed based on it's contents, a node on the network can fetch that data from _any_ other node in the netork that has the data; thus, performance issues like latency are reduced. 

### Resilience 

IPFS has no single point of failure, and users do not need to trust each other. In other words, the failure of a single or even multiple nodes in the network does not affect the functioning of the entire network, and an IPFS node can fetch data from the network as long as at least one other node in the network has that data, regardless of its location.

### Link rot

IPFS eliminates the problem of <VueCustomTooltip label="The tendency for hyperlinks over time to cease pointing to their targeted file, web page, or server due to relocation of the resource to a new address, or the resource becoming permanently unavailable." underlined multiline>link rot</VueCustomTooltip> by allowing data to be addressed by its content, rather than by its location. So, in other words, content in IPFS is still reachable regardless of its location, and does not depend on specific servers being available.

### Verifiability

IPFS uses <VueCustomTooltip label="A function that takes some arbitrary input (content) and returns a fixed-length value. The exact same input data will always generate the same hash as output. There are numerous hash algorithms." underlined multiline is-medium>cryptographic hashes</VueCustomTooltip> to verify the authenticity and integrity of files, making it difficult for malicious actors to tamper with or delete files.

### Data sovereignty 

IPFS protects <VueCustomTooltip label="The idea that individuals or organizations have control over their own data and the ability to determine who can access and use it." underlined multiline is-medium>data sovereignty</VueCustomTooltip> by enabling users to store and access data directly on a decentralized network of nodes, rather than centralized, third-party servers. This eliminates the need for intermediaries to control and manage data, giving users full control and ownership over their data.

### Off-chain storage

IPFS enables verifiable <VueCustomTooltip label="Storage outside of a blockchain for data processed by the blockchain. Used to store large amounts of data that would be infeasible to store directly on a blockchain, improving scalability and efficiency." underlined multiline is-medium>off-chain storage</VueCustomTooltip> by creating a link between blockchain state and content-addressed published to IPFS. This works by storing a <VueCustomTooltip label="An address used to point to data in IPFS, based on the content itself, as opposed to the location." underlined multiline is-medium>Content IDentifier (CID)</VueCustomTooltip>(explained in [How IPFS works](#content-identifier-cid)) in a smart contract. 

### Local-first software

IPFS benefits <VueCustomTooltip label="Software in which data is stored and processed locally, and is then synchronized and shared with other devices when a network connection is available. By keeping data local, local-first software reduces dependency on internet connectivity, and emphasizes data sovereignty and privacy." underlined multiline is-medium>local-first software</VueCustomTooltip> by providing a performant, decentralized, peer-to-peer data addressing, routing, and transfer protocol that prioritizes data storage and processing on individual devices. With IPFS, data can be stored, verified and processed locally, and then synchronized and shared with other IPFS nodes when a network connection is available.

### Vendor lock-in

IPFS prevents <VueCustomTooltip label="When a user is forced to continue using a product (such as a cloud computing service), because switching to another vendor is impractical, costly, legally constrained, or technically non-trivial / incompatible." underlined multiline is-medium>vendor lock-in</VueCustomTooltip> , as users have sovereignty over their data and infrastructure. This is enabled by content-addressing, which decouples the data from a single location or infrastructure provider. Unlike traditional cloud vendors, IPFS enables you to change data storage locations without changing things like APIs and data management. In addition, because IPFS is open-source, community-maintained and modular, users are not obligated to use a particular subsystem (described in [How IPFS works](#how-ipfs-works)). Instead, users can customize IPFS to accomodate their preferred technologies, needs and values.

## Further reading

- New to IPFS and wanting to dive deeper into the different subsystems that IPFS is comprised of and how each one works? See part 2, [**How IPFS Works**](../concepts//how-ipfs-works.md), of the [introduction to the basic concepts of IPFS](../concepts/README.md#learn-the-basics)
- Are you looking for a list of implementations of the IPFS protocol, as well as more information on each implementation? See the [IPFS Implementations page](../concepts/ipfs-implementations.md).
- Do you want to learn how IPFS is used by storage networks and other applications, or looking for inspiration for your own IPFS application? See the [usage ideas and examples](../concepts/usage-ideas-examples.md).
- Are you interested in comparing IPFS to other similar technologies? See the [IPFS Comparisons page](../concepts/comparisons.md).