---
title: Command-line quick start
---

# Command-line quick start

If you're command-line savvy and just want to get up and running with IPFS right away, follow this quick-start guide. Please note that this guide assumes that you'll be installing go-ipfs, the reference implementation written in Go.

::: tip
Don’t want to use the command line right now? Give the desktop-app implementation of IPFS a try. It also does all the steps listed on this page automatically, so you can run IPFS from the terminal later whenever you want. [Download IPFS Desktop now](https://github.com/ipfs-shipyard/ipfs-desktop)
:::

## Install IPFS

You can install IPFS via a variety of methods — it's simplest to install from a prebuilt package, but feel free to take your pick from the options below.

### Installing from a prebuilt package

First, [download IPFS for your platform](https://dist.ipfs.io/#go-ipfs).

**If you're on Linux or macOS**, then untar the archive and move the `ipfs` binary somewhere in your executables `$PATH` using the `install.sh` script:

```sh
$ tar xvfz go-ipfs.tar.gz
$ cd go-ipfs
$ ./install.sh
```

**If you're on Windows**, then unzip the archive and move `ipfs.exe` somewhere in your `%PATH%`.

**Afterwards, for either operating system**, it's time to test it out. If you see the response below, you're good to go!

```sh
$ ipfs help
USAGE:

    ipfs - Global p2p merkle-dag filesystem.
...
```

### Installing from the command line

If you want to install from the command line, use `ipfs-update`. That way, you can install the IPFS binary now and upgrade it whenever you wish.

If you have a working Go environment (>=1.12), install `ipfs-update` as follows:

```
$ go get -u github.com/ipfs/ipfs-update
```

If you don't have Go installed, you can also download `ipfs-update` for your platform [here](https://dist.ipfs.io/#ipfs-update). No matter how you get it, make sure that you keep it up to date itself!

`ipfs-update versions` lists all the versions of IPFS that are available for download:

```
$ ipfs-update versions
v0.3.2
[...]
v0.4.20
v0.4.21
```

`ipfs-update install latest` will install the latest available version:

```
$ ipfs-update install latest
fetching go-ipfs version v0.4.21
binary downloaded, verifying...
success!
stashing old binary
installing new binary to /home/hector/go/bin/ipfs
checking if repo migration is needed...
Installation complete!
```

::: tip
Note that the latest available version may not be stable (i.e. release candidates in the form `vX.X.X-rcX`), so you may wish to specify the version you want to install. For example: `ipfs-update install v0.4.21`
:::

### Building from source

If you want, you can also build IPFS from source. For more detailed instructions, please see the install instructions for [Linux/macOS](https://github.com/ipfs/go-ipfs#build-from-source) or [Windows](https://github.com/ipfs/go-ipfs/blob/master/docs/windows.md).

::: tip
**Already have IPFS installed, but need to upgrade?** Note that upgrades (and downgrades) may involve a repository upgrade process performed by the [fs-repo-migrations](https://dist.ipfs.io/#fs-repo-migrations) tool.

#### Upgrading using ipfs-update

`ipfs-update install` will download and run `fs-repo-migrations` when needed, during the installation of a newer or older `ipfs` version (as explained above). This is the easiest way of upgrading, but it's **important** to make sure that the IPFS daemon is not running during an upgrade.

#### Upgrading manually

To upgrade manually, you will also need to manually run any repository migrations as follows:

- Stop the IPFS daemon if it's running
- Back up your IPFS data folder using a command like `cp -aL ~/.ipfs ~/.ipfs.bk`
- [Download and install](https://dist.ipfs.io/#go-ipfs) the latest version of IPFS
- Run `ipfs daemon`

If migration is necessary, IPFS will inform the user, download and install `fs-repo-migrations`, and perform the upgrade. If you want this to happen unattended, launch the daemon with the `--migrate` flag.

Migrations can be also run manually by [downloading the latest version](https://dist.ipfs.io/#fs-repo-migrations) of `fs-repo-migrations` and [following these instructions](https://github.com/ipfs/fs-repo-migrations/blob/master/run.md).
:::

## Initialize the repository

`ipfs` stores all its settings and internal data in a directory called the _repository._ Before using IPFS for the first time, you’ll need to initialize the repository with the `ipfs init` command:

```sh
> ipfs init
initializing ipfs node at /Users/jbenet/.go-ipfs
generating 2048-bit RSA keypair...done
peer identity: Qmcpo2iLBikrdf1d6QU6vXuNb6P7hwrbNPW9kLAH8eG67z
to get started, enter:

  ipfs cat /ipfs/QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG/readme

```

<div class="alert alert-warning">
    <p>
        If you are running on a server in a data center, you should initialize IPFS with the <code>server</code> profile. This will prevent IPFS from creating a lot of data center-internal traffic trying to discover local nodes:
    </p>

    <pre><code class="language-sh">&gt; ipfs init --profile server</code></pre>

    <p>
        There are a whole host of other configuration options you may want to set — check <a href="https://github.com/ipfs/go-ipfs/blob/v0.4.15/docs/config.md">the full reference</a> for more.
    </p>

</div>

<div class="alert alert-info">
    The hash after <code>peer identity: </code> is your node’s ID and will be different from the one shown in the above output. Other nodes on the network use it to find and connect to you. You can run <code>ipfs id</code> at any time to get it again if you need it.
</div>

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

If you're seeing this, you have successfully installed
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

```sh
ipfs cat /ipfs/QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG/quick-start
```

## Take your node online

Once you're ready to join your node to the public network, run the ipfs daemon in another terminal and wait for all three lines below to appear to know that your node is ready:

```sh
> ipfs daemon
Initializing daemon...
API server listening on /ip4/127.0.0.1/tcp/5001
Gateway server listening on /ip4/127.0.0.1/tcp/8080
```

<div class="alert alert-info">
Make note of the tcp ports you receive. If they are different, use yours in the commands below.
</div>

Now, switch back to your original terminal. If you’re connected to the network, you should be able to see the ipfs addresses of your peers when you run:

```sh
> ipfs swarm peers
/ip4/104.131.131.82/tcp/4001/ipfs/QmaCpDMGvV2BGHeYERUEnRQAwe3N8SzbUtfsmvsqQLuvuJ
/ip4/104.236.151.122/tcp/4001/ipfs/QmSoLju6m7xTh3DuokvT3886QRYqxAzb1kShaanJgW36yx
/ip4/134.121.64.93/tcp/1035/ipfs/QmWHyrPWQnsz1wxHR219ooJDYTvxJPyZuDUPSDpdsAovN5
/ip4/178.62.8.190/tcp/4002/ipfs/QmdXzZ25cyzSF99csCQmmPZ1NTbWTe8qtKFaZKpZQPdTFB
```

These are a combination of `<transport address>/ipfs/<hash-of-public-key>`.

Now, you should be able to get objects from the network. Try:

```sh
ipfs cat /ipfs/QmW2WQi7j6c7UgJTarActp7tDNikE4B2qXtFCfLPdsgaTQ/cat.jpg >cat.jpg
open cat.jpg
```

Next try sending objects to the network, and then viewing it in your favorite browser. The example below uses `curl` as the browser, but you can open the IPFS URL in other browsers as well:

```sh
> hash=`echo "I <3 IPFS -$(whoami)" | ipfs add -q`
> curl "https://ipfs.io/ipfs/$hash"
I <3 IPFS -<your username>
```

Cool, huh? The gateway served a file _from your computer_. The gateway queried
the Distributed hash table (DHT), found your machine, requested the file, your machine sent it to the
gateway, and the gateway sent it to your browser.

<div class="alert alert-warning">
    Depending on the state of the network, <code>curl</code> may take a while. The public gateways may be overloaded or having a hard time reaching you.
</div>

You can also check it out at your own local gateway:

```sh
> curl "http://127.0.0.1:8080/ipfs/$hash"
I <3 IPFS -<your username>
```

By default, your gateway is not exposed to the world, it only works locally.

## Web console

We also have a web console you can use to check the state of your node. In your favorite web browser, open:

<pre><code><a href="http://localhost:5001/webui">http://localhost:5001/webui</a></code></pre>

This should bring up a console like this:

![Web console connection view](https://docs.ipfs.io/introduction/assets/webui-connection.png)

## IPFS Companion

While we are at it, [IPFS Companion](https://github.com/ipfs-shipyard/ipfs-companion#ipfs-companion) is a browser extension that simplifies access to IPFS resources and adds support for the IPFS protocol.

It will automatically redirect IPFS gateway requests to your local daemon so that you are not relying on, or trusting, remote gateways.

It runs in Firefox (desktop and Android) and various Chromium-based browsers such as Google Chrome or [Brave](https://brave.com).
[Check out its features](https://github.com/ipfs-shipyard/ipfs-companion#features) and install it today!

- [Direct download](https://github.com/ipfs-shipyard/ipfs-companion#install)
- [Install from Firefox Add-ons](https://addons.mozilla.org/firefox/addon/ipfs-companion/)
- [Install from Chrome Store](https://chrome.google.com/webstore/detail/ipfs-companion/nibjojkomfdiaoajekhjakgkdhaomnch)

## Troubleshooting

### Check your Go version

IPFS works with Go 1.12.0 or later. To check what go version you have installed, type `go version`. Here's an example with 1.12.2 installed:

```sh
$ go version
go version go1.12.2 linux/amd64
```

If you need to update, we recommend you install from the [canonical Go packages](https://golang.org/doc/install). Package managers often contain out-of-date Go packages.

### Check that FUSE is installed

You need to install and set up FUSE in order to mount the file system. For more details on setting up FUSE, see [github.com/ipfs/go-ipfs/blob/master/docs/fuse.md](https://github.com/ipfs/go-ipfs/blob/master/docs/fuse.md)

### Still need help?

The IPFS community is friendly and able to help! Get support from other IPFS developers in the official [IPFS forums](https://discuss.ipfs.io/), or join the conversation on [IRC](/support-community/irc/).
