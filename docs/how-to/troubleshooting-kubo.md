---
title: Troubleshooting Kubo
description: "If you're running into problems with Kubo, use this page to debug your issues and find a solution quickly."
---

# Troubleshooting Kubo

If you're running into problems providing or retrieving content with Kubo, use this page to debug your issues and find a solution quickly.

:::tip
You can use [IPFS Check](https://check.ipfs.network) to help troubleshoot your Kubo node and get an external perspective on your Kubo node's network reachability. See the [Troubleshooting retrieval](./troubleshooting.md#debug-with-ipfs-check) page for more information.
:::

## Check that your Kubo daemon is running

If you're getting unexpected behavior when trying to run common commands such as `ipfs get <cid>` returning `Error: merkledag: not found`, the issue is likely that your daemon isn't running. 

This can be remedied by running `ipfs daemon`, and using a different terminal to interact with the daemon.

## Kubo is running slowly

Commands like `ipfs ls` are going to the network to try and find data. If for some reason, that data is not _routable_ then Kubo will just keep looking for who has the data forever. Common reasons for data not being _routable_ are that:

- There are no providers for the CID.
- There are providers for the CID, but they are not reachable over the network (due to NAT related issues, firewalls, etc.).
- The provider for the CID has not yet announced the data in a way that your node can find it.

You can take a look at what's going on with Bitswap using `ipfs bitswap stat` to help you determine if you're stuck looking for data. If the data you are looking for is perpetually in the `wantlist` then your node may be experiencing one of the common reasons listed above.

Some functions also have flags like `--stream` or `--progress` that can help you see incremental updates. For logging behavior, there is `ipfs log`, where `ipfs log level` can help you inspect subsystems further.

You can pass a timeout flag to basically all Kubo commands if you're concerned about your CLI not responding quickly enough when the data just isn't available on the network.

## File transfers

To start, make sure that Kubo is running on both machines. To verify, run `ipfs id` on each machine and check if the `Addresses` field has anything in it. If it says `null`, then your node is not online, and you will need to run `ipfs daemon`.

Now, let's call the node with the file you want to transfer node 'A' and the node you want to get the file to node 'B'. On `node a`, add the file to Kubo using the `ipfs add` command. This will print out the multihash of the content you added. Now, on `node b`, you can fetch the content using `ipfs get <CID>`.

```shell
# On A
ipfs add myfile.txt
> added bafkreihdwdcefgh4dqkjv67uzcmw7ojee6xedzdetojuzjevtenxquvyku myfile.txt

# On B
ipfs get bafkreihdwdcefgh4dqkjv67uzcmw7ojee6xedzdetojuzjevtenxquvyku
> Saving file(s) to bafkreihdwdcefgh4dqkjv67uzcmw7ojee6xedzdetojuzjevtenxquvyku
> 13 B / 13 B [=====================================================] 100.00% 1s
```

If that worked and your node downloaded the file, then congratulations! You just used Kubo to move files across the internet! But, if that `ipfs get` command is hanging, with no output, continue reading.

### Checking for existing connections

The first thing to do is to double-check that both nodes are, in fact, running and online. To do this, run `ipfs id` on each machine. If both nodes show some addresses (like the example below), then your nodes are online.

```json
{
	"ID": "12D3KooWMkNK8zgTQvtinDY8nuKmMAPBi3fBmvZj6W5huokJxekm",
	"PublicKey": "CAESILFGFWHUCrCI/5gZbFejCt7X+ORxckMvKyMY6klvwPwm",
	"Addresses": [
		"/ip4/127.0.0.1/tcp/4001/p2p/12D3KooWMkNK8zgTQvtinDY8nuKmMAPBi3fBmvZj6W5huokJxekm",
		"/ip4/127.0.0.1/udp/4001/quic-v1/p2p/12D3KooWMkNK8zgTQvtinDY8nuKmMAPBi3fBmvZj6W5huokJxekm",
		"/ip4/127.0.0.1/udp/4001/quic-v1/webtransport/certhash/uEiADD1J9gKOoRM-XvC9EYkbDCe97dwwjVNaheeQ4C1X8Iw/certhash/uEiA6LFi0_EAMHJUX9F9D8BmBiblrH0qrZNAWJqRmpa0rPw/p2p/12D3KooWMkNK8zgTQvtinDY8nuKmMAPBi3fBmvZj6W5huokJxekm",
		"/ip4/127.0.0.1/udp/4001/webrtc-direct/certhash/uEiAFVMBmTvM0f0DWr_kmRgi_QKrWQfRoI8rel0JxOugIkg/p2p/12D3KooWMkNK8zgTQvtinDY8nuKmMAPBi3fBmvZj6W5huokJxekm",
		"/ip4/79.193.32.60/tcp/51684/p2p/12D3KooWMkNK8zgTQvtinDY8nuKmMAPBi3fBmvZj6W5huokJxekm",
		"/ip4/79.193.32.60/udp/51684/quic-v1/p2p/12D3KooWMkNK8zgTQvtinDY8nuKmMAPBi3fBmvZj6W5huokJxekm",
		"/ip4/79.193.32.60/udp/51684/quic-v1/webtransport/certhash/uEiADD1J9gKOoRM-XvC9EYkbDCe97dwwjVNaheeQ4C1X8Iw/certhash/uEiA6LFi0_EAMHJUX9F9D8BmBiblrH0qrZNAWJqRmpa0rPw/p2p/12D3KooWMkNK8zgTQvtinDY8nuKmMAPBi3fBmvZj6W5huokJxekm",
		"/ip4/79.193.32.60/udp/51684/webrtc-direct/certhash/uEiAFVMBmTvM0f0DWr_kmRgi_QKrWQfRoI8rel0JxOugIkg/p2p/12D3KooWMkNK8zgTQvtinDY8nuKmMAPBi3fBmvZj6W5huokJxekm"
	],
	"AgentVersion": "kubo/0.35.0/Homebrew",
	"Protocols": [
		"/ipfs/bitswap",
		"/ipfs/bitswap/1.0.0",
		"/ipfs/bitswap/1.1.0",
		"/ipfs/bitswap/1.2.0",
		"/ipfs/id/1.0.0",
		"/ipfs/id/push/1.0.0",
		"/ipfs/kad/1.0.0",
		"/ipfs/lan/kad/1.0.0",
		"/ipfs/ping/1.0.0",
		"/libp2p/autonat/1.0.0",
		"/libp2p/autonat/2/dial-back",
		"/libp2p/autonat/2/dial-request",
		"/libp2p/circuit/relay/0.2.0/hop",
		"/libp2p/circuit/relay/0.2.0/stop",
		"/libp2p/dcutr",
		"/x/"
	]
}
```

Next, check to see if the nodes have a connection to each other. You can do this by running `ipfs swarm peers` on one node and checking for the other node's peer ID in the output. If the two nodes _are_ connected, and the `ipfs get` command is still hanging, then something unexpected is going on, and Kubo maintainers recommend filing an issue about it. If they are not connected, then let's try and debug why. (Note: you can skip to [Manually connecting `node a` to `node b`](#manually-connecting-node-a-to-node-b) if you just want things to work. However, going through the debugging process and reporting what happened to the Kubo maintainers is helpful to us to understand common pitfalls that people run into).

### Checking for providers in the DHT and IPNI

When requesting content with Kubo, nodes search the DHT and the IPNI for 'provider records' to see who has what content. To test this manually, use the `ipfs routing findprovs <cid>` command on `node b` to make sure that `node b` is able to find `node a` as a provider for the content:

```shell
ipfs routing findprovs <cid>
```

You should see the peer ID of `node a` printed out. 

If this command returns nothing (or returns IDs that are not `node a`), then no record of node `a` being a provider for the CID. This can happen if the data is added while `node a` does not have a daemon running. 

If this happens, and you don't want to wait for [`Reprovider.Interval`](https://github.com/ipfs/kubo/blob/master/docs/config.md#reproviderinterval) to trigger, you can use the `ipfs routing provide <cid>` command on `node a` to manually announce to the network that you have that CID:

```shell
ipfs routing provide <cid>
```

Then try running the `ipfs get` command again, `node b` should now be able to find `node a` as a provider for the content. 

If `node a`'s peer ID showed up in the initial `findprovs` call or manually providing the hash didn't resolve the problem, then it's likely that `node b` is unable to make a connection to `node a`.

### Checking multiaddrs

In the case where `node b` simply cannot establish a connection to `node a`, despite knowing that it needs to, the likely culprit is a NAT related issue. When `node b` learns that it needs to connect to `node a`, it checks the DHT for addresses for `node a`, and then starts trying to connect to them. We can check those addresses by running `ipfs routing findpeer <node a peerID>` on `node b`. This command should return a list of addresses for `node a`. If it doesn't return any addresses, then you should try running the manual providing command from the previous steps. Example output of addresses might look something like this:

```shell
/ip4/147.28.186.157/tcp/4001
/ip6/2604:1380:4642:6600::3/udp/4001/quic-v1/webtransport/certhash/uEiBvH7itEeFeNCMSlB1H0uq8pfhd3_1UgFc9TCbdfMF9pA/certhash/uEiCCxQXfyMXHWRgcooayE0BaQwjKtBmiJ50EznK8zQtBxw
/ip4/147.28.186.157/udp/4001/webrtc-direct/certhash/uEiASP_-_GKr5tkR9sOeyWhG6GWoWpzhszTPLQBxMhiBrXw
/ip4/147.28.186.157/udp/4001/quic-v1
/ip6/2604:1380:4642:6600::3/udp/4001/quic-v1
/dns6/2604-1380-4642-6600--3.k51qzi5uqu5dj2m5y8ah51jqi9nl0f45fi3m6gtnwyj15k8vjlj541lgqpyq2k.libp2p.direct/tcp/4001/tls/ws
/ip6/2604:1380:4642:6600::3/udp/4001/webrtc-direct/certhash/uEiASP_-_GKr5tkR9sOeyWhG6GWoWpzhszTPLQBxMhiBrXw
/dns4/147-28-186-157.k51qzi5uqu5dj2m5y8ah51jqi9nl0f45fi3m6gtnwyj15k8vjlj541lgqpyq2k.libp2p.direct/tcp/4001/tls/ws
/ip6/2604:1380:4642:6600::3/tcp/4001
/ip4/147.28.186.157/udp/4001/quic-v1/webtransport/certhash/uEiBvH7itEeFeNCMSlB1H0uq8pfhd3_1UgFc9TCbdfMF9pA/certhash/uEiCCxQXfyMXHWRgcooayE0BaQwjKtBmiJ50EznK8zQtBxw
```

In this case, we can see the following multiaddrs: IPv4, IPv6, and an AutoTLS DNS multiaddr, and support for TCP, QUIC, WebTransport, WebRTC-direct, and Secure WebSockets (with a TLS certificate). 

If one of the addresses in the matches your public IP, then the network knows a valid external address for your node.

If you see a lot of multiaddrs, you can try to use the `ipfs swarm connect <multiaddr>` command to connect to `node a` from `node b`. This command will return a list of NAT traversal methods that your node supports. If your node supports UPnP or NAT-PMP, you can try to enable them on the router of `node a` and retry the process. Otherwise, you can try manually connecting `node a` to `node b`.

### Checking connectivity with the identify protocol

To check if your node can connect to `node a`, try running the `ipfs id <peerId>` command: with the peer ID of `node a` on `node b`:

```shell
ipfs id <peerId>
```

This command will resolve the PeerID to the multiaddrs of `node a`, connect to the node and run the identify protocol.

If successful, you should see the peer ID of `node a` in the output, and the `Addresses` field should not be empty.

To see the multiaddr used for the connection run:

```shell
ipfs swarm peers -v | grep <peerId>
```

## Go debugging

When you see ipfs doing something (using lots of CPU, memory, or otherwise being weird), the first thing you want to do is gather all the relevant profiling information.

There's a command (`ipfs diag profile`) that will do this for you and bundle the results up into a zip file, ready to be attached to a bug report.

If you feel intrepid, you can dump this information and investigate it yourself by following the [Advanced Kubo Debug Guide at GitHub](https://github.com/ipfs/kubo/blob/master/docs/debug-guide.md).

