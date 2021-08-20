---
title: Pin files
description: Learn how to pin files in IPFS in order to keep your files and other objects local.
---

# Pin files using IPFS

Pinning is a very important concept in IPFS. IPFS semantics try to make it feel like every single object is local — there is no "retrieve this file for me from a remote server", just `ipfs cat` or `ipfs get`, which act the same way no matter where the actual object is located.

While this is nice, sometimes you want to be able to control what you keep around. **Pinning** is the mechanism that allows you to tell IPFS to always keep a given object somewhere — the default being your local node, though this can be different if you use a [third-party remote pinning service](work-with-pinning-services.md). IPFS has a fairly aggressive caching mechanism that will keep an object local for a short time after you perform any IPFS operation on it, but these objects may get garbage-collected regularly. To prevent that garbage collection, simply pin the CID you care about, or add it to [MFS](../concepts/file-systems.md#mutable-file-system-mfs). Objects added through `ipfs add` are pinned recursively by default. Things in MFS are not pinned by default, but are protected from garbage-collection, so one can think about MFS as a mechanism for implicit pinning.

Let's look at this example to explore pinning to your local IPFS node in a bit more depth:

```
echo "ipfs rocks" > foo
ipfs add foo
ipfs pin ls --type=all
ipfs pin rm <foo hash>
ipfs pin rm <foo hash>
ipfs pin ls --type=all
```

## Three kinds of pins

As you may have noticed in the example above, the first `ipfs pin rm` command didn't work — it should have warned you that the given hash was _pinned recursively_. What does this mean? There are three types of pins in the IPFS world:

- **Direct pins**, which pin just a single block and no others in relation to it.
- **Recursive pins**, which pin a given block and all of its children.
- **Indirect pins**, which are the result of a given block's parent being pinned recursively.

A pinned object cannot be garbage-collected — try this for proof:

```bash
ipfs add foo
ipfs repo gc
ipfs cat <foo hash>
```

But if `foo` were to somehow become unpinned ...

```bash
ipfs pin rm <foo hash>
ipfs repo gc
ipfs cat <foo hash>
```

## Local versus remote pinning

All the information above assumes that you're pinning items locally — that is, to your local IPFS node. That's the default behavior for IPFS, but it's also possible to pin your files to a _remote pinning service_. These third-party services give you the opportunity to pin files not to your own local node, but to nodes that they operate. You don't need to worry about your own node's available disk space or uptime.

While you can use a remote pinning service's own GUI, CLI, or other dev tools to manage IPFS files pinned to their service, you can also work directly with pinning services using your local IPFS installation — meaning that you don't need to learn a pinning service's unique API or other tooling.

- The [IPFS Pinning Service API](https://ipfs.github.io/pinning-services-api-spec/) offers a specification that enables developers to integrate any pinning service that supports the spec, or create their own. Thanks to the OpenAPI spec format, both clients and servers can be [generated](https://github.com/ipfs/pinning-services-api-spec#code-generation) from the YAML spec file.

- If you use go-ipfs 0.8+ from the command line, you have access to `ipfs pin remote` commands acting as a client for interacting with pinning service APIs. Add your favorite pinning service(s), pin CIDs under human-readable names, get pin statuses, and more, straight from the CLI. [Learn how →](work-with-pinning-services.md)

- [IPFS Desktop](https://github.com/ipfs-shipyard/ipfs-desktop) and its equivalent in-browser IPFS web interface, the [IPFS Web UI](https://github.com/ipfs-shipyard/ipfs-webui), both support remote pinning services, so you can pin to your favorite pinning service(s) straight from the UI. [Learn how →](work-with-pinning-services.md)
