---
title: Default profile
legacyUrl: https://docs.ipfs.io/guides/examples/default-profile/
description: Your profile defines which file-system and data-store your IPFS node will use, along with other configuration options. Learn how to set, change, and reset your profile.
---

# Configure a default profile and switching between profiles

The profile of your IPFS node allows you to specify which file-system or data-store you want to use. Changing these options will affect the performance of your node. For example, if you want to have a faster datastore for your node, you can use the `badgerds` profile. If you're running your node on a low-power device like a raspberry-pi, you can use the `low-power` profile. Profiles have been developed to customize your IPFS node to perform best under given conditions.

## Default profile


## Find your current profile

Your IPFS profile is found within your node's `config` file. The default location for the `config` file is `~/.ipfs/config`. If you have set an `$IPFS_PATH` variable you can find your `config` file at `$IPFS_PATH/config`. Use `grep` to find the currently set profile:

```bash
cat ~/.ipfs/config | grep "prefix"
# or
cat $IPFS_PATH/config | grep "prefix"
```

> "prefix": "flatfs.datastore",
> "prefix": "leveldb.datastore",


IPFS by uses the `flatfs` profile by default. `flatfs` is implemented using leveldb, which is why you also see another line with `leveldb.datastore`, but they both refer to `flatfs` datastore.

If previously you configured your IPFS node to use another profile, let's say `badgerds`, the above command would give you an output similar to the following:

```bash
"prefix": "badger.datastore",
```

This output line refers to profile `badgerds`.


## Reset your profile

If you want to reset your IPFS node profile to the default profile, you can do so by using the following method:

```bash
ipfs config profile apply default-datastore
```

This command would show you the difference between your existing IPFS config and the new configuration. Also, it would overwrite your IPFS `config` file, so it's always better to create a backup of your existing ipfs configuration before running this command.

## Converting profiles

Not all profiles are compatible with each other simply because they use very different technologies for storing the data inside the datastores. For instance, if you want to convert `badgerds` to `default-datastore`, you would have to use another helper tool called [ipfs-ds-convert](https://dist.ipfs.io/#ipfs-ds-convert) to convert the datastore to the required format. 

Install `ipfs-ds-convert` tool from the given link and run the following command to finally convert the datastore:

```bash
ipfs-ds-convert convert
```

This can take a very long time to complete depending on the size of the datastore. If running this on a headless server it's recommended to use something like `screen` or `tmux` to run this command in a persistent shell.

After the above command finishes, your IPFS node should be reset to the default profile.
