---
title: Custom domains and DNSLink
description: Guide on how to use custom domains and DNSLink with IPFS deployed websites, allowing users to access your website or app via a custom domain.
---

# Custom domains and DNSLink

By default, when you deploy a static web application to IPFS, it will be addressed with a CID. But CIDs are long, hard to remember, and not very user-friendly. For example,

 - `https://bafybeifhgtpm6kmbyqszbardceszvkv5rsi3dodtuufpcfskzggekcfl2y.ipfs.inbrowser.link/` or
 - `https://bafybeifhgtpm6kmbyqszbardceszvkv5rsi3dodtuufpcfskzggekcfl2y.ipfs.dweb.link/`.
 - `ipfs://bafybeifhgtpm6kmbyqszbardceszvkv5rsi3dodtuufpcfskzggekcfl2y` (if you have the [IPFS Companion](https://github.com/ipfs/ipfs-companion) browser extension installed)

To make your website or app easier to access, you can link a custom domain for your website or web app using two approaches that can be used in combination:

- [CID signaling with DNSLink](#cid-signaling-with-dnslink): allowing users to access your website from IPFS Gateways using the custom domain, e.g. `https://ipfs.io/ipns/docs.ipfs.tech` (note that it will redirect to a subdomain gateway `https://docs-ipfs-tech.ipns.dweb.link/` to ensure origin isolation). With this approach, you can access your website from a local IPFS Gateway or the Service Worker Gateway, benefiting from local verification and all the other benefits of IPFS like peer-to-peer retrieval and censorship resistance.
- [Access via a custom domain](#access-via-a-custom-domain) - Access your website via a custom domain name, e.g. `https://docs.ipfs.tech`.

The main difference between the two options is that CID signaling with DNSLink is mainly concerned with resolving a memorable domain name to a CID, while access via a custom domain is mainly concerned with accessing your website via a custom domain name, and in many cases, you can use both approaches together.

This guide will walk you through the nuances of each of these options, and how to configure them for your app.

### CID Signaling with DNSLink

[DNSLink](../../concepts/dnslink.md) is a standard way to map human-readable domain names (DNS) to CIDs. For example, for the IPFS Docs, `docs.ipfs.tech`, the DNSLink record is a TXT record at `_dnslink.docs.ipfs.tech` with the value `dnslink=/ipfs/bafybeicv5tbyeahgm4pyskd2nverwsqxpiqloikqrufvof7vausglw6avm` (the CID will likely be different once you read this guide).

The main benefit of DNSLink is that it allows users to determine the latest CID for a given domain name, while leaving it up to the user how to retrieve the deployment addressed by the CID. For example, a user might have a local IPFS node, and want to access the latest deployment of your app, they can do so by resolving the DNSLink record and fetching the content from their local node. `http://localhost:8080/ipns/docs.ipfs.tech` will serve the CID found in the DNSLink record.

When a DNSLink record is present, any IPFS gateway (local or public) can take the DNS name and resolve it to the CID, and serve the content, for example, both `https://inbrowser.link/ipns/docs.ipfs.tech` and `https://dweb.link/ipns/docs.ipfs.tech` will serve the same site, albeit with different origins.

If you run your own IPFS node, such as [IPFS Desktop](../../install/ipfs-desktop.md) or [Kubo](../../install/command-line.md), and load the site from a local gateway at `http://localhost:8080/ipns/docs.ipfs.tech`, you benefit from the resilience and censorship resistance of the IPFS network, because it's content addressed (addressed by CID) rather than being tied to a canonical origin. As long as there's at least one reachable provider for the CID, and use a trusted [DNS over HTTPS resolver](https://github.com/ipfs/kubo/blob/master/docs/config.md#dnsresolvers), you can access the site.

Loading the site this way ties the website's cookies, storage, and Web API permissions to the [origin](https://developer.mozilla.org/en-US/docs/Glossary/Origin) of a specific gateway. When using public gateways, the user experience can vary depending on the gateway's origin, which may impact app functionality, including cookies, storage, and CORS access to external APIs. That is why a local gateway is advantageous, as it does not depend on external domains or origins.

## Access via a custom domain

In the previous section, we discussed how DNSLink can be used to signal the CID for a domain name, while leaving it up to the user how to retrieve the content, be it a local node, service worker gateway or any other [public recursive gateway](https://docs.ipfs.tech/concepts/ipfs-gateway/#recursive-vs-non-recursive-gateways). In this instance, the user provides the domain name as input, instead of the CID.

To provide access to the app directly via the custom domain, you have the following options:

1. Self-host both the IPFS provider (e.g. [Kubo](https://github.com/ipfs/kubo)) and the HTTP gateway (e.g. [Kubo](https://github.com/ipfs/kubo) or [Rainbow](https://github.com/ipfs/rainbow/)). Deploy an IPFS Gateway that supports DNSLink resolution and point the `CNAME`/`A` DNS record for your custom domain to it and  update the `TXT` record on `_dnslink` subdomain to match CID of your website. Set up CI automation to update TXT record every time your CID changes. You will likely want to also configure TLS with a reverse proxy like Caddy or use a CDN like Cloudflare for TLS termination.
2. Use a service like Fleek (HTTP + TLS + CDN + [automatic DNSLink management](https://fleek.xyz/docs/platform/domains/#dnslink)).
3. Deploy the site to a web hosting service like [Cloudflare Pages](https://pages.cloudflare.com/) or [GitHub Pages](https://pages.github.com/), and point the `CNAME`/`A` record for your main domain and `TXT` record with CID on `_dnslink` subdomain, essentially getting the benefits of both IPFS and traditional web hosting. Remember to set up CI automation to update TXT record every time your CID changes.

Access via a custom domain is useful if you want to serve your app via a domain name that you own, for example, `app.example.com`.
