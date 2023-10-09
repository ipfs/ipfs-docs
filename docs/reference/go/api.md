---
title: Advanced Kubo Usage
description: Developer resources for working in Go with IPFS, the InterPlanetary File System.
---

# Advanced Kubo Usage

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
- Use [kubo RPC client](https://pkg.go.dev/github.com/ipfs/kubo/client/rpc) to communicate with a Kubo IPFS daemon in a separate process via its HTTP RPC API (this is what Kubo does if a daemon is already running).
- Use other Go packages to communicate with the HTTP RPC API directly. See the [RPC API reference](../../reference/kubo/rpc.md).

## Go Embedded Client

[Package `coreapi`](https://godoc.org/github.com/ipfs/kubo/core/coreapi) provides direct access to the core commands in IPFS. If you are embedding IPFS directly in your Go program, this package is the public interface you should use to read and write files or otherwise control IPFS. **This package is experimental and subject to change.**

If you are running Kubo as a separate process, you should use the [Kubo RPC Client](https://pkg.go.dev/github.com/ipfs/kubo/client/rpc) to work with it via RPC.

## Packages

Listing of the main go packages in the IPFS ecosystem:

| Name                                                                         | Go Reference                                                                                                                                              | Coverage                                                                                                                                                                   | Description                                               |
| ---------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| **Libp2p**                                                                   |
| [`go-libp2p`](//github.com/libp2p/go-libp2p)                                 | [![Go Reference](https://pkg.go.dev/badge/github.com/libp2p/go-libp2p.svg)](https://pkg.go.dev/github.com/libp2p/go-libp2p)                               | [![codecov](https://codecov.io/gh/libp2p/go-libp2p/branch/master/graph/badge.svg?style=flat-square)](https://codecov.io/gh/libp2p/go-libp2p)                               | p2p networking library                                    |
| [`go-libp2p-pubsub`](//github.com/libp2p/go-libp2p-pubsub)                   | [![Go Reference](https://pkg.go.dev/badge/github.com/libp2p/go-libp2p-pubsub.svg)](https://pkg.go.dev/github.com/libp2p/go-libp2p-pubsub)                 | [![codecov](https://codecov.io/gh/libp2p/go-libp2p-pubsub/branch/master/graph/badge.svg?style=flat-square)](https://codecov.io/gh/libp2p/go-libp2p-pubsub)                 | pubsub built on libp2p                                    |
| [`go-libp2p-kad-dht`](//github.com/libp2p/go-libp2p-kad-dht)                 | [![Go Reference](https://pkg.go.dev/badge/github.com/libp2p/go-libp2p-kad-dht.svg)](https://pkg.go.dev/github.com/libp2p/go-libp2p-kad-dht)               | [![codecov](https://codecov.io/gh/libp2p/go-libp2p-kad-dht/branch/master/graph/badge.svg?style=flat-square)](https://codecov.io/gh/libp2p/go-libp2p-kad-dht)               | dht-backed router                                         |
| [`go-libp2p-pubsub-router`](//github.com/libp2p/go-libp2p-pubsub-router)     | [![Go Reference](https://pkg.go.dev/badge/github.com/libp2p/go-libp2p-pubsub-router.svg)](https://pkg.go.dev/github.com/libp2p/go-libp2p-pubsub-router)   | [![codecov](https://codecov.io/gh/libp2p/go-libp2p-pubsub-router/branch/master/graph/badge.svg?style=flat-square)](https://codecov.io/gh/libp2p/go-libp2p-pubsub-router)   | pubsub-backed router                                      |
| **IPFS**                                                                   |
| [`boxo`](//github.com/ipfs/boxo)     | [![Go Reference](https://pkg.go.dev/badge/github.com/ipfs/boxo.svg)](https://pkg.go.dev/github.com/ipfs/boxo)   | [![codecov](https://codecov.io/gh/ipfs/boxo/branch/main/graph/badge.svg?style=flat-square)](https://codecov.io/gh/ipfs/boxo) | libraries for building IPFS applications and implementations                             |
| **Multiformats**                                                             |
| [`go-cid`](//github.com/ipfs/go-cid)                                         | [![Go Reference](https://pkg.go.dev/badge/github.com/ipfs/go-cid.svg)](https://pkg.go.dev/github.com/ipfs/go-cid)                                         | [![codecov](https://codecov.io/gh/ipfs/go-cid/branch/master/graph/badge.svg?style=flat-square)](https://codecov.io/gh/ipfs/go-cid)                                         | CID implementation                                        |
| [`go-multiaddr`](//github.com/multiformats/go-multiaddr)                     | [![Go Reference](https://pkg.go.dev/badge/github.com/multiformats/go-multiaddr.svg)](https://pkg.go.dev/github.com/multiformats/go-multiaddr)             | [![codecov](https://codecov.io/gh/multiformats/go-multiaddr/branch/master/graph/badge.svg?style=flat-square)](https://codecov.io/gh/multiformats/go-multiaddr)             | multiaddr implementation                                  |
| [`go-multihash`](//github.com/multiformats/go-multihash)                     | [![Go Reference](https://pkg.go.dev/badge/github.com/multiformats/go-multihash.svg)](https://pkg.go.dev/github.com/multiformats/go-multihash)             | [![codecov](https://codecov.io/gh/multiformats/go-multihash/branch/master/graph/badge.svg?style=flat-square)](https://codecov.io/gh/multiformats/go-multihash)             | multihash implementation                                  |
| [`go-multibase`](//github.com/multiformats/go-multibase)                     | [![Go Reference](https://pkg.go.dev/badge/github.com/multiformats/go-multibase.svg)](https://pkg.go.dev/github.com/multiformats/go-multibase)             | [![codecov](https://codecov.io/gh/multiformats/go-multibase/branch/master/graph/badge.svg?style=flat-square)](https://codecov.io/gh/multiformats/go-multibase)             | mulitbase implementation                                  |
| **Datastores**                                                               |
| [`go-datastore`](//github.com/ipfs/go-datastore)                             | [![Go Reference](https://pkg.go.dev/badge/github.com/ipfs/go-datastore.svg)](https://pkg.go.dev/github.com/ipfs/go-datastore)                             | [![codecov](https://codecov.io/gh/ipfs/go-datastore/branch/master/graph/badge.svg?style=flat-square)](https://codecov.io/gh/ipfs/go-datastore)                             | datastore interfaces, adapters, and basic implementations |
| [`go-ds-flatfs`](//github.com/ipfs/go-ds-flatfs)                             | [![Go Reference](https://pkg.go.dev/badge/github.com/ipfs/go-ds-flatfs.svg)](https://pkg.go.dev/github.com/ipfs/go-ds-flatfs)                             | [![codecov](https://codecov.io/gh/ipfs/go-ds-flatfs/branch/master/graph/badge.svg?style=flat-square)](https://codecov.io/gh/ipfs/go-ds-flatfs)                             | a filesystem-based datastore                              |
| [`go-ds-measure`](//github.com/ipfs/go-ds-measure)                           | [![Go Reference](https://pkg.go.dev/badge/github.com/ipfs/go-ds-measure.svg)](https://pkg.go.dev/github.com/ipfs/go-ds-measure)                           | [![codecov](https://codecov.io/gh/ipfs/go-ds-measure/branch/master/graph/badge.svg?style=flat-square)](https://codecov.io/gh/ipfs/go-ds-measure)                           | a metric-collecting database adapter                      |
| [`go-ds-leveldb`](//github.com/ipfs/go-ds-leveldb)                           | [![Go Reference](https://pkg.go.dev/badge/github.com/ipfs/go-ds-leveldb.svg)](https://pkg.go.dev/github.com/ipfs/go-ds-leveldb)                           | [![codecov](https://codecov.io/gh/ipfs/go-ds-leveldb/branch/master/graph/badge.svg?style=flat-square)](https://codecov.io/gh/ipfs/go-ds-leveldb)                           | a leveldb based datastore                                 |
| [`go-ds-badger`](//github.com/ipfs/go-ds-badger)                             | [![Go Reference](https://pkg.go.dev/badge/github.com/ipfs/go-ds-badger.svg)](https://pkg.go.dev/github.com/ipfs/go-ds-badger)                             | [![codecov](https://codecov.io/gh/ipfs/go-ds-badger/branch/master/graph/badge.svg?style=flat-square)](https://codecov.io/gh/ipfs/go-ds-badger)                             | a badgerdb based datastore                                |
| **Repo**                                                                     |
| [`go-fs-lock`](//github.com/ipfs/go-fs-lock)                                 | [![Go Reference](https://pkg.go.dev/badge/github.com/ipfs/go-fs-lock.svg)](https://pkg.go.dev/github.com/ipfs/go-fs-lock)                                 | [![codecov](https://codecov.io/gh/ipfs/go-fs-lock/branch/master/graph/badge.svg?style=flat-square)](https://codecov.io/gh/ipfs/go-fs-lock)                                 | lockfile management functions                             |
| [`fs-repo-migrations`](//github.com/ipfs/fs-repo-migrations)                 | [![Go Reference](https://pkg.go.dev/badge/github.com/ipfs/fs-repo-migrations.svg)](https://pkg.go.dev/github.com/ipfs/fs-repo-migrations)                 | [![codecov](https://codecov.io/gh/ipfs/fs-repo-migrations/branch/master/graph/badge.svg?style=flat-square)](https://codecov.io/gh/ipfs/fs-repo-migrations)                 | repo migrations                                           |
| **IPLD**                                                                     |
| [`go-block-format`](//github.com/ipfs/go-block-format)                       | [![Go Reference](https://pkg.go.dev/badge/github.com/ipfs/go-block-format.svg)](https://pkg.go.dev/github.com/ipfs/go-block-format)                       | [![codecov](https://codecov.io/gh/ipfs/**go**-block-format/branch/master/graph/badge.svg?style=flat-square)](https://codecov.io/gh/ipfs/go-block-format)                   | block interfaces and implementations                      |
| [`go-ipld-format`](//github.com/ipfs/go-ipld-format)                         | [![Go Reference](https://pkg.go.dev/badge/github.com/ipfs/go-ipld-format.svg)](https://pkg.go.dev/github.com/ipfs/go-ipld-format)                         | [![codecov](https://codecov.io/gh/ipfs/go-ipld-format/branch/master/graph/badge.svg?style=flat-square)](https://codecov.io/gh/ipfs/go-ipld-format)                         | IPLD interfaces                                           |
| [`go-ipld-cbor`](//github.com/ipfs/go-ipld-cbor)                             | [![Go Reference](https://pkg.go.dev/badge/github.com/ipfs/go-ipld-cbor.svg)](https://pkg.go.dev/github.com/ipfs/go-ipld-cbor)                             | [![codecov](https://codecov.io/gh/ipfs/go-ipld-cbor/branch/master/graph/badge.svg?style=flat-square)](https://codecov.io/gh/ipfs/go-ipld-cbor)                             | IPLD-CBOR implementation                                  |
| [`go-ipld-git`](//github.com/ipfs/go-ipld-git)                               | [![Go Reference](https://pkg.go.dev/badge/github.com/ipfs/go-ipld-git.svg)](https://pkg.go.dev/github.com/ipfs/go-ipld-git)                               | [![codecov](https://codecov.io/gh/ipfs/go-ipld-git/branch/master/graph/badge.svg?style=flat-square)](https://codecov.io/gh/ipfs/go-ipld-git)                               | IPLD-Git implementation                                   |
| [`go-merkledag`](//github.com/ipfs/go-merkledag)                             | [![Go Reference](https://pkg.go.dev/badge/github.com/ipfs/go-merkledag.svg)](https://pkg.go.dev/github.com/ipfs/go-merkledag)                             | [![codecov](https://codecov.io/gh/ipfs/go-merkledag/branch/master/graph/badge.svg?style=flat-square)](https://codecov.io/gh/ipfs/go-merkledag)                             | IPLD-Merkledag implementation (and then some)             |
| **Commands**                                                                 |
| [`go-ipfs-cmds`](//github.com/ipfs/go-ipfs-cmds)                             | [![Go Reference](https://pkg.go.dev/badge/github.com/ipfs/go-ipfs-cmds.svg)](https://pkg.go.dev/github.com/ipfs/go-ipfs-cmds)                             | [![codecov](https://codecov.io/gh/ipfs/go-ipfs-cmds/branch/master/graph/badge.svg?style=flat-square)](https://codecov.io/gh/ipfs/go-ipfs-cmds)                             | CLI & HTTP commands library                               |
| **Metrics & Logging**                                                        |
| [`go-metrics-interface`](//github.com/ipfs/go-metrics-interface)             | [![Go Reference](https://pkg.go.dev/badge/github.com/ipfs/go-metrics-interface.svg)](https://pkg.go.dev/github.com/ipfs/go-metrics-interface)             | [![codecov](https://codecov.io/gh/ipfs/go-metrics-interface/branch/master/graph/badge.svg?style=flat-square)](https://codecov.io/gh/ipfs/go-metrics-interface)             | metrics collection interfaces                             |
| [`go-metrics-prometheus`](//github.com/ipfs/go-metrics-prometheus)           | [![Go Reference](https://pkg.go.dev/badge/github.com/ipfs/go-metrics-prometheus.svg)](https://pkg.go.dev/github.com/ipfs/go-metrics-prometheus)           | [![codecov](https://codecov.io/gh/ipfs/go-metrics-prometheus/branch/master/graph/badge.svg?style=flat-square)](https://codecov.io/gh/ipfs/go-metrics-prometheus)           | prometheus-backed metrics collector                       |
| [`go-log`](//github.com/ipfs/go-log)                                         | [![Go Reference](https://pkg.go.dev/badge/github.com/ipfs/go-log.svg)](https://pkg.go.dev/github.com/ipfs/go-log)                                         | [![codecov](https://codecov.io/gh/ipfs/go-log/branch/master/graph/badge.svg?style=flat-square)](https://codecov.io/gh/ipfs/go-log)                                         | logging framework                                         |

## Hands-on examples

There are use-case examples in the [`ipfs/kubo` GitHub repository](https://github.com/ipfs/kubo). They're all self-contained projects that let your spin up and test environments quickly. [Check them out →](https://github.com/ipfs/kubo/tree/master/docs/examples).

A good starting place is the [Use kubo as a library to spawn a node and add a file](https://github.com/ipfs/kubo/tree/master/docs/examples/kubo-as-a-library).
