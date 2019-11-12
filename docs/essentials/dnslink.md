---
title: DNSLink
---

# DNSLink

## What is DNSLink?

DNSLink uses [DNS TXT](https://en.wikipedia.org/wiki/TXT_record) records to map a domain name (like `ipfs.io`) to an IPFS address. Because you can edit your DNS records, you can use them to always point to the latest version of an object in IPFS (remember that an IPFS object’s address changes if you modify the object). Since DNSLink uses DNS records, you can assign names/paths/(sub)domains/whatever that are easy to type, read, and remember.

A DNSLink address looks like an [IPNS](/guides/concepts/ipns) address, but it uses a domain name in place of a hashed public key:

```
/ipns/myexampledomain.org
```

Just like normal IPFS addresses, they can include links to other files — or other types of resources that IPFS supports, like directories and symlinks:

```
/ipns/myexampledomain.org/media/
```

### Publishing using a subdomain

While you can publish the TXT record to the exact domain if you so wish, it can be more advantageous to publish DNSLink records using a special subdomain called `_dnslink`. This enables you to improve the security of an automated setup, or delegate control over your DNSLink records to a third party without giving away full control over the original DNS zone.

For example, [`docs.ipfs.io`](https://docs.ipfs.io) does not have a TXT record, but the page still loads
because a TXT record exists for `_dnslink.docs.ipfs.io`. If you look up the DNS records for `_dnslink.docs.ipfs.io`, you'll see its DNSLink entry:

```sh
$ dig +noall +answer TXT _dnslink.docs.ipfs.io
_dnslink.docs.ipfs.io.  34  IN  TXT "dnslink=/ipfs/QmVMxjouRQCA2QykL5Rc77DvjfaX6m8NL6RyHXRTaZ9iya"
```

### Resolving using DNSLink

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

## Further resources

For a complete guide to DNSLink — including tutorials, usage examples and FAQs — check out [dnslink.io](http://dnslink.io/).
