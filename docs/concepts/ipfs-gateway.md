---
title: IPFS Gateway
description: Learn why gateways are an important part of using IPFS in conjunction with the legacy web.
related:
  'IPFS Docs: Address IPFS on the Web': /how-to/address-ipfs-on-web/
  'IPFS public gateway checker': https://ipfs.github.io/public-gateway-checker/
  'Gateway specifications': https://specs.ipfs.tech/http-gateways/
---

# IPFS Gateway

An _IPFS gateway_ is a web-based service that gets content from an IPFS network (private, or the public swarm backed by Amino DHT), and makes it available via HTTP, allowing IPFS-incompatible browsers, tools and software to benefit from [content-addressing](https://docs.ipfs.tech/concepts/content-addressing/). For example, some browsers or tools like [Curl](https://curl.haxx.se/) or [Wget](https://www.gnu.org/software/wget/) don't support IPFS natively and cannot access to IPFS content using canonical addressing like `ipfs://{CID}/{optional path to resource}`. While tools like [IPFS Companion](https://github.com/ipfs-shipyard/ipfs-companion) add browser support for native IPFS URLs, this is not always an option. As such, there are multiple gateway types and <VueCustomTooltip label="A way to address data by its hash rather than its location (IPs)." underlined multiline>gateway providers</VueCustomTooltip> available so that applications of all kinds can interface with IPFS using HTTP.

This page discusses:

- [Gateway request lifecycle](#gateway-request-lifecycle)
- [Gateway providers](#gateway-providers)
- [Gateway types](#gateway-types)
- [Working with gateways](#working-with-gateways)
- [Implementing gateways](#implementing-gateways)
- [FAQs](#frequently-asked-questions-faqs)

## Gateway request lifecycle

:::callout
This section uses the _default_ gateway request lifecycle of [IPFS Kubo](https://github.com/ipfs/kubo) to introduce the basic concepts in the lifecycle. However, some gateways only serve content that they have and/or want to provide. For example, a Kubo gateway with `NoFetch` enabled will not attempt to retrieve content from the network.
:::

When a client request for a CID reaches an IPFS gateway, the gateway first checks whether the CID is cached locally. At this point, one of the following occurs:

- **If the CID is cached locally**, the gateway responds with the content referred to by the CID, and the lifecycle is complete.

- **If the CID is not in the local cache**, the gateway will attempt to retrieve it from the network.

The CID retrieval process is composed of two parts, content discovery / routing and content retrieval:

1. In the **content discovery / routing** step, the gateway will determine <VueCustomTooltip label="An IPFS network peer that can provide data specified by a particular CID upon request." underlined multiline>provider</VueCustomTooltip> location; that is, _where_ the data specified by the CID can be found:

   - Asking peers that it is directly connected to if they have the data specified by the CID.
   - Query the DHT for the IDs and network addresses of peers that have the data specified by the CID.

2. Next, the gateway performs **content retrieval**, which can be broken into the following steps:

   1. The gateway connects to the provider.
   1. The gateway fetches the CIDs content.
   1. The gateway streams the content to the client.

:::callout
- Learn more about content discovery, routing, retrieval and the subsystems involved in each part of the process in [How IPFS works](./how-ipfs-works.md).
- Dive into the technical specifications for gateways in the [IPFS HTTP Gateways specification](https://specs.ipfs.tech/http-gateways/) page.
:::

## Gateway providers
 
Regardless of who deploys a gateway and where, any IPFS gateway resolves access to any requested IPFS [content identifier](content-addressing.md). Therefore, for best performance, when you need the service of a gateway, you should use the one closest to you.

### Your local gateway

Your machine may host a gateway as a local service; e.g., at `localhost:8080`. You have a local gateway service if you installed [IPFS Desktop](https://github.com/ipfs-shipyard/ipfs-desktop#ipfs-desktop) or another form of IPFS node.

### Private gateways

_Private gateways_ are configured to limit access to requests from specific domains or parts of the public internet. 

They are frequently, but not exclusively, used behind firewalls. Running [IPFS Desktop](https://github.com/ipfs-shipyard/ipfs-desktop#ipfs-desktop) or another form of IPFS node triggers connection attempts to other IPFS peers. Private network administrators may treat such connection attempts as potential security vulnerabilities. Private IPFS gateway servers located inside the private network and running a trusted code base provide an alternative architecture for read/write access to externally-hosted IPFS content.

### Public gateways

For more information about public gateways, see the [Public IPFS Gateways](./public-utilities.md#public-ipfs-gateways)

## Gateway types

There are multiple gateway types, each with specific use case, security, performance, and functional implications.

- [Read support](#read-only-gateways)
- [Authentication support](#authenticated-gateways)
- [Resolution style](#resolution-style)
- [Service](#gateway-services)

### Read-only gateways

_Read-only gateways_ are the simplest kind of gateway. This gateway type provides a way to fetch IPFS content using the HTTP GET method.

### Authenticated gateways

If a gateway provider wants to limit access to requests with authentication, they may need to configure a reverse proxy, develop an IPFS plugin, or set a cache-layer above IPFS.

Configuring a reverse proxy is the most popular way for providers handling authentication. Reverse proxy can also keep the original IPFS API calls which makes gateway adaptable to all IPFS SDK and toolkits.

![Auth with Reverse proxy](./images/ipfs-gateways/public-authed-gateway.png)

Providers can design their own centralized authentication service like [Infura IPFS Auth](https://docs.infura.io/networks/ipfs/how-to/authenticate-requests), or a decentralized authentication service like [IPFS W3Auth](https://wiki.crust.network/docs/en/buildIPFSWeb3AuthGW)).

### Resolution style

Three resolution styles exist:

- [Path](#path)
- [Subdomain](#subdomain)
- [DNSLink](#dnslink)

#### Path

The examples discussed above employed path resolution:

```bash
https://{gateway URL}/ipfs/{content ID}/{optional path to resource}
```

Path-resolving gateways, however, violate the [same-origin policy](https://en.wikipedia.org/wiki/Same-origin_policy) that protects one website from improperly accessing session data of another website.

:::warning
This type of gateway does not provide origin isolation and should not be used for hosting web apps.

Learn more at [Address IPFS on the web: Path Gateway](../how-to/address-ipfs-on-web.md#path-gateway)
:::

#### Subdomain

Subdomain resolution style maintains compliance with the [single-origin policy](https://en.wikipedia.org/wiki/Same-origin_policy). The canonical form of access, `https://{CID}.ipfs.{gatewayURL}/{optional path to resource}`, causes the browser to interpret each returned file as being from a different origin.

::: callout
This type of gateway does provide origin isolation and should be used for hosting web apps.

Learn more at [Address IPFS on the web: Subdomain Gateway](../how-to/address-ipfs-on-web.md#subdomain-gateway)
:::

#### DNSlink

Whenever the content of data within IPFS changes, IPFS creates a new CID based on the content of that data. Many applications require access to the latest version of a file or website but will not know the exact CID for that latest version. The [InterPlanetary Name Service (IPNS)](ipns.md) allows a version-independent IPNS identifier to resolve into the current version's IPFS CID.

The version-independent IPNS identifier contains a hash. When a gateway processes a request in the form `https://{gatewayURL}/ipns/{IPNS identifier}/{optional path}`, the gateway employs IPNS to resolve the IPNS identifier into the current version's CID and then fetches the corresponding content.

But the IPNS identifier may instead refer to a fully-qualified domain name in the usual form of `example.com`.

DNSLink resolution occurs when the gateway recognizes an IPNS identifier contains `example.com`. For example, the URL `https://libp2p.io` returns the current version of that website — a site stored in IPFS — as follows:

1. The gateway receives a request in the form:

   ```bash
   https://{gateway URL}/ipns/{example.com}/{optional path}
   ```

2. The gateway searches the DNS TXT records of the requested domain `{example.com}` for a string of the form `dnslink=/ipfs/{CID}` or `_dnslink=/ipfs/{CID}`. If found, the gateway uses the specified CID to serve up `ipfs://{CID}/{optional path}`. As with path resolution, this form of DNSLink resolution violates the single-origin policy. The domain operator may ensure single-origin policy compliance — and the delivery of the current version of content — by adding an `Alias` record in the DNS that refers to a suitable IPFS gateway; e.g., `gateway.ipfs.io`.
3. The `Alias` record redirects any access to that `example.com` to the specified gateway. Hence the browser's request to `https://{example.com}/{optional path to resource}` redirects to the gateway specified in the `Alias`.
4. The gateway employs DNSLink resolution to return the current content version from IPFS.
5. The browser does not perceive the gateway as the origin of the content and therefore enforces the single-origin policy to protect `example.com`.

::: callout
Learn more at [Address IPFS on the web: DNSLink Gateway](../how-to/address-ipfs-on-web.md#dnslink-gateway)
:::

### Gateway services

Currently HTTP gateways may access both IPFS and IPNS services:

| Service | Style     | Canonical form of access                                                                                                                                                                      |
| ------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| IPFS    | path      | `https://{gateway URL}/ipfs/{CID}/{optional path to resource}`                                                                                                                                |
| IPFS    | subdomain | `https://{CID}.ipfs.{gatewayURL}/{optional path to resource}`                                                                                                                                 |
| IPFS    | DNSLink   | `https://{example.com}/{optional path to resource}` **preferred**, or <br>`https://{gateway URL}/ipns/{example.com}/{optional path to resource}`                                              |
| IPNS    | path      | `https://{gateway URL}/ipns/{IPNS identifier}/{optional path to resource}`                                                                                                                    |
| IPNS    | subdomain | `https://{IPNS identifier}.ipns.{gatewayURL}/{optional path to resource}`                                                                                                                     |
| IPNS    | DNSLink   | Useful when IPNS identifier is a domain: <br>`https://{example.com}/{optional path to resource}` **preferred**, or <br>`https://{gateway URL}/ipns/{example.com}/{optional path to resource}` |

## Working with gateways

For more information on working with gateways, see [best practices](../how-to/gateway-best-practices.md) and [troubleshooting](../how-to/gateway-troubleshooting.md).

## Implementing gateways

If you would like to read the technical specifications for the various gateway types, and learn more about how to implement a gateway, see the [IPFS HTTP Gateways specification](https://specs.ipfs.tech/http-gateways/) page for more information.

## Learning more

- [A Practical Explainer for IPFS Gateways – Part 1](https://blog.ipfs.tech/2022-06-09-practical-explainer-ipfs-gateways-1/), [Part 2](https://blog.ipfs.tech/2022-06-30-practical-explainer-ipfs-gateways-2/)
- [Kubo: Gateway configuration options](https://github.com/ipfs/kubo/blob/master/docs/config.md#gateway)
- [IPFS HTTP Gateways specification](https://specs.ipfs.tech/http-gateways/)
