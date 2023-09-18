---
title: IPSF implementations explained
description: Learn about the principles that define what an IPFS implementation is.
---

# IPFS implementations explained

Software, written in any programming language, is considered to be an _IPFS implementation_ if it adheres to the core principles listed below. However, there are characteritics that  characteristics that an IPFS implementation _may_ have, but are not strictly _required_. IPFS principles are broad by design because, like HTTP, IPFS supports an open-ended set of use cases and is adaptable to a broad array of operating conditions. Some implementations are optimized for specific use cases or devices, or use different subsystems to handle content-addressed data. There are multiple specifications in IPFS for handling content-addressed data, and not all implementations implement them.

## Core principles

IPFS implementations must:

- Support addressability using <VueCustomTooltip label="An address used to point to data in IPFS, based on the content itself, as opposed to the location." underlined multiline is-medium>Content IDentifiers (CIDs)</VueCustomTooltip>.
- Expose operations such as retrieval, provisioning, and indexing, on resources using CIDs. The operations that an implementation may supportare an open-ended, but this requirement covers any operation which the implementation exposes to other IPFS implementations.
- Verify that the CIDs it resolves match the resources addressed, at least when the resources' bytes are accessible. Implementations may relax this requirement in controlled environments in which it is possible to ascertain that verification has happened elsewhere in a trusted part of the system.

## Recommended principles

The following principles are not strictly required. However, it is recommended that all IPFS implementations should do the following, for the reasons described:

- Name all the important resources exposed using CIDs. Consider anything that another agent might legitimately wish to access as being in scope, and err on the side of inclusion.
- Expose the logical units of data that structure a resource (eg. a CBOR document, a file or directory, a branch of a B-tree search index) using CIDs.
- Support incremental verifiability, notably so that it may process content of arbitrary sizes.
- Should not rely on any one transport layer. The transport layer cannot dictate or constrain the way in which CIDs map to content.

## Further resources

- [List of IPFS implementations](./ipfs-implementations.md)
- [IPFS Standards website: IPFS Principles spec](https://specs.ipfs.tech/architecture/principles/#ipfs-implementation-requirements)