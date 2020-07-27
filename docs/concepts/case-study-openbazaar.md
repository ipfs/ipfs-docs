---
title: 'Case study: OpenBazaar'
description: Explore some helpful use cases, ideas, and examples for the InterPlanetary File System (IPFS).
---

# Case study: OpenBazaar

::: callout
**“There is no inherent token as part of the whole network. You can just use it. ... Part of our philosophy is that we don’t want anyone to have to pay anything initially just to get started on the network.”**

_&mdash; Brian Hoffman, CEO of OB1_
:::

## Overview

::: right
<img src="./images/case-studies/logo-openbazaar.png" alt="OpenBazaar logo" width="120">
:::

[OpenBazaar](https://openbazaar.org/) is a peer-to-peer ecommerce platform where buyers and sellers can trade anonymously and privately, without data collection by vendors. The OpenBazaar platform is developed by the OB1 team, which also develops [Haven](https://gethaven.app/), the mobile version of OpenBazaar. The code base is similar, but due to the requirements of some mobile app stores, the team needed to create a separate brand for Haven along with some code tweaks.

IPFS provides the content storage network for OpenBazaar and Haven. On the network, merchants and buyers can each run a storage node, so that there is no central server involved. By creating a collaborative network using IPFS, the OpenBazaar network enables buyers and sellers to trade without centralized data collection or hacking of their personal information.

OpenBazaar has been working with IPFS successfully since 2015. Having a peer-to-peer network allows OpenBazaar to provide a platform where individuals freely trade goods, with no interference from a middleman. Furthermore, OB1 (the company behind OpenBazaar) can be a technology provider that allows buyers and sellers to operate freely, without being the seller of products, owner of the network, or interfering in the business affairs between peers.

Although OpenBazaar is not yet as mainstream as a shopping site, it is particularly helpful in cases where certain products are difficult to come by in the market. For example, there have been periods of time when Bitcoin mining equipment was freely available on OpenBazaar, but difficult to get elsewhere. During the COVID-19 pandemic, OpenBazaar was able to get personal protective gear into people’s hands when other platforms couldn't; N95 masks were at times more widely available on OpenBazaar than via other platforms, and at prices that self-equalized due to the platform's lack of centralized control. In addition, this lack of centralization meant supply and demand dictated availability, not an overseeing party determining price or enforcing geographical restrictions.

### OpenBazaar by the numbers

<NumberBlock :items="[
  {value: '100K', text:'total nodes'},
  {value: '250K', text: 'desktop app installs'},
  {value: '150K', text: 'mobile app installs'},
  {value: '&gt;20K', text: 'daily listings'}
]" />

## The story

OpenBazaar started in 2014 with the goal of creating a peer-to-peer marketplace for people to freely buy and sell from one another online, without subjecting themselves to corporate tracking of their purchasing behavior. More than a year into the project, one of the developers stumbled upon IPFS.

“Back then, none of this tech actually existed. We spent about a year creating our own backend and peer-to-peer network and then the encryption and all the messaging and all the modules that we needed to build a marketplace,” says Brian Hoffman, CEO of OB1. “We wanted to follow the classic rule of: don’t do something yourself if somebody else does it better.” Using IPFS allowed the OB1 team to focus on the marketplace aspects and leave the infrastructure to IPFS. More than 30% of the codebase they had built was no longer necessary, because the functionality was built into IPFS.

“We really liked it and it worked really well, and we’ve been using IPFS ever since,” says Hoffman.

The OB1 team had also looked at other open source projects such as Bittorrent and some of the early cryptocurrency-based storage protocols. Using Bittorrent would have required too much development effort, alternatives like the Storj and Sia networks required using dedicated tokens for the storage use. Even as the market evolved, IPFS continued to be the clear best choice. The OpenBazaar model relies on the participants (merchants and buyers) in the network to support one another by running nodes and hosting data in the network, which means they don’t have to pay for storage—just work together as a community to support one another by running nodes.

“We have a very altruistic business model where merchants and buyers are incentivized to keep storage on the network because merchants want their storefronts to be available and buyers want to be able to retrieve their orders and messages on the network. It’s a community approach to storage of the data. If we asked buyers to immediately start paying a fee or merchants to pay to list something, that would be an impediment to our growth. Part of our philosophy is that we don’t want anyone to have to pay anything initially just to get started on the network,” says Hoffman.

By having the participants in the network host their own data as well as their neighbor’s data via IPFS, OpenBazaar creates a truly decentralized storage network that doesn’t depend on the OB1 team or any particular hosting provider. The system is resilient—meaning there is no central server to attack or take down. Furthermore, the system preserves privacy because user data is not stored in a central database. One of the persistently nagging problems of ecommerce is that the databases often get hacked and private user data is stolen. With no central database, there simply is no such vulnerability in the OpenBazaar network.

