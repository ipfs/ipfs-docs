---
title: Diagnostic tools
description: Diagnostic tools for debugging, troubleshooting, and developing with IPFS.
---

# Diagnostic tools

Here are several tools you can use to investigate and diagnose common issues with IPFS. 

## IPLD Explorer

[IPLD Explorer](https://explore.ipld.io/) allows you to visualize and explore the [IPLD](../concepts/glossary.md#ipld) [DAG](../concepts/glossary.md#dag) representing a given [CID](../concepts/glossary.md#cid) or [CAR](../concepts/glossary.md#car) file. 

## IPFS check

[IPFS Check](https://check.ipfs.network/) helps determine the retrievability of a CID from IPFS [Mainnet](../concepts/glossary.md#mainnet), either from a specific [peer](../concepts/glossary.md#peer) given a [multiaddress](../concepts/glossary.md#multiaddr), or from multiple providers.

@[youtube](XeNOQDOrdC0)

Each error type output by the tool can indicate a solution to your problem:

- **Could not connect to the multiaddr** indicates that machines on the internet cannot talk to your machine. Fix your firewall, add port forwarding, or use a relay.
- **Could not find address in the DHT** indicates that your machine is either not connected to the [Amino](../concepts/glossary.md#amino) DHT (even as a client), or it is not advertising the address that you are using to test.
- **Multihash not advertised in the DHT** indicates that your machine has not advertised that it has the requested content in the Amino DHT. 
- **Peer has not responded that it has the CID** indicates that your node cannot find the block that you believe it has, or that there may be some other sort of network latency.

## CID inspector

[CID inspector](http://cid.ipfs.tech/) breaks down a given CID into information that can be useful for understanding CIDs. Specifically, the tool provides:

- A human-readable form of the CID
- Information on the CID components 
- The length of the binary and Base32 encoded CID
- The CIDv1 representation, if applicable

:::callout
Learn more about CID concepts, including components and versions in the [content addressing concepts guide](../concepts/content-addressing.md).
:::

## IPFS Gateway Checker

:::warning
Community-operated IPFS HTTP Gateways may be abused for phishing, which will generally raise a browser alert. Before using a community-operated gateway, you can inspect the URL with a tool like [Google's Safe Browsing site status](https://transparencyreport.google.com/safe-browsing/search).
:::

IPFS [Gateway Checker](https://ipfs.github.io/public-gateway-checker/) provides status information for public IPFS gateways. This information is useful in deciding on which public gateway provider to use, or troubleshooting problems with your current public gateway provider.

## DAG builder visualiser

[DAG builder visualiser](https://dag.ipfs.tech/) allows you to upload a CAR file and visualize it as a DAG. You can toggle parameters that determine how the DAG will be visualized, such as typ (Balanced, Trickle, Flat) and max amount of children.

## CAR Builder

[CAR Builder](https://car.ipfs.io/) allows you to upload a data file and export it as an IPFS CAR file. The tool automatically chunks and hashes your files to automatically produce an IPFS compatible content-addressed archive. 
