---
title: Best practices 
description: Learn best practices for working with IPFS HTTP Gateways
---

# Best practices for HTTP Gateways

Various best practices for the use of IPFS gateways are listed below. To learn more about the concepts behind IPFS gateways, including how they work, available providers, and types, see [IPFS Gateway](../concepts/ipfs-gateway.md). For troubleshooting information, see [Troubleshooting](./troubleshooting.md).

## Selecting a gateway type to use

The preferred form of gateway access varies depending on the nature of the targeted content. Learn more about each gateway type and how it works [here](../concepts/ipfs-gateway.md#gateway-types).

| Target                                          | Preferred gateway type | Canonical form of access <br> features & considerations                                                                                                                                                                                                                                                                     |
| ----------------------------------------------- | ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Current version of <br>potentially mutable root | IPNS subdomain         | `https://{IPNS identifier}.ipns.{gatewayURL}/{optional path to resource}` <br> + supports cross-origin security <br> + supports cross-origin resource sharing <br> + suitable for hash IPNS names; domain IPNS names must be [inlined into a single DNS label](https://specs.ipfs.tech/http-gateways/subdomain-gateway/#host-request-header), e.g. `docs.ipfs.tech` becomes `docs-ipfs-tech`                                                                               |
|                                                 | IPFS DNSLink           | `https://{example.com}/{optional path to resource}` <br> + supports cross-origin security <br> + supports cross-origin resource sharing <br> – requires DNS update to propagate change to root content <br> • DNSLink, not user/app, specifies the gateway to use, opening up potential gateway trust and congestion issues |
| Immutable root or <br> content                  | IPFS subdomain         | `https://{CID}.ipfs.{gatewayURL}/{optional path to resource}` <br> + supports cross-origin security <br> + supports cross-origin resource sharing                                                                                                                                                                           |

Any form of gateway provides a bridge for apps without native support of IPFS. Better performance and security results from native IPFS implementation within an app.

## Self-hosting a gateway 

If you are running an IPFS node that is also configured as an IPFS gateway, each of the tips below can help improve the discovery and retrievability of your CIDs.

If you are moving off the public `ipfs.io` or `dweb.link` gateways, see [Replace public gateways with self-hosted IPFS](./replace-public-gateways-with-self-hosted-ipfs.md) for a drop-in migration path.

- Pin your CIDs to multiple IPFS nodes to ensure reliable availability and resilience to failures of nodes and network partitions. To make pinning easier, use the vendor-agnostic [Pinning Service OpenAPI Specification](https://ipfs.github.io/pinning-services-api-spec/) that is already [supported by many IPFS node implementations, client libraries, and existing pinning services](https://github.com/ipfs/pinning-services-api-spec#adoption).
- Use a custom domain that you control as your IPFS gateway for flexibility in implementing performance optimizations. You can do this using one of the following methods:
  - Point a domain you control like `mydomain.ipfs.yourdomain.io` to a reverse proxy like nginx, which will proxy requests to a public gateway, allowing you to switch public gateways if there's downtime.
  - Use a service like [Cloudflare workers](https://workers.cloudflare.com/) or [Fastly Compute@Edge](https://www.fastly.com/products/edge-compute) to implement a lightweight reverse proxy to a gateway.
- Set up [peering](./peering-with-content-providers.md) with the pinning services that pin your CIDs.
- Make sure that your node is publicly reachable.
   - You can check the reachability of your node by running `ipfs id` and checking for the `/ipfs/kad/1.0.0` value in the list of protocols (or, in one command, by running `ipfs id | grep ipfs\/kad`).
   - If your node is not reachable because you are behind NAT, see the [NAT configuration](./nat-configuration.md) docs.
- Ensure that you are correctly returning HTTP cache headers to the client if the IPFS gateway node is behind a reverse proxy. Pay extra attention to `Etag`, `Cache-Control`, and `Last-Modified headers`. Consider leveraging the list of CIDs in `X-Ipfs-Roots` for smarter HTTP caching strategies.
- Put a CDN like Cloudflare in front of the IPFS gateway.
- Consider enabling the [Accelerated DHT Client](https://github.com/ipfs/kubo/blob/master/docs/config.md#routingaccelerateddhtclient). 
- Test and monitor your internet connection speed, with a tool like [Speedtest CLI](https://www.speedtest.net/apps/cli).
- Monitor disk I/O and make sure that no other processes are causing disk I/O bottlenecks with a tool like [iotop](https://github.com/Tomas-M/iotop) or [iostat](https://github.com/sysstat/sysstat).



## Avoiding centralization

Use of a gateway requires location-based addressing: `https://{gatewayURL}/ipfs/{CID}/{etc}` All too easily, the gateway URL can become the handle by which users identify the content; i.e., the uniform resource locator (URL) equates (improperly) to the uniform resource identifier (URI). Now imagine that the gateway goes offline or cannot be reached from a different user's location because of firewalls. At this moment, content improperly identified by that gateway-based URL also appears unreachable, defeating a key benefit of IPFS: decentralization.

Similarly, a website served via DNSLink sends all requests through a single gateway chosen by the domain owner: the domain's `A`/`AAAA`/`CNAME` records point at that gateway, while the `dnslink={value}` string within the DNS TXT record only names the content to serve. If the chosen gateway becomes overloaded, goes offline, or becomes compromised, the website becomes unreachable or suspect.

## Use subdomain gateway resolution for origin isolation

To prevent one website from improperly accessing HTTP session data associated with a different website, the [same-origin policy](https://en.wikipedia.org/wiki/Same-origin_policy) permits script access only to pages that share a common domain name and port.

Consider two CIDs each representing a different website accessed with the path resolution style:

 - `https://ipfs.io/ipfs/{CID A}/{website A}`
 - `https://ipfs.io/ipfs/{CID B}/{website B}`

From the browser's perspective, both pages share a common origin: the gateway as identified in the URL `https://{gatewayURL}/...`, so the same-origin policy does not protect one website from the other.

To ensure the security provided by the same-origin policy, use the subdomain gateway. The gateway's reference to the two pages becomes:

```bash
https://{CID A}.ipfs.{gatewayURL}/{website A}
https://{CID B}.ipfs.{gatewayURL}/{website B}
```

These pages do not share the same origin. Similarly, the use of DNSLink gateway avoids violating the same-origin policy. The [IPFS public gateway checker](https://ipfs.github.io/public-gateway-checker/) identifies those public gateways that avoid violating the same-origin policy.

## Cross-origin resource sharing (CORS)

[CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) allows a webpage to permit access to specified data by pages with a different origin. The [IPFS public gateway checker](https://ipfs.github.io/public-gateway-checker/) identifies those public gateways that support CORS.

## Gateway man-in-the-middle vulnerability

Employing a public or private HTTP gateway sacrifices end-to-end cryptographic validation of the delivery of the correct content. Consider the case of a browser fetching content with the URL `https://ExampleGateway.com/ipfs/{cid}`. A compromised `ExampleGateway.com` provides man-in-the-middle vulnerabilities, including:

- Substituting false content in place of the actual content retrieved via the CID.
- Diverting a copy of the query and response, as well as the IP address of the querying browser, to a third party.

To address this exposure, clients should prefer [trustless and verifiable response types](../reference/http/gateway.md#trustless-verifiable-retrieval) and verify that the returned bytes match the requested CID.

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
