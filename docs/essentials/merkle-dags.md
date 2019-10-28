---
title: Merkle DAGs
---

# Merkle Distributed Acyclic Graphs (DAGs)

A _Direct Acyclic Graph_ (DAG)is a type of graph in which edges have direction and cycles are not allowed. For example, a linked list like _A→B→C_ is an instance of a DAG where _A_ references _B_ and so on. We say that _B_ is _a child_ or _a descendant of A_, and that _node A has a link to B_. Conversely _A_ is a _parent of B_. We call nodes that are not children to any other node in the DAG _root nodes_.

A Merkle-DAG is a DAG where each node has an identifier and this is the result of hashing the node’s contents — any opaque payload carried by the node and the list of identifiers of its children — using a cryptographic hash function like SHA256. This brings some important considerations:

1. Merkle-DAGs can only be constructed from the leaves, that is, from nodes without children. Parents are added after children because the children’s identifiers must be computed in advance to be able to link them.
1. every node in a Merkle-DAG is the root of a (sub)Merkle-DAG itself, and this subgraph is _contained_ in the parent DAG[9].
1. Merkle-DAG nodes are _immutable_. Any change in a node would alter its identifier and thus affect all the ascendants in the DAG, essentially creating a different DAG. Take a look at [this helpful illustration using bananas](https://media.consensys.net/ever-wonder-how-merkle-trees-work-c2f8b7100ed3) from our friends at Consensys.

Identifying a data object (like a Merkle-DAG node) by the value of its hash is referred to as _content addressing_. Thus, we name the node identifier as _Content Identifier_ or CID.

For example, the previous linked list, assuming that the payload of eachnode is just the CID of its descendant would be: _A=Hash(B)→B=Hash(C)→C=Hash(∅)_. The properties of the hash function ensure thatno cycles can exist when creating Merkle-DAGs[10].

Merkle-DAGs are _self-verified_ structures. The CID of a node is univocally linked to the contents of its payload and those of all its descendants. Thus two nodes with the same CID univocally represent exactly the same DAG. This will be a key property to efficiently sync Merkle-CRDTs without having to copy the full DAG, as exploited by systems like IPFS. Merkle-DAGs are very widely used. Source control systems like Git [11] and others [6] use them to efficiently store the repository history, in away that enables de-duplicating the objects and detecting conflicts between branches.

_Excerpted from Markle-CRDT draft paper by @hsanjuan, @haadcode, and @pgte. Available: https://hector.link/presentations/merkle-crdts/merkle-crdts.pdf_

### Footnotes

[6] Merkle-DAGs are similar to Merkle Trees [20] but there are no balance requirements and every node can carry a payload. In DAGs, several branches can re-converge or, in other words, a node can have several parents.

[10] Hash functions are one way functions. Creating a cycle should then be impossibly difficult, unless some weakness is discovered and exploited.
