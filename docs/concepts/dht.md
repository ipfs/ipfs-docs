---
title: Distributed Hash Tables (DHTs)
legacyUrl: https://docs.ipfs.io/guides/concepts/dht/
description: Learn what distributed hash tables (DHTs) are, and how they play a part in the overall lifecycle of IPFS.
---

# Distributed Hash Tables (DHTs)

The DHT is how IPFS nodes keep track of who has what data. A regular hash table is a key-value store where the _keys_ are [hashes](/concepts/hashing). In the case of IPFS, the _values_ can be any block of data, and the _keys_ are the CIDs of those blocks. IPFS uses hash tables to store who has what data.

In a regular key-value store, all the data within the table is stored in one place. Databases like SQL work this way; all the data you need can be found in a single place. However, the _distributed_ part of _DHT_ means that the entire table is spread across different locations. Each computer running IPFS, also known as a _node_, holds a piece of the larger table. Nodes do not store information on what every other node is storing since that wouldn't scale very well.

So IPFS uses lots of small tables instead of one big table, but that brings another set of problems. If the data is spread across lots of different tables, how does IPFS know where the data is? To solve this, IPFS uses a piece of software called [Kademlia](https://en.wikipedia.org/wiki/Kademlia) to learn which nodes have what data. This is called _providing_.

## Providing

IPFS nodes can _provide_ blocks of data. This doesn't necessarily mean that the node actually _has_ the data, but it knows where to get it. Using Kademlia, IPFS tells the peers with PeerIds that are most similar to the CID of the block that you can provide. These peers will not store the data for you, but they will store a record saying that you can provide the block. How similar a PeerID is to a CID is defined as the [exclusive-or (XOR) distance](https://en.wikipedia.org/wiki/Exclusive_or) between the bytes that make up the PeerID, and the bytes that make up the CID.

Using the table below, we can see that `QmAlex` and `QmBrian` can provide `QmVYD...`. `QmAlex` and `QmCharlotte` can provide `QmZij...`. Only `QmCharlotte` and provide `QmXPg...`.

| Key                                              | Value         |
| ------------------------------------------------ | ------------- |
| `QmVYDW8wjWPe851DS3gGCUyPymNk4fnPaKmQSg9H8dSSa2` | `QmAlex`      |
| `QmVYDW8wjWPe851DS3gGCUyPymNk4fnPaKmQSg9H8dSSa2` | `QmBrian`     |
| `QmZijpFzuUFF4LwBr9PxsSTdVvfF6E6Fueiz5wLTA6MTrM` | `QmCharlotte` |
| `QmZijpFzuUFF4LwBr9PxsSTdVvfF6E6Fueiz5wLTA6MTrM` | `QmAlex`      |
| `QmXPgotVGXrng5UETiF9qTUEaJanjRWPwcwwNQCKANJpCM` | `QmCharlotte` |

To see this in action, you can run `ipfs dht findprovs <CID>` to find the providers of a particular CID:

```bash
ipfs dht findprovs QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG

> QmNgDsms4K3jomZpr1yuC8JYWstvzFLCjEGY7aoHrnxX7r
> QmQzustKyCbyy3BbpetySYk88D8mtS9No8xEJP7B5tV324
> QmR6oSKYSfgsqa1wjfJ8hUPYAS8wjuLxW1Fxu911v3ajwc
```

## Managing data

When you add a file to IPFS, it gets stored as blocks of data. Each of these blocks has a CID, which is the [content-address](/concepts/content-addressing) of that block of data. This means that every unique block has a unique CID. IPFS nodes use the DHT to advertise which blocks they _have_, which blocks they _want_, and which blocks they _don't want_.

| Have | Want | Don't Want |
| --- | --- | --- |
| I can provide this block. | I am looking for this block. | I am not looking for this block. If I am provided this block, I will just discard it. |

## Re-providing

If a node announces to the network that it can provide a particular CID, the state of that information is now outside the control of the node. If the node were to drop off the network, there's no way to announce that the CID is no longer available. Take this scenario:

1. `Node A` announces to the network that it can provide `CID X`.
1. `Node B` makes a record that `Node A` can provide `CID X`.
1. `Node A` loses its internet connection and can no longer provide anything.
1. `Node B` isn't aware that `Node A` can no longer provide `CID X`.
1. `Node C` asks for `CID X`.
1. `Node B` sends `Node C` to `Node A`.
1. `Node C` waits for `Node A` to respond until the heat-death of the universe happens, and energy no longer exists.

To avoid problem nodes must re-announce which CIDs they can provide. This happens at least every 12 hours. If `Node B` doesn't get a re-announcement from `Node A` that they can still provide `CID X` within a 12 hour period, `Node B` will remove `Node A` from the provider list.

## Dual DHT

IPFS nodes run two DHTs: one for the public internet WAN, and one for their local network LAN.

1. When connected to the public internet, IPFS will use both DHTs for finding peers, content, and IPNS records. Nodes only publish provider and IPNS records to the WAN DHT to avoid flooding the local network.
2. When not connected to the public internet, nodes publish provider and IPNS records to the LAN DHT.

The WAN DHT includes all peers with at least one public IP address. IFPS will only consider an IPv6 address public if it is in the [public internet range `2000::/3`](https://www.iana.org/assignments/ipv6-address-space/ipv6-address-space.xhtml).

---

::: tip
If you are interested in how DHTs fit into the overall lifecycle of data in IPFS, check out this video from IPFS Camp 2019! [Core Course: The Lifecycle of Data in Dweb](https://www.youtube.com/watch?v=fLUq0RkiTBA)
:::
