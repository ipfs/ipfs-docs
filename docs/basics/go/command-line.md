---
title: IPFS in Golang
description: "A simple walkthrough of how to perform basic IPFS operations using the Kubo command-line."
---

# Basic CLI Operations

This short guide aims to walk you through the **basics of using IPFS with the Kubo CLI**.  Kubo is [one of multiple IPFS implementations](../ipfs-implementations.md). It is the oldest IPFS implementation and exposes a CLI (among other things).

You will learn how to add, retrieve, read, and remove files within the CLI. If you are unsure about the meaning of some terms, you can check out the [glossary](.../concepts/glossary.md).

All instructions and examples shown here were performed and tested on an M1 Mac. However, the IPFS commands are the same on Linux, macOS, and Windows. You will need to know how to navigate your computer's directories from within the CLI. If you're unsure how to use the CLI, we recommend learning how before continuing with this guide.

## Install Kubo

Next up, we need to install Kubo for the command-line. We have a great guide that will walk you through how to [install Kubo with the CLI](../install/command-line.md).

Once you have Kubo installed, we need to get our node up and running. If this is your first time using Kubo, you will first need to initialize the configuration files:

```shell
ipfs init
```

This will output something like:

```plaintext
initializing ipfs node at /Users/<user>/.ipfs
generating 2048-bit RSA keypair...done
peer identity: Qm...
to get started, enter:

  ipfs cat /ipfs/QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG/readme
```

We're now ready to start the IPFS daemon to bring the node online. Run the `ipfs daemon` command:

```shell
ipfs daemon
```

This will output something like:

```plaintext
Initializing daemon...
Kubo version: 0.12.0
Repo version: 12
System version: arm64/darwin
[...]
Daemon is ready
```

This command will stay running until you tell it to stop; don't do this yet! Simply open up a new instance of the CLI and continue with the guide!

:::warning
Do not close the CLI that you used to initialize your daemon. Only terminate the daemon when you want to take your IPFS node offline.
:::

## Add files

Now that we have our Kubo IPFS node up and running, we're ready to add files to IPFS.

1. Within the CLI, navigate to the directory containing the file or folder you wish to share. In this example, we will navigate to the `~/Documents` directory:

    ```shell
    cd ~/Documents
    ```

1. Once in there, list the contents of the directory to make sure we're in the right place:

    ```shell
    ls
    ```

    This will output the contents of this folder:

    ```plaintext
    hello-ipfs.txt
    ```

1. Next up, we'll use the `ipfs add` command to add a file to IPFS. Be sure to add the file extension to the end of the file name:

    ```shell
    ipfs add hello-ipfs.txt
    ```

    This will output something like:

    ```plaintext
    added QmRgR7Bpa9xDMUNGiKaARvFL9MmnoFyd86rF817EZyfdGE hello-ipfs.txt
    6 B / 6 B [==========================================================] 100.00
    ```

We've now added a file to IPFS, and it's ready to be shared with peers on the network!

## Retrieve a file

In the previous section, we went through how to add local files to IPFS. We're going to cover how to retrieve remote files from IPFS and save them to your computer. For this example, we will retrieve a folder containing a single text file.

1. Within the CLI, navigate to the directory where you wish to save the folder. IPFS will save the folder to whichever directory you are in. In this case, we're going to save the folder in the `~/Documents` directory:

    ```shell
    cd ~/Documents
    ```

1. To get content over IPFS, we need to tell the `ipfs daemon` which CID we want. In this case, we want `bafybeif2ewg3nqa33mjokpxii36jj2ywfqjpy3urdh7v6vqyfjoocvgy3a`.
1. Use the command `ipfs get`, combined with the CID we want, to retrieve the folder:

    ```shell
    ipfs get bafybeif2ewg3nqa33mjokpxii36jj2ywfqjpy3urdh7v6vqyfjoocvgy3a
    ```

    This will output something like:

    ```plaintext
    Saving file(s) to bafybeif2ewg3nqa33mjokpxii36jj2ywfqjpy3urdh7v6vqyfjoocvgy3a
    1.76 KiB / 1.76 KiB [==============================================] 100.00% 0s
    ```

    It may take a few moments for your IPFS node to find the data we're looking for.

