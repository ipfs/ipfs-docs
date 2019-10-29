---
title: Content addressing
---

# Content addressing and CIDs

A _content identifier_, or CID, is a label used to point to material in IPFS. It doesn't indicate _where_ the content is stored, but it forms a kind of address based on the content itself. CIDs are short, regardless of the size of their underlying content.

CIDs are based on the content’s [cryptographic hash](/essentials/hashing/). That means:

- Any difference in content will produce a different CID and
- The same piece of content added to two different IPFS nodes using the same settings will produce _exactly the same CID_.

## CID formats

CIDs can take a few different forms with different encoding bases or CID versions. Many of the existing IPFS tools still generate v0 CIDs, although the `files` ([Mutable File System](/essentials/file-systems/#mutable-file-system-mfs)) and `object` operations now use CIDv1 by default.

### Version 0

When IPFS was first designed, we used base 58-encoded multihashes as the content identifiers (This is simpler, but much less flexible than newer CIDs). CIDv0 is still used by default for many IPFS operations, so you should generally try to support v0.

If a CID is 46 characters starting with "Qm", it's a CIDv0 (for more details, check the [decoding algorithm](https://github.com/ipld/cid/blob/ef1b2002394b15b1e6c26c30545fd485f2c4c138/README.md#decoding-algorithm) in the CID specification).

### Version 1

CID v1 contains some leading identifiers that clarify exactly which representation is used, along with the content-hash itself. These include:

- A [multibase](https://github.com/multiformats/multibase) prefix, specifying the encoding used for the remainder of the CID
- A CID version identifier, which indicates which version of CID this is
- A [multicodec](https://github.com/multiformats/multicodec) identifier, indicating the format of the target content — it helps people and software to know how to interpret that content after the content is fetched

These leading identifiers also provide forward-compatibility, supporting different formats to be used in future versions of CID.

You can use the first few bytes of the CID to interpret the remainder of the content address and know how to decode the content after it's fetched from IPFS. For more details, check out the [CID specification](https://github.com/ipld/cid). It includes a [decoding algorithm](https://github.com/ipld/cid/blob/ef1b2002394b15b1e6c26c30545fd485f2c4c138/README.md#decoding-algorithm) and links to existing software implementations for decoding CIDs.

## CID Inspector

It's easy to explore a CID for yourself. Want to pull apart a specific CID's multibase, multicodec, or multihash info? You can use the [CID Inspector](https://cid.ipfs.io/#QmY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa92pxnxjQuPU) or the [CID Info panel in IPLD Explorer](https://explore.ipld.io/#/explore/QmY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa92pxnxjQuPU) (both links launch using a sample CID) for an interactive breakdown of differently-formatted CIDs.
