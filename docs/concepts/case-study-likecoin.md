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

[LikeCoin](https://like.co/) is an open-source framework for constructing a decentralized, censorship-resistant, blockchain-based publishing infrastructure for content creators and consumers alike. At its core, LikeCoin works as a repository for immutable digital content metadata. Its [Cosmos SDK](https://cosmos.network/sdk)-based blockchain records that data and guarantees its integrity using LikeCoin's digital registry protocol, the [International Standard Content Number](https://iscn.io) (ISCN). The ISCN functions like an International Standard Book Number (ISBN) for digital content; this unique, immutable content identifier contains metadata including author, title, language, publisher, and place/time of publication.

In addition to the single-source-of-truth benefits offered by LikeCoin's blockchain-based registry, the ecosystem also offers a valuable means for rewarding the creators and curators who produce and share registry content. LikeCoin algorithmically quantifies the value and impact of ISCN-registered content shared and consumed within the ecosystem, and rewards its creators with LikeCoin tokens. Creators receive LikeCoin every time their content is liked or shared, and LikeCoin users (known as "Likers") can additionally "tip" both creators and curators via the ecosystem's "Super Like" feature. All this can be accessed in a variety of ways — either directly through the free [Liker Land](https://like.co/in/getapp) reader/wallet app and its related browser extension, or indirectly through a click of the LikeCoin button available for common blogging platforms.

LikeCoin relies on IPFS for storing and serving ISCN-linked content within its Liker Land app, and tightly integrates ISCN data with IPFS using the Interplanetary Linked Data ([IPLD](https://ipld.io/)) data model. By using IPFS and a custom IPLD plugin to store and deliver copies of ISCN-allocated content, LikeCoin bolsters end-user access to this content with all the additional availability and anti-tampering benefits afforded by the distributed web. LikeCoin's use of IPFS is incorporated seamlessly into the Liker Land app and browser extension, making the benefits of IPFS accessible to end users without any need for a technical background.

### LikeCoin by the numbers

<NumberBlock :items="[
  {value: '&gt;300K', text:'pieces of content on LikeCoin'},
  {value: '&gt;80K', text: 'Likers using the LikeCoin platform'},
  {value: '&gt;11K', text: 'creators sharing content on LikeCoin'},
]" />

## The story

LikeCoin co-founder Kin Ko started as a game developer. But while he was working on creative video game content, he noticed that there was something amiss in the way creative content is rewarded online. Digital technologies, especially the web, have enabled an environment of unprecedented creativity and collaboration. But far too many creative contributions are difficult — if not impossible — to monetize on the web today. Many content creators are paid for their efforts in nothing but the reputation boosts from likes and shares.

Ko also recognized a threat to media and internet freedom due to the ability of big companies and governments to censor content on the web. Working out of Hong Kong, he wanted to design a decentralized publishing infrastructure where no individual organization would be able to censor or control content online.

LikeCoin aims to fundamentally improve the way content is shared, moderated, and rewarded on the web. Using the Liker Land app, content creators and curators can share items within a decentralized, censorship-resistant publishing infrastructure. And once they've shared their work in Liker Land, their content has a trackable footprint — via the ISCN — that LikeCoin uses to distribute financial rewards to them directly. In the LikeCoin ecosystem, likes and shares don't just generate online reputation; they produce tangible value that can be stored or exchanged.

::: callout
**"To work best, the creative process needs to be free from corporate or government interference and capable of generating real economic value all on its own. We created LikeCoin to fulfill both functions at once."**

_&mdash; Kin Ko, Founder, LikeCoin_
:::

At the heart of the LikeCoin ecosystem is its decentralized metadata registry, written on [LikeCoin's own blockchain](https://github.com/likecoin/likecoin-chain). As the world's first data registry specifically recording the internet's digital creative content, it stores ISCN metadata for every item published or shared within Liker Land or associated with the LikeCoin button.

But the LikeCoin team quickly realized that simply creating a system of record for ISCNs wasn't enough to fulfill their core goal of building a equitable publishing infrastructure. They also needed an efficient, decentralized, and censorship-resistant means to provide or reprovide the content that those ISCNs represent. The team found their solution in IPFS.

Content shared within Liker Land is stored and delivered using IPFS's distributed peer-to-peer network, resulting both in enhanced censorship resistance and assurance that a piece of content is always available as long as at least one node in the network has a copy. And because the Liker Land app and extension use [IPLD](https://ipld.io/) to associate IPFS content identifiers with ISCN metadata, the workflow of publishing, sharing, reading, liking, and rewards is seamless — there's no need for a content creator or end user to understand what goes on behind the scenes, let alone the nuances of APIs or blockchains.

::: callout
**"We locked on to IPFS after a lot of research about the best way to distribute our data. Building on IPFS provides us with an exciting, innovative way to ensure availability of our data without compromising on our key values."**

_&mdash; Chung Wu, chief researcher, LikeCoin_
:::

The end-user workflow is simple and intuitive: Content creators, curators, and consumers take part in the LikeCoin ecosystem by using the free [Liker Land](https://like.co/in/getapp) app, a reader and wallet for engaging with content. LikeCoin also offers browser extensions for [Chromium](https://chrome.google.com/webstore/detail/liker-land/cjjcemdmkddjbofomfgjedpiifpgkjhe?hl=en) (Chrome and Brave) and [Firefox](https://addons.mozilla.org/en-US/firefox/addon/liker-land/?src=search), so users can add material to their Liker Land reading lists on the fly. Outside the Liker Land app, creators can collect likes directly from WordPress, Medium, and other common blogging platforms using an easy-to-implement LikeCoin button plugin.

As a "free republic" of content creators, curators and publishers, and consumers, Liker Land also operates as a decentralized autonomous organization (DAO) with a [Cosmos](https://cosmos.network/)-based bonded proof-of-stake mechanism in which every "citizen" of Liker Land participates in blockchain governance. Acquiring more LikeCoin increases a user's voting power in Liker Land. While taking part in Liker Land is free of charge, users can also become Civic Likers for a flat monthly rate, acting as ongoing supporters whose contributions fund creators — the Liker Land equivalent of "taxpayers".

## IPFS benefits

The LikeCoin team's core goals of providing a quantifiably rewardable space for creators and curators to share content without fear of corporate or governmental control are directly enabled by IPFS, specifically through these core benefits:

- **Performant distributed storage:** IPFS provides a reliable, proven solution for distributed storage out of the box, backed by active core development and an engaged international [user and developer community](/community/).
- **Data integrity:** Thanks to its inherent use of [content addressing](https://docs.ipfs.io/concepts/content-addressing/), IPFS generates a unique content identifier (CID) for every artifact stored on IPFS — meaning that if an item is modified, its CID changes, too. Creators, curators, and users can share and view content in Liker Land with assurance that items haven't been modified by third parties.
- **Censorship resistance:** API gateways to the LikeCoin blockchain itself can potentially be blocked by governments or other infrastructure players. By contrast, content stored and provided using IPFS can be accessed as long as a copy exists on an IPFS node somewhere on the network.
- **IPLD as a blockchain intermediary:** Using the [IPLD plugin](https://github.com/ipfs/go-ipfs/tree/master/plugin) included in `go-ipfs`, any IPFS node can be used to access data stored on the LikeCoin blockchain. This makes it much harder for anyone to block access to LikeCoin-affiliated content. And because the plugin enables users to retrieve ISCN metadata through a CID — just like with any other piece of content on IPFS — the user experience of interacting with the LikeCoin blockchain is simplified even further.

## How LikeCoin uses IPFS

The LikeCoin ecosystem is made up of four primary components:

- The LikeCoin **ISCN blockchain** for source-of-truth content metadata
- The **IPFS nodes** used to store and provide ISCN-associated content
- The **Liker Land app and browser extensions**, through which users participate in the LikeCoin ecosystem
- The **LikeCoin button** for third-party blogs and other publishing platforms, connecting likes on those platforms to the LikeCoin reward system

Critical to all of these is LikeCoin's use of IPFS and its integration with the ISCN blockchain. This takes place via the [IPLD plugin](https://github.com/ipfs/go-ipfs/tree/master/plugin) included out of the box with [`go-ipfs`](https://github.com/ipfs/go-ipfs), enabling ISCN metadata for content items to associate with the items themselves stored on IPFS. This enables an integrated data structure in which LikeCoin's blockchain stores content metadata, while IPFS is used for querying and distributing it. This process takes place using a separate custom datastore plugin created by the LikeCoin team.

LikeCoin's [datastore plugin](https://github.com/likecoin/likecoin-ipfs-cosmosds/blob/master/cosmosds/datastore.go) is based on IPFS's [`go-ds-leveldb`](https://github.com/ipfs/go-ds-leveldb) datastore plugin, which implements the [`go-datastore`](https://github.com/ipfs/go-datastore) key-value datastore interface using a LevelDB back end. LikeCoin's custom version implements the `get`, `getSize`, and `has` functions in order to make one primary modification to `go-ds-leveldb`: Since IPFS CIDs can also [include pointers to IPLD objects](https://proto.school/anatomy-of-a-cid), the plugin can identify whether a given CID references data on the LikeCoin blockchain, and if so, delegate it to the LikeCoin chain via an internal HTTP request. If on-chain data is queried, the query request is forwarded to the LikeCoin chain through Remote Procedure Call (RPC) endpoints exposed by the chain.

Just as IPFS is tightly integrated with the LikeCoin ISCN blockchain, chain nodes and IPFS nodes are closely-knit, too. While Cosmos SDK-based blockchains such as LikeCoin's contain both regular nodes and "validator" nodes that collect and validate transactions and produce new blocks in the chain, every LikeCoin blockchain node — not just the validators — also includes an IPFS node for storing and providing the content associated with chain metadata.

### The tooling

Because the LikeCoin blockchain itself is built in Go, the team was able to easily utilize `go-ipfs` to achieve most of their required functionality out of the box. Just two additional custom plugins were needed in order to successfully integrate `go-ipfs`:

- [`ipfs-cosmosds`](https://github.com/likecoin/likecoin-ipfs-cosmosds) (noted above), which delegates ISCN metadata queries to the LikeCoin chain
- [`iscn-ipld`](https://github.com/likecoin/iscn-ipld), which parses ISCN-related IPLD data in order to associate ISCN metadata with IPFS artifacts

## LikeCoin + IPFS: the future

As the LikeCoin ecosystem continues to evolve, the team looks forward to incorporating current and future IPFS features, too. One particular future goal is to integrate [IPNS](https://docs.ipfs.io/concepts/ipns/), the InterPlanetary Name System, into LikeCoin's architecture. At present, in order to retrieve both a content item and all its associated ISCN metadata, LikeCoin code requires both an IPFS CID and the ISCN identifier itself. The team plans to use IPNS to link an ISCN with all corresponding IPFS CIDs in a single, updatable reference — something that would greatly streamline and simplify LikeCoin's data query and retrieval process.

::: callout
**"The future of LikeCoin is inextricably linked with the future of IPFS. We are actively experimenting with some of the most cutting-edge features of IPFS. Integrating these features into the LikeCoin ecosystem is crucial to our mission."**

_&mdash; Phoebe Poon, VP of Business Development, LikeCoin_
:::

_Note: Metrics and other details in this case study are current as of October 2020. Details may change in the interim._
