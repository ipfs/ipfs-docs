---
title: IPFS in JavaScript
description: "A simple walkthrough of how to perform basic IPFS operations using the JS implementation."
---

# JS-IPFS Basics

This guide aims to walk you through the basics of using IPFS with JavaScript. JS-IPFS is one of multiple [IPFS implementations](../ipfs-implementations.md).

You will learn how install and spawn a node using the available libraries, as well as add, retrieve, 
read, and remove files. If you are unsure about the meaning of some terms, check out the [glossary](../concepts/glossary.md).

::: tip Environment

All instructions and examples shown here were performed and tested on an M1 Mac. However, the IPFS commands are the same on Linux, macOS, and Windows. You will need to know how to navigate your computer's directories from within the CLI. If you're unsure how to use the CLI, we recommend learning how before continuing with this guide.

:::

There are two main JavaScript libraries for working with IPFS, learn about each library in the [reference section](../reference/js/api).

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

## Connect to IPFS

:::: tabs

::: tab ipfs-http-client

If you have not already installed the client library, add the `ipfs-http-client` module to your project:

```bash
npm i ipfs-http-client
```

Populate your `index.js` file with the following to create an instance of the HTTP API client:

```js{1,3}
import { create } from 'ipfs-http-client'

const client = create() // the default API address http://localhost:5001
```

This imports the client library and uses the `create()` function to connect to an IPFS API server. 

To connect to the API, run the application:

:::

::: tab ipfs-client

If you have not already installed the client library, add the `ipfs-http-client` module to your project:

Populate your `index.js` file with the following to create an instance of the HTTP API client:

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

:::

::::

## Add, retrieve & remove files

::: warning Section coming soon

As the JS-IPFS implementation goes through changes, adding and removing a file are subject to change. For the time being, please reference the [source packages](https://github.com/ipfs/js-ipfs).

:::
