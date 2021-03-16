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
? Enter a description for your new NFT:  The IPFS logo (768ox, png)

🌿 Minted a new NFT: 
Token ID:              14
Metadata URI:          ipfs://QmXFgNWRg3vyoMn887DFRCPK8G5atgqzHy7PyjWDmYMCnG/metadata.json
Metadata Gateway URL:  http://localhost:8080/ipfs/QmXFgNWRg3vyoMn887DFRCPK8G5atgqzHy7PyjWDmYMCnG/metadata.json
Asset URI:             ipfs://QmaNZ2FCgvBPqnxtkbToVVbK2Nes6xk5K4Ns6BsmkPucAM/ipfs-logo-768px.png
Asset Gateway URL:     http://localhost:8080/ipfs/QmaNZ2FCgvBPqnxtkbToVVbK2Nes6xk5K4Ns6BsmkPucAM/ipfs-logo-768px.png
NFT Metadata:
{
  "name": "The IPFS Logo",
  "description": "The IPFS logo (768ox, png)",
  "image": "ipfs://QmaNZ2FCgvBPqnxtkbToVVbK2Nes6xk5K4Ns6BsmkPucAM/ipfs-logo-768px.png"
}
```

The `minty mint` command returns the id of the new token, some metadata containing the `name` and `description` we provided, and an IPFS URI to the image file we used for our NFT "asset".

The `Metadata URI` in the output above is the IPFS URI for the NFT Metadata JSON object that's stored on IPFS.

Check out the [Minty README][minty-repo] to see how to install the `minty` command and get started running a local Ethereum development chain. Once you've installed `minty`, you can run `minty --help` to get details about the available commands. Try minting a few NFTs and viewing their details with `minty show <token-id>`!

Next, lets look at how things work.

First, we'll [check out the smart contract](#the-minty-smart-contract), which defines the mapping between a token ID and the IPFS metadata URI.

Then we'll see [how to get the data into IPFS in the first place](#storing-nft-data-on-ipfs), so we can get the metadata URI that our contract needs.

Once the data has been stored and a token has been minted, we can [fetch the data from IPFS](#retrieving-nft-data) using the metadata URI returned from the contract.

Finally, we'll see [how to "pin" our IPFS data to a remote IPFS Pinning Service](#pinning-nft-data-to-a-remote-service), so that it stays available even if our local IPFS node goes offline.


### The Minty Smart Contract

Minty uses a smart contract written in [Solidity](https://soliditylang.org), the most popular language for Ethereum development.

The contract implements the [ERC-721 Ethereum NFT standard][eip-721], by virtue of inheriting from the very convenient and fully featured [OpenZeppelin ERC721 base contract](https://docs.openzeppelin.com/contracts/3.x/api/token/erc721#ERC721).

Because the OpenZeppelin base contract provides so much of the core functionality, the Minty contract is quite simple:

```solidity
pragma solidity ^0.7.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Minty is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor(string memory tokenName, string memory symbol) ERC721(tokenName, symbol) {
        _setBaseURI("ipfs://");
    }

    function mintToken(address owner, string memory metadataURI)
    public
    returns (uint256)
    {
        _tokenIds.increment();

        uint256 id = _tokenIds.current();
        _safeMint(owner, id);
        _setTokenURI(id, metadataURI);

        return id;
    }
}
```

If you read the [OpenZeppelin ERC721 guide](https://docs.openzeppelin.com/contracts/3.x/erc721), you'll see that the Minty contract is extremely similar. The `mintToken` function simply increments a counter to issue token ids, and it uses the `_setTokenURI` function provided by the base contract to associate the metadata URI with the new token id.

One thing to notice is that we set the base URI prefix to `ipfs://` in the constructor. When we set a metadata URI for each token in the `mintToken` function, we don't need to store the prefix, since the base contract's `tokenURI` accessor function will apply it to each token's URI.

