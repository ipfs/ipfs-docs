---
title: Redirects and custom 404s
description: What the _redirect file is and how to use them with a website or single-page application (SPA) on IPFS.
---
# Redirects, custom 404s, and SPA support

::: callout
This feature is new, and requires Kubo 0.16 or later.
:::

This feature enables support for redirects, [single-page applications](#examples), [custom 404 pages](#add-a-custom-404-page-to-your-website), and moving to IPFS-backed hosting [without breaking existing links](https://www.w3.org/Provider/Style/URI).

## Evaluation

This feature is limited to websites hosted in web contexts with unique [Origins](https://en.wikipedia.org/wiki/Same-origin_policy) for content roots, e.g., [subdomain](../../how-to/address-ipfs-on-web.md#subdomain-gateway) or [DNSLink](../../how-to/address-ipfs-on-web.md#dnslink-gateway) gateways.

Redirect logic will only be evaluated if the requested path is not in the [DAG](../../concepts/glossary.md#dag).  Any performance impact associated with checking for the existence of a `_redirects` file or evaluating redirect rules will only be incurred for non-existent paths. If there are any errors reading or parsing the `_redirects` file, the error codes will be returned with an HTTP 500 status code.

## How to set up

To define rules that will be executed when the requested path is not found in the DAG, there must be a file named `_redirects` stored underneath the root CID of the website. This `_redirects` file must be a text file containing one or more lines that follow the format explained below.

### Format of the `_redirects` file

Each line contained within the `_redirects` file has 3 basic components:

```plaintext
from  to  [status]
```

1. The `from` path. This specifies the path to be redirected from.
1. The `to` path. This specifies the path to be redirected to.
1. The `status` component. This part is optional and specifies the HTTP status code that will be returned. (301, 404, etc.)

For example, if you removed `home.html` and want to temporarily redirect traffic from `home.html` to `index.html`, the `_redirects` file should contain a line that looks something like this:

```plaintext
/home.html /index.html 302
```

### Status codes

- `200` - OK (redirect will be treated as a rewrite, returning payload from alternative content path without changing the URL shown in the browser).
- `301` - Permanent redirect (the default status).
- `302` - Found (commonly used for temporary redirects).
- `404` - Not found (defines custom 404 page).
- `410` - Gone (the requested content has been permanently removed).
- `451` - Unavailable for legal reasons.

### Placeholders

Placeholders are named variables that can be used to match path segments in the `from` path and inject them into the `to` path.

This is useful for redirecting users to their desired content, even if the way your website is organized changed.

For example, if I wanted to search for an article titled "hello world" that was written on June 15, 2022, I could search for it like this: `/posts/06/15/2022/hello-world` and be redirected to `/articles/2022/06/15/hello-world`

```plaintext
/posts/:month/:day/:year/:title  /articles/:year/:month/:day/:title  301
```

There is also a special catch-all placeholder named `:splat` which represents everything captured via `*`.

```plaintext
/blog/*  /new-blog/:splat  302
```

### Compatibility

IPFS hosting supports only a subset of pre-existing standards supported by [Cloudflare](https://developers.cloudflare.com/pages/platform/redirects) and [Netlify](https://docs.netlify.com/routing/redirects/).
There is no overwrite/shadowing: the file is evaluated only when requested path is not found in a [DAG](../../concepts/glossary.md#dag).

::: tip
For more detailed information about supported features, check out the [`_redirects` file specification](https://github.com/ipfs/specs/blob/main/http-gateways/REDIRECTS_FILE.md).
:::

## Examples

### Catch all and PWA/SPA support

The `200` status will be treated as a rewrite, returning OK without changing the URL shown in the browser. This status code can be used to build [Progressive Web Apps](https://en.wikipedia.org/wiki/Progressive_web_app) and [Single Page Applications](https://en.wikipedia.org/wiki/Single-page_application).

```plaintext
/app/* /app/index.html 200
```

Opening `/app/this-does-not-exist` will return HTTP 200 response with content from `/app/index.html`

### Redirect an old URL to a new place

The `301` status is a permanent redirect, this is the default status code used when no code is specified.
The two rules below mean the same thing:

```plaintext
/old/docs.html /new/documentation.html
/old/docs.html /new/documentation.html 301
```

The `302` status is commonly used for temporary redirects.

```plaintext
/home /under-construction.html 302
```

For advanced and catch-all redirects, see [Placeholders](#placeholders).

### Add a custom 404 page to your website

Since the `_redirects` is evaluated only when requested path does not exist,
it is possible to define a custom 404 page for your website:

```plaintext
/* /custom-404.html 404
```

With the above rule, opening `/this-does-not-exist` will return HTTP 404 Not Found error response with the payload of a custom error page defined in `custom-404.html`.
