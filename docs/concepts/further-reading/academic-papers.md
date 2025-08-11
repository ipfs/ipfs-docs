---
title: Academic Papers
description: Here are a few papers that are useful for understanding IPFS, whether it be understanding the IPFS specification itself or the background for the decentralized web, protocols, hashing, and so on.
---

# Academic Papers

Here are a few papers that are useful for understanding IPFS, whether it be understanding the IPFS spec itself or the background for the decentralized web, protocols, hashing, and so on.

## [IPFS - Content Addressed, Versioned, P2P File System](https://github.com/ipfs/papers/raw/master/ipfs-cap2pfs/ipfs-p2p-file-system.pdf)

> Original IPFS white paper

**Benet, Juan**: _The InterPlanetary File System (IPFS) is a peer-to-peer distributed ﬁle system that seeks to connect all computing devices with the same system of files. In some ways, IPFS is similar to the Web, but IPFS could be seen as a single BitTorrent swarm, exchanging objects within one Git repository. In other words, IPFS provides a high throughput content-addressed block storage model, with content-addressed hyperlinks. This forms a generalized Merkle DAG, a data structure upon which one can build versioned ﬁle systems, blockchains, and even a Permanent Web. IPFS combines a distributed hashtable, an incentivized block exchange, and a self-certifying namespace. IPFS has no single point of failure, and nodes do not need to trust each other._

## [Design and Evaluation of IPFS: A Storage Layer for the Decentralized Web](https://ipfs.io/ipfs/bafybeid6doxhzck3me366265u3ony6rbuzv7dze7pjuptxeln24b2qvur4?filename=trautwein2022a.pdf)

> Association for Computing Machinery, 2022

**Trautwein, Dennis and Raman, Aravindh and Tyson, Gareth and Castro, Ignacio and Scott, Will and Schubotz, Moritz and Gipp, Bela and Psaras, Yiannis**: _Recent years have witnessed growing consolidation of web operations. For example, the majority of web traffic now originates from a few organizations, and even micro-websites often choose to host on large pre-existing cloud infrastructures. In response to this, the “Decentralized Web” attempts to distribute ownership and operation of web services more evenly. This paper describes the design and implementation of the largest and most widely used Decentralized Web platform — the InterPlanetary File System (IPFS) — an open-source, content-addressable peer-to-peer network that provides distributed data storage and delivery. IPFS has millions of daily content retrievals and already underpins dozens of third-party applications. This paper evaluates the performance of IPFS by introducing a set of measurement methodologies that allow us to uncover the characteristics of peers in the IPFS network. We reveal presence in more than 2700 Autonomous Systems and 152 countries, the majority of which operate outside large central cloud providers like Amazon or Azure. We further evaluate IPFS performance, showing that both publication and retrieval delays are acceptable for a wide range of use cases. Finally, we share our datasets, experiences and lessons learned._

## [A practicable approach towards secure key-based routing](https://web.archive.org/web/20170809130252id_/http://www.tm.uka.de/doc/SKademlia_2007.pdf)

> Institute of Electrical and Electronics Engineers, 2007

**Baumgart, Ingmar and Mies, Sebastian**: _Security is a common problem in completely decentralized peer-to-peer systems. Although several suggestions exist on how to create a secure key-based routing protocol, a practicable approach is still unattended. In this paper, we introduce a secure key-based routing protocol based on Kademlia that has a high resilience against common attacks by using parallel lookups over multiple disjoint paths, limiting free nodeId generation with crypto puzzles, and introducing a reliable sibling broadcast. The latter is needed to store data in a safe, replicated way. We evaluate the security of our proposed extensions to the Kademlia protocol analytically and simulate the effects of multiple disjoint paths on lookup success under the influence of adversarial nodes_

## [Democratizing Content Publication with Coral](https://web.archive.org/web/20181117012712/http://www.coralcdn.org/docs/coral-nsdi04.pdf)

> USENIX Association, 2004

**Freedman, Michael J., Freudenthal, Eric and Mazières, David**: _CoralCDN is a peer-to-peer content distribution network that allows a user to run a web site that offers high performance and meets huge demand, all for the price of a cheap broadband Internet connection. Volunteer sites that run CoralCDN automatically replicate content as a side effect of users accessing it. Publishing through CoralCDN is as simple as making a small change to the hostname in an object's URL; a peer-to-peer DNS layer transparently redirects browsers to nearby participating cache nodes, which in turn cooperate to minimize load on the origin web server. One of the system's key goals is to avoid creating hot spots that might dissuade volunteers and hurt performance. It achieves this through Coral, a latency-optimized hierarchical indexing infrastructure based on a novel abstraction called a distributed sloppy hash table or DSHT._

## [Escaping the Evils of Centralized Control with self-certifying pathnames](https://dl.acm.org/doi/abs/10.1145/319195.319213)

> Association for Computing Machinery, 1998

**Mazières, David and Kaashoek, M. Frans**: _People have long trusted central authorities to coordinate secure collaboration on local-area networks. Unfortunately, the Internet doesn't provide the kind of administrative structures individual organizations do. As such, users risk painful consequences if global, distributed systems rely on central authorities for security. Fortunately, security need not come at the price of centralized control. To prove it, we present SFS, a secure, global, decentralized ﬁle system permitting easy cross-administrative realm collaboration. With a simple idea, self-certifying pathnames, SFS lets users escape the evils of centralized control._

## [Kademlia: A Peer-to-peer Information System Based on the XOR Metric](http://pdos.csail.mit.edu/~petar/papers/maymounkov-kademlia-lncs.pdf)

> Springer-Verlag, 2002

**Mazières, David and Maymounkov, Petar**: _We describe a peer-to-peer distributed hash table with provable consistency and performance in a fault-prone environment. Our system routes queries, and locates nodes, using a novel XOR-based metric topology that simplifies the algorithm and facilitates our proof. The topology has the property that every message exchanged conveys or re-inforces useful contact information. The system exploits this information to send parallel, asynchronous query messages that tolerate node failures without imposing timeout delays on users._

## [IPFS - the perspective storage infrastructure for scientific data](https://zenodo.org/record/4742585)

> Presentation slides for **IPFS Introductory Webinar** made as proof of side activity of [ExPaNDs](https://expands.eu/) project on [Elettra Sincrotrone Trieste](https://www.elettra.eu/) 24/09/2020. Based on [PaNdata Continuum](http://pan-data.eu/sites/pan-data.eu/files/PaNdataODI-D6.2.pdf) ontology.

**Vukolov, Andrey**: _The presentation describes in an academic manner the advantages of IPFS as a data identification and storage system with built-in basic provenance._

## [Openly reproducible Persistent Identifiers (PIDs) as a factor of FAIRness in data sharing practices](https://zenodo.org/record/4980522)

> Presentation slides for [European Open Science Cloud Symposium 2021](https://www.eoscsecretariat.eu/eosc-symposium-2021).

**Vukolov, Andrey**: _This presentation describes differences and influences on the FAIR data sharing model of decentralized persistent identifiers (PIDs) associated with data. As a living example of an existing decentralized, openly reproducible PID, the IPFS CID is described as part of the decentralized provenance system._
