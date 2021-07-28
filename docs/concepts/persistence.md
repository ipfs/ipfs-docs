---
title: Persistence
description: Learn about how IPFS treats persistence and permanence on the web and how pinning can help keep data from being discarded.
---

# Persistence, permanence, and pinning

Understand the concepts behind IPFS pinning, along with the differences between persistence, permanence, and pinning.

## Persistence versus permanence

One goal of IPFS is to preserve humanity's history by letting users store data while minimising the risk of that data being lost or accidentally deleted. This is often referred to as permanence. But what does permanence _really_ mean, and why does it matter?

A 2011 study found that the [average lifespan of a web page is 100 days](https://blogs.loc.gov/thesignal/2011/11/the-average-lifespan-of-a-webpage/) before it's gone forever. It's not good enough for the primary medium of our era to be this fragile. IPFS can keep every version of your file you wish to store, and make it simple to set up resilient networks for mirroring data.

Nodes on the IPFS network can automatically cache resources they download, and keep those resources available for other nodes. This system depends on nodes being willing and able to cache and share resources with the network. Storage is finite, so nodes need to clear out some of their previously cached resources to make room for new resources. This process is called _garbage collection_.

To ensure that data _persists_ on IPFS, and is not deleted during garbage collection, [data can be pinned](../how-to/pin-files.md) to one or more IPFS nodes. Pinning gives you control over disk space and data retention. As such, you should use that control to pin any content you wish to keep on IPFS indefinitely.

## Garbage Collection

[Garbage collection](<https://en.wikipedia.org/wiki/Garbage_collection_(computer_science)>) is a form of automatic resource management widely used in software development. The garbage collector attempts to reclaim memory occupied by objects that are no longer in use. IPFS uses garbage collection to free disk space on your IPFS node by deleting data that it thinks is no longer needed.

The IPFS garbage collector is configured in the `Datastore`section of [the go-ipfs config file](https://github.com/ipfs/go-ipfs/blob/master/docs/config.md). The important settings related to the garbage collector are:

- `StorageGCWatermark`: The percentage of the `StorageMax` value at which a garbage collection will be triggered automatically, if the daemon is running with automatic garbage collection enabled. The default is 90`.

- `GCPeriod`: Specify how frequently garbage collection should run. Only used if automatic garbage collection is enabled. The default is 1 hour.

To manually start garbage collection, [run `ipfs repo gc`](../reference/cli.md#ipfs-repo-gc):

```bash
ipfs repo gc

> removed QmPZhyTu8D7NqR5NvgkgNYsSYD4CNjnyuFejB8i23itJvA
> removed QmSYQFVAZgEnpa6NxiW5agyj3XU9VR4CbERShXiLhuPPPE
> removed QmS6SJXApoi59hqD8Naktgakc6UNHK1XDhqhtMg9sBhY8g
```

To enable automatic garbage collection use `--enable-gc` when starting the IPFS daemon:

```bash
ipfs daemon --enable-gc

> Initializing daemon...
> go-ipfs version: 0.9.0
> Repo version: 10
> ...
```

::: tip
If you use IPFS Desktop, you can trigger garbage collection by clicking on the taskbar icon of the IPFS Desktop application and selecting **Advanced** → **Run Garbage Collector**.
:::

## Pinning in context

An IPFS node can protect data from garbage collection based on different kinds of user events.
- The universal way is by adding a low-level [local pin](../how-to/pin-files.md). This works for all data types and can be done manually, but if you add a file using the CLI command [`ipfs add`](../reference/cli.md#ipfs-add), your IPFS node will automatically pin that file for you.
- When working with files and directories, a better way may be to add them to the local [Mutable File System (MFS)](glossary.md#mfs). This protects the data from garbage collection in the same way as local pinning, but is somewhat easier to manage.


::: tip
If you want to learn more about how pinning fits into the overall lifecycle of data in IPFS, check out the course from [IPFS Camp _The Lifecycle of Data in DWeb_](https://www.youtube.com/watch?v=fLUq0RkiTBA).
:::


## Pinning services

To ensure that your important data is retained, you may want to use a pinning service. These services run lots of IPFS nodes and allow users to pin data on those nodes for a fee. Some services offer free storage-allowance for new users. Pinning services are handy when:

- You don't have a lot of disk space, but you want to ensure your data sticks around.
- Your computer is a laptop, phone, or tablet that will have intermittent connectivity to the network. Still, you want to be able to access your data on IPFS from anywhere at any time, even when the device you added it from is offline.
- You want a backup that ensures your data is always available from another computer on the network if you accidentally delete or garbage-collect your data on your own computer.

Some available pinning service providers are:

- [Axel](https://www.axel.org/2019/07/23/qa-with-the-developers-of-axel-ipfs/)
- [Eternum](https://www.eternum.io/)
- [Infura](https://infura.io/)
- [Pinata](https://pinata.cloud/)
- [Temporal](https://temporal.cloud/)
- [Crust Network](https://crust.network/)

See how to [work with remote pinning services](../how-to/work-with-pinning-services.md).

## Long-term storage

IPFS is a protocol for sharing data, and pinning services can leverage it to act as an online storage medium. However, pinning services themselves should not be considered a long-term storage solution. Once a file, or collection of files, is no longer pinned, the network may lose the data forever. Web3.Storage is a service that leverages both IPFS and Filecoin to provide users with secure, content addressable long-term storage.

Storing data using a personal IPFS node is easy but inconvenient since you constantly have to manage your own hardware. This problem gave rise to pinning services that allow you to upload your data to a remotely-hosted IPFS node and retrieve it whenever you want. However, pinning services can be a dangerous form of long-term storage. Once a file, or collection of files, is no longer pinned, it may be lost entirely. There is no guarantee that the data is still accessible through IPFS. This is where Filecoin comes in.

### Storing data with Filecoin

Filecoin is a decentralized storage network where storage providers rent their storage space to clients. The client and the storage provider agree on how much data will be stored, how long, and the cost. This agreement is called a _deal_. Once both parties agree to the deal, the client sends the data to the storage provider, who periodically verifies that they are correctly storing the data. When the client wants the data back, they send a request to the storage provider who initiates the data transfer back to the client. For more information on how Filecoin works, head over to the [Filecoin documentation site →](https://docs.filecoin.io/about-filecoin/how-filecoin-works/)

Filecoin provides users with a dependable long-term storage solution. However, there are some limitations. The retrieval process is not as fast as an IPFS pinning service, and the minimum file size is several GiB. Also, the process for creating a storage deal can seem complicated to new users who aren't familiar with blockchain transactions or simply aren't comfortable working directly within a command line. To address these problems, Protocol Labs created Web3.Storage.

### Web3.Storage

Web3.Storage is a service that makes it incredibly simple to store data using decentralized protocols. It acts as both an IPFS pinning service and a Filecoin storage platform. When you upload a file to Web3.Storage, that file is immediately available for download. Periodically, the service will bundle data and create a deal with a Filecoin storage provider, ensuring that the data is available in long-term storage.

Using Web3.Storage users can quickly upload and download their files without worrying about files sizes or transaction costs. There's even an API to allow developers programmatic access to the service. To use Web3.Storage, [head over to Web3.Storage and sign up for free →](https://web3.storage)

