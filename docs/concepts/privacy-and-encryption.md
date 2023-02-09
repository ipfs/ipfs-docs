---
title: Privacy and encryption
description: Learn about user privacy in IPFS and why it does not come with a built-in privacy layer or encryption.
sidebarDepth: 2
---

# Privacy and encryption

As a protocol for peer-to-peer data storage and delivery, IPFS is a _public network_: Nodes participating in the network store data affiliated with globally consistent [content addresses](content-addressing.md) (CIDs) and advertise that they have those CIDs available for other nodes to use through publicly viewable [distributed hash tables](dht.md) (DHTs). This paradigm is one of IPFS's core strengths — at its most basic, it's essentially a globally distributed "server" of the network's total available data, referenceable both by the content itself (those CIDs) and by the participants (the nodes) who have or want the content.

What this does mean, however, is that IPFS itself isn't explicitly protecting knowledge _about_ CIDs and the nodes that provide or retrieve them. This isn't something unique to the distributed web; on both the d-web and the legacy web, traffic and other metadata can be monitored in ways that can infer a lot about a network and its users. Some key details on this are outlined below, but in short: While IPFS traffic _between nodes_ is encrypted, the metadata those nodes publish to the DHT is public. Nodes announce a variety of information essential to the DHT's function — including their unique node identifiers (PeerIDs) and the CIDs of data that they're providing — and because of this, information about which nodes are retrieving and/or reproviding which CIDs is publicly available.

So, why doesn't the IPFS protocol itself explicitly have a _privacy layer_ built-in? This is in line with key principles of the protocol's highly modular design — after all, different uses of IPFS over its lifetime may call for different approaches to privacy. Explicitly implementing an approach to privacy within the IPFS core could "box in" future builders due to a lack of modularity, flexibility, and future-proofing. On the other hand, freeing those building on IPFS to use the best privacy approach for the situation at hand ensures IPFS is useful to as many as possible.

If you're worried about the implications of this, it might be worth taking additional measures such as disabling reproviding, encrypting sensitive content, or even running a private IPFS network if that's appropriate for you.

::: tip
While IPFS traffic _between nodes_ is encrypted, the essential metadata that nodes publish to the DHT — including their unique node identifiers (PeerIDs) and the CIDs of data that they're providing — is public. If you're worried about the implications of this for your personal use case, it's worth taking additional measures.
:::

## What's public on IPFS

All traffic on IPFS is public, including the contents of files themselves, unless they're [encrypted](#encryption). For purposes of understanding IPFS privacy, this may be easiest to think about in two halves: content identifiers (CIDs) and IPFS nodes themselves.

### Content identifiers

Because IPFS uses [content addressing](content-addressing.md) rather than the legacy web's method of location addressing, each piece of data stored in the IPFS network gets its own unique content identifier (CID). Copies of the data associated with that CID can be stored in any number of locations worldwide on any number of participating IPFS nodes. To make retrieving the data associated with a particular CID efficient and robust, IPFS uses a [distributed hash table](dht.md) (DHT) to keep track of what's stored where. When you use IPFS to retrieve a particular CID, your node queries the DHT to find the closest nodes to you with that item — and by default also agrees to re-provide that CID to other nodes for a limited time until periodic "garbage collection" clears your cache of content you haven't used in a while. You can also "pin" CIDs that you want to make sure are never garbage-collected — either explicitly using IPFS's low-level `pin` API or implicitly using the [Mutable File System](file-systems.md#mutable-file-system-mfs) (MFS) — which also means you're acting as a permanent reprovider of that data.

This is one of the advantages of IPFS over traditional legacy web hosting. It means retrieving files — especially popular ones that exist on lots of nodes in the network — can be faster and more bandwidth-efficient. However, it's important to note that those DHT queries happen in public. Because of this, it's possible that third parties could be monitoring this traffic to determine what CIDs are being requested, when, and by whom. As IPFS continues to grow in popularity, it's more likely that such monitoring will exist.

### Node identifiability

The other half of the equation when considering the prospect of IPFS traffic monitoring is that nodes' unique identifiers are themselves public. Just like with CIDs, every individual IPFS node has its own public identifier (known as a PeerID), such as `QmRGgYP1P5bjgapLaShMVhGMSwGN9SfYG3CM2TfhpJ3igE`.

While a long string of letters and numbers may not be a "Johnny Appleseed" level of human-readable specificity, your PeerID is still a long-lived, unique identifier for your node. Keep in mind that it's possible to do a DHT lookup on your PeerID and, particularly if your node is regularly running from the same location (like your home), find your IP address. (It's possible to [reset your PeerID](../reference/kubo/cli.md#ipfs-key-rotate) if necessary, but similarly to changing your user ID on legacy web apps and services, is likely to involve extra effort.) Additionally, longer-term monitoring of the public IPFS network could yield information about what CIDs your node is requesting and/or reproviding and when.


### Encryption

There are two types of encryption in a network: _transport-encryption_ and _content-encryption_.

Transport-encryption is used when sending data between two parties. Albert encrypts a file and sends it to Laika, who then decrypts it once it has been received. This stops a third party from viewing the data while it is moving from one place to another.

![A rough diagram showing how transport-encryption works.](./images/transport-encryption.png)

Content encryption is used to secure data until someone needs to access it. Albert creates a spreadsheet for his monthly budget and saves it with a password. When Albert needs to access it again, he must enter his password to decrypt the file. Without the password, Laika cannot view the file.

![A rough diagram showing how content-encryption works.](./images/content-encryption.png)

IPFS uses transport-encryption but not content encryption. This means that your data is secure when being sent from one IPFS node to another. However, anyone can download and view that data if they have the CID. The lack of content encryption is an intentional decision. Instead of forcing you to use a particular encryption protocol, you are free to choose whichever method is best for your project. This modular design keeps IPFS lightweight and free of _vendor lock-in_.

### Encryption-based projects using IPFS

- [Ceramic](https://ceramic.network/)
- [Fission.codes](https://fission.codes/)
- [Fleek](../case-studies/fleek.md)
- [Lit Protocol](https://litprotocol.com/)
- [OrbitDB](https://github.com/orbitdb)
- [Peergos](https://peergos.org/)
- [Textile](https://www.textile.io/)