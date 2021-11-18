---
title: "Nodes"
description: "Computers running IPFS are called nodes. Nodes are the most imporant aspect of IPFS - without nodes running the IPFS daemon, there would be no such thing as IPFS. This page discusses what nodes are, current IPFS implementations, and the types of services different nodes can offer."
---

# Nodes

Computers running IPFS are called _nodes_. Nodes are the most important aspect of IPFS - without nodes running the IPFS daemon, there would be no such thing as IPFS in the first place.

## Implementations

Protocol Labs manages two primary implementations of the IPFS spec: Go-IPFS, and JS-IPFS.

### Go-IPFS

The Go implementation is designed to run on servers and user-machines with the full capabilities of IPFS. New IPFS features are usually created on Go-IPFS before any other implementation. Features include:

- TCP and QUIC transports enabled by default.
- `/ws/` transport disabled by default.
- HTTP gateway with subdomain support for origin isolation between content roots.

### JS-IPFS

The Javascript implementation is designed to run in the browser with a limited set of capabilities. Features include:

- Can connect to server nodes using secure websockets.
    - WSS requires manual setup of TLS at the server.
- Can connect to a browser node using WebRTC, with the help of a centralized ws-webrtc-star signalling service.

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
- [Addenda](#addenda)

### Preload

When users want to make a UnixFS DAG publicly available they call `ipfs refs -r <CID>` on a randomly chosen preload node's HTTP API. This puts the CID in the preload nodes' `wantlist`, which then causes it to fetch the data from the user. Other nodes requesting the content can then resolve it from the preload node using bitswap, as the data is now present in the preload node’s blockstore.

Features of a preload node:

- They are Go-IPFS nodes with API ports exposed. Some HTTP API commands are accessible.
- The [`stabilize-dht` patch](https://github.com/ipfs/go-ipfs/tree/feat/stabilize-dht) has been applied.
- Used by both Go-IPFS and JS-IPFS nodes.
- JS-ipfs nodes remain connected to the libp2p swarm ports of all preload nodes by having preload nodes on the bootstrap list.

Limitations of a preload node:

- Preload nodes garbage collect every hour so preloaded content only survives for that long. This is configurable, however.
- Only DAG-PG CIDs can be understood by preload nodes. To retrieve non-dag-pb content, a node would need a connection to the publishing JS-IFPS instance, or that content would need to be put on the DHT by a delegate node. 

## Relay

If an IPFS node deems itself unreachable by the public internet, Go-IPFS nodes will use a relay node as a kind of VPN in an attempt to reach the unreachable node.

Features of a relay node:

- Can be either Go-IPFS or JS-IPFS nodes, however JS-IPFS nodes require some advanced configuration

* are go-ipfs nodes
    * Q: or are they custom go-libp2p nodes?
* can also be js-libp2p nodes properly configured, or the out of the box [js relay](https://github.com/libp2p/js-libp2p-relay-server)
* are used by go-ipfs nodes to serve as relays/VPNs for nodes who deem themselves to be unreachable by the public internet
    * Q: Used by js-ipfs too?
    * A: Yes. They can also be used to overcome lack of transport compatibility. For instance, a browser node with websockets/webRTC transports can talk with a go-ipfs node that only talks TCP, via a relay that support both transports. This is not enabled by default and needs to be setup.
* not configurable in go-ipfs and uses a preset list of relays

## Bootstrap

* are go-ipfs nodes
* used by go and js-ipfs nodes to enter the DHT
* if they go offline a go-ipfs node that restarts will not by default be able to join the public DHT
    * Q: SO MANY QUESTIONS... to start, do you mean if *all* configured bootstrap nodes go offline this happens?
* configurable in go and js-ipfs config files

## Delegate routing

* are go-ipfs nodes with their API ports exposed and some HTTP API commands accessible
* used by js-ipfs nodes to query the DHT and also publish content without having to actually run DHT logic on their own
* publishing works with arbitrary CID codecs as the [js-delegate-content module](https://github.com/libp2p/js-libp2p-delegated-content-routing/blob/master/src/index.js#L127-L128) publishes CIDs at the block level rather than the ipld/dag level
* Delegate nodes garbage collect every hour so provided content only survives for that long - unless the uploading js-ipfs node is still running, in which case it will issue periodic re-provides via the same publising mechanic which extends the life of the content on the DHT

## Addenda

1. Preload and delegate routing nodes are the same servers (go-ipfs nodes) though they are addressed independently so do not need to be - we have the choice to make them stand-alone processes in the future if we wish.
    * Q: "addressed independently" - what does this mean? a different place in config? or where the network communication happens in the stack/codepath?
    * A: different multiaddrs that resolve to the same physical (virtual?) machine - e.g. [preload config](https://github.com/ipfs/js-ipfs/blob/master/packages/ipfs-core/src/runtime/config-nodejs.js#L36-L39), [delegate config](https://github.com/ipfs/js-ipfs/blob/master/packages/ipfs-core/src/runtime/config-nodejs.js#L14-L17)
3. Preload, delegate and bootstrap nodes are all in the js-ipfs configuration as bootstrap nodes so it will maintain libp2p swarm connections to them at all times.
    * Q: Are they distinguished in the js-ipfs config, or just look like a regular bootrap node there?
    * A: They are [configured](https://github.com/ipfs/js-ipfs/blob/master/packages/ipfs-core/src/runtime/config-nodejs.js#L29-L39) as regular bootstrap nodes but have the string 'preload' in their multiaddrs
    * Q: Is there documentation for how to add these nodes to config, and what they do?
    * A: https://github.com/ipfs/js-ipfs/blob/master/docs/CONFIG.md#addresses
