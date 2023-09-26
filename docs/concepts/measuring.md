---
title: Measuring the IPFS network
description: Learn about IPFS network measurements and ProbeLab 
---

# Measuring the IPFS network

The IPFS network is a complex system that relies on the coordinated participation of a swarm of independent peers. To ensure reliability and efficiency, the [Protocol Benchmarking & Optimization Team (ProbeLab)](https://probelab.io/) regularly measures the performance and health of the network, and reports these measurements to the public. In addition to these [key performance indicators (KPIs)](#kpis), ProbeLab has created a number of [custom tools](#tools) to calculate these measurements. 

This page provides a brief overview of these KPIs and tools. For more in-depth information, see [probelab.io](https://probelab.io/).

## KPIs

### Network size and stability

#### DHT Client and Server node estimates

The following metrics are used to estimate the DHT network size and number of clients versus servers:

1. Total number of peers in the Amino (Public IPFS DHT) network
1. Number of unique [DHT](dht.md) Server peers
1. Number of DHT Clients peers

For more info and the latest data, see [https://probelab.io/ipfskpi/#client-vs-server-node-estimate](https://probelab.io/ipfskpi/#client-vs-server-node-estimate).

#### Unique software agents

The following metrics are used to estimate the total number of unique software agents:

1. Unique software agents identified by [bootstrap nodes](https://docs.ipfs.tech/concepts/nodes/#bootstrap)
1. Unique software agents seen in Amino (the public IPFS [DHT](dht.md))

For more info and the latest data, see [https://probelab.io/ipfskpi/#unique-software-agents](https://probelab.io/ipfskpi/#unique-software-agents).

### Content routing

#### DHT server availability

[DHT](dht.md) server availability is measured by classifying nodes into one of four categories, as a function of the percentage of time the node was seen online:

- _Online_: online for 80% of the time or more.
- _Mostly Online_: online between 40%-80% of the time.
- _Mostly Offline_: online between 10%-40% of the time.
- _Offline_: online less than 10% of time.

For more info and the latest data, see [https://probelab.io/ipfskpi/#dht-server-availability](https://probelab.io/ipfskpi/#dht-server-availability).

#### DHT lookup performance

[DHT](dht.md) lookup performance is measured by calculating performance over time and from several geographic regions. The metrics used are: i) median, ii) P90, iii) P99.


For more info and the latest data, see [https://probelab.io/ipfskpi/#dht-lookup-performance](https://probelab.io/ipfskpi/#dht-lookup-performance).

#### IPNI utilization

[IPNI](ipni.md) utilization is measured by calculating the number of requests made per day to the network indexers operated by [cid.contact](https://cid.contact/). For more info and the latest data, see [https://probelab.io/ipfskpi/#ipni-utilization](https://probelab.io/ipfskpi/#ipni-utilization).

## Tools
The ProbeLab team is developing tools to continuously monitor the performance of several critical parts of the IPFS network. The current set of tools, together with detailed description and links can be found at: [https://probelab.io/tools/](https://probelab.io/tools/).
### Nebula 

[Nebula](https://github.com/dennis-tra/nebula) is a libp2p DHT crawler that is used to calculate [DHT server availability](#dht-server-availability). It periodically tries to connect to DHT Server peers within the IPFS DHT. Upon discovering a new peer, the crawler notes the beginning of an availability session, extending this session with each successful connection attempt. Conversely, a failed connection ends the session, with a subsequent successful attempt initiating a new one. During each measurement period, peers may experience multiple availability sessions. Learn more about Nebula at [probelab.io/tools/nebula/](https://probelab.io/tools/nebula/).

### Parsec

[Parsec](https://github.com/dennis-tra/nebula) is a tool for measuring [DHT lookup performance](#dht-lookup-performance), specifically focusing on the PUT and GET performance of the IPFS public DHT. It can also be adapted to assess other [libp2p-kad-dht](https://github.com/libp2p/specs/blob/master/kad-dht/README.md) networks. The configuration is divided into a scheduler and a server. Learn more about Parsec at [probelab.io/tools/parsec/](https://probelab.io/tools/parsec/).

### Tiros

[Tiros](https://github.com/plprobelab/tiros) evaluates the retrieval performance of websites hosted on IPFS. Specifically, it compares website metrics such as TTFB (Time to First Byte) or FCP (First Contentful Paint) with a Kubo node and a headless Chrome instance for a given website. The objective is to compare these metrics when loaded over IPFS versus HTTPS. To achieve this, Tiros directs Chrome to request a website through either the gateway of a local Kubo node or HTTPS. Learn more about Tiros at [probelab.io/tools/tiros/](https://probelab.io/tools/tiros/).

## Learn more 

You can learn more about the data and tools discussed here, as well as ProbeLab in general at [probelab.io](https://probelab.io/).