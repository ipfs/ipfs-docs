---
title: go-ipfs API
---

# API resources: go-ipfs

::: warning
This draft content ported from the legacy docs site may contain broken links and other errors. (Please remove this alert once content has been reviewed.)
:::

## Working with go-IPFS

`go-ipfs` is the primary reference implementation of IPFS. It is a command-line application, but can also be used as a library in other Go programs.

For more about using `go-ipfs`, see any of the following reference documents:

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
- Building on…
  - [Windows](https://github.com/ipfs/go-ipfs/blob/master/docs/windows.md)
- Additional guides at: https://github.com/ipfs/go-ipfs/blob/master/docs/

If you plan to use `go-ipfs` as a package in your own Go application, you can take any of three main approaches:

- Use **[`go-ipfs`](https://github.com/ipfs/go-ipfs)** to run IPFS directly in your own process. See the [CoreAPI constructor](/go/pkg/go-ipfs/core/coreapi).
- Use **[`go-ipfs-htp-client`](https://github.com/ipfs/go-ipfs-http-client)** to communicate with an IPFS daemon in a separate process via its HTTP API (this is what `go-ipfs` does if a daemon is already running). See the [http client](/go/pkg/go-ipfs-http-client).
- Use other Go packages to communicate with the HTTP API directly. See the [HTTP API reference](/api/http).

## Go CoreAPI

The [CoreAPI interfaces](https://godoc.org/github.com/ipfs/interface-go-ipfs-core) for go-ipfs.

## Go HTTP Client (experimental)

The go-ipfs [CoreAPI implementation using HTTP API](https://godoc.org/github.com/ipfs/go-ipfs-http-client). This package is experimental and subject to change.

## Go embedded client (experimental)

[Package coreapi](https://godoc.org/github.com/ipfs/go-ipfs/core/coreapi) provides direct access to the core commands in IPFS. If you are embedding IPFS directly in your Go program, this package is the public interface you should use to read and write files or otherwise control IPFS.

If you are running IPFS as a separate process, you should use `go-ipfs-api` to work with it via HTTP. As we finalize the interfaces here, `go-ipfs-api` will transparently adopt them so you can use the same code with either package.

**NOTE: this package is experimental.** `go-ipfs` has mainly been developed as a standalone application and library-style use of this package is still new. Interfaces here aren't yet completely stable.

## Go HTTP client (old but stable)

[Package iface](https://godoc.org/github.com/ipfs/interface-go-ipfs-core) defines IPFS Core API, which is a set of interfaces used to interact with IPFS nodes.
