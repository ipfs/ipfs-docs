---
title: DNSLink
---

# DNSLink

**NOTE: The info below is a quick guide to DNSLink. For a more complete guide, including tutorials, usage examples and FAQs, check out [dnslink.io](http://dnslink.io/).**

## About DNSLink

DNSLink uses [DNS TXT](https://en.wikipedia.org/wiki/TXT_record) records to map
a domain name (like `ipfs.io`) to an IPFS address. Because you can edit your
DNS records, you can use them to always point to the latest version of an
object in IPFS (remember that an IPFS object’s address changes if you modify
the object). Because DNSLink uses DNS records, the names it produces are also
usually easy to type and read.

A DNSLink address looks like an [IPNS](/guides/concepts/ipns) address, but it
uses a domain name in place of a hashed public key:

```
/ipns/ipfs.io
```

Just like normal IPFS addresses, they can include links to other files:

```
/ipns/ipfs.io/media/
```

When an IPFS client or node attempts to resolve that address, it looks for a `TXT` record for `ipfs.io` with content like:

```
dnslink=/ipfs/<CID for your content here>
```

For example, if you look up `ipfs.io`’s DNS records, you’ll see its DNSLink entry:

```sh
$ dig +noall +answer TXT ipfs.io
ipfs.io.		59	IN	TXT	"dnslink=/ipfs/QmYNQJoKGNHTpPxCBPh9KkDpaExgd2duMa3aF6ytMpHdao"
```

Based on that, this address:

```
/ipns/ipfs.io/media/
```

Will get you this block:

```
/ipfs/QmYNQJoKGNHTpPxCBPh9KkDpaExgd2duMa3aF6ytMpHdao/media/
```

## Publishing via a Subdomain

You can also publish DNSLink records using a special subdomain named `_dnslink`. This is useful when you want to improve the security of an automated setup or delegate control over your DNSLink records to a third-party without giving away full control over the original DNS zone.

For example, [`docs.ipfs.io`](https://docs.ipfs.io) does not have a TXT record, but the page still loads
because a TXT record exists for `_dnslink.docs.ipfs.io`:

```sh
$ dig +noall +answer TXT _dnslink.docs.ipfs.io
_dnslink.docs.ipfs.io.  34  IN  TXT "dnslink=/ipfs/QmeveuwF5wWBSgUXLG6p1oxF3GKkgjEnhA6AAwHUoVsx6E"
```
