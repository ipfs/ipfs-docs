---
title: Content Identifiers (CIDs)
description: Learn about how content addressing works and how content identifiers, or CIDs, play a crucial role in IPFS.
---

# Content Identifiers (CIDs)

As described in [IPFS and the problems it solves](../concepts/what-is-ipfs.md), IPFS is a modular suite of protocols purpose built for the organization and transfer of <VueCustomTooltip label="A way to address data by its hash rather than its location (IPs)." underlined multiline>content-addressed data</VueCustomTooltip>. In this guide, you'll learn more about the fundamentals of content-addressing in IPFS and how IPFS uses Content Identifiers (CIDs) to handle content-addressed data.

## What is a CID?

A _content identifier_, or CID, is a label used to point to material in IPFS. It doesn't indicate _where_ the content is stored, but it forms a kind of address based on the content itself. CIDs are short, regardless of the size of their underlying content.

CIDs are based on the content’s [cryptographic hash](hashing.md). That means:

- Any difference in the content will produce a different CID.
- The same content added to two different IPFS nodes using the same settings will produce _the same CID_.

IPFS uses the `sha-256` hashing algorithm by default, but there is support for many other algorithms. The [Multihash](https://multiformats.io/multihash/) project represents the work for this, with the aim of future-proofing applications' use of hashes and allowing multiple hash functions to coexist. (If you're curious about how hash types in IPFS are decided upon, you may wish to keep an eye on [this forum discussion](https://discuss.ipfs.tech/t/who-decides-what-hashing-algorithms-ipfs-allows/6742).)

## How CIDs are created

CIDs contain the hash and the codec of the data. A CID can be represented in string or binary format. In general, the CID is generated for each block by:

1. Computing a cryptographic hash of the block's data.
1. Combining that hash with codec information about the block using <VueCustomTooltip label="A collection of interoperable, extensible standards for making data self-describable." underlined multiline is-medium>multiformats</VueCustomTooltip>:
   - <VueCustomTooltip label="A standard for differentiating outputs from various well-established hash function." underlined multiline is-medium>Multihash</VueCustomTooltip> for information on the algorithm used to hash the data.
   - <VueCustomTooltip label="A standard for differentiating the format of the target data." underlined multiline is-medium>Multicodec</VueCustomTooltip> for information on how to interpret the hashed data after it has been fetched.
   - <VueCustomTooltip label="A standard for differentiating the encoding of base-encoded (e.g., base32, base36, base64, base58, etc.) binary data appearing in text." underlined multiline is-medium>Multibase</VueCustomTooltip> for information on how the hashed data is encoded. Multibase is  only used in the string representation of the CID.

:::callout
**CIDs will not match the hash of the data**
While a data block's CID is constructed using the cryptographic hash of the data block, a CID contains additional information (described above) that the hash does not. For further information, see [CIDs are not file hashes](#cids-are-not-file-hashes) below.
:::

For a break-down of an actual CID, see [this example with the IPFS CID inspector](https://cid.ipfs.tech/#bafybeigrf2dwtpjkiovnigysyto3d55opf6qkdikx6d65onrqnfzwgdkfa).

## CIDs are not file hashes

Hash functions are widely used to check for file integrity. Because IPFS splits content into blocks and verifies them through [directed acyclic graphs (DAGs)](../concepts/merkle-dag.md), SHA file hashes won't match CIDs. Here's an example of what will happen if you try to do that.

A download provider may publish the output of a hash function for a file, often called a _checksum_. The checksum enables users to verify that a file has not been altered since it was published. This check is done by performing the same hash function against the downloaded file that was used to generate the checksum. If that checksum that the user receives from the downloaded file exactly matches the checksum on the website, then the user knows that the file was not altered and can be trusted.

For example, when you download an image file for [Ubuntu Linux](https://ubuntu.com/) you might see the following `SHA-256` checksum on the Ubuntu website listed for verification purposes:

```
0xB45165ED3CD437B9FFAD02A2AAD22A4DDC69162470E2622982889CE5826F6E3D ubuntu-20.04.1-desktop-amd64.iso
```

After downloading the Ubuntu image, you can verify the integrity of the file by hashing the file to make sure the checksums match:

```shell
echo "b45165ed3cd437b9ffad02a2aad22a4ddc69162470e2622982889ce5826f6e3d *ubuntu-20.04.1-desktop-amd64.iso" | shasum -a 256 --check

ubuntu-20.04.1-desktop-amd64.iso: OK
```

If we add the `ubuntu-20.04.1-desktop-amd64.iso` file to IPFS we receive a hash as an output:

```shell
ipfs add ubuntu-20.04.1-desktop-amd64.iso

added QmPK1s3pNYLi9ERiq3BDxKa4XosgWwFRQUydHUtz4YgpqB ubuntu-20.04.1-desktop-amd64.iso
 2.59 GiB / 2.59 GiB [==========================================================================================] 100.00%
```

The string `QmPK1s3pNYLi9ERiq3BDxKa4XosgWwFRQUydHUtz4YgpqB` returned by the `ipfs add` command is the content identifier (CID) of the file `ubuntu-20.04.1-desktop-amd64.iso`. We can use the [CID Inspector](https://cid.ipfs.io/) to see what the CID includes. The actual hash is listed under `DIGEST (HEX)`:

```
NAME: sha2-256
BITS: 256
DIGEST (HEX): 0E7071C59DF3B9454D1D18A15270AA36D54F89606A576DC621757AFD44AD1D2E
```

::: tip
The names of hash functions are not used consistently.`SHA-2`, `SHA-256` or `SHA-256 bit` all refer to the same hash function.
:::

We can now check if the hash contained in the CID equals the checksum for the file:

```shell
echo "0E7071C59DF3B9454D1D18A15270AA36D54F89606A576DC621757AFD44AD1D2E *ubuntu-20.04.1-desktop-amd64.iso" | shasum -a 256 --check

ubuntu-20.04.1-desktop-amd64.iso: FAILED
shasum: WARNING: 1 computed checksum did NOT match
```

As we can see, the hash included in the CID does NOT match the hash of the input file `ubuntu-20.04.1-desktop-amd64.iso`.


## CID versions

CIDs can take a few different forms with different encoding bases or CID versions. Many of the existing IPFS tools still generate v0 CIDs, although the `files` ([Mutable File System](file-systems.md#mutable-file-system-mfs)) and `object` operations now use CIDv1 by default.

### Version 0 (v0)

When IPFS was first designed, we used base 58-encoded multihashes as the content identifiers. This is simpler but much less flexible than newer CIDs. CIDv0 is still used by default for many IPFS operations, so you should generally support v0.

If a CID is 46 characters starting with "Qm", it's a CIDv0 (for more details, check the [decoding algorithm](https://github.com/ipld/cid/blob/ef1b2002394b15b1e6c26c30545fd485f2c4c138/README.md#decoding-algorithm) in the CID specification).

### Version 1 (v1)

CID v1 contains some leading identifiers that clarify exactly which representation is used, along with the content-hash itself. These include:

- A [multibase](https://github.com/multiformats/multibase) prefix, specifying the encoding used for the remainder of the CID
- A CID version identifier, which indicates which version of CID this is
- A [multicodec](https://github.com/multiformats/multicodec) identifier, indicating the format of the target content — it helps people and software to know how to interpret that content after the content is fetched

These leading identifiers also provide forward-compatibility, supporting different formats to be used in future versions of CID.

You can use the first few bytes of the CID to interpret the remainder of the content address and know how to decode the content after being fetched from IPFS. For more details, check out the [CID specification](https://github.com/ipld/cid). It includes a [decoding algorithm](https://github.com/ipld/cid/blob/ef1b2002394b15b1e6c26c30545fd485f2c4c138/README.md#decoding-algorithm) and links to existing software implementations for decoding CIDs.

If you can't decide between CIDv0 and CIDv1, consider choosing CIDv1 for your new project and opt in by passing a version flag (`ipfs add --cid-version 1`). This is more future-proof and [safe for use in browser contexts](../how-to/address-ipfs-on-web.md#subdomain-gateway).

The IPFS project will switch to CIDv1 as the new default in the near future.


## CID Inspector

It's easy to explore a CID for yourself. Want to pull apart a specific CID's multibase, multicodec, or multihash info? You can use the [CID Inspector](https://cid.ipfs.io/#QmY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa92pxnxjQuPU) or the [CID Info panel in IPLD Explorer](https://explore.ipld.io/#/explore/QmY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa92pxnxjQuPU) (both links launch using a sample CID) for an interactive breakdown of differently-formatted CIDs.

Check out ProtoSchool's [Anatomy of a CID](https://proto.school/anatomy-of-a-cid) tutorial to see how a single file can be represented in multiple CID versions.

## CID conversion

Converting a CID from v0 to v1 enables it to be represented in multibase encodings.
The default for CIDv1 is the case-insensitive `base32`, but use of the shorter `base36` is encouraged for IPNS names to ensure same text representation on [subdomains](../how-to/address-ipfs-on-web.md#subdomain-gateway).

### v0 to v1

The built-in `ipfs cid format` command can be used from the command line:

```
$ ipfs cid format -v 1 -b base32 QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR
bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi
```

JavaScript users can also leverage the `toV1()` method provided by the [`multiformats`](https://www.npmjs.com/package/multiformats) library:

```js
const v0 = CID.parse('QmdfTbBqBPQ7VNxZEYEj14VmRuZBkqFbiwReogJgS1zR1n')
v0.toString()
//> 'QmdfTbBqBPQ7VNxZEYEj14VmRuZBkqFbiwReogJgS1zR1n'
v0.toV1().toString()
//> 'bafybeihdwdcefgh4dqkjv67uzcmw7ojee6xedzdetojuzjevtenxquvyku'
```

### v1 to v0

Conversion from CIDv1 to CIDv0 is only possible when the CIDv1 uses the `dag-pb` codec (0x70), as CIDv0 only supports `dag-pb`. CIDs using other codecs like `raw` (0x55), `dag-cbor` (0x71), or `dag-json` (0x0129) cannot be converted to CIDv0.

The built-in `ipfs cid format` command can be used to convert `dag-pb` from CIDv1 to CIDv0 from the command line:

```
$ ipfs cid format -v 0 bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi
QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR
```

Note: The above example works because `bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi` uses the `dag-pb` codec. Attempting to convert a CIDv1 with a different codec will result in an error.

Given a CID v1, JS users can convert back to v0 using the `toV0()` method provided by the [`multiformats`](https://www.npmjs.com/package/multiformats) library:

```js
const v1 = CID.parse('bafybeihdwdcefgh4dqkjv67uzcmw7ojee6xedzdetojuzjevtenxquvyku')
v1.toString()
//> 'bafybeihdwdcefgh4dqkjv67uzcmw7ojee6xedzdetojuzjevtenxquvyku'
v1.toV0().toString()
//> 'QmdfTbBqBPQ7VNxZEYEj14VmRuZBkqFbiwReogJgS1zR1n'
```

:::callout
**See CID conversion in action**
See the [interactive code sandbox](#codesandbox-converting-between-cid-versions-and-encodings) for an example JS application that converts between CID versions and encodings.
:::

### Converting between CID base encodings

A CID can be encoded using any of the encodings specified in the [multibase table](https://github.com/multiformats/multibase#multibase-table). The use of different encodings can impact speed and storage efficiency.

To convert a CIDv1 `cidV1` from one encoding to another, use the `toString()` method. By default, `toString()` will return the `base32` string representation of the CID, but you can use other string representations:

```js
const cidV1StringBase32 = cidV1.toString();
```

The following example returns the base256 emoji encoding of the CID:
```js
const cidV1StringBase256 = cidV1.toString(base256emoji);
```

Using `.bytes`, the following example returns the raw bytes of the CID:

```js
const cidV1Bytes = cidV1.bytes
```

:::callout
**See CID conversion in action**
See the [interactive code sandbox](#codesandbox-converting-between-cid-versions-and-encodings) for an example JS application that converts between CID versions and encodings.
:::


### CID to hex

Sometimes, a [hexadecimal](https://en.wikipedia.org/wiki/Hexadecimal) representation of raw bytes is preferred for debug purposes.
To get the hex for raw `.bytes` of a CIDv1 `cidV1`, use `base16` encoding:

```js
const cidV1StringBase256 = cidV1.toString(base16);
```

:::callout
**See CID conversion in action**
See the [interactive code sandbox](#codesandbox-converting-between-cid-versions-and-encodings) for an example JS application that converts between CID versions and encodings.
:::

::: tip
[Subdomain gateways](../how-to/address-ipfs-on-web.md#subdomain-gateway) convert paths with custom bases like base16 to base32 or base36, in an effort to fit a CID in a DNS label:
- [dweb.link/ipfs/f01701220c3c4733ec8affd06cf9e9ff50ffc6bcd2ec85a6170004bb709669c31de94391a](https://dweb.link/ipfs/f01701220c3c4733ec8affd06cf9e9ff50ffc6bcd2ec85a6170004bb709669c31de94391a)
  returns a HTTP 301 redirect:
  → [bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi.ipfs.dweb.link](https://bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi.ipfs.dweb.link/)
:::


### CodeSandbox: Converting between CID versions and encodings

For a hand-on, interactive application that converts between CID versions and encodings, use the CodeSandbox below.

<iframe src="https://codesandbox.io/embed/converting-between-cid-versions-xrvqop?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="Converting between CID versions"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

## Further resources

Check out these links for more information on CIDs and how they work:

- [Core Course: How IPFS Deals With Files](https://www.youtube.com/watch?v=Z5zNPwMDYGg)
- [Files and IPFS Companion](https://www.youtube.com/watch?v=OCv5PvLnk-Y)
- [ResNetLab on Tour](https://research.protocol.ai/tutorials/resnetlab-on-tour/content-addressing/)
