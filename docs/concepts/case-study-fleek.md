---
title: 'Case study: Fleek'
description: Explore some helpful use cases, ideas, and examples for the InterPlanetary File System (IPFS).
---

# Case study: Fleek

::: callout
**"Utilizing IPFS nodes and the encryption and database tools on IPFS, we can build apps and websites with the highest standard of data privacy and autonomy to date."**

_&mdash; Brett Shear, COO, Fleek_
:::

## Overview

::: right
<img src="./images/case-studies/logo-fleek.png" alt="Fleek logo" width="200">
:::

[Fleek](https://fleek.co/) is an easy-to-use service for hosting websites, storing files, and developing apps for the decentralized web. The decentralized web (dweb) is the future of the internet, promising unprecedented data privacy and security, maximal user control over one's data, and significant performance boosts over today's web. But right now, building for the decentralized web can be time-consuming and difficult for developers who are unfamiliar with the technology. Fleek's mission is to speed adoption of the Dweb by making it easier for everyday internet users to create apps and store files in a decentralized way. Fleek is part of the low-code/no-code movement that designs software development tools for people with low to zero coding experience.

Fleek products are built on IPFS using Fleek Edge: This is the Fleek network that combines the distributed peer-to-peer data sharing protocols of IPFS with edge computing to create a super fast distributed network. On Fleek Edge, data and information are processed and stored at edge locations geographically close to the users that request them. That reduces latency for real-time data applications and improves the performance and speed of peer-to-peer interactions on IPFS.

All sites and files on Fleek are automatically deployed to Fleek Edge and are designed to put the power of IPFS's decentralized storage architecture into the hands of both everyday internet users and more experienced developers who simply want an easier, faster, and more streamlined way to build on IPFS. With Fleek, anyone and everyone can use IPFS to be a designer and developer for the decentralized web. For Fleek, it's IPFS that makes the Dweb possible, and Fleek wants to make IPFS easier, faster, and more streamlined for everyone.

### Fleek by the numbers

<NumberBlock :items="[
  {value: '&gt;8K', text:'IPFS site deployments'},
  {value: '&gt;8K', text: 'Fleek URLs & IPFS DNSLink records'},
  {value: '99.99%', text: 'guaranteed uptime on Fleek Edge'},
  {value: '150+', text: 'global Fleek Edge locations'}
]" />

## The story

Fleek started as Terminal.co, and began with a simple mission: build tools and products that make using decentralized technologies easier for people on the web. Fleek wanted its services to fuel a faster and more seamless transition from the centralized web of today to the decentralized web of tomorrow. To that end, Fleek originally launched with a focus on designing user-friendly services for building decentralized apps (dapps) that could interact with smart contracts on the blockchain-based Ethereum network.

But Fleek quickly realized that starting with dapps was putting the cart before the horse. Not only are many of today's web users still not invested in building for dapps and smart contracts, but these products themselves are only ever as decentralized as the storage architecture they rely on. To best help the web transition to its decentralized future, Fleek needed a different approach. That's when Fleek turned to IPFS as the technology that would help them make their vision a reality.

::: callout
**"We saw that the fastest, simplest, and most direct way to advance the decentralized web is to equip ordinary web users with the tools they need to access and build on IPFS. IPFS offers the data integrity, privacy, and security that we think matter most for the future of the Dweb. And with the right tools, we knew we could give a full hosting experience and seamless workflow, making IPFS as easy to use as a standard website today."**

_&mdash; Brett Shear, COO, Fleek_
:::

So Fleek decided to retool its services and pursue a new company direction with a brand new product roadmap geared toward increasing the accessibility of decentralized hosting, storage, and database management on IPFS. That decision spurred development of an entirely new platform, which launched early in 2020. Fleek's new platform deploys a unique tech stack composed of IPFS, Textile, and, in time, Filecoin.

Fleek offers three products that utilize this Fleek Stack – Fleek Hosting, Fleek Storage, and Space Daemon. Each product provides a unique user interface for accessing and utilizing IPFS in a different way. These products are:

- Fleek Hosting, for hosting websites on IPFS.
- Fleek Storage, for uploading, pinning, and fetching files on IPFS.
- The Space Daemon, which packages IPFS, Textile Threads/Buckets, and (after mainnet launch) Filecoin into a single JavaScript interface for building peer-to-peer, privacy-focused apps on IPFS.

