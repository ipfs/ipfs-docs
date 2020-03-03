---
title: Move an IPFS installation
---

# Move an IPFS installation

This page walks through how to move your IPFS installation from one system to another. This process is cross-platform compatible and is especially useful for readers who are changing operating systems. The process is to grab the `.ipfs` folder from the _home_ directory of the _doner_ system, and copy it over to _home_ directory on the receiving system.

This process is not a backup procedure; do not treat it as such. Many things can go wrong with this process, most of which relate to _peer IDs_. Since we are duplicating an `.ipfs` installation folder, both IPFS clients have the same peer ID. This issue is ok as long as you delete the old _doner_ installation once the copy is complete. Having two IPFS installations with the same peer ID causes substantial problems and could result in loss of data.

## Move installation

The easiest way to move your IFPS installation is to grab the `.ipfs` folder, and move it to another destination.

### Linux and macOS

1. Stop any IPFS daemons, services, or applications from running.
1. In a terminal, move to where your IPFS repository is stored, likely your _home_ folder:

    ```bash
    cd ~/
    ```

1. Make a copy of the `.ipfs` directory:

    ```bash
    cp --recursive --verbose .ipfs ipfs-from-linux

    > '.ipfs' -> 'ipfs-from-linux'
    > '.ipfs/datastore_spec' -> 'ipfs-backup/data'
    > ...
    ```

1. You now have a copy of your IPFS repository within the `ipfs-backup`.

### Windows

1. Stop any IPFS daemons, services, or applications from running.
1. Open the file explorer and go to **C:** → **Users** → **Your Username**.
1. Select the **View** tab at the top of the file explorer window, and check the **Hidden items** checkbox.
1. Find the `.ipfs` within your user's _home_ folder. This is usually `C:\Users\Your Username\.ipfs`.
1. Copy this folder to somewhere convenient like the `Desktop`.

## Restore installation

Once you have a backup of your IPFS repository in `ipfs-backup`, you can move it to the computer you want to restore to. Once there, you can restore your IPFS repository.

### Linux and macOS

1. Stop any IPFS daemons, services, or applications from running.
1. In a terminal, move to where your IPFS repository is stored, likely your _home_ folder:

    ```bash
    cd ~/
    ```

1. Move your current IPFS repository to another folder. If something goes wrong you can restore your installation from here:

    ```bash
    mv .ipfs ipfs-old
    ```

1. Move your backup IPFS repository to `.ipfs`:

    ```bash
    mv ipfs-backup .ipfs
    ```

1. Start an IPFS daemon:

    ```bash
    ipfs daemon

    > Initializing daemon...
    > go-ipfs version: 0.5.0-dev-a22dc826c
    > Repo version: 7
    > ...
    > Daemon is ready
    ```

1. If everything is working fine, you can delete your old IPFS repository:

    ```bash
    rm -rf .ipfs-old
    ```

### Windows

1. If restoring to the IPFS Desktop application, open the application at least once before attempting to restore anything.
1. Stop any IPFS daemons, services, or applications from running.
1. Open the file explorer and go to `C:\Users\Your Username`.
1. Select the **View** tab at the top of the file explorer window, and check the **Hidden items** checkbox.
1. Find the `.ipfs` within your user's _home_ folder. The full address is usually something like `C:\Users\Your Username\.ipfs`.
1. Rename the `.ipfs` folder to `ipfs-old`. We can restore from `ipfs-old` if anything goes wrong.
1. Copy your backup IPFS repository into your user's _home_ folder and rename it to `.ipfs`.
1. Open the IPFS Desktop application or run `ipfs daemon` with Powershell. Everything should start, and your IPFS repository should restore normally.

## Windows Subsystem for Linux

If you have IPFS installed in the Windows Subsystem for Linux, you can move your IPFS repository from Linux into your Windows environment. This process overwrites the IPFS repository in Windows.

1. On Windows, open the IPFS Desktop application or run an `ipfs daemon`. Do this at least once.
1. Stop any IPFS daemons, services, or applications from running in your Linux and Windows environments.
1. Copy your Linux IPFS repository to Windows. This process overwrites the IPFS repository in Windows:

    ```bash
    cp --recursive --verbose ~/.ipfs /mnt/c/Users/Your Username/
    ```

1. On Windows, open the IPFS Desktop application or run an `ipfs daemon`. Everything should open successfully.

## Troubleshooting

Here are some common issues you might run into when moving your IPFS installation.

### Linux and macOS

#### IPFS daemon doesn't run successfully

If `ipfs daemon` doesn't run successfully then you can restore your old IPFS repository, assuming you made a copy:

```bash
mv .ipfs ipfs-backup-broken
mv .ipfs-old .ipfs
```

Running `ipfs daemon` now loads your old IPFS repository. Try repeating the backup and restore steps. Make sure to stop any IPFS services, daemons, or applications when backing up and restoring an IPFS repository.

### Windows

#### IPFS Desktop has an error

Make sure to open the IPFS Desktop application at least once before attempting to move any IPFS repositories. The IPFS Desktop relies upon another directory called `.ipfs-desktop`. The migration sometimes fails if this folder does not exist.

#### IPFS Desktop won't open

In your user's _home_ folder, rename `.ipfs` and `.ipfs-desktop` to `ipfs-broken` and `ipfs-desktop-broken` respectively. Open the IPFS Desktop application; this creates new `.ipfs` and `.ipfs-desktop` folders. Close the IPFS desktop application and replace `.ipfs` with `ipfs-broken`. If the IPFS desktop application opens, then you now know that the original `.ipfs-desktop` folder was the issue. If the IPFS desktop application doesn't open, then the original `.ipfs` folder may be the issue. If both original folders are causing issues, you may have a corrupted database. If this is the case, post your issue on the [IPFS forums](https://discuss.ipfs.io/).
