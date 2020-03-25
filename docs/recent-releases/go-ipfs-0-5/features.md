---
title: Features
issueUrl: https://github.com/ipfs/docs/issues/471
---

## Improved DHT and content rounting

The distrubuted hash table (DHT) is how IPFS nodes keep track of who has what data. The DHS implementation has been almost completely rewritten in this release, with a new protocol version. Providing, finding content, and resolving IPNS records are now all much faster. However there are risks involved with this update due to the significant amount of changes that have gone into this feature.

IPFS now automatically detects if you are on a home network behind a NAT, or if other nodes can reach you directly. Only nodes which find they are externally reachable will participate in storing records in the DHT. Lookups and storage in the table has also been optimized to more closely match the current best practices.

## Subdomain support in HTTP gateway

There are three _gateways_ for HTTP within IPFS:

1. Path-based
1. Subdomain-based
1. Through DNS Link

Path-based gateway management is simple to implement but comes with a host of security and compatibility issues - most of these issues linked to _same-origin policies_. Under the policy, a web browser permits scripts contained in a first web page to access data in a second web page, but only if both web pages have the same _origin_.

Conforming to this policy was an issue before this release. There was a significant amount of _hackery_ needed to get subdomains working. With Go-IPFS 0.5, subdomains are supported straight out of the box. Users are also able to configure the gateway behavior per hostname. This implementation ensures that every application gets an individual browser origin. In summary, this update makes it easier to write websites that _just work_.

This update to subdomain support means we'll be introducing a redirect from the path-based gateway to the correct subdomain, and doing so could cause issues with [cURL](https://en.wikipedia.org/wiki/CURL), which doesn't follow redirects by default. To mitigate this issue, either change your cURL invocations to call `curl -L`, or reconfigure your IPFS node to not use the subdomain gateway on the affected domain.

## Refactored Bitswap

This release includes a major Bitswap refactor, running a new and backwards compatible Bitswap protocol. We expect these changes to improve performance significantly.

With the refactored Bitswap, we expect:

- Few to no duplicate blocks when fetching data.
- Better parallelism when fetching from multiple peers.

However, go-ipfs 0.5 may perform slightly _worse_ in some edge-cases when downloading older go-ipfs versions (where it has less information about who has what). Our tests have shown that this isn't actually an issue in practice, but it's still theoretically possible.

## Badger integration

Badger has been in go-ipfs for over a year as an experimental feature, and we're still leaving as experimental for now. However, for this release, we've done some interface changes that have allowed us to take advantage of features in Badger to increase the performance of adding data to Go-IPFS.

The current and default file system used by Go-IPFS is [FlatFS](https://github.com/ipfs/go-ds-flatfs). FlatFS essentially stores blocks of data as files on your file system. However, there are lots of optimizations a specialized database can do that a standard file system can not. On a standard hard drive, reading from a contiguous array of bytes is much faster than randomly reading bytes, so having a database that operates as one single file has lots of room for optimization.

[BadgerDB](https://blog.dgraph.io/post/badger/) is a key-value database written in Go. Version 1 came out in November 2017, and the project has since received praise for being more efficient and performant than other non-Go-based key-value stores. You can find out more about [BadgerDB on GitHub](https://github.com/dgraph-io/badger#badgerdb------).

In this release, we've made some changes to our datastore interfaces that allowed us to take advantage of some features in Badger and other databases. In particular we now use asynchronous writes by default. Using Badger's asynchronous write feature increased our write performance by up to 300%.

## Faster IPNS

> TODO: What is IPNS, why is it slow?

> TODO: This update makes IPNS faster.

> TODO: How has this update made if faster?

## TLS by default

TLS, or Transport Layer Security, is a set of technologies which already is used for link layer encryption for most of the web browsing you do every day. Using TLS by default provides a robust and standard set of encryption and authentication primitives, which improve the stability, security, and performance of IPFS.

> TODO: What has it been selected as the default option.

> TODO: What other options exist still.

> TODO: What does this mean for users?

## `.eth` link support

> TODO: What `.eth` link is.

> TODO: Why it's important (I'm assuming it links into the subdomains work in this release).

> TODO: How can users use it?

## Faster file and pins listing

> TODO: This one's pretty obvious. Make it faster to post files and pin then to nodes.

> TODO: What had to be changed to make this process faster

## Systemd support

Systemd has become a ubiquitous initialization system for linux distributions. Among is many functions, it provides a common mechanism for managing background processes; the various servers and tasks that run on your machine. IPFS for linux now plugs into the Systemd world, allowing it to be configured to automatically start with the computer, and to be controlled through the same interface as the other programs running on your computer.

## Testground added

Testground is a new testing framework that IPFS is using to validate the changes to the distributed aspects of the system. Complex changes, like the DHT, are difficult to understand through unit tests, or with a small number of mchines. Testground provides the ability to spin up thousands of virtual IPFS nodes in complex network topologies in order to gain confidence that changes will work when they're rolled out. With testground, expect more stability and regularity in upcoming IPFS releases.
