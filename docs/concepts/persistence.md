---
title: Persistence
legacyUrl: https://docs.ipfs.io/guides/concepts/pinning/
description: Learn about how IPFS treats persistence and permanence on the web, and how pinning can help keep data from being discarded.
---

# Persistence, permanence, and pinning

::: tip
If you're interested in how pinning fits into the overall lifecycle of data in IPFS, check out this video from IPFS Camp 2019! [Core Course: The Lifecycle of Data in Dweb](https://www.youtube.com/watch?v=fLUq0RkiTBA)
:::

When an IPFS node interacts with the network, it automatically stores copies of data that it comes across. If you load a web page through an IPFS gateway `localhost:8080/ipfs/QmXoyp...` then your local node will store a copy of the website for a short period of time. Part of the IPFS data lifecycle is _garbage collection_. This is when a node deletes old or unused data from disk to help save space and keep the node efficient. IPFS nodes treat the data they store like a cache, meaning that there is no guarantee that the data will continue to be stored.

To ensure data stays around, you can _pin_ files to the node and stop them from being thrown into the _garbage collection_ cycle. _Pinning_ a CID tells an IPFS node that the data is important and should not be deleted. You should pin any content you consider important to ensure that it's retained over the long term. When garbage collection is triggered on a node, any pinned content is automatically exempt from deletion. Non-pinned data may be deleted.

## Pinning services

To ensure that your important data is retained, you may want to use a pinning service. These services run lots of IPFS nodes and allow users to pin data on those nodes for a fee. Some services offer free storage-allowance for new users. Pinning services are handy when:

- You don't have a lot of disk space, but you want to ensure your data sticks around.
- Your computer is a laptop, phone, or tablet that will have intermittent connectivity to the network. Still, you want to be able to access your data on IPFS from anywhere at any time, even when the device you added it from is offline.
- You want a backup that ensures your data is always available from another computer on the network if you accidentally delete or garbage-collect your data on your own computer.

Some available pinning service providers are:

- [Pinata](https://pinata.cloud/)
- [Temporal](https://temporal.cloud/)
- [Infura](https://infura.io/)
- [Eternum](https://www.eternum.io/)
- [Axel](https://www.axel.org/blog/2019/07/23/qa-with-the-developers-of-axel-ipfs/) 
