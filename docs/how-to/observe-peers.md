---
title: Observe peers
meta:
  - name: twitter:title
    content: IPFS Docs - page title
  - property: og:title
    content: IPFS Docs - page title
  - itemprop: name
    content: IPFS Docs - page title
  - name: description
    content: description of this page less than 150 char
  - name: twitter:description
    content: description of this page less than 150 char
  - property: og:description
    content: description of this page less than 150 char
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
