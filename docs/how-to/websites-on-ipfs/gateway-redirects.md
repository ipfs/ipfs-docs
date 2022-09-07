---
title: Gateway redirects
description: What gateway redirects are and how to use them with a website on IPFS.
---

# THIS IS A DRAFT. DO NOT MERGE.

# To do:
1. How to redirect old URL to a new place (301 and 302 redirects)
1. How to use it for PWA/SPA hosting (catch-all 200) 
1. How to use it to provide custom `404 not found` pages (superceding what `ipfs-404.html` does - ideally not mention old way)

# Gateway Redirects

Gateway Redirects provide support for URL redirects and rewrites for websites hosted on Subdomain or DNSLink gateways. This feature enables support for single-page applications, and avoids link rot when moving to IPFS-backed hosting.

Using Gateway Redirects, you can change the appearance of a URL, change where content is located without breaking existing links, redirect invalid URLs to a custom 404 page, and enable URL rewriting.

# Supported HTTP status codes

* `200` - OK (redirect will be treated as a rewrite, returning OK without changing the URL shown in the browser).
* `301` - Permanent redirect (the default status).
* `302` - Found (commonly used for temporary redirects).
* `303` - See other (replaces PUT and POST with GET).
* `307` - Temporary redirect (preserves the body and HTTP method of the original request).
* `308` - Permanent redirect (preserves the body and HTTP method of the original request).
* `404` - Not found (can be used redirect to custom 404 pages).
* `410` - Gone (the requested content has been permanently removed).
* `451` - Unavailable for legal reasons.

# How to set up gateway redirects

To use Gateway Redirects, there must be a file named `_redirects` stored underneath the root CID of the website. This `_redirects` file must be a text file containing one or more lines that follow the format explained below.

## Format of the `_redirects` file

Each line contained within the `_redirects` file has 3 basic components:

1. The `from` path, this specifies the path to be redirected from.
1. The `to` path, this specifies the path to be redirected to.
1. The `status` component, this part is optional and specifies the HTTP status code that will be returned. (301, 404, etc.)

For example, if I want to redirect a page to a custom `404` page, the `_redirects` file will contain a line that looks something like this:
```
/<requested page> /custom404.html 404
```

The same format is used for all redirects.

## Placeholders

Placeholders are named variables that can be used to match path segments in the `from` path and inject them into the `to` path.

For example, if I wanted to search for an article titled "hello world" that was written on June 15, 2022, I could search for it like this: `/posts/06/15/2022/hello-world` and be redirected to `/articles/2022/06/15/hello-world`

## Splat

If the `from` path ends with an asterisk (`*`), the rest of the `from` path will be slurped up into the special `:splat` placeholder, which can then be injected into the `to` path.
```
/posts/* /articles/:splat
```
:::note
Splat logic must only apply to a single trailing asterisk, as it is a greedy match that consumes the remainder of the path. :::

## Comments

Any line in the `_redirects` file that begins with `#` will be ignored and treated as a comment.

## Line termination

Each line in the `_redirects` file must be terminated with either `\n` or `\r\n`.

```
/<requsted page> /custom404.html 404 \n
/home /index.html \n
```
# Evaluation

Rules must only be evaluated when hosted on a subdomain or DNSLink gateway, this is to maintain same-origin isolation.

## Order

Rules must be evaluated in order, redirecting or rewriting using the first matching pair.

## No forced redirects

Redirect logic will only be evaluated if the requested path is not in the DAG. Any performance impact associated with checking for the existence of a `_redirects` file or evaluating redirect rules will only be incurred for non-existent paths.

# Error handling

If there are any errors reading or parsing the `_redirects` file, the error codes will be returned with an HTTP 500 status code.