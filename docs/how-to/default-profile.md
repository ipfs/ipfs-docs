---
title: Configure a profile
legacyUrl: https://docs.ipfs.io/guides/examples/default-profile/
description: Your profile defines which file-system and data-store your IPFS node will use, along with other configuration options. Learn how to set, change, and reset your profile.
---

# Configure a profile and switch between profiles

The profile of your IPFS node allows you to specify which file-system or data-store you want to use. Changing these options will affect the performance of your node. For example, if you want to have a faster datastore for your node, you can use the `badgerds` profile. If you're running your node on a low-power device like a Raspberry Pi, you can use the `lowpower` profile. Profiles have been developed to customize your IPFS node to perform best under given conditions.

## Find your current profile

Find your IPFS profile within your node's `config` file. The default location for the `config` file is `~/.ipfs/config`. If you have set an `$IPFS_PATH` variable, you can find your `config` file at `$IPFS_PATH/config`. Use `grep` to find the currently set profile:

```bash
cat ~/.ipfs/config | grep "prefix"

> "prefix": "flatfs.datastore",
> "prefix": "leveldb.datastore",
```

IPFS uses the `flatfs` profile by default, which in turn uses LevelDB internally. That's why you see `leveldb.datastore` in the command output, even though both prefixes refer to the `flatfs` datastore in this case.

If you previously configured your IPFS node to use another profile, let's say `badgerds`, the above command output would be slightly different:

```bash
"prefix": "badger.datastore",
```

## Available profiles

Here's a list of all the profiles available for your IPFS node. You can also find them documented in `ipfs config profile --help`.

### Available only when initializing the node

- `flatfs`
  Configures the node to use the flatfs datastore.

  This is the most battle-tested and reliable datastore, but it's significantly slower than the badger datastore.

  Use this datastore if:

  - You need a very simple and very reliable datastore you and trust your filesystem. This datastore stores each block as a separate file in the underlying filesystem, so it's unlikely to lose data, unless there's an issue with the underlying file system.
  - You need to run garbage collection on a small (<= 10GiB) datastore. The default datastore, badger, can leave several gigabytes of data behind when garbage collecting.
  - You're concerned about memory usage. In its default configuration, badger can use up to several gigabytes of memory.

- `badgerds`
  Configures the node to use the badger datastore.

  This is the fastest datastore. Use this datastore if performance, especially when adding many gigabytes of files, is critical.

  However, this datastore will not properly reclaim space when your datastore is smaller than several gigabytes. If you run IPFS with '--enable-gc' (you have enabled block-level garbage collection), you plan on storing very little data in
  your IPFS node, and disk usage is more critical than performance, consider using
  `flatfs`.

  This datastore uses up to several gigabytes of memory.

### Available at any time
- `default-datastore`
  Restores the default datastore (flatfs).

  Read the flatfs profile description for more information on this datastore.

- `server`
  Disables local host discovery, recommended when running IPFS on machines with public IPv4 addresses.

- `local-discovery`
  Sets default values to fields affected by the server profile, enables discovery in local networks.

- `randomports`
  Uses a random port number for swarm.

- `test`
  Reduces external interference of IPFS daemon. Useful when using the daemon in test environments.

- `default-networking`
  Restores default network settings. Inverse profile of the test profile.

- `lowpower`
  Reduces daemon overhead on the system. May degrade performance of content discovery and data fetching.

## Reset your profile

To reset the profile of your node to default, run the following command:

```diff
ipfs config profile apply default-datastore

...
"Datastore": {
    "BloomFilterSize": 0,
    "GCPeriod": "1h",
    "HashOnRead": false,
    "Spec": {
-       >> "child": {"path":"badgerds","syncWrites":false,"truncate":true,"type":"badgerds"},
+       << "mounts": [{"child":{"path":"blocks","shardFunc":"/repo/flatfs/shard/v1/next-to-last/2","sync":true,"type":"flatfs"},"mountpoint":"/blocks","prefix":"flatfs.datastore","type":"measure"},{"child":{"compression":"none","path":"datastore","type":"levelds"},"mountpoint":"/","prefix":"leveldb.datastore","type":"measure"}],
-       >> "prefix": "badger.datastore",
        <> "type": "measure"
        ** "type": "mount"
    },
    "StorageGCWatermark": 90,
    "StorageMax": "10GB"
},
...
```

