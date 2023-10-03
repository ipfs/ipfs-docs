---
title: Privacy and encryption best practices
sidebarDepth: 0
---

# Privacy and encryption best practices

If there are situations in which you know you'll need to remain private but still want to use IPFS, one of the approaches outlined below may help. And don't forget, you can always discuss privacy and get others' input or ideas in the official [IPFS forums](https://discuss.ipfs.tech).

If your privacy concerns are less about the potential for monitoring and more about the visibility of the IPFS-provided content itself, this can be mitigated simply by encrypting the content before adding it to the IPFS network. While traffic involving the encrypted content could still be tracked, the _data_ represented by encrypted content's CIDs remains unreadable by anyone without the ability to decrypt it.

:::warning Encryption isn't bulletproof
While today's encryption might seem bulletproof _right now_, there is no guarantee that it won't be broken at some point in the future. Future breakthroughs in computing might allow going back and decrypting older content that's been put on a public network, such as IPFS. If you want to guard against this potential attack vector, using IPFS hybrid-private networks — in which nodes sit behind connection gates that check request ACLs before giving a node a request — is a potential design direction. For more details, [this article from Pinata](https://medium.com/pinata/dedicated-ipfs-networks-c692d53f938d) may be helpful.
:::

## Control what you share

By default, an IPFS node announces to the rest of the network that it is willing to share every CID in its cache (in other words, _reproviding_ content that it's retrieved from other nodes), as well as CIDs that you've explicitly pinned or added to MFS to make them consistently available. If you'd like to disable this behavior, you can do so in the [reprovider settings](https://github.com/ipfs/kubo/blob/master/docs/config.md#reprovider) of your node's config file.

Changing your reprovider settings to "pinned" or "roots" will keep your node from announcing itself as a provider of non-pinned CIDs that are in your cache — so you can still use pinning to provide other nodes with content that you care about and want to make sure continues to be available over IPFS.

## Use a public gateway

Using a public [IPFS gateway](../how-to/address-ipfs-on-web.md#http-gateways) is one way to request IPFS-hosted content without revealing any information about your local node — because you aren't using a local node! However, this method does keep you from enjoying all the benefits of being a full participant in the IPFS network.

Public IPFS gateways are primarily intended as a "bridge" between the legacy web and the distributed web; they allow ordinary web clients to request IPFS-hosted content via HTTP. That's great for backward compatibility, but if you only request content through public gateways rather than directly over IPFS, you're not actually part of the IPFS network; that gateway is the network participant acting on your behalf. It's also important to remember that gateway operators could be collecting their own private metrics, which could include tracking the IP addresses that use a gateway and correlating those with what CIDs are requested. Additionally, content requested through a gateway is visible on the Amino DHT, although it's not possible to know _who_ requested it.

## Use Tor

If you're familiar with [Tor](https://www.torproject.org/) and comfortable with the command line, you may wish to try running IPFS over Tor transport by configuring your node's settings.

If you're a developer building on IPFS, it's worth noting that the global IPFS community continues to experiment with using Tor transport — see [this example from e-commerce organization OpenBazaar](https://github.com/OpenBazaar/go-onion-transport) — and there may already be an open-source codebase to help your project achieve this.

## Create a private network

[Private IPFS networks](https://github.com/ipfs/kubo/blob/release-v0.9.0/docs/experimental-features.md#private-networks) provide full protection from public monitoring but can lack the scale benefits provided by the public IPFS network. A private network operates identically to the public one, but with one critical difference: it can only be accessed by nodes that have been given access, and it will only ever scale to those nodes. This means that the benefits of the public IPFS network's massive scale, such as geographic resiliency and speedy retrieval of high-demand content, won't be realized unless the private network is explicitly designed and scaled with this in mind.

Running a private network can be a great option for corporate implementations of IPFS — for one example, see [this case study on Morpheus.Network](../case-studies/morpheus.md) — because the network's topology can be specified and built exactly as desired.