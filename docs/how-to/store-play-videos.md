---
title: Store & play videos
legacyUrl: https://docs.ipfs.io/guides/examples/videos/
description: Learn how to store, play, and work with videos in IPFS, the InterPlanetary File System.
---

# Store and play videos

IPFS can be used to store and play videos. Suppose we add a video:

```bash
ipfs add -q sintel.mp4 | tail -n1
```

You can view the resulting hash in a few different ways.

On the command line:

```bash
ipfs cat $video_hash | mplayer -vo xv -
```

Via local gateway (note that the gateway method works with most video players and browsers):

```bash
mplayer http://localhost:8080/ipfs/$video_hash
```

Or open it up in a browser tab (in this example, Chrome):

```bash
chromium http://localhost:8080/ipfs/$video_hash
```
