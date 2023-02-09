---
title: Updating CIDs
sidebarDepth: 0
---

# Updating CIDs
 
You can update IPFS Content IDentifiers (CIDs) by creating a pointer to IPNS or by using a smart contract. Each method is described below.

## Using IPNS to create pointers to CIDs

To avoid the pitfalls of immutability and ensure that CIDs accurately reflect the current state of content, developers can use IPNS to create pointers to CIDs that can be updated. Instead of updating the CID itself, developers can update the IPNS address, which points to the current CID. This allows users to reference a stable, fixed IPNS address while still being able to access the latest version of the content. Learn more about IPNS [here](ipns.md).

## Using smart contracts to manage CIDs

Another approach is to use smart contract logic to manage the CIDs in an application. For example, if your application receives a CID from a smart contract, you can use smart contract functions to update the CID given to users. This allows you to change the CID without breaking the integrity of the content.

First, you will need a smart contract that manages the CID for the content you want to update. This contract should have a function that constructs the `tokenURI` for the content, using the `baseURI` stored in the contract's storage. For example:

```py
def tokenURI(this, tokenID: uint256) -> string:
    return this.baseURI + str(tokenID) + ".json"
```

This function returns a `tokenURI`. It will look something along the lines of `ipfs://Qmfoo/1234.json`, where _1234_ is the `tokenID` for the content.

Next, you will need to add a setter function to the contract that allows the `baseURI` to be updated. This function should only be accessible to the contract owner to ensure that only authorized users can update the CID. For example:

```py
def setBaseURI(this, newBaseURI: string):
    require(msg.sender == this.owner)
    this.baseURI = newBaseURI
```

To use this function, you can call it from your contract's code or interact with it using a tool like Remix.
For example, to update the `baseURI` to `ipfs://Qmbar/`, you could use the following code:

```shell
contract.setBaseURI("ipfs://Qmbar/")
```

This will update the `baseURI` in the contract's storage, and the `tokenURI` function will now return `ipfs://Qmbar/1234.json` instead of `ipfs://Qmfoo/1234.json`.

This is one way you can use smart contract logic to manage CIDs, without changing the CID itself. This allows you to ensure that the CID accurately reflects the current state of the content and enables users to access the latest version of the content using a stable, fixed `tokenURI`.
