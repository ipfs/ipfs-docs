---
title: Best Practices for Storing NFT Data using IPFS
description: Non-fungible tokens can represent all kinds of digital media. Learn some best practices for storing NFT data using IPFS.
date: 2021-04-02
---

# Best Practices for Storing NFT Data using IPFS

IPFS is a great fit for storing and addressing data for NFTs, or non-fungible tokens. This guide is all about how to store the data for NFTs on IPFS so that NFT creators and owners have a great experience that can stand the test of time.

Since an NFT can't be easily changed after it's been created, it's a good idea to think about how the data for your NFTs is stored, addressed, and made persistent over time. That's why we'll be getting into the specifics of how to prepare your NFT metadata, and we'll also look at the different kinds of links to IPFS content and when you should use each one. By following these recommendations, you can help ensure a long and healthy future for your NFT data.

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

While it's tempting to save a few bytes on-chain by storing a CID in its binary form, doing so may cause problems with standard smart contract interfaces like [ERC-721][eip-721], which expects each token to have a string `tokenURI`. By storing CIDs as strings to begin with, you can avoid an expensive on-chain conversion from binary to base 32.

### IPFS URI

A Uniform Resource Identifier, or URI, is used to specify a particular piece of content in a given context. The context is determined by the URI scheme (appended to the URI as a prefix, followed by `://`). The URI scheme for IPFS is simply `ipfs`.

Here's an example of a full IPFS URI: `ipfs://bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi`

IPFS URIs are the canonical representation for an IPFS link, since the `ipfs` scheme makes it clear and unambiguous that the CID refers to content on IPFS and not some other system. To produce an IPFS URI, simpley prefix a CID string with the static string `ipfs://`.

You can also include filenames inside the path component of an IPFS URI. For example, if you've stored your token's metadata on IPFS wrapped in a directory, your URI might be:

`ipfs://bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi/metadata.json`

NFT standards like [ERC-721][eip-721] and [ERC-1155][eip-1155] define smart contract functions for fetching the URI associated with an NFT. If you're storing raw CIDs as recommended, it's best to convert to URIs inside the smart contract, rather than in the presentation layer of a distributed app. By doing the conversion on-chain, tools like [EtherScan](https://etherscan.io) and other block explorers that are expecting URIs will be able to find your NFT data.

IPFS URIs are also the recommended way to link from a token's _metadata_ to images and other assets stored on IPFS. See the [metadata recommendations below](#metadata) for more details.


### HTTP Gateway URL

HTTP gateways provide interoperability for legacy user-agents that cannot resolve IPFS URIs natively.

Here's an example: `https://dweb.link/ipfs/bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi`

User agents with built-in support for IPFS (either via the IPFS Companion browser extension, or via native support, such as provided by Brave) will be able to recognize gateway links and resolve the content using native IPFS protocols. Other user-agents will simply follow the link to the gateway, which will load the content over IPFS and serve it using HTTP.

Gateway links are great for interoperability, but they should not be the primary or canonical link to your data on IPFS. While an IPFS URI will remain accessible as long as anyone on IPFS has the data, a gateway link can fail if the gateway operator goes offline. 


Where gateway links are used, developers should ensure that the gateway follows the proper URL conventions; either of the following URL structures are acceptable:

`https://<gateway-host>.tld/ipfs/<cid>/path/to/subresource`

`https://<cidv1b32>.ipfs.<gateway-host>.tld/path/to/subresource`


In user-facing applications, developers should link to IPFS content via both:

- An IPFS URI
- An HTTP gateway URL

This will provide the best user experience until such a time as more browsers support native resolution of the IPFS URI scheme. Note that both kinds of link can easily be generated from a raw CID as needed.


<!-- 
Integrity

A major concern for NFTs is the integrity of the asset - this includes both the asset itself and any data associated with it. While IPFS can help address these concerns, developers should adhere to the following recommendations to take advantage of its benefits to the fullest extent.
Linking a Manifest to its Asset
A token’s manifest data (metadata) should be considered integral to the value of an NFT. Thus, to preserve the asset’s value, metadata should be stored on IPFS with the asset, to ensure that both remain accessible.

There are two recommended alternatives for achieving this:

Option One: Wrapping Token and Manifest Within a Directory. One option available to developers is to add both the token and manifest to IPFS together. This is achieved via the following steps:

1) Store the token and manifest within a directory on the local filesystem
2) Reference the token in the manifest via a link relative to the root of the directory
3) Add the directory to IPFS and note its CID (the token and manifest will also receive CIDs)
4) Store the directory’s CID on-chain

This approach will enable multiple ways of addressing the added content:

The directory will be accessible via the URI ipfs://{directoryCID}
The metadata will be accessible via both:
ipfs://{directoryCID}/metadata.json
ipfs://{metadataCID}
The asset will be accessible via both:
ipfs://{directoryCID}/asset.jpg
ipfs://{assetCID}

In particular, this gives developers a way of distributing URIs that reference filenames, which may be of value from the perspective of user interaction.

Option Two: Chain of Trust. The second alternative available is to add the metadata and the asset to IPFS independent of one another, using the following steps:

1) Add the NFT asset to IPFS and note its CID
2) Add a link in the manifest to the asset using an IPFS URI
3) Add the manifest to IPFS and note its CID
4) Store the CID of the manifest on-chain

With this option, the metadata and the asset will each only have one valid URI:
The metadata will be accessible via ipfs://{metadataCID}
The asset will be accessible via ipfs://{assetCID}

The advantage of this approach is that the metadata will contain a direct (rather than relative) link to the asset, and so can be meaningfully distributed independently of the asset itself.
High Availability
One of the primary reasons for using a decentralized network like IPFS to serve content is to forestall link rot. This is achieved by allowing other nodes in the network to mirror data via cohosting. However, developers wishing to ensure the availability of content should not rely on the altruism of other nodes. To ensure that linked content remains available, developers should host it themselves by pinning the CIDs of the content on IPFS nodes they manage, preserving and distributing the content alongside any others who wish to help. Should they prefer, developers can also delegate this responsibility via pinning services.

-->

[docs-cid]: /concepts/content-addressing
[docs-mint-nfts]: ../mint-nfts-with-ipfs
[docs-minty-how-ipfs-helps]: ../mint-nfts-with-ipfs#how-ipfs-helps
[docs-multibase]: https://github.com/multiformats/multibase
[protoschool-cid]: https://proto.school/content-addressing
[eip-721]: https://eips.ethereum.org/EIPS/eip-721
[eip-1155]: https://eips.ethereum.org/EIPS/eip-1155