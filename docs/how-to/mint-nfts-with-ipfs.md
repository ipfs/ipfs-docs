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

A production NFT platform is a fairly complex thing. As with any modern web application, there are lots of decisions to make about tech stacks, UI conventions, API design, and so on. Blockchain-enabled dApps also need to interact with user wallets, for example using [MetaMask](https://metamask.io) to sign transactions inside the browser.

Since Minty was written to demonstrate the concepts and process of minting IPFS-backed NFTs, we don't need to get caught up in all the details of modern dApp development. Instead, Minty is a simple command line app, written in JavaScript and running on Node.js. See the [Next Steps section](#next-steps) to explore how to use the techniques shown in this guide to build a full NFT platform.

Here's how to create a new token from an image file using the `minty` command:

```
minty mint ~/token-images/ipfs-logo.png 
? Enter a name for your new NFT:  IPFS Logo
? Enter a description for your new NFT:  The IPFS logo (768px, png)

🌿 Minted a new NFT: 
Token ID:              14
Metadata URI:          ipfs://QmXFgNWRg3vyoMn887DFRCPK8G5atgqzHy7PyjWDmYMCnG/metadata.json
Metadata Gateway URL:  http://localhost:8080/ipfs/QmXFgNWRg3vyoMn887DFRCPK8G5atgqzHy7PyjWDmYMCnG/metadata.json
Asset URI:             ipfs://QmaNZ2FCgvBPqnxtkbToVVbK2Nes6xk5K4Ns6BsmkPucAM/ipfs-logo-768px.png
Asset Gateway URL:     http://localhost:8080/ipfs/QmaNZ2FCgvBPqnxtkbToVVbK2Nes6xk5K4Ns6BsmkPucAM/ipfs-logo-768px.png
NFT Metadata:
{
  "name": "The IPFS Logo",
  "description": "The IPFS logo (768px, png)",
  "image": "ipfs://QmaNZ2FCgvBPqnxtkbToVVbK2Nes6xk5K4Ns6BsmkPucAM/ipfs-logo-768px.png"
}
```

The `minty mint` command returns the id of the new token, some metadata containing the `name` and `description` we provided, and an IPFS URI to the image file we used for our NFT "asset", as well as a URI for the metadata JSON.

Check out the [Minty README][minty-repo] to see how to install the `minty` command and get started running a local Ethereum development chain. Once you've installed `minty`, you can run `minty --help` to get details about the available commands. Try minting a few NFTs and viewing their details with `minty show <token-id>`!

Once you've had a chance to play with Minty, lets look at how things work.

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

It's important to note that this contract is **not production ready** for most values of "production," because it doesn't include any [access controls][docs-openzeppelin-access-control] that limit which accounts are allowed to call the `mintToken` function. If you decide to develop a production platform based on Minty, please explore the access control patterns that are available and consider which should apply for your platform's access model.

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

To get the token id for our new NFT, we need call `tx.wait()`, which waits until the transaction has been confirmed. The token id is wrapped inside a `Transfer` event, which is emitted by the base contract when a new token is created or transferred to a new owner. By inspecting the transaction receipt returned from `tx.wait()`, we can pull the token id out of the `Transfer` event.

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

Minty's `createNFTFromAssetData` method is responsible for this process, with help from a few utility functions:

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

The `getNFT` method is used by the `minty` command line app to view a token using the `minty show <token-id>` command:

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
  "description": "The IPFS logo (768px, png)",
  "image": "ipfs://QmaNZ2FCgvBPqnxtkbToVVbK2Nes6xk5K4Ns6BsmkPucAM/ipfs-logo-768px.png"
}
```

If you have an IPFS-enabled browser like [Brave](https://brave.com) installed, you can paste the `Asset URI` or `Metadata URI` into the address bar directly and see the content served up by your local IPFS node. If your browser doesn't support IPFS natively, you can use the `Asset Gateway URL` or `Metadata Gateway URL` instead, which will serve the data from a local HTTP gateway.

You can also try using a public gateway like the one at [https://ipfs.io](https://ipfs.io). To do so, replace `http://localhost:8080` in the gateway URL with `https://ipfs.io`. However, you may notice that this takes a little longer than requesting the same file from your local node. This is because the public gateway doesn't have a copy of the data yet, so it has to look up the CID on the IPFS network and fetch it from your local IPFS node.

