---
title: Compute-over-Data (CoD)
description: Learn about compute-over-data with content-addressed data on IPFS
---

# Compute-over-Data with content-addressed data

The term "Compute-over-data" (CoD) generally refers to a computing paradigm where processing of data is performed near the location of the data. This concept is particularly relevant in the context of big data and distributed computing, where the transfer of large volumes of data over a network can be inefficient and costly. By performing computations close to where the data is stored (compute-over-data), faster processing speeds and lower network bandwidth requirements are possible.

IPFS users can perform CoD on IPFS data with the [Bacalhau platform](#bacalhau) and the [InterPlanetary Virtual Machine (IPVM) specification](#ipvm), both of which natively support content-addressed data.

## Bacalhau

Bacalhau is a platform for fast, cost-efficient,  secure, distributed computation. Bacalhau works by running jobs where the data is generated and stored, also referred to as Compute Over Data (or CoD). Using Bacalhau, you can streamline existing workflows without extensive refactoring by running arbitrary Docker containers and WebAssembly (Wasm) images as compute tasks. The name _Bacalhau_ was coined from the Portuguese word for "salted cod fish".

### Features

Bacalhau can:

- Simplify management of compute jobs by providing a **unified platform** for managing jobs across different regions, clouds, and edge devices.
- Provide reliable and network-partition resistant orchestration, ensuring jobs will complete even if there are network disruptions.
- Provide a complete and permanent audit log, so you can be confident that jobs are being executed securely.
- Run [private workloads](https://docs.bacalhau.org/next-steps/private-cluster) to reduce the chance of leaked data outside of your organization.
- Reduce ingress and egress costs since jobs are processed closer to the source. 
- Run against data [mounted anywhere](https://docs.bacalhau.org/#how-it-works) on your machine.
- Integrate with services running on nodes to run jobs, such as [DuckDB](https://docs.bacalhau.org/examples/data-engineering/DuckDB/).
- Operate at scale over parallel jobs and batch process petabytes of data.
- Auto-generate art using a [Stable Diffusion AI model](https://www.waterlily.ai/) trained on the chosen artist’s original works.

### More Bacalhau resources 

- [Getting started tutorial](https://docs.bacalhau.org/getting-started/installation/)
- [Bacalhau platform architecture](https://docs.bacalhau.org/getting-started/architecture/)
- [GitHub](https://github.com/bacalhau-project/bacalhau)

## IPVM

The InterPlanetary Virtual Machine (IPVM) specification defines the easiest, fastest, most secure, and open way to run decentralized compute jobs on IPFS. One way to describe IPVM would be as "an open, decentralized, and local-first competitor to AWS Lambda".

IPVM uses [WebAssembly (Wasm)](https://webassembly.org/), content addressing, [simple public key infrastructure (SPKI)](https://en.wikipedia.org/wiki/Simple_public-key_infrastructure), and object capabilities to liberate computation from specific, prenegotiated services, such as large cloud computing providers. By default, execution scales flexibly on-device, all the way up to edge points-of-presence (PoPs) and data centers. 

The core, Rust-based implementation and runtime of IPVM is the [Homestar project](https://github.com/ipvm-wg/homestar/). IPVM supports interoperability with [Bacalhau](https://bacalhau.org) and [Web3Storage](https://web3.storage/)

### More IPVM resources

- [github.com/ipvm-wg/homestar/](https://github.com/ipvm-wg/homestar/)
- [Seamless Services for an Open World](https://youtu.be/Kr3B3sXh_VA) by Brooklyn Zelenka
- [Foundations for Open-World Compute](https://youtu.be/dRz5mau6fsY) by Zeeshan Lakhani
- [Foundations for Open-World Compute: Homestar, an IPVM Tale](https://youtu.be/BFAMy5-VHak) by Zeeshan Lakhani
- [IPVM: The Long-Fabled Execution Layer](https://www.youtube.com/watch?v=3y1RB8wt_YY) by Brooklyn Zelenka
- [IPVM: Content Addressed Compute for an Open World](https://youtu.be/jhtEYr3ORfk) by Brooklyn Zelenka
- [IPVM - IPFS and WASM](https://www.youtube.com/watch?v=rzJWk1nlYvs) by Brooklyn Zelenka
- [IPVM: Use Cases & System Designs](https://www.youtube.com/watch?v=FhwzEKNZEIA) by Juan Benet
- [IPVM: High-Level Spec](https://github.com/ipvm-wg/spec)
- [IPVM Workflow Spec](https://github.com/ipvm-wg/workflow)
- [UCAN Invocation Spec](https://github.com/ucan-wg/invocation)
