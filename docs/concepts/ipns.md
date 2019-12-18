---
title: IPNS
legacyUrl: https://docs.ipfs.io/guides/concepts/ipns/
description: Learn about the InterPlanetary Name System (IPNS) and how it can be used in conjunction with IPFS.
---

# InterPlanetary Name System (IPNS)

The InterPlanetary Name System (IPNS) is a system for creating and updating mutable links to IPFS content. Since objects in IPFS are [content addressed](/concepts/content-addressing/), an object's address changes every time an object's content changes. That’s useful for a variety of things, but it makes it hard to get the latest version of something.

A _name_ in IPNS is the [hash](/concepts/hashing) of a public key. It is associated with a record containing information about the hash it links to that is signed by the corresponding private key. New records can be signed and published at any time.

When looking up an IPNS address, use the `/ipns/` prefix:

```
/ipns/QmSrPmbaUKA3ZodhzPWZnpFgcPMFWF4QsxXbkWfEptTBJd
```

## Example IPNS Setup

Imagine you want to publish your website under IPFS. You can use the [Files API](/concepts/file-systems/#mutable-file-system-mfs) to publish your static website, and then you'll get a CID you can link to. But when you need to make a change, a problem arises: you get a new CID because you now have different content. And it is not possible for you to be always giving others the new address.

Here's where the Name API comes in handy. With it, you can create a single, stable IPNS address that points to the CID for the latest version of your website.

```JavaScript
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

IPNS is not the only way to create mutable addresses on IPFS. You can also use [DNSLink](/concepts/dnslink/), which is currently much faster than IPNS and also uses more readable names. Other community members are exploring ways to use blockchains to store common name records.
