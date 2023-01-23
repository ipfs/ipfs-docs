---
title: Peering with content providers
description: Optimize retrieval speed by making direct connections to large content providers.
---

# Peering with content providers

IPFS allows you to request data from any IPFS node with a copy using the data's [CID][cid-explainer] or content identifier. This process usually involves a lookup on the [distributed hash table][dht-explainer] and may also require establishing new connections to the nodes storing the content.

If you're running an IPFS node that serves many requests, like a public HTTP gateway, for example, you may be able to speed up queries by maintaining long-lived connections to nodes that provide a large volume of data.

Prioritizing connections to certain peers is called **Peering**, and you can tell IPFS which peers to prioritize by editing the [`Peering` configuration][docs-peering-config] in your IPFS config file.

To _peer_ with nodes from Cloudflare, you could update your config to include a `Peering` section like that consists of the ID and addresses for their node:

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

Below is a community-maintained list of platforms that provide a lot of content to the IPFS network.

If you're running a public IPFS gateway, you may see improved performance for popular queries by adding these nodes to your [Peering configuration][docs-peering-config].

To have your platform added to this list, please [open a PR to edit this page](https://github.com/ipfs/ipfs-docs/edit/main/docs/how-to/peering-with-content-providers.md) and add yourself to the list in alphabetical order.

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

### Estuary

| Peer ID | Addresses |
| ------- | --------- |
|`12D3KooWCVXs8P7iq6ao4XhfAmKWrEeuKFWCJgqe9jGDMTqHYBjw`|`/ip4/139.178.68.217/tcp/6744`|
|`12D3KooWGBWx9gyUFTVQcKMTenQMSyE2ad9m7c9fpjS4NMjoDien`|`/ip4/147.75.49.71/tcp/6745`|
|`12D3KooWFrnuj5o3tx4fGD2ZVJRyDqTdzGnU3XYXmBbWbc8Hs8Nd`|`/ip4/147.75.86.255/tcp/6745`|
|`12D3KooWN8vAoGd6eurUSidcpLYguQiGZwt4eVgDvbgaS7kiGTup`|`/ip4/3.134.223.177/tcp/6745`|
|`12D3KooWLV128pddyvoG6NBvoZw7sSrgpMTPtjnpu3mSmENqhtL7`|`/ip4/35.74.45.12/udp/6746/quic`|

### NFT.Storage

| Peer ID | Addresses |
| ------- | --------- |
|`12D3KooWCRscMgHgEo3ojm8ovzheydpvTEqsDtq7Vby38cMHrYjt`|`/dns4/nft-storage-am6.nft.dwebops.net/tcp/18402`|
|`12D3KooWQtpvNvUYFzAo1cRYkydgk15JrMSHp6B6oujqgYSnvsVm`|`/dns4/nft-storage-dc13.nft.dwebops.net/tcp/18402`|
|`12D3KooWQcgCwNCTYkyLXXQSZuL5ry1TzpM8PRe9dKddfsk1BxXZ`|`/dns4/nft-storage-sv15.nft.dwebops.net/tcp/18402`|

### Pinata

| Peer ID | Addresses |
| ------- | --------- |
|`QmWaik1eJcGHq1ybTWe7sezRfqKNcDRNkeBaLnGwQJz1Cj`|`/dnsaddr/fra1-1.hostnodes.pinata.cloud`|
|`QmNfpLrQQZr5Ns9FAJKpyzgnDL2GgC6xBug1yUZozKFgu4`|`/dnsaddr/fra1-2.hostnodes.pinata.cloud`|
|`QmPo1ygpngghu5it8u4Mr3ym6SEU2Wp2wA66Z91Y1S1g29`|`/dnsaddr/fra1-3.hostnodes.pinata.cloud`|
|`QmRjLSisUCHVpFa5ELVvX3qVPfdxajxWJEHs9kN3EcxAW6`|`/dnsaddr/nyc1-1.hostnodes.pinata.cloud`|
|`QmPySsdmbczdZYBpbi2oq2WMJ8ErbfxtkG8Mo192UHkfGP`|`/dnsaddr/nyc1-2.hostnodes.pinata.cloud`|
|`QmSarArpxemsPESa6FNkmuu9iSE1QWqPX2R3Aw6f5jq4D5`|`/dnsaddr/nyc1-3.hostnodes.pinata.cloud`|

### Storj

| Peer ID | Addresses |
| ------- | --------- |
|`12D3KooWFFhc8fPYnQXdWBCowxSV21EFYin3rU27p3NVgSMjN41k`|`/ip4/5.161.92.43/tcp/4001`<br/>`/ip4/5.161.92.43/udp/4001/quic`<br/>`/ip6/2a01:4ff:f0:3b1e::1/tcp/4001`<br/>`/ip6/2a01:4ff:f0:3b1e::1/udp/4001/quic`|
|`12D3KooWSW4hoHmDXmY5rW7nCi9XmGTy3foFt72u86jNP53LTNBJ`|`/ip4/5.161.55.227/tcp/4001`<br/>`/ip4/5.161.55.227/udp/4001/quic`<br/>`/ip6/2a01:4ff:f0:1e5a::1/tcp/4001`<br/>`/ip6/2a01:4ff:f0:1e5a::1/udp/4001/quic`|
|`12D3KooWSDj6JM2JmoHwE9AUUwqAFUEg9ndd3pMA8aF2bkYckZfo`|`/ip4/5.161.92.36/tcp/4001`<br/>`/ip4/5.161.92.36/udp/4001/quic`<br/>`/ip6/2a01:4ff:f0:3764::1/tcp/4001`<br/>`/ip6/2a01:4ff:f0:3764::1/udp/4001/quic`|

### Textile

| Peer ID | Addresses |
| ------- | --------- |
|`QmR69wtWUMm1TWnmuD4JqC1TWLZcc8iR2KrTenfZZbiztd`|`/ip4/104.210.43.77`|

### Web3.Storage

See [web3.storage/PEERS](https://github.com/web3-storage/web3.storage/blob/main/PEERS).

### 8api.sh

| Peer ID | Addresses |
| ------- | --------- |
|`12D3KooWGASC2jm3pmohEJXUhuStkxDitPgzvs4qMuFPaiD9x1BA`|`/ip4/78.46.108.24`|
|`12D3KooWRbWZN3GvLf9CHmozq4vnTzDD4EEoiqtRJxg5FV6Gfjmm`|`/ip4/65.109.19.136`|

[dht-explainer]: ../concepts/how-ipfs-works.md#distributed-hash-tables-dhts
[cid-explainer]: ../concepts/content-addressing.md
[docs-peering-config]: ../how-to/configure-node.md
[docs-connmgr]: ../how-to/configure-node.md
