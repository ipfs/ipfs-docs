---
title: Address IPFS on the Web
meta:
  - name: twitter:title
    content: IPFS Docs - page title
  - property: og:title
    content: IPFS Docs - page title
  - itemprop: name
    content: IPFS Docs - page title
  - name: description
    content: description of this page less than 150 char
  - name: twitter:description
    content: description of this page less than 150 char
  - property: og:description
    content: description of this page less than 150 char
---

# Address IPFS on the Web

<!--
Based on the existing spec at:
https://github.com/ipfs/in-web-browsers/blob/2896b7a642011bc92493971232b146e04c9a889c/ADDRESSING.md

Note there are pending tasks to update/extend spec:
https://github.com/ipfs/in-web-browsers/issues/147
-->

This document is a guide to how to address IPFS content paths on the web.

## HTTP gateways

Gateways are provided strictly for convenience: in other words, they help tools that speak HTTP but do not speak distributed protocols such as IPFS. They are the first stage of the upgrade path for the web.

### Centralization

HTTP gateways have worked well since 2015, but they come with a significant set of limitations related both to the centralized nature of HTTP and some of HTTP's semantics. Location-based addressing of a gateway depends on both DNS and HTTPS/TLS, which relies on a trust in [certificate authorities](https://en.wikipedia.org/wiki/Certificate_authority) (CAs) and [public key infrastructure](https://en.wikipedia.org/wiki/Public_key_infrastructure) (PKI). In the long term, these issues should be mitigated by use of opportunistic protocol upgrade schemes.

### Protocol upgrade

Tools and browser extensions should detect IPFS content paths and resolve them directly over IPFS protocol. They should use HTTP gateway only as a fallback when no native implementation is available in order to ensure a smooth, backward-compatible transition.

### Gateway types

#### Path gateway

In the most basic scheme, a URL path used for content addressing is effectively a resource name without a canonical location. The HTTP server provides the location part, which makes it possible for browsers to interpret an IPFS content path as relative to the current server and just work without a need for any conversion:

```
https://<gateway-host>.tld/ipfs/<cid>/path/to/resource
https://<gateway-host>.tld/ipns/<ipnsid_or_dnslink>/path/to/resource
```

<aside class="alert alert-info">
  In this scheme, all pages share a <a href="https://en.wikipedia.org/wiki/Same-origin_policy" target="_blank">single Origin&nbsp;<i class="fas fa-external-link-square-alt fa-sm"></i></a>, which means this type of gateway should be used when site isolation does not matter.
</aside>

Examples:

```
https://ipfs.io/ipfs/bafybeiemxf5abjwjbikoz4mc3a3dla6ual3jsgpdr4cjr3oz3evfyavhwq/wiki/Vincent_van_Gogh.html
https://ipfs.io/ipfs/QmT5NvUtoM5nWFfrQdVrFtvGfKFmG7AHE8P34isapyhCxX/wiki/Mars.html
https://ipfs.io/ipns/tr.wikipedia-on-ipfs.org/wiki/Anasayfa.html
```

#### Subdomain gateway

