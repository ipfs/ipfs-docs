---
title: Getting started
description: Start your IPFS journey here! Learn how the Interplanitery File System works, install commonly used tools, and get to grips with basic d-web concepts.
---

The InterPlanetary File System (IPFS) is a set of protocols that allow computers to share data using peer-to-peer networks instead of relying on central servers. The project started as a response to critical issues we currently face on the internet and is designed to replace HTTP and grow to an interplanetary scale. This section covers the issues that IPFS fixes, how it manages those solutions, and how you can build on top of the protocol.

## Problems with the current internet

Currently, the computers on the internet share files using fixed-addresses. If Laika wants to get a file on Albert's computer, Laika needs to know:

1. The IP address of your Albert's computer.
2. The location of the file.
3. The filename itself.

This approach comes with problems. What if Albert's computer is offline or unavailable? Albert _could_ store a copy of the file on another computer for redundancy, but then Laika also needs to know the address of _that_ computer. That backup computer would also need the exact same directory structure as Albert's original computer. What if Albert moves the file to a different location on their computer? Now the address Laika has is wrong. And if Laika manages to find the new address, the file's address on the backup computer is still incorrect, so you'd have to update the file's location on _that_ computer as well.
