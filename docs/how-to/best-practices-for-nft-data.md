---
title: Best Practices for Storing NFT Data using IPFS
description: Non-fungible tokens can represent all kinds of digital media. Learn some best practices for storing NFT data using IPFS.
date: 2021-04-02
---

# Best Practices for Storing NFT Data using IPFS

IPFS is a great fit for storing and addressing data for NFTs, or non-fungible tokens. This guide is all about how to store the data for NFTs on IPFS so that NFT creators and owners have a great experience that can stand the test of time.

Since an NFT can't be easily changed after it's been created, it's a good idea to think about how the data for your NFTs is stored, addressed, and made persistent over time. That's why we'll be getting into the specifics of how to prepare your NFT metadata, including how best to link to data on IPFS from within the metadata. We'll also show how you can save some precious bytes on the blockchain by storing IPFS Content Identifiers (or [CIDs][docs-cid]) in their compact binary form.

This guide is focused on how to format your data and link to it for the best long-term results. If you're looking for details about smart contract interactions, head over to our [guide to minting NFTs with IPFS][docs-mint-nfts], where we go over the whole process from end-to-end using an Ethereum test network.

## Types of IPFS links and when to use them

There are a few different ways to refer to data on IPFS, each of which is best suited to different use cases.

### CID

First, there's the "raw" CID, which uniquely identifies a specific piece of content. CIDs can be stored and sent over the network in a compact binary form, but they're represented as strings of random-seeming characters when displayed to users. Here's an example:

```
bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi
```

Because it's the most compact form of IPFS link, the CID is a good fit for storing directly on the blockchain. We recommend storing CIDs as strings, in the base 32 encoding as shown in the example above. 

While it's tempting to save a few bytes on-chain by storing a CID in its binary form, doing so may cause problems with standard smart contract interfaces like [ERC-721][eip-721], which expects each token to have a string `tokenURI`. By storing CIDs as strings to begin with, you can avoid an expensive on-chain conversion from binary to base 32.

### IPFS URI

A Uniform Resource Identifier, or URI, is used to specify a particular piece of content in a given context. The context is determined by the URI scheme (appended to the URI as a prefix, followed by `://`). The URI scheme for IPFS is simply `ipfs`.

Here's an example: `ipfs://bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi`

IPFS URIs are the canonical representation for an IPFS link, since the `ipfs` scheme makes it clear and unambiguous that the CID refers to content on IPFS and not some other system. To produce an IPFS URI, simpley prefix a CID string with the static string `ipfs://`.

NFT standards like [ERC-721][eip-721] and [ERC-1155][eip-1155] define smart contract functions for fetching the URI associated with an NFT. If you're storing raw CIDs as recommended, it's best to convert to URIs inside the smart contract, rather than in the presentation layer of a distributed app. By doing the conversion on-chain, tools like [EtherScan](https://etherscan.io) and other block explorers that are expecting URIs will be able to find your NFT data.

<!-- TODO: refactor remaining blog post content, show metadata examples, etc

### HTTP Gateway URL
HTTP Gateway URL. HTTP gateways provide interoperability for legacy user-agents that cannot resolve IPFS URIs natively (IPFS-native tools can extract the CID from these URLs and resolve it via IPFS as usual). Such links should only be used in an application’s presentation layer.

Example: https://dweb.link/ipfs/bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi

Where public gateway links are used, developers should ensure that the gateway follows the proper URL conventions; either of the following URL structures:

https://<gateway-host>.tld/ipfs/<cid>/path/to/subresource
https://<cidv1b32>.ipfs.<gateway-host>.tld/path/to/subresource

are acceptable. Note that gateways recentralizes the distribution of content, presenting both a man-in-the-middle vector and single point of failure - if the gateway operator goes offline or is unreachable, the link will break. However, providing these links conform to the conventions above, user agents with built-in support for IPFS (either via the IPFS Companion browser extension, or via native support, such as provided by Brave) are immune to these problems, as they can automatically extract the CID from such links, and load the data from IPFS according to user preferences.
Addressing in Various Contexts
The particular link format developers should use depends on context.

On-Chain. IPFS CIDs use multibase prefixing to derive a string representation from their representation. On a blockchain, where space is at a premium, only the binary representation should be stored. Stringified CIDs can be decoded to binary CIDs by using their multibase prefix to determine and reverse the string encoding used. In javascript, you can use the cids package to easily get a compact binary representation of the CID to store on-chain:



Manifest. In the token manifest (metadata), IPFS URIs should be used as the most unambiguous and future-proof method of linking to IPFS resources in plain text. Developers may optionally wish to include links to public HTTP gateways for legacy interoperability.

Other alternatives for linking to the content (e.g., non-gateway HTTP URLs) should ideally be avoided. As the content served over HTTP from a particular location is subject to change, such a link cannot be relied upon as anything other than an ephemeral content mirror. On a blockchain, where data is permanently and immutably stored, referencing content via HTTP is thus profoundly wasteful.

In contrast, IPFS CIDs are valid forever, and as such, may safely be considered the canonical source for their data.

Application. In user-facing applications, developers should link to IPFS content via both:

An IPFS URI
An HTTP gateway URL

until such a time as more browsers support native resolution of the IPFS URI scheme. Note that both kinds of link can easily be generated from a raw CID as needed.

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
[eip-721]: https://eips.ethereum.org/EIPS/eip-721
[eip-1155]: https://eips.ethereum.org/EIPS/eip-1155