::: callout
Protocol Labs is always there when we need them, but we don’t need them very often.

_&mdash; Brian Hoffman, CEO of OB1_
:::

The migration to IPFS was in late 2015, so OB1 was one of the first projects to successfully run as a fully Web3 project. “We went through struggles at the start, but working with Protocol Labs was a collaborative effort,” says Hoffman. “We worked pretty closely with the core team. The first year or two were challenging, but now things have solidified and we really don’t need much from them.” At one point, an upgrade to the IPFS protocol was incompatible with how OB1 had implemented it, and the IPFS team was able to roll back the change to allow the team to work together on a solution. Having a team that is willing to work with them, and even roll back an update, is one of the key reasons the team has confidence that IPFS is a great choice. The community engagement gives certainty that the system will continue to support the OpenBazaar technology.

## IPFS benefits

In terms of concrete benefits, the OpenBazaar team cites the following as key wins of using IPFS:

- Anonymity enabled storage
- Allowed team to focus on marketplace aspects, freeing them of the need to handle infrastructure development
- Fully decentralized storage
- Truly scalable: network gets faster as more people join
- Extensible: enables asynchronous messaging among buyers and sellers
- Extensible code base
- Provides ability to store encrypted information on top of base IPFS network
- Free to use: no token or up-front payment involved
- Combined with Filecoin provides payment for incentivizing storage providers for long-term storage
- Anonymity for end users with TOR and users behind firewalls
- Compatible with model of allowing merchants to host their own nodes and contribute to the resilience of the network as a whole (“altruistic” framework)
- Node flexibility and customizability
- Support from Protocol Labs

## How OpenBazaar uses IPFS

OpenBazaar's implementation is built upon a fork of the go-ipfs reference implementation customized specifically for the following needs:

- Persistent storage of at least a week to allow for remembering buyers' shopping carts and merchants who may not be online 24/7
- LibP2P: original addressing scheme.
- Go-IPFS without IPNS to optimize for a large number of product images.
- Go-IPFS support for the Bitcoin Wallet and front-end.
- Customized search engine that crawls the IPFS network to update shop content. The crawler maintains the inventory for the front-end of the shopping app.
- Circuit relaying for working around firewalls and mobile iOS networks

### The architecture

OpenBazaar's high-level architecture can be summed up in this diagram:

**DIAGRAM TO GO HERE from [this design-shop issue](https://github.com/protocol/design-shop/issues/343&sa=D&ust=1595884969218000&usg=AFQjCNEeMPUuhiAoI1MtgQD1XlX3zbUPYQ)**

In this image, we see a network of lots of nodes (desktop/laptop and mobile). On top is a zoom-in of several individual nodes to act as examples. Every node represents either a merchant or seller (although there are a few exceptions: OB1 also runs some gateway nodes and caching nodes). Every node has either the OpenBazaar (if it’s desktop) or Haven (if it’s mobile) app installed; inside THAT app is a complete IPFS node, which includes the items on the bullet lists: go-ipfs, the DHT and the custom Persistent Messaging implementation that they created.

### Customizing &amp; extending

One of the extensions that the team built was an asynchronous messaging layer. By creating an additional storage layer with IPFS, the OB1 team created a system in which messages could be retained when people are offline and sent later.
The team created a TOR Router for IPFS. The code is available to any users of IPFS and has been submitted as a code contribution for review and integration to the core code.

Another customization that OpenBazaar needed was the ability to crawl the network for new content. As merchants add new merchandise, the network needs to display that to the buyers. The team built a crawler that searches the network for new content and keeps track of new items in the system.
For the mobile Haven platform on iOS, it was necessary to create a circuit relaying workaround for firewalls. The ability to provide that kind of modular add-in made the system flexible.

## Audius + OpenBazaar: the future

IPFS serves the short-term storage needs for the OpenBazaar marketplace, but when it comes to longer-term storage, the team is looking forward to utilizing Filecoin in order to allow nodes to be compensated for long-term storage. For customers with large storefronts or large customer bases, and who aren’t online all the time, having the potential for a third-party storage layer builds another aspect of the marketplace into the business model.
“We wanted to create OpenBazaar in parallel with where IPFS and Filecoin are moving and take advantage of that as well,” says Hoffman.
Because of the open source nature of the project, Hoffman can foresee a future where additional services could be enabled though Filecoin. For example, third parties could offer nodes for redundancy, resilience, backups and recovery.
In addition to improvements in some of the existing features, OB1 is looking at serverless, distributed peer-to-peer database OrbitDB as a potential integration. Currently the system uses flat files in a directory, which is a bit unusual for a marketplace. Building a social network on top of flat files isn’t ideal, so the OrbitDB implementation may make that more applicable to their network.

_Note: Metrics and other details in this case study are current as of July 2020. Details may change in the interim._
