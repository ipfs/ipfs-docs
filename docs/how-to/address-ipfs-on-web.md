---
title: Address IPFS on the Web
description: Hands-on guides to using and developing with IPFS to build decentralized web apps and services.
---

# Address IPFS on the web

How to link to content on IPFS.

```shell
https://ipfs.io/ipfs/<CID>
# e.g
https://ipfs.io/ipfs/Qme7ss3ARVgxv6rXqVPiikMJ8u2NLgmgszg13pYrDKEoiu
```

Browsers that support IPFS can redirect these requests to your local IPFS node, while those that don't can fetch the resource from the ipfs.io gateway.

You can swap out `ipfs.io` for your own http-to-ipfs gateway, but you are then obliged to keep that gateway running _forever_. If your gateway goes down, users with IPFS aware tools will still be able to fetch the content from the IPFS network as long as any node still hosts it, but for those without, the link will be broken. Don't do that.

## Dweb addressing in brief

- In IPFS, addresses (for content) are path-like; they are components separated by slashes.
- The first component is the protocol, which tells you how to interpret everything after it.
- Content referenced by a hash might have named links. (For example, a Git commit has a link named `parent`, which is really just a pointer to the hash of another Git commit.) Everything after the CID in an IPFS address is those named links.
- Since these addresses aren’t URLs, using them in a web browser requires reformatting them slightly:
    - Through an HTTP gateway, as `http://<gateway host>/<IPFS address>`
    - Through the gateway subdomain (more secure, harder to set up): `http://<cid>.ipfs.<gateway host>/<path>`, so the protocol and CID are subdomains.
    - Through custom URL protocols like `ipfs://<CID>/<path>`, `ipns://<peer ID>/<path>`, and `dweb://<IPFS address>`

## HTTP gateways

Gateways are provided strictly for convenience: in other words, they help tools that speak HTTP but do not speak distributed protocols (such as IPFS) to communicate. They are the first stage of the upgrade path for the web. [More information about IPFS Gateways](../concepts/ipfs-gateway.md).

### Centralization

HTTP gateways have worked well since 2015, but they come with a significant set of limitations related both to the centralized nature of HTTP and some of HTTP's semantics. Location-based addressing of a gateway depends on both DNS and HTTPS/TLS, which relies on trust in [certificate authorities](https://en.wikipedia.org/wiki/Certificate_authority) (CAs) and [public key infrastructure](https://en.wikipedia.org/wiki/Public_key_infrastructure) (PKI). In the long term, these issues should be mitigated by the use of opportunistic protocol upgrade schemes.

### Protocol upgrade

Tools and browser extensions should detect IPFS content paths and resolve them directly over IPFS protocol. They should use HTTP gateway only as a fallback when no native implementation is available in order to ensure a smooth, backward-compatible transition.

::: tip
Use relative or absolute URLs that include content-addressed paths. This will take advantage of content addressing today while ensuring backward compatibility with the legacy web.

For example, a website can load static assets from content-addressed paths:

```
<link rel="stylesheet" href="https://example.com/ipfs/QmNrgEMcUygbKzZeZgYFosdd27VE9KnWbyUD73bKZJ3bGi?filename=style.css">
```

```
<link rel="stylesheet" href="/ipfs/QmNrgEMcUygbKzZeZgYFosdd27VE9KnWbyUD73bKZJ3bGi?filename=style.css">
```

