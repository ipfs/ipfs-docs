---
title: Using garbage collection
sidebarDepth: 0
---

# Using garbage collection in Kubo

In IPFS Kubo, the IPFS garbage collector is configured in the `Datastore`section of [the Kubo config file](https://github.com/ipfs/kubo/blob/master/docs/config.md). The important settings related to the garbage collector are:

- `StorageGCWatermark`: The percentage of the `StorageMax` value at which a garbage collection will be triggered automatically, if the daemon is running with automatic garbage collection enabled. The default is 90`.

- `GCPeriod`: Specify how frequently garbage collection should run. Only used if automatic garbage collection is enabled. The default is 1 hour.

To manually start garbage collection, [run `ipfs repo gc`](../reference/kubo/cli.md#ipfs-repo-gc):

```bash
ipfs repo gc

> removed QmPZhyTu8D7NqR5NvgkgNYsSYD4CNjnyuFejB8i23itJvA
> removed QmSYQFVAZgEnpa6NxiW5agyj3XU9VR4CbERShXiLhuPPPE
> removed QmS6SJXApoi59hqD8Naktgakc6UNHK1XDhqhtMg9sBhY8g
```

To enable automatic garbage collection use `--enable-gc` when starting the IPFS daemon:

```bash
ipfs daemon --enable-gc

> Initializing daemon...
> Kubo version: 0.9.0
> Repo version: 10
> ...
```

::: tip
If you use IPFS Desktop, you can trigger garbage collection by clicking on the taskbar icon of the IPFS Desktop application and selecting **Advanced** → **Run Garbage Collector**.
:::