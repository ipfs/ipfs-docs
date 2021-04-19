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

## B

### Bitswap

Bitswap is IPFS's central block exchange protocol. Its purpose is to request blocks from and send blocks to other peers in the network. [More about Bitswap](https://github.com/ipfs/specs/blob/master/BITSWAP.md)

### BitTorrent

BitTorrent is a communication protocol for peer-to-peer file sharing, which is used to distribute data and electronic files over the Internet. Also, the first file-sharing application to use the protocol. [More about BitTorrent protocol](https://en.wikipedia.org/wiki/BitTorrent) and [BitTorrent app](https://www.bittorrent.com)

### Blockchain

A Blockchain is a growing list of records, known as blocks, that are linked using cryptography. Each block contains a cryptographic hash of the previous block, a timestamp, and transaction data (generally represented as a Merkle tree). [More about Blockchain](https://en.wikipedia.org/wiki/Blockchain)

### Block

A Block is a binary blob of data, identified by a [CID](#cid).

### Bootstrap Node

A Bootstrap Node is a trusted peer on the IPFS network through which an IPFS node learns about other peers on the network. [More about Bootstrapping](https://docs.ipfs.io/how-to/modify-bootstrap-list/)

## C

### CBOR

The Concise Binary Object Representation (CBOR) is a data format based on [JSON](#json), featuring small code and message size, and extensibility. Used within [IPLD](#ipld). [More about CBOR](http://cbor.io/)

### CID

A Content Identifier (CID) is a self-describing content-addressed label used to point to the data stored in IPFS. It is the core identifier used for IPFS and [IPLD](#ipld). [More about CID](https://docs.ipfs.io/concepts/content-addressing/)

### CID v0

Version 0 (v0) of the IPFS content identifier. This CID is 46 characters in length, starting with "Qm". Uses a base 58-encoded multihash, very simple but much less flexible than newer CIDs. [More about CID v0](https://docs.ipfs.io/concepts/content-addressing/#version-0-v0)

### CID v1

Version 1 (v1) of the IPFS content identifier. This CID version contains some leading identifiers which provide for forward-compatibility. Able to support different formats for future versions of CID. [More about CID v1](https://docs.ipfs.io/concepts/content-addressing/#version-1-v1)

### CRDT

A Conflict-Free Replicated Data Type (CRDT) is a type of specially-designed data structure used to achieve strong eventual consistency (SEC) and monotonicity (absence of rollbacks). [More about CRDT](https://github.com/ipfs/research-CRDT)

## D

### Daemon

A Daemon is a computer program that typically runs in the background. The IPFS daemon is how you take your node online to the IPFS network. [More about IPFS Daemon](https://docs.ipfs.io/how-to/command-line-quick-start/#take-your-node-online)

### DAG

A Directed Acyclic Graph (DAG) is a computer science data structure adapted for use with versioned file systems, blockchains, and for modeling many different kinds of information. [More about DAG](https://en.wikipedia.org/wiki/Directed_acyclic_graph)

### DataStore

The Datastore is the on-disk storage system used by an IPFS node. Configuration parameters control the location, size, construction, and operation of the datastore. [More about Datastore](https://github.com/ipfs/go-ipfs/blob/master/docs/config.md#datastore)

### DHT

A Distributed Hash Table (DHT) is a distributed key-value store where keys are cryptographic hashes. In IPFS, each peer is responsible for a subset of the IPFS DHT. [More about DHT](https://docs.ipfs.io/concepts/dht/)

### Dialing

Dialing is a function of the IPFS networking layer in [libp2p](#libp2p), wherein a connection is opened to another peer. Together, an implementation of dialing and [listening](#listening) forms a [transport](#transport").

### DNSLink

DNSLink is a protocol to link content and services directly from DNS. A DNSLink address looks like an IPNS address, but it uses a domain name in place of a hashed public key, like /ipns/mydomain.org. [More about DNSLink](https://dnslink.io/)

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

### Hash

A Cryptographic Hash is a function that takes some arbitrary input (content) and returns a fixed-length value. The exact same input data will always generate the same hash as output. There are numerous hash algorithms. [More about Hash](https://docs.ipfs.io/concepts/hashing/)

## I

### Information Space

Information Space is the set of concepts, and relations among them, held by an information system. This can be thought of as a conceptual framework or tool for studying how knowledge and information are codified, abstracted, and diffused through a social system. [More about Information Space](https://en.wikipedia.org/wiki/Information_space)

### IPLD

The InterPlanetary Linked Data (IPLD) model is a set of specifications in support of decentralized data structures for the content-addressable web. Key features are interoperable protocols, easily upgradeable, backward compatible. A single namespace for all hash-based protocols. [More about IPLD](https://ipld.io/)

### IPNS

The InterPlanetary Name System (IPNS) is a system for creating and updating mutable links to IPFS content. IPNS allows for publishing the latest version of any IPFS content, even though the underlying IPFS hash has changed. [More about IPNS](https://docs.ipfs.io/concepts/ipns/)

## J

### JSON

JavaScript Object Notation (JSON) is a lightweight data-interchange format. JSON is a text format that is completely language independent, human-readable, and easy to parse and generate. [More about JSON](https://www.json.org/)

## K

## L

### libp2p

The libp2p project is a modular system of protocols, specifications, and libraries that enable the development of peer-to-peer network applications. It is an essential component of IPFS. [More about libp2p](https://libp2p.io/)

### Listening

Listening is a function of the IPFS networking layer in libp2p, wherein an incoming connection is accepted from another peer. Together, an implementation of [dialing](#dialing) and listening forms a [transport](#transport).

## M

### Merkle-DAG

The Merkle-DAG is a computer science data structure used at the core of IPFS files/block storage. Merkle-DAGs create a hash to their content, known as a [Content Identifier](#cid). [More about Merkle-DAG](https://docs.ipfs.io/concepts/merkle-dag/)

### Merkle Forest

Merkle Forest is a phrase coined to describe the distributed, authenticated, hash-linked data structures (Merkle trees) running technologies like Bitcoin, Ethereum, git, and BitTorrent. In this way, IPFS is a forest of linked Merkle trees. [More about Merkle Forest](https://www.youtube.com/watch?v=Bqs_LzBjQyk)

### Merkle Tree

A Merkle Tree is a specific type of hash tree used in cryptography and computer science, allowing efficient and secure verification of the contents of large data structures. Named after Ralph Merkle, who patented it in 1979. [More about Merkle Tree](https://en.wikipedia.org/wiki/Merkle_tree)

### MFS

The Mutable File System (MFS) is a tool built into IPFS that lets you treat files like a normal name-based filesystem. You may add, edit, and remove MFS files while all link updates and hashes are taken care of for you. [More about MFS](https://docs.ipfs.io/concepts/file-systems/#mutable-file-system-mfs)

### Multiformats

The Multiformats project is a collection of protocols that aim to future-proof systems today. A key element is enhancing format values with self-description. This allows for interoperability, protocol agility, and promotes extensibility. [More about Multiformats](https://multiformats.io/) and [Multihash](https://multiformats.io/multihash/)

## N

### Node

A Node or [peer](#peer) is the IPFS program that you run on your local computer to store/cache files and then connect to the IPFS network (by running the [daemon](#daemon)). [More about Node](https://docs.ipfs.io/how-to/command-line-quick-start/#take-your-node-online)

## O

## P

### Path/Address

A Path/Address is the method within IPFS of referencing content on the web. Addresses for content are path-like; they are components separated by slashes. [More about Path/Address](https://docs.ipfs.io/how-to/address-ipfs-on-web/)

### Peer

In system architecture, a Peer is an equal player in the peer-to-peer model of decentralization, as opposed to the client-server model of centralization. [See also Peer as Node](#node)

### Peer ID

A Peer ID is how each unique IPFS node is identified on the network. The Peer ID is created when the IPFS node is initialized and is essentially a cryptographic hash of the node's public key. [More about Peer ID](https://docs.ipfs.io/concepts/dht/#peer-ids)

### Pinning

Pinning is the method of telling an IPFS node that particular data is important and so it will never be removed from that node's cache. To learn more, start by understanding [persistence, permanence, and pinning](/concepts/persistence/); then, see how to [add local pin](/how-to/pin-files/) and read [what remote pins are](#remote-pinning).

### Pinning Service API

A vendor-agnostic [API specification](https://ipfs.github.io/pinning-services-api-spec/) that anyone can implement to provide a service for [remote pinning](#remote-pinning).

### Pubsub

Publish-subscribe (Pubsub) is an experimental feature in IPFS. Publishers send messages classified by topic or content, and subscribers receive only the messages they are interested in. [More about Pubsub](https://blog.ipfs.io/25-pubsub/)

## Q

## R

### Remote Pinning

A variant of [pinning](#pinning) that uses a third-party service to ensure that data persists on IPFS, even when your local node goes offline or your local copy of data is deleted during garbage collection. [More about working with remote pinning services](/how-to/work-with-pinning-services/).

### Relay

The Relay is a means to establish connectivity between libp2p nodes (e.g., IPFS nodes) that wouldn't otherwise be able to establish a direct connection to each other. This may be due to nodes that are behind NAT, reverse proxies, firewalls, etc. [More about Relay](https://github.com/libp2p/specs/tree/master/relay)

### Repo

The Repository (Repo) is a directory where IPFS stores all its settings and internal data. It is created with the `ipfs init` command. [More about Repo](https://docs.ipfs.io/how-to/command-line-quick-start/#install-ipfs)

## S

### SFS

A Self-certifying File System (SFS) is a distributed file system that doesn't require special permissions for data exchange. It is self-certifying because data served to a client is authenticated by the file name (which is signed by the server). [More about SFS](https://en.wikipedia.org/wiki/Self-certifying_File_System)

### Signing (Cryptographic)

The signing of data cryptographically allows for trusting of data from untrusted sources. Cryptographically signed values can be passed through an untrusted channel, and any tampering of the data can be detected. [More about Digital signature](https://en.wikipedia.org/wiki/Digital_signature)

### Swarm

The Swarm is a term for the network of IPFS peers with which your local node has connections. Swarm addresses are addresses that your local node will listen on for connections from other IPFS peers. [More about Swarm addresses](https://docs.ipfs.io/how-to/configure-node/#addresses)

## T

### Transport

In [libp2p](#libp2p), transport refers to the technology that lets us move data from one machine to another. This may be a TCP network, a WebSocket connection in a browser, or anything else capable of implementing the transport interface.

## U

### UnixFS

The Unix File System (UnixFS) is the data format used to represent files and all their links and metadata in IPFS and is loosely based on how files work in Unix. Adding a file to IPFS creates a block (or a tree of blocks) in the UnixFS format and protects it from being garbage-collected. [More about UnixFS](https://docs.ipfs.io/concepts/file-systems/#unix-file-system-unixfs)

## V

## W

## X

## Y

## Z
