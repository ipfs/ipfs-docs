---
title: Persistence
description: Where is IPFS's place in the persistence story ?
---

# The Status Quo

One goal of IPFS is to preserve humanity's history by letting users store data while minimizing the risk of that data being lost or accidentally deleted. This is often referred to as permanence. But what does permanence _actually_ mean, and why does it matter?

A 2011 study found that the [average lifespan of a web page is 100 days](https://blogs.loc.gov/thesignal/2011/11/the-average-lifespan-of-a-webpage/) before it's gone forever. It's not good enough for the primary medium of our era to be this fragile.

Solving this is a hard economics problem.
Most data storage mediums ([Flash](https://en.wikipedia.org/wiki/Flash_memory), [Hard Drives](https://en.wikipedia.org/wiki/Hard_disk_drive)) degrade,
some do not, or at an extremely slow rate but they are bad to making the data accessible ([Magnetic Tape](https://en.wikipedia.org/wiki/Magnetic-tape_data_storage)), how useful is an archive if it can't be viewed ?

This means you need an economic solution to pay for long term maintnance costs.
Multiple projects try to solve this problem, for example the [Internet Archive](https://archive.org/) is a non profit which has succesfully backed up 863 billion web pages since 1996.
For an other example random FTP servers are great resource to find 30+ years old drivers for hardware.

However the current status quo has big flaws:
- Lack of verifiability.
- No good migration story.
- Technical differenciation between live and backups.

### Lack of verifiability

Internet Archive is a great project, but when I browse their [first snapshot of wikipedia.org](https://web.archive.org/web/20010727112808/http://www.wikipedia.org/). How can I know this is an accurate snapshot ?

The answer is I can't, someone at Internet Archive, a governement who exercese power over Internet Archive could tamper the snapshots without me being aware.

This is better than not having a backup but it limits how safely they can be used.
Note that Internet Archive is a best case scenario, this is a well known and trusted entity in the field.
Do you want to run 30 year old code you got from an ftp that does not even have a hostname ?

### No good migration story

What if Internet Archive has funding issues and they can't keep online their wikipedia snapshots ?
Maybe some new non profit could decide to start hosting the snapshots, however either anyone currently using Internet Archive would need to move to using the new service or some humans at Internet Archive could setup a redirection to the new service.

This forces to have humans in the loop, this limit how easily we can cooperate on this project.

### Technical differenciation between live and backups

Humanity create various copies of the same data for various reasons, Internet Archive snapshot the web, your browser cache pages so they load faster, ... however each solution is ad-hoc and incompatible.

If you try to connect to wikipedia.org and it is offline for some reason, your browser wont automatically try archive.org or download it from someone else nearby who viewed the page a couple of minutes ago and has it cached.

# How does IPFS improve the situation ?

IPFS does not try to improve on the the economic part of the problem.
How we are gonna store data and make it available over thousands of years is not something IPFS is trying to do.

IPFS is solving the other part, how do we decouple the act of storing data and vetting it's authenticity.
To do so IPFS implements Content Addressing, links in IPFS point to the content, not a server who might be online and might serve you what you actually want.

This allows to move where and how the data is stored and transfered without the breaking the links.

### Verifiability with IPFS

IPFS links (also called CID) contain [cryptographic hashes](https://en.wikipedia.org/wiki/Cryptographic_hash_function) aranged in [merkle trees](https://en.wikipedia.org/wiki/Merkle_tree).

The hashes allows to verify the data you downloaded, if the data received has been modified the hash changes and the data is discarded, this means it is not absolutely critical to fetch from someone you trust.

The merkle trees are an improvement on top of plain old hashes, they allow for incremental verification and data streaming. This is important for P2P features and allows complex usecases like video streaming.

### Migrations with IPFS

It is probable that we will want to improve technology in the future.

Sadly current limits put hard floor on what can be changed and by who.

A link like `https://wikipedia.org/` forces your request to be coupled with some kind of name resolution because a name is all you have.
Turns out domain names expires, they require paying fees to someone else which pays fees to someone else which pays fees to [ICANN](https://en.wikipedia.org/wiki/Internet_Corporation_for_Assigned_Names_and_Numbers).

Solving the economic problem of backups is hard, there are multiple groups and projects proposing various solutions to this, it would be way easier if we were able to join forces on the problem.


### Indifference with IPFS

Thx to the two points above, there is no particular reason why you need a different link to access the website directly vs a backup made by a third party like the Internet Archive.

If you have an awesome idea on how to tackle the economic problem, maybe you can convaince lots of people to install some collaborative archival software which use 1% of their disk drive to backup public content. Without IPFS you also need end users to update their habits to use your software to fetch content.

Depending on how your IPFS implementation is configured, but good IPFS implementations will want to search in multiple places (so called Content Routing) could be a direct link provided and a [DHT](./dht.md) or [IPNI](./ipni.md) query. This can allow for faster downloads since you are not limited by the remote server and can download closer and or from multiple peers.

By doing this content routing this allows for new places which maintains an updatable list of who should you contact. In other words, if some source node goes down with IPFS, if someone else has a copy a good IPFS implementation will *just work*, unlike HTTP you don't need to manually find a backup somewhere else.

### Joining forces in numbers

Turns out Content Addressing is not only useful for persistance.

Today's status quo is that most projects don't implement content addressing.

The rare projects who do implement it (like docker for caching expensive layers transfer) create snowflake solutions which only work for their problem.

If you deploy a docker caching solution you can save money and have faster speeds when transfering docker images, however you can't use it to cache npm packages nor go modules even tho this is the same exact problem.

With IPFS by having a minimal set of specifications about how we describe data and having everything else modular we can apply the same solutions and improvements to:
- Persistence
- Local first networking
- Faster performance (P2P)
- Lower costs (easy caching)