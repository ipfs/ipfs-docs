---
title: WebTransport and Kubo
description: Learn how your files are broken down into blocks in IPFS and how to work with them.
---

# WebTransport and Kubo

[WebTransport](https://docs.libp2p.io/concepts/transports/webtransport/), a new libp2p transport protocol, allows browsers to contact [Kubo](../install/command-line.md) nodes, so instead of serving requests for other system level application nodes, you can serve requests directly to a browser. This guide will explain how WebTransport works, Kubo-WebTransport integration use cases, and how to get started with WebTransport in Kubo.

Kubo v0.16 introduced [optional support for WebTransport](https://github.com/ipfs/kubo/releases?q=0.16.0&expanded=true#-webtransport-new-experimental-transport), and Kubo v0.18 [enabled support by default](https://github.com/ipfs/kubo/blob/release-v0.18/docs/changelogs/v0.18.md#webtransport-enabled-by-default).  

## How it works

Conceptually, WebTransport is similar to [WebSocket](https://en.wikipedia.org/wiki/WebSocket). The browser can “upgrade” an [HTTP/2](https://en.wikipedia.org/wiki/HTTP/2) or an [HTTP/3 connection](https://en.wikipedia.org/wiki/HTTP/3), which runs on top of [QUIC](https://en.wikipedia.org/wiki/QUIC), to a WebTransport session. A WebTransport session over HTTP/3 allows both endpoints to open very thinly wrapped QUIC streams to each other. This enables WebTransport to take advantage of QUIC's offerings:

- Speedy time to connect using a fast handshake (one network roundtrip).
- Native stream multiplexing without head-of-line blocking.
- Advanced loss recovery and congestion control.
- Low latency communication.

### Steps

In a nutshell, WebTransport works with Kubo as follows:

1. The browser establishes a HTTP/3 connection to the Kubo node. 
1. It then opens a new stream.
1. An Extended CONNECT request and proposed a WebTransport Session ID are sent.

The server can accept the upgrade by sending a HTTP 200 OK response. Both endpoints can now open QUIC streams associated with this WebTransport session.

## Use cases 

WebTransport in Kubo unlocks many use cases, including those listed below.

- Browser nodes or light clients can function as "full" peers in a decentralized network.
- Browser nodes can gossip directly with their peers, meaning they can receive and submit messages directly without relying on centralized infrastructure or interfaces like an HTTP/GraphQL API.
- Fetch data from the [DHT](../concepts/dht.md) by directly connecting to a DHT server node.
- Upload data directly from the browser to long-term storage such as a [pinning service](../concepts/persistence.md) .
- Decentralized peer-to-peer video streaming as a dApp.

## Using WebTransport with Kubo

To get started with using WebTransport with Kubo, you can use follow this GitHub example which will teach you [how to use the browser to fetch a file directly from Kubo](https://github.com/libp2p/js-libp2p-webtransport/tree/main/examples/fetch-file-from-kubo). You can also view the demo on [YouTube](https://youtu.be/Dt42Ss6X_Vk?feature=shared&t=145).

## Learn more

You can learn more about WebTransport with the following resources:

- [libp2p documentation: WebTransport](https://docs.libp2p.io/concepts/transports/webtransport/)
- [connectivity.libp2p.io](https://connectivity.libp2p.io/#webtransport)
- [WebTransport spec](https://github.com/libp2p/specs/tree/master/webtransport)
