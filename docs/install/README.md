---
title: Get Started
description: There are several different ways you can install and interact with IPFS. Find out which one best suits your needs here.
---

# Get Started

IPFS is a collection of protocols, packages, and specifications that allow computers to send and receive data. Because of this, users can interact with and use IPFS in many different ways. A developer building network applications will use a different set of tools to interact with IPFS than someone who wants to store files on IPFS. Pick the one that best suits what you're here to do.

Looking for an easy and opinionated way to get started with IPFS [Mainnet](../concepts/glossary.md#mainnet)? Try any of the options listed below:

## User-Friendly Options

### IPFS Desktop

Anyone can use IPFS to store files in a _decentralized_ way. The easiest way to get up and running is by installing the IPFS Desktop application. This app has a Kubo node built-in and lets you interact with the network through a simple user interface. [Check it out →](./ipfs-desktop.md)

### IPFS Companion

If your browser doesn't support IPFS yet, you can install an IPFS companion extension that will let you view decentralized web content! [Learn more →](./ipfs-companion.md)

### Publish files with a pinning service

Do you want to quickly and easily publish content with IPFS without complex tools? See the [Publish with IPFS quickstart](../quickstart/publish.md), where you'll learn how to use third-party pinning services to pin and provide files to the IPFS network.

## Command-Line & Infrastructure Tools

### Kubo

Want to build decentralized applications and store your application data on IPFS? You'll likely want to install the command-line version of IPFS named Kubo. There's no GUI to deal with, just raw input and output through your terminal. [Find out more →](./command-line.md)

### IPFS Cluster

Planning to set up several Kubo nodes within one network? You'll want to take a look at installing [IPFS Cluster](./server-infrastructure.md), which provides data orchestration across a swarm of IPFS daemons by allocating, replicating and tracking a global pinset distributed among multiple peers.

### Rainbow

If you only want to run production-grade HTTP [Gateway](../concepts/glossary.md#gateway) service using the same software that is powering [public gateways](../concepts/public-utilities.md#public-ipfs-gateways), you may want to choose [Rainbow →](https://github.com/ipfs/rainbow/#readme).

### Someguy

If you need to run your own [delegated routing](../concepts/glossary.md#delegated-routing) endpoint that hits both Amino DHT and IPNI, consider running [Someguy →](https://github.com/ipfs/someguy/#readme).

## Software Development

### Helia SDK for JS

[Helia](https://github.com/ipfs/helia) is a new implementation of IPFS in JavaScript that is designed to be more modular and lightweight than the [deprecated js-ipfs project](https://github.com/ipfs/js-ipfs).

To get started with a hands-on example, see [Helia 101](https://github.com/ipfs-examples/helia-examples/blob/main/examples/helia-101/README.md) in [ipfs-examples/helia-examples](https://github.com/ipfs-examples/helia-examples/tree/main).

:::callout
If you are looking for simple [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)-like API for use on the web, see [@helia/verified-fetch](https://www.npmjs.com/package/@helia/verified-fetch).
:::

### Boxo SDK for GO

[Boxo](https://github.com/ipfs/boxo#readme) is a set of reference libraries for building IPFS applications and implementations in Go.

To get started, see [boxo/examples](https://github.com/ipfs/boxo/tree/main/examples) or inspect how Boxo is used in [Kubo](https://github.com/ipfs/kubo), [Rainbow](https://github.com/ipfs/rainbow/), [Someguy](https://github.com/ipfs/someguy), [IPFS Cluster](https://github.com/ipfs-cluster/ipfs-cluster/), or non-Mainnet implementations like [Lotus](https://github.com/filecoin-project/lotus/).
