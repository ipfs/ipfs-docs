# The IPFS Glossary

<a href="#A">A</a> | <a href="#B">B</a> | <a href="#C">C</a> | <a href="#D">D</a> | <a href="#E">E</a> | <a href="#F">F</a> | <a href="#G">G</a> | <a href="#H">H</a> | <a href="#I">I</a> | <a href="#J">J</a> | <a href="#K">K</a> | <a href="#L">L</a> | <a href="#M">M</a> | <a href="#N">N</a> | <a href="#O">O</a> | <a href="#P">P</a> | <a href="#Q">Q</a> | <a href="#R">R</a> | <a href="#S">S</a> | <a href="#T">T</a> | <a href="#U">U</a> | <a href="#V">V</a> | <a href="#W">W</a> | <a href="#X">X</a> | <a href="#Y">Y</a> | <a href="#Z">Z</a>

<h2 id="A">A</h2>
<p id="Announcing"><b>Announcing</b><br>
Announcing is a function of the IPFS networking layer in <a href="#libp2p">libp2p</a>, wherein a peer can tell other peers that it has data blocks available.</p>

<h2 id="B">B</h2>
<p id="Bitswap"><b>Bitswap</b><br>
Bitswap is IPFS’s central block exchange protocol. Its purpose is to request blocks from and send blocks to other peers in the network. <a href="https://github.com/ipfs/specs/blob/master/BITSWAP.md">More about Bitswap</a></p>
<br>

<b>BitTorrent</b><br>
BitTorrent is a communication protocol for peer-to-peer file sharing which is used to distribute data and electronic files over the Internet. Also the first file sharing application to use the protocol. <a href="https://en.wikipedia.org/wiki/BitTorrent">More about BitTorrent protocol</a> and <a href="https://www.bittorrent.com/">BitTorrent app</a>
<br><br>

<b>Blockchain</b><br>
A Blockchain is a growing list of records, known as blocks, that are linked using cryptography. Each block contains a cryptographic hash of the previous block, a timestamp, and transaction data (generally represented as a Merkle tree). <a href="https://en.wikipedia.org/wiki/Blockchain">More about Blockchain</a>
<br><br>

<b>Block</b><br>
A Block is a binary blob of data, identified by a <a href="#CID">CID</a>.
<br><br>

<b>Bootstrap Node</b><br>
A Bootstrap Node is a trusted peer on the IPFS network through which an IPFS node learns about other peers on the network. <a href="https://docs-beta.ipfs.io/how-to/modify-bootstrap-list/">More about Bootstrapping</a>
<br>

<h2 id="C">C</h2>
<b>CBOR</b><br>
The Concise Binary Object Representation (CBOR) is a data format based on <a href="#JSON">JSON</a>, featuring small code and message size, and extensibility. Used within <a href="#IPLD">IPLD</a>. <a href="http://cbor.io/">More about CBOR</a>
<br><br>

<p id="CID"><b>CID</b><br>
A Content Identifier (CID) is a self-describing content-addressed label used to point to the data stored in IPFS. It is the core identifier used for IPFS and <a href="#IPLD">IPLD</a>. <a href="https://docs-beta.ipfs.io/concepts/content-addressing/">More about CID</a></p>
<br>

<b>CID v0</b><br>
Version 0 (v0) of the IPFS content identifier. This CID is 46 characters in length, starting with "Qm". Uses a base 58-encoded multihash, very simple but much less flexible than newer CIDs. <a href="https://docs-beta.ipfs.io/concepts/content-addressing/#version-0-v0">More about CID v0</a>
<br><br>

<b>CID v1</b><br>
Version 1 (v1) of the IPFS content identifier. This CID version contains some leading identifiers which provide for forward-compatibility. Able to support different formats for future versions of CID. <a href="https://docs-beta.ipfs.io/concepts/content-addressing/#version-1-v1">More about CID v1</a>
<br><br>

<b>CRDT</b><br>
A Conflict-Free Replicated Data Type (CRDT) is a type of specially-designed data structure used to achieve strong eventual consistency (SEC) and monotonicity (absence of rollbacks). <a href="https://github.com/ipfs/research-CRDT">More about CRDT</a>
<br>

