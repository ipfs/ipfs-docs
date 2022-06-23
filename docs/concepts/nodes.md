---
title: "Nodes"
description: "Participants in the IPFS network are called nodes. Nodes are the most important aspect of IPFS - without nodes running the IPFS daemon, there would be no  IPFS network. This page discusses what nodes are, current IPFS implementations, and the types of services different nodes can offer."
---

# Nodes

Participants in the IPFS network are called _nodes_. Nodes are an IPFS program that you run on your local computer to store files and connect to the IPFS network. They're the most crucial aspect of IPFS. Without nodes running the IPFS daemon (explained below), there would be no IPFS Network.

You're likely to see the term _node_ throughout the IPFS docs, issues, and related code. It's a very general term, so its meaning depends on the context. There are three main categories of nodes: IPFS nodes, data nodes, and libp2p nodes for applications.

* __IPFS Nodes__ are programs that run on a computer that can exchange data with other IPFS nodes. They go by several different names, but we refer to them by a different term, depending on the context:
  * _node_: Use _node_ when you're referring to an individual point on the network. It's a very general term. For example, when you open IPFS Desktop, you establish yourself as a node with the potential to interact with other nodes. See [Configure a node](https://docs.ipfs.io/how-to/configure-node/).
  * _peer_: Use _peer_ when you're talking about the relationship of one node (even your own) to other nodes. It refers to their relationship as equals, with no central authority, so your node is a peer to other peers. See [Observe peers](../how-to/observe-peers/), [Exchange files between nodes](../how-to/exchange-files-between-nodes/), and [Peering with content providers](https://docs.ipfs.io/how-to/peering-with-content-providers/).
  * _daemon_: Use _daemon_ when talking about a node's activity status. When a node is online and running in the background, listening for requests for its data, it's called a _daemon_. See [Take your node online](../how-to/command-line-quick-start/#take-your-node-online)
  * _instance_: Use _instance_ when talking about a library or program, such as a Go or JS version, running on an IPFS node at a particular point in time. The peer ID is the same, so it's still the same _node_ as far as the IPFS network is concerned. See [Kubo](../reference/go/api/) and [JS-IPFS](../reference/js/api/#ipfs-and-javascript).

* __Data nodes__, Use _data nodes_ when talking about actual pieces of data on IPFS, such as DAG nodes, UnixFS nodes, and IPLD nodes. When you add a file with the `ipfs add myfile.txt` command, IPFS breaks them up into several nodes that each contain a chunk of the file and are linked to each other. See [Merkle Directed Acyclic Graphs (DAGs)](../concepts/merkle-dag/), [Unix File System (UnixFS)](../concepts/file-systems/#unix-file-system-unixfs), and stay tuned for [InterPlanetary Linked Data (IPLD) model](../concepts/ipld/) docs, which is in progress.

* __libp2p peer__ Use _libp2p peer_ when talking about libp2p nodes on which you can build applications. They're usually referred to as _peers_ in libp2p, because it provides solutions for essential peer-to-peer elements like transport, security, peer routing, and content discovery. See [concepts](../concepts/libp2p.md)


## Types

There are different types of IPFS nodes. And depending on the use-case, a single IPFS node can serve one of many functions:

- [Preload](#preload)
- [Relay](#relay)
- [Bootstrap](#bootstrap)
- [Delegate routing](#delegate-routing)

### Preload

Use to make a UnixFS DAG publicly available by calling `ipfs refs -r <CID>` on a randomly chosen preload node's HTTP API. This puts the CID in the preload nodes' wantlist, causing it to fetch the data from the user. Other nodes requesting the content can then resolve it from the preload node using bitswap, as the data is now present in the preload node’s blockstore.

Features of a preload node:

- They are Kubo nodes with API ports exposed. Some HTTP API commands are accessible.
- Used by JS-IPFS nodes running in browser contexts.
- JS-ipfs nodes remain connected to the libp2p swarm ports of all preload nodes by having preload nodes on the bootstrap list.
- Often on the same _server_ as a [delegate routing node](#delegate-routing), though both the delegate routing service and preload service are addressed differently. This is done by having different multiaddrs that resolve to the same machine.
- Preload nodes are in the default JS-IPFS configuration as bootstrap nodes, so they will maintain libp2p swarm connections to them at all times.
    - They are configured as regular bootstrap nodes, but as a convention have the string 'preload' in their `/dnsaddr` multiaddrs.

Limitations of a preload node:

- Default preload nodes provided by Protocol Labs garbage collect every hour, so preloaded content only survives for that long. However, this is configurable. You can run nodes with customized policies.
- Requires client to be smart about what gets preloaded: recursive preload of a big DAG.
- Only works with dag-pb CIDs because that's all the refs command understands. It's harder to find non-dag-pb content, e.g., you need a connection to the publishing js-ipfs instance or it needs to be put on the DHT by a delegate node.

### Relay

If an IPFS node deems itself unreachable by the public internet, IPFS nodes may choose to use a relay node as a kind of VPN in an attempt to reach the unreachable node.

Features of a relay node:

- Implements either [v1](https://github.com/libp2p/specs/blob/master/relay/circuit-v1.md) or [v2](https://github.com/libp2p/specs/blob/master/relay/circuit-v2.md) of the Circuit Relay protocol.
- Can be either Kubo or JS-IPFS nodes; however there are standalone implementations as well:
  - [js-libp2p-relay-server](https://github.com/libp2p/js-libp2p-relay-server) (supports circuit v1)
  - [go-libp2p-relay-daemon](https://github.com/libp2p/go-libp2p-relay-daemon) (supports circuit v1 & v2)
- They're used by both Kubo and JS-IPFS nodes.
    - JS-IPFS nodes can also use relay nodes to overcome the lack of transport compatibility within the JS-IPFS implementation. A browser node with WebSockets/webRTC transports can talk with a Kubo node that only communicates through TCP using a relay that supports both transports. This is not enabled by default and needs to be set up.

Limitations of relay nodes:
- v1 relays can be used by anyone without any limits, unless [go-libp2p-relay-daemon](https://github.com/libp2p/go-libp2p-relay-daemon) is used with ACLs (Access Control Lists) set up.
- v2 relays are "limited relays" that are designed to be used for [Direct Connection Upgrade through Relay](https://github.com/libp2p/specs/blob/master/relay/DCUtR.md) (aka hole punching).
- Not configurable in Kubo; uses a preset list of relays

See [p2p-circuit relay](https://github.com/libp2p/specs/tree/master/relay)

### Bootstrap

Both Kubo and JS-IPFS nodes use bootstrap nodes to initially enter the DHT.

Features of a bootstrap node:

- All default bootstrap nodes are part of the public DHT.
- The list of bootstrap nodes a or JS-IPFS node connects to is configurable in their config files.

Limitations of a bootstrap node:

- If an IPFS node only has one bootstrap node listed in that configuration and that bootstrap node goes offline, the IPFS node will lose access to the public DHT if it were to restart.

[More about Bootstrapping](../how-to/modify-bootstrap-list.md)

### Delegate routing node

When IPFS nodes are unable to run Distributed Hash Table (DHT) logic on their own, they _delegate_ the task to a delegate routing node.  Publishing works with arbitrary CID codecs (compression/decompression technology), as the [js-delegate-content module](https://github.com/libp2p/js-libp2p-delegated-content-routing/blob/master/src/index.js#L127-L128) publishes CIDs at the block level rather than the IPLD or DAG level.

Features of a delegate routing node:

- They are Kubo nodes with their API ports exposed and some API commands accessible under `/api/v0`.
- Usable by both Kubo and JS-IPFS nodes.
- JS-IPFS nodes use them to query the DHT and also publish content without having to actually run DHT logic on their own.
- Often on the same _server_ as a [preload](#preload) node, though both the delegate routing service and preload service are addressed differently. This is done by having different multiaddrs that resolve to the same machine.
- Delegate routing nodes are in the default JS-IPFS configuration as bootstrap nodes, so they will maintain libp2p swarm connections to them at all times.
 - They are configured as regular bootstrap nodes, but have the string 'preload' in their multiaddrs.

Limitations of a delegate routing node:

- On default delegate nodes provided by Protocol Labs, the garbage collection happens every hour, so provided content only survives for that long. If the uploading JS-IPFS node is still running, it will issue periodic re-provides using the same publishing mechanic, which extends the life of the content on the DHT.

## Implementations

Protocol Labs manages two implementations of the IPFS spec: Kubo and JS-IPFS. These implementations use specific types of nodes to perform server, browser, and other client functions.

### Kubo

An implementation of IPFS in Go. Designed to run on servers and user machines with full IPFS capabilities, enabling experimentation. New IPFS features are usually created on Kubo before any other implementation.
More at [Github](https://github.com/ipfs/go-ipfs#readme).

Features include:

- TCP and QUIC transports are enabled by default.
- `/ws/` transport disabled by default.
- HTTP gateway with subdomain support for origin isolation between content roots.
- Various [experimental features](https://github.com/ipfs/kubo/blob/master/docs/experimental-features.md)

See [Working with Go](../reference/go/api/#working-with-go) and [CLI Quick Start](../how-to/command-line-quick-start.md)

### JS-IPFS

An implementation of IPFS written entirely in JavaScript. It runs in a browser, a Service Worker, Electron and Node.js. Capabilities depend on the runtime.

More at [js.ipfs.io](https://js.ipfs.io) and [Github](https://github.com/ipfs/js-ipfs#readme).

#### JS-IPFS node in a browser

When in a browser, runs with a limited set of IPFS capabilities.

Browser features include:

- Can connect to server nodes using secure WebSockets.
    - WSS requires manual setup of TLS at the server.
- Can connect to a browser node using WebRTC using a centralized [ws-webrtc-star signaling service](https://github.com/libp2p/js-libp2p-webrtc-star).

Specific limitations of the JS-IPFS implementation are:

- Unless using WSS, a JS-IPFS node cannot connect to the main public DHT. They will only connect to other JS-IPFS nodes.
- The performance of the DHT is not on-par with the Kubo implementation.
- The HTTP gateway is present, but it has no subdomain support (can't open TCP port)

More at [js.ipfs.io](https://js.ipfs.io) and [Github](https://github.com/ipfs/js-ipfs#readme).
