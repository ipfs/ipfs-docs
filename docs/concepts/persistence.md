---
title: Persistence
legacyUrl: https://docs.ipfs.io/guides/concepts/pinning/
---

# Persistence, permanence and pinning

::: tip
If you're interested in how pinning files fits into the overall lifecycle of data in IPFS, check out this video from IPFS Camp 2019! [Core Course: The Lifecycle of Data in Dweb](https://www.youtube.com/watch?v=fLUq0RkiTBA)
:::

IPFS nodes treat the data they store like a cache, meaning that there is no guarantee that the data will continue to be stored. "Pinning" a CID tells an IPFS server that the data is important and mustn't be thrown away.

You should pin any content you consider important in order to ensure that content is retained over the long term. Since data important to someone else may not be important to you, pinning enables you to have control over the disk space and data retention you need.

## Pinning in context

Your IPFS node can store data based on different kinds of user events. For instance, you can add a file with `ipfs add ...`. It will also store data you request, such as by loading a web page through the gateway (`http://localhost:8080/ipfs/QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco`) or with `ipfs cat ...`. Your node will consult with other IPFS peers to find these requested data, and will store the results in the local cache. `ipfs add` will automatically pin the content, but other IPFS commands do not include automatic pinning.

When garbage collection is triggered on a node, any pinned content is automatically exempt from deletion. Non-pinned data may be deleted; if you request it again later, the data can be retrieved from another node.

## Pinning services

To ensure that your important data is retained, you may want to use a pinning service. Such a service normally trades money for the service of guaranteeing they'll keep your data pinned. Some cases where this might be important to you:

- You don’t have a lot of disk space, but you want to ensure some data sticks around.
- Your computer is a laptop, phone, or tablet that will have intermittent connectivity to the network, but you want to be able to access your data on IPFS from anywhere at any time, even when the device you added it from is offline.
- You want a backup that ensures your data is always available from another computer on the network in case you accidentally delete or garbage-collect on your own computer.

<LegacyCallout />
