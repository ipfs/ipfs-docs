---
title: Hashing
legacyUrl: https://docs.ipfs.io/guides/concepts/hashes/
description: Learn about cryptographic hashes and why they're critical to how IPFS, the InterPlanetary File System, works.
---

# Hashing

::: tip
If you're interested in how cryptographic hashes fit into how IPFS works with files in general, check out this video from IPFS Camp 2019! [Core Course: How IPFS Deals With Files](https://www.youtube.com/watch?v=Z5zNPwMDYGg)
:::

Cryptographic hashes are functions that take some arbitrary input and return a fixed-length value. The particular value depends on the given hash algorithm in use, such as [SHA-1](https://en.wikipedia.org/wiki/SHA-1) (used by git), [SHA-256](https://en.wikipedia.org/wiki/SHA-2), or [BLAKE2](<https://en.wikipedia.org/wiki/BLAKE_(hash_function)#BLAKE2>), but a given hash algorithm always returns the same value for a given input. Have a look at Wikipedia's [full list of hash functions](https://en.wikipedia.org/wiki/List_of_hash_functions) for more.

As an example, the input:

```
Hello world
```

would be represented by **SHA-1** as:

```
0x7B502C3A1F48C8609AE212CDFB639DEE39673F5E
```

However, the exact same input generates the following output using **SHA-256**:

```
0x64EC88CA00B268E5BA1A35678A1B5316D212F4F366B2477232534A8AECA37F3C
```

Notice that the second hash is longer than the first one. This is because SHA-1 creates a 160 bit hash, while SHA-256 creates a 256 bit hash. Also, the prepended `0x` is just an indicator that tells us that the following hash is represented as a base 16 (or hexadecimal) number.

Hashes can be represented in different bases (`base2`, `base16`, `base32`, etc.). In fact, IPFS makes use of that as part of its [content identifiers](/concepts/content-addressing/) and supports multiple base representations at the same time, using the [Multibase](https://github.com/multiformats/multibase) protocol.

For example, the SHA-256 hash of "Hello world" from above can be represented as base 32 as:

```
mtwirsqawjuoloq2gvtyug2tc3jbf5htm2zeo4rsknfiv3fdp46a
```

## Hashes are important

Cryptographic hashes come with a couple of very important characteristics:

- **deterministic** - the same input message always returns exactly the same output hash
- **uncorrelated** - a small change in the message should generate a completely different hash
- **unique** - it's infeasible to generate the same hash from two different messages
- **one-way** - it's infeasible to guess or calculate the input message from its hash

It turns out these features also mean we can use a cryptographic hash to identify any piece of data: the hash is unique to the data we calculated it from and it’s not too long (a hash is a fixed length, so the SHA-256 hash of a one-gigabyte video file is still only 32 bytes), so sending it around the network doesn't take up a lot of resources.

That's critical for a distributed system like IPFS, where we want to be able to store and retrieve data from many places. A computer running IPFS can ask all the peers it's connected to whether they have a file with a particular hash and, if one of them does, they send back the whole file. Without a short, unique identifier like a cryptographic hash, that wouldn't be possible. This technique is called [content addressing](/concepts/content-addressing/) — because the content itself is used to form an address, rather than information about the computer and disk location it's stored at.

## Content Identifiers are not file hashes

Hash functions are widely used as to check for file integrity. A download provider may publish the output of a hash function for a file. This hash is called the checksum of that file. The checksum enables downloaders of the file to verify that the file has not been altered since it was published. This check is done by performing the same hash function that was used to generate the checksum. If the local output matches the checksum, the file was not altered and can be trusted.

Let us look at a concrete example: When you download an image file for Ubuntu Linux you might see the following `SHA-256` checksum on the Ubuntu website listed for verification purposes:

```
0xB45165ED3CD437B9FFAD02A2AAD22A4DDC69162470E2622982889CE5826F6E3D ubuntu-20.04.1-desktop-amd64.iso
```

You can now verify the file integrity after the download of the file:

```
echo "b45165ed3cd437b9ffad02a2aad22a4ddc69162470e2622982889ce5826f6e3d *ubuntu-20.04.1-desktop-amd64.iso" | shasum -a 256 --check

ubuntu-20.04.1-desktop-amd64.iso: OK
```

Let us compare the checksum provided with the download of our file with the hash included in the CID. We can use `ipfs add` with the `-n`switch to create the CID for a file without adding it to IPFS:

```
ipfs add ubuntu-20.04.1-desktop-amd64.iso -n

added QmPK1s3pNYLi9ERiq3BDxKa4XosgWwFRQUydHUtz4YgpqB ubuntu-20.04.1-desktop-amd64.iso
 2.59 GiB / 2.59 GiB [==========================================================================================] 100.00%
```

The string `QmPK1s3pNYLi9ERiq3BDxKa4XosgWwFRQUydHUtz4YgpqB` returned by the `ipfs add` command is the content identifier of the file `ubuntu-20.04.1-desktop-amd64.iso`. The content identifier contains various information in on human readable format. We can utilize the [CID Inspector](https://cid.ipfs.io/) in order to see what the CID includes. The actual hash is listed under `DIGEST (HEX)`:

```
NAME: sha2-256
BITS: 256
DIGEST (HEX): 0E7071C59DF3B9454D1D18A15270AA36D54F89606A576DC621757AFD44AD1D2E
```

We can now check if the hash contained in the files CID actually equals the checksum for the file:

```
echo "0E7071C59DF3B9454D1D18A15270AA36D54F89606A576DC621757AFD44AD1D2E *ubuntu-20.04.1-desktop-amd64.iso" | shasum -a 256 --check

ubuntu-20.04.1-desktop-amd64.iso: FAILED
shasum: WARNING: 1 computed checksum did NOT match
```

::: tip
Please note that names of hash functions are not used consistently.`SHA-2`, `SHA-256` or `SHA-256 bit` are all referring to the same hash function.
::: tip

As we can see the hash included in the CID does NOT match the hash of the input file `ubuntu-20.04.1-desktop-amd64.iso`. To understand what the hash included in the CID actually is, we have to understand how IPFS stores files. IPFS stores files as a set of data chunks. A data structure called the DAG - or 'Directed Acyclic Graph' keeps track of which data chunks actually make up a certain file. The hash included in the CID identifies a node within the DAG. From this node all data chunks that represent our input file are linked and can thus be retrieved by IPFS.
