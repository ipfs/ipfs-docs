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

The Interplanetary Linked Data (IPLD) model is a set of [specifications](https://github.com/ipld/specs) that unifies all data models that link data with hashes. This allows for interoperable protocols. For example, you can reference a GitHub commit to a Bitcoin transaction.

IPFS, Bitcoin and other applications use hash-linked data structures ([Merkle trees](https://docs-beta.ipfs.io/concepts/merkle-dag/)) to verify data integrity. However, each protocol has a slightly different format. IPLD's goal is to provide a hash-chain format for distributed data structures.

IPLD concerns itself with the data layer of the distributed web. It beings with how data is encoded and decoded. IPLD's [Data Model](https://github.com/ipld/specs) includes standard types such as booleans, integers, lists, etc., which are easily representable by common programming languages.

## Where does IPLD fit in?

IPLD acts as a layer between networking protocols and higher-level applications. This enables developers to build decentralized applications without having to worry about lower-level changes.

![](https://gateway.ipfs.io/ipfs/QmXgrfpCcSFfXnXqSz6G3V9E21pTZdBmVdsBQCkr86kHXP)

## The IPLD layer model

The IPLD specifications are divided into [layers](https://github.com/ipld/specs#ipld-layer-model):

0. **Block layer:** The block layer contains the content identifier (CID), which is used to self-describe the multibase-prefix, version, content type and content address. This takes the guessing out of encoding/decoding.
1. **Data model layer:** This layer describes what is representable in IPLD (lists, booleans, maps, etc). Here are all of the [kinds](https://github.com/ipld/specs/blob/master/data-model-layer/data-model.md#kinds).
2. **Schema layer:** The schema layer uses the data model layer to build more complex layouts.

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

## Example: Path traversal

This example will create a simple link from a node to a Git commit. The example will use the CLI, but this can be done in many other ways (for example, using [JavaScript](https://github.com/ipfs/js-ipfs-http-client)).

1. Pick a Git CID. This example will use [explorer.ipld.io](https://explore.ipld.io/#/explore/z8mWaJHXieAVxxLagBpdaNWFEBKVWmMiE). The goal is to create a node that links to this CID:

```
z8mWaJHXieAVxxLagBpdaNWFEBKVWmMiE
```

2. Start the IPFS daemon.

```bash
$ ipfs daemon
```

2. Create some data. Notice how this data stores the Git CID.

```bash
$ echo '{ "message": "linking to git commit", "files": [{ "/": "z8mWaJHXieAVxxLagBpdaNWFEBKVWmMiE" }] }' > test.json
$ cat test.json
{ "message": "linking to git commit", "files": [{ "/": "z8mWaJHXieAVxxLagBpdaNWFEBKVWmMiE" }] }}
```

3. Store an IPLD format node using the [put](https://docs.ipfs.io/reference/api/cli/#ipfs-dag-put) command.

```bash
$ ipfs dag put test.json
bafyreifsnd635mi5ratse2mzg3wget4afcwf2tsop4lymbxtj27tfgizia
```

4. From here, use the CID provided to get an IPLD-format node.

```bash
$ ipfs dag get bafyreifsnd635mi5ratse2mzg3wget4afcwf2tsop4lymbxtj27tfgizia
{"files":[{"/":"baf4bcfg4ep767tjp5lxyanx5urpjjgx5q2volvy"}],"message":"linking to git commit"}
```

5. Finally, traverse through to access the Git commit.

```bash
$ ipfs dag get bafyreifsnd635mi5ratse2mzg3wget4afcwf2tsop4lymbxtj27tfgizia/files/0/
{"author":{"date":"1524708555 +0200","email":"magik6k@users.noreply.github.com","name":"Łukasz Magiera"},"committer":{"date":"1524708555 +0200","email":"noreply@github.com","name":"GitHub"},"message":"Merge pull request #31 from ipfs-shipyard/feat/zip-button\n\nDownload Zip button","other":[" "],"parents":[{"/":"baf4bcfcjvhadrgzmwjflz25kyyc3tolmqaobvfy"},{"/":"baf4bcfcfa2xemiceossebsosuxsi77m5ztatwci"}],"signature":{"Text":" \n wsBcBAABCAAQBQJa4TTLCRBK7hj4Ov3rIwAAdHIIAFIOYsbNvoXO+N7d1pnhR6Ue\n qE2qLrldXeGI+04k3i0rmL8/YAi3zavCA1F1VfjSxX8nYsdYWmjljURiDL07y+5K\n RDxsdHPvf8GUN04rO3mVbCISAme3okGMdrn+hfEdZVdwGdUFva0vtegMWDvnADnY\n si6kURUTONywkNLLHsUD6kPUk2YEZuruaSWblGQwS1ejGzfPo7n4z/ScotC/XxFP\n SCj93XLLlh6HBhh4huJgr2HA/13Tg4XLW5+DnE1mIs3FA0cCQ2WGZCbXEugX/+xv\n u0UWyVv7o8xWt0SJeAFpOLDy7MhCpETJsQ0sFe6Mte6plzsa4vM8/Rq+nI5TzoU=\n =RYjo\n"},"tree":{"/":"baf4bcfcqex3wt5ajfg3lynpufxpiivqt5nxlmxy"}}"
```

Congratulations! We successfuly linked a node with CID `bafyreifsnd...` to `z8mWaJHXieA...`.

## IPLD and "The Merkle Forrest"

The heart of IPLD is to unify data models. Links can be traversed across protocols, opening endless possibilities. Imagine having an Ethereum contract referencing data on IPFS. Or having a torrent file link to Zcash. Instead of having one large Merkle tree like bitcoin and Ethereum, IPFS uses IPLD to unite the many Merkle trees to what is coined as the Merkle Forrest. 🌳🌲🌴
