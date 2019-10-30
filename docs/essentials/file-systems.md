---
title: File systems
---

# File systems and IPFS

Working with files in IPFS can be a little different than you're used to for several different reasons:

- Content addressing means that when files change, their addresses change, too
- Files may be too big to fit in a single block, so they need metadata to keep blocks together

MFS and UnixFS can help you address these new ways of thinking of files.

## Mutable File System (MFS)

Because files in IPFS are content-addressed and immutable, they can be complicated to edit. Mutable File System (MFS) is a tool built into IPFS that lets you treat files like you would a normal name-based filesystem — you can add, remove, move, and edit MFS files and have all the work of updating links and hashes taken care of for you.

MFS is accessed through the [`files`](/reference/api/cli/#ipfs-files) commands in the IPFS CLI and API.

<!-- TODO: add some examples to demonstrate how to use MFS, e.g. creating a directory, adding a file, checking the hash, editing the file, and checking the hash again. -->

This video also provides a good overview of MFS:

@[youtube](FX_AXNDsZ9k)

## UnixFS

A file in IPFS isn’t just content. It might be too big to fit in a single block, so it needs metadata to link all its blocks together. It might be a symlink or a directory, so it needs metadata to link to other files. UnixFS is the data format used to represent files and all their links and metadata in IPFS, and is loosely based on how files work in Unix. When you add a _file_ to IPFS, you are creating a block (or a tree of blocks) in the UnixFS format.

UnixFS is a [protocol-buffers](https://developers.google.com/protocol-buffers/)-based format. You can find the definitions for it [here](https://github.com/ipfs/go-unixfs/blob/master/pb/unixfs.proto).

_Note: we are currently designing an updated version of UnixFS that will be [IPLD](https://ipld.io)-compatible. You can follow along or participate [on GitHub](https://github.com/ipfs/unixfs-v2)._
