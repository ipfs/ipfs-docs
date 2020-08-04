---
title: Distributed Hash Tables (DHTs)
legacyUrl: https://docs.ipfs.io/guides/concepts/dht/
description: Learn what distributed hash tables (DHTs) are, and how they play a part in the overall lifecycle of IPFS.
---

# Distributed Hash Tables (DHTs)

A distributed hash table (DHT) is a distributed system for mapping keys to values. In IPFS, the DHT is used as the fundamental component of the content routing system, and acts like a cross between a catalog and a navigation system. It maps what the user is looking for (a CID) to the peer that is storing the matching content. There are 3 types of key-value pairings that are mapped using the DHT:

<!-- prettier-ignore -->

| Type             | Purpose                                                                                                                                    | Used by                                                                                                                                    |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Provider records | Map a data identifier (i.e., a multihash) to a peer that has advertised that they have, and are willing, to provide you with that content. | - IPFS to find content<br> - IPNS over PubSub to find other members of the pubsub _topic_.                                                 |
| IPNS records     | Map an IPNS key (i.e., hash of a public key) to an IPNS record (i.e., a signed and versioned pointer to a path like `/ipfs/bafyxyz...`)    | - IPNS                                                                                                                                     |
| Peer records     | Map a peerID to a set of multiaddresses at which the peer may be reached                                                                   | IPFS when we know of a peer with content, but do not know its address.<br> - Manual connections (e.g., `ipfs swarm connect /p2p/Qmxyz...`) |

Each of these record types have slightly different semantics, but they are all updated and found using the same DHT protocol, IPFS’s take on Kademlia.

## Kademlia

