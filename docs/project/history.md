---
title: History
description: Learn about the history of IPFS, the InterPlanetary File System.
related:
  'Video: Juan Benet explains the IPFS alpha': https://www.youtube.com/watch?v=skMTdSEaCtA
  'IPFS draft whitepaper': https://ipfs.io/ipfs/QmR7GSQM93Cx5eAg6a6yRzNde1FQv7uL6X1o4k7zrJa3LX/ipfs.draft3.pdf
  'Video: Decentralizing the Web with the InterPlanetary File System (Epicenter Podcast)': https://www.youtube.com/watch?v=erB7i6Uc4DM
  "Article: It's time for the distributed web — September 2015 (Neocities)": https://blog.neocities.org/blog/2015/09/08/its-time-for-the-distributed-web.html
---

# History of the IPFS project

Like [Westeros](https://gameofthrones.fandom.com/wiki/Westeros), peer-to-peer (P2P) technology has experienced years-long winters and summers. There have been periods of great excitement and growth. Other times, P2P innovation has gone into hibernation.

Tim Berners-Lee first envisioned the World Wide Web with P2P concepts. The emergent properties of the web did not evolve true to that vision. Centralized, client-server architectures dominate today’s web.

The [InterPlanetary File System (IPFS) Project](https://github.com/ipfs/ipfs) aims to return the web to its P2P roots: making the web faster, safer, and more open.

## A P2P summer (1999~2003)

In 1999, Napster took the world by storm by offering unlimited, free music. Record labels hadn't pivoted to a new business model (yet). Users were sharing media files freely because Napster's peer-to-peer network removed the barriers to doing so.

What followed was a period of great innovation in P2P technology. Exciting ideas and companies sprouted: Gnutella, Kazaa, MojoNation, BitTorrent, Skype, and many more.

Some of these projects appealed to technologists on ideological grounds. The projects that won mass markets did so on their merits. Like Napster, Skype and BitTorrent broke through because their P2P architectures enabled novel, valuable services.

This era ended partially under the weight of legal scrutiny. A significant amount of sharing on these P2P systems was of copyrighted material. The resulting stigma suppressed P2P innovation, but competitive forces also played a role.

Client-server architectures lend themselves to centralized control and monetization. Centralized services aggregated more and more value on the web. Profits drove a flywheel of investment and hyper-scale growth for years to come.

This P2P summer proved that projects could win _because of_ their P2P architectures, not in spite of them. These projects demonstrated the possible. With time and technological progress, P2P would return to make an even bigger impact.

## IPFS origins and a new P2P summer (2013 - 2017)

[Juan Benet](https://github.com/jbenet) grew up in this previous P2P summer. He experienced the power of P2P networks firsthand. When he studied computer science at Stanford, he took special interest in distributed networks.

In 2013, Juan was working on a project aimed at another passion–scientific innovation. Inspiration struck. The tools used for sharing and versioning large datasets were inefficient and error-prone. Worse, this type of human knowledge was too often centralized behind a paywall. With his background in software development and P2P systems, he knew there was a better way.

[Git](https://git-scm.com/) manages software versioning and collaboration through a data-linking structure known as a [Merkle tree](https://en.wikipedia.org/wiki/Merkle_tree). Git's data-linking structure is useful across many data types–not just code. Juan recognized that combining this concept with the P2P file-sharing structure of [BitTorrent](https://www.bittorrent.com/) would be powerful: functional, secure information sharing without centralized barriers. This could transform the world far beyond scientific datasets.

The IPFS project was born.

As ambitious as IPFS was, Juan's vision didn't stop there. He founded Protocol Labs in May 2014 to support fundamental research, development, and deployment of infrastructure for open networks (like the internet), with IPFS and its complementary incentivization layer, [Filecoin](https://filecoin.io/), as the first projects. Protocol Labs was modeled to be like an independent [Bell Labs](https://www.bell-labs.com/about/history-bell-labs/) (outside of the IPFS ecosystem, Protocol Labs has since spawned projects including [Coinlist](https://coinlist.co/), [The SAFT Project](https://saftproject.com/), and [SourceCred](https://sourcecred.io/)).

Protocol Labs entered the [Y Combinator Summer 2014 Class](https://www.ycombinator.com/companies/). Juan got to work writing code and the [IPFS whitepaper](https://ipfs.io/ipfs/QmR7GSQM93Cx5eAg6a6yRzNde1FQv7uL6X1o4k7zrJa3LX/ipfs.draft3.pdf).

The whitepaper was published in July 2014. It caught the attention of P2P and internet enthusiasts, including Jeromy Johnson (aka [whyrusleeping](https://github.com/whyrusleeping)). "Why" and other early contributors shared Juan's vision for a distributed, uncensorable, and permissionless file system. They worked nights, weekends, and initially for free because they believed in the positive impact that open networks like IPFS could have on the world.

Juan, Why, and other contributors spent many late nights in Juan's living room with takeout food and too many coffees ([Philz Mint Mojitos](https://www.philzcoffee.com/menu) FTW!) to create the alpha release of [go-ipfs](https://github.com/ipfs/go-ipfs/blob/master/CHANGELOG.md#023---2015-03-01). IPFS was ready to begin its growth journey in the open.

In the summer of 2015, the small but growing IPFS team (about five or six full-time contributors) settled into a coworking space in Seattle. They hammered out improvements to the Go and JavaScript implementations of IPFS as interest in the project grew. Satoshi Nakamoto's 2009 [Bitcoin whitepaper](https://bitcoin.org/bitcoin.pdf) had ushered in a renaissance of P2P innovation. A P2P summer was in full swing. IPFS gained usage in the [Ethereum](https://ethereum.org/) and wider blockchain communities. In September 2015, [Neocities](https://neocities.org/) became the first major site to [implement IPFS in production](https://blog.neocities.org/blog/2015/09/08/its-time-for-the-distributed-web.html).

The work done in Seattle and the lessons learned working with Neocities culminated in the 0.4.0 release of go-ipfs in April 2016. The improvements of 0.4.0 transitioned IPFS from an "exciting demo" to a genuinely useful tool for early adopters.

The project saw further technical and community growth in 2016. [Multiformats](https://multiformats.io/), [libp2p](https://libp2p.io/), and [IPLD](https://ipld.io/) were spun out as separate projects from IPFS. [OpenBazaar](https://docs.ipfs.io/concepts/case-study-openbazaar/) began [integrating IPFS](https://bitcoinmagazine.com/articles/openbazaar-integrating-interplanetary-file-system-to-help-keep-stores-open-longer-1460660998) into their decentralized online marketplace. The IPFS team attended and hosted many community gatherings highlighted by the [Decentralized Web Summit](https://2016.decentralizedweb.net/).

Two watershed moments in 2017 validated the growing excitement around IPFS. The first was jumpstarted by a passionate individual with an idea — fittingly enough for a P2P technology like IPFS. Jakub Sztandera (aka [Kubuxu](https://github.com/Kubuxu)), an IPFS software engineer, took it upon himself to download the Turkish version of Wikipedia and [put the snapshot onto IPFS](https://blog.ipfs.io/24-uncensorable-wikipedia/) in response to state censorship. This undertaking exemplified the project's values. An energized team and community rallied to deliver new performance upgrades to IPFS. The second major event was Protocol Labs' \$205.8M [Filecoin Token Sale](https://coinlist.co/filecoin). With significant funding and a reinforced sense of purpose, Protocol Labs' and IPFS' ambitious founding visions were in reach, but not yet realized.

## The next chapter (2018 - today)

According to [Uncle Ben](https://en.wikipedia.org/wiki/Uncle_Ben#%22With_great_power_comes_great_responsibility%22), with great power comes great responsibility. So in 2018, IPFS entered the next phase of its maturation. The project needed to deliver on its ideological and technical advantages at scale. As seen in previous P2P eras, theoretical advantages must translate to tangible developer and user benefits in order to win over the the mass market. With a growing team, multiple interdependent projects, and an ecosystem of users and partners, the team began developing, sharing, and executing product roadmaps to maturity.

This focus bore significant results in the IPFS community in 2019. Protocol Labs hosted the [first IPFS Camp](https://camp.ipfs.io/) in Barcelona in June. The retreat brought together 150 distributed-web pioneers to learn, collaborate, and build. It inspired a [successful collaboration](https://blog.ipfs.io/2020-02-14-improved-bitswap-for-container-distribution/) with one of the biggest, most innovative corporations in world, Netflix. By the end of 2019, the IPFS network had grown by more than 30x. The community of open-source contributors stood at more than 4,000.

The April 2020 [go-ipfs 0.5.0 release](https://blog.ipfs.io/2020-04-28-go-ipfs-0-5-0/) provided the largest performance upgrades to the network yet: faster file adding (2x), providing (2.5x), finding (2-6x), and fetching (2-5x). For the ever-growing [IPFS ecosystem](https://ipfs.io/images/ipfs-applications-diagram.png), reliability is just as important as speed. For that, Protocol Labs developed, used, and released [Testground](https://blog.ipfs.io/2020-05-06-launching-testground/). Testground is a huge step forward in testing and hardening P2P systems not just for IPFS, but the community at-large.

Major collaborations with [Opera](https://blog.ipfs.io/2020-03-30-ipfs-in-opera-for-android/), [Microsoft ION](https://techcommunity.microsoft.com/t5/azure-active-directory-identity/toward-scalable-decentralized-identifier-systems/ba-p/560168), and [Cloudflare](https://www.cloudflare.com/distributed-web-gateway/) just scratch the surface of possibilities for IPFS. The H2 2020 Filecoin Mainnet launch is poised to fundamentally shift economic incentives of the P2P IPFS network to compete with the entrenched client-server web.

IPFS has come a long way in the journey to building a faster, safer, and more open web to preserve and grow humanity's knowledge. The beautiful thing is, that journey is never ending. This is still just the beginning!
