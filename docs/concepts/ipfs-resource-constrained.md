---
title: IPFS in resource constrained environments
description: Learn about the InterPlanetary Linked Data (IPLD) model and how it forms an important ingredient in IPFS.
---

# IPFS in resource constrained environments

There are many ongoing projects in the IPFS ecosystem exploring the use of IPFS in resource-constrained environments, like mobile devices, web browsers, and embedded devices. This page will discuss projects that use 


## Projects exploring the use of IPFS in resource-constrained environments

Examples of projects exploring the use of IPFS in resource-constrained environments include but are not limited to:
<!-- TODO: add one line descriptions for each -->
- [Aggregore](https://agregore.mauve.moe/),
- [Durin](https://github.com/ipfs-shipyard/Durin), a mobile application that allows you to upload and view files on the IPFS network
- [Iroh](https://iroh.computer/), a Rust implementation of IPFS optimized for cloud, mobile & desktop platforms
- [Capyloon](https://capyloon.org/), an experimental, privacy-focused web-based OS to overcome the constraints imposed by OS vendors
- [ipfs-embed](https://github.com/ipfs-rust/ipfs-embed), a lean, fast and reliable implementation of IPFS in Rust, designed for complex p2p applications

## Design patterns of IPFS projects in resource-constrained environments

To optimize IPFS in resource-constrained environments, many of the projects listed above rely on similar design patterns. These design patterns include but are not limited to:

- The use of HTTP IPFS Gateways
- "delegated providing" using pinning services. 
- ...
<!-- TODO
Create sections to

1) Educate about the resources commonly needed by an IPFS node, e.g. access to TCP/UDP connections, no. of peers, being long-running (to continue publishing to the DHT), be publicly reachable

## Design patterns of IPFS projects in resource-constrained environments


2) Educate about 
(subsections)
the trade-offs, 
how some responsibilities can be delegated,
the landscape of options (delegated routing over HTTP with link to spec), 
delegated representation and providing pinning services, 
verified retrieval with gateways.

3) Next Steps -> link out to relevant tooling, libraries, and projects working on this.

 -->