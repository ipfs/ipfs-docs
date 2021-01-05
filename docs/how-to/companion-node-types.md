---
title: Node types
description: Learn about the available node types in IPFS Companion.
---

# Understand node types in IPFS Companion

There are four available types of node in IPFS Companion:

1. External
2. Embedded
3. Native browser (Brave only)
4. Public

![Screenshot of node type switch](./images/node-type-switch.png)

When in doubt, use the _External_ node type running on your localhost. Some options for doing so:

- Use the [IPFS Desktop](https://github.com/ipfs-shipyard/ipfs-desktop) GUI app (for Windows/Linux/Mac), which installs and manages a local IPFS node for you
- If you prefer a more hands-on approach:
  - Install IPFS by following the [command line quick-start guide](command-line-quick-start.md)
  - Or run it in [Docker](https://github.com/ipfs/go-ipfs#running-ipfs-inside-docker)

Or, if [Brave](https://brave.com/) is your browser of choice, you can use the easiest of all these options: Just enable Brave's own built-in IPFS node.

## External

An _external_ node can be any instance of an IPFS daemon that runs outside of a web browser process and exposes _Gateway_ and writable _API_ over HTTP at TCP ports.

At this time, the [go-ipfs](https://github.com/ipfs/go-ipfs) daemon is the preferred implementation. It is easier on CPU, and provides `dhtclient` mode, which
decreases ambient bandwidth use and smaller battery drain (key characteristics of something that is expected to run in the background all the time).

A good practice is to run it on localhost (`127.0.0.1`), as it provides:

- Increased security (native IPFS used as end-to-end transport)
- Better UX in the browser (no mixed-content warnings)
- Improved performance (local loopback is used, no network overhead)

Don't know where to start? See the [command line quick-start guide](command-line-quick-start.md).

## Embedded

An _embedded_ node is a js-ipfs instance running in the browser (in-memory), without the need for any external software. It is a work in progress, but can be used for development and experimentation (e.g. for testing a dApp that uses `window.ipfs` without having to install and start up your own IPFS daemon).

For Brave users, this option isn't available in IPFS Companion preferences because it has been superceded by Brave's own [native IPFS support](#native-browser).

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

### Embedded + `chrome.sockets` (deprecated)

This node type has been deprecated and is no longer supported by Chromium browsers. While this option still appears in IPFS Companion preferences, users of this node type are strongly urged to migrate to a different node type ASAP.

## Native browser

Users of the [Brave](https://brave.com/) browser can enable native support for IPFS using a go-ipfs node built directly into the browser itself. This is a great way to experiment with IPFS without having to install or run IPFS Desktop or an IPFS daemon.

As with the embedded node type described above, Brave's native node is running in-memory in the browser itself, which means your node is only running when you're running your copy of Brave. However, Brave's native node offers some benefits over an embedded js-ipfs node, including:

- Ability to change your preferred public gateway from Brave's settings page
- Options for default resolution of IPFS resources: through a public gateway, through a local node, or asking each time

## Public

A _public_ node is not a part of the toggle UI. It is used as an implicit fallback for its gateway functionality when an external node is offline or an embedded node is used. It does not expose the API port.
