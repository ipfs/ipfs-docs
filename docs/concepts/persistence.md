---
title: Persistence
legacyUrl: https://docs.ipfs.io/guides/concepts/pinning/
description: Learn about how IPFS treats persistence and permanence on the web, and how pinning can help keep data from being discarded.
---

# Persistence, permanence, and pinning

This guide will help you understand the concepts behind IPFS pinning, along with the differences between persistence, permanence, and pinning itself. How do they differ? What do they have in common? Keep reading to have those questions answered!

## Persistence versus permanence

One of the main goals of IPFS is to preserve humanity's history by enabling the permanent web. But what does permanence mean? And why does this matter?

Today [The average lifespan of a web page is 100 days](https://blogs.loc.gov/thesignal/2011/11/the-average-lifespan-of-a-webpage/) before it's gone forever. It's not good enough for the primary medium of our era to be this fragile. Therefore IPFS keeps every version of your files and makes it simple to set up resilient networks for mirroring data.

Trying to counter that, nodes on the IPFS network automatically cache the downloaded resources and keep those available for uploading to other nodes. This system depends on nodes being willing and able to cache and share resources with the network. Storage is finite, so nodes need to clear out some of their previously cached resources to make room for new resources. To ensure that data stays available on IPFS (i.e., persisted) and not be thrown away, they can be "pinned" to one or more IPFS nodes. When "pinning," a CID tells an IPFS node that the data is important and it shouldn't throw it away.

In simple terms, pinning gives you control over disk space and data retention. As such, you should use that control to pin any content you wish to keep on IPFS indefinitely.

## Pinning in context

::: tip
If you're interested in how pinning files fits into the overall lifecycle of data in IPFS, check out this video from IPFS Camp 2019! [Core Course: The Lifecycle of Data in Dweb](https://www.youtube.com/watch?v=fLUq0RkiTBA)
:::

Your IPFS node can store data based on different kinds of user events. For example, you can add a file using the CLI command [`ipfs add`](https://docs.ipfs.io/reference/cli/#ipfs-add). It also automatically stores data you request (e.g., by loading a web page through the gateway) or with [`ipfs cat`](https://docs.ipfs.io/reference/cli/#ipfs-cat). Your node will check if any peers have the requested data, and if so, will store the results in the local cache.

As a reminder, not every CLI command will automatically pin content, but specific ones do, as is the case of `ipfs add.`

## Pinning services

To ensure that your important data is retained, you may want to use a pinning service. Such a service normally trades money for the service of guaranteeing they'll keep your data pinned. Some cases where this might be important to you:

- You don't have a lot of disk space but want to ensure some data sticks around.
- You have a device with poor network connectivity but still want your data on IPFS to be available anywhere, at any time.
- You want a readily available backup for your data to protect it from accidental deletions or garbage collection.

Some available pinning service providers are:

- [Axel](https://www.axel.org/blog/2019/07/23/qa-with-the-developers-of-axel-ipfs/)
- [Eternum](https://www.eternum.io/)
- [Infura](https://infura.io/)
- [Pinata](https://pinata.cloud/)
- [Temporal](https://temporal.cloud/)
