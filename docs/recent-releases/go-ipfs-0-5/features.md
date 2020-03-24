---
title: Features
issueUrl: https://github.com/ipfs/docs/issues/471
---

## Improved DHT and content rounting

The distrubuted hash table (DHT) is how IPFS nodes keep track of who has what data. The DHS has implementation has been almost completely rewritten in this release, with a new protocol version. Providing, finding content, and resolving IPNS records are now all much faster. However there are certain risks involved with this update, due to the significant amount of changes that have go into this feature.

<!-- Explain what happens when you're behind a NAT. -->

## Faster IPNS

<!-- This update makes IPNS faster. -->

<!-- What is IPNS, why was it slow? -->

<!-- How has this update made if faster? -->

## Refactored Bitswap

This release includes a major Bitswap refactor, running a new and backwards compatible Bitswap protocol. We expect these changes to improve performance significantly.

With the refactored Bitswap, we expect:

- Few to no duplicate blocks when fetching data.
- Better parallelism when fetching from multiple peers.

However, go-ipfs 0.5 may perform slightly _worse_ in some edge-cases when downloading older go-ipfs versions (where it has less information about who has what). Our tests have shown that this isn't actually an issue in practice, but it's still theoretically possible.

## TLS by default

<!-- What TLS is. -->

<!-- Why is was selected as a default option. -->

<!-- What this means for end-users. -->

## `.eth` link support

<!-- What `.eth` is. -->

<!-- Why it's important. -->

<!-- How end-users can use is. -->

## Subdomain support in HTTP gateway

<!-- Speak to Lidel. -->

The gateway will switch from `http://domain/ipfs/CID/...` to `http://cid.ipfs.domain/...` by default this will:

- Ensure that every dapp gets its own browser origin.
- Make it easier to write websites that "just work" with IPFS because absolute paths will now work.

However, this also means we'll be introducing a redirect from the path-based gateway to the correct subdomain. Unfortunately, this could cause issues with cURL, which doesn't follow redirects by default. If you run into this issue, you'll either need to change your cURL invocations to call `curl -L`, or you'll need to reconfigure your IPFS node to not use the subdomain gateway on the affected domain.

## Faster file and pins listing

<!-- This one's pretty obvious. Make it faster to post files and pin then to nodes. -->

<!-- What had to be changed to make this process faster -->

## Systemd support

<!-- What is Systemd? -->

<!-- Why is it imporant/what other process rely on it? -->

<!-- How does this support improve the lives of end-users -->

## Badger integration

Badger has been in go-ipfs for over a year as an experimental feature, and we're still leaving as experimental for now. However, for this release, we've done some interface changes that have allowed us to take advantage of features in Badger to increase the performance of adding data to Go-IPFS.

<!-- Speak to Adin about this. -->

<!-- What was wrong with the old file system -->

The current and default file system used by Go-IPFS is [FlatFS](https://github.com/ipfs/go-ds-flatfs). FlatFS essentially stores blocks of data as files on your file system. However, there are lots of optimizations a specialized database can do that a standard file system can not. On a standard hard drive, reading from a contiguous array of bytes is much faster than randomly reading bytes, so having a database that operates as one single file has lots of room for optimization.

<!-- What is Badger? -->

[BadgerDB](https://blog.dgraph.io/post/badger/) is a key-value database written in Go. Version 1 came out in November 2017, and the project has since received praise for being more efficient and performant than other non-Go-based key-value stores. You can find out more about [BadgerDB on GitHub](https://github.com/dgraph-io/badger#badgerdb------).

<!-- How is this going to change how end-users interact with Go-IPFS? -->

In this release, we've made some changes to our datastore interfaces that allowed us to take advantage of some features in Badger and other databases. In particular we now use asynchronous writes by default. Using Badger's asynchronous write feature increased our write performance by up to 300%.

## Testground added

<!-- What is testground? -->

<!-- How does it impact end-users? -->
