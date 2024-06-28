---
title: Persistence
description: Learn about how IPFS treats persistence and permanence on the web and how pinning can help keep data from being discarded.
---

# Persistence, permanence, and pinning

Understand the concepts behind IPFS pinning, along with the differences between persistence, permanence, and pinning.

## Persistence versus permanence

One goal of IPFS is to preserve humanity's history by letting users store data while minimizing the risk of that data being lost or accidentally deleted. This is often referred to as permanence. But what does permanence _actually_ mean, and why does it matter?

A 2011 study found that the [average lifespan of a web page is 100 days](https://blogs.loc.gov/thesignal/2011/11/the-average-lifespan-of-a-webpage/) before it's gone forever. It's not good enough for the primary medium of our era to be this fragile. IPFS can keep every version of your file you wish to store, and make it simple to set up resilient networks for mirroring data.

Nodes on the IPFS network can automatically cache resources they download, and keep those resources available for other nodes. This system depends on nodes being willing and able to cache and share resources with the network. Storage is finite, so nodes need to clear out some of their previously cached resources to make room for new resources. This process is called _garbage collection_.

To ensure that data _persists_ on IPFS, and is not deleted during garbage collection, [data can be pinned](../how-to/pin-files.md) to one or more IPFS nodes. Pinning gives you control over disk space and data retention. As such, you should use that control to pin any content you wish to keep on IPFS indefinitely.

## Garbage collection

[Garbage collection](<https://en.wikipedia.org/wiki/Garbage_collection_(computer_science)>) is a form of automatic resource management widely used in software development. The garbage collector attempts to reclaim memory occupied by objects that are no longer in use. IPFS uses garbage collection to free disk space on your IPFS node by deleting data that it thinks is no longer needed.

## Pinning in context

An IPFS node can protect data from garbage collection based on different kinds of user events:

- The universal way is by adding a low-level [local pin](../how-to/pin-files.md). This works for all data types and can be done manually, but if you add a file using the CLI command [`ipfs add`](../reference/kubo/cli.md#ipfs-add), your IPFS node will automatically pin that file for you.
- When working with files and directories, a better way may be to add them to the local [Mutable File System (MFS)](glossary.md#mfs). This protects the data from garbage collection in the same way as local pinning but is somewhat easier to manage.

::: tip
If you want to learn more about how pinning fits into the overall lifecycle of data in IPFS, check out the course from [IPFS Camp _The Lifecycle of Data in DWeb_](https://www.youtube.com/watch?v=fLUq0RkiTBA).
:::

## Pinning services

To ensure that your important data is retained, you may want to use a pinning service. These services run lots of IPFS nodes and allow users to pin data on those nodes for a fee. Some services offer a free storage allowance for new users. Pinning services are handy when:

- You don't have a lot of disk space, but you want to ensure your data sticks around.
- Your computer is a laptop, phone, or tablet that will have intermittent connectivity to the network. Still, you want to be able to access your data on IPFS from anywhere at any time, even when the device you added it from is offline.
- You want a backup that ensures your data is always available from another computer on the network if you accidentally delete or garbage-collect your data on your own computer.

Some available pinning service providers are:

:::warning
Some of the pinning services listed below are operated by third party companies. There is no guarantee that these third party companies will continue to maintain their pinning service. It is strongly recommended that you thoroughly research a pinning service before using it to host your data.
:::

- [4EVERLAND Bucket](https://www.4everland.org/bucket/)
- [Estuary](https://estuary.tech/)
- [Functionland](https://fx.land/)
- [Filebase](https://filebase.com/)
- [Infura](https://infura.io/)
- [Kriptonio](https://kriptonio.com/)
- [NFT.Storage](https://nft.storage/)
- [Pinata](https://pinata.cloud/)
- [Scaleway](https://labs.scaleway.com/en/ipfs-pinning/)
- [Spheron](https://spheron.network/)
- [Web3.Storage](https://web3.storage/)

See how to [work with remote pinning services](../how-to/work-with-pinning-services.md).

## Long-term storage

Storing data using a personal IPFS node is easy, but it can be inconvenient since you have to manage your own hardware. This problem gave rise to _pinning services_, paid services that allow you to upload your data to a remotely hosted IPFS node and retrieve it whenever you want. However, while paying a pinning service to store data is a convenient workaround, it still requires someone to bear the cost of storing that data. If that one sponsor stops paying for that pinning, the content may be lost entirely. While IPFS guarantees that any content on the network is discoverable, it doesn't guarantee that any content is persistently available. This is where [Filecoin](https://filecoin.io) comes in.

### Storing data with Filecoin

[Filecoin](https://filecoin.io) is a decentralized storage network in which storage providers rent their storage space to clients. The client and the storage provider agree on how much data will be stored, for how long, and at what cost. This agreement is called a _deal_. Once both parties agree to a deal, the client sends the data to the storage provider, who periodically verifies that they are correctly storing the data. When the client wants the data back, they send a request to the storage provider, who initiates the data transfer back to the client. For more information on how Filecoin works, head over to the [official Filecoin documentation →](https://docs.filecoin.io/about/basics/how-filecoin-works/)

Filecoin provides users with a dependable, long-term storage solution. However, there are some limitations to consider. The retrieval process is not always as fast as an IPFS pinning service, and the minimum file size accepted by a Filecoin storage provider can be several GiB. Also, the process for creating a storage deal may seem complicated to new users who aren't familiar with blockchain transactions or simply aren't comfortable working within a command line.

### IPFS + Filecoin solutions

Fortunately, there is a growing community of tools and service providers that help simplify the process of making content available over IPFS while also persisting the data via Filecoin. These solutions make it simple to store data using decentralized protocols by acting both as IPFS pinning services and Filecoin storage platforms. Combining the two means that when you upload a file, that file is immediately available for download. Additionally, combined IPFS + Filecoin solutions will periodically bundle data and create a deal with a reputable Filecoin storage provider, ensuring that the data is available in long-term storage. Many solutions include API client libraries for developers to integrate into their apps and services, as well as web interfaces for quickly managing and inspecting files.

Options in this category include:

- [Web3.Storage](https://Web3.Storage)
- [NFT.storage](https://nft.storage/)
- [Estuary](https://estuary.tech)
- [Powergate](https://github.com/textileio/powergate)
- [ChainSafe Storage](https://storage.chainsafe.io)
- [Fleek Storage](https://fleek.co/storage)
- [Spheron](https://spheron.network)
