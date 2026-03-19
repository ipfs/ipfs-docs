---
title: Reference
description: Reference materials for IPFS tools and implementations
---

# Reference

Developer and operator references for IPFS tools, APIs, and implementations.

New to IPFS? Start with the [Glossary](../concepts/glossary.md) to learn key terms and concepts.

## Diagnostic tools

Web-based [diagnostic tools](diagnostic-tools.md) for debugging, troubleshooting, and inspecting IPFS data. Includes DAG Explorer, IPFS Check, CID Inspector, and more.

## HTTP Gateway

The [HTTP Gateway API](http/gateway.md) provides an implementation-agnostic HTTP interface for retrieving [content-addressed](../concepts/glossary.md#content-addressing) data from IPFS with regular HTTP clients and libraries. Use it for building applications that are not tied to a specific IPFS implementation. See also the [HTTP Gateway specifications](https://specs.ipfs.tech/http-gateways/).

## IPFS in JavaScript

[Developer resources for working with IPFS in JavaScript](js/api.md), including Helia, `@helia/verified-fetch`, and `js-kubo-rpc-client`.

## IPFS in Go

[Developer resources for working with IPFS in Go](go/api.md):

- [Boxo](https://github.com/ipfs/boxo): Go SDK with reusable building blocks for composing custom IPFS implementations
- [Kubo RPC client](https://pkg.go.dev/github.com/ipfs/kubo/client/rpc): talk to a Kubo node over its `/api/v0` HTTP RPC endpoint

## Kubo

[Kubo](https://github.com/ipfs/kubo) is the earliest and most widely used IPFS implementation, written in Go.

- [CLI reference](kubo/cli.md): command-line interface
- [RPC API reference](kubo/rpc.md): control your node over HTTP
- [RPC API clients](kubo-rpc-cli.md): client libraries in Go, JavaScript, Python, Java, and other languages

## IPFS Specifications

- [HTTP Gateway specifications](https://specs.ipfs.tech/http-gateways/)
- [All IPFS specifications](https://specs.ipfs.tech/)
