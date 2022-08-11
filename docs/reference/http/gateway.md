---
title: HTTP Gateway
description: HTTP Gateway API reference for IPFS clients.
---

# HTTP Gateway reference

Gateways provide implementation and runtime agnostic HTTP interface for retrieving [content-addressed](../../concepts/glossary/#content-addressing) data from IPFS with regular HTTP clients and libraries.


## API

### `GET /ipfs/{cid}[/{path}][?{params}]`

- `cid` is a [CID](../../concepts/glossary/#cid), the root identifier of the requested content path
- `path` – optional path under the root CID

Optional query parameters:

- `filename` sets the name returned in `Content-Disposition` HTTP header
- `download` set to `true` will skip rendering and force browsers to present a 'Save as' dialog
- `format` URL-friendly alternative to sending `Accept` header

::: tip Before you continue

Make sure you understand [how to address IPFS on the web](../../how-to/address-ipfs-on-web/), and what are differences between [Path](../../how-to/address-ipfs-on-web/#path-gateway) and [Subdomain Gateways](../../how-to/address-ipfs-on-web/#subdomain-gateway).

:::

## Trusted vs trustless

Gateways can be used in a trusted or trustless way.
HTTP clients are in control, decide how much trust and work is delegated to the gateway.

### Delegating trust

By default, a gateway will take care of UnixFS deserialization and return reassembled files to the client, as if they were stored in a traditional HTTP server. This means all validation happens on the gateway, and clients trust the gateway is correctly validating content-addressed data before returning it to them. 

#### Example: fetching an UnixFS file from a local gateway

```bash
$ curl "http://127.0.0.1:8080/ipfs/bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi" > cat.jpg
```

::: tip

When fetching a CID directly, one can include a `filename` parameter with file name to be used in `Content-Disposition` HTTP header: <https://ipfs.io/ipfs/bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi?filename=cat.jpg>

:::

### Trustless, verifiable retrieval

Clients capable of verifying content-addressed data on their own, should use [application/vnd.ipld.raw](https://www.iana.org/assignments/media-types/application/vnd.ipld.raw) and [application/vnd.ipld.car](https://www.iana.org/assignments/media-types/application/vnd.ipld.car) response types (raw [blocks](../../concepts/glossary/#block) and [CARs](../../concepts/glossary/#car)), and always ask for CIDs directly (`/ipfs/{cid}`).

::: callout

This mode of operation removes the need for trusting gateway returns correct data. Client can always verify that returned bytes match the requested CID.

:::

#### Example: fetching a raw block from a public gateway

Using `Accept` HTTP header with [application/vnd.ipld.raw](https://www.iana.org/assignments/media-types/application/vnd.ipld.raw) type:

```bash
$ curl -H "Accept: application/vnd.ipld.raw" "https://ipfs.io/ipfs/bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi" > raw-block.bin
$ ipfs block put raw-block.bin
bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi
```


::: tip

An alternative is to pass `?format=raw` URL parameter:

<https://ipfs.io/ipfs/bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi?format=raw>

:::

#### Example: fetching an entire DAG as a CAR stream from a public gateway

Using `Accept` HTTP header with [application/vnd.ipld.car](https://www.iana.org/assignments/media-types/application/vnd.ipld.car) type:

```bash
$ curl -H "Accept: application/vnd.ipld.car" "https://ipfs.io/ipfs/bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi" > dag.car
$ ipfs dag import dag.car
```

::: tip

An alternative is to pass `?format=car` URL parameter:

<https://ipfs.io/ipfs/bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi?format=car>

:::

## Specifications

HTTP Gateway specification for IPFS implementers is available in [ipfs/specs](https://github.com/ipfs/specs/blob/main/http-gateways/#readme) repository.
Below are links for the most useful specifications.


### HTTP

These are "low level" gateways that expose IPFS resources over HTTP protocol.

* [Path Gateway](https://github.com/ipfs/specs/blob/main/http-gateways/PATH_GATEWAY.md) ← **START HERE**, other types of gateway are specified as a delta against this specification.
* [Trustless Gateway](https://github.com/ipfs/specs/blob/main/http-gateways/TRUSTLESS_GATEWAY.md) is a subset that returns verifiable response types (raw [blocks](../../concepts/glossary/#block) and [CARs](../../concepts/glossary/#car))

### Web

Special types of gateway which leverage `Host` header in addition to URL `pathname`. Designed for website hosting and improved interoperability with web browsers and [origin-based security model](https://en.wikipedia.org/wiki/Same-origin_policy).

* [Subdomain Gateway](https://github.com/ipfs/specs/blob/main/http-gateways/SUBDOMAIN_GATEWAY.md)
* [DNSLink Website Hosting](https://github.com/ipfs/specs/blob/main/http-gateways/DNSLINK_GATEWAY.md)

::: tip

If you are a gateway operator or an implementer, consider joining [Gateway Operators Forum](https://discuss.ipfs.io/c/31)

:::

