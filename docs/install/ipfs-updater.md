---
title: IPFS updater
description: The IPFS updater is a command-line tool originally used to help users update their IPFS version. Learn how to install, upgrade, and downgrade Kubo using the IPFS updater.
current-ipfs-updater-version: v1.9.0
---

# ipfs-update

The ipfs-update tool is a command-line utility that can be used to install and update Kubo. The easiest way to install ipfs-update is by using the pre-built binaries, detailed below. See the [project repository](https://github.com/ipfs/ipfs-update#from-source) if you'd prefer to build it from source.

## Install ipfs-update

You can download pre-built binaries from [`dist.ipfs.tech`](https://dist.ipfs.tech/#ipfs-update). Binaries are also available from the [IPFS Update GitHub release page](https://github.com/ipfs/ipfs-update/releases).


:::: tabs

::: tab windows id="install-ipfs-update-windows"

### Windows

1. Download the Windows binary from [`dist.ipfs.tech`](https://dist.ipfs.tech/#ipfs-update).

   ```powershell
   wget https://dist.ipfs.tech/ipfs-update/v1.9.0/ipfs-update_v1.9.0_windows-amd64.zip -Outfile ipfs-update_v1.9.0_windows-amd64.zip
   ```

1. Unzip the file to a sensible location, such as `~\Apps\ipfs-update_v1.9.0`:

   ```powershell
   Expand-Archive -Path ipfs-update_v1.9.0_windows-amd64.zip -DestinationPath ~\Apps\ipfs-update_v1.9.0
   ```

1. Move into the `ipfs-update_v1.9.0` folder:

   ```powershell
   cd Apps\ipfs-update_v1.9.0\ipfs-update\
   ```

1. Check that the `ipfs-update.exe` works:

   ```powershell
   .\ipfs-update.exe --version

   > ipfs-update version 1.9.0
   ```

   At this point, ipfs-update is usable. However, it's strongly recommended that you first add `ipfs-update.exe` to your `PATH` using the following steps:

1. Print the current working directory and copy it to your clipboard:

   ```powershell
   pwd

   > Path
   > ----
   > C:\Users\<username>\Apps\ipfs-update_v1.9.0\ipfs-update
   ```

1. Check if a profile file for PowerShell already exists:

   ```powershell
   Test-Path $profile

   > false
   ```

   If a profile already file exists, skip the next step and proceed to step 8.
 
1. Create a new PowerShell profile file:

   ```powershell
   New-Item -path $profile -type file –force

   > Mode                LastWriteTime         Length Name
   > ----                -------------         ------ ----
   > -a----        11/5/2020   6:38 PM              0 Microsoft.PowerShell_profile.ps1
   ```

1. Add the address copied in step 5 to PowerShell's `PATH` by adding it to the end of the `Microsoft.PowerShell_profile.ps1` file stored in `Documents\WindowsPowerShell`:

   ```powershell
   Add-Content C:\Users\Johnny\Documents\WindowsPowerShell\Microsoft.PowerShell_profile.ps1 "[System.Environment]::SetEnvironmentVariable('PATH',`$Env:PATH+';;C:\Users\<username>\Apps\ipfs-update_v1.9.0\ipfs-update')"
   ```

1. Close and reopen your PowerShell window. 


1. Test that your `PATH` is set correctly by going to your home folder and asking `ipfs-update` for the version:

   ```powershell
   ipfs-update --version

   > ipfs-update version 1.9.0
   ```

   :::tip
   If an error occurs on the next startup of PowerShell while loading the profile file, change the PowerShell `ExecutionPolicy` to `Unrestricted`, as described in the [Microsoft PowerShell documentation](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.security/set-executionpolicy?view=powershell-7).
   :::


:::

::: tab macOS id="install-ipfs-update-mac"

### macOS

1. Download the macOS binary from [`dist.ipfs.tech`](https://dist.ipfs.tech/#ipfs-update).

   ```bash
   curl -O https://dist.ipfs.tech/ipfs-update/v1.9.0/ipfs-update_v1.9.0_darwin-amd64.tar.gz
   ```

1. Unzip the file:

   ```bash
   tar -xvzf ipfs-update_v1.9.0_darwin-amd64.tar.gz

   > x ipfs-update/install.sh
   > x ipfs-update/ipfs-update
   ```

1. Move into the `ipfs-update` folder 

   ```bash
   cd ipfs-update
   ```

1. Run the install script:

   ```bash
   sudo bash install.sh

   > installed /usr/local/bin/ipfs-update
   ```

4. Check that `ipfs-update` installed properly:

   ```bash
   ipfs-update --version

   > ipfs-update version 1.9.0
   ```

:::

::: tab linux id="install-ipfs-update-linux"

### Linux

1. Download the Linux binary from [`dist.ipfs.tech`](https://dist.ipfs.tech/#ipfs-update).

   ```bash
   wget https://dist.ipfs.tech/ipfs-update/v1.9.0/ipfs-update_v1.9.0_linux-amd64.tar.gz
   ```

1. Unzip the file:

   ```bash
   tar -xvzf ipfs-update_v1.9.0_linux-amd64.tar.gz

   > x ipfs-update/install.sh
   > x ipfs-update/ipfs-update
   ```

1. Move into the `ipfs-update` folder:

   ```bash
   cd ipfs-update
   ```

1. and run the install script:
   
   ```bash
   sudo bash install.sh

   > installed /usr/local/bin/ipfs-update
   ```

4. Test that `ipfs-update` has installed correctly:

   ```bash
   ipfs-update --version

   > ipfs-update version 1.9.0
   ```

:::

::::

## Install IPFS

The ipfs-update tool can be used to install Kubo. 

- To install a specific Kubo `<version-number>`, run:

  ```bash
  ipfs-update install <version-number>
  ```

- To install the latest release of Kubo, use the `latest` tag:

  ```bash
  ipfs-update install latest
  ```

:::tip
When `ipfs-update install` is run and a version of IPFS is already installed, that version is _stashed_ and can be reverted to later.
:::

## Downgrade IPFS

Use the `revert` function to roll-back to a previous version of Kubo:

```bash
ipfs-update revert
```

`ipfs-update revert` reverts to the previously installed version of Kubo. This is useful if the newly installed version has issues and you would like to switch back to your older stable installation.

## Uninstall updater

To uninstall IPFS Update, delete the binary and `ipfs-update` from your `PATH` variable.

### Windows

1. Find the location of the `ipfs-update.exe` file:

   ```powershell
   gci -recurse -filter ipfs-update.exe -File -ErrorAction SilentlyContinue

   > Directory: C:\Users\Johnny\Apps\ipfs-update_v1.9.0\ipfs-update
   ```

2. Remove the `ipfs-update` directory:

   ```powershell
   Remove-Item -Recurse -Force C:\Users\Johnny\Apps\ipfs-update_v1.9.0
   ```

3. Delete the `ipfs-update` directory from the `PATH` variable. This process differs between Windows installations, so please check the [Microsoft documentation for details](https://docs.microsoft.com/en-us/cpp/build/setting-the-path-and-environment-variables-for-command-line-builds?view=msvc-160).

### Linux & macOS

1. Find the location of the `ipfs-update` file:

   ```bash
   sudo find / -name ipfs-update

   /usr/local/bin/ipfs-update
   ```

2. Remove the file:

   ```bash
   sudo rm /usr/local/bin/ipfs-update
   ```
