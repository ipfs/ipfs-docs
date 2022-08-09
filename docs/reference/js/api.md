---
title: IPFS in JS
description: Developer resources for working in JavaScript with IPFS, the InterPlanetary File System.
---

# IPFS in JavaScript

## JavaScript libraries

There are two main JavaScript libraries for working with IPFS. Both work in Node.js and modern web browsers.
The implementation is split into several modules. 

::: details Node modules

* [`/packages/interface-ipfs-core`](./packages/interface-ipfs-core) Tests to ensure adherence of an implementation to the spec
* [`/packages/ipfs`](./packages/ipfs) An aggregator module that bundles the core implementation, the CLI, HTTP API server and daemon
* [`/packages/ipfs-cli`](./packages/ipfs-cli) A CLI to the core implementation
* [`/packages/ipfs-core`](./packages/ipfs-core) The core implementation
* [`/packages/ipfs-core-types`](./packages/ipfs-core-types) Typescript definitions for the core API
* [`/packages/ipfs-core-utils`](./packages/ipfs-core-utils) Helpers and utilities common to core and the HTTP RPC API client
* [`/packages/ipfs-daemon`](./packages/ipfs-daemon) Run js-IPFS as a background daemon
* [`/packages/ipfs-grpc-client`](./packages/ipfs-grpc-client) A gRPC client for js-IPFS
* [`/packages/ipfs-grpc-protocol`](./packages/ipfs-grpc-protocol) Shared module between the gRPC client and server
* [`/packages/ipfs-grpc-server`](./packages/ipfs-grpc-server) A gRPC-over-websockets server for js-IPFS
* [`/packages/ipfs-http-client`](./packages/ipfs-http-client) A client for the RPC-over-HTTP API presented by both js-ipfs and go-ipfs
* [`/packages/ipfs-http-server`](./packages/ipfs-http-server) JS implementation of the [Kubo RPC HTTP API](https://docs.ipfs.io/reference/kubo/rpc/)
* [`/packages/ipfs-http-gateway`](./packages/ipfs-http-gateway) JS implementation of the [IPFS HTTP Gateway](https://docs.ipfs.io/concepts/ipfs-gateway/)
* [`/packages/ipfs-http-response`](./packages/ipfs-http-response) Creates a HTTP response for a given IPFS Path
* [`/packages/ipfs-message-port-client`](./packages/ipfs-message-port-client) A client for the RPC-over-message-port API presented by js-ipfs running in a shared worker
* [`/packages/ipfs-message-port-protocol`](./packages/ipfs-message-port-protocol) Code shared by the message port client & server
* [`/packages/ipfs-message-port-server`](./packages/ipfs-message-port-server) The server that receives requests from ipfs-message-port-client

:::

### JS-IPFS

[JS-IPFS](https://github.com/ipfs/js-ipfs/tree/master/packages/ipfs) is a full implementation of IPFS, similar to [Kubo (Go-IPFS)](https://github.com/ipfs/kubo). You can use it either as a command-line application or as a library to start an IPFS node directly in your program, as JS implementation is available as two Node.js packages, `ipfs-core` and `ipfs`.

- [ipfs-core](https://www.npmjs.com/package/ipfs-core) includes the core IPFS API and is intended to be used to run an IPFS node as part of your application without the need to start external processes or manage API ports and servers.

::: tip IPFS Core API

See the [JS core API reference →](https://github.com/ipfs/js-ipfs/tree/master/docs/core-api)

:::

- [ipfs](https://www.npmjs.com/package/ipfs) is built on `ipfs-core` but also includes the CLI, an HTTP RPC API server and, other tools to run ipfs as a background process, so it is a larger install with more dependencies.

::: tip ipfs-core vs. ipfs

If you are writing an application that needs to access the IPFS network, use `ipfs-core`. If you wish to use **js-ipfs** in a terminal window or run it as a server for use by multiple otherwise unrelated processes, use `ipfs`.

:::

### HTTP client

[JS-IPFS HTTP RPC API](https://www.npmjs.com/package/ipfs-http-client) is a client library that controls an active IPFS node (Kubo or JS-IPFS) running through its [RPC API](../kubo/rpc.md).
  - JS-IPFS will internally use this library if it detects another node is running on your machine. You can also interact with the [RPC API](../kubo/rpc.md) directly using `fetch()` in a browser or a module like `request` in Node.js, but using this library can be much more convenient.
  - When using JS-IPFS as a backend, use the [ipfs-client](https://www.npmjs.com/package/ipfs-client) instead to leverage gRPC connections over WebSockets to allow some commands to achieve the bidirectional streaming necessary to have full duplex streams running in the browser.

All the libraries have the [same interface](https://github.com/ipfs/js-ipfs/tree/master/docs/core-api) for using all the major IPFS commands. This client library implements the interface-ipfs-core enabling applications to change between an embedded js-ipfs node and any remote IPFS node without changing the code. In addition, this client library implements a set of utility functions.

::: tip Interacting with IPFS

We recommend the second method (interacting with a separate IPFS node via RPC API) whenever reasonable. Keeping the IPFS node in a separate process (even if it’s one of your program spawns) isolates you from any stability problems with the node. If a user already has IPFS installed, this also means that you can take advantage of a single, standard installation on their machine. It’s also less code to load in a browser. If you need to spawn a separate IPFS process, you might want to take a look at [`js-ipfsd-ctl`](https://github.com/ipfs/js-ipfsd-ctl), which uses the same interface to spawn a Kubo (Go-IPFS) node, a JS-IPFS node, or an in-process JS-IPFS node.

:::

::: warning Browsers

The `js-ipfs` and `js-ipfs-http-client` libraries work in browsers, but each has special considerations noted in their READMEs.

:::

## Packages

> This table is generated using the module [`package-table`](https://www.npmjs.com/package/package-table) with `package-table --data=package-list.json`.

Listing of the main JS packages in the IPFS ecosystem:

| Package | Version | Deps | CI/Travis | Coverage | Lead Maintainer |
| ---------|---------|---------|---------|---------|--------- |
| **Files** |
| [`ipfs-unixfs`](//github.com/ipfs/js-ipfs-unixfs) | [![npm](https://img.shields.io/npm/v/ipfs-unixfs.svg?maxAge=86400&style=flat-square)](//github.com/ipfs/js-ipfs-unixfs/releases) | [![Deps](https://david-dm.org/ipfs/js-ipfs-unixfs.svg?style=flat-square)](https://david-dm.org/ipfs/js-ipfs-unixfs) | [![Travis CI](https://flat.badgen.net/travis/ipfs/js-ipfs-unixfs/master)](https://travis-ci.com/ipfs/js-ipfs-unixfs) | [![codecov](https://codecov.io/gh/ipfs/js-ipfs-unixfs/branch/master/graph/badge.svg?style=flat-square)](https://codecov.io/gh/ipfs/js-ipfs-unixfs) | [Alex Potsides](mailto:alex.potsides@protocol.ai) |
| **Repo** |
| [`ipfs-repo`](//github.com/ipfs/js-ipfs-repo) | [![npm](https://img.shields.io/npm/v/ipfs-repo.svg?maxAge=86400&style=flat-square)](//github.com/ipfs/js-ipfs-repo/releases) | [![Deps](https://david-dm.org/ipfs/js-ipfs-repo.svg?style=flat-square)](https://david-dm.org/ipfs/js-ipfs-repo) | [![Travis CI](https://flat.badgen.net/travis/ipfs/js-ipfs-repo/master)](https://travis-ci.com/ipfs/js-ipfs-repo) | [![codecov](https://codecov.io/gh/ipfs/js-ipfs-repo/branch/master/graph/badge.svg?style=flat-square)](https://codecov.io/gh/ipfs/js-ipfs-repo) | [Alex Potsides](mailto:alex@achingbrain.net) |
| [`ipfs-repo-migrations`](//github.com/ipfs/js-ipfs-repo-migrations) | [![npm](https://img.shields.io/npm/v/ipfs-repo-migrations.svg?maxAge=86400&style=flat-square)](//github.com/ipfs/js-ipfs-repo-migrations/releases) | [![Deps](https://david-dm.org/ipfs/js-ipfs-repo-migrations.svg?style=flat-square)](https://david-dm.org/ipfs/js-ipfs-repo-migrations) | [![Travis CI](https://flat.badgen.net/travis/ipfs/js-ipfs-repo-migrations/master)](https://travis-ci.com/ipfs/js-ipfs-repo-migrations) | [![codecov](https://codecov.io/gh/ipfs/js-ipfs-repo-migrations/branch/master/graph/badge.svg?style=flat-square)](https://codecov.io/gh/ipfs/js-ipfs-repo-migrations) | N/A |
| **Exchange** |
| [`ipfs-bitswap`](//github.com/ipfs/js-ipfs-bitswap) | [![npm](https://img.shields.io/npm/v/ipfs-bitswap.svg?maxAge=86400&style=flat-square)](//github.com/ipfs/js-ipfs-bitswap/releases) | [![Deps](https://david-dm.org/ipfs/js-ipfs-bitswap.svg?style=flat-square)](https://david-dm.org/ipfs/js-ipfs-bitswap) | [![Travis CI](https://flat.badgen.net/travis/ipfs/js-ipfs-bitswap/master)](https://travis-ci.com/ipfs/js-ipfs-bitswap) | [![codecov](https://codecov.io/gh/ipfs/js-ipfs-bitswap/branch/master/graph/badge.svg?style=flat-square)](https://codecov.io/gh/ipfs/js-ipfs-bitswap) | [Dirk McCormick](mailto:dirk@protocol.ai) |
| **IPNS** |
| [`ipns`](//github.com/ipfs/js-ipns) | [![npm](https://img.shields.io/npm/v/ipns.svg?maxAge=86400&style=flat-square)](//github.com/ipfs/js-ipns/releases) | [![Deps](https://david-dm.org/ipfs/js-ipns.svg?style=flat-square)](https://david-dm.org/ipfs/js-ipns) | [![Travis CI](https://flat.badgen.net/travis/ipfs/js-ipns/master)](https://travis-ci.com/ipfs/js-ipns) | [![codecov](https://codecov.io/gh/ipfs/js-ipns/branch/master/graph/badge.svg?style=flat-square)](https://codecov.io/gh/ipfs/js-ipns) | [Vasco Santos](mailto:vasco.santos@moxy.studio) |
| **Generics/Utils** |
| [`ipfs-utils`](//github.com/ipfs/js-ipfs) | [![npm](https://img.shields.io/npm/v/ipfs-utils.svg?maxAge=86400&style=flat-square)](//github.com/ipfs/js-ipfs/releases) | [![Deps](https://david-dm.org/ipfs/js-ipfs.svg?style=flat-square)](https://david-dm.org/ipfs/js-ipfs) | [![Travis CI](https://flat.badgen.net/travis/ipfs/js-ipfs/master)](https://travis-ci.com/ipfs/js-ipfs) | [![codecov](https://codecov.io/gh/ipfs/js-ipfs/branch/master/graph/badge.svg?style=flat-square)](https://codecov.io/gh/ipfs/js-ipfs) | [Hugo Dias](mailto:hugomrdias@gmail.com) |
| [`ipfs-http-client`](//github.com/ipfs/js-ipfs) | [![npm](https://img.shields.io/npm/v/ipfs-http-client.svg?maxAge=86400&style=flat-square)](//github.com/ipfs/js-ipfs/releases) | [![Deps](https://david-dm.org/ipfs/js-ipfs.svg?style=flat-square)](https://david-dm.org/ipfs/js-ipfs) | [![Travis CI](https://flat.badgen.net/travis/ipfs/js-ipfs/master)](https://travis-ci.com/ipfs/js-ipfs) | [![codecov](https://codecov.io/gh/ipfs/js-ipfs/branch/master/graph/badge.svg?style=flat-square)](https://codecov.io/gh/ipfs/js-ipfs) | [Alex Potsides](mailto:alex@achingbrain.net) |
| [`ipfs-http-response`](//github.com/ipfs/js-ipfs-http-response) | [![npm](https://img.shields.io/npm/v/ipfs-http-response.svg?maxAge=86400&style=flat-square)](//github.com/ipfs/js-ipfs-http-response/releases) | [![Deps](https://david-dm.org/ipfs/js-ipfs-http-response.svg?style=flat-square)](https://david-dm.org/ipfs/js-ipfs-http-response) | [![Travis CI](https://flat.badgen.net/travis/ipfs/js-ipfs-http-response/master)](https://travis-ci.com/ipfs/js-ipfs-http-response) | [![codecov](https://codecov.io/gh/ipfs/js-ipfs-http-response/branch/master/graph/badge.svg?style=flat-square)](https://codecov.io/gh/ipfs/js-ipfs-http-response) | [Vasco Santos](mailto:vasco.santos@moxy.studio) |
| [`ipfsd-ctl`](//github.com/ipfs/js-ipfsd-ctl) | [![npm](https://img.shields.io/npm/v/ipfsd-ctl.svg?maxAge=86400&style=flat-square)](//github.com/ipfs/js-ipfsd-ctl/releases) | [![Deps](https://david-dm.org/ipfs/js-ipfsd-ctl.svg?style=flat-square)](https://david-dm.org/ipfs/js-ipfsd-ctl) | [![Travis CI](https://flat.badgen.net/travis/ipfs/js-ipfsd-ctl/master)](https://travis-ci.com/ipfs/js-ipfsd-ctl) | [![codecov](https://codecov.io/gh/ipfs/js-ipfsd-ctl/branch/master/graph/badge.svg?style=flat-square)](https://codecov.io/gh/ipfs/js-ipfsd-ctl) | [Hugo Dias](mailto:mail@hugodias.me) |
| [`is-ipfs`](//github.com/ipfs/is-ipfs) | [![npm](https://img.shields.io/npm/v/is-ipfs.svg?maxAge=86400&style=flat-square)](//github.com/ipfs/is-ipfs/releases) | [![Deps](https://david-dm.org/ipfs/is-ipfs.svg?style=flat-square)](https://david-dm.org/ipfs/is-ipfs) | [![Travis CI](https://flat.badgen.net/travis/ipfs/is-ipfs/master)](https://travis-ci.com/ipfs/is-ipfs) | [![codecov](https://codecov.io/gh/ipfs/is-ipfs/branch/master/graph/badge.svg?style=flat-square)](https://codecov.io/gh/ipfs/is-ipfs) | [Marcin Rataj](mailto:lidel@lidel.org) |
| [`aegir`](//github.com/ipfs/aegir) | [![npm](https://img.shields.io/npm/v/aegir.svg?maxAge=86400&style=flat-square)](//github.com/ipfs/aegir/releases) | [![Deps](https://david-dm.org/ipfs/aegir.svg?style=flat-square)](https://david-dm.org/ipfs/aegir) | [![Travis CI](https://flat.badgen.net/travis/ipfs/aegir/master)](https://travis-ci.com/ipfs/aegir) | [![codecov](https://codecov.io/gh/ipfs/aegir/branch/master/graph/badge.svg?style=flat-square)](https://codecov.io/gh/ipfs/aegir) | [Hugo Dias](mailto:hugomrdias@gmail.com) |
| **libp2p** |
| [`libp2p`](//github.com/libp2p/js-libp2p) | [![npm](https://img.shields.io/npm/v/libp2p.svg?maxAge=86400&style=flat-square)](//github.com/libp2p/js-libp2p/releases) | [![Deps](https://david-dm.org/libp2p/js-libp2p.svg?style=flat-square)](https://david-dm.org/libp2p/js-libp2p) | [![Travis CI](https://flat.badgen.net/travis/libp2p/js-libp2p/master)](https://travis-ci.com/libp2p/js-libp2p) | [![codecov](https://codecov.io/gh/libp2p/js-libp2p/branch/master/graph/badge.svg?style=flat-square)](https://codecov.io/gh/libp2p/js-libp2p) | [Jacob Heun](mailto:jacobheun@gmail.com) |
| [`peer-id`](//github.com/libp2p/js-peer-id) | [![npm](https://img.shields.io/npm/v/peer-id.svg?maxAge=86400&style=flat-square)](//github.com/libp2p/js-peer-id/releases) | [![Deps](https://david-dm.org/libp2p/js-peer-id.svg?style=flat-square)](https://david-dm.org/libp2p/js-peer-id) | [![Travis CI](https://flat.badgen.net/travis/libp2p/js-peer-id/master)](https://travis-ci.com/libp2p/js-peer-id) | [![codecov](https://codecov.io/gh/libp2p/js-peer-id/branch/master/graph/badge.svg?style=flat-square)](https://codecov.io/gh/libp2p/js-peer-id) | [Vasco Santos](mailto:santos.vasco10@gmail.com) |
| [`libp2p-crypto`](//github.com/libp2p/js-libp2p-crypto) | [![npm](https://img.shields.io/npm/v/libp2p-crypto.svg?maxAge=86400&style=flat-square)](//github.com/libp2p/js-libp2p-crypto/releases) | [![Deps](https://david-dm.org/libp2p/js-libp2p-crypto.svg?style=flat-square)](https://david-dm.org/libp2p/js-libp2p-crypto) | [![Travis CI](https://flat.badgen.net/travis/libp2p/js-libp2p-crypto/master)](https://travis-ci.com/libp2p/js-libp2p-crypto) | [![codecov](https://codecov.io/gh/libp2p/js-libp2p-crypto/branch/master/graph/badge.svg?style=flat-square)](https://codecov.io/gh/libp2p/js-libp2p-crypto) | [Jacob Heun](mailto:jacobheun@gmail.com) |
| [`libp2p-floodsub`](//github.com/libp2p/js-libp2p-floodsub) | [![npm](https://img.shields.io/npm/v/libp2p-floodsub.svg?maxAge=86400&style=flat-square)](//github.com/libp2p/js-libp2p-floodsub/releases) | [![Deps](https://david-dm.org/libp2p/js-libp2p-floodsub.svg?style=flat-square)](https://david-dm.org/libp2p/js-libp2p-floodsub) | [![Travis CI](https://flat.badgen.net/travis/libp2p/js-libp2p-floodsub/master)](https://travis-ci.com/libp2p/js-libp2p-floodsub) | [![codecov](https://codecov.io/gh/libp2p/js-libp2p-floodsub/branch/master/graph/badge.svg?style=flat-square)](https://codecov.io/gh/libp2p/js-libp2p-floodsub) | [Vasco Santos](mailto:vasco.santos@moxy.studio) |
| [`libp2p-gossipsub`](//github.com/ChainSafe/gossipsub-js) | [![npm](https://img.shields.io/npm/v/libp2p-gossipsub.svg?maxAge=86400&style=flat-square)](//github.com/ChainSafe/gossipsub-js/releases) | [![Deps](https://david-dm.org/ChainSafe/gossipsub-js.svg?style=flat-square)](https://david-dm.org/ChainSafe/gossipsub-js) | [![Travis CI](https://flat.badgen.net/travis/ChainSafe/gossipsub-js/master)](https://travis-ci.com/ChainSafe/gossipsub-js) | [![codecov](https://codecov.io/gh/ChainSafe/gossipsub-js/branch/master/graph/badge.svg?style=flat-square)](https://codecov.io/gh/ChainSafe/gossipsub-js) | [Cayman Nava](mailto:caymannava@gmail.com) |
| [`libp2p-kad-dht`](//github.com/libp2p/js-libp2p-kad-dht) | [![npm](https://img.shields.io/npm/v/libp2p-kad-dht.svg?maxAge=86400&style=flat-square)](//github.com/libp2p/js-libp2p-kad-dht/releases) | [![Deps](https://david-dm.org/libp2p/js-libp2p-kad-dht.svg?style=flat-square)](https://david-dm.org/libp2p/js-libp2p-kad-dht) | [![Travis CI](https://flat.badgen.net/travis/libp2p/js-libp2p-kad-dht/master)](https://travis-ci.com/libp2p/js-libp2p-kad-dht) | [![codecov](https://codecov.io/gh/libp2p/js-libp2p-kad-dht/branch/master/graph/badge.svg?style=flat-square)](https://codecov.io/gh/libp2p/js-libp2p-kad-dht) | [Vasco Santos](mailto:vasco.santos@moxy.studio) |
| [`libp2p-mdns`](//github.com/libp2p/js-libp2p-mdns) | [![npm](https://img.shields.io/npm/v/libp2p-mdns.svg?maxAge=86400&style=flat-square)](//github.com/libp2p/js-libp2p-mdns/releases) | [![Deps](https://david-dm.org/libp2p/js-libp2p-mdns.svg?style=flat-square)](https://david-dm.org/libp2p/js-libp2p-mdns) | [![Travis CI](https://flat.badgen.net/travis/libp2p/js-libp2p-mdns/master)](https://travis-ci.com/libp2p/js-libp2p-mdns) | [![codecov](https://codecov.io/gh/libp2p/js-libp2p-mdns/branch/master/graph/badge.svg?style=flat-square)](https://codecov.io/gh/libp2p/js-libp2p-mdns) | [Jacob Heun](mailto:jacobheun@gmail.com) |
| [`libp2p-bootstrap`](//github.com/libp2p/js-libp2p-bootstrap) | [![npm](https://img.shields.io/npm/v/libp2p-bootstrap.svg?maxAge=86400&style=flat-square)](//github.com/libp2p/js-libp2p-bootstrap/releases) | [![Deps](https://david-dm.org/libp2p/js-libp2p-bootstrap.svg?style=flat-square)](https://david-dm.org/libp2p/js-libp2p-bootstrap) | [![Travis CI](https://flat.badgen.net/travis/libp2p/js-libp2p-bootstrap/master)](https://travis-ci.com/libp2p/js-libp2p-bootstrap) | [![codecov](https://codecov.io/gh/libp2p/js-libp2p-bootstrap/branch/master/graph/badge.svg?style=flat-square)](https://codecov.io/gh/libp2p/js-libp2p-bootstrap) | [Vasco Santos](mailto:vasco.santos@moxy.studio) |
| [`@chainsafe/libp2p-noise`](//github.com/ChainSafe/js-libp2p-noise) | [![npm](https://img.shields.io/npm/v/libp2p-noise.svg?maxAge=86400&style=flat-square)](//github.com/ChainSafe/js-libp2p-noise/releases) | [![Deps](https://david-dm.org/ChainSafe/js-libp2p-noise.svg?style=flat-square)](https://david-dm.org/ChainSafe/js-libp2p-noise) | [![Travis CI](https://flat.badgen.net/travis/ChainSafe/js-libp2p-noise/master)](https://travis-ci.com/ChainSafe/js-libp2p-noise) | [![codecov](https://codecov.io/gh/ChainSafe/js-libp2p-noise/branch/master/graph/badge.svg?style=flat-square)](https://codecov.io/gh/ChainSafe/js-libp2p-noise) | N/A |
| [`libp2p-tcp`](//github.com/libp2p/js-libp2p-tcp) | [![npm](https://img.shields.io/npm/v/libp2p-tcp.svg?maxAge=86400&style=flat-square)](//github.com/libp2p/js-libp2p-tcp/releases) | [![Deps](https://david-dm.org/libp2p/js-libp2p-tcp.svg?style=flat-square)](https://david-dm.org/libp2p/js-libp2p-tcp) | [![Travis CI](https://flat.badgen.net/travis/libp2p/js-libp2p-tcp/master)](https://travis-ci.com/libp2p/js-libp2p-tcp) | [![codecov](https://codecov.io/gh/libp2p/js-libp2p-tcp/branch/master/graph/badge.svg?style=flat-square)](https://codecov.io/gh/libp2p/js-libp2p-tcp) | [Jacob Heun](mailto:jacobheun@gmail.com) |
| [`libp2p-webrtc-star`](//github.com/libp2p/js-libp2p-webrtc-star) | [![npm](https://img.shields.io/npm/v/libp2p-webrtc-star.svg?maxAge=86400&style=flat-square)](//github.com/libp2p/js-libp2p-webrtc-star/releases) | [![Deps](https://david-dm.org/libp2p/js-libp2p-webrtc-star.svg?style=flat-square)](https://david-dm.org/libp2p/js-libp2p-webrtc-star) | [![Travis CI](https://flat.badgen.net/travis/libp2p/js-libp2p-webrtc-star/master)](https://travis-ci.com/libp2p/js-libp2p-webrtc-star) | [![codecov](https://codecov.io/gh/libp2p/js-libp2p-webrtc-star/branch/master/graph/badge.svg?style=flat-square)](https://codecov.io/gh/libp2p/js-libp2p-webrtc-star) | [Vasco Santos](mailto:vasco.santos@moxy.studio) |
| [`libp2p-websockets`](//github.com/libp2p/js-libp2p-websockets) | [![npm](https://img.shields.io/npm/v/libp2p-websockets.svg?maxAge=86400&style=flat-square)](//github.com/libp2p/js-libp2p-websockets/releases) | [![Deps](https://david-dm.org/libp2p/js-libp2p-websockets.svg?style=flat-square)](https://david-dm.org/libp2p/js-libp2p-websockets) | [![Travis CI](https://flat.badgen.net/travis/libp2p/js-libp2p-websockets/master)](https://travis-ci.com/libp2p/js-libp2p-websockets) | [![codecov](https://codecov.io/gh/libp2p/js-libp2p-websockets/branch/master/graph/badge.svg?style=flat-square)](https://codecov.io/gh/libp2p/js-libp2p-websockets) | [Jacob Heun](mailto:jacobheun@gmail.com) |
| [`libp2p-mplex`](//github.com/libp2p/js-libp2p-mplex) | [![npm](https://img.shields.io/npm/v/libp2p-mplex.svg?maxAge=86400&style=flat-square)](//github.com/libp2p/js-libp2p-mplex/releases) | [![Deps](https://david-dm.org/libp2p/js-libp2p-mplex.svg?style=flat-square)](https://david-dm.org/libp2p/js-libp2p-mplex) | [![Travis CI](https://flat.badgen.net/travis/libp2p/js-libp2p-mplex/master)](https://travis-ci.com/libp2p/js-libp2p-mplex) | [![codecov](https://codecov.io/gh/libp2p/js-libp2p-mplex/branch/master/graph/badge.svg?style=flat-square)](https://codecov.io/gh/libp2p/js-libp2p-mplex) | [Vasco Santos](mailto:vasco.santos@moxy.studio) |
| [`libp2p-delegated-content-routing`](//github.com/libp2p/js-libp2p-delegated-content-routing) | [![npm](https://img.shields.io/npm/v/libp2p-delegated-content-routing.svg?maxAge=86400&style=flat-square)](//github.com/libp2p/js-libp2p-delegated-content-routing/releases) | [![Deps](https://david-dm.org/libp2p/js-libp2p-delegated-content-routing.svg?style=flat-square)](https://david-dm.org/libp2p/js-libp2p-delegated-content-routing) | [![Travis CI](https://flat.badgen.net/travis/libp2p/js-libp2p-delegated-content-routing/master)](https://travis-ci.com/libp2p/js-libp2p-delegated-content-routing) | [![codecov](https://codecov.io/gh/libp2p/js-libp2p-delegated-content-routing/branch/master/graph/badge.svg?style=flat-square)](https://codecov.io/gh/libp2p/js-libp2p-delegated-content-routing) | [Jacob Heun](mailto:jacobheun@gmail.com) |
| [`libp2p-delegated-peer-routing`](//github.com/libp2p/js-libp2p-delegated-peer-routing) | [![npm](https://img.shields.io/npm/v/libp2p-delegated-peer-routing.svg?maxAge=86400&style=flat-square)](//github.com/libp2p/js-libp2p-delegated-peer-routing/releases) | [![Deps](https://david-dm.org/libp2p/js-libp2p-delegated-peer-routing.svg?style=flat-square)](https://david-dm.org/libp2p/js-libp2p-delegated-peer-routing) | [![Travis CI](https://flat.badgen.net/travis/libp2p/js-libp2p-delegated-peer-routing/master)](https://travis-ci.com/libp2p/js-libp2p-delegated-peer-routing) | [![codecov](https://codecov.io/gh/libp2p/js-libp2p-delegated-peer-routing/branch/master/graph/badge.svg?style=flat-square)](https://codecov.io/gh/libp2p/js-libp2p-delegated-peer-routing) | [Jacob Heun](mailto:jacobheun@gmail.com) |
| **IPLD** |
| [`@ipld/dag-pb`](//github.com/ipld/js-dag-pb) | [![npm](https://img.shields.io/npm/v/@ipld/dag-pb.svg?maxAge=86400&style=flat-square)](//github.com/ipld/js-dag-pb/releases) | [![Deps](https://david-dm.org/ipld/js-dag-pb.svg?style=flat-square)](https://david-dm.org/ipld/js-dag-pb) | [![Travis CI](https://flat.badgen.net/travis/ipld/js-dag-pb/master)](https://travis-ci.com/ipld/js-dag-pb) | [![codecov](https://codecov.io/gh/ipld/js-dag-pb/branch/master/graph/badge.svg?style=flat-square)](https://codecov.io/gh/ipld/js-dag-pb) | N/A |
| [`@ipld/dag-cbor`](//github.com/ipld/js-dag-cbor) | [![npm](https://img.shields.io/npm/v/@ipld/dag-cbor.svg?maxAge=86400&style=flat-square)](//github.com/ipld/js-dag-cbor/releases) | [![Deps](https://david-dm.org/ipld/js-dag-cbor.svg?style=flat-square)](https://david-dm.org/ipld/js-dag-cbor) | [![Travis CI](https://flat.badgen.net/travis/ipld/js-dag-cbor/master)](https://travis-ci.com/ipld/js-dag-cbor) | [![codecov](https://codecov.io/gh/ipld/js-dag-cbor/branch/master/graph/badge.svg?style=flat-square)](https://codecov.io/gh/ipld/js-dag-cbor) | N/A |
| **Multiformats** |
| [`multiformats`](//github.com/multiformats/js-multiformats) | [![npm](https://img.shields.io/npm/v/multiformats.svg?maxAge=86400&style=flat-square)](//github.com/multiformats/js-multiformats/releases) | [![Deps](https://david-dm.org/multiformats/js-multiformats.svg?style=flat-square)](https://david-dm.org/multiformats/js-multiformats) | [![Travis CI](https://flat.badgen.net/travis/multiformats/js-multiformats/master)](https://travis-ci.com/multiformats/js-multiformats) | [![codecov](https://codecov.io/gh/multiformats/js-multiformats/branch/master/graph/badge.svg?style=flat-square)](https://codecov.io/gh/multiformats/js-multiformats) | N/A |
| [`mafmt`](//github.com/multiformats/js-mafmt) | [![npm](https://img.shields.io/npm/v/mafmt.svg?maxAge=86400&style=flat-square)](//github.com/multiformats/js-mafmt/releases) | [![Deps](https://david-dm.org/multiformats/js-mafmt.svg?style=flat-square)](https://david-dm.org/multiformats/js-mafmt) | [![Travis CI](https://flat.badgen.net/travis/multiformats/js-mafmt/master)](https://travis-ci.com/multiformats/js-mafmt) | [![codecov](https://codecov.io/gh/multiformats/js-mafmt/branch/master/graph/badge.svg?style=flat-square)](https://codecov.io/gh/multiformats/js-mafmt) | [Vasco Santos](mailto:vasco.santos@moxy.studio) |
| [`multiaddr`](//github.com/multiformats/js-multiaddr) | [![npm](https://img.shields.io/npm/v/multiaddr.svg?maxAge=86400&style=flat-square)](//github.com/multiformats/js-multiaddr/releases) | [![Deps](https://david-dm.org/multiformats/js-multiaddr.svg?style=flat-square)](https://david-dm.org/multiformats/js-multiaddr) | [![Travis CI](https://flat.badgen.net/travis/multiformats/js-multiaddr/master)](https://travis-ci.com/multiformats/js-multiaddr) | [![codecov](https://codecov.io/gh/multiformats/js-multiaddr/branch/master/graph/badge.svg?style=flat-square)](https://codecov.io/gh/multiformats/js-multiaddr) | [Jacob Heun](mailto:jacobheun@gmail.com) |

## Hands-on examples

::: callout

**Explore js-ipfs through interactive coding challenges at [ProtoSchool](https://proto.school/course/ipfs).**

:::

There are lots of JS-IPFS use-case examples in the [`ipfs/js-ipfs` GitHub repository](https://github.com/ipfs-examples/js-ipfs-examples). They're all self-contained projects that let your spin up and test environments quickly. [Check them out →](https://github.com/ipfs-examples/js-ipfs-examples/tree/master/examples)

A good starting place is the [IPFS 101, spawn a node and add a file to the IPFS network](https://github.com/ipfs-examples/js-ipfs-examples/tree/master/examples/ipfs-101).
