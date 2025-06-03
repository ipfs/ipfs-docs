---
title: Troubleshooting IPFS
description: Learn how to troubleshoot common issues with retrieval and providing in IPFS by identifying causes and failure modes with content routing, transfer protocols, and more.
---
<!--
## TODO
- Make it broader and split into two main topics:
  - Troubleshooting retrieval
    - content routing
      - IPNI (Network Indexer)
      - DHT
    - content retrieval
      - Bitswap
      - HTTP
  - Troubleshooting providing
    - public reachability / NAT traversal
    - provider configuration (decrease cids to advertise)
    - Provider not advertising
    - Reprovides falling behind

## Questions / checks for guiding troubleshooting process

- How are you trying to retrieve the data?
  - Public recursive IPFS gateways (like [ipfs.io](https://ipfs.io))
  - IPFS node (Kubo, Helia, etc.)
  - Are you trying to retrieve the data from a browser? (service worker gateway or with Helia/verified-fetch)
- How is the data being provided?
  - is the provider online?
  - Is the provider publicly reachable?
  - If the provider is not publicly reachable, does it have a relay
  - is NAT hole punching possible?
  - What network transports does the provider support? (TCP, QUIC, WebSockets WebTransport, WebRTC-direct)
  - What transfer protocols does the provider support? (Bitswap and/or HTTP trustless gateway)
  - If the provider is announcing the CID?
    - -->

# Troubleshooting IPFS

From a high level, troubleshooting IPFS typically comes down to finding the root cause of a problem in one of the following operations:

- [**Retrieval**](#troubleshooting-retrieval) - Retrieving data by CID from other peers in the network.
- [**Providing**](#troubleshooting-providing) - Providing data to other peers in the network.

In both cases, the failure modes can be attributed to the following:

- **Content routing**: providers for a CID cannot be found in the DHT or the IPNI.
- **Network connectivity**: a connection to provider is not possible, either because the provider is not online, or because the provider is not reachable over the network.

This guide outlines techniques to troubleshoot and identify the root cause of common issues with retrieval and providing.

For the purposes of this guide, we will use the following tools:
- [IPFS Check](https://check.ipfs.network) - A browser-based debugging tool that can help you identify the root cause of a problem with retrieval.
- [Kubo](https://github.com/ipfs/kubo) - A command-line debugging tool that can help you identify the root cause of a problem with retrieval.
- [Public Delegated Routing Endpoint](../concepts/public-utilities.md#delegated-routing-endpoint) at `https://delegated-ipfs.dev/routing/v1` - which

## Troubleshooting retrieval

In this section, you will learn to troubleshoot common issues with retrieval. For a more detailed overview of the retrieval process, see [the lifecycle of data in IPFS](../concepts/lifecycle.md#3-retrieving).


::: callout
If you are troubleshooting retrieval from a public recursive IPFS gateway, keep in mind that the gateway is just another IPFS node and an additional point of failure that you commonly have no insight into. This can make it harder to troubleshoot, because it's not clear whether the problem is with the gateway or the provider node.

We therefore recommended using Kubo or IPFS Check to troubleshoot retrieval, which give you direct insight into the retrievability of the data by CID.
:::

### What causes failure to retrieve data by CID?

When failing to fetch the data for a given CID, there are main classes of errors that may be the reason for this:

- Content routing: providers for the CID cannot be found in the DHT or the IPNI:
  - Because there are no providers for the CID.
  - Because the providers aren't announcing the CID to the DHT or IPNI
  - Because there are problems with the [DHT](https://discuss.ipfs.tech/t/incident-report-increased-latency-on-the-amino-dht/17338) or the [IPNI](https://blog.ipfs.tech/newsletter-205/#ipni-service-update).
- Connectivity:
  - The provider is offline or unreachable over the network due to NAT or firewall issues.
  - The provider is not dialable from browsers:
    - Because the provider doesn't have a public IP.
    - Because the provider doesn't support browser transports like Secure WebSockets, WebTransport, or WebRTC.

In the next section, you will learn how to determine the root cause with IPFS Check.

### Troubleshooting retrieval with IPFS Check

The IPFS Check tool is a web app that automates a large part of the process described in [Debug manually](#debug-manually-with-kubo).

IPFS Check can help you answer these questions:

1. How many providers for this CID could be found on IPFS Mainnet?
1. In which routing system was each of those providers found, the Amino DHT or the IPNI?
1. Is the data for the CID retrievable from the providers that are announcing it?
1. Is the data for the CID retrievable over Bitswap and/or HTTP?
1. What multiaddresses and network transports are used to connect to successful providers for a CID?
1. Was NAT hole punching necessary to retrieve the data?

IPFS Check provides an _outside perspective_ of IPFS node's network setup, and whether they are correctly configured.

### How to use IPFS Check

IPFS Check supports two modes of operation:

1. **CID-only checks**: you can check whether a CID is available from _any_ provider, without needing to pass a specific provider's multiaddr. In this mode, IPFS Check will search for providers both in the IPNI and the DHT.
2. **Multiaddr-based checks**: you can check whether a CID is available from a specific provider, by passing the provider's multiaddr.

To use IPFS Check, do the following:

1. Navigate to the [IPFS Check](https://check.ipfs.network/) tool.
2. In the **CID** field, enter the CID you are trying to check
3. (Optional) In the **Multiaddr field**, enter the multiaddress of the IPFS node you are trying to check.


@[youtube](XeNOQDOrdC0)

## Debug manually with Kubo

This procedure assumes that you have the latest version of kubo installed. To debug manually:

1. Open up a terminal window.

1. Using kubo, determine if any peers are advertising the `<CID>` you are requesting:

   ```shell
   ipfs routing findprovs <CID>
   ```

   **If providers are found**, their Peer IDs are returned. Example output:

   ```
   12D3KooWSvjCTS6w6f6nyJQ615p4ipiW3L7BTbt9XvpR6Kxi385m
   12D3KooWDCNa4MmDPHr3916gpk2PcQJbJXyKxfByTL6UBmSwBM2H
   12D3KooWDEYGGZAH4v1Hu75nqyF4vnN8UyfgCCwerTD98F1Z8Q1z
   12D3KooWHr9MZJVKwe7tZyD6Z8uRcZFQ7XUqhM2nQvpeQxDyAN4E
   12D3KooWGLyBGRMdNQe5KnkeT2g3QYp7uM71tpn77somfRHaWmmS
   ```

   In this case, complete the steps described in [Providers returned](#providers-returned).

   **If no providers were returned**, the cause of your problem might be content publishing. Complete the steps described in [No providers returned](#no-providers-returned).

### Providers returned

If providers were found in the DHT, do the following:

1. In the terminal, retrieve the network addresses of one of the peers returned using its `<peer-id>`:

   ```shell
   ipfs id -f '<addrs>' <peer-id>
   ```

   Upon success, you'll see a list of addresses like:

   ```
   /ip4/145.40.90.155/tcp/4001/p2p/12D3KooWSH5uLrYe7XSFpmnQj1NCsoiGeKSRCV7T5xijpX2Po2aT
   /ip4/145.40.90.155/tcp/4002/ws/p2p/12D3KooWSH5uLrYe7XSFpmnQj1NCsoiGeKSRCV7T5xijpX2Po2aT
   ip6/2604:1380:45e1:2700::d/tcp/4001/p2p/12D3KooWSH5uLrYe7XSFpmnQj1NCsoiGeKSRCV7T5xijpX2Po2aT
   /ip6/2604:1380:45e1:2700::d/tcp/4002/ws/p2p/12D3KooWSH5uLrYe7XSFpmnQj1NCsoiGeKSRCV7T5xijpX2Po2aT
   ```

1. Note the returned addresses, as you'll use them in step 4.
1. Navigate to [IPFS Check](https://check.ipfs.network/).
1. Enter the following information:
   - In the **CID** field, enter the `<CID>` you are requesting.
   - In the **Multiaddr field**, enter one of the peer addresses noted in step 2.
1. Click **Run Test**.

   If the test is unsuccessful, complete the steps described in [No providers returned](#no-providers-returned).

### No providers returned

If no providers are returned, the issue may lie in the content publishing lifecycle, specifically _reprovider runs_, the continuous process in which a node advertises provider records. _Provider records_ are mappings of CIDs to network addresses, and have an expiration time of 48 hours, which accounts for provider churn. Generally speaking, as more files are added to an IPFS node, the longer reprovide runs take. When a reprovide run takes longer than 48 hours (the expiration time for provider records), CIDs will no longer be discoverable.

:::
You can learn more about the content publishing lifecycle in [How IPFS works](../concepts/how-ipfs-works.md).
:::

With this in mind, if no providers are returned, do the following:

1. First, determine how long a reprovide run takes:

   ```shell
   ipfs stats provide
   ```

   The output should look something like:

   ```shell
   TotalProvides:          7k (7,401)
   AvgProvideDuration:     271.271ms
   LastReprovideDuration:  13m16.104781s
   LastReprovideBatchSize: 1k (1,858)
   ```

2. Note the value for `LastReprovideDuration`. If it is close to 48 hours, select one of the following options, keeping in mind that each has tradeoffs:

   - **Enable the [Accelerated DHT Client](https://github.com/ipfs/go-ipfs/blob/master/docs/experimental-features.md#accelerated-dht-client) in Kubo**. This configuration improves content publishing times significantly by maintaining more connections to peers and a larger routing table and batching advertising of provider records. However, this performance boost comes at the cost of increased resource consumption.

   - **Change the reprovider strategy from `all` to either `pinned` or `roots`.** In both cases, only provider records for explicitly pinned content are advertised. Differences and tradeoffs are noted below:
      - The `pinned` strategy will advertise both the root CIDs and child block CIDs (the entire DAG) of explicitly pinned content.
      - The `roots` strategy will only advertise the root CIDs of pinned content, reducing the total number of provides in each run. This strategy is the most efficient, but should be done with caution, as it will limit discoverability only to root CIDs. In other words, if you are adding folders of files to an IPFS node, only the CID for the pinned folder will be advertised. All the blocks will still be retrievable with Bitswap once a connection to the node is established.

3. Manually trigger a reprovide run:

   ```shell
   ipfs routing reprovide
   ```
