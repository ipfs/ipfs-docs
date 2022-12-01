---
title: Kubo on the command line
description: Using IPFS Kubo through the command-line allows you to do everything that IPFS Desktop can do, but at a more granular level, since you can specify which commands to run. Learn how to install it here.
current-ipfs-version: v0.17.0
---

# Install Kubo on the command line

In this installation guide, you will install IPFS Kubo in the command line. Kubo was the first implementation of the IPFS protocol, and is the most widely used implementation today. Kubo allows you to do everything that IPFS Desktop can do, but at a more granular level, since you can specify which commands to run. Kubo is written in the Go programming language, and has the following features:

- an IPFS daemon server
- extensive command line tooling
- an HTTP RPC API for controlling the node
- an HTTP Gateway for serving content to HTTP browsers
- binaries for Windows, MacOS, Linux, FreeBSD and OpenBSD

Installing Kubo in the command line is handy for multiple use cases, such as:

- building applications and services on top of an IPFS node. 
- setting up a node without a user interface (which is usually the case with remote servers or virtual machines). 

An example of the IPFS daemon running with Kubo is shown below:
![A terminal window running the IPFS daemon in Ubuntu.](./images/command-line/wsl-running-ipfs-in-linux.png)

## System requirements

IPFS runs on most Windows, MacOS, Linux, FreeBSD and OpenBSD systems. The following minumum system requirements are recommended:

- 512MiB of memory
- At least 2 GB of RAM 
- 2 CPU cores (kubo is highly parallel). 

