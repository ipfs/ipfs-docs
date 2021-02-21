---
title: JS-IPFS
legacyUrl: https://docs.ipfs.io/reference/js/
description: Developer resources for working in JavaScript with IPFS, the InterPlanetary File System.
---

# JS-IPFS

::: callout
[Explore js-ipfs through interactive coding challenges at ProtoSchool](https://proto.school/tutorials?course=ipfs)
:::

## IPFS and JavaScript

There are two main JavaScript libraries for working with IPFS. Both work in Node.js and in modern web browsers:

- [JS-IPFS](https://github.com/ipfs/js-ipfs/tree/master/packages/ipfs) is a full implementation of IPFS, similar to [Go-IPFS](https://github.com/ipfs/go-ipfs). You can use it either as a command-line application or as a library to start an IPFS node directly in your program.

- The [JS-IPFS HTTP client](https://github.com/ipfs/js-ipfs/tree/master/packages/ipfs-http-client) is a smaller library that controls an IPFS node that is already running via its [HTTP API](/reference/http/api/). JS-IPFS actually uses this library internally if it detects that another node is already running on your computer. You can also interact with the [HTTP API](/reference/http/api/) directly using `fetch()` in a browser or a module like `request` in Node.js, but using this library can be much more convenient.

Both libraries have the same [interface for using all the major IPFS commands](https://github.com/ipfs/js-ipfs/tree/master/docs/core-api).

Whenever reasonable, we recommend the second method (interacting with a separate IPFS node via the HTTP API). Keeping the IPFS node in a separate process (even if it’s one your program spawns) isolates you from any stability problems with the node. If a user already has IPFS installed, this also means you can take advantage of a single, common installation on their computer. It’s also less code to load in a browser. If you need to spawn a separate IPFS process, you might want to take a look at [`js-ipfsd-ctl`](https://github.com/ipfs/js-ipfsd-ctl), which uses the same interface to spawn a Go-IPFS node, a JS-IPFS node, or an in-process JS-IPFS node.

### Browsers

Both the `js-ipfs` and `js-ipfs-http-client` libraries work in browsers, but each has some special considerations noted in their READMEs.

You may also be interested in the IPFS browser extension, [IPFS Companion](https://github.com/ipfs-shipyard/ipfs-companion). If a visitor to your site has it installed, it will make a global [`window.ipfs`](https://github.com/ipfs-shipyard/ipfs-companion/blob/master/docs/window.ipfs.md) object available to your JavaScript. This object has the same interface as `js-ipfs-api`, but comes with much better security controls and lets you use IPFS without loading any special libraries.

## JS API reference

See the [JS core API reference →](https://github.com/ipfs/js-ipfs/tree/master/docs/core-api)

## HTTP client library

A [client library](https://github.com/ipfs/js-ipfs/tree/master/packages/ipfs-http-client) for the IPFS HTTP API, implemented in JavaScript. This client library implements the interface-ipfs-core enabling applications to change between an embedded js-ipfs node and any remote IPFS node without having to change the code. In addition, this client library implements a set of utility functions.

## Hands-on examples

There are lots of JS-IPFS use-case examples in the [`ipfs/js-ipfs` GitHub repository](https://github.com/ipfs/js-ipfs). They're all self-contained projects that let your spin up and test environments quickly. [Check them out →](https://github.com/ipfs/js-ipfs/tree/master/examples)

A good starting place is the [IPFS 101, spawn a node and add a file to the IPFS network](https://github.com/ipfs/js-ipfs/tree/master/examples/ipfs-101).