When [origin-based security](https://en.wikipedia.org/wiki/Same-origin_policy) perimeter is needed, [CIDv1](https://github.com/ipld/cid#cidv1) in Base32 ([RFC4648](https://tools.ietf.org/html/rfc4648#section-6), no padding) should be used in the subdomain:

    https://<cidv1-base32>.ipfs.<gateway-host>.tld/path/to/resource

Example:

    https://bafybeiemxf5abjwjbikoz4mc3a3dla6ual3jsgpdr4cjr3oz3evfyavhwq.ipfs.dweb.link/wiki/
    https://bafybeiemxf5abjwjbikoz4mc3a3dla6ual3jsgpdr4cjr3oz3evfyavhwq.ipfs.cf-ipfs.com/wiki/Vincent_van_Gogh.html

<aside class="alert alert-info">
  Right now, this type of gateway requires additional configuration (<a href="https://github.com/ipfs/infra/issues/81#issuecomment-461045160" target="_blank">example for Nginx&nbsp;<i class="fas fa-external-link-square-alt fa-sm"></i></a>); however, there is ongoing work to <a href="https://github.com/ipfs/go-ipfs/issues/5982" target="_blank">add native support in the IPFS daemon&nbsp;<i class="fas fa-external-link-square-alt fa-sm"></i></a>.
</aside>

#### DNSLink gateway

The gateway provided by the IPFS daemon understands the `Host` header present in HTTP requests, and will check if [DNSLink](/guides/concepts/dnslink) exists for a specified [domain name](https://en.wikipedia.org/wiki/Fully_qualified_domain_name).
If DNSLink is present, the gateway will return content from a path resolved via DNS TXT record.
This type of gateway provides full [origin isolation](https://en.wikipedia.org/wiki/Same-origin_policy).

Example: [https://docs.ipfs.io](https://docs.ipfs.io) (this website)

For a more complete DNSLink guide, including tutorials, usage examples and FAQs, check out [dnslink.io](https://dnslink.io).

## Native URLs

Subdomain convention can be replaced with a native handler. The IPFS URL protocol scheme follows the same requirement of case-insensitive CIDv1 in Base32 as subdomains:

```
ipfs://{cidv1b32}/path/to/resource
```

An IPFS URL does not retain the original path, but instead requires a conversion step to/from URI representation:

> `ipfs://{immutable-root}/path/to/resourceA` → `/ipfs/{immutable-root}/path/to/resourceA`  
> `ipns://{mutable-root}/path/to/resourceB` → `/ipns/{mutable-root}/path/to/resourceB`

The first element after the double slash is an opaque identifier representing the content root. It is interpreted as an authority component used for origin calculation, which provides necessary isolation between security contexts of different content trees.

Example:

```
ipfs://bafybeiemxf5abjwjbikoz4mc3a3dla6ual3jsgpdr4cjr3oz3evfyavhwq/wiki/Vincent_van_Gogh.html
```

<aside class="alert alert-info">
  Support for case-insensitive IPNS roots  is a <a href="https://github.com/ipfs/go-ipfs/issues/5287" target="_blank">work in progress&nbsp;<i class="fas fa-external-link-square-alt fa-sm"></i></a>.
</aside>

## Further resources

### Technical specification for implementers

The best and most up-to-date source of truth about IPFS addressing can be found in [the IPFS in-web-browsers repo](https://github.com/ipfs/in-web-browsers/blob/master/ADDRESSING.md).

### Background on address scheme discussions

Discussions around IPFS addressing have been going on since @jbenet published the [IPFS whitepaper](https://ipfs.io/ipfs/QmR7GSQM93Cx5eAg6a6yRzNde1FQv7uL6X1o4k7zrJa3LX/ipfs.draft3.pdf), with a number of other approaches being proposed. This long-standing design discussion includes many lengthy GitHub issue threads, but a good summary can be found in [this PR&nbsp;<i class="fas fa-external-link-square-alt fa-sm"></i></a>](https://github.com/ipfs/specs/pull/152).

### IPFS Companion

[IPFS Companion](https://github.com/ipfs-shipyard/ipfs-companion#ipfs-companion) is a
browser extension that simplifies access to IPFS resources.

It provides support for native URLs and will automatically redirect IPFS gateway requests to your local daemon so that you are not relying on, or trusting, remote gateways.

### Shared dweb namespace

This concept isn't yet built, but may be explored and experimented with in the future. The distributed web community is exploring the idea of a shared `dweb` namespace to remove the complexity of addressing IPFS and other content-addressed protocols. Currently investigated approaches include:

- `dweb://` protocol handler ([arewedistributedyet/issues/28](https://github.com/arewedistributedyet/arewedistributedyet/issues/28))
- `.dweb` special-use top-level domain name ([arewedistributedyet/issues/34](https://github.com/arewedistributedyet/arewedistributedyet/issues/34))
