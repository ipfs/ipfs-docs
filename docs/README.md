---
title: IPFS Documentation
description: The home page for developer documentation for IPFS, the InterPlanetary File System.
---

# Welcome to the IPFS docs

The InterPlanetary File System (IPFS) is a set of composable, peer-to-peer protocols for addressing, routing, and transferring [content-addressed](concepts/glossary.md#content-addressing) data in a decentralized file system. Many popular Web3 projects are built on IPFS - see the [ecosystem directory](https://ecosystem.ipfs.tech) for a list of some of these projects.

## Get started

You can quickly [store and retrieve data](#store-and-retrieve-data) and [interact with the network via a simple GUI app or a standard browser](#interact-with-the-network). If you'd rather develop applications, learn how to build IPFS-native apps or use standard HTTP in the [Build](#build) section.

:::callout
New to IPFS? Start with
[the 3-page Basic Concepts](./concepts/README.md#learn-the-basics).
:::

### Store and retrieve data

Quickly store data and retrieve data, no complex applications or programming required:

- Publish content to the IPFS network with a pinning service by following this [quickstart guide](./quickstart/publish.md).
- Fetch data via it's <VueCustomTooltip label="An address used to point to data in IPFS, based on the content itself, as opposed to the location." underlined multiline is-medium>content identifier (CID)</VueCustomTooltip> [using an IPFS gateway](./quickstart/retrieve.md#fetching-the-cid-with-an-ipfs-gateway).
- For long-term storage, use [Filecoin](https://docs.filecoin.io/), the peer-to-peer network with built-in economic incentives that stores data on IPFS.

### Interact with the network 

You can quickly interact the IPFS network using a simple GUI or a standard browser:

- For a simple, easy-to-use GUI application that bundles an IPFS node, file manager, peer manager, and content explorer, use [IPFS Desktop](./install/ipfs-desktop.md).
- Interact with the network using any Brave, Chrome, Edge, Firefox, Opera, and any other Chromium-based web browser using the [IPFS Companion browser extension](./install/ipfs-companion.md).

### Build

You can build apps that leverage IPFS implementations, or use HTTP instead:

#### Using IPFS

Build an IPFS-native app using one of the many IPFS <VueCustomTooltip label="Software, written in any programming language, with functionality to process and transmit content-addressed data. Some implementations are optimized for specific use cases or devices, or use different subsystems to handle content-addressed data. There are multiple specifications in IPFS for handling content-addressed data, and not all implementations implement them." underlined multiline is-medium>implementations</VueCustomTooltip> and tools built by and for Web3 users:

- To develop IPFS applications using Go and/or interact with IPFS from the terminal, use the [IPFS Kubo implementation in Go](./install/command-line.md). 
- If you'd rather use JavaScript, try the [IPFS Helia implementation in JavaScript](https://github.com/ipfs/helia).
- Try any of the [many other tools and implementations](./concepts/ipfs-implementations.md), which are written in different languages and tailored to specific needs and use cases.

#### Using HTTP

Connect your Web2 application to the IPFS network using standard HTTP:

- Control an IPFS Kubo node via HTTP using the [Kubo RPC API](./reference/kubo/rpc.md), which supports [multiple clients in multiple languages](./reference/kubo-rpc-cli.md).
- For an implementation and runtime agnostic HTTP interface for retrieving data, use an [IPFS gateway](./reference/http/gateway.md).

## Learn

- Learn what IPFS is and isn't, the problems it solves, the different subsystems that it is composed of and how each one works in [the Basic Concepts](./concepts/README.md#learn-the-basics).
- Dive into ideas like hashing, immutability, persistence (and more) that underlie IPFS in [Ideas and theory](./concepts/README.md#ideas-and-theory).
- Learn more about the subsystems that IPFS is composed of in [Subsystems and components](./concepts/README.md#subsystems-and-components)
- Get an [overview of IPFS implementations](./concepts/ipfs-implementations.md).
- [Compare IPFS to other similar systems](./concepts/comparisons.md).
- Understand the project history, ecosystem status and more in the [Project section](./project/README.md).
- See how other software systems leverage IPFS in the [Case Studies section](./case-studies/arbol.md).

## Join the IPFS community

:::tip
Are you developing with IPFS implementations and tools, and looking for technical support from IPFS experts? For the fastest possible assistance and resolution of your support needs, see the [guide to getting technical help and support](./community/README.md#get-technical-support-and-help).
:::

IPFS has a bustling community of designers, developers, writers, and activists who are all helping to improve the project. Find out about the events and resources available, and how to get involved in the [Community section](./community/README.md)
