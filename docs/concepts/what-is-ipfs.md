---
title: What is IPFS?
description:  Learn what IPFS is and isn't.
---

# What is IPFS

IPFS is a set of building blocks for a better web. Open protocols to make your data smarter: content-addressed, verifiable, and unstoppable.

On a more technical level, IPFS is a set of open protocols for addressing, routing, and transferring data on the web, built on the ideas of [content addressing](concepts/glossary.md#content-addressing) and peer-to-peer networking.


:::callout
This guide is part 1 of a 3-part introduction to [the basic concepts of IPFS](../concepts/README.md#learn-the-basics). The second part, [**IPFS and the problems it solves**](../concepts/ipfs-solves.md), covers the problems with the internet and current protocols like HTTP that IPFS solves.
:::

In this conceptual guide, you'll learn what IPFS is and isn't.

## Defining IPFS

The term _IPFS_ can refer to multiple concepts:

- An <VueCustomTooltip label="Software, written in any programming language, with functionality to process and transmit content-addressed data. Some implementations are optimized for specific use cases or devices, or use different subsystems to handle content-addressed data. There are multiple specifications in IPFS for handling content-addressed data, and not all implementations implement them." underlined multiline is-medium>implementation</VueCustomTooltip> of IPFS protocol [specifications](https://github.com/ipfs/specs), such as <VueCustomTooltip label="The first implementation of IPFS, written in Go." underlined multiline>Kubo</VueCustomTooltip>. Learn more about [the principles that define an IPFS implementation](./implementations.md).
- A 
<VueCustomTooltip label="A network of computers in which multiple servers act as a single processing point, without having a central server to manage network activity." underlined multiline is-medium>decentralized network</VueCustomTooltip> composed of <VueCustomTooltip label="Computers participating in an IPFS network by running an IPFS implementation. Also referred to as peers" underlined multiline>IPFS nodes</VueCustomTooltip> that is open and participatory.
- A modular suite of protocols and standards for organizing and transferring content-addressed data.

## What IPFS _isn't_

While IPFS shares similarities with, and is often used in architectures with the systems described below, IPFS is _not_:

- A _storage provider_: While there are storage providers built with IPFS support (typically known as _pinning services_), IPFS itself is a protocol, not a provider.
- _A <VueCustomTooltip label="An organization that provides its users with on-demand computing resources, such as databases and storage, over the internet." underlined multiline is-medium>cloud service provider</VueCustomTooltip>_: IPFS can be deployed on and complement cloud infrastructure, but it in of itself is not a cloud service provider.

## Further reading
- For an overview of the problems that IPFS solves, see part 2 of a 3-part introduction to [the basic concepts of IPFS](../concepts/README.md#learn-the-basics), [**IPFS and the problems it solves**](../concepts/ipfs-solves.md).
- Looking for a deeper dive on IPFS compared to other similar technologies? See the [IPFS Comparisons page](../concepts/comparisons.md).
