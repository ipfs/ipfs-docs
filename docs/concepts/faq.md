---
title: FAQ
legacyUrl: https://docs.ipfs.io/introduction/faq/
description: Explore frequently asked questions about IPFS, the InterPlanetary File System.
---

# Frequently asked questions

## What is IPFS?

IPFS stands for the InterPlanetary File System — a peer-to-peer network for storing and accessing files, websites, applications, and data in a distributed file system.

To learn more, see the ["What is IPFS?"](what-is-ipfs.md) guide.

## IPFS in action

### Where can I see IPFS in action today?

[Awesome IPFS](https://awesome.ipfs.io/) is a good starting point to see the wide variety of projects that are using IPFS today. If you've got your own awesome IPFS project, please add it to the [Awesome IPFS repo](https://github.com/ipfs/awesome-ipfs), so the rest of the world can see it!

## Getting started

### How do I get started with IPFS?

The quickest way to get IPFS up and running on your machine is by installing [IPFS Desktop](https://github.com/ipfs/ipfs-desktop), the easy-to-use app that enables you to run an IPFS node on your computer without having to bother with terminal commands.

For installing and initializing IPFS from the command line, check out the [command-line quick start](../how-to/command-line-quick-start.md) guide.

### Why doesn't my SHA hash match my CID?
When you add a file to IPFS, IPFS splits it into smaller blocks. IPFS hashes each of these pieces individually, building a [Merkle Directed Acyclic Graphs (DAGs)](../concepts/merkle-dag.md) and resulting in an overall different hash. 

## Contributing to IPFS

### How do I start contributing to IPFS?

There are a lot of ways you can contribute to IPFS, whether you're interested in helping with either of the core implementations, applications like IPFS Desktop, writing or editing documentation, doing UX, or whatever you enjoy working on. [Get all the details on where to get started here.](../project/contribute.md)

## IPFS and Filecoin

### What is the connection between IPFS and Filecoin?

Filecoin and IPFS are two separate, complementary protocols, both created by Protocol Labs. IPFS allows peers to store, request, and transfer verifiable data with each other, while Filecoin is designed to provide a system of persistent data storage. Under Filecoin's incentive structure, clients pay to store data at specific levels of redundancy and availability, and storage providers earn payments and rewards by continuously storing data and cryptographically proving it.

In short: IPFS addresses and moves content, while Filecoin is an incentive layer to persist data.

These components are separable - you can use one without the other, and IPFS already supports more self-organized or altruistic forms of data persistence via tools like [IPFS Cluster](https://cluster.ipfs.io/). Compatibility between IPFS and Filecoin is intended to be as seamless as possible, but we expect it to evolve over time. You can view the [draft spec for IPFS-Filecoin Interoperability](https://github.com/filecoin-project/specs/issues/143) and [ideas for future improvements](https://github.com/filecoin-project/specs/issues/144) to learn more.

## IPFS and Protocol Labs

### How are the IPFS Project and Protocol Labs related?

IPFS is an open-source project with a community of more than four thousand contributors around the world from many different projects. There are also core IPFS team members who are sponsored to work on the project by [Protocol Labs](https://protocol.ai/) — a startup that also supports development on many related protocols, such as libp2p and Filecoin, with the aim of making the internet more capable and resilient. However, the vast majority of developers in the IPFS community and ecosystem are supported by other organizations or are individual OSS contributors.

## Don't see your question?

We're working on expanding this FAQ with more content, including questions from the original-generation [IPFS forums](https://discuss.ipfs.io/c/help/old-faq/5), so please watch this space! However, if you don't see your question, please [ask in the forums](https://discuss.ipfs.io/), so you can get the answers you need and make us aware of new FAQ items.
