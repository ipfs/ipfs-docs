---
title: 'Publish a file to IPFS'
description: 'learn about pinning services and the lifecycle of content-addressed data in IPFS by pinning a file to the IPFS network'
---

# Publish a file to IPFS with a pinning service

In this quickstart guide, you will learn about [pinning services](../concepts/persistence.md#pinning-in-context) and the lifecycle of content-addressed data in IPFS by pinning a file to the IPFS network using a pinning service called [web3.storage](https://web3.storage/). By the end of this guide, you should have a better understanding of how content addressing and CIDs work from a high level.

> **Note:** The web3.storage pinning service was chosen purely for demonstration purposes, and is one of many [pinning services](../concepts/persistence.md#pinning-in-context) you can choose from. While each pinning services has different SDKs and APIs, their fundamental role is the same - to store files and make them available to the IPFS network. In fact, one of the main benefits of IPFS is that files can be pinned to multiple pinning services, thereby reducing vendor lock-in.

## What is pinning?

Pinning a file to IPFS is how content is published to IPFS. Any given file represented by a CID can be pinned to multiple IPFS nodes to increase the redundancy and resilience of the file on the network. Pinning services are like hosting services that run an IPFS node for you and ensure that your files are available to the IPFS network.

:::callout
Data pinned to the IPFS network is public by default and retrievable by anyone. Make sure to avoid publishing private data or take the necessary measures to adequately encrypt it before publishing.
:::
## Prerequisites

- A free [web3.storage](https://web3.storage/) account.
- The [following image](/images/welcome-to-IPFS.jpg), downloaded and saved on your computer:

![image](/images/welcome-to-IPFS.jpg)

## Uploading and pinning a file

1. Sign into your account on web3.storage:

   ![web3.storage login window](./images/login-web3-storage.png)

1. After logging in, click on **Upload files** to open the upload tab:

   ![web3.storage upload button](./images/web3-upload-button.png)

   The Upload a file tab:

   ![web3.storage upload tab](./images/web3-upload-tab.png)

1. Upload and pin the file by either dragging the [image file](/images/welcome-to-IPFS.jpg) to the dashed rectangle, or clicking on the dashed rectangle to select the [image](/images/welcome-to-IPFS.jpg) file.

   Once the file has been successfully uploaded, the following displays:

   ![web3.storage file uploaded](./images/web3-file-uploaded.png)

   If you close the upload tab, you should also be able to see a shortened **Content Identifier (CID)** of the uploaded image, **`bafyb...d32wm3q4`**:

   ![file after upload](./images/web3-file-after-upload.png)

Congratulations, you have successfully **pinned** a file to IPFS! 🎉

Let's unpack what just happened, by looking at CIDs, and how they fits into the lifecycle of data in IPFS

## What's a CID?

In IPFS, every file and directory is identified with a Content Identifier ([CID](../concepts/content-addressing.md)). The CID serves as the **permanent address** of the file and can be used by anyone to find it on the IPFS network.

When a file is published to IPFS (like the image used in this guide), it's first transformed into a content-addressable representation by which the file is split into smaller chunks (if above ~1MB) which are linked, and hashed to produce the CID.

The CID for the uploaded image is:

```plaintext
bafybeicn7i3soqdgr7dwnrwytgq4zxy7a5jpkizrvhm5mv6bgjd32wm3q4
```

You can now share the CID and anyone should be able to fetch it.

> **Note:** the transformation into a content-addressable representation is a local operation that doesn't require any network connectivity. With web3.storage, this transformation happens on the client-side (in the browser.)

## The lifecycle of data in IPFS

To understand what happens when you pin a file, it's helpful to understand the lifecycle of data in IPFS, which can be summarised as follows:

1. **Content-addressable representation**: The file is transformed into a content-addressable representation with a CID. For this guide, the full details are not important. The basic idea is that this representation makes files and directories **content-addressable** via CIDs by chunking files into smaller blocks**, calculating their hashes, and constructing a [Merkle DAG](../concepts/merkle-dag.md).
2. **Pinning:** refers to the stage where the blocks of the CID are saved on an IPFS node (or multiple nodes), in this case, web3.storage. Since saving is not enough for the CID to be retrievable, pinning typically refers to two things:
   - **Advertising:** Making it discoverable to the IPFS network by advertising a record linking between the CID and the server's IP address to the network. This advertising stage is a continuous process that repeats. 
   - **Providing:** The content-addressable representation of the CID is persisted on one of web3.storage's IPFS nodes (servers running an IPFS node) and made publicly available to the IPFS network.
3. **Retrieval:** refers to when an IPFS node fetches the blocks of the CID and constructs the Merkle DAG. This achieves several things:
   - **File access:** once the Merkle DAG is constructed, the file is essentially replicated and can be accessed.
   - **Verifying** that the blocks received are the correct ones by hashing them. This allows blocks to come from any node in the network. This type of retrieval is *trustless*.
   <!-- - **Replication:** when another IPFS node fetches the CID, it increases the replication factor of the CID, thereby increasing its resilience. -->
4. **Deleting:** refers to the deletion of a CID from a node. Deletion is always a local operation. If a CID has been replicated by other nodes, it will continue to be available on the IPFS network.

## Fetching your published file

Now that the file is published and you have a CID, you will learn how it can be fetched from the IPFS network.

There are two primary ways to fetch files published with IPFS:

- **IPFS node** by installing one of the IPFS implementations, e.g. [Kubo](/concepts/nodes/#kubo)
- [**IPFS Gateway**](/concepts/ipfs-gateway/) HTTP interface to the IPFS network that allows fetching data from IPFS with HTTP.

The first option allows you to speak the native IPFS protocol. The latter serves as a bridge in situations where you might be constrained to using HTTP, such as in web apps where your app users may not be running an IPFS node.

### Using an IPFS Node



### Fetching the CID with an IPFS Gateway

![gateway diagram](./images/gateway.png)

- [https://ipfs.io/ipfs/bafybeicn7i3soqdgr7dwnrwytgq4zxy7a5jpkizrvhm5mv6bgjd32wm3q4](https://ipfs.io/ipfs/bafybeicn7i3soqdgr7dwnrwytgq4zxy7a5jpkizrvhm5mv6bgjd32wm3q4)
- [https://cloudflare-ipfs.com/ipfs/bafybeicn7i3soqdgr7dwnrwytgq4zxy7a5jpkizrvhm5mv6bgjd32wm3q4](https://cloudflare-ipfs.com/ipfs/bafybeicn7i3soqdgr7dwnrwytgq4zxy7a5jpkizrvhm5mv6bgjd32wm3q4)
- [https://gateway.pinata.cloud/ipfs/bafybeicn7i3soqdgr7dwnrwytgq4zxy7a5jpkizrvhm5mv6bgjd32wm3q4](https://gateway.pinata.cloud/ipfs/bafybeicn7i3soqdgr7dwnrwytgq4zxy7a5jpkizrvhm5mv6bgjd32wm3q4)

## Conclusion

## Next steps

- If you prefer uploading with JavaScript or Go, check out the [Web3.storage docs](https://web3.storage/docs/how-tos/store/).
- Try out [Filebase](https://filebase.com/), a pinning service that offers an [AWS S3-compatible API for pinning](https://docs.filebase.com/getting-started/s3-api-getting-started-guide), so you can use any S3-compatible SDK, e.g. [aws-sdk](https://www.npmjs.com/package/aws-sdk), and [many](https://github.com/s3tools/s3cmd) more.
