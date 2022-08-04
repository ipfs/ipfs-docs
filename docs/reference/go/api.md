---
title: IPFS in Go
description: Developer resources for working in Go with IPFS, the InterPlanetary File System.
---

# IPFS in Go

## Working with Go

Kubo (go-ipfs) is the oldest implementation of IPFS. It is a command-line application, but can also be used as a library in other Go programs.

For more about using Kubo, see any of the following reference documents:

- [Configuration reference](https://github.com/ipfs/kubo/blob/master/docs/config.md)
  - [Datastore configuration](https://github.com/ipfs/kubo/blob/master/docs/datastores.md)
  - [Experimental features](https://github.com/ipfs/kubo/blob/master/docs/experimental-features.md)
- [Installing command completion](https://github.com/ipfs/kubo/blob/master/docs/command-completion.md)
- [Mounting IPFS with FUSE](https://github.com/ipfs/kubo/blob/master/docs/fuse.md)
- [Installing plugins](https://github.com/ipfs/kubo/blob/master/docs/plugins.md)

For more technical information about building, debugging or using the API, see:

- [Performance Debugging Guidelines](https://github.com/ipfs/kubo/blob/master/docs/debug-guide.md)
- [IPFS API Implementation](https://github.com/ipfs/kubo/blob/master/docs/implement-api-bindings.md)
- [Connecting with Websockets](https://github.com/ipfs/kubo/blob/master/docs/transports.md)
- Building on [Windows](https://github.com/ipfs/kubo/blob/master/docs/windows.md)
- [Additional guides](https://github.com/ipfs/kubo/blob/master/docs/)

If you plan to use Kubo as a package in your own Go application, you can take any of three main approaches:

- Use [kubo](https://github.com/ipfs/kubo) to run Kubo IPFS directly in your own process.
- Use [kubo RPC client](https://github.com/ipfs/go-ipfs-http-client) to communicate with a Kubo IPFS daemon in a separate process via its HTTP RPC API (this is what Kubo does if a daemon is already running).
- Use other Go packages to communicate with the HTTP RPC API directly. See the [RPC API reference](/reference/kubo/rpc/).

## Go CoreAPI

[CoreAPI interfaces](https://godoc.org/github.com/ipfs/interface-go-ipfs-core) for go-ipfs. Package iface defines IPFS Core API, which is a set of interfaces used to interact with IPFS nodes.

## Go embedded client

[Package coreapi](https://godoc.org/github.com/ipfs/kubo/core/coreapi) provides direct access to the core commands in IPFS. If you are embedding IPFS directly in your Go program, this package is the public interface you should use to read and write files or otherwise control IPFS. **This package is experimental and subject to change.**

If you are running IPFS as a separate process, you should use `go-ipfs-api` to work with it via RPC. As we finalize the interfaces in this embedded client, `go-ipfs-api` will transparently adopt them so you can use the same code with either package.

## Go HTTP clients

[CoreAPI implementation using HTTP API](https://godoc.org/github.com/ipfs/go-ipfs-http-client). **This package is experimental and subject to change.** For an old but stable Go HTTP client, use [CoreAPI interfaces](https://godoc.org/github.com/ipfs/interface-go-ipfs-core).

## Packages

> This table is generated using the module [`package-table`](https://github.com/ipfs-shipyard/package-table) with `package-table --data=package-list.json`. 

Listing of the main go packages in the IPFS ecosystem:

| Name | CI/Travis | Coverage | Description |
| ---------|---------|---------|--------- |
| **Libp2p** |
| [`go-libp2p`](//github.com/libp2p/go-libp2p) | [![Travis CI](https://flat.badgen.net/travis/libp2p/go-libp2p/master)](https://travis-ci.com/libp2p/go-libp2p) | [![codecov](https://codecov.io/gh/libp2p/go-libp2p/branch/master/graph/badge.svg?style=flat-square)](https://codecov.io/gh/libp2p/go-libp2p) | p2p networking library |
| [`go-libp2p-pubsub`](//github.com/libp2p/go-libp2p-pubsub) | [![Travis CI](https://flat.badgen.net/travis/libp2p/go-libp2p-pubsub/master)](https://travis-ci.com/libp2p/go-libp2p-pubsub) | [![codecov](https://codecov.io/gh/libp2p/go-libp2p-pubsub/branch/master/graph/badge.svg?style=flat-square)](https://codecov.io/gh/libp2p/go-libp2p-pubsub) | pubsub built on libp2p |
| [`go-libp2p-kad-dht`](//github.com/libp2p/go-libp2p-kad-dht) | [![Travis CI](https://flat.badgen.net/travis/libp2p/go-libp2p-kad-dht/master)](https://travis-ci.com/libp2p/go-libp2p-kad-dht) | [![codecov](https://codecov.io/gh/libp2p/go-libp2p-kad-dht/branch/master/graph/badge.svg?style=flat-square)](https://codecov.io/gh/libp2p/go-libp2p-kad-dht) | dht-backed router |
| [`go-libp2p-pubsub-router`](//github.com/libp2p/go-libp2p-pubsub-router) | [![Travis CI](https://flat.badgen.net/travis/libp2p/go-libp2p-pubsub-router/master)](https://travis-ci.com/libp2p/go-libp2p-pubsub-router) | [![codecov](https://codecov.io/gh/libp2p/go-libp2p-pubsub-router/branch/master/graph/badge.svg?style=flat-square)](https://codecov.io/gh/libp2p/go-libp2p-pubsub-router) | pubsub-backed router |
| **Multiformats** |
| [`go-cid`](//github.com/ipfs/go-cid) | [![Travis CI](https://flat.badgen.net/travis/ipfs/go-cid/master)](https://travis-ci.com/ipfs/go-cid) | [![codecov](https://codecov.io/gh/ipfs/go-cid/branch/master/graph/badge.svg?style=flat-square)](https://codecov.io/gh/ipfs/go-cid) | CID implementation |
| [`go-multiaddr`](//github.com/multiformats/go-multiaddr) | [![Travis CI](https://flat.badgen.net/travis/multiformats/go-multiaddr/master)](https://travis-ci.com/multiformats/go-multiaddr) | [![codecov](https://codecov.io/gh/multiformats/go-multiaddr/branch/master/graph/badge.svg?style=flat-square)](https://codecov.io/gh/multiformats/go-multiaddr) | multiaddr implementation |
| [`go-multihash`](//github.com/multiformats/go-multihash) | [![Travis CI](https://flat.badgen.net/travis/multiformats/go-multihash/master)](https://travis-ci.com/multiformats/go-multihash) | [![codecov](https://codecov.io/gh/multiformats/go-multihash/branch/master/graph/badge.svg?style=flat-square)](https://codecov.io/gh/multiformats/go-multihash) | multihash implementation |
| [`go-multibase`](//github.com/multiformats/go-multibase) | [![Travis CI](https://flat.badgen.net/travis/multiformats/go-multibase/master)](https://travis-ci.com/multiformats/go-multibase) | [![codecov](https://codecov.io/gh/multiformats/go-multibase/branch/master/graph/badge.svg?style=flat-square)](https://codecov.io/gh/multiformats/go-multibase) | mulitbase implementation |
| **Files** |
| [`go-unixfs`](//github.com/ipfs/go-unixfs) | [![Travis CI](https://flat.badgen.net/travis/ipfs/go-unixfs/master)](https://travis-ci.com/ipfs/go-unixfs) | [![codecov](https://codecov.io/gh/ipfs/go-unixfs/branch/master/graph/badge.svg?style=flat-square)](https://codecov.io/gh/ipfs/go-unixfs) | the core 'filesystem' logic |
| [`go-mfs`](//github.com/ipfs/go-mfs) | [![Travis CI](https://flat.badgen.net/travis/ipfs/go-mfs/master)](https://travis-ci.com/ipfs/go-mfs) | [![codecov](https://codecov.io/gh/ipfs/go-mfs/branch/master/graph/badge.svg?style=flat-square)](https://codecov.io/gh/ipfs/go-mfs) | a mutable filesystem editor for unixfs |
| [`go-ipfs-posinfo`](//github.com/ipfs/go-ipfs-posinfo) | [![Travis CI](https://flat.badgen.net/travis/ipfs/go-ipfs-posinfo/master)](https://travis-ci.com/ipfs/go-ipfs-posinfo) | [![codecov](https://codecov.io/gh/ipfs/go-ipfs-posinfo/branch/master/graph/badge.svg?style=flat-square)](https://codecov.io/gh/ipfs/go-ipfs-posinfo) | helper datatypes for the filestore |
| [`go-ipfs-chunker`](//github.com/ipfs/go-ipfs-chunker) | [![Travis CI](https://flat.badgen.net/travis/ipfs/go-ipfs-chunker/master)](https://travis-ci.com/ipfs/go-ipfs-chunker) | [![codecov](https://codecov.io/gh/ipfs/go-ipfs-chunker/branch/master/graph/badge.svg?style=flat-square)](https://codecov.io/gh/ipfs/go-ipfs-chunker) | file chunkers |
| **Exchange** |
| [`go-ipfs-exchange-interface`](//github.com/ipfs/go-ipfs-exchange-interface) | [![Travis CI](https://flat.badgen.net/travis/ipfs/go-ipfs-exchange-interface/master)](https://travis-ci.com/ipfs/go-ipfs-exchange-interface) | [![codecov](https://codecov.io/gh/ipfs/go-ipfs-exchange-interface/branch/master/graph/badge.svg?style=flat-square)](https://codecov.io/gh/ipfs/go-ipfs-exchange-interface) | exchange service interface |
| [`go-ipfs-exchange-offline`](//github.com/ipfs/go-ipfs-exchange-offline) | [![Travis CI](https://flat.badgen.net/travis/ipfs/go-ipfs-exchange-offline/master)](https://travis-ci.com/ipfs/go-ipfs-exchange-offline) | [![codecov](https://codecov.io/gh/ipfs/go-ipfs-exchange-offline/branch/master/graph/badge.svg?style=flat-square)](https://codecov.io/gh/ipfs/go-ipfs-exchange-offline) | (dummy) offline implementation of the exchange service |
| [`go-bitswap`](//github.com/ipfs/go-bitswap) | [![Travis CI](https://flat.badgen.net/travis/ipfs/go-bitswap/master)](https://travis-ci.com/ipfs/go-bitswap) | [![codecov](https://codecov.io/gh/ipfs/go-bitswap/branch/master/graph/badge.svg?style=flat-square)](https://codecov.io/gh/ipfs/go-bitswap) | bitswap protocol implementation |
| [`go-blockservice`](//github.com/ipfs/go-blockservice) | [![Travis CI](https://flat.badgen.net/travis/ipfs/go-blockservice/master)](https://travis-ci.com/ipfs/go-blockservice) | [![codecov](https://codecov.io/gh/ipfs/go-blockservice/branch/master/graph/badge.svg?style=flat-square)](https://codecov.io/gh/ipfs/go-blockservice) | service that plugs a blockstore and an exchange together |
| **Datastores** |
| [`go-datastore`](//github.com/ipfs/go-datastore) | [![Travis CI](https://flat.badgen.net/travis/ipfs/go-datastore/master)](https://travis-ci.com/ipfs/go-datastore) | [![codecov](https://codecov.io/gh/ipfs/go-datastore/branch/master/graph/badge.svg?style=flat-square)](https://codecov.io/gh/ipfs/go-datastore) | datastore interfaces, adapters, and basic implementations |
| [`go-ipfs-ds-help`](//github.com/ipfs/go-ipfs-ds-help) | [![Travis CI](https://flat.badgen.net/travis/ipfs/go-ipfs-ds-help/master)](https://travis-ci.com/ipfs/go-ipfs-ds-help) | [![codecov](https://codecov.io/gh/ipfs/go-ipfs-ds-help/branch/master/graph/badge.svg?style=flat-square)](https://codecov.io/gh/ipfs/go-ipfs-ds-help) | datastore utility functions |
| [`go-ds-flatfs`](//github.com/ipfs/go-ds-flatfs) | [![Travis CI](https://flat.badgen.net/travis/ipfs/go-ds-flatfs/master)](https://travis-ci.com/ipfs/go-ds-flatfs) | [![codecov](https://codecov.io/gh/ipfs/go-ds-flatfs/branch/master/graph/badge.svg?style=flat-square)](https://codecov.io/gh/ipfs/go-ds-flatfs) | a filesystem-based datastore |
| [`go-ds-measure`](//github.com/ipfs/go-ds-measure) | [![Travis CI](https://flat.badgen.net/travis/ipfs/go-ds-measure/master)](https://travis-ci.com/ipfs/go-ds-measure) | [![codecov](https://codecov.io/gh/ipfs/go-ds-measure/branch/master/graph/badge.svg?style=flat-square)](https://codecov.io/gh/ipfs/go-ds-measure) | a metric-collecting database adapter |
| [`go-ds-leveldb`](//github.com/ipfs/go-ds-leveldb) | [![Travis CI](https://flat.badgen.net/travis/ipfs/go-ds-leveldb/master)](https://travis-ci.com/ipfs/go-ds-leveldb) | [![codecov](https://codecov.io/gh/ipfs/go-ds-leveldb/branch/master/graph/badge.svg?style=flat-square)](https://codecov.io/gh/ipfs/go-ds-leveldb) | a leveldb based datastore |
| [`go-ds-badger`](//github.com/ipfs/go-ds-badger) | [![Travis CI](https://flat.badgen.net/travis/ipfs/go-ds-badger/master)](https://travis-ci.com/ipfs/go-ds-badger) | [![codecov](https://codecov.io/gh/ipfs/go-ds-badger/branch/master/graph/badge.svg?style=flat-square)](https://codecov.io/gh/ipfs/go-ds-badger) | a badgerdb based datastore |
| **Namesys** |
| [`go-ipns`](//github.com/ipfs/go-ipns) | [![Travis CI](https://flat.badgen.net/travis/ipfs/go-ipns/master)](https://travis-ci.com/ipfs/go-ipns) | [![codecov](https://codecov.io/gh/ipfs/go-ipns/branch/master/graph/badge.svg?style=flat-square)](https://codecov.io/gh/ipfs/go-ipns) | IPNS datastructures and validation logic |
| **Repo** |
| [`go-fs-lock`](//github.com/ipfs/go-fs-lock) | [![Travis CI](https://flat.badgen.net/travis/ipfs/go-fs-lock/master)](https://travis-ci.com/ipfs/go-fs-lock) | [![codecov](https://codecov.io/gh/ipfs/go-fs-lock/branch/master/graph/badge.svg?style=flat-square)](https://codecov.io/gh/ipfs/go-fs-lock) | lockfile management functions |
| [`fs-repo-migrations`](//github.com/ipfs/fs-repo-migrations) | [![Travis CI](https://flat.badgen.net/travis/ipfs/fs-repo-migrations/master)](https://travis-ci.com/ipfs/fs-repo-migrations) | [![codecov](https://codecov.io/gh/ipfs/fs-repo-migrations/branch/master/graph/badge.svg?style=flat-square)](https://codecov.io/gh/ipfs/fs-repo-migrations) | repo migrations |
| **IPLD** |
| [`go-block-format`](//github.com/ipfs/go-block-format) | [![Travis CI](https://flat.badgen.net/travis/ipfs/go-block-format/master)](https://travis-ci.com/ipfs/go-block-format) | [![codecov](https://codecov.io/gh/ipfs/go-block-format/branch/master/graph/badge.svg?style=flat-square)](https://codecov.io/gh/ipfs/go-block-format) | block interfaces and implementations |
| [`go-ipfs-blockstore`](//github.com/ipfs/go-ipfs-blockstore) | [![Travis CI](https://flat.badgen.net/travis/ipfs/go-ipfs-blockstore/master)](https://travis-ci.com/ipfs/go-ipfs-blockstore) | [![codecov](https://codecov.io/gh/ipfs/go-ipfs-blockstore/branch/master/graph/badge.svg?style=flat-square)](https://codecov.io/gh/ipfs/go-ipfs-blockstore) | blockstore interfaces and implementations |
| [`go-ipld-format`](//github.com/ipfs/go-ipld-format) | [![Travis CI](https://flat.badgen.net/travis/ipfs/go-ipld-format/master)](https://travis-ci.com/ipfs/go-ipld-format) | [![codecov](https://codecov.io/gh/ipfs/go-ipld-format/branch/master/graph/badge.svg?style=flat-square)](https://codecov.io/gh/ipfs/go-ipld-format) | IPLD interfaces |
| [`go-ipld-cbor`](//github.com/ipfs/go-ipld-cbor) | [![Travis CI](https://flat.badgen.net/travis/ipfs/go-ipld-cbor/master)](https://travis-ci.com/ipfs/go-ipld-cbor) | [![codecov](https://codecov.io/gh/ipfs/go-ipld-cbor/branch/master/graph/badge.svg?style=flat-square)](https://codecov.io/gh/ipfs/go-ipld-cbor) | IPLD-CBOR implementation |
| [`go-ipld-git`](//github.com/ipfs/go-ipld-git) | [![Travis CI](https://flat.badgen.net/travis/ipfs/go-ipld-git/master)](https://travis-ci.com/ipfs/go-ipld-git) | [![codecov](https://codecov.io/gh/ipfs/go-ipld-git/branch/master/graph/badge.svg?style=flat-square)](https://codecov.io/gh/ipfs/go-ipld-git) | IPLD-Git implementation |
| [`go-merkledag`](//github.com/ipfs/go-merkledag) | [![Travis CI](https://flat.badgen.net/travis/ipfs/go-merkledag/master)](https://travis-ci.com/ipfs/go-merkledag) | [![codecov](https://codecov.io/gh/ipfs/go-merkledag/branch/master/graph/badge.svg?style=flat-square)](https://codecov.io/gh/ipfs/go-merkledag) | IPLD-Merkledag implementation (and then some) |
| **Commands** |
| [`go-ipfs-cmds`](//github.com/ipfs/go-ipfs-cmds) | [![Travis CI](https://flat.badgen.net/travis/ipfs/go-ipfs-cmds/master)](https://travis-ci.com/ipfs/go-ipfs-cmds) | [![codecov](https://codecov.io/gh/ipfs/go-ipfs-cmds/branch/master/graph/badge.svg?style=flat-square)](https://codecov.io/gh/ipfs/go-ipfs-cmds) | CLI & HTTP commands library |
| [`go-ipfs-files`](//github.com/ipfs/go-ipfs-files) | [![Travis CI](https://flat.badgen.net/travis/ipfs/go-ipfs-files/master)](https://travis-ci.com/ipfs/go-ipfs-files) | [![codecov](https://codecov.io/gh/ipfs/go-ipfs-files/branch/master/graph/badge.svg?style=flat-square)](https://codecov.io/gh/ipfs/go-ipfs-files) | CLI & HTTP commands library |
| [`go-ipfs-api`](//github.com/ipfs/go-ipfs-api) | [![Travis CI](https://flat.badgen.net/travis/ipfs/go-ipfs-api/master)](https://travis-ci.com/ipfs/go-ipfs-api) | [![codecov](https://codecov.io/gh/ipfs/go-ipfs-api/branch/master/graph/badge.svg?style=flat-square)](https://codecov.io/gh/ipfs/go-ipfs-api) | an old, stable shell for the IPFS HTTP API |
| [`go-ipfs-http-client`](//github.com/ipfs/go-ipfs-http-client) | [![Travis CI](https://flat.badgen.net/travis/ipfs/go-ipfs-http-client/master)](https://travis-ci.com/ipfs/go-ipfs-http-client) | [![codecov](https://codecov.io/gh/ipfs/go-ipfs-http-client/branch/master/graph/badge.svg?style=flat-square)](https://codecov.io/gh/ipfs/go-ipfs-http-client) | a new, unstable shell for the IPFS HTTP API |
| [`interface-go-ipfs-core`](//github.com/ipfs/interface-go-ipfs-core) | [![Travis CI](https://flat.badgen.net/travis/ipfs/interface-go-ipfs-core/master)](https://travis-ci.com/ipfs/interface-go-ipfs-core) | [![codecov](https://codecov.io/gh/ipfs/interface-go-ipfs-core/branch/master/graph/badge.svg?style=flat-square)](https://codecov.io/gh/ipfs/interface-go-ipfs-core) | core go-ipfs API interface definitions |
| **Metrics & Logging** |
| [`go-metrics-interface`](//github.com/ipfs/go-metrics-interface) | [![Travis CI](https://flat.badgen.net/travis/ipfs/go-metrics-interface/master)](https://travis-ci.com/ipfs/go-metrics-interface) | [![codecov](https://codecov.io/gh/ipfs/go-metrics-interface/branch/master/graph/badge.svg?style=flat-square)](https://codecov.io/gh/ipfs/go-metrics-interface) | metrics collection interfaces |
| [`go-metrics-prometheus`](//github.com/ipfs/go-metrics-prometheus) | [![Travis CI](https://flat.badgen.net/travis/ipfs/go-metrics-prometheus/master)](https://travis-ci.com/ipfs/go-metrics-prometheus) | [![codecov](https://codecov.io/gh/ipfs/go-metrics-prometheus/branch/master/graph/badge.svg?style=flat-square)](https://codecov.io/gh/ipfs/go-metrics-prometheus) | prometheus-backed metrics collector |
| [`go-log`](//github.com/ipfs/go-log) | [![Travis CI](https://flat.badgen.net/travis/ipfs/go-log/master)](https://travis-ci.com/ipfs/go-log) | [![codecov](https://codecov.io/gh/ipfs/go-log/branch/master/graph/badge.svg?style=flat-square)](https://codecov.io/gh/ipfs/go-log) | logging framework |
| **Generics/Utils** |
| [`go-ipfs-routing`](//github.com/ipfs/go-ipfs-routing) | [![Travis CI](https://flat.badgen.net/travis/ipfs/go-ipfs-routing/master)](https://travis-ci.com/ipfs/go-ipfs-routing) | [![codecov](https://codecov.io/gh/ipfs/go-ipfs-routing/branch/master/graph/badge.svg?style=flat-square)](https://codecov.io/gh/ipfs/go-ipfs-routing) | routing (content, peer, value) helpers |
| [`go-ipfs-util`](//github.com/ipfs/go-ipfs-util) | [![Travis CI](https://flat.badgen.net/travis/ipfs/go-ipfs-util/master)](https://travis-ci.com/ipfs/go-ipfs-util) | [![codecov](https://codecov.io/gh/ipfs/go-ipfs-util/branch/master/graph/badge.svg?style=flat-square)](https://codecov.io/gh/ipfs/go-ipfs-util) | the kitchen sink |
| [`go-ipfs-addr`](//github.com/ipfs/go-ipfs-addr) | [![Travis CI](https://flat.badgen.net/travis/ipfs/go-ipfs-addr/master)](https://travis-ci.com/ipfs/go-ipfs-addr) | [![codecov](https://codecov.io/gh/ipfs/go-ipfs-addr/branch/master/graph/badge.svg?style=flat-square)](https://codecov.io/gh/ipfs/go-ipfs-addr) | utility functions for parsing IPFS multiaddrs |

## Hands-on examples

There are use-case examples in the [`ipfs/kubo` GitHub repository](https://github.com/ipfs/go-ipfs). They're all self-contained projects that let your spin up and test environments quickly. [Check them out →](https://github.com/ipfs/kubo/tree/master/docs/examples).

A good starting place is the [Use kubo as a library to spawn a node and add a file](https://github.com/ipfs/kubo/blob/master/docs/examples/go-ipfs-as-a-library/README.md).
