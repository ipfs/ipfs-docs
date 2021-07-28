---
title: Long-term storage
description: "IPFS is, first and foremost, a protocol for sharing data. It can be leveraged as a storage medium by using things like _pinning services_. However, pinning services themselves should not be considered a long-term storage solution. Once a file, or collection of files, is no longer pinned then it may be lost entirely. Filecoin and Web3.Storage are two solutions that address the problem of using IPFS for long-term storage."
---

IPFS is a protocol for sharing data, and it can be leveraged by pinning services to act as a storage medium. However, pinning services themselves should not be considered a long-term storage solution. Once a file, or collection of files, is no longer pinned then the data may be lost forever. Web3.Storage is a service that leverages both IPFS and Filecoin to provide users with secure, content addressible long-term storage. 

Storing data using a personal IPFS node is easy but inconvienent since you constantly have to manage your own hardware. This problem gave rise to pinning services which allow you to upload your data to a remotely-hosted IPFS node and retrieve it whenever you want. However, pinning services can be a dangerous form of long term storage. Once a file, or collection of files, is no longer pinned then the data may be lost forever. There is no guarantee that the data is still accessible through IPFS. This is where Filecoin comes in.

## Storing data with Filecoin

Filecoin is a decentralized storage network, where storage providers rent their storage space to clients. The client and the storage provider agree on how much data will be stored fo how long, and what the cost is - this agreement is called a _deal_. Once a deal is made, the data is sent from the client to the storage provider who periodically verifies that they are correctly storing the data. When the client wants the data back, they send a request to the storage provider who initiates the data transfer back to the client. For more information on how Filecoin works, head over to the [Filecoin documentation site →](https://docs.filecoin.io/about-filecoin/how-filecoin-works/)

Filecoin provides a users with a dependable long-term storage solution. However, there are some limitations. The retrieval process is not as fast as an IPFS pinning service, and the minimum file size is several GiB. Also, the process for creating a storage deal can seem complicated to new users who aren't familar with blockchaint transactions, or simply aren't comfortable working directly within a command-line. To address these problems, Protocol Labs created Web3.Storage. 

## Web3.Storage

Web3.Storage is a service that makes it incredibly simple to store data using decentralized protocols. It acts as both an IPFS pinning service, and a Filecoin storage platform. When you upload a file to Web3.Storage, it is immediately available for download. Periodically, the service will bundle data together and create a deal with a Filecoin storage provider, ensuring that the data is available in long-term storage.

Using Web3.Storage users can quickly upload and download their files, without having to worry about files sizes or transaction costs. There's even an API to allow developers programatic access to the service. To use Web3.Storage, [head over to Web3.Storage and sign up for free →](https://web3.storage)

