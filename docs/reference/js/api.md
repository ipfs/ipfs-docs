---
title: IPFS in JS
description: Developer resources for working in JavaScript with IPFS, the InterPlanetary File System.
---

# IPFS in JavaScript

Developers can get started with IPFS in JavaScript (JS)  using several options:

- [IPFS Helia](https://helia.io): a lean, modular, and modern implementation of IPFS for the JS and browser environment
- [@helia/verified-fetch](https://github.com/ipfs/helia-verified-fetch/tree/main/packages/verified-fetch): A [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)-like API for obtaining verified & trustless IPFS content on the web
- [js-kubo-rpc-client](https://github.com/ipfs/js-kubo-rpc-client): A JS client library for the [Kubo RPC API](../kubo/rpc.md)

## Get started

### Helia

New to IPFS Helia? The [Helia 101 example](https://github.com/ipfs-examples/helia-examples/tree/main/examples/helia-101) will walk you through spawning a Helia node, adding a file, and `cat`-ing the file CID both locally and through an IPFS gateway. More advanced Helia examples can be found [here](https://github.com/ipfs-examples/helia-examples/tree/main).

### js-kubo-rpc-client

To get started with the js-kubo-rpc-client, do the following:

1. Ensure that you have [kubo](https://github.com/ipfs/kubo) running. Since we're working with Node.js, you can [install kubo using npm](https://www.npmjs.com/package/kubo). 
1. Next, [install the client using `npm`, or load it as a browser script tag](https://github.com/ipfs/js-kubo-rpc-client#install). 
1. Then, consult the [command reference](https://github.com/ipfs/js-kubo-rpc-client#usage) for usage information.
