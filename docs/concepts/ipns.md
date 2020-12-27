---
title: IPNS
legacyUrl: https://docs.ipfs.io/guides/concepts/ipns/
description: Learn about the InterPlanetary Name System (IPNS) and how it can be used in conjunction with IPFS.
---

# InterPlanetary Name System (IPNS)

IPFS uses [content-based addressing](/concepts/content-addressing/); it creates an address of a file based on data contained within the file. If you were to share an IPFS address such as `/ipfs/QmbezGequPwcsWo8UL4wDF6a8hYwM1hmbzYv2mnKkEWaUp` with someone, you would need to give the person a new link every time you update the content.

The InterPlanetary Name System (IPNS) solves this issue by creating an address that can be updated.

A _name_ in IPNS is the [hash](/concepts/hashing) of a public key. It is associated with a record containing information about the hash it links to that is signed by the corresponding private key. New records can be signed and published at any time.

When looking up an IPNS address, use the `/ipns/` prefix:

```bash
/ipns/QmSrPmbaUKA3ZodhzPWZnpFgcPMFWF4QsxXbkWfEptTBJd
```

## Example IPNS Setup with CLI

    echo "hello, world" >hello.txt
    ipfs add hello.txt
    ipfs cat QmXV7pL1CB7A8Tzk7jP2XE9kRyk8HZd145KDptdxzmNLfu
    ipfs name publish /ipfs/QmXV7pL1CB7A8Tzk7jP2XE9kRyk8HZd145KDptdxzmNLfu
    # Published to k51qzi5uqu5djxd3seehd8egk3jbyu2liy196tkabmtuh40er66rkbt8jxjla8: /ipfs/QmXV7pL1CB7A8Tzk7jP2XE9kRyk8HZd145KDptdxzmNLfu

Note how the _published to_ is the (hash of?) the public key of `self` from `ipfs key list -l`.

To look it back up, this gives us our `/ipfs/QmXV7pL1CB7A8Tzk7jP2XE9kRyk8HZd145KDptdxzmNLfu` back:

    ipfs name resolve

We can use other names by creating and using keys:

    ipfs key gen test
    # k51qzi5uqu5dm3n1brmqzmx9ckpwvtt860r66ms16qg0dotbvt7bs6c15h3t9l
    ipfs name publish --key=test /ipfs/QmXV7pL1CB7A8Tzk7jP2XE9kRyk8HZd145KDptdxzmNLfu
    # Published to k51qzi5uqu5dm3n1brmqzmx9ckpwvtt860r66ms16qg0dotbvt7bs6c15h3t9l: /ipfs/QmXV7pL1CB7A8Tzk7jP2XE9kRyk8HZd145KDptdxzmNLfu
    ipfs name resolve k51qzi5uqu5dm3n1brmqzmx9ckpwvtt860r66ms16qg0dotbvt7bs6c15h3t9l


## Example IPNS Setup with JS SDK API

Imagine you want to publish your website under IPFS. You can use the [Files API](/concepts/file-systems/#mutable-file-system-mfs) to publish your static website, and then you'll get a CID you can link to. But when you need to make a change, a problem arises: you get a new CID because you now have different content. And it is not possible for you to be always giving others a new address.

Here's where the Name API comes in handy. With it, you can create a single, stable IPNS address that points to the CID for the latest version of your website.

```js
// The address of your files.
const addr = '/ipfs/QmbezGequPwcsWo8UL4wDF6a8hYwM1hmbzYv2mnKkEWaUp'

ipfs.name.publish(addr, function (err, res) {
  // You now receive a res which contains two fields:
  //   - name: the name under which the content was published.
  //   - value: the "real" address to which Name points.
  console.log(`https://gateway.ipfs.io/ipns/${res.name}`)
})
```

In the same way, you can republish a new version of your website under the same address. By default, `ipfs.name.publish` will use the Peer ID.

## Alternatives to IPNS

IPNS is not the only way to create mutable addresses on IPFS. You can also use [DNSLink](/concepts/dnslink/), which is currently much faster than IPNS and also uses human-readable names. Other community members are exploring ways to use blockchains to store common name records.
