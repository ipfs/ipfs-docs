---
title: "Nodes"
description: "Computers running IPFS are called nodes. Nodes are the most imporant aspect of IPFS - without nodes running the IPFS daemon, there would be no such thing as IPFS. This page discusses what nodes are, current IPFS implementations, and the types of services different nodes can offer."
---

# Nodes

Computers running IPFS are called _nodes_. Nodes are the most crucial aspect of IPFS - without nodes running the IPFS daemon, there would be no such thing as IPFS in the first place.

## Implementations

Protocol Labs manages two primary implementations of the IPFS spec: Go-IPFS and JS-IPFS.

### Go-IPFS

The Go implementation is designed to run on servers and user machines with the full capabilities of IPFS. New IPFS features are usually created on Go-IPFS before any other implementation. Features include:

- TCP and QUIC transports are enabled by default.
- `/ws/` transport disabled by default.
- HTTP gateway with subdomain support for origin isolation between content roots.

### JS-IPFS

The Javascript implementation is designed to run in the browser with a limited set of capabilities. Features include:

- Can connect to server nodes using secure WebSockets.
    - WSS requires manual setup of TLS at the server.
- Can connect to a browser node using WebRTC using a centralized ws-webrtc-star signaling service.

Specific limitations of the JS-IPFS implementation are:

- Unless using WSS, a JS-IPFS node cannot connect to the main public DHT. They will only connect to other JS-IPFS nodes.
- The performance of the DHT is not on-par with the Go-IPFS implementation.
- The HTTP gateway is present, but it has no subdomain support

## Types

There are different types of IPFS node. And depending on the use-case, a single IPFS node can serve one of many functions:

- [Preload](#preload)
- [Relay](#relay)
- [Bootstrap](#bootstrap)
- [Delegate routing](#delegate-routing)

### Preload

When users want to make a UnixFS DAG publicly available, they call `ipfs refs -r <CID>` on a randomly chosen preload node's HTTP API. This puts the CID in the preload nodes' `wantlist`, which then causes it to fetch the data from the user. Other nodes requesting the content can then resolve it from the preload node using bitswap, as the data is now present in the preload node’s blockstore.

Features of a preload node:

- They are Go-IPFS nodes with API ports exposed. Some HTTP API commands are accessible.
- The [`stabilize-dht` patch](https://github.com/ipfs/go-ipfs/tree/feat/stabilize-dht) has been applied.
- Used by both Go-IPFS and JS-IPFS nodes.
- JS-ipfs nodes remain connected to the libp2p swarm ports of all preload nodes by having preload nodes on the bootstrap list.
- Often on the same _server_ as a [delegate routing node](#delegate-routing), though both the delegate routing service and preload service are addressed differently. This is done by having different multiaddrs that resolve to the same machine.
- Preload nodes are in the default JS-IPFS configuration as bootstrap nodes, so they will maintain libp2p swarm connections to them at all times.
    - They are configured as regular bootstrap nodes, but have the string 'preload' in their multiaddrs.

Limitations of a preload node:

- Preload nodes garbage collect every hour, so preloaded content only survives for that long. This is configurable, however.
- Only DAG-PG CIDs can be understood by preload nodes. To retrieve non-dag-pb content, a node would need a connection to the publishing JS-IFPS instance, or that content would need to be put on the DHT by a delegate node. 

## Relay

If an IPFS node deems itself unreachable by the public internet, Go-IPFS nodes will use a relay node as a kind of VPN in an attempt to reach the unreachable node.

Features of a relay node:

- Can be either Go-IPFS or JS-IPFS nodes; however, JS-IPFS nodes require some advanced configuration using [JS Relay](https://github.com/libp2p/js-libp2p-relay-server).
- They're used by both Go-IPFS and JS-IPFS nodes.
    - JS-IPFS nodes can also use relay nodes to overcome the lack of transport compatibility within the JS-IPFS implementation. A browser node with WebSockets/webRTC transports can talk with a Go-IPFS node that only communicates through TCP using a relay that supports both transports. This is not enabled by default and needs to be set up.

Limitations of relay nodes:

- The list of relay nodes within Go-IPFS is preset and is not configurable.

## Bootstrap

Both Go-IPFS and JS-IPFS nodes use bootstrap nodes to initially enter the DHT.

Features of a bootstrap node:

- All bootstrap nodes use the Go-IPFS implementation.
- They are used by both Go-IPFS and JS-IPFS nodes.
- The list of bootstrap nodes a Go-IPFS or JS-IPFS node connects to is configuration.

Limitations of a bootstrap node:

- If an IPFS node only has one bootstrap node listed in that configuration and that bootstrap node goes offline, the IPFS node will lose access to the public DHT if it were to restart.

## Delegate routing

When IPFS nodes are unable to run DHT logic on their own, they _delegate_ the task to a delegate routing node. Publishing works with arbitrary CID codecs, as the [js-delegate-content module](https://github.com/libp2p/js-libp2p-delegated-content-routing/blob/master/src/index.js#L127-L128) publishes CIDs at the block level rather than the IPLD or DAG level.

Features of a delegate routing node:

- They are Go-IPFS nodes with API ports exposed. Some HTTP API commands are accessible.
- Usable by both Go-IPFS and JS-IPFS nodes.
- Often on the same _server_ as a [preload](#preload) node, though both the delegate routing service and preload service are addressed differently. This is done by having different multiaddrs that resolve to the same machine.
- Delegate routing nodes are in the default JS-IPFS configuration as bootstrap nodes, so they will maintain libp2p swarm connections to them at all times.
 - They are configured as regular bootstrap nodes, but have the string 'preload' in their multiaddrs.

Limitations of a delegate routing node:

- Garbage collection happens every hour, so provided content only survives for that long. If the uploading JS-IPFS node is still running, it will issue periodic re-provides using the same publishing mechanic, which extends the life of the content on the DHT.


