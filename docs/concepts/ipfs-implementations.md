---
title: "IPFS Implementations"
description: "There isn't just one canonical IPFS implementation. Learn about the various IPFS implementations available for different use cases."
---

# IPFS Implementations

IPFS is an open-source project that encourages the development of multiple implementations of the protocol, each of which seeks to optimize for various use cases. Below is non-exhaustive list of IPFS implementations, grouped by development and maintenance status ([active](#actively-maintained) and [inactive](#inactive)) and ordered alphabetically. If you're aware of more implementations, [edit this page in GitHub](https://github.com/ipfs/ipfs-docs/edit/main/docs/concepts/ipfs-implementations.md) or [open an issue](https://github.com/ipfs/ipfs-docs/issues/new?assignees=&labels=need%2Ftriage&template=open_an_issue.md&title=IPFS%20Implementations) to have the list updated. 

::: tip
Looking into implementing IPFS yourself?
See the official [IPFS Specifications](https://github.com/ipfs/specs/).
:::

## Actively maintained

| Name             | URL                                                                     | Language(s)            | What it's trying to do                                                                                                   |
|------------------|-------------------------------------------------------------------------|------------------------|--------------------------------------------------------------------------------------------------------------------------|
| auspinner        | <https://github.com/2color/auspinner>                                   | go                     | CLI tool to deal with the pinning service API and upload files through bitswap.                                          |
| barge            | <https://github.com/application-research/barge>                         | go                     | CLI tool with a git like workflow to upload deltas to estuary.                                                           |
| Boost            | <https://github.com/filecoin-project/boost>                             | go                     | Daemon to get IPFS data in and out of a Filecoin storage provider.                                                       |
| Elastic provider | <https://github.com/ipfs-elastic-provider/ipfs-elastic-provider>        | javascript, typescript | Scallable Cloud-Native implementation.                                                                                   |
| Estuary          | <https://github.com/application-research/estuary/>                      | go                     | Daemon oriented service to pin and onboard IPFS data into Filecoin.                                                      |
| gomobile-ipfs    | <https://github.com/ipfs-shipyard/gomobile-ipfs>                        | go                     | Library oriented ipfs daemon to help embeding Kubo into a mobile app.                                                   |
| ipfs cluster     | <https://github.com/ipfs/ipfs-cluster>                                  | go                     | CRDT / Raft consensus between some more less trusted nodes to allocate and synchronise a pinset on multiple IPFS nodes.  |
| ipfs-embed       | <https://github.com/ipfs-rust/ipfs-embed>                               | rust                   | Small embeddable ipfs implementation.                                                                                    |
| ipfs-lite        | <https://github.com/hsanjuan/ipfs-lite>                                 | go                     | Minimal library oriented ipfs daemon building on the same blocks as Kubo but with a minimal glue layer.                 |
| ipfs-nucleus     | <https://github.com/peergos/ipfs-nucleus/>                              | go                     | Minimal IPFS replacement for P2P IPLD apps.                                                                              |
| iroh             | <https://github.com/n0-computer/iroh>                                   | rust                   | Extreme-Efficiency oriented IPFS implementation.                                                                         |
| js-ipfs          | <https://github.com/ipfs/js-ipfs>                                       | javascript, typescript | Javascript implementation targeting nodejs and browsers.  [**Development of js-ipfs is being discontinued**](#js-ipfs-being-discontinued).                                                                |
| Kubo             | <https://github.com/ipfs/kubo>                                          | go                     | Generalist daemon oriented IPFS implementation with an extensive HTTP API.                                               |
| Lotus            | <https://github.com/filecoin-project/lotus>                             | go                     | Filecoin node handling consensus, storage providing, making storage deals, importing data, ...                           |
| whypfs           | <https://github.com/whyrusleeping/whypfs>                               | go                     | Daemon based on the same building blocks as Kubo but with some options tweaking for more performance.                    |

:::warning 
### js-ipfs being discontinued
Development of the [js-ipfs project](https://github.com/ipfs/js-ipfs) is being discontinued to focus on [Helia](https://github.com/ipfs/helia), a leaner, more modular, modern implementation of IPFS in JavaScript scheduled for release in 2023. To learn more about Helia and the current state of IPFS in JS, see the [blog post](https://blog.ipfs.tech/state-of-ipfs-in-js/). 

Because of this, js-ipfs tutorials may be out of date, and will eventually be archived.
:::

## Inactive

| Name             | URL                                                                     | Language(s)            | What it's trying to do                                                                                                   |
|------------------|-------------------------------------------------------------------------|------------------------|--------------------------------------------------------------------------------------------------------------------------|
| Agregore         | <https://github.com/AgregoreWeb/agregore-ipfs-daemon>                   | go, javascript         | Mobile friendly Kubo daemon.                                                                                             |
| ipfs tiny        | <https://gitlab.com/librespacefoundation/ipfs-tiny>                     | c++                    | Tiny embeddable, os-independent IPFS implementation.                                                                     |
| ipget            | <https://github.com/ipfs/ipget>                                         | go                     | Minimal wget inspired tool to download files from IPFS nodes over bitswap.                                              |
| Linux2ipfs       | <https://github.com/Jorropo/linux2ipfs>                                 | go                     | Small pipeline and extreme-performance oriented implementation to upload files and deltas to pinning services very fast. |
| py-ipfs          | <https://github.com/ipfs-shipyard/py-ipfs>                              | python                 | Python IPFS implementation.                                                                                              |
| rust-ipfs        | <https://github.com/rs-ipfs/rust-ipfs>                                  | rust                   | Rust IPFS implementation.                                                                                                |
| whypfs           | <https://github.com/whyrusleeping/whypfs>                               | go                     | Daemon based on the same building blocks as Kubo but with some options tweaking for more performance.                    |
