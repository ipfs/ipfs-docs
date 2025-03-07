---
title: Custom domains and DNSLink
description: Guide on how to configure custom domains and DNSLink for your IPFS deployments.
---

# Custom domains and DNSLink

By default, when you deploy a static web application to IPFS, it will be addressed with a CID. Since CIDs are long and hard to remember, they're not very user-friendly, for example, `https://bafybeifhgtpm6kmbyqszbardceszvkv5rsi3dodtuufpcfskzggekcfl2y.ipfs.inbrowser.link/` or `https://bafybeifhgtpm6kmbyqszbardceszvkv5rsi3dodtuufpcfskzggekcfl2y.ipfs.dweb.link/`.

To make your app easier to access, you can optionally configure a custom domain for your app, depending on how you want users to access your app.

This guide will walk you through the process of configuring a custom domain for your app, and how to configure DNSLink to signal the CID for your app.

### CID Signaling with DNSLink

[DNSLink](../../concepts/dnslink.md) is a standard way to map human-readable domain names (DNS) to CIDs. For example, for the IPFS Docs, `docs.ipfs.tech`, the DNSLink record is a TXT record at `_dnslink.docs.ipfs.tech` with the value `dnslink=/ipfs/bafybeicv5tbyeahgm4pyskd2nverwsqxpiqloikqrufvof7vausglw6avm` (the CID will likely be different once you read this guide).

The main benefit of DNSLink is that it allows users to determine the latest CID for a given domain name, while leaving it up to the user how to retrieve the deployment addressed by the CID. For example, a user might have a local IPFS node, and want to access the latest deployment of your app, they can do so by resolving the DNSLink record and fetching the content from their local node. `http://localhost:8080/ipns/docs.ipfs.tech` will serve the CID found in the DNSLink record.

When a DNSLink record is present, any IPFS gateway (local or public) can take the DNS name and resolve it to the CID, and serve the content, for example, both `http://inbrowser.link/ipns/docs.ipfs.tech` and `http://ipfs.io/ipns/docs.ipfs.tech` will serve the same site, albeit with different origins.

When loading the site this way, you benefit from the resilience and censorship resistance of the IPFS network, because it's content addressed (addressed by CID) rather than being tied to a canonical origin. As long as there's at least one reachable provider for the CID, you can access the site.

The disadvantage is that loading the site this way is that the [origin](https://developer.mozilla.org/en-US/docs/Glossary/Origin) can vary depending on where the user is accessing the site from, which can impact how your app functions, like CORS access to external APIs.

## Access via custom domain

In the previous section, we discussed how DNSLink can be used to signal the CID for a domain name, while leaving it up to the user how to retrieve the content, be it a local node, service worker gateway or any other [public recursive gateway](https://docs.ipfs.tech/concepts/ipfs-gateway/#recursive-vs-non-recursive-gateways). In this instance, the user provides the domain name as input, instead of the CID.

To provide access to the app directly via the custom domain, you have the following options:

1. Deploy an IPFS Gateway that supports DNSLink, e.g. [Rainbow](https://github.com/ipfs/rainbow/) and point the CNAME/A record for your custom domain to it. You will likely want to also configure TLS with a reverse proxy like Caddy.
2. Use a service like Fleek
3. Deploy the site to a web hosting service like Cloudflare/GitHub Pages, and point the CNAME/A record for your custom domain to it, essentially getting the benefits of both IPFS and traditional web hosting.

Access via a custom domain is useful if you want to serve your app via a domain name that you own, for example, `app.example.com`.
