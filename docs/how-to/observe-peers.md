---
title: Observe peers
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
> ipfs swarm connect /dnsaddr/bootstrap.libp2p.io/p2p/QmNnooDu7bfjPFoTZYxMNLWUQJyrVwtbZg5gBMjTezGAJN
```

Search for a given peer on the network:

```sh
> ipfs routing findpeer QmNnooDu7bfjPFoTZYxMNLWUQJyrVwtbZg5gBMjTezGAJN
```
