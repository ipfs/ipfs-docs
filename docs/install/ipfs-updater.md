---
title: IPFS updater
description: The IPFS updater is a command-line tool originally used to help users update their IPFS version. Learn how to install, upgrade, and downgrade Go-IPFS using the IPFS updater.
current-ipfs-updater-version: v1.8.0
---

# IPFS updater

The IPFS updater is a command-line tool originally used to help users update their IPFS version. It has since been upgraded to allow users to _install_ Go-IPFS as well. The easiest way to install the IPFS updater is by using the pre-built binaries, detailed below. See the [project repository](https://github.com/ipfs/ipfs-update#from-source) if you'd prefer to build it from source.

## Install updater

You can download pre-built binaries from [`dist.ipfs.io`](https://dist.ipfs.io/#ipfs-update). Binaries are also available from the [IPFS Update GitHub release page](https://github.com/ipfs/ipfs-update/releases).

### Windows

1. Download the Windows binary from [`dist.ipfs.io`](https://dist.ipfs.io/#ipfs-update).

   ```powershell
   cd ~
   wget https://dist.ipfs.io/ipfs-update/v1.8.0/ipfs-update_v1.8.0_windows-amd64.zip -Outfile ipfs-update_v1.8.0_windows-amd64.zip
   ```

2. Unzip the file and move it somewhere handy:

   ```powershell
   Expand-Archive -Path ipfs-update_v1.8.0_windows-amd64.zip -DestinationPath ~\Apps\ipfs-update_v1.8.0
   ```

3. Move into the `ipfs-update_v1.8.0` folder and check that the `ipfs-update.exe` works:

   ```powershell
   cd Apps\ipfs-update_v1.8.0\ipfs-update\
   .\ipfs-update.exe --version

   > ipfs-update version 1.8.0
   ```

   While you can use `ipfs-update` right now, it's better to add `ipfs-update.exe` to your `PATH` by using the following steps.

4. Print the current working directory and copy it to your clipboard:

   ```powershell
   pwd

   > Path
   > ----
   > C:\Users\Johnny\Apps\ipfs-update_v1.8.0\ipfs-update
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

7. Add the address you just copied to PowerShell's `PATH` by adding it to the end of the `Microsoft.PowerShell_profile.ps1` file stored in `Documents\WindowsPowerShell`:

   ```powershell
   Add-Content C:\Users\Johnny\Documents\WindowsPowerShell\Microsoft.PowerShell_profile.ps1 "[System.Environment]::SetEnvironmentVariable('PATH',`$Env:PATH+';;C:\Users\Johnny\Apps\ipfs-update_v1.8.0\ipfs-update')"
   ```

8. Close and reopen your PowerShell window. Test that your `PATH` is set correctly by going to your home folder and asking `ipfs-update` for the version:

   ```powershell
   cd ~
   ipfs-update --version

   > ipfs-update version 1.8.0
   ```

   If you get an error during the next start of PowerShell while loading the profile file, you need to change `ExecutionPolicy` of PowerShell to `Unrestricted` as described in the [Microsoft PowerShell documentation](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.security/set-executionpolicy?view=powershell-7).

### macOS

1. Download the macOS binary from [`dist.ipfs.io`](https://dist.ipfs.io/#ipfs-update).

   ```bash
   curl -O https://dist.ipfs.io/ipfs-update/v1.8.0/ipfs-update_v1.8.0_darwin-amd64.tar.gz
   ```

2. Unzip the file:

   ```bash
   tar -xvzf ipfs-update_v1.8.0_darwin-amd64.tar.gz

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

   > ipfs-update version 1.8.0
   ```

### Linux

1. Download the Linux binary from [`dist.ipfs.io`](https://dist.ipfs.io/#ipfs-update).

   ```bash
   wget https://dist.ipfs.io/ipfs-update/v1.8.0/ipfs-update_v1.8.0_linux-amd64.tar.gz
   ```

2. Unzip the file:

   ```bash
   tar -xvzf ipfs-update_v1.8.0_linux-amd64.tar.gz

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

   > ipfs-update version 1.8.0
   ```

## Install IPFS

Run `ipfs-update install` followed by the version of Go-IPFS you want to install:

```bash
ipfs-update install 0.9.0
```

To install the latest release of Go-IPFS use the `latest` tag:

```bash
ipfs-update install latest
```

`ipfs-update install` downloads, tests, and installs the specified version of Go-IPFS. If a version of IPFS is already installed, that version is _stashed_ and can be reverted to later.

## Downgrade IPFS

Use the `revert` function to roll-back to a previous version of Go-IPFS:

```bash
ipfs-update revert
```

`ipfs-update revert` reverts to the previously installed version of Go-IPFS. This is useful if the newly installed version has issues and you would like to switch back to your older stable installation.

## Uninstall updater

To uninstall IPFS Update, delete the binary and `ipfs-update` from your `PATH` variable.

### Windows

1. Find the location of the `ipfs-update.exe` file:

   ```powershell
   gci -recurse -filter ipfs-update.exe -File -ErrorAction SilentlyContinue

   > Directory: C:\Users\Johnny\Apps\ipfs-update_v1.8.0\ipfs-update
   ```

2. Remove the `ipfs-update` directory:

   ```powershell
   Remove-Item -Recurse -Force C:\Users\Johnny\Apps\ipfs-update_v1.8.0
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