### Pinning NFT Data to a Remote Service

When you add data to IPFS, it first gets added to your local IPFS node, which advertises the CID of the data to the IPFS network. This lets anyone request the data by looking up the CID and connecting to your node directly. Once they've done so, their IPFS node will hold onto a copy temporarily, which helps speed up access to the data if another node requests it. However, by default, these extra copies will eventually expire, so that people running IPFS don't use up all of their storage space.

When minting NFTs, we generally want our data to be at least as "durable" as the blockchain platform the token was minted on, and we want it to be available all the time and across the globe.

As an NFT minting platform, you can certainly run your own IPFS infrastructure to ensure the storage of your user's NFT assets. To learn how, see the [Server Infrastructure documentation][docs-server-infra] to see how IPFS Cluster can provide highly-available IPFS storage and retrieval that scales to a large volume of data and requests.

As an alternative to running your own infrastructure, you can arrange for an IPFS Pinning Service to "pin" your data to their IPFS nodes, which are already tuned for high volume and reliability.

Minty uses the [IPFS Pinning Service API][pin-service-api] to request that a remote pinning service store that data for a given token, using the `minty pin <token-id>` command.

Before you can run this command, you'll need an API token from a pinning service that supports the IPFS Pinning Service API. If you're following along and want to run the `minty pin` command, we recommend signing up for a free account at [Pinata][pinata], an excellent pinning service provider with a generous free tier. 

The default Minty configuration expects to find an environment variable name `PINATA_API_TOKEN` containing the JWT access token for your Pinata account. Once you have a token, you can set the environment variable by using a command like:

```shell
export PINATA_API_TOKEN="Paste JWT token here"
```

Now when you run `minty pin`, Minty should have everything it needs to connect to Pinata.

If you decide to use a different pinning service, change the configuration entry for Pinata in the `config/default.js` file in the Minty repo.

Here's an example of running `minty pin <token-id>`:

```
minty pin 2
Pinning asset data (ipfs://QmaNZ2FCgvBPqnxtkbToVVbK2Nes6xk5K4Ns6BsmkPucAM/ipfs-logo-768px.png) for token id 2....
Pinning metadata (ipfs://QmThb94cZavMRMBCiCUaha8zF36bmWah4PX5YpuTCFVt6E/metadata.json) for token id 2...
🌿 Pinned all data for token id 2
```

This first looks up the token metadata and then sends a request to the pinning service to pin the asset CID and the metadata CID.

In the code, this happens in the `pinTokenData` method:

```javascript
async pinTokenData(tokenId) {
  const {metadata, metadataURI} = await this.getNFTMetadata(tokenId)
  const {image: assetURI} = metadata
  
  console.log(`Pinning asset data (${assetURI}) for token id ${tokenId}....`)
  await this.pin(assetURI)

  console.log(`Pinning metadata (${metadataURI}) for token id ${tokenId}...`)
  await this.pin(metadataURI)

  return {assetURI, metadataURI}
}
```

The actual pin request is sent in the `pin` method:

```javascript
async pin(cidOrURI) {
  const cid = extractCID(cidOrURI)

  // Make sure IPFS is set up to use our preferred pinning service.
  await this._configurePinningService()

  // Check if we've already pinned this CID to avoid a "duplicate pin" error.
  const pinned = await this.isPinned(cid)
  if (pinned) {
      return
  }

  // Ask the remote service to pin the content.
  // Behind the scenes, this will cause the pinning service to connect to our local IPFS node
  // and fetch the data using Bitswap, IPFS's transfer protocol.
  await this.ipfs.pin.remote.add(cid, { service: config.pinningService.name })
}
```

Because the pinning service API expects a CID and we may have a full `ipfs://` URI, we use a little helper called `extractCID` to pull out the CID portion.

Then, we call `_configurePinningService` to tell IPFS to use the remote service, if it hasn't already been configured.

We do a check to see if we've already pinned this CID, since the API will return an error if we try to pin content that's already been pinned. Alternatively, you could just try to pin and check to see if the returned error is for duplicate content.

