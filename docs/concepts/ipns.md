---
title: IPNS
description: Learn about the InterPlanetary Name System (IPNS) and how it can be used in conjunction with IPFS.
---

# InterPlanetary Name System (IPNS)

## Mutability in IPFS

[Content addressing](content-addressing.md) in IPFS is by nature _immutable_: when you add a file to IPFS, it creates a hash from the data contained in it. Changing a file changes its hash, and consequently its CID which is used as an address.

Yet, there are many situations where **mutable pointers** are useful as a complement to immutability, for example, when publishing a website that frequently changes. It would be impractical to share a new CID every time you update the website. With mutable pointers, you can share the address of the pointer once, and update the pointer – to the new CID – every time you publish a change.

The InterPlanetary Name System (IPNS) enables the creation of such mutable pointers to CIDs known as **names** or **IPNS names**. IPNS names can be thought of as links that can be updated over time.

> **Note:** Technically, an IPNS name can also point to another IPNS name or DNSLink path. However, it most commonly points to a CID.

## How IPNS works

### Anatomy of an IPNS name

A **name** in IPNS is the [hash](hashing.md) of a public key. It is associated with an [**IPNS record**](https://github.com/ipfs/specs/blob/main/IPNS.md#ipns-record) containing the content path (`/ipfs/CID`) it links to and other information such as the expiration, the version number, and a cryptographic signature signed by the corresponding private key. New records can be signed and published at any time by the holder of the private key.

For example, the following is an IPNS name represented by a CIDv1 of public key: [`k51qzi5uqu5dlvj2baxnqndepeb86cbk3ng7n3i46uzyxzyqj2xjonzllnv0v8`](https://cid.ipfs.tech/#k51qzi5uqu5dlvj2baxnqndepeb86cbk3ng7n3i46uzyxzyqj2xjonzllnv0v8).


### IPNS names are self-certifying

IPNS names are self-certifying. This means that an IPNS record contains all the information necessary to certify its authenticity. IPNS achieves this using public and private key pairs:

- Each IPNS name corresponds to a key pair
- The IPNS name is a hash of the public key
- The IPNS record contains the public key and signature, allowing anyone to verify that the name was signed by the key holder.

This self-certifying nature gives IPNS several benefits not preset in hierarchical and consensus systems such as DNS, and blockchain identifiers. Notably, IPNS records can come from anywhere, not just a particular service/system, and it is very fast and easy to confirm a record is authentic.

### IPNS record validity tradeoffs – consistency vs. availability

When setting the `validity` (referred to as [`lifetime` by Kubo](https://github.com/ipfs/kubo/blob/master/docs/config.md#ipnsrecordlifetime)) field of an IPNS record, you typically need to choose whether you favor **consistency** (short validity period, e.g. 24 hours) or **availability** (long validity period, e.g. 1 month), due to the inherent trade-off between the two.

Consistency means ensuring that users resolve to the latest published IPNS record for the name (with the highest sequence number) at the cost of potentially not being able to resolve.

Availability means resolving to a valid IPNS record, at the cost of potentially resolving to an outdated record.

### IPNS is transport agnostic

The self-certifying nature of IPNS records means that they are not tied to a specific transport protocol. In practice, most IPFS implementations rely on the [**DHT**](dht.md) and **PubSub** to publish and resolve IPNS records.

There are a few nuanced differences between the **DHT** and **PubSub** to be aware of.

#### IPNS over the DHT

Due to the ephemeral nature of the DHT, records get dropped after 24 hours. This applies to any record in the DHT, irrespective of the `validity` (also referred to as `lifetime`) field in the IPNS record.

Therefore, IPNS records need to be regularly published to the DHT.

By default, Kubo will republish IPNS records to the DHT based on the [`Ipns.RepublishPeriod`] configuration which defaults to 4 hours. Republishing involves two steps:

1. Creating an updated IPNS record with the `sequence` field incremented, the `validity` field set to a timestamp (by default based on `Ipns.RecordLifetime`), and signed with the private key.
2. Publish the [IPNS record to the DHT](https://docs.ipfs.tech/concepts/dht/#ipns-records)

> Note: See the DHT documentation for more information on the lifecycle of GETs and PUTs of IPNS records.

It's worth noting that publishing and resolving IPNS names using the DHT can be slow. This is because multiple records need to be found to ensure the latest version (record with the highest `sequence`), which involves round trips to multiple nodes.

#### IPNS with PubSub

PubSub improves both publishing and resolving times of IPNS by relying on interested peers for both operations.

TODO: more details here about the **publishing lifecycle** with PubSub
TODO: more details here about the **resolution lifecycle** works with PubSub

## IPNS in practice

### Common actions with IPNS

As a user or developer using IPNS for naming, there are three common actions worth understanding:

- Updating/Creating IPNS records
- Publishing IPNS records
- Resolving IPNS names

### IPNS names can be resolved using IPFS gateways

TODO:



### Third-party providing/publishing w3name

## Example

When looking up an IPNS address, use the `/ipns/` prefix:

```shell
/ipns/QmSrPmbaUKA3ZodhzPWZnpFgcPMFWF4QsxXbkWfEptTBJd
```

## Example IPNS Setup with CLI

1. Start your IPFS daemon, if it isn't already running:

   ```shell
   ipfs daemon
   ```

1. Open another command line window and create the file that you want to set up with IPNS. For the tutorial, we're just going to create a simple _hello world_ file:

   ```shell
   echo "Hello IPFS" > hello.txt
   ```

1. Add your file to IPFS:

   ```shell
   ipfs add hello.txt

   > added QmUVTKsrYJpaxUT7dr9FpKq6AoKHhEM7eG1ZHGL56haKLG hello.txt
   > 11 B / 11 B [=====================================================] 100.00%
   ```

   Take note of the CID output by IPFS.

1. Use `cat` and the CID you just got from IPFS to view the file again:

   ```shell
   ipfs cat QmUVTKsrYJpaxUT7dr9FpKq6AoKHhEM7eG1ZHGL56haKLG

   > Hello IPFS
   ```

1. Publish your CID to IPNS:

   ```shell
   ipfs name publish /ipfs/QmUVTKsrYJpaxUT7dr9FpKq6AoKHhEM7eG1ZHGL56haKLG

   > Published to k51qzi5uqu5dkkciu33khkzbcmxtyhn376i1e83tya8kuy7z9euedzyr5nhoew: /ipfs/QmUVTKsrYJpaxUT7dr9FpKq6AoKHhEM7eG1ZHGL56haKLG
   ```

   `k51...` is the public key or IPNS name of the IPFS you are running. You can now change the file repeatedly, and, even though the CID changes when you change the file, you can continue to access it with this key.

1. You can view your file by going to `https://gateway.ipfs.io/ipns/k51qzi5uqu5dkkciu33khkzbcmxtyhn376i1e83tya8kuy7z9euedzyr5nhoew`:

   ```shell
   curl https://gateway.ipfs.io/ipns/k51qzi5uqu5dkkciu33khkzbcmxtyhn376i1e83tya8kuy7z9euedzyr5nhoew

   > Hello IPFS
   ```

1. Make a change to your file, add it to IPFS, and update your IPNS:

   ```shell
   echo "Hello again IPFS" > hello.txt
   ipfs add hello.txt

   > added QmaVfeg2GM17RLjBs9C4fhpku6uDgrEGUYCTC183VrZaVW hello.txt
   > 17 B / 17 B [=====================================================] 100.00%

   ipfs name publish QmaVfeg2GM17RLjBs9C4fhpku6uDgrEGUYCTC183VrZaVW

   > Published to k51qzi5uqu5dkkciu33khkzbcmxtyhn376i1e83tya8kuy7z9euedzyr5nhoew: /ipfs/QmaVfeg2GM17RLjBs9C4fhpku6uDgrEGUYCTC183VrZaVW
   ```

1. You can now go back to `https://gateway.ipfs.io/ipns/k51qzi5uqu5dkkciu33khkzbcmxtyhn376i1e83tya8kuy7z9euedzyr5nhoew` to view your updated file using the same address:

   ```shell
   curl https://gateway.ipfs.io/ipns/k51qzi5uqu5dkkciu33khkzbcmxtyhn376i1e83tya8kuy7z9euedzyr5nhoew

   > Hello again IPFS
   ```

You can view the CID of the file associated with your `k5` key by using `name resolve`:

```shell
ipfs name resolve

> /ipfs/QmaVfeg2GM17RLjBs9C4fhpku6uDgrEGUYCTC183VrZaVW
```

To use a different `k5` key, first create one using `key gen test`, and use the `--key` flag when calling `name publish`:

```shell
ipfs key gen SecondKey

> k51qzi5uqu5dh5kbbff1ucw3ksphpy3vxx4en4dbtfh90pvw4mzd8nfm5r5fnl

ipfs name publish --key=SecondKey /ipfs/QmaVfeg2GM17RLjBs9C4fhpku6uDgrEGUYCTC183VrZaVW

> Published to k51qzi5uqu5dh5kbbff1ucw3ksphpy3vxx4en4dbtfh90pvw4mzd8nfm5r5fnl: /ipfs/QmaVfeg2GM17RLjBs9C4fhpku6uDgrEGUYCTC183VrZaVW
```

## Example IPNS Setup with JS SDK API

Imagine you want to publish your website under IPFS. You can use the [Files API](file-systems.md#mutable-file-system-mfs) to publish your static website, and then you'll get a CID you can link to. But when you need to make a change, a problem arises: you get a new CID because you now have different content. And it is not possible for you to be always giving others a new address.

Here's where the Name API comes in handy. With it, you can create a single, stable IPNS address that points to the CID for the latest version of your website.

```javascript
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

IPNS is not the only way to create mutable addresses on IPFS. You can also use [DNSLink](dnslink.md), which is currently much faster than IPNS and also uses human-readable names. Other community members are exploring ways to use blockchains to store common name records.

## Further Resources

- [ResNetLab on Tour - Mutable Content](https://research.protocol.ai/tutorials/resnetlab-on-tour/mutable-content/)
