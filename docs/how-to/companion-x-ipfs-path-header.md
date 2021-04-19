---
title: Using x-ipfs-path
description: Learn more about how to use "x-ipfs-path" headers in IPFS Companion.
---

# Support for `x-ipfs-path` headers in IPFS Companion

IPFS Companion can redirect traditional HTTP requests to IPFS if the `x-ipfs-path` response header is provided. 

## Example

```
X-Ipfs-Path: /ipfs/QmPhnvn747LqwPYMJmQVorMaGbMSgA7mRRoyyZYz3DoZRQ
```

## Overview

IPFS HTTP gateways can return an `x-ipfs-path` header with each response. The value of the header is the IPFS path of the returned payload.

The WebExtension API [onHeadersReceived](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/webRequest/onHeadersReceived) can cancel and redirect the HTTP request as soon as the response headers arrive. This means the client can drop the initial request, avoiding duplicate downloads of the content.

Detection of the `x-ipfs-path` header can be disabled in the _Preferences_ screen (but is enabled by default).

## Use cases

### Fallback for edge cases where the IPFS path is not present in the URL

A website owner can have the HTTP gateway behind a reverse-proxy, but configure it to expose `/ipfs/<cid>/` under `/`, in which case path-based IPFS detection by IPFS Companion (see [onBeforeRequest](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/webRequest/onBeforeRequest)) won't work.

Thanks to the `x-ipfs-path` header, we have a reliable fallback for these configurations.

### Hinting DNSLink lookups

The presence of an `x-ipfs-path` header is a clear indicator that a website uses IPFS.

There is a "best-effort" [DNSLink policy](dnslink-companion.md) enabled by default to execute blocking DNS TXT lookups for FQDNs that returned the header.

Note that `x-ipfs-path` values starting with `/ipns/` will be ignored if [DNSLink policy](dnslink-companion.md) is "off" or the DNS TXT record is missing.

### Other resources

- An overview of the `onBeforeRequest` and `onHeadersReceived` listeners can be found in the [WebExtensions API: webRequest](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/webRequest) documentation
