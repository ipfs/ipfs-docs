---
title: Default profile
legacyUrl: https://docs.ipfs.io/guides/examples/default-profile/
description: Your profile defines which file-system and data-store your IPFS node will use, along with other configuration options. Learn how to set, change, and reset your profile.
---

# Configure a default profile and switching between profiles

The profile of your IPFS node allows you to specify which file-system or data-store you want to use. Changing these options will affect the performance of your node. For example, if you want to have a faster datastore for your node, you can use the `badgerds` profile. If you're running your node on a low-power device like a Raspberry Pi, you can use the `low-power` profile. Profiles have been developed to customize your IPFS node to perform best under given conditions.

## Find your current profile

Your IPFS profile is found within your node's `config` file. The default location for the `config` file is `~/.ipfs/config`. If you have set an `$IPFS_PATH` variable, you can find your `config` file at `$IPFS_PATH/config`. Use `grep` to find the currently set profile:

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

Here's a list of all the profiles available for your IPFS node:

- `flatfs`
- `badgerds`
- `server`
- `randomports`
- `default-datastore`
- `local-discovery`
- `test`
- `default-networking`
- `lowpower`

## Reset your profile

You can reset your node's profile to the default one by running the following command:

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

Above command shows the difference between your existing IPFS config and the new configuration. Also, it would overwrite your IPFS `config` file, so it's always better to create a backup of your existing IPFS configuration before running this command.

## Converting profiles

Not all profiles are compatible with each other simply because they use very different technologies for storing the data inside the datastores. For instance, if you want to convert `badgerds` to `default-datastore`, you would have to use another helper tool called [ipfs-ds-convert](https://dist.ipfs.io/#ipfs-ds-convert) to convert the datastore to the required format. Please follow the instructions given below to install `ipfs-ds-convert` for your operating system.

### MacOS

We will download the tarball for MacOS, extract the contents, and move the binary file to our path

```bash
wget -O /tmp/ipfs-ds-convert.tar.gz https://dist.ipfs.io/ipfs-ds-convert/v0.5.0/ipfs-ds-convert_v0.5.0_darwin-amd64.tar.gz
sudo tar -xzvf /tmp/ipfs-ds-convert.tar.gz -C /usr/local/bin/ --strip-components=1
sudo chmod +x /usr/local/bin/ipfs-ds-convert
rm /tmp/ipfs-ds-convert.tar.gz
```

### Linux

We will download the tarball for Linux, extract the contents, and move the binary file to our path

```bash
wget -O /tmp/ipfs-ds-convert.tar.gz https://dist.ipfs.io/ipfs-ds-convert/v0.5.0/ipfs-ds-convert_v0.5.0_linux-amd64.tar.gz
sudo tar -xzvf /tmp/ipfs-ds-convert.tar.gz -C /usr/local/bin/ --strip-components=1
sudo chmod +x /usr/local/bin/ipfs-ds-convert
rm /tmp/ipfs-ds-convert.tar.gz
```

### Windows

For Windows, we will download the zip file, extract it and then add the path to `ipfs-ds-convert.exe` to our environment path

- Download the zip package from here: [ipfs-ds-convert](https://dist.ipfs.io/ipfs-ds-convert/v0.5.0/ipfs-ds-convert_v0.5.0_windows-amd64.zip) and extract it.
- Add the full path to `ipfs-ds-convert.exe` to your environment variables path.

To find more about `ipfs-ds-convert` please visit here: [ipfs-ds-convert](https://dist.ipfs.io/#ipfs-ds-convert).
Once you are done with the installation process, you can verify if `ipfs-ds-convert` has been installed successfully by executing the following command:

```bash
ipfs-ds-convert --version

> ipfs-ds-convert version 0.5.0
```

If the above command does not display a similar output, that would mean there is some issue with the installation. The most common issue is that the path to the executable binary is not in your environment path.

On the other hand, if the command executes successfully, then we can proceed to convert our IPFS profile. Run the following command to begin the process of converting your existing datastore to the required format:

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
