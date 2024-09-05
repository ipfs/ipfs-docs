---
title: Diagnostic tools
description: Diagnostic tools for debugging, troubleshooting, and developing with IPFS.
---

# Diagnostic tools

Here are several tools you can use to investigate and diagnose common issues with IPFS. 

## IPLD Explorer

[IPLD Explorer](https://explore.ipld.io/) allows you to visualize and explore the IPLD DAG representing a given CID or CAR file. The tool provides the following featured datasets to explore:

- [Project Apollo archives](https://explore.ipld.io/#/explore/QmSnuWmxptJZdLJpKRarxBMS2Ju2oANVrgbr2xWbie9b2D)
- [IGIS Git repository](https://explore.ipld.io/#/explore/baf4bcfg4ep767tjp5lxyanx5urpjjgx5q2volvy)
- [An Ethereum block](https://explore.ipld.io/#/explore/bagiacgzah24drzou2jlkixpblbgbg6nxfrasoklzttzoht5hixhxz3rlncyq)
- [XKCD archives](https://explore.ipld.io/#/explore/QmdmQXB2mzChmMeKY47C43LxUdg1NDJ5MWcKMKxDu7RgQm)

## IPFS check

[IPFS check](https://check.ipfs.network/) helps determine the retrievability of a CID from IPFS Mainnet, either from a specific peer given a multiaddress, or from multiple providers.

@[youtube](XeNOQDOrdC0)

Each error type output by the tool can indicate a solution to your problem:

- **Could not connect to the multiaddr** indicates that machines on the internet cannot talk to your machine. Fix your firewall, add port forwarding, or use a relay.
- **Could not find address in the DHT** indicates that your machine is either not connected to the Amino DHT (even as a client), or it is not advertising the address that you are using to test.
- **Multihash not advertised in the DHT** indicates that your machine has not advertised that it has the requested content in the Amino DHT. If you're using Kubo, enable the [Accelerated DHT Client](https://github.com/ipfs/go-ipfs/blob/master/docs/experimental-features.md#accelerated-dht-client).
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

## pl-diagnose

[pl-diagnose](https://pl-diagnose.on.fleek.co/#/diagnose/access-content) is a browser-based software application that automates diagnosis of various issues with an IPFS node. Specifically, this tool can help you answer these questions:

- Is a given CID available on the IPFS network and, if so, which peers are listed in the DHT as providers?
- Which addresses are listed in the DHT for a given IPFS node?
- Is an IPFS node accessible by other peers?
- Is specific content available from an IPFS node?
 
