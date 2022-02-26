---
title: Pin files
description: Learn how to pin files in IPFS in order to keep your files and other objects local.
---

# Pin files using IPFS

Pinning is a very important concept in IPFS. IPFS semantics try to make it feel like every single object is local — there is no "retrieve this file for me from a remote server", just `ipfs cat` or `ipfs get`, which act the same way no matter where the actual object is located.

While this is nice, sometimes you want to be able to control what you keep around. **Pinning** is the mechanism that allows you to tell IPFS to always keep a given object somewhere — the default being your local node, though this can be different if you use a [third-party remote pinning service](work-with-pinning-services.md). IPFS has a fairly aggressive caching mechanism that will keep an object local for a short time after you perform any IPFS operation on it, but these objects may get garbage-collected regularly. To prevent that garbage collection, simply pin the CID you care about, or add it to [MFS](../concepts/file-systems.md#mutable-file-system-mfs). Objects added through `ipfs add` are pinned recursively by default. Things in MFS are not pinned by default, but are protected from garbage-collection, so one can think about MFS as a mechanism for implicit pinning.

Let's look at this example to explore pinning to your local IPFS node in a bit more depth:

1. First, create a file called `foo` with the contents `ipfs rocks`:

    ```shell
    echo "ipfs rocks" > foo    
    ```

    The `echo` command does not give an output when using the _output redirection_ `>` instruction.

1. Next, add `foo` to IPFS using the `ipfs add` command:

    ```shell
    ipfs add foo               

    > added QmRTV3h1jLcACW4FRfdisokkQAk4E4qDhUzGpgdrd4JAFy foo
    ```

1. Next, generate a list of all the objects you have pinned to your local storage.

    ```shell
    ipfs pin ls --type=all     

    
    > QmQPeNsJPyVWPFDVHb77w8G42Fvo15z4bG2X8D2GhfbSXc recursive
    > QmRTV3h1jLcACW4FRfdisokkQAk4E4qDhUzGpgdrd4JAFy recursive
    > QmQy6xmJhrcC5QLboAcGFcAE1tC8CrwDVkrHdEYJkLscrQ indirect
    > ...
    ```
    
   The `pin ls` command will list all objects that are pinned to your local storage, `--type=all` means it will list all the different kinds of pins (recursive, indirect, etc.).

1. Next, use the `pin rm <foo hash>` command to unpin the target object.

    ```shell
    ipfs pin rm <foo hash>     

    > unpinned QmRTV3h1jLcACW4FRfdisokkQAk4E4qDhUzGpgdrd4JAFy
    ```
    
    This will remove the `foo hash` object from your pinned items.


1. Next, attempt to run the same command as the previous step.

    ```shell
    ipfs pin rm <foo hash>     

    > Error: not pinned or pinned indirectly
    ```
    
    Attempting to run `ipfs pin rm <foo hash>` again here will return an error, this is because the previous step has already removed the pin from `<foo hash>`.

1. Next, generate a new list of all pinned objects.

    ```shell
    ipfs pin ls --type=all    

    > QmQPeNsJPyVWPFDVHb77w8G42Fvo15z4bG2X8D2GhfbSXc recursive
    > QmQy6xmJhrcC5QLboAcGFcAE1tC8CrwDVkrHdEYJkLscrQ indirect
    > ...
    ```
    
    You will notice that this list is the exact same as the previous one above, except the `<foo hash>` is no longer listed.

## Three kinds of pins

As you may have noticed in the example above, the first `ipfs pin rm` command didn't work — it should have warned you that the given hash was _pinned recursively_. What does this mean? There are three types of pins in the IPFS world:

- **Direct pins**, which pin just a single block and no others in relation to it.
- **Recursive pins**, which pin a given block and all of its children.
- **Indirect pins**, which are the result of a given block's parent being pinned recursively.

A pinned object cannot be garbage-collected — try this for proof:

1. First, add `foo` to IPFS.

    ```bash
    ipfs add foo           

    > added QmRTV3h1jLcACW4FRfdisokkQAk4E4qDhUzGpgdrd4JAFy foo
    > 11 B / 11 B [===================] 100.00%
    ```
    
    This will add the file `foo` to IPFS.

1. Next, use the `repo gc` command to perform garbage collection on the repository.

    ```bash
    ipfs repo gc

    > removed QmVoSaWpZYicoLSAcdwxDPt2Gk4WVFCfBFTBtwwY2ASD9P
    > removed QmcpK3cSDyPGiNriMZrZTNu8YCPBSiMAApuvMqXaJVyuWr
    > removed QmdpczDhBmrkxerCUWkEcRExcTHFcA4EcDCeYNdXcV5iqE
    > ...
    ```
    
    The `repo gc` command will remove all unpinned objects from IPFS.

1. Next, use command `cat <foo hash>` to show the contents of `foo`.

    ```bash
    ipfs cat <foo hash>    

    > ipfs rocks
    ```
    
    The command will return `ipfs rocks` as the `<foo hash>` was pinned, therefore it can't be removed.
      

But if `foo` were to somehow become unpinned ...

1. Use the `pin rm` command to unpin `<foo hash>`.

    ```bash
    ipfs pin rm <foo hash>    

    > unpinned QmRTV3h1jLcACW4FRfdisokkQAk4E4qDhUzGpgdrd4JAFy
    ```
    
    This will unpin `foo`.

1. Now, run the garbage collection command again.

    ```bash
    ipfs repo gc              

    > removed QmPPjksRv8SqiibAy6bSAXBnnfcBf3QnTnApxWjcFUTTkZ                                                
    > removed QmS3wrDNoaRtRi84K7Hf8jzh5sBZcwrQFj7CZLmmmacS2U                                                
    > removed QmRTV3h1jLcACW4FRfdisokkQAk4E4qDhUzGpgdrd4JAFy
    ```
    
    Just like before, this will remove all unpinned objects from IPFS.

1. Finally, run `cat <foo hash>` again to see if it returns the contents of `foo`.
    
    ```bash
    ipfs cat <foo hash>       

    > ipfs rocks
    ```
    
    You will notice it still returns the correct response, this is because while `<foo hash>` was removed from your local storage, the data still exists over IPFS.

## Local versus remote pinning

All the information above assumes that you're pinning items locally — that is, to your local IPFS node. That's the default behavior for IPFS, but it's also possible to pin your files to a _remote pinning service_. These third-party services give you the opportunity to pin files not to your own local node, but to nodes that they operate. You don't need to worry about your own node's available disk space or uptime.

While you can use a remote pinning service's own GUI, CLI, or other dev tools to manage IPFS files pinned to their service, you can also work directly with pinning services using your local IPFS installation — meaning that you don't need to learn a pinning service's unique API or other tooling.

- The [IPFS Pinning Service API](https://ipfs.github.io/pinning-services-api-spec/) offers a specification that enables developers to integrate any pinning service that supports the spec, or create their own. Thanks to the OpenAPI spec format, both clients and servers can be [generated](https://github.com/ipfs/pinning-services-api-spec#code-generation) from the YAML spec file.

- If you use go-ipfs 0.8+ from the command line, you have access to `ipfs pin remote` commands acting as a client for interacting with pinning service APIs. Add your favorite pinning service(s), pin CIDs under human-readable names, get pin statuses, and more, straight from the CLI. [Learn how →](work-with-pinning-services.md)

- [IPFS Desktop](https://github.com/ipfs-shipyard/ipfs-desktop) and its equivalent in-browser IPFS web interface, the [IPFS Web UI](https://github.com/ipfs-shipyard/ipfs-webui), both support remote pinning services, so you can pin to your favorite pinning service(s) straight from the UI. [Learn how →](work-with-pinning-services.md)
