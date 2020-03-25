---
title: Features
issueUrl: https://github.com/ipfs/docs/issues/471
---

## Improved DHT and content routing

The distributed hash table (DHT) is how IPFS nodes keep track of who has what data. The DHT implementation has been almost completely rewritten in this release, with a new protocol version. Providing, finding content, and resolving IPNS records are now all much faster. However, there are risks involved with this update due to the significant amount of changes that have gone into this feature.

IPFS now automatically detects if you are on a home network behind a network address translator (NAT), or if other nodes can reach you directly. Only nodes that find they are externally reachable participate in storing records in the DHT. Lookups and storage in the table have also been optimized to more closely match the current best practices. You may need to reconfigure your network's router to allow your IPFS node access to the internet. [Find out how to disable NAT for your network →](#)

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

[Ethereum Name Service(ENS)](https://ens.domains/) offers a secure & decentralised way to address resources both on and off the blockchain using simple, human-readable names.

In IPFS context users can leverage [EIP 1577](https://eips.ethereum.org/EIPS/eip-1577) and use ENS to map names such as `aardvark.eth` to content paths like `/ipfs/bafy...`

EthDNS is a way to access information in the ENS from DNS, without running a local Ethereum client.

[EthLink](https://eth.link) is a public EthDNS instance created for resolving ENS records behind `.eth` domains. Because `.eth` is not a registered DNS top-level domain it is normally inaccessible from DNS, but by appending `.link` to the domain the relevant information cam be obtained. For example, a DNS A record request for `mydomain.eth.link` would look up the A records in ENS for `mydomain.eth`.

go-ipfs now supports resolution of DNSLink for `.eth` names via EthDNS instance at [eth.link](https://eth.link) transparently, which means one can use `/ipns/mydomain.eth` and it will work, without the need for adding `.link` suffix or changing DNS server.

### Examples

#### `.eth` in `ipfs resolve`

Command line resolution from ENS name to IPFS content path:

```console
$ ipfs resolve -r /ipns/almonit.eth
/ipfs/QmeXGvLAsLwuq4uDLqsH3XECWZYiJrAszRvkDuyR91ERQX
```

#### `.eth` loaded from local HTTP gateway

When ENS website is opened from local subdomain gateway, the URL looks like this:
[http://almonit.eth.ipns.localhost:8080](http://almonit.eth.ipns.localhost:8080) (requires go-ipfs >= 0.5)

## Faster file and pins listing

> TODO: This one's pretty obvious. Make it faster to post files and pin then to nodes.

> TODO: What had to be changed to make this process faster

## Systemd support

[Systemd](https://en.wikipedia.org/wiki/Systemd) has become a ubiquitous initialization system for Linux distributions. Among its many functions, it provides a standard mechanism for managing background processes - the various servers and tasks that run on your machine. IPFS for Linux now plugs into the Systemd world, allowing it to start automatically with the computer. This support also allows IPFS to be controlled through the same interface as the other programs running on your computer.

## Testground implemented

Testground is a new testing framework that IPFS is using to validate the changes to the distributed aspects of the system. Complex changes, like the DHT, are challenging to understand through unit tests or with a small number of machines. Testground provides the ability to spin up thousands of virtual IPFS nodes in complex network topologies to gain confidence that changes will work when they're rolled out. With Testground, expect more stability and regularity in upcoming IPFS releases.
