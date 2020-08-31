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

To build the data indexes that Arbol uses to handle its contracts, the team aggregates and standardizes billions of data files comprising decades of weather information from a wide range of reputable sources — all of which is stored on IPFS. IPFS is critical to Arbol's service model due to the inherent verifiability provided by its content-addressed architecture, as well as a decentralized data delivery model that facilitates Arbol's day-to-day aggregation, synchronization, and distribution of massive amounts of data.

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

Arbol Inc. began on Wall Street, where founder and CEO Siddhartha Jha worked as a commodity trader. What Jha saw there was a problem without a solution. He encountered a huge and ever-growing market demand for managing weather-related risks to supply chains, farming industries, and the energy sector. But there wasn't a viable, efficient, and cost-effective weather risk market to meet that demand. Traditional crop insurance was plagued by inefficiencies and high cost ceilings, with insurance providers forced to charge high premiums that only large corporations could afford. And while many more efficient parametric insurance solutions were available on the market, these insurance solutions themselves were often saddled with high overhead and bureaucratic waste. As a result, most small businesses and local farmers were stuck without access to ways to offset their weather-related risks.

Arbol aims to change that by bringing newfound transparency, efficiency, and data-driven objectivity to the weather risk market, ensuring that any business of any size can get the appropriate protection they need to manage their level of weather-related risk.

Arbol's platform achieves this by providing a novel mechanism for weather-exposed businesses to connect with capital providers. The key to Arbol's approach is flexible financial derivatives that leverage the power of big data and machine learning to provide parametric risk protection at low-cost. Parametric structures determine payouts based on data-driven metrics strongly correlated with financial loss.

With Arbol's parametric approach, a client pays to hedge against a specific weather-related event, such as yearly deviation in rainfall amounts or temperature. After deciding on a premium and selecting a payout amount, the client then relies on Arbol's software to handle the rest. Because parametric structures are objective and data-driven, they can achieve a level of precision, reliability and cost-effectiveness that traditional insurance cannot. In fact, one of Arbol's key benefits is that it allows for hyper-local weather protection for managing user-specific levels of risk.

Arbol's approach also improves upon standard parametric insurance by combining the precision and flexibility of parametric insurance with the security, transparency, and efficiency of blockchain technology. Many of Arbol's protection agreement contracts are executed as smart contracts on the Ethereum blockchain. These smart contracts automatically deliver payouts to end-users as soon as the relevant weather-related event occurs.

Delivering weather risk management solutions through blockchain-based contracts like this eliminates fraud, corruption, bureaucratic overhead, and costly payout delay. It also brings the benefits of decentralization and peer-to-peer transactions. Arbol users don't need to rely on Arbol as a financial middleman; with Arbol's smart contracts, funds are locked between the two parties of end-users and capital providers and Arbol doesn't control the transfer of funds.

Smart contracts, however, suffer from the "oracle problem." Smart contracts automatically and trustlessly execute contracts. But they need good data, delivered by a data "oracle," to function well. It doesn't matter how secure, transparent, and publicly verifiable a blockchain is. Without accurate, reliable and immutable datasets, blockchain-based smart contracts are easily biased, compromised, or otherwise manipulated. For Arbol, that's where IPFS comes into play.

With IPFS, Arbol can ensure the integrity and public verifiability of its datasets. IPFS's content-addressing protocol protects Arbol's datasets from the potential threat of manipulation or tampering from malicious agents looking to defraud the system, something that traditional location addressing using centralized server architecture cannot guarantee. Smart contracts pointing to specific, immutable IPFS content hashes, rather than to data locations that could be tampered with, can be relied upon for their use of unmanipulated data.

::: callout
**"IPFS is very much at the heart of everything we do at Arbol. IPFS serves as our independently verifiable data store for all of the weather data associated with the contracts we sell. It imbues Arbol's platform with the essential principles of decentralization, data security, and public verifiability." **

_&mdash; Ben Andre, CTO, Arbol_
:::

Arbol builds its data indexes on IPFS by drawing on large weather-related datasets from a variety of private and public sources, including prominent U.S. government institutions like NASA and the National Oceanic and Atmospheric Administration (NOAA). These sources track weather data like yearly rainfall amounts, temperature fluctuations, wind speeds, and more. While a lot of the data Arbol uses is already publicly available, it isn't easily accessible; much of the data is stored in outdated formats and very little of it is organized into an easily readable structure. Arbol's data indexes process, correlate, and package this data so that it is readily available for use in the weather risk market. And by putting that data onto IPFS, Arbol also ensures that it always has a permanent and decentralized home.

