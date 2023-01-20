---
title: Configure NAT and port forwarding
description: Fix common connection issues by managing your routers NAT and forwarding ports so other IPFS nodes can interact with your node.
---

# Configure NAT and port forwarding

A common issue for new users running IPFS Kubo, especially on home networks, is that their IPFS node is behind a [NAT (network address translation)](../concepts/glossary.md#nat) layer (such as a residential network router). This can cause users to experience very long wait times or a high rate of request failures.
Connection issues that arise as a result of a NAT can be solved with various router configurations, such as port forwarding, each of which is discussed in this guide. 


## Background 

IPFS nodes behind a NAT often have difficulty connecting to the rest of the nodes on the IPFS network. However, there are many benefits to a NAT, because it:

- Allows many machines to share a single public address
- Is essential for the continued functioning of the IPv4 protocol, which would otherwise be unable to serve the needs of the modern networked population with its 32-bit address space.

When you connect to your home WiFi, your computer gets an IPv4 address of something like `10.0.1.15`. This is part of a range of IP addresses reserved for internal use by private networks. When you make an outgoing connection to a public IP address, the router replaces your internal IP with its own public IP address. When data comes back from the other side, the router will translate back to the internal address.

While NATs are generally transparent for outgoing connections, listening for incoming connections requires some configuration. The router listens on a single public IP address, but any number of machines on the internal network could handle the request. To serve requests, your router must be configured to send certain traffic to a specific machine. 

## Configuration options

The appropriate configuration option for your router depends on your specific setup:

- If your router supports them, [enable IPv6](#enable-ipv6) or [enable UPnP](#enable-upnp) to solve most connection issues
- [Use DCUtR holepunching](#use-dcutr-holepunching), which is enabled by default as of Kubo v0.13
- If IPv6 or UPnP are not available, or DCUtR holepunching doesn't meet your performance and reliability requirements, [enable manual port forwarding](#enable-manual-port-forwarding)

### Enable IPv6

:::callout
While enabling IPv6 can fix many connection issues, it may not address all of your connection issues. For example,  your router might support IPv6, but might still be running a firewall that blocks inbound connections.
:::

If your router and internet service provider (ISP) support IPv6, enabling it will mitigate some connection issues. Most modern routers have a single option to enable IPv6. We are unable to give detailed information about each router's settings and preferences here. Search your router manufacturer's website for _IPv6_ for information on how to enable it.

### Enable UPnP

If your router supports UPnP, IPFS will attempt to automatically allow inbound traffic to access your local content. Some home routers may need to be configured to explicitly enable UPnP. We are unable to give detailed information about each router's settings and preferences here. Search your router manufacturer's website for _UPnP_.


### Use DCUtR holepunching

As of Kubo v0.13, [DCUtR hole punching is enabled by default](https://github.com/ipfs/kubo/blob/master/docs/changelogs/v0.13.md#-relay-v2-client-with-auto-discovery-swarmrelayclient).

DCUtR holepunching has various drawbacks and tradeoffs. Currently, the connection signaling goes through a relay, which adds an average latency of 5 seconds when opening a connection. Once a direct connection is established, latency is normal. Additionally, DCUtR holepunching does not have a 100% success rate and can fail. For a deeper dive into how holepunching works in Kubo, it's drawbacks, and more information on using DCUtR, see the [_Hole punching in libp2p - Overcoming Firewalls_ blog post](https://blog.ipfs.tech/2022-01-20-libp2p-hole-punching/). 

Because of these drawbacks, you may want to use another solution, like manual port forwarding. To enable manual port forwarding, see the instructions below.

### Enable manual port forwarding

If your router does not support UPnP and/or IPv6, or you want better reliability and performance than what DCUtR provides, set up manual port forwarding. Complete the following steps to enable manual port forwarding:

1. [Open a port from the internet to your internal Kubo node](#open-a-port). 
1. [Update the Kubo Configuration](#update-the-kubo-configuration).
1. [Restart your Kubo node](#restart-your-kubo-node). 

First, open a port from the internet to your internal Kubo node.

#### Open a port 

Each router has different options and solutions for port forwarding. Most router manufacturers have guides for setting up port forwarding on their devices. In general, the steps are:

1. Log into your router.
1. Locate your routers port forwarding section.
1. Enter the IP address of your IPFS node.
1. Set traffic to go through an outside port. 
   :::tip
   If you are unsure of what port to use, `4001` is recommended.
   :::
1. Reboot your IPFS node for the changes to take effect. Make sure to reboot the entire machine, not just the IPFS daemon.

#### Update the Kubo configuration

In this step, you will update your Kubo configuration to set `Swarm.AppendAnnounce` as a list of addresses that other IPFS nodes will try to contact you at. This list lets other nodes on the network know that the port forward you created in the previous step exists, and that these are the addresses at which you can be contacted at. To update your configuration:

1. Open your Kubo configuration file. 

   :::tip
   The default location for the config file is `~/.ipfs/config`. If you have set `$IPFS_PATH`, you can find your config file at `$IPFS_PATH/config`.
   :::
   
1. Find the entry for `AppendAnnounce` in `Addresses` or create an entry for `AppendAnnounce` in `Addresses`:

   ```json
    "Addresses": {
        "Swarm": [
        "/ip4/0.0.0.0/tcp/4001",
        "/ip6/::/tcp/4001",
        "/ip4/0.0.0.0/udp/4001/quic",
        "/ip6/::/udp/4001/quic"
        ],
        "Announce": [],
        "AppendAnnounce": [],
        "NoAnnounce": [],
        "API": "/ip4/127.0.0.1/tcp/5001",
        "Gateway": "/ip4/127.0.0.1/tcp/8080"
    },
    ``` 

1. Update `AppendAnnounce`, where `<public-ip>` is your public IP address and `<port>` is the port number set in the previous step: 

   ```json
   "AppendAnnounce": [
     "/ip4/<public-ip>/tcp/<port>",
     "/ip4/<public-ip>/udp/<port>/quic",
     "/ip4/<public-ip>udp/<port>/quic-v1",
     "/ip4/<public-ip>/udp/<port>/quic-v1/webtransport",
    ],
   ```

   For example, if your public IP address is `1.2.3.4` and `12345` is the port you've chosen, `AppendAnnounce` would look like:

   ```json
   "AppendAnnounce": [
     "/ip4/1.2.3.4/tcp/12345",
     "/ip4/1.2.3.4/udp/12345/quic",
     "/ip4/1.2.3.4/udp/12345/quic-v1",
     "/ip4/1.2.3.4/udp/12345/quic-v1/webtransport",
    ],
   ```

#### Restart your Kubo node

Now that you've updated your Kubo configuration, restart Kubo so that your node is reachable, and check that the outside port is open.

1. Reboot your IPFS node for the changes to take effect. Make sure to reboot the entire machine, not just the IPFS daemon. Once Kubo restarts, your node should be reachable. 
1. Check that the outside port is open.
