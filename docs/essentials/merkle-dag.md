---
title: Merkle DAGs
---

# Merkle Distributed Acyclic Graphs (DAGs)

::: tip
If you're interested in how Merkle DAGs fit into how IPFS works with files in general, check out this video from IPFS Camp 2019! [Core Course: How IPFS Deals With Files](https://www.youtube.com/watch?v=Z5zNPwMDYGg)
:::

A Merkle DAG is a DAG where each node has an identifier and this is the result of hashing the node’s contents — any opaque payload carried by the node and the list of identifiers of its children — using a cryptographic hash function like SHA256. This brings some important considerations:

- Merkle DAGs can only be constructed from the leaves, that is, from nodes without children. Parents are added after children because the children’s identifiers must be computed in advance to be able to link them.
- Every node in a Merkle DAG is the root of a (sub)Merkle DAG itself, and this subgraph is _contained_ in the parent DAG.
- Merkle DAG nodes are _immutable_. Any change in a node would alter its identifier and thus affect all the ascendants in the DAG, essentially creating a different DAG. Take a look at [this helpful illustration using bananas](https://media.consensys.net/ever-wonder-how-merkle-trees-work-c2f8b7100ed3) from our friends at Consensys.

Merkle DAGs are similar to Merkle trees, but there are no balance requirements and every node can carry a payload. In DAGs, several branches can re-converge or, in other words, a node can have several parents.

Identifying a data object (like a Merkle DAG node) by the value of its hash is referred to as _content addressing_. Thus, we name the node identifier as [_Content Identifier_](/essentials/content-addressing/), or CID.

For example, the previous linked list, assuming that the payload of each node is just the CID of its descendant, would be: _A=Hash(B)→B=Hash(C)→C=Hash(∅)_. The properties of the hash function ensure that no cycles can exist when creating Merkle DAGs. (Note: Hash functions are one-way functions. Creating a cycle should then be impossibly difficult, unless some weakness is discovered and exploited.)

Merkle DAGs are _self-verified_ structures. The CID of a node is univocally linked to the contents of its payload and those of all its descendants. Thus two nodes with the same CID univocally represent exactly the same DAG. This will be a key property to efficiently sync Merkle-CRDTs without having to copy the full DAG, as exploited by systems like IPFS. Merkle DAGs are very widely used. Source control systems like git and others use them to efficiently store the repository history, in away that enables de-duplicating the objects and detecting conflicts between branches.

## Further resources

For more information, you may want to read the full [draft Merkle-CRDTs paper](https://hector.link/presentations/merkle-crdts/merkle-crdts.pdf) by [@hsanjuan](https://www.github.com/hsanuan), [@haadcode](https://www.github.com/haadcode), and [@pgte](https://www.github.com/pgte).
