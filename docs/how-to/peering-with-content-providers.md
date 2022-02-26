---
title: Peering with content providers
description: Optimize retrieval speed by making direct connections to large content providers.
---

# Peering with content providers

IPFS allows you to request data from any IPFS node with a copy using the data's [CID][cid-explainer] or content identifier. This process usually involves a lookup on the [distrubuted hash table][dht-explainer] and may also require establishing new connections to the nodes storing the content. 

If you're running an IPFS node that serves many requests, like a public HTTP gateway, for example, you may be able to speed up queries by maintaining long-lived connections to nodes that provide a large volume of data. 

Prioritizing connections to certain peers is called **Peering**, and you can tell IPFS which peers to prioritize by editing the [`Peering` configuration][docs-peering-config] in your IPFS config file.

To _peer_ with nodes from Cloudflare, you could update your config to include a `Peering` section like that consists of the ID and addresses for their node:

```json
{
  "Peering": {
    "Peers": [
      {
        "ID": "QmcfgsJsMtx6qJb74akCw1M24X1zFwgGo11h1cuhwQjtJP",
        "Addrs": ["/ip6/2606:4700:60::6/tcp/4009", "/ip4/172.65.0.13/tcp/4009"]
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

#### Cloudflare

|Peer ID|Addresses|
|:-|:-|
|`QmcfgsJsMtx6qJb74akCw1M24X1zFwgGo11h1cuhwQjtJP`|`/ip6/2606:4700:60::6/tcp/4009` <br/><br/>`/ip4/172.65.0.13/tcp/4009`|

#### NFT.Storage

|Peer ID|Addresses|
|:-|:-|
|`12D3KooWEGeZ19Q79NdzS6CJBoCwFZwujqi5hoK8BtRcLa48fJdu`|`/ip4/145.40.96.233/tcp/4001`|
|`12D3KooWBnmsaeNRP6SCdNbhzaNHihQQBPDhmDvjVGsR1EbswncV`|`/ip4/147.75.87.85/tcp/4001`|
|`12D3KooWDLYiAdzUdM7iJHhWu5KjmCN62aWd7brQEQGRWbv8QcVb`|`/ip4/136.144.57.203/tcp/4001`|
|`12D3KooWFZmGztVoo2K1BcAoDEUmnp7zWFhaK5LcRHJ8R735T3eY`|`/ip4/145.40.69.29/tcp/4001`|
|`12D3KooWRJpsEsBtJ1TNik2zgdirqD4KFq5V4ar2vKCrEXUqFXPP`|`/ip4/139.178.70.235/tcp/4001`|
|`12D3KooWNxUGEN1SzRuwkJdbMDnHEVViXkRQEFCSuHRTdjFvD5uw`|`/ip4/145.40.67.89/tcp/4001`|
|`12D3KooWMZmMp9QwmfJdq3aXXstMbTCCB3FTWv9SNLdQGqyPMdUw`|`/ip4/145.40.69.133/tcp/4001`|
|`12D3KooWCpu8Nk4wmoXSsVeVSVzVHmrwBnEoC9jpcVpeWP7n67Bt`|`/ip4/145.40.69.171/tcp/4001`|
|`12D3KooWGx5pFFG7W2EG8N6FFwRLh34nHcCLMzoBSMSSpHcJYN7G`|`/ip4/145.40.90.235/tcp/4001`|
|`12D3KooWQsVxhA43ZjGNUDfF9EEiNYxb1PVEgCBMNj87E9cg92vT`|`/ip4/139.178.69.135/tcp/4001`|
|`12D3KooWMSrRXHgbBTsNGfxG1E44fLB6nJ5wpjavXj4VGwXKuz9X`|`/ip4/147.75.32.99/tcp/4001`|
|`12D3KooWE48wcXK7brQY1Hw7LhjF3xdiFegLnCAibqDtyrgdxNgn`|`/ip4/147.75.86.227/tcp/4001`|
|`12D3KooWSGCJYbM6uCvCF7cGWSitXSJTgEb7zjVCaxDyYNASTa8i`|`/ip4/136.144.55.33/tcp/4001`|
|`12D3KooWJbARcvvEEF4AAqvAEaVYRkEUNPC3Rv3joebqfPh4LaKq`|`/ip4/136.144.57.127/tcp/4001`|
|`12D3KooWNcshtC1XTbPxew2kq3utG2rRGLeMN8y5vSfAMTJMV7fE`|`/ip4/147.75.87.249/tcp/4001`|

#### Pinata
|Peer ID|Addresses|
|:-|:-|
|`QmWaik1eJcGHq1ybTWe7sezRfqKNcDRNkeBaLnGwQJz1Cj`|`/dnsaddr/fra1-1.hostnodes.pinata.cloud`|
|`QmNfpLrQQZr5Ns9FAJKpyzgnDL2GgC6xBug1yUZozKFgu4`|`/dnsaddr/fra1-2.hostnodes.pinata.cloud`|
|`QmPo1ygpngghu5it8u4Mr3ym6SEU2Wp2wA66Z91Y1S1g29`|`/dnsaddr/fra1-3.hostnodes.pinata.cloud`|
|`QmRjLSisUCHVpFa5ELVvX3qVPfdxajxWJEHs9kN3EcxAW6`|`/dnsaddr/nyc1-1.hostnodes.pinata.cloud`|
|`QmPySsdmbczdZYBpbi2oq2WMJ8ErbfxtkG8Mo192UHkfGP`|`/dnsaddr/nyc1-2.hostnodes.pinata.cloud`|
|`QmSarArpxemsPESa6FNkmuu9iSE1QWqPX2R3Aw6f5jq4D5`|`/dnsaddr/nyc1-3.hostnodes.pinata.cloud`|

#### Protocol Labs

|Peer ID|Addresses|
|:-|:-|
|`QmUEMvxS2e7iDrereVYc5SWPauXPyNwxcy9BXZrC1QTcHE`|`/dns/cluster0.fsn.dwebops.pub`|
|`QmNSYxZAiJHeLdkBg38roksAR9So7Y5eojks1yjEcUtZ7i`|`/dns/cluster1.fsn.dwebops.pub`|
|`QmUd6zHcbkbcs7SMxwLs48qZVX3vpcM8errYS7xEczwRMA`|`/dns/cluster2.fsn.dwebops.pub`|
|`QmbVWZQhCGrS7DhgLqWbgvdmKN7JueKCREVanfnVpgyq8x`|`/dns/cluster3.fsn.dwebops.pub`|
|`QmdnXwLrC8p1ueiq2Qya8joNvk3TVVDAut7PrikmZwubtR`|`/dns/cluster4.fsn.dwebops.pub`|
|`12D3KooWCRscMgHgEo3ojm8ovzheydpvTEqsDtq7Vby38cMHrYjt`|`/dns4/nft-storage-am6.nft.dwebops.net/tcp/18402`|
|`12D3KooWQtpvNvUYFzAo1cRYkydgk15JrMSHp6B6oujqgYSnvsVm`|`/dns4/nft-storage-dc13.nft.dwebops.net/tcp/18402`|
|`12D3KooWQcgCwNCTYkyLXXQSZuL5ry1TzpM8PRe9dKddfsk1BxXZ`|`/dns4/nft-storage-sv15.nft.dwebops.net/tcp/18402`|

#### Textile

|Peer ID|Addresses|
|:-|:-|
|`QmR69wtWUMm1TWnmuD4JqC1TWLZcc8iR2KrTenfZZbiztd`|`/ip4/104.210.43.77`|

#### Web3.Storage

|Peer ID|Addresses|
|:-|:-|
|`12D3KooWR19qPPiZH4khepNjS3CLXiB7AbrbAD4ZcDjN1UjGUNE1`|`/ip4/139.178.69.155/tcp/4001`|
|`12D3KooWEDMw7oRqQkdCJbyeqS5mUmWGwTp8JJ2tjCzTkHboF6wK`|`/ip4/139.178.68.91/tcp/4001`|
|`12D3KooWPySxxWQjBgX9Jp6uAHQfVmdq8HG1gVvS1fRawHNSrmqW`|`/ip4/147.75.33.191/tcp/4001`|
|`12D3KooWNuoVEfVLJvU3jWY2zLYjGUaathsecwT19jhByjnbQvkj`|`/ip4/147.75.32.73/tcp/4001`|
|`12D3KooWSnniGsyAF663gvHdqhyfJMCjWJv54cGSzcPiEMAfanvU`|`/ip4/145.40.89.195/tcp/4001`|
|`12D3KooWKytRAd2ujxhGzaLHKJuje8sVrHXvjGNvHXovpar5KaKQ`|`/ip4/136.144.56.153/tcp/4001`|
[dht-explainer]: /concepts/how-ipfs-works/#distributed-hash-tables-dhts
[cid-explainer]: /concepts/content-addressing/#identifier-formats
[docs-peering-config]: /how-to/configure-node/#peering
[docs-connmgr]: /how-to/configure-node/#basic-connection-manager
