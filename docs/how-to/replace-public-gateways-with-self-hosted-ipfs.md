---
title: Replace public gateways with self-hosted IPFS
description: Replace ipfs.io and dweb.link calls with your own IPFS infrastructure.
---

# Replace public gateways with self-hosted IPFS

If your app fetches content from `ipfs.io` or `dweb.link`, this guide shows you how to switch to infrastructure you control.

When you are done, your app fetches the same content by CID from a gateway you run, with no dependency on `ipfs.io` or `dweb.link`.

Do this incrementally: stand up your own gateway, run it alongside the public ones, move one call site at a time, and keep a public gateway as a temporary fallback while you cut over. Nothing here requires a big-bang switch. Still, start your migration today, before the public gateways throttle.

## Why move off public gateways

The public gateways at `ipfs.io` and `dweb.link` are a great way to get started, and plenty of apps lean on them early on. They are a shared [public good (best-effort)](../concepts/public-utilities.md), though: no SLA, no support, and shared rate limits that can throttle or block your traffic at any time, without notice. Building production on them is borrowed time. Running your own infrastructure puts you in charge: you set the reliability target your users get, invest to meet it, and tune for the performance your app needs.

It also keeps you portable. Everything here is built on [open standards](https://specs.ipfs.tech/): content-addressed CIDs, path-style [gateway URLs](https://specs.ipfs.tech/http-gateways/), [trustless `raw` block responses](https://specs.ipfs.tech/http-gateways/trustless-gateway/), and [delegated routing](https://specs.ipfs.tech/routing/http-routing-v1/). No provider locks you in, and you will not repeat this migration if a hosted service changes its terms. For the background, read [A post-gateway world](https://ipshipyard.com/blog/2025-a-post-gateway-world/) and [IPFS Public Gateways are Redirecting to inbrowser.link](https://ipshipyard.com/blog/2026-ipfs-gateways-redirect-inbrowser-link/).

This guide covers the two ways an app fetches from `ipfs.io` today:

- **Browser code**: the Fetch API, a Service Worker, or hotlinked subresources (`<img>`, `<script>`, CSS `url()`).
- **Non-browser clients**: server code, scripts, mobile apps, and CLI tools.

**Out of scope: top-level browser navigations** (the address bar case). You can serve these yourself from a [subdomain gateway](https://specs.ipfs.tech/http-gateways/subdomain-gateway/), but running one on a public domain takes a wildcard TLS setup and a submission to the [Public Suffix List](https://publicsuffix.org/), so this guide does not cover it. The public gateways already redirect such navigations to the [`inbrowser.link`](https://inbrowser.link) Service Worker Gateway (linked above), so they need no code changes beyond switching from `ipfs.io` to `inbrowser.link` to avoid the unnecessary redirect.

For background on the shared infrastructure you are moving away from, see [Public utilities](../concepts/public-utilities.md).

## Before you start

Depending on which path you take, you will need:

- **Browser path:** Node.js and npm to add [`@helia/verified-fetch`](https://www.npmjs.com/package/@helia/verified-fetch) to your app.
- **Backend paths:** a host where you can run a binary, plus either Docker or Go to install Rainbow, Kubo, or Someguy.
- **Putting a gateway on a public domain:** a domain you control with DNS pointing at your server, ports `80` and `443` open, and a reverse proxy such as [Caddy](https://caddyserver.com/).
- **Free ports:** Kubo uses `8080` (gateway) and `5001` (RPC), Rainbow uses `8090` (gateway), and Someguy uses `8190` (routing). Make sure these are free or change them.

## Pick your path

Two things you might do with IPFS:

- **Retrieve** (the "read" side): fetch existing content by CID. This is what a public gateway does for you today.
- **Publish and host** (the "write" side): add new content and keep it online so other peers can fetch it.

Match your setup to one of the three rows, then jump to that section.

| Where you use IPFS                       | What you do with it                                                            | Jump to                                                              |
| ---------------------------------------- | ------------------------------------------------------------------------------ | -------------------------------------------------------------------- |
| Browser (web page)                       | Retrieve via the Fetch API, a Service Worker, or as a subresource (`<img>`, `<script>`) | [Set up `@helia/verified-fetch` ↓](#browser-apps)            |
| Backend (server, script, CLI, mobile)    | Retrieve only (`curl`, Node.js, Go, Python, etc.)                              | [Set up Rainbow ↓](#backend-retrieve-only-rainbow)                   |
| Backend (server, script, CLI, mobile)    | Retrieve and publish (host data)                                               | [Set up Kubo ↓](#backend-retrieve-and-publish-kubo)                  |

Every path ends with the same drop-in change: swap the `ipfs.io` or `dweb.link` URL for your own. The browser path requires a second step after the URL swap, pointing routing and gateway fallback at your own infrastructure, because the swap alone leaves those on public endpoints. The browser section below covers that step.

**Use path-style URLs for non-browser clients.** Point at the path-style local gateway: `http://127.0.0.1:{port}/ipfs/{CID}/path/to/file`. Subdomain URLs like `{CID}.ipfs.{host}` put each content root on its own web origin, the boundary a browser uses to wall off each site's scripts, cookies, and storage from the others. That isolation matters whenever a gateway serves untrusted content, including a CID opened directly in the address bar. Non-browser clients gain nothing from subdomains, and pay for them: a subdomain gateway answers a path-style request with a redirect to the subdomain form, so every fetch costs an extra round trip for isolation the client does not use. If your old backend (not browser) code already uses subdomain URLs from `dweb.link`, switch to path-style against your local gateway. The examples below do that.

**Internal-only backends: think Redis, not CDN.** If your backend uses IPFS the way it would use Redis (fetch JSON or a blob by CID, then act on it; nothing reaches end users directly), deploy Rainbow or Kubo on the same host as your app and call it over localhost. The URL swap is the whole setup. The "Put it on your own domain" and "Serve only verifiable responses" guidance below applies only when you also expose the gateway to clients outside your own infrastructure.

## Browser apps

If you fetch IPFS content from JavaScript in a web page, switch to [`@helia/verified-fetch`](https://www.npmjs.com/package/@helia/verified-fetch). It is a drop-in replacement for `fetch` that retrieves content in the browser itself and verifies every byte against the CID.

### Install

```bash
npm install @helia/verified-fetch
```

### Swap your fetches

```js
// Before
const res = await fetch('https://ipfs.io/ipfs/bafy.../path/to/file')

// After
import { verifiedFetch } from '@helia/verified-fetch'
const res = await verifiedFetch('ipfs://bafy.../path/to/file')
```

`verifiedFetch` takes a content-addressed resource, not a gateway URL. It accepts `ipfs://`, `ipns://`, `/ipfs/`, `/ipns/`, and `dnslink://`, but not `http(s)` gateway URLs. If your old code used subdomain or path gateway URLs, convert them to the `ipfs://{CID}/path` form:

```
https://{CID}.ipfs.dweb.link/path  ->  ipfs://{CID}/path
https://ipfs.io/ipfs/{CID}/path    ->  ipfs://{CID}/path
```

Real apps usually have these URLs in more than one place. Before you start, grep your code, config, and stored data for `ipfs.io` and `dweb.link` to find every call site. See the [`@helia/verified-fetch` README](https://www.npmjs.com/package/@helia/verified-fetch) for the full API.

### Set the Content-Type for page subresources

`verifiedFetch` detects common binary types from their magic bytes (images come back as `image/png`, `image/jpeg`, and so on, and JSON as `application/json`), but it returns `text/plain` for HTML, JavaScript, CSS, and SVG. Browsers refuse to run a `<script>` or apply a `<link rel="stylesheet">` served as `text/plain`, so these subresources break unless you set the type.

Give it the filename so it can pick the type from the extension:

```js
const res = await verifiedFetch('ipfs://bafy.../app.js?filename=app.js')
```

Or set types yourself with a `contentTypeParser` for full control:

```js
import { createVerifiedFetch } from '@helia/verified-fetch'

const verifiedFetch = await createVerifiedFetch({
  contentTypeParser: (bytes, fileName) => {
    if (fileName?.endsWith('.js')) return 'text/javascript'
    if (fileName?.endsWith('.css')) return 'text/css'
    if (fileName?.endsWith('.svg')) return 'image/svg+xml'
  }
})
```

This helps most when you route subresource requests through `verifiedFetch` inside a [Service Worker](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API), intercepting `fetch` events and returning the `Response` yourself. A `contentTypeParser` lets you serve each subresource with the content type the browser expects, so `<img>`, `<script>`, and `<link>` work without changing the page markup. The [Service Worker Gateway](https://github.com/ipfs/service-worker-gateway#readme) is a worked example of this pattern.

### How retrieval works, and what still uses public endpoints

`verified-fetch` retrieves content over [libp2p](https://libp2p.io) (the peer-to-peer networking stack IPFS uses) and over HTTP trustless gateways at the same time, verifying the bytes against the CID either way. In the browser it talks directly to providers that expose browser-dialable transports (Bitswap over WebSockets and WebRTC) and falls back to HTTPS trustless gateways for everything else. A shared gateway is therefore one retrieval path among several, not the only one.

Two pieces use HTTP, and out of the box they point at public endpoints:

- **Delegated Routing** finds which peers have a given CID, without running an expensive DHT client locally. Default: `https://delegated-ipfs.dev` ([HTTP delegated routing v1](https://specs.ipfs.tech/routing/http-routing-v1/)), set with the `routers` option.
- **Trustless gateway** acts as a fallback retrieval proxy for cases where direct retrieval fails (e.g. a content provider that does not expose a browser-compatible transport like `/wss` or HTTP). Default: `https://trustless-gateway.link`, set with the `gateways` option; `gateways: []` drops the HTTP trustless path entirely (libp2p retrieval still runs).

For production, point both at your own infrastructure, as shown next.

### Point routing and gateway at your own infrastructure

This is the required second step for the browser path. Run [Someguy](#run-someguy-your-routing-endpoint) as your `/routing/v1` endpoint and [Rainbow](#backend-retrieve-only-rainbow) or [Kubo](#backend-retrieve-and-publish-kubo) as your trustless gateway (all covered below), then pass both to `createVerifiedFetch`. Use HTTPS endpoints under your own domains; browsers block plain HTTP requests from HTTPS pages.

```js
import { createVerifiedFetch } from '@helia/verified-fetch'

const verifiedFetch = await createVerifiedFetch({
  gateways: ['https://rainbow-gateway.example.net'],
  routers: ['https://someguy-routing.example.net']
})

const res = await verifiedFetch('ipfs://bafy.../path/to/file')
```

Replace the example domains with your own. The `routers` value is the base origin; the delegated-routing client appends `/routing/v1` itself. See the [`@helia/verified-fetch` README](https://www.npmjs.com/package/@helia/verified-fetch) for the current option names.

### Verify you left the public gateways

Load your page and open the browser network panel. Confirm that requests no longer go to `ipfs.io`, `dweb.link`, `delegated-ipfs.dev`, or `trustless-gateway.link`, and that they go to your own gateway and routing hosts instead. A passing `curl` or a `200` status is not enough on its own; the dangerous failure mode is a swap that still quietly uses public routing or fallback. The network panel (and your own Someguy and gateway logs, showing the matching inbound requests) confirms the move is complete.

## Run Someguy (your routing endpoint)

[Someguy](https://github.com/ipfs/someguy#readme) answers routing queries for your clients over a `/routing/v1` HTTP endpoint ([delegated routing v1](https://specs.ipfs.tech/routing/http-routing-v1/)): provider lookups ("who has this CID"), peer-address lookups, and IPNS record resolution. Follow the [Someguy README](https://github.com/ipfs/someguy#readme) to install it; it listens on `http://127.0.0.1:8190` by default.

Running your own Someguy moves the routing and caching layer onto infrastructure you control. By default it runs its own [Amino DHT](../concepts/dht.md) client, so DHT lookups happen on your node, not a third party. Its provider, peer, and IPNS lookups still fan out to the public `cid.contact` and `delegated-ipfs.dev` endpoints unless you override `SOMEGUY_PROVIDER_ENDPOINTS`, `SOMEGUY_PEER_ENDPOINTS`, and `SOMEGUY_IPNS_ENDPOINTS`. Overriding them removes that dependency, but costs you the indexed providers those services aggregate, which you cannot easily self-host.

### Point your own Kubo or Rainbow at Someguy (optional)

If you also run a backend node, route it through your Someguy so all routing traffic flows through one cache and egress point you control, instead of each node reaching public delegated routing on its own. Skip this if you do not run a backend node.

For Kubo, set the delegated routers and restart the daemon. Keep `auto` in the list to query your Someguy in addition to Kubo's defaults, or list only your Someguy to send all delegated routing through it:

```bash
ipfs config --json Routing.DelegatedRouters '["auto", "https://someguy-routing.example.net/routing/v1"]'
```

For Rainbow, set the env var before startup. This replaces Rainbow's default routing, so include any other routers you still want:

```bash
RAINBOW_HTTP_ROUTERS=https://someguy-routing.example.net/routing/v1
```

Backend nodes want the full path ending in `/routing/v1`, unlike the `routers` value for `@helia/verified-fetch`, which is the base origin.

## Backend, retrieve only: Rainbow

[Rainbow](https://github.com/ipfs/rainbow#readme) is a small binary that runs a trustless HTTP gateway on your machine. It retrieves and verifies content; it does not publish or host data of its own. Use it when your backend only fetches from IPFS.

### Run it

Follow the installation steps in the [Rainbow README](https://github.com/ipfs/rainbow#readme). Once running, Rainbow serves a gateway on `http://127.0.0.1:8090` by default. That gateway already sends permissive CORS headers (`Access-Control-Allow-Origin: *`), so browser apps can fetch from it without extra configuration.

### Swap your URLs

Your code fetches from a URL like one of these today:

```
https://ipfs.io/ipfs/{CID}/path/to/file
https://{CID}.ipfs.dweb.link/path/to/file
```

Point it at your local gateway instead:

```
http://127.0.0.1:8090/ipfs/{CID}/path/to/file
```

### Verify

Request a CID your app already fetches from `ipfs.io`. A `200` with the same bytes you got from `ipfs.io` means the swap is done:

```bash
curl http://127.0.0.1:8090/ipfs/{CID} | sha256sum
curl https://ipfs.io/ipfs/{CID} | sha256sum   # same digest
```

### Put it on your own domain

For HTTPS under a hostname you control, run Rainbow behind a reverse proxy. A minimal [Caddy](https://caddyserver.com/) site is enough; Caddy gets a TLS certificate automatically and forwards the original `Host` header and `X-Forwarded-Proto` by default:

```caddyfile
rainbow-gateway.example.net {
  reverse_proxy 127.0.0.1:8090
}
```

The reverse proxy must forward the original `Host` header, otherwise the per-hostname rules in the next section never match and your public endpoint keeps serving deserialized responses. Do not put HTTP Basic Auth in front of a read gateway you want to stay open, and do not strip the gateway's CORS headers at the proxy. (The [Secure Kubo RPC with TLS and HTTP Auth](./kubo-rpc-tls-auth.md) guide sets up TLS plus authentication for the Kubo RPC API on port `5001`, a different endpoint with different needs; do not reuse its auth and RPC-scoped CORS for a gateway.)

Once the gateway is public, see [Serve only verifiable responses on a public domain](#serve-only-verifiable-responses-on-a-public-domain) for the Rainbow configuration.

## Backend, retrieve and publish: Kubo

If you publish and host content as well as retrieve it, run [Kubo](../install/command-line.md). It is the reference IPFS node and gives you both gateway retrieval and publishing APIs.

### Run it

Follow [Install Kubo](../install/command-line.md). Once started, Kubo serves a gateway on `http://127.0.0.1:8080` and an RPC API on `http://127.0.0.1:5001`. The gateway sends permissive CORS headers (`Access-Control-Allow-Origin: *`) by default, so browser apps can fetch from it directly. It also exposes its own `/routing/v1` endpoint on `127.0.0.1:8080`, so a self-hosted Kubo can double as the routing endpoint for `@helia/verified-fetch` (`routers: ['https://kubo-gateway.example.net']`), an alternative to running a separate Someguy.

### Swap your URLs

Your code fetches from a URL like one of these today:

```
https://ipfs.io/ipfs/{CID}/path/to/file
https://{CID}.ipfs.dweb.link/path/to/file
```

Point it at your local gateway instead:

```
http://127.0.0.1:8080/ipfs/{CID}/path/to/file
```

### Verify

Request a CID your app already fetches and compare the bytes to `ipfs.io`:

```bash
curl http://127.0.0.1:8080/ipfs/{CID} | sha256sum
curl https://ipfs.io/ipfs/{CID} | sha256sum   # same digest
```

### Publish and host content

Once Kubo is running on your server, it hosts every CID you add while the daemon runs and the data stays pinned. Use `ipfs add` from the [command-line quick start](./command-line-quick-start.md), or call the [Kubo RPC API](../reference/kubo/rpc.md) from your backend.

For others to retrieve what you add, the daemon must keep running and stay reachable. By default, Kubo announces your content to the DHT automatically and uses AutoNAT, circuit relay, hole punching, and AutoTLS to stay dialable from behind NAT and from browsers. Keep those defaults on. For a public server, also forward the swarm port (`4001`) to it; that is the most reliable setup. Keep `Routing.Type` at `auto` (the default) or `autoclient`, since other modes like `none` and `delegated` stop announcing your content to the DHT.

By default the gateway is recursive: it fetches any requested CID from the network, which is what lets it replace `ipfs.io` for retrieval. If you do not want the node to act as a proxy, and instead want it to serve only the data you add to it (via `ipfs add` or the RPC API), run with `Gateway.NoFetch=true`: the Kubo gateway then answers from the local repo and never fetches the rest, so it cannot be used as open web hosting.

### Add redundancy

You have two options for keeping content available if a single node goes down:

- **Use a pinning service.** A third party stores extra copies for you. See [Work with pinning services](./work-with-pinning-services.md).
- **Run IPFS Cluster.** A small cluster of your own nodes shares pinsets across the group. See [Server infrastructure](../install/server-infrastructure.md).

### Put it on your own domain

For HTTPS on a domain you control, run Kubo behind a reverse proxy. A minimal [Caddy](https://caddyserver.com/) site handles TLS automatically and forwards the original `Host` header (required for the per-hostname rules below to match):

```caddyfile
kubo-gateway.example.net {
  reverse_proxy 127.0.0.1:8080
}
```

To secure the Kubo RPC API (`5001`) for pinning from CI or other services, a separate endpoint from the gateway, follow [Secure Kubo RPC with TLS and HTTP Auth](./kubo-rpc-tls-auth.md). Do not expose the RPC API as your public gateway.

Once the gateway is public, see [Serve only verifiable responses on a public domain](#serve-only-verifiable-responses-on-a-public-domain) for the Kubo configuration.

## Serve only verifiable responses on a public domain

Skip this if your gateway only serves traffic from your own backend on localhost; deserialized responses are safe there because you trust the node. The rules below apply once you put the gateway on a public hostname.

A gateway can answer in two modes:

- **Deserialized**: the gateway returns the final file, HTML, or JSON. Convenient, but the client must trust that the gateway returned the correct bytes for the CID.
- **Trustless**: the gateway returns raw blocks or CAR streams, selected with `?format=raw`, `?format=car`, or a matching `Accept` header. The client cryptographically checks the response against the requested CID, so a tampering gateway is detectable. See [trustless, verifiable retrieval](../reference/http/gateway.md#trustless-verifiable-retrieval), the [trustless gateway spec](https://specs.ipfs.tech/http-gateways/trustless-gateway/), and the [man-in-the-middle note in gateway best practices](./gateway-best-practices.md).

On a public HTTPS domain, serve trustless responses only, and keep the deserialized mode for your own internal callers. If your web or mobile app needs the final file, HTML, or JSON rather than raw blocks, a trustless endpoint still delivers it: [`@helia/verified-fetch`](#browser-apps) fetches the trustless response, verifies it against the CID, and deserializes it on the client. These rules take effect per hostname, so they apply only when the reverse proxy forwards the original `Host` header; if it forwards `Host: 127.0.0.1` instead, the public endpoint keeps serving deserialized responses.

A public gateway is also an open service. Unlike `ipfs.io`, a self-hosted gateway has no abuse protection by default; see [gateway best practices](./gateway-best-practices.md) for rate limiting, a denylist, and putting a CDN in front.

### Rainbow

Rainbow reads this from environment variables, so set them before launching it (export them in your shell, put them in your `.env`, or add `Environment=` lines to your systemd unit):

```bash
# Public-facing domain: serve only verifiable formats
RAINBOW_TRUSTLESS_GATEWAY_DOMAINS=rainbow-gateway.example.net

# Deserialized subdomain gateway; use localhost or a Public Suffix List domain (see note below)
RAINBOW_SUBDOMAIN_GATEWAY_DOMAINS=localhost
```

`RAINBOW_GATEWAY_DOMAINS` (the deserialized path gateway) already defaults to `127.0.0.1`, so localhost callers keep the deserialized mode with no setting at all. If the same domain appears in both `RAINBOW_TRUSTLESS_GATEWAY_DOMAINS` and `RAINBOW_GATEWAY_DOMAINS`, the trustless setting wins, so listing the public hostname in both is safe. See [Rainbow environment variables](https://github.com/ipfs/rainbow/blob/main/docs/environment-variables.md) for the full list.

Set `RAINBOW_SUBDOMAIN_GATEWAY_DOMAINS` only to `localhost` or to a hostname listed in the [Public Suffix List](https://publicsuffix.org/). Browsers rely on that list to give each `{CID}.ipfs.{host}` subdomain its own origin, so origin isolation works only on a registered suffix.

### Kubo

Set `DeserializedResponses` to `false` for the public hostname so it serves only verifiable formats:

```bash
ipfs config --json Gateway.PublicGateways '{"kubo-gateway.example.net": {"Paths": ["/ipfs", "/ipns"], "DeserializedResponses": false}}'
```

On a host-only node, combine this with `Gateway.NoFetch=true` (see [Publish and host content](#publish-and-host-content) above). See [Gateway recipes](https://github.com/ipfs/kubo/blob/master/docs/config.md#gateway) in the Kubo config docs for more options.

## You are done when

- No requests from your app reach `ipfs.io`, `dweb.link`, `delegated-ipfs.dev`, or `trustless-gateway.link`.
- For the browser path, routing points at your Someguy and the gateway fallback points at your own gateway.
- Your gateway returns the same bytes for a CID as `ipfs.io` did.
- If the gateway is public, it is on your own HTTPS domain and serves only verifiable responses.

A self-hosted node starts with a cold cache and no peering, so the first fetch of a CID can be slower than a warm public gateway, and obscure CIDs may take longer to find providers. See [gateway best practices](./gateway-best-practices.md) for peering, the accelerated DHT client, and caching that close this gap.

## Further reading

- [Service Worker Gateway](https://github.com/ipfs/service-worker-gateway#readme): worked end-to-end example built on `@helia/verified-fetch`. Useful if you want a single web entry point that handles all IPFS URLs in your app.
- [Best practices for HTTP Gateways](./gateway-best-practices.md): caching, CORS, rate limiting, and reverse-proxy guidance once you run your own gateway.
- [Secure Kubo RPC with TLS and HTTP Auth](./kubo-rpc-tls-auth.md): Caddy with automatic TLS and authentication for the Kubo RPC API on your own domain.
- [Public utilities](../concepts/public-utilities.md): what the shared IPFS infrastructure is, and what depends on it.
