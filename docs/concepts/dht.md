---
title: Distributed Hash Tables (DHTs)
legacyUrl: https://docs.ipfs.io/guides/concepts/dht/
description: Learn what distributed hash tables (DHTs) are, and how they play a part in the overall lifecycle of IPFS.
---

# Distributed Hash Tables (DHTs)

A regular [hash table](https://en.wikipedia.org/wiki/Hash_table) is a key-value store where the _keys_ are [hashes](/concepts/hashing). In the case of IPFS, the _values_ can be any block of data, and the _keys_ are the CIDs of those blocks. IPFS uses hash tables to store who has what data.

| Key | Value |
| --- | ----- |
| `QmVenus` | `UserAlex` |
| `QmVenus` | `UserBrian` |
| `QmMars` | `UserCharlotte` |
| `QmMars` | `UserAlex` |
| `QmJupiter` | `UserCharlotte` |

In a regular key-value store, all the data within the table is stored in one place. Databases like SQL work this way; all the data you need can be found in a single place. However, the _distributed_ part of _DHT_ means that the entire table is spread across different locations. Each computer running IPFS, also known as a _node_, holds a piece of the larger table. Nodes do not store information on what every other node is storing, since that wouldn't scale very well. Instead, IPFS uses a piece of software called [Kademlia](https://en.wikipedia.org/wiki/Kademlia) that teach IPFS how to distribute the table.

DHTs are not unique to IPFS, and have been used in a wide variety of applications, [from decentralized search engines to censorship-resistant networks](https://en.wikipedia.org/wiki/Distributed_hash_table#Implementations).

## Peers

To see this in action you can run `ipfs dht findprovs <CID>` to find the providers of a particular CID:

```bash
ipfs dht findprovs QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG

> QmNgDsms4K3jomZpr1yuC8JYWstvzFLCjEGY7aoHrnxX7r
> QmQzustKyCbyy3BbpetySYk88D8mtS9No8xEJP7B5tV324
> QmR6oSKYSfgsqa1wjfJ8hUPYAS8wjuLxW1Fxu911v3ajwc
```

### Reproviding

If a node announces to the network that it can provide a particular CID, the state of that information is now outside the control of the node. If the node were to drop off the network, there's no way to announce that the CID is no longer available. Take this scenario:

1. `Node A` announces to the network that it can provide `CID X`.
1. `Node B` makes a record that `Node A` can provide `CID X`.
1. `Node A` loses its internet connect and can no longer provide anything.
1. `Node B` isn't aware that `Node A` can no longer provide `CID X`.
1. `Node C` asks for `CID X`.
1. `Node B` sends `Node C` to `Node A`.
1. `Node C` waits for `Node A` to respone, until the heat-death of the universe happens and energy no longer exists.

To avoid problem nodes must re-announce which CIDs they can provide. This happens at least every 12 hours. If `Node B` doesn't get a re-announcement from `Node A` that they can still provide `CID X` within a 12 hour period, `Node B` will remove `Node A` from the provider list.

<!-- Similarity -->
How similar a PeerID is to a CID is defined as the [exclusive-or (XOR) distance](https://en.wikipedia.org/wiki/Exclusive_or) between the bytes that make up the PeerID, and the bytes that make up the CID.

## Managing data

When you add a file to IPFS it gets stored as blocks of data. Each of these blocks has a CID, which is the [content-address](/concepts/content-addressing) of that block of data. This means that every unique block has a unique CID.

### Have

### Want

### Don't want

## Benefits of the DHT

### Scalability

Since a request for a hash of length _n_ takes at most _log2(n)_ steps to resolve, the scalability of the DHT is impressive, especially when compared to regular storage mechanisms.

### Fault teolerance

Lookups are possible even if peers unexpectedly leave or join the DHT. Additionally, requests can be addressed to any peer if another peer is slow or unavailable.

### Load balancing

Requests are made to different nodes and no unique peers process all the requests.

---

::: tip
If you are interested in how DHTs fit into the overall lifecycle of data in IPFS, check out this video from IPFS Camp 2019! [Core Course: The Lifecycle of Data in Dweb](https://www.youtube.com/watch?v=fLUq0RkiTBA)
:::
