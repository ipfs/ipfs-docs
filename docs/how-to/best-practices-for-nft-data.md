---
title: Best Practices for Storing NFT Data using IPFS
description: Non-fungible tokens can represent all kinds of digital media. Learn some best practices for storing NFT data using IPFS.
date: 2021-04-02
---

# Best Practices for Storing NFT Data using IPFS

IPFS is a great fit for storing and addressing data for NFTs, or non-fungible tokens. This guide is all about how to store the data for NFTs on IPFS so that NFT creators and owners have a great experience that can stand the test of time.

Since an NFT can't be easily changed after it's been created, it's a good idea to think about how the data for your NFTs is stored, addressed, and made persistent over time. That's why we'll be getting into the specifics of [how to prepare your NFT metadata](#metadata), and we'll also look at [the different kinds of links to IPFS content](#types-of-ipfs-links-and-when-to-use-them) and when you should use each one. By following these recommendations, you can help ensure a long and healthy future for your NFT data.

This guide is aimed at developers building NFT platforms and other tools, and it's focused on how to format your data and link to it for the best long-term results. If you're looking for details about smart contract interactions and how token minting works, head over to our [guide to minting NFTs with IPFS][docs-mint-nfts], where we go over the whole process from end-to-end using an Ethereum test network.

## Types of IPFS links and when to use them

There are a few different ways to refer to data on IPFS, each of which is best suited to different use cases.

### CID

First, there's the "raw" CID, which uniquely identifies a specific piece of content. CIDs can be stored and sent over the network in a compact binary form, but they're represented as strings of random-seeming characters when displayed to users. Here's an example:

```
bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi
```

::: tip
You can learn more about CIDs in our [guide to Content Addressing][docs-cid], or by following the [interactive tutorials on ProtoSchool][protoschool-cid].
:::

Because it's the most compact form of IPFS link, the CID is a good fit for storing directly on the blockchain. We recommend storing CIDs as strings, in the base 32 encoding as shown in the example above. 

While it's tempting to save a few bytes on-chain by storing a CID in its binary form, doing so may cause problems with standard smart contract interfaces like [ERC-721][eip-721], whose `tokenURI` function returns a string URI value. By storing CIDs as strings to begin with, you can avoid an expensive on-chain conversion from binary to base 32.

### IPFS URI

A Uniform Resource Identifier, or URI, is used to specify a particular piece of content in a given context. The context is determined by the URI scheme (appended to the URI as a prefix, followed by `://`). The URI scheme for IPFS is simply `ipfs`.

Here's an example of a full IPFS URI: `ipfs://bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi`

IPFS URIs are the canonical representation for an IPFS link, since the `ipfs` scheme makes it clear and unambiguous that the CID refers to content on IPFS and not some other system. To produce an IPFS URI, simpley prefix a CID string with the static string `ipfs://`.

You can also include filenames inside the path component of an IPFS URI. For example, if you've stored your token's metadata on IPFS wrapped in a directory, your URI might be: `ipfs://bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi/metadata.json`

NFT standards like [ERC-721][eip-721] and [ERC-1155][eip-1155] define smart contract functions for fetching the URI associated with an NFT. If you're storing raw CIDs as recommended, it's best to convert to URIs inside the smart contract, rather than in the presentation layer of a distributed app. By doing the conversion on-chain, tools like [EtherScan](https://etherscan.io) and other block explorers that are expecting URIs will be able to find your NFT data.

IPFS URIs are also the recommended way to link from a token's _metadata_ to images and other assets stored on IPFS. See the [metadata recommendations below](#metadata) for more details.


### HTTP Gateway URL

HTTP gateways provide interoperability for legacy user-agents that cannot resolve IPFS URIs natively.

Here's an example: `https://dweb.link/ipfs/bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi`

User agents with built-in support for IPFS (either via the IPFS Companion browser extension, or via native support, such as provided by Brave) will be able to recognize gateway links and resolve the content using native IPFS protocols. Other user-agents will simply follow the link to the gateway, which will load the content over IPFS and serve it using HTTP.

Gateway links are great for interoperability, but they should not be the primary or canonical link to your data on IPFS. While an IPFS URI will remain accessible as long as anyone on IPFS has the data, a gateway link can fail if the gateway operator goes offline. 

Where gateway links are used, developers should ensure that the gateway follows the proper URL conventions. Either of the following URL structures are acceptable:

`https://<gateway-host>.tld/ipfs/<cid>/path/to/subresource`

`https://<cidv1b32>.ipfs.<gateway-host>.tld/path/to/subresource`

In user-facing applications, developers should link to IPFS content via both:

- An IPFS URI
- An HTTP gateway URL

This will provide the best user experience until such a time as more browsers support native resolution of the IPFS URI scheme. Note that both kinds of link can easily be generated from a raw CID as needed.

## Metadata

Most NFTs will need some kind of structured metadata to describe the token's essential properties. Many encodings and data formats can be used, but the de-facto standard is to store metadata as a JSON object, encoded to UTF-8 byte string.

Here's an example of some JSON metadata for an NFT:

```json
{
  "name": "Moon Flight #1",
  "description": "This ticket serves as proof-of-ownership of a first-class seat on a flight to the moon.",
  "image": "ipfs://bafybeihhii26gwp4w7b7w7d57nuuqeexau4pnnhrmckikaukjuei2dl3fq/ticket.txt"
}
```

There are many ways to structure metadata for an NFT, and a lot of the details depend on the specific use cases for your NFT platform. The example above uses the schema defined in the [ERC-721][eip-721] standard.

Generally speaking, adopting or extending an existing standard like the schemas defined in [ERC-721][eip-721] and [ERC-1155][eip-1155] is a good idea, since your NFTs will be viewable using standard wallets and other tools like block explorers.

To link to images, videos and other media, simply use an [IPFS URI](#ipfs-uri). This is better than storing an HTTP gateway URL, since it's not tied to a specific gateway provider. If you want to use gateway URLs for convenience or interoperability, you can always generate them in your application's presentation layer.

::: tip
Using IPFS URIs inside your metadata to link to images and other media helps preserve the integrity of your NFT data! IPFS links can't be tampered with or altered to point to different data after they've been created.
:::

Because you need to know the CID of images and other media that you want to reference in your metadata, it's simplest to create the metadata after you've added your media assets to IPFS.

### Preserving filenames with IPFS directories

When adding data to IPFS, you preserve human-readable filenames by wrapping your files in a directory.

In javascript, you can set the `wrapWithDirectory` option when calling `ipfs.add`:

```js
const cid = await ipfs.add(
  { path: 'metadata.json', content: aJsonString }, 
  { wrapWithDirectory: true }
)
```

When adding files that are wrapped in a directory, `ipfs.add` returns the CID of the directory object. To build a full IPFS URI to the file, you can add a `/` character after the CID, followed by the filename. For example: `ipfs://bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi/metadata.json`.


<!-- TODO: persistence / high availability secction -->
<!-- TODO: summary / wrap up -->


<!-- 
## High Availability

One of the primary reasons for using a decentralized network like IPFS to serve content is to forestall link rot. This is achieved by allowing other nodes in the network to mirror data via cohosting. However, developers wishing to ensure the availability of content should not rely on the altruism of other nodes. To ensure that linked content remains available, developers should host it themselves by pinning the CIDs of the content on IPFS nodes they manage, preserving and distributing the content alongside any others who wish to help. Should they prefer, developers can also delegate this responsibility via pinning services.

-->


[docs-cid]: /concepts/content-addressing
[docs-mint-nfts]: ../mint-nfts-with-ipfs
[docs-minty-how-ipfs-helps]: ../mint-nfts-with-ipfs#how-ipfs-helps
[docs-multibase]: https://github.com/multiformats/multibase
[protoschool-cid]: https://proto.school/content-addressing
[eip-721]: https://eips.ethereum.org/EIPS/eip-721
[eip-1155]: https://eips.ethereum.org/EIPS/eip-1155