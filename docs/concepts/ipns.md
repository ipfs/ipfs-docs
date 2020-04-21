---
title: IPNS
legacyUrl: https://docs.ipfs.io/guides/concepts/ipns/
description: Learn about the InterPlanetary Name System (IPNS) and how it can be used in conjunction with IPFS.
---

# InterPlanetary Name System (IPNS)

IPFS uses [content-based addressing](/concepts/content-addressing/); it creates an address of a file based on data contained within the file. Unfortunately, having a long string of seamingly random letters and numbers isn't great if you're trying to host a website or share a link. If you were to share the IPFS addresses `/ipfs/QmbezGequPwcsWo8UL4wDF6a8hYwM1hmbzYv2mnKkEWaUp` with someone, not only is it hard to read, but you need to give the person a new link everytime you update the content.

The InterPlanitary Name System (IPNS) solves these issues by creating human-readable addresses that can be updated.
