---
title: Host a Git repo
legacyUrl: https://docs.ipfs.io/guides/examples/git/
description: Learn how to serve a static Git repository worldwide using IPFS
---

# Host a Git repo

Have you ever said to yourself: "Man, my Git server isn't distributed enough" or "I wish I had an easy way to serve a static Git repository worldwide"? Well, wish no more.

In this guide, we discuss how to serve a Git repository through the IPFS network. The end result will be a `git clone`able url served through IPFS!

To start, select a Git repository you want to host, and do a bare clone of it:

```bash
git clone --mirror git@myhost.io/myrepo
```

For those who aren't super Git-savvy, a bare repository means that it doesn't have a working tree, and can be used as a server. They have a slightly different format than your normal Git repository.

Now, to get it ready to be cloned, you need to do the following:

```bash
cd myrepo
git update-server-info
```

Optionally, you can unpack all of Git's objects:

```bash
mv objects/pack/*.pack .
git unpack-objects < *.pack
rm -f *.pack objects/pack/*
```

Doing this breaks up Git's large packfile into all of its individual objects. This will allow IPFS to deduplicate objects if you add multiple versions of this Git repository.

Once you've done that, that repository is ready to be served. All that's left to do is to add it to IPFS:

```bash
$ pwd
/code/myrepo
$ ipfs add -r .
...
...
...
added QmX679gmfyaRkKMvPA4WGNWXj9PtpvKWGPgtXaF18etC95 .
```

Now, try cloning it:

```bash
$ cd /tmp
$ git clone http://QmX679gmfyaRkKMvPA4WGNWXj9PtpvKWGPgtXaF18etC95.ipfs.localhost:8080/ myrepo
```

Note: make sure to change out that hash for yours.

Now, you may be asking, "Well, what good is a Git repository that I can't change anything on?" Here's one use case. Say you program in Go. For those who don't know, Go uses version control paths for its imports, i.e:

```go
import (
	"github.com/whyrusleeping/mycoollibrary"
)
```

This is a really nice feature, and solves a lot of problems — but often times, it's possible to run into
the issue where you're using someone's library, and they change the API, and it breaks your code.
Using what we've done above, you could clone the library, and add it into IPFS, so your import
paths will now look something like:

```go
import (
	mylib "gateway.ipfs.io/ipfs/QmX679gmfyaRkKMvPA4WGNWXj9PtpvKWGPgtXaF18etC95"
)
```

And you will be guaranteed to have the same code every time!

Note: Since Go doesn't allow the usage of localhost for import paths, we use the public HTTP gateways. This provides no security guarantees, as a man-in-the-middle attack could ship you bad code. You could use a domain name that redirects to the localhost instead to avoid the issue.

