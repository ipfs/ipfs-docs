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

### Kubo (go-ipfs)

Kubo is the earliest and most widely used implementation of IPFS, written in Go.

Use it as:

- **CLI tool**
  Working in the terminal? Here's where you'll find [Kubo's command-line interface (CLI) reference](kubo/cli.md).

- **HTTP RPC endpoint**
  [RPC API v0 reference for Kubo](kubo/rpc.md) — control your node over HTTP using the same commands you can from the command line!

- **Go library**
  See [Go API reference for Kubo](go/api.md), including the Go CoreAPI, the Go embedded client, and a Go client for interacting with Kubo over HTTP RPC API.


### JavaScript (js-ipfs)

:::warning 
### js-ipfs being discontinued
Development of the [js-ipfs project](https://github.com/ipfs/js-ipfs) is being discontinued to focus on [Helia](https://github.com/ipfs/helia), a leaner, more modular, modern implementation of IPFS in JavaScript scheduled for release in 2023. To learn more about Helia and the current state of IPFS in JS, see the [blog post](https://blog.ipfs.tech/state-of-ipfs-in-js/). 

Because of this, js-ipfs tutorials may be out of date, and will eventually be archived.

:::

[API resources for js-ipfs](js/api.md), including the JS core API reference and the JS HTTP client library.

Explore the Mutable File System, Regular Files API, and DAG API through ProtoSchool's [coding challenges](https://proto.school/course/ipfs).