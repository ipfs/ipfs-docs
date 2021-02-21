---
title: Overview
---

# Go-IPFS 0.7

![The Go-IPFS logo.](./images/go-ipfs-logo.png)

In August, we announced the [deprecation of the SECIO security transport](https://blog.ipfs.io/2020-08-07-deprecating-secio/). In this release, we have disabled SECIO by default, which will impact older nodes on the network. The best way to mitigate this change's impact is to [upgrade your IPFS nodes](https://docs.ipfs.io/recent-releases/go-ipfs-0-7/update-procedure) as soon as possible! Not only will upgrading ensure you're using the latest security transports, but you'll also get access to all of the [performance improvements](https://blog.ipfs.io/2020-07-20-dht-deep-dive/) we've made this year to content routing.

With this release, you will also start seeing more Peer IDs on the network that start with `1` instead of the typical `Qm`. This is due to a switch to ed25519 keys being used by default over RSA keys, which you can read more about in the highlights below.

## Highlights

- SECIO is now disabled by default.
- Ed25519 keys are now used by default.
- Keys can be imported and exported.
- IPNS paths now encode the key name as a base36 CIDv1 by default.
- Multiaddresses now accept PeerIDs encoded as CIDv1.
- Initial support has been added for `dag stat`.
- Plugin build changes.

For more information, check out the [Features page](./features).

## The Changelog

For a full list of updates included in this release, you can review the [changelog on GitHub](https://github.com/ipfs/go-ipfs/blob/v0.7.0/CHANGELOG.md#v070-2020-09-22).
