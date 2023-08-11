---
title: Reference
description: Reference materials for IPFS tools and implementations
---

# API & CLI reference

Looking for user and developer references for IPFS? Find them here.

## HTTP Gateway

The [Gateway API](http/gateway.md) provides implementation-agnostic HTTP interface for retrieving [content-addressed](../concepts/glossary.md#content-addressing) data from IPFS with regular HTTP clients and libraries. Use it for future-proofing your applications.

## Custom APIs

Implementation and language specific interfaces can be used when [HTTP Gateway API](http/gateway.md) is not enough, or you need additional flexibility.

### Kubo 

Kubo is the earliest and most widely used implementation of IPFS, written in Go.

Use it as:

- **CLI tool**
  Working in the terminal? Here's where you'll find [Kubo's command-line interface (CLI) reference](kubo/cli.md).

- **HTTP RPC endpoint**
  [RPC API v0 reference for Kubo](kubo/rpc.md) — control your node over HTTP using the same commands you can from the command line!

- **Go library**
  See [Go API reference for Kubo](go/api.md), including the Go CoreAPI, the Go embedded client, and a Go client for interacting with Kubo over HTTP RPC API.


### Helia 

Helia is the next generation IPFS JavaScript implementation that applies lessons learned from [js-ipfs](https://github.com/ipfs/js-ipfs) to create a more modern, modular, and efficient codebase. 

Learn more about Helia in the [official GitHub repository](https://github.com/ipfs/helia). If you'd like to quickly get started developing with Helia, see the [Helia examples repository](https://github.com/ipfs-examples/helia-examples).

:::warning 
### js-ipfs project discontinued
Development of the [js-ipfs project](https://github.com/ipfs/js-ipfs) has been discontinued in favor of [Helia](https://github.com/ipfs/helia). 

Because of this, js-ipfs content may be out of date, and will eventually be archived.

:::