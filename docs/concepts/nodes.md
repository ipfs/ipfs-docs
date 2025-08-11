---
title: "Nodes"
description: "Participants in the IPFS network are called nodes. Nodes are the most important aspect of IPFS - without nodes running the IPFS daemon, there would be no IPFS network. This page discusses what nodes are, current IPFS implementations, and the types of services different nodes can offer."
sidebarDepth: 2
---

# Nodes

Participants in the IPFS network are called _nodes_. A _node_ is an instance of an implementation IPFS that you run on your local computer (directly or via a browser) to store files and connect to the IPFS network. They're the most crucial aspect of IPFS. Without IPFS nodes, there would be no IPFS Network.

You're likely to see the term _node_ throughout the IPFS docs, issues, and related code. It's a very general term, so its meaning depends on the context. There are three main categories of nodes: IPFS nodes, data nodes, and libp2p nodes for applications.

* __IPFS Nodes__ are programs that run on a computer that can exchange data with other IPFS nodes. They go by several different names, but we refer to them by a different term, depending on the context:

  * _node_: Use _node_ when you're referring to an individual point on the network. It's a very general term. For example, when you open IPFS Desktop, you establish yourself as a node with the potential to interact with other nodes. See [Configure a node](../how-to/configure-node.md).
  * _peer_: Use _peer_ when you're talking about the relationship of one node (even your own) to other nodes. It refers to their relationship as equals, with no central authority, so your node is a peer to other peers. See [Observe peers](../how-to/observe-peers.md) and [Peering with content providers](../how-to/peering-with-content-providers.md).
  * _daemon_: Use _daemon_ when talking about a node's activity status. When a node is online and running in the background, listening for requests for its data, it's called a _daemon_. See [Take your node online](../how-to/command-line-quick-start.md#take-your-node-online). Note that an IPFS Helia _node_ in the browser is not generally referred to as a _daemon_. However, in the context of this document, we will refer to a Helia _instance_ acting as a _node_ in the browser as a _daemon_ . For more information, see the [Helia documentation](https://github.com/ipfs/helia/wiki).
  * _instance_: Use _instance_ when talking about a library or program, such as a Go or JS version, running on as an IPFS node at a particular point in time. The peer ID is the same, so it's still the same _node_ as far as the IPFS network is concerned. See [Kubo](../reference/go/api.md) and [Helia](../reference/js/api.md#TODO_JS_IPFS_DEPRECATION).

* __Data nodes__, Use _data nodes_ when talking about actual pieces of data on IPFS, such as DAG nodes, UnixFS nodes, and IPLD nodes. When you add a file with the `ipfs add myfile.txt` command, IPFS breaks them up into several nodes that each contain a chunk of the file and are linked to each other. See [Merkle Directed Acyclic Graphs (DAGs)](../concepts/merkle-dag.md), [Unix File System (UnixFS)](../concepts/file-systems.md#unix-file-system-unixfs), and stay tuned for [InterPlanetary Linked Data (IPLD) model](../concepts/ipld.md) docs, which is in progress.

* __libp2p peer__ Use _libp2p peer_ when talking about libp2p nodes on which you can build applications. They're usually referred to as _peers_ in libp2p, because it provides solutions for essential peer-to-peer elements like transport, security, peer routing, and content discovery. See [concepts](../concepts/libp2p.md)


## Types

There are different types of IPFS nodes. And depending on the use-case, a single IPFS node can serve one of many functions:

- [Relay](#relay)
- [Bootstrap](#bootstrap)
- [Delegated Routing](#delegated-routing)

### Relay

If an IPFS node deems itself unreachable by the public internet, IPFS nodes may choose to use a relay node as a kind of VPN in an attempt to reach the unreachable node.

#### Features of a relay node

- Implements [v2](https://github.com/libp2p/specs/blob/master/relay/circuit-v2.md) of the Circuit Relay protocol.
- Can be either Kubo or Helia nodes; however there are standalone implementations as well:
  - [js-libp2p/circuit-relay](https://github.com/libp2p/js-libp2p/blob/master/doc/CONFIGURATION.md#setup-with-relay)
  - [go-libp2p-relay-daemon](https://github.com/libp2p/go-libp2p-relay-daemon)
- They're used by both Kubo and Helia nodes.
    - A Helia _node_ in the browser can't talk TCP, so a relay can help increase the number of _peers_ that can be communicated with. A Helia _node_ with browser-supported [transports](https://github.com/libp2p/js-libp2p/blob/master/doc/CONFIGURATION.md#transport) can talk with a Kubo _peer_ with no overlapping transports using a relay _peer_ if that relay supports one transport from each other _peer_:
      1. At least one browser-supported transport (appropriate transports are [enabled by default in Helia browser _nodes_](https://github.com/ipfs/helia/blob/d2a928aa1590d5aa642c4c6747d5282f665af43f/packages/helia/src/utils/libp2p-defaults.browser.ts))
      2. At least one Kubo _peer_ supported transport.

#### Limitations of relay nodes:
- v2 relays are "limited relays" that are designed to be used for [Direct Connection Upgrade through Relay](https://github.com/libp2p/specs/blob/master/relay/DCUtR.md) (aka hole punching).

See [p2p-circuit relay](https://github.com/libp2p/specs/tree/master/relay)

### Bootstrap

Both Kubo and Helia _nodes_ use bootstrap _nodes_ to find peers on the DHT.

#### Features of a bootstrap node:

- All default bootstrap _nodes_ are part of the Amino DHT.
- The list of bootstrap _nodes_ a Helia _node_ connects to is controlled by configuring [libp2p's peerDiscovery option](https://github.com/libp2p/js-libp2p/blob/master/doc/CONFIGURATION.md#peer-discovery).

#### Limitations of a bootstrap node:

- If an IPFS _node_ only has one bootstrap _node_ listed in that configuration and that bootstrap node goes offline, the IPFS node will lose access to the Amino DHT if it were to restart.
- You can configure your _peer_ store in your implementation to cache healthy connectable _peers_ so that you can connect to them again after a restart, instead of bootstrap _nodes_. [Issue 8856 in the Kubo repository](https://github.com/ipfs/kubo/pull/8856), which addressed this, provides further information and context.

[More about Bootstrapping](../how-to/modify-bootstrap-list.md)

### Delegated Routing

IPFS nodes _delegate_ the content and peer routing tasks to a **Delegated Routing V1 HTTP API** ([spec](https://specs.ipfs.tech/routing/http-routing-v1/)).

Delegated routing over HTTP is not a routing system but a general API to offload routing work. This is useful in browsers and other constrained environments where it's infeasible to be a DHT server/client contacting many other peers. More broadly, it enables experimentation and innovation in content routing while maintaining interoperability.

The [HTTP API](https://specs.ipfs.tech/routing/http-routing-v1/) can used to resolve **content**, **peer**, and **IPNS name** routing requests.

#### Support for delegated routing in IPFS implementations

- [someguy](https://github.com/ipfs-shipyard/someguy) is a Delegated Routing V1 server that proxies requests to the IPFS Amino DHT and the [cid.contact Network Indexer](https://cid.contact/). The IPFS Foundation operates a public good delegated routing endpoint backed by someguy with the URL `https://delegated-ipfs.dev/routing/v1`.
- The [cid.contact Network Indexer](https://cid.contact/) also implements the Delegated Routing V1 HTTP API.
- [Helia](https://github.com/ipfs/helia/tree/main/packages/http#example---with-custom-gateways-and-delegated-routing-endpoints) can be configured to use a delegated routing endpoint.
- [Kubo](https://github.com/ipfs/kubo/blob/master/docs/delegated-routing.md) can be configured with multiple delegated routing endpoints ([Kubo as a client](https://github.com/ipfs/kubo/blob/master/docs/config.md#routingtype)), in addition to exposing the delegated routing endpoint on the gateway ([Kubo as a delegated routing server](https://github.com/ipfs/kubo/blob/master/docs/config.md#gatewayexposeroutingapi)).

## Implementations

[Read more about IPFS implementations](./ipfs-implementations.md)