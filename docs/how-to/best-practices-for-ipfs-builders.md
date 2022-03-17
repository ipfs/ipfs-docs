---
title: "Best practices for IPFS builders"
description: "Some IPFS features are disabled or not defaults, but we encourage their use under the right circumstances. We list them here for easy access by busy builders."
---

# Best practices for IPFS builders

Some IPFS features are not enabled or set as defaults, but we encourage you to use them under the right circumstances.

## Use CIDv1 for future-proof addressing and case-insenstive contexts

There are two versions of context identifiers (CIDs): CIDv0 and CIDv1.

<<<<<<< HEAD:docs/how-to/best-practices-for-ipfs-builders
CIDv0 is simpler but much less flexible than CIDv1. It doesn't offer the future-proof and case-insensitive addressing that CIDv1 offers. You can quickly tell the difference between v0 and v1 CIDs since v0 CIDs always start with `Qm`. Many of the existing IPFS tools still generate CIDs in v0, for example:

- [IPFS Desktop](http://docs.ipfs.io.ipns.localhost:8080/install/ipfs-desktop/#ipfs-desktop)
- [/api/v0/add](https://docs.ipfs.io/reference/http/api/#api-v0-add), where the `cid-version` defaults to 0 unless an option that depends on CIDv1 is passed.

Some features use CIDv1 by default:

- `files` ([Mutable File System](../concepts/file-systems/#mutable-file-system-mfs))
- `object` operations ([ipfs object](https://docs.ipfs.io/reference/cli/#ipfs-object))

Use CIDv1 when you want:

- future-proof addressing: CIDv1 provides leading identifiers, such as [multicodec](https://github.com/multiformats/multicodec), which indicate the format of the target content so that the CID can support future CID formats.
- case-insensitive addressing for more flexibility

To opt in, use the `--cid-version` flag in the CLI:

```shell
ipfs add --cid-version 1
```

To convert a CID from v0 to v1, see [CID conversion](https://docs.ipfs.io/concepts/content-addressing/#cid-conversion).
=======
CIDv0 is simpler but much less flexible than CIDv1. It doesn't offer the future-proof and case-insensitive addressing that CIDv1 offers. Many of the existing IPFS tools still generate CIDs in v0. You can quickly tell the difference between v0 and v1 CIDs since v0 CIDs always start with `Qm`.

<!-- TODO: add examples -->

Some features use CIDv1 by default:

- `files` ([Mutable File System](file-systems.md#mutable-file-system-mfs))
- `object` operations

We recommend you use CIDv1 when you want:

- future-proof addressing
- case-insensitive addressing

To opt in, use the `--cid-version` flag in the CLI: 

```shell
ipfs add --cid-version 1
```
>>>>>>> 8fde2e7cedefa409aaf55e475a88bec9675d99fd:docs/how-to/best-practices-for-ipfs-builders.md

For more information on content addressing and CID versions, see [Content Addressing and CIDs](https://docs.ipfs.io/concepts/content-addressing/#content-addressing-and-cids).

## Enable pubsub if you need fast IPNS

<<<<<<< HEAD:docs/how-to/best-practices-for-ipfs-builders
Pubsub is one of the available options for configuring your IPFS node. It allows you to publish and subscribe to messages on a given topic. It can be a quick alternative to accessing data instead of setting up [IPNS](../concepts/ipns/#interplanetary-name-system-ipns). Pubsub is an experimental feature and it should not be used in a production environment. It is disabled by default.
=======
Pubsub is one of the available options for configuring your IPFS node. It allows you to publish and subscribe to messages on a given topic. Pubsub is an experimental feature and it should not be used in a production environment. It is disabled by default.  
>>>>>>> 8fde2e7cedefa409aaf55e475a88bec9675d99fd:docs/how-to/best-practices-for-ipfs-builders.md

To use this feature, use the `--enable-pubsub-experiment` option when starting the IPFS daemon:

```shell
ipfs --enable-pubsub-experiment
```

See [IPFS pubsub](../reference/cli/#ipfs-pubsub) for more information on the available subcommands.

## Enable garbage collection if your data churn is expected to be high

Storage is finite, so nodes need to clear out some of their previously cached resources to make room for new resources. This process is called _garbage collection_.

If you expect your data churn to be high, you may want to enable garbage collection to reclaim memory occupied by objects that are no longer in use.

However, you may also have data that you value. To make sure that you keep data that is valuable to you, pin the valued data. The following pages are useful for learning how pinning works:

- [Persistence, permanence, and pinning](../concepts/persistence/#persistence-permanence-and-pinning)
- [Pinning in context](../concepts/persistence/#pinning-in-context)
- [Pin files using IPFS](./how-to/pin-files/#three-kinds-of-pins).

Then you can safely enable garbage collection for all other data. See:

- [Garbage collection](../concepts/persistence/#garbage-collection)
- [api/v0/repo/gc](../reference/http/api/#api-v0-repo-gc)

## Use subdomain gateways or DNSLink when publishing apps for secure context and origin isolation

To prevent one website from improperly accessing HTTP session data associated with a different website, use a:

- subdomain gateway, or
- DNSLink

<<<<<<< HEAD:docs/how-to/best-practices-for-ipfs-builders
See:
=======
For more information on security and gateways, take a look at these pages:
>>>>>>> 8fde2e7cedefa409aaf55e475a88bec9675d99fd:docs/how-to/best-practices-for-ipfs-builders.md

- [Violation of same-origin policy](../concepts/ipfs-gateway/#limitations-and-potential-workarounds)
- [Subdomain gateway](./how-to/address-ipfs-on-web/#subdomain-gateway)
- [DNSLink gateway](./how-to/address-ipfs-on-web/#http-gateways)
