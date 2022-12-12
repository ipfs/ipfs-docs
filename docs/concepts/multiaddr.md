---
title: 'Multi-addresses'
description: Multi-addresses and how they are used in IPFS
---

# Understanding Multi-Addresses in IPFS

A [multiaddr](https://github.com/multiformats/multiaddr) encodes multiple layers of addressing information into a single "future-proof" path structure.
It is a self-describing format that allows multiple protocols encoded in a single string. This allows for flexibility in addressing and routing network traffic in a decentralized system like IPFS.

A multiaddr has the following format:

```shell
/<protocol>/<address>
```

Where `<protocol>` is the name of the network protocol being used, and `<address>` is the address of the node on that network.

For example, a multiaddr for an IPFS node with the IP address `192.0.2.1` and listening on port `5001` would be:

```shell
/ip4/192.0.2.1/tcp/5001
```

> This multiaddr indicates that the node uses the IPv4 protocol, has the IP address 192.0.2.1, and listens on TCP port 5001.

In IPFS, multiaddrs represent the addresses of nodes on the network. They can be used to specify the source and destination of network traffic, allowing for decentralized routing.

In IPFS, the CID and multihash can be included in a multiaddr to specify the location of a specific piece of content on the network.
> Each file or piece of content is identified by a unique [content identifier (CID)](content-addressing.md) that is generated based on the content itself. The CID is a base58-encoded string that users can use to retrieve content.
> In addition to the CID, IPFS uses a multi-hash concept to ensure the content's integrity and authenticity. A multi-hash is a hash of the content generated using multiple hashing algorithms. This allows IPFS to support a variety of hashing algorithms and also provides a level of redundancy to ensure the accuracy of the hash.

For example, a multiaddr for a piece of content with the CID `QmWATWQ7fVPP2EFGu71UkfnqhYXDYH566qy47CnJDgvs8u` on a node with the IP address `192.0.2.1` and listening on port `5001` would be:

```shell
/ip4/192.0.2.1/tcp/5001/ipfs/QmWATWQ7fVPP2EFGu71UkfnqhYXDYH566qy47CnJDgvs8u
```

Learn more about multiaddresses [here](https://github.com/multiformats/multiaddr).
