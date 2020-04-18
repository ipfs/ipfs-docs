---
title: Academic papers
issueUrl: https://github.com/ipfs/docs/issues/479
---

# Academic papers

Here are a few papers that are useful for understanding IPFS, whether it be understanding the IPFS spec itself, or the background for the decentralized web, protocols, hashing, and so on.

## [IPFS - Content Addressed, Versioned, P2P File System](https://github.com/ipfs/papers/raw/master/ipfs-cap2pfs/ipfs-p2p-file-system.pdf)

**Benet, Juan**: _The InterPlanetary File System (IPFS) is a peer-to-peer distributed ﬁle system that seeks to connect all computing devices with the same system of ﬁles. In some ways, IPFS is similar to the Web, but IPFS could be seen as a single BitTorrent swarm, exchanging objects within one Git repository. In other words, IPFS provides a high throughput content-addressed block storage model, with contentaddressed hyper links. This forms a generalized Merkle DAG, a data structure upon which one can build versioned ﬁle systems, blockchains, and even a Permanent Web. IPFS combines a distributed hashtable, an incentivized block exchange, and a self-certifying namespace. IPFS has no single point of failure, and nodes do not need to trust each other._

## [A practicable approach towards secure key-based routing](https://web.archive.org/web/20170809130252id_/http://www.tm.uka.de/doc/SKademlia_2007.pdf)

**Baumgart, Ingmar and Mies, Sebastian**: _Security is a common problem in completely decentralized peer-to-peer systems. Although several suggestions exist on how to create a secure key-based routing protocol, a practicable approach is still unattended. In this paper we introduce a secure key-based routing protocol based on Kademlia that has a high resilience against common attacks by using parallel lookups over multiple disjoint paths, limiting free nodeId generation with crypto puzzles and introducing a reliable sibling broadcast. The latter is needed to store data in a safe replicated way. We evaluate the security of our proposed extensions to the Kademlia protocol ana-lytically and simulate the effects of multiple disjoint paths on lookup success under the influence of adversarial nodes_

## [Democratizing Content Publication with Coral](https://web.archive.org/web/20181117012712/http://www.coralcdn.org/docs/coral-nsdi04.pdf)

**Freedman, Michael J., Freudenthal, Eric and Mazières, David**: _CoralCDN is a peer-to-peer content distribution network that allows a user to run a web site that offers high performance and meets huge demand, all for the price of a cheap broadband Internet connection. Volunteer sites that run CoralCDN automatically replicate content as a side effect of users accessing it. Publishing through CoralCDN is as simple as making a small change to the hostname in an object's URL; a peer-to-peer DNS layer transparently redirects browsers to nearby participating cache nodes, which in turn cooperate to minimize load on the origin web server. One of the system's key goals is to avoid creating hot spots that might dissuade volunteers and hurt performance. It achieves this through Coral, a latency-optimized hierarchical indexing infrastructure based on a novel abstraction called a distributed sloppy hash table, or DSHT._

## [Escaping the Evils of Centralized Control with self-certifying pathnames](http://www.sigops.org/ew-history/1998/papers/mazieres.ps)

**Mazières, David and Kaashoek, M. Frans**: _People have long trusted central authorities to coordinate secure collaboration on local-area networks. Unfortunately, the Internet doesn’t provide the kind of administrative structures individual organizations do. As such, users risk painful consequences if global, distributed systems rely on central authorities for security. Fortunately, security need not come at the price of centralized control. To prove it, we present SFS, a secure, global, decentralized ﬁle system permitting easy cross-administrative realm collaboration. With a simple idea, self-certifying pathnames, SFS lets users escape the evils of centralized control._

## [Kademlia: A Peer-to-peer Information System Based on the XOR Metric](http://pdos.csail.mit.edu/~petar/papers/maymounkov-kademlia-lncs.pdf)

**Mazières, David and Maymounkov, Petar**: _We describe a peer-to-peer distributed hash table with provable consistency and performance in a fault-prone environment. Our system routes queries and locates nodes using a novel XOR-based metric topology that simplifies the algorithm and facilitates our proof. The topology has the property that every message exchanged conveys or re-inforces useful contact information. The system exploits this information to send parallel, asynchronous query messages that tolerate node failures without imposing timeout delays on users._
