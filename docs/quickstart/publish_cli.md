---
title: 'Publish using the command line'
description: 'Learn how to publish content with IPFS by pinning a file to a pinning service using the command line.'
---

# Publish a file with IPFS using the command line

Similar to the [Publish a file with IPFS](./publish.md) quickstart, this guide will teach you about [pinning services](../concepts/persistence.md#pinning-in-context) and how to use them to publish content-addressed data with IPFS. However, instead of using a web UI, you will upload files using **command-line tools and APIs** provided by various pinning services. By the end of this guide, you should have a better understanding of how content addressing and CIDs work from a high level, as well as how to use CLI tools to publish data to IPFS.

:::callout
If you prefer a graphical interface, see [Publish with web interfaces](./publish.md).
:::

## Contents <!-- omit from toc -->

- [Overview](#overview)
- [Pinning services](#pinning-services)
- [Prerequisites](#prerequisites)
- [Upload and pin a file](#upload-and-pin-a-file)
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

- A unix-like terminal or command prompt
- An account with at least one pinning service (free tier is sufficient):
  - [Storacha](https://storacha.network) - Requires Node.js for their CLI
  - [Pinata](https://pinata.cloud/) - Uses REST API with curl
  - [Filebase](https://filebase.com) - S3-compatible, works with AWS CLI
- A sample file to upload, such as the [following image](../quickstart/images/welcome-to-IPFS.jpg):

![image](../quickstart/images/welcome-to-IPFS.jpg)

## Upload and pin a file

Choose one of the following methods based on your preferred pinning service:

### Option 1: Storacha CLI

Storacha provides a command-line interface through their storacha tool. For detailed installation and usage instructions, see their [CLI documentation](https://docs.storacha.network/cli/).

Basic usage:
```shell
# Install the CLI (requires Node.js)
npm install -g @storacha/cli

# Authenticate
storacha login your@email.com

# Create a space for your files
storacha space create MySpace

# Upload a file
storacha up welcome-to-IPFS.jpg
```

### Option 2: Pinata API

Pinata provides a REST API that you can use with curl or any HTTP client. See their [API reference](https://docs.pinata.cloud/api-reference) for authentication setup.

Basic usage with curl:
```shell
# Set your API credentials
export PINATA_API_KEY="your_api_key"
export PINATA_SECRET_API_KEY="your_secret_key"

# Upload a file
curl -X POST https://api.pinata.cloud/pinning/pinFileToIPFS \
  -H "pinata_api_key: $PINATA_API_KEY" \
  -H "pinata_secret_api_key: $PINATA_SECRET_API_KEY" \
  -F "file=@welcome-to-IPFS.jpg"
```

### Option 3: Filebase S3-Compatible API and Kubo RPC

Filebase offers an S3-compatible API, making it easy to use with AWS CLI or any S3 SDK. See their [S3-compatible API documentation](https://docs.filebase.com/api-documentation/s3-compatible-api) and [developer quick start guide](https://docs.filebase.com/getting-started/getting-started-guides/developer-quick-start-guide). They also offer a subset of Kubo RPC API - see their [IPFS RPC API documentation](https://docs.filebase.com/api-documentation/ipfs-rpc-api).

Basic usage with AWS CLI:
```shell
# Configure AWS CLI with Filebase credentials
aws configure --profile filebase

# Upload a file to your IPFS bucket
aws --profile filebase s3 cp welcome-to-IPFS.jpg s3://your-bucket-name/
```

Each method will return a **CID** (Content Identifier) for your uploaded file. Save this CID as you'll use it to retrieve your file.

## CIDs explained

In IPFS, every file and directory is identified with a Content Identifier ([CID](../concepts/content-addressing.md)). The CID serves as the **permanent address** of the file and can be used by anyone to find it on the IPFS network.

When a file is first added to an IPFS node (like the image used in this guide), it's first transformed into a content-addressable representation in which the file is split into smaller chunks (if above ~1MB) which are linked together and hashed to produce the CID.

For example, a CID might look like:

```plaintext
bafybeicn7i3soqdgr7dwnrwytgq4zxy7a5jpkizrvhm5mv6bgjd32wm3q4
```

You can now share the CID with anyone and they can fetch the file using IPFS.

To dive deeper into the anatomy of the CID, check out the [CID inspector](https://cid.ipfs.tech/#bafybeicn7i3soqdgr7dwnrwytgq4zxy7a5jpkizrvhm5mv6bgjd32wm3q4).

:::callout
The transformation into a content-addressable representation is a local operation that doesn't require any network connectivity. Many CLI tools perform this transformation locally before uploading.
:::

## Retrieving with a gateway

Now that your file is pinned to a pinning service, you can fetch it using an IPFS gateway. An [**IPFS Gateway**](../concepts/ipfs-gateway.md) is an HTTP interface that serves as a bridge to the IPFS network.

You can retrieve your content using curl or a web browser:

### Using service-specific gateways

**Storacha Gateway:**
```shell
curl https://[CID].ipfs.w3s.link/
# or
curl https://w3s.link/ipfs/[CID]
```

**Pinata Gateway:**
```shell
curl https://gateway.pinata.cloud/ipfs/[CID]
```

**Filebase Gateway:**
```shell
curl https://[BUCKET_NAME].ipfs.filebase.io/ipfs/[CID]
```

### Using public gateways

```shell
curl https://ipfs.io/ipfs/[CID]
# or
curl https://dweb.link/ipfs/[CID]
```

:::callout
When pinning a file to IPFS, the filename is not stored by default. To ensure the filename is retained, it's common to wrap the file in a directory. In such instances, both the file and the directory will have unique CIDs.
:::

## Summary and next steps

In this quickstart guide, you learned about [pinning services](../concepts/persistence.md#pinning-in-context), and how to use them to publish content-addressed data with IPFS using command-line tools. You explored different CLI options for Storacha, Pinata, and Filebase.

Pinning services provide a convenient alternative to running IPFS nodes and infrastructure. However, the two are not mutually exclusive; you can combine a pinning service with an IPFS node on your computer to increase the resilience of your CIDs.

Possible next steps include:

- Check out [the lifecycle of data in IPFS](../concepts/lifecycle.md) to learn more about how publishing by pinning fits into the full lifecycle of data in IPFS
- Try fetching the pinned file by following the [retrieval quickstart](./retrieve.md)
- Explore the web-based upload experience in the [UI-based publish guide](./publish.md)
- Learn more about each service's API and SDKs:
  - [Storacha CLI documentation](https://docs.storacha.network/cli/)
  - [Pinata API reference](https://docs.pinata.cloud/api-reference)
  - [Filebase S3 API guide](https://docs.filebase.com/api-documentation/s3-compatible-api)
  - [Filebase IPFS RPC API](https://docs.filebase.com/api-documentation/ipfs-rpc-api)