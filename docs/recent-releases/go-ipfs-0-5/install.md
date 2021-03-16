---
title: Install Go-IPFS
---

# Install Go-IPFS

The install process for this release is the same as previous versions of Go-IPFS. If you already have IPFS installed and want to keep all your files and configuration, take a look at the [Update Process](/recent-releases/go-ipfs-0-5/update-procedure) for this release.

## Windows

1. Download the Windows binary from [`dist.ipfs.io`](https://dist.ipfs.io/#go-ipfs).

   ```powershell
   cd ~\
   wget https://dist.ipfs.io/go-ipfs/v0.5.0/go-ipfs_v0.5.0_windows-amd64.zip -Outfile go-ipfs_v0.5.0.zip
   ```

2. Unzip the file and move it somewhere handy.

   ```powershell
   Expand-Archive -Path go-ipfs_v0.5.0.zip -DestinationPath ~\Apps\go-ipfs_v0.5.0
   ```

3. Move into the `go-ipfs_v0.5.0` folder and check that the `ipfs.exe` works:

   ```powershell
   cd ~\Apps\go-ipfs_v0.5.0\go-ipfs
   .\ipfs.exe --version

   > ipfs version 0.5.0
   ```

   While you can use IPFS right now, it's better to add `ipfs.exe` to your `PATH` by using the following steps.

4. Print the current working directory and copy it to your clipboard:

   ```powershell
   pwd

   > Path
   > ----
   > C:\Users\Johnny\Apps\go-ipfs_v0.5.0\go-ipfs
   ```

5. Add the address you just copied to PowerShell's `PATH` by adding it to the end of the `profile.ps1` file stored in `Documents\WindowsPowerShell`:

   ```powershell
   Add-Content C:\Users\Johnny\Documents\WindowsPowerShell\profile.ps1 "[System.Environment]::SetEnvironmentVariable('PATH',`$Env:PATH+';;C:\Users\Johnny\Apps\go-ipfs_v0.5.0\go-ipfs')"
   ```

6. Close and reopen your PowerShell window. Test that your IPFS path is set correctly by going to your home folder and asking IPFS for the version:

   ```powershell
   cd ~
   ipfs --version

   > ipfs version 0.5.0
   ```

## macOS

1. Download the macOS binary from [`dist.ipfs.io`](https://dist.ipfs.io/#go-ipfs).

   ```bash
   wget https://dist.ipfs.io/go-ipfs/v0.5.0/go-ipfs_v0.5.0_darwin-amd64.tar.gz
   ```

1. Unzip the file:

   ```bash
   tar -xvzf go-ipfs_v0.5.0_darwin-amd64.tar.gz

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

   > ipfs version 0.5.0
   ```

## Linux

1. Download the Linux binary from [`dist.ipfs.io`](https://dist.ipfs.io/#go-ipfs).

   ```bash
   wget https://dist.ipfs.io/go-ipfs/v0.5.0/go-ipfs_v0.5.0_linux-amd64.tar.gz
   ```

1. Unzip the file:

   ```bash
   tar -xvzf go-ipfs_v0.5.0_linux-amd64.tar.gz

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

   > ipfs version 0.5.0
   ```
