---
title: Best practices 
description: Learn best practices for working with IPFS HTTP Gateways
---

# Best practices for HTTP Gateways

Various best practices for the use of IPFS gateways are listed below. To learn more about the concepts behind IPFS gateways, including how they work, available providers, types and FAQs, see [IPFS Gateway](../concepts/ipfs-gateway.md). For troubleshooting information, see [Troubleshooting](./gateway-troubleshooting.md).

## When not to use a gateway

### Delay-sensitive applications

Any gateway introduces a delay in completing desired actions because the gateway acts as an intermediary between the source of the request and the IPFS node or nodes capable of returning the desired content. If the serving gateway cached the requested content earlier (e.g., due to previous requests), then the cache eliminates this delay.

Overuse of a gateway also introduces delays due to queuing of requests.

When dealing with delay-sensitive processes, you should aim to use a native IPFS node within the app (fastest), or as a local service daemon (almost as fast). Failing that, use a gateway installed as a local service. Note that when an IPFS node runs locally, it includes a gateway at `http://127.0.0.1:8080`.

All time-insensitive processes can be routed through public/private gateways.

### End-to-end cryptographic validation required

Because of third-party gateway vulnerabilities, apps requiring end-to-end validation of content read/write should avoid gateways when possible. If the app must employ an external gateway, such apps should use `ipfs.io` or a trusted third-party.


## Self-hosting a gateway 

If you are running an IPFS node that is also configured as an IPFS gateway, each of the tips below can help improve the discovery and retrievability of your CIDs.

