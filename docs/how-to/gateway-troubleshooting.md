---
title: Troubleshooting 
description: Learn how to troubleshoot common issues with IPFS HTTP Gateways
---

# Troubleshooting HTTP Gateways

IPFS HTTP Gateways are an HTTP-based service allowing browsers, tools and software to retrieve IPFS content with HTTP. When using HTTP Gateways, developers may need to troubleshoot issues like a:

- CID not being retrievable via public IPFS gateways.
- CID being slow to load.

This page summarizes the different ways to troubleshoot common issues. To learn more about the concepts behind IPFS gateways, including how they work, available providers, types and FAQs, see [IPFS Gateway](../concepts/ipfs-gateway.md). 

## General advice

In general, slow retrieval or timeouts while fetching a CID from an IPFS gateway is typically related to one of the following:

- The gateway itself.
- The provider of the CID might be unreachable or down.
- You (or the provider) are not providing your CIDs to the IPFS network via the DHT or the network indexer, so it is not discoverable.
- Network latency between the client and the gateway, or the gateway and the provider.

:::
When troubleshooting IPFS gateways, ensure that you are familiar with [how gateways work](../concepts/ipfs-gateway.md), as this will make the process quicker and easier.
:::

To further narrow down the root cause, use one of the following methods:

- If you want an automated, browser based tool that does the majority of the diagnosing and debugging for you, use [pl-diagnose](#debug-with-pl-diagnose).
- If you are running an IPFS Kubo node, you can [manually debug using kubo and IPFS check](#debug-manually).

## Debug with pl-diagnose

The pl-diagnose tool is a browser-based software application that automates a large part of the process described in [Debug manually](#debug-manually). Specifically, this tool can help you answer these questions:

- Is a given piece of content, identified with a with a certain CID available on the IPFS network, and which peers does the DHT list as hosts for that content?
- Which addresses are listed in the DHT for a given IPFS node?
- Is an IPFS node accessible by other peers?
- Is specific content available from an IPFS node?

To use the tool, do the following:

1. Navigate to the [application page](https://pl-diagnose.on.fleek.co/#/diagnose/access-content).
1. In the **Backend URL** field, enter the address of the node you are trying to check.
1. In the menu, select from one of the options depending on your specific needs:

   - **Is my content on the DHT?** - Given a CID on the node you are checking, determine if is listed in the DHT.
   - **Is my peer in the DHT?** - Given a public network address of a node, determine if the node is listed in the DHT.
   - **Is my node accessible by other peers?** - Given a public network address of a node, determine if that node is reachable by peers.
   - **Is my node serving the content?** - Determine if the node is actually serving the content.


## Debug manually

This procedure assumes that you have the latest version of kubo installed. To debug manually:

1. Open up a terminal window.

1. Using kubo, determine if any peers are advertising the `<CID>` you are requesting:

   ```shell
   ipfs routing findprovs <CID>
   ```

   **If providers are found in DHT**, their Peer IDs are returned. Example output:

   ```
   12D3KooWChhhfGdB9GJy1GbhghAAKCUR99oCymMEVS4eUcEy67nt
   12D3KooWJkNYFckQGPdBF57kVCLdkqZb1ZmZXAphe9MZkSh16UfP
   QmQzqxhK82kAmKvARFZSkUVS6fo9sySaiogAnx5EnZ6ZmC
   12D3KooWSH5uLrYe7XSFpmnQj1NCsoiGeKSRCV7T5xijpX2Po2aT
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

If no providers are returned, the issue may lie in the content publishing lifecycle, specifically _reprovider runs_, the continuous process in which a node advertises provider records. _Provider records_ are mappings of CIDs to network addresses, and have an expiration time of 24 hours, which accounts for provider churn. Generally speaking, as more files are added to an IPFS node, the longer reprovide runs take. When a reprovide run takes longer than 24 hours (the expiration time for provider records), CIDs will no longer be discoverable.

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

1. Note the value for `LastReprovideDuration`. If it is close to 24 hours, select one of the following options, keeping in mind that each has tradeoffs:

   - **Enable the [Accelerated DHT Client](https://github.com/ipfs/go-ipfs/blob/master/docs/experimental-features.md#accelerated-dht-client) in Kubo**. This configuration improves content publishing times significantly by maintaining more connections to peers and a larger routing table and batching advertising of provider records. However, this performance boost comes at the cost of increased resource consumption.

   - **Change the reprovider strategy from `all` to either `pinned` or `roots`.** In both cases, only provider records for explicitly pinned content are advertised. Differences and tradeoffs are noted below:
      - The `pinned` strategy will advertise both the root CIDs and child block CIDs (the entire DAG) of explicitly pinned content.
      - The `roots` strategy will only advertise the root CIDs of pinned content, reducing the total number of provides in each run. This strategy is the most efficient, but should be done with caution, as it will limit discoverability only to root CIDs. In other words, if you are adding folders of files to an IPFS node, only the CID for the pinned folder will be advertised. All the blocks will still be retrievable with Bitswap once a connection to the node is established.

1. Manually trigger a reprovide run:

   ```shell
   ipfs bitswap reprovide
   ```