## IPFS benefits

Arbol's business model hinges upon the benefits afforded by IPFS — without its immutable addressing and inherent data verifiability, the benefits Arbol provides would be impossible to achieve in a cost-effective and efficient way. As a whole, IPFS is critical to Arbol's service model by providing the following:

- **Immutable addressing:** Because all data stored via IPFS is referenced and accessed via unique content identifiers (CIDs), any change to a data item means it receives a new CID exclusive to that revision. It's impossible to change data without changing a CID.

- **Data verifiability:** Because contracts on Arbol's network are linked to content-addressed data, contracts are locked to a specific, verifiably unchanged, version of that data. Parametric weather risk management, especially in the use case of Arbol's smart-contract facilitated protection agreements, absolutely depends upon user agreement about and trust in the data Arbol uses.

- **Decentralized data delivery:** Arbol works with massive datasets comprising billions of files and terabytes of information. IPFS accommodates Arbol's methodology for publishing and adding to large datasets while still enabling Arbol to release and synchronize these datasets via a decentralized storage network.

## How Arbol uses IPFS

Once it has been decided that a dataset meets the criteria for Arbol's purposes, it is time to add it to Arbol's IPFS pipeline. This pipeline consists of a multi-stage process outlined below.

**NEED SIMPLE FLOWCHART HERE -- TK**

- **Query/release:** This stage is dependent on whether the dataset is being added via a "push" or "pull" method. If a dataset is being uploaded to Arbol's network directly, the dataset maintainer initiates this stage themself as part of their data release procedure. If Arbol or some other entity is uploading to the network independently of the dataset maintainer, then the dataset needs to be continuously queried to determine when new data has come out. Many data providers follow a regular schedule so querying can be configured accordingly.

- **Parsing:** Arbol parses through weather data providers' large data files, reindexes them on geolocation rather than time, and condenses the format, which allows for easier and faster querying of the data for Arbol's main use case of creating location-specific weather contracts.

- **Interpretation:** Certain datasets, like weather station data, include holes or apparent errors in certain stations, so Arbol interprets the data when needed by running a statistical "clean and fill" process.

- **Compression:** This is the final step before the data is posted to IPFS. Arbol compresses each file to save on disk space and reduce sync time.

- **Hashing:** Arbol uses the stock ‘ipfs recursive add' operation for hashing, as well as the experimental `no-copy` IPFS feature. This feature cuts down on the disk space used by the hashing node, especially on the initial build of the dataset. Without it, the entire 100GB+ dataset would be copied into the local IPFS datastore directory. This can create problems, since ‘flatfs', the default system datastore, can start to run out of index nodes (the software representation of disk locations) after a few million files, leading to hashing failure. Arbol is also experimenting with Badger (`badgerds`), an alternative to flat file storage (`flatfs`), in collaboration with the IPFS core team as the core team considers incorporating this change into IPFS itself. Both parsing and hashing nodes are created and destroyed as needed.

- **Verification:** To ensure that no errors were introduced to the files during the parsing stage, queries are made to the source data files and compared against the results of an identical query made to the parsed, hashed data.

- **Publishing:** Once a hash has been verified, it is posted to Arbol's master heads reference file and is at that point accessible via Arbol's gateway and available for use in contracts. Once storage nodes in the network detect that heads.json has changed, they start the pinning process outlined in the next step.

- **Pinning and syncing:** After a new hash has been added, Arbol's network of IPFS nodes runs the standard `ipfs recursive pin` command on it. Arbol currently maintains only several nodes: A single gateway node that bootstraps with all the parsing/hashing nodes, and a few big nodes that serve as the main data backup. However, data is also regularly synced with "cold nodes" — archival storage nodes that are kept offline for the most part — as well as on individual IPFS nodes on Arbol's developers' and agronomists' personal computers.

- **Garbage collection:** Some older Arbol datasets require garbage collection whenever new data is added, due to a legacy method of overwriting old hashes by new hashes. However, all of Arbol's newer datasets use an architecture where old hashes are preserved so that new posts reference the previous post. In this way a linked list of hashes is created, with each hash containing a reference to the previous hash. As the length of the list becomes computationally burdensome, the system consolidates intermediate nodes and adds a new route to the head, creating a DAG structure. Heads are always stored in a master [heads.json reference file](https://gateway.arbolmarket.com/climate/hashes/heads.json) located on the command server.