We've now retrieved the folder over IPFS, and a copy of it has been saved to your computer's local storage! You are also now hosting the folder and its contents for others to retrieve.

## View a file

You can view the contents of a file from within the CLI using the command `ipfs cat`. We're going to use this command to view the contents of the folder we just retrieved, but you can also use `ipfs cat` on files you don't already have locally.

```shell
ipfs cat bafybeif2ewg3nqa33mjokpxii36jj2ywfqjpy3urdh7v6vqyfjoocvgy3a
```

This will output something like:

```plaintext
Error: this dag node is a directory
```

Attempting to run `ipfs cat` on the CID from above returns an error! The CID points to the _directory_, not the _file_. To view the directory contents, we will run `ipfs refs <CID>`.

```shell
ipfs refs bafybeif2ewg3nqa33mjokpxii36jj2ywfqjpy3urdh7v6vqyfjoocvgy3a
```

This will output something like:

```plaintext
bafkreig24ijzqxj3cxdp6yh6ia2ysxzvxsfnd6rzahxxjv6ofcuix52wtq
```

The `ref` command returns the CID that points to the file _within_ the directory. Now we can use `ipfs cat` with this new CID to view it:

```plaintext
ipfs cat bafkreig24ijzqxj3cxdp6yh6ia2ysxzvxsfnd6rzahxxjv6ofcuix52wtq
```

This will output something like:

```plaintext
MMMMMMMMMMN0xo;';ox0NMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMWXOdoloxkkkxolodOXWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMN0xdoodkOOOOOOOOOkdoodx0NMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MKo;;oxOOOOOOOOOOOOOOOOOxo;;oKMMMMMXOKMMMN0kkkkkO0NWMMXOkkkkkkOXMMWKkddddk0NMMMM
Wd...':okOOOOOOOOOOOOOko:'...dWMMMWd.lWMM0,.;ccc:;,oXWd.'clllco0WO:,:loolcckWMMM
Wdckdc,..;lxOOOOOOOxl;..';lo;dWMMMWo.lWMM0''0MMMWK:.oNo.lWMMMMMMX:.dWMMMMMWWMMMM
WdcOKK0ko;'.,:c:c:,..,:oxxxd;dWMMMWo.lWMM0''0MMMMNc.oNo.lNWWWWWMNl.;x0XNWMMMMMMM
WdcOKKKKKKOd:.   .,cdxxxxxxd;dWMMMWo.lWMM0'.coool;'cKWo..clllldXMNkl:;;;:lxXMMMM
WdcOKKKKKKKK0l. .:dxxxxxxxxd;dWMMMWo.lWMM0'.cooodkKWMWo.:0K000KWMMMMWNK0xc.,0MMM
WdcOKKKKKKKKK0: ,dxxxxxxxxxd:dWMMMWo.lWMM0''0MMMMMMMMWo.lWMMMMMMMMMMMMMMMX:.dWMM
Wd;xKKKKKKKKK0: ,dxxxxxxxxxl,dWMMMWo.lWMM0''0MMMMMMMMWo.lWMMMMMMWOdk0KXXKd.,0MMM
Mk',d0KKKKKKK0: ,dxxxxxxxdc.'kMMMMMO:xWMMKllXMMMMMMMMWk:kWMMMMMMWOlcccccccdKWMMM
MWKkdooxOKKKK0: ,dxxxxdlclokKWMMMMMWWWMMMMWWMMMMMMMMMMMWMMMMMMMMMMMWWNNNNWMMMMMM
MMMMWNOxdodk00: ,ddoccldONWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMWKkdol' .:lokKWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMWKd'.'dKWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
```

It is important to note that `ipfs cat` only works with plaintext files. As demonstrated above, attempting to `cat` a directory will return an error. If you attempt to `cat` an image file or a text file that is not plaintext, your terminal will be filled with unreadable lines.

## Pin a file

We can _pin_ data we want to save to our IPFS node to ensure we don't lose this data.