User agents that support IPFS, such as a browser with [ipfs-companion](https://docs.ipfs.io/install/ipfs-companion/), may recognize the `/ipfs/<CID>` content path and load the related asset over IPFS instead of HTTP. User agents without IPFS support still get the correct data from the original HTTP server.
:::

### Path gateway

In the most basic scheme, a URL path used for content addressing is effectively a resource name without a canonical location. The HTTP server provides the location part, which makes it possible for browsers to interpret an IPFS content path as relative to the current server and just work without a need for any conversion:

```plaintext
https://<gateway-host>.tld/ipfs/<cid>/path/to/resource
https://<gateway-host>.tld/ipns/<ipnsid_or_dnslink>/path/to/resource
```

::: danger
In this scheme, all pages share a [single origin](https://en.wikipedia.org/wiki/Same-origin_policy), which means this type of gateway should be used only when site isolation does not matter (static content without cookies, local storage, or Web APIs that require user permission).

When in doubt, use [subdomain gateway](#subdomain-gateway).
:::

Examples:

```plaintext
https://ipfs.io/ipfs/bafybeiemxf5abjwjbikoz4mc3a3dla6ual3jsgpdr4cjr3oz3evfyavhwq/wiki/Vincent_van_Gogh.html
https://ipfs.io/ipfs/QmT5NvUtoM5nWFfrQdVrFtvGfKFmG7AHE8P34isapyhCxX/wiki/Mars.html
https://ipfs.io/ipns/tr.wikipedia-on-ipfs.org/wiki/Anasayfa.html
```

### Subdomain gateway

When [origin-based security](https://en.wikipedia.org/wiki/Same-origin_policy) is needed, [CIDv1](../concepts/content-addressing.md#identifier-formats) in case-insensitive encoding such as Base32 or Base36 should be used in the subdomain:

```plaintext
https://<cidv1b32>.ipfs.<gateway-host>.tld/path/to/resource
```

Example:

```plaintext
https://bafybeiemxf5abjwjbikoz4mc3a3dla6ual3jsgpdr4cjr3oz3evfyavhwq.ipfs.dweb.link/wiki/
https://bafybeiemxf5abjwjbikoz4mc3a3dla6ual3jsgpdr4cjr3oz3evfyavhwq.ipfs.cf-ipfs.com/wiki/Vincent_van_Gogh.html
https://bafybeiemxf5abjwjbikoz4mc3a3dla6ual3jsgpdr4cjr3oz3evfyavhwq.ipfs.localhost:8080/wiki/
```

#### Native support in go-ipfs 0.5+

[go-ipfs](https://dist.ipfs.io/#go-ipfs) provides native support for subdomain gateways on hostnames defined in the [`Gateway.PublicGateways`](https://github.com/ipfs/go-ipfs/blob/master/docs/config.md#gatewaypublicgateways) configuration map.

Learn more about daemon configuration for hosting a public gateway:

- [`Gateway.PublicGateways` docs](https://github.com/ipfs/go-ipfs/blob/master/docs/config.md#gatewaypublicgateways) for defining gateway behavior on specified hostnames
- [`Gateway` recipes](https://github.com/ipfs/go-ipfs/blob/master/docs/config.md#gateway-recipes) with ready to use one-liners for most common use cases

::: warning Known issues

- Some browsers and other user agents force lowercase for the authority part of URLs, breaking case-sensitive CIDs before the HTTP gateway has a chance to read them
- DNS label length is limited to 63 characters ([RFC 1034](https://tools.ietf.org/html/rfc1034#page-7))

Due to these limitations, the use of short, case-insensitive CIDv1 in a subdomain context is advised.
Base32 is the safe default; the less-popular Base36 can be used for longer ED25519 libp2p keys.

See the next section to learn how to convert an existing CIDv0 to a DNS-safe representation.

:::

#### CID conversion for subdomains

If you have content identified by an older CIDv0, there are easy ways to safely represent it as CIDv1 for use in subdomains and other case-insensitive contexts.

#### Automatic — leverage the gateway in go-ipfs

**TL;DR:** Using a subdomain gateway as a drop-in replacement for a path one removes the need for manual CID conversion.

Request for a content path sent to the gateway domain will return an HTTP 301 redirect to a correct subdomain version, taking care of any necessary encoding conversion if needed:

```plaintext
https://<gateway-host>.tld/ipfs/<cid> -> https://<cidv1>.ipfs.<gateway-host>.tld/
```

To illustrate, opening the CIDv0 resource at [`https://dweb.link/ipfs/QmT5NvUtoM5nWFfrQdVrFtvGfKFmG7AHE8P34isapyhCxX/wiki/Mars.html`](https://dweb.link/ipfs/QmT5NvUtoM5nWFfrQdVrFtvGfKFmG7AHE8P34isapyhCxX/wiki/Mars.html)
returns a redirect to a CIDv1 representation at [`https://bafybeicgmdpvw4duutrmdxl4a7gc52sxyuk7nz5gby77afwdteh3jc5bqa.ipfs.dweb.link/wiki/Mars.html`](https://bafybeicgmdpvw4duutrmdxl4a7gc52sxyuk7nz5gby77afwdteh3jc5bqa.ipfs.dweb.link/wiki/Mars.html).

The gateway takes care of converting the CID to case-insensitive encoding.
The multihash in CIDv1 is the same as in the original CIDv0.

#### Manual — use cid.ipfs.io or the command line

One can also do the conversion manually.
To convert a CID to Base32 ([RFC4648](https://tools.ietf.org/html/rfc4648#section-6), no padding) use [cid.ipfs.io](https://cid.ipfs.io) or the command line:

```shell-session
$ ipfs cid base32 QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR
bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi
```

PeerIDs can be represented as [CID with `libp2p-key` multicodec](https://github.com/libp2p/specs/blob/master/RFC/0001-text-peerid-cid.md).
Base36 is suggested as a safer default for longer keys:

```shell-session
$ ipfs key list -l --ipns-base base36
k51qzi5uqu5dh9ihj4p2v5sl3hxvv27ryx2w0xrsv6jmmqi91t9xp8p9kaipc2 self

$ ipfs cid format -v 1 -b base36 --codec libp2p-key QmNnooDu7bfjPFoTZYxMNLWUQJyrVwtbZg5gBMjTezGAJN
k2k4r8jl0yz8qjgqbmc2cdu5hkqek5rj6flgnlkyywynci20j0iuyfuj
```

### DNSLink gateway

The gateway provided by the IPFS daemon understands the `Host` header present in HTTP requests and will check if [DNSLink](../concepts/dnslink.md) exists for a specified [domain name](https://en.wikipedia.org/wiki/Fully_qualified_domain_name).
If DNSLink is present, the gateway will return content from a path resolved via DNS TXT record.
This type of gateway provides full [origin isolation](https://en.wikipedia.org/wiki/Same-origin_policy).

Example: [https://docs.ipfs.io](https://docs.ipfs.io) (this website)

::: tip
For a complete DNSLink guide, including tutorials, usage examples, and FAQs, check out [dnslink.io](https://dnslink.io).
:::

## Native URLs

```plaintext
ipfs://{cid}/path/to/subresource/cat.jpg
```

The native address format is the same as a [subdomain gateway](https://docs.ipfs.io/how-to/address-ipfs-on-web/#subdomain-gateway) HTTP URL, but with:

- protocol scheme replaced by `ipfs` or `ipns` namespace
- location-based authority component (gateway host+port) replaced with content-addressed one in the form of a unique content identifier (CID)

::: tip

Our North Star here is to reuse existing standards to maximize interop with existing user agents like browsers and CLI tools, so if something is not clear, HTTP URL rules apply.

:::


```plaintext
ipfs://{cidv1}
ipfs://{cidv1}/path/to/resource

ipns://{cidv1-libp2p-key}
ipns://{cidv1-libp2p-key}/path/to/resource
ipns://{dnslink-name}/path/to/resource
```

Every "URL" address can be turned into a content path with ease:

> `ipfs://{immutable-root}/path/to/resourceA` → `/ipfs/{immutable-root}/path/to/resourceA`  
> `ipns://{mutable-root}/path/to/resourceB` → `/ipns/{mutable-root}/path/to/resourceB`

The first element after the double slash is an opaque identifier representing the content root. It is interpreted as an authority component used for origin calculation, which provides necessary isolation between security contexts of different content trees.

Example:

```plaintext
ipfs://bafybeiemxf5abjwjbikoz4mc3a3dla6ual3jsgpdr4cjr3oz3evfyavhwq/wiki/Vincent_van_Gogh.html
```

::: warning Avoid case-sensitive CID encodings

Some user agents will force-lowercase the CID component of URL-like address.
To ensure interop with existing libraries and software, use case-insensitive CID encoding. Use of CIDv1 in Base32 or Base36 is advised.

:::

## Further resources

### Technical specification for implementers

The best and most up-to-date source of truth about IPFS addressing can be found in [the IPFS in-web-browsers repo](https://github.com/ipfs/in-web-browsers/blob/master/ADDRESSING.md).

### Background on address scheme discussions

Discussions around IPFS addressing have been going on since [@jbenet](https://github.com/jbenet) published the [IPFS whitepaper](https://ipfs.io/ipfs/QmR7GSQM93Cx5eAg6a6yRzNde1FQv7uL6X1o4k7zrJa3LX/ipfs.draft3.pdf), with a number of other approaches being proposed. This long-standing design discussion includes many lengthy GitHub issue threads, but a good summary can be found in [this PR](https://github.com/ipfs/specs/pull/152).

### IPFS Companion

[IPFS Companion](https://github.com/ipfs-shipyard/ipfs-companion#ipfs-companion) is a browser extension that simplifies access to IPFS resources.

It provides support for native URLs and will automatically redirect IPFS gateway requests to your local daemon so that you are not relying on or trusting remote gateways.

### Shared d-web namespace

This concept isn't yet built but may be explored and experimented with in the future. The distributed web community is exploring the idea of a shared `dweb` namespace to remove the complexity of addressing IPFS and other content-addressed protocols. Currently investigated approaches include:

- `dweb://` protocol handler ([arewedistributedyet/issues/28](https://github.com/arewedistributedyet/arewedistributedyet/issues/28))
- `.dweb` special-use top-level domain name ([arewedistributedyet/issues/34](https://github.com/arewedistributedyet/arewedistributedyet/issues/34))

