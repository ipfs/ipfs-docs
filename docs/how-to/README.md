---
title: Guides
description: Hands-on guides to using and developing with IPFS to build decentralized web apps and services.
---

# IPFS guides and tutorials

::: callout
Want to find even more resources for learning about IPFS and the technologies that power it? [Visit ProtoSchool](https://proto.school) for interactive tutorials that help you learn about the decentralized web by writing code and solving challenges, all from your browser!
:::

No matter what you're looking to do with IPFS, you can find how-tos and tutorials here. These items are a work in progress, so please check back periodically to check what we've added!

See the site navigation menu for all our how-tos, organized by topic area, including favorites like these:

- **Customize your install** by [configuring a node](configure-node.md), modifying the [bootstrap list](modify-bootstrap-list.md), and more
- **Learn how to manage files** in IPFS with tutorials on concepts like [pinning](pin-files.md), how to [work with blocks](work-with-blocks.md), learning how to [troubleshoot file transfers](https://github.com/ipfs/kubo/blob/master/docs/file-transfer.md), and understanding [working with large datasets](https://github.com/ipfs/archives/tree/master/tutorials/replicating-large-datasets)
- **See how to work with peers** using methods like [customizing libp2p bundles](https://github.com/ipfs-examples/js-ipfs-examples/tree/master/examples/custom-libp2p) and using circuit relay
- **Understand website hosting** by starting with how to [host a simple single-page site](websites-on-ipfs/single-page-website.md)
- **Learn how to build apps** on IPFS, starting with [exploring the IPFS API](https://github.com/ipfs/camp/tree/master/CORE_AND_ELECTIVE_COURSES/CORE_COURSE_C) and [making a basic libp2p app](https://github.com/ipfs/camp/tree/master/CORE_AND_ELECTIVE_COURSES/CORE_COURSE_B)
- **Understand how IPFS works in the browser** by learning how to [address IPFS on the Web](address-ipfs-on-web.md), seeing how to [exchange files between nodes](https://github.com/ipfs-examples/js-ipfs-examples/tree/master/examples/browser-exchange-files), seeing [how IPFS can be used in your favorite browser tools and frameworks](browser-tools-frameworks.md), and more


## Kubo 

### [Add a file to IPFS using Kubo](add-code-flow.md)

Learn how to Add a file to IPFS using Kubo

### [Configure the datastore](datastores.md)
### [Configure the libP2P network resource manager](libp2p-resource-management.md)
### [Connect with Websockets](transports.md) 

If you want `js-ipfs` nodes in web browsers to connect to your `kubo` node, you will need to turn on websocket support in your `kubo` node.

### [Create API Bindings](implement-api-bindings.md)
### [Deep dive into delegated routing](delegated-routing.md)
### [How to file a GitHub Issue](github-issue-guide.md)
### [Implement an API Client](implement-api-bindings.md)
### [Install command completion](command-completion.md)
### [Install plugins](plugins.md)
### [Mount IPFS with FUSE](fuse.md)
### [Set up an IPFS Gateway](gateway.md)
### [Transfer a File](file-transfer.md)
### [Troubleshoot Kubo](debug-guide.md)
### [Use experimental features](experimental-features.md)
### [Use HTTP/RPC clients](http-rpc-clients.md)
### [Use Kubo environment variables](environment-variables.md)

## Helia 


## Web Applications


## NFTs


## Don't see what you're looking for?

We're adding more documentation all the time and making ongoing revisions to existing docs, but if you don't see what you need, please [file an issue](https://github.com/ipfs/ipfs-docs/issues/new?assignees=&labels=OKR+3%3A+Content+Improvement%2C+docs-ipfs&template=content-request.md&title=%5BCONTENT+REQUEST%5D+%28add+your+title+here%21%29) to let us know! We also recommend visiting the [IPFS forums](https://discuss.ipfs.tech/) for support and discussion with IPFS enthusiasts and experts worldwide.
