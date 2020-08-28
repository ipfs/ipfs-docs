---
title: Usage ideas & examples
sidebarDepth: 0
description: Explore some helpful use cases, ideas, and examples for the InterPlanetary File System (IPFS).
---

# Usage ideas and examples

IPFS is a versatile technology and can be used in a huge array of use-cases. Below is a long, yet far from exhaustive, list of projects built on IPFS. Some are minimalistic prototypes, and others are complete projects backed by mature companies.

## Share files

One of the simplest use-cases to grasp is the sharing of files between peers.

### Desktop applications

[IPFS Desktop](https://github.com/ipfs-shipyard/ipfs-desktop) is the official desktop client for IPFS. It comes with a built-in IPFS node that lets you pin files and gives you a link to share them. This is generally seen as the easiest point-of-entry into the IPFS ecosystem.

[Arbore](https://arbo.re) Arbore is a free and open-source file-sharing application that enables you to send your pictures, documents, files to your contacts privately and without limits.

Another alternative is [Orion](https://orion.siderus.io). Orion is an easy to use IPFS Desktop client. It helps to share content on the public peer to peer network without any command line or technical knowledge. The app includes everything needed to start your own personal IPFS node.

### Share your files or sell copies of it

[Enzypt.io](https://enzypt.io) lets you sell files or simply get a link to share.

[FileNation](https://github.com/FileNation/FileNation) is an alternative if you only want to share.

### Dead drop

A [dead drop](https://deaddrops.com/) is a drive or another storage device that is physically immobilized in a public location for people to pick-up and deposit files. There is now an IPFS version, thanks to the [IPFS Dead Drop project](https://github.com/c-base/ipfs-deaddrop).

## Collaborate

Let IPFS coordinate the flow of data between you and your colleagues, even when working offline or on a local network.

### Collaborate on written documents

[PeerPad.org](https://peerpad.net) is a service that allows you to write, collaborate, and export Markdown documents directly in your browser, similar to how Google Docs works.

### Version control

The [Inter-Planetary Version Control system (IPVC)](https://github.com/martindbp/ipvc) is a distributed version control system similar to [git](https://git-scm.com/) but built on IPFS. It is suitable for any kind of data, not only human-readable content. It is also particularly suitable for versioning large files. The underlying concepts are heavily influenced by [git](https://git-scm.com/) and [gitless](https://gitless.com/).

### Connect event attendants

[Gthr.io](https://gthr.io) was a simple demo app to connect participants of an event by letting them scan each other's QR code. It was made for IPFS Camp 2019. You can look at their [presentation](https://www.dropbox.com/s/wodmbi6ico3inya/Offline%20Presentation.pdf?dl=0). The code of this simple app is still in their [GitHub repository](https://github.com/JustMaier/gathering).

### Exchange messages

[Berty.tech](https://berty.tech/) will be an IPFS-based messaging app that will ensure connections are made directly between devices, without the need for servers, and will work on a local network if there is no internet connection. It will also work over Bluetooth or other proximity transport.

Berty is leading the effort to bring [IPFS to mobile](https://github.com/ipfs-shipyard/gomobile-ipfs). There are also some [guidelines](https://jkosem.gitbook.io/ipfs-mobile-guidelines/) made by professionals for the rise of IPFS on mobile.

## Store assets

By storing small scripts or big databases of your project on IPFS, and depending on your architecture, you can yield several benefits. If your users don't use an IPFS client, you will still have content de-duplication out of the box. If they use it, your users will seed the content they use, decreasing the workload on your infrastructure, increase uptime of the service in case you go offline. Your users also won't contact your servers for the content they already have.

### Decentralized virtual reality

[Decentraland](https://decentraland.org/) is a virtual world you can explore with a VR set, your computer, or your smartphone. They store all the assets on IPFS, so these heavy files can be fetched from several other users at the same time, for faster loading and synching.

### Video hosting platform

[DTube](https://d.tube) is hosting videos on IPFS to reduce stress on their infrastructure. The website itself is not decentralized, but it mainly manages coordination between users and discoverability of content. You can also learn how to replicate [Youtube on IPFS](https://simpleaswater.com/youtube-on-ipfs/)

### Co-host large datasets

[Qri](https://qri.io/) is an open-source tool for the management of large datasets. Qri users enjoy reduced hosting costs, traceability of changes in the data, rollback to previous versions, and easier collaboration when updating data. De-duplication across datasets also helps to keep physical storage usage as small as possible, along with reducing sync times.

### Parallelize Big Data analysis

On some heavy analysis, you can benefit from parallelizing calculations on several nodes using Hadoop, for example. But on very large datasets, fetching the relevant subset for each node to compute is longer than the actual computation. Scott Brisbane proposed design in a [thesis](https://s3-ap-southeast-2.amazonaws.com/scott-brisbane-thesis/decentralising-big-data-processing.pdf) to drastically reduce the fetching time using IPFS and divided the overall analysis time by four. Here is a [one-page summary](https://www.cse.unsw.edu.au/~hpaik/thesis/showcases/16s2/scott_brisbane.pdf) of the concept.

### Deadman switch

[Killcord](https://killcord.io/) is an open project to automatically publicly publish data if the user doesn't check in after some time. This can ensure the ongoing investigation of a journalist carries on if they are unable to do it themselves, as the information gathered will now be public.

### Maps on IPFS

There is an existing [IPFS devgrant](https://github.com/ipfs/devgrants) to host [OpenStreetMaps assets on IPFS](https://github.com/ipfs/devgrants/blob/8233f7df4a219122bcf31eaea289d654406e4443/targeted-grants/open-street-map-ipfs.md). In the long run, this could mean faster synchronization for apps using this scheme and lower bandwidth requirements for servers.

### P2P video streaming platform

[Blust.tv](http://www.blust.tv/) wants to use IPFS to distribute movies when requested by its users. By adding their proprietary _secret-sauce_, they will facilitate the legal streaming of videos over P2P networks.

### Help host important data

Thanks to recent improvement with IPFS Cluster, you can call for help to store your data without having to trust other nodes won't alter the data. With [collaborative mode](https://cluster.ipfs.io/documentation/collaborative), you can [replicate Pacman packages or COVID-19-related papers](https://collab.ipfscluster.io/) without needing to know the intricacies of IPFS.

### Video live-streaming

Let your users stream from each other to remove the need for a server without overloading a popular streamer. You can get inspired by the working prototype of [Toronto Mesh](https://github.com/tomeshnet/ipfs-live-streaming), or by the [experimentations](https://blog.fission.codes/experimenting-with-hls-video-streaming-and-ipfs/) of [Fission](https://fission.codes). [Fleek](https://fleek.co) also did some [experimentation](https://medium.com/temporal-cloud/introducing-s3x-endless-ipfs-dynamic-possibilities-stream-videos-host-dynamic-websites-f0072127070f) using their Amazon S3/IPFS compatibility tool.

### Decentralized robots

The robotics company [KODA](https://www.koda9.com/) is developing the world's first decentralized robot dog called [Koda-9](https://www.whipsaw.com/thinking/new-era-of-household-robots/). It uses IPFS to store user data such as security footage.

## IPFS as infrastructure

Using IPFS allows you to abstract away a lot of the complexity of coordination between machines. No matter your architecture IPFS handles load balancing, de-duplication, caching, and high availability out-of-the-box. It's highly modular design also means you can easily customize it to your need.

### Decentralized clusters

[IPFS Cluster](https://cluster.ipfs.io/) is the official tool to manage a cluster of nodes to replicate data. Like any distributed cluster, you will have the benefits of redundancy, load balancing, and write permission management. You can choose to connect your cluster to the rest of the IPFS network or run it privately. You can also invite outsiders to help replicate your data without them having write-access, thanks to the [collaborative mode](https://cluster.ipfs.io/documentation/collaborative/).

### Content delivery networks

A [Content Delivery Network](https://en.wikipedia.org/wiki/Content_delivery_network) (CDN) is a network of nodes storing content in places physically close to the users. Having servers physically closer to the users ensures lower latency, enabling load-balancing, and allows you to scale the availability of content with demand. The IPFS network is a CDN by design because each node will cache what they consume and serve that data to its peers.

### Distributed package managers

The [Node package manager (NPM)](https://www.npmjs.com/) is mirrored on IPFS. By using the dedicated client [npm-on-ipfs](https://github.com/ipfs-shipyard/npm-on-ipfs), packages are fetched from IPFS and distributed to other clients needing them. For example, a team working in the same building will fetch packages from each other, meaning less network traffic costs for the company.

The developers of the [Nix package manager](https://nixos.org/) are working on integrating IPFS for distribution of binary packages and sources.

### Hosting software containers

Netflix is on its way to use IPFS to [synchronize their Docker containers worldwide](https://blog.ipfs.io/2020-02-14-improved-bitswap-for-container-distribution/). Since each node fetches them from the fastest peers they know, synchronization is substantially faster than regular sync methods.

### Efficient network factories

[Actyx](https://www.actyx.com/) is helping the manufacturers to upgrade their plants to the [_Industry 4.0_](https://en.wikipedia.org/wiki/Industry_4.0) era, meaning connecting the machines together for better performance, tolerance to failure and flexibility. Actyx built a custom operating system on top of IPFS they deploy on all machines, so they emit metrics, receive orders, sync up information, and compute their next move locally.

## Lower your storage usage

By storing identical data only once on your node, storage-constrained projects are another natural fit for IPFS.

### Compress telemetry data

Sensor data is typically-structured and often contains duplicated blocks of data. In cases where a lot of sensor data is recorded, IPFS can reduce disk usage even more than simple compression [thanks to its de-duplication techniques](http://blog.klaehn.org/2018/06/10/efficient-telemetry-storage-on-ipfs/).

## Decentralize your data

By decentralizing your data, you increase availability in case your server runs into an issue, your ISP is unhappy with what you publish, or a hostile government issues a take-down-order. You will also decrease the load time for your swarm-connected users, and natively enable your app to work offline or on local networks. Depending on your app, your users can also reduce their storage requirements and download time thanks to native de-duplication and caching.

### Decentralized database

[OrbitDB](https://github.com/orbitdb/orbit-db) is a serverless, distributed, peer-to-peer database. OrbitDB uses IPFS as its data storage and IPFS Pubsub to automatically sync databases with peers. It's an eventually consistent database that uses CRDTs for conflict-free database merges, making OrbitDB an excellent choice for decentralized apps (dApps), blockchain applications, and offline-first web applications. There are Go and Javascript implementations available.

If you are currently using MongoDB, you might be more comfortable with [ThreadDB](https://docs.textile.io/threads/introduction/) or [AvionDB](https://github.com/dappkit/aviondb-onboard), which are unstructured databases built on top of IPFS.

### IPFS hosting with Textile

[Textile](https://Textile.io) is a hosting company on IPFS developing the layers on top of IPFS. Among other things, they came up with separated _cloud_ environments called [buckets](https://docs.textile.io/hub/buckets/). Textile has also built an impressive toolset for [building decentralized applications and integrations](https://blog.textile.io/announcing-the-textile-protocol-hub/).

### AWS S3 integration

If you are using Amazon Web Service's S3 connections for your cloud, you can use [RTrade's storage server](https://github.com/RTradeLtd/s3x) to replicate it on IPFS with minimal disruption to your workflow. It is forked from the popular object storage server [MinIO](https://min.io/) and will be re-integrated into MinIO natively sometime soon.

### NextCloud integration

[JusticeNode has created an extension](https://github.com/justicenode/files_external_ipfs) for the popular self-hosted cloud service NextCloud. This integration allows users to use IPFS as external storage.

### Deploy your website on IPFS

[Fleek.co](https://fleek.co/) allows you to effortlessly build sites & apps on IPFS. The workflow is similar to that of Netlify: developers can link their website or web app hosted on GitHub to Fleek and have it automatically built and deployed on IPFS whenever a change is made to a specific branch. Fleek also comes with Ethereum Name Service (ENS) and domain name integration and plan to enable many more ways to deploy soon: more Git providers, deploy via command-line interface, drag & drop a folder, via API, etc.

### Ethereum and Solidity specific applications

[Embark](https://framework.embarklabs.io/) is an all-in-one developer platform for building and deploying decentralized applications. It currently integrates with Ethereum blockchains, decentralized storage like IPFS, and decentralized communication platforms like Whisper and Orbit.

### Static-site generators

Several plugins exist to decentralize your website built with popular static-site generators like [VuePress](https://github.com/cwaring/vuepress-plugin-ipfs) or [Gatsby](https://github.com/moxystudio/gatsby-plugin-ipfs).

## Build a dApp

There are many available frameworks to build decentralized apps on IPFS. See for example [Dappkit](https://dappkit.io/), [Fission](https://fission.codes/), [Fleek](https://fleek.co/), or [Textile](https://textile.io/).

### SecureMyState

This app for government-citizen communication was built in two days during the [DenverETH 2020](https://ethdenver.com/) hackathon. It lets Colorado citizens manage state-owned data about themselves, such as their driving license status or business registration. You can see its [code](https://github.com/twos-complement/eth-denver-2020), or a [slide presentation](https://www.figma.com/proto/usEzmsRYQCe3MP8qp4ur5H/Advance-Colorado?node-id=76%3A5625&viewport=143%2C-89%2C0.049727652221918106&scaling=scale-down).

### Marketplace

[Haven](https://gethaven.app/) is a privacy-focused mobile app for shopping. Haven doesn't know its users' buying history, lets them pay with crypto, and doesn't take a cut on.

[Origin](https://www.originprotocol.com/) is a blockchain-powered online commerce platform that stores data on IPFS. The [Brave](https://brave.com/) web browser has their own store on it to sell their swag.

### Torrent tracker hub

[BitTorrent](https://en.wikipedia.org/wiki/Bittorrent) is a powerful P2P file-sharing technology, but it works better with the help of centralized _trackers_ helping users know who has what. Some people tried with some success to decentralize them. You can find their working prototype [here](https://github.com/urbanguacamole/torrent-paradise).

### COVID-19 tracker

This simple tracker API lets any IPFS node request the latest data about the COVID-19 pandemics. See the code on [GitHub](https://github.com/RTradeLtd/ipcoronafs).

### GitHub integration

This simple [GitHub Action](https://github.com/marketplace/actions/upload-to-ipfs) lets you upload your GitHub Releases on IPFS automatically.

### Backup you Wolfram data

In a recent update, Wolfram let users store their computation or assets on IPFS. Check out the [version notes](https://writings.stephenwolfram.com/2020/03/in-less-than-a-year-so-much-new-launching-version-12-1-of-wolfram-language-mathematica/) for more information.

### Music streaming platform

[Audius](https://audius.co/) is a music streaming platform built on IPFS. Artists are in control, no fees are taken by the platform, and listeners can enjoy their music while offline.

### Music player

[Diffuse.sh](https://diffuse.sh/) is an online music player that you can connect to your music repositories to listen to it from anywhere. You can now connect it to IPFS repositories.

### Decentralized autonomized organization (DAO)

[Aragon](https://aragon.org/), a service for creating DAOs, uses IPFS to store its data.

## Decentralize the Web itself

Some core pieces of the web are still centralized, making it more prone to break or being censored. IPFS can help and make the web more resilient.

### Decentralized DNS

The [Domain Name System](https://en.wikipedia.org/wiki/Domain_Name_System) (DNS) is one of the most centralized pieces of the web. By having to ask a central place to know where to find `google.com` or `facebook.com`, it is a central point of failure. Backing up the DNS on IPFS could improve its availability. A prototype for Javascript has been [published on NPM](https://www.npmjs.com/package/orbitdns).

### Archive the web

Thanks to de-duplication, IPFS is a powerful tool for archiving the web. The [InterPlanetary Wayback](https://github.com/oduwsdl/ipwb) is tackling this endeavor.

### Fight censorship

Wikipedia has not been accessible in Turkey for a few years. The company behind IPFS, Protocol Labs, is hosting a mirror of Wikipedia on IPFS. See the original [blog post](https://blog.ipfs.io/24-uncensorable-wikipedia/) and the [project code](https://github.com/ipfs/distributed-wikipedia-mirror) for more information.

## Blockchain use-cases

IPFS is a natural fit for [blockchain](https://en.wikipedia.org/wiki/Blockchain) use cases. The common state of the chain is distributed on-chain among participants, and specific data is stored on IPFS. Thanks to content addressing, the blockchain only needs to store the IPFS multihash, and users are sure to fetch correct data from any of their peers. This architecture is becoming the de facto standard for blockchain applications.

### Global market place for data storage

[Filecoin](https://filecoin.io/) lets any storage owner host data for users who need additional space. It is one of the reasons IPFS exists in the first place and will be a great accelerator of the IPFS growth once fully online later this year. The project is developed by [Protocol Labs](https://protocol.ai/).

Textile.io is building the [Powergate](https://blog.textile.io/filecoin-developer-tools-concepts/) tool for your app to interact with Filecoin once the main net is launched.

### Internet-of-Things and privacy

[Iotex](https://www.iotex.io/) is a hardware company also providing a secure platform to host the data generated by the user, with particular attention to privacy. Owners of a [_Ucam_ security camera](https://ucam.iotex.io/) can choose to store it locally, on a cloud, or on IPFS-backed storage. Iotex provides a blockchain managing identities ensuring only the owner of the data can access them, not even Iotex.

### Exchange Internet-of-Things data

[IOTA](https://www.iota.org/) is a foundation maintaining _the Tangle_, a blockchain-like network with zero fees. Their vision is to automate the exchange of data between sensors, machines, and other devices, for free or sold by the provider. IOTA [announced](https://docs.iota.org/docs/blueprints/0.1/tangle-data-storage/overview) that data can now be hosted on IPFS, [as shown in this demo](https://ipfs.iota.org/).

### Send crypto to human-readable addresses

The [Humanize Pay project](https://devfolio.co/submissions/humanize-pay) lets you have a human-readable Ethereum address, so users don't have to deal with long and un-memorable addresses.

### AI as a service

[MindSync](https://mindsync.ai/) wants to build a blockchain hosting AI competitions and let AI skills offer and demand meet.

### Education platform

[RocketShoes](https://www.rocketshoes.io/) is an education platform where students produce and tag learning materials, assignments, notes, and digital assets. These are stored on IPFS, and the blockchain ensures the timestamping, proof of ownership, and incentivization layer.

### Query the DWeb across blockchains

[TheGraph](https://thegraph.com/) wants to enable users to look for information on any blockchain or distributed service thanks to their query language GraphQL and the indexations of the chains thanks to IPFS.

### Proof of ownership

With IPFS and a blockchain, you can prove ownership of a file at a certain time without disclosing it. See here an [example of implementation](https://github.com/mustafarefaey/PrivateStamp).

### Proof of _humanness_

[Idena](https://idena.io/) is a blockchain to prove that you are human (which is distinct from DID). It uses IPFS under the hood.

### Build Smart City apps

[Robonomics](https://robonomics.network/) is building a framework on top of Ethereum and IPFS for [smart cities](https://en.wikipedia.org/wiki/Smart_city) apps to easily exchange data (from sensors or computation, for example).

### Decentralized prediction markets

[Augur](https://www.augur.net/) is a blockchain and decentralized market where you can bet on anything or request prediction from the crowd wisdom. Like so many blockchain-based apps, the data is hosted on IPFS.

### Decentralized weather data

The weather risk marketplace [Arbol](https://www.arbolmarket.com/) relies on blockchain technology to track and validate weather data. [Arbol uses IPFS](https://www.arbolmarket.com/maintaining-data-integrity-at-arbol/) to store multiple terabytes of verified weather data without fear of tampering.

## Decentralized Identity

[Decentralized Identity](https://en.wikipedia.org/wiki/Decentralized_Identifiers) is the concept of storing all your personal data on your devices rather than let every service you use store a partial copy of it. You having control of your data means that you decide which app has access to what, that you only fill your information once, and that you can revoke access. Decentralized identity is a hot topic, and IPFS is one of the core technologies a lot of engineers build around. The identity wallet [Nomios](https://nomios.io/) shared [some thoughts](https://docs.google.com/presentation/d/1HbydOI0w-T_FY23zCACAyHmzDq1ZvyG2tklpPSm6OQQ/edit#slide=id.g5c88e8f60d_0_11) about decentralized identity general during the [IPFS Camp 2019](https://github.com/ipfs/camp).

### Element

[Element](element-did.com) is an open-source project that combines the content addressing and the interactiveness of Ethereum smart contracts to provide a tool for managing identity.

### 3ID Connect

3ID Connect is developed by [3Box](https://3box.io/), a personal data manager for apps leveraging IPFS. 3Box wants to make using decentralized identity as simple as clicking on _Connect with Google_ or _Connect with Facebook_. You can read their [article](https://medium.com/3box/introducing-3id-connect-531af4f84d3f) explaining how to bring it to your app.

### Microsoft ION

[Microsoft](https://www.microsoft.com/) started experimentation by pinning some decentralized identity information to IPFS and publishing the hash to the Bitcoin blockchain. Microsoft wrote a [blog post about their findings](https://techcommunity.microsoft.com/t5/azure-active-directory-identity/toward-scalable-decentralized-identifier-systems/ba-p/560168).

### Ceramic Protocol

The [Ceramic Protocol](https://www.ceramic.network/) is another proposition for decentralized identity on IPFS, along with a complete protocol for data and document exchanges.

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
