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


IPFS is a versatile technology. It can unlock use cases needing either better compression, availability, partition tolerance, caching, integrity garantees, etc.




## Share files with firends
TODO

### Examples of projects

#### Desktop application
Arbore is a desktop app letting your share files and sync up your collection with your friends.
https://arbo.re/

#### Share your files or sell copies of it
Enzypt.io let you sell files or simply get a link to share.
https://github.com/FileNation/FileNation is an alternative if you only want to share.  

#### Privacy-focused P2P sharing platform




## Collaborate
Let IPFS coordinate the flow of data between you and your colleagues, even when working offline or on a local network.

### Examples of projects

#### Collaborate on written documents
Peerpad is letting you collaborate in real time on an online document thanks to a node running in your browser. The difference with Google Docs? No server sees your sensitive file but your collaborators, and you can work offline and catch up when your connection is back. 

#### Version Control
IPFS internally have a dedicated data format for Git data. Hence, there are several projects to put Git on IPFS. Check out the following: https://github.com/martindbp/ipvc 

#### Connect attendants of an event
Gthr.io was a simple demo app to connect participants of an event by letting them scan each others QR code. It was made for IPFS Camp 2019. You can look at their presentation (https://www.dropbox.com/s/wodmbi6ico3inya/Offline%20Presentation.pdf?dl=0 ). The code of this simple app is still in their GitHub repository: https://github.com/JustMaier/gathering

#### Exchange messages on mobile
Berty.tech will be an IPFS-based messaging app that will ensure connections are made directly between devices, without the need for servers, and will work on a local network if there is no internet connection . It will also work over bluetooth or other proximity transport. Its code is now open source: https://github.com/berty/berty
More generally, they lead an effort to bring IPFS to mobile here: https://github.com/ipfs-shipyard/gomobile-ipfs
There is also some guidelines made by profesionals for the rise of IPFS on mobile: https://jkosem.gitbook.io/ipfs-mobile-guidelines/




## Store assets on IPFS to let your user exchange data and content
By storing small scripts or big databases of your project on IPFS, and depending on your architecture, you can yield several benefits.
If you users doesn't use an IPFS client, you will still have content deduplication out of the box.
If they use it, your users will seed the content they use, decreasing the workload on your infrastructure, increase uptime of the service in case you go offline. Your users also won't contact your servers for the content they already have. 

### Examples of projects

#### Decentraland.org 
Decentraland is a virtual world you can explore with a VR set, your computer or your smartphone. They store all the assets on IPFS, so these heavy files can be fetched from several other users at the same time, for faster loading and synching. 

#### Video hosting platform
DTube is hosting their videos on IPFS to reduce stress on their infrastructure. The website itself is not decentralized, but it mainly manage coordination between users and discoverability of content. When browsers ship with IPFS natively, the benefits will only be greater.

#### Cohost large datasets and colaborate on them
qri.io is an open-source tool for the management of large datasets. Its users enjoy reduced hosting costs, traceability of changes in the data, rollback to previous versions, easier collaboration when updating data, etc. Deduplication accross datasets also help them keep their hard drive small as small as their sync time.

#### Deadman switch
Killcord.io is an open project to automatically publicly publish data if the user doesn't check in after a period of time. This can ensure the ongoing investigation of a journalist carries on if they are unable to do it themselves, as the information gathered will now be public. It can also protect their life by detering their enemies to make a move on them and accelerate the disclosure. 

#### Maps on IPFS
An ungoing work is aiming to store OpenStreetMaps assets on IPFS. On the long run, this could mean faster synchronisation for apps using this scheme, and lower bandwith requirements for servers. Since integrity of data is built-in thanks to content addressing, anyone could also help hosting the data without needing the users to trust them to serve the data. 

#### Legal P2P video streaming platform featuring copirighted movies
Blust.tv wants to use IPFS to distributes movies when requested by its users. By adding their proprietary secret sauce, they will reconciliate legal video streaming and P2P networks.

#### Help host important data
Thanks to recent improvement with IPFS Cluster, you can call fo help to store your data without having to trust other nodes won't alter the data. With this "follower" mode, you can replicate Pacman packages or COVID-19-related papers without knowing anything about IPFS internal wizardry. 

#### Video livestreaming
Let your users stream from each other to remove the need for a server without overloading a popular streamer. You can get inspired by this working prototype: https://github.com/tomeshnet/ipfs-live-streaming , or by the experimentations of fission.codes, a heavy player of the IPFS ecosystem: https://blog.fission.codes/experimenting-with-hls-video-streaming-and-ipfs/



## Use IPFS in your infrastructure
You can use IPFS to manage your data accross your nodes thanks to either a private network of IPFS Cluster, the preffered tool to manage it. Find out more here: https://cluster.ipfs.io/

### Examples of usages for data synchronization

#### Build a CDN
A Content Delivery Network is a network of nodes storing content next to the users to ensure low latency. The IPFS network is a de fact CDN by design, but you can tailor it to your need by building your infrastructure on top of it. 

#### Distributed package managers
The npm javascript package manager is now mirrored on IPFS. By using the dedicated client packages are fetched from IPFS, and then distributed to other clients which need them. For example, a team working in the same building will fetch packages from each others, meaning less network traffic cost for the company, or no interuption of the workflow if they lost their Internet connexion, as packages are available on their local network. 

#### Speed software containers distribution in your infrastructure
Netflix is on its way to use IPFS to synchronize its Docker containers worldwide. Since each node fetch them from the fastest peers they know, the whole synchronisation is even faster than with specialised solution. You can read more about Netflix use case here: https://blog.ipfs.io/2020-02-14-improved-bitswap-for-container-distribution/
If you use K3S, you can take a look at https://github.com/Duske/k3s-ipfs

### Examples of projects to distribute computation

#### Heavily parallelize Big Data processing
On some heavy analysis, you can benefit from parallelizing calculations on several nodes. But sometime, fetching the relevant dataset for each node to compute is longer than the analysis itself. Scott Brisbane proposed a design to speed up this step.
You can find some relevant ressources here: 
https://s3-ap-southeast-2.amazonaws.com/scott-brisbane-thesis/decentralising-big-data-processing.pdf , https://www.cse.unsw.edu.au/~hpaik/thesis/showcases/16s2/scott_brisbane.pdf

#### Serverless computation
Make your AWS instance compute on IPFS files thanks to AWS Lambdas.
https://github.com/abhiyerra/ipswarm




## Lower your storage usage
By storing identical data only once on your node, archive projects are yet another natural fit for IPFS. 

### Examples of projects

#### Compress telemetry data
Sensor data are typically structured, and sometime repeat themselves. This allow IPFS to reduce disk usage even more than simple compression thanks to deduplication. Here is user story of an engineer explaining how:
http://blog.klaehn.org/2018/06/10/efficient-telemetry-storage-on-ipfs/




## Decentralize your data, website or app
By doing so, you increase availability in case your server run into an issue, your ISP is unhappy with what you publish, or a hostile government forces it to take it down. You will also decrease load time for your swarm-connected users, and natively enable you app to work offline or on local networks. Depending on your app, your users can also reduce their storage requirements and download time thanks to native deduplication and caching. If hosted on the Ethereum Name System, users of the IPFS Companion or Metamask browser extensions will find it no matter what. 

### Resources to do so 

#### Decentralized database
OrbitDB is the go-to database on IPFS. You rip the benefits of decentralization, and of traditional databases. Several participants can work on the data offline, and it's synchronized when they come back online thanks to CRDT. THere is a Go and a Javascript flavour.
If you are using MongoDB, you might be more confortable with AvionDB, which is the unstructured database built on top of IPFS.

#### Amazon S3 integration
If you are using AWS S3 connection for your cloud, you can use the following storage server to replicate it to IPFS with a minimal disruption of your workflow. It is forked from the popular object storage server MinIO by the long standing IPFS company RTrade, and should be eventually reintegrated into MinIO natively. 

#### Deploy your GitHub website on IPFS
With Fleek.co (ex-Temporal), you write your website on Github, then deploy it on IPFS in a few clics. Upon updating it on GitHub, it's updated online too.

#### Build your app on IPFS, and publish it on Ethereum
Embark is a framework for Javascript and Solidity application. The logic is on Ethereum thanks to smart contracts, and assets and data are stored on IPFs thank to OrbitDB.  
https://github.com/embarklabs/embark

#### Move your Vue or Gatsby website to IPFS
Several plugins exists to decentralize your website built with popular framework. Here is one for Vue.
https://github.com/cwaring/vuepress-plugin-ipfs
And here is one for Gatsby:
https://github.com/moxystudio/gatsby-plugin-ipfs

#### Register your domain on a blockchain, and your website on IPFS
Unstoppable Domains let you easily deploy your website on IPFS.

### Examples of projects doing so 

#### Share photos with friends, comment them, and interact
Textile.io is one of the oldest company building with IPFS. It developped the concept of Threads to transform IPFS into a social network featuring feeds and events. They built a first app on top of it letting you privately share photos with your friends: Textile.photos

#### Make your own tiny decentralized website for free
Neocities.org let you host a dead simple website for free, accessible without IPFS extention. You need to keep you memory requirements under control, but it can introduce you to the world of decentralized web.

#### SecureMyState
This award-winning working prototype of an app for government/citizens communication was built in two days during the DenverETH hackaton. It lets Colorado citizens manage state-owned data about themselves, such as their driving licence status or business registration.
You can see its code here: https://github.com/twos-complement/eth-denver-2020
and a slides presentation here: https://www.figma.com/proto/usEzmsRYQCe3MP8qp4ur5H/Advance-Colorado?node-id=76%3A5625&viewport=143%2C-89%2C0.049727652221918106&scaling=scale-down

#### Marketplace
Haven (https://gethaven.app/) is a privacy-focused mobile app for shopping. Haven doesn't know its users' buying history, let them pey in cryptos, and doesn't take a cut on the sales. 

#### Torrent tracker hub
Torrents are a powerful P2P file-sharing technology, but they work better with the help of centralized "trackers" helping users know who has what. Some people tried with some success to decentralize them. You can find their working prototype here: https://github.com/urbanguacamole/torrent-paradise



## Decentralize the Web

### Decentralize the DNS
The Domain Name System is one of the most centralized piece of the Web. By having to ask a central place to know where to find  "google.com" or "facebook.com", it is a central point of failure, be it a technical incident, malicious hack or voluntary censorship. Backing the DNS on IPFS could improve its availability. A first prototype for Javascript have been published on NPM: https://www.npmjs.com/package/orbitdns



## Blockchain use-cases
IPFS is a natural fit for blockchain use cases. Common state of the chain is distributed onchain among participants, and specific data is stored on IPFS. Thanks to content addressing, the blockchain only needs to store the IPFS multihash, and users are sure to fetch correct data from any of their peer. 

### Examples of projects

#### Send cryptos to a human-readable address
This project let you have a human-readable Ethereum address, so people don't have to send it to a long, error prone address. 
You can check it here: https://devfolio.co/submissions/humanize-pay

#### Make AI an online service
MindSync.ai wants to build a blockchain hosting AI competitions and let AI skills offer and demand meet. Consumers can hire specialists per task, and they are paid in cryptos. 

#### Create a decentralized exchange for Ethereum ERC20 tokens
This project is still in a very early phase, but may inspire some of you: https://github.com/5daytech/udex-app-android




## Decentralized Identity (DID)
A decentralized identity is a concept of storing all your personal data on your devices rather than let every service you use store a partial copy of it as it is now. You having control of your data means that you decide which app has access to what, that you only fill you information once, that you can revoke access, etc. DID is a hot topic for Web3.0, and IPFS is one of the core technology a lot of engineers build DID around. 

### Examples of projects

#### Element DID
Element is an open source project combines the content addressing and the interactiveness of Ethereum smart contracts to provide a tool for managing identity. You can check the project out at element-did.com. 

#### 3ID Connect
3ID Connect is developped by 3Box, a personal data manager for apps leveraging IPFS. 3Box wants to make using DID as simple as clicking on "Connect with Google" or "Connect with Facebook". You can read their article explaining how to bring it to you app: https://medium.com/3box/introducing-3id-connect-531af4f84d3f

#### Microsoft ION
Microsoft started an experimentation by pinning some DID information to IPFS and publishing the hash to the Bitcoin blockchain. This design is well known for blockchain-based apps, and is here use for DID. Find more details here: https://techcommunity.microsoft.com/t5/azure-active-directory-identity/toward-scalable-decentralized-identifier-systems/ba-p/560168



## Non-implemented usecases

Here is a non-exhaustive list of use cases that were not implemented yet. Pick up the challenge yourself or make your own solution. 

- Coordinate activists groups without fear from censorship : https://discuss.ipfs.io/t/building-a-secure-activist-membership-management-tool-on-ipfs/5702/3
- Manage the knowledge of the whole world:  https://www.underlay.org/


## YOU WANT TO REDUCE LOAD ON YOUR INFRASTRUCTURE
#### Lower ingress/egress cost for your business
#### VR assets on IPFS
https://decentraland.org/
#### Compress redundant data + Deduplication
https://discuss.ipfs.io/t/interplanetary-telemetry-compression/3171/4


## YOU WANT PERFORMANCE FOR YOU USERS
#### CDN
#### Extend HTTP for client to cache data  ? https://braid.news/ 
#### Decentralize Big Data processing
https://s3-ap-southeast-2.amazonaws.com/scott-brisbane-thesis/decentralising-big-data-processing.pdf 
https://www.cse.unsw.edu.au/~hpaik/thesis/showcases/16s2/scott_brisbane.pdf
https://discuss.ipfs.io/t/minerva-build-the-hadoop-hive-on-ipfs/5832
#### Serverless computing
https://discuss.ipfs.io/t/ipfs-serverless-compute/5349


## YOU WANT TO SPEED SYNCING AMONG SEVERAL MACHINES
### 1) Among remote machines
#### Package managers
https://youtu.be/Yck2LimWcAY
PL effort on github and npm on IPFS
#### IPFS clusters
simpleaswater.io
#### Container distribution (netflix)
Netflix https://youtu.be/wNfk05D887M
#### Livestreaming
https://discuss.ipfs.io/t/ipfs-for-live-streaming/6313/6
### 2) AMong physically close machines
#### Interactive app in a classroom
#### Filesharing
enzypt.io...
https://discuss.ipfs.io/t/dropbox-like-application-on-ipfs/7379/7
https://awesomeopensource.com/project/MichaelMure/Arbore
http://datahop.network
https://www.dropbox.com/s/wodmbi6ico3inya/Offline%20Presentation.pdf?dl=0
#### Pair with your friend via bluetooth or QR codes or Sound or NFC
(https://github.com/ggerganov/wave-share#wave-share)
https://github.com/RTradeLtd/libp2p-lora-transport
#### Connect together the attendants of an event
https://www.dropbox.com/s/wodmbi6ico3inya/Offline%20Presentation.pdf?dl=0



## YOU WANT TO PROTECT FREEDOM OF SPEECH
#### Social Networks
Secure Scuttlebutt https://github.com/ipfs/camp/blob/master/UNCONF/ipfscamp2019-unconf-secure-scuttlebutt.md 
Peergos
#### Protect activism
#### JOurnalism? 
#### Deaddrop
https://github.com/c-base/ipfs-deaddrop
#### Uncensorable services
#### Uncensorable websites
https://discuss.ipfs.io/t/news-torrent-paradise-use-ipfs/4725
#### Deadman switch 
Killcord.io


## YOU WANT TO REDUCE YOUR DEPENDENCY ON INTERNET 2.0 GIANTS
#### Make any S3-compatible storage interplanetary
https://github.com/RTradeLtd/s3x
#### Decentralized ID (simpleid.xyz)
#### Collaboration platform
https://github.com/RTradeLtd/cells
#### File hosting marketplace (Filecoin)
#### E-commerce (OpenBazaar)
#### Video hosting
dtube / https://simpleaswater.com/youtube-on-ipfs/
#### Decentralzed music streaming service 
https://audius.org/developers.html


## YOU WANT TO SHARE THE BURDEN ON HOSTING BIG CONTENT
#### Archive large datasets
#### Decentralized Internet Archive
https://github.com/oduwsdl/ipwb  ;   https://awesomeopensource.com/project/oduwsdl/ipwb
#### QRI: Versioning datasets
qri https://github.com/ipfs/camp/tree/master/CORE_AND_ELECTIVE_COURSES/ELECTIVE_COURSE_G
#### Collaborative clusters
https://collab.ipfscluster.io/
#### Geodata 
https://media.ccc.de/v/bucharest-401-geodata-on-ipfs
https://github.com/opengeospatial/ogcapi-features/issues/354
#### Decentralized maps
https://discuss.ipfs.io/t/open-street-map-on-ipfs/6689/6
#### Serverless online gaming
#### Share Virtual Reality assets
decentraland.io


## YOU WANT TO PROTECT VALUABLE PUBLIC CONTENT
#### Cohosting website 
https://github.com/ipfs-shipyard/cohosting
#### Distributed cards for spaced learning
https://discuss.ipfs.io/t/check-out-my-flashcard-app-that-uses-the-ipfs/6543/2


## YOU WANT TO LEVERAGE WEB3
#### Crawl the network
https://github.com/scriptkitty/ipfs-crawler
#### Decentralize the DNS
https://www.npmjs.com/package/orbitdns
#### Manage data from Ethereum
https://www.npmjs.com/package/3box
### Blockchain
#### Smart contracts
#### Offchain data storage (data, dataset, website, etc)


## YOU WANT TO CONTINUE YOU ACTIVITY WHATEVER THE CONNECTIVITY STATUS
#### Offline first https://medium.com/offline-camp
http://offlinefirst.org/casestudies/
(goldmine) https://docs.google.com/document/d/1Mol6epw0sbj5FqS6akD-X5KJkGF0MwsOZQ5t1ehOGiM/edit
#### Ensure service on off-grid networks
#### Ensure service on unreliable networks
#### Ensure service during disaster recovery https://medium.com/offline-camp/passion-talk-offline-first-for-disaster-response-ffe4ef07a2c0?source=collection_category---4------0-----------------------
#### Store your music on IPFS, access it from anywhere, listen to it offline
diffuse.sh
### Industry 4.0
https://robonomics.network/en/
Actyx
#### Document collaboration
https://github.com/ipfs/ipfs/issues/238
https://github.com/ipfs/camp/blob/master/DEEP_DIVES/39-using-crdts-to-build-real-time-collaborative-dapps.md
Code collaboration : https://radicle.xyz/
#### Mesh networking
NY Mesh network


## YOU WANT TO CONVERT A SOFTWARE STACK LAYER TO WEB3
#### Distributed apps
https://awesomeopensource.com/project/Ideea-inc/vipfs
3box.io
Textile.io
#### P2P browser
Beaker
https://github.com/propername/endless
#### Decouple data origin and security
Chrome signed exchanges https://github.com/ipfs/camp/blob/master/DEEP_DIVES/39-using-crdts-to-build-real-time-collaborative-dapps.md 
#### Distributed storage
https://awesomeopensource.com/project/RTradeLtd/Temporal
#### Decentralized databases (orbit-db)
#### Mount IPFS as a filesystem
#### Operating system on IPFS
https://github.com/ipfs/ipfs/issues/247
#### Bring IPFS to mobile
https://github.com/textileio/android-ipfs-lite
https://github.com/textileio/ios-ipfs-lite


## OTHER IDEAS
#### Track statistics about a pandemic
https://github.com/RTradeLtd/ipcoronafs
#### Healthcare data 
https://github.com/ipfs/notes/issues/292

## Some companies using IPFS
https://user-images.githubusercontent.com/618519/74373908-3819cb80-4d92-11ea-816a-1b6f04002b4c.png
(from https://ipfs.eternum.io/ipfs/QmeVcDW9pALmkgkuYcLV6jVeuVF4haD58NTdBc91tozUAP/)
