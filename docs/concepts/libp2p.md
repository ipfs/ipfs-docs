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

Libp2p, (short for “library peer-to-peer”) is a peer-to-peer (P2P) networking framework that enables the development of P2P applications. It consists of a collection of protocols, specifications, and libraries that facilitate P2P communication between network participants or, in other words, peers.

## P2P basics

P2P networks are _decentralized_, meaning that participants communicate directly with one another on equal footing. More specifically:

 - P2P networks do not require a privileged set of servers that behave differently from their clients, as in the predominant client-server model.
 - No central server or authority controls the network.
 

P2P networks can take many forms, including file-sharing systems like BitTorrent, blockchain networks like Bitcoin and Ethereum, and decentralized communication standards like Matrix. These systems all have different challenges and tradeoffs,
but they share the goal of improving upon the traditional client-server networking model.

## Background of libp2p and IPFS

Libp2p was initially developed as the wire protocol for the IPFS project, but has since phased out into a broader networking stack that a wide range of other projects use as a networking layer. It provides a set of specifications that can be adapted to support various protocols, allowing developers to create libp2p applications that can operate in multiple runtimes and networking environments.

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

Libp2p was designed to address these limitations.

## Features

The features of Libp2p are listed below. For more information on each feature, click the link to navigate to the appropriate page in the [official Libp2p documentation](https://docs.libp2p.io).

- [Flexible addressing](https://docs.libp2p.io/concepts/addressing/)

- [Transport agnostic](https://docs.libp2p.io/concepts/transports/overview/)

- [Customizable security](https://docs.libp2p.io/concepts/secure-comm/overview/)

- [Peer identity](https://docs.libp2p.io/concepts/fundamentals/peers/#peer-id)

- [Peer routing](https://docs.libp2p.io/introduction/#peer-routing)

- [Content discovery](https://docs.libp2p.io/concepts/introduction/overview/#content-discovery)

- [NAT traversal](https://docs.libp2p.io/concepts/nat/)

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
