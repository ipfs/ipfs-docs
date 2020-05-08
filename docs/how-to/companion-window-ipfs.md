---
title: Using `window.ipfs`
description: Learn about exposing IPFS API in IPFS Companion via "window.ipfs".
---

# Using `window.ipfs` in IPFS Companion

Learn about exposing IPFS API in IPFS Companion via "window.ipfs".

::: danger

## `window.ipfs` is currently disabled

IPFS Companion 2.11 stopped injecting `window.ipfs`. It will be restored after the [move to JS API with async await and async iterables](https://github.com/ipfs-shipyard/ipfs-companion/issues/843), with a likely ETA of Q3 2020. This page is provided for reference only.

:::

### Disclaimer

There is a substantial amount of [ongoing work for this interface](https://github.com/ipfs-shipyard/ipfs-companion/issues/589). Want to help with shaping it? See [#589](https://github.com/ipfs-shipyard/ipfs-companion/issues/589) and [issues with the `area/window-ipfs` label](https://github.com/ipfs-shipyard/ipfs-companion/labels/area%2Fwindow-ipfs).

The interface is experimental and might change. Use [window.ipfs-fallback](https://www.npmjs.com/package/window.ipfs-fallback) to ensure your app follows any future changes

## Background

IPFS Companion exposes a subset of IPFS APIs as `window.ipfs` on every webpage. This means websites can detect that `window.ipfs` already exists and use it instead of spawning their own `js-ipfs` node, which saves resources, battery, etc.

For more context, see:

- First iteration: [window.ipfs v1](https://github.com/ipfs-shipyard/ipfs-companion/issues/330)
- Second iteration (currently under development): [window.ipfs v2](https://github.com/ipfs-shipyard/ipfs-companion/issues/589)

## Creating applications using `window.ipfs`

If a user has installed IPFS Companion, `window.ipfs` will be available as soon as the first script runs on your web page, so you'll be able to detect it using a simple `if` statement:

```js
if (window.ipfs && window.ipfs.enable) {
  const ipfs = await window.ipfs.enable({ commands: ['id', 'dag', 'version'] })
  console.log(await ipfs.id())
} else {
  // Fallback
}
```

To add and get content, you could update the above example to do something like this:

```js
if (window.ipfs && window.ipfs.enable) {
  try {
    const ipfs = await window.ipfs.enable({ commands: ['add', 'cat'] })
    const [{ hash }] = await ipfs.add(Buffer.from('=^.^='))
    const data = await ipfs.cat(hash)
    console.log(data.toString()) // =^.^=
  } catch (err) {
    if (err.code === 'ERR_IPFS_PROXY_ACCESS_DENIED') {
      // Proxy is present but user denied access.
      // (fallback to js-ipfs or js-ipfs-http-client goes here)
    } else {
      // Something else went wrong (error handling)
      throw err
    }
  }
} else {
  // No IPFS Proxy
  // (fallback to js-ipfs or js-ipfs-http-client goes here)
}
```

### Error codes

Errors returned by IPFS proxy can be identified by the value of the `code` attribute.

`ERR_IPFS_PROXY_ACCESS_DENIED` is thrown when the current scope has no access rights to requested commands.

Optional `scope` and `permissions` attributes provide detailed information:

- If access was denied for a specific command, then the `permissions` list is present and includes names of blocked commands
- If the entire IPFS proxy was disabled by the user, then the `permissions` list is missing entirely

## Q&A

### What is a `window.ipfs`?

It is an IPFS proxy endpoint that enables you to obtain an IPFS API instance. Depending how IPFS Companion is configured, you may be talking directly to a `js-ipfs` node running in Companion, a `go-ipfs` daemon over `js-ipfs-http-client`, or a `js-ipfs` daemon over `js-ipfs-http-client` ... and potentially others in the future. Note that object returned by `window.ipfs.enable` is _not_ an instance of `js-ipfs` or `js-ipfs-http-client`, but is a proxy to one of them, so don't expect to be able to detect either of them or be able to use any undocumented or instance-specific functions.

For information on available functions, see the [js-ipfs](https://github.com/ipfs/js-ipfs) and [js-ipfs-http-client](https://github.com/ipfs/js-ipfs-http-client) docs for available functions. If you find that some new functions are missing, the proxy might be out of date. Please check the [current status](https://github.com/tableflip/ipfs-postmsg-proxy#current-status) and submit a PR.

### How do I fall back if `window.ipfs` is not available?

See the [example code](https://github.com/ipfs-shipyard/ipfs-companion/blob/master/examples/window.ipfs-fallback.html) (and [live demo](https://ipfs-shipyard.github.io/ipfs-companion/examples/window.ipfs-fallback.html)) for getting an IPFS instance with a fallback.

**Tip:** Use the [window.ipfs-fallback](https://www.npmjs.com/package/window.ipfs-fallback) library, which takes care of the fallback ceremony. It will ensure your app follows API changes and does not break in the future.

### What about IPFS node configuration?

Right now, access to the `config` command is blocked, and you can't make any assumptions about how the node is configured. For example, the user may not have enabled experimental features like PubSub.

Spawn a dedicated js-ipfs instance if you need non-standard configuration or any experimental features.

### Is there a permission control (ACL)?

Yes. IPFS Companion users are able to selectively control access to proxied commands, so calls may reject (or callback) with [an error](#error-codes) if a user decides to deny access. The first time you call a proxied function, the user will be prompted to allow or deny the call, and the decision will be remembered for subsequent calls. Here's what it looks like:

> ![single permission dialog in Firefox](https://user-images.githubusercontent.com/152863/36159691-3cf44eea-10d7-11e8-81d1-988dfd70a2f7.png)

### Do I need to confirm every API call?

Command access needs to be confirmed only once [per scope](#how-are-permissions-scoped). If you provide a list of commands when requesting an API instance via `window.ipfs.enable({commands})`, then a single permission dialog will be displayed to the user:

> ![bulk permission dialog in Firefox](https://user-images.githubusercontent.com/157609/49878977-3d475780-fe29-11e8-9da9-2540bb2c8d9f.png)

For everything else, only the first call requires a decision from the user. You will be able to call previously whitelisted IPFS commands and users will _not_ be prompted to allow/deny access the second time.

Note that users can modify their permission decisions after the fact, so you should not expect to always be allowed to call a command if it was successfully called previously.

### Can I disable this?

Users can permanently deny access to all IPFS commands by disabling the `window.ipfs` experiment IPFS Companion's preferences.

### How are permissions scoped?

Permissions are scoped to the **origin and path** (and sub-paths) of the file from which the permission was requested.

Scoped permissions in `window.ipfs` work similarly to how they work for [service worker registrations](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerContainer/register#Examples), except that the user cannot control the scope, and it is set to the origin and path from which the permission was requested.

Scope-based permissions allow applications running on an IPFS gateway to be granted different permissions. Consider the following two websites running on the ipfs.io gateway:

- [QmQxeMcbqW9npq5h5kyE2iPECR9jxJF4j5x4bSRQ2phLY4](https://ipfs.io/ipfs/QmQxeMcbqW9npq5h5kyE2iPECR9jxJF4j5x4bSRQ2phLY4/)
- [QmTegrragyzfFq6DSuUaPYoKzm4eRBj2tgQaDHC72dLLaV](https://ipfs.io/ipfs/QmTegrragyzfFq6DSuUaPYoKzm4eRBj2tgQaDHC72dLLaV/)

With [same-origin policy](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy), these two applications would be granted the same permissions. With scoped permissions, these applications will be given a different set of permissions. For example:

- Allow `files.add` to `https://domain.com/`
  - ...will allow `files.add` to:
    - `https://domain.com/file`
    - `https://domain.com/file2.html`
    - `https://domain.com/sub/paths`
    - `https://domain.com/sub/paths/files`
    - etc.
- Allow `files.add` to `https://domain.com/feature`
  - ...will allow `files.add` to:
    - `https://domain.com/feature/file`
    - `https://domain.com/feature/file2.html`
    - `https://domain.com/feature/sub/paths`
    - `https://domain.com/feature/sub/paths/files`
    - `https://domain.com/featuresearch/sub/paths/files` (note substring)
    - `https://domain.com/features.html` (note substring)
    - etc.
  - ...will cause additional prompt for `files.add` to:
    - `https://domain.com/`
    - `https://domain.com/files`
    - etc.

### Are Mutable File System (MFS) files sandboxed to a directory?

Yes. To avoid conflicts, each app gets its own MFS directory where it can store files. When using MFS commands ([more info](https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/FILES.md#mutable-file-system)), this directory will be automatically added to paths you pass. Your app's MFS directory is based on the **origin and path** where your application is running. For example:

- `files.write` to `/myfile.txt` on `https://domain.com/`
  - writes to `/dapps/https/domain.com/myfile.txt`
- `files.write` to `/path/to/myfile.txt` on `https://domain.com/feature`
  - writes to `/dapps/https/domain.com/feature/path/to/myfile.txt`
- `files.read` from `/feature/path/to/myfile.txt` on `https://domain.com/`
  - reads from `/dapps/https/domain.com/feature/path/to/myfile.txt`
- `files.stat` to `/` on `https://domain.com/feature`
  - stats `/dapps/https/domain.com/feature`
- `files.read` from `/../myfile.txt` on `https://domain.com/feature`
  - reads from `/dapps/https/domain.com/feature/myfile.txt` (no traverse above your app's root)
