---
title: Take a snapshot
legacyUrl: https://docs.ipfs.io/guides/examples/snapshots/
description: Learn about how to take and use snapshots of files in IPFS, the InterPlanetary File System.
---

# Take a snapshot

Let's take a quick look at how IPFS can be used to take basic _snapshots_ of files — an action that enables you to access those files later in the same state as they were when you "snapshotted" them.

Save your directory:

```bash
ipfs add -r ~/code/myproject
```

Note the hash:

```bash
echo $hash `date` >> snapshots
```

Or all at once:

```bash
echo `ipfs add -q -r ~/code/myproject | tail -n1` `date` >> snapshots
```

(Note: the `-q` makes the output only contain the hashes, and piping through `tail -n1` ensures that only the hash of the top folder is output.)

Make sure to have the placeholders for the mount points:

```bash
sudo mkdir /ipfs /ipns
sudo chown `whoami` /ipfs /ipns
```

You will need to have `FUSE` (Filesystem in Userspace) installed on your machine in order to be able to `mount` directories from the ipfs. You can find instructions for how to install `FUSE` [in the `go-ipfs` docs](https://github.com/ipfs/go-ipfs/blob/master/docs/fuse.md).

View your snapshots live:

```bash
ipfs mount
ls /ipfs/$hash/

# Or

cd /ipfs/$hash/
ls
```

Through the FUSE interface, you'll be able to access your files exactly as they were when you took the snapshot.
