---
title: 'Case study: Arbol'
description: Explore some helpful use cases, ideas, and examples for the InterPlanetary File System (IPFS).
---

# Case study: Arbol

::: callout
**"When it comes to data security versus ease of access, it's usually a trade-off. The fact that IPFS doesn't compromise on either is awesome — and it feels great to ditch Amazon S3 buckets for open source."**

_&mdash; Ben Andre, CTO, Arbol_
:::

## Overview

::: right
<img src="./images/case-studies/logo-arbol.svg" alt="Arbol logo" width="220">
:::

[Arbol](https://www.arbolmarket.com/) is a software platform that connects agricultural entities and other weather-dependent parties with capital providers to insure and protect against weather-related risks. Arbol's platform sells contracts for parametric weather protection agreements in a marketplace that's an innovative, data-driven approach to risk management, cutting out the usual legacy insurance claims process of making loss assessments on the ground. Instead, Arbol relies on tamper-proof data indexes to determine payouts, and doesn't require a defined loss to be indemnified. Arbol's platform combines parametric weather protection with blockchain-based smart contracts to provide cost-efficient, automated, and user-defined weather-related risk hedging. As with traditional crop insurance and similar legacy products, end users purchase assurance that they'll be financially protected in the case of adverse weather — but with Arbol, these end users are paid automatically if adverse conditions occur, as defined by the contract and measured by local meteorological observations tracked by Arbol's data sources.

To build the data indexes that Arbol uses to handle its contracts, the team aggregates and standardizes billions of data files comprising decades of weather information from a wide range of reputable sources — all of which is stored on IPFS. IPFS is critical to Arbol's service model due to the inherent verifiability provided by its [content-addressed architecture](/concepts/content-addressing), as well as a decentralized data delivery model that facilitates Arbol's day-to-day aggregation, synchronization, and distribution of massive amounts of data.

While United States agribusiness has been Arbol's initial area of focus, the team has built a globally capable platform, with expansion underway to new regions and industries around the world. Arbol currently provides contracts for managing the risks of weather exposure in the energy and agriculture sectors, and features both custom and pre-designed protection agreements for clients across industries and scale. Their current end-user base ranges from small coffee farms to major agribusinesses and power producers.

In short, Arbol's platform is a risk marketplace where end users can get competitively priced risk management solutions and capital providers can benefit from access to a lucrative, but underdeveloped, weather risk market. And because Arbol uses IPFS for its data storage and delivery needs, end users and underwriting partners can be certain that the data Arbol uses to determine price and payouts for contracts is tamper-proof and trustworthy.

### Arbol by the numbers

<NumberBlock :items="[
  {value: '1T', text:'weather-related data points hosted on IPFS'},
  {value: '1M', text: 'hashes generated on Arbol data every day'},
  {value: '40', text: 'years of high-resolution climate data'},
  {value: '200GB', text: 'average Arbol dataset size'}
]" />

## The story

Arbol began on Wall Street, where founder and CEO Siddhartha Jha worked as a commodity trader. What Jha saw there was a problem without a solution: Massive (and growing) demand for weather risk management for supply chains, farming industries, and the energy sector, but no viable, efficient, or cost-effective weather risk market to meet that demand. Traditional crop insurance was plagued by inefficiencies and high cost ceilings, with insurance providers forced to charge high premiums that only large corporations could afford. And while more efficient parametric insurance solutions were available on the market, even these data-driven options were often saddled with high overhead and bureaucratic waste. As a result, small businesses and local farmers were often trapped without access to protection from weather-related risks.

Arbol aims to change that by bringing fundamental transparency, efficiency, and data-driven objectivity to the weather risk market, ensuring that any business of any size can get the appropriate protection they need to manage their level of weather-related risk. The Arbol platform achieves this goal by providing a novel mechanism for weather-exposed businesses to connect with capital providers. The key to Arbol's approach is flexible financial derivatives that leverage the power of big data and machine learning to provide parametric risk protection at low cost. These parametric structures determine automatic payouts based on metrics that are strongly correlated with financial loss.

