---
title: 'Publish a file to IPFS'
description: 'learn about pinning services and the lifecycle of content-addressed data in IPFS by pinning a file to the IPFS network'
---

# Publish a file to IPFS

In this quickstart guide, you will learn about pinning services and the lifecycle of content-addressed data in IPFS by pinning a file to the IPFS network. By the end of this guide, you should have a better understanding of how content addressing and CIDs work from a high level.

Pinning a file to IPFS is how content is published to IPFS. Any given file can be pinned to multiple IPFS nodes to increase the redundancy and resilience of a file on the network.

To do this, you will use a [pinning service](../concepts/persistence.md#pinning-in-context) called [web3.storage](https://web3.storage/) for this. Pinning services are like hosting services that run an IPFS node for you and ensure your files are available to the IPFS network.

> **Note:** web3.storage was chosen purely for demonstration purposes, and is one of many [pinning services](../concepts/persistence.md#pinning-in-context) you can chose from. While pinning services have different SDKs and APIs, their fundemental role is the same: to store files and make them available to the IPFS network.

In this guide, you will use the web3.storage UI to upload the file. If you prefer uploading with JavaScript or Go, check out the [Web3.storage docs](https://web3.storage/docs/how-tos/store/). Alternatively,with [Filebase](https://filebase.com/) is a pinning service that offers an AWS S3 compatible API for pinning, so you can use any existing tooling

## Prerequisites

- A free [web3.storage](https://web3.storage/) account.
- The following image, downloaded and saved on your computer: ![following image](./images/earth-image.jpg)

## 1. Sign in to web3.storage

Start by signing into your account on web3.storage:

![asfsaf](./images/login-web3-storage.png)