- Pin your CIDs to multiple IPFS nodes to ensure reliable availability and resilience to failures of nodes and network partitions. To make pinning easier, use the vendor-agnostic [Pinning Service OpenAPI Specification](https://ipfs.github.io/pinning-services-api-spec/) that is already [supported by many IPFS node implementations, client libraries, and existing pinning services](https://github.com/ipfs/pinning-services-api-spec#adoption).
- Use a custom domain that you control as your IPFS gateway for flexibility in implementing performance optimizations. You can do this using one of the following methods:
  - Point a domain you control like `mydomain.ipfs.yourdomain.io` to a reverse proxy like nginx, which will proxy requests to a public gateway, allowing you to switch public gateways if there's downtime.
  - Use a service like [Cloudflare workers](https://workers.cloudflare.com/) or [Fastly Compute@Edge](https://www.fastly.com/products/edge-compute) to implement a lightweight reverse proxy to a gateway.
- Set up [peering](./peering-with-content-providers.md) with the pinning services that pin your CIDs.
- Make sure that your node is publicly reachable.
   - You can check reachability `ipfs id` and checking for the `/ipfs/kad/1.0.0` value in the list of protocols (or, in one command, by running `ipfs id | grep ipfs\/kad`).
   - If your node is not reachable because you are behind NAT, see the [NAT configuration](https://docs.ipfs.tech/how-to/nat-configuration/#ipv6) docs.
- Ensure that you are correctly returning HTTP cache headers to the client if the IPFS gateway node is behind a reverse proxy. Pay extra attention to `Etag`, `Cache-Control`, and `Last-Modified headers`. Consider leveraging the list of CIDs in `X-Ipfs-Roots` for smarter HTTP caching strategies.
- Put a CDN like Cloudflare in front of the IPFS gateway.
- Consider enabling the [Accelerated DHT Client](https://github.com/ipfs/go-ipfs/blob/master/docs/experimental-features.md#accelerated-dht-client). 
- Test and monitor your internet connection speed, with a tool like [Speedtest CLI](https://www.speedtest.net/apps/cli).
- Monitor disk I/O and make sure that no other processes are causing disk I/O bottlenecks with a tool like [iotop](https://linux.die.net/man/1/iotop) or [iostat](https://linux.die.net/man/1/iostat).


Using this remote pinning API, you can implement pinning to multiple services (opens new window)as part of your workflow for uploading immutable data to IPFS.



## Selecting a gateway type to use

The preferred form of gateway access varies depending on the nature of the targeted content. Learn more about each gateway type and how it works [here](../concepts/ipfs-gateway.md#gateway-types).

| Target                                          | Preferred gateway type | Canonical form of access <br> features & considerations                                                                                                                                                                                                                                                                     |
| ----------------------------------------------- | ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Current version of <br>potentially mutable root | IPNS subdomain         | `https://{IPNS identifier}.ipns.{gatewayURL}/{optional path to resource}` <br> + supports cross-origin security <br> + supports cross-origin resource sharing <br> + suitable for both domain IPNS names (`{domain.tld}`) and hash IPNS names                                                                               |
|                                                 | IPFS DNSLink           | `https://{example.com}/{optional path to resource}` <br> + supports cross-origin security <br> + supports cross-origin resource sharing <br> – requires DNS update to propagate change to root content <br> • DNSLink, not user/app, specifies the gateway to use, opening up potential gateway trust and congestion issues |
| Immutable root or <br> content                  | IPFS subdomain         | `https://{CID}.ipfs.{gatewayURL}/{optional path to resource}` <br> + supports cross-origin security <br> + supports cross-origin resource sharing                                                                                                                                                                           |

Any form of gateway provides a bridge for apps without native support of IPFS. Better performance and security results from native IPFS implementation within an app.

## Avoiding centralization

Use of a gateway requires location-based addressing: `https://{gatewayURL}/ipfs/{CID}/{etc}` All too easily, the gateway URL can become the handle by which users identify the content; i.e., the uniform reference locator (URL) equates (improperly) to the uniform reference identifier (URI). Now imagine that the gateway goes offline or cannot be reached from a different user's location because of firewalls. At this moment, content improperly identified by that gateway-based URL also appears unreachable, defeating a key benefit of IPFS: decentralization.

Similarly, the use of DNSLink resolution with `Alias` forces requests through the domain's chosen gateway, as specified in the `dnslink={value}` string within the DNS TXT record. If the specified gateway becomes overloaded, goes offline, or becomes compromised, all traffic with that content becomes deleted, disabled, or suspect.

## Misplaced trust

Trusting a specific gateway, in turn, requires you to trust the gateway's issuing Certificate Authorities and the security of the public key infrastructure employed by that gateway. Compromised certificate authorities or public-key infrastructure implementations may undermine the trustworthiness of the gateway.

## Violation of same-origin policy

To prevent one website from improperly accessing HTTP session data associated with a different website, the [same-origin policy](https://en.wikipedia.org/wiki/Same-origin_policy) permits script access only to pages that share a common domain name and port.

Consider two web pages stored in IPFS: `ipfs://{CID A}/{webpage A}` and `ipfs://{CID B}/{webpage B}`. Code on `webpage A` should not access data from `webpage B`, as they do not share the same content ID (origin).

A browser employing one gateway to access both sites, however, might not enforce that security policy. From that browser's perspective, both pages share a common origin: the gateway as identified in the URL `https://{gatewayURL}/...`.

The use of subdomain gateways avoids violating the same-origin policy. In this situation, the gateway's reference to the two pages becomes:

```bash
https://{CID A}.ipfs.{gatewayURL}/{webpage A}
https://{CID B}.ipfs.{gatewayURL}/{webpage B}
```

These pages do not share the same origin. Similarly, the use of DNSLink gateway avoids violating the same-origin policy. The [IPFS public gateway checker](https://ipfs.github.io/public-gateway-checker/) identifies those public gateways that avoid violating the same-origin policy.

## Cross-origin resource sharing (CORS)

[CORS](https://web.archive.org/web/20200418003728/https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#The_HTTP_response_headers) allows a webpage to permit access to specified data by pages with a different origin. The [IPFS public gateway checker](https://ipfs.github.io/public-gateway-checker/) identifies those public gateways that support CORS.

## Gateway man-in-the-middle vulnerability

Employing a public or private HTTP gateway sacrifices end-to-end cryptographic validation of the delivery of the correct content. Consider the case of a browser fetching content with the URL `https://ExampleGateway.com/ipfs/{cid}`. A compromised `ExampleGateway.com` provides man-in-the-middle vulnerabilities, including:

- Substituting false content in place of the actual content retrieved via the CID.
- Diverting a copy of the query and response, as well as the IP address of the querying browser, to a third party.

A compromised writeable gateway may inject falsified content into the IPFS network, returning a CID which the user believes to refer to the true content. For example:

1. Alice posts a balance of `123.54` to a compromised writable gateway.
1. The gateway is currently storing a balance of `0.00`, so it returns the CID of the falsified content to Alice.
1. Alice gives the falsified content CID to Bob.
1. Bob fetches the content with this CID and cryptographically validates the balance of `0.00`.

To partially address this exposure, you may wish to use the public gateway [cf-ipfs.com](https://cf-ipfs.com) as an independent, trusted reference with both same-origin policy and CORS support.

## Assumed filenames when downloading files

When downloading files, browsers will usually guess a file's filename by looking at the last component of the path, e.g., `https://{domainName/tld}/{path}/userManual.pdf` downloads a file stored locally with the name `userManual.pdf`. Unfortunately, when linking directly to a file with no containing directory in IPFS, the CID becomes the final component. Storing the downloaded file with the filename set to the CID fails the human-friendly design test.

To work around this issue, you can add a `?filename={filename.ext}` parameter to your query string to preemptively specify a name for the locally-stored downloaded file:

| Style     | Query                                                                                                                                                     |
| --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Path      | `https://{gatewayURL}/ipfs/{CID}/{optional path to resource}?filename={filename.ext}`                                                                     |
| Subdomain | `https://{CID}.ipfs.{gatewayURL}/{optional path to resource}?filename={filename.ext}`                                                                     |
| DNSLink   | `https://{example.com}/{optional path to resource}` or <br> `https://{gatewayURL}/ipns/{example.com}/{optional path to resource}?filename={filename.ext}` |

## Stale caches

A gateway may cache DNSLinks from DNS TXT records, which default to a one-hour lifetime. After content changes, cached DNSLinks continue to refer to the now-obsolete CID. To limit the delivery of obsolete cached content, the domain operator should change the DNS record's time-to-live parameter to a minute `60`.