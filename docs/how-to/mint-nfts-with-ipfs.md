---
title: Mint an NFT with IPFS 
description: Non-fungible tokens allow users to create and trade digital items with differing values. Go from nothing to creating a freshly-minted NFT token and storing it on IPFS with the help of the Pinata pinning service. 
date: 2021-03-17
---

# Mint an NFT with IPFS 

Non-fungible tokens allow users to create and trade digital items with differing values. Go from nothing to creating a freshly-minted NFT token and storing it on IPFS with the help of the Pinata pinning service.

This guide doesn't go into the intricacies of NFTs, or even why they're important. This guide is solely to help you understand how to host NFTs on IPFS and how the process can be expanded to include other aspects of blockchain development.

Since IPFS isn't a blockchain, we'll be leveraging the power of the Ethereum blockchain for this guide. However, the steps described here can just as easily be applied to other blockchains.

## What NFTs are made of 

<!-- TODO 

Describe the key features of an NFT:

- They're defined in a smart contract on a blockchain
 - There are several blockchains used for NFTs, but this tutorial focuses on Ethereum
- Each token has a unique identifier and "exchange rate" or trade value. They're "non fungible" because you can't just swap one NFT out for another from the same contract.
- NFTs are often used to represent artwork or other digital "assets".
- Storing data on the blockchain is incredibly expensive, so NFTs allow you to link to data that lives elsewhere using a "metadata URI"

-->

## How IPFS helps 

<!-- TODO

- Using traditional HTTP URLs for NFT metadata URIs is problematic because the owner of the website can change the content after the NFT is created.
  - e.g., https://cointelegraph.com/news/opensea-collector-pulls-the-rug-on-nfts-to-highlight-arbitrary-value
- IPFS prevents this using content addressing. An IPFS URI can only ever point to the content that was used to create it.
- IPFS also allows multiple people/organizations to store and provide the data, so the owner of an NFT can keep the data alive even if the original NFT platform that created it disappears. If the NFT data were stored in an S3 bucket and the creator decides to stop paying their AWS bill, the data just disappears. With IPFS, if anyone still has a copy on the network, the original provider isn't needed.

-->

## Minty 

To help explain how NFTs and IPFS can work together, we've created Minty - a simple command-line application to automatically _mint_ an NFT and pin it to IPFS using Pinata. 

