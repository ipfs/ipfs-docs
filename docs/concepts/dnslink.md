---
title: DNSLink
description: Learn how to map IPFS content to DNS names using DNSLink.
---

# DNSLink

DNSLink uses [DNS `TXT` records](https://en.wikipedia.org/wiki/TXT_record) to map a DNS name, such as [`en.wikipedia-on-ipfs.org`](https://en.wikipedia-on-ipfs.org), to either an IPFS address or an [IPNS](../concepts/ipns.md) name. Because you can edit your DNS records, you can use them to always point to the latest version of an object in IPFS. Since DNSLink uses DNS records, you can assign names, paths, and sub-domains that are easy to type, read, and remember.

A DNSLink address looks like an [IPNS](ipns.md) address, but it uses a DNS name in place of a hashed public key:

```
/ipns/example.org
```

Just like normal IPFS addresses, they can include links to other files — or other types of resources that IPFS supports, like directories and symlinks:

```
/ipns/example.org/media/
```

## Publish content path

Publish the mapping as DNS `TXT` record using your hostname prefixed with `_dnslink`. 

This not only makes DNSLink lookup more efficient by only returning relevant `TXT` records but enables you to improve the security of an automated setup or delegate control over your DNSLink records to a third party without giving away complete control over the original DNS zone.

For example, [`docs.ipfs.tech`](https://docs.ipfs.tech) loads because a `TXT` record exists for `_dnslink.docs.ipfs.tech`. If you look up the DNS records for `_dnslink.docs.ipfs.tech`, you'll see the DNSLink entry:

```shell
dig +noall +answer TXT _dnslink.docs.ipfs.tech
> _dnslink.docs.ipfs.tech. 30 IN TXT "dnslink=/ipfs/bafybeifld3uybj6azujisdnxu6cm7mombldpbt3au4g33nwnqx7dsgjrta"

```

## Resolve DNSLink name

When an IPFS client or node attempts to resolve an address, it looks for a `TXT` record that is prefixed with `dnslink=`. The rest can be an `/ipfs/` link (as in the example below), or `/ipns/`, or even a link to another DNSLink.

```

dnslink=/ipfs/<CID for your content here>

```

For example, let's go back to when we looked up the DNS records for `_dnslink.docs.ipfs.tech` and saw its DNSLink entry:

```sh
$ dig +noall +answer TXT _dnslink.docs.ipfs.tech
_dnslink.docs.ipfs.tech.  34  IN  TXT "dnslink=/ipfs/bafybeifld3uybj6azujisdnxu6cm7mombldpbt3au4g33nwnqx7dsgjrta"
```

Based on that, this address:

```
/ipns/docs.ipfs.tech/introduction/
```

Will get you this block:

```
/ipfs/bafybeifld3uybj6azujisdnxu6cm7mombldpbt3au4g33nwnqx7dsgjrta/introduction/
```

## Further Resources

For more information on how to use DNSLink for your website or app, check out the [Custom domains and DNSLink](../how-to/websites-on-ipfs/custom-domains.md) guide.

For a complete guide to DNSLink — including tutorials, usage examples, and FAQs — check out [dnslink.dev](https://dnslink.dev/).

