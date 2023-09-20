---
title: Measuring the IPFS network
description: Learn about the lifecycle of data in IPFS.
---

# Measuring the IPFS network

The IPFS network is a complex system that relies on the coordinated participation of a swarm of independent peers. Therefore, to ensure its reliability and efficiency, the [Protocol Labs Protocol Benchmarking & Optimization Team (ProbeLab)](https://probelab.io/) regularly measures the performance and health of the network, and reports these measurements to the public. In addition to these [key performance indicators (KPIs)](#kpis), ProbeLab has created a number of custom tools to calculate these measurements. 

## KPIs

### Network size and stability

#### Client and server node estimate

The following metrics are used to estimate the network size and number of clients versus servers:

1. Total number of peers in the network
1. Number of unique [DHT](dht.md) Server peers
1. Number of DHT Clients peers

For more info and the latest data, see [https://probelab.io/ipfskpi/#client-vs-server-node-estimate](https://probelab.io/ipfskpi/#client-vs-server-node-estimate).

#### Client and server node estimate

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