---
title: IPFS Documentation
description: The home page for developer documentation for IPFS, the InterPlanetary File System.
---

# Welcome to the IPFS Docs

The InterPlanetary File System (IPFS) is a set of building blocks for a better web. Open protocols to make your data smarter: content-addressed, verifiable, and unstoppable.

On a more technical level, IPFS is a set of open protocols for addressing, routing, and transferring data on the web, built on the ideas of [content addressing](concepts/glossary.md#content-addressing) and peer-to-peer networking.

Many popular projects are built with IPFS - see the [ecosystem directory](https://ecosystem.ipfs.tech) and the [awesome-ipfs](https://github.com/ipfs/awesome-ipfs) list to find some of these projects.

## Get started

You can get started [retrieving data](#retrieve-data) and [providing data](#provide-data) to the IPFS network. If you'd rather develop applications, learn how to build IPFS-native apps or use standard HTTP in the [Build](#build) section.

### Retrieve data

Quickly retrieve data from the IPFS network, no programming required:

- Fetch data via it's [content identifier (CID)](concepts/glossary.md#cid)[using an IPFS gateway](./quickstart/retrieve.md).
- Install the [IPFS Companion](./install/ipfs-companion.md) browser extension to add support for `ipfs://` and `ipns://` addresses to your browser.

### Provide data

Provide data to the IPFS network with IPFS Desktop or a pinning service:

- [Install IPFS Desktop which bundles an IPFS node (Kubo) and a UI to manage files, peers, and explore content on IPFS](./install/ipfs-desktop.md).
- [Publish content to the IPFS network with IPFS Desktop](./how-to/desktop-app.md).
- [Deploy static sites to the IPFS network with a GitHub Action](./how-to/websites-on-ipfs/deploy-github-action.md).

### Build

You can build apps that leverage IPFS implementations, or use HTTP instead:

#### Using IPFS

Build an IPFS-native app using one of the many IPFS [implementations](./concepts/ipfs-implementations.md) and tools:

- If you are familiar with JavaScript, checkout the [IPFS in web apps guide](./how-to/ipfs-in-web-apps.md), which covers how to use [Helia](https://github.com/ipfs/helia) and related libraries to build IPFS-native apps.
- To develop IPFS applications using Go and/or interact with IPFS from the terminal, use the [IPFS Kubo implementation](./install/command-line.md).
- Try any of the [many other tools and implementations](./concepts/ipfs-implementations.md), which are written in different languages and tailored to specific needs and use cases.

#### Using HTTP

As the IPFS ecosystem has grown and evolved with multiple implementations in different languages, HTTP has become an important foundation for interoperability. Check out the following resources to learn more:

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
