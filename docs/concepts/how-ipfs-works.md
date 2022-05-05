---
title: How IPFS works
legacyUrl: https://docs.ipfs.io/introduction/how-ipfs-works/
description: Learn how the InterPlanetary File System (IPFS) works and why it's an essential part of the future internet.
---

# How IPFS works

::: tip
Want to see a video recap of how IPFS works with files in general? Check out this content from IPFS Camp 2019! [Core Course: How IPFS Deals With Files](https://www.youtube.com/watch?v=Z5zNPwMDYGg)
:::

IPFS is a peer-to-peer (p2p) storage network. Content is accessible through peers located anywhere in the world, that might relay information, store it, or do both. IPFS knows how to find what you ask for using its content address rather than its location.

There are three fundamental principles to understanding IPFS:

1. Unique identification via content addressing
2. Content linking via directed acyclic graphs (DAGs)
3. Content discovery via distributed hash tables (DHTs)

These three principles build upon each other to enable the IPFS ecosystem. Let's start with _content addressing_ and the unique identification of content.

## Content addressing

IPFS uses _content addressing_ to identify content by what's in it rather than by where it's located. Looking for an item by content is something you already do all the time. For example, when you look for a book in the library, you often ask for it by the title; that's content addressing because you're asking for _what_ it is. If you were using location addressing to find that book, you'd ask for it by _where_ it is: "I want the book that's on the second floor, first stack, third shelf from the bottom, four books from the left." If someone moved that book, you'd be out of luck!

That problem exists for the internet and on your computer! Right now, content is found by location, such as:

- `https://en.wikipedia.org/wiki/Aardvark`
- `/Users/Alice/Documents/term_paper.doc`
- `C:\Users\Joe\My Documents\project_sprint_presentation.ppt`

By contrast, every piece of content that uses the IPFS protocol has a [_content identifier_](content-addressing.md), or CID, that is its _hash_. The hash is unique to the content that it came from, even though it may look short compared to the original content. If hashes are new to you, check out our [guide to cryptographic hashing](hashing.md) for an introduction.

Many distributed systems use content addressing through hashes as a means for not just identifying content, but also linking it together — everything from the commits that back your code to the blockchains that run cryptocurrencies leverage this strategy. However, the underlying data structures in these systems are not necessarily interoperable.

This is where the [Interplanetary Linked Data (IPLD) project](https://ipld.io/) comes in. IPLD translates between hash-linked data structures, allowing for the unification of the data across distributed systems. IPLD provides libraries for combining pluggable modules (parsers for each possible type of IPLD node) to resolve a path, selector, or query across many linked nodes, allowing you to explore data regardless of the underlying protocol. IPLD provides a way to translate between content-addressable data structures: _"Oh, you use Git-style, no worries, I can follow those links. Oh, you use Ethereum, I got you, I can follow those links too!"_

IPFS follows particular data-structure preferences and conventions. The IPFS protocol uses those conventions and IPLD to get from raw content to an IPFS address that uniquely identifies content on the IPFS network.

The next section explores how links between content are embedded within that content address through a DAG data structure.

## Directed acyclic graphs (DAGs)

IPFS and many other distributed systems take advantage of a data structure called [directed acyclic graphs](https://en.wikipedia.org/wiki/Directed_acyclic_graph), or DAGs. Specifically, they use _Merkle DAGs_, where each node has a unique identifier that is a hash of the node's contents. Sound familiar? This refers back to the _CID_ concept that we covered in the previous section. Put another way: identifying a data object (like a Merkle DAG node) by the value of its hash _is content addressing_. Check out our [guide to Merkle DAGs](merkle-dag.md) for a more in-depth treatment of this topic.

IPFS uses a Merkle DAG that is optimized for representing directories and files, but you can structure a Merkle DAG in many different ways. For example, Git uses a Merkle DAG that has many versions of your repo inside of it.

To build a Merkle DAG representation of your content, IPFS often first splits it into _blocks_. Splitting it into blocks means that different parts of the file can come from different sources and be authenticated quickly. (If you've ever used BitTorrent, you may have noticed that when you download a file, BitTorrent can fetch it from multiple peers at once; this is the same idea.)

::: tip
It's easy to see a Merkle DAG representation of a file of your choice using the [DAG Builder visualizer](https://dag.ipfs.io/).
:::

Merkle DAGs are a bit of a ["turtles all the way down"](https://ipfs.io/ipfs/QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco/wiki/Turtles_all_the_way_down.html) scenario; that is, _everything_ has a CID. Let's say you have a file, and its CID identifies it. What if that file is in a folder with several other files? Those files will have CIDs too. What about that folder's CID? It would be a hash of the CIDs from the files underneath (i.e., the folder's content). In turn, those files are made up of blocks, and each of those blocks has a CID. You can see how a file system on your computer could be represented as a DAG. You can also see, hopefully, how Merkle DAG graphs start to form. For a visual exploration of this concept, take a look at the [IPLD Explorer](https://explore.ipld.io/#/explore/QmSnuWmxptJZdLJpKRarxBMS2Ju2oANVrgbr2xWbie9b2D).

Another useful feature of Merkle DAGs and breaking content into blocks is that if you have two similar files, they can share parts of the Merkle DAG, i.e., parts of different Merkle DAGs can reference the same subset of data. For example, if you update a website, only updated files receive new content addresses. Your old version and your new version can refer to the same blocks for everything else. This can make transferring versions of large datasets (such as genomics research or weather data) more efficient because you only need to transfer the parts that are new or changed, instead of creating entirely new files each time.

So, to recap, IPFS lets you give CIDs to content and link that content together in a Merkle DAG. Now let's move on to the last piece: how you find and move content.

## Distributed hash tables (DHTs)

To find which peers are hosting the content you're after (_discovery_), IPFS uses a [distributed hash table](dht.md), or DHT. A hash table is a database of keys to values. A _distributed_ hash table is one where the table is split across all the peers in a distributed network. To find content, you ask these peers.

The [libp2p project](https://libp2p.io/) is the part of the IPFS ecosystem that provides the DHT and handles peers connecting and talking to each other. (Note that, as with IPLD, libp2p can also be used as a tool for other distributed systems, not just IPFS.)

Once you know where your content is (or, more precisely, which peers are storing each of the blocks that make up the content you're after), you use the DHT again to find the current location of those peers (_routing_). So, to get to the content, use libp2p to query the DHT twice.

You've discovered your content, and you've found the current location(s) of that content. Now, you need to connect to that content and get it (_exchange_). To request blocks from and send blocks to other peers, IPFS currently uses a module called [_Bitswap_](https://github.com/ipfs/specs/blob/master/BITSWAP.md). Bitswap allows you to connect to the peer or peers that have the content you want, send them your _wantlist_ (a list of all the blocks you're interested in), and have them send you the blocks you requested. Once those blocks arrive, you can verify them by hashing their content to get CIDs and compare them to the CIDs that you requested. These CIDs also allow you to deduplicate blocks if needed.

There are [other content replication protocols under discussion](https://github.com/ipfs/camp/blob/master/DEEP_DIVES/24-replication-protocol.md) as well, the most developed of which is [_Graphsync_](https://github.com/ipld/specs/blob/master/block-layer/graphsync/graphsync.md). There's also a proposal under discussion to [extend the Bitswap protocol](https://github.com/ipfs/go-bitswap/issues/186) to add functionality around requests and responses.

## SHA file hashes won't match Content IDs

You may be used to verifying the integrity of a file by matching SHA hashes, but SHA hashes won't match CIDs. Because IPFS splits a file into blocks, each block has its own CID, including separate CIDs for any parent nodes.

The DAG keeps track of all the content stored in IPFS as blocks, not files, and Merkle DAGs are self-verified structures. To learn more about DAGs, see [directed acyclic graph (DAG)](../concepts/merkle-dag.md).

For a detailed example of what happens when you try to compare SHA hashes with CIDs, see [Content Identifiers are not hashes](../concepts/hashing/#content-identifiers-are-not-file-hashes).

### Libp2p

What makes libp2p especially useful for peer-to-peer connections is _connection multiplexing_. Traditionally, every service in a system opens a different connection to communicate with other services of the same kind remotely. Using IPFS, you open just one connection, and you multiplex everything on that. For everything your peers need to talk to each other about, you send a little bit of each thing, and the other end knows how to sort those chunks where they belong.

This is useful because establishing connections is usually hard to set up and expensive to maintain. With multiplexing, once you have that connection, you can do whatever you need on it.

## A modular paradigm

As you may have noticed from this discussion, the IPFS ecosystem is made up of many modular libraries that support specific parts of any distributed system. You can certainly use any part of the stack independently or combine them in novel ways.

The IPFS ecosystem gives CIDs to content and links that content together by generating IPLD Merkle DAGs. You can discover content using a DHT that's provided by libp2p, open a connection to any provider of that content, and download it using a multiplexed connection. All of this is held together by the middle of the stack, which is linked, unique identifiers; that's the essential part that IPFS is built on.