Finally, we call `ipfs.pin.remote.add`, passing in the name of the pinning service. When the pinning service receives the request, it will try to connect to our local IPFS node, and our local node will also try to connect to their IPFS nodes. Once they're connected, the service will fetch the CIDs we asked it to pin and store the data on their infrastructure.

To verify that the data was pinned, you can run `ipfs pin remote ls --service=pinata` to see a list of the content you've pinned to Pinata. If you don't already have a copy of IPFS installed on your machine, you can use the one bundled with Minty by running `npx go-ipfs pin remote ls --service=pinata` instead. Alternatively, you can log into the Pinata website and view your pins in their UI.

## Next Steps

That was quite a lot to cover! We've seen how to add assets to IPFS and create NFT metadata, how to link our metadata to a new NFT on Ethereum, and how to pin our data with a remote provider for persistence.

At this point, you might be wondering how to take these techniques and use them to build a production NFT minting platform. Of course there are many decisions involved in any new product or marketplace, so we can't think of everything here. But there are a few places where Minty is clearly not "production ready", and by looking at them we can get a good idea of what technical work might be involved.

As a command line app, `minty` is a pretty big departure from the rich, interactive web applications that power NFT minting platforms. If you want to build a web platform based on the techniques shown in Minty, you will either need to expose Minty's functionality via an HTTP api, or go the "fully decentralized" route and interact with the NFT contract directly in the user's Ethereum-enabled web browser. The good news is that all of the concepts we've learned so far are applicable to either environment.

Since Minty currently runs on Node.js, it's straightforward to add an API server using one of the many Node HTTP frameworks like [Express][express-js] or [Koa][koa-js]. However, it can be difficult to allow users to sign Ethereum transactions with their own private keys if the code is running on a backend server. As such, you may want to put some "blockchain logic" in the frontend, so that users can use [MetaMask][metamask] or a similar wallet to authorize token transfers, etc.

Work is also [underway][js-ipfs-remote-pin-pr] to support the remote pinning service API in `js-ipfs`, so soon you'll be able to run the entire process in the user's browser using an embedded IPFS node. 

If you're building a dApp without a backend server today and just can't wait, you could also use an HTTP API provided by a pinning service to send and pin content using traditional HTTP requests instead of embedding js-ipfs into your dApp. See [Pinata's documentation][pinata-docs] for an example. This makes your dApp code a little less generic, since it's tied to one provider's API, but it may be a good way to get started. Doing everything in the browser also means you'll need to carefully manage the API tokens for the pinning services you support, perhaps by allowing users to add their own credentials and storing the tokens in the browser's local storage.

Finally, please consider that the Minty smart contract is intentionally very simple and is not tailored to the needs of a production platform. In particular, it lacks [access controls][docs-openzeppelin-access-control] and is not [upgradable][docs-openzeppelin-upgrade] without re-deploying the contract. Chances are you'll want your contract to include features that are unique to your platform as well, beyond the base ERC-721 functionality.

Thanks for following along! We can't wait to see what you'll build.

<!-- TODO: move minty repo to ipfs-shipyard? -->
[minty-repo]: https://github.com/yusefnapora/minty
[minty-code-get-nft]: https://github.com/yusefnapora/minty/blob/39a3e79e01b4776372a08fa352c8fe508ffa9845/src/minty.js#L193-L212
[js-ipfs-remote-pin-pr]: https://github.com/ipfs/js-ipfs/pull/3588
[eip-721]: https://eips.ethereum.org/EIPS/eip-721
[pin-service-api]: https://ipfs.github.io/pinning-services-api-spec/
[pinata]: https://pinata.cloud
[pinata-docs]: https://pinata.cloud/documentation
[docs-openzeppelin-access-control]: https://docs.openzeppelin.com/contracts/3.x/access-control
[docs-openzeppelin-upgrade]: https://docs.openzeppelin.com/contracts/3.x/upgradeable
[express-js]: https://expressjs.com
[koa-js]: https://koajs.com
[metamask]: https://metamask.io

[docs-cid]: ../../concepts/content-addressing/
[docs-server-infra]: ../../install/server-infrastructure
