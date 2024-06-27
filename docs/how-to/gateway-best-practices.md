---
title: Best practices 
description: Learn best practices for working with IPFS HTTP Gateways
---

# Best practices for HTTP Gateways

Various best practices for the use of IPFS gateways are listed below. To learn more about the concepts behind IPFS gateways, including how they work, available providers, types and FAQs, see [IPFS Gateway](../concepts/ipfs-gateway.md). For troubleshooting information, see [Troubleshooting](./gateway-troubleshooting.md).

## Selecting a gateway type to use

The preferred form of gateway access varies depending on the nature of the targeted content. Learn more about each gateway type and how it works [here](../concepts/ipfs-gateway.md#gateway-types).

| Target                                          | Preferred gateway type | Canonical form of access <br> features & considerations                                                                                                                                                                                                                                                                     |
| ----------------------------------------------- | ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Current version of <br>potentially mutable root | IPNS subdomain         | `https://{IPNS identifier}.ipns.{gatewayURL}/{optional path to resource}` <br> + supports cross-origin security <br> + supports cross-origin resource sharing <br> + suitable for both domain IPNS names (`{domain.tld}`) and hash IPNS names                                                                               |
|                                                 | IPFS DNSLink           | `https://{example.com}/{optional path to resource}` <br> + supports cross-origin security <br> + supports cross-origin resource sharing <br> – requires DNS update to propagate change to root content <br> • DNSLink, not user/app, specifies the gateway to use, opening up potential gateway trust and congestion issues |
| Immutable root or <br> content                  | IPFS subdomain         | `https://{CID}.ipfs.{gatewayURL}/{optional path to resource}` <br> + supports cross-origin security <br> + supports cross-origin resource sharing                                                                                                                                                                           |

Any form of gateway provides a bridge for apps without native support of IPFS. Better performance and security results from native IPFS implementation within an app.

## Self-hosting a gateway 

If you are running an IPFS node that is also configured as an IPFS gateway, each of the tips below can help improve the discovery and retrievability of your CIDs.

- Pin your CIDs to multiple IPFS nodes to ensure reliable availability and resilience to failures of nodes and network partitions. To make pinning easier, use the vendor-agnostic [Pinning Service OpenAPI Specification](https://ipfs.github.io/pinning-services-api-spec/) that is already [supported by many IPFS node implementations, client libraries, and existing pinning services](https://github.com/ipfs/pinning-services-api-spec#adoption).
- Use a custom domain that you control as your IPFS gateway for flexibility in implementing performance optimizations. You can do this using one of the following methods:
  - Point a domain you control like `mydomain.ipfs.yourdomain.io` to a reverse proxy like nginx, which will proxy requests to a public gateway, allowing you to switch public gateways if there's downtime.
  - Use a service like [Cloudflare workers](https://workers.cloudflare.com/) or [Fastly Compute@Edge](https://www.fastly.com/products/edge-compute) to implement a lightweight reverse proxy to a gateway.
- Set up [peering](./peering-with-content-providers.md) with the pinning services that pin your CIDs.
- Make sure that your node is publicly reachable.
   - You can check the reachability of your node by running `ipfs id` and checking for the `/ipfs/kad/1.0.0` value in the list of protocols (or, in one command, by running `ipfs id | grep ipfs\/kad`).
   - If your node is not reachable because you are behind NAT, see the [NAT configuration](https://docs.ipfs.tech/how-to/nat-configuration/#ipv6) docs.
- Ensure that you are correctly returning HTTP cache headers to the client if the IPFS gateway node is behind a reverse proxy. Pay extra attention to `Etag`, `Cache-Control`, and `Last-Modified headers`. Consider leveraging the list of CIDs in `X-Ipfs-Roots` for smarter HTTP caching strategies.
- Put a CDN like Cloudflare in front of the IPFS gateway.
- Consider enabling the [Accelerated DHT Client](https://github.com/ipfs/go-ipfs/blob/master/docs/experimental-features.md#accelerated-dht-client). 
- Test and monitor your internet connection speed, with a tool like [Speedtest CLI](https://www.speedtest.net/apps/cli).
- Monitor disk I/O and make sure that no other processes are causing disk I/O bottlenecks with a tool like [iotop](https://github.com/Tomas-M/iotop) or [iostat](https://en.wikipedia.org/wiki/Iostat).



## Avoiding centralization

Use of a gateway requires location-based addressing: `https://{gatewayURL}/ipfs/{CID}/{etc}` All too easily, the gateway URL can become the handle by which users identify the content; i.e., the uniform reference locator (URL) equates (improperly) to the uniform reference identifier (URI). Now imagine that the gateway goes offline or cannot be reached from a different user's location because of firewalls. At this moment, content improperly identified by that gateway-based URL also appears unreachable, defeating a key benefit of IPFS: decentralization.

Similarly, the use of DNSLink resolution with `Alias` forces requests through the domain's chosen gateway, as specified in the `dnslink={value}` string within the DNS TXT record. If the specified gateway becomes overloaded, goes offline, or becomes compromised, all traffic with that content becomes deleted, disabled, or suspect.

## Use subdomain gateway resolution for origin isolation

To prevent one website from improperly accessing HTTP session data associated with a different website, the [same-origin policy](https://en.wikipedia.org/wiki/Same-origin_policy) permits script access only to pages that share a common domain name and port.

Consider two CIDs each representing a different website accessed with the path resolution style: 
 - `https://ipfs.io/{CID A}/{website A}`
 - `https://ipfs.io/{CID B}/{website B}`. 
 
Because their origin (hostname and port) are the same, the same-origin policy does not apply. 

To ensure the security provided by the same-origin policy, use the subdomain gateway:
```bash
https://{CID A}.ipfs.{gatewayURL}/{website A}
https://{CID B}.ipfs.{gatewayURL}/{website B}

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

To address this exposure, public gateways should only be limited to [trustless and verifiable response types](https://docs.ipfs.tech/reference/http/gateway/#trustless-verifiable-retrieval).

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