<h2 id="D">D</h2>
<p id="Daemon"><b>Daemon</b><br>
A Daemon is a computer program that typically runs in the background. The IPFS daemon is how you take your node online to the IPFS network. <a href="https://docs-beta.ipfs.io/how-to/command-line-quick-start/#take-your-node-online">More about IPFS Daemon</a></p>
<br>

<b>DAG</b><br>
A Directed Acyclic Graph (DAG) is a computer science data structure, adapted for use with versioned file systems, blockchains, and for modeling many different kinds of information. <a href="https://en.wikipedia.org/wiki/Directed_acyclic_graph">More about DAG</a>
<br><br>

<b>DataStore</b><br>
The Datastore is the on-disk storage system used by an IPFS node. Configuration parameters control the location, size, construction, and operation of the datastore. <a href="https://github.com/ipfs/go-ipfs/blob/master/docs/config.md#datastore">More about Datastore</a>
<br><br>

<b>DHT</b><br>
A Distributed Hash Table (DHT) is a distributed key-value store where keys are cryptographic hashes. In IPFS, each peer is responsible for a subset of the IPFS DHT. <a href="https://docs-beta.ipfs.io/concepts/dht/">More about DHTs</a>
<br><br>

<p id="Dialing"><b>Dialing</b><br>
Diaing is a function of the IPFS networking layer in <a href="#libp2p">libp2p</a>, wherein a connection is opened to another peer. Together, an implementation of dialing and <a href="#Listening">listening</a> forms a <a href="#Transport">transport</a>.</p>
<br>

<b>DNSLink</b><br>
DNSLink is a protocol to link content and services directly from DNS. A DNSLink address looks like an IPNS address, but it uses a domain name in place of a hashed public key, like /ipns/mydomain.org <a href="https://dnslink.io/">More about DNSLink</a>
<br><br>

<b>DWeb</b><br>
The Decentralized Web (DWeb) looks like today's World Wide Web, but it is built with new underlying technologies that support decentralization. It is much harder for anyone entity to take down any single webpage, website, or service, either by accident or on purpose.
<br>

<h2 id="E">E</h2>

<h2 id="F">F</h2>
<b>Filestore</b><br>
The Filestore is a datastore that stores the <a href="#UnixFS">UnixFS</a> data components of blocks as files on the file system, instead of as blocks. This allows adding content to IPFS without duplicating the content in the IPFS datastore.
<br>

<h2 id="G">G</h2>
<b>Gateway</b><br>
An IPFS Gateway acts as a bridge between traditional web browsers and IPFS. Through the gateway, users can browse files and websites stored in IPFS as if they were stored on a traditional web server. <a href="https://github.com/ipfs/go-ipfs/blob/master/docs/gateway.md">More about Gateway</a>
<br><br>

<b>Garbage Collection</b><br>
Garbage Collection (GC) is the process within each IPFS node of clearing out cached files and blocks. Nodes need to clear out previously cached resources to make room for new resources. <a href="#Pinning">Pinned resources</a> are never deleted.
<br><br>

<b>Graph</b><br>
In computer science, a Graph is an abstract data type from the field of graph theory within mathematics. The <a href="#MerkleDAG">Merkle-DAG</a> used in IPFS is a specialized graph.
<br><br>

<b>Graphsync</b><br>
Graphsync is an alternative content replication protocol under discussion, similar to <a href="#Bitswap">Bitswap</a>. Like Bitswap, the primary job is to synchronize data blocks across peers. <a href="https://github.com/ipld/specs/blob/master/block-layer/graphsync/graphsync.md">More about Graphsync</a>
<br>

<h2 id="H">H</h2>
<b>Hash</b><br>
A Cryptographic Hash is a function that takes some arbitrary input (content) and returns a fixed-length value. The exact same input data will always generate the same hash as output. There are numerous hash algorithms. <a href="https://docs-beta.ipfs.io/concepts/hashing/">More about Hash</a>
<br>