Every product is designed to enhance and streamline workflow around a particular IPFS use case. The Space Daemon, for example, makes it simple for users to leverage IPFS for encrypted database storage and serverless app interactions. And for each of its different products, Fleek automatically handles the technical back end of hosting or deploying information using IPFS by auto-updating references to IPFS content identifiers, TXT values, and more.

By creating a streamlined workflow for deploying to IPFS, Fleek empowers web, app, and other developers to integrate the key features of IPFS — like autonomy from centralized hosting, peer-to-peer functionality, and serverless interactions — into their sites, products, and apps. On top of that, the Fleek network provides significant performance and efficiency boosts that anyone, from dweb newcomers to IPFS veterans, can benefit from. Fleek runs users' serverless applications and peer-to-peer services on a distributed network, removing the need for users to develop their own network infrastructure and empowering users' apps and programs to scale effortlessly to meet increasing demand and data traffic.

Fleek is thus a service with wide-ranging functionality and many valuable use cases across the developer space. "One of the biggest barriers to adoption of IPFS by the broader web community is unfamiliarity with the manual work involved in hosting or building on IPFS," says Shear. "Fleek takes care of that work on its own, which ensures that anyone who wants the benefits of hosting their website on IPFS can get them easily and quickly. But even experienced devs can benefit from the ease of use and faster speeds they get with Fleek products deployed on Fleek Edge."

## IPFS benefits

Fleek chose to build on IPFS because IPFS decentralizes two of the core aspects of the internet: file storage and data transfer. When combined with the advantages of IPFS content addressing, this provides users with a host of benefits not available on the traditional web. In particular, Fleek considered the following benefits when deciding to use IPFS:

- **Censorship resistance:** IPFS content addressing allows for multiple copies of the same content-addressed resource to exist as equivalent items in multiple locations worldwide. In some cases, this can provide a degree of censorship resistance unavailable on the traditional web.
- **Data integrity in a peer-to-peer world:** Fleek uses IPFS in combination with encryption tools like Textile's, enabling them to offer a best-of-both-worlds platform where users get the benefits of client-side encryption (through user-owned keys), and can share data directly between users without touching any third-party servers. Because the transport is encrypted by default, third-party watchers can't view it in transit, and IPFS's content addressing also ensures that the data a user receives when they make a request is cryptographically verified as the data they asked for.
- **Integration with Filecoin for easy access to storage and retrieval market:** Filecoin and IPFS are complementary protocols. Building on IPFS will give Fleek users a seamless way to utilize the Filecoin marketplace in the future to meet their storage needs.
- **Vibrant and active community of developers:** The IPFS community is full of enthusiastic and talented developers, which means IPFS is constantly evolving to better meet the needs of its users and builders.

Most of all, IPFS's ability to offer censorship-resistant file storage represents one of the biggest rewards for Fleek users. Using IPFS, Fleek can give its users independence from any particular hosting or storage platform. Instead, when a user hosts a website or stores files using Fleek, their data lives directly on IPFS, even when they access it through the Fleek interface. For this reason, Fleek users' data is as uncensorable as IPFS is itself.

## How Fleek uses IPFS

Fleek creates a unique, streamlined workflow for web developers or anyone looking to host and share content on the decentralized web. Fleek provides its own public IPFS gateway, which means that developers don't need to build their own. Fleek's IPFS gateway allows even IPFS-ignorant legacy web browsers and apps to access content provided via IPFS.

Fleek also automates the process of building and deploying on IPFS. Developers who use Fleek for site deployments don't need to do anything except link to Fleek with the GitHub page for their website or web app, and Fleek will automatically build and deploy their code via IPFS. It's a streamlining process that takes over the back end of operating and maintaining a website or app content on IPFS and allows developers to focus on their own content and code.

So, what does that look like in action? Since IPFS uses content addressing, every piece of content on IPFS needs its own unique content identifier (CID) hash. This CID is updated with every change to the content with which it is associated. For developers, keeping up with these updates can be a huge hassle, since it would normally involve manually updating the link values for their website or manually implementing other downstream changes to match the new CID.

Fleek handles all that manual work on its own. In the case of a website, Fleek automatically takes the CID generated by IPFS for the web content and points it to an auto-generated Fleek subdomain URL using a TXT record added to the DNS setting that Fleek creates for the website. Whenever anyone visits that Fleek URL, the most recently associated CIDs are delivered to the user via Fleek's HTTP IPFS gateway — meaning that a request that starts with an HTTP request (such as a legacy web browser) remains HTTP throughout. And anytime the web content changes, Fleek automatically detects the new hash and reassociates the TXT record accordingly.

