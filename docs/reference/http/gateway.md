---
title: HTTP Gateway
description: HTTP Gateway API reference for IPFS clients.
---

# HTTP Gateway reference

Gateways provide implementation and runtime agnostic HTTP interface for retrieving [content-addressed](../../concepts/glossary.md#content-addressing) data from IPFS with regular HTTP clients and libraries.


## API

### `GET /ipfs/{cid}[/{path}][?{params}]`

- `cid` is a [CID](../../concepts/glossary.md#cid), the root identifier of the requested content path
- `path` – optional path under the root CID

Optional query parameters:

- `filename` sets the name returned in `Content-Disposition` HTTP header
- `download` set to `true` will skip rendering and force browsers to present a 'Save as' dialog
- `format` URL-friendly alternative to sending `Accept` header

::: tip Before you continue

Make sure you understand [how to address IPFS on the web](../../how-to/address-ipfs-on-web.md) and the differences between [Path Gateways](../../how-to/address-ipfs-on-web.md#path-gateway) and [Subdomain Gateways](../../how-to/address-ipfs-on-web.md#subdomain-gateway).

:::

## Trusted vs trustless

Gateways can be used in a trusted or trustless way.
HTTP clients are in control; they decide how much trust and work is delegated to the gateway.

### Delegating trust

By default, a gateway will take care of UnixFS deserialization and return reassembled files to the client, as if they were stored in a traditional HTTP server. This means all validation happens on the gateway, and clients trust that the gateway is correctly validating content-addressed data before returning it to them. 

#### Example: fetching an UnixFS file from a local gateway

```bash
$ curl "http://127.0.0.1:8080/ipfs/bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi" > cat.jpg
```

::: tip

When fetching a CID directly, one can include a `filename` parameter with file name to be used in `Content-Disposition` HTTP header: <https://ipfs.io/ipfs/bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi?filename=cat.jpg>

:::

### Trustless, verifiable retrieval

Clients capable of verifying content-addressed data on their own, should use [application/vnd.ipld.raw](https://www.iana.org/assignments/media-types/application/vnd.ipld.raw) and [application/vnd.ipld.car](https://www.iana.org/assignments/media-types/application/vnd.ipld.car) response types (raw [blocks](../../concepts/glossary.md#block) and [CARs](../../concepts/glossary.md#car)) and always ask for CIDs directly (`/ipfs/{cid}`).

::: callout

This mode of operation removes the need for trusting gateway returns correct data. Client can always verify that returned bytes match the requested CID.

:::

#### Example: fetching an entire DAG as a CAR stream from a public gateway

To request [application/vnd.ipld.car](https://www.iana.org/assignments/media-types/application/vnd.ipld.car) response type:

```bash
$ curl -H "Accept: application/vnd.ipld.car" "https://ipfs.io/ipfs/bafybeiakou6e7hnx4ms2yangplzl6viapsoyo6phlee6bwrg4j2xt37m3q?format=car" -L > dag.car
$ ipfs dag import dag.car
```

::: tip

A Client SHOULD include the [`format` query parameter](https://specs.ipfs.tech/http-gateways/trustless-gateway/#format-request-query-parameter) in the request URL, ideally in addition to the [`Accept` header](https://specs.ipfs.tech/http-gateways/trustless-gateway/#accept-request-header). This provides the best interoperability and ensures consistent HTTP cache behavior across various gateway implementations.

<https://ipfs.io/ipfs/bafybeiakou6e7hnx4ms2yangplzl6viapsoyo6phlee6bwrg4j2xt37m3q?format=car>

:::

::: tip Verify CAR without running full IPFS node

CAR verification does not require running IPFS node. Clients can leverage standalone tools and libraries such as [ipfs-car](https://www.npmjs.com/package/ipfs-car):

```bash
$ npm i -g ipfs-car
$ curl "https://ipfs.io/ipfs/bafybeiakou6e7hnx4ms2yangplzl6viapsoyo6phlee6bwrg4j2xt37m3q?format=car" -L | ipfs-car
$ ls ./bafybeiakou6e7hnx4ms2yangplzl6viapsoyo6phlee6bwrg4j2xt37m3q/
1007 - Sustainable - alt.txt
1007 - Sustainable - transcript.txt
1007 - Sustainable.png
```

:::

#### Example: fetching a single raw block from a public gateway

To request [application/vnd.ipld.raw](https://www.iana.org/assignments/media-types/application/vnd.ipld.raw) response type:

```bash
$ curl -H "Accept: application/vnd.ipld.raw" "https://ipfs.io/ipfs/bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi?format=raw" -L > raw-block.bin
$ ipfs block put raw-block.bin
bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi
```

::: tip

A Client SHOULD include the [`format` query parameter](https://specs.ipfs.tech/http-gateways/trustless-gateway/#format-request-query-parameter) in the request URL, ideally in addition to the [`Accept` header](https://specs.ipfs.tech/http-gateways/trustless-gateway/#accept-request-header). This provides the best interoperability and ensures consistent HTTP cache behavior across various gateway implementations.

<https://ipfs.io/ipfs/bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi?format=raw>

:::

## Specifications

The HTTP Gateway specification for IPFS implementers is available at [specs.ipfs.tech](https://specs.ipfs.tech/http-gateways/).
Below are links for the most useful specifications.


### HTTP

These are "low level" gateways that expose IPFS resources over HTTP protocol.

* [Path Gateway](https://specs.ipfs.tech/http-gateways/path-gateway/) ← **START HERE**, other types of gateway are specified as a delta against this specification.
* [Trustless Gateway](https://specs.ipfs.tech/http-gateways/trustless-gateway/) is a subset that returns verifiable response types (raw [blocks](../../concepts/glossary.md#block) and [CARs](../../concepts/glossary.md#car))

### Web

Special types of gateway which leverage `Host` header in addition to URL `pathname`. Designed for website hosting and improved interoperability with web browsers and [origin-based security model](https://en.wikipedia.org/wiki/Same-origin_policy).

* [Subdomain Gateway](https://specs.ipfs.tech/http-gateways/subdomain-gateway/)
* [DNSLink Website Hosting](https://specs.ipfs.tech/http-gateways/dnslink-gateway/)

::: tip

If you are a gateway operator or an implementer, consider testing with [gateway-conformance](https://github.com/ipfs/gateway-conformance) test suite.

:::

