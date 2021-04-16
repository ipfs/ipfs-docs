---
title: Go-IPFS
legacyUrl: https://docs.ipfs.io/reference/go/overview/
description: Developer resources for working in Go with IPFS, the InterPlanetary File System.
---

# Go-IPFS

## Working with Go

Go-IPFS is the primary reference implementation of IPFS. It is a command-line application, but can also be used as a library in other Go programs.

For more about using Go-IPFS, see any of the following reference documents:

- [Configuration reference](https://github.com/ipfs/go-ipfs/blob/master/docs/config.md)
  - [Datastore configuration](https://github.com/ipfs/go-ipfs/blob/master/docs/datastores.md)
  - [Experimental features](https://github.com/ipfs/go-ipfs/blob/master/docs/experimental-features.md)
- [Installing command completion](https://github.com/ipfs/go-ipfs/blob/master/docs/command-completion.md)
- [Mounting IPFS with FUSE](https://github.com/ipfs/go-ipfs/blob/master/docs/fuse.md)
- [Installing plugins](https://github.com/ipfs/go-ipfs/blob/master/docs/plugins.md)

For more technical information about building, debugging or using the API, see:

- [Performance Debugging Guidelines](https://github.com/ipfs/go-ipfs/blob/master/docs/debug-guide.md)
- [IPFS API Implementation](https://github.com/ipfs/go-ipfs/blob/master/docs/implement-api-bindings.md)
- [Connecting with Websockets](https://github.com/ipfs/go-ipfs/blob/master/docs/transports.md)
- Building on [Windows](https://github.com/ipfs/go-ipfs/blob/master/docs/windows.md)
- [Additional guides](https://github.com/ipfs/go-ipfs/blob/master/docs/)

If you plan to use Go-IPFS as a package in your own Go application, you can take any of three main approaches:

- Use [Go-IPFS](https://github.com/ipfs/go-ipfs) to run IPFS directly in your own process.
- Use [Go-IPFS](https://github.com/ipfs/go-ipfs-http-client) to communicate with an IPFS daemon in a separate process via its HTTP API (this is what Go-IPFS does if a daemon is already running).
- Use other Go packages to communicate with the HTTP API directly. See the [HTTP API reference](/reference/http/api/).

## Go CoreAPI

[CoreAPI interfaces](https://godoc.org/github.com/ipfs/interface-go-ipfs-core) for go-ipfs. Package iface defines IPFS Core API, which is a set of interfaces used to interact with IPFS nodes.

## Go embedded client

[Package coreapi](https://godoc.org/github.com/ipfs/go-ipfs/core/coreapi) provides direct access to the core commands in IPFS. If you are embedding IPFS directly in your Go program, this package is the public interface you should use to read and write files or otherwise control IPFS. **This package is experimental and subject to change.**

If you are running IPFS as a separate process, you should use `go-ipfs-api` to work with it via HTTP. As we finalize the interfaces in this embedded client, `go-ipfs-api` will transparently adopt them so you can use the same code with either package.

## Go HTTP clients

[CoreAPI implementation using HTTP API](https://godoc.org/github.com/ipfs/go-ipfs-http-client). **This package is experimental and subject to change.** For an old but stable Go HTTP client, use [CoreAPI interfaces](https://godoc.org/github.com/ipfs/interface-go-ipfs-core).

## Hands-on examples

There are use-case examples in the [`ipfs/go-ipfs` GitHub repository](https://github.com/ipfs/go-ipfs). They're all self-contained projects that let your spin up and test environments quickly. [Check them out →](https://github.com/ipfs/go-ipfs/tree/master/docs/examples).

A good starting place is the [Use go-ipfs as a library to spawn a node and add a file](https://github.com/ipfs/go-ipfs/blob/master/docs/examples/go-ipfs-as-a-library/README.md).
