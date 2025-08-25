---
title: Peering with content providers
description: Optimize retrieval speed by making direct connections to large content providers.
---

# Peering with content providers

IPFS allows you to request data from any IPFS node with a copy using the data's [CID][cid-explainer]. This process usually involves a content routing lookup in the [DHT][dht-explainer] to find providers.

If you're running an IPFS node that serves many requests, such as a public HTTP gateway, you may be able to speed up queries by maintaining long-lived connections to nodes that provide many CIDs.

Prioritizing connections to certain peers is called **Peering**, and you can tell IPFS which peers to prioritize by editing the [`Peering` configuration][docs-peering-config] in your [Kubo config file](https://github.com/ipfs/kubo/blob/master/docs/config.md).

To _peer_ with nodes from Cloudflare, for example, update your config to include a `Peering` section like this:
```json
{
  "Peering": {
    "Peers": [
      {
        "ID": "QmcfgsJsMtx6qJb74akCw1M24X1zFwgGo11h1cuhwQjtJP",
        "Addrs": ["/dnsaddr/node-8.ingress.cloudflare-ipfs.com"]
      }
    ]
  }
}
```

::: tip
Generally speaking, users running IPFS at home won't need to set up peering and can ignore this page!

Peering is most helpful for nodes that have a lot of concurrent connections since it prevents the [connection manager][docs-connmgr] from dropping connections it thinks aren't "useful" any longer. If you find yourself running near the connection manager's limit, you may benefit from peering with content providers.
:::

[dht-explainer]: ../concepts/how-ipfs-works.md#distributed-hash-tables-dhts
[cid-explainer]: ../concepts/content-addressing.md
[docs-peering-config]: ../how-to/configure-node.md
[docs-connmgr]: ../how-to/configure-node.md
