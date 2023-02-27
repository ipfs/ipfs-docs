---
title: What is IPFS?
description:  Learn what IPFS is and isn't.
---

# What IPFS is and isn't

IPFS is a modular suite of <VueCustomTooltip label="A set of standards, rules or procedures for transmitting data between computers, including how the information will be structured and how each computer will send and receive it. Notable examples include TCP/IP, HTTP/S, SMTP, and DNS." underlined multiline is-medium is-bottom>protocols</VueCustomTooltip> for organizing and moving data, designed from the ground up with the principles of <VueCustomTooltip label="A way to address data by its hash rather than its location (IPs)." underlined multiline>content addressing</VueCustomTooltip> and <VueCustomTooltip label="A network of computers model in which each party has equivalent capabilities and can initiate a communication session." underlined multiline is-medium>peer-to-peer networking</VueCustomTooltip>. Because IPFS is <VueCustomTooltip label="Software released under a license that grants users the rights to use, study, change, and distribute the software and its source code to anyone and for any purpose. Open-source software is often developed in a collaborative public manner that encourages contributions from users." underlined multiline is-medium>open-source</VueCustomTooltip>, there are multiple <VueCustomTooltip label="Software, written in any programming language, with functionality to process and transmit content-addressed data as specified by the IPFS protocol. Some implementations are optimized for specific use cases or devices, or use different subsystems to handle content-addressed data." underlined multiline is-medium>implementations</VueCustomTooltip> of IPFS. 

:::callout
This guide is part 1 of a 3-part introduction to [the basic concepts of IPFS](../concepts/README.md#learn-the-basics). The second part, [**IPFS and the problems it solves**](../concepts/ipfs-solves.md), covers the problems with the internet and current protocols like HTTP that IPFS solves.
:::

In this conceptual guide, you'll learn what IPFS is and isn't.

## Defining IPFS

The term _IPFS_ can refer to multiple concepts:

- Software that implements the IPFS protocol specifications (like <VueCustomTooltip label="The first implementation of IPFS, written in Go." underlined multiline>Kubo</VueCustomTooltip>) 
- A 
<VueCustomTooltip label="A network of computers in which multiple servers act as a single processing point, without having a central server to manage network activity." underlined multiline is-medium>decentralized network</VueCustomTooltip> comprised of <VueCustomTooltip label="Computers participating in an IPFS network by running an IPFS implementation. Also referred to as peers" underlined multiline>IPFS nodes</VueCustomTooltip> that anyone can join.
- A modular suite of protocols and standards for organizing and moving content-addressed data.

## What IPFS _isn't_

While IPFS shares similarities with, and is often used in architectures with the systems described below, IPFS is _not_:

- A _storage provider_: Rather, IPFS  provides a modular suite of protocols and standards for organizing and moving content-addressed data, which many storage solutions and other applications use as a fundamental part of their architecture.
- _A <VueCustomTooltip label="An organization that provides its users with on-demand computing resources, such as databases and storage, over the internet." underlined multiline is-medium>cloud service provider</VueCustomTooltip>_: IPFS can be deployed on and complement cloud infrastructure, but it in of itself is not a cloud service provider.


## Further reading
- For an overview of the problems that IPFS solves, see part 2 of a 3-part introduction to [the basic concepts of IPFS](../concepts/README.md#learn-the-basics), [**IPFS and the problems it solves**](../concepts/ipfs-solves.md).
- To learn how IPFS is used by storage networks and other applications, see the [usage ideas and examples](../concepts/usage-ideas-examples.md).
- Looking for a deeper dive on IPFS compared to other similar technologies? See the [IPFS Comparisons page](../concepts/comparisons.md).
