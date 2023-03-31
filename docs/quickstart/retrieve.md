---
title: 'Retrieval with IPFS'
description: 'learn about the different ways that CIDs can be fetched from the other peers in the IPFS network'
---

# Retrieving a CID with IPFS

In this quick start, you will learn the different approaches to retrieving CIDs from the IPFS network and how to pick the most appropriate method for your purpose.

You will fetch the image that was pinned in the [publishing with a pinning service quickstart guide](./publish.md) which has the CID: `bafybeicn7i3soqdgr7dwnrwytgq4zxy7a5jpkizrvhm5mv6bgjd32wm3q4`.

## IPFS retrieval methods

There are two primary ways to retrieve files (and directories) published with IPFS:

- [**IPFS node**](/concepts/nodes/) by installing one of the IPFS implementations, e.g. [Kubo](/concepts/nodes/#kubo) on your computer which allows you to fetch and verify CIDs from other nodes in the IPFS network.
- [**IPFS Gateway**](/concepts/ipfs-gateway/) HTTP interface to the IPFS network that allows fetching data from IPFS with HTTP. Pinning services typically offer an IPFS gateway as a way to easily retrieve your CIDs.

The first option allows you to speak the suit of IPFS protocols. The second serves as a bridge in situations where you might be constrained to using HTTP, such as in web apps where your app users may not be running an IPFS node.

IPFS Gateways, in their most basic form, are typically IPFS nodes that are hosted by someone else and expose an HTTP interface to fetch CIDs:

![gateway diagram](./images/gateway.png)

## Verified vs. trusted CID retrieval

Another thing to consider when considering the two approaches is _verification_. By default, an IPFS node hashes each block and ensures that when the file is constructed from the blocks (into a Merkle DAG), it results in the CID you requested. However, with IPFS Gateways, verification is optional.

Non-verified retrieval is also commonly referred to as trusted retrieval because you're trusting the gateway to return the correct response without calculating the hash.

While verification is almost always recommended, in reality, there are situations where trusted retrieval is the pragmatic choice, like when embedding images on a website.

## Fetching the CID with Kubo

To fetch the CID with [Kubo](/install/command-line/), you need to first ensure that the Kubo daemon is installed and running:

```bash
$ ipfs daemon
```

To fetch the file, run the [`ipfs get [CID]`](/reference/kubo/cli/#ipfs-get) command:

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

## Fetching the CID with an IPFS Gateway

To fetch the CID using an IPFS gateway is as simple as loading one of the following URLs:

- [https://ipfs.io/ipfs/bafybeicn7i3soqdgr7dwnrwytgq4zxy7a5jpkizrvhm5mv6bgjd32wm3q4](https://ipfs.io/ipfs/bafybeicn7i3soqdgr7dwnrwytgq4zxy7a5jpkizrvhm5mv6bgjd32wm3q4)
- [https://cloudflare-ipfs.com/ipfs/bafybeicn7i3soqdgr7dwnrwytgq4zxy7a5jpkizrvhm5mv6bgjd32wm3q4](https://cloudflare-ipfs.com/ipfs/bafybeicn7i3soqdgr7dwnrwytgq4zxy7a5jpkizrvhm5mv6bgjd32wm3q4)
- [https://gateway.pinata.cloud/ipfs/bafybeicn7i3soqdgr7dwnrwytgq4zxy7a5jpkizrvhm5mv6bgjd32wm3q4](https://gateway.pinata.cloud/ipfs/bafybeicn7i3soqdgr7dwnrwytgq4zxy7a5jpkizrvhm5mv6bgjd32wm3q4)
