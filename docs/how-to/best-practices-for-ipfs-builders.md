---
title: Best practices for IPFS builders
description: Some IPFS features are disabled or not defaults, but we encourage their use under the right circumstances. We list them here for easy access by busy builders.
date: 2022-03-11
---

# Best practices for IPFS builders

Some IPFS features are not enabled or set as defaults, but we encourage you to use them under the right circumstances.

## Use CIDv1 for future-proof addressing and case-insensitive contexts

There are two versions of CIDs ([Content Identifiers](../concepts/content-addressing.md)), CIDv0 and CIDv1.

CIDv0 is simpler but much less flexible than CIDv1. It doesn't offer the future-proof and case-insensitive addressing that CIDv1 offers. You can quickly tell the difference between v0 and v1 CIDs, because v0 CIDs always start with `Qm`. Many of the existing IPFS tools still generate CIDs in v0, for example:

- [IPFS Desktop](../install/ipfs-desktop.md#ipfs-desktop)
- [/api/v0/add](../reference/kubo/rpc.md#api-v0-add), where the `cid-version` defaults to 0 unless an option that depends on CIDv1 is passed.

Some features use CIDv1 by default:

- `files` ([Mutable File System](../concepts/file-systems.md#mutable-file-system-mfs))
- `dag` operations ([ipfs object](../reference/kubo/cli.md#ipfs-dag))

Use CIDv1 when you want:

- future-proof addressing: CIDv1 provides leading identifiers, such as [multicodec](https://github.com/multiformats/multicodec), which indicate the format of the target content so that the CID can support future CID formats.
- case-insensitive addressing for more flexibility

To opt in, use the `--cid-version` flag in the CLI:

```shell
ipfs add --cid-version 1
```

To convert a CID from v0 to v1, see [CID conversion](https://docs.ipfs.tech/concepts/content-addressing/#cid-conversion).

For more information on content addressing and CID versions, see [Content Addressing and CIDs](../concepts/content-addressing.md#content-addressing-and-cids).

## Enable pubsub for fast IPNS

As a standalone feature, `pubsub` is a way to publish and subscribe to messages. However, within `ipns`, you can use it to accelerate  publishing and resolution of IPNS records. Pubsub is an experimental feature, so use it with care. It's disabled by default.

To use this feature, use `Ipns.UsePubsub` before starting the IPFS daemon:

```shell
ipfs config --json Ipns.UsePubsub true
ipfs daemon
```

From this point on, IPNS will be resolved using both the `pubsub` and the DHT. Learn more about the limitations of this experimental feature here: 

- [Experimental features > IPNS pubsub](https://github.com/ipfs/kubo/blob/master/docs/experimental-features.md#ipns-pubsub)
- [Enable IPNS over pubsub by default, Issue 8591](https://github.com/ipfs/kubo/issues/8591)

## Enable Garbage Collection if your data churn is expected to be high

Storage is finite, so nodes need to clear out some of their previously cached resources to make room for new resources. This process is called _garbage collection_.

If you expect your data churn to be high, you may want to enable garbage collection to reclaim memory occupied by objects that are no longer in use.

However, you may also have data that you value. To make sure that you keep data that is valuable to you, pin the valued data. The following pages are useful for learning how pinning works:

- [Persistence, permanence, and pinning](../concepts/persistence.md#persistence-permanence-and-pinning)
- [Pinning in context](../concepts/persistence.md#pinning-in-context)
- [Pin files using IPFS](../how-to/pin-files.md#three-kinds-of-pins).

Then you can safely enable garbage collection for all other data. See:

- [Garbage collection](../concepts/persistence.md#garbage-collection)
- [api/v0/repo/gc](../reference/kubo/rpc.md#api-v0-repo-gc)

## Use subdomain gateways or DNSLink when publishing apps for secure context and origin isolation

To prevent one website from improperly accessing HTTP session data associated with a different website, use a:

- subdomain gateway, or
- DNSLink

See:

- [Violation of same-origin policy](../concepts/ipfs-gateway.md#limitations-and-potential-workarounds)
- [Subdomain gateway](../how-to/address-ipfs-on-web.md#subdomain-gateway)
- [DNSLink gateway](../how-to/address-ipfs-on-web.md#http-gateways)
