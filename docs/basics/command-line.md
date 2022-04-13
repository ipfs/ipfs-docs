---
title: "Command-line"
description: "A simple walkthrough of how to perform basic IPFS operations using the command-line."
---

# Basic CLI Operations

This short guide aims to walk you through the basics of using IPFS with the CLI (Command Line Interface). You will learn how to add, retrieve, read, and remove files from within the CLI. We will try to keep it simple here, if you are unsure about the meaning of some terms you can check out the [glossary](../concepts/glossary/). Also don't forget to check out the rest of the [docs](../) to learn more about IPFS!

All instructions and examples shown here were performed and tested on an M1 Mac, the IPFS commands will be same on macOS, Windows, and Linux. You will need to know how to navigate through your computers directories from within the CLI, if you are unsure how to do that, it is recommended to learn how before continuing with this guide.

## Install IPFS using the CLI

Installing IPFS using the CLI is simple, and there is already a great guide on how to do so [here](../install/command-line/).

Once you have IPFS installed, you need to get your node up and running. If this is your first time using IPFS you will first need to initialize the configuration files.

```
ipfs init

> initializing ipfs node at /Users/<user>/.ipfs
> generating 2048-bit RSA keypair...done
> peer identity: Qm...
> to get started, enter:
>
>   ipfs cat /ipfs/QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG/readme
```

Your IPFS node is now initialized and you are ready to start the daemon to bring your node online.

```
ifps daemon

> Initializing daemon...
> go-ipfs version: 0.12.0
> Repo version: 12
> System version: arm64/darwin
> ...
```

You're all set! Simply open up a new instance of the CLI and continue on with the guide!

### Important Note

Do not close the CLI that you used to initialize your daemon, only terminate the daemon when you want to take your IPFS node offline.

## Add a local file or folder to IPFS using the CLI

Now that you have your IPFS node up and running, you are ready to add your file or folder to IPFS.

1. Within the CLI, navigate to the directory that contains the file/folder that you wish to host and share on IPFS. In this example, I will be navigating to my documents directory to add a single text file.

```
cd Documents

> Documents
```

2. Once you are in the directory that contains the file/folder you wish to host and share on IPFS, you will be using the `ipfs add <"File/Folder Name">` command to add it to IPFS.

```
ipfs add "Hello IPFS"

> added QmYPpRuJRsR9jGy8dDRJ3txLRWByoT3CJ3AfmKtMq8CPG3 Hello IPFS
```

When you add a local file or folder to IPFS it is automatically pinned to your node. Pins prevent objects on your node from being removed during garbage collection, more on this later.

You have now added your files to IPFS and they are ready to be shared and hosted to peers on the network.

## Retrieve a file from IPFS and read it using the CLI

In the previous section we went through how to add local files to IPFS, now we will learn how to retrieve remote files from IPFS and save them to your computer locally. For this example we will be retrieving a folder that contains a single text file.

1. Within the terminal, navigate to the directory where you wish to save the folder. The folder will be saved to whichever directory you are in. In this case, I want to save the folder to my documents directory.

```
cd Documents

> Documents
```

2. Now that you are in the desired destination directory, use the command `ipfs get <CID>` to retrieve the folder.

```
ipfs get bafybeia6b2lmxqbf6572ig4pj4lepjm7u4vgk4bg4hzewmev2owkvedtwm

> Saving file(s) to bafybeia6b2lmxqbf6572ig4pj4lepjm7u4vgk4bg4hzewmev2owkvedtwm
> 86.89 KiB / 86.89 KiB [==============================================] 100.00% 0s
```

You have now retrieved the folder over IPFS and a copy of it has been saved to your computers local storage. You are also now hosting the folder and it's contents for others to retrieve.

You can now pin the folder that you just retrieved by running the `ipfs pin add <CID>` command.

```
ipfs pin add bafybeia6b2lmxqbf6572ig4pj4lepjm7u4vgk4bg4hzewmev2owkvedtwm

> pinned bafybeia6b2lmxqbf6572ig4pj4lepjm7u4vgk4bg4hzewmev2owkvedtwm recursively
```

Objects that you retrieve over IPFS are not pinned to your node by default, if you wish to prevent the files from being garbage collected, you need to pin them. You will notice that the pin you just added is a `recursive` pin, meaning it is a directory containing other objects. More about pins [here](../how-to/pin-files/#three-kinds-of-pins).

You can also view the contents of a file from within the CLI using the command `ipfs cat <CID>`. In the example below, I will be using this command in an attempt to view the contents of the folder we just retrieved and pinned.

```
ipfs cat bafybeia6b2lmxqbf6572ig4pj4lepjm7u4vgk4bg4hzewmev2owkvedtwm

> Error: this dag node is a directory
```

Attempting to run `ipfs cat` on the CID from above returns an error, this is because the CID points to the directory, not the file. In order to view the contents of the directory we will run `ipfs refs <CID>.

```
ipfs refs bafybeia6b2lmxqbf6572ig4pj4lepjm7u4vgk4bg4hzewmev2owkvedtwm

> bafkreifcwhj4ppd7rhxxmznpd7w4op35n5fssgumwdg2miq3ncjblrtyrq
```

The command returned the CID that points to the file within the directory. Now we can use `ipfs cat <CID> to view the content of that file.

```
ipfs cat bafkreifcwhj4ppd7rhxxmznpd7w4op35n5fssgumwdg2miq3ncjblrtyrq

> Narrator:
> According to all known laws of aviation, there is no way that a bee should be able to fly.
> ...
```

It is important to note that `ipfs cat` only works with text files. As we demonstrated above, attempting to `cat` a directory will return an error, and if you attempt to `cat` an image file you will get hundreds of unreadable lines in return.

## Delete a file from your local IPFS repo using the CLI

1. First, find the CID of the file you wish to remove from your IPFS node. For this example we will be removing the directory that we retrieved above.
2. Using the command `ipfs pin rm <CID>`, we will remove the recursive pin from the directory, doing so will also remove the indirect pin from the text file inside.

```
ipfs pin rm 

> unpinned bafybeia6b2lmxqbf6572ig4pj4lepjm7u4vgk4bg4hzewmev2owkvedtwm
```

3. The directory and file is now unpinned but it has not been removed from your node completely. To remove it completely, we need to run the garbage collection. The command will remove everything from your node that does not have a pin.

### Important Note

Before you run the garbage collection, ensure all CIDs that you wish to keep are pinned.

```
ipfs repo gc

> removed bafkreihb3l6s7z4rxkvcxte6t6te75e4laow3bj3gar4tfpjt7qqqqtza4
> removed bafkreieceevgg2auxo4u3rjgeiqfr4ccxh6ylkgxt2ss6k2leuad5xckxe
> removed bafkreiblcvcr7letdbp2k2thkbjyunznrwq3y6pyoylzaq4epawqcca2my
> ...
```

The target file has now been fully removed from your IPFS node, along with any other files that were not pinned. If the content that was just garbage collected was saved to your computers local storage, it is still there. If you wish to remove the content from your computers local storage, you will need to find where it is saved and delete it using the normal deletion method.