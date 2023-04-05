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

P2P networks are _decentralized_, meaning that participants communicate directly with one another on equal footing. More specifically:

 - P2P networks do not require a privileged set of servers that behave differently from their clients, as in the predominant client-server model.
 - No central server or authority controls the network.
 

P2P networks can take many forms, including file-sharing systems like BitTorrent, blockchain networks like Bitcoin and Ethereum, and decentralized communication standards like Matrix. These systems all have different challenges and tradeoffs,
but they share the goal of improving upon the traditional client-server networking model.

## Background of libp2p and IPFS

libp2p was initially developed as the wire protocol for the IPFS project, but has since phased out into a broader networking stack that a wide range of other projects use as a networking layer. It provides a set of specifications that can be adapted to support various protocols, allowing developers to create libp2p applications that can operate in multiple runtimes and networking environments.

Discovering and connecting with other peers is a key challenge in P2P networking. Before libp2p, each P2P application had to develop its own solution, leading to a lack of reusable, well-documented P2P protocols. The IPFS team looked at existing research and networking applications for inspiration, but found few code implementations that were usable and adaptable. Existing implementations had problems like:

- Minimal documentation.
- Restrictive licensing.
- Outdated code.
- No point of contact.
- Being closed source, deprecated, or lacked specifications.
- Unfriendly APIs.
- Tight coupling with specific use cases. 
- Lack of upgradeability. 

As a result, developers often had to reinvent the wheel each time they needed P2P protocols rather than being able to reuse existing solutions.

libp2p was designed to address these limitations.

## Features of libp2p

### Peer identity

