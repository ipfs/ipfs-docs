---
title: 'Publish a file to IPFS'
description: 'learn about pinning services and the lifecycle of content-addressed data in IPFS by pinning a file to the IPFS network'
---

# Publish a file to IPFS

In this quickstart guide, you will learn about **pinning services** and the lifecycle of content-addressed data in IPFS by pinning a file to the IPFS network. By the end of this guide, you should have a better understanding of how content addressing and CIDs work from a high level.

Pinning a file to IPFS is how content is published to IPFS. Any given file can be pinned to multiple IPFS nodes to increase the redundancy and resilience of a file on the network.

To do this, you will use a [pinning service](../concepts/persistence.md#pinning-in-context) called [web3.storage](https://web3.storage/) for this. Pinning services are like hosting services that run an IPFS node for you and ensure your files are available to the IPFS network.

> **Note:** web3.storage was chosen purely for demonstration purposes, and is one of many [pinning services](../concepts/persistence.md#pinning-in-context) you can chose from. While pinning services have different SDKs and APIs, their fundemental role is the same: to store files and make them available to the IPFS network.

In this guide, you will use the web3.storage UI to upload the file. If you prefer uploading with JavaScript or Go, check out the [Web3.storage docs](https://web3.storage/docs/how-tos/store/). Alternatively,with [Filebase](https://filebase.com/) is a pinning service that offers an AWS S3 compatible API for pinning, so you can use any existing tooling

## Prerequisites

- A free [web3.storage](https://web3.storage/) account.
- The [following image](/images/welcome-to-IPFS.jpg), downloaded and saved on your computer:

## 1. Sign in to web3.storage

Start by signing into your account on web3.storage:

![web3.storage login window](./images/login-web3-storage.png)

## 2. Open the Upload files tab

After logging in, click on **Upload files** button to open the upload tab:

![web3.storage upload button](./images/web3-upload-button.png)

It should look as follows:

![web3.storage upload tab](./images/web3-upload-tab.png)

## 3. Upload and Pin the file

Either drag the [image file](/images/welcome-to-IPFS.jpg) to the dashed rectangle or click on the dashed rectangle to select the [image](/images/welcome-to-IPFS.jpg) file.

Once the file has been successfully uploaded you should see the following:

![web3.storage file uploaded](./images/web3-file-uploaded.png)

If you close the upload tab you should also be able to see a shortened Content Identifier ([CID](../concepts/content-addressing.md)) of the uploaded image, `bafyb...d32wm3q4`:

![file after upload](./images/web3-file-after-upload.png)

Congratulations, you have successfully **pinned** a file to IPFS!

The full CID for the file is: `bafybeicn7i3soqdgr7dwnrwytgq4zxy7a5jpkizrvhm5mv6bgjd32wm3q4`

### What's a CID

Let's unpack what just happened. In IPFS, every file and directory is identified with a CID. The generated CID serves as the permanent address of the file and can be used by anyone to find it on the IPFS network.

### What happens when you pin a file

When you uploaded and pinned the file to web3.storage you performed two actions:

1. **Representing:** The file was transformed into a content-addressable representation known as a [Merkle DAG](../concepts/merkle-dag.md). Don't worry about what that means, besides that it makes the files and directories **content-addressable** with CIDs by chunking files into smaller chunks and calculating their hashes.
2. **providing:** The content-addressable representation of the file was persisted on one of web3.storage's IPFS nodes (servers running an IPFS node) and made publicly available to the IPFS network.

## Fetching the CID from multiple gateways

## The lifecycle of data in IPFS

- Representing
- Providing/Advertising
- Fetching
- Pinning
- Deleting

> Note: Note that the transformation into a content-addressable representation can be a local operation that doesn't require any network connectivity. With web3.storage this happens on the client-side in the browser but it's also common .

This means that you can now share the CID and anyone should be able to fetch it.

## Conclusion

## Next steps
