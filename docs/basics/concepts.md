---
title: "Concepts"
description: "Lorem ipsum."
draft: true
---

spelligggggg

<!-- 

THIS PAGE CURRENTLY JUST CONTAINS NOTES. 
IT IS NOT COMPLETE OR FINISHED BY ANY MEANS.

START HERE:
    HTTP: it's how your browser sends and receives files from the internet.
    IPFS: does the same thing, but with three major changes:
        - it doesn't send "files" it sends blocks/chunks of data.
        - locates data based on it's fingerprint, rather than the location.
            - as a consequence IPFS doesn't rely on a central server to get data.

# Concepts

Lorem ipsum.

## This replaces HTTP

- IPFS is a protocol.
- What HTTP is.
  - Super basic overview of how it works
- How IPFS is different.

## CIDs

- Creates an identifier that is mutable and verifiable.
  - Built in security because content gets verified as soon as it's downloaded. Kinda.
- CIDs are kinda like a fingerprint of your data. They're not an exact MD5 hash or anything like that, but they're a hash-of-hashes (we don't really need to dive into this too deeply).

## Can't delete stuff

- Since we're dealing with _servers_ and replication, deleting something gets a bit tricky.
- This works in the same way that it's difficult to truely and verifiably delete something of a regular web server if it's been duplicated by even just a single user.

## Nodes

- What they are.
- How they find each other.
    - DHT stuff

## Negative bandwidth scalling

- The more users you have accessing a regular server, the slower each users experience is gonna be.
- IPFS works the opposite way. 
- The more users accessing data, the fastest it is for other users to access that data.

## IPFS is not a blockchain.

- It's not.

-->
