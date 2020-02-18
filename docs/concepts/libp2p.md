---
title: libp2p
sidebarDepth: 0
issueUrl: https://github.com/ipfs/docs/issues/388
description: Learn about the libp2p protocol and why it's an important ingredient in how IPFS works.
related:
  'What is libp2p?': https://docs.libp2p.io/introduction/what-is-libp2p/
  'Foundational libp2p concepts': https://docs.libp2p.io/concepts/
  'Getting started with libp2p': https://docs.libp2p.io/tutorials/getting-started/
  'Examples of libp2p key features': https://docs.libp2p.io/examples/
---

# **libp2p**

[libp2p](https://libp2p.io/) is a modular system of _protocols_, _specifications_, and _libraries_ that enable the development of peer-to-peer network applications. libp2p began as part of the IPFS project, and is still an essential component of IPFS. As the network layer for IPFS, libp2p provides flexible solutions for essential peer-to-peer elements like transport, security, peer routing, and content discovery. libp2p has implementations in [Go](https://github.com/libp2p/go-libp2p), [JavaScript](https://github.com/libp2p/js-libp2p), [Rust](https://github.com/libp2p/rust-libp2p), [Python](https://github.com/libp2p/py-libp2p), and [C++](https://github.com/soramitsu/libp2p).

### It's all about peer-to-peer network applications

A [peer-to-peer network](https://docs.libp2p.io/reference/glossary/#peer-to-peer-p2p) is one in which the players, known as _“peers”_, communicate with each other directly as equal participants. This is in direct contrast to the traditional [client-server model](https://docs.libp2p.io/reference/glossary/#client-server), where a privileged central server may provide services to many client programs on the network. These client programs usually do not communicate with each other, they communicate only with the central server.

### Features of libp2p

-  [**Addressing:**](https://docs.libp2p.io/concepts/addressing/) libp2p works with a lot of different addressing schemes in a consistent way.
-  [**Transport:**](https://docs.libp2p.io/concepts/transport/) The technology used to move your data from one machine to another.
-  [**Security:**](https://docs.libp2p.io/introduction/what-is-libp2p/#security) libp2p supports upgrading a transport connection into a securely encrypted channel.
-  [**Peer Identity:**](https://docs.libp2p.io/concepts/peer-id/) Knowing who you're talking to is key to secure and reliable communication.
-  [**Peer Routing:**](https://docs.libp2p.io/introduction/what-is-libp2p/#peer-routing) You have a [PeerId](https://docs.libp2p.io/reference/glossary/#peerid), now how do you locate them on the network?
-  [**Content Discovery:**](https://docs.libp2p.io/introduction/what-is-libp2p/#content-discovery) You don't care who you're speaking to, you care about what they can offer you.
-  [**NAT Traversal:**](https://docs.libp2p.io/concepts/nat/) Network Address Translation (NAT) allows you to move traffic seamlessly between network boundaries.
-  [**Protocols:**](https://docs.libp2p.io/concepts/protocols/) Protocols provide libp2p with flexibility in core functionalities.
-  [**Stream Multiplexing:**](https://docs.libp2p.io/concepts/stream-multiplexing/) Efficient use of your underlying transport connection.
-  [**Publish/Subscribe:**](https://docs.libp2p.io/concepts/publish-subscribe/) Publishers send messages classified by topic, and Subscribers receive only the messages they are interested in.

Overview: [What is libp2p?](https://docs.libp2p.io/introduction/what-is-libp2p/)

Video: [Introduction to libp2p](https://www.youtube.com/embed/CRe_oDtfRLw)

Tutorial: [Getting started with libp2p](https://docs.libp2p.io/tutorials/getting-started/)

[The libp2p Glossary](https://docs.libp2p.io/reference/glossary/)

[The libp2p Specification](https://github.com/libp2p/specs)
