---
title: IPFS in JS
description: Developer resources for working in JavaScript with IPFS, the InterPlanetary File System.
---

# IPFS in JavaScript

## JavaScript libraries

There are two main JavaScript libraries for working with IPFS. Both work in Node.js and modern web browsers.

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

## Hands-on examples

::: callout

**Explore js-ipfs through interactive coding challenges at [ProtoSchool](https://proto.school/course/ipfs).**

:::

There are lots of JS-IPFS use-case examples in the [`ipfs/js-ipfs` GitHub repository](https://github.com/ipfs-examples/js-ipfs-examples). They're all self-contained projects that let your spin up and test environments quickly. [Check them out →](https://github.com/ipfs-examples/js-ipfs-examples/tree/master/examples)

A good starting place is the [IPFS 101, spawn a node and add a file to the IPFS network](https://github.com/ipfs-examples/js-ipfs-examples/tree/master/examples/ipfs-101).