The above command shows the difference between your existing IPFS configuration and the new configuration. It will overwrite your IPFS `config` file, so be sure to create a backup of your existing IPFS configuration before running this command.

## Converting profiles

Not all profiles are compatible with each other, because they may use different technologies for storing the data inside the datastores. For instance, if you want to convert `badgerds` to `default-datastore`, you have to use another helper tool called [ipfs-ds-convert](https://dist.ipfs.io/#ipfs-ds-convert) to convert the datastore to the required format. Please follow the instructions given below to install `ipfs-ds-convert` for your operating system.

### MacOS

Download the tarball for MacOS, extract the contents, and move the binary file to your path:

```bash
wget -O /tmp/ipfs-ds-convert.tar.gz https://dist.ipfs.io/ipfs-ds-convert/v0.5.0/ipfs-ds-convert_v0.5.0_darwin-amd64.tar.gz
sudo tar -xzvf /tmp/ipfs-ds-convert.tar.gz -C /usr/local/bin/ --strip-components=1
sudo chmod +x /usr/local/bin/ipfs-ds-convert
rm /tmp/ipfs-ds-convert.tar.gz
```

### Linux

Download the tarball for Linux, extract the contents, and move the binary file to your path:

```bash
wget -O /tmp/ipfs-ds-convert.tar.gz https://dist.ipfs.io/ipfs-ds-convert/v0.5.0/ipfs-ds-convert_v0.5.0_linux-amd64.tar.gz
sudo tar -xzvf /tmp/ipfs-ds-convert.tar.gz -C /usr/local/bin/ --strip-components=1
sudo chmod +x /usr/local/bin/ipfs-ds-convert
rm /tmp/ipfs-ds-convert.tar.gz
```

### Windows

Download the zip file, extract it and then add the path to `ipfs-ds-convert.exe` to your environment path:

- Download the zip package from here: [ipfs-ds-convert](https://dist.ipfs.io/ipfs-ds-convert/v0.5.0/ipfs-ds-convert_v0.5.0_windows-amd64.zip) and extract it.
- Add the full path to `ipfs-ds-convert.exe` to your environment variables path.

To find more about `ipfs-ds-convert` please visit here: [ipfs-ds-convert](https://dist.ipfs.io/#ipfs-ds-convert).
Once you are done with the installation process, verify that `ipfs-ds-convert` has been installed successfully by executing the following command:

```bash
ipfs-ds-convert --version

> ipfs-ds-convert version 0.5.0
```

If the above command does not display a similar output, that means there is some issue with the installation. The most common issue is that the path to the executable binary is not in your environment path.

On the other hand, if the command executes successfully, then proceed to convert your IPFS profile. Run the following command to begin the process of converting your existing datastore to the required format:

```bash
ipfs-ds-convert convert

> convert 2020/12/06 21:27:26 Checks OK
> convert 2020/12/06 21:27:27 Copying keys, this can take a long time
> copied 2002 keys
> convert 2020/12/06 21:29:01 All data copied, swapping repo
> convert 2020/12/06 21:29:02 Verifying key integrity
> convert 2020/12/06 21:29:02 2002 keys OK
> convert 2020/12/06 21:29:02 Saving new spec
> convert 2020/12/06 21:29:02 All tasks finished
```

This can take a very long time to complete. If you are running this on a headless server we recommend you use something like `screen` or `tmux` to run this command in a persistent shell.

After the above command finishes, your IPFS node should be reset to the default profile.
