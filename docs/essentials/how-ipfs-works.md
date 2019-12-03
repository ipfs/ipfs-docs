---
title: How IPFS works
---

# How IPFS works

::: tip
Want to see a video recap of how IPFS works with files in general? Check out this content from IPFS Camp 2019! [Core Course: How IPFS Deals With Files](https://www.youtube.com/watch?v=Z5zNPwMDYGg)
:::

IPFS is a peer-to-peer (p2p) storage network. Content is accessible through peers that might relay information or store it (or do both), and those peers can be located anywhere in the world. IPFS knows how to find what you ask for by its content address, rather than where it is.

There are **three key principles** to understanding IPFS:

1. Content addressing and linked data
2. Turning files into blocks on directed acyclic graphs (DAGs)
3. Finding and moving content using distributed hash tables (DHTs)

Let’s first look at _content addressing_ and how that content is _linked together_. This “middle” part of the IPFS stack is what connects the ecosystem together; everything is built on being able to find content via linked, unique identifiers.

## Content addressing and linked data

IPFS uses _content addressing_ to identify content by what’s in it, rather than by where it’s located. Looking for an item by content is something you already do all the time. For example, when you look for a book in the library, you often ask for it by the title; that’s content addressing because you’re asking for **what** it is. If you were using location addressing to find that book, you’d ask for it by **where** it is: “I want the book that’s on the second floor, first stack, third shelf from the bottom, four books from the left.” If someone moved that book, you’d be out of luck!

It’s the same on the internet and on your computer. Right now, content is found by location, such as…

- `https://en.wikipedia.org/wiki/Aardvark`
- `/Users/Alice/Documents/term_paper.doc`
- `C:\Users\Joe\My Documents\project_sprint_presentation.ppt`

By contrast, every piece of content that uses the IPFS protocol has a [_content identifier_](/essentials/content-addressing/), or CID, that is its _hash_. The hash is unique to the content that it came from, even though it may look short compared to the original content. If hashes are new to you, check out our [guide to cryptographic hashing](/essentials/hashing/) for an introduction.

Content addressing through hashes has become a widely-used means of connecting data in distributed systems — everything from the commits that back your code to the blockchains that run cryptocurrencies. However, the underlying data structures in these systems are not necessarily interoperable.

This is where the [IPLD project](https://ipld.io/) comes in. **Hashes identify content, and IPLD translates between data structures**. Since different distributed systems structure their data in different ways, IPLD provides libraries for combining pluggable modules (parsers for each possible type of IPLD node) to resolve a path, selector, or query across many linked nodes (allowing you explore data regardless of the underlying protocol). IPLD provides a way to translate between content-addressable data structures: “Oh you use Git-style, no worries, I can follow those links. Oh you use Ethereum, I got you, I can follow those links too!”

The IPFS protocol uses IPLD to get from raw content to an IPFS address. IPFS has its own preferences and conventions about how data should be broken up into a DAG (more on DAGs below!); IPLD links content on the IPFS network together using those conventions.

**Everything else in the IPFS ecosystem builds on top of this core concept: linked, addressable content is the fundamental connecting element that makes the rest work.**

## Directed acyclic graphs (DAGs)

IPFS and many other distributed systems take advantage of a data structure called [directed acyclic graphs](https://en.wikipedia.org/wiki/Directed_acyclic_graph), or DAGs. Specifically, they use _Merkle DAGs_, which are DAGs where each node has an identifier that is a hash of the node’s contents. Sound familiar? This refers back to the _CID_ concept that we covered in the previous section. Another way to look the this CID-linked-data concept: identifying a data object (like a Merkle DAG node) by the value of its hash is _content addressing_. Check out our [guide to Merkle DAGs](/essentials/merkle-dag/) for a more in-depth treatment of this topic.

IPFS uses a Merkle DAG that is optimized for representing directories and files, but you can structure a Merkle DAG in many different ways. For example, Git uses a Merkle DAG that has many versions of your repo inside of it.

To build a Merkle DAG representation of your content, IPFS often first splits it into _blocks_. Splitting it into blocks means that different parts of the file can come from different sources, and be authenticated quickly. (If you've ever used BitTorrent, you may have noticed that when you download a file, BitTorrent can fetch it from multiple peers at once; this is the same idea.)

Merkle DAGs are a bit of a [“turtles all the way down”](https://ipfs.io/ipfs/QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco/wiki/Turtles_all_the_way_down.html) scenario; that is, **everything** has a CID. You’ve got a file that has a CID. What if there are several files in a folder? That folder has a CID, and that CID contains the CIDs of the files underneath. In turn, those files are made up of blocks, and each of those blocks has a CID. You can see how a file system on your computer could be represented as a DAG. You can also see, hopefully, how Merkle DAG graphs start to form. For a visual exploration of this concept, take a look at the [IPLD Explorer](https://explore.ipld.io/#/explore/QmSnuWmxptJZdLJpKRarxBMS2Ju2oANVrgbr2xWbie9b2D).

Another useful feature of Merkle DAGs and breaking content into blocks is that if you have two similar files, they can share parts of the Merkle DAG; ie, parts of different Merkle DAGs can reference the same data. For example, if you update a website, only the files that changed will get new content addresses. Your old version and your new version can refer to the same blocks for everything else. This can make transferring versions of large datasets (such as genomics research or weather data) more efficient because you only need to transfer the parts that are new or have changed instead of creating entirely new files each time.

## Distributed hash tables (DHTs)

So, to recap, IPFS lets you give CIDs to content, and link that content together in a Merkle DAG using IPLD. Now let’s move on to the last piece: how you find and move content.

To find which peers are hosting the content you’re after (_discovery_), IPFS uses a [distributed hash table](/essentials/dht/), or DHT. A hash table is a database of keys to values. A _distributed_ hash table is one where the table is split across all the peers in a distributed network. To find content, you ask these peers.

The [libp2p project](https://libp2p.io/) is the part of the IPFS ecosystem that provides the DHT and handles peers connecting and talking to each other. (Note that, as with IPLD, libp2p can also be used as a tool for other distributed systems, not just IPFS.)

Once you know where your content is (ie, which peer or peers are storing each of the blocks that make up the content you’re after), you use the DHT **again** to find the current location of those peers (_routing_). So, in order to get to content, you use libp2p to query the DHT twice.

You’ve discovered your content, and you’ve found the current location(s) of that content — now you need to connect to that content and get it (_exchange_). To request blocks from and send blocks to other peers, IPFS currently uses a module called [_Bitswap_](https://github.com/ipfs/specs/blob/master/BITSWAP.md). Bitswap allows you to connect to the peer or peers that have the content you want, send them your _wantlist_ (a list of all the blocks you're interested in), and have them send you the blocks you requested. Once those blocks arrive, you can verify them by hashing their content to get CIDs. (These CIDs also allow you to deduplicate blocks if needed.)

There are [other content replication protocols under discussion](https://github.com/ipfs/camp/blob/master/DEEP_DIVES/24-replication-protocol.md) as well, the most developed of which is [_Graphsync_](https://github.com/ipld/specs/blob/master/block-layer/graphsync/graphsync.md). There's also a proposal under discussion to [extend the Bitswap protocol](https://github.com/ipfs/go-bitswap/issues/186) to add functionality around requests and responses.

### Libp2p

What makes libp2p especially useful for peer to peer connections is _connection multiplexing_. Traditionally, every service in a system would open a different connection to remotely communicate with other services of the same kind. Using IPFS, you open just one connection, and you multiplex everything on that. For everything your peers need to talk to each other about, you send a little bit of each thing, and the other end knows how to sort those chunks where they belong.

This is useful because establishing connections is usually hard to set up and expensive to maintain. With multiplexing, once you have that connection, you can do whatever you need on it.

## A modular paradigm

As you may have noticed from this discussion, the IPFS ecosystem is made up of many modular libraries that support specific parts of any distributed system. You can certainly use any part of the stack independently, or combine them in novel ways.

The IPFS ecosystem gives CIDs to content, and links that content together by generating IPLD Merkle DAGs. You can discover content using a DHT that's provided by libp2p, and open a connection to any provider of that content and download it using a multiplexed connection. All of this is held together by the “middle” of the stack, which is linked, unique identifiers; that's the essential part that IPFS is built on.
