---
title: Pin files
legacyUrl: https://docs.ipfs.io/guides/examples/pinning/
description: Learn how to pin files in IPFS in order to keep your files and other objects local.
---

# Pin files using IPFS

Pinning is a very important concept in IPFS. IPFS semantics try to make it feel like every single object is local — there is no "retrieve this file for me from a remote server", just `ipfs cat` or `ipfs get`, which act the same way no matter where the actual object is located. While this is nice, sometimes you want to be able to control what you keep around. Pinning is the mechanism that allows you to tell IPFS to always keep a given object local. IPFS has a fairly aggressive caching mechanism that will keep an object local for a short time after you perform any IPFS operation on it, but these objects may get garbage-collected fairly regularly. To prevent that garbage collection, simply pin the hash you care about. Objects added through `ipfs add` are pinned recursively by default.

```
echo "ipfs rocks" > foo
ipfs add foo
ipfs pin ls --type=all
ipfs pin rm <foo hash>
ipfs pin rm -r <foo hash>
ipfs pin ls --type=all
```

## Three kinds of pins

As you may have noticed, the first `ipfs pin rm` command didn't work — it should have warned you that the given hash was "pinned recursively". There are three types of pins in the IPFS world:

- Direct pins, which pin just a single block, and no others in relation to it
- Recursive pins, which pin a given block and all of its children
- Indirect pins, which are the result of a given block's parent being pinned recursively

A pinned object cannot be garbage-collected — try this for proof:

```bash
ipfs add foo
ipfs repo gc
ipfs cat <foo hash>
```

But if `foo` were to somehow become unpinned ...

```bash
ipfs pin rm -r <foo hash>
ipfs repo gc
ipfs cat <foo hash>
```
