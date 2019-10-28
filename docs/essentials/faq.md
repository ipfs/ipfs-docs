---
title: FAQ
---

# Frequently Asked Questions

Content to come. Let's use H2s for topic areas, rather than individual questions, so this doesn't get too long in the left nav.

## What is IPFS?

IPFS stands for the InterPlanetary File System - a peer-to-peer network for storing and accessing files, websites, applications, and data in a distributed file system.

To learn more, see [this guide on “what is IPFS?”](introduction/overview.md).

## IPFS in the wild

### Where can I see IPFS in action today?

https://awesome.ipfs.io/ is a good starting point to see the variety of projects using IPFS today. You can also add your own project here: https://github.com/ipfs/awesome-ipfs

## Getting started

### How do I get started with IPFS?

For installing and initializing IPFS, check out [this getting started guide](introduction/usage.md).

## Contributing to IPFS

### How do I start contributing to IPFS?

A great way to help out right now is to run a node or two and report any issues you have, ask questions about everything that isn’t obvious (to help us write better documentation) and if you’re feeling really helpful, write up short guides on anything you think might be useful. If you want to contribute code to either of the core IPFS implementations, please review the [Community Contributing Guidelines](https://github.com/ipfs/community/blob/master/CONTRIBUTING.md).

Stop in and say hi on IRC at #ipfs on freenode too if you feel like chatting.

## IPFS and Filecoin

### What is the connection between IPFS and Filecoin?

Filecoin and IPFS are two separate, complementary protocols, both created by Protocol Labs. IPFS allows peers to store, request, and transfer verifiable data with each other, while Filecoin is designed to provide a system of persistent data storage. Under Filecoin’s incentive structure, clients pay to store data at specific levels of redundancy and availability, and miners earn payments and rewards by continuously storing data and cryptographically proving it.

In short: IPFS addresses and moves content; while Filecoin is an incentive layer to persist data.

These components are separable - you can use one without the other, and IPFS already supports more self-organized or altruistic forms of data persistance via tools like [IPFS Cluster](https://cluster.ipfs.io/). Compatibility between IPFS and Filecoin is intended to be as seamless as possible, but we expect it to evolve over time. You can view the [draft spec for IPFS<>Filecoin Interoperability](https://github.com/filecoin-project/specs/issues/143) and [ideas for future improvements](https://github.com/filecoin-project/specs/issues/144) to learn more.

## IPFS and Protocol Labs

### How are the IPFS Project and Protocol Labs related?

IPFS is an Open Source Project and Community with over 4K contributors around the world from many different projects. There are a number of core IPFS team members who are sponsored to work on the project by [Protocol Labs](https://protocol.ai/) - a startup that supports development on many related protocols like libp2p and Filecoin as well, with the aim of making the internet more capable and resilient. However the vast majority of developers in the IPFS community and ecosystem are supported by other organisations or individual OSS contributions.

## Don't see your question?

You can see answers to past questions here: https://discuss.ipfs.io/c/help/Old-FAQ - If you don’t see your question, feel free to ask it too!
