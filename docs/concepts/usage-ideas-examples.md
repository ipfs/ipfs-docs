---
title: Usage ideas & examples
sidebarDepth: 0
issueUrl: https://github.com/ipfs/docs/issues/387
description: Explore some helpful use cases, ideas, and examples for IPFS, the InterPlanetary File System.
related:
  'Awesome IPFS: Showcase of projects and tools built on IPFS': https://awesome.ipfs.io/
  'IPFS Forums: Use cases and applications': https://discuss.ipfs.io/c/ecosystem/applications-of-ipfs
  'Visualization: IPFS developer use cases and goals': https://app.mural.co/t/protocollabs6957/m/protocollabs6957/1564779785852/cf7669f3c1773508a811a3fa0eadfb99efb310bf
  "IPFS GitHub repo: Issues labeled 'applications of IPFS'": https://github.com/ipfs/ipfs/labels/applications%20of%20ipfs
---


Ressources (this line is to delete): https://docs.google.com/spreadsheets/d/1zhYenLnQAPE7s7mVL0f5A0IMYULw9hF9et3vwvAARkI/edit?usp=sharing


# Usage ideas and examples

<ContentStatus />


IPFS is a versatile technology. It can unlock use cases needing either better compression, availability, partition tolerance, caching, integrity guarantees, etc.




## Share files with friends
The easiest use case to grasp is the sharing of files between peers. Check out some of the projects below. 

### Examples of projects

#### Desktop applications
IPFS Desktop is the official desktop client for IPFS. It comes with its built-in node or can work with your custom version of IPFS, and let you pin files, get a link to share them, activate experiments like npm-on-ipfs, etc. 

Arbore is a desktop app letting your share files and syncing up your collection with your friends.
https://arbo.re/

Another alternative is Orion, by Siderius.io. You can find it at https://orion.siderus.io

#### Share your files or sell copies of it
Enzypt.io lets you sell files or simply get a link to share.
https://github.com/FileNation/FileNation is an alternative if you only want to share.  

#### Privacy-focused P2P sharing platform
Peergos.net will be another platform to exchange file with friends, but with a key difference. It is designed for privacy, and they are putting a lot of effort into it. 

#### Dead drop
A dead drop is a drive or another storage device that is physically immobilized in a public location for people to pick-up and deposit files on it. There is now an IPFS version of it thanks to this open-source project: https://github.com/c-base/ipfs-deaddrop

