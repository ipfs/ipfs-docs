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

# Usage ideas and examples

<ContentStatus />


IPFS is a versatile technology. It can unlock use cases needing either better compression, availability, partition tolerance, caching, etc.

## Store assets on IPFS
By storing small scripts or big databases of your project on IPFS, and depending on your architecture, you can yield several benefits.
If you users doesn't use an IPFS client, you will still have content deduplication out of the box.
If they use it, your users will seed the content they use, decreasing the workload on your infrastructure, increase uptime of the service in case you go offline. Your users also won't contact your servers for the content they already have. 

### Examples of projects
#### Decentraland.org 
Decentraland is a virtual world you can explore with a VR set, your computer or your smartphone. They store all the assets on IPFS, so these heavy files can be fetched from several other users at the same time, for faster loading and synching. 

#### Distributed package managers
The npm javascript package manager is now mirrored on IPFS. By using the dedicated client packages are fetched from IPFS, and then distributed to other clients which need them. For example, a team working in the same building will fetch packages from each others, meaning less network traffic cost for the company, or no interuption of the workflow if they lost their Internet connexion, as packages are available on their local network. 

#### Speed software containers distribution in your infrastructure
Netflix is on its way to use IPFS to synchronize its Docker containers worldwide. Since each node fetch them from the fastest peers they know, the whole synchronisation is even faster than with specialised solution. You can read more about Netflix use case here: https://blog.ipfs.io/2020-02-14-improved-bitswap-for-container-distribution/




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