With Arbol, an end user pays to hedge against a specific weather-related event, such as yearly deviation in rainfall amounts or temperature. After deciding on a premium and selecting a payout amount, the end user then relies on Arbol's platform to handle the rest. Because parametric structures are objective and data-driven, they can achieve a level of precision, reliability, and cost effectiveness that traditional insurance cannot. In fact, one of Arbol's key benefits over legacy weather insurance is that it allows for hyper-local protection for managing user-specific levels of risk.

Arbol's approach also improves upon standard parametric insurance by combining parametric insurance's precision and flexibility with the security, transparency, and efficiency of blockchain. Many of Arbol's protection agreement contracts are executed as smart contracts on the Ethereum blockchain. These smart contracts automatically deliver payouts to end users as soon as a relevant adverse weather event occurs.

Delivering weather risk management solutions through blockchain-based contracts like this eliminates costly payout delays, as well as risks associated with fraud, corruption, and bureaucratic overhead. It also brings the benefits of peer-to-peer decentralization: Arbol users don't need to rely on Arbol as a financial middleman, because funds are locked between end users and capital providers without Arbol controlling the transfer of funds.

However, even the best smart contract is only as smart as the data it draws from. The "oracle problem" can be a foundational obstacle for smart contracts — but Arbol's use of IPFS eliminates this risk. Because a smart contract automatically and trustlessly executes based on data, it doesn't matter how secure, transparent, and publicly verifiable its use of blockchain is. Without an accurate, trustworth, and immutable data "oracle", even blockchain-based smart contracts can be easily biased, compromised, or manipulated. For Arbol, that's where IPFS is absolutely critical.

IPFS's content-addressed architecture enables Arbol to ensure the integrity and public verifiability of its datasets, something that traditional location addressing using centralized server architecture cannot provide. Smart contracts pointing to specific, immutable IPFS CIDs, rather than to data locations that could be tampered with, can be relied upon thanks to the integrity of their oracle.

::: callout
**"IPFS is very much at the heart of everything we do at Arbol. IPFS serves as our independently verifiable data store for all of the weather data associated with the contracts we sell. It imbues Arbol's platform with the essential principles of decentralization, data security, and public verifiability."**

_&mdash; Ben Andre, CTO, Arbol_
:::

Arbol builds its data indexes by drawing on large weather-related datasets from a variety of trusted public and private sources, including prominent U.S. government institutions such as NASA and the National Oceanic and Atmospheric Administration (NOAA). These sources track weather data including yearly rainfall amounts, temperature fluctuations, wind speeds, and more. However, while much of the data Arbol uses is publicly available, it isn't always easily usable; much of the data, particularly deeper historical records, is stored in outdated formats, and very little of it is organized into an easily readable structure. Arbol's data indexes process, correlate, and package this data so that it is readily available for use in the weather risk market. And by putting that data onto IPFS, Arbol also ensures that it has a verifiable, tamper-resistant, and decentralized home.

## IPFS benefits

Arbol's business model hinges upon the benefits afforded by IPFS — without its immutable content addressing and inherent data verifiability, the benefits Arbol provides would be impossible to achieve in a cost-effective and efficient way. As a whole, IPFS is critical to Arbol's service model by providing the following:

- **Immutable addressing:** Because all data stored using IPFS is referenced and accessed via unique [content identifiers (CIDs)](/concepts/content-addressing), any change to a data item means it receives a new CID exclusive to that revision. It's impossible to change data without changing its CID.

- **Data verifiability:** Contracts on Arbol's platform are linked to specific, verifiably unchanged, content-addressed data. Because parametric weather risk management absolutely relies on user agreement about and trust in source data, Arbol's approach offers reassurance unavailable with other offerings in the market.

- **Decentralized data delivery:** Arbol works with massive datasets comprising billions of files and terabytes of information. IPFS accommodates Arbol's methodology for publishing and adding to large datasets while still enabling Arbol to release and synchronize these datasets via a decentralized storage network.

## How Arbol uses IPFS

