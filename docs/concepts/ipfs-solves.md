---
title: IPFS and the problems it solves
description:  Learn about the problems that IPFS solves.
---

# IPFS and the problems it solves

IPFS seeks to address problems with the current web and existing data representation / routing / transfer protocols like <VueCustomTooltip label="A protocol for transferring data over the internet, mainly used for web browsing. It enables communication between a client (e.g. a web browser) and a server, where the client sends a request and the server returns a response with the requested information." underlined multiline is-medium>HTTP</VueCustomTooltip> including:

- [Verifiability](#verifiability)
- [Resilience](#resilience)
- [Centralization](#centralization)
- [Performance](#performance)
- [Link rot](#link-rot)
- [Data sovereignty and ownership](#data-sovereignty)
- [Off-chain storage](#off-chain-storage)
- [Local-first software](#local-first-software)
- [Vendor lock-in](#vendor-lock-in)

In this guide, you'll learn about each of the problems that IPFS solves.

:::callout
This guide is part 2 of a 3-part introduction to [the basic concepts of IPFS](../concepts/README.md#learn-the-basics). The third part, [**How IPFS Works**](../concepts/how-ipfs-works.md), covers the different subsystems that IPFS is composed of and how each one functions.
:::

## Verifiability

IPFS uses <VueCustomTooltip label="A function that takes some arbitrary input (content) and returns a fixed-length value. The exact same input data will always generate the same hash as output. There are numerous hash algorithms." underlined multiline is-medium>cryptographic hashes</VueCustomTooltip> to verify the authenticity and integrity of files, making it difficult for malicious actors to tamper with or delete files.

## Resilience 

IPFS has no single point of failure, and users do not need to trust each other. In other words, the failure of a single or even multiple nodes in the network does not affect the functioning of the entire network, and an IPFS node can fetch data from the network as long as at least one other node in the network has that data, regardless of its location.

## Centralization

IPFS is an open, distributed and participatory network that reduces data silos from centralized servers, making IPFS more resilient than traditional systems. No single entity or person controls, manages or owns IPFS; rather, it is a community-maintained project with multiple implementations of the protocol, multiple tools and apps leveraging that protocol, and multiple users and organizations contributing to its design and development.

## Performance

IPFS provides faster access to data by enabling it to be replicated to and retrieved from multiple locations, and allowing users to access data from the nearest location using content addressing instead of <VueCustomTooltip label="Data identified and linked to by its location. An example is HTTP." underlined multiline>location-based addressing</VueCustomTooltip>. In other words, because data can be addressed based on its contents, a node on the network can fetch that data from _any_ other node in the network that has the data; thus, performance issues like latency are reduced. 

## Link rot

IPFS eliminates the problem of <VueCustomTooltip label="The tendency for hyperlinks over time to cease pointing to their targeted file, web page, or server due to relocation of the resource to a new address, or the resource becoming permanently unavailable." underlined multiline>link rot</VueCustomTooltip> by allowing data to be addressed by its content, rather than by its location. So, in other words, content in IPFS is still reachable regardless of its location, and does not depend on specific servers being available.

## Data sovereignty 

IPFS protects <VueCustomTooltip label="The idea that individuals or organizations have control over their own data and the ability to determine who can access and use it." underlined multiline is-medium>data sovereignty</VueCustomTooltip> by enabling users to store and access data directly on a decentralized network of nodes, rather than centralized, third-party servers. This eliminates the need for intermediaries to control and manage data, giving users full control and ownership over their data.

## Off-chain storage

IPFS enables verifiable <VueCustomTooltip label="Storage outside of a blockchain for data processed by the blockchain. Used to store large amounts of data that would be infeasible to store directly on a blockchain, improving scalability and efficiency." underlined multiline is-medium>off-chain storage</VueCustomTooltip> by creating a link between blockchain state and content-addressed published to IPFS. This works by storing a <VueCustomTooltip label="An address used to point to data in IPFS, based on the content itself, as opposed to the location." underlined multiline is-medium>Content IDentifier (CID)</VueCustomTooltip> (explained in [How IPFS works](../concepts/how-ipfs-works.md#content-identifier-cid)) in a smart contract. 

## Local-first software

IPFS benefits <VueCustomTooltip label="Software in which data is stored and processed locally, and is then synchronized and shared with other devices when a network connection is available. By keeping data local, local-first software reduces dependency on internet connectivity, and emphasizes data sovereignty and privacy." underlined multiline is-medium>local-first software</VueCustomTooltip> by providing a performant, decentralized, peer-to-peer data addressing, routing, and transfer protocol that prioritizes data storage and processing on individual devices. With IPFS, data can be stored, verified and processed locally, and then synchronized and shared with other IPFS nodes when a network connection is available.

## Vendor lock-in

IPFS prevents <VueCustomTooltip label="When a user is forced to continue using a product (such as a cloud computing service), because switching to another vendor is impractical, costly, legally constrained, or technically non-trivial / incompatible." underlined multiline is-medium>vendor lock-in</VueCustomTooltip> , as users have sovereignty over their data and infrastructure. This is enabled by content-addressing, which decouples the data from a single location or infrastructure provider. Unlike traditional cloud vendors, IPFS enables you to change data storage locations without changing things like APIs and data management. In addition, because IPFS is open-source, community-maintained and modular, users are not obligated to use a particular subsystem (described in [How IPFS works](../concepts/how-ipfs-works.md)). Instead, users can customize IPFS for their preferred technologies, needs and values.

## Further reading

- New to IPFS and wanting to dive deeper into the different subsystems that IPFS is composed of and how each one works? See part 3, [**How IPFS Works**](how-ipfs-works.md), of the [introduction to the basic concepts of IPFS](README.md#learn-the-basics)
- Are you looking for a list of implementations of the IPFS protocol, as well as more information on each implementation? See the [IPFS Implementations page](ipfs-implementations.md).
- Are you interested in comparing IPFS to other similar technologies? See the [IPFS Comparisons page](comparisons.md).