1. Use the `ipfs pin add` command:

    ```shell
    ipfs pin add bafybeif2ewg3nqa33mjokpxii36jj2ywfqjpy3urdh7v6vqyfjoocvgy3a
    ```

    This will output something like:

    ```plaintext
    pinned bafybeif2ewg3nqa33mjokpxii36jj2ywfqjpy3urdh7v6vqyfjoocvgy3a recursively
    ```

By default, objects that you retrieve over IPFS are not pinned to your node. If you wish to prevent the files from being garbage collected, you need to pin them. You will notice that the pin you just added is a `recursive` pin, meaning it is a directory containing other objects. Check out the [Pinning page to learn more about how this works](../concepts/persistence.md).

## Remove a file

If we decide that we no longer want to host a file, all we have to do is remove the pin.

1. First, we need to grab the CID of the file or folder we want to unpin. To view a list of the content you have pinned, run `ipfs pin ls`:

    ```shell
    ipfs pin ls
    ```

    This will output something like:

    ```plaintext
    QmPZ9gcCEpqKTo6aq61g2nXGUhM4iCL3ewB6LDXZCtioEB indirect
    QmQGiYLVAdSHJQKYFRTJZMG4BXBHqKperaZtyKGmCRLmsF indirect
    QmU5k7ter3RdjZXu3sHghsga1UQtrztnQxmTL22nPnsu3g indirect
    QmUNLLsPACCz1vLxQVkXqqLX5R1X345qqfHbsf67hvA3Nn recursive
    QmYCvbfNbCwFR45HiNP45rwJgvatpiW38D961L5qAhUM5Y indirect
    QmejvEPop4D7YUadeGqYWmZxHhLc4JBUCzJJHWMzdcMe2y indirect
    QmQ5vhrL7uv6tuoN9KeVBwd4PwfQkXdVVmDLUZuTNxqgvm indirect
    QmQPeNsJPyVWPFDVHb77w8G42Fvo15z4bG2X8D2GhfbSXc recursive
    QmQy6xmJhrcC5QLboAcGFcAE1tC8CrwDVkrHdEYJkLscrQ indirect
    ```

1. If you know exactly which CID you want to remove, then great! However, if you're unsure which CID is, you can use the `ipfs add` command again on the file or folder you want to remove to find out. We're going to unpin the `hello-ipfs.txt` file we used earlier.

    ```shell
    cd ~/Documents
    ipfs add hello-ipfs.txt
    ```

    This will output something like:

    ```plaintext
    added QmRgR7Bpa9xDMUNGiKaARvFL9MmnoFyd86rF817EZyfdGE hello-ipfs.txt
    6 B / 6 B [==========================================================] 100.00
    ```

    Even though IPFS is just giving us the same output as before, we're not actually re-adding the file. We can grab the CID from this output, though.

1. Now, we can use the `ipfs pin rm` command to unpin the file:

    ```shell
    ipfs pin rm QmRgR7Bpa9xDMUNGiKaARvFL9MmnoFyd86rF817EZyfdGE
    ```

    This will output something like:

    ```plaintext
    unpinned QmRgR7Bpa9xDMUNGiKaARvFL9MmnoFyd86rF817EZyfdGE
    ```

1. The `hello-ipfs.txt` file is now unpinned, but it has not been removed from our node completely. To remove it completely, we need to run the garbage collection. The command will remove everything from your node that does not have a pin:

    ```shell
    ipfs repo gc
    ```

    This will output something like:

    ```plaintext
    removed bafybeif2ewg3nqa33mjokpxii36jj2ywfqjpy3urdh7v6vqyfjoocvgy3a
    removed bafkreieceevgg2auxo4u3rjgeiqfr4ccxh6ylkgxt2ss6k2leuad5xckxe
    removed bafkreiblcvcr7letdbp2k2thkbjyunznrwq3y6pyoylzaq4epawqcca2my
    [...]
    ```

The target file has now been fully removed from your IPFS node and any other files that we did not pin. If the content that was just garbage collected was saved to your computer's local storage, it is still there. If you wish to remove the content from your computer's local storage, you will need to find where it is saved and delete it using the normal deletion method.

