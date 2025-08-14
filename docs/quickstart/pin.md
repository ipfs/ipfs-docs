---
title: 'Pin a file with IPFS using a pinning service'
description: 'Learn how to publish content with IPFS by pinning a file to a pinning service.'
---

# Pin a file with IPFS

In this quickstart guide, you will learn about [pinning services](../concepts/persistence.md#pinning-in-context) and how to use their **web interfaces** to publish content with IPFS. By the end of this guide, you should have a better understanding of how content addressing and CIDs work from a high level.

:::callout
If you prefer command-line tools, see [Pin using the command line](./pin-cli.md).
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

## Self-hosting option

You can also run your own IPFS node to pin files locally! [IPFS Desktop](../install/ipfs-desktop.md) provides an easy-to-use graphical interface for managing your own IPFS node:

- **Pin files locally**: Use the Files screen in IPFS Desktop to import and pin files. Right-click any file to access the Pin option in the context menu
- **Combine with pinning services**: For better redundancy, you can pin files to both your local node AND remote pinning services
- **Learn more**: Follow the [IPFS Desktop tutorial](../how-to/desktop-app.md) to get started with self-hosting

Running your own node gives you full control over your data while still participating in the global IPFS network.

## Prerequisites

To follow along with this guide, you'll need:

- **Option A**: Your own IPFS node
  - Install [IPFS Desktop](../install/ipfs-desktop.md) for a graphical interface

- **Option B**: An account with at least one pinning service (free tier is sufficient):
  - [Pinata](https://pinata.cloud/) - Popular IPFS pinning service with simple web interface
  - [Filebase](https://filebase.com) - S3-compatible pinning service with web dashboard
  - [Storacha](https://storacha.network) - Decentralized storage network

- A sample file to upload, such as the [following image](../quickstart/images/welcome-to-IPFS.jpg):

![image](../quickstart/images/welcome-to-IPFS.jpg)

## Upload and pin a file

Choose one of the following options to upload and pin your first file:

### Using IPFS Desktop (self-hosted)

If you're running IPFS Desktop, follow the [add local files](../how-to/desktop-app.md#add-local-files) tutorial to import your file. Once imported, right-click the file and select **Pin** to ensure it stays on your node. To get the CID, see [sharing files](../how-to/desktop-app.md#share-files).

You can also configure remote pinning services in IPFS Desktop. See [working with remote pinning services](../how-to/work-with-pinning-services.md) for details.

### Using a pinning service

Choose one of the following pinning services and use their web interface:

- **Pinata**: Use the [Pinata App](https://app.pinata.cloud) for a simple drag-and-drop upload experience - see their [quickstart tutorial](https://docs.pinata.cloud/quickstart)
- **Filebase**: Access their web dashboard and follow their [pin your first file guide](https://docs.filebase.com/getting-started/getting-started-guides/pin-your-first-file-to-ipfs)
- **Storacha**: Requires some technical skills, but their [browser upload guide](https://docs.storacha.network/how-to/upload/) may be a useful option if you are developing a web application. You can also visit [console.storacha.network](https://console.storacha.network) for web-based uploads

Each option will provide you with a **CID** (Content Identifier) after uploading your file. Save this CID as you'll use it to retrieve your file in the next sections.

## CIDs explained

In IPFS, every file and directory is identified with a Content Identifier ([CID](../concepts/content-addressing.md)). The CID serves as the **permanent address** of the file and can be used by anyone to find it on the IPFS network.

When a file is first added to an IPFS node (like the image used in this guide), it's first transformed into a content-addressable representation in which the file is split into smaller chunks (if above ~1MB) which are linked together and hashed to produce the CID.

For example, a CID might look like:

```plaintext
bafybeicn7i3soqdgr7dwnrwytgq4zxy7a5jpkizrvhm5mv6bgjd32wm3q4
```

You can now share the CID with anyone and they can fetch the file using IPFS.

To dive deeper into the anatomy of the CID, check out the [CID inspector](https://cid.ipfs.tech/#bafybeicn7i3soqdgr7dwnrwytgq4zxy7a5jpkizrvhm5mv6bgjd32wm3q4)

:::callout
The transformation into a content-addressable representation is a local operation that doesn't require any network connectivity. With many pinning services, this transformation happens client-side (in the browser).
:::

## Retrieving with a gateway

Now that your file is pinned to a pinning service, you can fetch it using an IPFS gateway. An [**IPFS Gateway**](../concepts/ipfs-gateway.md) is an HTTP interface that serves as a bridge to the IPFS network. In other words, it allows you to fetch CIDs from IPFS using HTTP in your web browser.

Pinning services typically offer their own IPFS gateways:

### Pinata Gateway
Pinata offers both public and dedicated gateway options. Their dedicated gateways provide better performance and reliability for production use. Access your content via:
- `https://gateway.pinata.cloud/ipfs/[CID]`

Learn more about the differences between public and dedicated gateways in [Pinata's gateway guide](https://knowledge.pinata.cloud/en/articles/6297294-public-gateways-vs-dedicated-gateways).

### Filebase Gateway
Filebase provides gateway access with the format:
- `https://[BUCKET_NAME].ipfs.filebase.io/ipfs/[CID]`

Note that the Filebase gateway may refuse HTML hosting and primarily works with assets like images or videos. For details, see [Filebase IPFS gateway documentation](https://docs.filebase.com/ipfs-concepts/what-is-an-ipfs-gateway).

### Storacha Gateway
Storacha provides gateway access through w3s.link. You can retrieve content using formats like:
- `https://[CID].ipfs.w3s.link`
- `https://w3s.link/ipfs/[CID]`

For more details about their gateway options, see [Storacha IPFS gateway documentation](https://docs.storacha.network/concepts/ipfs-gateways/).

### Public Gateways
You can also use public IPFS gateways to retrieve any CID:
- `https://ipfs.io/ipfs/[CID]`
- `https://dweb.link/ipfs/[CID]`

Simply replace `[CID]` with your actual CID in your browser's address bar to retrieve your file.

:::callout
When pinning a file to IPFS, the filename is not stored by default. To ensure the filename is retained, it's common to wrap the file in a directory. In such instances, both the file and the directory will have unique CIDs. Many pinning services wrap files in a directory by default.
:::

## Summary and next steps

In this quickstart guide, you learned about [pinning services](../concepts/persistence.md#pinning-in-context), and how to use them to publish content-addressed data with IPFS through web interfaces. You explored different pinning service options and learned how to retrieve your content through IPFS gateways.

Pinning services provide a convenient alternative to running IPFS nodes and infrastructure. However, the two are not mutually exclusive; you can combine a pinning service with an IPFS node on your computer to increase the resilience of your CIDs.

Possible next steps include:

- Check out [the lifecycle of data in IPFS](../concepts/lifecycle.md) to learn more about how publishing by pinning fits into the full lifecycle of data in IPFS
- Try fetching the pinned file by following the [retrieval quickstart](./retrieve.md)
- Learn how to [pin files using the command line](./pin-cli.md)
- Explore service-specific documentation:
  - [Pinata documentation](https://docs.pinata.cloud/)
  - [Filebase documentation](https://docs.filebase.com/)
  - [Storacha documentation](https://docs.storacha.network)