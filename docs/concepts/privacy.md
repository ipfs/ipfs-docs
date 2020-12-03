---
title: Privacy
sidebarDepth: 0
description: Learn about user privacy and IPFS, the InterPlanetary File System.
related:
  'Article: IPFS Privacy (Textile)': https://medium.com/pinata/ipfs-privacy-711f4b72b2ea
---

# IPFS and privacy

As you explore IPFS and learn about its core concepts, it's important to know that as a protocol for peer-to-peer data storage and delivery, IPFS in itself does not explicitly have a "privacy layer" built in. This is in line with key principles of protocol design, since different uses of IPFS over its (hopefully very long) life may call for different approaches to privacy. Implementing only one approach within the IPFS core could "box in" future builders and implementers due to a lack of modularity, flexibility, and future-proofing.

At its heart, IPFS is by design a public network: Nodes participating in the network store data affiliated with globally consistent [content addresses](/concepts/content-addressing) (CIDs), and advertise that they have those CIDs available for other nodes to use via publicly viewable [distributed hash tables](/concepts/dht/) (DHTs). Indeed, this is one of IPFS's core strengths — at its most basic, it's essentially a globally distributed "hard drive" of the network's available data, indexable both by the content that's available (those CIDs) and the participants who have the content (the nodes).

What this does mean, however, is that IPFS itself isn't explicitly protecting knowledge _about_ CIDs and who's providing or retrieving them. This isn't something unique to the distributed web; on both the dweb and the legacy web, traffic and other metadata can be monitored in ways that can infer a lot about a network and its users. Some key details on this are outlined below, but in summary: IPFS traffic, including which nodes are retrieving and/or reproviding which CIDs, occurs in the clear. If you're worried about the implications of this for your own personal use case, it's worth taking additional measures such as encrypting sensitive content, accessing IPFS content [through Tor gateways](https://dweb-primer.ipfs.io/avenues-for-access/tor-transport), or even running a private IPFS network if that's appropriate for you.

::: tip
IPFS traffic, including which nodes are retrieving and/or reproviding what data, occurs in public. If you're worried about the implications of this for your personal use case, it's worth taking additional measures.
:::

## What's public on IPFS

All traffic on IPFS is public, including the contents of files themselves (unless, of course, they're encrypted; more about this below). For purposes of understanding IPFS privacy, this may be easiest to think about in two halves: content identifiers (CIDs), and information about IPFS nodes themselves.

### Content identifiers

Here's half of it.

Because of how distributed hash tables (DHTs) work

Granted, there's some security through obscurity, but ...

Things can monitor the network, and this will become more common as IPFS matures

Garbage collection is less of a concern than pinned hashes, but GC only happens periodically

### Node IDs and node requests

Here's the other half: nodes are public. They ask for things in public. Someone could be collecting all that data.

"Similarly to how content announcements can be logged, content requests can be logged as well"
Now, your node has a unique identifier like `qmblahblahblah`, which isn't exactly "Johnny Appleseed" level of human-readable specificity, but it's still a long-lived identifier.

Someone can also do a DHT lookup on your node and find your IP address. If your node is regularly running from the same location, such as your home, this might be something you want to consider. Even if it's not, someone could affiliate your IP address over time, and perhaps infer things you may wish to keep private related to geography.

## Enhancing your IPFS privacy

If there are situations in which you know you'll need to remain private but still want to use IPFS, you may wish

### Using IPFS gateways

Gateways can be a workaround, but kind of defeat the point, because you're using the gateway as a proxy rather than running your own node. In terms of getting the most value out of IPFS, gateways are mainly useful as a means for bridging the dweb and the legacy web: delivering content for legacy users who aren't yet part of the dweb.

And in any case, there's nothing stopping a gateway operator from tracking IPs and correlating with what CIDs are requested

### Using Tor as a transport

See Dweb Primer article

### Encrypting content transported via IPFS

Content is encrypted, but the traffic can still be tracked

And you're banking that your encryption will never be cracked; someone could hold on to encrypted data until that time

### Private networks

Private IPFS networks provide full protection from public monitoring, but can lack the scale benefits provided by the public IPFS network. A private network operates identically to the public one, but with one critical difference: it can only be accessed by nodes who have been given access, and it will only ever scale to the number of those nodes. This means that the benefits of the public IPFS network's massive scale, such as geographic resiliency and speedy retrieval of high-demand content, won't be realized unless the private network is explicitly designed and scaled with this in mind.

Running a private network can be a great option for corporate implementations of IPFS — for one example, see [this case study on Morpheus.Network](/concepts/case-study-morpheus/) — because the topology of the network can be specified and built exactly as desired.