_Peer identity_, often abbreviated as [PeerId](https://docs.libp2p.io/reference/glossary/#peerid), is a unique identifier for each peer on a libp2p network. Each peer has a private key, which is kept secret, and a corresponding public key, which is shared with other peers. The PeerId is a cryptographic hash of the public key and is encoded using the multihash format. IPFS uses PeerIds to provide a secure and reliable means of referencing a specific peer on the network.

Check out the [libp2p documentation](https://docs.libp2p.io/concepts/fundamentals/peers/) to learn more about PeerIds and peers.

### Addressing

Like many P2P networks, IPFS uses libp2p to provide nodes with a flexible and efficient networking layer. One of the key components of libp2p is _multiaddress_, a format that encodes multiple layers of addressing information into a single representation.

Each node in IPFS is identified by a unique multiaddress, consisting of several components describing the node's location and configuration. A typical IPFS multiaddress is formatted as `/<protocol>/<ip-address>/<port>/<ipfs-id>`.

For example, `/ipv4/192.0.2.0/udp/1234` represents the use of the IPv4 protocol with the address 192.0.2.0 and UDP packets sent to port 1234.

Multiaddresses in IPFS become even more powerful when composed of other information. For instance, the multiaddress `/p2p/QmYyQSo1c1Ym7orWxLYvCrM2EmxFTANf8wXmmE7DWjhx5N` uniquely identifies a local IPFS node. This multiaddress uses libp2p’s registered protocol ID `/p2p/` and the multihash of an IPFS node’s public key.

See the [libp2p documentation](https://docs.libp2p.io/concepts/fundamentals/addressing/) to learn more about addressing in libp2p.

## How IPFS uses libp2p for P2P connections

### Transports

In IPFS, libp2p _transports_ are the foundational protocols that move data between nodes. To ensure compatibility and flexibility, libp2p is designed to be transport-agnostic, allowing developers to choose the best transport protocol for their needs. With the ability to listen and dial connections through the common [listening and dialing interface](https://docs.libp2p.io/concepts/transports/listen-and-dial/) provided by libp2p, IPFS enables seamless communication between nodes, regardless of the transport protocol used. The freedom to choose and support multiple transports simultaneously gives IPFS a strong foundation for delivering reliable, high-performance data transfer.

See the [libp2p documentation](https://docs.libp2p.io/concepts/transports/overview/) to learn more about transports in libp2p.

### Secure channels

Establishing a secure communication channel between two peers is crucial before transmitting data. Libp2p supports various transport protocols, including TCP, [QUIC](https://docs.libp2p.io/concepts/transports/quic/) and [WebTransport](https://docs.libp2p.io/concepts/transports/webtransport/). Each protocol has varying levels of built-in security. For example, QUIC has encrypts at the transport layer, while other protocols like TCP and WebSocket require a security handshake after the transport connection is established.

Libp2p supports two main security protocols: [TLS 1.3](https://docs.libp2p.io/concepts/secure-comm/tls/) and [Noise](https://docs.libp2p.io/concepts/secure-comm/noise/). In IPFS, the current default is TLS 1.3.

See the [libp2p documentation](https://docs.libp2p.io/concepts/secure-comm/overview/) to learn more about secure channels in libp2p.

### Stream multiplexing

_Stream multiplexing_, often abbreviated as _stream muxing_, is a technique for sharing a single connection between multiple protocols. This reduces the resource overhead and latency associated with frequent connection establishment.

In IPFS, libp2p's stream multiplexer allows many streams to flow over a single connection. IPFS currently uses libp2p's two stream muxers, [mplex](https://docs.libp2p.io/concepts/multiplex/mplex) and [yamux](https://docs.libp2p.io/concepts/multiplex/yamux). However, many of the [transports](#transports) available in the libp2p stack come with native streams, such as QUIC, WebTransport, and WebRTC. In the case of these transports, the underlying connection does not need to perform stream multiplexing, as the protocol already provides it.

See the [libp2p documentation](https://docs.libp2p.io/concepts/multiplex/overview/) to learn more about stream multiplexing in libp2p.

### Peer discovery and routing

_Peer discovery_ and _routing_ are crucial components of P2P networking, allowing nodes to find and communicate with each other without the need for central servers. Peer discovery refers to the process by which a node in a p2p network finds services from other peers in the network, and announces services that it provides.  Peer routing involves finding a specific peer's location in the network.

IPFS nodes use multiaddresses to exchange information about available peers. A Distributed Hash Table (DHT) is used to store and retrieve information about peers and content. These mechanisms are combined with peer routing algorithms to efficiently discover new peers, route data, and maintain the network topology. In IPFS, discovery and routing occur concurrently, creating a dynamic, resilient and adaptable network.

### Content routing

In IPFS, _content routing_ refers to the process of identifying a peer (or peers) that holds specific data, and determining how to connect to the peer(s) within the network.

IPFS utilizes content routers to identify peers that have requested data, and to inform the network that a peer can provide a certain piece of content. In IPFS, content routing is achieved through the Kademlia Distributed Hash Table (DHT). The DHT stores information on the closest peer holding the content to promote efficient routing and reduce the number of possible routes to find a specific piece of data.

### NAT traversal

_Network Address Translation_ (NAT) allows peers to move traffic between network boundaries. A NAT maps an address from one address space to another. While NAT is usually transparent for outgoing connections, listening for incoming connections often requires some configuration.

Libp2p provides [automatic router configuration](https://docs.libp2p.io/concepts/nat/overview/#automatic-router-configuration) for port forwarding.

- [UPnP (Universal Plug and Play)](https://en.wikipedia.org/wiki/Universal_Plug_and_Play)
- [NAT-PMP (NAT Port Mapping Protocol)](https://en.wikipedia.org/wiki/NAT_Port_Mapping_Protocol)

Manually opening a port requires technical expertise, and does not enforce authentication
or authorization. In many settings, UPnP is disabled by the router or a firewall. UPnP may also not work depending on the router’s firmware.

Because of this, libp2p introduced a [hole punching technique](https://docs.libp2p.io/concepts/nat/hole-punching/) that makes use of the following protocols:

- [AutoNAT](https://docs.libp2p.io/concepts/nat/autonat/), which allows a node to request other peers to dial its presumed public addresses. This is equivalent to the [STUN protocol](https://www.rfc-editor.org/rfc/rfc3489) in ICE.
- [Circuit Relay](https://docs.libp2p.io/concepts/nat/circuit-relay/), which establishes and routes a secure relay connection through a public relay node. This is equivalent to the [TURN protocol](https://datatracker.ietf.org/doc/html/rfc5766) in ICE.
- Direct Connection Upgrade through Relay (DCUtR) establishes a direct connection between nodes through hole punching without the use of a signaling server.

For more information about NATs in libp2p., see the [libp2p documentation](https://docs.libp2p.io/concepts/nat/overview/).

### Publish/subscribe

_Publish/Subscribe_ (PubSub) is a messaging model where peers congregate around topics of interest and exchange messages accordingly. In IPFS, libp2p's PubSub system allows peers to easily join and communicate on topics in real time, providing a scalable and fault-tolerant solution for P2P communication.

One of the key challenges in P2P-based PubSub systems is the prompt and efficient delivery of messages to all subscribers, especially in large and dynamic networks. To overcome these challenges, IPFS utilizes libp2p's _GossipSub_ protocol, which operates by "gossiping" with peers about the messages they have received, enabling an efficient message delivery network.

Check out the [libp2p documentation](https://docs.libp2p.io/concepts/pubsub/overview/) to learn more about PubSub in libp2p.

## Additional resources

- [The libp2p documentation](https://docs.libp2p.io/)
- [The libp2p website](https://libp2p.io/)
- [The libp2p connectivity site](https://connectivity.libp2p.io/)
- [The libp2p YouTube channel to Libp2p](https://www.youtube.com/@libp2p630)
- [The libp2p technical specifications](https://github.com/libp2p/specs)
- [Protocol Labs Research - ResNetLab on Tour](https://research.protocol.ai/tutorials/resnetlab-on-tour/)
