---
title: Node types
description: Learn about the available node types in IPFS Companion.
---

# Understand node types in IPFS Companion

IPFS Companion's preferences screen allows you to choose from different node types. The available types you'll see in your Companion preferences depends on the browser you're using (i.e. Firefox, Chrome, Brave), but the full list is as follows:

[[toc]]

**If you're already running a local IPFS node, choose _External_.** If not, do one of the following:

- [Install](../install/README.md) and run IPFS as an [external node](#external) (recommended).
- Use a [native node](#native) built into your browser (Brave v1.19 or later only).

## External

An _external_ node can be any instance of an IPFS daemon that:

- Runs outside of your web browser.
- Exposes a _gateway_ and writeable _API_ over HTTP at TCP ports.

The [Kubo](https://github.com/ipfs/kubo) implementation of IPFS is the recommended choice for running an external IPFS node. It's less power-hungry than other implementations and uses the `dhtclient` mode to decrease ambient bandwidth use and reduce battery drain.

A good practice is to run your Kubo daemon on localhost (`127.0.0.1`), as it provides:

- Increased security: native IPFS used as end-to-end transport.
- Better UX in the browser: no mixed-content warnings.
- Improved performance: local loopback is used, so no network overhead.

You can get started with running a Kubo node on your local machine in several ways:

- [IPFS Desktop](https://github.com/ipfs-shipyard/ipfs-desktop) installs and manages a local node for you, as well as offering an easy, convenient user interface for managing files and peers.
- If you're comfortable with the command line and don't need the convenience of the IPFS Desktop UI, follow the directions in the [command line quick-start guide](command-line-quick-start.md).
- Docker fans can run and use Kubo from [inside a Docker container](https://github.com/ipfs/kubo#running-ipfs-inside-docker).

## Native

### Provided by Brave

Users of the [Brave](https://brave.com/) browser (v1.19 or later) can enable native support for IPFS using a Kubo node built directly into the browser itself. This is a great way to experiment with IPFS without having to install or run IPFS Desktop or the command-line daemon.

This node type offers the same benefits as an [external](#external) node, with additional features provided within Brave itself:

- Native support for `ipfs://` and `ipns://` URIs:
  - Built-in fallback to a public gateway.
  - Ability to change your preferred public gateway from Brave's settings page.
  - Options for default resolution of IPFS resources: through a public gateway, through a local node, or asking each time.
- The IPFS node is managed by Brave itself:
  - Automatic Kubo updates and migrations.
  - Your node is only running when Brave is open.
  - You can start/stop your Brave-based node by clicking the power button icon in IPFS Companion's main menu.

::: tip TOOLS FOR BRAVE USERS

- `ipfs://bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi`
  Popular URI for triggering and testing native IPFS support
- `brave://settings/extensions`
  One-click Companion install and URI resolution settings
- `brave://ipfs`
  Status page for Brave's built-in Kubo node

:::
