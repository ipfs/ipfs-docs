---
title: Command-line
description: Using IPFS through the command-line allows you to do everything that IPFS Desktop can do, but at a more granular level since you can specify which commands to run. Learn how to install it here.
---

# Command-line

Installing IPFS through the command-line is handy if you plan on building applications and services on top of an IPFS node. This method is also useful if you're setting up a node without a user interface, usually the case with remote servers or virtual machines. Using IPFS through the command-line allows you to do everything that IPFS Desktop can do, but at a more granular level since you can specify which commands to run.

![A terminal window running IPFS daemon.](./images/terminal-showing-ipfs-daemon-ubuntu.png)

## System requirements

IPFS is a light-weight application in terms of CPU and RAM usage. You can run an IPFS node on a Raspberry Pi. However, how much disk space your IPFS installation takes up depends on how much data you're sharing. A base installation takes up about 12MB of disk space, and the [default maximum disk storage](/how-to/configure-a-node) is set to 10GB.

## Official distributions

The IPFS team manages the [dist.ipfs.io website](https://dist.ipfs.io/) to help users quickly find the latest version of every IPFS package. As soon as a new release of an IPFS package comes out, it is automatically shown on `dist.ipfs.io`, so you can be sure you're getting the latest software. These steps detail how to download and install Go-IPFS 0.7.0 from `dist.ipfs.io` using the command-line.

| [Windows](#windows)                                                          | [macOS](#macos)                                                        | [Linux](#linux)                                                        |
| ---------------------------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| [![Windows icon](./images/command-line/windows-icon.png =250x200)](#windows) | [![macOS icon](./images/command-line/apple-icon.png =250x200)](#macos) | [![Linux icon](./images/command-line/linux-icon.png =250x200)](#linux) |

### Windows

1. Download the Windows binary from [`dist.ipfs.io`](https://dist.ipfs.io/#go-ipfs).

   ```powershell
   cd ~\
   wget https://dist.ipfs.io/go-ipfs/v0.7.0/go-ipfs_v0.7.0_windows-amd64.zip -Outfile go-ipfs_v0.7.0.zip
   ```

2. Unzip the file and move it somewhere handy.

   ```powershell
   Expand-Archive -Path go-ipfs_v0.7.0.zip -DestinationPath ~\Apps\go-ipfs_v0.7.0
   ```

3. Move into the `go-ipfs_v0.7.0` folder and check that the `ipfs.exe` works:

   ```powershell
   cd ~\Apps\go-ipfs_v0.7.0\go-ipfs
   .\ipfs.exe --version

   > ipfs version 0.7.0
   ```

   While you can use IPFS right now, it's better to add `ipfs.exe` to your `PATH` by using the following steps.

4. Print the current working directory and copy it to your clipboard:

   ```powershell
   pwd

   > Path
   > ----
   > C:\Users\Johnny\Apps\go-ipfs_v0.7.0\go-ipfs
   ```

5. Add the address you just copied to PowerShell's `PATH` by adding it to the end of the `profile.ps1` file stored in `Documents\WindowsPowerShell`:

   ```powershell
   Add-Content C:\Users\Johnny\Documents\WindowsPowerShell\profile.ps1 "[System.Environment]::SetEnvironmentVariable('PATH',`$Env:PATH+';;C:\Users\Johnny\Apps\go-ipfs_v0.7.0\go-ipfs')"
   ```

6. Close and reopen your PowerShell window. Test that your IPFS path is set correctly by going to your home folder and asking IPFS for the version:

   ```powershell
   cd ~
   ipfs --version

   > ipfs version 0.7.0
   ```

### macOS

1. Download the macOS binary from [`dist.ipfs.io`](https://dist.ipfs.io/#go-ipfs).

   ```bash
   wget https://dist.ipfs.io/go-ipfs/v0.7.0/go-ipfs_v0.7.0_darwin-amd64.tar.gz
   ```

1. Unzip the file:

   ```bash
   tar -xvzf go-ipfs_v0.7.0_darwin-amd64.tar.gz

   > x go-ipfs/install.sh
   > x go-ipfs/ipfs
   > x go-ipfs/LICENSE
   > x go-ipfs/LICENSE-APACHE
   > x go-ipfs/LICENSE-MIT
   > x go-ipfs/README.md
   ```

1. Move into the `go-ipfs` folder and run the install script:

   ```bash
   cd go-ipfs
   bash install.sh

   > Moved ./ipfs to /usr/local/bin
   ```

1. Check that IPFS installed:

   ```bash
   ipfs --version

   > ipfs version 0.7.0
   ```

### Linux

1. Download the Linux binary from [`dist.ipfs.io`](https://dist.ipfs.io/#go-ipfs).

   ```bash
   wget https://dist.ipfs.io/go-ipfs/v0.7.0/go-ipfs_v0.7.0_linux-amd64.tar.gz
   ```

1. Unzip the file:

   ```bash
   tar -xvzf go-ipfs_v0.7.0_linux-amd64.tar.gz

   > x go-ipfs/install.sh
   > x go-ipfs/ipfs
   > x go-ipfs/LICENSE
   > x go-ipfs/LICENSE-APACHE
   > x go-ipfs/LICENSE-MIT
   > x go-ipfs/README.md
   ```

1. Move into the `go-ipfs` folder and run the install script:

   ```bash
   cd go-ipfs
   sudo bash install.sh

   > Moved ./ipfs to /usr/local/bin
   ```

1. Test that IPFS has installed correctly:

   ```bash
   ipfs --version

   > ipfs version 0.7.0
   ```

## Compile manually

Manually compiling IPFS is a fairly involved process that changes frequently. It can be handy if you'd like to build a specific branch or use the _bleeding-edge_ version of Go-IPFS. See the [`ipfs/go-ipfs` GitHub repository for details →](https://github.com/ipfs/go-ipfs)

## Next steps

Now that you've got an IPFS node installed, you can start building applications and services on top of the network! Check out the Command-line- quicks start guide and jump straight to the [Initialize the repository section](http://docs.ipfs.io/how-to/command-line-quick-start/#initialize-the-repository).
