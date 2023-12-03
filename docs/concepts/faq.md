---
title: FAQ
description: Explore frequently asked questions about IPFS, the InterPlanetary File System.
---

# Frequently asked questions

## What is IPFS?

The InterPlanetary File System (IPFS) is a set of composable, peer-to-peer protocols for addressing, routing, and transferring [content-addressed](../concepts/glossary.md#content-addressing) data in a decentralized file system. Many popular Web3 projects are built on IPFS - see the [ecosystem directory](https://ecosystem.ipfs.tech) for a list of some of these projects.

New to IPFS? Start with
[the 3-page Basic Concepts](../concepts/README.md#learn-the-basics).

## IPFS in action

### Where can I see IPFS in action today?

To learn more about projects and products built on IPFS, use the [Ecosystem Directory](https://ecosystem.ipfs.tech/), an interactive showcase of all things IPFS, filterable by industry, tooling, and other categories. If you've built a project on top of IPFS, or if your organization utilizes IPFS in a meaningful way, [you can submit information to be considered for inclusion in the directory](https://airtable.com/shrjwvk9pAeAk0Ci7).

## Getting started

### How do I get started with IPFS?

The quickest way to get IPFS up and running on your machine is by installing [IPFS Desktop](https://github.com/ipfs/ipfs-desktop), the easy-to-use app that enables you to run an IPFS node on your computer without having to bother with terminal commands.

For installing and initializing IPFS from the command line, check out the [command-line quick start](../how-to/command-line-quick-start.md) guide.

### How do I learn more about IPFS standards and specifications?

You can learn more about IPFS design standards and architectural specifications at [specs.ipfs.tech](https://specs.ipfs.tech/). The IPFS Standards website documents these standards and specifications with the goal of fostering interoperability between independent implementations of the IPFS stack through Internet-grade specifications and test suites. 

### Why doesn't my SHA hash match my CID?
When you add a file to IPFS, IPFS splits it into smaller blocks. IPFS hashes each of these pieces individually, building a [Merkle Directed Acyclic Graphs (DAGs)](../concepts/merkle-dag.md) and resulting in an overall different hash.

## Contributing to IPFS

### How do I start contributing to IPFS?

There are a lot of ways you can contribute to IPFS, whether you're interested in helping with either of the core implementations, applications like IPFS Desktop, writing or editing documentation, doing UX, or whatever you enjoy working on. [Get all the details on where to get started here.](../community/contribute/ways-to-contribute.md)

### What is an implementation

An IPFS implementation is any software with basic functionality for interaction with other IPFS implementations. An implementation:

- Supports addressability using CIDs.

- Exposes operations like retrieval, provisioning and indexing on resources using CIDs. The operations that an implementation may support are open-ended, but this requirement should cover any interaction which the implementation exposes to other IPFS implementations.

- Verifies that the CIDs it resolves match the resources they address, at least when it has access to the resources bytes. However, implementations may relax this requirement in controlled environments in which it is possible to ascertain that verification has happened elsewhere in a trusted part of the system.

There are already many IPFS implementations, including [Kubo](../install/command-line.md), [Helia](https://github.com/ipfs/helia), and [more](../concepts/ipfs-implementations.md).

You can also create your own IPFS implementation. 

### I am creating an implementation, how do I get started?

If you want to develop an IPFS implementation or are already working on one, the IPFS design standards and architectural specifications at [specs.ipfs.tech](https://specs.ipfs.tech/) are a great resource. In particular, the following resources are great starting points:

- [IPFS Principles](https://specs.ipfs.tech/architecture/principles/) provides context and details around the core IPFS principles of content-addressing and transport-agnosticism. The document defines what is or is not an IPFS implementation.
- The [Meta](https://specs.ipfs.tech/meta/) section describes important non-technical information for contributors, like the core project values, the governance model, how to produce documents, and more. 
- [InterPlanetary Improvement Proposals (IPIPs)](https://specs.ipfs.tech/meta/ipip-process/) are a focused, transparent, community-driven process for protocol design discussions. They are not changes to the specification itself, but their approval leads to a change in the specification.

In addition to these core documents, `specs.ipfs.tech` documents standards for IPFS subsystems such as the [InterPlanetary Naming System](https://specs.ipfs.tech/http-gateways/) and [HTTP Gateways](https://specs.ipfs.tech/http-gateways/).

### can I use IPFS offline?

Yes, IPFS supports offline use. While the initial retrieval of content may require an internet connection, once the data is cached locally, it can be accessed offline. This is particularly useful in scenarios with intermittent connectivity or when creating applications for areas with limited internet access. Keep in mind that regularly connecting to the network ensures that you have the latest version of the content.

## IPFS and Filecoin

### What is the connection between IPFS and Filecoin?

Filecoin and IPFS are two separate, complementary protocols, both created by Protocol Labs. IPFS allows peers to store, request, and transfer verifiable data with each other, while Filecoin is designed to provide a system of persistent data storage. Under Filecoin's incentive structure, clients pay to store data at specific levels of redundancy and availability, and storage providers earn payments and rewards by continuously storing data and cryptographically proving it.

In short: IPFS addresses and moves content, while Filecoin is an incentive layer to persist data.

These components are separable - you can use one without the other, and IPFS already supports more self-organized or altruistic forms of data persistence via tools like [IPFS Cluster](https://ipfscluster.io/). Compatibility between IPFS and Filecoin is intended to be as seamless as possible, but we expect it to evolve. You can view the [draft spec for IPFS-Filecoin Interoperability](https://github.com/filecoin-project/specs/issues/143) and [ideas for future improvements](https://github.com/filecoin-project/specs/issues/144) to learn more.


## IPFS and Protocol Labs

### How are the IPFS Project and Protocol Labs related?

IPFS is an open-source project with a community of more than four thousand contributors around the world from many different projects. There are also core IPFS team members who are sponsored to work on the project by [Protocol Labs](https://protocol.ai/) — a startup that also supports development on many related protocols, such as libp2p and Filecoin, with the aim of making the internet more capable and resilient. However, the vast majority of developers in the IPFS community and ecosystem are supported by other organizations or are individual OSS contributors.

## Don't see your question?

We're working on expanding this FAQ with more content, including questions from the original-generation [IPFS forums](https://discuss.ipfs.tech/c/help/old-faq/5), so please watch this space! However, if you don't see your question, please [ask in the forums](https://discuss.ipfs.tech/), so you can get the answers you need and make us aware of new FAQ items.
