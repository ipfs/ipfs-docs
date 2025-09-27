---
title: Node types
description: Learn about the available node types in IPFS Companion.
---

# Understand node types in IPFS Companion

IPFS Companion's preferences screen allows you to choose from different node types. The available types you'll see in your Companion preferences depends on the browser you're using (i.e. Firefox, Chrome), but the full list is as follows:

[[toc]]

**If you're already running a local IPFS node, choose _External_.** If not, do one of the following:

- [Install](../install/README.md) and run IPFS as an [external node](#external) (recommended).

## External

An _external_ node can be any instance of an IPFS daemon that:

- Runs outside of your web browser.
- Exposes a _gateway_ and writeable _API_ over HTTP at TCP ports.

The [Kubo](https://github.com/ipfs/kubo) implementation of IPFS is the recommended choice for running an external IPFS node. It's less power-hungry than other implementations and can use the `autoclient` mode to decrease ambient DHT traffic and reduce battery drain.

A good practice is to run your Kubo daemon on localhost (`127.0.0.1`), as it provides:

- Increased security: native IPFS used as end-to-end transport.
- Better UX in the browser: no mixed-content warnings.
- Improved performance: local loopback is used, so no network overhead.

You can get started with running a Kubo node on your local machine in several ways:

- [IPFS Desktop](https://github.com/ipfs-shipyard/ipfs-desktop) installs and manages a local node for you, as well as offering an easy, convenient user interface for managing files and peers.
- If you're comfortable with the command line and don't need the convenience of the IPFS Desktop UI, follow the directions in the [command line quick-start guide](command-line-quick-start.md).
- Docker fans can run and use Kubo from [inside a Docker container](https://github.com/ipfs/kubo#running-ipfs-inside-docker).

