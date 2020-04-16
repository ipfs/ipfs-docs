---
title: Update procedure
---

# Update procedure

1. Download the new build and run it.
2. Run `ipfs daemon`.
3. The daemon will ask if you want to run the migrations:

   ```bash
   ipfs daemon

   > Initializing daemon...
   > go-ipfs version: 0.5.0-rc1
   > Repo version: 9
   > System version: amd64/linux
   > Golang version: go1.13.8
   > Found outdated fs-repo, migrations need to be run.
   > Run migrations now? [y/N]
   ```

4. Enter `y` and press enter. Once the migrations have finished, the daemon will start:

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

5. Press `CTRL` + `c` to close the daemon.
6. Check that the latest version of IPFS installed properly:

   ```bash
   ipfs --version

   > ipfs version 0.5.0-rc1
   ```

7. That's it!