Production NFT platforms are a fairly complex thing. As with any modern web application, there are lots of decisions to make surrounding the tech stack, user interface conventions, API design, and so on. Blockchain-enabled d-apps also need to interact with user wallets such as [Metamask](https://metamask.com], further increasing their complexity.

Since Minty was written to demonstrate the concepts and process of minting IPFS-backed NFTs, we don't need to get caught up in all the details of modern d-app development. Instead, Minty is a simple command-line app written in Javascript. 

### Install Minty

Let's get Minty installed so we can start playing around with NFTs! To install and run Minty, you must have NPM installed. Windows is not currently supported. Installation of Minty is fairly simple. Just download the GitHub repository, install the NPM dependencies, and start the local testnet environment. 

1. Clone this repository and move into the `minty` directory:

    ```shell
    git clone https://github.com/yusefnapora/minty
    cd minty
    ```

1. Install the NPM dependencies:

    ```shell
    npm install
    ```

1. Add the `minty` command to your `$PATH`. This step is optional, but it makes it easier to run Minty from anywhere on your computer:

    ```shell
    npm link
    ```

1. Run the `start-local-environment.sh` script to start the local Ethereum testnet and IPFS daemon:

    ```shell
    ./start-local-environment.sh

    > Compiling smart contract
    > Compiling 16 files with 0.7.3
    > ...
    ```

    This command continues to run. All further commands must be entered in another terminal window.

### Deploy the contract

Before running any of the other `minty` commands, you'll need to deploy an instance of the
smart contract:

```shell
minty deploy

> deploying contract for token Julep (JLP) to network "localhost"...
> deployed contract for token Julep (JLP) to 0x5FbDB2315678afecb367f032d93F642f64180aa3 (network: localhost)
> Writing deployment info to minty-deployment.json
```

This deploys to the network configured in [`hardhat.config.js`](./hardhat.config.js), which is set to the `localhost` network by default. If you get an error about not being able to reach the network, you started the local development network with `./start-local-environment.sh`.

When this contract is deployed, the address and other information about the deployment are written to `minty-deployment.json`. This file must be present for subsequent commands to work.

### Mint an NFT

Once you have the local Ethereum network and IPFS daemon running, minting an NFT is incredibly simple. Just specify what you want to _tokenize_, the name of the NFT, then add a description to tell users what the NFT is for.

#### Create something to mint

First, let's create something to mint. NFTs have a huge range of use-cases, and you can mint whatever you want! For this example, we're going to create a ticket for a flight to the moon!

1. Create a file called `flight-to-the-moon.txt`:

    ```shell
    touch ~/flight-to-the-moon.txt
    ```

1. Open the file and enter some flight information:

    ```
    THE INTERPLANETARY TRAVEL COMPANY
    ---------------------------------
    Departing: Cape Canaveral, Earth
    Arriving: Base 314, The Moon
    Boarding time: 17:30 UTC
    Seat number: 1A
    Baggage allowance: 5kg 
    ```

1. Save and close the file.

#### Mint the file

Now we're going to tokenize our ticket into an NFT. This process is often called _minting_.

1. Call the `mint` command and supply the file we want to mint, the name of our NFT, and a description:

    ```shell
    minty mint ~/flight-to-the-moon.txt --name "Moon Flight #1" --description "This ticket serves as proof-of-ownership of a first-class seat on a flight to the moon."

    > 🌿 Minted a new NFT:
    > Token ID:              1
    > Metadata URI:          ipfs://Qma4RRDu9Q5ZXb4F6HSPAHXeyinYYFuBMTrk7HbHrsbcN9/metadata.json
    > Metadata Gateway URL:  http://localhost:8080/ipfs/Qma4RRDu9Q5ZXb4F6HSPAHXeyinYYFuBMTrk7HbHrsbcN9/metadata.json
    > Asset URI:             ipfs://QmbwYvCrjnv9nKqagwYoniNzppf96za7BnateWD18mQnHX/flight-to-the-moon.txt
    > Asset Gateway URL:     http://localhost:8080/ipfs/QmbwYvCrjnv9nKqagwYoniNzppf96za7BnateWD18mQnHX/flight-to-the-moon.txt
    > NFT Metadata:
    > {
    >   "name": "Moon Flight #1",
    >   "description": "This ticket serves are proof-of-ownership of a first-class seat on a flight to the moon.",
    >   "image": "ipfs://QmbwYvCrjnv9nKqagwYoniNzppf96za7BnateWD18mQnHX/flight-to-the-moon.txt"
    > }
    ```

The `minty mint` command returns the id of the new token, some metadata containing the `name` and `description` we provided, and an IPFS URI to the file we used for our NFT asset. The `Metadata URI` in the output above is the IPFS URI for the NFT Metadata JSON object that's stored on IPFS.

Great! You've created your NFT, but it's only available to other people as long as you have your IPFS node running. If you shut down your computer or you lose your internet connection, then no one else will be able to view your NFT! To get around this issue, you should pin it to a pinning service.

### Pin your NFT

To make the data highly available without needing to run a local IPFS daemon 24/7, you can request that a remote pinning service, like [Pinata](https://pinata.cloud/), store a copy of your IPFS data on their IPFS nodes. You can link Pinata and Minty together by signing up to Pinata, getting an API key, and adding the key to Minty's configuration file.

#### Sign up to Pinata

You need to sign up to Pinata to use their API.

1. Head over to [pinata.cloud](https://pinata.cloud/).
1. Click **Sign up** and use your email address to create an account.

Pinata gives each user 1GB of free storage space, which is plenty for storing a few NFTs.

#### Get an API key

You need to grab an API key from Pinata. Your API key allows Minty to interact with your Pinata account automatically.

1. Log into Pinata and select **API keys** from the sidebar menu.
1. Click **New Key**.
1. Expand the **Pinning Services API** drop-down and select all the options under **Pins**:

    ![The permissions options available to API keys in Pinata.](./images/pinata-api-key-permissions.png)

1. Pinata will give you an _API key_, and _API secret_, and a _JWT_:

    ```
    API Key: 43537d17e88805007086
    API Secret: 492b24f041b9120cbf8e35a247fb686793231a3d89045f1046a4f5b2d2175082
    JWT: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJiZDQ3NjM1Ny1lYWRhLTQ1ZDUtYTVmNS1mM2EwZjRmZGZmYmEiLCJlbWFpbCI6InRhaWxzbm93QHByb3Rvbm1haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZX0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjQzNTM3ZDE3ZTg4ODA1MDA3MDg2Iiwic2NvcGVkS2V5U2VjcmV0IjoiNDkyYjI0ZjA0MWI5MTIwY2JmOGUzNWEyNDdmYjY4Njc5MzIzMWEzZDg5MDQ1ZjEwNDZhNGY1YjJkMjE3NTA4MiIsImlhdCI6MTYxNjAxMzExNX0.xDV9-cPwDIQInuiB0M--XiJ8dQwwDYMch4gJbc6ogXs
    ```

    We just need the `API Key` and `API Secret`. You can ignore the `JWT` for now.

<!-- TODO

Add steps to connect Minty to the Pinata API!

-->

### Deploying to a testnet

Take a look at the [Hardhat configuration docs](https://hardhat.org/config/) to learn how to configure a JSON-RPC node and deploy this contract to a testnet. Once you've added a new network to the Hardhat configuration, you can use it by setting the `HARDHAT_NETWORK` environment variable to the name of the new network when you run `minty` commands. Alternatively, you can change the `defaultNetwork` in `hardhat.config.js` to always prefer the new network.

Deploying this contract to the Ethereum mainnet is a bad idea since the contract itself lacks any access control. See the [Open Zeppelin article](https://docs.openzeppelin.com/contracts/3.x/access-control) about what access control is and why it's important to have.












## How everything works

So we minted an NFT, added it to an Ethereum blockchain, and hosted it on IPFS. Now we're going to dive into _exactly_ what the contract does and why. We're also going to explore the IPFS side of things and how the NFT itself is stored.

### The Minty Smart Contract

Minty uses a smart-contract written in [Solidity](https://soliditylang.org), the most popular language for Ethereum development.

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

One thing to notice is that we set the base URI prefix to `ipfs://` in the constructor. When we set a metadata URI for each token in the `mintToken` function, we don't need to store the prefix since the base contract's `tokenURI` accessor function will apply it to each token's URI.

It's important to note that this contract is **not production-ready** for most values of "production," because it doesn't include any [access controls](https://docs.openzeppelin.com/contracts/3.x/access-control) that limit which accounts are allowed to call the `mintToken` function. If you decide to develop a production platform based on Minty, please explore the access control patterns that are available and consider which should apply to your platform's access model.

#### Deploying the Contract

Before you can mint new NFTs, you need to deploy the contract to a blockchain network. Minty uses [HardHat](https://hardhat.org) to manage contract deployment, and by default, it deploys to an instance of the [HardHat development network](https://hardhat.org/hardhat-network) that's been [configured to run on your machine's localhost network](https://hardhat.org/hardhat-network/#connecting-to-hardhat-network-from-wallets-and-other-software).

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

To get the token id for our new NFT, we need to call `tx.wait()`, which waits until the transaction has been confirmed. The token id is wrapped inside a `Transfer` event, which is emitted by the base contract when a new token is created or transferred to a new owner.

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

To get the metadata URI for our smart contract, we first add the image data to IPFS to get an IPFS Content ID, or [CID][docs-cid], and use the CID to build an `ipfs://` URI. Then we create a JSON object containing the image URI, along with user-provided `name` and `description` fields. Finally, we add the JSON data to IPFS to create the metadata `ipfs://` URI and feed that into the smart contract.

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

We're adding our data to IPFS using a `path` argument with a directory structure, e.g., `/nft/metadata.json` instead of just `metadata.json`. This isn't strictly necessary, but it gives us more descriptive URIs that include human-readable filenames. On the downside, the metadata URI requires a bit more space on-chain since it includes the `/metadata.json` portion as well as the IPFS CID. In a production environment where bytes cost money, you may want to modify the smart contract to only store the CID portion and automatically append the filename before returning the URI or simply store metadata without a directory wrapper.


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

Using the `minty` command-line app, we can view a token using the `minty show <token-id>` command:

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

## Next Steps

<!-- TODO

Wrap up what we've covered, and go over what would be needed to build a real NFT platform:

- Convert the command line interface to a web API to support a web-based minting platform
- Add access controls to the smart contract, and set a policy for who is authorized to transfer tokens
- Maybe explain that users can use go-ipfs instead of an embedded js-ipfs by using `ipfs-http-client` instead of `ipfs-core`.

-->

<!-- TODO: move minty repo to ipfs-shipyard? -->
[minty-repo]: https://github.com/yusefnapora/minty
[minty-code-get-nft]: https://github.com/yusefnapora/minty/blob/39a3e79e01b4776372a08fa352c8fe508ffa9845/src/minty.js#L193-L212

[eip-721]: https://eips.ethereum.org/EIPS/eip-721
[docs-cid]: ../../concepts/content-addressing/

