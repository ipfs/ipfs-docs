---
title: Content addressing data sets
description: A comparison of UnixFS, iroh collections, and DASL/MASL for content addressing data sets like directories of files, with a focus on overhead, determinism, subsetting, and ecosystem support.
---

# Content addressing data sets

This guide compares three binary formats for content addressing collections of files organised in a directory tree structure:

- [UnixFS](https://specs.ipfs.tech/unixfs/)
- [iroh collections](https://docs.iroh.computer/protocols/blobs#collections)
- [DASL](https://dasl.ing) along with its metadata system [MASL](https://dasl.ing/masl.html)

## Merkle DAGs: the common foundation

Before comparing formats, it helps to understand what they all share: every approach effectively constructs a [_Merkle DAG_](../concepts/merkle-dag.md), a data structure which allows you to derive a small verification identifier like a CID to represents a collection of data.

The formats below vary in how they construct the Merkle DAG and the trade-offs they make, but in essence they all allow you to produce a CID that represents a collection of files, such that you can easily verify two properties:

- **Inclusion** in the collection: a file (`cat.jpg`) is in the collection addressed by the CID (`bafy...`).
- **Integrity** of the collection as a whole: none of the contents of the collection have been modified since the CID was generated.

This matters for build outputs, software distributions, large datasets, website archives — any case where you need to verify that a collection of files hasn't changed.

A naive approach like hashing a tarball is fragile: tar archives encode metadata (timestamps, permissions, ordering) that vary between machines, producing different hashes for identical file contents. It's also impractical for large datasets where you cannot afford to store two copies of the data.

Content addressing solves this, but the choice of format has real consequences, particularly for overhead, determinism, language support and interoperability within an ecosystem.

These differences compound as dataset size grows: what's negligible at megabyte scale —a few extra bytes of framing, an extra round of parsing per block— becomes a meaningful cost at terabyte scale across millions of files.

## Subsetting: files vs folders

For large directories, you rarely want the whole thing. You might need one component's assets from a monorepo build, a single day's logs from an archive, or one region's data from a dataset. The ability to fetch a verified subset — and know it's authentic without downloading everything else — is important.

**UnixFS** has a structural advantage here: because directories are first-class DAG nodes, you can address and fetch an entire subdirectory by its CID. The directory node links to all its children, and the directory's CID verifies the whole subtree. This makes UnixFS well suited to collections where the folder hierarchy carries meaning.

**iroh collections and MASL** are flat: they map paths to content hashes with no intermediate directory nodes. You can fetch individual files by their hash, but there is no native concept of "give me everything under this folder" — you would need to filter the path list client-side and fetch each matching file individually. For use cases where subsetting means "pick specific files," this works fine. For use cases where subsetting means "give me this folder and everything in it," UnixFS is more natural.

## UnixFS (IPFS)

[UnixFS](https://specs.ipfs.tech/unixfs/) is the original IPFS approach to representing files and directories as content-addressed DAGs. It uses a two-layer encoding: an outer `dag-pb` block format (the general-purpose IPFS block codec) wrapping an inner UnixFS protobuf message that carries file/directory-specific semantics.

### How files are represented

Small files (under the chunk size, typically 256 KiB or 1 MiB) can be stored as a single **raw leaf block** — just the bytes, no protobuf wrapping, identified by a CID. This is the most efficient case: zero structural overhead.

Larger files are split into chunks, each stored as a raw leaf block. These chunks are then linked together by a **file root node** — a `dag-pb` block containing a UnixFS message of type `File`. The root node's `Links` array holds one entry per chunk:

```text
File root (dag-pb + UnixFS)
├── Link: CID(chunk₁), Size: 262144
├── Link: CID(chunk₂), Size: 262144
├── Link: CID(chunk₃), Size: 262144
└── Link: CID(chunk₄), Size: 131072
```

Each link carries the chunk's CID and its byte size (`Tsize`). The UnixFS `Data` field in the root node also stores a `blocksizes` array — the unencoded size of each chunk — used for byte-range calculations. When chunks are **raw leaf blocks** (the modern default, indicated by a `raw` codec CID), seeking is straightforward: the `blocksizes` array lets you calculate which chunk contains a given byte offset, fetch just that chunk, and read directly from the raw bytes.

For very large files, the DAG can be multiple levels deep: intermediate nodes link to groups of chunks, and the root links to those intermediate nodes. This is typically a balanced tree (the default in Kubo), though the balancing strategy is not mandated by the spec.

### How directories are represented

A **directory node** is a `dag-pb` block with a UnixFS message of type `Directory`. Each child (file or subdirectory) is a named link:

```text
Directory (dag-pb + UnixFS)
├── Link: "components/" → CID(subdirectory node)
├── Link: "assets/"     → CID(subdirectory node)
└── Link: "index.html"  → CID(file root or raw leaf)
```

Each link carries a name (the filename or folder name), the child's CID, and a cumulative `Tsize` (the total bytes reachable through that link, including all descendants). This means a directory node is self-contained: it tells you everything you need to list the directory and navigate into children.

When a directory contains too many entries to fit in a single block (typically above 256 KiB–1 MiB), UnixFS switches to a **HAMT-sharded directory** — a hash-array-mapped trie spread across multiple blocks. The root is a UnixFS node of type `HAMTShard`, and child nodes are distributed across buckets by hashing the filename. This keeps individual blocks small but adds traversal depth: looking up a file by name requires walking the trie.

### Subsetting files and folders

UnixFS models directories as DAG nodes with their own CIDs. This means every folder is independently addressable and verifiable. For a directory structured as:

```text
project/
├── components/
│   ├── Header.tsx
│   └── Footer.tsx
├── assets/
│   ├── style.css
│   └── logo.png
└── index.html
```

You can fetch just `components/` by its CID and get the entire subtree — both files and the directory structure — verified by a single hash. This is useful whenever the folder hierarchy carries meaning (by module, by date, by region, etc.).

Large individual files also benefit: because UnixFS splits files into a DAG of chunks, you can fetch byte ranges within a file without downloading the whole thing. For multi-gigabyte files, this enables partial reads — e.g. reading a specific section of a large log or data file.

### Tradeoffs

- **dag-pb envelope overhead.** Each block is wrapped in a `dag-pb` outer protobuf (`PBNode`) containing an inner UnixFS protobuf message. With 1 MiB chunks and raw leaves, the overhead comes from two sources: multi-block file roots (~44 bytes per chunk for link CIDs and sizes) and directory entries (~60–80 bytes per file depending on filename length). For a typical 1 TiB dataset of 100K files averaging 10 MiB each, total overhead is roughly 50 MiB (~0.005%). Only pathological cases — millions of tiny files — push overhead toward 0.5–1%, because each file still needs a directory entry even if it fits in a single raw block. HAMT sharding adds roughly 10–20% on top of directory overhead when directories grow large.
- **Double-protobuf parsing cost.** Beyond the storage overhead, the nested encoding means every block requires two rounds of protobuf decoding — first the outer `PBNode`, then the inner UnixFS `Data` message. When traversing a large DAG (e.g. resolving a deeply nested path or iterating a sharded directory), this double-decode cost is paid at every node, adding up to meaningful CPU overhead for large-scale reads.
- **HAMT sharding.** Large directories automatically switch to hash-array-mapped-trie sharding, which adds traversal complexity and means the same logical directory can have different structures depending on size.
- **Optionality over determinism.** UnixFS embraces optionality, meaning the same data can produce different CIDs depending on how the underlying Merkle DAG is constructed. Parameters like chunk size, chunking algorithm (fixed-size vs Rabin vs Buzhash), DAG balancing strategy (balanced vs trickle), max link count per node, and whether to use raw leaves or dag-pb leaves all affect the resulting CID. Two different tools ingesting the same directory with different defaults will produce different CIDs. [IPIP-499: UnixFS CID Profiles](https://github.com/ipfs/specs/pull/499) aims to solve this by standardising a single set of parameters — defining one canonical way to construct the DAG so that any conforming implementation produces the same CID for the same input. Until that lands, determinism requires all parties to agree on identical parameters out of band.
- **Deep DAG traversal.** Resolving a file means walking the directory DAG node by node — `a/b/c.csv` requires resolving `a`, then `b`, then the file, each a separate block fetch and decode. Nested directories and HAMT shards make the depth unpredictable.
- **Mature ecosystem.** UnixFS has the broadest tooling support and is the de facto standard for IPFS content addressing, with implementations in Go ([Kubo](https://github.com/ipfs/kubo)) and TypeScript ([Helia](https://github.com/ipfs/helia)).

## DASL, MASL, and DRISL

[DASL](https://dasl.ing) (Data Addressed Structures and Links) is a set of simple, standard primitives for working with content-addressed, linked data. Designed as a web-friendly, interoperable subset of IPFS and IPLD primitives, DASL is used in production by the AT Protocol ecosystem, including Bluesky.

**[DRISL](https://dasl.ing/drisl.html)** (Deterministic Representation for Interoperable Structures & Links) is a constrained CBOR application profile designed for deterministic serialization:

- Identical data always produces identical bytes (and therefore identical CIDs)
- Native CID support via CBOR Tag 42
- Strict constraints: string-only map keys, no indefinite-length arrays, restricted float representations
- Each CID refers to one complete, discrete CBOR object

**[MASL](https://dasl.ing/masl.html)** is a CBOR-based metadata system built on DRISL, designed for content-addressed and decentralized systems. It operates in two modes:

- **Single mode** (`src`): wraps one resource with metadata (content type, etc.)
- **Bundle mode** (`resources`): maps file paths to resource CIDs with per-file metadata forming a directory tree representation

MASL bundles are conceptually similar to iroh collections: a flat map of relative paths to content hashes, no directory hierarchy nodes. The key difference is MASL also carries per-resource metadata and uses CIDs rather than raw BLAKE3 hashes. The metadata is deliberately a set of HTTP headers, e.g.  `content-type`, `content-encoding` for maximal compatibility with the web. Like iroh collections, subsetting operates at the individual file level — there is no native subdirectory addressing.

Because DRISL and MASL build on CBOR — a widely supported serialization format with libraries in virtually every language — they likely have the widest potential for cross-language implementation. A [cross-implementation test suite](https://hyphacoop.github.io/dasl-testing/) tracks conformance across languages.

## iroh collections

An iroh `Collection` is a way to represent a directory of files as a single content hash, designed for efficient verification and distribution with [iroh-blobs](https://docs.iroh.computer/protocols/blobs). The format is simple by design: a flat list of `(String, blake3::Hash)` pairs. Filenames are mapped to 32-byte BLAKE3 content hashes. Directory structure is encoded in the name strings as relative paths (e.g. `"assets/style.css"`, `"js/app.js"`), keeping the format flat while representing arbitrary directory trees.

On the wire, a collection splits into two blobs:

### The metadata blob (`CollectionMeta`)

Serialized with [postcard]:

```ascii
┌──────────────────────────────┐
│ header: "CollectionV0."      │  13 bytes, version tag
├──────────────────────────────┤
│ names: Vec<String>           │  varint-prefixed length, then
│   "assets/style.css"         │  each string is varint-length
│   "js/app.js"                │  prefixed + raw UTF-8 bytes
│   "index.html"               │
└──────────────────────────────┘
```

No delimiters between strings — postcard uses length-prefixed encoding throughout (similar to protobuf, but without field tags, making it more compact).

### The root blob (`HashSeq`)

A sequence of 32-byte BLAKE3 hashes:

```ascii
┌─────────────────────────────────┐
│ hash(metadata blob)             │  32 bytes
│ hash("assets/style.css")        │  32 bytes
│ hash("js/app.js")               │  32 bytes
│ hash("index.html")              │  32 bytes
└─────────────────────────────────┘
```

The first entry is the hash of the metadata blob. The remaining entries correspond 1:1 with the names in the metadata.

### The collection hash and CIDs

The **BLAKE3 hash of the root blob** is the single hash that identifies the entire collection. Verifying this one hash verifies every **file name** and every **file's contents**.

```code
Collection Hash = blake3(root blob)
                = blake3(hash(meta) ‖ hash(file₁) ‖ hash(file₂) ‖ …)
```

These are standard BLAKE3 hashes, but they can be encoded as CIDs for interoperability with the broader content-addressed ecosystem. The [multicodec table](https://github.com/multiformats/multicodec/blob/master/table.csv) defines the necessary codes: hash function `blake3` (`0x1e`) and codec `blake3_hashseq` (`0x80`). This lets iroh collection hashes be referenced anywhere CIDs are used, without changing the underlying data.

### Characteristics

- **No metadata pollution.** Unlike tar/zip, there are no timestamps, permissions, or ownership fields. Two directories with identical file names and contents always produce the same hash, regardless of when or where they were produced.
- **Positional, tag-free encoding.** [Postcard] serializes fields in declaration order with no field numbers or type tags. The `"CollectionV0."` header serves like a [file signature](https://en.wikipedia.org/wiki/List_of_file_signatures) and allows evolution via versioning.
- **Compact.** The overhead per file is a varint-prefixed filename in the metadata blob and a 32-byte hash in the root blob.
- **Streaming verification.** The root blob is a hash sequence, so a verifier can check individual files incrementally as they arrive.
- **Ready-made distribution.** Collections can be distributed in a peer-to-peer fashion with iroh-blobs.
- **BLAKE3.** Fast (parallelizable, SIMD-accelerated), 256-bit digests, and adopted by the [BDASL](https://dasl.ing/bdasl.html) spec.
- **Rust only** The reference implementation is in Rust and there's an [open issue to add WebAssembly support](https://github.com/n0-computer/iroh-blobs/issues/90). The format is simple enough to implement in other languages — it's just postcard-encoded strings and a flat array of BLAKE3 hashes — but no other implementations exist yet.

## Comparison

| Criteria             | iroh collections                                                        | UnixFS                                   | MASL/DRISL                                                                            |
| -------------------- | ----------------------------------------------------------------------- | ---------------------------------------- | ------------------------------------------------------------------------------------- |
| Encoding             | Postcard (tag-free binary)                                              | Protobuf (dag-pb)                        | [CBOR (deterministic subset with support for CIDs)](https://dasl.ing/drisl.html)      |
| Hash                 | BLAKE3                                                                  | Configurable (SHA-256 default)           | SHA-256 (DASL-CIDs only)                                                              |
| Directory model      | Flat path→hash list                                                     | DAG with directory nodes + HAMT sharding | Flat path→CID map                                                                     |
| Overhead             | ~0% (names + hashes only)                                               | 0.005–1% (depends on file count/size)    | Minimal (CBOR framing)                                                                |
| Identifiers          | BLAKE3 hash (CID-encodable via `blake3` + `blake3_hashseq` multicodecs) | CID (self-describing)                    | CID (self-describing)                                                                 |
| File lookup          | O(1) offset from root                                                   | DAG traversal, depth varies              | O(1) key lookup from root                                                             |
| Subsetting           | Individual files only                                                   | Files and folders (subtree by CID)       | Individual files only                                                                 |
| Determinism          | By construction                                                         | Depends on DAG construction choices      | By construction (DRISL)                                                               |
| Implementations      | Rust only                                                               | Go, JavaScript, Rust                     | Wide See [cross-implementation test suite](https://hyphacoop.github.io/dasl-testing/) |
| IPFS Gateway support | No                                                                      | Yes                                      | Yes                                                                                   |
| Ecosystem            | iroh/n0                                                                 | IPFS (broad)                             | Multiple (AT Protocol, Bluesky, IPFS, and others)                                     |

[postcard]: https://github.com/jamesmunns/postcard
