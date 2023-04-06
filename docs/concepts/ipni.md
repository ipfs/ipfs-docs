---
title: IPNI (InterPlanetary Network Indexer)
description: Learn about mutability in IPFS, InterPlanetary Name System (IPNS), and how it can be used in conjunction with IPFS.
---

# IPNI (InterPlanetary Network Indexer)

The [InterPlanetary Network Indexer](https://github.com/ipni) protocol, also referred to as _Network Indexer_, _indexer_ and IPNI_, enables searching for content-addressable data available on the IPFS network. Using IPNI, IPFS nodes can publish the content IDs (CIDs) of their data to an indexer, and clients can query the indexer to learn where to retrieve the content associated with those CIDs. IPNI is designed to improve the performance and efficiency of the InterPlanetary File System (IPFS) by providing an additional layer of information on top of the existing Kademlia Distributed Hash Table (DHT).

## IPNI creation rationale 

The Network Indexer was created to address some of the limitations and inefficiencies of the Kadmelia DHT used by IPFS. The DHT is a key component of the IPFS ecosystem, but it can be slow and resource-intensive when it comes to locating and retrieving data. The Network Indexer addresseses this problem, along with several others associated with the DHT, including:

- Slow data retrieval: The DHT can sometimes take a long time to locate and retrieve data, especially when the network is large and the data is distributed across many nodes.
- Resource-intensive: The DHT can consume significant amounts of bandwidth and processing power, affecting the performance of individual nodes and the overall network.
- Limited scalability: The DHT's performance tends to degrade as the network grows, making it challenging to scale IPFS to support large user bases and massive amounts of data.

### Benefits of IPNI for IPFS

With the problems with the DHT in mind, the Network Indexer offers several benefits to IPFS, including:

- Faster data retrieval: By maintaining an additional layer of information on top of the DHT, the Network Indexer can help speed up data location and retrieval in IPFS.
- Reduced resource consumption: The Network Indexer can help reduce the amount of bandwidth and processing power needed to locate and retrieve data, improving the performance of individual nodes and the overall network.
- Improved scalability: With the Network Indexer, IPFS can better handle growth in user base and data volume, allowing it to scale more effectively and support larger networks.

## How the Network Indexer is used by IPFS

The Network Indexer works in conjunction with the existing DHT to improve data location and retrieval in IPFS. It maintains an up-to-date index of the network's content and provides an additional layer of information that can be used to quickly locate and retrieve data.

When a user searches for a piece of data using a CID or multihash, the Network Indexer is consulted first. If the data is found in the index, the user is directly connected to the node hosting the data, resulting in faster retrieval. If the data is not found in the index, the user falls back to the traditional DHT-based search, ensuring that the data can still be located even if it's not in the Network Indexer.

By providing this additional layer of information, the Network Indexer helps to speed up data location and retrieval, reduce resource consumption, and improve the overall scalability of IPFS.

## The IPNI Ecosystem

The IPNI ecosystem consists of three main actors:

1. **Content providers** - participants who host content-addressable data, also known as _Storage Providers_,
2. **IPNI nodes** - participants who ingest announcements about the content-addressable data,
3. **Retrieval clients** - participants who find content via indexer nodes and fetch it from the providers.

### Content Providers

Content providers are responsible for cataloging and maintaining the latest list of content they host, along with the protocols over which the content is retrievable. The list of content is represented as a chain of _advertisements_, signed by the content provider's identity and are immutable. An advertisement can either represent the addition or removal of content. This property, combined with the chaining of advertisement entries, effectively captures a "diff" of content hosted by the provider over time. When a change in content occurs, either new content is added or some is removed, the provider captures the change as a new advertisement, adds it to the chain, and announces its existence to the network.

### IPNI Nodes

IPNI nodes are responsible for continuously listening to provider announcements. Once they receive an _announce message_, they fetch the advertisement and walk its chain to effectively construct the current list of content hosted by the provider. Because the advertisements themselves are immutable, IPNI nodes can infer seen from unseen advertisements and only walk the portion of the chain that they have not seen before. This property enables efficient traversal of the chain and allows IPNI nodes to tolerate very long ad chains as long as they continuously listen to advertisements and stay relatively close to the chain's _head_, i.e., the latest advertisement in the chain.

### Retrieval Clients

Once an advertisement chain is processed, retrieval clients can look up the resulting index records via a query API exposed by IPNI nodes. Given a Content Identifier (CID) or multihash, the API provides a list of index records corresponding to it. Each index record captures the identity of the content provider, its address, and the protocols over which the data can be retrieved from that provider. A _retrieval client_ can then further filter the providers list, e.g., by protocol, and retrieve the content directly from the providers.

## Glossary

- **Advertisement**: A record available from a publisher that contains, a link to a chain of multihash blocks, the CID of the previous advertisement, and provider-specific content metadata that is referenced by all the multihashes in the linked multihash blocks. The provider data is identified by a key called a _context ID_.
- **Announce Message**: A message that informs indexers about the availability of an advertisement. This is usually sent via _gossip pubsub_, but can also be sent via HTTP. An announce message contains the advertisement CID it is announcing, which allows indexers to ignore the announce if they have already indexed the advertisement. The publisher's address is included in the announce to tell indexers where to retrieve the advertisement from.
- **Context ID**: A key that, for a provider, uniquely identifies content metadata. This allows content metadata to be updated or deleted on the indexer without having to refer to it using the multihashes that map to it.
- **Gossip Pubsub**: Publish/subscribe communications over a libpp2p gossip mesh. This is used by publishers to broadcast Announce Messages to all indexers that are subscribed to the topic that the announce message is sent on. For production publishers and indexers, this topic is "/indexer/ingest/mainnet".

- Indexer: A network node that keeps mappings of multihashes to provider records.

- Metadata: Provider-specific data that a retrieval client gets from an indexer query and passed to the provider when retrieving content. This metadata is used by the provider to identify and find specific content and deliver that content via the protocol.

- **Provider**: Also called a Storage Provider, this is the entity from which content can be retrieved by a retrieval client. When multihashes are looked up on an indexer, the responses contain provider that provide the content referenced by the multihashes. A provider is identified by a libp2p peer ID.
- **Publisher**: This is an entity that publishes advertisements and index data to an indexer. It is usually, but not always, the same as the data provider. A publisher is identified by a libp2p peer ID.
- **Retrieval Client**: A client that queries an indexer to find where content is available, and retrieves that content from a provider.
- **Sync** (indexer with publisher):  Operation that synchronizes the content indexed by an indexer with the content published by a publisher. A Sync in initiated when an indexer receives and Announce Message, by an administrative command to sync with a publisher, or by the indexer when there have been no updates for a provider for some period of time (24 hours by default).



