---
title: Command-line quick start
legacyUrl: https://docs.ipfs.io/introduction/usage/
description: Quick-start guide for installing and getting started with IPFS from the command line.
---

# Command-line quick start

If you're command-line savvy and just want to get up and running with IPFS right away, follow this quick-start guide. Please note that this guide assumes that you'll be installing go-ipfs, the reference implementation written in Go.

::: tip
Don’t want to use the command line right now? Give the desktop-app implementation of IPFS a try. It also does all the steps listed on this page automatically, so you can run IPFS from the terminal later whenever you want. [Download IPFS Desktop now](https://github.com/ipfs/ipfs-desktop)
:::

## Prerequisites

If you have not yet installed Go-IPFS, follow the [install instructions](../install/command-line.md).

## Initialize the repository

`ipfs` stores all its settings and internal data in a directory called _the repository._ Before using IPFS for the first time, you’ll need to initialize the repository with the `ipfs init` command:

::: warning
Be careful with `sudo` on Unix platforms (including macOS)! If you run `sudo ipfs init`, the repository will be created for the `root` user instead of your local user account. IPFS doesn't need root privileges, so it's best to run all `ipfs` commands as a regular user!
:::

```bash
ipfs init

> initializing ipfs node at /Users/jbenet/.ipfs
> generating 2048-bit RSA keypair...done
> peer identity: Qmcpo2iLBikrdf1d6QU6vXuNb6P7hwrbNPW9kLAH8eG67z
> to get started, enter:
>
>   ipfs cat /ipfs/QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG/readme
```

If you are running on a server in a data center, you should initialize IPFS with the `server` profile. Doing so will prevent IPFS from creating a lot of data center-internal traffic trying to discover local nodes:

```bash
ipfs init --profile server
```

There are a whole host of other configuration options you may want to set — check [the full reference](https://github.com/ipfs/go-ipfs/blob/master/docs/config.md) for more.

The hash after `peer identity:` is your node’s ID and will be different from the one shown in the above output. Other nodes on the network use it to find and connect to you. You can run `ipfs id` at any time to get it again if you need it.

Now, try running the command suggested to you in the output of `ipfs init`. The one that looks like `ipfs cat /ipfs/<HASH>/readme`.

You should see something like this:

```
Hello and Welcome to IPFS!

██╗██████╗ ███████╗███████╗
██║██╔══██╗██╔════╝██╔════╝
██║██████╔╝█████╗  ███████╗
██║██╔═══╝ ██╔══╝  ╚════██║
██║██║     ██║     ███████║
╚═╝╚═╝     ╚═╝     ╚══════╝

If you see this, you have successfully installed
IPFS and are now interfacing with the ipfs merkledag!

 -------------------------------------------------------
| Warning:                                              |
|   This is alpha software. use at your own discretion! |
|   Much is missing or lacking polish. There are bugs.  |
|   Not yet secure. Read the security notes for more.   |
 -------------------------------------------------------

Check out some of the other files in this directory:

  ./about
  ./help
  ./quick-start     <-- usage examples
  ./readme          <-- this file
  ./security-notes
```

You can explore other objects in the repository. In particular, the `quick-start` directory which shows example commands to try:

```bash
ipfs cat /ipfs/QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG/quick-start
```

## Take your node online

Once you're ready to join your node to the public network, run the ipfs daemon in another terminal and wait for all three lines below to appear to know that your node is ready:

```bash
ipfs daemon

> Initializing daemon...
> API server listening on /ip4/127.0.0.1/tcp/5001
> Gateway server listening on /ip4/127.0.0.1/tcp/8080
```

Make a note of the TCP ports you receive. If they are different, use yours in the commands below.

Now, switch back to your original terminal. If you’re connected to the network, you should be able to see the IPFS addresses of your peers when you run:

```bash
ipfs swarm peers

> /ip4/104.131.131.82/tcp/4001/p2p/QmaCpDMGvV2BGHeYERUEnRQAwe3N8SzbUtfsmvsqQLuvuJ
> /ip4/104.236.151.122/tcp/4001/p2p/QmSoLju6m7xTh3DuokvT3886QRYqxAzb1kShaanJgW36yx
> /ip4/134.121.64.93/tcp/1035/p2p/QmWHyrPWQnsz1wxHR219ooJDYTvxJPyZuDUPSDpdsAovN5
> /ip4/178.62.8.190/tcp/4002/p2p/QmdXzZ25cyzSF99csCQmmPZ1NTbWTe8qtKFaZKpZQPdTFB
```

These are a combination of `<transport address>/p2p/<hash-of-public-key>`.

Now, you should be able to get objects from the network. Try:

```bash
ipfs cat /ipfs/QmSgvgwxZGaBLqkGyWemEDqikCqU52XxsYLKtdy3vGZ8uq > ~/Desktop/spaceship-launch.jpg
```

Using the above command, IPFS searches the network for the CID `QmSgv...` and writes the data into a file called `spaceship-launch.jpg` on your Desktop.

Next, try sending objects to the network, and then viewing it in your favorite browser. The example below uses `curl` as the browser, but you can open the IPFS URL in other browsers as well:

```bash
hash=`echo "I <3 IPFS -$(whoami)" | ipfs add -q`
curl "https://ipfs.io/ipfs/$hash"

> I <3 IPFS -<your username>
```

Cool, huh? The gateway served a file _from your computer_. The gateway queried the Distributed hash table (DHT), found your machine, requested the file, your computer sent it to the gateway, and the gateway sent it to your browser.

Depending on the state of the network, `curl` may take a while. The public gateways may be overloaded or having a hard time reaching you.

You can also check it out at your own local gateway:

```bash
curl "http://127.0.0.1:8080/ipfs/$hash"

> I <3 IPFS -<your username>
```

By default, your gateway is not exposed to the world. It only works locally.

## Web console

You can view the web console on your local node by going to `localhost:5001/webui`. This should bring up a console like this:

![Web console connection view](./images/command-line-quick-start/webui-connection.png)

The web console shows files that are in your [Mutable File System (MFS)](../concepts/file-systems#mutable-file-system-mfs). MFS is a tool built into the web console that helps you navigate IPFS files in the same way you would a name-based file system.

When you add files using the [CLI command `ipfs add ...`](../cli#ipfs-add), these files are not automatically available within the MFS. To view files in IPFS Desktop that you added using the CLI, you must copy the files over to the MFS:

```shell
ipfs files cp /ipfs/<ipfs-CID>
```

## IPFS Companion

While we are at it, [IPFS Companion](https://github.com/ipfs/ipfs-desktop#ipfs-companion) is a browser extension that simplifies access to IPFS resources and adds support for the IPFS protocol.

It will automatically redirect IPFS gateway requests to your local daemon so that you are not relying on or trusting remote gateways.

It runs in Firefox (desktop and Android) and various Chromium-based browsers such as Google Chrome or [Brave](https://brave.com).
[Check out its features](https://github.com/ipfs/ipfs-companion#features) and install it today!

- [Direct download](https://github.com/ipfs/ipfs-companion#install)
- [Install from Firefox Add-ons](https://addons.mozilla.org/en-US/firefox/addon/ipfs-companion/)
- [Install from Chrome Store](https://chrome.google.com/webstore/detail/ipfs-companion/nibjojkomfdiaoajekhjakgkdhaomnch)

## Troubleshooting

### Check your Go version

IPFS works with Go 1.12.0 or later. To check what go version you have installed, type `go version`:

```bash
go version

> go version go1.12.2 linux/amd64
```

If you need to update, we recommend you install from the [canonical Go packages](https://go.dev/doc/install). Package managers often contain out-of-date Go packages.

### Check that FUSE is installed

You need to install and set up FUSE in order to mount the file system. For more details on setting up FUSE, see [github.com/ipfs/go-ipfs/blob/master/docs/fuse.md](https://github.com/ipfs/go-ipfs/blob/master/docs/fuse.md)

### Further help

The IPFS community is friendly and able to help! Get support from other IPFS developers in the official [IPFS forums](https://discuss.ipfs.io/), or join the conversation on [Matrix](../community/chat.md).
