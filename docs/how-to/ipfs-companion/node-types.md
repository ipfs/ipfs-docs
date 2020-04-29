---
title: Node types
legacyUrl:
description: Learn about the available node types in IPFS Companion.
---

# Understand node types in IPFS Companion

![screenshot of node type switch](https://user-images.githubusercontent.com/157609/42382479-b4d98768-8134-11e8-979c-69b758846bf0.png)<br/>

There are four available node types in IPFS Companion: external, embedded, Embedded + `chrome.sockets`, and public.

**When in doubt, use the _External_ node type running on your localhost.** Some options for doing so:

- Use the [IPFS Desktop](https://github.com/ipfs-shipyard/ipfs-desktop) GUI app (for Windows/Linux/Mac), which installs and manages a local IPFS node for you
- If you prefer a more hands-on approach, you can ...
  - install IPFS by following the [command line quick-start guide](command-line-quick-start.md)
  - Or run it in [Docker](https://github.com/ipfs/go-ipfs#running-ipfs-inside-docker)
- If you are using [Brave](https://brave.com/), feel you may want to experiment with _mbedded + `chrome.sockets`_ (see below); you can always switch back to _External_ with local IPFS Desktop

## External

An _external_ node can be any instance of and IPFS daemon that runs outside of a web browser process and exposes _Gateway_ and writable _API_ over HTTP at TCP ports.

At this time, the [go-ipfs](https://github.com/ipfs/go-ipfs) daemon is the preferred implementation. It is easier on CPU, and provides `dhtclient` mode, which
decreases ambient bandwidth use and smaller battery drain (key characteristics of something that is expected to run in the background all the time).

A good practice is to run it on localhost (`127.0.0.1`), as it provides:

- Increased security (native IPFS used as end-to-end transport)
- Better UX in the browser (no mixed-content warnings)
- Improved performance (local loopback is used, no network overhead)

Don't know where to start? See the [command line quick-start guide](command-line-quick-start.md).

## Embedded

An _embedded_ node is a js-ipfs instance running in the browser (in-memory), without the need for any external software. It is a work in progress, but can be used for development and experimentation (e.g. for testing a dApp that uses `window.ipfs` without having to install and start up your own IPFS daemon).

Power users can provide [custom config](https://github.com/ipfs/js-ipfs#faq) (e.g. to enable experimental pubsub) via the IPFS Companion [Preferences](https://user-images.githubusercontent.com/157609/38084660-0b97c0cc-334e-11e8-9368-823345ced67f.png)

**Note:** At present, embedded js-ipfs running within webextension (browser context) comes with some limitations:

- Can't act as an HTTP gateway (extension uses public one as a fallback)
- Known to be CPU-hungry
  ([#450](https://github.com/ipfs-shipyard/ipfs-companion/issues/450), [ipfs/js-ipfs#1190](https://github.com/ipfs/js-ipfs/issues/1190)) over time, which may drain your battery
- Missing DHT ([js-ipfs/#856](https://github.com/ipfs/js-ipfs/pull/856))
- Default transports limited to websockets ([js-ipfs/#1088](https://github.com/ipfs/js-ipfs/issues/1088))
  - Lack of connection closing ([ipfs/js-ipfs#962](https://github.com/ipfs/js-ipfs/issues/962))
  - Missing relay discovery ([js-ipfs/v0.29.x/examples/circuit-relaying](https://github.com/ipfs/js-ipfs/tree/v0.29.3/examples/circuit-relaying))
- An embedded node _does not run_ when external node is selected.; every time you switch back to the embedded node, a new instance is created on-demand, and it can take a few seconds for a brand new node to find peers

**When in doubt, run go-ipfs as an external node instead.**

## Embedded + `chrome.sockets`

This node type replaces the regular _embedded_ type if the browser vendor grants us access to `chrome.sockets` APIs. These powerful APIs enable embedded js-ipfs to provide a true p2p experience without the need for an external daemon:

### HTTP gateway

- Access IPFS resources over HTTP without relying on a public gateway
- Automatically pick a free localhost port

### TCP transport

- Embedded js-ipfs is able to connect to go-ipfs
- go-ipfs is able to connect to embedded js-ipfs

### Local discovery (mDNS/DNS-SD)

- Embedded node discovers go-ipfs in the LAN and automatically connects to it

**Note:** This is still a work in progress. see [Embedded JS-IPFS in Brave](https://github.com/ipfs-shipyard/ipfs-companion/issues/716) for the current status.

## Public

A _public_ node is not a part of the toggle UI. It is used as an implicit fallback for its gateway functionality when an external node is offline or an embedded node is used. It does not expose the API port.
