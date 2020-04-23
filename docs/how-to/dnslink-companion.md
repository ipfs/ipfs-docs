---
title: Use DNSLink in Companion
legacyUrl:
description: Details of DNSLink support in IPFS Companion.
---

# Support for DNSLink in IPFS Companion

**TL;DR:** When in doubt, use the "best-effort" policy.

## What is DNSLink?

DNSLink maps a domain name to an IPFS address by means of DNS TXT record. Read the [DNSLink guide](../concepts/dnslink.md) for full details, including how to set it up on your own website.

## Lookup cache

Results of DNS TXT lookups are stored in a [Least Recently Used (LRU)](https://en.wikipedia.org/wiki/Cache_replacement_policies#Least_Recently_Used) cache of size 1000 and max-age 12h (we will support original TTL from DNS soon).

The cache is in-memory and is not persisted between restarts.

## DNS TXT lookup policies

### Off (disabled)

There will be no DNS TXT lookups when this policy is selected. It means DNSLink support is disabled.

### Check after HTTP request ("best-effort")

This is the most efficient lookup strategy, but in rare cases it may yield false negatives on the first load.

DNSLink redirect is enabled and happens before the HTTP request if DNSLink is already in cache. If not in cache, DNS TXT lookup is executed and cached in the background without blocking the page load.

Blocking lookups are executed only for domains that return an HTTP response with [x-ipfs-path header](companion-x-ipfs-path-header.md)) or return a connection error.

### Check before HTTP request (enabled)

DNS TXT lookup is executed for every hostname before any HTTP request is made. No false negatives occur under this scenario.

This method removes the need for sending HTTP requests to a remote server if DNSLink is present, but may impact browser performance: Every request to a new domain name will be blocked until TXT lookup is finished.

There is room for improvement in this approach: Web browsers do not expose efficient DNS TXT lookup API ([yet](https://bugzilla.mozilla.org/show_bug.cgi?id=1449171)), and HTTP-based lookups via `/api/v0/dns/${fqdn}` with userland caching are used as a fallback.

## Further resources

- [`x-ipfs-path` header support in IPFS Companion](companion-x-ipfs-path-header.md)
- [Bugzilla bug 1449171: Add DNS TXT resolution to dns.resolve WebExtensions API](https://bugzilla.mozilla.org/show_bug.cgi?id=1449171)
