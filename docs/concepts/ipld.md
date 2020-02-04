---
title: IPLD
sidebarDepth: 0
issueUrl: https://github.com/ipfs/docs/issues/86
description: Learn about the InterPlanetary Linked Data (IPLD) model and how it forms an important ingredient in IPFS.
related:
  'IPLD home page': https://ipld.io/
  'IPLD CID explorer': https://explore.ipld.io/#/explore/QmY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa92pxnxjQuPU
  'IPLD specifications': https://github.com/ipld/specs
---

# The InterPlanetary Linked Data (IPLD) model

The Interplanetary Linked Data (IPLD) model is a single namespace for all hash-inspired protocols. This allows for interoperable data formats. For example, you can reference a Git commit to a Bitcoin transaction.

As mentioned in the [specifications](https://github.com/ipld/specs), the goal of IPLD is to enable decentralized data-structures that are universally addressable and linkable which in turn will enable more decentralized applications. These data-structures allow us to do for data what URLs and links did for HTML web pages.

IPFS, Bitcoin and other applications use hash-linked data structures ([Merkle trees](https://docs-beta.ipfs.io/concepts/merkle-dag/)) to verify data integrity. However, each protocol has a very different format. IPLD's goal is to provide a data layer definition that allows linking different content-addressed data types.

## Where does IPLD fit in?

IPLD acts as a layer between networking protocols and higher-level applications. This enables developers to build decentralized applications without having to worry about lower-level changes.

![](https://gateway.ipfs.io/ipfs/QmXgrfpCcSFfXnXqSz6G3V9E21pTZdBmVdsBQCkr86kHXP)

## The IPLD layer model

The IPLD specifications are divided into [layers](https://github.com/ipld/specs#ipld-layer-model):

0. **Block layer:** The block layer contains the content identifier (CID), which is used to self-describe the multibase-prefix, version, content type and content address. This takes the guessing out of encoding/decoding.
1. **Data model layer:** This layer describes what is representable in IPLD (lists, booleans, maps, etc). Here are all of the [kinds](https://github.com/ipld/specs/blob/master/data-model-layer/data-model.md#kinds).
1. **Schema layer:** The schema layer uses the data model layer to build more complex layouts.

Below is the simplified hierarchy:

```
┌──────────────────────────────────────────────────┐
│                                                  │
│                   2. Schema layer                │
│ (advanced types for multi-block data structures) │
│                                                  │
├──────────────────────────────────────────────────┤
│                                                  │
│                 1. Data model layer              │
│  (basic types for single-block data structures)  │
│                                                  │
├──────────────────────────────────────────────────┤
│                                                  │
│                   0. Block layer                 │
│               (CID, data, codec)                 │
│                                                  │
└──────────────────────────────────────────────────┘
```

## IPLD and "The Merkle Forest"

The heart of IPLD is to unify data models. Links can be traversed across data formats, opening endless possibilities. Imagine having an Ethereum contract referencing data on IPFS. Or having a torrent file link to Zcash. Instead of having one large Merkle tree, as with Bitcoin and Ethereum, IPFS uses IPLD to unite the many Merkle trees into what is coined as the Merkle Forest. 🌳🌲🌴

## Further resources

For some examples, you many want to check out the interactive ProtoSchool tutorial [P2P Data Links with Content Addressing](https://proto.school/#/basics/) or learn how to [resolve through IPLD graphs with the dag API](https://github.com/ipfs/js-ipfs/tree/master/examples/traverse-ipld-graphs).

For more information, you may want to check out the [IPLD explorer](https://explore.ipld.io/) and Juan Benet's [Enter the Merkle Forest](https://www.youtube.com/watch?v=Bqs_LzBjQyk&t=2s).
