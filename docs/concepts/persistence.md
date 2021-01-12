---
title: Persistence
legacyUrl: https://docs.ipfs.io/guides/concepts/pinning/
description: Learn about how IPFS treats persistence and permanence on the web and how pinning can help keep data from being discarded.
---

# Persistence, permanence, and pinning

Understand the concepts behind IPFS pinning, along with the differences between persistence, permanence, and pinning itself.

## Persistence versus permanence

One of the main goals of IPFS is to preserve humanity's history by enabling the permanent web. But what does permanence mean? And why does this matter?

Today [The average lifespan of a web page is 100 days](https://blogs.loc.gov/thesignal/2011/11/the-average-lifespan-of-a-webpage/) before it's gone forever. It's not good enough for the primary medium of our era to be this fragile. IPFS keeps every version of your files and makes it simple to set up resilient networks for mirroring data.

Trying to counter that, nodes on the IPFS network automatically cache the downloaded resources and keep those available for uploading to other nodes. This system depends on nodes being willing and able to cache and share resources with the network. Storage is finite, so nodes need to clear out some of their previously cached resources to make room for new resources. This process is called _garbage collection_.

To ensure that data _persists_ on IPFS, and is not deleted during garbage collection, [data can be pinned](/how-to/pin-files/) to one or more IPFS nodes. In simple terms, pinning gives you control over disk space and data retention. As such, you should use that control to pin any content you wish to keep on IPFS indefinitely.

## Garbage Collection

[Garbage collection](<https://en.wikipedia.org/wiki/Garbage_collection_(computer_science)>) is a form of automatic resource management widely used in software development. The garbage collector attempts to reclaim garbage, or memory occupied by objects that are no longer in use. IPFS uses garbage collection to free disk space on your IPFS node.

The IPFS garbage collector (or GC for short) is configured in the `Datastore`section of [the go-ipfs config file](https://github.com/ipfs/go-ipfs/blob/master/docs/config.md). The important settings related to the garbage colllector are:

- `StorageGCWatermark`: The percentage of the `StorageMax` value at which a garbage collection will be triggered automatically, if the daemon is running with automatic garbage collection enabled. The default is 90`.

- `GCPeriod` A time duration specifying how frequently to run a garbage collection. Only used if automatic gc is enabled. Default: 1h

Currently garbage collection does not run automatically for IPFS nodes by default. To run it manually run [`ipfs repo gc`](https://docs.ipfs.io/reference/cli/#ipfs-repo-gc).

To enable automatic garbage collection you have to run the [ìpfs daemon](https://docs.ipfs.io/reference/cli/#ipfs-daemon) command to start your IPFS node with the `--enable-gc`option.

::: tip
If you use IPFS Desktop or the IPFS Web UI the settings related to garbage collection can be found under `settings`. You can also directly run the garbage collector by clicking on the taskbar icon of the IPFS Desktop application and selecting `Àdvanced` > `Run Garbage Collector`.
:::

## Pinning in context

::: tip
If you want to learn more about how pinning fits into the overall lifecycle of data in IPFS, check out the course from the IPFS Camp 2019: [Core Course: The Lifecycle of Data in DWeb](https://www.youtube.com/watch?v=fLUq0RkiTBA)
:::

Your IPFS node can store data based on different kinds of user events. For example, you can add a file using the CLI command [`ipfs add`](https://docs.ipfs.io/reference/cli/#ipfs-add). It also automatically stores data you request (e.g., by loading a web page through the gateway) or with [`ipfs cat`](https://docs.ipfs.io/reference/cli/#ipfs-cat). Your node will check if any peers have the requested data, and if so, will store the results in the local cache.

As a reminder, not every CLI command will automatically pin content, but specific ones do, as is the case of `ipfs add.`

## Pinning services

To ensure that your important data is retained, you may want to use a pinning service. These services run lots of IPFS nodes and allow users to pin data on those nodes for a fee. Some services offer free storage-allowance for new users. Pinning services are handy when:

- You don't have a lot of disk space, but you want to ensure your data sticks around.
- Your computer is a laptop, phone, or tablet that will have intermittent connectivity to the network. Still, you want to be able to access your data on IPFS from anywhere at any time, even when the device you added it from is offline.
- You want a backup that ensures your data is always available from another computer on the network if you accidentally delete or garbage-collect your data on your own computer.

Some available pinning service providers are:

- You don't have a lot of disk space but want to ensure some data sticks around.
- You have a device with poor network connectivity but still want your data on IPFS to be available anywhere, at any time.
- You want a readily available backup for your data to protect it from accidental deletions or garbage collection.

Some available pinning service providers are:

- [Axel](https://www.axel.org/blog/2019/07/23/qa-with-the-developers-of-axel-ipfs/)
- [Eternum](https://www.eternum.io/)
- [Infura](https://infura.io/)
- [Pinata](https://pinata.cloud/)
- [Temporal](https://temporal.cloud/)