<h2 id="I">I</h2>
<b>Information Space</b><br>
Information Space is the set of concepts, and relations among them, held by an information system. This can be thought of as a conceptual framework or tool for studying how knowledge and information are codified, abstracted, and diffused through a social system. <a href="https://en.wikipedia.org/wiki/Information_space">More about Information Space</a>
<br><br>

<p id="IPLD"><b>IPLD</b><br>
The InterPlanetary Linked Data (IPLD) model is a set of specifications in support of decentralized data structures for the content-addressable web. Key features are interoperable protocols, easily upgradeable, backwards compatible. A single namespace for all hash-based protocols. <a href="https://ipld.io/">More about IPLD</a></p>
<br>

<b>IPNS</b><br>
The InterPlanetary Name System (IPNS) is a system for creating and updating mutable links to IPFS content. IPNS allows for publishing the latest version of any IPFS content, even though the underlying IPFS hash has changed. <a href="https://docs-beta.ipfs.io/concepts/ipns/">More about IPNS</a>
<br>

<h2 id="J">J</h2>
<p id="JSON"><b>JSON</b><br>
JavaScript Object Notation (JSON) is a lightweight data-interchange format. JSON is a text format that is completely language independent, human-readable, and easy to parse and generate. <a href="https://www.json.org/">More about JSON</a></p>

<h2 id="K">K</h2>

<h2 id="L">L</h2>
<p id="libp2p"><b>libp2p</b><br>
The libp2p project is a modular system of protocols, specifications, and libraries that enable the development of peer-to-peer network applications. It is an essential component of IPFS. <a href="https://libp2p.io/">More about libp2p</a></p>
<br>

<p id="Listening"><b>Listening</b><br>
Listening is a function of the IPFS networking layer in <a href="#libp2p">libp2p</a>, wherein an incoming connection is accepted from another peer. Together, an implementation of <a href="#Dialing">dialing</a> and listening forms a <a href="#Transport">transport</a>.</p>

<h2 id="M">M</h2>
<p id="MerkleDAG"><b>Merkle-DAG</b><br>
The Merkle-DAG is a computer science data structure used at the core of IPFS files/blocks storage. Merkle-DAGs create a hash to their content, known as a <a href="#CID">Content Identifier</a>. <a href="https://docs-beta.ipfs.io/concepts/merkle-dag/">More about Merkle-DAG</a></p>
<br>

<b>Merkle Forest</b><br>
Merkle Forest is a phrase coined to describe the distributed, authenticated, hash-linked data structures (Merkle trees) running technologies like Bitcoin, Ethereum, git, and BitTorrent. In this way, IPFS is a forest of linked Merkle trees. <a href="https://www.youtube.com/watch?v=Bqs_LzBjQyk">More about Merkle Forest</a>
<br><br>

<b>Merkle Tree</b><br>
A Merkle Tree is a specific type of hash tree used in cryptography and computer science, allowing efficient and secure verification of the contents of large data structures. Named after Ralph Merkle who patented it in 1979. <a href="https://en.wikipedia.org/wiki/Merkle_tree">More about Merkle Tree</a>
<br><br>

<b>MFS</b><br>
The Mutable File System (MFS) is a tool built into IPFS that lets you treat files like a normal name-based filesystem. You may add, edit, and remove MFS files while all link updates and hashes are taken care of for you. <a href="https://docs-beta.ipfs.io/concepts/file-systems/#mutable-file-system-mfs">More about MFS</a>
<br><br>

<b>Multiformats</b><br>
The Multiformats project is a collection of protocols which aim to future-proof systems, today. A key element is enhancing format values with self-description. This allows for interoperability, protocol agility, and promotes extensibility. <a href="https://multiformats.io/">More about Multiformats</a> and <a href="https://multiformats.io/multihash/">Multihash</a>
<br>

<h2 id="N">N</h2>
<p id="Node"><b>Node</b><br>
A Node or <a href="#Peer">peer</a> is the IPFS program that you run on your local computer to store/cache files and then connect to the IPFS network (by running the <a href="#Daemon">daemon</a>). <a href="https://docs-beta.ipfs.io/how-to/command-line-quick-start/#take-your-node-online">More about Node</a></p>