Arbol's end users enjoy the "it just works" benefits of parametric protection, but a lot goes on behind the scenes to enable this data-driven solution. Arbol's weather datasets range from 1GB to 1TB in size, and each one goes through a detailed ingestion process before it can be used. Once it has been decided that a dataset meets Arbol's criteria for usefulness and validity, it is time to add it to Arbol's IPFS pipeline, a multi-stage process outlined below.

1. **Query/release:** If a dataset is uploaded to Arbol's network directly (a "push" method), the maintainer initiates this stage themselves as part of their data release procedure. If Arbol or some other entity is "pulling" to the network independently of the dataset maintainer, the dataset needs to be periodically queried to determine when new data is released. Since many data providers follow a regular schedule, querying can be configured accordingly.

2. **Parsing:** Arbol parses providers' large data data files, re-indexes them on geolocation (rather than time) if necessary, and often condenses the format, allowing for easier and faster querying for Arbol's main use case of creating location-specific weather contracts.

3. **Interpretation:** When datasets have holes or apparent errors — for example, weather station data can be prone to missing or faulty data for individual stations — Arbol interpolates the data as needed by running a statistical "clean and fill" process.

4. **Compression:** This step is the final one before data is imported to IPFS. Arbol compresses each file to save on disk space and reduce sync time.