### Things to note
- On systems with less memory, Kubo may not be completely stable.
If your system is resource-constrained, we recommend that you:

  1. Install OpenSSL and rebuild kubo manually with `make build GOTAGS=openssl`. See the [download and compile](https://github.com/ipfs/kubo/blob/v0.17.0/README.md#download-and-compile-ipfs) section for more information on compiling kubo.
  2. Initialize your daemon with `ipfs init --profile=lowpower`

- The amount of disk space your IPFS installation uses depends on how much data you're sharing. A base installation uses around 12MB of disk space.

- Automatic garbage collection can be enabled via [--enable-gc](/reference/kubo/cli/#ipfs-daemon) and adjusted using [default maximum disk storage](https://github.com/ipfs/kubo/blob/v0.17.0/docs/config.md#datastorestoragemax) for data retrieved from other peers.

## Official binary distributions

The latest, official prebuilt kubo binaries are published on the [dist.ipfs.tech website](https://dist.ipfs.tech#kubo). As soon as a new release of an IPFS Kubo binary is released, it is automatically shown on the Kubo page on `dist.ipfs.tech`. 

> **Note**
> If you are unable to access [dist.ipfs.tech](https://dist.ipfs.tech#kubo), you can also download kubo (go-ipfs) from the project's GitHub [releases](https://github.com/ipfs/kubo/releases/latest) page or `/ipns/dist.ipfs.tech` at the [dweb.link](https://dweb.link/ipns/dist.ipfs.tech#kubo) gateway


The following section provides instructions on how to download and install the latest `kubo` release from `dist.ipfs.tech` using the command-line. Binaries are available for the following operating systems:

| OS      | 32-bit | 64-bit | ARM | ARM-64 |
|---------|--------|--------|-----|--------|
| macOS   | No     | Yes    | No  | Yes    |
| FreeBSD | Yes    | Yes    | Yes | No     |
| Linux   | Yes    | Yes    | Yes | Yes    |
| OpenBSD | Yes    | Yes    | Yes | No     |
| Windows | Yes    | Yes    | No  | No     |


To install the appropriate binary for your operating system, select a tab below.

:::: tabs

::: tab windows id="install-kubo-windows"

### Windows

![Windows icon](./images/command-line/windows-icon.png =250x200)

1. Download the Windows binary from [`dist.ipfs.tech`](https://dist.ipfs.tech/#kubo).

   ```powershell
   cd ~\
   wget https://dist.ipfs.tech/kubo/v0.17.0/kubo_v0.17.0_windows-amd64.zip -Outfile kubo_v0.17.0.zip
   ```

1. Unzip the file to a sensible location, such as `~\Apps\kubo_v0.17.0`.

   ```powershell
   Expand-Archive -Path kubo_v0.17.0.zip -DestinationPath ~\Apps\kubo_v0.17.0
   ```

1. Move into the `kubo_v0.17.0` folder

   ```powershell
   cd ~\Apps\kubo_v0.17.0\kubo
   ```

1. Check that the `ipfs.exe` works:

   ```powershell
   .\ipfs.exe --version

   > ipfs version 0.17.0
   ```

At this point, IPFS is usable. However, it's strongly recommended that you first add `ipfs.exe` to your `PATH` using the following steps:

1. Save the current working directory into a temporary variable:

   ```powershell
   $GO_IPFS_LOCATION = pwd
   ```

1. Create a powershell profile:

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

6. Test that your IPFS path is set correctly by going to your home folder and asking IPFS for the version:

   ```powershell
   cd ~
   ipfs --version

   > ipfs version 0.17.0
   ```

:::

::: tab macOS id="install-kubo-mac"

### macOS

![macOS icon](./images/command-line/apple-icon.png =250x200)

1. Decide which macOS binary to download from [`dist.ipfs.tech`](https://dist.ipfs.tech/#kubo) by determining whether your system uses an Apple or Intel CPU. On most macOS systems, you can determine the system specs by doing the following:

   1. In the upper left hand corner of your screen, click the "Apple" icon. 
   1. In the drop-down menu displayed, select *About this Mac*.
   1. A window with information about your Mac is displayed. 
      - If your system uses Apple Silicon, the specific chip is shown, such as *Apple M1 Pro*.
      - If your system uses an Intel CPU, the specific processor is shown, such as *2.3 GHz 8-Core Intel Core i9*.


1. Download the appropriate macOS binary from [`dist.ipfs.tech`](https://dist.ipfs.tech/#kubo) based on your hardware. For example:

   ```bash
   curl -O https://dist.ipfs.tech/kubo/v0.17.0/kubo_v0.17.0_darwin-amd64.tar.gz
   ```

   > :warning:
   > Ensure that you download and install the appropriate binary, as the binary for an Intel-based system will not work on a system with Apple Silicon, and vice-versa.

   - *If you are using hardware with Apple Silicon, download the `darwin-arm64` binary.* For example, to download the IPFS binary for `Kubo v0.17.0` for an Apple-based system, run the following command:
     ```bash
     curl -O https://dist.ipfs.tech/kubo/v0.17.0/kubo_v0.17.0_darwin-arm64.tar.gz
     ```

   - *If you are using hardware with an Intel Processor, download the `darwin-amd64` binary.* For example, to download the IPFS binary for `Kubo v0.17.0` for an Intel-based system, run the following command:
     ```bash
     curl -O https://dist.ipfs.tech/kubo/v0.17.0/kubo_v0.17.0_darwin-amd64.tar.gz
     ```

1. Unzip the file. For example, to unzip `Kubo v0.17.0` for an Intel-based system:

   ```bash
   tar -xvzf kubo_v0.17.0_darwin-amd64.tar.gz
   ```

   The following output displays:
   ```
   x kubo/
   x kubo/ipfs
   x kubo/install.sh
   ```

1. Navigate to the `kubo` directory:

   ```bash
   cd kubo
   ```

1. Run the install script:

   ```bash
   sudo bash install.sh
   ```

   On successful install, the following displays:
   ```
   > Moved ./ipfs to /usr/local/bin
   ```

1. Confirm that IPFS is installed:

   ```bash
   ipfs --version
   ```

   If IPFS is installed, the IPFS version number is displayed. For example:
   ``` 
   > ipfs version 0.17.0
   ```

:::

::: tab linux id="install-kubo-linux"

### Linux

![Linux icon](./images/command-line/linux-icon.png =250x200)

1. Download the Linux binary from [`dist.ipfs.tech`](https://dist.ipfs.tech/#kubo).

   ```bash
   wget https://dist.ipfs.tech/kubo/v0.17.0/kubo_v0.17.0_linux-amd64.tar.gz
   ```

1. Unzip the file:

   ```bash
   tar -xvzf kubo_v0.17.0_linux-amd64.tar.gz

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

1. Run the install script

   ```bash
   sudo bash install.sh

   > Moved ./ipfs to /usr/local/bin
   ```

1. Test that IPFS has installed correctly:

   ```bash
   ipfs --version

   > ipfs version 0.17.0
   ```

:::

::: tab freeBSD id="install-kubo-freeBSD"

### FreeBSD

1. Download the FreeBSD binary from [`dist.ipfs.tech`](https://dist.ipfs.tech/#kubo).

   ```bash
   wget https://dist.ipfs.tech/kubo/v0.17.0/kubo_v0.17.0_freebsd-amd64.tar.gz
   ```

1. Unzip the file:

   ```bash
   tar -xvzf kubo_v0.17.0_freebsd-amd64.tar.gz

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

   ```
   doas bash install.sh

   > Moved ./ipfs to /usr/local/bin
   ```

1. Test that IPFS has installed correctly:

   ```bash
   ipfs --version

   > ipfs version 0.17.0
   ```

:::

::: tab openBSD id="install-kubo-openBSD"

### OpenBSD

1. Download the FreeBSD binary from [`dist.ipfs.tech`](https://dist.ipfs.tech/#kubo).

   ```bash
   wget https://dist.ipfs.tech/kubo/v0.17.0/kubo_v0.17.0_openbsd-amd64.tar.gz
   ```

1. Unzip the file:

   ```bash
   tar -xvzf kubo_v0.17.0_openbsd-amd64.tar.gz

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

   ```
   doas bash install.sh

   > Moved ./ipfs to /usr/local/bin
   ```

1. Test that IPFS has installed correctly:

   ```bash
   ipfs --version

   > ipfs version 0.17.0
   ```

:::

::::

## Determining which node to use with the command line

The command line can detect and use any node that's running, unless it's configured to use an external binary file. Here's which node to use for the local daemon or a remote client:

### Local daemon

The local daemon process is automatically started in the CLI with the command `ipfs daemon`. It creates an `$IPFS_PATH/api` file with an [RPC API](../reference/kubo/rpc.md#http-rpc-api-reference) address.

### Remote client

You can install the standalone IPFS CLI client independently and use it to talk to an IPFS Desktop node or a Brave node. Use the [RPC API](../reference/kubo/rpc.md#http-rpc-api-reference) to talk to the `ipfs` daemon.

When an IPFS command is executed without parameters, the CLI client checks whether the `$IPFS_PATH/api` file exists and connects to the address listed there.

- If an `$IPFS_PATH` is in the default location (for example, `~/.ipfs` on Linux), then it works automatically and the IPFS CLI client talks to the locally running `ipfs` daemon without any additional configuration.

- If an `$IPFS_PATH` is not in the default location, use the `--api <rpc-api-addr>` command-line argument. Alternatively, you can set the environment variable to `IPFS_PATH`. `IPFS_PATH` will point to a directory with the api file with the existing `ipfs` daemon instance.

#### Most common examples

If you are an IPFS Desktop user, you can install CLI tools and an `.ipfs/api` file is automatically picked up.

If you're not running IPFS Desktop, specify a custom port with `ipfs --api /ip4/127.0.0.1/tcp/<port> id` in the CLI.

For example, Brave RPC API runs on port 45001, so the CLI can talk to the Brave daemon using `ipfs --api /ip4/127.0.0.1/tcp/45001 id`. You can use `mkdir -p ~/.ipfs && echo "/ip4/<ip>/tcp/<rpc-port>" > ~/.ipfs/api` to avoid passing `--api` every time.

## Next steps

Now that you've got an IPFS node installed, you can start building applications and services on top of the network! Check out the Command-line- quicks start guide and jump straight to the [Initialize the repository section](../how-to/command-line-quick-start.md#initialize-the-repository).
