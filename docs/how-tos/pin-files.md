---
title: Pin files
---

# Pin files using IPFS

::: warning
This draft content ported from the legacy docs site may contain broken links and other errors. (Please remove this alert once content has been reviewed.)
:::

Pinning is a very important concept in ipfs. ipfs semantics try
to make it feel like every single object is local, there is no "retrieve this
file for me from a remote server", just `ipfs cat` or `ipfs get` which act
the same way no matter where the actual object is located. While this is nice,
sometimes you want to be able to control what you keep around. Pinning is the
mechanism that allows you to tell ipfs to always keep a given object local.
ipfs has a fairly aggressive caching mechanism that will keep an object local
for a short time after you perform any ipfs operation on it, but these objects
may get garbage collected fairly regularly. To prevent that garbage collection
simply pin the hash you care about. Objects added through `ipfs add` are pinned
recursively by default.

```
echo "ipfs rocks" > foo
ipfs add foo
ipfs pin ls --type=all
ipfs pin rm <foo hash>
ipfs pin rm -r <foo hash>
ipfs pin ls --type=all
```

As you may have noticed, the first `ipfs pin rm` command didnt work, it should
have warned you that the given hash was "pinned recursively". There are three
types of pins in the ipfs world; direct pins, which pin just a single block, and
no others in relation to it. recursive pins, which pin a given block and all of
its children, and indirect pins, which are the result of a given blocks parent
being pinned recursively.

A pinned object cannot be garbage collected, if you dont believe me try this:

```
ipfs add foo
ipfs repo gc
ipfs cat <foo hash>
```

But if foo were to somehow become unpinned...

```
ipfs pin rm -r <foo hash>
ipfs repo gc
ipfs cat <foo hash>
```

By [whyrusleeping](http://github.com/whyrusleeping)
