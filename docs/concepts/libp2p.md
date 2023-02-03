---
title: libp2p
sidebarDepth: 0
description: Learn about the Libp2p protocol and why it's an important ingredient in how IPFS works.
related:
  'What is Libp2p?': https://docs.libp2p.io/introduction/#what-is-libp2p
  'Foundational Libp2p concepts': https://docs.libp2p.io/concepts/
  'Getting started with Libp2p': https://docs.libp2p.io/guides/
  'Examples of Libp2p key features': https://docs.libp2p.io/guides/
---

# libp2p

libp2p, (short for “library peer-to-peer”) is a peer-to-peer (P2P) networking framework that enables the development of P2P applications. It consists of a collection of protocols, specifications, and libraries that facilitate P2P communication between network participants or, in other words, peers.

## P2P basics

P2P networks are decentralized, meaning participants communicate directly with one another on a relative “equal footing.” No central server or authority controls the network. P2P networks do not require a privileged set of “servers” that behave differently from their “clients,” as in the predominant client-server model.

P2P networks can take many forms, including file-sharing systems like BitTorrent, blockchain networks like Bitcoin and Ethereum, and decentralized communication standards like Matrix. These systems all have different challenges and tradeoffs,
but they share the goal of improving upon the traditional client-server networking model.

## Background of libp2p and IPFS

libp2p was initially developed as part of the IPFS project as its wire protocol but has since phased out into a networking stack that a wide range of other projects as a networking layer has adopted. It provides a set of specifications that can be adapted to support various protocols, allowing libp2p applications to operate in multiple runtimes and networking environments.

Discovering and connecting with other peers is a key challenge in P2P networking. Each P2P application had to develop its solution for this problem in the past, leading to a lack of reusable, well-documented P2P protocols. IPFS looked to existing research and networking applications for inspiration but found few code implementations that were usable and adaptable. Many existing implementations needed better documentation, restrictive licensing, outdated code, no point of contact, closed source, deprecated, lacked specifications, unfriendly APIs, or were tightly coupled with specific use cases and not upgradeable. As a result, developers often had to reinvent the wheel each time they needed P2P protocols rather than being able to reuse existing solutions.

libp2p was designed to address the limitations of traditional P2P networking approaches and these existing network models to enable the distributed web.

## Features of libp2p

### Peer identity

