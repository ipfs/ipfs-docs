---
title: HTTP Gateway
description: HTTP Gateway API reference for IPFS clients.
---

# HTTP Gateway reference

Gateways provide implementation and runtime agnostic HTTP interface for retrieving [content-addressed](/concepts/glossary/#content-addressing) data from IPFS with regular HTTP clients and libraries.

::: tip Before you dive into low level specifications...

Make sure you understand [how to address IPFS on the web](../how-to/address-ipfs-on-web/), and what are differences between [Path](/how-to/address-ipfs-on-web/#path-gateway) and [Subdomain Gateways](/how-to/address-ipfs-on-web/#subdomain-gateway).
:::

::: warning SPECIFICATION DRAFT (WORK IN PROGRESS)

<!-- TODO update this section (at least the links) when ipfs/specs PR lands -->
HTTP Gateway specification for IPFS implementers is being drafted in [ipfs/specs/pull/283](https://github.com/ipfs/specs/pull/283)

### HTTP

These are "low level" gateways that expose IPFS resources over HTTP protocol.

* [PATH_GATEWAY.md](https://github.com/ipfs/specs/blob/feat/gateway-specs/http-gateways/PATH_GATEWAY.md) ← **START HERE**
* [TRUSTLESS_GATEWAY.md](https://github.com/ipfs/specs/blob/feat/gateway-specs/http-gateways/TRUSTLESS_GATEWAY.md)

### Web

Special types of gateway which leverage `Host` header in addition to URL `pathname`. Designed for website hosting and improved interoperability with web browsers and [origin-based security model](https://en.wikipedia.org/wiki/Same-origin_policy).

* [SUBDOMAIN_GATEWAY.md](https://github.com/ipfs/specs/blob/feat/gateway-specs/http-gateways/SUBDOMAIN_GATEWAY.md)
* [DNSLINK_GATEWAY.md](https://github.com/ipfs/specs/blob/feat/gateway-specs/http-gateways/DNSLINK_GATEWAY.md)

If you are a gateway operator or an implementer, consider providing feedback in [ipfs/specs/pull/283](https://github.com/ipfs/specs/pull/283)

:::

<!-- TODO document endpoints in brief and link to ipfs/specs for more details -->
