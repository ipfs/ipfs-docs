---
title: Publishing IPNS names
description: Learn how to publish IPNS names with Kubo and js-ipfs
---

# Publishing IPNS names

IPNS names can be published from both the command line and programmatically.

- [Publishing IPNS names with Kubo](#publishing-ipns-names-with-kubo)
- [Publishing IPNS names programmatically with JS-IPFS](#publishing-ipns-names-programmatically-with-js-ipfs)

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

## Publishing IPNS names programmatically with JS-IPFS

With [ipfs-core](https://github.com/ipfs/js-ipfs/tree/master/packages/ipfs-core#readme) (a full IPNS node in JavaScript) you can publish an IPNS name as follows:

```javascript
import * as IPFS from 'ipfs-core'

const ipfs = await IPFS.create()

// The address of your files.
const addr = '/ipfs/bafkreidbbor7mvra2xzzl4kmr2sxrtkzaxlzs6rsr5ktgmbtousuzrhlxq'

ipfs.name.publish(addr, options).then(function (res) {
  // You now receive a res which contains two fields:
  //   - name: the name under which the content was published.
  //   - value: the IPFS path to which the IPNS name points.
  console.log(`IPNS name: ${res.name}\n value: ${res.value}`)
})
```

By default, `ipfs.name.publish` will use the Peer ID and set the lifetime to 24 hours. To learn more about the full API, check out the [API docs](https://github.com/ipfs/js-ipfs/blob/master/docs/core-api/NAME.md#ipfsnamepublishvalue-options).

:::warning
Note that when using `ipfs-core`, you're instantiating a full IPFS node. For your IPNS record to propagate through the network, it needs to be connected to other peers. If you're running `ipfs-core` in the browser, you may want to connect it to a long-running IPFS node to ensure it successfully propagates due to [browser connectivity limitations.](https://github.com/ipfs/js-ipfs/blob/master/docs/BROWSERS.md#limitations-of-the-browser-context).
:::
