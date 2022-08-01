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

## Install JS-IPFS

:::: tabs

::: tab ipfs-cli

### JS-IPFS module

To use the CLI on your machine, globally install the `ipfs` Node.js package:

```bash
npm i --location=global ipfs
```

### Build from source

To build from source, clone the [source packages](https://github.com/ipfs/js-ipfs) and follow the build instructions.

:::

::: tab ipfs-core

### IPFS core API

To use the IPFS core API, install the `ipfs-core` Node.js package:

```bash
npm i ipfs-core
```

### Build from source

To build from source, clone the [source packages](https://github.com/ipfs/js-ipfs) and follow the build instructions.

:::

::: tab ipfs-http-client

### HTTP client module

To use the client on your machine, install the `ipfs-http-client` Node.js package:

```bash
npm i ipfs-http-client
```

### Build from source

To build from source, clone the [source package](https://github.com/ipfs/js-ipfs/tree/master/packages/ipfs-http-client) and follow the build instructions.

:::

::: tab ipfs-client

### HTTP client module

To use the client on your machine, install the `ipfs-client` Node.js package:

```bash
npm i ipfs-client
```

### Build from source

To build from source, clone the [source package](https://github.com/ipfs/js-ipfs/tree/master/packages/ipfs-http-client) and follow the build instructions.

:::

::::

## Spawn a node

:::: tabs

::: tab ipfs-cli

To spawn a node using the CLI, simply start the daemon:

```bash
jsipfs daemon
``` 

You should see an output similar to:

```shell
Initializing IPFS daemon...
System version: arm64/darwin
Node.js version: 16.16.0
Swarm listening on /ip4/127.0.0.1/tcp/4002/p2p/12D3KooWMZr34r6FArFH36QxyT25BM4HL4u2WF7jQzwNdg91awB6
Swarm listening on /ip4/10.0.0.25/tcp/4002/p2p/12D3KooWMZr34r6FArFH36QxyT25BM4HL4u2WF7jQzwNdg91awB6
Swarm listening on /ip4/10.2.0.2/tcp/4002/p2p/12D3KooWMZr34r6FArFH36QxyT25BM4HL4u2WF7jQzwNdg91awB6
Swarm listening on /ip4/127.0.0.1/tcp/4003/ws/p2p/12D3KooWMZr34r6FArFH36QxyT25BM4HL4u2WF7jQzwNdg91awB6
js-ipfs version: 0.15.4
HTTP API listening on /ip4/127.0.0.1/tcp/5002/http
gRPC listening on /ip4/127.0.0.1/tcp/5003/ws
Gateway (read only) listening on /ip4/127.0.0.1/tcp/9090/http
Web UI available at http://127.0.0.1:5002/webui
Daemon is ready
```

You should be able to point to the [webpage](http://127.0.0.1:5002/webui):

<img src="../../images/jsipfs-webui.png" width="1000">

If you are unable to connect to the API, ensure [cross-origin (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) requests are configured:

```bash
jsipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["http://127.0.0.1:5002", "http://localhost:3000", "http://127.0.0.1:5001", "https://webui.ipfs.io"]'
jsipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods '["PUT", "POST"]'
```

:::

::: tab ipfs-core

Create a simple Node.js application to host the logic that will allow you to use the RPC API. You'll also use this Node.js application later on to add and remove files.

Start by initiating a new project:

```bash
npm init -y
```

If you have not already installed `ipfs-core`, add the `ipfs-core` module to your project:

```bash
npm i ipfs-core
```

Create an `index.js` file for the application logic:

```bash
touch index.js
```

Now, populate the `index.js` file by initiating an `async` function:

```js
const main = async () => {
  // "await" logic to spawn a node
}

main()
```

To create an IPFS node, add:

```js{1,4}
import * as IPFS from 'ipfs-core';

async function main() {
  const node = await IPFS.create();
}

main();
```

This imports IPFS as a dependency and uses the `create()` function to create a node instance. 

To spawn the node, run the application:

```bash
node index.js
```

You should see an output similar to:

```shell
Swarm listening on /ip4/127.0.0.1/tcp/4002/p2p/12D3KooWMZr34r6FArFH36QxyT25BM4HL4u2WF7jQzwNdg91awB6
Swarm listening on /ip4/10.0.0.25/tcp/4002/p2p/12D3KooWMZr34r6FArFH36QxyT25BM4HL4u2WF7jQzwNdg91awB6
Swarm listening on /ip4/127.0.0.1/tcp/4003/ws/p2p/12D3KooWMZr34r6FArFH36QxyT25BM4HL4u2WF7jQzwNdg91awB6
```

:::

::::

## Connect to a node

:::: tabs

::: tab ipfs-http-client

Create a simple Node.js application to host the logic that will connect to the API client. You'll use this Node.js application later on to add and remove files.

Start by initiating a new project:

```bash
npm init -y
```

If you have not already installed the client library, add the `ipfs-http-client` module to your project:

```bash
npm i ipfs-http-client
```

Create an `index.js` file for the application logic:

```bash
touch index.js
```

Now, populate the `index.js` file with the following to create an instance of the HTTP API client:

```js{1,3}
import { create } from 'ipfs-http-client'

const client = create() // the default API address http://localhost:5001
```

This imports the client library and uses the `create()` function to connect to an IPFS API server. 

To connect to the API, run the application:

```bash
node index.js
```

You should see an output similar to:

```shell

```

:::

::: tab ipfs-client

Create a simple Node.js application to use the IPFS client as a backend to connect to IPFS servers.

Start by initiating a new project:

```bash
npm init -y
```

If you have not already installed the client library, add the `ipfs-http-client` module to your project:

```bash
npm i ipfs-client
```

Create an `index.js` file for the application logic:

```bash
touch index.js
```

Now, populate the `index.js` file with the following to create an instance of the HTTP API client:

```js{1,3-5}
import { create } from 'ipfs-client'

const client = create({
  grpc: '/ipv4/127.0.0.1/tcp/5003/ws',
  http: '/ipv4/127.0.0.1/tcp/5002/http'
})

const id = await client.id()
```

This imports the client library and uses the `create()` function to define the server endpoints.

To connect to the endpoints, run the application:

```bash
node index.js
```

You should see an output similar to:

```shell

```

:::


::::

## Add a file

::: warning Section coming soon

As the JS-IPFS implementation goes through changes, adding and removing a file are subject to change. For the time being, please reference the [source packages](https://github.com/ipfs/js-ipfs).

:::

## Hands-on examples

::: callout

**Explore js-ipfs through interactive coding challenges at [ProtoSchool](https://proto.school/course/ipfs).**

:::

There are lots of JS-IPFS use-case examples in the [`ipfs/js-ipfs` GitHub repository](https://github.com/ipfs-examples/js-ipfs-examples). They're all self-contained projects that let your spin up and test environments quickly. [Check them out →](https://github.com/ipfs-examples/js-ipfs-examples/tree/master/examples)

A good starting place is the [IPFS 101, spawn a node and add a file to the IPFS network](https://github.com/ipfs-examples/js-ipfs-examples/tree/master/examples/ipfs-101).
