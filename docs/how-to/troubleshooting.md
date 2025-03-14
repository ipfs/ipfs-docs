---
title: Troubleshooting
description: "If you're running into problems with Kubo, use this page to debug your issues and find a solution quickly."
---

# Troubleshooting

If you're running into problems with Kubo, use this page to debug your issues and find a solution quickly.

## Check that your Kubo daemon is running

If you're getting unexpected behavior when trying to run common commands such as `ipfs get <cid>` returning `Error: merkledag: not found`, the issue is likely that your daemon isn't running. This can be remedied by running `ipfs daemon`, and using a different terminal to interact with the daemon.

## Kubo is running slowly

Commands like `ipfs ls` are going to the network to try and find data. If for some reason, that data is not _findable_ then Kubo will just keep looking for who has the data forever. Common reasons for data not being _findable_ are that:

- Nobody online has it.
- There is one node that has the data, but it's behind a NAT.
- The node that has it has not yet advertised the data in a way that your node can find it.

You can take a look at what's going on with Bitswap using `ipfs bitswap stat` to help you determine if you're stuck looking for data. If the data you are looking for is perpetually in the `wantlist` then your node may be experiencing one of the common reasons listed above.

Some functions also have flags like `--stream` or `--progress` that can help you see incremental updates. For logging behavior, there is `ipfs log`, where `ipfs log level` can help you inspect subsystems further.

You can pass a timeout flag to basically all Kubo commands if you're concerned about your CLI not responding quickly enough when the data just isn't available on the network.

## File transfers

To start, make sure that Kubo is running on both machines. To verify, run `ipfs id` on each machine and check if the `Addresses` field has anything in it. If it says `null`, then your node is not online, and you will need to run `ipfs daemon`.

Now, let's call the node with the file you want to transfer node 'A' and the node you want to get the file to node 'B'. On `node a`, add the file to Kubo using the `ipfs add` command. This will print out the multihash of the content you added. Now, on `node b`, you can fetch the content using `ipfs get <hash>`.

```shell
# On A
ipfs add myfile.txt
> added QmZJ1xT1T9KYkHhgRhbv8D7mYrbemaXwYUkg7CeHdrk1Ye myfile.txt

# On B
ipfs get QmZJ1xT1T9KYkHhgRhbv8D7mYrbemaXwYUkg7CeHdrk1Ye
> Saving file(s) to QmZJ1xT1T9KYkHhgRhbv8D7mYrbemaXwYUkg7CeHdrk1Ye
> 13 B / 13 B [=====================================================] 100.00% 1s
```

If that worked and your node downloaded the file, then congratulations! You just used Kubo to move files across the internet! But, if that `ipfs get` command is hanging, with no output, continue reading.

### Checking for existing connections

The first thing to do is to double-check that both nodes are, in fact, running and online. To do this, run `ipfs id` on each machine. If both nodes show some addresses (like the example below), then your nodes are online.

```json
{
    "ID": "12D3KooWRaeAw2oromYUN5rAjYQ6KhqvXiWg8KuxeU9YWv7v3Ewa",
        "PublicKey": "CAASp[...]P2nfUUIR3AgMBAAE=",
        "Addresses": [
            "/ip4/127.0.0.1/tcp/4001/p2p/12D3KooWRaeAw2oromYUN5rAjYQ6KhqvXiWg8KuxeU9YWv7v3Ewa",
            "/ip4/127.0.0.1/udp/4001/quic-v1/p2p/12D3KooWRaeAw2oromYUN5rAjYQ6KhqvXiWg8KuxeU9YWv7v3Ewa",
            "/ip4/192.168.2.131/tcp/4001/p2p/12D3KooWRaeAw2oromYUN5rAjYQ6KhqvXiWg8KuxeU9YWv7v3Ewa",
            "/ip4/192.168.2.131/udp/4001/quic-v1/p2p/12D3KooWRaeAw2oromYUN5rAjYQ6KhqvXiWg8KuxeU9YWv7v3Ewa"
        ],
       "AgentVersion": "kubo/0.29.0-dev/",
        "ProtocolVersion": "ipfs/0.1.0"
}
```

