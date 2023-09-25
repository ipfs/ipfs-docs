---
title: Measuring the IPFS network
description: Learn about IPFS network measurements and ProbeLab 
---

# Measuring the IPFS network

The IPFS network is a complex system that relies on the coordinated participation of a swarm of independent peers. To ensure reliability and efficiency, the [Protocol Labs Protocol Benchmarking & Optimization Team (ProbeLab)](https://probelab.io/) regularly measures the performance and health of the network, and reports these measurements to the public. In addition to these [key performance indicators (KPIs)](#kpis), ProbeLab has created a number of [custom tools](#tools) to calculate these measurements. 

This page provides a brief overview of these KPIs and tools. For more in-depth information, see [probelab.io/](https://probelab.io/).

## KPIs

### Network size and stability

#### Client and server node estimate

The following metrics are used to estimate the network size and number of clients versus servers:

1. Total number of peers in the network
1. Number of unique [DHT](dht.md) Server peers
1. Number of DHT Clients peers

For more info and the latest data, see [https://probelab.io/ipfskpi/#client-vs-server-node-estimate](https://probelab.io/ipfskpi/#client-vs-server-node-estimate).

#### Unique software agents

The following metrics are used to estimate the total number of unique software agents:

1. Unique software agents identified by [bootstrap nodes](https://docs.ipfs.tech/concepts/nodes/#bootstrap)
1. Unique software agents identified by the public [DHT](dht.md) 

For more info and the latest data, see [https://probelab.io/ipfskpi/#unique-software-agents](https://probelab.io/ipfskpi/#unique-software-agents).

### Content routing

#### DHT server availability

[DHT](dht.md) server availability is measured by classifying nodes into one of four categories, as a function of percentage of  time the node was online:

- _Online_: online for 80% of the time or more.
- _Mostly Online_: online between 40%-80% of the time.
- _Mostly Offline_: online between 10%-40% of the time.
- _Offline_: online less than 10% of time.

For more info and the latest data, see [https://probelab.io/ipfskpi/#dht-server-availability](https://probelab.io/ipfskpi/#dht-server-availability).

#### DHT lookup performance

[DHT](dht.md) lookup performance is measured by calculating average performance over time and several geographic regions, with the metrics as:

- Median
- P90
- P99

For more info and the latest data, see [https://probelab.io/ipfskpi/#dht-lookup-performance](https://probelab.io/ipfskpi/#dht-lookup-performance).

#### IPNI utilization

[IPNI](ipni.md) utilization is measured by calculating the number of requests made per day to the network indexers operated by [cid.contact](https://cid.contact/). For more info and the latest data, see [https://probelab.io/ipfskpi/#ipni-utilization](https://probelab.io/ipfskpi/#ipni-utilization).

## Tools

### Nebula 

[Nebula](https://github.com/dennis-tra/nebula) is a libp2p DHT crawler that is used to calculate [DHT server availability](#dht-server-availability). It periodically tries to connect to DHT Server peers within the IPFS DHT. Upon discovering a new peer, the crawler notes the beginning of an availability session, extending this session with each successful connection attempt. Conversely, a failed connection ends the session, with a subsequent successful attempt initiating a new one. During each measurement period, peers may experience multiple availability sessions. Learn more about Parsect at [probelab.io/tools/nebula/](https://probelab.io/tools/nebula/).

### Parsec

[Parsec](https://github.com/dennis-tra/nebula) is a tool for measuring [DHT lookup performance](#dht-lookup-performance), specifically focusing on the PUT and GET performance of the IPFS public DHT. It can also be adapted to assess other [libp2p-kad-dht](https://github.com/libp2p/specs/blob/master/kad-dht/README.md) networks. The configuration is divided into two parts: a scheduler and a server. Learn more about Parsect at [probelab.io/tools/parsec/](https://probelab.io/tools/parsec/).

#### Parsec server

The server functions as a standard libp2p peer, participating in the public IPFS DHT and offering a streamlined HTTP API. This API enables the scheduler to execute publication and retrieval tasks. All servers record the timing data related to publication or retrieval latencies and send the results back to the scheduler. 

#### Parsec scheduler

The scheduler circulates among all server nodes, directing one to publish provider records for a random data piece and requesting the others to search for the data. The publication or retrieval latency data provided by the servers is then stored in a database by the scheduler for future analysis.

### Tiros

[Tiros](https://github.com/plprobelab/tiros) evaluates performance for websites hosted on IPFS. Specifically, it compares website metrics such as TTFB (Time to First Byte) or FCP (First Contentful Paint) with a Kubo node and a headless Chrome instance for a given website. The objective is to compare these metrics when loaded over IPFS versus HTTPS. To achieve this, Tiros directs Chrome to request a website through either the gateway of a local Kubo node or HTTPS. Learn more about Tiros at [probelab.io/tools/tiros/](https://probelab.io/tools/tiros/).

## Learn more 

You can learn more about the data and tools discussed here, as well as ProbeLab in general at [probelab.io/](https://probelab.io/).