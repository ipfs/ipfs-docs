---
title: Distributed Hash Tables (DHT)
description: Learn what distributed hash tables (DHTs) are, how they store who has what data, and how they play a part in the overall lifecycle of IPFS.
---

# Distributed Hash Tables (DHTs)

A distributed hash table (DHT) is a distributed system for mapping keys to values. In IPFS, the DHT is used as the fundamental component of the content routing system and acts like a cross between a catalog and a navigation system. It maps what the user is looking for to the peer that is storing the matching content. Think of it as a huge table that stores _who_ has _what_ data. There are three types of key-value pairings that are mapped using the DHT:

| Type             | Purpose                                                                                                                                     | Used by                                                                                                                                      |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| Provider records | Map a data identifier (i.e., a multihash) to a peer that has advertised that they have that content and are willing to provide it to you.   | - IPFS to find content<br> - IPNS over PubSub to find other members of the pubsub _topic_.                                                   |
| IPNS records     | Map an IPNS key (i.e., the hash of a public key) to an IPNS record (i.e., a signed and versioned pointer to a path like `/ipfs/bafyxyz...`) | - IPNS                                                                                                                                       |
| Peer records     | Map a peerID to a set of multiaddresses at which the peer may be reached                                                                    | - IPFS when we know of a peer with content, but do not know its address.<br> - Manual connections (e.g., `ipfs swarm connect /p2p/Qmxyz...`) |

These record types hold slightly different semantics, but they are all updated and found using the same DHT protocol; IPFS's take on Kademlia.

## Kademlia

The Kademlia algorithm has been around for a while, and its purpose is to build a DHT on top of three system parameters:

1. An _address space_ as a way that all of the network peers can be uniquely identified. In IPFS, this is all the numbers from `0` to `2^256-1`.
1. A _metric_ to order the peers in the address space and therefore visualize all the peers along a line ordered from smallest to largest. IPFS takes `SHA256(PeerID)` and interprets it as an integer between `0` and `2^256-1`.
1. A _projection_ that will take a `record key` and calculate a position in the address space where the peer or peers most ideally suited to store the record should be near. IPFS uses `SHA256(Record Key)`.

Having this address space and a peer ordering metric allows us to search the network as though it was a sorted list. In particular, we can turn the system into something like a _skip-list_ where a peer knows other peers with distances of around `1,2,4,8...` away from it. This will allow us to search the list in time that is logarithmic in the network's size, `O(log(N))` lookup time.

Unlike a skip-list, Kademlia is somewhat unstable since peers can join, leave, and rejoin the network at any time. To deal with the unstable nature of the system, a Kademlia peer does not just keep links to the peers with distance `1,2,4,8...` away from it. Instead, for each multiple of 2 away, it keeps up to `K` links. In IPFS `K = 20`. For example, instead of a peer keeping a single link 128 away, it would keep 20 links that are between 65 and 128 away.

The selection of network-wide parameters like `K` is not arbitrary. It is determined based on the observed average _churn_ in the network and the frequency with which the network will republish information. System parameters, like `K`, are computed to maximize the probability that the network stays connected and that no data is lost while maintaining the desired latency for queries and assuming the average churn observations stay constant. These system and network parameters drive the decisions made in Kademlia's two main components: the routing table, which tracks all those links in the network, and the lookup algorithm, which determines how to traverse those links to store and retrieve data.

### Undialable peers

A major property of Kademlia is that all peers can be arranged from smallest to largest. This is useful because as peer `0` _walks_ down the line to find peer `55`, it can know it's getting progressively closer. However, this requires that everyone on the line can talk to each other. Otherwise, peer `33`might send peer`0` down a dead-end by telling them the content they want is on a node they can't communicate with. This can result in a slow and fragmented network, with data being accessible by some peers and not others.

While having peers that cannot talk to each other may sound like an oddity, two prevalent causes of unreachability are network address translators (NATs) and firewalls. Having asymmetrical networks where peers `X`, `Y`, and `Z` can connect to `A`, but `A` cannot connect to them is fairly common. Similarly, it is _extremely_ common that peers `A` and `B`, which are both behind NATs, cannot talk to each other. To deal with this, IPFS nodes ignore other nodes assumed to be unreachable by the general public. Nodes also filter themselves out of the network if they suspect they are not reachable.

