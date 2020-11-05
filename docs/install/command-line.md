---
title: Command-line
description: Using IPFS through the command-line allows you to do everything that IPFS Desktop can do, but at a more granular level since you can specify which commands to run. Learn how to install it here.
---

# Command-line

Installing IPFS through the command-line is handy if you plan on building applications and services on top of an IPFS node. This method is also useful if you're setting up a node without a user interface, usually the case with remote servers or virtual machines. Using IPFS through the command-line allows you to do everything that IPFS Desktop can do, but at a more granular level since you can specify which commands to run.

There are several different ways to install IPFS using the command-line. The easiest method is by using a package manager. If you don't have one installed, or would like a more up-to-date version of IPFS, you can use [dist.ipfs.io](dist.ipfs.io) to grab the latest package and install it. Lastly, if your the kind of person that likes to bake a cake themselves rather than buying a premade one, there are manual complilation instructions available.

## Package managers

Most operating systems have a package manager, although they may not come pre-installed. Both Windows and macOS have open-source package managers that must be installed by the user. Ubuntu comes with the Snap package manager pre-installed. Package managers download packages, install applications, and keep everything up-to-date. They're the easiest way to install IPFS from the command-line.

| Operating system | Package manager                                    | Install command      |
| ---------------- | -------------------------------------------------- | -------------------- |
| Windows          | [Chocolatey](https://chocolatey.org/packages/ipfs) | `choco install ipfs` |
| macOS            | [Homebrew](https://formulae.brew.sh/formula/ipfs)  | `brew install ipfs`  |
| Ubuntu           | [Snap](https://snapcraft.io/ipfs)                  | `snap install ipfs`  |

Although we try our best to keep the package manager releases up to date, they sometimes lag behind the Go-IPFS GitHub releases page by a few days. If you'd like to install a release the very same day it comes out, use the [official distributions](#official-distributions) from [dist.ipfs.io](dist.ipfs.io).

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

   While you can use IPFS right now, it's better to add `ipfs.exe` to your `PATH.` by using the following steps.

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
   bash install.sh

   > Moved ./ipfs to /usr/local/bin
   ```

1. Check that IPFS installed properly:

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

## IPFS Update

IPFS Update is a command-line tool originally used to help users update their IPFS version. It has since been upgraded to allow users to _install_ Go-IPFS as well. The easiest way to install IPFS Update is by using the pre-built binaries, detailed below. See the [project repository](https://github.com/ipfs/ipfs-update#from-source) if you'd prefer to build it from source.

### Install

You can download pre-built binaries from [`dist.ipfs.io`](https://dist.ipfs.io/#ipfs-update). Binaries are also available from the [IPFS Update GitHub release page](https://github.com/ipfs/ipfs-update/releases).

#### Windows

1. Download the Windows binary from [`dist.ipfs.io`](https://dist.ipfs.io/#ipfs-update).

   ```powershell
   cd ~
   wget https://dist.ipfs.io/ipfs-update/v1.6.0/ipfs-update_v1.6.0_windows-amd64.zip -Outfile ipfs-update_v1.6.0_windows-amd64.zip
   ```

2. Unzip the file and move it somewhere handy.

   ```powershell
   Expand-Archive -Path ipfs-update_v1.6.0_windows-amd64.zip -DestinationPath ~\Apps\ipfs-update_v1.6.0
   ```

3. Move into the `ipfs-update_v1.6.0` folder and check that the `ipfs-update.exe` works:

   ```powershell
   cd Apps\ipfs-update_v1.6.0\ipfs-update\
   .\ipfs-update.exe --version

   > ipfs-update version 1.6.0
   ```

   While you can use `ipfs-update`right now, it's better to add `ipfs-update.exe` to your `PATH.` by using the following steps.

4. Print the current working directory and copy it to your clipboard:

   ```powershell
   pwd

   > Path
   > ----
   > C:\Users\Johnny\Apps\ipfs-update_v1.6.0\ipfs-update
   ```

5. Check if a profile file for PowerShell already exists:

   ```powershell
   Test-Path $profile

   > false
   ```

   If a profile already file exists, skip the next step and proceed with step 7.

6. Create a new PowerShell profile file:

```powershell
New-Item -path $profile -type file –force

> Mode                LastWriteTime         Length Name
> ----                -------------         ------ ----
> -a----        11/5/2020   6:38 PM              0 Microsoft.PowerShell_profile.ps1
```

7. Add the address you just copied to PowerShell's `PATH` by adding it to the end of the `profile.ps1` file stored in `Documents\WindowsPowerShell`:

   ```powershell
   Add-Content C:\Users\Johnny\Documents\WindowsPowerShell\Microsoft.PowerShell_profile.ps1 "[System.Environment]::SetEnvironmentVariable('PATH',`$Env:PATH+';;C:\Users\Johnny\Apps\ipfs-update_v1.6.0\ipfs-update')"
   ```

8. Close and reopen your PowerShell window. Test that your `PATH` is set correctly by going to your home folder and asking `ipfs-update` for the version:

   ```powershell
   cd ~
   ipfs-update --version

   > ipfs-update version 1.6.0
   ```

   If you get an error during the next start of PowerShell while loading the profile file you need to change `ExecutionPolicy` of PowerShell to `Unrestricted` as described in the [Microsoft PowerShell documentation](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.security/set-executionpolicy?view=powershell-7)

#### macOS

1. Download the macOS binary from [`dist.ipfs.io`](https://dist.ipfs.io/#ipfs-update).

   ```bash
   curl https://dist.ipfs.io/ipfs-update/v1.6.0/ipfs-update_v1.6.0_darwin-amd64.tar.gz --output ipfs-update_v1.6.0_darwin-amd64.tar.gz
   ```

2. Unzip the file:

   ```bash
   tar -xvzf ipfs-update_v1.6.0_darwin-amd64.tar.gz

   > x ipfs-update/install.sh
   > x ipfs-update/ipfs-update
   ```

3. Move into the `ipfs-update` folder and run the install script:

   ```bash
   cd ipfs-update
   sudo bash install.sh

   > installed /usr/local/bin/ipfs-update
   ```

4. Check that `ipfs-update` installed properly:

   ```bash
   ipfs-update --version

   > ipfs-update version 1.6.0
   ```

#### Linux

1. Download the Linux binary from [`dist.ipfs.io`](https://dist.ipfs.io/#ipfs-update).

   ```bash
   wget https://dist.ipfs.io/ipfs-update/v1.6.0/ipfs-update_v1.6.0_darwin-amd64.tar.gz
   ```

2. Unzip the file:

   ```bash
   tar -xvzf ipfs-update_v1.6.0_darwin-amd64.tar.gz

   > x ipfs-update/install.sh
   > x ipfs-update/ipfs-update
   ```

3. Move into the `ipfs-update` folder and run the install script:

   ```bash
   cd ipfs-update
   sudo bash install.sh

   > installed /usr/local/bin/ipfs-update
   ```

4. Test that `ipfs-update` has installed correctly:

   ```bash
   ipfs-update --version

   > ipfs-update version 1.6.0
   ```

### Install using IPFS Update

Run `ipfs-update install` followed by the version of Go-IPFS you want to install:

```bash
ipfs-update install 0.5.0
```

To install the latest release of Go-IPFS use the `latest` tag:

```bash
ipfs-update install latest
```

`ipfs-update install` downloads, tests, and installs the specified version of Go-IPFS. If a version of IPFS is already installed, that version is _stashed_ and can be reverted to later.

### Downgrade using IPFS Update

Use the `revert` function to roll-back to a previous version of Go-IPFS.

```bash
ipfs-update revert
```

`ipfs-update revert` reverts to the previously installed version of Go-IPFS. This is useful if the newly installed version has issues and you would like to switch back to your older stable installation.

### Uninstall `ipfs-update`

To uninstall IPFS Update, delete the binary and `ipfs-update` from your `PATH` variable.

#### Windows

1. Find the location of the `ipfs-update.exe` file.

   ```powershell
   gci -recurse -filter ipfs-update.exe -File -ErrorAction SilentlyContinue

   > Directory: C:\Users\Johnny\Apps\ipfs-update_v1.6.0\ipfs-update
   ```

2. Remove the `ipfs-update` directory.

   ```powershell
   Remove-Item -Recurse -Force C:\Users\Johnny\Apps\ipfs-update_v1.6.0
   ```

3. Update the `PATH` variable as described in the [Microsoft documentation on how to update/edit/delete your PATH](https://docs.microsoft.com/en-us/cpp/build/setting-the-path-and-environment-variables-for-command-line-builds?view=msvc-160)

#### Linux & macOS

1. Find the location of the `ipfs-update` file.

   ```bash
   sudo find / -name ipfs-update

   /usr/local/bin/ipfs-update
   ```

2. Remove the file:

   ```bash
   sudo rm /usr/local/bin/ipfs-update
   ```

## Compile manually

Manually compiling IPFS is a fairly involved process that changes frequently. It can be handy if you'd like to build a specific branch or use the _bleeding-edge_ version of Go-IPFS. See the [`ipfs/go-ipfs` GitHub repository for details →](https://github.com/ipfs/go-ipfs)

## Next steps

Now that you've got an IPFS node installed, you can start building applications and services on top of the network! Check out the Command-line- quicks start guide and jump straight to the [Initialize the repository section](http://docs.ipfs.io/how-to/command-line-quick-start/#initialize-the-repository).
