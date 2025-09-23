---
title: Address IPFS on the web
description: Hands-on guides to using and developing with IPFS to build decentralized web apps and services.
---

# Address IPFS on the web

This page describes how to address a node in the IPFS network. Clients that support the IPFS protocol can ignore HTTP details and retrieve data natively, while those that don't can fetch the resource from HTTP server at `ipfs.io` gateway, as long as they have the content identifier (CID).
When `ipfs.io` or any other [public gateway](https://ipfs.github.io/public-gateway-checker/) goes down, IPFS aware clients will still be able to fetch the content from the IPFS network as long as at least one node still provides the data behind the CID to the network:

Addresses using a gateway use the following form, where `<gateway>` is the gateway address, and `<CID>` is the content identifier

```shell
https://<gateway>/ipfs/<CID>
```

For example:

```shell
https://ipfs.io/ipfs/bafybeihkoviema7g3gxyt6la7vd5ho32ictqbilu3wnlo3rs7ewhnp7lly
```

A [self-hosted local gateway](https://docs.ipfs.io/install/) can also be used, instead of `ipfs.io`. 

## IPFS addressing in brief

In IPFS, content addresses are path-like; that is, the addresses are components separated by slashes. The first component is the protocol, which tells you how to interpret everything after it.

Content referenced by a hash may have named links. For example, a Git commit has a link named `parent`, which is really just a pointer to the hash of another Git commit. Components in an IPFS address after the CID are the named links.

Since content addresses aren’t URLs, using them in a web browser requires reformatting. The options for this are:

1. A [path gateway](#path-gateway)
   
   ```shell
   https://<gateway-host>/ipfs/<cid>/<path>
   ```
 
2. A [subdomain gateway](#subdomain-gateway), for hosting websites with origin isolation. This is more secure, but harder to set up.  

   ```shell
   https://<cid>.ipfs.<gateway-host>/<path> 
   ```
   
3. Native protocol handlers, when you don't want to hard-code a specific HTTP gateway in the URI:

   ```shell
   ipfs://<cid>/<path>
   ```
   
   ```shell
   ipns://<ipns-name>/<path>
   ```

## HTTP gateways

HTTP gateways allow tools that "speak" HTTP but do not speak "IPFS" to communicate. They are the first stage of the upgrade path for the web. [More information about IPFS Gateways](../concepts/ipfs-gateway.md). 

One downside of HTTP gateways is centralization. Location-based addressing of a gateway depends on both DNS and HTTPS/TLS, which relies on trust in [certificate authorities](https://en.wikipedia.org/wiki/Certificate_authority) (CAs) and [public key infrastructure](https://en.wikipedia.org/wiki/Public_key_infrastructure) (PKI). In the long term, these issues should be mitigated by the use of opportunistic protocol upgrade schemes.

### Protocol upgrade

Long term, deserialized responses returned by a public HTTP gateway are used only as a fallback when no native implementation of IPFS is available.

IPFS clients, user agents, tools and extensions should detect CIDs in URLs, DNSLinks or IPFS content paths and resolve them directly over the IPFS protocol. This ensures that the retrieved data matches the expected hash. 

Examples of user agents that support IPFS natively are:

- A standard web browser with [IPFS Companion](https://docs.ipfs.tech/install/ipfs-companion/) installed next to an IPFS node, such as [IPFS Desktop](https://docs.ipfs.tech/install/ipfs-desktop/)

## Path gateway

A path gateway is the most basic scheme. In this scheme, a URL path used for content addressing is effectively a resource name without a canonical location. The HTTP server provides the location part, which makes it possible for browsers to interpret an IPFS content path relative to the current server and work without need for any conversion. Given a gateway host address (i.e. `ipfs.io`), and a path to the resource, (i.e `/path/to/resource`), a [CID](../concepts/content-addressing.md) (`<cid>`), IPNS ID (`<ipnsid>`) or [DNSLink](../concepts/dnslink.md) (`<dnslink>`) can all be used.

[Using a CID](#cid)
[Using IPNS](#ipns)
[Using DNSLink](#dnslink)

### CID
Given a CID `<cid>`, a URL path can be constructed as follows:

```plaintext
https://<gateway-host>.tld/ipfs/<cid>/path/to/resource
```

Example:

```plaintext
https://ipfs.io/ipfs/bafybeiemxf5abjwjbikoz4mc3a3dla6ual3jsgpdr4cjr3oz3evfyavhwq/wiki/Vincent_van_Gogh.html
https://ipfs.io/ipfs/QmT5NvUtoM5nWFfrQdVrFtvGfKFmG7AHE8P34isapyhCxX/wiki/Mars.html
```

### IPNS
Given an [IPNS name](https://specs.ipfs.tech/ipns/ipns-record/#ipns-name) `<ipns-name>`, a URL path can be constructed as follows:

```plaintext
https://<gateway-host>.tld/ipns/<ipns-name>/path/to/resource
```

Example:

```plaintext
https://ipfs.io/ipns/k51qzi5uqu5dlvj2baxnqndepeb86cbk3ng7n3i46uzyxzyqj2xjonzllnv0v8
```

### DNSLink
Given a DNS name with a [DNSLink](https://dnslink.dev/) text record `<dnslink>`, a URL path can be constructed as follows:

```plaintext
https://<gateway-host>.tld/ipns/<dnslink>/path/to/resource
```

Example:

```plaintext
https://ipfs.io/ipns/tr.wikipedia-on-ipfs.org/wiki/Anasayfa.html
```

::: danger
In this scheme, all pages share a [single origin](https://en.wikipedia.org/wiki/Same-origin_policy). As such, this type of gateway should only be used when site isolation does not matter. Examples include static content without cookies, local storage, or APIs that require user permission.

When in doubt, use a [subdomain gateway](#subdomain-gateway).
:::

## Subdomain gateway

When [origin-based security](https://en.wikipedia.org/wiki/Same-origin_policy) is needed, a [CIDv1](../concepts/content-addressing.md#identifier-formats) in a case-insensitive encoding such as Base32 or Base36 should be used in the subdomain:

```plaintext
https://<cidv1b32>.ipfs.<gateway-host>.tld/path/to/resource
```

Examples:

```plaintext
https://bafybeiemxf5abjwjbikoz4mc3a3dla6ual3jsgpdr4cjr3oz3evfyavhwq.ipfs.dweb.link/wiki/
http://bafybeiemxf5abjwjbikoz4mc3a3dla6ual3jsgpdr4cjr3oz3evfyavhwq.ipfs.localhost:8080/wiki/Vincent_van_Gogh.html
```

::: warning Known issues

1. Some browsers and other user agents force lowercase for the authority part of URLs, breaking case-sensitive CIDs before the HTTP gateway has a chance to read them.
1. DNS label length is limited to 63 characters ([RFC 1034](https://datatracker.ietf.org/doc/html/rfc1034#page-7))

Due to these limitations, the use of short, case-insensitive CIDv1 in a subdomain context is advised.
Base32 is the safe default; the less-popular Base36 can be used for longer ED25519 libp2p keys.

See the next section to learn how to convert an existing CIDv0 to a DNS-safe representation.

:::

#### Native support in Kubo and Rainbow

[Kubo](https://dist.ipfs.tech/#kubo) provides native support for subdomain gateway, see  [`Gateway` recipes](https://github.com/ipfs/kubo/blob/master/docs/config.md#gateway-recipes) with ready to use one-liners for most common use cases.

If you need a high-performance HTTP gateway, you may want to deploy [Rainbow](https://github.com/ipfs/rainbow/) instead. Rainbow is a specialized IPFS HTTP gateway which makes it easier to scale HTTP retrieval and isolate it from your Bitswap provider backend, such as Kubo or IPFS Cluster. See `rainbow --help` for relevant configuration (`--subdomain-gateway-domains` and `RAINBOW_SUBDOMAIN_GATEWAY_DOMAINS`).

#### CID conversion for subdomains

If you have content identified by an older CIDv0, there are an automatic and a manual option to safely represent it as CIDv1 for use in subdomains and other case-insensitive contexts.

- [Automatic](#automatic--leverage-the-gateway-in-kubo)
- [Manual](#manual--use-cidipfsio-or-the-command-line)

##### Automatic — leverage the gateway in Kubo

Using a subdomain gateway as a drop-in replacement for a path one removes the need for manual CID conversion.

Requests for a content path sent to the gateway domain will return an HTTP 301 redirect to a correct subdomain version, taking care of any necessary encoding conversion if needed:

```plaintext
https://<gateway-host>.tld/ipfs/<cid> -> https://<cidv1>.ipfs.<gateway-host>.tld/
```

For example, opening the CIDv0 resource at [`https://dweb.link/ipfs/QmT5NvUtoM5nWFfrQdVrFtvGfKFmG7AHE8P34isapyhCxX/wiki/Mars.html`](https://dweb.link/ipfs/QmT5NvUtoM5nWFfrQdVrFtvGfKFmG7AHE8P34isapyhCxX/wiki/Mars.html)
returns a redirect to a CIDv1 representation at [`https://bafybeicgmdpvw4duutrmdxl4a7gc52sxyuk7nz5gby77afwdteh3jc5bqa.ipfs.dweb.link/wiki/Mars.html`](https://bafybeicgmdpvw4duutrmdxl4a7gc52sxyuk7nz5gby77afwdteh3jc5bqa.ipfs.dweb.link/wiki/Mars.html).

The gateway converts the CID to case-insensitive encoding.
The multihash in CIDv1 is the same as in the original CIDv0.

#### Manual — use cid.ipfs.io or the command line

The conversion can also be done manually.

To convert a CID to Base32 with no padding ([RFC4648](https://datatracker.ietf.org/doc/html/rfc4648#section-6)), use [cid.ipfs.io](https://cid.ipfs.io), or the command line. Below is an example using the command line:

```shell
ipfs cid base32 QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR
```

The output of this is:

```shell
bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi
```

PeerIDs can be represented as a [CID with `libp2p-key` multicodec](https://github.com/libp2p/specs/blob/master/RFC/0001-text-peerid-cid.md).
Base36 is suggested as a safer default for longer keys:

```shell
ipfs key list -l --ipns-base base36
k51qzi5uqu5dh9ihj4p2v5sl3hxvv27ryx2w0xrsv6jmmqi91t9xp8p9kaipc2 self

ipfs cid format -v 1 -b base36 --codec libp2p-key QmNnooDu7bfjPFoTZYxMNLWUQJyrVwtbZg5gBMjTezGAJN
k2k4r8jl0yz8qjgqbmc2cdu5hkqek5rj6flgnlkyywynci20j0iuyfuj
```

## DNSLink gateway

The gateway provided by Kubo understands the `Host` header present in HTTP requests and will check if [DNSLink](../concepts/dnslink.md) exists for a specified [domain name](https://en.wikipedia.org/wiki/Fully_qualified_domain_name).
If DNSLink is present, the gateway will return content from a path resolved via DNS TXT record.
This type of gateway provides full [origin isolation](https://en.wikipedia.org/wiki/Same-origin_policy).

An example is this website, [https://docs.ipfs.tech](https://docs.ipfs.tech).

::: tip
For a complete DNSLink guide, including tutorials, usage examples, and FAQs, see [dnslink.io](https://dnslink.io).
:::

## <a name=native-urls>IPFS-Scheme URLs</a>

URLs that combine the "native" IPFS address format with an IPFS-specific scheme are structured in a way very similar to `http`/`https`-scheme URLs" that rely on a [subdomain gateway](https://docs.ipfs.tech/how-to/address-ipfs-on-web/#subdomain-gateway) for their location-based authority component. These were historically called "Native URLs" since they combine a native IPFS address with an IPFS-native scheme, but note the differences between a subdomain-gateway HTTP(S) URL and a IPFS-scheme URL:

- The `ipfs` or `ipns` protocol schemes are used instead of `http`
- The location-based authority component (the gateway host and port) is replaced with a bare, native CID

```plaintext
ipfs://{cid}/path/to/subresource/cat.jpg
```

Examples:

```plaintext
ipfs://{cidv1}
ipfs://{cidv1}/path/to/resource
ipfs://{cidv1}/path/to/resource?query=foo#fragment

ipns://{cidv1-libp2p-key}
ipns://{cidv1-libp2p-key}/path/to/resource
ipns://{dnslink-name}/path/to/resource?query=foo#fragment
```

::: tip
Our main goal here is to reuse existing standards that maximize interoperability with existing user-agents like browsers and CLI tools. If something is not clear, HTTP URL rules apply.
:::


The first element after the double slash is an identifier representing the content root. It is interpreted as an authority component used for origin calculation, which provides necessary isolation between security contexts of different content trees.

Example:

```plaintext
ipfs://bafybeiemxf5abjwjbikoz4mc3a3dla6ual3jsgpdr4cjr3oz3evfyavhwq/wiki/Vincent_van_Gogh.html
```

::: warning Avoid case-sensitive CID 
Some user agents will force-lowercase the CID component of URL-like address.
To ensure interoperability with existing libraries and software, use case-insensitive CID encoding. Use of CIDv1 in Base32 or Base36 is advised.
:::

### Turning native address to a canonical content path

Every "URL" address can be turned back into a content path with ease:

Examples:
- `ipfs://{immutable-root}/path/to/resourceA` converts to `/ipfs/{immutable-root}/path/to/resourceA`  
- `ipns://{mutable-root}/path/to/resourceB` converts to `/ipns/{mutable-root}/path/to/resourceB`

## Further resources

### Technical specification for implementers

See the [IPFS in-web-browsers repository](https://github.com/ipfs/in-web-browsers/blob/master/ADDRESSING.md).

### Background on address scheme discussions

Discussions around IPFS addressing have been ongoing since [@jbenet](https://github.com/jbenet) published the [IPFS whitepaper](https://ipfs.io/ipfs/QmR7GSQM93Cx5eAg6a6yRzNde1FQv7uL6X1o4k7zrJa3LX/ipfs.draft3.pdf), with a number of other approaches being proposed. This long-standing design discussion includes many lengthy GitHub issue threads, but a good summary can be found in [this PR](https://github.com/ipfs/specs/pull/152).

### IPFS Companion

[IPFS Companion](https://github.com/ipfs/ipfs-companion#readme) is a browser extension that simplifies access to IPFS resources.

It provides support for native URLs and will automatically redirect IPFS gateway requests to your local Kubo daemon so that you are not relying on or trusting remote gateways.

