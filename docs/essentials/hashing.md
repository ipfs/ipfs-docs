---
title: Hashing
---

# Cryptographic hashing

::: warning
This draft content ported from the legacy docs site may contain broken links and other errors. (Please remove this alert once content has been reviewed.)
:::

Hashes are functions that take some arbitrary input and return a fixed-length value. The particular value depends on the given hash algorithm in use, such as [SHA-1](https://en.wikipedia.org/wiki/SHA-1) (used by Git), [SHA-256](https://en.wikipedia.org/wiki/SHA-2), or [BLAKE2](<https://en.wikipedia.org/wiki/BLAKE_(hash_function)#BLAKE2>), but a given hash algorithm always returns the same value for a given input. Have a look at the [full list of hash functions](https://en.wikipedia.org/wiki/List_of_hash_functions) for more.

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

Hashes can be represented in different bases (`base2`, `base16`, `base32`, etc.). In fact, IPFS makes use of that as part of its [Content Identifiers](cid.md) and supports mulitiple base representations at the same time, using the [Multibase](https://github.com/multiformats/multibase) protocol.

For example, the SHA-256 hash of "Hello World" from above can be represented as base 32 as:

```
mtwirsqawjuoloq2gvtyug2tc3jbf5htm2zeo4rsknfiv3fdp46a
```

## Characteristics of cryptographic hashes

Cryptographic hashes come with a couple of very important characteristics:

- **deterministic** - the same input message always returns exactly the same output hash
- **uncorrelated** - a small change in the message should generate a completely different hash
- **unique** - it's infeasible to generate the same hash from two different messages
- **one-way** - it's infeasible to guess or calculate the input message from its hash

It turns out these features also mean we can use a cryptographic hash to identify any piece of data: the hash is unique to the data we calculated it from and it’s not too long (a hash is a fixed length, so the SHA-256 hash of a 1 Gigabyte video file is still only 32 bytes), so sending it around the network doesn't take up a lot of resources.

That's critical for a distributed system like IPFS, where we want to be able to store and retrieve data from many places. A computer running IPFS can ask all the peers it's connected to whether they have a file with a particular hash and, if one of them does, they send back the whole file. Without a short, unique identifier like a cryptographic hash, that wouldn't be possible. This technique is called “content addressing” — because the content itself is used to form an address, rather than information about the computer and disk location it's stored at.
