---
title: IPFS in Go
description: Developer resources for working in Go with IPFS.
---

# IPFS in Go

## Boxo SDK

[Boxo](https://github.com/ipfs/boxo) is the Go SDK for building IPFS applications and custom implementations. It provides reusable building blocks that can be composed to fit your needs.

- [GitHub repository](https://github.com/ipfs/boxo)
- [Go reference (pkg.go.dev)](https://pkg.go.dev/github.com/ipfs/boxo)
- [Examples](https://github.com/ipfs/boxo/tree/main/examples)

### Key packages

**Content retrieval and exchange:**

- [`boxo/gateway`](https://pkg.go.dev/github.com/ipfs/boxo/gateway) -- HTTP Gateway server for serving IPFS content over HTTP
- [`boxo/bitswap`](https://pkg.go.dev/github.com/ipfs/boxo/bitswap) -- peer-to-peer block exchange protocol
- [`boxo/routing`](https://pkg.go.dev/github.com/ipfs/boxo/routing) -- content and peer routing (DHT, delegated)
- [`boxo/provider`](https://pkg.go.dev/github.com/ipfs/boxo/provider) -- advertise content availability to the network

**Data and storage:**

- [`boxo/blockstore`](https://pkg.go.dev/github.com/ipfs/boxo/blockstore) -- content-addressed block storage
- [`boxo/blockservice`](https://pkg.go.dev/github.com/ipfs/boxo/blockservice) -- block retrieval combining local storage and remote exchange
- [`boxo/ipld/unixfs`](https://pkg.go.dev/github.com/ipfs/boxo/ipld/unixfs) -- UnixFS file and directory encoding
- [`boxo/chunker`](https://pkg.go.dev/github.com/ipfs/boxo/chunker) -- file chunking strategies
- [`boxo/pinning`](https://pkg.go.dev/github.com/ipfs/boxo/pinning) -- pin management

**Naming and resolution:**

- [`boxo/path`](https://pkg.go.dev/github.com/ipfs/boxo/path) -- IPFS/IPNS path parsing and resolution
- [`boxo/ipns`](https://pkg.go.dev/github.com/ipfs/boxo/ipns) -- IPNS record creation and validation
- [`boxo/namesys`](https://pkg.go.dev/github.com/ipfs/boxo/namesys) -- name resolution (IPNS, DNSLink)

**Network setup:**

- [`boxo/bootstrap`](https://pkg.go.dev/github.com/ipfs/boxo/bootstrap) -- bootstrap peer list management
- [`boxo/autoconf`](https://pkg.go.dev/github.com/ipfs/boxo/autoconf) -- automatic node configuration (routing, bootstrappers)

### Other Go packages in the IPFS ecosystem

| Name | Go Reference | Description |
| ---- | ------------ | ----------- |
| **Libp2p** |
| [`go-libp2p`](https://github.com/libp2p/go-libp2p) | [![Go Reference](https://pkg.go.dev/badge/github.com/libp2p/go-libp2p.svg)](https://pkg.go.dev/github.com/libp2p/go-libp2p) | p2p networking library |
| [`go-libp2p-pubsub`](https://github.com/libp2p/go-libp2p-pubsub) | [![Go Reference](https://pkg.go.dev/badge/github.com/libp2p/go-libp2p-pubsub.svg)](https://pkg.go.dev/github.com/libp2p/go-libp2p-pubsub) | pubsub built on libp2p |
| [`go-libp2p-kad-dht`](https://github.com/libp2p/go-libp2p-kad-dht) | [![Go Reference](https://pkg.go.dev/badge/github.com/libp2p/go-libp2p-kad-dht.svg)](https://pkg.go.dev/github.com/libp2p/go-libp2p-kad-dht) | dht-backed router |
| **Multiformats** |
| [`go-cid`](https://github.com/ipfs/go-cid) | [![Go Reference](https://pkg.go.dev/badge/github.com/ipfs/go-cid.svg)](https://pkg.go.dev/github.com/ipfs/go-cid) | CID implementation |
| [`go-multiaddr`](https://github.com/multiformats/go-multiaddr) | [![Go Reference](https://pkg.go.dev/badge/github.com/multiformats/go-multiaddr.svg)](https://pkg.go.dev/github.com/multiformats/go-multiaddr) | multiaddr implementation |
| [`go-multihash`](https://github.com/multiformats/go-multihash) | [![Go Reference](https://pkg.go.dev/badge/github.com/multiformats/go-multihash.svg)](https://pkg.go.dev/github.com/multiformats/go-multihash) | multihash implementation |
| [`go-multibase`](https://github.com/multiformats/go-multibase) | [![Go Reference](https://pkg.go.dev/badge/github.com/multiformats/go-multibase.svg)](https://pkg.go.dev/github.com/multiformats/go-multibase) | multibase implementation |
| **IPLD** |
| [`go-block-format`](https://github.com/ipfs/go-block-format) | [![Go Reference](https://pkg.go.dev/badge/github.com/ipfs/go-block-format.svg)](https://pkg.go.dev/github.com/ipfs/go-block-format) | block interfaces and implementations |
| [`go-ipld-format`](https://github.com/ipfs/go-ipld-format) | [![Go Reference](https://pkg.go.dev/badge/github.com/ipfs/go-ipld-format.svg)](https://pkg.go.dev/github.com/ipfs/go-ipld-format) | IPLD interfaces |
| **Datastores** |
| [`go-datastore`](https://github.com/ipfs/go-datastore) | [![Go Reference](https://pkg.go.dev/badge/github.com/ipfs/go-datastore.svg)](https://pkg.go.dev/github.com/ipfs/go-datastore) | datastore interfaces, adapters, and basic implementations |
| [`go-ds-flatfs`](https://github.com/ipfs/go-ds-flatfs) | [![Go Reference](https://pkg.go.dev/badge/github.com/ipfs/go-ds-flatfs.svg)](https://pkg.go.dev/github.com/ipfs/go-ds-flatfs) | a filesystem-based datastore |
| [`go-ds-leveldb`](https://github.com/ipfs/go-ds-leveldb) | [![Go Reference](https://pkg.go.dev/badge/github.com/ipfs/go-ds-leveldb.svg)](https://pkg.go.dev/github.com/ipfs/go-ds-leveldb) | a leveldb based datastore |
| [`go-ds-pebble`](https://github.com/ipfs/go-ds-pebble) | [![Go Reference](https://pkg.go.dev/badge/github.com/ipfs/go-ds-pebble.svg)](https://pkg.go.dev/github.com/ipfs/go-ds-pebble) | a pebble based datastore |
| **Other** |
| [`go-ipfs-cmds`](https://github.com/ipfs/go-ipfs-cmds) | [![Go Reference](https://pkg.go.dev/badge/github.com/ipfs/go-ipfs-cmds.svg)](https://pkg.go.dev/github.com/ipfs/go-ipfs-cmds) | CLI & HTTP commands library |
| [`go-log`](https://github.com/ipfs/go-log) | [![Go Reference](https://pkg.go.dev/badge/github.com/ipfs/go-log.svg)](https://pkg.go.dev/github.com/ipfs/go-log) | logging framework |

## Kubo RPC Client

If you have a running [Kubo](https://github.com/ipfs/kubo) node, you can control it from Go using its `/api/v0` HTTP RPC endpoint. This is the same interface used by the `ipfs` CLI when a daemon is already running.

- [Kubo RPC client (Go)](https://pkg.go.dev/github.com/ipfs/kubo/client/rpc): the recommended Go client for the Kubo RPC API
- [Kubo RPC API reference](../kubo/rpc.md): full list of available RPC commands
- [RPC API clients in other languages](../kubo-rpc-cli.md): JavaScript, Python, Java, and more

:::tip Looking for an embedded/in-process IPFS API?
If you're considering embedding Kubo directly in your Go application via its internal CoreAPI, look at using the [Boxo SDK](#boxo-sdk) instead. Boxo provides modern, modular building blocks that replace Kubo's internal CoreAPI for most use cases.
:::

## Kubo reference docs

For more about configuring and running Kubo:

- [Configuration reference](https://github.com/ipfs/kubo/blob/master/docs/config.md)
  - [Datastore configuration](https://github.com/ipfs/kubo/blob/master/docs/datastores.md)
  - [Experimental features](https://github.com/ipfs/kubo/blob/master/docs/experimental-features.md)
- [Installing command completion](https://github.com/ipfs/kubo/blob/master/docs/command-completion.md)
- [Mounting IPFS with FUSE](https://github.com/ipfs/kubo/blob/master/docs/fuse.md)
- [Installing plugins](https://github.com/ipfs/kubo/blob/master/docs/plugins.md)
- [Performance debugging guidelines](https://github.com/ipfs/kubo/blob/master/docs/debug-guide.md)
- [IPFS API implementation guide](https://github.com/ipfs/kubo/blob/master/docs/implement-api-bindings.md)
- [Connecting with Websockets](https://github.com/ipfs/kubo/blob/master/docs/transports.md)
- [Building on Windows](https://github.com/ipfs/kubo/blob/master/docs/windows.md)
- [Additional guides](https://github.com/ipfs/kubo/blob/master/docs/)

## Hands-on examples

There are use-case examples in the [`ipfs/kubo` GitHub repository](https://github.com/ipfs/kubo). They're all self-contained projects that let you spin up and test environments quickly. [Check them out](https://github.com/ipfs/kubo/tree/master/docs/examples).

A good starting place is [Use Kubo as a library to spawn a node and add a file](https://github.com/ipfs/kubo/tree/master/docs/examples/kubo-as-a-library).
