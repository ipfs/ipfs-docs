---
title: Public IPFS Utilities
sidebarDepth: 1
description: Information about hosted public utilities such as public gateways and hosted delegated routing endpoints
---

# Public IPFS Utilities

The IPFS Foundation (and Protocol Labs in the past) and several other organizations provide hosted public utilities to the community on a best-effort basis. As such, it is not intended to be part of your critical path or production infrastructure.

These include [IPFS Gateways](./ipfs-gateway.md), hosted [Delegated Routing V1 endpoints](./nodes#delegated-routing), and the [Amino DHT](./glossary.md#amino) [Bootstrappers](./nodes.md#bootstrap).

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

Additionally, there's a community-maintained [tool for finding and testing public gateways](https://ipfs.github.io/public-gateway-checker/).

## Delegated Routing

While IPFS Gateways are immensely helpful in doing all the heavy lifting of finding providers for CIDs and retrieving them, they can be a choke point for retrieval and a point of centralization.

[_Delegated Routing_](./nodes.md#delegated-routing) endpoints are a key step towards eliminating the emergent centralization of public gateways thereby increasing the health of the network.

Browsers and low-powered devices can make a single HTTP call to a _Delegated Routing_ endpoint with the CID they are looking to retrieve. The endpoint returns the [multiaddresses](./glossary.md#multiaddr) of the providers for the CID, from which the browser can download directly.

### Delegated Routing Endpoint

The IPFS Foundation provides a public delegated routing endpoint backed by [**someguy**](https://github.com/ipfs/someguy) with the URL **`https://delegated-ipfs.dev/routing/v1`**

Under the hood, someguy handles requests by looking up the DHT and Network Indexer.

This endpoint can also be useful for debugging discoverability of CIDs, for example: [https://delegated-ipfs.dev/routing/v1/providers/bafybeicklkqcnlvtiscr2hzkubjwnwjinvskffn4xorqeduft3wq7vm5u4](https://delegated-ipfs.dev/routing/v1/providers/bafybeicklkqcnlvtiscr2hzkubjwnwjinvskffn4xorqeduft3wq7vm5u4) will show the providers for the CID `bafybeicklkqcnlvtiscr2hzkubjwnwjinvskffn4xorqeduft3wq7vm5u4`.

## Amino DHT Bootstrappers

For an IPFS node to join the Amino DHT, it needs to discover other peers. Bootstrap nodes assist with this process.

The IPFS Foundation provides several public bootstrap nodes that are published as a TXT record to DNS at `_dnsaddr.bootstrap.libp2p.io`:

- `/dnsaddr/sg1.bootstrap.libp2p.io/p2p/QmcZf59bWwK5XFi76CZX8cbJ4BhTzzA3gU1ZjYZcYW3dwt`
- `/dnsaddr/sv15.bootstrap.libp2p.io/p2p/QmNnooDu7bfjPFoTZYxMNLWUQJyrVwtbZg5gBMjTezGAJN`
- `/dnsaddr/am6.bootstrap.libp2p.io/p2p/QmbLHAnMoJPWSCR5Zhtx6BHJX9KiKNN6tpvbUcqanj75Nb`
- `/dnsaddr/ny5.bootstrap.libp2p.io/p2p/QmQCU2EcMqAqQPR2i9bChDtGNJchTbq5TbXJJ16u19uLTa`

> **Note:** You can query DNS for the specific records with the following command: `dig +short TXT _dnsaddr.bootstrap.libp2p.io`

## Frequently Asked Questions (FAQs)

### How is the ipfs.io gateway different from other gateways?

The ipfs.io gateway is a gateway run by The IPFS Foundation. Many other entities run their own gateways with different policies around throttling and access, which may be subject to other local laws and regulations. A [list of public gateways is available here](https://ipfs.github.io/public-gateway-checker/).

The IPFS Foundation does not store or host the data that is viewable through the ipfs.io gateway. Rather, the ipfs.io gateway allows users to view content hosted by third parties. The IPFS Foundation does not have any control over the data that is viewed through the ipfs.io gateway, nor does the IPFS Foundation have control over other gateways.

### Is the ipfs.io gateway a data storage host?

No. The ipfs.io gateway is a passthrough portal to data hosted by third parties on nodes in the IPFS network. It is not a data storage host.

### Can websites rely on the ipfs.io gateway for hosting?

No. Websites should not rely on the ipfs.io gateway for hosting of any kind. The ipfs.io gateway is a community resource run by the IPFS Foundation to help developers build on IPFS. Users of the ipfs.io gateway must use resources sparingly. The IPFS Foundation will throttle or ban users who overuse or misuse community resources, including relying on the ipfs.io gateway for website hosting or violating the Community Code of Conduct.

### How does the ipfs.io Gateway handle global data regulations?

The IPFS Foundation complies with the laws and regulations of relevant jurisdictions.

As explained above, the ipfs.io gateway is not a website hosting provider or data storage provider, and the IPFS Foundation cannot remove material from the Internet that is accessible through the ipfs.io gateway.

### Who is responsible for the content that is viewed through the ipfs.io gateway?

Users of the ipfs.io gateway are required to comply with all applicable laws and regulations while using the ipfs.io gateway.

The ipfs.io gateway is not a data storage provider or website host. The ipfs.io gateway allows users to view content hosted by third parties over which the IPFS Foundation exercises no control. The fact that certain content is viewable through the ipfs.io gateway does not mean it is hosted by the ipfs.io gateway or that the IPFS Foundation can do anything to delete that content.

As explained above, the ipfs.io gateway is not a website hosting provider or data storage provider, and the IPFS Foundation cannot remove material from the Internet that is accessible through the ipfs.io gateway. If you believe that material accessible through the ipfs.io gateway is illegal or violates your copyright, you are encouraged to directly notify whoever is hosting or controls that data.

While the ipfs.io gateway does not serve as a host for data or websites, in appropriate circumstances, the IPFS Foundation can disable the ability to view certain content via the ipfs.io gateway. This does not mean that the data itself has been taken down from the network but rather that the content is not viewable using the ipfs.io gateway. This also will not impact the availability of the data through other gateways run by other parties.

### Can the IPFS Foundation take down content viewable through the ipfs.io gateway?

No. The ipfs.io gateway is one of many portals used to view content stored by third parties on the Internet. The IPFS Foundation is not hosting that content and cannot take it down, but it can block the ability of users to view that content via the ipfs.io gateway in appropriate circumstances.
