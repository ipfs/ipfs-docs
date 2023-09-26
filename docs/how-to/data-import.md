---
title: Data import in Kubo
description: IPFS nodes can be customized using the configuration file. The default values should be fine for most use-cases. However, you may want to make some changes if you are running a specialized IPFS node, or simply want to tweak things to your liking.
---

# Options and tradeoffs around data import in Kubo

IPFS Kubo commands has multiple data import commands, which are as follows:

- `ipfs add`
- `ipfs dag put`
- `ipfs block put` 

While many users are ok with the default chunker and has functions for these commands, the `ipfs add` supports a much wider range of options:

- Custom `--chunker` and `--hash` functions
- Using a `TrickleDAG` instead a MerkleDAG with the `--trickle` option
- `--raw-leaves`

## Defaults

### Chunk size

The current default chunk size is `256` * `1024` bytes, or `262144` bytes.

### Chunking algorithmn



## Options 

### --trickle

The `--trickle` (`-t`) option changes to the default DAG type from MerkleDAG to TrickleDAG. Unlike a MerkleDAG, which uses a tree structure, a TrickleDAG is structured as a list of lists.

As such, TrickleDAGs are optimized for reading data in sequence, whereas MerkleDAGs are optimized for random access.

### --chunker

The `--chunker` (`-s`) option  dictates the chunking strategy; in other words, how to break files into blocks. Blocks with same content can
be deduplicated. Different chunking strategies will produce different
hashes for the same file. The default is a fixed block size of
256 * 1024 bytes, 'size-262144'. Alternatively, you can use the
Buzhash or Rabin fingerprint chunker for content defined chunking by
specifying buzhash or rabin-[min]-[avg]-[max] (where min/avg/max refer
to the desired chunk sizes in bytes), e.g. 'rabin-262144-524288-1048576'.

The following examples use very small byte sizes to demonstrate the
properties of the different chunkers on a small file. You'll likely
want to use a 1024 times larger chunk sizes for most files.

  > ipfs add --chunker=size-2048 ipfs-logo.svg
  added QmafrLBfzRLV4XSH1XcaMMeaXEUhDJjmtDfsYU95TrWG87 ipfs-logo.svg
  > ipfs add --chunker=rabin-512-1024-2048 ipfs-logo.svg
  added Qmf1hDN65tR55Ubh2RN1FPxr69xq3giVBz1KApsresY8Gn ipfs-logo.svg

You can now check what blocks have been created by:

  > ipfs object links QmafrLBfzRLV4XSH1XcaMMeaXEUhDJjmtDfsYU95TrWG87
  QmY6yj1GsermExDXoosVE3aSPxdMNYr6aKuw3nA8LoWPRS 2059
  Qmf7ZQeSxq2fJVJbCmgTrLLVN9tDR9Wy5k75DxQKuz5Gyt 1195
  > ipfs object links Qmf1hDN65tR55Ubh2RN1FPxr69xq3giVBz1KApsresY8Gn
  QmY6yj1GsermExDXoosVE3aSPxdMNYr6aKuw3nA8LoWPRS 2059
  QmerURi9k4XzKCaaPbsK6BL5pMEjF7PGphjDvkkjDtsVf3 868
  QmQB28iwSriSUSMqG2nXDTLtdPHgWb4rebBrU7Q1j4vxPv 338

Finally, a note on hash determinism. While not guaranteed, adding the same
file/directory with the same flags will almost always result in the same output
hash. However, almost all of the flags provided by this command (other than pin,
only-hash, and progress/status related flags) will change the final hash.