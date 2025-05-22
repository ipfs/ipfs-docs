---
title: Troubleshooting 
description: Learn how to troubleshoot common issues with IPFS HTTP Gateways
---

# Troubleshooting HTTP Gateways

IPFS HTTP Gateways are an HTTP-based service allowing browsers, tools and software to retrieve IPFS content with HTTP. When using HTTP Gateways, developers may need to troubleshoot issues like a:

- CID not being retrievable via public IPFS gateways.
- CID being slow to load.

This page summarizes the different ways to troubleshoot common issues. To learn more about the concepts behind IPFS gateways, including how they work, available providers, types and FAQs, see [IPFS Gateway](../concepts/ipfs-gateway.md). 

## What causes retrieval to fail?

In general, slow or failure to retrieve content from an IPFS gateway is typically related to one of the following:

1. Gateway load: public gateways typically operate on a best effort basis, and may be slow to respond or unavailable due to high load.
2. Network conditions of the provider(s) may prevent direct connectivity, due to firewalls, NATs, or other network restrictions.
3. The provider is having trouble announcing the CID to the IPFS network via the DHT or the network indexer, resulting in the CID not being discoverable.

:::
When troubleshooting IPFS gateways, ensure that you are familiar with [how gateways work](../concepts/ipfs-gateway.md), as this will make the process quicker and easier.
:::

To further narrow down the root cause, use one of the following methods:

- If you want an automated, browser based tool that does the majority of the diagnosing and debugging for you, use [IPFS Check](#debug-with-ipfs-check).
- If you are running an IPFS Kubo node, you can [manually debug using kubo and IPFS check](#debug-manually).

## Debug with IPFS Check

The IPFS Check tool is a browser-based software application that automates a large part of the process described in [Debug manually](#debug-manually). Specifically, IPFS Check can help you answer these questions:

1. Is a given CID routable on IPFS Mainnet, in other words, is the CID announced to the DHT or the IPNI?
2. Is the data for the CID retrievable from the providers that are announcing it?
3. What multiaddresses and network transports are used to connect to successful providers for a CID?
4. Was NAT hole punching necessary to retrieve the data?

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

## Debug manually

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