To do this, we use [libp2p's AutoNAT](https://github.com/libp2p/go-libp2p-autonat), which acts as a distributed _session traversal utility for NAT_ (STUN) layer, informing peers of their observed addresses and whether or not they appear to be publicly dialable. Only when peers detect that they are publicly dialable do they switch from client mode (where they can query the DHT but not respond to queries) to server mode (where they can both query and respond to queries). Similarly, if a server discovers that it is no longer publicly dialable, it will switch back into client mode.

IPFS exposes a _rate-limited_ AutoNAT service on all IPFS nodes that have discovered that they are publicly dialable. These requests are infrequent and do not have a noticeable overhead.

## Dual DHT

Many IPFS nodes utilize the public [Amino DHT](../concepts/glossary.md#amino) to discover and advertise content. However, some nodes operate in segregated networks such as local networks or isolated VPNs. For these users, having a DHT where all non-publicly dialable nodes are clients is very problematic since none of them are publicly dialable.

A separate DHT is available to nodes that are not part of the public network called _LAN DHT_. This is completely separate from the public Amino _WAN DHT_. These two DHTs are separated by utilizing different DHT protocol names:

| DHT | Path                  |
| --- | --------------------- |
| WAN | `/ipfs/kad/1.0.0`     |
| LAN | `/ipfs/lan/kad/1.0.0` |

The main difference between the WAN and LAN DHTs are the acceptance criteria for peers: which peers are eligible to be part of a routing table or query and which are not. The WAN DHT's criteria is _do you look like a public address_, and the LAN DHT's criteria is _do you look like a non-public address_. While WAN DHT nodes switch from client to server mode based on whether they are publicly dialable, LAN DHT nodes are always servers unless the `dhtclient` option has been set.

## Routing Tables

A routing table is a set of rules used to decide where data traveling over a network should go. All IP-enabled devices, including routers and switches, use routing tables. Every IPFS peer maintains a routing table with links to other peers in the network. IPFS relies on Kademlia to define what should and should not go into the routing table:

1. When we connect to a peer, check if it qualifies to be added to our routing table.
1. If it qualifies, determine how close the new peer is to us to figure out which _bucket_ it should go into.
1. Attempt to put the peer in the bucket.
1. If we ever fail to connect to a peer in our routing table, drop them from the routing table.

There are three properties of note here: [qualification](#qualification), [buckets](#peer-buckets), and [refreshing/dropping peers](#refreshing-and-dropping-peers).

### Qualification

Qualifying peers that can be added into a routing table fit these two criteria:

1. Ensure the peer is a DHT server that is advertising the DHT protocol ID, `/ipfs/kad/1.0.0` for the WAN DHT, and `/ipfs/lan/kad/1.0.0` for the LAN DHT.
1. Ensure the peer has IP addresses that match the ranges we expect. For example, members of the Amino DHT having at least one public range IP address as opposed to only addresses like `192.168.X.Y`

### Peer buckets

A bucket is a collection of up to 20 peers that have _similar_ addresses. For example, if the peer is between `2^7` and `2^8` away from us, and the address space is of size `2^256`, the peer goes into bucket `256-8`. Peers can be added into a bucket if that bucket has less than 20 peers. If the bucket already has 20 peers, then IPFS determines if any peers can be [dropped](#refreshing-and-dropping-peers). Otherwise, IPFS doesn't add the peer to the bucket.

### Refreshing and dropping peers

To keep the routing tables accurate and up to date, IPFS refreshes the routing table every 10 minutes. While this is likely a higher frequency than is strictly necessary, it's important to protect the network's health as IPFS learns more about the dynamics of the DHT network. A routing table refresh works as follows:

1. Go through all the buckets, from bucket `0` up until the highest bucket we have that contains a peer in it. The highest possible bucket number is capped at 15.
   1. For each bucket, select a random address in the Kademlia space that could fit in that bucket and do a lookup to find the `K` closest peers to that random address. This will ensure that we will have filled up each bucket with as many peers as will fit.
1. Also, search for ourselves in the network, just in case the network size and distribution are such that the first 15 buckets do not suffice to learn about the `K` peers closest to us.

Peers can be dropped from the routing table for several reasons, usually because that peer is offline or unreachable. After every refresh, IPFS goes through the routing table and attempt to connect to peers that we have not queried recently. If any peers are not active or online, they are dropped from the routing table. Peers can also be dropped if they have not been useful within the time period during which they are _probabilistically expected_ to have been utilized in a refresh. That value is `Log(1/K) * Log(1 - α/K) * refreshPeriod`, where `α` is the number of peers dialed that can be simultaneously queried. Additionally, IPFS defines _useful_ as responding within 2x when it takes any other peer from our routing table to respond to us. This biases against peers that are slow, overloaded, unreliable, or have bad network connectivity to us.

## Lookup algorithm

The lookup algorithm answers the question _What are the `K` closest peers to `X`?_. The IPFS implementation of the Kademlia lookup algorithm uses the following workflow:

1. Load the `K` closest peers to `X` from our routing table into the query-queue.
1. Allowing up to 10 concurrent queries, grab the peer closest to `X` and ask them _who are the `K` closest peers to `X`?_
1. When a query to a peer finishes, add those results to the query-queue.
1. Pull the next-closest peer off the queue and query them.
1. The query terminates whenever the closest known three peers to `X` have been successfully queried without any timeouts or errors.
1. After the query is done, take the `K` closest peers that have not failed and return them.

## Routing particulars

While the lookup algorithm is what allows IPFS to `PUT` and `GET` records into the DHT, how this is done is slightly different for each record type:

### Provider records

For a block with Multihash `H`:

#### Provider `PUT`

1. Do a standard lookup for the `K` closest peers to `SHA256(H)`
1. Put the provider record at those K closest peers, and also store it ourselves.
1. Currently, you are only allowed to put a provider record for yourself. _Alice_ cannot advertise that _Bob_ has content.

#### Provider `GET`

1. Do a lookup for the `K` closest peers to `X=SHA256(H)`.
1. Ask each peer _who are the `K` closest peers to `X` you know about?_.
1. Also, ask _send me the record corresponding to `X` if you have it_.

The peer adds new providers it has learned about and continues until the lookup terminates. Depending on which API is used, the lookup can also be forced to abort after receiving a certain number of provider records.

### IPNS Records

For an IPNS key where the multihash of the public key is `H`:

#### IPNS `PUT`

1. Do a standard lookup for the `K` closest peers to `SHA256(/ipns/H)`.
1. Put the IPNS record at those `K` closest peers and store it ourselves.

#### IPNS `GET`

1. Do a lookup for the `K` closest peers to `X=SHA256(/ipns/H)`.
1. Ask each peer _who are the `K` closest peers to `X` you know about?_
1. Also, ask _send me the record corresponding to `X` if you have it_.
1. If we receive a record with a higher IPNS sequence number, update the existing one, and continue until the lookup terminates.

   This is needed to make sure that the user gets the latest record. Recall that IPNS records are mutable, and therefore, we need to make sure that we point a request to the latest version of the content.

1. Once the lookup is done, if any of the `K` closest peers to `X` did not have the newest IPNS record, send them the newest record.

### Peer records

For a peer where the multihash of the public key is `H`:

#### Peer records `PUT`

When libp2p peers connect, they exchange peer information automatically. Being part of the DHT as either a client or server requires frequent contact with your `K` closest peers; therefore, they inherently end up with your peer record.

#### Peer records `GET`

1. Do a lookup for the `K` closest peers to `X=SHA256(H)`.
1. Ask each peer _who are the `K` closest peers to `X` you know about?_
1. Also, ask _send me the peer record for `H` if you have it_.

IPFS tries to connect to the peer with ID `H` as soon as we learn addresses about it. The lookup can terminate early if we end up connecting to the peer.

## Learn more

If you're eager for more information about the DHT, take a look at these resources:

- [_Content Routing Improvements: Deep Dive_ blog post](https://blog.ipfs.tech/2020-07-20-dht-deep-dive/)
- [Kubo 0.5.0 release highlights](https://www.youtube.com/watch?v=G8FvB_0HlCE)
