---
title: IPFS in web applications
description: How to develop applications that use IPFS on the Web including addressing by CID, merkleizing, retrieval, providing, and CAR files with Helia.
---

# IPFS in web-applications and resource-constrained environments

In this guide you will learn how to use IPFS using JavaScript/TypeScript in web applications, including addressing data with CIDs, retrieval by CID, working with CAR files, and the nuances of providing.

For this, you will use [Helia](https://github.com/ipfs/helia), the most actively maintained implementation of IPFS in TypeScript for use on the web.

> **Note:** this guide is focused solely on using IPFS for data within a web application. It does _not_ cover using IPFS for static website distribution with IPFS Gateways.

## Challenges with IPFS on the web

IPFS allows you to fetch data by CID from multiple providers without being reliant on a single authoritative server.

However, making all of this work on the web is tricky due to networking constraints. Browsers impose many restrictions on web apps, for example, opening TCP/UDP connections is not possible. Instead, web apps are constrained to HTTP, WebSockets, WebRTC, and most recently WebTransport.

There are good reasons for this like security and resource management, but ultimately, it means that using IPFS on the web is different to native binaries.

## Key IPFS operations: Addressing, Retrieving, and Providing

As a developer, IPFS exposes three main operations for interacting with the network:

- **Addressing data with CIDs** (also known as **merkleizing**): taking arbitrary data and encoding so its addressable by CID. For example, given a directory of files, merkleizing it so it can be addressed and retrieved by CID.
- **Retrieving data by CID**: given a CID, IPFS finds providers (peers who share the block), connects to them, fetches the blocks, and verifies that the retrieved data is what the CID represents.
- **Providing data by CID**: making data addressed by a CID retrievable by other peers, either by running a node or with a pinning service.

## Addressing data by CID

As mentioned above, the first step in the [lifecycle of data in IPFS](../concepts/lifecycle.md) is to address it by CID.

When addressing data by [CIDs](https://proto.school/anatomy-of-a-cid/03) you will need to choose:

- [hash function](../concepts/glossary.md#hash-function). For use in browsers, the default and recommended hash function is `sha2-256` which is also the default for [Helia](https://github.com/ipfs/helia).
- [multicodec](../concepts/glossary.md#multicodec), which is the format of the data you are addressing and is used to help decode data. CIDs support a wide range of multicodecs, but for most intents and purposes, you will likely either want use:
  - [UnixFS](../concepts/file-systems.md#unix-file-system-unixfs) for files and directories.
  - [dag-cbor](../concepts/glossary.md#dag-cbor) for json-like structured data with binary encoding. DAG-CBOR is an extension of CBOR that adds a "link" type for CIDs, allowing for the creation of interlinked CBOR objects (which can be used to form larger linked data structures).

### CID Determinism

One important thing to note is that **the same data can result in different CIDs** depending on a number of factors, including the hash function, and the multicodec you use. **This is especially true for files**, where the same file, hash function and multicodec can still result in different CIDs depending on the different options that UnixFS supports.

See the [forum discussion on CID profiles](https://discuss.ipfs.tech/t/should-we-profile-cids/18507) and the [DASL](https://dasl.ing/) initiative for more for more information on the nature of this problem and how the community is addressing it.

For a visual demonstration of this, try the [DAG Builder](https://dag.ipfs.tech/), which visualises how files are addressed by CID with UnixFS and demonstrates how the same file can result in different CIDs, depending on the different options that UnixFS supports.

### Example: Addressing an object by CID with dag-cbor

For example, to address an object by CID with the `dag-cbor` multicodec and `sha2-256` hash function, you can use the following code using [Helia](https://github.com/ipfs/helia):

<iframe height="300" style="width: 100%;" scrolling="no" title="Addressing an object by CID with Helia and dag-cbor" src="https://codepen.io/2color/embed/xbKpJKx?default-tab=js%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/2color/pen/xbKpJKx">
  Addressing an object by CID with Helia and dag-cbor</a> by Daniel Norman (<a href="https://codepen.io/2color">@2color</a>)
</iframe>

### Example: Addressing a file by CID with unixfs

<iframe height="500" style="width: 100%;" scrolling="no" title="Addressing an image by CID with Helia and UnixFS" src="https://codepen.io/2color/embed/zxONqPj?default-tab=js%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/2color/pen/zxONqPj">
  Addressing an image by CID with Helia and UnixFS</a> by Daniel Norman (<a href="https://codepen.io/2color">@2color</a>)
</iframe>

## Retrieval

From a high level, there are several ways to retrieve data with IPFS in web applications:

- Using the [`Verified Fetch`](https://www.npmjs.com/package/@helia/verified-fetch) library, which was modelled after the [fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) and returns [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response) objects, with the main difference being that it allows you to fetch data by CID, abstracting away the details of content routing, transports and retrieval. For more examples and background see the [release blog post](https://blog.ipfs.tech/verified-fetch/).
- Using the [`Helia`](https://github.com/ipfs/helia/) library, which is the foundation for the `verified-fetch` library, and provides a more comprehensive and modular API for interacting with the IPFS network, beyond just retrieval.
- Using public recursive gateways, e.g. `ipfs.io` with HTTP. This is not recommended for most use cases, because it forgoes the verifiability and trustlessness enabled by content addressing. Granted, it might be the easiest way to retrieve data in a web application, but is also the most fraught with security and centralization concerns.

### Example: Image retrieval with Verified Fetch

<iframe height="500" style="width: 100%;" scrolling="no" title="Fetch an image on IPFS Mainnet @helia/verified-fetch" src="https://codepen.io/2color/embed/QWXKZGx?default-tab=js%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/2color/pen/QWXKZGx">
  Fetch an image on IPFS Mainnet @helia/verified-fetch</a> by Daniel Norman
</iframe>

## Providing data

For data to be retrievable by other peers on [IPFS Mainnet](../concepts/glossary.md#ipfs-mainnet) it will need to be uploaded to a pinning service or an IPFS node.

When possible, it's best to rely on client-side merkleization to address data by CID and then upload it to a pinning service or a node. [CAR files](#car-files) are a great way to do this, though they are not supported by all pinning services.

### You probably don't want to provide data from a browser

Browsers make for lousy servers. It's difficult to make a Web page a server, i.e. allow network incoming connections from other computers. WebRTC is the only exception, however, it has many caveats, and doesn't work in all networks.

For this reason, you should never count on providing data from a browser to work.

Instead, you should provide data from a long-running server that runs reliably and has a public IP. That can be a Kubo node that you run, or a [pinning service](../concepts/persistence.md#pinning-services).

### CAR files

The Content Archive format is a way of packaging up content addressed data into archive files that can be easily stored and transferred over the network. You can think of them like TAR files that are designed for storing collections of content addressed data.

**So why would you want to use CAR files?**

One of the main reasons is related to [CID determinism](#cid-determinism). As mentioned above, the same data can result in different CIDs, which can make it difficult to verify data without its content addressed representation. By packaging up the data into a CAR file, you can upload the CAR to multiple pinning services and nodes knowing they are providing the same CIDs

Car files are a great way to store content-addressed data in a way that is easy to transport and store, and Helia (and other implementations) allow you to both export and import any data you've addressed by CID into a CAR file.

<iframe height="300" style="width: 100%;" scrolling="no" title="CAR export with Helia and dag-cbor" src="https://codepen.io/2color/embed/EaYoegX?default-tab=js%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/2color/pen/EaYoegX">
  CAR export with Helia and dag-cbor</a> by Daniel Norman (<a href="https://codepen.io/2color">@2color</a>)
</iframe>

At the time of writing, not all pinning services support CAR files, but it is a feature that is being added to more and more services. Therefore, it is a good idea to check the documentation for the pinning service you are using to see if it supports CAR files.

## Conclusion

This guide has covered the essential aspects of using IPFS in web applications:

- The main operations: addressing/merkleizing data with CIDs, retrieving data, and providing data.
- The challenges and limitations of using IPFS in browser environments.
- Practical examples using modern tools like [Helia](https://github.com/ipfs/helia) and [Verified Fetch](https://www.npmjs.com/package/@helia/verified-fetch).
- Best practices for handling data persistence through pinning services and CAR files.

When building web applications with IPFS, remember these key takeaways:

1. Use client-side merkleization (addressing) when adding new data to IPFS, but rely on pinning services or IPFS nodes for providing data.
1. Be mindful of CID determinism when working with files and structured data.
1. Consider using CAR files where possible for storage and transport of content-addressed data.
1. Use Verified Fetch for simple retrieval or Helia for more complex IPFS interactions.

By following these guidelines, you can reap the benefits of IPFS while working within the constraints of the web.
