---
title: Default profile
legacyUrl: https://docs.ipfs.io/guides/examples/default-profile/
description: Your profile defines which file-system and data-store your IPFS node will use, along with other configuration options. Learn how to set, change, and reset your profile.
---

# Configure a default profile and switching between profiles

A profile can be used to tweak the performance of your IPFS node. If you want to have a faster, more performant datastore for your IPFS node, you can use a profile like `badgerds`, but also it requires more memory. If you're running your ipfs node on a low-power device (like a raspberry-pi), you can use a profile like `low-power`. Profiles have been developed to customize your ipfs node to perform best under given conditions.

### Default Profile
By default, IPFS uses `flatfs` profile. This is the most battle-tested and reliable datastore. You can verify this by inspecting your IPFS config file, it's usually located at `$IPFS_PATH/config`. If your `$IPFS_PATH` is not set, then it'll be located at `$HOME/.ipfs/config`.

### Find your current profile
```bash {.line-numbers}
cat $IPFS_PATH/config | grep "prefix"
```

Above command would give you an output similar to this:
```bash
"prefix": "flatfs.datastore",
"prefix": "leveldb.datastore",
```

IPFS by default uses `flatfs` profile, `flatfs` is implemented using leveldb, which is why you also see another line with `leveldb.datastore`, but they both refer to `flatfs` datastore.

If previously you configured your IPFS node to use another profile, let's say `badgerds`, the above command would give you an output similar to the following:
```bash
"prefix": "badger.datastore",
```

This output line refers to profile `badgerds`

Here's a list of all the available profiles for your ipfs node. You can match the profile with any of the following profiles to find what profile is currently being used by your node:

* `server`
* `randomports`
* `default-datastore`
* `local-discovery`
* `test`
* `default-networking`
* `flatfs`
* `badgerds`
* `lowpower`

> If you want to understand more about these profiles, please visit [here](https://github.com/ipfs/go-ipfs/blob/master/docs/config.md)

### Reset IPFS installtion to default profile

If you want to reset your IPFS node profile to the default profile, you can do so by using the following method:

```bash
ipfs config profile apply default-datastore
```

This command would show you the difference between your existing IPFS config and the new configuration. Also, it would overwrite your ipfs config file, so it's always better to create a backup of your existing ipfs configuration before running this command.

## Converting profiles

Not all profiles are compatible with each other simply because they use very different technologies for storing the data inside the datastores. For instance, if you want to convert `badgerds` to `default-datastore`, you would have to use another helper tool called [ipfs-ds-convert](https://dist.ipfs.io/#ipfs-ds-convert) to convert the datastore to the required format. 

Install `ipfs-ds-convert` tool from the given link and run the following command to finally convert the datastore:

```bash
ipfs-ds-convert convert
```

This can take a very long time to complete depending on the size of the datastore. If running this on a headless server it's recommended to use something like `screen` or `tmux` to run this command in a persistent shell.

After the above command finishes, your IPFS node should be reset to the default profile.
