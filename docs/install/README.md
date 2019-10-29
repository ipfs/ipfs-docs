---
title: Install IPFS
sidebarDepth: 0
---

# Install IPFS

::: warning
This draft content ported from the legacy docs site may contain broken links and other errors. (Please remove this alert once content has been reviewed.)
:::

So you want to install IPFS. Yay! But what flavor? Here's some advice to help you.

## Dip your toes in the water: Desktop & Companion

Just want to try things out? Companion, maybe Desktop

## Host and share files on your own: Desktop & Companion

New to IPFS? Install Desktop and/or Companion

## Host and share files at scale: Cluster

Want to run IPFS for/with others? Install Cluster

## Integrate IPFS into your app: go-ipfs & js-ipfs

Want to integrate IPFS in your app? Install go & js, with comparison

## Original legacy docs install guide — these items will need to be incorporated somewhere

There are a variety of ways to install a copy of IPFS on your system. We generally recommend [installing a prebuilt package](#installing-from-a-prebuilt-package), but here are a few other supported options:

- [Installing from a Prebuilt Package](#installing-from-a-prebuilt-package) (recommended)
- [Installing with ipfs-update](#installing-with-ipfs-update)
- [Building from source](#building-from-source)
- [Upgrading IPFS](#upgrading-ipfs)
- [Troubleshooting](#troubleshooting)

Note these instructions all make use of the **command line.** We use `$` to indicate the command prompt — commands to type are on lines that are prefixed with that, while output lines are un-prefixed.

---

## Installing from a Prebuilt Package

First, download the right version of IPFS for your platform:

<a class="button button-primary" href="https://dist.ipfs.io/#go-ipfs" role="button">
  Download IPFS for your platform &nbsp;&nbsp;<i class="fa fa-download" aria-hidden="true"></i>
</a>

### macOS and Linux

After downloading, untar the archive, and move the `ipfs` binary somewhere in your executables `$PATH` using the `install.sh` script:

```sh
$ tar xvfz go-ipfs.tar.gz
$ cd go-ipfs
$ ./install.sh
```

Test it out:

```sh
$ ipfs help
USAGE:

    ipfs - Global p2p merkle-dag filesystem.
...
```

Congratulations! You now have a working IPFS installation on your computer.

### Windows

After downloading, unzip the archive, and move `ipfs.exe` somewhere in your `%PATH%`.

Test it out:

```sh
$ ipfs help
USAGE:

    ipfs - Global p2p merkle-dag filesystem.
...
```

Congratulations! You now have a working IPFS installation on your computer.

---

## Installing with ipfs-update

`ipfs-update` is a command-line tool to install and upgrade the `ipfs` binary.

### Getting ipfs-update

`ipfs-update` can be downloaded for your platform at: https://dist.ipfs.io/#ipfs-update

If you have a working Go environment (>=1.12), you can also install it with:

```
$ go get -u github.com/ipfs/ipfs-update
```

When installing new versions of `ipfs` or upgrading make sure you are using the latest version of `ipfs-update`.

### Installing ipfs with ipfs-update

`ipfs-update versions` lists all the available `ipfs` versions which are available for download:

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

Note that the latest available version may not be stable (i.e. release candidates
in the form `vX.X.X-rcX`). So it is recommended to specify the version you want
to install, for example: `ipfs-update install v0.4.21`.

---

## Building from Source

If you want, you can also build IPFS from source.
If you are on macOS or Linux, take a look at [the readme](https://github.com/ipfs/go-ipfs#build-from-source) for install instructions.
If you are on Windows, take a look at [this document](https://github.com/ipfs/go-ipfs/blob/master/docs/windows.md) for instructions.

---

## Upgrading IPFS

`ipfs` upgrades (and downgrades) may involve a repository upgrade process performed by the
[fs-repo-migrations](https://dist.ipfs.io/#fs-repo-migrations) tool.

### Upgrading using ipfs-update

`ipfs-update install` will download and run `fs-repo-migrations` when needed, during the installation of
a newer or older `ipfs` version (as explained above). This is the easiest way of upgrading.

<div class="message mb">
  <strong>Warning:</strong> Make sure that the ipfs daemon is not running during an upgrade
</div>

### Upgrading manually

In order to perform a manual upgrade of `ipfs`, you will need to manually run any repository migrations. The
procedure is as follows:

- Stop the `ipfs` daemon if it is running
- Optionally backup your `ipfs` data folder (i.e. `cp -aL ~/.ipfs ~/.ipfs.bk`)
- Download and install the latest version of `ipfs` from [https://dist.ipfs.io/#go-ipfs](https://dist.ipfs.io/#go-ipfs)
- Run `ipfs daemon`.

When a repository migration is necessary, `ipfs` will inform the user, download and install `fs-repo-migrations`
and perform the upgrade. If you wish the procedure to happen unattended, launch the daemon with the `--migrate`
flag.

Migrations can be also run manually by downloading the latest version of `fs-repo-migrations`
from [https://dist.ipfs.io/#fs-repo-migrations](https://dist.ipfs.io/#fs-repo-migrations) and
[following these instructions](https://github.com/ipfs/fs-repo-migrations/blob/master/run.md).

---

## Troubleshooting

### Help!

If you have any problems, come get live help at
[#ipfs](/#community) or via [the mailing list](/#community).

### Check Go Version

IPFS works with Go 1.12.0 or later.
To check what go version you have installed, type `go version`.
Here's what I get:

```sh
$ go version
go version go1.12.2 linux/amd64
```

If you need to update, it is recommended to install from the
[canonical Go packages](https://golang.org/doc/install).
Package managers often contain out-of-date Go packages.

### Install FUSE

For more details on setting up FUSE (so that you can mount the filesystem), see [github.com/ipfs/go-ipfs/blob/master/docs/fuse.md](https://github.com/ipfs/go-ipfs/blob/master/docs/fuse.md)
