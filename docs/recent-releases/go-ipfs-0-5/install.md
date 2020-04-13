---
title: Install Go-IPFS
---

# Install Go-IPFS

The install process for this release is the same as previous versions of Go-IPFS. If you already have IPFS installed and want to keep all your files and configuration, take a look at the [Update Process](update-process) for this release.

## Windows

1. Download [`go-ipfs_v0.5.0_windows-386.zip` from GitHub](https://github.com/ipfs/go-ipfs/releases/download/v0.5.0/go-ipfs-v0.5.0_windows-386.zip).

   ```powershell
   cd ~\
   wget https://github.com/ipfs/go-ipfs/releases/download/v0.5.0-rc1/go-ipfs-v0.5.0_windows-386.zip -Outfile go-ipfs-v0.5.0.zip
   ```

1. Unzip the file and move it somewhere handy.

   ```powershell
   Expand-Archive -Path go-ipfs-v0.5.0.zip -DestinationPath ~\Apps\go-ipfs_v0.5.0
   ```

1. Move into the `go-ipfs_v0.5.0` folder and check that the `ipfs.exe` works:

   ```powershell
   cd ~\Apps\go-ipfs_v0.5.0\go-ipfs
   .\ipfs.exe --version

   > ipfs version 0.5.0
   ```

   While you can use IPFS right now, it's better to add `ipfs.exe` to your `PATH.` by using the following steps.

1. Print the current working directory and copy it to your clipboard:

   ```powershell
   pwd

   > Path
   > ----
   > C:\Users\Johnny\Apps\go-ipfs_v0.5.0\go-ipfs
   ```

1. Add the address you just copied to PowerShell's `PATH` by adding it to the end of the `profile.ps1` file stored in `Documents\WindowsPowerShell`:

   ```powershell
   Add-Content C:\Users\Johnny\Documents\WindowsPowerShell\profile.ps1 "[System.Environment]::SetEnvironmentVariable('PATH',`$Env:PATH+';;C:\Users\Johnny\Apps\go-ipfs_v0.5.0\go-ipfs')"
   ```

1. Close and reopen your PowerShell window. Test that your IPFS path is set correctly by going to your home folder and asking IPFS for the version:

   ```powershell
   cd ~
   ipfs --version

   > ipfs version 0.5.0
   ```

## macOS

## Linux