#### Share files on a map
Filemap.xyz is an unmaintained but still working open-source project waiting to be continued. You can upload a file and create a link to it being an address of a physical location, that you can click on the map. Hence, you can avoid making your grandpa remember another short link as they can have all you share at his address. You can also make a treasure map and leave clues about where to find it, maybe? A creative project calls for more creative projects. (https://github.com/fiatjaf/filemap.xyz)

## Collaborate
Let IPFS coordinate the flow of data between you and your colleagues, even when working offline or on a local network.

### Examples of projects

#### Collaborate on written documents
Peerpad.org is letting you collaborate in real-time on an online document thanks to a node running in your browser. The difference with Google Docs? No server sees your sensitive file but your collaborators, and you can work offline and catch up when your connection is back. 

#### Version Control
IPFS internally has a dedicated data format for Git data. Hence, there are several projects to put Git on IPFS. Check out the following: https://github.com/martindbp/ipvc 

#### Connect attendants of an event
Gthr.io was a simple demo app to connect participants of an event by letting them scan each other's QR code. It was made for IPFS Camp 2019. You can look at their presentation (https://www.dropbox.com/s/wodmbi6ico3inya/Offline%20Presentation.pdf?dl=0 ). The code of this simple app is still in their GitHub repository: https://github.com/JustMaier/gathering

#### Exchange messages on mobile
Berty.tech will be an IPFS-based messaging app that will ensure connections are made directly between devices, without the need for servers, and will work on a local network if there is no internet connection. It will also work over Bluetooth or other proximity transport. Its code is now open source: https://github.com/berty/berty
More generally, they lead an effort to bring IPFS to mobile here: https://github.com/ipfs-shipyard/gomobile-ipfs
There is also some guidelines made by professionals for the rise of IPFS on mobile: https://jkosem.gitbook.io/ipfs-mobile-guidelines/

#### Programming collaboration
Radicle.xyz is a code collaboration platform on top of IPFS. 




## Store assets on IPFS to let your user exchange data and content
By storing small scripts or big databases of your project on IPFS, and depending on your architecture, you can yield several benefits.
If your users don't use an IPFS client, you will still have content deduplication out of the box.
If they use it, your users will seed the content they use, decreasing the workload on your infrastructure, increase uptime of the service in case you go offline. Your users also won't contact your servers for the content they already have. 

### Examples of projects

#### Decentraland.org 
Decentraland is a virtual world you can explore with a VR set, your computer, or your smartphone. They store all the assets on IPFS, so these heavy files can be fetched from several other users at the same time, for faster loading and synching. 

#### Video hosting platform
DTube (https://d.tube) is hosting their videos on IPFS to reduce stress on their infrastructure. The website itself is not decentralized, but it mainly manages coordination between users and discoverability of content. When browsers ship with IPFS natively, the benefits will only be greater.
 You can also learn how to replicate Youtube on IPFS here: https://simpleaswater.com/youtube-on-ipfs/

#### Cohost large datasets and collaborate on them
qri.io is an open-source tool for the management of large datasets. Its users enjoy reduced hosting costs, traceability of changes in the data, rollback to previous versions, easier collaboration when updating data, etc. Deduplication across datasets also helps them keep their hard drive as small as their sync time.

#### Deadman switch
Killcord.io is an open project to automatically publicly publish data if the user doesn't check in after some time. This can ensure the ongoing investigation of a journalist carries on if they are unable to do it themselves, as the information gathered will now be public. It can also protect their life by discouraging their enemies to make a move on them and accelerate the disclosure. 

#### Maps on IPFS
Ongoing work is aiming to store OpenStreetMaps assets on IPFS (see here: https://github.com/ipfs/devgrants/blob/8233f7df4a219122bcf31eaea289d654406e4443/targeted-grants/open-street-map-ipfs.md) . In the long run, this could mean faster synchronization for apps using this scheme and lower bandwidth requirements for servers. Since the integrity of data is built-in thanks to content addressing, anyone could also help to host the data without needing the users to trust them to serve the data. 

#### Legal P2P video streaming platform featuring copyrighted movies
Blust.tv wants to use IPFS to distributes movies when requested by its users. By adding their proprietary secret sauce, they will reconcile legal video streaming and P2P networks.

#### Help host important data
Thanks to recent improvement with IPFS Cluster, you can call for help to store your data without having to trust other nodes won't alter the data. With this "follower" mode, you can replicate Pacman packages or COVID-19-related papers without knowing anything about IPFS internal wizardry. 

#### Video live streaming
Let your users stream from each other to remove the need for a server without overloading a popular streamer. You can get inspired by this working prototype: https://github.com/tomeshnet/ipfs-live-streaming, or by the experimentations of fission.codes, a heavy player of the IPFS ecosystem: https://blog.fission.codes/experimenting-with-hls-video-streaming-and-ipfs/. Fleek.co (previously known as Temporal) also did some experimentation using their Amazon S3/IPFS compatibility tool: https://medium.com/temporal-cloud/introducing-s3x-endless-ipfs-dynamic-possibilities-stream-videos-host-dynamic-websites-f0072127070f



## Use IPFS in your infrastructure
You can use IPFS to manage your data across your nodes thanks to either a private network of IPFS Cluster, the preferred tool to manage it. Find out more here: https://cluster.ipfs.io/

### Examples of usages for data synchronization

#### Build a decentralize cluster for your data
IPFS Cluster is the official tool to manage a cluster of nodes to replicate data. Like any distributed cluster, you will have the benefits of redundancy, load balancing, wite permission management, etc. You will also have IPFS's deduplication of content. You can choose to connect your cluster to the rest of the IPFS network or run it privately. You can also invite outsiders to help replicate your data, without them having the power to modify it. 

#### Build a CDN
A Content Delivery Network is a network of nodes storing content next to the users to ensure low latency. The IPFS network is a de fact CDN by design, but you can tailor it to your need by building your infrastructure on top of it. 

#### Distributed package managers
The npm javascript package manager is now mirrored on IPFS. By using the dedicated client packages are fetched from IPFS and then distributed to other clients needing them. For example, a team working in the same building will fetch packages from each other, meaning less network traffic cost for the company, or no interruption of the workflow if they lost their Internet connexion, as packages are available on their local network. 

#### Speed software containers distribution in your infrastructure
Netflix is on its way to use IPFS to synchronize its Docker containers worldwide. Since each node fetches them from the fastest peers they know, the whole synchronization is even faster than with a specialized solution. You can read more about Netflix use case here: https://blog.ipfs.io/2020-02-14-improved-bitswap-for-container-distribution/
If you use K3S, you can take a look at https://github.com/Duske/k3s-ipfs

#### Make an unstoppable factory 4.0
Actyx.com is helping the manufacturers to fast forward to Industry 4.0: the industry of connected machines. Actyx built a custom OS on top of IPFS which ensures all machines and monitors receive the orders, information, and parameters they need to function properly. This Edge Computing also means that machines can work independently if the network break for some time. You can yield all the benefits of a high-performance factory, without the risk of total dependence on the network.

### Examples of projects to distribute computation

#### Heavily parallelize Big Data processing
On some heavy analysis, you can benefit from parallelizing calculations on several nodes. But sometimes, fetching the relevant dataset for each node to compute is longer than the analysis itself. Scott Brisbane proposed a design to speed up this step.
You can find a relevant thesis about an implementation an its performances: https://www.cse.unsw.edu.au/~hpaik/thesis/showcases/16s2/scott_brisbane.pdf ,
https://s3-ap-southeast-2.amazonaws.com/scott-brisbane-thesis/decentralising-big-data-processing.pdf

#### Serverless computation
Make your AWS instance compute on IPFS files thanks to AWS Lambdas. Be careful, this is just the skeleton of a full implementation: https://github.com/abhiyerra/ipswarm

#### Distribute computation
This can be made using the "buckets" of the Textile.io company. A first library was build during a 2-day hackathon for the computation of the rendering of videos(https://github.com/ericr6/iexec-textile). More info on buckets can be found on Textile's website.



## Lower your storage usage
By storing identical data only once on your node, archive projects are yet another natural fit for IPFS. 

### Example of project

#### Compress telemetry data
Sensor data are typically structured and sometimes repeat themselves. This allows IPFS to reduce disk usage even more than simple compression thanks to deduplication. Here is a user story of an engineer explaining how:
http://blog.klaehn.org/2018/06/10/efficient-telemetry-storage-on-ipfs/




## Decentralize your data, website or app
By doing so, you increase availability in case your server runs into an issue, your ISP is unhappy with what you publish, or a hostile government forces it to take it down. You will also decrease the load time for your swarm-connected users, and natively enable your app to work offline or on local networks. Depending on your app, your users can also reduce their storage requirements and download time thanks to native deduplication and caching. If hosted on the Ethereum Name System, users of the IPFS Companion or Metamask browser extensions will find it no matter what. Remember that your user will always be able to use the gateways such as IPFS website's or CloudFlare's (https://www.cloudflare.com/distributed-web-gateway/) to access your app with unmodified browser if needed. 

### Resources to do so 

#### Decentralized database
OrbitDB is the go-to database on IPFS. You rip the benefits of decentralization and traditional databases. Several participants can work on the data offline, and it's synchronized when they come back online thanks to CRDT. There is a Go and a Javascript flavor.
If you are using MongoDB, you might be more comfortable with AvionDB, which is the unstructured database built on top of IPFS.

#### IPFS hosting with Textile
Textile.io is a hosting company on IPFS developing the layers on top of IPFS. Among other things, they came up with "buckets", which are separated "cloud" environment. You can find more information on their website: https://docs.textile.io/hub/buckets/ . More generally, Textile has built an impressive tool set for dApp building and integration: https://blog.textile.io/announcing-the-textile-protocol-hub/

#### Amazon S3 integration
If you are using AWS S3 connections for your cloud, you can use the following storage server to replicate it to IPFS with minimal disruption of your workflow. It is forked from the popular object storage server MinIO by the long-standing IPFS company RTrade and should be eventually reintegrated into MinIO natively. 

#### Make IPFS alternative storage in your NextCloud app
This is made possible by the following open source project: https://github.com/justicenode/files_external_ipfs

#### Deploy your GitHub website on IPFS
With Fleek.co (ex-Temporal), you write your website on Github, then deploy it on IPFS in a few clicks. Upon updating it on GitHub, it's updated online too.

#### Build your app on IPFS and publish it on Ethereum
Embark is a framework for Javascript and Solidity application. The logic is on Ethereum thanks to smart contracts, and assets and data are stored on IPFS thanks to OrbitDB.  
https://github.com/embarklabs/embark

#### Move your Vue or Gatsby website to IPFS
Several plugins exist to decentralize your website built with a popular framework. Here is one for Vue.
https://github.com/cwaring/vuepress-plugin-ipfs
And here is one for Gatsby:
https://github.com/moxystudio/gatsby-plugin-ipfs

#### Register your domain on a blockchain, and your website on IPFS
The Ethereum Name Service is now the standard for decentralizing domain names (meaning the address of your website) without needing the centralized DNS. You can see a (technical) demo of the concept here: https://www.youtube.com/watch?v=3AS2BD22DZg
and a presentation here: https://github.com/ipfs/camp/blob/master/LIGHTNING_TALKS/ipfscamp2019-lightningtalk-ensipfs.pdf
IPFS-upgraded browsers like Brave or Opera can resolve them natively, and any browser with the IPFS Companion extension can as well. 

Unstoppable Domains is another solution that lets you easily deploy your website on IPFS. You will also need a browser extension to access the website. 


#### Build a dApp
There are many available frameworks to build decentralized apps on IPFS. See for example dappkit.io, fission.codes, fleek.co, or textile.io .

### Examples of projects doing so 

#### Share photos with friends, comment them and interact
Textile.io is one of the oldest company building with IPFS. It developed the concept of Threads to transform IPFS into a social network featuring feeds and events. They built the first app on top of it letting you privately share photos with your friends: Textile.photos

#### Make your tiny decentralized website for free
Neocities.org lets you host a dead-simple website for free, accessible without IPFS extension. You need to keep your memory requirements under control, but it can introduce you to the world of the decentralized web.

#### SecureMyState
This award-winning working prototype of an app for government/citizens communication was built in two days during the DenverETH hackathon. It lets Colorado citizens manage state-owned data about themselves, such as their driving license status or business registration.
You can see its code here: https://github.com/twos-complement/eth-denver-2020
and a slides presentation here: https://www.figma.com/proto/usEzmsRYQCe3MP8qp4ur5H/Advance-Colorado?node-id=76%3A5625&viewport=143%2C-89%2C0.049727652221918106&scaling=scale-down

#### Marketplace
Haven (https://gethaven.app/) is a privacy-focused mobile app for shopping. Haven doesn't know its users' buying history, let them pay in cryptos, and doesn't take a cut on the sales. 

#### Torrent tracker hub
Torrents are a powerful P2P file-sharing technology, but they work better with the help of centralized "trackers" helping users know who has what. Some people tried with some success to decentralize them. You can find their working prototype here: https://github.com/urbanguacamole/torrent-paradise

#### COVID-19 tracker
This dead-simple tracker API lets any IPFS node request the latest data about the COVID-19 pandemics. https://github.com/RTradeLtd/ipcoronafs

#### Make your software distribution more... distributed
This simple GitHub Action lets you upload your GitHub Releases on IPFS automatically. https://github.com/marketplace/actions/upload-to-ipfs

#### Backup you Wolfram data
In a recent update, Wolfram let users store their computation or assets on IPFS. Check out the version notes to know how: https://writings.stephenwolfram.com/2020/03/in-less-than-a-year-so-much-new-launching-version-12-1-of-wolfram-language-mathematica/

#### Music streaming platform
Audius.co is a music streaming platform built on IPFS, where artists are in control, where no fees are taken by the platform, and where listeners can enjoy their music while offline. 

#### Music player
diffuse.sh is an online player that you can connect to your music repositories to listen to it from anywhere. You can now connect it to IPFS repositories.



## Decentralize the Web itself

### Examples of projects

#### Decentralize the DNS
The Domain Name System is one of the most centralized pieces of the Web. By having to ask a central place to know where to find  "google.com" or "facebook.com", it is a central point of failure, be it a technical incident, malicious hack, or voluntary censorship. Backing the DNS on IPFS could improve its availability. A prototype for Javascript has been published on NPM: https://www.npmjs.com/package/orbitdns

#### Archive the web
Thanks to deduplication, IPFS is a powerful tool for archiving the Web. The InterPlanetary Wayback is tackling this endeavor. https://github.com/oduwsdl/ipwb

#### Fight censorship
Wikipedia is not accessible in Turkey for a few years, but the Protocol Labs is hosting a mirror of several languages on IPFS. See the original blog post https://blog.ipfs.io/24-uncensorable-wikipedia/ and the project itself: https://github.com/ipfs/distributed-wikipedia-mirror

#### Build an alternative ISP
Althea.net is building an alternative Internet Service Provider in the US as the low level of competition brings the quality of service down and prices up. Althea especially targets rural areas, where the coverage by traditional ISP is low. 



## Blockchain use-cases
IPFS is a natural fit for blockchain use cases. The common state of the chain is distributed on-chain among participants, and specific data is stored on IPFS. Thanks to content addressing, the blockchain only needs to store the IPFS multihash, and users are sure to fetch correct data from any of their peers. This architecture is becoming a de facto standard for blockchain apps, especially for Ethereum.

### Examples of projects

#### Create a global market place for data storage
Filecoin.io is not only a blockchain on IPFS. It is the blockchain *of* IPFS. Filecoin lets any storage owner host data for users who need additional space. It is one of the reasons IPFS exists in the first place and will be a great accelerator of the IPFS growth once fully online. The project is developed by Protocol Labs, which are stewarding the development of IPFS. You can check the project website here: filecoin.io 
Textile.io is building the Powergate tool for your app to interact with Filecoin, if needed: https://blog.textile.io/filecoin-developer-tools-concepts/

#### Reconcile IoT and privacy
Iotex.io wants to build an ecosystem where IoT data are owned by their respective owners. Data of their devices can be stored on local hardware, backed up to cloud, or to IPFS. Future integration with Filecoin will further reinforce the ownership of data. 

#### Send cryptos to a human-readable address
This project lets you have a human-readable Ethereum address, so people don't have to send it to a long, error-prone address. 
You can check it here: https://devfolio.co/submissions/humanize-pay

#### Make AI an online service
MindSync.ai wants to build a blockchain hosting AI competitions and let AI skills offer and demand meet. Consumers can hire specialists per task, and they are paid in cryptos. 

#### Create a decentralized exchange for Ethereum ERC20 tokens
This project is still in a very early phase but may inspire some of you: https://github.com/5daytech/udex-app-android

#### A platform for exchanging notes, courses, and more for education.
RocketShoes.io is an education platform where students produce and tag learning materials, assignments, notes, and digital assets. These are stored on IPFS, and the blockchain ensures the timestamping, proof of ownership, and incentivization layer.

#### Distribute IoT data
The Tangle (the distributed ledger of the IOTA network) supports hosting IoT data on IPFS, again for better availability, deduplication, etc. You can find out more here: https://github.com/iotaledger/poc-ipfs

#### Query the DWeb across blockchains
TheGraph.com wants to enable users to look for information on any blockchain or distributed service thanks to their query language GraphQL and the indexations of the chains thanks to IPFS. 

#### Proof of ownership
With IPFS and a blockchain, you can prove ownership of a file at a certain time without disclosing it. See here an example of implementation: https://github.com/mustafarefaey/PrivateStamp

#### Build Smart City apps
Robonomics.network is building a framework on top of Ethereum and IPFS for Smart City apps to easily exchange data (from sensors or computation for example).

#### Make a decentralized prediction market
Augur.net is a blockchain and decentralized market where you can bet on anything or request prediction from the crowd wisdom. Like so many blockchain-based apps, the data is hosted on IPFS. 


## Decentralized Identity (DID)
A decentralized identity is a concept of storing all your personal data on your devices rather than let every service you use store a partial copy of it as it is now. You having control of your data means that you decide which app has access to what, that you only fill your information once, that you can revoke access, etc. DID is a hot topic for Web3.0, and IPFS is one of the core technology a lot of engineers build DID around. Nomios.io shared some thought about DID in general during the IPFS Camp 2019 event: https://docs.google.com/presentation/d/1HbydOI0w-T_FY23zCACAyHmzDq1ZvyG2tklpPSm6OQQ/edit#slide=id.g5c88e8f60d_0_11

### Examples of projects

#### Element 
Element is an open-source project combines the content addressing and the interactiveness of Ethereum smart contracts to provide a tool for managing identity. You can check the project out at element-did.com. 

#### 3ID Connect
3ID Connect is developed by 3Box, a personal data manager for apps leveraging IPFS. 3Box wants to make using DID as simple as clicking on "Connect with Google" or "Connect with Facebook". You can read their article explaining how to bring it to your app: https://medium.com/3box/introducing-3id-connect-531af4f84d3f

#### Microsoft ION
Microsoft started experimentation by pinning some DID information to IPFS and publishing the hash to the Bitcoin blockchain. This design is well known for blockchain-based apps and is here use for DID. Find more details here: https://techcommunity.microsoft.com/t5/azure-active-directory-identity/toward-scalable-decentralized-identifier-systems/ba-p/560168

#### Ceramic Protocol
Ceramic.network is another proposition for DID on IPFS, along with a complete protocol for data and document exchanges.

#### Nomios
Nomios.io is another promising solution that started to work with IPFS from the start. Check out their website for more information.


## Some additional resources and ideas
More implemented ideas can be found on awesome IPFS:  https://awesome.ipfs.io/


## Non-implemented use cases

Here is a non-exhaustive list of use cases that were not implemented yet. Pick up the challenge yourself or make your own solution. 

- Coordinate activists groups without fear from censorship: https://discuss.ipfs.io/t/building-a-secure-activist-membership-management-tool-on-ipfs/5702/3
- Manage the knowledge of the whole world:  https://www.underlay.org/
- Build a giant database for genetic data: https://discuss.ipfs.io/t/addressing-petabytes-of-genetic-data-with-ipfs/1471/10
- Create a mesh network on IPFS: https://discuss.ipfs.io/t/mozilla-nsf-a-2-million-prize-to-decentralize-the-web/654
- Bring additional services to your existing mesh network: www.nycmesh.net
- Serverless online gaming: 
- Put Hadoop on IPFS: https://discuss.ipfs.io/t/minerva-build-the-hadoop-hive-on-ipfs/5832
- Add more transport to IPFS for mobile usage: (https://github.com/ggerganov/wave-share#wave-share)
https://github.com/RTradeLtd/libp2p-lora-transport
- Cohost the site you visit: https://github.com/ipfs-shipyard/cohosting
- Distributed cards for spaced learning https://discuss.ipfs.io/t/check-out-my-flashcard-app-that-uses-the-ipfs/6543/2
- Unblock the offline-first use cases: http://offlinefirst.org/casestudies/
- Build a distributed OS: https://github.com/ipfs/ipfs/issues/247
- Distribute the medical data: https://github.com/ipfs/notes/issues/292
- Improve information sharing during disaster recovery
- Get a grant for your help or propose an open grand: https://github.com/ipfs/devgrants
- Make an interactive app for your classroom
- Build a distributed social media: https://discuss.ipfs.io/t/social-media-architecture-with-ipfs/4625/58
- Decentralize peer-reviewing of scholar papers: https://discuss.ipfs.io/t/ipfs-implementation-for-publication-of-decentralized-peer-review/7692
- Help to host NASA databases: https://discuss.ipfs.io/t/nasas-earthdata-cloud/7528
- Help to host LibGen materials: https://discuss.ipfs.io/t/torrent-site-of-scientific-papers-needs-help/6815
- Make a manga reader: https://discuss.ipfs.io/t/manga-reader-over-ipfs/4832
- Make a Gif-sharing platform: https://discuss.ipfs.io/t/a-vine-clone-built-using-ipfs/3337
- An interactive P2P application working in crowded events such as festivals
- Ethereum/Solidity Smart Contract CI Toolchain on IPFS https://discuss.ipfs.io/t/ethereum-solidity-smart-contract-ci-toolchain-on-ipfs-wip/1780
- Various ideas from GitHub: https://github.com/ipfs/ipfs/labels/applications%20of%20ipfs
- Your project here ...



#### Decentralize Big Data processing
https://s3-ap-southeast-2.amazonaws.com/scott-brisbane-thesis/decentralising-big-data-processing.pdf 
https://www.cse.unsw.edu.au/~hpaik/thesis/showcases/16s2/scott_brisbane.pdf
https://discuss.ipfs.io/t/minerva-build-the-hadoop-hive-on-ipfs/5832





#### Ensure service during disaster recovery https://medium.com/offline-camp/passion-talk-offline-first-for-disaster-response-ffe4ef07a2c0?source=collection_category---4------0-----------------------




## Some companies using IPFS
https://user-images.githubusercontent.com/618519/74373908-3819cb80-4d92-11ea-816a-1b6f04002b4c.png
(from https://ipfs.eternum.io/ipfs/QmeVcDW9pALmkgkuYcLV6jVeuVF4haD58NTdBc91tozUAP/)
