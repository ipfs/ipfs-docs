---
title: Work with blocks
description: Learn how your files are broken down into blocks in IPFS and how to work with them.
---

# WebTransport and Kubo

IPFS Kubo v0.16 introduced optional support for WebTransport, a new libp2p transport protocol, and Kubo v0.18 enabled support by default. WebTransport support allows browsers to contact Kubo nodes, so instead of serving requests for other system level application nodes, you can serve requests directly to a browser. This guide will explain how to do so.

## How it works

Conceptually, WebTransport is similar to WebSocket. The browser can “upgrade” an [HTTP/2](https://datatracker.ietf.org/doc/draft-ietf-webtrans-http2/) or an [HTTP/3 connection](https://datatracker.ietf.org/doc/draft-ietf-webtrans-http3/), which runs on top of QUIC, to a **WebTransport session**. A WebTransport session over HTTP/3 allows both endpoints to open (very thinly wrapped) QUIC streams to each other. This enables WebTransport to take advantage of QUIC's offerings, resulting in the following:

- Speedy time to connect using a fast handshake (just one network roundtrip.)
- Native stream multiplexing without head-of-line blocking
- Advanced loss recovery and congestion control
- Low latency communication and unordered and unreliable delivery of data

Introducing a new verification option is the most critical change for our peer-to-peer use case. Being layered on top of QUIC, WebTransport always requires a (TLS) encrypted connection. The WebTransport browser API allows for two distinct modes:

1. **Verification of the TLS certificate chain**: This is precisely what the browser does when checking the certificate for any website it connects to. This means that the server must possess a certificate signed by a certificate authority. This option comes with the exactly the same problems that we encountered with WebSocket.

2. **Verification of the TLS certificate hash**: This option is intended for short-lived VM deployments, where servers only have self-signed certificates. The browser will trust the server if the hash of the certificate used during the handshake matches its expected hash. This option allows us to use WebTransport on *any* libp2p node without manual configuration!

It works because when setting up a WebTransport server, the libp2p node will generate a self-signed TLS certificate and calculate the certificate hash. It then advertises the following [multiaddress](https://docs.libp2p.io/concepts/fundamentals/addressing/) to the network:

`/ip4/1.2.3.4/udp/4001/quic/webtransport/certhash/<hash>`.

The `certhash` component of the multiaddress tells the browser the certificate hash, allowing it to establish the WebTransport connection successfully.

In practice, you’ll see addresses containing multiple certificate hashes, e.g.

`/ip4/1.2.3.4/udp/4001/quic/webtransport/certhash/<hash1>/certhash/<hash2>`.

As described above, option (2) is intended for short-lived deployments, and browsers will only accept valid certificates for less than 14 days. We work around this constraint by generating two certificates: one valid for immediate use and another valid from when the first one expires. After 14 days, the server can forward its certificates and advertise an updated address containing the new certificate hash to the network.



