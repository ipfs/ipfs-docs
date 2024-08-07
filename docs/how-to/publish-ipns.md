---
title: Publishing IPNS names
description: Learn how to publish IPNS names with Kubo
---

# Publishing IPNS names

IPNS names can be published programmatically.

- [Using Kubo (Go)](#publishing-ipns-names-with-kubo)
- [Using helia-ipns (JavaScript)](#publishing-ipns-names-with-helia-ipns)

## Publishing IPNS names with Kubo

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
   ipfs add --cid-version 1 hello.txt

   > added bafkreidfdrlkeq4m4xnxuyx6iae76fdm4wgl5d4xzsb77ixhyqwumhz244 hello.txt
   > 11 B / 11 B [=====================================================] 100.00%
   ```

   Take note of the CID output by IPFS.

1. Use `cat` and the CID you just got from IPFS to view the file again:

   ```shell
   ipfs cat bafkreidfdrlkeq4m4xnxuyx6iae76fdm4wgl5d4xzsb77ixhyqwumhz244

   > Hello IPFS
   ```

1. Publish your CID to IPNS:

   ```shell
   ipfs name publish /ipfs/bafkreidfdrlkeq4m4xnxuyx6iae76fdm4wgl5d4xzsb77ixhyqwumhz244

   > Published to k51qzi5uqu5dgy6fu9073kabgj2nuq3qyo4f2rcnn4380z6n8i4v2lvo8dln6l: /ipfs/bafkreidfdrlkeq4m4xnxuyx6iae76fdm4wgl5d4xzsb77ixhyqwumhz244
   ```

   `k51...` is the public key or IPNS name of the IPFS you are running. You can now change the file repeatedly, and, even though the CID changes when you change the file, you can continue to access it with this key.

1. You can view your file by going to `https://ipfs.io/ipns/k51qzi5uqu5dgy6fu9073kabgj2nuq3qyo4f2rcnn4380z6n8i4v2lvo8dln6l`:

   ```shell
   curl https://ipfs.io/ipns/k51qzi5uqu5dgy6fu9073kabgj2nuq3qyo4f2rcnn4380z6n8i4v2lvo8dln6l

   > Hello IPFS
   ```

1. Make a change to your file, add it to IPFS, and update your IPNS:

   ```shell
   echo "Hello again IPFS" > hello.txt
   ipfs add hello.txt

   > added bafkreidbbor7mvra2xzzl4kmr2sxrtkzaxlzs6rsr5ktgmbtousuzrhlxq hello.txt
   > 17 B / 17 B [=====================================================] 100.00%

   ipfs name publish bafkreidbbor7mvra2xzzl4kmr2sxrtkzaxlzs6rsr5ktgmbtousuzrhlxq

   > Published to k51qzi5uqu5dgy6fu9073kabgj2nuq3qyo4f2rcnn4380z6n8i4v2lvo8dln6l: /ipfs/bafkreidbbor7mvra2xzzl4kmr2sxrtkzaxlzs6rsr5ktgmbtousuzrhlxq
   ```

1. You can now go back to `https://ipfs.io/ipns/k51qzi5uqu5dgy6fu9073kabgj2nuq3qyo4f2rcnn4380z6n8i4v2lvo8dln6l` to view your updated file using the same address:

   ```shell
   curl https://ipfs.io/ipns/k51qzi5uqu5dgy6fu9073kabgj2nuq3qyo4f2rcnn4380z6n8i4v2lvo8dln6l

   > Hello again IPFS
   ```

You can view the CID of the file associated with your `k5` key by using `name resolve`:

```shell
ipfs name resolve

> /ipfs/bafkreidbbor7mvra2xzzl4kmr2sxrtkzaxlzs6rsr5ktgmbtousuzrhlxq
```

To use a different `k5` key, first create one using `key gen test`, and use the `--key` flag when calling `name publish`:

```shell
ipfs key gen SecondKey

> k51qzi5uqu5dh5kbbff1ucw3ksphpy3vxx4en4dbtfh90pvw4mzd8nfm5r5fnl

ipfs name publish --key=SecondKey /ipfs/bafybeicklkqcnlvtiscr2hzkubjwnwjinvskffn4xorqeduft3wq7vm5u4

> Published to k51qzi5uqu5dh5kbbff1ucw3ksphpy3vxx4en4dbtfh90pvw4mzd8nfm5r5fnl: /ipfs/bafybeicklkqcnlvtiscr2hzkubjwnwjinvskffn4xorqeduft3wq7vm5u4
```
## Publishing IPNS names with helia-ipns

Learn more about using IPNS with JavaScript with the [helia-ipns](https://github.com/ipfs/helia/tree/main/packages/ipns) package.
