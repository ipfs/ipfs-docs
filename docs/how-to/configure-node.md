---
title: Configure a node
description: IPFS nodes can be customzied using the configuration file. The default values should be fine for most use-cases. However, you may want to make some changes if you are running a specialized IPFS node, or simply want to tweak things to your liking.
---

# Configure a node

IPFS is configured through a json formatted text file, located by default at `~/.ipfs/config`. Implementation-specific information can be found within the [go-ipfs](https://github.com/ipfs/go-ipfs/blob/master/docs/config.md) and [js-ipfs](https://github.com/ipfs/js-ipfs/blob/master/docs/CONFIG.md) repositories. It is read once at node instantiation, either for an offline command, or when starting the daemon. Commands that execute on a running daemon do not read the config file at runtime.

