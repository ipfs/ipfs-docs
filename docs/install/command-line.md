---
title: Kubo
description: Using IPFS Kubo through the command-line allows you to do everything that IPFS Desktop can do, but at a more granular level, since you can specify which commands to run. Learn how to install it here.
current-ipfs-version: v0.33.2
---

# Install IPFS Kubo

This guide describes the available installation processes for IPFS Kubo, a Go-based implementation of the InterPlanetary File System (IPFS) protocol. Kubo was the first implementation of IPFS, and is the most widely used implementation today. Kubo allows you to do everything that IPFS Desktop can do, but at a more granular level, since you can specify which commands to run. Kubo has the following features:

- Runs an IPFS-Node as a network service that is part of LAN and WAN ([Amino](https://probelab.io/ipfs/amino/)) DHT
- [HTTP Gateway](https://specs.ipfs.tech/http-gateways/) (`/ipfs` and `/ipns`) functionality for trusted and [trustless](https://docs.ipfs.tech/reference/http/gateway/#trustless-verifiable-retrieval) content retrieval
- [HTTP Routing V1](https://specs.ipfs.tech/routing/http-routing-v1/) (`/routing/v1`) client and server implementation for [delegated routing](https://github.com/ipfs/kubo/blob/master/docs/delegated-routing.md) lookups
- [HTTP Kubo RPC API](https://docs.ipfs.tech/reference/kubo/rpc/) (`/api/v0`) to access and control the daemon
- [Command Line Interface](https://docs.ipfs.tech/reference/kubo/cli/) (`ipfs --help`) based on (`/api/v0`) RPC API
- [WebUI](https://github.com/ipfs/ipfs-webui/#readme) to manage the Kubo node
- [Content blocking](https://github.com/ipfs/kubo/blob/master/docs/content-blocking.md) support for operators of public nodes
- Binaries for Windows, MacOS, Linux, FreeBSD and OpenBSD

Installing Kubo in the command line is handy for many use cases, such as building applications and services on top of an IPFS node, or setting up a node without a user interface (which is usually the case with remote servers or virtual machines).  

To get started, familiarize yourself with the system requirements. Then, determine if you'd like to install Kubo using one of the 5 official binary distributions, or build Kubo from source. Once you've installed Kubo, determine which node to use in the command line. Finally, check out the next steps.

:::warning
Building from source is only recommended if you are running Kubo on a system with severe resource constraints, or are contributing to the Kubo project. 
:::

## System requirements

Kubo runs on most Windows, MacOS, Linux, FreeBSD and OpenBSD systems that meet the following requirements:

- 6 GiB of memory.
- 2 CPU cores (kubo is highly parallel).

Note the following:
- The amount of disk space your IPFS installation uses depends on how much data you're sharing. A base installation uses around 12MB of disk space.
- You can enable automatic garbage collection via [--enable-gc](../reference/kubo/cli.md#ipfs-daemon) and adjust using [default maximum disk storage](https://github.com/ipfs/kubo/blob/v0.33.2/docs/config.md#datastorestoragemax) for data retrieved from other peers.


<!-- TODO: hide this footgun until https://github.com/ipfs/kubo/pull/10524 is merged and released in stable kubo 
### Kubo on resource-constrained systems 

If you are running Kubo on a resource-constrained system (such as a Raspberry Pi), you should initialize your daemon with the `lowpower` profile. 
  
  ```bash
  ipfs init --profile=lowpower
  ```

This reduces daemon overhead on the system but may degrade content discovery and data fetching performance.

-->

## Install official binary distributions

This section describes how to download and install the Kubo binary from `dist.ipfs.tech` on Windows, MacOS, Linux, FreeBSD and OpenBSD operating systems. The IPFS team publishes the latest, official prebuilt Kubo binaries on the [dist.ipfs.tech website](https://dist.ipfs.tech#kubo). New IPFS Kubo binary releases are automatically shown on the Kubo page on `dist.ipfs.tech`. 

:::callout
If you are unable to access [dist.ipfs.tech](https://dist.ipfs.tech#kubo), you can also download Kubo (go-ipfs) from the project's GitHub [releases](https://github.com/ipfs/kubo/releases/latest) page or `/ipns/dist.ipfs.tech` at the [dweb.link](https://dweb.link/ipns/dist.ipfs.tech#kubo) gateway.
:::

For installation instructions for your operating system, select the appropriate tab.

:::: tabs

::: tab Linux id="install-kubo-linux"

### Linux

1. Download the Linux binary from [`dist.ipfs.tech`](https://dist.ipfs.tech/#kubo).

   ```bash
   wget https://dist.ipfs.tech/kubo/v0.33.2/kubo_v0.33.2_linux-amd64.tar.gz
   ```

1. Unzip the file:

   ```bash
   tar -xvzf kubo_v0.33.2_linux-amd64.tar.gz

   > x kubo/install.sh
   > x kubo/ipfs
   > x kubo/LICENSE
   > x kubo/LICENSE-APACHE
   > x kubo/LICENSE-MIT
   > x kubo/README.md
   ```

1. Move into the `kubo` folder:

   ```bash
   cd kubo
   ```

1. Run the installation script

   ```bash
   sudo bash install.sh

   > Moved ./ipfs to /usr/local/bin
   ```

1. Test that Kubo has installed correctly:

   ```bash
   ipfs --version

   > ipfs version 0.33.2
   ```

:::

::: tab Windows id="install-kubo-windows"

### Windows

1. Download the Windows binary from [`dist.ipfs.tech`](https://dist.ipfs.tech/#kubo).

   ```powershell
   wget https://dist.ipfs.tech/kubo/v0.33.2/kubo_v0.33.2_windows-amd64.zip -Outfile kubo_v0.33.2.zip
   ```

1. Unzip the file to a sensible location, such as `~\Apps\kubo_v0.33.2`.

   ```powershell
   Expand-Archive -Path kubo_v0.33.2.zip -DestinationPath ~\Apps\kubo_v0.33.2
   ```

1. Move into the `kubo_v0.33.2` folder

   ```powershell
   cd ~\Apps\kubo_v0.33.2\kubo
   ```

1. Check that the `ipfs.exe` works:

   ```powershell
   .\ipfs.exe --version

   > ipfs version 0.33.2
   ```

   At this point, Kubo is usable. However, it's strongly recommended that you first add `ipfs.exe` to your `PATH` using the following steps:

1. Save the current working directory into a temporary variable:

   ```powershell
   $GO_IPFS_LOCATION = pwd
   ```

1. Create a PowerShell profile:

   ```powershell
   if (!(Test-Path -Path $PROFILE)) { New-Item -ItemType File -Path $PROFILE -Force }
   ```

   This command first checks to see if you have a profile set. If you do, it leaves it there and doesn't create a new one. You can view the contents of your profile by opening it in an editor, such as Notepad:

   ```powershell
   notepad $PROFILE
   ```

1. Add the location of your Kubo daemon and add it to PowerShell's `PATH` by truncating it to the end of your PowerShell profile:

   ```powershell
   Add-Content $PROFILE "`n[System.Environment]::SetEnvironmentVariable('PATH',`$Env:PATH+';;$GO_IPFS_LOCATION')"
   ```

1. Load your `$PROFILE`:

   ```powershell
   & $profile   
   ```

1. Navigate to your home folder

   ```powershell
   cd ~
   ```

1. Test that Kubo installed correctly:

   ```powershell
   ipfs --version

   > ipfs version 0.33.2
   ```

:::

::: tab macOS id="install-kubo-mac"

### macOS

> The `brew` installation method supports both Intel and Apple Silicon hardware. If you prefer a manual installation, `darwin-amd64` (Intel) and `darwin-arm64` (Apple Silicon) artifacts available [here](https://dist.ipfs.tech/kubo/v0.21.0/).

1. Navigate to a terminal.

1. Use `brew` to install Kubo:

   ```shell
   brew install ipfs
   ```

1. Confirm your Kubo installation:

   ```bash
   ipfs --version
   ```

   If Kubo is installed, the version number displays. For example:

   ```bash
   > ipfs version 0.33.2
   ```
:::

::: tab FreeBSD id="install-kubo-freeBSD"

### FreeBSD

1. Download the FreeBSD binary from [`dist.ipfs.tech`](https://dist.ipfs.tech/#kubo).

   ```bash
   wget https://dist.ipfs.tech/kubo/v0.33.2/kubo_v0.33.2_freebsd-amd64.tar.gz
   ```

1. Unzip the file:

   ```bash
   tar -xvzf kubo_v0.33.2_freebsd-amd64.tar.gz

   > x kubo/install.sh
   > x kubo/ipfs
   > x kubo/LICENSE
   > x kubo/LICENSE-APACHE
   > x kubo/LICENSE-MIT
   > x kubo/README.md
   ```

1. Move into the `kubo` folder:

   ```bash
   cd kubo
   ```

1. Run the install script:

   ```bash
   doas bash install.sh

   > Moved ./ipfs to /usr/local/bin
   ```

1. Test that Kubo has installed correctly:

   ```bash
   ipfs --version

   > ipfs version 0.33.2
   ```

:::

::: tab OpenBSD id="install-kubo-openBSD"

### OpenBSD

1. Download the OpenBSD binary from [`dist.ipfs.tech`](https://dist.ipfs.tech/#kubo).

   ```bash
   wget https://dist.ipfs.tech/kubo/v0.33.2/kubo_v0.33.2_openbsd-amd64.tar.gz
   ```

1. Unzip the file:

   ```bash
   tar -xvzf kubo_v0.33.2_openbsd-amd64.tar.gz

   > x kubo/install.sh
   > x kubo/ipfs
   > x kubo/LICENSE
   > x kubo/LICENSE-APACHE
   > x kubo/LICENSE-MIT
   > x kubo/README.md
   ```

1. Move into the `kubo` folder:

   ```bash
   cd kubo
   ```

1. Run the install script:

   ```bash
   doas bash install.sh

   > Moved ./ipfs to /usr/local/bin
   ```

1. Test that Kubo has installed correctly:

   ```bash
   ipfs --version

   > ipfs version 0.33.2
   ```

:::

::::




## Build Kubo from source

For the current instructions on how to manually download, compile and build Kubo from source, see the [Build from Source](https://github.com/ipfs/kubo/blob/v0.33.2/README.md#build-from-source) section in the Kubo repository.

## Determining which node to use with the command line

The command line can detect and use any node that's running, unless it's configured to use an external binary file. Here's which node to use for the local daemon or a remote client:

### Local daemon

The local daemon process is automatically started in the CLI with the command `ipfs daemon`. It creates an `$IPFS_PATH/api` file with an [RPC API](../reference/kubo/rpc.md#http-rpc-api-reference) address.

### Remote client

You can install the standalone IPFS CLI client independently and use it to talk to an IPFS Desktop (Kubo) node. Use the [RPC API](../reference/kubo/rpc.md#http-rpc-api-reference) to talk to the `ipfs` daemon.

When an IPFS command executes without parameters, the CLI client checks whether the `$IPFS_PATH/api` file exists and connects to the address listed there.

- If an `$IPFS_PATH` is in the default location (for example, `~/.ipfs` on Linux), then it works automatically and the IPFS CLI client talks to the locally running `ipfs` daemon without any extra configuration.

- If an `$IPFS_PATH` isn't in the default location, use the `--api <rpc-api-addr>` command-line argument. Alternatively, you can set the environment variable to `IPFS_PATH`. `IPFS_PATH` will point to a directory with the `$IPFS_PATH/api` file pointing at the Kubo RPC of the existing `ipfs` daemon instance.

::: tip

If you plan to expose safe subset of RPC API to the public internet with TLS encryption and HTTP authentication, check out the [TLS and HTTP Auth for Kubo with Caddy](../how-to/kubo-rpc-tls-auth.md) guide.

If you are looking for HTTP Fetch API designed for browsers and public internet, with [proper HTTP Cache Control](https://specs.ipfs.tech/http-gateways/path-gateway/#cache-control-response-header), see implementation-agnostic [HTTP Gateway](../reference/http/gateway.md) instead. It can be used in web apps thanks to [Verified Fetch](https://www.npmjs.com/package/@helia/verified-fetch)

:::

#### Most common examples

If you are an IPFS Desktop user, you can install CLI tools and an `.ipfs/api` file is automatically picked up.

If you're not running IPFS Desktop, specify a custom port with `ipfs --api /ip4/127.0.0.1/tcp/<port> id` in the CLI.

You can use `mkdir -p ~/.ipfs && echo "/ip4/<ip>/tcp/<rpc-port>" > ~/.ipfs/api` to avoid passing `--api` every time.

## Next steps

Now that you've installed IPFS Kubo:

- Check out the [IPFS Kubo Tutorial in Guides](../how-to/command-line-quick-start.md), which will guide you through taking a Kubo node online and interacting with the network.
