---
title: Work with blocks
meta:
  - name: twitter:title
    content: IPFS Docs - page title
  - property: og:title
    content: IPFS Docs - page title
  - itemprop: name
    content: IPFS Docs - page title
  - name: description
    content: description of this page less than 150 char
  - name: twitter:description
    content: description of this page less than 150 char
  - property: og:description
    content: description of this page less than 150 char
---

# Work with blocks

The `ipfs add` command will create a Merkle DAG out of the data in the files you specify. It follows the [unixfs data format](https://github.com/ipfs/go-unixfs/blob/master/pb/unixfs.proto) when doing this. This means that your files are broken down into blocks, and then arranged in a tree-like structure using 'link nodes' to tie them together. A given file's 'hash' is actually the hash of the root (uppermost) node in the DAG. For a given DAG, you can easily view the sub-blocks under it with `ipfs ls`.

For example:

```bash
# Ensure this file is larger than 256k.
ipfs add alargefile
ipfs ls thathash
```

The above command should print out something like:

```bash
ipfs@earth ~> ipfs ls qms2hjwx8qejwm4nmwu7ze6ndam2sfums3x6idwz5myzbn
> qmv8ndh7ageh9b24zngaextmuhj7aiuw3scc8hkczvjkww 7866189
> qmuvjja4s4cgyqyppozttssquvgcv2n2v8mae3gnkrxmol 7866189
> qmrgjmlhlddhvxuieveuuwkeci4ygx8z7ujunikzpfzjuk 7866189
> qmrolalcquyo5vu5v8bvqmgjcpzow16wukq3s3vrll2tdk 7866189
> qmwk51jygpchgwr3srdnmhyerheqd22qw3vvyamb3emhuw 5244129
```

This shows all of the immediate sub-blocks of your file, as well as the size of them and their children on the disk.

## What to do with blocks

If you feel adventurous, you can get a lot of different information out of these different blocks. You can use the sub-block hashes as input to `ipfs cat` to see only the data in any given sub-tree (the data of that block and its children). To see just the data of a given block and not its children, use `ipfs block get`. But be careful, as `ipfs block get` on an intermediate block will print out the raw binary data of its DAG structure to your screen.

The command `ipfs block stat` will tell you the exact size of a given block (without its children), and `ipfs refs` will tell you all the children of that block. Similarly, `ipfs ls` or `ipfs object links` will show you all children and their sizes. `ipfs refs` is a more suitable command for scripting something to run on each child block of a given object.

## Blocks vs objects

In IPFS, a block refers to a single unit of data, identified by its key (hash). A block can be any sort of data, and does not necessarily have any sort of format associated with it. An object, on the other hand, refers to a block that follows the Merkle DAG protobuf data format. It can be parsed and manipulated via the `ipfs object` command. Any given hash may represent an object or a block.

## Create a block from scratch

Creating your own blocks is easy! Simply put your data in a file and run `ipfs block put <yourfile>` on it. Or you can pipe your file data into `ipfs block put`, like so:

```bash
echo "This is some data" | ipfs block put
> QmfQ5QAjvg4GtA3wg3adpnDJug8ktA1BxurVqBD8rtgVjM

ipfs block get QmfQ5QAjvg4GtA3wg3adpnDJug8ktA1BxurVqBD8rtgVjM
> This is some data
```

Note: When making your own block data, you won't be able to read the data with `ipfs cat`. This is because you are inputting raw data without the unixfs data format. To read raw blocks, use `ipfs block get` as shown in the example.
