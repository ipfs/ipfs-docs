---
title: Features
---

# Features

This release is the biggest Go-IPFS release since the IPFS alpha in February 2015. Here are some of the incredible features we've packed in:

## Improved DHT

The distributed hash table (DHT) is how IPFS nodes keep track of who has what data. The DHT implementation has been almost completely rewritten in this release. Providing, finding content, and resolving IPNS records are now all much faster. However, there are risks involved with this update due to the significant amount of changes that have gone into this feature.

### Old and new

Through our research and analysis, we found the old DHT suffers from three core issues addressed in this release:

- Most peers in the DHT are undialable (e.g., due to firewalls and NATs). Therefore, much of a DHT query time is wasted trying to connect to peers that cannot be reached.
- The DHT query logic doesn't properly terminate when it hits the end of the query and, instead, aggressively keeps on searching until it exhausts all possible routes.
- The routing tables are poorly maintained. This can cause a search that should be logarithmic in the size of the network to be linear.

#### Reachability

We have addressed the problem of undialable nodes by having nodes wait to join the DHT as _server_ nodes until they've confirmed that they are reachable from the public internet.

To ensure that nodes which are not publicly reachable (ex behind VPNs, offline LANs, etc.) can still coordinate and share data, Go-IPFS 0.5 will run two DHTs: one for private networks and one for the public internet. Every node will participate in a LAN DHT and a public WAN DHT. See [Dual DHT](#dual-dht) for more details.

#### Dual DHT

All IPFS nodes will now run two DHTs: one for the public internet WAN, and one for their local network LAN.

1. When connected to the public internet, IPFS will use both DHTs for finding peers, content, and IPNS records. Nodes only publish provider and IPNS records to the WAN DHT to avoid flooding the local network.
2. When not connected to the public internet, nodes publish provider and IPNS records to the LAN DHT.

The WAN DHT includes all peers with at least one public IP address. This release will only consider an IPv6 address public if it is in the [public internet range `2000::/3`](https://www.iana.org/assignments/ipv6-address-space/ipv6-address-space.xhtml).

This feature should not have any noticeable impact on Go-IPFS, performance, or otherwise. Everything should continue to work in all the currently supported network configurations: VPNs, disconnected LANs, public internet, etc.

#### Query Logic

We've improved the DHT query logic to more closely follow Kademlia. This should significantly speed up:

- Publishing IPNS & provider records.
- Resolving IPNS addresses.

Previously, nodes would continue searching till they timed out or ran out of peers before stopping (putting or returning data found). Now, nodes will now stop as soon as they find the closest peers.

#### Routing Tables

Finally, we've addressed the poorly maintained routing tables by:

- Reducing the likelihood that the connection manager will kill connections to peers in the routing table.
- Keeping useful peers in the routing table, even if we get disconnected from them.
- Actively and frequently querying the DHT to keep our routing table full.
- Prioritizing useful peers that respond to queries quickly.

### Testing

The DHT rewrite was made possible by [Testground](https://github.com/ipfs/testground/), our new testing framework. Testground allows us to spin up multi-thousand node tests with simulated real-world network conditions. By combining Testground and some custom analysis tools, we were able to gain confidence that the new DHT implementation behaves correctly and significantly improves network performance.

## AutoNAT

This release uses Automatic NAT Detection (AutoNAT) - determining if the node is _reachable_ from the public internet - to make decisions about how to participate in IPFS. This subsystem is used to determine if the node should store some of the public DHT, and if it needs to use relays to be reached by others. In short:

1. An AutoNAT client asks a node running an AutoNAT service if it can be reached at one of a set of guessed addresses.
2. The AutoNAT service attempts to _dial back_ those addresses, with some restrictions. We won't dial back to a different IP address, for example.
3. If the AutoNAT service succeeds, it reports back the address it successfully dialed, and the AutoNAT client knows that it is reachable from the public internet.

All nodes act as AutoNAT clients to determine if they should switch into DHT server mode. As of this release, nodes will by default run the service side of AutoNAT - verifying connectivity - for up to 30 peers every minute. This service should have minimal overhead, and will be disabled for nodes in the `lowpower` configuration profile, and those which believe they are not publicly reachable.

In addition to enabling the AutoNAT service by default, this release changes the AutoNAT config options:

1. The `Swarm.EnableAutoNATService` option has been removed.
2. A new AutoNAT section has been added to the config. This section is empty by default.

## Subdomain support in HTTP gateway

There are three _gateways_ for HTTP within IPFS:

1. Path-based
1. Subdomain-based
1. Through DNSLink

Path-based gateway management is simple to implement but comes with a host of security and compatibility issues - most of these issues linked to _same-origin policies_. Under the policy, a web browser permits scripts contained in a first web page to access data in a second web page, but only if both web pages have the same _origin_.

Conforming to this policy was an issue before this release. There was a significant amount of _hackery_ needed to get subdomains working. With Go-IPFS 0.5, subdomains are supported straight out of the box. Users are also able to configure the gateway behavior per hostname. This implementation ensures that every application gets an individual browser origin. In summary, this update makes it easier to write websites that _just work_.

The gateway will now redirect from `localhost:5001/ipfs/CID/...` to `CID.ipfs.localhost:5001/...` by default. This ensures that every Dapp gets its own browser origin, and makes it easier to write websites because absolute paths now work. Paths addressing the gateway by IP address `127.0.0.1:5001/ipfs/CID` will not be altered as IP addresses can't have subdomains.

This update to subdomain support means we'll be introducing a redirect from the path-based gateway to the correct subdomain, and doing so could cause issues with [cURL](https://en.wikipedia.org/wiki/CURL), which doesn't follow redirects by default. To mitigate this issue, either change your cURL invocations to call `curl -L`, or reconfigure your IPFS node to not use the subdomain gateway on the affected domain.

## Refactored Bitswap

This release includes a major [Bitswap refactor](https://blog.ipfs.io/2020-02-14-improved-bitswap-for-container-distribution/), running a new and backward compatible Bitswap protocol. We expect these changes to improve performance significantly.

With the refactored Bitswap, we expect:

- Few to no duplicate blocks when fetching data from other nodes speaking the _new_ protocol.
- Better parallelism when fetching from multiple peers.

The new Bitswap won't magically make downloading content any faster until **both** seeds and leaches have updated. If you're one of the first to upgrade to `0.5.0`, make sure your peers upgrade as well in order to see the performance improvement.

## Badger Integration

Badger has been in Go-IPFS for over a year as an experimental feature, and we're promoting it to stable (but not default). For this release, we've switched from writing to disk synchronously to explicitly syncing where appropriate, significantly increasing write throughput.

The current and default datastore used by Go-IPFS is [FlatFS](https://github.com/ipfs/go-ds-flatfs). FlatFS essentially stores blocks of data as individual files on your file system. However, there are lots of optimizations a specialized database can do that a standard file system can not.

The benefit of Badger is that adding/fetching data to/from Badger is significantly faster than adding/fetching data to/from the default datastore, FlatFS. In some tests, adding data to Badger is 32x faster than FlatFS (in this release).

### Enable Badger

In this release, we're marking the badger datastore as stable. However, we're not yet enabling it by default. You can enable it at initialization by running: `ipfs init --profile=badgerds`

### When to use Badger

While Badger is a great solution, there are some issues you should consider before enabling it.

Badger is complicated. FlatFS pushes all the complexity down into the filesystem itself, so it's only likely to lose your data if your underlying filesystem gets corrupted. There are more opportunities for Badger itself to get corrupted.

Badger can use a lot of memory. In this release, we've tuned Badger to use `~20MB` of memory by default. However, it can still produce spikes as large as [`1GiB` of data](https://github.com/dgraph-io/badger/issues/1292) in memory usage when garbage collecting.

Finally, badger isn't very aggressive when it comes to garbage collection, and we're still investigating ways to get it to more aggressively clean up after itself.

We suggest you use Badger if:

- Performance is your main requirement.
- You rarely delete anything.
- You have some memory to spare.

## TLS by default

[Transport layer security](https://en.wikipedia.org/wiki/Transport_Layer_Security) (TLS), is a set of technologies used for link-layer encryption. It's a commonly used technology; most of the web browsing you do every day uses TLS. Using TLS by default provides a robust set of encryption and authentication standards. In this release, we're switching TLS to be the default transport. This means we'll try to encrypt the connection with TLS before re-trying with SECIO. SECIO will be deprecated in an upcoming next release.

## EthDNS support for `.eth`

[Ethereum Name Service](https://ens.domains/) (ENS) offers a secure and decentralized way to address resources both on and off the blockchain using simple, human-readable domain names. This means you can use ENS to map domain names like `RandomPlanetFacts.eth` to IPFS content paths, for example `/ipfs/QmW7S5HRLkP4XtPNyT1vQSjP3eRdtZaVtF6FAPvUfduMjA`.

EthDNS is a way to access information in the Ethereum Name Service from DNS, without running a local Ethereum client. [Eth.link](https://eth.link) is a public EthDNS instance created to resolve ENS records behind `.eth` domains. Because `.eth` is not a registered DNS top-level domain, it is normally inaccessible through regular browsers. But with EthDNS you can view ENS websites by adding `.link` to the end of the URL. A DNS `A` record request for `RandomPlanetFacts.eth.link` looks up the `A` records in ENS for `RandomPlanetFacts.eth`.

Go-IPFS 0.5 supports the resolution of DNSLink for `.eth` names through the EthDNS instance at [eth.link](https://eth.link) transparently, which means you can use `/ipns/RandomPlanetFacts.eth` within IPFS without having to add `.link` to the end of the URL:

```bash
ipfs resolve -r /ipns/RandomPlanetFacts.eth
> /ipfs/QmW7S5HRLkP4XtPNyT1vQSjP3eRdtZaVtF6FAPvUfduMjA
```

## Systemd

[Systemd](https://en.wikipedia.org/wiki/Systemd) has become a ubiquitous initialization system for Linux distributions. Among its many functions, it provides a standard mechanism for managing background processes - the various servers and tasks that run on your machine. IPFS for Linux now plugs into the Systemd world, allowing it to start automatically with the computer. This support also allows IPFS to be controlled through the same interface as the other programs running on your computer. This makes it possible to:

- Start IPFS on-demand on first use.
- Wait for IPFS to finish starting before starting services that depend on it.

You can find the new systemd units in the [`ipfs/go-ipfs` repository](https://github.com/ipfs/go-ipfs) under [`misc/systemd`](https://github.com/ipfs/go-ipfs/tree/master/misc/systemd).

## Testground

Testground is a new testing framework that IPFS is using to validate the changes to the distributed aspects of the system. Complex changes, like the DHT, are challenging to understand through unit tests or with a small number of machines. Testground provides the ability to spin up thousands of virtual IPFS nodes in complex network topologies to gain confidence that changes will work when they're rolled out. With Testground, expect more stability and regularity in upcoming IPFS releases.
