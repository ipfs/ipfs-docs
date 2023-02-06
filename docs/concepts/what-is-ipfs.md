---
title: What is IPFS?
description:  Learn about the problems that IPFS addresses, what IPFS is and isn't, and how the different subsystems that IPFS is comprised of work.
---

# What is IPFS?

IPFS is a modular suite of protocols and standards for organizing and moving data, designed from the ground up with the principles of <VueCustomTooltip label="A way to address data by its hash rather than its location (IPs)." underlined>content addressing</VueCustomTooltip> and peer-to-peer networking. 

:::callout
This guide is part 1 of a 2-part introduction to the basic concepts of IPFS. See the second part: [**How IPFS Works**](../concepts//how-ipfs-works.md), which covers how the different subsystems that IPFS is comprised and how they work.
:::

In this conceptual guide, you'll learn:

- [What IPFS is and isn't](#definining-ipfs)
- [Problems that IPFS addresses](#problems-that-ipfs-addresses)

## Definining IPFS

The term _IPFS_ can refer to multiple concepts:

- Software that implements the IPFS protocol specification (like <VueCustomTooltip label="The first implementation of IPFS, written in Go." underlined>Kubo</VueCustomTooltip>) 
- A decentralized network comprised of <VueCustomTooltip label="Computers participating in an IPFS network by running an IPFS implementation. Also referred to as peers" underlined>IPFS nodes</VueCustomTooltip> that anyone can join.
- A modular suite of protocols and standards for organizing and moving content-addressed data.

### What IPFS _isn't_

While IPFS shares similarities with, and is often used in architectures with the systems described below, IPFS is _not_:

- _A <VueCustomTooltip label="A list of records, known as blocks, linked using cryptography. Each block contains a cryptographic hash of the previous block, a timestamp, and transaction data." underlined multiline is-medium>blockchain</VueCustomTooltip>_: While IPFS and blockchains do share some concepts and technologies (the use of <VueCustomTooltip label="A function that takes some arbitrary input (content) and returns a fixed-length value. The exact same input data will always generate the same hash as output. There are numerous hash algorithms." underlined multiline is-medium>cryptographic hashes</VueCustomTooltip>, decentralization, verifiability of data, etc.), and IPFS is is used for [verifiable off-chain storage](#verifiable-off-chain-storage), IPFS is not a blockchain.
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
- [Security](#security)
- [Data sovereignty and ownership](#data-sovereignty)
- [Verifiable off-chain storage](#verifiable-off-chain-storage)
- [Local-first software](#local-first-software)
- [Vendor lock-in](#vendor-lock-in)

### Centralization

IPFS is an open-source, decentralized system that eliminates the need for a central authority, making it more resilient and censorship-resistant than traditional centralized systems. No single entity or person controls, manages or owns IPFS; rather, it is a community-maintained project with multiple implementations of the protocol, multiple tools and apps leveraging that protocol, and multiple users and organizations contributing to it's design and development.

### Performance

IPFS provides faster access to data by storing it at multiple locations, and allowing users to access it from the nearest location using content addressing instead of <VueCustomTooltip label="Data identified and linked to by it's location. An example is HTTP." underlined>location-based addressing</VueCustomTooltip>. In other words, because data can be addressed based on it's contents, a node on the network can fetch that data from _any_ other node in the netork that has the data; thus, performance issues like latency are reduced. 

### Resilience 

IPFS has no single point of failure, and users do not need to trust each other. In other words, the failure of a single or even multiple nodes in the network does not affect the functioning of the entire network, and 

### Link rot

IPFS eliminates the problem of broken links by allowing data to be addressed by its content, rather than by its location.

### Security

IPFS uses <VueCustomTooltip label="A function that takes some arbitrary input (content) and returns a fixed-length value. The exact same input data will always generate the same hash as output. There are numerous hash algorithms." underlined multiline is-medium>cryptographic hashes</VueCustomTooltip> to ensure the authenticity and integrity of files, making it difficult for malicious actors to tamper with or delete files.

### Data sovereignty 

IPFS protects <VueCustomTooltip label="The idea that individuals or organizations have control over their own data and the ability to determine who can access and use it." underlined multiline is-medium>data sovereignty</VueCustomTooltip> by enabling users to store and access data directly on a decentralized network of nodes, rather than centralized, third-party servers. This eliminates the need for intermediaries to control and manage data, giving users full control and ownership over their data.

### Verifiable off-chain storage

IPFS enables verifiable <VueCustomTooltip label="Storage outside of a blockchain for data processed by the blockchain. Used to store large amounts of data that would be infeasible to store directly on a blockchain, improving scalability and efficiency." underlined multiline is-medium>off-chain storage</VueCustomTooltip> by creating a link between blockchain state and content-addressed published to IPFS. This works by storing a <VueCustomTooltip label="An address used to point to data in IPFS, based on the content itself, as opposed to the location." underlined multiline is-medium>Content IDentifier (CID)</VueCustomTooltip>(explained in [How IPFS works](#content-identifier-cid)) in a smart contract. 

### Local-first software

IPFS benefits <VueCustomTooltip label="Software in which data is stored and processed locally, and is then synchronized and shared with other devices when a network connection is available. By keeping data local, local-first software reduces dependency on internet connectivity, and emphasizes data sovereignty and privacy." underlined multiline is-medium>local-first software</VueCustomTooltip> by providing a performant, decentralized, peer-to-peer data addressing, routing, and transfer protocol that prioritizes data storage and processing on individual devices. With IPFS, data can be stored, verified and processed locally, and then synchronized and shared with other IPFS nodes when a network connection is available.

### Vendor lock-in

IPFS prevents <VueCustomTooltip label="When a user is forced to continue using a product (such as a cloud computing service), because switching to another vendor is impractical, costly, legally constrained, or technically non-trivial / incompatible." underlined multiline is-medium>vendor lock-in</VueCustomTooltip> , as users have sovereignty over their data and infrastructure. In addition, because IPFS is open-source, community-maintained and modular, users are not obligated to use a particular subsystem (described in [How IPFS works](#how-ipfs-works)). Instead, users can customize IPFS to accomodate their preferred technologies, needs and values.

