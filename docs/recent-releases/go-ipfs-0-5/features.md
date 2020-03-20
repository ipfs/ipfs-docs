---
title: Features
issueUrl: https://github.com/ipfs/docs/issues/471
---

## Improved DHT

The distrubuted hash table (DHT) is how IPFS nodes keep track of who has what data. The DHS has implementation has been almost completely rewritten in this release, with a new protocol version. Providing, finding content, and resolving IPNS records are now all much faster. However there are certain risks involved with this update, due to the significant amount of changes that have go into this feature.

## Faster IPNS

Needs expanding.

## Refactored Bitswap

This release includes a major Bitswap refactor, running a new and backwards compatible Bitswap protocol. We expect these changes to improve performance significantly.

With the refactored Bitswap, we expect:

- Few to no duplicate blocks when fetching data.
- Better parallelism when fetching from multiple peers.

However, go-ipfs 0.5 may perform slightly _worse_ in some edge-cases when downloading older go-ipfs versions (where it has less information about who has what). Our tests have shown that this isn't actually an issue in practice, but it's still theoretically possible.

## TLS by default

## .eth link support

## Subdomain support in HTTP gateway

The gateway will switch from `http://domain/ipfs/CID/...` to `http://cid.ipfs.domain/...` by default this will:

- Ensure that every dapp gets its own browser origin.
- Make it easier to write websites that "just work" with IPFS because absolute paths will now work.

However, this also means we'll be introducing a redirect from the path-based gateway to the correct subdomain. Unfortunately, this could cause issues with cURL, which doesn't follow redirects by default. If you run into this issue, you'll either need to change your cURL invocations to call `curl -L`, or you'll need to reconfigure your IPFS node to not use the subdomain gateway on the affected domain.

## Faster file and pins listing

## Systemd support

## Badger FS integration

## Testground added
