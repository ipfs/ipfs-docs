---
title: Features
---

# Features

The highlights in this release include:

- The QUIC transport is enabled by default. Furthermore, go-ipfs will automatically run a migration to listen on the QUIC transport (on the same address/port as the TCP transport) to make this upgrade process seamless.
- The new NOISE security transport is now supported but won't be selected by default. This transport will replace SECIO as the default cross-language interoperability security transport. TLS 1.3 will still remain the default security transport between go-ipfs nodes for now.

**MIGRATION**: This release contains a small config migration to enable listening on the QUIC transport in addition to the TCP transport. This migration will:

- Normalize multiaddrs in the bootstrap list to use the `/p2p/Qm...` syntax for multiaddrs instead of the `/ipfs/Qm...` syntax.
- Add QUIC addresses for the default bootstrappers, as necessary. If you've removed the default bootstrappers from your bootstrap config, the migration won't add them back.
- Add a QUIC listener address to mirror any TCP addresses present in your config. For example, if you're listening on `/ip4/0.0.0.0/tcp/1234`, this migration will add a listen address for `/ip4/0.0.0.0/udp/1234/quic`.

## QUIC by default

This release enables the QUIC transport (draft 28) by default for both inbound and outbound connections. When connecting to new peers, libp2p will continue to dial all advertised addresses (TCP + quic) in parallel, so if the QUIC connection fails, the connection should still succeed.

The QUIC transport has several key benefits over the current TCP based transports:

- It takes fewer round-trips to establish a connection. With the QUIC transport, the IPFS handshake takes two round trips (one to establish the QUIC connection, one for the libp2p handshake). In the future, we should be able to reduce this to one round trip for the initial connection, and zero round trips for subsequent connections to a previously seen peer. This is especially important for DHT requests that contact many new peers.
- Because it's UDP based instead of TCP based, it uses fewer file descriptors. The QUIC transport will open one UDP socket per listen-address instead of one socket per connection. This should, in the future, allow us to keep more connections open.
- Because QUIC connections don't consume file descriptors, we're able to remove the rate limit on outbound QUIC connections, further speeding up DHT queries.

Unfortunately, this change isn't without drawbacks: the QUIC transport may not be able to max out some links (usually due to [poorly tuned kernel parameters](https://github.com/lucas-clemente/quic-go/issues/2586#issuecomment-639247615)). On the other hand, it may also be _faster_ in some cases.

If you hit this performance issue on Linux, you should tune the `net.core.rmem_default` and `net.core.rmem_max` sysctl parameters to increase your UDP receive buffer sizes.

If necessary, you can disable the QUIC transport by running:

> ipfs config --json Swarm.Transports.Network.QUIC false

**NOTE**: The QUIC transport included in this release is backward incompatible with the experimental QUIC transport included in previous releases. Unfortunately, the QUIC protocol underwent some significant breaking changes, and supporting multiple versions wasn't an option. In practice, this degrades gracefully as go-ipfs will simply fall back on the TCP transport when dialing nodes with incompatible QUIC versions.

## Noise Transport

This go-ipfs release introduces a new security transport: [libp2p Noise](https://github.com/libp2p/specs/tree/master/noise) (built from the [Noise Protocol Framework](http://www.noiseprotocol.org/)). While TLS1.3 remains the default go-ipfs security transport, Noise is simpler to implement from scratch and will be the standard cross-platform libp2p security transport going forward.

This brings us one step closer to deprecating and removing support for SECIO.

While enabled by default, Noise won't actually be used by default. Given that TLS1.3 is still the default security transport for go-ipfs, this usually won't happen. If you'd like to prefer Noise over other security transports, you can change its priority in the [config](https://github.com/ipfs/go-ipfs/blob/v0.6.0/docs/config.md) (`Swarm.Transports.Security.Noise`).

## Gateway

This release brings two gateway-relevant features: custom 404 pages and base36 support.

### Custom 404

You can now customize `404 Not Found` error pages by including an `ipfs-404.html` file somewhere in the request path. When a requested file isn't found, go-ipfs will look for an `ipfs-404.html` in the same directory as the requested file, and in each ancestor directory. If found, this file will be returned (with a 404 status code) instead of the usual error message.

### Support for Base36

This release adds support for a new multi-base encoding: base36. Base36 is an optimally efficient case-insensitive alphanumeric encoding. Case-insensitive alphanumeric encodings are important for the subdomain gateway as domain names are case insensitive.

While base32 (the current default encoding used in subdomains) is simpler than base36, it's not optimally efficient, and base36 Ed25519 IPNS keys are two characters too big to fit into the 63 character subdomain length limit. The extra efficiency from base36 brings us under this limit and allows Ed25519 IPNS keys to work with the subdomain gateway.

This release adds support for base36 but won't use it by default. If you'd like to re-encode an Ed25519 IPNS key into base36, you can use the `ipfs cid format` command:

```bash
ipfs cid format -v 1 --codec libp2p-key -b base36 bafzaajaiaejca4syrpdu6gdx4wsdnokxkprgzxf4wrstuc34gxw5k5jrag2so5gk k51qzi5uqu5dj16qyiq0tajolkojyl9qdkr254920wxv7ghtuwcz593tp69z9m
```

## Gossipsub Upgrade

This release brings a new gossipsub protocol version: 1.1. You can read about it in the [blog post](https://blog.ipfs.io/2020-05-20-gossipsub-v1.1/).

## Connectivity

This release introduces a new _[peering](https://github.com/ipfs/go-ipfs/blob/v0.6.0/docs/config.md#peering)_ feature. The peering subsystem configures go-ipfs to connect to, remain connected to, and reconnect to a set of nodes. Nodes should use this subsystem to create _sticky_ links between frequently useful peers to improve reliability.

Use-cases:

- An IPFS gateway connected to an IPFS cluster should peer to ensure that the gateway can always fetch content from the cluster.
- A dapp may peer embedded go-ipfs nodes with a set of pinning services or textile cafes/hubs.
- A set of friends may peer to ensure that they can always fetch each other's content.