Next, check to see if the nodes have a connection to each other. You can do this by running `ipfs swarm peers` on one node and checking for the other node's peer ID in the output. If the two nodes _are_ connected, and the `ipfs get` command is still hanging, then something unexpected is going on, and Kubo maintainers recommend filing an issue about it. If they are not connected, then let's try and debug why. (Note: you can skip to [Manually connecting `node a` to `node b`](#manually-connecting-node-a-to-node-b) if you just want things to work. However, going through the debugging process and reporting what happened to the Kubo maintainers is helpful to us to understand common pitfalls that people run into).

### Checking providers

When requesting content with Kubo, nodes search the DHT for 'provider records' to see who has what content. Let's manually do that on `node b` to make sure that `node b` is able to determine that `node a` has the data. Run `ipfs dht findprovs <hash>`. We expect to see the peer ID of `node a` printed out. If this command returns nothing (or returns IDs that are not `node a`), then no record of A having the data exists on the network. This can happen if the data is added while `node a` does not have a daemon running. If this happens, you can run `ipfs routing provide <hash>` on `node a` to announce to the network that you have that hash. Then if you restart the `ipfs get` command, `node b` should now be able to tell that `node a` has the content it wants. If `node a`'s peer ID showed up in the initial `findprovs` call or manually providing the hash didn't resolve the problem, then it's likely that `node b` is unable to make a connection to `node a`.

### Checking addresses

In the case where `node b` simply cannot form a connection to `node a`, despite knowing that it needs to, the likely culprit is a bad NAT. When `node b` learns that it needs to connect to `node a`, it checks the DHT for addresses for `node a`, and then starts trying to connect to them. We can check those addresses by running `ipfs routing findpeer <node a peerID>` on `node b`. This command should return a list of addresses for `node a`. If it doesn't return any addresses, then you should try running the manual providing command from the previous steps. Example output of addresses might look something like this:

```shell
/ip4/127.0.0.1/tcp/4001
/ip4/127.0.0.1/udp/4001/quic-v1
/ip4/192.168.2.133/tcp/4001
/ip4/192.168.2.133/udp/4001/quic-v1
/ip4/88.157.217.196/tcp/63674
/ip4/88.157.217.196/udp/63674/quic-v1
```

In this case, we can see a localhost (127.0.0.1) address, a LAN address (the 192.168._._ one), and another address. If this third address matches your external IP, then the network knows a valid external address for your node. At this point, it's safe to assume that your node has a difficult to traverse NAT situation. If this is the case, you can try to enable UPnP or NAT-PMP on the router of `node a` and retry the process. Otherwise, you can try manually connecting `node a` to `node b`.

### Manually connecting `node a` to `node b`

On `node b` run `ipfs id` and take one of the _multiaddrs_ that contains its public IP address, and then on `node a` run `ipfs swarm connect <multiaddr>`. You can also try using a relayed connection. If that _still_ doesn't work, then you should either join IRC and ask for help there or file an issue on GitHub.

If this manual step _did_ work, then you likely have an issue with NAT traversal, and IPFS cannot figure out how to make it through. Please report situations like this to us so we can work on fixing them.

## Go debugging

When you see ipfs doing something (using lots of CPU, memory, or otherwise being weird), the first thing you want to do is gather all the relevant profiling information.

There's a command (`ipfs diag profile`) that will do this for you and bundle the results up into a zip file, ready to be attached to a bug report.

If you feel intrepid, you can dump this information and investigate it yourself:

1. goroutine dump:

    ```shell
    curl localhost:5001/debug/pprof/goroutine\?debug=2 > ipfs.stacks
    ```

1. 30-second cpu profile:

    ```shell
    curl localhost:5001/debug/pprof/profile > ipfs.cpuprof
    ```

1. heap trace dump:

    ```shell
    curl localhost:5001/debug/pprof/heap > ipfs.heap
    ```

1. memory statistics. In JSON see `memstats` object:

    ```shell
    curl localhost:5001/debug/vars > ipfs.vars
    ```

1. System information:

    ```shell
    ipfs diag sys > ipfs.sysinfo
    ```

### Analyzing the stack dump

The first thing to look for is hung goroutines - any goroutine that's been stuck for over a minute will note that in the trace. It looks something like:

```shell
goroutine 2306090 [semacquire, 458 minutes]:
sync.runtime_Semacquire(0xc8222fd3e4)
    /home/whyrusleeping/go/src/runtime/sema.go:47 +0x26
sync.(*Mutex).Lock(0xc8222fd3e0)
    /home/whyrusleeping/go/src/sync/mutex.go:83 +0x1c4
gx/ipfs/QmedFDs1WHcv3bcknfo64dw4mT1112yptW1H65Y2Wc7KTV/yamux.(*Session).Close(0xc8222fd340, 0x0, 0x0)
    /home/whyrusleeping/gopkg/src/gx/ipfs/QmedFDs1WHcv3bcknfo64dw4mT1112yptW1H65Y2Wc7KTV/yamux/session.go:205 +0x55
gx/ipfs/QmWSJzRkCMJFHYUQZxKwPX8WA7XipaPtfiwMPARP51ymfn/go-stream-muxer/yamux.(*conn).Close(0xc8222fd340, 0x0, 0x0)
    /home/whyrusleeping/gopkg/src/gx/ipfs/QmWSJzRkCMJFHYUQZxKwPX8WA7XipaPtfiwMPARP51ymfn/go-stream-muxer/yamux/yamux.go:39 +0x2d
gx/ipfs/QmZK81vcgMhpb2t7GNbozk7qzt6Rj4zFqitpvsWT9mduW8/go-peerstream.(*Conn).Close(0xc8257a2000, 0x0, 0x0)
    /home/whyrusleeping/gopkg/src/gx/ipfs/QmZK81vcgMhpb2t7GNbozk7qzt6Rj4zFqitpvsWT9mduW8/go-peerstream/conn.go:156 +0x1f2
    created by gx/ipfs/QmZK81vcgMhpb2t7GNbozk7qzt6Rj4zFqitpvsWT9mduW8/go-peerstream.(*Conn).GoClose
    /home/whyrusleeping/gopkg/src/gx/ipfs/QmZK81vcgMhpb2t7GNbozk7qzt6Rj4zFqitpvsWT9mduW8/go-peerstream/conn.go:131 +0xab
```

At the top, you can see that this goroutine (number 2306090) has been waiting to acquire a semaphore for 458 minutes. That seems bad. Looking at the rest of the trace, we see the exact line it's waiting on is line 47 of runtime/sema.go. That's not particularly helpful, so we move on. Next, we see that call was made by line 205 of yamux/session.go in the `Close` method of `yamux.Session`. This one appears to be the issue.

Given that information, look for another goroutine that might be holding the semaphore in question in the rest of the stack dump.

There are a few different reasons that goroutines can be hung:

- `semacquire` means we're waiting to take a lock or semaphore.
- `select` means that the goroutine is hanging in a select statement, and none of the cases are yielding anything.
- `chan receive` and `chan send` are waiting for a channel to be received from or sent on, respectively.
- `IO wait` generally means that we are waiting on a socket to read or write data, although it *can* mean we are waiting on a very slow filesystem.

If you see any of those tags _without_ a `, X minutes` suffix, that generally means there isn't a problem -- you just caught that goroutine in the middle of a short wait for something. If the wait time is over a few minutes, that either means that goroutine doesn't do much, or something is pretty wrong.

If you see a lot of goroutines, consider using [stackparse](https://github.com/whyrusleeping/stackparse) to filter, sort, and summarize them.

### Analyzing the CPU Profile

The go team wrote an [excellent article on profiling go programs](http://blog.golang.org/profiling-go-programs). If you've already gathered the above information, you can skip down to where they start talking about `go tool pprof`. My go-to method of analyzing these is to run the `web` command, which generates an SVG dotgraph and opens it in your browser. This is the quickest way to easily point out where the hot spots in the code are.

### Analyzing vars and memory statistics

The output is JSON formatted and includes badger store statistics, the command line run, and the output from Go's [runtime.ReadMemStats](https://golang.org/pkg/runtime/#ReadMemStats). The [MemStats](https://golang.org/pkg/runtime/#MemStats) has useful information about memory allocation and garbage collection.

