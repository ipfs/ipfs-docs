---
title: Observe peers
---

# Observe peers

::: warning
This draft content ported from the legacy docs site may contain broken links and other errors. (Please remove this alert once content has been reviewed.)
:::

IPFS is all about networking! Included are a useful set of commands
to aid in observing the network.

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

By [whyrusleeping](http://github.com/whyrusleeping)
