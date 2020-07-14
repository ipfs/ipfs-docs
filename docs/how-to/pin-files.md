---
title: Pin files
legacyUrl: https://docs.ipfs.io/guides/examples/pinning/
description: Learn how to pin files in IPFS in order to keep your files and other objects local.
---

# Pin files using IPFS

Pinning is a very important concept in IPFS. IPFS semantics try to make it feel like every single object is local — there is no "retrieve this file for me from a remote server", just `ipfs cat` or `ipfs get`, which act the same way no matter where the actual object is located.

While this is nice, sometimes you want to be able to control what you keep around. **Pinning** is the mechanism that allows you to tell IPFS to always keep a given object somewhere — the default being your local node, though this can be different if you use a third-party remote pinning service (see below for details). IPFS has a fairly aggressive caching mechanism that will keep an object local for a short time after you perform any IPFS operation on it, but these objects may get garbage-collected fairly regularly. To prevent that garbage collection, simply pin the hash you care about. Note that objects added through `ipfs add` are pinned recursively by default.

Let's look at this example to explore pinning to your local IPFS node in a bit more depth:

```
echo "ipfs rocks" > foo
ipfs add foo
ipfs pin ls --type=all
ipfs pin rm <foo hash>
ipfs pin rm -r <foo hash>
ipfs pin ls --type=all
```

## Three kinds of pins

As you may have noticed in the example above, the first `ipfs pin rm` command didn't work — it should have warned you that the given hash was "pinned recursively". What does this mean? There are three types of pins in the IPFS world:

- **Direct pins**, which pin just a single block and no others in relation to it
- **Recursive pins**, which pin a given block and all of its children
- **Indirect pins**, which are the result of a given block's parent being pinned recursively

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

## Local vs. remote pinning

All the information above assumes that you're pinning items locally — that is, to your local IPFS node. That's the default behavior for IPFS, but it's also possible to pin your files to a _remote pinning service_. These third-party services offer the opportunity for you to pin files not to your own local node, but to nodes that they operate, meaning that you don't need to worry about your own node's available disk space or uptime when it comes to availability.

[IPFS Desktop](https://github.com/ipfs-shipyard/ipfs-desktop) and its equivalent in-browser IPFS web interface, the [IPFS Web UI](https://github.com/ipfs-shipyard/ipfs-webui), both support integration with remote pinning services so you can pin either remotely or locally straight from the UI. [Learn more here.](/how-to/work-with-pinning-services/)