That means Fleek can combine the data integrity and resiliency benefits of IPFS's content-addressing protocols with the ease of traditional legacy web URL addressing. Developers can use all the same tools and workflows without worrying about the manual work that would normally go into using IPFS.

### The tooling

At the core of all of Fleek's offerings is `go-ipfs` used straight out of the box for adding and retrieving files, as well as `ipfs-http-client`:

- `go-ipfs`
  - Nodes for pinning with Fleek hosting and storage
  - Nodes for encrypted backups
  - Nodes behind Textile hub for the Space Daemon
- `ipfs-http-client`
  - Used platform-wide whenever Fleek services need to interact with an IPFS node, for example:
    - When a user deploys a site, Fleek's site builder component imports to IPFS using the client
    - When a user adds a file to Fleek storage, the HTTP client is used to make the import, as well as to make sure the mutable hash of the bucket gets updated all the way to the root hash

Additionally, Fleek relies upon building blocks from Textile, Ceramic, and others to help create its product and service portfolio:

- **Fleek Hosting:**
  - This service deploys built sites onto `go-ipfs` nodes directly and replicates on at least one additional node
  - A traditional (HTTP) CDN is also utilized in order to improve performance on secondary fetching (says Shear: "Websites these days are used to 20ms times for fetching sites past the first load, so we want to offer at least that").
  - The CDN's cache is cleared, at minimum, for each new Git commit and auto-deployment via Fleek
  - Whenever the CDN cache is cleared, content is re-fetched from IPFS (with all requests made to Fleek's gateway) in the same manner in which it was originally fetched — e.g. from the TXT record of an IPFS hash added to a user's DNS, via DNSLink, or via ENS domains.
- **Fleek Storage:**
  - This service uses `go-ipfs` nodes in combination with Minio S3-equivalent APIs; the S3-like APIs give full compatibility with any AWS tooling and a familiar bucket structure to files
  - Fleek-built handlers create a root bucket hash and folder hashes that Fleek Storage files live within
  - Any change to files or folders update all the way back up to the root bucket hash
- **Fleek Gateway:**
  - Fleek's own HTTP gateway is used for adding and retrieving files, created from their `go-ipfs` node infrastructure
  - Verification links within the Fleek GUI link to the IPFS hash or CIDs of hosting or storage content using this gateway, ipfs.fleek.co — but can also be fetched on any other IPFS gateway
- **Fleek Space Daemon:**
  - Combines an IPFS node with offerings from [Textile](http://textile.io/) (particularly its [Threads](http://docs.textile.io/threads) multi-party database architecture), plus a key management tool, in a single easy-to-install Go daemon
  - Third-party integrations for enhanced functionality include (but aren't limited to) Filecoin (via [Textile Powergate](https://docs.textile.io/powergate/) for encrypted backups, [Ceramic](https://www.ceramic.network/) for identity management, and [Handshake](https://handshake.org/) for naming and domain functionality
  - The Fleek Space JavaScript library acts as an abstraction layer to the gRPC methods of the Go daemon, providing developers with a JavaScript interface that they can install locally in their applications

## Fleek + IPFS: the future

Fleek already gives websites a permanent home on IPFS and enables web apps to utilize IPFS for secure, peer-to-peer data transfer. But as IPFS continues to evolve, Fleek will empower users to build even more efficiently and easily on IPFS.

::: callout
**"The future of Fleek is very closely tied to the future of IPFS. Fleek products are already delivering cutting-edge performance on IPFS. Every step forward on the IPFS development roadmap will give us more tools to improve on that performance further.**

_&mdash; Brett Shear, COO, Fleek_
:::

For example, while the Fleek Hosting product currently augments IPFS storage with a traditional CDN, the Fleek team looks forward to incorporating IPFS-based solutions to optimizing fetch time as soon as they exist within the wider IPFS ecosystem.

Most notably, though, Fleek is looking forward to the implementation of in-browser connectivity for IPFS users. At present, in order to truly get the most out of an IPFS-based decentralized app, the end user needs to be running an IPFS node themselves on their own local device. In-browser connectivity would remove that hurdle and allow app end users to maintain serverless interactions with anyone and everyone on the internet using the app, and not just with those users who are also running their own IPFS node.

Additionally, Fleek will be integrating Filecoin payments and storage on the Filecoin network into the Space Daemon so that any developers building on top of the Space Daemon can opt in to use Filecoin markets for all their storage.

_Note: Metrics and other details in this case study are current as of September 2020. Details may change in the interim._
