---
title: Content addressing
legacyUrl: https://docs.ipfs.io/guides/concepts/cid/
description: Learn about how content addressing works and how content identifiers, or CIDs, play a crucial role in IPFS.
---

# Content addressing and CIDs

::: callout
For a deep dive into how Content Identifiers (CIDs) are constructed, take a look at ProtoSchool's tutorial on the [Anatomy of a CID](https://proto.school/anatomy-of-a-cid).
:::

[[toc]]

A _content identifier_, or CID, is a label used to point to material in IPFS. It doesn't indicate _where_ the content is stored, but it forms a kind of address based on the content itself. CIDs are short, regardless of the size of their underlying content.

CIDs are based on the content’s [cryptographic hash](/concepts/hashing/). That means:

- Any difference in the content will produce a different CID and
- The same content added to two different IPFS nodes using the same settings will produce _the same CID_.

IPFS uses the `sha-256` hashing algorithm by default, but there is support for many other algorithms. The [Multihash](https://multiformats.io/multihash/) project represents the work for this, with the aim of future-proofing applications' use of hashes and allowing multiple hash functions to coexist. (If you're curious about how hash types in IPFS are decided upon, you may wish to keep an eye on [this forum discussion](https://discuss.ipfs.io/t/who-decides-what-hashing-algorithms-ipfs-allows/6742).)

## Identifier formats

CIDs can take a few different forms with different encoding bases or CID versions. Many of the existing IPFS tools still generate v0 CIDs, although the `files` ([Mutable File System](/concepts/file-systems/#mutable-file-system-mfs)) and `object` operations now use CIDv1 by default.

### Version 0 (v0)

When IPFS was first designed, we used base 58-encoded multihashes as the content identifiers. This is simpler but much less flexible than newer CIDs. CIDv0 is still used by default for many IPFS operations, so you should generally support v0.

If a CID is 46 characters starting with "Qm", it's a CIDv0 (for more details, check the [decoding algorithm](https://github.com/ipld/cid/blob/ef1b2002394b15b1e6c26c30545fd485f2c4c138/README.md#decoding-algorithm) in the CID specification).

### Version 1 (v1)

CID v1 contains some leading identifiers that clarify exactly which representation is used, along with the content-hash itself. These include:

- A [multibase](https://github.com/multiformats/multibase) prefix, specifying the encoding used for the remainder of the CID
- A CID version identifier, which indicates which version of CID this is
- A [multicodec](https://github.com/multiformats/multicodec) identifier, indicating the format of the target content — it helps people and software to know how to interpret that content after the content is fetched

These leading identifiers also provide forward-compatibility, supporting different formats to be used in future versions of CID.

You can use the first few bytes of the CID to interpret the remainder of the content address and know how to decode the content after being fetched from IPFS. For more details, check out the [CID specification](https://github.com/ipld/cid). It includes a [decoding algorithm](https://github.com/ipld/cid/blob/ef1b2002394b15b1e6c26c30545fd485f2c4c138/README.md#decoding-algorithm) and links to existing software implementations for decoding CIDs.

If you can't decide between CIDv0 and CIDv1, consider choosing CIDv1 for your new project and opt in by passing a version flag (`ipfs add --cid-version 1`). This is more future-proof and [safe for use in browser contexts](/how-to/address-ipfs-on-web/#subdomain-gateway).

IPFS project will switch to CIDv1 as the new default in the near future.


## CID Inspector

It's easy to explore a CID for yourself. Want to pull apart a specific CID's multibase, multicodec, or multihash info? You can use the [CID Inspector](https://cid.ipfs.io/#QmY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa92pxnxjQuPU) or the [CID Info panel in IPLD Explorer](https://explore.ipld.io/#/explore/QmY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa92pxnxjQuPU) (both links launch using a sample CID) for an interactive breakdown of differently-formatted CIDs.

Check out ProtoSchool's [Anatomy of a CID](https://proto.school/anatomy-of-a-cid) tutorial to see how a single file can be represented in multiple CID versions.

## CID conversion

Converting from v0 to v1 enables CID to be represented in one of multibase encodings.
The default for CIDv1 is case-insensitive `base32`, but use of shorter `base36` is encouraged for IPNS names to ensure same text representation on [subdomains](/how-to/address-ipfs-on-web/#subdomain-gateway).

### v0 to v1

Built-in `ipfs cid format` command can be used on the CLI:

```
$ ipfs cid format -v 1 -b base32 QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR
bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi
```

JS users can also leverage `toV1()` method provided by the [`cids`](https://www.npmjs.com/package/cids) library:
```js
const CID = require('cids')
new CID('QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR').toV1().toString()
// → bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi
```

### Text to binary

CID can be represented as both text and a stream of bytes. The latter may be a better choice when speed and storage efficiency are important.

To convert CIDv1 from text to the binary form, simply read the first character
and then decode the remainder using encoding specified in the [multibase table](https://github.com/multiformats/multibase#multibase-table).

JS users can leverage the [`cids`](https://www.npmjs.com/package/cids) library to get binary version as `Uint8Array`:


```js
const CID = require('cids')
new CID('bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi').bytes
// → Uint8Array [ 1, 112,  18,  32, 195, 196, 115,  62, ... ]
```

::: warning Be mindful about parsing CID correctly and avoid shortcuts.

Unless you are the one who imported the data to IPFS, the length of a CID is not deterministic and depends on the length of the Multihash inside of it.

To illustrate, passing a custom hash function will produce CIDs of varying lengths:

```
$ ipfs add --cid-version 1 --hash sha2-256    -nq cat.jpg | wc -c
60
$ ipfs add --cid-version 1 --hash blake2b-256 -nq cat.jpg | wc -c
63
$ ipfs add --cid-version 1 --hash sha3-512    -nq cat.jpg | wc -c
111
```
:::


### CID to hex

Sometimes, a [hexadecimal](https://en.wikipedia.org/wiki/Hexadecimal) representation of raw bytes is prefered for debug purposes.
To get hex for raw `.bytes` of entire CID, one can use built-in support for `base16` encoding and skip the `f` (multibase prefix):

```javascript
> cid.toString('base16')
'f01701220c3c4733ec8affd06cf9e9ff50ffc6bcd2ec85a6170004bb709669c31de94391a'

> cid.toString('base16').substring(1)
'01701220c3c4733ec8affd06cf9e9ff50ffc6bcd2ec85a6170004bb709669c31de94391a' // "cid as hex"
```

To convert back to a CIDv1, prepend hex value with `f` ([multibase prefix](https://github.com/multiformats/multibase#multibase-table) for lowercase base16).
Use it as-is (it is a [valid CID](https://ipfs.io/ipfs/f01701220c3c4733ec8affd06cf9e9ff50ffc6bcd2ec85a6170004bb709669c31de94391a)), or convert to different multibase by passing it as an argument to `toString`:

```javascript
> new CID('f' +'01701220c3c4733ec8affd06cf9e9ff50ffc6bcd2ec85a6170004bb709669c31de94391a').toString('base32')
// → bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi
```

::: tip
[Subdomain gateways](/how-to/address-ipfs-on-web/#subdomain-gateway) convert paths with custom bases like base16 to base32 or base36 in effort to fit a CID in DNS label:
- [dweb.link/ipfs/f01701220c3c4733ec8affd06cf9e9ff50ffc6bcd2ec85a6170004bb709669c31de94391a](https://dweb.link/ipfs/f01701220c3c4733ec8affd06cf9e9ff50ffc6bcd2ec85a6170004bb709669c31de94391a)
  returns a HTTP 301 redirect:
  → [bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi.ipfs.dweb.link](https://bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi.ipfs.dweb.link/)
:::


## Further resources

Check out these links for more information on CIDs and how they work:

- [Core Course: How IPFS Deals With Files](https://www.youtube.com/watch?v=Z5zNPwMDYGg)
- [Files and IPFS Companion](https://www.youtube.com/watch?v=OCv5PvLnk-Y)
