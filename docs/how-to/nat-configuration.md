---
title: NAT configuration
description: Fix common connection issues by managing your routers NAT and forwarding ports so other IPFS nodes can interact with your node.
---

# NAT configuration

A common issue for new users running IPFS, especially on home networks, is that their IPFS node is _sitting_ behind a NAT (network address translation). It's common for people who run an IPFS node on their home network to have very long wait times or a high rate of request failure. This is because the rest of the nodes in the IPFS network have difficulty connecting to them through their NAT. NAT allows many machines to share a single public address, and it is essential for the continued functioning of the IPv4 protocol, which would otherwise be unable to serve the needs of the modern networked population with its 32-bit address space.

When you connect to your home wifi, your computer gets an IPv4 address of something like `10.0.1.15`. This is part of a range of IP addresses reserved for internal use by private networks. When you make an outgoing connection to a public IP address, the router replaces your internal IP with its own public IP address. When data comes back from the other side, the router will translate back to the internal address.

While NAT is usually transparent for outgoing connections, listening for incoming connections requires some configuration. The router listens on a single public IP address, but any number of machines on the internal network could handle the request. To serve requests, your router must be configured to send certain traffic to a specific machine. You can configure your router to allow these connections by either of the following sections.

## IPv6

If your router and internet service provider (ISP) support IPv6, enabling it will mitigate some connection issues. Most modern routers have a single option to enable IPv6. We are unable to give detailed information about each router's settings and preferences here. Search your router manufactuer's website for _IPv6_ for information on how to enable it.

## UPnP

If your router supports UPnP, IPFS will attempt to automatically allow inbound traffic to access your local content. Some home routers may need to be configured to explicitly enable UPnP. We are unable to give detailed information about each router's settings and preferences here. Search your router manufactuer's website for _UPnP_.

## Port forwarding

Each router has different options and solutions for port forwarding. Most router manufacturers have guides for setting up port forwarding on their devices. In general, the steps are something like this:

1. Log into your router.
1. Locate your routers port forwarding section.
1. Enter the IP address of your IPFS node.
1. Set traffic to go through port `4001`.
1. Reboot your IPFS node for the changes to take effect. Make sure to reboot the entire machine, not just the IPFS daemon.

Assuming you're not trying to expose your daemon's API to the public internet, opening port `4001`/`tcp` should be sufficient.
