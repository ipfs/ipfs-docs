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

1. Start your IPFS daemon, if it isn't already running:

   ```bash
   ipfs daemon
   ```

1. Create the file that you want to set up with IPNS. For the tutorial, we're just going to create a simple _hello world_ file:

   ```bash
   echo "Hello, world!" > hello.txt
   ```

1. Add your file to IPFS:

   ```bash
   ipfs add hello.txt

   > added QmaMLRsvmDRCezZe2iebcKWtEzKNjBaQfwcu7mcpdm8eY2 hello.txt
   > 13 B / 13 B [===================================================================] 100.00%
   ```

   Take note of the `Qm` hash output by IPFS.

1. Use `cat` and the `Qm` hash you just got from IPFS to view the file again:

   ```bash
   ipfs cat QmaMLRsvmDRCezZe2iebcKWtEzKNjBaQfwcu7mcpdm8eY2

   > Hello, world!
   ```

1. Publish your `Qm` hash to IPNS:

   ```bash
   ipfs name publish /ipfs/QmaMLRsvmDRCezZe2iebcKWtEzKNjBaQfwcu7mcpdm8eY2

   > Published to k51qzi5uqu5dkkciu33khkzbcmxtyhn376i1e83tya8kuy7z9euedzyr5nhoew: /ipfs/QmaMLRsvmDRCezZe2iebcKWtEzKNjBaQfwcu7mcpdm8eY2

   `k51...` is the key of your IPFS installation.

   ```

1. You can view your file by going to `https://gateway.ipfs.io/ipns/k51qzi5uqu5dkkciu33khkzbcmxtyhn376i1e83tya8kuy7z9euedzyr5nhoew`:

   ```bash
   curl https://gateway.ipfs.io/ipns/k51qzi5uqu5dkkciu33khkzbcmxtyhn376i1e83tya8kuy7z9euedzyr5nhoew

   > Hello, world!
   ```

1. Make a change to your file, add it to IPFS, and update your IPNS:

   ```bash
   echo "Hello IPFS!" > hello.txt
   ipfs add hello.txt

   > added QmUVTKsrYJpaxUT7dr9FpKq6AoKHhEM7eG1ZHGL56haKLG hello.txt
   > 11 B / 11 B [=============================================================================================] 100.00%

   ipfs name publish QmUVTKsrYJpaxUT7dr9FpKq6AoKHhEM7eG1ZHGL56haKLG

   > Published to k51qzi5uqu5dkkciu33khkzbcmxtyhn376i1e83tya8kuy7z9euedzyr5nhoew: /ipfs/QmUVTKsrYJpaxUT7dr9FpKq6AoKHhEM7eG1ZHGL56haKLG
   ```

1. You can now go back to `https://gateway.ipfs.io/ipns/k51qzi5uqu5dkkciu33khkzbcmxtyhn376i1e83tya8kuy7z9euedzyr5nhoew` to view your updated file using the same address:

   ```bash
   curl https://gateway.ipfs.io/ipns/k51qzi5uqu5dkkciu33khkzbcmxtyhn376i1e83tya8kuy7z9euedzyr5nhoew

   > Hello IPFS!
   ```

You can view the `Qm` hash of the file associated with your `k5` key by using `name resolve`:

```bash
ipfs name resolve

> /ipfs/QmUVTKsrYJpaxUT7dr9FpKq6AoKHhEM7eG1ZHGL56haKLG
```

To use a different `k5` key, first create one using `key gen test`, and use the `--key` flag when calling `name publish`:

```bash
ipfs key gen SecondKey

> k51qzi5uqu5dh5kbbff1ucw3ksphpy3vxx4en4dbtfh90pvw4mzd8nfm5r5fnl

ipfs name publish --key=SecondKey /ipfs/QmUVTKsrYJpaxUT7dr9FpKq6AoKHhEM7eG1ZHGL56haKLG

> Published to k51qzi5uqu5dh5kbbff1ucw3ksphpy3vxx4en4dbtfh90pvw4mzd8nfm5r5fnl: /ipfs/QmUVTKsrYJpaxUT7dr9FpKq6AoKHhEM7eG1ZHGL56haKLG
```

## Example IPNS Setup with JS SDK API

Imagine you want to publish your website under IPFS. You can use the [Files API](/concepts/file-systems/#mutable-file-system-mfs) to publish your static website, and then you'll get a CID you can link to. But when you need to make a change, a problem arises: you get a new CID because you now have different content. And it is not possible for you to be always giving others a new address.

Here's where the Name API comes in handy. With it, you can create a single, stable IPNS address that points to the CID for the latest version of your website.

```js
// The address of your files.
const addr = '/ipfs/QmbezGequPwcsWo8UL4wDF6a8hYwM1hmbzYv2mnKkEWaUp'

ipfs.name.publish(addr).then(function (res) {
  // You now receive a res which contains two fields:
  //   - name: the name under which the content was published.
  //   - value: the "real" address to which Name points.
  console.log(`https://gateway.ipfs.io/ipns/${res.name}`)
})
```

In the same way, you can republish a new version of your website under the same address. By default, `ipfs.name.publish` will use the Peer ID.

## Alternatives to IPNS

IPNS is not the only way to create mutable addresses on IPFS. You can also use [DNSLink](/concepts/dnslink/), which is currently much faster than IPNS and also uses human-readable names. Other community members are exploring ways to use blockchains to store common name records.