### The tooling

**NEED DIAGRAM HERE -- TK**

In addition to out-of-the-box `go-ipfs`, Arbol relies heavily on custom written libraries and a number of weather-specialized libraries such as netCDF4 and rasterio. Additionally, Docker and Digital Ocean are important tools in Arbol's toolbox when it comes to continuous integration and deployment.

Arbol uses a command server to query dataset release pages for new content. When content is released for new datasets, the command server spins up a Digital Ocean Droplet (a Linux-based virtual machine) and deploys a parsing/interpretation/compression/hashing/verification Docker container to it. This is done using a custom-built library that Arbol describes as "homebrew Lambda."

A conventional cloud service like AWS Lambda has a variety of disk storage, CPU, and RAM limitations that make it unable to handle the scale and complexity of Arbol's pipeline. For this reason, Arbol has created their own tool. Arbol's custom library is designed to pass in the Docker image, entry point, and manifest (RAM, CPU, etc.) to create an appropriate-spec droplet, put the Docker image on it, kick off the entry point (in this case, the parsing stage), and return the result. This custom Docker container then builds the new content. While it is being built, the command server polls the container to get the job status. When it is complete, the command server syncs the result via `ipfs pin` and destroys the droplet — meaning that resource-heavy droplets only need to be online during the initial add/pin process. Once the result has been pinned to the command server, the new ipfs hash is written to heads.json. A daemon that monitors heads.json for changes triggers propagation to the wider network. However, a client can also access the data as soon as the relevant hashes are written to heads.json.

Data is accessed by custom client libraries currently implemented in JavaScript (using js-ipfs) and Python. The client libraries make querying easy by accepting human readable queries and converting them to hashes by first accessing the metadata file for the relevant dataset and then getting the head hash from heads.json before returning the result in an appropriate data structure for the given language. There are also useful utilities like a "snap to grid" function for finding the closest valid latitude/longitude for a given dataset, as well as functions for averaging, computing things for leap years, and more.

All of these packages, along with the Docker libraries for building hashes from data and the posted IPFS content itself, constitute a suite of tools that Arbol plans to open source soon under the moniker "dWeather" (decentralized Weather). With dWeather, Arbol plans to make its detailed internal methodology publicly auditable, shareable, and distributable. By doing so, Arbol will empower anyone in the world to learn from and utilize otherwise esoteric and hard-to-access weather data. Ultimately, Arbol thinks that incorporating the values of open source into its platform will benefit both their customers, the scientific projects around weather data, and the wider world, as well as the broader IPFS ecosystem.

## Arbol + IPFS: the future

dWeather is an important upcoming initiative for Arbol. Its suite of open source tools for standardizing and building content addressable data from a variety of weather data authorities will be aimed primarily at scientists, academics, government agencies, and smaller weather data collectors. dWeather will include a robust set of packages and repositories — code for the entire ingestion pipeline, as well as the various client libraries for accessing data using IPFS.

"We see dWeather as an exciting way to cut down on the extremely esoteric weather data hosting schema and architectures that well-meaning government and scientific entities have basically been using unchanged since the nineties," adds Andre. "Widespread adoption of dWeather will not only aid Arbol by making data more secure, it will also make these rich datasets (the earliest of which go back to the late 1800s!) both more available to the wider public and more resilient against errors, loss, attacks, and service interruption."

Arbol also has plans to integrate dWeather with a soon-to-be announced service that will allow participants to monetize their data collection and weather forecasts if they wish, opening up a new, accuracy-rated market for independent data providers to offer specialized, reputable weather data and forecasts.

Another exciting initiative is the open sourcing and expansion of the interpretation stage of the pipeline. Private companies currently charge very high fees to access data that has been interpreted using blackboxed algorithms — in contrast, Arbol intends to open up that interpretation stage, running its methods in a publicly auditable execution environment with the results posted to the dWeather network (powered by IPFS, of course!), making this information free and available to all. Auditable interpretation is a powerful concept that will cut down on work for underwriters and lower prices for contract participants.

_Note: Metrics and other details in this case study are current as of September 2020. Details may change in the interim._