Peer identity, often abbreviated as [PeerId](https://docs.libp2p.io/reference/glossary/#peerid), is a unique identifier for each peer on a libp2p network. Each peer has a private key, which is kept secret, and a corresponding public key, which is shared with other peers. The PeerId is a cryptographic hash of the public key and is encoded using the multihash format. In this way, IPFS uses PeerIds to provide a secure and reliable means of referencing a specific peer on the network.

Check out the [libp2p documentation](https://docs.libp2p.io/concepts/fundamentals/peers/) to learn more about PeerIds and Peers in general in libp2p.

### Addressing

Like many P2P networks, IPFS uses libp2p to provide nodes with a flexible and efficient networking layer. One of the key components of libp2p is multiaddress, a single, future-proof structure that encodes multiple layers of addressing information.

Each node in IPFS is identified by a unique multiaddress, consisting of several components describing the node's location and configuration. A typical IPFS multiaddress has the following format: `/<protocol>/<ip-address>/<port>/<ipfs-id>`.

For example, `/ipv4/192.0.2.0/udp/1234` represents the use of the IPv4 protocol with the address 192.0.2.0 and UDP packets sent to port 1234.

Multiaddresses in IPFS become even more powerful when composed of other information. For instance, the multiaddress `/p2p/QmYyQSo1c1Ym7orWxLYvCrM2EmxFTANf8wXmmE7DWjhx5N` uniquely identifies a local IPFS node. This multiaddress uses libp2p’s registered protocol ID /p2p/ and the multihash of an IPFS node’s public key.

Check out the [libp2p documentation](https://docs.libp2p.io/concepts/fundamentals/addressing/) to learn more about addressing in libp2p.

## How IPFS uses libp2p for P2P connections

### Transports

Transports in IPFS, powered by libp2p, are the foundational protocols that move data between nodes. To ensure compatibility and flexibility, libp2p is designed to be transport-agnostic, allowing developers to choose the best transport protocol for their needs. With the ability to listen and dial connections through a common [listening and dialing interface](https://docs.libp2p.io/concepts/transports/listen-and-dial/), libp2p provides, IPFS enables seamless communication between nodes, regardless of the transport protocol used. The freedom to choose and support multiple transports simultaneously gives IPFS a strong foundation for delivering reliable, high-performance data transfer.

Check out the [libp2p documentation](https://docs.libp2p.io/concepts/transports/overview/) to learn more about transports in libp2p.

### Secure channels

Establishing a secure communication channel between two peers is crucial before transmitting data. libp2p supports various transport protocols, including TCP, [QUIC](https://docs.libp2p.io/concepts/transports/quic/) and [WebTransport](https://docs.libp2p.io/concepts/transports/webtransport/), each with varying levels of built-in security. For example, QUIC has encryption at the transport layer, while other protocols like TCP and WebSocket require a security handshake after the transport connection is established.

libp2p supports two main security protocols: [TLS 1.3](https://docs.libp2p.io/concepts/secure-comm/tls/) and [Noise](https://docs.libp2p.io/concepts/secure-comm/noise/). In IPFS, the current default is TLS 1.3.

Check out the [libp2p documentation](https://docs.libp2p.io/concepts/secure-comm/overview/) to learn more about secure channels in libp2p.

### Stream multiplexing

Stream multiplexing, often abbreviated as stream muxing, is a technique for sharing a single connection between multiple protocols. This reduces the resource overhead and latency associated with frequent connection establishment.

In IPFS, libp2p's stream multiplexer allows many streams to flow over a single connection. IPFS currently uses libp2p's two stream muxers, [mplex](https://docs.libp2p.io/concepts/multiplex/mplex) and [yamux](https://docs.libp2p.io/concepts/multiplex/yamux). However, many of the [transports](##transports) available in the libp2p stack come with native streams, such as QUIC, WebTransport, and WebRTC, and in these cases, the underlying connection **does not need to perform stream multiplexing** as the protocol already provides it.

Check out the [libp2p documentation](https://docs.libp2p.io/concepts/multiplex/overview/) to learn more about stream multiplexing in libp2p.

### Peer discovery and routing

Peer discovery and routing are crucial components of P2P networking, allowing nodes to find and communicate with each other without the need for central servers. Peer discovery refers to finding and announcing services to other peers in the network and can be done using broadcasting, a bootstrap node, or other protocols. Peer routing involves finding a specific peer's location in the network using a routing table, a kbucket algorithm, or a gossip-based protocol.

IPFS nodes use multiaddresses to exchange information about available peers and use a DHT to store and retrieve information about peers and content. These mechanisms are combined with peer routing algorithms to efficiently discover new peers, route
data to them, and maintain the network topology. In IPFS, discovery and routing occur concurrently, making it a dynamic and resilient network that can adapt to changes in network conditions.

<!--Check out the libp2p documentation to learn more about peer discovery and routing
in libp2p. -->

### Content routing

Content routing refers to the process of identifying a specific peer that holds certain data and the means to connect to them within a P2P network.

IPFS utilizes content routers to identify peers that have requested data and to inform the network that a peer can provide
a certain piece of content. In IPFS, content routing is achieved through a Distributed Hash Table (DHT), specifically Kademlia. Each piece of content is assigned a unique identifier, and the DHT stores the information of the closest peer holding the
content. This allows for efficient routing and reduces the number of possible routes to find a specific piece of data.

<!--Check out the libp2p documentation to learn more about content routing
in libp2p. -->

### NAT traversal

Network Address Translation (NAT) allows peers to move traffic between network boundaries. NAT maps an address from one address space to another. While NAT is usually transparent for outgoing connections, listening for incoming connections requires some configuration. libp2p has the following main approaches to NAT traversal available:

- [Automatic router configuration](https://docs.libp2p.io/concepts/nat/overview/#automatic-router-configuration) for port forwarding.

> - [UPnP (Universal Plug and Play)](https://en.wikipedia.org/wiki/Universal_Plug_and_Play)
> - [NAT-PMP (NAT Port Mapping Protocol)](https://en.wikipedia.org/wiki/NAT_Port_Mapping_Protocol)

Manually opening a port requires technical expertise and does not enforce authentication
or authorization. In many settings, UPnP is disabled by the router or a firewall. UPnP may also not work depending on the
router’s firmware.

As a result, libp2p introduced a [hole punching technique](https://docs.libp2p.io/concepts/nat/hole-punching/) that makes use of the following protocols:

- [AutoNAT](https://docs.libp2p.io/concepts/nat/autonat/) allows a node to request other peers to dial its presumed public addresses. This is equivalent to the [STUN protocol](https://www.rfc-editor.org/rfc/rfc3489) in ICE.
- [Circuit Relay](https://docs.libp2p.io/concepts/nat/circuit-relay/) establishes and routes a secure relay connection through a public relay node. This is equivalent to the [TURN protocol](https://datatracker.ietf.org/doc/html/rfc5766) in ICE.
- DCUtR (Direct Connection Upgrade through Relay) establishes a direct connection between nodes through hole punching without a signaling server.

Check out the [libp2p documentation](https://docs.libp2p.io/concepts/nat/overview/) to learn more about NATs in libp2p.

### Publish/subscribe

Publish/Subscribe (PubSub) is a messaging mechanism where peers congregate around topics of interest and exchange messages. In IPFS, libp2p's PubSub system allows peers to easily join and communicate on topics in real time, providing a scalable and fault-tolerant solution for P2P communication.

One of the key challenges in P2P-based PubSub systems is delivering messages efficiently and promptly to all subscribers, especially in large and dynamic networks. To overcome these challenges, IPFS utilizes libp2p's GossipSub protocol, which operates by gossiping among peers about the messages they have received, enabling the maintenance of an efficient
message delivery network.

Check out the [libp2p documentation](https://docs.libp2p.io/concepts/pubsub/overview/) to learn more about publish/subscribe in libp2p.

## Additional resources

- [The libp2p documentation](https://docs.libp2p.io/)
- [The libp2p website](https://libp2p.io/)
- [The libp2p connectivity site](https://connectivity.libp2p.io/)
- [The libp2p YouTube channel to Libp2p](https://www.youtube.com/@libp2p630)
- [The libp2p technical specifications](https://github.com/libp2p/specs)
- [Protocol Labs Research - ResNetLab on Tour](https://research.protocol.ai/tutorials/resnetlab-on-tour/)
