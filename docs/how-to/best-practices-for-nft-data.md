---
title: Best Practices for Storing NFT Data using IPFS
description: Non-fungible tokens can represent all kinds of digital media. Learn some best practices for storing NFT data using IPFS.
date: 2021-04-02
---

# Best Practices for Storing NFT Data using IPFS

IPFS is a great fit for storing and addressing data for NFTs, or non-fungible tokens. This guide is all about how to store the data for NFTs on IPFS so that NFT creators and owners have a great experience that can stand the test of time.

Since an NFT can't be easily changed after it's been created, it's a good idea to think about how the data for your NFTs is stored, addressed, and made persistent over time. That's why we'll be getting into the specifics of [how to prepare your NFT metadata](#metadata), and we'll also look at [the different kinds of links to IPFS content](#types-of-ipfs-links-and-when-to-use-them) and when you should use each one. Finally, we'll see why [making a plan for your data's persistence](#persistence-and-availability) is important for a good user experience. By following these recommendations, you can help ensure a long and healthy future for your NFT data.

This guide is aimed at developers building NFT platforms and other tools, and it's focused on how to format your data and link to it for the best long-term results. If you're looking for details about smart contract interactions and how token minting works, head over to our [guide to minting NFTs with IPFS][docs-mint-nfts], where we go over the whole process from end-to-end using an Ethereum test network.

If you're interested in a deeper dive in the world of NFT best practices and NFT development in general, head over to [NFT School](https://nftschool.dev) for concept guides, tutorials, and how-tos.

## Types of IPFS links and when to use them

There are a few different ways to refer to data on IPFS, each of which is best suited to different use cases.

### CID

CIDs uniquely identify a piece of content. A CID can be stored and sent over the network in a compact binary form, but they're represented as strings of random-seeming characters when displayed to users. Here's an example:

```
bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi
```

There are two versions of CIDs used by IPFS. The example above is a version 1 CID (or CIDv1), and it has some advantages over the older "version 0" format, especially when viewing IPFS content on the web using an IPFS gateway. It's best to use version 1 CIDs for addressing NFT data, in the base32 encoding.

To enable CIDv1 when using the IPFS command line, add the `--cid-version=1` flag when running the `ipfs add` command:

```shell
ipfs add --cid-version=1 ~/no-time-to-explain.jpeg
added bafkreigg4a4z7o5m5pwzcfyphodsbbdp5sdiu5bwibdw5wvq5t24qswula no-time-to-explain.jpeg
```

In JavaScript, you can use the following options for the `ipfs.add` method:

```javascript
const cid = await ipfs.add({ content }, {
  cidVersion: 1,
  hashAlg: 'sha2-256'
})
```

If you already have a version 0 CID for your content, there's no need to add it to IPFS again just to get the new CID format! You can convert a v0 CID to v1 using [the ipfs command line](address-ipfs-on-web.md#manual-use-cid-ipfs-io-or-the-command-line) or on the web at [cid.ipfs.io](https://cid.ipfs.io). If you're not sure which version you have, it's easy to tell the difference. Version 0 CIDs are always 46 characters long, starting with `Qm`.

::: tip
You can learn more about CIDs in our [guide to Content Addressing][docs-cid], or by following the [interactive tutorials on ProtoSchool][protoschool-cid].
:::

Once you've added your data to IPFS and have a CID, you can prepare your token's metadata and "mint" the token on a blockchain. To link to your content from a smart contract or inside your NFT's metadata, you should convert your CIDv1 to an IPFS URI, as described below.


### IPFS URI

A Uniform Resource Identifier, or URI, is used to specify a particular piece of content in a given context. The context is determined by the URI scheme (appended to the URI as a prefix, followed by `://`). The URI scheme for IPFS is simply `ipfs`.

Here's an example of a full IPFS URI: `ipfs://bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi`

IPFS URIs are the canonical representation for an IPFS link, since the `ipfs` scheme makes it clear and unambiguous that the CID refers to content on IPFS and not some other system. To produce an IPFS URI, simply prefix a CID string with the static string `ipfs://`.

You can also include filenames inside the path component of an IPFS URI. For example, if you've stored your token's metadata on IPFS wrapped in a directory, your URI might be: `ipfs://bafybeibnsoufr2renqzsh347nrx54wcubt5lgkeivez63xvivplfwhtpym/metadata.json`

We recommend using an IPFS URI to link from your smart contract to any external data stored using IPFS, including any _metadata_ that describes and contextualizes the token.

IPFS URIs are also the recommended way to link from within a token's metadata to images and other assets stored on IPFS. See the [metadata recommendations below](#metadata) for more details.


### HTTP Gateway URL

HTTP gateways provide interoperability for legacy user-agents that cannot resolve IPFS URIs natively.

Here's an example: `https://dweb.link/ipfs/bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi`

User agents with built-in support for IPFS (either via the IPFS Companion browser extension, or via native support, such as provided by Brave) will be able to recognize gateway links and resolve the content using native IPFS protocols. Other user-agents will simply follow the link to the gateway, which will load the content over IPFS and serve it using HTTP. You can learn more details about HTTP gateways in our [concept article on IPFS Gateway][docs-gateway].

Gateway links are great for interoperability, but they should not be the primary or canonical link to your data on IPFS. While an IPFS URI will remain accessible as long as anyone on IPFS has the data, a gateway link can fail if the gateway operator goes offline. 

Where gateway links are used, developers should ensure that the gateway follows the proper URL conventions. Either of the following URL structures are acceptable:

`https://<gateway-host>.tld/ipfs/<cid>/path/to/subresource`

`https://<cidv1b32>.ipfs.<gateway-host>.tld/path/to/subresource`

In user-facing applications, developers should link to IPFS content via both:

- An IPFS URI
- An HTTP gateway URL

This will provide the best user experience until such a time as more browsers support native resolution of the IPFS URI scheme. Note that both kinds of gateway link can easily be generated from a CID or IPFS URI as needed.

## Metadata

Most NFTs will need some kind of structured metadata to describe the token's essential properties. Many encodings and data formats can be used, but the de-facto standard is to store metadata as a JSON object, encoded to a UTF-8 byte string.

Here's an example of some JSON metadata for an NFT:

```json
{
  "name": "No time to explain!",
  "description": "I said there was no time to explain, and I stand by that.",
  "image": "ipfs://bafybeict2kq6gt4ikgulypt7h7nwj4hmfi2kevrqvnx2osibfulyy5x3hu/no-time-to-explain.jpeg"
}
```

There are many ways to structure metadata for an NFT, and a lot of the details depend on the specific use cases for your NFT platform. The example above uses the schema defined in the [ERC-721][eip-721] standard.

Generally speaking, adopting or extending an existing standard like the schemas defined in [ERC-721][eip-721] and [ERC-1155][eip-1155] is a good idea, since your NFTs will be viewable using standard wallets and other tools like block explorers.

To link to images, videos and other media, simply use an [IPFS URI](#ipfs-uri). This is better than storing an HTTP gateway URL, since it's not tied to a specific gateway provider. If you want to use gateway URLs for convenience or interoperability, you can always generate them in your application's presentation layer.

::: tip
Using IPFS URIs inside your metadata to link to images and other media helps preserve the integrity of your NFT data! IPFS links can't be tampered with or altered to point to different data after they've been created.

Even if you're not storing your data with IPFS today, generating an IPFS URI for your media and including it in your metadata will allow anyone to validate the data's integrity once they download it from another source. If you (or anyone else) later adds the data to IPFS, the URI will start working!
:::

Because you need to know the CID of images and other media that you want to reference in your metadata, it's simplest to create the metadata after you've added your media assets to IPFS.

### Preserving filenames with IPFS directories

When adding data to IPFS, you can preserve human-readable filenames by wrapping your files in a directory.

In javascript, you can set the `wrapWithDirectory` option when calling `ipfs.add`:

```js
const cid = await ipfs.add(
  { path: 'metadata.json', content: aJsonString }, 
  { wrapWithDirectory: true }
)
```

When adding files that are wrapped in a directory, `ipfs.add` returns the CID of the directory object. To build a full IPFS URI to the file, you can add a `/` character after the CID, followed by the filename. For example: `ipfs://bafybeibnsoufr2renqzsh347nrx54wcubt5lgkeivez63xvivplfwhtpym/metadata.json`.


## Persistence and availability

When your data is stored on IPFS, users can fetch it from any IPFS node that has a copy, which can make data transfers more efficient and reduce the load on any single server. As each user fetches a piece of data, they keep a local copy around to help other users who might request it later. However, it's important to remember that these copies are temporary and will eventually be deleted unless the user decides to "pin" the data. Pinning a CID tells IPFS that the data is important and shouldn't be removed when the node is near its disk space limit.

If you're building a platform using IPFS for storage, it's important to pin your data to IPFS nodes that are robust and highly available, meaning that they can operate without significant downtime and with good performance. See our [server infrastructure documentation][docs-server-infra] to learn how [IPFS Cluster][ipfs-cluster] can help you manage your own cloud of IPFS nodes that coordinate to pin your platform's data and provide it to your users.

Alternatively, you can delegate the infrastructure responsibility to a remote pinning service. Remote pinning services like [Pinata](https://pinata.cloud) and [Eternum](https://www.eternum.io/) provide redundant, highly-available storage for your IPFS data, without any _vendor lock-in_. Because IPFS-based content is addressed by CID instead of location, you can switch between pinning services or migrate to your private infrastructure seamlessly as your platform grows. 

You can also use a service from [Protocol Labs](https://protocol.ai) called [nft.storage](https://nft.storage) to get your data into IPFS, with long-term persistence backed by the decentralized [Filecoin](https://filecoin.io) storage network. To help foster the growth of the NFT ecosystem and preserve the new _digital commons_ of cultural artifacts that NFTs represent, [nft.storage](https://nft.storage) provides free storage and bandwidth for public NFT data. Sign up for a free account at [https://nft.storage](https://nft.storage) and try it out!

To learn more about persistence and pinning, including how to work with remote pinning services, see our [overview of persistence, permanence, and pinning][docs-persistence].

For an example application that integrates with a remote pinning service for NFT data storage, see our [guide to minting NFTs with IPFS][docs-mint-nfts].

## Summary

IPFS allows NFTs to represent data of any size and format in a secure, verifiable, and distributed way that can stand the test of time. 

Here's a quick recap of our recommendations:

- Use IPFS URIs as the canonical form of link to data on IPFS, for example: `ipfs://bafybeibnsoufr2renqzsh347nrx54wcubt5lgkeivez63xvivplfwhtpym/metadata.json`

- HTTP gateway URLs should be generated in your application's presentation layer, to provide a good experience for users with browsers that don't support IPFS natively. If possible, provide both IPFS URIs and gateway URLs in your application's user interface.

- Inside the metadata for your NFT, use IPFS URIs to link to images and other media assets. The `ipfs://` scheme makes it clear how to get the data, and the CID ensures data integrity.

- Wrapping files in directories when adding to IPFS is recommended, as it preserves filenames and makes IPFS URIs more easily readable.

- Data persistence should be part of your platform's design. Running your own IPFS infrastructure or using a remote pinning service will keep your data online and accessible.


[docs-cid]: /concepts/content-addressing
[docs-mint-nfts]: /how-to/mint-nfts-with-ipfs
[docs-minty-how-ipfs-helps]: /how-to/mint-nfts-with-ipfs/#how-ipfs-helps
[docs-persistence]: /concepts/persistence/
[docs-server-infra]: /install/server-infrastructure/
[docs-gateway]: /concepts/ipfs-gateway/

[docs-multibase]: https://github.com/multiformats/multibase

[ipfs-cluster]: https://ipfscluster.io/

[protoschool-cid]: https://proto.school/content-addressing
[eip-721]: https://eips.ethereum.org/EIPS/eip-721
[eip-1155]: https://eips.ethereum.org/EIPS/eip-1155
