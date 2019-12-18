---
title: Observe peers
legacyUrl: https://docs.ipfs.io/guides/examples/network/
description: Learn the built-in IPFS commands that help you observe peers on the network.
---

# Observe peers

Included in IPFS are a useful set of commands to aid in observing the network.

See who you're directly connected to:

```sh
ipfs swarm peers
```

Manually connect to a specific peer. If the peer below doesn't work, choose one from the output of `ipfs swarm peers`.

```sh
ipfs swarm connect /ip4/104.236.176.52/tcp/4001/ipfs/QmSoLnSGccFuZQJzRadHn95W2CrSFmZuTdDWP8HXaHca9z
```

Search for a given peer on the network:

```sh
ipfs dht findpeer QmSoLnSGccFuZQJzRadHn95W2CrSFmZuTdDWP8HXaHca9z
```
