---
title: Usage ideas & examples
sidebarDepth: 0
issueUrl: https://github.com/ipfs/docs/issues/387
description: Explore some helpful use cases, ideas, and examples for the InterPlanetary File System (IPFS).
---

# Usage ideas and examples

IPFS is a versatile technology and can be used in a huge array of use-cases. Below is a long, yet far from exhaustive, list of projects built on IPFS. Some are minimalistic prototypes, and other are complete projects backed by mature companies.

## Share files

One of the simplest use-cases to grasp is the sharing of files between peers.

### Desktop applications

[IPFS Desktop](https://github.com/ipfs-shipyard/ipfs-desktop) is the official desktop client for IPFS. It comes with a built-in IPFS node that lets you pin files and gives you a link to share them. This is generally seen as the easiest point-of-entry into the IPFS ecosystem.

[Arbore](https://arbo.re) Arbore is a free and open-source file sharing application that enables you to send your pictures, documents, files to your contacts privately and without limits.

Another alternative is [Orion](https://orion.siderus.io). Orion is an easy to use IPFS Desktop client. It helps sharing content on the public peer to peer network without any command line or technical knowledge. The app includes everything needed to start your own personal IPFS node.

### Share your files or sell copies of it

[Enzypt.io](https://enzypt.io) lets you sell files or simply get a link to share.

[FileNation](https://github.com/FileNation/FileNation ) is an alternative if you only want to share.  

### Dead drop

A [dead drop](https://deaddrops.com/) is a drive or another storage device that is physically immobilized in a public location for people to pick-up and deposit files. There is now an IPFS version thanks to the [IPFS Dead Drop project](https://github.com/c-base/ipfs-deaddrop).

## Collaborate

Let IPFS coordinate the flow of data between you and your colleagues, even when working offline or on a local network.

### Collaborate on written documents

[PeerPad.org](https://peerpad.net) is a service allows you to write, collaborate and export markdown documents directly in your browser, similar to how Google Docs works.

### Version control

The Inter-Planetary Version Control system (IPVC) is a distributed version control system similar to [git](https://git-scm.com/), but built on IPFS. It is suitable for any kind of data, not only human readable content. It is also particularly suitable for versioning large files. The underlying concepts are heavily influenced by [git](https://git-scm.com/) and [gitless](https://gitless.com/).

### Connect event attendants

[Gthr.io](https://gthr.io) was a simple demo app to connect participants of an event by letting them scan each other's QR code. It was made for IPFS Camp 2019. You can look at their [presentation](https://www.dropbox.com/s/wodmbi6ico3inya/Offline%20Presentation.pdf?dl=0). The code of this simple app is still in their [GitHub repository](https://github.com/JustMaier/gathering).

### Exchange messages

[Berty.tech](https://berty.tech/) will be an IPFS-based messaging app that will ensure connections are made directly between devices, without the need for servers, and will work on a local network if there is no internet connection. It will also work over bluetooth or other proximity transport.

Berty are leading an effort to bring [IPFS to mobile](https://github.com/ipfs-shipyard/gomobile-ipfs). There are also some [guidelines](https://jkosem.gitbook.io/ipfs-mobile-guidelines/) made by professionals for the rise of IPFS on mobile.

### Programming collaboration

[Radicle](https://radicle.xyz/) is a code collaboration platform on top of IPFS.

## Store assets

By storing small scripts or big databases of your project on IPFS, and depending on your architecture, you can yield several benefits. If your users don't use an IPFS client, you will still have content deduplication out of the box. If they use it, your users will seed the content they use, decreasing the workload on your infrastructure, increase uptime of the service in case you go offline. Your users also won't contact your servers for the content they already have.

### Decentralized virtual reality

[Decentraland](https://decentraland.org/) is a virtual world you can explore with a VR set, your computer, or your smartphone. They store all the assets on IPFS, so these heavy files can be fetched from several other users at the same time, for faster loading and synching.

### Video hosting platform

[DTube](https://d.tube) is hosting videos on IPFS to reduce stress on their infrastructure. The website itself is not decentralized, but it mainly manages coordination between users and discoverability of content. You can also learn how to replicate [Youtube on IPFS](https://simpleaswater.com/youtube-on-ipfs/)

### Co-host large datasets

[Qri](https://qri.io/) is an open-source tool for the management of large datasets. Qri users enjoy reduced hosting costs, traceability of changes in the data, rollback to previous versions, and easier collaboration when updating data. De-duplication across datasets also helps to keep physical storage usage as small as possible, along with reducing sync times.

### Deadman switch

[Killcord](https://killcord.io/) is an open project to automatically publicly publish data if the user doesn't check in after some time. This can ensure the ongoing investigation of a journalist carries on if they are unable to do it themselves, as the information gathered will now be public.

### Maps on IPFS

There is an existing [IPFS devgrant](https://github.com/ipfs/devgrants) to host [OpenStreetMaps assets on IPFS](https://github.com/ipfs/devgrants/blob/8233f7df4a219122bcf31eaea289d654406e4443/targeted-grants/open-street-map-ipfs.md). In the long run, this could mean faster synchronization for apps using this scheme and lower bandwidth requirements for servers.

### P2P video streaming platform

[Blust.tv](http://www.blust.tv/) wants to use IPFS to distribute movies when requested by its users. By adding their proprietary _secret-sauce_, they will facilitate the legal streaming of videos over P2P networks.

### Help host important data

Thanks to recent improvement with IPFS Cluster, you can call for help to store your data without having to trust other nodes won't alter the data. With [collaborative mode](https://cluster.ipfs.io/documentation/collaborative) you can [replicate Pacman packages or COVID-19-related papers](https://collab.ipfscluster.io/) without needing to know the intricacies of IPFS.

### Video live streaming

Let your users stream from each other to remove the need for a server without overloading a popular streamer. You can get inspired by the [working prototype](https://github.com/tomeshnet/ipfs-live-streaming) of Toronto Mesh, or by the [experimentations](https://blog.fission.codes/experimenting-with-hls-video-streaming-and-ipfs/) of [Fission](https://fission.codes), a heavy player of the IPFS ecosystem. [Fleek](https://fleek.co) (previously known as Temporal) also did some [experimentation](https://medium.com/temporal-cloud/introducing-s3x-endless-ipfs-dynamic-possibilities-stream-videos-host-dynamic-websites-f0072127070f) using their Amazon S3/IPFS compatibility tool.

## IPFS as infrastructure

Using IPFS abstracts away a lot of the complexity of co-ordination between machines. No matter your architecture IPFS handles load balancing, deduplication, caching, and high availability out-of-the-box. It's highly modular design also means you can easily customize it to your need.

### Decentralized clusters

[IPFS Cluster](https://cluster.ipfs.io/) is the official tool to manage a cluster of nodes to replicate data. Like any distributed cluster, you will have the benefits of redundancy, load balancing, and write permission management. You can choose to connect your cluster to the rest of the IPFS network, or run it privately. You can also invite outsiders to help replicate your data without them having write access, thanks to the [collaborative mode](https://cluster.ipfs.io/documentation/collaborative/).

### Content delivery networks

A [Content Delivery Network](https://en.wikipedia.org/wiki/Content_delivery_network) (CDN) is a network of nodes storing content in places physically close to the users. Having servers physically closer to the users ensures lower latency, enabling load-balancing, and allows you to scale the availability of content with demand. The IPFS network is a CDN by design because each node will cache what they consume and serve that data to it's peers.

### Distributed package managers

The [Node package manager (NPM)](https://www.npmjs.com/) is mirrored on IPFS. By using the dedicated client [npm-on-ipfs](https://github.com/ipfs-shipyard/npm-on-ipfs) packages are fetched from IPFS and distributed to other clients needing them. For example, a team working in the same building will fetch packages from each other, meaning less network traffic costs for the company.

### Hosting software containers

Netflix is on its way to use IPFS to [synchronize their Docker containers worldwide](https://blog.ipfs.io/2020-02-14-improved-bitswap-for-container-distribution/). Since each node fetches them from the fastest peers they know, synchronization is substantially faster than regular sync methods.

### Efficently network factories

[Actyx](https://www.actyx.com/) is helping the manufacturers to fast forward to what they're calling _Industry 4.0_: the industry of connected machines. Actyx built a custom operating system on top of IPFS to ensures all machines and monitors receive the orders, information, and parameters they need to function properly.

## Lower your storage usage

By storing identical data only once on your node, storage-constrained projects are another natural fit for IPFS.

### Compress telemetry data

Sensor data is typically-structured and often contains duplciated blocks of data. In cases where a lot of sensor data is recorded, IPFS can reduce disk usage even more than simple compression [thanks to it's de-duplication techniques](http://blog.klaehn.org/2018/06/10/efficient-telemetry-storage-on-ipfs/).

## Decentralize your data, website or app

By doing so, you increase availability in case your server runs into an issue, your ISP is unhappy with what you publish, or a hostile government forces it to take it down. You will also decrease the load time for your swarm-connected users, and natively enable your app to work offline or on local networks. Depending on your app, your users can also reduce their storage requirements and download time thanks to native deduplication and caching. If hosted on the Ethereum Name System, users of the IPFS Companion or Metamask browser extensions will find it no matter what. Remember that your user will always be able to use the gateways such as IPFS website's or [CloudFlare's](https://www.cloudflare.com/distributed-web-gateway/) to access your app with unmodified browser if needed.

### Resources to do so

#### Decentralized database

[OrbitDB](https://github.com/orbitdb/orbit-db) is the go-to database on IPFS. You rip the benefits of decentralization and traditional databases. Several participants can work on the data offline, and it's synchronized when they come back online thanks to CRDT. There are a [Go](https://github.com/orbitdb/orbit-db) and a Javascript flavor. If you are using MongoDB, you might be more comfortable with [ThreadDB](https://docs.textile.io/threads/introduction/) or [AvionDB](https://github.com/dappkit/aviondb-onboard), which are unstructured databases built on top of IPFS.

#### IPFS hosting with Textile

[Textile](https://Textile.io) is a hosting company on IPFS developing the layers on top of IPFS. Among other things, they came up with [buckets](https://docs.textile.io/hub/buckets/), which are separated "cloud" environment. More generally, Textile has built an impressive toolset for dApp building and integration. See their [blog post](https://blog.textile.io/announcing-the-textile-protocol-hub/) for more information on this toolset.

#### Amazon S3 integration

If you are using AWS S3 connections for your cloud, you can use [this storage server](https://github.com/RTradeLtd/s3x) to replicate it to IPFS with minimal disruption of your workflow. It is forked from the popular object storage server MinIO by the long-standing IPFS company RTrade and should be eventually reintegrated into MinIO natively. The default pinning service is [Temporal](https://temporal.cloud/), but you can choose your own.

#### Make IPFS alternative storage in your NextCloud app

This is made possible by [this open-source project](https://github.com/justicenode/files_external_ipfs).

#### Deploy your GitHub website on IPFS

With [Fleek](https://fleek.co/) (owned by Temporal.cloud), you write your website on Github, then deploy it on IPFS in a few clicks. Upon updating it on GitHub, it's updated online too.

#### Build your app on IPFS and publish it on Ethereum

[Embark](https://github.com/embarklabs/embark) is a framework for Javascript and Solidity application. The logic is on Ethereum thanks to smart contracts, and assets and data are stored on IPFS thanks to OrbitDB.  

#### Move your Vue or Gatsby website to IPFS

Several plugins exist to decentralize your website built with a popular framework. [Here](https://github.com/cwaring/vuepress-plugin-ipfs) is one for Vue and [here](https://github.com/moxystudio/gatsby-plugin-ipfs) is one for Gatsby.

#### Register your domain on a blockchain, and your website on IPFS

The Ethereum Name Service is now the standard for decentralizing domain names (meaning the address of your website) without needing the centralized DNS. You can see a (technical) demo of the concept [here](https://www.youtube.com/watch?v=3AS2BD22DZg), and a presentation [here](https://github.com/ipfs/camp/blob/master/LIGHTNING_TALKS/ipfscamp2019-lightningtalk-ensipfs.pdf). IPFS-upgraded browsers like [Brave](https://brave.com) or [Opera](https://www.opera.com) can resolve them natively, and any browser with the [IPFS Companion extension](https://github.com/ipfs-shipyard/ipfs-companion) can as well.

[Unstoppable Domains](https://unstoppabledomains.com/) is another solution letting you easily deploy your website on IPFS. You will also need a browser extension to access the website.

#### Build a dApp

There are many available frameworks to build decentralized apps on IPFS. See for example [Dappkit](https://dappkit.io/), [Fission](https://fission.codes/), [Fleek](https://fleek.co/), or [Textile](https://textile.io/).

### Examples of projects doing so

#### Share photos with friends, comment them and interact

[Textile](https://textile.io/) is one of the oldest company building with IPFS. It developed the concept of Threads to transform IPFS into a social network featuring feeds and events. They built the [first app](https://github.com/textileio/photos) on top of it letting you privately share photos with your friends: Textile Photos.

#### SecureMyState

This award-winning working prototype of an app for government/citizens communication was built in two days during the [DenverETH 2020](https://ethdenver.com/) hackathon. It lets Colorado citizens manage state-owned data about themselves, such as their driving license status or business registration.

You can see its [code](https://github.com/twos-complement/eth-denver-2020), or a [slide presentation](https://www.figma.com/proto/usEzmsRYQCe3MP8qp4ur5H/Advance-Colorado?node-id=76%3A5625&viewport=143%2C-89%2C0.049727652221918106&scaling=scale-down).

#### Marketplace

[Haven](https://gethaven.app/) is a privacy-focused mobile app for shopping. Haven doesn't know its users' buying history, let them pay in cryptos, and doesn't take cut on the sales.

#### Torrent tracker hub

[BitTorrent](https://en.wikipedia.org/wiki/Bittorrent) is a powerful P2P file-sharing technology, but it works better with the help of centralized "trackers" helping users know who has what. Some people tried with some success to decentralize them. You can find their working prototype [here](https://github.com/urbanguacamole/torrent-paradise).

#### COVID-19 tracker

This dead-simple tracker API lets any IPFS node request the latest data about the COVID-19 pandemics. See the code on [GitHub](https://github.com/RTradeLtd/ipcoronafs).

#### Make your software distribution more distributed

This simple [GitHub Action](https://github.com/marketplace/actions/upload-to-ipfs) lets you upload your GitHub Releases on IPFS automatically.

#### Backup you Wolfram data

In a recent update, Wolfram let users store their computation or assets on IPFS. Check out the [version notes](https://writings.stephenwolfram.com/2020/03/in-less-than-a-year-so-much-new-launching-version-12-1-of-wolfram-language-mathematica/) to know how.

#### Music streaming platform

[Audius](https://audius.co/) is a music streaming platform built on IPFS, where artists are in control, where no fees are taken by the platform, and where listeners can enjoy their music while offline.

#### Music player

[Diffuse.sh](https://diffuse.sh/) is an online music player that you can connect to your music repositories to listen to it from anywhere. You can now connect it to IPFS repositories.

## Decentralize the Web itself

Some core pieces of the Web are still centralized, making it more prone to break or being censored. IPFS can help and make the Web more resilient.

### Examples of projects

#### Decentralize the DNS

The [Domain Name System](https://en.wikipedia.org/wiki/Domain_Name_System) (DNS) is one of the most centralized pieces of the Web. By having to ask a central place to know where to find  "google.com" or "facebook.com", it is a central point of failure, be it a technical incident, malicious hack, or voluntary censorship. Backing the DNS on IPFS could improve its availability. A [prototype](https://www.npmjs.com/package/orbitdns) for Javascript has been published on npm.

#### Archive the web

Thanks to deduplication, IPFS is a powerful tool for archiving the Web. The [InterPlanetary Wayback](https://github.com/oduwsdl/ipwb) is tackling this endeavor.

#### Fight censorship

Wikipedia is not accessible in Turkey for a few years, but the Protocol Labs is hosting a mirror of several languages on IPFS. See the original [blog post](https://blog.ipfs.io/24-uncensorable-wikipedia/) and the [project code](https://github.com/ipfs/distributed-wikipedia-mirror).

#### Build an alternative ISP

[Althea](https://althea.net/about) is building an alternative [Internet Service Provider](https://en.wikipedia.org/wiki/Internet_service_provider) (ISP) in the US as the low level of competition brings the quality of service down and prices up. Althea especially targets rural areas, where the coverage by traditional ISP is low.

## Blockchain use-cases

IPFS is a natural fit for [blockchain](https://en.wikipedia.org/wiki/Blockchain) use cases. The common state of the chain is distributed on-chain among participants, and specific data is stored on IPFS. Thanks to content addressing, the blockchain only needs to store the IPFS multihash, and users are sure to fetch correct data from any of their peers. This architecture is becoming a de facto standard for blockchain apps based on Ethereum.

### Examples of projects

#### Create a global market place for data storage

[Filecoin](https://filecoin.io/) is not only a blockchain on IPFS. It is the blockchain *of* IPFS. Filecoin lets any storage owner host data for users who need additional space. It is one of the reasons IPFS exists in the first place and will be a great accelerator of the IPFS growth once fully online later this year. The project is developed by [Protocol Labs](https://protocol.ai/), which are stewarding the development of IPFS.
Textile.io is building the [Powergate](https://blog.textile.io/filecoin-developer-tools-concepts/) tool for your app to interact with Filecoin once the main net is launched.

#### Reconcile IoT and privacy

The [Iotex](https://www.iotex.io/) blockchain wants to build an ecosystem where IoT data are owned by their respective owners. Data of their hardware devices such as cameras can be stored on local hardware, backed up to cloud, or to IPFS. Future integration with Filecoin will further reinforce the ownership of data by the users.

#### Send cryptos to a human-readable address

This project lets you have a human-readable Ethereum address, so people don't have to send it to a long, error-prone address.
You can check it [here](https://devfolio.co/submissions/humanize-pay).

#### Make AI an online service

[MindSync](https://mindsync.ai/) wants to build a blockchain hosting AI competitions and let AI skills offer and demand meet. Consumers can hire specialists per task, and they are paid in cryptos.

#### Create a decentralized exchange for Ethereum ERC20 tokens

This [project](https://github.com/5daytech/udex-app-android) is still in a very early phase but may inspire some of you.

#### A platform for exchanging notes, courses, and more for education

[RocketShoes](https://www.rocketshoes.io/) is an education platform where students produce and tag learning materials, assignments, notes, and digital assets. These are stored on IPFS, and the blockchain ensures the timestamping, proof of ownership, and incentivization layer.

#### Distribute IoT data

The Tangle (the distributed ledger of the [IOTA](https://www.iota.org/) network) supports hosting IoT data on IPFS, again for better availability, deduplication, etc. You can find out more [here](https://github.com/iotaledger/poc-ipfs).

#### Query the DWeb across blockchains

[TheGraph](https://thegraph.com/) wants to enable users to look for information on any blockchain or distributed service thanks to their query language GraphQL and the indexations of the chains thanks to IPFS.

#### Proof of ownership

With IPFS and a blockchain, you can prove ownership of a file at a certain time without disclosing it. See here an [example of implementation](https://github.com/mustafarefaey/PrivateStamp).

#### Proof of "humanness"

[Idena](https://idena.io/) is a blockchain to prove that you are human (which is distinct from DID). It uses IPFS under the hood.

#### Build Smart City apps

[Robonomics](https://robonomics.network/) is building a framework on top of Ethereum and IPFS for [smart cities](https://en.wikipedia.org/wiki/Smart_city) apps to easily exchange data (from sensors or computation for example).

#### Make a decentralized prediction market

[Augur](https://www.augur.net/) is a blockchain and decentralized market where you can bet on anything or request prediction from the crowd wisdom. Like so many blockchain-based apps, the data is hosted on IPFS.

## Decentralized Identity (DID)

A [Decentralized Identity](https://en.wikipedia.org/wiki/Decentralized_Identifiers) is a concept of storing all your personal data on your devices rather than let every service you use store a partial copy of it as it is now. You having control of your data means that you decide which app has access to what, that you only fill your information once, that you can revoke access, etc. DID is a hot topic for Web3.0, and IPFS is one of the core technology a lot of engineers build DID around. The identity wallet [Nomios](https://nomios.io/) shared [some thoughts](https://docs.google.com/presentation/d/1HbydOI0w-T_FY23zCACAyHmzDq1ZvyG2tklpPSm6OQQ/edit#slide=id.g5c88e8f60d_0_11) about DID in general during the [IPFS Camp 2019](https://github.com/ipfs/camp).

### Examples of projects

#### Element

[Element](element-did.com) is an open-source project combines the content addressing and the interactiveness of Ethereum smart contracts to provide a tool for managing identity.

#### 3ID Connect

3ID Connect is developed by [3Box](https://3box.io/), a personal data manager for apps leveraging IPFS. 3Box wants to make using DID as simple as clicking on "Connect with Google" or "Connect with Facebook". You can read their [article](https://medium.com/3box/introducing-3id-connect-531af4f84d3f) explaining how to bring it to your app.

#### Microsoft ION

[Microsoft](https://www.microsoft.com/) started experimentation by pinning some DID information to IPFS and publishing the hash to the Bitcoin blockchain. This design is well known for blockchain-based apps and is here use for DID. Find more details [here](https://techcommunity.microsoft.com/t5/azure-active-directory-identity/toward-scalable-decentralized-identifier-systems/ba-p/560168).

#### Ceramic Protocol

The [Ceramic Protocol](https://www.ceramic.network/) is another proposition for DID on IPFS, along with a complete protocol for data and document exchanges.

#### Nomios

[Nomios](https://nomios.io/) is another promising solution that started to work with IPFS from the start. Check out their website for more information.

## Some additional resources and ideas

More implemented ideas can be found on [Awesome IPFS](https://awesome.ipfs.io/).

## Non-implemented use cases

Here is a non-exhaustive list of use cases that were not implemented yet. Pick up the challenge yourself or follow your own idea! If you want to discuss your idea or have some problems, head to [the IPFS forum](https://discuss.ipfs.io) or [the IPFS help page](https://ipfs.io/help/).

- [Coordinate activists groups without fear from censorship](https://discuss.ipfs.io/t/building-a-secure-activist-membership-management-tool-on-ipfs/5702/3)
- [Manage the knowledge of the whole world](https://www.underlay.org/)
- [Build a giant database for genetic data](https://discuss.ipfs.io/t/addressing-petabytes-of-genetic-data-with-ipfs/1471/10)
- [Create a mesh network on IPFS](https://discuss.ipfs.io/t/mozilla-nsf-a-2-million-prize-to-decentralize-the-web/654)
- [Bring additional services to your existing mesh network](www.nycmesh.net)
- Serverless online gaming
- [Put Hadoop on IPFS](https://discuss.ipfs.io/t/minerva-build-the-hadoop-hive-on-ipfs/5832)
- Add more transports to IPFS for mobile usage ([here](https://github.com/ggerganov/wave-share#wave-share) or [here](https://github.com/RTradeLtd/libp2p-lora-transport) )
- [Cohost the site you visit](https://github.com/ipfs-shipyard/cohosting)
- [Distributed cards for spaced learning](https://discuss.ipfs.io/t/check-out-my-flashcard-app-that-uses-the-ipfs/6543/2)
- [Unblock the offline-first use cases](http://offlinefirst.org/casestudies/)
- [Build a distributed OS](https://github.com/ipfs/ipfs/issues/247)
- [Distribute the medical data](https://github.com/ipfs/notes/issues/292)
- Improve information sharing during disaster recovery
- [Get a grant for your help or propose an open grand](https://github.com/ipfs/devgrants)
- Make an interactive app for your classroom
- [Build a distributed social media](https://discuss.ipfs.io/t/social-media-architecture-with-ipfs/4625/58)
- [Decentralize peer-reviewing of scholar papers](https://discuss.ipfs.io/t/ipfs-implementation-for-publication-of-decentralized-peer-review/7692)
- [Help to host NASA databases](https://discuss.ipfs.io/t/nasas-earthdata-cloud/7528)
- [Help to host LibGen materials](https://discuss.ipfs.io/t/torrent-site-of-scientific-papers-needs-help/6815)
- [Make a manga reader](https://discuss.ipfs.io/t/manga-reader-over-ipfs/4832)
- [Make a Gif-sharing platform](https://discuss.ipfs.io/t/a-vine-clone-built-using-ipfs/3337)
- An interactive P2P application working in crowded events such as festivals
- [Ethereum/Solidity Smart Contract CI Toolchain on IPFS](https://discuss.ipfs.io/t/ethereum-solidity-smart-contract-ci-toolchain-on-ipfs-wip/1780)
- [Various ideas from GitHub](https://github.com/ipfs/ipfs/labels/applications%20of%20ipfs)
