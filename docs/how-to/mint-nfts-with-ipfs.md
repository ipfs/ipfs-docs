---
title: Mint NFTs with IPFS and Ethereum
description: Learn how to build a simple NFT minting platform with IPFS and Ethereum.
sidebarDepth: 3
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

To find out how to use IPFS to mint new NFTs, we'll explore [Minty][minty-repo], an example app that was written to accompany this guide.

A production NFT platform is a fairly complex thing. As with any modern web application, there are lots of decisions to make about tech stacks, UI conventions, API design and so on. Blockchain-enabled dApps also need to interact with user wallets, for example using [MetaMask](https://metamask.io) to sign transactions inside the browser.

Since Minty was written to demonstrate the concepts and process of minting IPFS-backed NFTs, we don't need to get caught up in all the details of modern dApp development. Instead, Minty is a simple command line app, written in Javascript and running on node.js. See the [Next Steps section](#next-steps) to explore how to use the techniques shown in this guide to build a full NFT platform.

Here's how to create a new token from an image file using the `minty` command:

```
minty mint ~/token-images/ipfs-logo.png 

? Enter a name for your new NFT:  IPFS Logo
? Enter a description for your new NFT:  The IPFS logo
Minted new NFT:  {
  tokenId: '2',
  metadata: {
    name: 'IPFS Logo',
    description: 'The IPFS logo',
    image: 'ipfs://QmUAACALRufqXnGHM1QCSr5JA3b54N5QBKD73EXx6pws2f/ipfs-logo.png'
  },
  assetURI: 'ipfs://QmUAACALRufqXnGHM1QCSr5JA3b54N5QBKD73EXx6pws2f/ipfs-logo.png',
  metadataURI: 'ipfs://QmZ8WLvpoTgHVVAyAormrzWnEqTPZ5KLBJ6ymVCvbTzP2r/metadata.json',
  assetGatewayURL: 'http://localhost:8080/ipfs/QmUAACALRufqXnGHM1QCSr5JA3b54N5QBKD73EXx6pws2f/ipfs-logo.png',
  metadataGatewayURL: 'http://localhost:8080/ipfs/QmZ8WLvpoTgHVVAyAormrzWnEqTPZ5KLBJ6ymVCvbTzP2r/metadata.json'
}
```

The `minty mint` command returns the id of the new token, some metadata containing the `name` and `description` we provided, and an IPFS URI to the image file we used for our NFT "asset".

The `metadataURI` in the output above is the IPFS URI for the `metadata` that's been converted to a JSON string and saved to IPFS.

If you have an IPFS-enabled browser like [Brave](https://brave.com) installed, you can paste the `assetURI` or `metadataURI` into the address bar directly and see the content served up by your local IPFS node. If your browser doesn't support IPFS natively, you can use the `assetGatewayURL` or `metadataGatewayURL` instead, which will serve the data from a local HTTP gateway.

Check out the [Minty README][minty-repo] to see how to install the `minty` command and get started running a local Ethereum development chain. Once you've installed `minty`, you can run `minty --help` to get details about the available commands. Try minting a few NFTs and viewing their details with `minty show <token-id>`!

Next, lets look at how things work.

First, we'll [check out the smart contract](#the-minty-smart-contract), which defines the mapping between a token ID and the IPFS metadata URI.

Then we'll see [how to get the data into IPFS in the first place](#storing-nft-data-on-ipfs), so we can get the metadata URI that our contract needs.

Once the data has been stored and a token has been minted, we can [fetch the data from IPFS](#retrieving-nft-data) using the metadata URI returned from the contract.

Finally, we'll see [how to "pin" our IPFS data to a remote IPFS Pinning Service](#pinning-nft-data-to-a-remote-service), so that it stays available even if our local IPFS node goes offline.


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

## Next Steps

Wrap up what we've covered, and go over what would be needed to build a real NFT platform:

- Convert the command line interface to a web API, to support a web-based minting platform
- Add access controls to the smart contract, and set a policy for who is authorized to transfer tokens
- Maybe explain that users can use go-ipfs instead of an embedded js-ipfs by using `ipfs-http-client` instead of `ipfs-core`


<!-- TODO: move minty repo to ipfs-shipyard? -->
[minty-repo]: https://github.com/yusefnapora/minty