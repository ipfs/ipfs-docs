---
title: 'Publish using the command line'
description: 'Learn how to publish content with IPFS by pinning a file to a pinning service using the command line.'
---

# Publish a file with IPFS using the command line

:::warning
Some steps of this guide are currently outdated due to [changes with web3.storage](https://blog.web3.storage/posts/the-data-layer-is-here-with-the-new-web3-storage).
:::

Similar to the [Publish a file with IPFS](./publish.md) quickstart, this guide will teach you about [pinning services](../concepts/persistence.md#pinning-in-context) and how to use them to publish content-addressed data with IPFS. However, instead of using the [Web3 UI used in the related guide](./publish.md#upload-and-pin-a-file) , you will upload the file to [web3.storage](https://web3.storage/) using the [w3 command line interface](https://github.com/web3-storage/w3cli). By the end of this guide, you should have a better understanding of how content addressing and CIDs work from a high level, as well as how to use the w3 command line interface to publish data to IPFS.

:::callout
The web3.storage pinning service was chosen purely for demonstration purposes, and is one of many [pinning services](../concepts/persistence.md#pinning-in-context) you can choose from. While each pinning services has different SDKs and APIs, their fundamental role is the same - to store files and make them available to the IPFS network. In fact, one of the main benefits of IPFS is that files can be pinned to multiple pinning services, thereby reducing vendor lock-in.
:::

## Contents <!-- omit from toc -->

- [Overview](#overview)
- [Pinning services](#pinning-services)
- [Prerequisites](#prerequisites)
- [Uploading and pinning a file](#uploading-and-pinning-a-file)
- [CIDs explained](#cids-explained)
- [Retrieving with a gateway](#retrieving-with-a-gateway)
- [Summary and next steps](#summary-and-next-steps)

## Overview

_Pinning_ refers to the process of ensuring that a particular piece of content is retrievable with IPFS. In other words, pinning is equivalent to storing a file on a computer or server that is connected to the internet, thereby making it available to the rest of the IPFS network.

Pinning can be done at various levels, from individual files to entire directories that are addressed by a CID. You can also pin CIDs to multiple IPFS nodes to increase the redundancy and resilience of the file on the network.

## Pinning services

[Pinning services](../concepts/persistence.md#pinning-services) are similar to hosting services, in that they run an IPFS node for you and ensure that your files are available to the IPFS network.

:::callout
Data pinned to the IPFS network is public by default and retrievable by anyone. Avoid publishing private data or adequately encrypt it before publishing.
:::

## Prerequisites

- A unix-like terminal.
- Node.js installed in the terminal environment.
- The [following image](../quickstart/images/welcome-to-IPFS.jpg), downloaded and saved on your computer:

![image](../quickstart/images/welcome-to-IPFS.jpg)

## Install and register to w3

1. Install the [w3 command line interface](https://github.com/web3-storage/w3cli).

   ```shell
   npm install -g @web3-storage/w3cli

1. Authorize the w3 tool to act on behalf of the account associated with your email address `<your@email.com>`:

   ```shell
   w3 login <your@email.com>

## Upload and pin a file

1. Create a space for your files.

   ```shell
    w3 space create Pictures

1. Upload your file.

   ```shell
   w3 up welcome-to-IPFS.jpg
   ```

Congratulations, you have successfully **pinned** a file to IPFS using the w3 cli! 🎉

Let's unpack what just happened, by looking at CIDs.

## CIDs explained

In IPFS, every file and directory is identified with a Content Identifier ([CID](../concepts/content-addressing.md)). The CID serves as the **permanent address** of the file and can be used by anyone to find it on the IPFS network.

When a file is first added to an IPFS node (like the image used in this guide), it's first transformed into a content-addressable representation in which the file is split into smaller chunks (if above ~1MB) which are linked together and hashed to produce the CID.

In this guide, the CID for the uploaded image is:

```plaintext
bafybeicn7i3soqdgr7dwnrwytgq4zxy7a5jpkizrvhm5mv6bgjd32wm3q4
```

You can now share the CID with anyone and they can fetch the file using IPFS.

To dive deeper into the anatomy of the CID, check out the [CID inspector](https://cid.ipfs.tech/#bafybeicn7i3soqdgr7dwnrwytgq4zxy7a5jpkizrvhm5mv6bgjd32wm3q4).

:::callout
The transformation into a content-addressable representation is a local operation that doesn't require any network connectivity. With web3.storage, this transformation happens client-side (in the browser).
:::

## Retrieving with a gateway

Now that your file is pinned to a pinning service, you will fetch it using an IPFS gateway. An [**IPFS Gateway**](../concepts/ipfs-gateway.md) is an HTTP interface that serves as a bridge to the IPFS network. In other words, it allows you to fetch CIDs from IPFS using HTTP.

Pinning services typically offer an IPFS gateway as a way to easily retrieve your CIDs. For example, Web3.storage operates the [w3s.link](https://w3s.link) gateway, from which you can retrieve the uploaded CID.

To retrieve the CID, open the following URL:
[bafybeicn7i3soqdgr7dwnrwytgq4zxy7a5jpkizrvhm5mv6bgjd32wm3q4.ipfs.w3s.link](https://bafybeicn7i3soqdgr7dwnrwytgq4zxy7a5jpkizrvhm5mv6bgjd32wm3q4.ipfs.w3s.link/)

:::callout
When pinning a file to IPFS, the filename is not stored by default. To ensure the filename is retained, it's common to wrap the file in a directory. In such instances, both the file and the directory will have unique CIDs. Web3.storage wraps files in a directory by default, which is why you see a directory listing with the file `welcome-to-IPFS.jpg` followed by a shorthand CID: `bafk…beom` of the file.
:::

## Summary and next steps

In this quickstart guide, you learned about [pinning services](../concepts/persistence.md#pinning-in-context), and how to use them to publish content-addressed data with IPFS. You also learned how CIDs address files and directories in IPFS by uploading a file to a pinning service called [web3.storage](https://web3.storage/).

Pinning services provide a convenient alternative to running IPFS nodes and infrastructure. However, the two are not mutually exclusive; you can combine a pinning service with an IPFS node on your computer to increase the resilience of your CIDs.

Possible next steps include:

- Check out [the lifecycle of data in IPFS](../concepts/lifecycle.md) to learn more about how publishing by pinning fits into the full lifecycle of data in IPFS.
- Try fetching the pinned file by following the [retrieval quickstart](./retrieve.md).
- If you prefer to upload a file programmatically with JavaScript or Go, check out the [Web3.storage docs](https://web3.storage/docs/how-tos/store/).
- Alternatively, try out [Filebase](https://filebase.com/), a pinning service that offers an [AWS S3-compatible API for pinning](https://docs.filebase.com/getting-started/s3-api-getting-started-guide), so you can use any S3-compatible SDK, e.g. [aws-sdk](https://www.npmjs.com/package/aws-sdk), and [many](https://github.com/s3tools/s3cmd) more.
