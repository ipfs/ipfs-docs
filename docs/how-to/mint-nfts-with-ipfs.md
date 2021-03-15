---
title: Mint NFTs with IPFS and Ethereum
description: Learn how to build a simple NFT minting platform with IPFS and Ethereum.
---

# Minting NFTs with IPFS and Ethereum

Intro paragraph. Explain who the tutorial is for and what we'll cover. Maybe show a screenshot of the example app in action.

## What is an NFT Made of?

Describe the key features of an NFT:

- They're defined in a smart contract on a blockchain
 - There are several blockchains used for NFTs, but this tutorial focuses on Ethereum
- Each token has a unique identifier and "exchange rate" or trade value. They're "non fungible" beacuse you can't just swap one NFT out for another from the same contract.
- NFTs are often used to represent artwork or other digital "assets"
- Storing data on the blockchain is incredibly expensive, so NFTs allow you to link to data that lives elsewhere using a "metadata URI"

## How Does IPFS Help?

- Using traditional HTTP urls for NFT metadata URIs is problematic, because the owner of the website can change the content after the NFT is created.
  - e.g. https://cointelegraph.com/news/opensea-collector-pulls-the-rug-on-nfts-to-highlight-arbitrary-value
- IPFS prevents this using content addressing. An IPFS URI can only ever point to the content that was used to create it.
- IPFS also allows multiple people / organizations to store and provide the data, so the owner of an NFT can keep the data alive even if the original NFT platform that created it disappears. If the NFT data were stored in an S3 bucket and the creator decides to stop paying their AWS bill, the data just disappears. With IPFS, if anyone still has a copy on the network, the original provider isn't needed.

## Let's Mint Some NFTs!

Introduce Minty, the command line NFT minting platform.

Show a few examples of using the cli to create a token and view the data.

Describe the high level process that we'll drill into in the next sections:

- An ethereum smart contract is deployed to the blockchain. The contract has a `mintToken` function that takes in an IPFS CID and creates a new token with an IPFS metadata URI.
- The `Minty` javascript class coordinates the process of storing data in IPFS and calling the `mintToken` function.
- To make the IPFS data highly-available, we can "pin" it to a remote pinning service like Pinata, using `Minty`'s `pinToken` method.

### The Minty Smart Contract

The Minty contract is intentionally very simple, to avoid getting lost in Ethereum development details. 
It's short enough that we could probably include [the whole listing](https://github.com/yusefnapora/minty/blob/master/contracts/Minty.sol).

Important: highlight that the contract is not production ready! At minimum, it needs access controls.

The contract is based on the [OpenZeppelin ERC721 base contract][https://docs.openzeppelin.com/contracts/3.x/api/token/erc721#ERC721], and is very similar
to the one from the [OpenZeppelin example guide](https://docs.openzeppelin.com/contracts/3.x/erc721). 

Highlight that we set a `baseURI` of `ipfs://`, in the token constructor, since all of our metadata URIs will be IPFS URIs. In the `mintToken` function, we take in
an IPFS cid, and the `ipfs://` prefix is added to form the full URI.

### Storing NFT Data on IPFS

Before calling the smart contract's `mintToken` function, we need to store the data for the NFT in IPFS and create some JSON metadata.

`Minty`'s [`createNFTFromAssetData` method](https://github.com/yusefnapora/minty/blob/master/src/minty.js#L88-L115) adds the data for an NFT asset (e.g. an image file)
to IPFS, and embeds the CID for the asset into a JSON object (see [`makeNFTMetadata`](https://github.com/yusefnapora/minty/blob/master/src/minty.js#L142-L150)). 
The JSON data is also stored in IPFS, and the CID of the JSON data is used as the metadata CID when calling the contract's `mintToken` function.

### Retrieving NFT Data

To view the data for an NFT, the [`getNFT` method](https://github.com/yusefnapora/minty/blob/master/src/minty.js#L179-L193) and it's helper
[`getNFTMetadata`](https://github.com/yusefnapora/minty/blob/master/src/minty.js#L202-L207) fetch the metadata URI from the smart contract using the contract's
`getTokenURI` function (inherited from the OpenZeppelin base contract).

Then the metadata is fetched from IPFS, and optionally, the original asset data as well.

### Pinning NFT Data to a Remote Service

Describe why pinning is useful, and introduce Pinata as a pinning provider that supports the Pinning Services API.

Show how [`pinTokenData`](https://github.com/yusefnapora/minty/blob/master/src/minty.js#L356-L367) looks up the metadata URI for a token,
fetches the metadata to get the asset URI, and then calls [`pin`](https://github.com/yusefnapora/minty/blob/master/src/minty.js#L375-L394) to request that the remote pinning service pin both the asset URI and metadata URI using `ipfs.pin.remote.add`.

## Next Steps to Production

Wrap up what we've covered, and go over what would be needed to build a real NFT platform:

- Convert the command line interface to a web API, to support a web-based minting platform
- Add access controls to the smart contract, and set a policy for who is authorized to transfer tokens
- Maybe explain that users can use go-ipfs instead of an embedded js-ipfs by using `ipfs-http-client` instead of `ipfs-core`

