---
title: Features
issueUrl: https://github.com/ipfs/docs/issues/471
---

# Features

This release is the biggest Go-IPFS release since mid-September 2019. Here are some of the incredible features we've packed in:

## Improved DHT and content routing

The distributed hash table (DHT) is how IPFS nodes keep track of who has what data. The DHT implementation has been almost completely rewritten in this release. Providing, finding content, and resolving IPNS records are now all much faster. However, there are risks involved with this update due to the significant amount of changes that have gone into this feature.

### Old and new

The current DHT suffers from three core issues addressed in this release:

- Most peers in the DHT cannot be dialed (e.g., due to firewalls and NATs). Much of a DHT query time is wasted trying to connect to peers that cannot be reached.
- The DHT query logic doesn't properly terminate when it hits the end of the query and, instead, aggressively keeps on searching.
- The routing tables are poorly maintained. This can cause a search that should be logarithmic in the size of the network to be linear.

#### Reachable

We have addressed the problem of undialable nodes by having nodes wait to join the DHT as _server_ nodes until they've confirmed that they are reachable from the public internet. Additionally, we've introduced:

- A new Libp2p protocol to push updates to our peers when we start/stop listening on protocols.
- A Libp2p event bus for processing updates like these.
- A new DHT protocol version. New DHT nodes will not admit old DHT nodes into their routing tables. Old DHT nodes will still be able to issue queries against the new DHT, but they won't be queried or referred by new DHT nodes. This way, old, potentially unreachable nodes with bad routing tables won't pollute the new DHT.

There is a significant downside to this approach, however. Nodes behind VPNs, offline LANs, etc. are not publicly reachable. To address this issue, Go-IPFS 0.5.0 will run two DHTs: one for private networks and one for the public internet. Every node will participate in a LAN DHT and a public WAN DHT.

#### Query Logic

We've fixed the DHT query logic by correctly implementing Kademlia. This should significantly speed up:

- Publishing IPNS & provider records. We previously continued searching for closer and closer peers to the "target" until we timed out, then we put to the closest peers we found.
- Resolving IPNS addresses. We previously continued IPNS record searches until we ran out of peers to query, timed out, or found 16 records.

In both cases, nodes continue searching until they find the closest peers and then stop.

#### Routing Tables

Finally, we've addressed the poorly maintained routing tables by:

- Reducing the likelihood that the connection manager will kill connections to peers in the routing table.
- Keeping peers in the routing table, even if we get disconnected from them.
- Actively and frequently querying the DHT to keep our routing table full.

### Testing

