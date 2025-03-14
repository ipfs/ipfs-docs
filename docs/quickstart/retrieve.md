---
title: 'Retrieval with IPFS'
description: 'Learn about the different ways that CIDs can be fetched from the other peers in the IPFS network'
---

# Retrieving a CID with IPFS

In this quickstart guide, you will learn the different approaches to retrieving CIDs from the IPFS network and how to pick the most appropriate method for your specific needs.

You will fetch the image with the following CID: `bafkreie7ohywtosou76tasm7j63yigtzxe7d5zqus4zu3j6oltvgtibeom`.

:::callout
The CID you will retrieve is actually a folder containing a single image file. The reason for this that when files are added to IPFS, the filename is not stored by default. To retain the filename, it's a common practice to wrap the file in a directory. In such instances, you end up with two CIDs - one for the file and another for the directory containing the file.
:::

## Contents <!-- omit from toc -->

- [IPFS retrieval methods](#ipfs-retrieval-methods)
- [Verified vs. trusted CID retrieval](#verified-vs-trusted-cid-retrieval)
- [Fetching the CID with Kubo](#fetching-the-cid-with-kubo)
- [Fetching the CID with an IPFS Gateway](#fetching-the-cid-with-an-ipfs-gateway)
- [Summary and next steps](#summary-and-next-steps)

## IPFS retrieval methods

There are two primary ways to retrieve files and directories published to IPFS:

- Use an [**IPFS node**](../concepts/nodes.md) by installing one of the IPFS implementations, e.g. [Kubo](../concepts/nodes.md#kubo) on your computer. This allows you to fetch and verify CIDs from other nodes in the IPFS network.
- Use an [**IPFS Gateway**](../concepts/ipfs-gateway.md), an HTTP interface with the IPFS network that allows you to fetch data from IPFS using HTTP. Pinning services typically offer an IPFS gateway as a way to easily retrieve your CIDs.

The **node** option allows you access to the full suite of IPFS protocols. The **Gateway** option serves as a bridge in situations where you might be constrained to using HTTP, such as in web apps where your app users may not be running an IPFS node.

IPFS Gateways, in their most basic form, are typically IPFS nodes that are hosted by someone else and expose an HTTP interface to fetch CIDs, as shown in the diagram below:

![gateway diagram](./images/gateway.png)

## Verified vs. trusted CID retrieval

Another thing to consider when deciding between the two approaches is _verification_. By default, an IPFS node hashes each block and ensures that, when the file is constructed from the blocks (into a Merkle DAG), it results in the CID you requested. However, with IPFS Gateways, verification is optional.

Non-verified retrieval is also commonly referred to as _trusted retrieval_ because you're trusting the gateway to return the correct response without calculating the hash.

While verification is almost always recommended, in reality, there are situations where trusted retrieval is the pragmatic choice, such as when embedding images on a website.

## Fetching the CID with Kubo

To fetch the CID with [Kubo](../install/command-line.md), complete the steps below:

1. Ensure that the Kubo daemon is installed and running:

   ```bash
   $ ipfs daemon
   ```

2. To fetch the file, run the [`ipfs get [CID]`](../reference/kubo/cli.md#ipfs-get) command:

   ```bash
   $ ipfs get bafybeicn7i3soqdgr7dwnrwytgq4zxy7a5jpkizrvhm5mv6bgjd32wm3q4
   ```

   The output should look as follows:

   ```bash
   Saving file(s) to bafybeicn7i3soqdgr7dwnrwytgq4zxy7a5jpkizrvhm5mv6bgjd32wm3q4
   647.61 KiB / 647.61 KiB [========================================================================================================================] 100.00% 0s
   ```

   A new folder with the same name as the CID was created:

   ```bash
   $ ls bafybeicn7i3soqdgr7dwnrwytgq4zxy7a5jpkizrvhm5mv6bgjd32wm3q4/
   welcome-to-IPFS.jpg
   ```

Congratulations, you have successfully fetched the CID.

## Verified retrieval with Helia Verified Fetch

[Verified Fetch](https://www.npmjs.com/package/@helia/verified-fetch) simplifies **verified** retrieval of CIDs on the web by abstracting away the details of content routing, transports and retrieval. The API is similar to the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API), accepting CIDs instead of URLs, returning [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response) objects.

For example, the following code fetches the image using the `verifiedFetch` library:

<iframe height="300" style="width: 100%;" scrolling="no" title="Fetch an image on IPFS Mainnet @helia/verified-fetch" src="https://codepen.io/2color/embed/dPyZyry?default-tab=js%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/2color/pen/dPyZyry">
  Fetch an image on IPFS Mainnet @helia/verified-fetch</a> by Daniel Norman (<a href="https://codepen.io/2color">@2color</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>


:::callout
You may notice that there's a path following the CID, e.g. `bafybeicn7i3soqdgr7dwnrwytgq4zxy7a5jpkizrvhm5mv6bgjd32wm3q4/welcome-to-IPFS.jpg`, because the starting CID is a directory containing the `welcome-to-IPFS.jpg` file, which you can fetch directly with: `verifiedFetch('ipfs://bafkreie7ohywtosou76tasm7j63yigtzxe7d5zqus4zu3j6oltvgtibeom')`.
:::



## Fetching the CID with an IPFS Gateway

To fetch the CID using an IPFS gateway is as simple as loading one of the following URLs:

- [https://ipfs.io/ipfs/bafybeicn7i3soqdgr7dwnrwytgq4zxy7a5jpkizrvhm5mv6bgjd32wm3q4](https://ipfs.io/ipfs/bafybeicn7i3soqdgr7dwnrwytgq4zxy7a5jpkizrvhm5mv6bgjd32wm3q4)
- [https://dweb.link/ipfs/bafybeicn7i3soqdgr7dwnrwytgq4zxy7a5jpkizrvhm5mv6bgjd32wm3q4](https://dweb.link/ipfs/bafybeicn7i3soqdgr7dwnrwytgq4zxy7a5jpkizrvhm5mv6bgjd32wm3q4)
- [https://gateway.pinata.cloud/ipfs/bafybeicn7i3soqdgr7dwnrwytgq4zxy7a5jpkizrvhm5mv6bgjd32wm3q4](https://gateway.pinata.cloud/ipfs/bafybeicn7i3soqdgr7dwnrwytgq4zxy7a5jpkizrvhm5mv6bgjd32wm3q4)

## Summary and next steps

In this quickstart guide, you learned the different approaches to retrieving CIDs from the IPFS network and how to pick the most appropriate method for your specific needs.

You then fetched the image that was pinned in the [publishing with a pinning service quickstart guide](./publish.md) using an IPFS Kubo node and an IPFS Gateway.

Possible next steps include:

- Learn more about [how IPFS works](../concepts/how-ipfs-works.md) and [the lifecycle of data in IPFS](../concepts/lifecycle.md).
