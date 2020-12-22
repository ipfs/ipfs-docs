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

You should pin any content you consider important in order to ensure that content is retained over the long term. Since data important to someone else may not be important to you, pinning enables you to have control over the disk space and data retention you need.

## Pinning in context

::: tip
If you're interested in how pinning files fits into the overall lifecycle of data in IPFS, check out this video from IPFS Camp 2019! [Core Course: The Lifecycle of Data in Dweb](https://www.youtube.com/watch?v=fLUq0RkiTBA)
:::

Your IPFS node can store data based on different kinds of user events. For instance, you can add a file with `ipfs add ...`. It will also store data you request, such as by loading a web page through the gateway (`http://localhost:8080/ipfs/QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco`) or with `ipfs cat ...`. Your node will consult with other IPFS peers to find these requested data, and will store the results in the local cache. `ipfs add` will automatically pin the content, but other IPFS commands do not include automatic pinning. More information on file pinning options can be found in [the pinning guide](https://docs.ipfs.io/how-to/pin-files/#three-kinds-of-pins)

When garbage collection is triggered on a node, any pinned content is automatically exempt from deletion. Non-pinned data may be deleted; if you request it again later, the data can be retrieved from another node.

## Pinning services

To ensure that your important data is retained, you may want to use a pinning service. Such a service normally trades money for the service of guaranteeing they'll keep your data pinned. Some cases where this might be important to you:

- You don’t have a lot of disk space, but you want to ensure some data sticks around.
- Your computer is a laptop, phone, or tablet that will have intermittent connectivity to the network, but you want to be able to access your data on IPFS from anywhere at any time, even when the device you added it from is offline.
- You want a backup that ensures your data is always available from another computer on the network in case you accidentally delete or garbage-collect on your own computer.

Some available pinning service providers are:

- [Axel](https://www.axel.org/blog/2019/07/23/qa-with-the-developers-of-axel-ipfs/)
- [Eternum](https://www.eternum.io/)
- [Infura](https://infura.io/)
- [Pinata](https://pinata.cloud/)
- [Temporal](https://temporal.cloud/)
