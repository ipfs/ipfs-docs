---
title: DNSLink
legacyUrl: https://docs.ipfs.io/guides/concepts/dnslink/
description: Learn how DNSLink works in conjunction with IPFS to map DNS names to IPFS content.
---

# DNSLink

DNSLink uses [DNS TXT](https://en.wikipedia.org/wiki/TXT_record) records to map a DNS name (like `ipfs.io`) to an IPFS address. Because you can edit your DNS records, you can use them to always point to the latest version of an object in IPFS (remember that an IPFS object's address changes if you modify the object). Since DNSLink uses DNS records, you can assign names/paths/(sub)domains/whatever that are easy to type, read, and remember.

A DNSLink address looks like an [IPNS](/guides/concepts/ipns) address, but it uses a DNS name in place of a hashed public key:

```
/ipns/example.org
```

Just like normal IPFS addresses, they can include links to other files — or other types of resources that IPFS supports, like directories and symlinks:

```
/ipns/example.org/media/
```

## Publish Content Path in DNSLink Record

Publish the mapping as DNS TXT record using your hostname prefixed with `_dnslink`. 

This not only makes DNSLink lookup more efficient by only returning relevant TXT records, but enables you to improve the security of an automated setup or delegate control over your DNSLink records to a third party without giving away full control over the original DNS zone.

For example, [`docs.ipfs.io`](https://docs.ipfs.io) loads because a TXT record exists for `_dnslink.docs.ipfs.io`. If you look up the DNS records for `_dnslink.docs.ipfs.io`, you'll see its DNSLink entry:

```console
$ dig +noall +answer TXT \_dnslink.docs.ipfs.io
\_dnslink.docs.ipfs.io. 30 IN TXT "dnslink=/ipfs/bafybeieenxnjdjm7vbr5zdwemaun4sw4iy7h4imlvvl433q6gzjg6awdpq"

```

## Resolve DNSLink Name

When an IPFS client or node attempts to resolve an address, it looks for a `TXT` record that is prefixed with `dnslink=`. The rest can be an `/ipfs/` link (as in the example below), or `/ipns/`, or even a link to another DNSLink.

```

dnslink=/ipfs/<CID for your content here>

```

For example, let's go back to when we looked up the DNS records for `_dnslink.docs.ipfs.io` and saw its DNSLink entry:

```sh
$ dig +noall +answer TXT _dnslink.docs.ipfs.io
_dnslink.docs.ipfs.io.  34  IN  TXT "dnslink=/ipfs/QmVMxjouRQCA2QykL5Rc77DvjfaX6m8NL6RyHXRTaZ9iya"
```

Based on that, this address:

```
/ipns/docs.ipfs.io/introduction/
```

Will get you this block:

```
/ipfs/QmVMxjouRQCA2QykL5Rc77DvjfaX6m8NL6RyHXRTaZ9iya/introduction/
```

## Further Resources

For a complete guide to DNSLink — including tutorials, usage examples, and FAQs — check out [dnslink.io](http://dnslink.io/).
