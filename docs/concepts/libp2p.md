---
title: Libp2p
sidebarDepth: 0
issueUrl: https://github.com/ipfs/docs/issues/388
description: Learn about the Libp2p protocol and why it's an important ingredient in how IPFS works.
related:
  'What is Libp2p?': https://docs.libp2p.io/introduction/what-is-libp2p/
  'Foundational Libp2p concepts': https://docs.libp2p.io/concepts/
  'Getting started with Libp2p': https://docs.libp2p.io/tutorials/getting-started/
  'Examples of Libp2p key features': https://docs.libp2p.io/examples/
---

# Libp2p

[Libp2p](https://libp2p.io/) is a modular system of _protocols_, _specifications_, and _libraries_ that enable the development of peer-to-peer network applications. Libp2p began as part of the IPFS project and is still an essential component of IPFS. As the network layer for IPFS, Libp2p provides flexible solutions for essential peer-to-peer elements like transport, security, peer routing, and content discovery. Libp2p has implementations in [Go](https://github.com/libp2p/go-libp2p), [JavaScript](https://github.com/libp2p/js-libp2p), [Rust](https://github.com/libp2p/rust-libp2p), [Python](https://github.com/libp2p/py-libp2p), and [C++](https://github.com/soramitsu/libp2p).

## Peer-to-peer network applications

A [peer-to-peer network](https://docs.libp2p.io/reference/glossary/#peer-to-peer-p2p) is one in which the players, known as _"peers"_, communicate with each other directly as equal participants. This is in direct contrast to the traditional [client-server model](https://docs.libp2p.io/reference/glossary/#client-server), where a privileged central server may provide services to many client programs on the network. These client programs usually do not communicate with each other; they communicate only with the central server.

Someone using Libp2p for the network layer of their peer-to-peer application is instantly freed up to focus on their own unique tasks, knowing that Libp2p handles a lot of [tasks in a decentralized system](https://hub.packtpub.com/libp2p-the-modular-p2p-network-stack-by-ipfs-for-better-decentralized-computing/). At the same time, they can customize Libp2p regarding key elements like transport, identity, and security. Some applications using Libp2p are [Filecoin](https://filecoin.io/), [Parity](https://www.parity.io/why-libp2p/), and [OpenBazaar](https://www.openbazaar.org/).

### Features of Libp2p

#### [Addressing](https://docs.libp2p.io/concepts/addressing/)

Libp2p works with a lot of different addressing schemes in a consistent way. A multiaddress (abbreviated [multiaddr](https://github.com/multiformats/multiaddr)) encodes multiple layers of addressing information into a single "future-proof" path structure. For example, `/ipv4/171.113.242.172/udp/162` indicates the use of the IPv4 protocol with the address 171.113.242.172, along with sending UDP packets to port 162.

#### [Transport](https://docs.libp2p.io/concepts/transport/)

The technology used to move your data from one machine to another. Transports are defined in terms of two core operations, _listening_ and _dialing_. Listening means that you can accept incoming connections from other peers. _Dialing_ is the process of opening an outgoing connection to a listening peer. One of Libp2p's core requirements is to be _transport agnostic_, meaning the decision of what transport protocol to use is up to an application's developer (who may decide to support many different _transports_ at the same time).

#### [Security](https://docs.libp2p.io/introduction/what-is-libp2p/#security)

Libp2p supports upgrading a transport connection into a securely encrypted channel. You can then trust the identity of the peer you're communicating with and that no third-party can read the conversation or alter it in-flight. The current default is [secio](https://docs.libp2p.io/concepts/secure-comms/), with support for [TLS 1.3](https://www.ietf.org/blog/tls13/) under development.

#### [Peer identity](https://docs.libp2p.io/concepts/peer-id/)

A Peer Identity ([often written _PeerId_](https://docs.libp2p.io/reference/glossary/#peerid)) is a unique reference to a specific peer on the peer-to-peer network. Each Libp2p peer has a private key which it keeps secret from all other peers and a corresponding public key, which is shared with other peers. The PeerId is a [cryptographic hash](https://en.wikipedia.org/wiki/Cryptographic_hash_function) of a peer's public key. PeerIds are encoded using the [multihash](https://docs.libp2p.io/reference/glossary/#multihash) format.

#### [Peer routing](https://docs.libp2p.io/introduction/what-is-libp2p/#peer-routing)

Peer Routing is the process of discovering peer addresses by using the knowledge of other peers. In a peer routing system, a peer can either give us the address we need if they have it or else send our inquiry to another peer who's more likely to have the answer. Peer Routing in Libp2p uses a [distributed hash table](https://docs.libp2p.io/reference/glossary/#dht) to iteratively route requests closer to the desired PeerId using the [Kademlia](https://en.wikipedia.org/wiki/Kademlia) routing algorithm.

#### [Content discovery](https://docs.libp2p.io/introduction/what-is-libp2p/#content-discovery)

In Content discovery, you ask for some specific piece of data, but you don't care who sends it since you're able to verify its integrity. Libp2p provides a [content routing interface](https://github.com/libp2p/interface-content-routing) for this purpose, with the primary stable implementation using the same [Kademlia](https://en.wikipedia.org/wiki/Kademlia)-based DHT as used in peer routing.

#### [NAT traversal](https://docs.libp2p.io/concepts/nat/)

Network Address Translation (NAT) allows you to move traffic seamlessly between network boundaries. NAT maps an address from one address space to another. While NAT is usually transparent for outgoing connections, listening for incoming connections requires some configuration. Libp2p has the following main approaches to NAT traversal available: [Automatic router configuration](https://docs.libp2p.io/concepts/nat/#automatic-router-configuration), [Hole punching (STUN)](https://docs.libp2p.io/concepts/nat/#hole-punching-stun), [AutoNAT](https://docs.libp2p.io/concepts/nat/#autonat), and [Circuit Relay (TURN)](https://docs.libp2p.io/concepts/nat/#circuit-relay-turn).

#### [Protocol](https://docs.libp2p.io/concepts/protocols/)

These are the protocols built with Libp2p itself, using core Libp2p abstractions like [transport](https://docs.libp2p.io/concepts/transport/), [peer identity](https://docs.libp2p.io/concepts/peer-id/), and [addressing](https://docs.libp2p.io/concepts/addressing/). Each Libp2p protocol has a unique string identifier used in the [protocol negotiation](https://docs.libp2p.io/concepts/protocols/#protocol-negotiation) process when connections are first opened. The core Libp2p protocols are [Ping](https://docs.libp2p.io/concepts/protocols/#ping), [Identify](https://docs.libp2p.io/concepts/protocols/#identify), [secio](https://docs.libp2p.io/concepts/protocols/#secio), [kad-dht](https://docs.libp2p.io/concepts/protocols/#kad-dht), and [Circuit Relay](https://docs.libp2p.io/concepts/protocols/#circuit-relay).

#### [Stream multiplexing](https://docs.libp2p.io/concepts/stream-multiplexing/)

Often abbreviated as _stream muxing_, this allows multiple independent logical streams to all share a common underlying transport medium. Libp2p's stream multiplexer sits "above" the transport stack and allows many streams to flow over a single TCP port or other raw transport connection. The current stream multiplexing implementations are [mplex](https://docs.libp2p.io/concepts/stream-multiplexing/#mplex), [yamux](https://docs.libp2p.io/concepts/stream-multiplexing/#yamux), [quic](https://docs.libp2p.io/concepts/stream-multiplexing/#quic), [spdy](https://docs.libp2p.io/concepts/stream-multiplexing/#spdy), and [muxado](https://docs.libp2p.io/concepts/stream-multiplexing/#muxado).

#### [Publish and subscribe](https://docs.libp2p.io/concepts/publish-subscribe/)

Often abbreviated as _pub-sub_, this is a system where peers congregate around topics they are interested in. Peers interested in a topic are said to be subscribed to that topic. Peers send messages to topics, which get delivered to all peers subscribed to the topic. Example uses of pub-sub are chat rooms and file sharing. For more detail and a discussion of other pub-sub designs, see the [gossipsub specification](https://github.com/libp2p/specs/blob/master/pubsub/gossipsub/README.md).

## Additional resources

- [What is Libp2p?](https://docs.libp2p.io/introduction/what-is-libp2p/)
- [Introduction to Libp2p](https://www.youtube.com/embed/CRe_oDtfRLw)
- [Getting started with Libp2p](https://docs.libp2p.io/tutorials/getting-started/)
- [The Libp2p glossary](https://docs.libp2p.io/reference/glossary/)
- [The Libp2p specification](https://github.com/libp2p/specs)
