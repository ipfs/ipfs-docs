---
title: Glossary
sidebarDepth: 0
description: A glossary guide to key terminology for IPFS, the InterPlanetary File System.
related:
  'Guide to libp2p terminology': https://docs.libp2p.io/reference/glossary/
  'Article: The Decentralized Web Explained in Words You Can Understand (Breaker)': https://breakermag.com/the-decentralized-web-explained-in-words-you-can-understand/
  'Decentralized Web Primer': https://github.com/ipfs-shipyard/ipfs-primer
---

# IPFS glossary

[A](#a) [B](#b) [C](#c) [D](#d) [E](#e) [F](#f) [G](#g) [H](#h) [I](#i) [J](#j) [K](#k) [L](#l) [M](#m) [N](#n) [O](#o) [P](#p) [Q](#q) [R](#r) [S](#s) [T](#t) [U](#u) [V](#v) [W](#w) [X](#x) [Y](#y) [Z](#z)

## A

### Announcing

Announcing is a function of the IPFS networking layer in [libp2p](#libp2p), wherein a peer can tell other peers that it has data blocks available.

### ADL

ADL is short for _Advanced Data Layout_, a concept in [IPLD](#ipld). See [IPLD docs](https://ipld.io/glossary/#adl).

## B

### Base32

Case-insensitive [Multibase](#multibase) encoding used for text representation of [CIDv1](#cid-v1).

### Base36

Case-insensitive [Multibase](#multibase)  used for text representation of [CIDv1](#cid-v1).

### Base58btc

Case-sensitive [Multibase](#multibase)  used for text representation [Multihashes](#multihash) and [CIDv0](#cid-v0).

### Base64url

Case-sensitive [Multibase](#multibase), uses modified Base64 with URL and filename safe alphabet ([RFC 4648](https://datatracker.ietf.org/doc/html/rfc4648#section-5)), where the `+` and `/`  are respectively replaced by `-` and `_`.

### Bitswap

Bitswap is IPFS's central block exchange protocol. Its purpose is to request blocks from and send blocks to other peers in the network. [More about Bitswap](https://github.com/ipfs/specs/blob/master/BITSWAP.md)

### BitTorrent

BitTorrent is a communication protocol for peer-to-peer file sharing, which is used to distribute data and electronic files over the Internet. Also, the first file-sharing application to use the protocol. [More about BitTorrent protocol](https://en.wikipedia.org/wiki/BitTorrent) and [BitTorrent app](https://www.bittorrent.com)

### Blockchain

A Blockchain is a growing list of records, known as blocks, that are linked using cryptography. Each block contains a cryptographic hash of the previous block, a timestamp, and transaction data (generally represented as a Merkle tree). [More about Blockchain](https://en.wikipedia.org/wiki/Blockchain)

### Block

A Block is a binary blob of data identified by a [CID](#cid). It could be raw bytes of arbitrary data or a chunk of serialized binary data encoded with [IPLD](#ipld) [codec](#codec).

### Bootstrap node

A Bootstrap Node is a trusted peer on the IPFS network through which an IPFS node learns about other peers on the network. [More about Bootstrapping](../how-to/modify-bootstrap-list.md)

## C

### CBOR

The Concise Binary Object Representation (CBOR) is a data format based on [JSON](#json), featuring small code and message size, and extensibility. Used within [IPLD](#ipld). [More about CBOR](http://cbor.io/)

### CID

A Content Identifier (CID) is a self-describing content-addressed label used to point to the data stored in IPFS. It is the core identifier used for IPFS and [IPLD](#ipld). [More about CID](../concepts/content-addressing.md)

### CID v0

Version 0 (v0) of the IPFS content identifier. This CID is 46 characters in length, starting with "Qm". Uses a base 58-encoded multihash, very simple but much less flexible than newer CIDs. [More about CID v0](../concepts/content-addressing.md#version-0-v0)

### CID v1

Version 1 (v1) of the IPFS content identifier. This CID version contains some leading identifiers which provide for forward-compatibility. Able to support different formats for future versions of CID. [More about CID v1](../concepts/content-addressing.md#version-1-v1)

### Circuit relay

A [libp2p](#libp2p) term for transport protocol that routes traffic between two peers over a third-party [_relay_ peer](#relay). [More about Circuit Relay](https://docs.libp2p.io/concepts/circuit-relay/).

### Circuit relay v1

Unlimited relay that requires some centralized ACL to control resource usage. [See specification](https://github.com/libp2p/specs/blob/master/relay/circuit-v1.md).

### Circuit relay v2

Truly decentralized relay implementation that provides a limited relay for things like [hole punching](#hole-punching). Support for this type of relay was introduced in go-ipfs 0.11. [See specification](https://github.com/libp2p/specs/blob/master/relay/circuit-v2.md).

### Codec

A function that encodes or decodes serial data into and from some data model. In IPFS, we use an agreed-upon codec table implemented as part of [Multicodec](#multicodec).

### Content addressing

A way to store information so a device can retrieve the data based on its content, not its location. [Learn how IPFS uses content addressing](/concepts/how-ipfs-works/#content-addressing).

### CRDT

A Conflict-Free Replicated Data Type (CRDT) is a type of specially-designed data structure used to achieve strong eventual consistency (SEC) and monotonicity (absence of rollbacks). [More about CRDT](https://github.com/ipfs/research-CRDT)

## D

### Daemon

A Daemon is a computer program that typically runs in the background. The IPFS daemon is how you take your node online to the IPFS network. [More about IPFS Daemon](../how-to/command-line-quick-start.md#take-your-node-online)

### DAG

A Directed Acyclic Graph (DAG) is a computer science data structure adapted for use with versioned file systems, blockchains, and for modeling many different kinds of information. [IPLD](#ipld) data in IPFS is naturally a DAG. [More about DAG on Wikipedia](https://en.wikipedia.org/wiki/Directed_acyclic_graph).

### DAG-JSON

DAG-JSON is a [codec](#codec) that implements the [IPLD Data Model](https://ipld.io/glossary/#data-model) as JSON, plus some additional conventions for encoding links, which it does by claiming certain specific structures of map and assigning them this meaning. DAG-CBOR also adds a "link" type using a CBOR tag, to bring it in line with the IPLD Data Model. [More about DAG-JSON](https://ipld.io/docs/codecs/known/dag-json/)

### DAG-JOSE

[More in DAG-JOSE specification](https://ipld.io/specs/codecs/dag-jose/spec/)

### DAG-CBOR

DAG-CBOR is a [codec](#codec) that implements the [IPLD Data Model](https://ipld.io/glossary/#data-model) as a subset of CBOR, plus some additional constraints for hash consistent representations. DAG-CBOR also adds a "link" type using a CBOR tag, to bring it in line with the IPLD Data Model. [More about DAG-CBOR](https://ipld.io/docs/codecs/known/dag-cbor/)

## DAG-PB

DAG-PB is a [codec](#codec) that implements a very small subset of the [IPLD Data Model](https://ipld.io/glossary/#data-model) in a particular set of [Protobuf](#protobuf) messages used in IPFS for defining how [UnixFS](#UnixFS)v1 data is serialized. [More about DAG-PB](https://ipld.io/specs/codecs/dag-pb/spec/)

### Data model

Did you mean [IPLD Data Model](https://ipld.io/glossary/#data-model)?

### DataStore

The Datastore is the on-disk storage system used by an IPFS node. Configuration parameters control the location, size, construction, and operation of the datastore. [More about Datastore](https://github.com/ipfs/go-ipfs/blob/master/docs/config.md#datastore)

### DCUtR

Direct Connection Upgrade through Relay (DCUtR) protocol enables [hole punching](#hole-punching) for NAT traversal when port forwarding is not possible. A peer will coordinate with the counterparty using a [relayed connection](#circuit-relay-v2), to upgrade to a direct connection through a NAT/firewall whenever possible. [More about DCUtR](https://github.com/libp2p/specs/blob/master/relay/DCUtR.md)

### DHT

A _Distributed Hash Table_ (DHT) is a distributed key-value store where keys are cryptographic hashes. In IPFS, each peer is responsible for a subset of the IPFS DHT. [More about DHT](dht.md)

### DMT

Short for _Data Model Tree_, a term coined by the IPLD team. [More about DMT in IPLD docs](https://ipld.io/glossary/#dmt)

### Dialing

Dialing is a function of the IPFS networking layer in [libp2p](#libp2p), wherein a connection is opened to another peer. Together, an implementation of dialing and [listening](#listening) forms a [transport](#transport).

### DNSLink

DNSLink is a protocol to link content and services directly from DNS. A DNSLink address looks like an IPNS address, but it uses a domain name instead of a hashed public key, like `/ipns/en.wikipedia-on-ipfs.org`. [More about DNSLink](https://dnslink.dev/)

### DWeb

The Decentralized Web (DWeb) looks like today's World Wide Web, but it is built with new underlying technologies that support decentralization. It is much harder for any single entity (like a government or terrorist group) to take down any single webpage, website, or service, either by accident or on purpose.

## E

## F

### Filestore

The Filestore is a data store that stores the [UnixFS](#unixfs) data components of blocks as files on the file system instead of as blocks. This allows adding content to IPFS without duplicating the content in the IPFS datastore.

## G

### Gateway

An IPFS Gateway acts as a bridge between traditional web browsers and IPFS. Through the gateway, users can browse files and websites stored in IPFS as if they were stored on a traditional web server. [More about Gateway](https://github.com/ipfs/go-ipfs/blob/master/docs/gateway.md)

### Garbage Collection

Garbage Collection (GC) is the process within each IPFS node of clearing out cached files and blocks. Nodes need to clear out previously cached resources to make room for new resources. [Pinned resources](#pinning) are never deleted.

### Graph

In computer science, a Graph is an abstract data type from the field of graph theory within mathematics. The [Merkle-DAG](#merkledag) used in IPFS is a specialized graph.

### Graphsync

Graphsync is an alternative content replication protocol under discussion, similar to [Bitswap](#bitswap). Like Bitswap, the primary job is to synchronize data blocks across peers. [More about Graphsync](https://github.com/ipld/specs/blob/master/block-layer/graphsync/graphsync.md)

## H

### HAMT-sharding

The sharding technique used for [sharding](#sharding) big UnixFS directories. It leverages properties of hash array mapped tries (HAMT). [More about HAMT](https://en.wikipedia.org/wiki/Hash_array_mapped_trie).

### Hash

A Cryptographic Hash is a function that takes some arbitrary input (content) and returns a fixed-length value. The exact same input data will always generate the same hash as output. There are numerous hash algorithms. [More about Hash](hashing.md)

### Hole punching

A generic term for NAT traversal when port forwarding is not possible. [See DCUtR](#dcutr)

## I

### Information Space

Information Space is the set of concepts, and relations among them, held by an information system. This can be thought of as a conceptual framework or tool for studying how knowledge and information are codified, abstracted, and diffused through a social system. [More about Information Space](https://en.wikipedia.org/wiki/Information_space)

### IPLD

The InterPlanetary Linked Data (IPLD) model is a set of specifications in support of decentralized data structures for the content-addressable web. Key features are interoperable protocols, easily upgradeable, backward compatible. A single namespace for all hash-based protocols. [More about IPLD](https://ipld.io/)

### IPNS

The InterPlanetary Name System (IPNS) is a system for creating and updating mutable links to IPFS content. IPNS allows for publishing the latest version of any IPFS content, even though the underlying IPFS hash has changed. [More about IPNS](ipns.md)

## J

### JSON

JavaScript Object Notation (JSON) is a lightweight data-interchange format. JSON is a text format that is completely language independent, human-readable, and easy to parse and generate. [More about JSON](https://www.json.org/)

## K

## L

### Leaf

A Leaf is a node of a graph that doesn't link to any other node. This is opposed to a [root](#root).

### libp2p

The libp2p project is a modular system of protocols, specifications, and libraries that enable the development of peer-to-peer network applications. It is an essential component of IPFS. [More about libp2p](https://libp2p.io/)

### Listening

Listening is a function of the IPFS networking layer in libp2p, wherein an incoming connection is accepted from another peer. Together, an implementation of [dialing](#dialing) and listening forms a [transport](#transport).

### Link

In IPFS and [IPLD](#ipld), a _link_ usually means a pointer to some [CID](#cid).

## M

### Merkle-DAG

The Merkle-DAG is a computer science data structure used at the core of IPFS files/block storage. Merkle-DAGs create a hash to their content, known as a [Content Identifier](#cid). [More about Merkle-DAG](merkle-dag.md)

### Merkle Forest

Merkle Forest is a phrase coined to describe the distributed, authenticated, hash-linked data structures (Merkle trees) running technologies like Bitcoin, Ethereum, git, and BitTorrent. In this way, IPFS is a forest of linked Merkle trees. [More about Merkle Forest](https://www.youtube.com/watch?v=Bqs_LzBjQyk)

### Merkle Tree

A Merkle Tree is a specific type of hash tree used in cryptography and computer science, allowing efficient and secure verification of the contents of large data structures. Named after Ralph Merkle, who patented it in 1979. [More about Merkle Tree](https://en.wikipedia.org/wiki/Merkle_tree)

### MFS

The Mutable File System (MFS) is a tool built into IPFS that lets you treat files like a normal name-based filesystem. You may add, edit, and remove MFS files while all link updates and hashes are taken care of for you. [More about MFS](file-systems.md#mutable-file-system-mfs)

### Multibase

Multibase is a protocol for disambiguating the encoding of base-encoded (e.g. base32, base36, base64, base58, etc.) binary appearing in text. In IPFS, it is used as a prefix specifying the encoding used for the remainder of the CID. [More about Multibase](https://github.com/multiformats/multibase#readme)

### Multicodec

Multicodec is an identifier indicating the format of the target content. It helps people and software know how to interpret that content after it has been fetched. In IPFS, it is backed by an agreed-upon [codec](#codec) table. Multicodecs are designed for use in binary representations, such as keys or identifiers (i.e. [CIDv1](#cid)). [More about Multicodec](https://github.com/multiformats/multicodec#readme)

### Multihash

Multihash is a protocol for differentiating outputs from various well-established hash functions, addressing size and encoding considerations. It is useful to write applications that future-proof their use of hashes, and it allows multiple hash functions to coexist. [More about Multihash](https://multiformats.io/multihash/).

### Multiformats

The Multiformats project is a collection of protocols that aim to future-proof systems today. A key element is enhancing format values with self-description. This allows for interoperability, protocol agility, and promotes extensibility. [More about Multiformats](https://multiformats.io/) and [Multihash](https://multiformats.io/multihash/)

## N

### Node

In IPFS, a node or [peer](#peer) is the IPFS program that you run on your local computer to store files and then connect to the IPFS network. [More about IPFS Node](../how-to/command-line-quick-start.md#take-your-node-online).

### Node (in graphs)

In an IPLD [graph](#graph) context, a node is a point that may be linked to by other nodes using edges or links.

For example, in a family tree each person is a _node_, while each branch connecting one person to another is an _edge_.

## O

## P

### Path/Address

A Path/Address is the method within IPFS of referencing content on the web. Addresses for content are path-like; they are components separated by slashes. [More about Path/Address](../how-to/address-ipfs-on-web.md)

### Peer

In system architecture, a Peer is an equal player in the peer-to-peer model of decentralization, as opposed to the client-server model of centralization. [See also Peer as Node](#node)

### Peer ID

A Peer ID is how each unique IPFS node is identified on the network. The Peer ID is created when the IPFS node is initialized and is essentially a cryptographic hash of the node's public key. [More about Peer ID](dht.md#peer-ids)

### Pinning

Pinning is the method of telling an IPFS node that particular data is important and so it will never be removed from that node's cache. To learn more, start by understanding [persistence, permanence, and pinning](persistence.md); then, see how to [add local pin](../how-to/pin-files.md) and read [what remote pins are](#remote-pinning).

### Pinning Service API

A vendor-agnostic [API specification](https://ipfs.github.io/pinning-services-api-spec/) that anyone can implement to provide a service for [remote pinning](#remote-pinning).

### Protobuf

Protocol Buffers (Protobuf) is a free and open-source cross-platform data format used to serialize structured data. IPFS uses it in [DAG-PB](#dag-pb). [More about Protocol Buffers](https://en.wikipedia.org/wiki/Protocol_Buffers)

### Pubsub

Publish-subscribe (Pubsub) is an experimental feature in IPFS. Publishers send messages classified by topic or content, and subscribers receive only the messages they are interested in. [More about Pubsub](https://blog.ipfs.io/25-pubsub/)

## Q

## R

### Remote Pinning

A variant of [pinning](#pinning) that uses a third-party service to ensure that data persists on IPFS, even when your local node goes offline or your local copy of data is deleted during garbage collection. [More about working with remote pinning services](../how-to/work-with-pinning-services.md).

### Relay

The Relay is a means to establish connectivity between libp2p nodes (e.g., IPFS nodes) that wouldn't otherwise be able to establish a direct connection to each other. This may be due to nodes that are behind NAT, reverse proxies, firewalls, etc. [More about Relay](https://github.com/libp2p/specs/tree/master/relay)

### Repo

The Repository (Repo) is a directory where IPFS stores all its settings and internal data. It is created with the `ipfs init` command. [More about Repo](../how-to/command-line-quick-start.md#install-ipfs)

### Root

A root is a [node](#node) in a [graph](#graph) that links to at least one other node. In an IPLD graph, roots are used to aggregate multiple chunks of a file together. 

If you have a 600MiB file `A`, it can be split into 3 chunks `B`, `C`, and `D` since the block size of IPFS is 256MiB. The node `A` that links to each of these three chunks is the root. The CID of this root is what IPFS shows you as the CID of the file.

```
      A
      |
-------------
|     |     |
B     C     D
```

## S

### Schemas

In IPFS, IPLD Schemas are a system for describing data with structural types. [More about IPLD Schemas](https://ipld.io/glossary/#schemas)

### Selectors

IPLD selectors are a form of graph query over IPLD data. They can also be thought of as a way to specify a [traversal](#traversal). [More about IPLD Selectors](https://ipld.io/glossary/#selectors)

### SFS

A Self-certifying File System (SFS) is a distributed file system that doesn't require special permissions for data exchange. It is self-certifying because data served to a client is authenticated by the file name (which is signed by the server). [More about SFS](https://en.wikipedia.org/wiki/Self-certifying_File_System)

### Sharding

An introduction of horizontal partition of data in a database or a data structure. The main purpose is to spread load and improve performance. An example of sharding in IPFS is [HAMT-sharding](#hamt-sharding) of big [UnixFS](#unixfs) directories. 

### Signing (Cryptographic)

The signing of data cryptographically allows for trusting of data from untrusted sources. Cryptographically signed values can be passed through an untrusted channel, and any tampering of the data can be detected. [More about Digital signature](https://en.wikipedia.org/wiki/Digital_signature)

### Substrate

A vocabulary term in [IPLD](#ipld), related to [ADLs](#adl).  [More in IPLD glossary](https://ipld.io/glossary/#substrate)

### Swarm

The Swarm is a term for the network of IPFS peers with which your local node has connections. Swarm addresses are addresses that your local node will listen on for connections from other IPFS peers. [More about Swarm addresses](../how-to/configure-node.md#addresses)

## T

### Transport

In [libp2p](#libp2p), transport refers to the technology that lets us move data from one machine to another. This may be a TCP network, a WebSocket connection in a browser, or anything else capable of implementing the transport interface.

### Traversal

In [IPLD](#ipld), the act of walking across the [Data Model](#data-model). [More in IPLD glossary](https://ipld.io/glossary/#substrate)

## U

### UnixFS

The Unix File System (UnixFS) is the data format used to represent files and all their links and metadata in IPFS. It is loosely based on how files work in Unix. Adding a file to IPFS creates a block, or a _tree_ of blocks, in the UnixFS format and protects it from being garbage-collected. [More about UnixFS](file-systems.md#unix-file-system-unixfs)

## V

## W

## X

## Y

## Z
