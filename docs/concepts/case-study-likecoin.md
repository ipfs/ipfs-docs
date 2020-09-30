---
title: 'Case study: LikeCoin'
description: Explore some helpful use cases, ideas, and examples for the InterPlanetary File System (IPFS).
---

# Case study: LikeCoin

::: callout
**"With LikeCoin, we're decentralizing the standard of truth for online media content. That means we're taking the power to moderate content out of the hands of big government and companies, and putting it into the hands of content creators."**

_&mdash; Kin Ko, Founder, LikeCoin_
:::

## Overview

::: right
<img src="./images/case-studies/logo-likecoin.svg" alt="LikeCoin logo" width="240">
:::

[LikeCoin](https://like.co/) is an open-source framework for constructing a decentralized, censorship-resistant, blockchain-based publishing infrastructure for content creators and consumers alike. At its core, LikeCoin works as a repository for immutable digital content metadata. Its [Cosmos](https://cosmos.network/)-based blockchain records that data and guarantees its integrity using LikeCoin's experimental digital registry protocol, the [International Standard Content Number](https://iscn.io/#linked-data) (ISCN). The ISCN functions like an International Standard Book Number (ISBN) for digital content; it is a unique, immutable content identifier that contains digital content metadata such as author, title, language, publisher, or place and time of publication. All of this metadata is attached to the ISCN and stored on the LikeCoin blockchain.

Using the ISCN for a piece of digital content, the LikeCoin algorithm quantifies the value and impact of creative content. The LikeCoin token is used to reward content creators for participating in the LikeCoin ecosystem. Content creators receive LikeCoin every time their content is liked or shared, and LikeCoin users (known as "Likers") can also tip content creators and curators with LikeCoin by using the ecosystem's Super Like feature. All this can be accessed in a variety of ways — either directly through the free Liker Land reader/wallet app and its related browser extension or indirectly through a click of the LikeCoin button installable on WordPress websites.

LikeCoin uses its blockchain as a system of record for ISCNs and relies on IPFS for storing and serving the data those ISCNs represent. LikeCoin tightly integrates its ISCN data with IPFS using the Interplanetary Linked Data ([IPLD](https://ipld.io/)) data model. Through its IPLD plugin, LikeCoin uses IPFS to store copies of the digital content registered to the LikeCoin blockchain. In this way, LikeCoin bolsters end-user access to ISCN-allocated content while simultaneously providing creators and users with a means for storing and sharing content on the distributed web. LikeCoin's IPFS integration is incorporated seamlessly into the Liker Land app and browser extension, making the benefits of IPFS accessible to end users without any need for a technical background building and sharing content on IPFS.

### LikeCoin by the numbers

<NumberBlock :items="[
  {value: '&gt;80K', text: 'Likers using the LikeCoin platform'},
  {value: '&gt;300K', text:'pieces of content on LikeCoin'},
  {value: '&gt;11K', text: 'creators sharing content on LikeCoin'},
]" />

## The story

LikeCoin co-founder Kin Ko started as a game developer. But while he was working on creative video game content, he noticed that there was something amiss in the way creative content is rewarded online. Digital technology, and especially the web, have produced an environment of unprecedented creativity and collaboration. But far too many creative contributions are difficult, if not impossible, to monetize on the web today. Many content creators, particularly freelance creators and open source innovators, are paid for their content in nothing but reputation boosts from getting likes and shares.

At the same time, Ko recognized a threat to media and internet freedom in the power of big companies and governments to censor content on the web. Working out of Hong Kong, he wanted to design a decentralized publishing infrastructure where no individual company or agency would be able to censor and control content online.

LikeCoin aims to fix these problems with the way content is shared, moderated, and rewarded on the web. Using the Liker Land app, content creators and curators can share items online to a decentralized and censorship-resistant publishing infrastructure. And once they've shared their work in Liker Land, their content has a trackable footprint that the LikeCoin protocol uses to distribute financial rewards to them directly. In the LikeCoin ecosystem, likes and shares don't just generate reputation and online presence; they produce LikeCoin that can be used to store and exchange value.

::: callout
**"To work best, the creative process needs to be free from corporate or government interference and capable of generating real economic value all on its own. We created LikeCoin to fulfill both functions at once."**

_&mdash; Kin Ko, Founder, LikeCoin_
:::

At the heart of LikeCoin is its decentralized metadata registry. This registry, written on the LikeCoin blockchain, stores ISCN metadata for all of the digital content published to the LikeCoin ecosystem. That makes the LikeCoin blockchain the world's first data registry specifically recording the internet's digital creative content.

But the LikeCoin team quickly realized that simply creating a system of record for ISCNs wasn't enough to fulfill their core goal of building a decentralized publishing infrastructure: they also needed an efficient, decentralized, and censorship-resistant means to provide or re-provide the content that those ISCNs represent. Interacting with the LikeCoin chain directly through querying its API isn't a user-friendly option, particularly since users are then still left with the task of finding the content itself associated with an ISCN.

For LikeCoin, IPFS offered a solution. Content linked on Liker Land can be seamlessly stored and delivered using IPFS's distributed peer-to-peer network. This would both enhance censorship resistance and ensure content availability as long as at least one node holds a copy. And because the Liker Land app uses [IPLD](https://ipld.io/) to link ISCN metadata and IPFS content identifiers, there's no need for an end user to understand what goes on behind the scenes — let alone understand APIs.

::: callout
**"We locked on to IPFS after a lot of research about the best way to distribute our data. Building on IPFS provides us with an exciting and innovative way to ensure availability of our data without compromising on our key values."**

_&mdash; Chung Wu, chief researcher, LikeCoin_
:::

Content creators, curators, and consumers join the LikeCoin ecosystem by using the free [Liker Land](https://like.co/in/getapp) app, a reader, passport and wallet for reading and engaging with content. But LikeCoin also offers browser extensions for Chrome, Firefox, and Brave so users can add sites to their Liker Land reading lists on the fly, and content creators can even collect likes directly from a WordPress site using a WordPress plugin for LikeCoin. As a "free republic" of content creators, consumers, and civic media publishers, Liker Land also operates as a decentralized autonomous organization (DAO) with a Cosmos-based bonded proof-of-stake mechanism in which every "citizen" of Liker Land participates in blockchain governance. Acquiring more LikeCoin increases a user's voting power in Liker Land. While Liker Land is free to join, users can opt in to pay a flat monthly rate to become Civic Likers, ongoing supporters of LikeCoin whose monthly contributions fund creators and who act as "taxpayers" in Liker Land.

## IPFS benefits

LikeCoin's core goals of providing creators and curators a quantifiably rewardable space to share content without fear of corporate or governmental control are directly enabled by IPFS, specifically through these key IPFS benefits emphasized by the team:

- **Performant, proven distributed storage:** IPFS provides a reliable solution for distributed storage out of the box, backed by active core development and an engaged international user and developer community.
- **Censorship resistance:** API gateways to the LikeCoin blockchain could potentially be blocked by governments or other infrastructure players. By contrast, content stored and provided using IPFS can be accessed as long as a copy exists on an IPFS node somewhere on the network.
- **Data integrity:** Thanks to its inherent use of [content addressing](https://docs.ipfs.io/concepts/content-addressing/), IPFS generates a unique content identifier (CID) for every artifact stored on IPFS — meaning that if an item is modified, its CID changes, too. Creators, curators, and users can share and view LikeCoin content with assurance that material hasn't been modified by external parties.
- **IPLD:** Using `go-ipfs`'s included IPLD plugin, any IPFS node can be used to access data stored on the LikeCoin blockchain. This makes it much harder for anyone to block access to LikeCoin's data. Additionally, the IPLD plugin enables users to retrieve ISCN metadata through a CID, just like with any other piece of content on IPFS. Utilizing IPLD thus simplifies the user experience of interacting with the LikeCoin blockchain.

## How LikeCoin uses IPFS

The LikeCoin ecosystem comprises three layers:

- The LikeCoin ISCN blockchain and the IPFS nodes that store and provide ISCN-associated content.
- The LikeCoin button, which is freely available as a web plugin for WordPress users. This button is connected to the LikeCoin reward system.
- The LikeCoin app and browser extension, through which users join and participate in Liker Land.

Critical to all the layers in this LikeCoin ecosystem is LikeCoin's integration of the ISCN blockchain with IPFS. This takes place through the [IPLD plugin](https://github.com/ipfs/go-ipfs/tree/master/plugin) included out of the box with [`go-ipfs`](https://github.com/ipfs/go-ipfs), enabling ISCN metadata for content items to associate with the items themselves stored on IPFS. This enables an integrated data structure in which LikeCoin's blockchain stores content metadata, while the IPFS network is used for querying and distributing that data. This process works via a datastore plugin created by the LikeCoin team.

LikeCoin's [plugin](https://github.com/likecoin/likecoin-ipfs-cosmosds/blob/master/cosmosds/datastore.go) is based on IPFS's go-level-db datastore plugin, with one major modification: When processing a query, the datastore checks if the CID type is about LikeCoin chain data, and if so, delegate it to the LikeCoin chain node via an internal HTTP request. If the CID isn't related to LikeCoin chain data, it acts the same way as the out-of-the-box go-level-db datastore.

For the datastore plugin, LikeCoin implements the `get`, `getSize`, and `has` functions. Since IPFS CIDs can also [include pointers to IPLD objects](https://proto.school/anatomy-of-a-cid), the datastore plugin can identify whether a content item's CID references on-chain data, and query the chain if needed. If on-chain data is queried, the query request is forwarded to the LikeCoin chain through Remote Procedure Call (RPC) endpoints exposed by the chain.

In order to bring LikeCoin and IPFS together for users, LikeCoin embeds IPFS nodes into the LikeCoin node software. LikeCoin's blockchain, [LikeCoin Chain](https://github.com/likecoin/likecoin-chain), is a proof-of-stake blockchain based on [Cosmos SDK](https://cosmos.network/sdk). Cosmos SDK-based blockchains, such as LikeCoin's, use special nodes called "validators," which are selected based on stake from users. These validator nodes are responsible for collecting and validating transactions, as well as for producing new blocks in the blockchain including these transactions (this is similar to miners in Bitcoin, but with a more fixed set of "miners"). LikeCoin makes an IPFS node part of the LikeCoin chain's node software, so validators and non-validators alike are also running IPFS nodes. These nodes run the IPLD plugin so that LikeCoin's ISCN metadata can easily ride on top of IPFS.

### The tooling

Because the LikeCoin chain itself is built in Go, the team was able to utilize go-ipfs to achieve much of its functionality out of the box.

- Core: [`go-ipfs`](https://github.com/ipfs/go-ipfs) - A go-ipfs node is embedded into every LikeChain node, making every LikeChain node also a node on the IPFS network.
- Plugins outside the `go-ipfs` core:
  - [`iscn-ipld`](https://github.com/likecoin/iscn-ipld) - a plugin for parsing ISCN-related IPLD data in order to associate ISCN metadata and IPFS artifacts
  - [`ipfs-cosmosds`](https://github.com/likecoin/likecoin-ipfs-cosmosds) - this is LikeCoin's self-built datastore plugin, based on the go-level-db datastore, that delegates LikeCoin-chain-related queries to the LikeCoin chain software via RPC endpoints

## LikeCoin + IPFS: the future

The LikeCoin team looks forward to integrating [IPNS](https://docs.ipfs.io/concepts/ipns/), the InterPlanetary Name System, into their ecosystem in the future. At present, in order to retrieve all metadata from an ISCN in addition to the content item itself, the system requires both an IPFS content identifier (CID) and the ISCN identifier itself. The team intends to use IPNS to link an ISCN with all corresponding IPFS CIDs in a single, updatable reference — something that would greatly streamline and simplify LikeCoin's data query and retrieval process.

::: callout
**"The future of LikeCoin is inextricably linked with the future of IPFS. We are actively experimenting with some of the most cutting-edge features of IPFS. Integrating these features into the LikeCoin ecosystem is crucial to our mission."**

_&mdash; Phoebe Poon, VP of Business Development, LikeCoin_
:::

_Note: Metrics and other details in this case study are current as of October 2020. Details may change in the interim._
