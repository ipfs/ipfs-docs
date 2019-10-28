---
title: File systems
---

# File systems and IPFS

## Mutable File System (MFS)

Because files in IPFS are content-addressed and immutable, they can be complicated to edit. Mutable File System (MFS) is a tool built into IPFS that lets you treat files like you would a normal name-based filesystem — you can add, remove, move, and edit MFS files and have all the work of updating links and hashes taken care of for you.

MFS is accessed through the [`files`](/reference/api/cli/#ipfs-files) commands in the IPFS CLI and API.

<!-- TODO: add some examples to demonstrate how to use MFS, e.g. creating a directory, adding a file, checking the hash, editing the file, and checking the hash again. -->

This video also provides a good overview of MFS:

<iframe width="560" height="315" src="https://www.youtube.com/embed/FX_AXNDsZ9k" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## UnixFS

A file in IPFS isn’t just content. It might be too big to fit in a single block, so it needs metadata to link all its blocks together. It might be a symlink or a directory, so it needs metadata to link to other files. UnixFS is the data format used to represent files and all their links and metadata in IPFS, and is loosely based on how files work in Unix. When you add a _file_ to IPFS, you are creating a block (or a tree of blocks) in the UnixFS format.

UnixFS is a [protocol-buffers](https://developers.google.com/protocol-buffers/)-based format. You can find the definitions for it at: https://github.com/ipfs/go-unixfs/blob/master/pb/unixfs.proto.

<!-- TODO: fill in and link to the UnixFS v1 spec or fill in more details about how it works here. -->

_Note: we are currently designing an updated version of UnixFS that will be [IPLD](https://ipld.io)-compatible. You can follow along or participate [on GitHub](https://github.com/ipfs/unixfs-v2)._
