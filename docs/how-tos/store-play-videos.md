---
title: Store & play videos
---

# Store and play videos using IPFS

::: warning
This draft content ported from the legacy docs site may contain broken links and other errors. (Please remove this alert once content has been reviewed.)
:::

IPFS can be used to store and play videos. Suppose we add a video:

```
ipfs add -q sintel.mp4 | tail -n1
```

Take the resulting hash, You can view it a couple different ways:

On the command line:

```
ipfs cat $vidhash | mplayer -vo xv -
```

Via local gateway:

```
mplayer http://localhost:8080/ipfs/$vidhash

# or open it up in a tab in chrome (or firefox)

chromium http://localhost:8080/ipfs/$vidhash
```

(Note: the gateway method works with most video players and browsers)

By [whyrusleeping](http://github.com/whyrusleeping)
