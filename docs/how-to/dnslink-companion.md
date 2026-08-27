---
title: DNSLink support
description: Details of DNSLink support in IPFS Companion.
---

# Support for DNSLink in IPFS Companion

DNSLink maps a domain name to an IPFS address using DNS TXT records. Read the [DNSLink guide](../concepts/dnslink.md) for full details, including how to set it up on your website.

IPFS Companion has two DNSLink preferences.

## Detect DNSLink Websites

When on, Companion checks each domain you visit for a DNSLink record, so it knows which sites are hosted on IPFS. This powers the DNSLink actions in the toolbar menu and is required for loading DNSLink sites from your local gateway.

The check runs in the background and never blocks the page. Results are cached (see below), but the first visit to a new domain adds one lookup to your local Kubo RPC. Browsers do not expose an efficient DNS TXT lookup API [yet](https://bugzilla.mozilla.org/show_bug.cgi?id=1449171), so Companion resolves DNSLink through the Kubo RPC.

When off, Companion does no DNSLink lookups, so there are no toolbar actions and no redirect.

## Load DNSLink Sites from Local Gateway

When on (and detection is on), a DNSLink website is loaded from your local gateway at `/ipns/{domain}` content path instead of from the original server.

The first visit to a new domain loads from the original server while the lookup runs, then Companion updates the tab to the local gateway once the record resolves. Later visits are redirected straight away from the cache. Chromium cannot hold a request open while the lookup runs, so the first load is upgraded by updating the tab rather than by blocking the request.

When off, detection still works and the toolbar actions still appear, but sites are not redirected.

## Lookup cache

Results of DNS TXT lookups are stored in a [Least Recently Used (LRU)](https://en.wikipedia.org/wiki/Cache_replacement_policies#Least_Recently_Used_%28LRU%29) cache of size 1000 and max-age 12h. The cache is in-memory and does not persist between restarts.

## Further resources

- [Bugzilla bug 1449171: Add DNS TXT resolution to dns.resolve WebExtensions API](https://bugzilla.mozilla.org/show_bug.cgi?id=1449171)
