---
title: IPFS Gateway
description: Learn why gateways are an important part of using IPFS in conjunction with the legacy web.
related:
  'IPFS Docs: Address IPFS on the Web': /how-to/address-ipfs-on-web/
  'IPFS public gateway checker': https://ipfs.github.io/public-gateway-checker/
  'GitHub repo: Gateway summary from go-ipfs': https://github.com/ipfs/go-ipfs/blob/master/docs/gateway.md
  'Article: Solving the IPFS Gateway Problem (Pinata)': https://medium.com/pinata/the-ipfs-gateway-problem-64bbe7eb8170
  'Tutorial: Setting up an IPFS gateway on Google Cloud Platform (Stacktical)': https://blog.stacktical.com/ipfs/gateway/dapp/2019/09/21/ipfs-server-google-cloud-platform.html
---

# IPFS Gateway

This document discusses:

- The several types of gateways.
- Gateway role in the use of IPFS.
- Appropriate situations for the use of gateways.
- Situations when you should avoid the use of gateways.
- Implementation guidelines.

You should read this document if you want to:

- Understand, at a conceptual level, how gateways fit into the overall use of IPFS.
- Decide whether and what type of gateways to employ for your use case.
- Understand, at a conceptual level, how to deploy gateways for your use case.

## Overview