The DHT rewrite was made possible by [Testground](https://github.com/ipfs/testground/), our new testing framework. Testground allows us to spin up multi-thousand node tests with simulated real-world network conditions. By combining Testground and some custom analysis tools, we were able to gain confidence that the new DHT implementation behaves correctly.

## Subdomain support in HTTP gateway

There are three _gateways_ for HTTP within IPFS:

1. Path-based
1. Subdomain-based
1. Through DNS Link

Path-based gateway management is simple to implement but comes with a host of security and compatibility issues - most of these issues linked to _same-origin policies_. Under the policy, a web browser permits scripts contained in a first web page to access data in a second web page, but only if both web pages have the same _origin_.

Conforming to this policy was an issue before this release. There was a significant amount of _hackery_ needed to get subdomains working. With Go-IPFS 0.5, subdomains are supported straight out of the box. Users are also able to configure the gateway behavior per hostname. This implementation ensures that every application gets an individual browser origin. In summary, this update makes it easier to write websites that _just work_.

This update to subdomain support means we'll be introducing a redirect from the path-based gateway to the correct subdomain, and doing so could cause issues with [cURL](https://en.wikipedia.org/wiki/CURL), which doesn't follow redirects by default. To mitigate this issue, either change your cURL invocations to call `curl -L`, or reconfigure your IPFS node to not use the subdomain gateway on the affected domain.

## Refactored Bitswap

This release includes a major Bitswap refactor, running a new and backward compatible Bitswap protocol. We expect these changes to improve performance significantly.

With the refactored Bitswap, we expect:

- Few to no duplicate blocks when fetching data.
- Better parallelism when fetching from multiple peers.

However, go-ipfs 0.5 may perform slightly _worse_ in some edge-cases when downloading older go-ipfs versions (where it has less information about who has what). Our tests have shown that this isn't an issue in practice, but it's still theoretically possible.

## Badger integration

Badger has been in go-ipfs for over a year as an experimental feature, and we're still leaving as experimental for now. However, for this release, we've done some interface changes that have allowed us to take advantage of features in Badger to increase the performance of adding data to Go-IPFS.

The current and default file system used by Go-IPFS is [FlatFS](https://github.com/ipfs/go-ds-flatfs). FlatFS essentially stores blocks of data as files on your file system. However, there are lots of optimizations a specialized database can do that a standard file system can not. On a standard hard drive, reading from a contiguous array of bytes is much faster than randomly reading bytes, so having a database that operates as one single file has lots of room for optimization.

[BadgerDB](https://blog.dgraph.io/post/badger/) is a key-value database written in Go. Version 1 came out in November 2017, and the project has since received praise for being more efficient and performant than other non-Go-based key-value stores. You can find out more about [BadgerDB on GitHub](https://github.com/dgraph-io/badger#badgerdb------).

In this release, we've made some changes to our datastore interfaces that allowed us to take advantage of some features in Badger and other databases. In particular, we now use asynchronous writes by default. Using Badger's asynchronous write feature increased our write performance by up to 300%.

## Faster IPNS

> TODO: What is IPNS, why is it slow?

> TODO: This update makes IPNS faster.

> TODO: How has this update made it faster?

## TLS by default

[Transport layer security](https://en.wikipedia.org/wiki/Transport_Layer_Security) (TLS), is a set of technologies used for link-layer encryption. It's a commonly used technology; most of the web browsing you do every day uses TLS. Using TLS by default provides a robust set of encryption and authentication standards. These standards help to improve the stability, security, and performance of IPFS.

## EthDNS support for `.eth`

[Ethereum Name Service](https://ens.domains/) (ENS) offers a secure and decentralized way to address resources both on and off the blockchain using simple, human-readable domain names. This means you can use ENS to map domain names like `RandomPlanetFacts.eth` to IPFS content paths, for example `/ipfs/QmW7S5HRLkP4XtPNyT1vQSjP3eRdtZaVtF6FAPvUfduMjA`.

EthDNS is a way to access information in the ENS from DNS, without running a local Ethereum client. [EthLink](https://eth.link) is a public EthDNS instance created to resolve ENS records behind `.eth` domains. Because `.eth` is not a registered DNS top-level domain, it is normally inaccessible through regular browsers. But you can get to the website by adding `.link` to the end of the URL. A DNS `A` record request for `RandomPlanetFacts.eth.link` looks up the `A` records in ENS for `RandomPlanetFacts.eth`.

Go-IPFS 0.5 supports the resolution of DNSLink for `.eth` names through the EthDNS instance at [eth.link](https://eth.link) transparently, which means you can use `/ipns/RandomPlanetFacts.eth` within IPFS without having to add `.link` to the end of the URL:

```bash
ipfs resolve -r /ipns/RandomPlanetFacts.eth
> /ipfs/QmW7S5HRLkP4XtPNyT1vQSjP3eRdtZaVtF6FAPvUfduMjA
```

## Faster file and pins listing

> TODO: This one's pretty obvious. Make it faster to post files and pin then to nodes.

> TODO: What had to be changed to make this process faster

## Systemd support

[Systemd](https://en.wikipedia.org/wiki/Systemd) has become a ubiquitous initialization system for Linux distributions. Among its many functions, it provides a standard mechanism for managing background processes - the various servers and tasks that run on your machine. IPFS for Linux now plugs into the Systemd world, allowing it to start automatically with the computer. This support also allows IPFS to be controlled through the same interface as the other programs running on your computer.

## Testground implemented

Testground is a new testing framework that IPFS is using to validate the changes to the distributed aspects of the system. Complex changes, like the DHT, are challenging to understand through unit tests or with a small number of machines. Testground provides the ability to spin up thousands of virtual IPFS nodes in complex network topologies to gain confidence that changes will work when they're rolled out. With Testground, expect more stability and regularity in upcoming IPFS releases.