<h2 id="O">O</h2>

<h2 id="P">P</h2>
<b>Path/Address</b><br>
A Path/Address is the method within IPFS of referencing content on the web. Addresses for content are path-like; they are components separated by slashes. <a href="https://docs-beta.ipfs.io/how-to/address-ipfs-on-web/">More about Path/Address</a>
<br><br>

<p id="Peer"><b>Peer</b><br>
In system architecture, a Peer is an equal player in the peer-to-peer model of decentralization, as opposed to the client-server model of centralization. <a href="#Node">See also Peer as Node</a>
</p>
<br>

<b>Peer ID</b><br>
A Peer ID is how each unique IPFS node is identified on the network. The Peer ID is created when the IPFS node is initialized, and is essentially a cryptographic hash of the node's public key. <a href="https://docs-beta.ipfs.io/concepts/dht/#peer-ids">More about Peer ID</a>
<br><br>

<p id="Pinning"><b>Pinning</b><br>
Pinning is the method of telling an IPFS node that particular data is important and so it will never be removed from that node's cache. <a href="https://docs-beta.ipfs.io/concepts/persistence/">More about Pinning</a></p>
<br>

<b>Pubsub</b><br>
Publish-Subscribe (Pubsub) is an experimental feature in IPFS. Publishers send messages classified by topic or content and Subscribers receive only the messages they are interested in. <a href="https://blog.ipfs.io/25-pubsub/">More about Pubsub</a>
<br>

<h2 id="Q">Q</h2>

<h2 id="R">R</h2>
<b>Relay</b><br>
The Relay is a means to establish connectivity between libp2p nodes (e.g. IPFS nodes) that wouldn't otherwise be able to establish a direct connection to each other. This may be due to nodes that are behind NAT, reverse proxies, firewalls, etc. <a href="https://github.com/libp2p/specs/tree/master/relay">More about Relay</a>
<br><br>

<b>Repo</b>
The Repository (Repo) is a directory where IPFS stores all its settings and internal data. It is created with the `ipfs init` command. <a href="https://docs-beta.ipfs.io/how-to/command-line-quick-start/#install-ipfs">More about Repo</a>
<br>

<h2 id="S">S</h2>
<b>SFS</b><br>
A Self-certifying File System (SFS) is a distributed file system that doesn't require special permissions for data exchange. It is self-certifying because data served to a client is authenticated by the file name (which is signed by the server). <a href="https://en.wikipedia.org/wiki/Self-certifying_File_System">More about SFS</a>
<br><br>

<b>Signing (Cryptographic)</b><br>
Signing of data cryptographically allows for trusting of data from untrusted sources. Cryptographically signed values can be passed through an untrusted channel and any tampering of the data can be detected. <a href="https://en.wikipedia.org/wiki/Digital_signature">More about Digital signature</a>
<br><br>

<b>Swarm</b><br>
The Swarm is a term for the network of IPFS peers with which your local node has connections. Swarm addresses are addresses that your local node will listen on for connections from other IPFS peers. <a href="https://docs-beta.ipfs.io/how-to/configure-node/#addresses">More about Swarm addresses</a>
<br>

<h2 id="T">T</h2>
<p id="Transport"><b>Transport</b><br>
In <a href="#libp2p">libp2p</a>, transport refers to the technology that lets us move data from one machine to another. This may be a TCP network, a websocket connection in a browser, or anything else capable of implementing the transport interface.</p>

<h2 id="U">U</h2>
<p id="UnixFS"><b>UnixFS</b><br>
The Unix File System (UnixFS) is the data format used to represent files and all their links and metadata in IPFS, and is loosely based on how files work in Unix. Adding a file to IPFS creates a block (or a tree of blocks) in the UnixFS format. <a href="https://docs-beta.ipfs.io/concepts/file-systems/#unix-file-system-unixfs">More about UnixFS</a></p>

<h2 id="V">V</h2>

<h2 id="W">W</h2>

<h2 id="X">X</h2>

<h2 id="Y">Y</h2>

<h2 id="Z">Z</h2>

