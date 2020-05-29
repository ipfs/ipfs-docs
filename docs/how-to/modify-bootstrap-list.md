---
title: Modify the bootstrap list
legacyUrl: https://docs.ipfs.io/guides/examples/bootstrap/
description: Learn how to modify the IPFS bootstrap peers list to create a personal IPFS network.
---

# Modify the bootstrap peers list

The IPFS bootstrap list is a list of peers with which the IPFS daemon learns about other peers on the network. IPFS comes with a default list of trusted peers, but you are free to modify the list to suit your needs. One popular use for a custom bootstrap list is to create a personal IPFS network.

First, let's list your node's bootstrap list:

```bash
ipfs bootstrap list
> /dnsaddr/bootstrap.libp2p.io/p2p/QmNnooDu7bfjPFoTZYxMNLWUQJyrVwtbZg5gBMjTezGAJN
> /dnsaddr/bootstrap.libp2p.io/p2p/QmQCU2EcMqAqQPR2i9bChDtGNJchTbq5TbXJJ16u19uLTa
> /dnsaddr/bootstrap.libp2p.io/p2p/QmbLHAnMoJPWSCR5Zhtx6BHJX9KiKNN6tpvbUcqanj75Nb
> /dnsaddr/bootstrap.libp2p.io/p2p/QmcZf59bWwK5XFi76CZX8cbJ4BhTzzA3gU1ZjYZcYW3dwt
> /ip4/104.131.131.82/tcp/4001/p2p/QmaCpDMGvV2BGHeYERUEnRQAwe3N8SzbUtfsmvsqQLuvuJ
```

The lines listed above are the addresses of the default IPFS bootstrap nodes -- they are run by the IPFS development team. The addresses listed are fully resolved and specified in [multiaddr](https://github.com/multiformats/multiaddr) format, which makes every protocol explicit. This way, your node knows exactly where to reach the bootstrap nodes -- the location is unambiguous.

Don't change this list unless you understand what it means to do so. Bootstrapping is an important security point of failure in distributed systems: malicious bootstrap peers could only introduce you to other malicious peers. It is recommended to keep the default list provided by the IPFS dev team, or — in the case of setting up private networks — a list of nodes you control. Don't add peers to this list that you don't trust.

Here, we add a new peer to the bootstrap list:

```bash
> ipfs bootstrap add /ip4/25.196.147.100/tcp/4001/p2p/QmaMqSwWShsPg2RbredZtoneFjXhim7AQkqbLxib45Lx4S
```

Here, we remove a node from the bootstrap list:

```bash
> ipfs bootstrap rm /ip4/104.131.131.82/tcp/4001/p2p/QmaCpDMGvV2BGHeYERUEnRQAwe3N8SzbUtfsmvsqQLuvuJ
```

Let's say we want to create a backup of our new bootstrap list. We can easily do this by redirecting stdout of `ipfs bootstrap list` to a file:

```bash
> ipfs bootstrap list >save
```

If we ever want to start from scratch, we can delete the entire bootstrap list at once:

```bash
> ipfs bootstrap rm --all
```

With an empty list, we can restore the default bootstrap list:

```bash
> ipfs bootstrap add --default
```

Remove the entire bootstrap list again, and restore our saved one by piping the contents of the saved file to `ipfs bootstrap add`:

```bash
> ipfs bootstrap rm --all
> cat save | ipfs bootstrap add
```
