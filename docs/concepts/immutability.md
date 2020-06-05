---
title: Immutability
sidebarDepth: 0
issueUrl: https://github.com/ipfs/docs/issues/386
description: Learn about the concept of data immutability and how it's critical to how IPFS works.
related:
  'IPFS Docs: Content addressing and CIDs': /concepts/content-addressing/
  'Video: How IPFS deals with files (IPFS Camp 2019)': https://www.youtube.com/watch?v=Z5zNPwMDYGg
  'Tutorial: How IPFS deals with files (IPFS Camp 2019)': https://github.com/ipfs/camp/tree/master/CORE_AND_ELECTIVE_COURSES/CORE_COURSE_A
  'Wikipedia: Content-addressable storage': https://en.wikipedia.org/wiki/Content-addressable_storage
---

# Immutability

This is my take on this subject, my main motivation for writing this is to have someone from IPFS polish it and include it with the rest of the docs, to be able to link it from Lotus. These are rough notes, not a coherent narrative but the salient concepts I'm particularly interested in.

I'm drawing from the following, especially because of the importance of having diagrams that help visualize information (change) flow:

- https://docs-beta.ipfs.io/concepts/merkle-dag/

- https://media.consensys.net/ever-wonder-how-merkle-trees-work-c2f8b7100ed3 (cited in the first)

This issue is actually about mutability, immutability itself is implied in the [content-addressed](https://docs-beta.ipfs.io/concepts/content-addressing/) system of CIDs. What we need to deal with is how to keep a mutable (relative) _state_ built from immutable (absolute) building blocks. This is for example what MFS does, but I would like to highlight the core mechanism which permeates any stack built on top of IPFS, be it a file system or the Filecoin VM.

As said a CID is an absolute pointer to content, absolute with respect to _time_, no matter when do we query it the value it reflects will always be the same. This is part of its architecture and cannot be changed, we will always need to add another layer of indirection of _relative_ pointers to sit on top of CIDs.

The example needed is the same as usual, a merkle DAG with any raw input that represents the state, what I need added is this relative pointer that will always sit on top of this hierarchy and, in contrast with CIDs, will never be replaced, we will only mutate its value: the CID it points to.

Please don't use this crappy diagram, the basic setup would be two blocks of content, strings `"hello"` and `"world"`, hashed into two leaf nodes with CIDs A and B, and its root node, CID C. On top of the root node we will have the relative pointer, which confusingly is many times also called the root but it needs a different name, for now let's call it the _state_ (S) pointer:

```
      +-----+
      |  S  |
      +-----+
         ↓
      +-----+
   +--|  C  |-+
   |  +-----+ |
   |          |
+-----+    +-----+
|  A  |    |  B  |
+-----+    +-----+
"hello"    "world"
```

When we change the content of, say, the string `"world"` of node B, by definition all the upstream path will change as well, in this case just the root C. This is already clearly explained in other topics of the documentation so it doesn't need much emphasis here, the important part is that there is actually _no_ change happening, because as said, the node with CID B will always refer to the same content, `"world"`, that will _never_ change. What we do really is to construct a _new_ DAG, it just so happens that if we only change the content of `"world"` for, say, `"IPFS"`, but leave the original `"hello"`, the node A will appear also in the new DAG. But this is not because we are "keeping" it, that would imply the location-addressed paradigm. In the content-addressed system, any time someone writes a block with `"hello"` it will _always_ need to use CID A, there is no choice implied, whereas with the location-addressed system if I need a new string that is very close to the old one, I might as well reuse the original buffer and just edit the small substring that represents the difference (the buffer is the location and in that case I chose to keep the original content, but could just as well have allocated a new buffer copying the string and actually having two places with the `"hello"` content).

Feel free to cut short the above explanation, the gist of it, and what is seen in the code, is that when the content changes we _flush_ the modifications, meaning each node tells the parent it has changed, all the way up to the root, generating a new CID for each new node. The state pointer will hold the new root CID that in itself has implied all the child CIDs with their new values.

```
                  +-----+
         +--------|  S  |
         |        +-----+
         ↓
      +-----+                 +-----+
   +--|  E  |-+            +--|  C  |-+
   |  +-----+ |            |  +-----+ |
   |          |            |          |
+-----+    +-----+      +-----+    +-----+
|  A  |    |  D  |      |  A  |    |  B  |
+-----+    +-----+      +-----+    +-----+
"hello"    "IPFS"       "hello"    "world"
```

The old `"hello world"` content still exists in the block store, the C node will always point to the A/B nodes, what changed is that the state now points to the new root node E, in which are implied the nodes A and D, with the updated content.
