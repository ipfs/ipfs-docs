---
title: Troubleshooting HTTP Gateways
description: Learn how to troubleshoot common issues with IPFS HTTP Gateways
---

# Troubleshooting HTTP Gateways

IPFS HTTP Gateways (GWs) provide an HTTP-based service that allows IPFS-incompatible browsers, tools and software to access IPFS content. When using HTTP GWs , developers may need to troubleshoot issues like a:

- CID not being retrievable via public IPFS gateways.
- CID being slow to load.

This page summarizes the different ways to troubleshoot common issues.

## General advice

In general, slow retrieval or timeouts while fetching a CID from an IPFS gateway is typically related to one of the following:

- The gateway itself.
- The provider of the CID might be unreachable or down.
- You (or the provider) are not providing your CIDs to the IPFS network via the DHT, so it is not discoverable.
- Network latency between the client and the gateway, or the gateway and the provider.

To further narrow down the root cause, use one of the following methods:

- If you are running an IPFS Kubo node, you can manually debug using kubo and IPFS check.
- If you want an automated, browser based tool that does the majority of the diagnosing and debugging for you, use pl-diagnose.

## Debug with pl-diagnose

The pl-diagnose tool is a browser-based software application that automates a large part of the process described in [Debug mnaually]. To use pl-diagnose, follow these steps:

### Query the DHT for a provider

1. Navigate to the [pl-diagnose page](https://pl-diagnose.on.fleek.co/#/diagnose/access-content?backend=https%3A%2F%2Fpl-diagnose.onrender.com).
1. In the **Diagnose** menu, click **Is my content on the DHT?**.
1. In the **CID** field, enter the CID you're looking for.
1. Click **Run test**.

### Find a peer in the DHT by address

1. Navigate to the [pl-diagnose page](https://pl-diagnose.on.fleek.co/#/diagnose/access-content?backend=https%3A%2F%2Fpl-diagnose.onrender.com).
1. In the **Diagnose** menu, click **Is my peer in the DHT?**.
1. In the **Network or Multi- Address** field, enter a public network address of the peer you are looking for. The way in which you find a network address varies depending on what tool you are using. For more information, see [Find a network address](#find-a-network-address).
1. Click **Run test**.

#### Find a network address

You can find a network address using [pl-diagnose], through IPFS Desktop and WebUI, or the Kubo CLI:

##### Using pl-diagnose

The pl-diganose tool provides two methods for finding a network address.
- Complete the steps in [Query the DHT for a provider](#query-the-dht-for-a-provider). In the test output, click on any of the provider's addresses that list the IP version (not the `/p2p/PeerID` multiaddress).
- Complete the steps in [Check if a peer is accessible](#check-if-a-peer-is-accessible). In the test output, click on any of the advertised addresses.

#### Using Desktop and WebUI

- If you're using IPFS Desktop, navigate to the main menu and open the **Status** page. 
- If you're using the WebUI with the default configuration settings, navigate to [http://127.0.0.1:5001/webui](http://127.0.0.1:5001/webui).



1. In the test output, click 
Run the "Is my content on the DHT?" test and click on any of the provider's addresses that list the IP version (not the /p2p/PeerID multiaddr)
Run the "Is my node accessible?" test and click on any of the node advertised addresses
Using IPFS Desktop or IPFS WebUI
Open the IPFS WebUI "Status" page via the IPFS Desktop menu or by visiting http://127.0.0.1:5001/webui (when using the default config settings)
If you want to test a particular address then click the "Advanced" dropdown to see the node's addresses
Using the go-ipfs CLI
If you want to test a particular address then choose an entry from the list of addresses output by ipfs id

### Check if a peer is accessible
1. Query the DHT for `PeerID`s 
- Check if a network addresses or multiaddress for a particular peer is listed in the DHT.
- Check that a node is accessible by peers.
- Help you determine is specific content is available from a node. 

## Debug manually

### 1. Query the DHT

First, open up a terminal and determine if any peers are advertising the `<CID>` you are requesting:

   ```shell
   ipfs dht findprovs <CID>
   ```

**If providers are found in DHT**, their Peer IDs are returned. An example is:

```
12D3KooWChhhfGdB9GJy1GbhghAAKCUR99oCymMEVS4eUcEy67nt
12D3KooWJkNYFckQGPdBF57kVCLdkqZb1ZmZXAphe9MZkSh16UfP
QmQzqxhK82kAmKvARFZSkUVS6fo9sySaiogAnx5EnZ6ZmC
12D3KooWSH5uLrYe7XSFpmnQj1NCsoiGeKSRCV7T5xijpX2Po2aT
```

In this case, complete the steps described in [Providers returned]

**If no providers were returned**, the cause of your problem might be content publishing. Complete the steps described [No providers returned]

#### Providers returned

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

   If the test is unsuccessful, complete the steps described [No providers returned]
