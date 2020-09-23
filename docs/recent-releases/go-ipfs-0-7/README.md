---
title: Overview
---

# Go-IPFS 0.7

![The Go-IPFS logo.](./images/go-ipfs-logo.png)

In August, we announced the [deprecation of the SECIO security transport](https://blog.ipfs.io/2020-08-07-deprecating-secio/). In this release, we have disabled SECIO by default, which will have an impact on older nodes on the network. The best way to mitigate the impact of this change is to [upgrade your IPFS nodes](https://docs.ipfs.io/recent-releases/go-ipfs-0-7/update-procedure) as soon as possible! Not only will upgrading ensure you're using the latest security transports, you'll get access to all of the [performance improvements](https://blog.ipfs.io/2020-07-20-dht-deep-dive/) we've made this year to content routing.

With this release, you will also start seeing more Peer IDs on the network that start with `1` instead of the typical `Qm`. This is due to a switch to ed25519 keys being used by default over RSA keys, which you can read more about in the highlights below.

## Highlights

### SECIO is now disabled by default

As part of deprecating and removing support for the SECIO security transport, we have disabled it by default. TLS1.3 will remain the default security transport with fallback to Noise. You can read more about the deprecation in the blog post, https://blog.ipfs.io/2020-08-07-deprecating-secio/. If you're running Go IPFS older than 0.5 or JS IPFS older than 0.47, this may start to impact your performance on the public network, so we strongly encourage you to upgrade today!

### Ed25519 keys are now used by default

Previously go-ipfs generated 2048 bit RSA keys for new nodes, but it will now use ed25519 keys by default. This will not affect any existing keys, but newly created keys will be ed25519 by default. The main benefit of using ed25519 keys over RSA is that ed25519 keys have an inline public key. This means that someone only needs your PeerId to verify things you've signed, such as your Peer Records or in the future Signed Provider Records, which means we don't have to worry about storing bulky RSA public keys.

#### Rotating keys

Along with switching the default key type, we've added support for rotating Identity keys. If you would like to change the key type of your IPFS node, you can now do so with the rotate command. **NOTE: This will affect your Peer Id, so be sure you want to do this!** Your existing identity key will be backed up in the Keystore so that it can still be referenced for things like IPNS records.

```bash
ipfs key rotate -o my-old-key -t ed25519
```

### Key export and import

Speaking of backing up keys, we've added commands to allow you to export and import keys from the IPFS Keystore to a local .key file. This does not currently apply to the IPFS identity key, `self`, which is housed in the configuration file.

```bash
ipfs key gen mykey
ipfs key export -o mykey.key mykey # ./<name>.key is the default path
ipfs key import mykey mykey.key # on another node
```

### IPNS paths now encode the key name as a base36 CIDv1 by default

Previously go-ipfs encoded the key names for IPNS paths as base58btc multihashes (e.g., Qmabc...). We now encode them as base36 encoded CIDv1s as defined in the [peerID spec](https://github.com/libp2p/specs/blob/master/peer-ids/peer-ids.md#string-representation) (e.g., k51xyz...) which also deals with the encoding of public keys. This is nice because it means that IPNS keys will, by default, be case-insensitive and that they will fit into DNS labels (e.g. k51xyz...ipns.localhost) and therefore that subdomain gateway redirections (e.g., from localhost:8080/ipns/{key} to {key}.ipns.localhost) will look better to users in the default case.

Many commands will accept a `--ipns-base` option that allows changing command outputs to use a particular encoding (i.e., base58btc multihash, or CIDv1 encoded in any supported base)

### Multiaddresses now accept PeerIDs encoded as CIDv1

In preparation for eventually changing the default PeerID representation multiaddresses can now contain strings like `/p2p/k51xyz...` in addition to the default `/p2p/Qmabc...`. There is a corresponding `--peerid-base` option to many functions that output peerIDs.

### Dag stat

Initial support has been added for the `ipfs dag stat` command. Running this command will traverse the DAG for the given root CID and report statistics. By default, progress will be shown as the DAG is traversed. Supported statistics currently include DAG size and number of blocks.

```bash
ipfs dag stat bafybeihpetclqvwb4qnmumvcn7nh4pxrtugrlpw4jgjpqicdxsv7opdm6e # the IPFS webui
Size: 30362191, NumBlocks: 346
```

### Plugin build changes

We have changed the build flags used by the official binary distributions on dist.ipfs.io (or `/ipns/dist.ipfs.io`) to use the simpler and more reliable `-trimpath` flag instead of the more complicated and brittle `-asmflags=all=-trimpath=" $(GOPATH)" -gcflags=all=-trimpath=" $(GOPATH)" ` flags. The build flags used by default in go-ipfs remain the same.

The scripts in https://github.com/ipfs/go-ipfs-example-plugin have been updated to reflect this change. This is a breaking change to how people have been building plugins against the dist.ipfs.io binary of go-ipfs, and plugins should update their build processes accordingly. See [github.com/ipfs/go-ipfs-example-plugin/pull/9 for details](https://github.com/ipfs/go-ipfs-example-plugin/pull/9).

## The Changelog

For a full list of updates included in this release, you can review the [changelog on GitHub.](https://github.com/ipfs/go-ipfs/blob/v0.7.0/CHANGELOG.md#v070-2020-09-22).
