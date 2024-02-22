---
title: Public IPFS Utilities
sidebarDepth: 1
description: Information about hosted public utilities such as public gateways and hosted delegated routing endpoints
---

# Public IPFS Utilities

The IPFS Foundation (and Protocol Labs in the past) and several other organizations provide hosted public utilities to the community on a best-effort basis. As such, it is not intended to be part of your critical path or production infrastructure.

These include [IPFS Gateways](./ipfs-gateway.md) and hosted [Delegated Routing V1 endpoints](./nodes#delegated-routing).

These utilities make it easier to retrieve data from the IPFS network in resource-constrained environments such as browsers and low-powered devices.

## Public IPFS Gateways

The IPFS Foundation provides the following public gateways:

- **`https://ipfs.io`**: [Path resolution](https://docs.ipfs.tech/how-to/address-ipfs-on-web/#path-gateway) gateway
- **`https://dweb.link`**: [Subdomain resolution](https://docs.ipfs.tech/how-to/address-ipfs-on-web/#subdomain-gateway) gateway
- **`https://trustless-gateway.link`**: Gateway limited to [trustless and verifiable responses](https://docs.ipfs.tech/reference/http/gateway/#trustless-verifiable-retrieval)

These gateways block abusive content using the [Bad Bits Denylist](https://badbits.dwebops.pub/).

To report abusive content and content breaches of the [IPFS Community Code of Conduct](https://ipfs.fyi/coc), please send an email with the CIDs to abuse@ipfs.io.

Technical operations are run by the Waterworks Community on behalf of the IPFS Foundation. To report any technical problems with these gateways, you can open an issue in the [Waterworks Community repository](https://github.com/ipshipyard/waterworks-community).

### Abuse Policy

When a takedown request for the `ipfs.io` and/or `dweb.link` gateway(s) is first received at abuse@ipfs.io, the sender will receive an automated system receipt. Next, someone from the takedown team will vet the request to validate that it is legitimate and should be accepted. Once the validity of the request has been established, it will be submitted for further processing.

From there, an internal system extracts the relevant information from the request and generates an entry for it in our takedown lists. The list is then published to our gateway nodes, and the content in question will return a 410 status when visited.

Your browser may have a local cache of the content in question and might not reflect that something has been blocked on the gateways. To avoid browser caching, attempt to view the content using your browser's incognito or private mode. You can also prevent caching issues by using a command-line tool such as Curl or Wget.

## Other Public Gateways

Additionally, there's a community-maintained [tool for finding and testing public gateways](https://ipfs.github.io/public-gateway-checker/) such as the one operated by Cloudflare: `https://cf-ipfs.com`.

## Delegated Routing

While IPFS Gateways are immensely helpful in doing all the heavy lifting of finding providers for CIDs and retrieving them, they can be a choke point for retrieval and a point of centralization.

[_Delegated Routing_](./nodes.md#delegated-routing) endpoints are a key step towards eliminating the emergent centralization of public gateways thereby increasing the health of the network.

Browsers and low-powered devices can make a single HTTP call to a _Delegated Routing_ endpoint with the CID they are looking to retrieve. The endpoint returns the [multiaddresses](./glossary.md#multiaddr) of the providers for the CID, from which the browser can download directly.

### Delegated Routing Endpoint

The IPFS Foundation provides a public delegated routing endpoint backed by [**someguy**](https://github.com/ipfs/someguy) with the URL **`https://delegated-ipfs.dev/routing/v1`**

Under the hood, someguy handles requests by looking up the DHT and Network Indexer.

This endpoint can also be useful for debugging discoverability of CIDs, for example: [https://delegated-ipfs.dev/routing/v1/providers/bafybeicklkqcnlvtiscr2hzkubjwnwjinvskffn4xorqeduft3wq7vm5u4](https://delegated-ipfs.dev/routing/v1/providers/bafybeicklkqcnlvtiscr2hzkubjwnwjinvskffn4xorqeduft3wq7vm5u4) will show the providers for the CID `bafybeicklkqcnlvtiscr2hzkubjwnwjinvskffn4xorqeduft3wq7vm5u4`.
