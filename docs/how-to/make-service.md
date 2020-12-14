---
title: Make a service
description: Learn how to build an easy demo service on IPFS.
---

# Make a service

::: warning
This example is outdated and should only be used as reference. Several steps on this page are either no longer applicable, or cause errors with IPFS. This page has been removed from the sidebar navigation.
:::

IPFS has a few default services that it runs by default, such as [the DHT](/concepts/dht/), [Bitswap](/concepts/bitswap/), and the diagnostics service. Each of these simply registers a handler on the IPFS PeerHost, and listens on it for new connections. The `corenet` package has a very clean interface to this functionality. So let's try building an easy demo service to try this out!

Let's start by building the service host:

```go
package main

import (
	"fmt"

	core "github.com/ipfs/go-ipfs/core"
	corenet "github.com/ipfs/go-ipfs/core/corenet"
	fsrepo "github.com/ipfs/go-ipfs/repo/fsrepo"

	"code.google.com/p/go.net/context"
)
```

We don't need too many imports for this. Now, the only other thing we need is our main function:

Set up an IPFS node.

```go
func main() {
	// Basic ipfsnode setup
	r, err := fsrepo.Open("~/.ipfs")
	if err != nil {
		panic(err)
	}

	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	cfg := &core.BuildCfg{
		Repo:   r,
		Online: true,
	}

	nd, err := core.NewNode(ctx, cfg)

	if err != nil {
		panic(err)
	}
```

That's just the basic template of code to initiate a default IPFS node from the config in the user's `~/.ipfs` directory.

Next, we are going to build our service.

```go
	list, err := corenet.Listen(nd, "/app/whyrusleeping")
	if err != nil {
		panic(err)
	}

	fmt.Printf("I am peer: %s\n", nd.Identity.Pretty())

	for {
		con, err := list.Accept()
		if err != nil {
			fmt.Println(err)
			return
		}

		defer con.Close()

		fmt.Fprintln(con, "Hello! This is whyrusleepings awesome ipfs service")
		fmt.Printf("Connection from: %s\n", con.Conn().RemotePeer())
	}
}
```

And that's really all you need to write a service on top of IPFS. When a client connects, we send them our greeting, print their peer ID to our log, and close the session. This is the simplest possible service, and you can really write anything you want to handle the connection.

Now we need a client to connect to us:

```go
package main

import (
	"fmt"
	"io"
	"os"

	core "github.com/ipfs/go-ipfs/core"
	corenet "github.com/ipfs/go-ipfs/core/corenet"
	peer "github.com/ipfs/go-ipfs/p2p/peer"
	fsrepo "github.com/ipfs/go-ipfs/repo/fsrepo"

	"golang.org/x/net/context"
)

func main() {
	if len(os.Args) < 2 {
		fmt.Println("Please give a peer ID as an argument")
		return
	}
	target, err := peer.IDB58Decode(os.Args[1])
	if err != nil {
		panic(err)
	}

	// Basic ipfsnode setup
	r, err := fsrepo.Open("~/.ipfs")
	if err != nil {
		panic(err)
	}

	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	cfg := &core.BuildCfg{
		Repo:   r,
		Online: true,
	}

	nd, err := core.NewNode(ctx, cfg)

	if err != nil {
		panic(err)
	}

	fmt.Printf("I am peer %s dialing %s\n", nd.Identity, target)

	con, err := corenet.Dial(nd, target, "/app/whyrusleeping")
	if err != nil {
		fmt.Println(err)
		return
	}

	io.Copy(os.Stdout, con)
}
```

This client will set up their IPFS node (note: this is moderately expensive and you normally won't just spin up an instance for a single connection) and dial the service we just created.

To try it out, run the following on one computer:

```bash
ipfs init # if you haven't already
go run host.go
```

That should print out that peer's ID, copy it and use it on a second machine:

```bash
ipfs init # if you haven't already
go run client.go <peerID>
```

It should print out `Hello! This is whyrusleepings awesome ipfs service`

Now, you might be asking yourself: "Why would I use this? How is it better than the `net` package?". Here are the advantages:

1. You dial a specific peerID, no matter what their IP address happens to be at the moment.
2. You take advantage of the NAT traversal built into our net package.
3. Instead of a 'port' number, you get a much more meaningful protocol ID string.
