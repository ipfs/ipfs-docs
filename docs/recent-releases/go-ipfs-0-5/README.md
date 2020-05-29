---
title: Overview
---

# Go-IPFS 0.5

![The Go-IPFS logo.](./images/go-ipfs-logo.png =740x210)

It's been a while since the last Go-IPFS release. We've packed an incredible amount of bug fixes, improvements, and features into this build; it's the biggest Go-IPFS release since the project first started!

## Features

There are plenty of features packed into this release. The DHT implementation is vastly improved, we refactored Bitswap to improve speed and reliability, go-ipfs now has built-in support for subdomain-based gateways, and Badger has gained more support and is sufficiently stable enough for daily use. These are just some of the features available in this release. [Take a closer look →](features)

## Breaking Changes & Upgrade Notes

IPFS 0.5 is a substantial step forward in terms of performance and reliability. Inevitably, such a large release will cause some breakages:

### HTTP API will disallow `GET` requests

Go-IPFS-cmds and the commands HTTP API Handler will now only allow `POST`/`OPTIONS`, disallowing `GET` and others in the handling of command requests in the IPFS HTTP API to enforce _origin isolation_. This means any applications making `GET` requests on the HTTP API will need to change to `POST` requests.

### IPFS Address Format

If you've ever run a command like `ipfs swarm peers`, you've likely seen paths that look like `/ip4/193.45.1.24/tcp/4001/ipfs/QmSomePeerID`. These paths are _not_ file paths, they're multiaddrs; addresses of peers on the network.

Unfortunately, `/ipfs/Qm...` is _also_ the same path format we use for files. This release, changes the multiaddr format from <code>/ip4/193.45.1.24/tcp/4001/<b>ipfs</b>/QmSomePeerID</code> to <code>/ip4/193.45.1.24/tcp/4001/<b>p2p</b>/QmSomePeerID</code> to make the distinction clear.

What this means for users:

- Old-style multiaddrs will still be accepted as inputs to IPFS.
- If you were using a multiaddr library (go, js, etc.) to name _files_ because `/ipfs/QmSomePeerID` looks like `/ipfs/QmSomeFile`, your tool may break if you upgrade this library.
- If you're manually parsing multiaddrs and are searching for the string `/ipfs/`..., you'll need to search for `/p2p/...`.

### JS-IPFS node datastore incompatibility

JS-IPFS nodes will no longer be able to read Go-IPFS datastores. Avoid pointing two nodes at the same datastore. If your Go-IPFS node reads a JS-IPFS datastore, it will upgrade it and no longer be compatible with JS-IPFS.

### New QUIC protocol

If you have enabled the QUIC experiment and are trying to connect to new nodes, it won't work until you upgrade as well. This is the final breaking change before QUIC is stabilized and becomes the default.

### Minimum RSA Key Size

The minimum RSA key size is now 2048 bits. Unless you explicitly generated smaller keys, it's unlikely you're using small keys in production. However, you may be running _tests_ with small keys for better performance. If so, you'll either need to increase the key sizes or set the `LIBP2P_ALLOW_WEAK_RSA_KEYS` environment variable.

### Custom configurations of IPFS

If you are using IPFS as a library, or relying on alternate packages like ipfs-lite, you'll need to upgrade to the new 0.5 interfaces.

### Migrations

IPFS uses repo migrations to make structural changes to the "repo" (the config, data storage, etc.) on upgrade.

This release includes two very simple repo migrations: a config migration to ensure that the config contains working bootstrap nodes and a keystore migration to base32 encode all key filenames.

In general, migrations should not require significant manual intervention. However, you should be aware of migrations and plan for them.

- If you update go-ipfs with `ipfs update`, `ipfs update` will run the migration for you. Note: `ipfs update` will refuse to run the migrations while ipfs itself is running.
- If you start the ipfs daemon with `ipfs daemon --migrate`, ipfs will migrate your repo for you on start.

Otherwise, if you want more control over the repo migration process, you can manually install and run the [repo migration tool](http://dist.ipfs.io/#fs-repo-migrations).

## Changelog

The changelog is available in the [`ipfs/go-ipfs` repository on GitHub](https://github.com/ipfs/go-ipfs/blob/master/CHANGELOG.md#050-2020-04-28).
