---
title: Update procedure
---

# Update procedure

There are two ways to update your IPFS installation. [Using `ipfs-update`](#use-ipfs-update) is generally the best and easiest option. You can also [update manually](#manual-process).

## Use `ipfs-update`

`ipfs-update` is a CLI tool to help update and install IPFS easily. You can [download it from dist.ipfs.io](https://dist.ipfs.io/#ipfs-update).

1. Make sure you have `ipfs-update` installed:

   ```bash
   ipfs-update --version

   > ipfs-update version 1.6.0
   ```

1. Tell `ipfs-update` to update to `Go-IPFS 0.5`:

   ```bash
   ipfs-update install 0.5.0

   > Installation complete!
   ```

1. That's it!

## Manual process

1. Download [`go-ipfs_v0.5.0_darwin-386.tar.gz` from GitHub](https://github.com/ipfs/go-ipfs/releases/tag/v0.5.0).

   ```bash
   wget https://github.com/ipfs/go-ipfs/releases/download/v0.5.0/go-ipfs_v0.5.0_darwin-amd64.tar.gz
   ```

2. Unzip the file:

   ```bash
   tar -xvzf go-ipfs_v0.5.0_darwin-amd64.tar.gz

   > x go-ipfs/install.sh
   > x go-ipfs/ipfs
   > x go-ipfs/LICENSE
   > x go-ipfs/LICENSE-APACHE
   > x go-ipfs/LICENSE-MIT
   > x go-ipfs/README.md
   ```

3. Move into the `go-ipfs` folder and run the install script:

   ```bash
   bash install.sh

   > Moved ./ipfs to /usr/local/bin
   ```

4. Run the IPFS daemon. It will ask you to run the migrations:

   ```bash
   ipfs daemon

   > Initializing daemon...
   > go-ipfs version: 0.5.0
   > Repo version: 9
   > System version: amd64/linux
   > Golang version: go1.13.8
   > Found outdated fs-repo, migrations need to be run.
   > Run migrations now? [y/N]
   ```

5. Enter `y` and press enter. Once the migrations have finished, the daemon will start:

   ```bash
   y

   >     => Looking for suitable fs-repo-migrations binary.
   >     => None found, downloading.
   >     => Running: /tmp/go-ipfs-migrate751318189/fs-repo-migrations -to 9 -y
   > Found fs-repo version 7 at /home/vagrant/.ipfs
   > ===> Running migration 7 to 8...
   >
   > ...
   >
   > Daemon is ready
   ```

6. Press `CTRL` + `c` to close the daemon.
7. Check that the latest version of IPFS installed properly:

   ```bash
   ipfs --version

   > ipfs version 0.5.0
   ```

8. That's it!
