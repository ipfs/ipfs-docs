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

# Playing videos from the browser

You can play videos on a website using an HTTP gateway to IPFS, and pointing a `<video>` element to that gateway url. In doing so, you are still not creating distributed web.

If you want to add videos to a website using [js-ipfs](https://github.com/ipfs/js-ipfs) in the browser, your video will have to be in a format that is supported by the browser to stream from Javascript inside the browser using the [MediaSource](https://developer.mozilla.org/en-US/docs/Web/API/MediaSource) web API.

Example code for this is [available on github](https://github.com/bneijt/ipfs-video-frontend/blob/c0d94250af8ee12828e84884c93e96f3218e9390/src/IpfsVideo.vue#L116), and hosted on [ipfs.video](https://ipfs.video).

A common, streamable, video format supported in most browsers is VP8/9 encoded video, and Opus encoded audio, in an WEBM container.

Here are a few ways you can obtain video encoded in this format:

 - Recode your video using `ffmpeg`
 	```
 	ffmpeg -i your_input_video_file -c:v libvpx -crf 40 -b:v 10M -r 30 -c:a libopus -b:a 96K output.webm
	```
 - If you have uploaded your video to YouTube already, you can download it in the correct format using `youtube-dl`:
 	```
 	youtube-dl -f 'bestvideo[ext=webm]+bestaudio[ext=webm]' --merge-output-format webm link_to_youtube_video
 	```
 - Recode using an online services like [cloudconvert](https://cloudconvert.com/mp4-to-webm)
 
 - Recode using an GUI application like [Handbrake](https://handbrake.fr/)