The Kademlia algorithm has been around for a while and there are some great resources already [available for it online](https://en.wikipedia.org/wiki/Kademlia), including the [paper itself](https://ipfs.io/ipfs/QmaVrnwZrnoG4YramcN75mbE5AUfCymiEErrHGXoQR968V) and Wikipedia. Kademlia's purpose is to build a DHT on top of three system parameters:

1. An _address space_ as a way that all of the peers in the network can be uniquely identified. In IPFS this is all the numbers from `0` to `2^256-1`.
1. A _metric_ to order the peers in the address space and therefore visualize all the peers along a line ordered from smallest to largest. IPFS takes `SHA256(PeerID)` and interprets it as an integer between `0` and `2^256-1`.
1. A _projection_ that will take a `record key` and calculate a position in the address space where the peer or peers most ideally suited to store the record should be near. IPFS uses `SHA256(Record Key)`.

Having this address space and a peer ordering metric allows us to search the network as though it was a sorted list. In particular, we can turn the system into something like a skip list where a peer knows peers that are distances of around `1,2,4,8...` away from it. This will allow us to search the list in time that is logarithmic in the size of the network, `O(log(N))` lookup time.

Unlike a skip list, Kademlia is somewhat unstable since peers can join, leave, and rejoin the network at any time. To deal with the unstable nature of the system, a Kademlia peer does not just keep links to the peers with distance `1,2,4,8...` away from it. Instead, for each multiple of 2 away it keeps up to `K` links. In IPFS `K = 20`. For example, instead of a peer keeping a single link 128 away it would keep 20 links that are between 65 and 128 away.

Selection of network wide parameters like `K` is not arbitrary, but is instead determined based on the observed average churn in the network, and the frequency with which the network will republish information. System parameters, like `K`, are computed to maximize the probability that the network stays connected, and no data is lost, while maintaining a desired latency for queries, and assuming the observations of average churn stay constant. These system and network parameters drive the decisions made in Kademlia’s two main components: the routing table which tracks all those links in the network, and the lookup algorithm which determines how to traverse those links to store and retrieve data.

### Undialable peers

A major property of Kademlia is that all peers can be arranged from smallest to largest. This is useful because as peer `0` _walks_ down the line to find peer `55` it can know it's getting progressively closer. However, this requires that everyone on the line can talk to each other, otherwise peer `33` might send peer `0` down a dead end by telling them the content they want is on a node they can’t communicate with. This can result in the network being slow, and more importantly, _fragmented_; with data being accessible by some peers and not others.

While having peers that cannot talk to each other may sound like an oddity, two common causes of peers being unreachable by other peers are network address translators (NATs) and firewalls. Having asymmetrical networks where peers `X`, `Y`, and `Z` can connect to each other and to `A`, but `A` cannot connect to them is fairly common. Similarly, it is _extremely_ common that peers `A` and `B`, which are both behind NATs, cannot talk to each other. To deal with this problem, IPFS nodes ignore other nodes assumed to be unreachable by the general public. Nodes also filter themselves out of the network if they suspect they are not reachable.

To do this, we use [libp2p’s AutoNAT](https://github.com/libp2p/go-libp2p-autonat), which acts as a distributed session traversal utilities for NAT (STUN) layer, informing peers of their observed addresses and whether or not they appear to be publicly dialable. Only when peers detect that they are publicly dialable do they switch from client mode (where they can query the DHT, but not respond to queries) to server mode (where they can both query and respond to queries). Similarly, if a server discovers that it is no longer publicly dialable it will switch back into client mode.

IPFS exposes a _rate-limited_ AutoNAT service on all IPFS nodes that have discovered that they are publicly dialable. These requests are infrequent and do not have a noticeable overhead.

## Dual DHT

Many IPFS nodes utilize the publicly shared DHT to discover and advertise content. However, some nodes operate in segregated networks such as local networks, or isolated VPNs. For these users, having a DHT where all non-publicly dialable nodes are clients is very problematic since none of the nodes are publicly dialable.

A seperate DHT is available to nodes that are not part of the public network called _LAN DHT_. This is completely separate from the public _WAN DHT_. These two DHTs are separated by utilizing different DHT protocol names:

| DHT | Path                  |
| --- | --------------------- |
| WAN | `/ipfs/kad/1.0.0`     |
| LAN | `/ipfs/lan/kad/1.0.0` |

The main difference between the WAN and LAN DHTs are the acceptance criteria for peers: which peers are eligible to be part of a routing table or query, and which are not. The WAN DHT’s criteria is _do you look like a public address_ and the LAN DHT’s criteria is _do you look like a non-public address_. While WAN DHT nodes switch from client to server mode based on whether they are publicly dialable, LAN DHT nodes are always servers unless the `dhtclient` option has been set.

## Routing Tables

<!-- The DHT is how IPFS nodes keep track of who has what data. A regular hash table is a key-value store where the _keys_ are [hashes](/concepts/hashing). In the case of IPFS, the _values_ can be any block of data, and the _keys_ are the CIDs of those blocks. IPFS uses hash tables to store who has what data.

In a regular key-value store, all the data within the table is stored in one place. Databases like SQL work this way; all the data you need can be found in a single place. However, the _distributed_ part of _DHT_ means that the entire table is spread across different locations. Each computer running IPFS, also known as a _node_, holds a piece of the larger table. Nodes do not store information on what every other node is storing since that wouldn't scale very well.

IPFS uses lots of small tables instead of one big table, but that brings another set of problems. If the data is spread across lots of different tables, how does IPFS know where the data is? To solve this, IPFS uses a piece of software called [Kademlia](https://en.wikipedia.org/wiki/Kademlia) to learn which nodes have what data. This is called _providing_.

## Providing

IPFS nodes can _provide_ blocks of data. This doesn't necessarily mean that the node actually _has_ the data, but it knows where to get it. When trying to provide a block, your node will look for peers with PeerIDs most _similar_ to the CID of the block. These peers will not store the data for you, but they will store a record saying that you can provide the block. How similar a PeerID is to a CID is defined as the [exclusive-or (XOR) distance](https://en.wikipedia.org/wiki/Exclusive_or) between the bytes that make up the PeerID, and the bytes that make up the CID.

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

## Re-providing

If a node announces to the network that it can provide a particular CID, the state of that information is now outside the control of the node. If the node were to drop off the network, there's no way to announce that the CID is no longer available. Take this scenario:

1. `Node A` announces to the network that it can provide `CID X`.
1. `Node B` makes a record that `Node A` can provide `CID X`.
1. `Node A` loses its internet connection and can no longer provide anything.
1. `Node B` isn't aware that `Node A` can no longer provide `CID X`.
1. `Node C` asks for `CID X`.
1. `Node B` sends `Node C` to `Node A`.
1. `Node C` waits for `Node A` to respond until the heat-death of the universe happens. Or until the timeout is reached, whichever comes first.

To avoid these sorts of problems, nodes must regularly re-announce which CIDs they can provide. This happens at least every 12 hours. If `Node B` doesn't get a re-announcement from `Node A` that they can still provide `CID X` within a 12 hour period, `Node B` will remove `Node A` from the provider list.

## Dual DHT

IPFS nodes participate in two DHTs: one for the public internet WAN, and one for their local network LAN.

1. When connected to the public internet, IPFS will use both DHTs for finding peers, content, and IPNS records. Nodes only publish provider and IPNS records to the WAN DHT to avoid flooding the local network.
2. When not connected to the public internet, nodes publish provider and IPNS records to the LAN DHT.

Nodes will participate in the DHT from their LAN and will store some of that generated metadata, but only expect the DHT to be used when the LAN is disconnected. Nodes will only store part of the public DHT when they are externally reachable, and not behind a Network Address Translation (NAT). A feature called [AutoNAT was introduced in Go-IPFS 0.5](/recent-releases/go-ipfs-0-5/features#autonat) to detect whether or not a node is _reachable_ from the public internet.

The WAN DHT includes all peers with at least one public IP address. IPFS will only consider an IPv6 address public if it is in the [public internet range `2000::/3`](https://www.iana.org/assignments/ipv6-address-space/ipv6-address-space.xhtml).

---

::: tip
If you are interested in how DHTs fit into the overall lifecycle of data in IPFS, check out this video from IPFS Camp 2019! [Core Course: The Lifecycle of Data in Dweb](https://www.youtube.com/watch?v=fLUq0RkiTBA)
:::

-->
