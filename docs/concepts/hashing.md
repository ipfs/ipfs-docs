---
title: Hashing
legacyUrl: https://docs.ipfs.io/guides/concepts/hashes/
description: Learn about cryptographic hashes and why they're critical to how IPFS, the InterPlanetary File System, works.
---

# Hashing

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

Notice that the second hash is longer than the first one. This is because SHA-1 creates a 160-bit hash, while SHA-256 creates a 256-bit hash. The prepended `0x` indicates that the following hash is represented as a hexadecimal number.

Hashes can be represented in different bases (`base2`, `base16`, `base32`, etc.). In fact, IPFS makes use of that as part of its [content identifiers](content-addressing.md) and supports multiple base representations at the same time, using the [Multibase](https://github.com/multiformats/multibase) protocol.

For example, the SHA-256 hash of "Hello world" from above can be represented as base 32 as:

```
mtwirsqawjuoloq2gvtyug2tc3jbf5htm2zeo4rsknfiv3fdp46a
```

::: tip
If you're interested in how cryptographic hashes fit into how IPFS works with files in general, check out this video from IPFS Camp 2019! [Core Course: How IPFS Deals With Files](https://www.youtube.com/watch?v=Z5zNPwMDYGg)
:::

## Important hash characteristics

Cryptographic hashes come with a couple of very important characteristics:

- **deterministic** - the same input message always returns exactly the same output hash
- **uncorrelated** - a small change in the message should generate a completely different hash
- **unique** - it's infeasible to generate the same hash from two different messages
- **one-way** - it's infeasible to guess or calculate the input message from its hash

These features also mean we can use a cryptographic hash to identify any piece of data: the hash is unique to the data we calculated it from and it's not too long so sending it around the network doesn't take up a lot of resource. A hash is a fixed length, so the SHA-256 hash of a one-gigabyte video file is still only 32 bytes.

That's critical for a distributed system like IPFS, where we want to be able to store and retrieve data from many places. A computer running IPFS can ask all the peers it's connected to whether they have a file with a particular hash and, if one of them does, they send back the whole file. Without a short, unique identifier like a cryptographic hash, this kind of [content addressing](content-addressing.md) wouldn't be possible.

## Example: Content Identifiers are not file hashes

Hash functions are widely used to check for file integrity. Because IPFS splits content into blocks and verifies them through [directed acyclic graphs (DAGs)](../concepts/merkle-dag.md), SHA file hashes won't match CIDs. Here's an example of what will happen if you try to do that.

A download provider may publish the output of a hash function for a file, often called a _checksum_. The checksum enables users to verify that a file has not been altered since it was published. This check is done by performing the same hash function against the downloaded file that was used to generate the checksum. If that checksum that the user receives from the downloaded file exactly matches the checksum on the website, then the user knows that the file was not altered and can be trusted.

Let's look at a concrete example. When you download an image file for [Ubuntu Linux](https://ubuntu.com/) you might see the following `SHA-256` checksum on the Ubuntu website listed for verification purposes:

```
0xB45165ED3CD437B9FFAD02A2AAD22A4DDC69162470E2622982889CE5826F6E3D ubuntu-20.04.1-desktop-amd64.iso
```

After downloading the Ubuntu image, you can verify the integrity of the file by hashing the file to make sure the checksums match:

```shell
echo "b45165ed3cd437b9ffad02a2aad22a4ddc69162470e2622982889ce5826f6e3d *ubuntu-20.04.1-desktop-amd64.iso" | shasum -a 256 --check

ubuntu-20.04.1-desktop-amd64.iso: OK
```

If we add the `ubuntu-20.04.1-desktop-amd64.iso` file to IPFS we receive a hash as an output:

```shell
ipfs add ubuntu-20.04.1-desktop-amd64.iso

added QmPK1s3pNYLi9ERiq3BDxKa4XosgWwFRQUydHUtz4YgpqB ubuntu-20.04.1-desktop-amd64.iso
 2.59 GiB / 2.59 GiB [==========================================================================================] 100.00%
```

The string `QmPK1s3pNYLi9ERiq3BDxKa4XosgWwFRQUydHUtz4YgpqB` returned by the `ipfs add` command is the content identifier (CID) of the file `ubuntu-20.04.1-desktop-amd64.iso`. We can use the [CID Inspector](https://cid.ipfs.io/) to see what the CID includes. The actual hash is listed under `DIGEST (HEX)`:

```
NAME: sha2-256
BITS: 256
DIGEST (HEX): 0E7071C59DF3B9454D1D18A15270AA36D54F89606A576DC621757AFD44AD1D2E
```

::: tip
The names of hash functions are not used consistently.`SHA-2`, `SHA-256` or `SHA-256 bit` all refer to the same hash function.
:::

We can now check if the hash contained in the CID equals the checksum for the file:

```shell
echo "0E7071C59DF3B9454D1D18A15270AA36D54F89606A576DC621757AFD44AD1D2E *ubuntu-20.04.1-desktop-amd64.iso" | shasum -a 256 --check

ubuntu-20.04.1-desktop-amd64.iso: FAILED
shasum: WARNING: 1 computed checksum did NOT match
```

As we can see, the hash included in the CID does NOT match the hash of the input file `ubuntu-20.04.1-desktop-amd64.iso`.

As we can see, the hash included in the CID does not match the hash of the input file ubuntu-20.04.1-desktop-amd64.iso. To understand what the hash contained in the CID is, we must understand how IPFS stores files. IPFS uses a directed acyclic graph (DAG) to keep track of all the data stored in IPFS. A CID identifies one specific node in this graph. This identifier is the result of hashing the node's contents using a cryptographic hash function like SHA256.