5. **Hashing:** Arbol uses the stock IPFS recursive add operation ([`ipfs add -r`](/reference/cli/#ipfs-add)) for hashing, as well as the experimental `no-copy` feature. This feature cuts down on disk space used by the hashing node, especially on the initial build of the dataset. Without it, an entire dataset would be copied into the local IPFS datastore directory. This can create problems, since the default flat file system datastore (`flatfs`) can start to run out of index nodes (the software representation of disk locations) after a few million files, leading to hashing failure. Arbol is also experimenting with [Badger](/recent-releases/go-ipfs-0-5/features/#badger-integration), an alternative to flat file storage, in collaboration with the IPFS core team as the core team considers incorporating this change into IPFS itself. Both parsing and hashing nodes are created and destroyed as needed.

6. **Verification:** To ensure no errors were introduced to files during the parsing stage, queries are made to the source data files and compared against the results of an identical query made to the parsed, hashed data.

7. **Publishing:** Once a hash has been verified, it is posted to Arbol's master heads reference file, and is at this point accessible via Arbol's gateway and available for use in contracts.

8. **Pinning and syncing:** When storage nodes in the Arbol network detect that a new hash has been added to the heads file, they run the standard, recursive [`ipfs pin -r`](/reference/cli/#ipfs-pin) command on it. Arbol's primary active nodes don't need to be large in number: The network includes a single [gateway node](/concepts/ipfs-gateway/) that bootstraps with all the parsing/hashing nodes, and a few large storage nodes that serve as the primary data storage backup. However, data is also regularly synced with "cold nodes" — archival storage nodes that are mostly kept offline — as well as on individual IPFS nodes on Arbol's developers' and agronomists' personal computers.

9. **Garbage collection:** Some older Arbol datasets require [garbage collection](/concepts/glossary/#garbage-collection) whenever new data is added, due to a legacy method of overwriting old hashes with new hashes. However, all of Arbol's newer datasets use an architecture where old hashes are preserved and new posts reference the previous post. This methodology creates a linked list of hashes, with each hash containing a reference to the previous hash. As the length of the list becomes computationally burdensome, the system consolidates intermediate nodes and adds a new route to the head, creating a [DAG (distributed acyclic graph)](/concepts/merkle-dag/) structure. Heads are always stored in a master [heads.json reference file](https://gateway.arbolmarket.com/climate/hashes/heads.json) located on Arbol's command server.

### The tooling

**NEED DIAGRAM HERE -- TK**

In addition to out-of-the-box [`go-ipfs`](https://github.com/ipfs/go-ipfs), Arbol relies heavily on custom written libraries and a number of weather-specialized Python libraries such as [netCDF4](https://pypi.org/project/netCDF4/) (an interface to netCDF, a self-describing format for array-oriented data) and [rasterio](https://pypi.org/project/rasterio) (for geospatial raster data). Additionally, Docker and Digital Ocean are important tools in Arbol's box for continuous integration and deployment.

As described above, Arbol datasets are ingested and augmented via either push or pull. For pulling data, Arbol uses a command server to query dataset release pages for new content. When new data is found, the command server spins up a Digital Ocean droplet (a Linux-based virtual machine) and deploys a "parse-interpret-compress-hash-verify" Docker container to it. This is done using a custom-built library that Arbol describes as "homebrew Lambda." Because Amazon's Lambda serverless compute has disk storage, CPU, and RAM limitations that make it unsuitable for the scale and complexity of Arbol's pipeline, the team has created their own tool.

Arbol's custom library passes in the Docker image, entry point, and manifest (RAM, CPU, etc.) to create an appropriate-spec droplet, put the Docker image on it, kick off the entry point (in this case, the parsing stage), and return the result. This custom Docker container then builds the new content. While it is being built, the command server polls the container to get the job status. When it is complete, the command server syncs the result via `ipfs pin` and destroys the droplet — meaning that resource-heavy droplets only need to be online during the add/pin process. Once the result has been pinned to the command server, the new IPFS hash is written to to the heads file, and a daemon that monitors heads.json for changes triggers propagation to the wider network. However, a client can also access the data as soon as the relevant hashes are written to the heads file.

Data is accessed by custom client libraries currently implemented in JavaScript (using [`js-ipfs`](https://github.com/ipfs/js-ipfs)) and Python. The client libraries make querying easy by accepting human-readable queries and converting them to hashes — first accessing the metadata file for the relevant dataset, and then getting the head hash before returning results in an appropriate data structure for the given language. Arbol's platform also offers useful utilities including a "snap to grid" function for finding the closest valid latitude/longitude for a given dataset, as well as functions for averaging, computing for leap years, and more.

All of these packages — as well the Docker libraries for building hashes from data and the IPFS-homed data itself — constitute a suite of tools that Arbol intends to open-source in the future under the moniker "dWeather" (decentralized weather). With dWeather, Arbol plans to make its detailed internal methodology publicly auditable, shareable, and reusable. In doing so, Arbol will empower anyone in the world to learn from and utilize previously esoteric or hard-to-access weather data. Ultimately, the Arbol team believes that incorporating the values of open source into its platform will benefit their customers, the scientific community for weather data, and the wider world, including the broader IPFS ecosystem.

## Arbol + IPFS: the future

The Arbol team sees dWeather as one of its most important upcoming initiatives. This suite of open-source tools for standardizing and providing content-addressable weather data from a variety of sources will be aimed primarily at scientists, academics, government agencies, and smaller weather data collectors. dWeather will include a robust set of packages and repositories — code for the entire ingestion pipeline, as well as the various client libraries for accessing data using IPFS.

"We see dWeather as an exciting way to cut down on the extremely esoteric weather data hosting schema and architectures that well-meaning government and scientific entities have basically been using unchanged since the 1990s," says Andre. "Widespread adoption of dWeather will not only aid Arbol by making data more secure, it will also make these rich datasets (the earliest of which go back to the late 1800s!) both more available to the wider public and more resilient against errors, loss, attacks, and service interruption."

Arbol also has plans to integrate dWeather with a soon-to-be announced service that will allow participants to monetize their data collection and weather forecasts if they wish, opening up a new, accuracy-rated market for independent data providers offering specialized, reputable weather data and forecasts.

Another exciting future initiative is the open sourcing and expansion of the interpretation stage of Arbol's data pipeline. Private companies currently charge high fees to access data that has been interpreted using black-boxed algorithms. In contrast, Arbol intends to open up that interpretation stage — running its methods in a publicly auditable execution environment with the results posted to the IPFS-powered dWeather network, making this information free and available to all. What's good for weather's scientific community is good for Arbol's customers, too: This auditable interpretation can potentially cut down on work for underwriters and lower prices for Arbol contract participants.

**END QUOTE FROM BEN TK**

_Note: Metrics and other details in this case study are current as of September 2020. Details may change in the interim._
