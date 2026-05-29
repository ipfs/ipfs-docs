---
title: Replace public gateways with self-hosted IPFS
description: Replace ipfs.io and dweb.link calls with your own IPFS infrastructure.
---

# Replace public gateways with self-hosted IPFS

If your app fetches content from `ipfs.io` or `dweb.link`, this guide shows you how to switch to infrastructure you control.

When you are done, your app fetches the same content by CID from a gateway you run, with no dependency on `ipfs.io` or `dweb.link`.

## Why this guide

The public gateways at `ipfs.io` and `dweb.link` are a great way to get started, and plenty of apps lean on them early on. They are a shared [public good (best-effort)](../concepts/public-utilities.md), though, with no SLA and no performance knobs you control, so they are not built for production traffic. Running your own infrastructure puts you in charge of both: you set the SLA your users get, and you tune for the performance your app needs. Read [A post-gateway world](https://ipshipyard.com/blog/2025-a-post-gateway-world/) and [IPFS gateways: redirect to in-browser](https://ipshipyard.com/blog/2026-ipfs-gateways-redirect-inbrowser-link/) for the background.

This guide covers two audiences: code in a browser page that fetches from `ipfs.io` via the Fetch API, a Service Worker, or hotlinked subresources (`<img>`, `<script>`, CSS `url()`); and non-browser clients (server code, scripts, mobile apps, CLI tools). Top-level browser navigations (the address bar case) are out of scope; the in-browser redirect linked above handles those without code changes.

For background on the shared infrastructure you are moving away from, see [Public utilities](../concepts/public-utilities.md).

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

Every path ends with the same drop-in change: swap the `ipfs.io` or `dweb.link` URL for your own.

**Use path-style URLs for non-browser clients.** Point at the path-style local gateway: `http://127.0.0.1:{port}/ipfs/{CID}/path/to/file`. Subdomain URLs like `{CID}.ipfs.{host}` only add value for top-level browser navigation, where the browser uses the subdomain to give each site its own origin. If your old code already uses subdomain URLs from `dweb.link`, switch to path-style against your local gateway. The examples below do that.

**Internal-only backends: think Redis, not CDN.** If your backend uses IPFS the way it would use Redis (fetch JSON or a blob by CID, then act on it; nothing reaches end users directly), deploy Rainbow or Kubo on the same host as your app and call it over localhost. The URL swap above is the whole setup. The "Put it on your own domain" and "Trustless vs deserialized" subsections in each backend section below only apply when you also expose the gateway to clients outside your own infrastructure.

## Browser apps

If you fetch IPFS content from JavaScript in a web page, switch to [`@helia/verified-fetch`](https://www.npmjs.com/package/@helia/verified-fetch). It is a drop-in replacement for `fetch` that retrieves content in the browser itself.

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

You can also pass plain HTTP-style URLs like `verifiedFetch('https://bafy....ipfs.example.com/path/to/file')` if you already use subdomain URLs. See the [`@helia/verified-fetch` README](https://www.npmjs.com/package/@helia/verified-fetch) for the full API.

To confirm the swap, load your page and open the browser network panel: requests to the content no longer go to `ipfs.io` or `dweb.link`.

### How it works, and what you still depend on

The main win: `verified-fetch` retrieves content directly from peers, in the browser, over libp2p (the peer-to-peer networking stack IPFS uses). Shared HTTP gateways drop out of the data path.

Two pieces still use HTTP, and they default to public endpoints:

- **Routing** finds which peers have a given CID. Default: `https://delegated-ipfs.dev` ([HTTP delegated routing v1](https://specs.ipfs.tech/routing/http-routing-v1/)).
- **Trustless gateway fallback** kicks in only when peer-to-peer retrieval fails in the browser. Default: `https://trustless-gateway.link`. Pass `gateways: []` to disable it.

For production, point both at your own infrastructure: run [Someguy](#run-someguy) for `/routing/v1`, and [Rainbow](#backend-retrieve-only-rainbow) or [Kubo](#backend-retrieve-and-publish-kubo) for the trustless gateway. The next section shows the configuration.

## Stay independent of public utilities

Run [Someguy](https://github.com/ipfs/someguy#readme) as your `/routing/v1` endpoint, run [Rainbow](#backend-retrieve-only-rainbow) or [Kubo](#backend-retrieve-and-publish-kubo) as your trustless gateway, and point your clients at both. This swaps out the best-effort public endpoints that `@helia/verified-fetch` uses out of the box, so your routing and fallback stay on infrastructure you control too.

### Run Someguy

Follow the [Someguy README](https://github.com/ipfs/someguy#readme). It exposes a `/routing/v1` HTTP endpoint that answers "who has this CID" for your clients.

### Point `@helia/verified-fetch` at your own infrastructure

Combine your Someguy for routing with your Rainbow or Kubo for retrieval. Use HTTPS endpoints under your own domains; browsers block plain HTTP requests from HTTPS pages, and the [Caddy setup](./kubo-rpc-tls-auth.md) handles TLS for you:

```js
import { createVerifiedFetch } from '@helia/verified-fetch'

const verifiedFetch = await createVerifiedFetch({
  gateways: ['https://rainbow-gateway.example.net'],
  routers: ['https://someguy-routing.example.net']
})

const res = await verifiedFetch('ipfs://bafy.../path/to/file')
```

Replace the example domains with your own. See the [`@helia/verified-fetch` README](https://www.npmjs.com/package/@helia/verified-fetch) for the current option names.

### Point your own Kubo or Rainbow at Someguy (optional)

Since Someguy caches routing answers, you can also point your backend Kubo or Rainbow node at it. By default both reach out to public delegated routing endpoints; this override sends them through your Someguy instead. Skip this step if you do not run a backend node.

For Kubo, override the delegated routers and restart the daemon:

```bash
ipfs config --json Routing.DelegatedRouters '["https://someguy-routing.example.net/routing/v1"]'
```

For Rainbow, set the env var before startup:

```bash
RAINBOW_HTTP_ROUTERS=https://someguy-routing.example.net/routing/v1
```

## Backend, retrieve only: Rainbow

[Rainbow](https://github.com/ipfs/rainbow#readme) is a small binary that runs a trustless HTTP gateway on your machine. It retrieves and verifies content; it does not publish or host data of its own. Use it when your backend only fetches from IPFS.

### Run it

Follow the install steps in the [Rainbow README](https://github.com/ipfs/rainbow#readme). Once running, Rainbow serves a gateway on `http://127.0.0.1:8090` by default.

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

Confirm it works by requesting a CID your app already uses; a `200` with the same bytes you got from `ipfs.io` means the swap is done:

```bash
curl http://127.0.0.1:8090/ipfs/{CID}
```

### Put it on your own domain

For HTTPS under a hostname you control, run Rainbow behind Caddy. The Caddy setup in [Secure Kubo RPC with TLS and HTTP Auth](./kubo-rpc-tls-auth.md) works the same way for Rainbow. Point the reverse proxy at `127.0.0.1:8090` instead of the Kubo RPC port.

### Trustless vs deserialized responses

Skip this subsection if Rainbow only serves traffic from your own backend on localhost; deserialized responses are safe there because you trust the node. The rules below apply when you put the gateway on a public hostname.

A gateway can answer in two modes:

- **Deserialized**: the gateway returns the final file, HTML, or JSON. Convenient, but the client has to trust that the gateway returned the correct bytes for the CID. Fine on your own backend, where you trust the node.
- **Trustless**: the gateway returns raw blocks or CAR streams, selected with `?format=raw`, `?format=car`, or a matching `Accept` header. The client cryptographically checks the response against the requested CID, so a tampering gateway is detectable. See the [trustless gateway spec](https://specs.ipfs.tech/http-gateways/trustless-gateway/).

On a public HTTPS domain, serve trustless responses only. Keep the deserialized mode for your own internal callers. If your web or mobile app needs the final file, HTML, or JSON rather than raw blocks, it can still get that from a trustless endpoint: [`@helia/verified-fetch`](#browser-apps) fetches the trustless response and deserializes it on the client after verifying it against the CID, so you get deserialized data without trusting the gateway. Rainbow reads this from environment variables, so set them before launching it (export them in your shell, put them in your `.env`, or add `Environment=` lines to your systemd unit):

```bash
# Public-facing domain: serve only verifiable formats
RAINBOW_TRUSTLESS_GATEWAY_DOMAINS=rainbow-gateway.example.net

# Deserialized path gateway on localhost, for internal backend (non-browser) use
RAINBOW_GATEWAY_DOMAINS=127.0.0.1

# Deserialized subdomain gateway; use localhost or a Public Suffix List domain (see note below)
RAINBOW_SUBDOMAIN_GATEWAY_DOMAINS=localhost
```

If the same domain appears in both `RAINBOW_TRUSTLESS_GATEWAY_DOMAINS` and `RAINBOW_GATEWAY_DOMAINS`, the trustless setting wins, so it is safe to list the public hostname in both. See [Rainbow environment variables](https://github.com/ipfs/rainbow/blob/main/docs/environment-variables.md) for the full list.

Only set `RAINBOW_SUBDOMAIN_GATEWAY_DOMAINS` to `localhost` or to a hostname listed in the [Public Suffix List](https://publicsuffix.org/). Browsers rely on that list to give each `{CID}.ipfs.{host}` subdomain its own origin, so origin isolation only works on a registered suffix.

## Backend, retrieve and publish: Kubo

If you publish and host content as well as retrieve it, run [Kubo](../install/command-line.md). It is the reference IPFS node and gives you both gateway retrieval and publishing APIs.

### Run it

Follow [Install Kubo](../install/command-line.md). Once started, Kubo serves a gateway on `http://127.0.0.1:8080` and an RPC API on `http://127.0.0.1:5001`.

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

Confirm it works by requesting a CID your app already uses:

```bash
curl http://127.0.0.1:8080/ipfs/{CID}
```

### Publish and host content

Once Kubo is running on your server, it hosts every CID you add while the daemon runs and the data stays pinned. Use `ipfs add` from the [command-line quick start](./command-line-quick-start.md), or call the [Kubo RPC API](../reference/kubo/rpc.md) from your backend.

### Add redundancy

You have two options for keeping content available if a single node goes down:

- **Use a pinning service.** A third party stores extra copies for you. See [Work with pinning services](./work-with-pinning-services.md).
- **Run IPFS Cluster.** A small cluster of your own nodes shares pinsets across the group. See [Server infrastructure](../install/server-infrastructure.md).

### Put it on your own domain

For HTTPS and authenticated RPC on a domain you control, follow [Secure Kubo RPC with TLS and HTTP Auth](./kubo-rpc-tls-auth.md). It walks through Caddy with automatic TLS.

The [trustless-only rule from the Rainbow section](#trustless-vs-deserialized-responses) applies to Kubo too. When the gateway hostname is public, set `DeserializedResponses` to `false` so the public endpoint serves only verifiable formats:

```bash
ipfs config --json Gateway.PublicGateways '{"kubo-gateway.example.net": {"Paths": ["/ipfs", "/ipns"], "DeserializedResponses": false}}'
```

See [Gateway recipes](https://github.com/ipfs/kubo/blob/master/docs/config.md#gateway) in the Kubo config docs for more options.

## Further reading

- [Service Worker Gateway](https://github.com/ipfs/service-worker-gateway#readme): worked end-to-end example built on `@helia/verified-fetch`. Useful if you want a single web entry point that handles all IPFS URLs in your app.
- [Best practices for HTTP Gateways](./gateway-best-practices.md): caching, CORS, and reverse-proxy guidance once you run your own gateway.
- [Secure Kubo RPC with TLS and HTTP Auth](./kubo-rpc-tls-auth.md): Caddy with automatic TLS on your own domain.
- [Public utilities](../concepts/public-utilities.md): what the shared IPFS infrastructure is, and what depends on it.
