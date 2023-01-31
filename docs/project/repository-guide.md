---
title: Repository guide
description: A quick guide to the most important and most frequently used IPFS repositories.
---

# IPFS repository guide

IPFS is an _extensive_ open-source project, and with that comes a lot of code and issue-based discussions. The IPFS project uses GitHub for both code development and road mapping and operations discussions, meaning that both types of activities can happen asynchronously, in the open, and from anywhere on the planet.

If you're looking for specific IPFS-related code, or want to find where to join in a particular discussion, start with this high-level guide to the most prominent and/or frequently used GitHub organizations and repositories in the IPFS project. It's not an exhaustive list of all IPFS organizations and repositories, but instead is intended to help guide you based on what you are trying to do in the following areas:

- [Fetching or contributing to IPFS code](#fetch-or-contribute-to-ipfs-code)
- [Participating in IPFS project operations](#participate-in-ipfs-project-operations)

## Fetch or contribute to IPFS code

Organization and repository links for the top-level projects shipped as part of the IPFS project and the main repos for each ingredient in the stack upon which IPFS is built.

### Protocol implementations

:::warning 
### js-ipfs being discontinued
Development of the [js-ipfs project](https://github.com/ipfs/js-ipfs) is being discontinued to focus on [Helia](https://github.com/ipfs/helia), a leaner, more modular, modern implementation of IPFS in JavaScript scheduled for release in 2023. To learn more about Helia and the current state of IPFS in JS, see the [blog post](https://blog.ipfs.tech/state-of-ipfs-in-js/). 

Because of this, js-ipfs tutorials may be out of date, and will eventually be archived.

:::

- [Kubo](https://github.com/ipfs/kubo): The reference implementation written in Go.
- [js-ipfs](https://github.com/ipfs/js-ipfs): The JavaScript implementation of IPFS.
- [rust-ipfs](https://github.com/rs-ipfs/rust-ipfs): Alpha implementation in Rust.
- [Other implementations](https://github.com/ipfs/ipfs#protocol-implementations): Up-to-date links to all other protocol implementations.

### Client implementations

- [Current list](https://github.com/ipfs/ipfs#http-client-libraries) of HTTP client libraries.

### Underlying components

- [libp2p](https://github.com/libp2p):
  - [go-libp2p](https://github.com/libp2p/go-libp2p): Reference libp2p implementation in Go.
  - [js-libp2p](https://github.com/libp2p/js-libp2p): The JavaScript implementation of the libp2p networking stack.
  - [rust-libp2p](https://github.com/libp2p/rust-libp2p): The Rust implementation of the libp2p networking stack.
- [IPLD](https://github.com/ipld):
  - [go-ipld](https://github.com/ipld/go-ipld): Entry-point repo for Go IPLD development.
  - [js-ipld](https://github.com/ipld/js-ipld): The JavaScript Implementation of IPLD.
  - [IPLD specifications](https://github.com/ipld/specs): The set of specifications that make up IPLD.
- [Multiformats](https://github.com/multiformats):
  - [Multiaddr](https://github.com/multiformats/multiaddr): Composable and future-proof network addresses.
  - [Multibase](https://github.com/multiformats/multibase): Self-identifying base encodings.
  - [Multicodec](https://github.com/multiformats/multicodec): Compact, self-describing codecs.
  - [Multihash](https://github.com/multiformats/multihash): Self-describing hashes for future-proofing.

### IPFS tools and products

- [IPFS Cluster](https://github.com/ipfs/ipfs-cluster): Automatically allocate, replicate, and track your data as a global pinset distributed among a swarm of peers.
- [IPFS Companion](https://github.com/ipfs/ipfs-companion): The IPFS web browser extension.
- [IPFS Web UI](https://github.com/ipfs/ipfs-webui): An easy-to-use web interface for IPFS nodes.
- [IPFS Desktop](https://github.com/ipfs/ipfs-desktop): Standalone IPFS app with an easy-to-use node interface, plus menubar/tray shortcuts
- [ipfs-gui](https://github.com/ipfs/ipfs-gui): Coordinating development, user experience, and maintenance of IPFS GUIs.
- [IPFS Shipyard](https://github.com/ipfs-shipyard): GitHub org showcasing incubated projects of all types created by the global IPFS community.
- [Testground](https://github.com/testground/testground): A platform for testing, benchmarking, and simulating distributed and p2p systems at scale.

### Interoperability, platforms, and standards

- [IPFS Web Browsers Integration](https://github.com/ipfs/in-web-browsers): Tracking progress toward native IPFS support in web browsers.
- [Are We Distributed Yet?](https://github.com/arewedistributedyet/arewedistributedyet): Prioritized listing of progress toward making peer-to-peer a first-class part of the web.
- [IPFS Mobile Design Guidelines](https://github.com/ipfs/mobile-design-guidelines): Best practices for making IPFS work for mobile.
- [Interoperability Tests for IPFS](https://github.com/ipfs/interop): On-the-wire interop for IPFS.

## Participate in IPFS project operations

IPFS project operations at large are also captured in GitHub. These repos don't necessarily contain code but do follow a similar pattern of issue creation, discussion, and resolution via comments and linked artifacts.

### Operations discussions and tools

- [IPFS Project Roadmap](https://github.com/ipfs/roadmap)
- [IPFS Specifications](https://github.com/ipfs/specs)
- [IPFS Infrastructure](https://github.com/ipfs/infra)

### Internationalization

- [i18n](https://github.com/ipfs-shipyard/i18n): The IPFS Translation Project, crowdsourcing translations of IPFS GUIs and websites.