It's important to note that this contract is **not production ready** for most values of "production," because it doesn't include any [access controls](https://docs.openzeppelin.com/contracts/3.x/access-control) that limit which accounts are allowed to call the `mintToken` function. If you decide to develop a production platform based on Minty, please explore the access control patterns that are available and consider which should apply for your platform's access model.

#### Deploying the Contract

Before you can mint new NFTs, you need to deploy the contract to a blockchain network. Minty uses [HardHat](https://hardhat.org) to manage contract deployment, and by default it deploys to an instance of the [HardHat development network](https://hardhat.org/hardhat-network) that's been [configured to run on your machine's localhost network](https://hardhat.org/hardhat-network/#connecting-to-hardhat-network-from-wallets-and-other-software).

To deploy, make sure the local development network and IPFS daemon are running with Minty's `start-local-environment.sh` script, then in another terminal run `minty deploy`. This will create a `minty-deployment.json` file that contains the contract address, which future `minty` commands will read to connect to the deployed contract.

It's also possible to deploy the contract to an [Ethereum test network](https://ethereum.org/en/developers/docs/networks/) by editing the `hardhat.config.js` file in the minty repo. See the [HardHat documentation](https://hardhat.org/config/#json-rpc-based-networks) to learn how to configure HardHat to deploy to a node connected to a testnet, either running locally or hosted by a provider such as [Infura](https://infura.io). Because deployment consumes Ether as gas, you'll need to obtain some test Ether for your chosen network and configure hardhat to use the correct wallet.

#### Calling the `mintToken` Smart Contract Function

Let's look at how Minty's JavaScript code interacts with the smart contract's `mintToken` function. This happens in the `mintToken` method of the `Minty` class:

```javascript
async mintToken(ownerAddress, metadataURI) {
  // The smart contract adds an ipfs:// prefix to all URIs, 
  // so make sure to remove it so it doesn't get added twice
  metadataURI = stripIpfsUriPrefix(metadataURI)

  // Call the mintToken smart contract function to issue a new token
  // to the given address. This returns a transaction object, but the 
  // transaction hasn't been confirmed yet, so it doesn't have our token id.
  const tx = await this.contract.mintToken(ownerAddress, metadataURI)

  // The OpenZeppelin base ERC721 contract emits a Transfer event 
  // when a token is issued. tx.wait() will wait until a block containing 
  // our transaction has been mined and confirmed. The transaction receipt 
  // contains events emitted while processing the transaction.
  const receipt = await tx.wait()
  for (const event of receipt.events) {
    if (event.event !== 'Transfer') {
        console.log('ignoring unknown event type ', event.event)
        continue
    }
    return event.args.tokenId.toString()
  }

  throw new Error('unable to get token id')
}
```

As you can see, calling the smart contract function is mostly like calling a normal JavaScript function, thanks to the [ethers.js smart contract library](https://docs.ethers.io/v5/). However, since the `mintToken` function modifies the blockchain's state, it can't return a value right away. This is because the function call creates an ethereum transaction, and there's no way to know for sure that the block containing the transaction will actually be mined and incorporated into the blockchain. For example, there may not be enough gas to pay for the transaction.

To get the token id for our new NFT, we need call `tx.wait()`, which waits until the transaction has been confirmed. The token id is wrapped inside a `Transfer` event, which is emitted by the base contract when a new token is created or transferred to a new owner.

### Storing NFT Data on IPFS

The smart contract's `mintToken` function expects an IPFS metadata URI, which should resolve to a JSON object describing the NFT. Minty uses the metadata schema described in [EIP-721][eip-721], which supports JSON objects like this:

```json
{
    "name": "A name for this NFT",
    "description": "An in-depth description of the NFT",
    "image": "ipfs://QmUAACALRufqXnGHM1QCSr5JA3b54N5QBKD73EXx6pws2f/nft-image.png"
}
```

The `image` field contains a URI that resolves to the NFT image data we want to associate with the token.

To get the metadata URI for our smart contract, we first add the image data to IPFS to get an IPFS Content ID, or [CID][docs-cid], and use the CID to build an `ipfs://` URI. Then we create a JSON object containing the image URI, along with user-provided `name` and `description` fields. Finally, we add the JSON data to IPFS to create the metadata `ipfs://` URI, and feed that into the smart contract.

Minty's `createNFTFromAssetData` is responsible for this whole process, with help from a few utility functions:

```javascript
async createNFTFromAssetData(content, options) {
  // add the asset to IPFS
  const filePath = options.path || 'asset.bin'
  const basename =  path.basename(filePath)

  // When you add an object to IPFS with a directory prefix in its path,
  // IPFS will create a directory structure for you. This is nice, because
  // it gives us URIs with descriptive filenames in them e.g.
  // 'ipfs://QmaNZ2FCgvBPqnxtkbToVVbK2Nes6xk5K4Ns6BsmkPucAM/cat-pic.png' vs
  // 'ipfs://QmaNZ2FCgvBPqnxtkbToVVbK2Nes6xk5K4Ns6BsmkPucAM'
  const ipfsPath = '/nft/' + basename
  const { cid: assetCid } = await this.ipfs.add({ path: ipfsPath, content })

  // make the NFT metadata JSON
  const assetURI = ensureIpfsUriPrefix(assetCid) + '/' + basename
  const metadata = await this.makeNFTMetadata(assetURI, options)

  // add the metadata to IPFS
  const { cid: metadataCid } = await this.ipfs.add({ 
    path: '/nft/metadata.json', 
    content: JSON.stringify(metadata)
  })
  const metadataURI = ensureIpfsUriPrefix(metadataCid) + '/metadata.json'

  // get the address of the token owner from options, 
  // or use the default signing address if no owner is given
  let ownerAddress = options.owner
  if (!ownerAddress) {
    ownerAddress = await this.defaultOwnerAddress()
  }

  // mint a new token referencing the metadata URI
  const tokenId = await this.mintToken(ownerAddress, metadataURI)

  // format and return the results
  return {
    tokenId,
    metadata,
    assetURI,
    metadataURI,
    assetGatewayURL: makeGatewayURL(assetURI),
    metadataGatewayURL: makeGatewayURL(metadataURI),
  }
}
```

We're adding our data to IPFS using a `path` argument with a directory structure, e.g. `/nft/metadata.json` instead of just `metadata.json`. This isn't strictly necessary, but it gives us more descriptive URIs that include human-readable filenames. On the downside, the metadata URI requires a bit more space on chain, since it includes the `/metadata.json` portion as well as the IPFS CID. In a production environment where bytes cost money, you may want to modify the smart contract to only store the CID portion and automatically append the filename before returning the URI, or simply store metadata without a directory wrapper.


### Retrieving NFT Data

To view the metadata for an existing NFT, we call the smart contract's `tokenURI` function, then fetch the JSON data from IPFS and parse it into an object. This happens in `getNFTMetadata`:

```javascript
async getNFTMetadata(tokenId) {
  const metadataURI = await this.contract.tokenURI(tokenId)
  const metadata = await this.getIPFSJSON(metadataURI)

  return {metadata, metadataURI}
}
```

See the [`getNFT` method][minty-code-get-nft] for an example that also fetches the asset data from IPFS by resolving the URI in the metadata's `image` field.

Using the `minty` command line app, we can view a token using the `minty show <token-id>` command:

```
minty show 14

Token ID:              14
Owner Address:         0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
Metadata URI:          ipfs://QmXFgNWRg3vyoMn887DFRCPK8G5atgqzHy7PyjWDmYMCnG/metadata.json
Metadata Gateway URL:  http://localhost:8080/ipfs/QmXFgNWRg3vyoMn887DFRCPK8G5atgqzHy7PyjWDmYMCnG/metadata.json
Asset URI:             ipfs://QmaNZ2FCgvBPqnxtkbToVVbK2Nes6xk5K4Ns6BsmkPucAM/ipfs-logo-768px.png
Asset Gateway URL:     http://localhost:8080/ipfs/QmaNZ2FCgvBPqnxtkbToVVbK2Nes6xk5K4Ns6BsmkPucAM/ipfs-logo-768px.png
NFT Metadata:
{
  "name": "The IPFS Logo",
  "description": "The IPFS logo (768ox, png)",
  "image": "ipfs://QmaNZ2FCgvBPqnxtkbToVVbK2Nes6xk5K4Ns6BsmkPucAM/ipfs-logo-768px.png"
}
```

If you have an IPFS-enabled browser like [Brave](https://brave.com) installed, you can paste the `Asset URI` or `Metadata URI` into the address bar directly and see the content served up by your local IPFS node. If your browser doesn't support IPFS natively, you can use the `Asset Gateway URL` or `Metadata Gateway URL` instead, which will serve the data from a local HTTP gateway.

You can also try using a public gateway like the one at [https://ipfs.io](https://ipfs.io). To do so, replace `http://localhost:8080` in the gateway URL with `https://ipfs.io`. However, you may notice that this takes a little longer than requesting the same file from your local node. This is because the public gateway doesn't have a copy of the data yet, so it has to look up the CID on the IPFS network and fetch it from your local IPFS node.

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
[minty-code-get-nft]: https://github.com/yusefnapora/minty/blob/39a3e79e01b4776372a08fa352c8fe508ffa9845/src/minty.js#L193-L212

[eip-721]: https://eips.ethereum.org/EIPS/eip-721
[docs-cid]: ../../concepts/content-addressing/