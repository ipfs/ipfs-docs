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

An immutable object is an object whose state cannot be altered or modified once created. Once a file is added to the IPFS network, the content of that file cannot be changed without altering the [content identifier (CID)](../concepts/content-addressing.md) of the file. This feature is excellent for storing data that does not need to change. However, when it comes to content that needs to be altered or updated, immutability becomes a problem. This page discusses how to keep a mutable _state_ built from immutable building blocks.

A CID is an _absolute_ pointer to content. No matter when we request a CID, the CID value will always be the same. This is part of the content's architecture and cannot be changed. To manage _immutable_ files in a _mutable_ system, we need to add another layer that sits on top of CIDs.

As a basic example, let's have two blocks of content with the strings `hello` and `world` hashed into two leaf nodes with the CIDs `A` and `B`. If we concatenate these two nodes, then we are given CID `C`. On top of this root CID, we assign a pointer `Pointer`.

```shell
   +-----------+
   |  Pointer  |
   +-----------+
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

If we change the content of `B` to `IPFS!`, all the upstream paths will change as well. In this simple example, the only upstream path is `C`. If we request content from the pointer we get back new content since the pointer is now _pointing_ at a completely different node. Node `B` is not being edited, updated, or otherwise changed. Instead, we are creating a new DAG where the pointer points to CID `E` that joins node `A` and a new node, node `D`.

```shell
   +-----------+
   |  Pointer  | --------------+
   +-----------+               |
                               ↓
      +-----+               +-----+
   +--|  C  |-+         +-- |  E  | --+
   |  +-----+ |         |   +-----+   |
   |          |         |             |
+-----+    +-----+     +-----+    +-----+
|  A  |    |  B  |     |  A  |    |  D  |
+-----+    +-----+     +-----+    +-----+
"hello"    "world"     "hello"    "IPFS!"
```

Again, node `B` does not change. It will always refer to the same content, `world`. Node `A` also appears in the new DAG. This does not necessarily mean we copied the memory/buffer that contained the `hello` string into our new message; that would imply the location-addressed paradigm that focuses on the _where_ and not the _what_. In a content-addressed system, any time someone writes the string `hello` it will always have CID `A`, regardless of whether we copied the string from a previous location or we wrote it from scratch.

## Example

In this example, we have a website that displays two headers called `header_1` and `header_2`. The content of the headers is supplied from the variables `string_1` and `string_2`.

```html
<body>
  <h1 id="header_1"></h1>
  <h1 id="header_2"></h1>
</body>
<script>
  let string_1 = 'hello'
  let string_2 = 'world'
  document.getElementById('header_1').textContent = string_1
  document.getElementById('header_2').textContent = string_2
</script>
```

The CID of this website is `QmWLdyFMUugMtKZs1xeJCSUKerWd9M627gxjAtp6TLrAgP`. Users can go to [`example.com/QmWLdyFMUugMtKZs1xeJCSUKerWd9M627gxjAtp6TLrAgP`](https://gateway.pinata.cloud/ipfs/QmWLdyFMUugMtKZs1xeJCSUKerWd9M627gxjAtp6TLrAgP) to view the site. If we change `string_2` to `IPFS` then the CID of the website changes to `Qme1A6ofTweQ1JSfLLdkoehHhpbAAk4Z2hWjyNC7YJF9m5`. Now users can go to [`example.com/Qme1A6ofTweQ1JSfLLdkoehHhpbAAk4Z2hWjyNC7YJF9m5`](https://gateway.pinata.cloud/ipfs/Qme1A6ofTweQ1JSfLLdkoehHhpbAAk4Z2hWjyNC7YJF9m5).

Having a user visit the site using the CID is cumbersome since the CID will change every time a variable is updated. So instead, we can use a _pointer_ that maintains the CID of the page with the latest update. This way, users can go to `example.com`, and always be directed to the latest content. This pointer is _mutable_; it can be updated to reflect the changes downstream.

```shell
+--------+      +---------+      +----------+
|  User  | ---> | Pointer | ---> | QmWLd... |
+--------+      +---------+      +----------+
```

In the website example, when we change a variable, the CID of the webpage is different. The pointer must be updated to redirect users to the latest webpage. What's important is that the _old_ CID still exists. Nothing is overwritten. The original CID `QmWLdyFMUugMtKZs1xeJCSUKerWd9M627gxjAtp6TLrAgP` will always refer to a webpage with the headers `hello` and `world`. What we're doing is constructing a new [DAG](../concepts/merkle-dag.md).

```shell
+--------+      +---------+      +----------+
|  User  | ---> | Pointer |      | QmWLd... |
+--------+      +---------+      +----------+
                     |
                     |           +----------+
                     + --------> | Qme1A... |
                                 +----------+
```

This process is essentially what the [InterPlanetary Naming Service (IPNS)](../concepts/ipns.md) does! CIDs can be difficult to deal with and hard to remember, so IPNS saves users from the cumbersome task of dealing with CIDs directly. More importantly, CIDs change with the content because they are the content. Whereas the inbound reference of URLs/pointers stay the same, and the outbound referral changes:

```shell
+--------+      +----------------+      +-------------------------------------------------------------+
|  User  | ---> | docs.ipfs.tech | ---> | bafybeigsddxhokzs3swgx6mss5i3gm6jqzv5b45e2xybqg7dr3jmsykrku |
+--------+      +----------------+      +-------------------------------------------------------------+
```
