---
title: Node types
description: Learn about the available node types in IPFS Companion.
---

# Understand node types in IPFS Companion

Available node types depend on a browser vendor, the full list is:

[[toc]]

![Screenshot of node type switch](./images/node-type-switch.png)

When in doubt, use the _External_ node type running on your localhost. Some options for doing so:

- Use the [IPFS Desktop](https://github.com/ipfs-shipyard/ipfs-desktop) GUI app (for Windows/Linux/Mac), which installs and manages a local IPFS node for you
- If you prefer a more hands-on approach:
  - Install IPFS by following the [command line quick-start guide](command-line-quick-start.md)
  - Or run it in [Docker](https://github.com/ipfs/go-ipfs#running-ipfs-inside-docker)

Or, if [Brave](https://brave.com/) is your browser of choice, you can use the easiest of all these options: Just enable [Brave's own built-in IPFS node](#provided-by-brave).

## External

An _external_ node can be any instance of an IPFS daemon that runs outside of a web browser process and exposes _Gateway_ and writable _API_ over HTTP at TCP ports.

At this time, the [go-ipfs](https://github.com/ipfs/go-ipfs) daemon is the preferred implementation. It is easier on CPU, and provides `dhtclient` mode, which
decreases ambient bandwidth use and smaller battery drain (key characteristics of something that is expected to run in the background all the time).

A good practice is to run it on localhost (`127.0.0.1`), as it provides:

- Increased security (native IPFS used as end-to-end transport)
- Better UX in the browser (no mixed-content warnings)
- Improved performance (local loopback is used, no network overhead)

Don't know where to start? See the [command line quick-start guide](command-line-quick-start.md).

## Native

### Provided by Brave

Users of the [Brave](https://brave.com/) browser can enable native support for IPFS using a go-ipfs node built directly into the browser itself. This is a great way to experiment with IPFS without having to install or run IPFS Desktop or an IPFS daemon.

This node type brings the same benefits as [External](#external) one, with additional Brave features:

- Native URI support: `ipfs://` and `ipns://`
  - Built-in fallback to a public gateway
  - Ability to change your preferred public gateway from Brave's settings page
  - Options for default resolution of IPFS resources: through a public gateway, through a local node, or asking each time
- Node is managed by the browser itself
  - Brave takes care of go-ipfs updates and migrations
  - Node is only running when you're running your copy of Brave
  - The power button in IPFS Companion menu can be used for starting and stopping the node

::: tip Useful pages

- `ipfs://bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi` a popular URI for triggering and testing native support
- `brave://settings/extensions` one-click Companion install and URI resolution settings
- `brave://ipfs` the status of go-ipfs managed by Brave

:::

## Embedded

An _embedded_ node is a js-ipfs instance running in the browser (in-memory), without the need for any external software.

::: warning

This node type is only for development and experimentation.
Regular users should use [native](#native) or [external node type](#external) instead.

:::

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

### Embedded + `chrome.sockets` (deprecated)

This node type has been deprecated and is no longer supported by Chromium browsers. While this option still appears in IPFS Companion preferences, users of this node type are strongly urged to migrate to a different node type ASAP.

## Public

A _public_ node is not a part of the toggle UI. It is used as an implicit fallback for its gateway functionality when an external node is offline or an embedded node is used. It does not expose the API port.
