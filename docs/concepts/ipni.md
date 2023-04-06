---
title: IPNI (InterPlanetary Network Indexer)
description: Learn about mutability in IPFS, InterPlanetary Name System (IPNS), and how it can be used in conjunction with IPFS.
---

# IPNI (InterPlanetary Network Indexer)

The [InterPlanetary Network Indexer](https://github.com/ipni), also referred to as _Network Indexer_, _indexer_ and _IPNI_, enables quick and efficient search of content-addressable data available on the InterPlanetary File System (IPFS) network. Using IPNI, IPFS nodes can publish the content IDs (CIDs) of their data to an indexer, and clients can query the indexer to learn where to retrieve the content associated with those CIDs. IPNI is designed to improve the performance and efficiency of IPFS by providing an additional layer of information on top of the [Kademlia Distributed Hash Table (DHT)](../concepts/dht.md#kademlia) used by IPFS.

## Design rationale 

The Network Indexer was created to address some of the limitations and inefficiencies of the Kadmelia DHT used by IPFS. The DHT is a key component of the IPFS ecosystem, but it can be slow and resource-intensive when it comes to locating and retrieving data. The indexer addresseses this problem, along with several others associated with the DHT, including:

- Slow data retrieval: The DHT can sometimes take a long time to locate and retrieve data, especially when the network is large and the data is distributed across many nodes.
- Resource-intensive: The DHT can consume significant amounts of bandwidth and processing power, affecting the performance of individual nodes and the overall network.
- Limited scalability: The DHT's performance tends to degrade as the network grows, making it challenging to scale IPFS to support large user bases and massive amounts of data.

### How IPNI benefits IPFS

With the problems with the DHT in mind, the indexer offers several benefits to IPFS, including:

- Faster data retrieval: By maintaining an additional layer of information on top of the DHT, the indexer can help speed up data location and retrieval in IPFS.
- Reduced resource consumption: The indexer can help reduce the amount of bandwidth and processing power needed to locate and retrieve data, improving the performance of individual nodes and the overall network.
- Improved scalability: With the indexer, IPFS can better handle growth in user base and data volume, allowing it to scale more effectively and support larger networks.

## How IPNI is used by IPFS

The indexer works in conjunction with the existing DHT to improve data location and retrieval in IPFS. It maintains an up-to-date index of the network's content and provides an additional layer of information that can be used to quickly locate and retrieve data.

When a user searches for a piece of data using a CID or multihash, the indexer is consulted first. If the data is found in the index, the user is directly connected to the node hosting the data, resulting in faster retrieval. If the data is not found in the index, the user falls back to the traditional DHT-based search, ensuring that the data can still be located even if it's not in the indexer.

By providing this additional layer of information, the indexer helps to speed up data location and retrieval, reduce resource consumption, and improve the overall scalability of IPFS.

### The IPNI Ecosystem

The IPNI ecosystem consists of three main actors:

1. **Content providers** - IPFS peers that host content-addressable data.
2. **IPNI nodes** - Nodes that ingest announcements about the content-addressable data,
3. **Retrieval clients** - Peers that find content via indexer nodes and fetch it from the providers.

#### Content Providers

Content providers are responsible for cataloging and maintaining the latest list of content they host, along with the protocols over which the content is retrievable. The list of content is represented as a chain of _advertisements_, signed by the content provider's identity and are immutable. An advertisement can either represent the addition or removal of content. This property, combined with the chaining of advertisement entries, effectively captures a "diff" of content hosted by the provider over time. When a change in content occurs:

1. The provider captures the change as a new advertisement.
1. The provider announces its existence to the network.
1. An IPNI node receives and stores the advertisement.

#### IPNI Nodes

IPNI nodes are responsible for continuously listening to provider announcements. Once they receive an _announce message_, they fetch and parse the advertisement to construct the current list of content hosted by the provider. Because the advertisements themselves are immutable, IPNI nodes can recognize known advertisements and only parse ones they've not seen before. This allows IPNI nodes to handle and scale with very long ad chains, as long as they continuously listen for advertisements and keep up with the latest advertisement.

#### Retrieval Clients

Once advertisements are processed, retrieval clients can look up the resulting index records via a query API exposed by IPNI nodes. Given a Content Identifier (CID) or multihash, the API provides a list of index records corresponding to it. Each index record captures the identity of the content provider, its address, and the protocols over which the data can be retrieved from that provider. A _retrieval client_ can then further filter the providers list, e.g., by protocol, and retrieve the content directly from the providers.

## Example

To demonstrate the practical application and useage of IPNI, this section will walk through a hands-on example involving the `cid.contact` indexer tool. The `cid.contact` tool leverages IPNI to return provider record information for a given CID.

1. Open a browser.

1. In the search field, search for the URL below. 

   ```plaintext
   https://cid.contact/cid/bafybeigvgzoolc3drupxhlevdp2ugqcrbcsqfmcek2zxiw5wctk3xjpjwy
   ```

   The tool uses IPNI to return provider information for CID `bafybeigvgzoolc3drupxhlevdp2ugqcrbcsqfmcek2zxiw5wctk3xjpjwy`.
   Output similar to the following (formatted for the purpose of this example) is displayed:

    ```json
    {
        "MultihashResults": [
            {
            "Multihash": "EiDVNlzli2ONH3OslRv1Q0BRCKUCsERWs3RbthTVu6Xptg==",
            "ProviderResults": [
                {
                "ContextID": "AXESIAqACNwDTPpjRLuNw0rCwP4z5ge8p2p+mceS0hjDQdBl",
                "Metadata": "kBKjaFBpZWNlQ0lE2CpYKAABgeIDkiAgjdNAYM8PDCDyhgEIJKlEGElVgqkxlecqZA+2aJrX8CdsVmVyaWZpZWREZWFs9W1GYXN0UmV0cmlldmFs9Q==",
                "Provider": {
                    "ID": "12D3KooWHbYfcXCUzxCCCkfppiJgvD7eAqhbZTXEMu66EYdqTwCQ",
                    "Addrs": [
                    "/ip4/195.26.70.31/tcp/24001"
                    ]
                }
                },
                {
                "ContextID": "AXESIIDDfCF2O9gTlTCW1jsS94di679rBaiNW2wYuudllV8n",
                "Metadata": "kBKjaFBpZWNlQ0lE2CpYKAABgeIDkiAgOpmhnBIQKNzyU6ehjrfzmEA+e++NQ+z5mBjI6C7y1B5sVmVyaWZpZWREZWFs9W1GYXN0UmV0cmlldmFs9Q==",
                "Provider": {
                    "ID": "12D3KooWDMJSprsuxhjJVnuQQcyibc5GxanUUxpDzHU74rhknqkU",
                    "Addrs": [
                    "/ip4/89.20.96.58/tcp/24001"
                    ]
                }
                },
                {
                "ContextID": "AXESIBD01Ud5R2aNm17hy5POqaKeNmIzfSNMhnAGzhvNCfK/",
                "Metadata": "kBKjaFBpZWNlQ0lE2CpYKAABgeIDkiAg1bFuob1/knnbN6PTonjf6wUGeB/qc2hJb4oriOwRjTNsVmVyaWZpZWREZWFs9W1GYXN0UmV0cmlldmFs9Q==",
                "Provider": {
                    "ID": "12D3KooWDMJSprsuxhjJVnuQQcyibc5GxanUUxpDzHU74rhknqkU",
                    "Addrs": [
                    "/ip4/89.20.96.58/tcp/24001"
                    ]
                }
                },
                {
                "ContextID": "AXESID1YhQwxum55WMSHXI6EQbtVpnhm7QwGpDPYCm5bjwbr",
                "Metadata": "kBKjaFBpZWNlQ0lE2CpYKAABgeIDkiAg7H0Gb8ZK4LC8aijKk56XS4diZvoLv9hcDz6iiE0gJhNsVmVyaWZpZWREZWFs9W1GYXN0UmV0cmlldmFs9Q==",
                "Provider": {
                    "ID": "12D3KooW9yi2xLhXds9HC4x9vRN99mphq6ds8qN2YRf8zks1F32G",
                    "Addrs": [
                    "/ip4/149.5.22.10/tcp/24002"
                    ]
                }
                },
                {
                "ContextID": "AXESIMGxu6/414seq9d+YrGEwonTcCDwNzookG69eGph7cQK",
                "Metadata": "kBKjaFBpZWNlQ0lE2CpYKAABgeIDkiAgOpmhnBIQKNzyU6ehjrfzmEA+e++NQ+z5mBjI6C7y1B5sVmVyaWZpZWREZWFs9W1GYXN0UmV0cmlldmFs9Q==",
                "Provider": {
                    "ID": "12D3KooWM4wsQ3kdd8CDHiVDQthU9JZ9KqsxSdSQT2xj6TAdDth5",
                    "Addrs": [
                    "/ip4/61.38.42.252/tcp/20000"
                    ]
                }
                },
                {
                "ContextID": "AXESIPM2bykkesWamkYUx5lDVUhDSMnaZ10zi3Fk7+5TBCcC",
                "Metadata": "kBKjaFBpZWNlQ0lE2CpYKAABgeIDkiAgOpmhnBIQKNzyU6ehjrfzmEA+e++NQ+z5mBjI6C7y1B5sVmVyaWZpZWREZWFs9W1GYXN0UmV0cmlldmFs9Q==",
                "Provider": {
                    "ID": "12D3KooWLDf6KCzeMv16qPRaJsTLKJ5fR523h65iaYSRNfrQy7eU",
                    "Addrs": [
                    "/ip4/141.138.64.21/tcp/11337",
                    "/ip4/149.6.102.102/tcp/11337"
                    ]
                }
                },
                {
                "ContextID": "AXESIO50esRu0SvbUfSGOzLTWfIff1S54seFI/PtyDuPNkzZ",
                "Metadata": "kBKjaFBpZWNlQ0lE2CpYKAABgeIDkiAg+IcjHXCOHHUf8wNiVtnvhYTPwL5Fqnnr7GyOLZp48R5sVmVyaWZpZWREZWFs9W1GYXN0UmV0cmlldmFs9Q==",
                "Provider": {
                    "ID": "12D3KooWPNbkEgjdBNeaCGpsgCrPRETe4uBZf1ShFXStobdN18ys",
                    "Addrs": [
                    "/ip4/76.219.232.45/tcp/24001"
                    ]
                }
                },
                {
                "ContextID": "AXESIO50esRu0SvbUfSGOzLTWfIff1S54seFI/PtyDuPNkzZ",
                "Metadata": "gBI=",
                "Provider": {
                    "ID": "12D3KooWSoSgVaUvoguDQZu1doytze9RgnnANwJoiLw7KUcAXq8i",
                    "Addrs": [
                    "/ip4/76.219.232.45/tcp/24888"
                    ]
                }
                },
                {
                "ContextID": "AXESIIVMIJ+VCHTZGl8Io8JebgortiwZPeGdWjG7/PMqQedI",
                "Metadata": "kBKjaFBpZWNlQ0lE2CpYKAABgeIDkiAgOpmhnBIQKNzyU6ehjrfzmEA+e++NQ+z5mBjI6C7y1B5sVmVyaWZpZWREZWFs9W1GYXN0UmV0cmlldmFs9Q==",
                "Provider": {
                    "ID": "12D3KooWEkQFhSUc17MNC4gimbRYakSSCmDiQwMLhcvToh7bsXbN",
                    "Addrs": [
                    "/ip4/112.216.168.43/tcp/8999"
                    ]
                }
                },
                {
                "ContextID": "YmFndXFlZXJha3ppdzRwaWxuZmV5ZGFtNTdlZ2RxZTRxZjR4bzVuZmxqZG56emwzanV0YXJtbWltdHNqcQ==",
                "Metadata": "gBI=",
                "Provider": {
                    "ID": "QmQzqxhK82kAmKvARFZSkUVS6fo9sySaiogAnx5EnZ6ZmC",
                    "Addrs": [
                    "/dns4/elastic.dag.house/tcp/443/wss"
                    ]
                }
                },
                {
                "ContextID": "YmFndXFlZXJhNWpnZWF6eXRhbWVpZnNwbmlocWk2NnFxejNlNnRzazRuM255Nmo3emxjeGFqcnh2YTNlcQ==",
                "Metadata": "gBI=",
                "Provider": {
                    "ID": "QmQzqxhK82kAmKvARFZSkUVS6fo9sySaiogAnx5EnZ6ZmC",
                    "Addrs": [
                    "/dns4/elastic.dag.house/tcp/443/wss"
                    ]
                }
                },
                {
                "ContextID": "YmFndXFlZXJhd3pjeDJ1YnF6M2E0eTJ3anRoZW90bmR1NGFiZDR2NGt6dWxlNzR4dWNvNjZyMmNkeWRycQ==",
                "Metadata": "gBI=",
                "Provider": {
                    "ID": "QmQzqxhK82kAmKvARFZSkUVS6fo9sySaiogAnx5EnZ6ZmC",
                    "Addrs": [
                    "/dns4/elastic.dag.house/tcp/443/wss"
                    ]
                }
                }
            ]
            }
        ]
    }
    ```


### Response explained

This response returns multiple provider records, which inidcates that the data identified by this CID was found at multiple providers. For example, the first provider is specified by the followjng record:

```json
{
"ContextID": "AXESIAqACNwDTPpjRLuNw0rCwP4z5ge8p2p+mceS0hjDQdBl",
"Metadata": "kBKjaFBpZWNlQ0lE2CpYKAABgeIDkiAgjdNAYM8PDCDyhgEIJKlEGElVgqkxlecqZA+2aJrX8CdsVmVyaWZpZWREZWFs9W1GYXN0UmV0cmlldmFs9Q==",
"Provider": {
    "ID": "12D3KooWHbYfcXCUzxCCCkfppiJgvD7eAqhbZTXEMu66EYdqTwCQ",
    "Addrs": [
    "/ip4/195.26.70.31/tcp/24001"
    ]
}
```

This indicates that the data can be:

- Found at a provider identified by a peer `ID` of `12D3KooWHbYfcXCUzxCCCkfppiJgvD7eAqhbZTXEMu66EYdqTwCQ`.
- Retrieved as specified by the multiaddress `/ip4/195.26.70.31/tcp/24001`.

Additional information is also included:

- The `Metadata` field contains data that the provider uses to locate and deliver the content to a client.
- The `ContextID` is used by IPNI to update metadata, add multihash mappings to a provider record, or delete a provider record and the multihash mappings to it.

## Glossary

- **Advertisement**: A record available from a publisher that contains, a link to a chain of multihash blocks, the CID of the previous advertisement, and provider-specific content metadata that is referenced by all the multihashes in the linked multihash blocks. The provider data is identified by a key called a _context ID_.
- **Announce Message**: A message that informs indexers about the availability of an advertisement. This is usually sent via _gossip pubsub_, but can also be sent via HTTP. An announce message contains the advertisement CID it is announcing, which allows indexers to ignore the announcement if they have already indexed the advertisement. The publisher's address is included in the announcement to tell indexers where to retrieve the advertisement from.
- **Context ID**: A key that, for a provider, uniquely identifies content metadata. This allows content metadata to be updated or deleted on the indexer without having to refer to it using the multihashes that map to it.
- **Gossip Pubsub**: Publish/subscribe communications over a libpp2p gossip mesh. This is used by publishers to broadcast Announce Messages to all indexers that are subscribed to the topic that the announce message is sent on. For production publishers and indexers, this topic is `/indexer/ingest/mainnet`.
- **Indexer**: A network node that keeps mappings of multihashes and CIDs to provider records.
- **Metadata**: Provider-specific data that a retrieval client gets from an indexer query and passed to the provider when retrieving content. This metadata is used by the provider to identify and find specific content and deliver that content via the protocol.
- **Provider**: The node from which content can be retrieved by a retrieval client. When multihashes are looked up on an indexer, the responses contain provider that provide the content referenced by the multihashes. A provider is identified by a libp2p peer ID.
- **Publisher**: The node that publishes advertisements and index data to an indexer. It is usually, but not always, the same as the data provider. A publisher is identified by a libp2p peer ID.
- **Retrieval Client**: A node that queries an indexer to find where content is available, and retrieves that content from a provider.
- **Sync**:  Operation that synchronizes the content indexed by an indexer with the content published by a publisher. A Sync in initiated when an indexer receives and Announce Message, by an administrative command to sync with a publisher, or by the indexer when there have been no updates for a provider for some period of time (24 hours by default).
