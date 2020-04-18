---
title: IPFS Gateway
sidebarDepth: 0
issueUrl: https://github.com/ipfs/docs/issues/93
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
*   the several types of gateways;
*   their roles in use of IPFS;
*   appropriate situations for use of gateways;
*   situations when you should avoid use of gateways;
*   implementation guidelines.

You should read this document if you want to:
*   understand, at a conceptual level, how gateways fit into the overall use of IPFS;
*   decide whether and what type of gateways to employ for your use case;
*   understand, at a conceptual level, how to deploy gateways for your use case.

## 1. What is an IPFS gateway?
Gateways provide workarounds for applications that do not support IPFS natively.

For example, errors occur when a browser that does not support IPFS attempts access to IPFS content in the canonical form of
```
ipfs://{contentID}/{optional path to resource}
```
Other tools that rely solely on HTTP(S) (e.g., curl) encounter similar errors in accessing IPFS content in canonical form.

The end stage of IPFS deployment includes native support of IPFS in all popular browsers and tools.
In the interim, upgrading the browser/tool to support IPFS (e.g., through a browser extension such as [IPFS Companion for Firefox](https://addons.mozilla.org/en-US/firefox/addon/ipfs-companion/) or [IPFS Companion for Chrome](https://chrome.google.com/webstore/detail/ipfs-companion/nibjojkomfdiaoajekhjakgkdhaomnch)) would resolve IPFS content access errors.

However, not every user may be permitted to alter — or be capable of altering — their browser/tool configuration.
IPFS gateways provide an HTTP(S)-based service for such browsers and tools to access IPFS content.

The canonical form of access to such HTTP(S) IPFS gateways is:
```
https://{gatewayURL}/ipfs/{contentID}/{optional path to resource}
```

## 2. Who provides IPFS gateways?

IPFS gateway providers include:
*   Protocol Labs, which deploys the public gateway ipfs.io;
*   Third-party private or public gateways; e.g., `https://cloudfare.com/ipfs`;
*   You, with a gateway installed as a local service on your machine e.g., `localhost:8080`.

Regardless of who deploys it and where, any IPFS gateway resolves access to any IPFS content ID requested via the canonical HTTP form described above.

## 3. What types of gateways exist?
Categorizing gateways involves several dimension:
*   read/write support
*   <needs a descriptor>
*   service

### 3.1 Read-only and writeable gateways
The examples discussed in the earlier sections above illustrated the use of read-only HTTP(S) gateways to fetch content from IPFS via an HTTP(S) GET method.

_Writeable_ HTTP(S) gateways also support POST, PUT and DELETE methods; e.g., to create and manage content in IPFS.

### 3.2

Subdomain gateway support began with go-ipfs release 0.5.0.7109.

### 3.3 Gateway services

In addition to IPFS content, HTTP(S) gateway access may reach other related services:

| service  | style | canonical form of access |
| ------:  | :---- | :----------------------- |
| IPFS | path | `https://{gateway URL}/ipfs/{content ID}/{optional path to resource}` |
|   | DNSLink | `<something>` |
|   | subdomain  | `https://{contentID}.ipfs.{gatewayURL}/{optional path to resource}` |
| IPLD |  |  |
| IPNS  | path | `https://{gateway URL}/ipns/{IPNS ID}/{optional path to resource}` |
| DWEB   |   | Read/write dweb:// content  |

## 4. When should a gateway be provided, where, and which type of gateway?

### 4.1 Firewalled networks
Running [IPFS Desktop](https://github.com/ipfs-shipyard/ipfs-desktop#ipfs-desktop) or a standalone IPFS node within a browser/tool triggers connection attempts to other IPFS peers.
Private network administrators may treat such connection attempts as potential security vulnerabilities.
IPFS gateway servers located inside the private network and running a trusted code base provide an alternative architecture for read/write access to externally-hosted IPFS content.

## 5. When not to employ a gateway

### 5.1 Delay-sensitive applications
Any gateway introduces delay in completing desired actions.
Faster execution occurs when using methods close to the top of the following list instead of those toward the bottom:
*   native IPFS node local to the app.
*   IPFS extension to app.
*   gateway installed as a local daemon, with redirection of requests
from app to the local service. _Note:_ If an IPFS node exists locally on the same machine, it runs such a gateway at `http://127.0.0.1:8080`.
*   public/private gateways.

### 5.2 End-to-end cyptographic validation required
Because of third-party gateway vulnerabilities outlined in §6.1 below, apps requiring end-to-end validation of content read/write should avoid gateways when possible.
If the app must employ an extenal gateway, such apps should use ipfs.io or a trusted third-party.

## 6. Limitations

### 6.1 Centralization
Use of a gateway requires location-based addressing: `https://{gatewayURL}/ipfs/{contentID}/{etc}`
All to easily the gateway URL becomes the handle by which users identify the content; i.e., the uniform reference locator (URL) equates (improperly) to the uniform reference identifier (URI).
Now imagine that gateway becomes unreachable; e.g., goes offline or cannot be reached from a different user's location because of firewalls.
At this moment content improperly identified by that gateway-based URL also appears (incorrectly) unreachable, defeating an key benefit of IPFS: decentralization.

### 6.2 Misplaced trust
Trusting a specific gateway in turn requires trust of the gateway's issuing Certificate Authorities (CAs) and the security of the public key infrastructure (PKI) employed by that gateway.
Compromised CAs or PKI implementations may undermine the trustworthiness of the gateway.

### 6.3 Violation of same-origin policy
To prevent one website from improperly accessing HTTP session data associated with a different website, the [same-origin policy](https://en.wikipedia.org/wiki/Same-origin_policy) permits script access only to pages that share a common domain name and port.
Consider two web pages stored in IPFS: `ipfs://{contentID A}/{webpage A}` and `ipfs://{contentID B}/{webpage B}`.
Code on webpage A should not access data from webpage B, as they do not share the same content ID (origin).

A browser employing one gateway to access both sites, however, might not enforce that security policy.
From that browser's perspective, both webpages share a common origin: the gateway as identified in the URL `https://{gatewayURL}/…`.

The use of subdomain gateways avoids violating the same-origin policy.
In this situation the gateway's reference to the two webpages becomes:
```
https://{contentID A}.ipfs.{gatewayURL}/{webpage A}
https://{contendID B}.ipfs.{gatewayURL}/{webpage B}
```
and thereby do not share the same origin.

Similarly, the use of DNSLink gateway avoids violating the same-origin policy.

The [IPFS public gateway checker](https://ipfs.github.io/public-gateway-checker/) identifies those public gateways that avoid violating the same-origin policy.

### 6.4 Cross-origin resource sharing
[CORS](https://web.archive.org/web/20200418003728/https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#The_HTTP_response_headers) allows a webpage to permit access to specified data by pages with a different origin.

he [IPFS public gateway checker](https://ipfs.github.io/public-gateway-checker/) identifies those public gateways that support CORS.

### 6.5 Gateway man-in-the-middle (MIM) vulnerability
Employing a public or private HTTP(S) gateway sacrifices end-to-end cryptographic validation of delivery of the correct content.
Consider the case of a browser fetching content with the URL `https://anipfsgateway.org/ipfs/{cid}`.
A compromised `anipfsgateway.org` provides man-in-the-middle vulnerabilities, including:
*   Substituting false content in place of the actual content retrieved via the CID;
*   Diverting a copy of the query and response, as well as the IP address of the querying browser, to a third party.

Similarly, a compromised writeable gateway may inject falsified content into the IPFS network, returning a CID which the user believes (incorrectly) to refer to the true content.
For example, a compromised writeable gateway user Alice POSTs `balance: 123.45`, but the gateway stores `balance: 0.00` and returns to Alice a CID for the falsified content.
Alice gives Bob this CID.
Bob fetches the content with this CID and cryptographically validates `balance: 0.00`.

To partially address this exposure you may wish to use the public gateway cf-ipfs.com as an independent, trusted reference with both same-origin policy and CORS support.

### 6.6 Assuming filenames when downloading files
When downloading files, browsers will usually guess a file's filename by looking at the last component of the path; e.g., `https://{domainName}/{path}/userManual.pdf` downloads a file stored locally with the name `userManual.pdf`.
Unfortunately, when linking directly to a file with no containing directory in IPFS, the content ID becomes the final component.
Storing the downloaded file with the filename set to the content ID fails the human-friendly design test.

To work around this issue, you can add a filename=some_filename parameter to your query string to explicitly specify the filename:

| style | query |
| ----: | :---- |
| path | `https://{gatewayURL}/ipfs/{contentID}?filename={filename.ext}` |
| subdomain | `https://{contentID}.ipfs.{gatewayURL}/?filename={filename.ext}`  |
| DNSLink | TBD |


## 7. Implementation status

## 8. Further details

*   [gateway configuration options](https://github.com/ipfs/go-ipfs/blob/master/docs/config.md#gateway).


<ContentStatus />
