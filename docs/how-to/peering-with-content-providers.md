---
title: Peering with content providers
description: Optimize retrieval speed by making direct connections to large content providers.
---

# Peering with content providers

IPFS allows you to request data from any IPFS node with a copy using the data's [CID][cid-explainer] or content identifier. This process usually involves a lookup on the [distributed hash table][dht-explainer] and may also require establishing new connections to the nodes storing the content.

If you're running an IPFS node that serves many requests, such as a public HTTP gateway, you may be able to speed up queries by maintaining long-lived connections to nodes that provide many CIDs.

Prioritizing connections to certain peers is called **Peering**, and you can tell IPFS which peers to prioritize by editing the [`Peering` configuration][docs-peering-config] in your IPFS config file.

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

## Content provider list

Below is a community-maintained list of nodes that provide a lot of content to the IPFS network.

If you're running a public IPFS gateway, you may see improved performance for popular queries by adding these nodes to your [Peering configuration][docs-peering-config].

To add your platform to this list, please [open a PR to edit this page](https://github.com/ipfs/ipfs-docs/edit/main/docs/how-to/peering-with-content-providers.md) and add yourself to the list in alphabetical order.

:::warning
This list is provided for informational purposes only. The IPFS Project does not endorse or guarantee any of the content providers listed here, nor does it have any control over their operations or services. Users should exercise their own discretion and conduct their own due diligence when selecting and interacting with content providers.
:::

### Cloudflare

| Peer ID                                          | Addresses                                      |
| -----------------------------------------------  | ---------------------------------------------  |
| `QmcFf2FH3CEgTNHeMRGhN7HNHU1EXAxoEk6EFuSyXCsvRE` | `/dnsaddr/node-1.ingress.cloudflare-ipfs.com`  |
| `QmcFmLd5ySfk2WZuJ1mfSWLDjdmHZq7rSAua4GoeSQfs1z` | `/dnsaddr/node-2.ingress.cloudflare-ipfs.com`  |
| `QmcfFmzSDVbwexQ9Au2pt5YEXHK5xajwgaU6PpkbLWerMa` | `/dnsaddr/node-3.ingress.cloudflare-ipfs.com`  |
| `QmcfJeB3Js1FG7T8YaZATEiaHqNKVdQfybYYkbT1knUswx` | `/dnsaddr/node-4.ingress.cloudflare-ipfs.com`  |
| `QmcfVvzK4tMdFmpJjEKDUoqRgP4W9FnmJoziYX5GXJJ8eZ` | `/dnsaddr/node-5.ingress.cloudflare-ipfs.com`  |
| `QmcfZD3VKrUxyP9BbyUnZDpbqDnT7cQ4WjPP8TRLXaoE7G` | `/dnsaddr/node-6.ingress.cloudflare-ipfs.com`  |
| `QmcfZP2LuW4jxviTeG8fi28qjnZScACb8PEgHAc17ZEri3` | `/dnsaddr/node-7.ingress.cloudflare-ipfs.com`  |
| `QmcfgsJsMtx6qJb74akCw1M24X1zFwgGo11h1cuhwQjtJP` | `/dnsaddr/node-8.ingress.cloudflare-ipfs.com`  |
| `Qmcfr2FC7pFzJbTSDfYaSy1J8Uuy8ccGLeLyqJCKJvTHMi` | `/dnsaddr/node-9.ingress.cloudflare-ipfs.com`  |
| `QmcfR3V5YAtHBzxVACWCzXTt26SyEkxdwhGJ6875A8BuWx` | `/dnsaddr/node-10.ingress.cloudflare-ipfs.com` |
| `Qmcfuo1TM9uUiJp6dTbm915Rf1aTqm3a3dnmCdDQLHgvL5` | `/dnsaddr/node-11.ingress.cloudflare-ipfs.com` |
| `QmcfV2sg9zaq7UUHVCGuSvT2M2rnLBAPsiE79vVyK3Cuev` | `/dnsaddr/node-12.ingress.cloudflare-ipfs.com` |

### European EPC Competence Center

| Peer ID | Addresses |
| ------- | --------- |
|`12D3KooWGaHbxpDWn4JVYud899Wcpa4iHPa3AMYydfxQDb3MhDME`|`/dns4/ipfs.ssi.eecc.de`|

### Filebase

| Peer ID | Addresses |
| ------- | --------- |
|`12D3KooWGtYkBAaqJMJEmywMxaCiNP7LCEFUAFiLEBASe232c2VH`|`/dns4/bitswap.filebase.io/tcp/443/wss`|

### Spheron Network

| Peer ID | Addresses |
| ------- | --------- |
|`12D3KooWFdciAga3zq3TZdrmDospFNrWRALe6VM6JpoKGEfVrqEi`|`/ip4/5.199.162.230`|
|`12D3KooWBCzniwFvfS67HyZsJtiehd7RHtcKanGGCd8h6bjVWnkb`|`/ip4/5.199.168.17`|
|`12D3KooWNbvFFq8kzS3eMonQYEmFyWTHboMZnHKr4XnN53gJKqhH`|`/ip4/5.199.162.220`|

### Storj

| Peer ID | Addresses |
| ------- | --------- |
|`12D3KooWFFhc8fPYnQXdWBCowxSV21EFYin3rU27p3NVgSMjN41k`|`/ip4/5.161.92.43/tcp/4001`<br/>`/ip4/5.161.92.43/udp/4001/quic`<br/>`/ip6/2a01:4ff:f0:3b1e::1/tcp/4001`<br/>`/ip6/2a01:4ff:f0:3b1e::1/udp/4001/quic`|
|`12D3KooWSW4hoHmDXmY5rW7nCi9XmGTy3foFt72u86jNP53LTNBJ`|`/ip4/5.161.55.227/tcp/4001`<br/>`/ip4/5.161.55.227/udp/4001/quic`<br/>`/ip6/2a01:4ff:f0:1e5a::1/tcp/4001`<br/>`/ip6/2a01:4ff:f0:1e5a::1/udp/4001/quic`|
|`12D3KooWSDj6JM2JmoHwE9AUUwqAFUEg9ndd3pMA8aF2bkYckZfo`|`/ip4/5.161.92.36/tcp/4001`<br/>`/ip4/5.161.92.36/udp/4001/quic`<br/>`/ip6/2a01:4ff:f0:3764::1/tcp/4001`<br/>`/ip6/2a01:4ff:f0:3764::1/udp/4001/quic`|

### bit.site

| Peer ID | Addresses |
| ------- | --------- |
|`12D3KooWKNJDVqWKdGH5PJUpgG7JwSQnJCHSt2abfRMht2yjyV5x`|`/dnsaddr/node-1.ipfs.bit.site`|

### StorryTV

| Peer ID | Addresses |
| ------- | --------- |
|`bafzaajaiaejca3eporu7skzkukuie5nopngnubidqmnf57fl3qet7angukq234qj`|`/dnsaddr/peer.ipfs.storry.tv`|
|`bafzaajaiaejcajedrki5t7qmgxzhwr24pfxb5cwrdf5d7rktguqurqztxsbffbvh`|`/dnsaddr/peer2.ipfs.storry.tv`|

### Web3.Storage

| Peer ID | Addresses |
| ------- | --------- |
|`bafzbeibhqavlasjc7dvbiopygwncnrtvjd2xmryk5laib7zyjor6kf3avm`|`/dns4/elastic.dag.house/tcp/443/wss`|

### 4EVERLAND

| Peer ID | Addresses |
| ------- | --------- |
|`12D3KooWQ85aSCFwFkByr5e3pUCQeuheVhobVxGSSs1DrRQHGv1t`|`/dnsaddr/node-1.ipfs.4everland.net`|

### 8api.sh

| Peer ID | Addresses |
| ------- | --------- |
|`12D3KooWGASC2jm3pmohEJXUhuStkxDitPgzvs4qMuFPaiD9x1BA`|`/ip4/78.46.108.24`|
|`12D3KooWRbWZN3GvLf9CHmozq4vnTzDD4EEoiqtRJxg5FV6Gfjmm`|`/ip4/65.109.19.136`|

[dht-explainer]: ../concepts/how-ipfs-works.md#distributed-hash-tables-dhts
[cid-explainer]: ../concepts/content-addressing.md
[docs-peering-config]: ../how-to/configure-node.md
[docs-connmgr]: ../how-to/configure-node.md