IPFS deployment seeks to include native support of IPFS in all popular browsers and tools. Gateways provide workarounds for applications that do not yet support IPFS natively. For example, errors occur when a browser that does not support IPFS attempts access to IPFS content in the canonical form of `ipfs://{CID}/{optional path to resource}`. Other tools that rely solely on HTTP encounter similar errors in accessing IPFS content in canonical form, such as [Curl](https://curl.haxx.se/) and [Wget](https://www.gnu.org/software/wget/).

Tools like [IPFS Companion](https://github.com/ipfs-shipyard/ipfs-companion) resolve these content access errors. However, not every user has permission to alter — or be capable of altering — their computer configuration. IPFS gateways provide an HTTP-based service that allows IPFS-ignorant browsers and tools to access IPFS content.

## Gateway providers

Regardless of who deploys a gateway and where, any IPFS gateway resolves access to any requested IPFS [content identifier](content-addressing.md). Therefore, for best performance, when you need the service of a gateway, you should use the one closest to you.

### Your local gateway

Your machine may host a gateway as a local service; e.g., at `localhost:8080`. You have a local gateway service if you installed [IPFS Desktop](https://github.com/ipfs-shipyard/ipfs-desktop#ipfs-desktop) or another form of IPFS node.

### Private gateways

Running [IPFS Desktop](https://github.com/ipfs-shipyard/ipfs-desktop#ipfs-desktop) or another form of IPFS node triggers connection attempts to other IPFS peers. Private network administrators may treat such connection attempts as potential security vulnerabilities. Private IPFS gateway servers located inside the private network and running a trusted code base provide an alternative architecture for read/write access to externally-hosted IPFS content.

A gateway behind a firewall represents just one potential location for a private gateway. More generally, one may consider any gateway as a _private gateway_ when configured to limit access to requests from specific domains or parts of the public internet. This [tutorial configuring an IPFS gateway on a Google Cloud platform](https://blog.stacktical.com/ipfs/gateway/dapp/2019/09/21/ipfs-server-google-cloud-platform.html) includes a description of constraining access.

### Public gateways

Public gateway operators include:

- Protocol Labs, which deploys the public gateway `https://ipfs.io`.
- Third-party public gateways. E.g., `https://cf-ipfs.com`.

Protocol Labs maintains a [list of public gateways](https://ipfs.github.io/public-gateway-checker/) and their status.

![A list of public gateways and their status, available on IPFS](./images/ipfs-gateways/public-gateway-checker.png)

## Gateway types

Categorizing gateways involves several dimensions:

- [Read/write support](#read-only-and-writeable-gateways)
- [Authentication support](#authenticated-gateways)
- [Resolution style](#resolution-style)
- [Service](#gateway-services)

Choosing the form of gateway usage has security, performance, and other functional implications.

### Read-only and writeable gateways

The examples discussed in the earlier sections above illustrated the use of read-only HTTP gateways to fetch content from IPFS via an HTTP GET method. _Writeable_ HTTP gateways also support `POST`, `PUT`, and `DELETE` methods.

### Authenticated gateways

If a gateway provider wants to limit access to requests with authentication, they may need to configure a reverse proxy, develop an IPFS plugin, or set a cache-layer above IPFS.

Configuring a reverse proxy is the most popular way for providers handling authentication. Reverse proxy can also keep the original IPFS API calls which makes gateway adaptable to all IPFS SDK and toolkits.

![Auth with Reverse proxy](./images/ipfs-gateways/public-authed-gateway.png)

Providers can design their own centralized authentication service like [Infura IPFS Auth](https://infura.io/docs/ipfs#section/Authentication/Overview), or a decentralized authentication service like [IPFS W3Auth](https://wiki.crust.network/docs/en/buildIPFSWeb3AuthGW)).

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

#### Subdomain

Subdomain resolution style maintains compliance with the [single-origin policy](https://en.wikipedia.org/wiki/Same-origin_policy). The canonical form of access, `https://{CID}.ipfs.{gatewayURL}/{optional path to resource}`, causes the browser to interpret each returned file as being from a different origin.

Subdomain resolution support began with [Go-IPFS](https://github.com/ipfs/go-ipfs) release `0.5.0`.

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

### Which type to use

The preferred form of gateway access varies depending on the nature of the targeted content.

| Target                                          | Preferred gateway type | Canonical form of access <br> features & considerations                                                                                                                                                                                                                                                                     |
| ----------------------------------------------- | ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Current version of <br>potentially mutable root | IPNS subdomain         | `https://{IPNS identifier}.ipns.{gatewayURL}/{optional path to resource}` <br> + supports cross-origin security <br> + supports cross-origin resource sharing <br> + suitable for both domain IPNS names (`{domain.tld}`) and hash IPNS names                                                                               |
|                                                 | IPFS DNSLink           | `https://{example.com}/{optional path to resource}` <br> + supports cross-origin security <br> + supports cross-origin resource sharing <br> – requires DNS update to propagate change to root content <br> • DNSLink, not user/app, specifies the gateway to use, opening up potential gateway trust and congestion issues |
| Immutable root or <br> content                  | IPFS subdomain         | `https://{CID}.ipfs.{gatewayURL}/{optional path to resource}` <br> + supports cross-origin security <br> + supports cross-origin resource sharing                                                                                                                                                                           |

Any form of gateway provides a bridge for apps without native support of IPFS. Better performance and security results from native IPFS implementation within an app.

## When not to use a gateway

### Delay-sensitive applications

Any gateway introduces a delay in completing desired actions because the gateway acts as an intermediary between the source of the request and the IPFS node or nodes capable of returning the desired content. If the serving gateway cached the requested content earlier (e.g., due to previous requests), then the cache eliminates this delay.

Overuse of a gateway also introduces delays due to queuing of requests.

When dealing with delay-sensitive processes, you should aim to use a native IPFS node within the app (fastest), or as a local service daemon (almost as fast). Failing that, use a gateway installed as a local service. Note that when an IPFS node runs locally, it includes a gateway at `http://127.0.0.1:8080`.

All time-insensitive processes can be routed through public/private gateways.

### End-to-end cryptographic validation required

Because of third-party gateway vulnerabilities, apps requiring end-to-end validation of content read/write should avoid gateways when possible. If the app must employ an external gateway, such apps should use `ipfs.io` or a trusted third-party.

## Limitations and potential workarounds

### Centralization

Use of a gateway requires location-based addressing: `https://{gatewayURL}/ipfs/{CID}/{etc}` All too easily, the gateway URL can become the handle by which users identify the content; i.e., the uniform reference locator (URL) equates (improperly) to the uniform reference identifier (URI). Now imagine that the gateway goes offline or cannot be reached from a different user's location because of firewalls. At this moment, content improperly identified by that gateway-based URL also appears unreachable, defeating a key benefit of IPFS: decentralization.

Similarly, the use of DNSLink resolution with `Alias` forces requests through the domain's chosen gateway, as specified in the `dnslink={value}` string within the DNS TXT record. If the specified gateway becomes overloaded, goes offline, or becomes compromised, all traffic with that content becomes deleted, disabled, or suspect.

### Misplaced trust

Trusting a specific gateway, in turn, requires you to trust the gateway's issuing Certificate Authorities and the security of the public key infrastructure employed by that gateway. Compromised certificate authorities or public-key infrastructure implementations may undermine the trustworthiness of the gateway.

### Violation of same-origin policy

To prevent one website from improperly accessing HTTP session data associated with a different website, the [same-origin policy](https://en.wikipedia.org/wiki/Same-origin_policy) permits script access only to pages that share a common domain name and port.

Consider two web pages stored in IPFS: `ipfs://{CID A}/{webpage A}` and `ipfs://{CID B}/{webpage B}`. Code on `webpage A` should not access data from `webpage B`, as they do not share the same content ID (origin).

A browser employing one gateway to access both sites, however, might not enforce that security policy. From that browser's perspective, both webpages share a common origin: the gateway as identified in the URL `https://{gatewayURL}/...`.

The use of subdomain gateways avoids violating the same-origin policy. In this situation, the gateway's reference to the two webpages becomes:

```bash
https://{CID A}.ipfs.{gatewayURL}/{webpage A}
https://{CID B}.ipfs.{gatewayURL}/{webpage B}
```

These pages do not share the same origin. Similarly, the use of DNSLink gateway avoids violating the same-origin policy. The [IPFS public gateway checker](https://ipfs.github.io/public-gateway-checker/) identifies those public gateways that avoid violating the same-origin policy.

### Cross-origin resource sharing (CORS)

[CORS](https://web.archive.org/web/20200418003728/https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#The_HTTP_response_headers) allows a webpage to permit access to specified data by pages with a different origin. The [IPFS public gateway checker](https://ipfs.github.io/public-gateway-checker/) identifies those public gateways that support CORS.

### Gateway man-in-the-middle vulnerability

Employing a public or private HTTP gateway sacrifices end-to-end cryptographic validation of the delivery of the correct content. Consider the case of a browser fetching content with the URL `https://ExampleGateway.com/ipfs/{cid}`. A compromised `ExampleGateway.com` provides man-in-the-middle vulnerabilities, including:

- Substituting false content in place of the actual content retrieved via the CID.
- Diverting a copy of the query and response, as well as the IP address of the querying browser, to a third party.

A compromised writeable gateway may inject falsified content into the IPFS network, returning a CID which the user believes to refer to the true content. For example:

1. Alice posts a balance of `123.54` to a compromised writable gateway.
1. The gateway is currently storing a balance of `0.00`, so it returns the CID of the falsified content to Alice.
1. Alice gives the falsified content CID to Bob.
1. Bob fetches the content with this CID and cryptographically validates the balance of `0.00`.

To partially address this exposure, you may wish to use the public gateway [cf-ipfs.com](https://cf-ipfs.com) as an independent, trusted reference with both same-origin policy and CORS support.

### Assumed filenames when downloading files

When downloading files, browsers will usually guess a file's filename by looking at the last component of the path, e.g., `https://{domainName/tld}/{path}/userManual.pdf` downloads a file stored locally with the name `userManual.pdf`. Unfortunately, when linking directly to a file with no containing directory in IPFS, the CID becomes the final component. Storing the downloaded file with the filename set to the CID fails the human-friendly design test.

To work around this issue, you can add a `?filename={filename.ext}` parameter to your query string to preemptively specify a name for the locally-stored downloaded file:

| Style     | Query                                                                                                                                                     |
| --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Path      | `https://{gatewayURL}/ipfs/{CID}/{optional path to resource}?filename={filename.ext}`                                                                     |
| Subdomain | `https://{CID}.ipfs.{gatewayURL}/{optional path to resource}?filename={filename.ext}`                                                                     |
| DNSLink   | `https://{example.com}/{optional path to resource}` or <br> `https://{gatewayURL}/ipns/{example.com}/{optional path to resource}?filename={filename.ext}` |

### Stale caches

A gateway may cache DNSLinks from DNS TXT records, which default to a one-hour lifetime. After content changes, cached DNSLinks continue to refer to the now-obsolete CID. To limit the delivery of obsolete cached content, the domain operator should change the DNS record's time-to-live parameter to a minute `60`.

## Frequently asked questions (FAQs)

### What is the ipfs.io gateway?

The ipfs.io gateway makes it possible for Internet users to access and view data hosted by third parties on the IPFS network. The ipfs.io gateway is a community resource run by Protocol Labs to help developers build on IPFS.

### How is the ipfs.io gateway different from other gateways?

The ipfs.io gateway is a gateway run by Protocol Labs. Many other entities run their own gateways with different policies around throttling and access, which may be subject to other local laws and regulations. A [list of public gateways is available here](https://ipfs.github.io/public-gateway-checker/).

Protocol Labs does not store or host the data that is viewable through the ipfs.io gateway. Rather, the ipfs.io gateway allows users to view content hosted by third parties. Protocol Labs does not have any control over the data that is viewed through the ipfs.io gateway, nor does Protocol Labs have control over other gateways.

### Is the ipfs.io gateway a data storage host?

No. The ipfs.io gateway is a passthrough portal to data hosted by third parties on nodes in the IPFS network. It is not a data storage host.

### Can websites rely on the ipfs.io gateway for hosting?

No. Websites should not rely on the ipfs.io gateway for hosting of any kind. The ipfs.io gateway is a community resource run by Protocol Labs to help developers build on IPFS. Users of the ipfs.io gateway must use resources sparingly. Protocol Labs will throttle or ban users who overuse or misuse community resources, including relying on the ipfs.io gateway for website hosting or violating the Community Code of Conduct.

### How does the ipfs.io Gateway handle global data regulations?

Protocol Labs complies with the laws and regulations of relevant jurisdictions.

As explained above, the ipfs.io gateway is not a website hosting provider or data storage provider, and Protocol Labs cannot remove material from the Internet that is accessible through the ipfs.io gateway.

### Who is responsible for the content that is viewed through the ipfs.io gateway?

Users of the ipfs.io gateway are required to comply with all applicable laws and regulations while using the ipfs.io gateway.

The ipfs.io gateway is not a data storage provider or website host. The ipfs.io gateway allows users to view content hosted by third parties over which Protocol Labs exercises no control. The fact that certain content is viewable through the ipfs.io gateway does not mean it is hosted by the ipfs.io gateway or that Protocol Labs can do anything to delete that content.

As explained above, the ipfs.io gateway is not a website hosting provider or data storage provider, and Protocol Labs cannot remove material from the Internet that is accessible through the ipfs.io gateway. If you believe that material accessible through the ipfs.io gateway is illegal or violates your copyright, you are encouraged to directly notify whoever is hosting or controls that data.

While the ipfs.io gateway does not serve as a host for data or websites, in appropriate circumstances, Protocol Labs can disable the ability to view certain content via the ipfs.io gateway. This does not mean that the data itself has been taken down from the network but rather that the content is not viewable using the ipfs.io gateway. This also will not impact the availability of the data through other gateways run by other parties.

You can report abuse by emailing abuse@protocol.ai. When appropriate, we will disable access through the ipfs.io gateway to the specific content set forth in your abuse report.

### Can Protocol Labs take down content viewable through the ipfs.io gateway?

No. The ipfs.io gateway is one of many portals used to view content stored by third parties on the Internet. Protocol Labs is not hosting that content and cannot take it down, but it can block the ability of users to view that content via the ipfs.io gateway in appropriate circumstances.

## Learning more

- [Gateway configuration options](https://github.com/ipfs/go-ipfs/blob/master/docs/config.md#gateway)
