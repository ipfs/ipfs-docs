---
title: Troubleshoot file transfers
---

# Troubleshoot file transfers

This document is a guide to help troubleshoot transferring a file between two machines using ipfs.

## A file transfer

To start, make sure that ipfs is running on both machines. To verify, run `ipfs id` on each machine and check if the `Addresses` field has anything in it. If it says `null`, then your node is not online, and you need to run `ipfs daemon`.

Now, let's call the node with the file you want to transfer node `A` and the node you want to get the file to node `B`. On node `A`, add the file to IPFS using `ipfs add`. This will print out the multihash of the content you added. Now on node `B` you can fetch the content using `ipfs get <hash>`.

```bash
# On A
> ipfs add myfile.txt
added QmZJ1xT1T9KYkHhgRhbv8D7mYrbemaXwYUkg7CeHdrk1Ye myfile.txt

# On B
> ipfs get QmZJ1xT1T9KYkHhgRhbv8D7mYrbemaXwYUkg7CeHdrk1Ye
Saving file(s) to QmZJ1xT1T9KYkHhgRhbv8D7mYrbemaXwYUkg7CeHdrk1Ye
 13 B / 13 B [=====================================================] 100.00% 1s
```

If that worked and downloaded the file, then congratulations! You just used IPFS to move files across the internet! If the `ipfs get` command is _hanging_, with no output, read onwards.

## Troubleshooting

So your IPFS file transfer appears not to be working. The primary reason this happens is because node `B` cannot figure out how to connect to node `A`, or node `B` doesn't even know it has to connect to node `A`.

### Checking for existing connections

The first thing to do is to double-check that both nodes are in-fact running and online. To do this, run `ipfs id` on each machine. If both nodes show some addresses like the example below, then your nodes are online:

```json
{
  "ID": "QmTNwsFkLAed15kQEC1ZJWPfoNbBQnMFojfJKQ9sZj1dk8",
  "PublicKey": "CAASpgIwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDZb6znj3LQZKP1+X81exf+vbnqNCMtHjZ5RKTCm7Fytnfe+AI1fhs9YbZdkgFkM1HLxmIOLQj2bMXPIGxUM+EnewN8tWurx4B3+lR/LWNwNYcCFL+jF2ltc6SE6BC8kMLEZd4zidOLPZ8lIRpd0x3qmsjhGefuRwrKeKlR4tQ3C76ziOms47uLdiVVkl5LyJ5+mn4rXOjNKt/oy2O4m1St7X7/yNt8qQgYsPfe/hCOywxCEIHEkqmil+vn7bu4RpAtsUzCcBDoLUIWuU3i6qfytD05hP8Clo+at+l//ctjMxylf3IQ5qyP+yfvazk+WHcsB0tWueEmiU5P2nfUUIR3AgMBAAE=",
  "Addresses": [
    "/ip4/127.0.0.1/tcp/4001/p2p/QmTNwsFkLAed15kQEC1ZJWPfoNbBQnMFojfJKQ9sZj1dk8",
    "/ip4/192.168.2.131/tcp/4001/p2p/QmTNwsFkLAed15kQEC1ZJWPfoNbBQnMFojfJKQ9sZj1dk8"
  ],
  "AgentVersion": "go-ipfs/0.4.11-dev/",
  "ProtocolVersion": "ipfs/0.1.0"
}
```

Next, check to see if the nodes have a connection to each other. You can do this by running `ipfs swarm peers` on one node and checking for the other nodes peer ID in the output. If the two nodes **are connected**, and the `ipfs get` command is still hanging, then something unexpected is going on. File an issue [on GitHub](https://github.com/ipfs/go-ipfs/issues) if this is happening.

If they are not connected, follow these steps to figure out what's going on.

- [Troubleshoot file transfers](#troubleshoot-file-transfers)
  - [A file transfer](#a-file-transfer)
  - [Troubleshooting](#troubleshooting)
    - [Checking for existing connections](#checking-for-existing-connections)
    - [Check providers](#check-providers)
    - [Check addresses](#check-addresses)
    - [Manually connect the nodes](#manually-connect-the-nodes)

### Check providers

When requesting content on IPFS, nodes search the DHT for _provider records_ to see who has what content. Let's manually do that on node `B` to make sure that node `B` can determine that node `A` has the data. Run `ipfs dht findprovs <hash>`. We expect to see the peer ID of node `A` printed out. If this command returns nothing (or returns IDs that are not node `A`), then no record of `A` having the data exists on the network. This situation can happen if the data is added while node `A` does not have a daemon running. If this happens, you can run `ipfs dht provide <hash>` on node `A` to announce to the network that you have that hash. Then, restart the `ipfs get` command, node `B` should now be able to tell that node `A` has the content it wants. If node `A`'s peer ID showed up in the initial `findprovs` call, or manually providing the hash didn't resolve the problem, then it's likely that node `B` is unable to make a connection to node `A`.

### Check addresses

In the case where node `B` cannot form a connection to node `A`, despite knowing that it needs to, the likely culprit is a bad network address translation (NAT). When node `B` learns that it needs to connect to node `A`, it checks the DHT for addresses for node `A`, and then starts trying to connect to them. We can check those addresses by running `ipfs dht findpeer <node A peerID>` on node `B`. This command should return a list of addresses for node `A`. If it doesn't return any addresses, then you should try running the manual, providing command from the previous steps. Example output of addresses might look something like this:

```bash
/ip4/127.0.0.1/tcp/4001
/ip4/192.168.2.133/tcp/4001
/ip4/88.157.217.196/tcp/63674
```

In this case, we can see a localhost `127.0.0.1` address, a LAN address `192.168._._ and another address. If this third address matches your external IP address, then the network knows a valid external address for your node. At this point, it's safe to assume that your node has a difficult to traverse NAT situation. If this is the case, you can try to enable UPnP or NAT-PMP on the router of node`A`and retry the process. Otherwise, you can try manually connecting node`A`to node`B`.

### Manually connect the nodes

On node `B` run `ipfs id` and take one of the multiaddrs that contains its public IP address, and then on node `A` run `ipfs swarm connect <multiaddr>`. You can also try using a relayed connection. For more information [read this doc](./experimental-features.md#circuit-relay).

If this manual step worked, then you likely have an issue with NAT traversal, and IPFS cannot figure out how to make it through.
