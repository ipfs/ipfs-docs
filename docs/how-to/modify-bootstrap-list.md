---
title: Modify the bootstrap list
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

# Modify the bootstrap peers list

The IPFS bootstrap list is a list of peers with which the IPFS daemon learns about other peers on the network. IPFS comes with a default list of trusted peers, but you are free to modify the list to suit your needs. One popular use for a custom bootstrap list is to create a personal IPFS network.

First, let's list your node's bootstrap list:

```bash
ipfs bootstrap list
> /ip4/104.131.131.82/tcp/4001/ipfs/QmaCpDMGvV2BGHeYERUEnRQAwe3N8SzbUtfsmvsqQLuvuJ
> /ip4/104.236.151.122/tcp/4001/ipfs/QmSoLju6m7xTh3DuokvT3886QRYqxAzb1kShaanJgW36yx
> /ip4/104.236.176.52/tcp/4001/ipfs/QmSoLnSGccFuZQJzRadHn95W2CrSFmZuTdDWP8HXaHca9z
> /ip4/104.236.179.241/tcp/4001/ipfs/QmSoLpPVmHKQ4XTPdz8tjDFgdeRFkpV8JgYq8JVJ69RrZm
> /ip4/104.236.76.40/tcp/4001/ipfs/QmSoLV4Bbm51jM9C4gDYZQ9Cy3U6aXMJDAbzgu2fzaDs64
> /ip4/128.199.219.111/tcp/4001/ipfs/QmSoLSafTMBsPKadTEgaXctDQVcqN88CNLHXMkTNwMKPnu
> /ip4/162.243.248.213/tcp/4001/ipfs/QmSoLueR4xBeUbY9WZ9xGUUxunbKWcrNFTDAadQJmocnWm
> /ip4/178.62.158.247/tcp/4001/ipfs/QmSoLer265NRgSp2LA3dPaeykiS1J6DifTC88f5uVQKNAd
> /ip4/178.62.61.185/tcp/4001/ipfs/QmSoLMeWqB7YGVLJN3pNLQpmmEk35v6wYtsMGLzSr5QBU3
```

The lines listed above are the addresses of the default IPFS bootstrap nodes -- they are run by the IPFS development team. The addresses listed are fully resolved and specified in [multiaddr](https://github.com/multiformats/multiaddr) format, which makes every protocol explicit. This way, your node knows exactly where to reach the bootstrap nodes -- the location is unambiguous.

Don't change this list unless you understand what it means to do so. Bootstrapping is an important security point of failure in distributed systems: malicious bootstrap peers could only introduce you to other malicious peers. It is recommended to keep the default list provided by the IPFS dev team, or — in the case of setting up private networks — a list of nodes you control. Don't add peers to this list that you don't trust.

Here, we add a new peer to the bootstrap list:

```bash
ipfs bootstrap add /ip4/25.196.147.100/tcp/4001/ipfs/QmaMqSwWShsPg2RbredZtoneFjXhim7AQkqbLxib45Lx4S
```

Here, we remove a node from the bootstrap list:

```bash
ipfs bootstrap rm /ip4/128.199.219.111/tcp/4001/ipfs/QmSoLSafTMBsPKadTEgaXctDQVcqN88CNLHXMkTNwMKPnu
```

Let's say we want to create a backup of our new bootstrap list. We can easily do this by redirecting stdout of `ipfs bootstrap list` to a file:

```bash
ipfs bootstrap list >save
```

If we ever want to start from scratch, we can delete the entire bootstrap list at once:

```bash
ipfs bootstrap rm --all
```

With an empty list, we can restore the default bootstrap list:

```bash
ipfs bootstrap add --default
```

Remove the entire bootstrap list again, and restore our saved one by piping the contents of the saved file to `ipfs bootstrap add`:

```bash
ipfs bootstrap rm --all
cat save | ipfs bootstrap add
```
