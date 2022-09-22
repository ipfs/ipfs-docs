---
title: Redirects file support
description: What the _redirect file is and how to use them with a website on IPFS.
---
## Redirects file support

The `_redirects` file provides support for URL redirects and rewrites for websites hosted on subdomain or DNSLink gateways. This feature enables support for single-page applications, progressive web applications, custom 404 pages, and avoids link rot when moving to IPFS-backed hosting. On top of that, it also provides the ability to change the appearance of a URL, change where content is located without breaking existing links, and enable URL rewriting.

This `_redirects` implementaion is a subset of pre-existing standards supported by [Cloudflare](https://developers.cloudflare.com/pages/platform/redirects) and [Netlify](https://docs.netlify.com/routing/redirects/).

For more detailed information, check out the [`_redirects` file support specs](https://github.com/ipfs/specs/blob/main/http-gateways/REDIRECTS_FILE.md).

## Supported HTTP status codes

- `200` - OK (redirect will be treated as a rewrite, returning OK without changing the URL shown in the browser).
- `301` - Permanent redirect (the default status).
- `302` - Found (commonly used for temporary redirects).
- `404` - Not found (can be used redirect to custom 404 pages).
- `410` - Gone (the requested content has been permanently removed).
- `451` - Unavailable for legal reasons.

## How to set up the `_redirects` file

To use the `_redirects` file, there must be a file named `_redirects` stored underneath the root CID of the website. This `_redirects` file must be a text file containing one or more lines that follow the format explained below.

### Format of the `_redirects` file

Each line contained within the `_redirects` file has 3 basic components:

1. The `from` path. This specifies the path to be redirected from.
1. The `to` path. This specifies the path to be redirected to.
1. The `status` component. This part is optional and specifies the HTTP status code that will be returned. (301, 404, etc.)

For example, if you want to temporarily redirect traffic from your home page to your index page, the `_redirects` file should contain a line that looks something like this:

```plaintext
/home /index.html 302 \n
```

The same format is used for all redirects.

## Examples

### Catch all and PWA/SPA support

The `200` status will be treated as a rewrite, returning OK without changing the URL shown in the browser. This staus code can be used to build [Progressive Web Apps](https://en.wikipedia.org/wiki/Progressive_web_app) and [Single Page Applications](https://en.wikipedia.org/wiki/Single-page_application).

```plaintext
/home /index.html 200 \n
```

### Redirect an old URL to a new place

The `301` status is a permanent redirect, this is the default status code used when no others are spcified. 

```plaintext
/index /docs.html 301 \n
```

The `302` status is commonly used for temporary redirects.

```plaintext
/home /under-construction.html 302 \n
```

### Add a custom 404 page to your website

Use the `_redirects` file support to add a custom 404 page to your website.

```plaintext
/home /custom-404.html 404 \n
```

### Placeholders

Placeholders are named variables that can be used to match path segments in the `from` path and inject them into the `to` path.

This is useful for redirecting users to their desired content, even if their search was not completely accurate.

For example, if I wanted to search for an article titled "hello world" that was written on June 15, 2022, I could search for it like this: `/posts/06/15/2022/hello-world` and be redirected to `/articles/2022/06/15/hello-world`

```plaintext
/posts/<month>/<day>/<year>/<slug> /articles/<year>/<month>/<day>/<slug> \n
```

## Evaluation

The `_redirects` file  is only supported on subdomain and DNSLink gateways, which provides [unique origin per root CID](https://en.wikipedia.org/wiki/Same-origin_policy).

### No forced redirects

Redirect logic will only be evaluated if the requested path is not in the DAG. Any performance impact associated with checking for the existence of a `_redirects` file or evaluating redirect rules will only be incurred for non-existent paths.

## Error handling

If there are any errors reading or parsing the `_redirects` file, the error codes will be returned with an HTTP 500 status code.