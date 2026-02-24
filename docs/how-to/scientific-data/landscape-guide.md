---
title: Scientific data and IPFS landscape guide
description: an overview of the problem space, available tools, and architectural patterns for publishing and working with scientific data using IPFS.
---

# Scientific data and IPFS landscape guide

Scientific data and IPFS are naturally aligned: research teams need to share large datasets across institutions, verify data integrity, and ensure resilient access. From sensor networks to global climate modeling efforts, scientific communities are using IPFS content addressing and peer-to-peer distribution to solve problems traditional infrastructure can't.

In this guide, you'll find an overview of the problem space, available tools, and architectural patterns for publishing and working with scientific data using IPFS.

## A landscape in flux

Science advances through collaboration, yet the infrastructure for sharing scientific data has historically developed in silos. Different fields adopted different formats, metadata conventions, and distribution mechanisms.

This fragmentation means there is no single "right way" to publish and share scientific data. Instead, this is an area of active innovation, with new tools and conventions emerging as communities identify common needs. Standards like [Zarr](https://zarr.dev) represent convergence points where different fields have found common ground.

This guide surveys the landscape and available tooling, but the right approach for your project depends on your specific constraints: the size and structure of your data, your collaboration patterns, your existing infrastructure, and your community's conventions. The goal is to help you understand the options so you can make informed choices.

## The nature of scientific data

Scientific data originates from a variety of sources. In the geospatial field, data is collected by sensors, measuring instruments, camera systems, and satellites. This data is commonly structured as multidimensional arrays (tensors), representing measurements across dimensions like time, latitude, longitude, and altitude.

Key characteristics of scientific data include:

- **Large scale**: Datasets often span terabytes to petabytes
- **Multidimensional**: Data is organized across multiple axes (e.g., time, space, wavelength)
- **Metadata-rich**: Extensive contextual information accompanies the raw measurements
- **Collaborative**: Research often involves multiple institutions and scientists sharing and building upon datasets

## The importance of open data access

As hinted above, open access to scientific data accelerates research, enables reproducibility, and maximizes the return on public investment in science. Organizations worldwide have recognized this, leading to mandates for open data sharing in publicly funded research.

IPFS is a natural fit for this due to the nature of its content-addressed, peer-to-peer architecture, which embraces open access and collaborative distribution. The next section looks at these benefits in more detail.

## The benefits of IPFS for scientific data

IPFS addresses several pain points in scientific data distribution:

- **Data integrity**: Content addressing ensures data hasn't been corrupted or tampered.
- **Collaborative distribution**: Multiple institutions can provide the same data sets, improving availability and performance
- **Open access**: Data can be retrieved from anyone who has it, not just the original publisher
- **Resilience**: No single point of failure when multiple providers host data

To get a better sense of how these ideas which are central to IPFS' design are applied by the scientific community, it's worth looking at the [ORCESTRA Campaign Case Study](../../case-studies/orcestra.md) campaign, which uses IPFS to reap these benefits.

## Architectural patterns

In this section, you can find architectural patterns for organizing and distributing scientific data with IPFS. See the [content routing](#content-routing) section for architectural patterns related to CID discovery.

### CID-centric verifiable data management

With this pattern, IPFS provides content-addressed verifiability by addressing data with CIDs. That means that network is optional, and can always be added later if publishing is desired. This approach is also agnostic about which format you use exactly, be it UnixFS or [BDASL](https://dasl.ing/bdasl.html). The other aspect that makes this useful is the ability to be able to perform some operations without access to the data, for example, with two known CIDs, you can construct a new data set composed of the two without access to the data.

This pattern has several variants:

- Data is stored as files and directories, and managed on original storage i.e. directly on the filesystem, or private networked storage and mounted as a filesystem with the Server Message Block (SMB) protocol. To generate CIDs by merkleizing data sets, there are two approaches:
  - Using the `ipfs add --only-hash -r <folder>` command returns the CID for the folder. This uses Kubo only for the generation of the CID.
  - A variation of the previous approach is to use the experimental [ipfs filestore](https://github.com/ipfs/kubo/blob/master/docs/experimental-features.md#ipfs-filestore) and the `ipfs add --nocopy` command with Kubo, to both generate the CID and import files in a way that doesn't duplicate the data in Kubo's blockstore. This approach allows performing read operations on the original copy on disk, which may be necessary for querying. The main benefit over the previous is that the data can also be published easily.
- Data is stored on disk in a content-addressed format, either managed by an IPFS node that tracks and stores the chunks in a blockstore, or as CAR files (Content Addressable aRchives). With both these approaches, the data is implicitly duplicated, if the original copy is also kept. With CAR files you get all the benefits of verifiability in a storage agnostic way, since CAR files can be stored anywhere from on disk, cloud storage, to pinning services.

Ultimately the choice between these approaches for content-addressed data management comes down to the following questions:

- How important is duplication? This is probably a function of the volume of your data and market costs of storage.
- How important is it to maintain a copy of the data in a content-addressed format? If no public publishing is expected and you only need integrity checks, you may choose not to store a full content-addressed replica and instead compute hashes on demand.
- What libraries and which programming languages will you use to interact with the data? For example, Python’s xarray library, via fsspec, can read directly from a local IPFS gateway using [`ipfsspec`](https://github.com/fsspec/ipfsspec).

### Single publisher

A single institution runs Kubo nodes to publish and provide data. Users retrieve via gateways or their own nodes.

### Collaborative publishing

Multiple institutions coordinate to provide the same datasets:

- Permissionless: single writer multiple follower providers
- Coordination can happen out of band, for example via a shared pinset on GitHub. The original publisher must ensure their data is provided, but once it's added to the pinset, others can replicate it.

### Connecting to existing infrastructure

IPFS can complement existing data infrastructure:

- [STAC catalogs](#stac) can include IPFS CIDs alongside traditional URLs
- Data portals can offer IPFS as an alternative retrieval method
- CI/CD pipelines can automatically add new data to IPFS nodes

### Content routing

Given a CID, the most important question is where to find the actual data it represents. **Content routing** —also called **content discovery**— is the process of locating peers that can serve a given CID, including their network addresses. IPFS supports several routing systems, with [Delegated Routing over HTTP](https://specs.ipfs.tech/routing/http-routing-v1/) providing a common interface across them: the [Amino DHT](../../concepts/dht.md), [IPNI](../../concepts/ipni.md), and others described below.

- **Mainnet [Amino DHT](../../concepts/dht.md)**: All providers announce to the main IPFS network, this is the default with Kubo, Helia, IPFS Cluster, public gateways, and pinning services. The main benefit of this approach is that it's the most decentralized and doesn't require any additional infrastructure besides a node with a public IP. The trade-off is that it is usually slower and more resource-intensive than the other approaches, especially for large datasets. One limitation of the DHT is that it doesn't support "HTTP providers" and is always tied to running a full IPFS node, which may not be ideal for all providers.
- [**IPNI**](https://cid.contact/): The IPFS Network Index (IPNI) is a public service that indexes content providers on the IPFS network. It provides an API for announcing providers and querying for providers of specific CIDs. This is similar to a dedicated indexer, but is a public service that anyone can use. Announcing content to the IPNI isn't supported by default in IPFS implementations, but can be added using a side-car.
- **Separate public DHT namespace**: a public but separate DHT namespace is a way to create a separate DHT for a specific community or use case, while still allowing anyone to join and participate. This requires running your own bootstrapper node so that DHT nodes can find each other. In theory, this reduces noise of Mainnet, but only makes sense at a given scale, and requires a critical mass of IPFS nodes to be effective. The main drawback is that it requires additional infrastructure and content on this network won't be discoverable from Mainnet.
- **"Private" DHT**: A closed network with a shared key. Both discovering and announcing providers requires nodes to have the shared key and be connected to the network. This is mostly for data that needs to be private, but can be used for public data as well.
- **Dedicated indexer**: With this approach, an indexer you control tracks CIDs and related metadata. In practice, this often looks like an SQL database and an HTTP API. For interoperability with IPFS libraries and implementations, you expose an [HTTP delegated routing endpoint](https://specs.ipfs.tech/routing/http-routing-v1/). Announcement of CIDs is either via a custom API or directly by the data orchestration system writing to the database. This approach is not very decentralized but can benefit from easier scalability and better performance, especially for large datasets. The main trade-off is that it introduces a central point of failure, and leaves it up to you to implement the logic for announcing providers and tracking CIDs. Both HTTP and libp2p bitswap providers are supported.

## Geospatial format evolution: from NetCDF to Zarr

The scientific community has long relied on formats like NetCDF, HDF5, and GeoTIFF for storing multidimensional n-array data (also referred to as tensors). While these formats served research well, they were designed for local filesystems and face challenges in cloud and distributed environments, that have become the norm over the last decades. This has been a trend driven by both the size of datasets growing and the advent of cloud and distributed systems enabling the storage and processing of larger volumes of data.

### Limitations of traditional formats

NetCDF and HDF5 interleave metadata with data, requiring large sequential reads to access metadata before reaching the data itself. This creates performance bottlenecks when accessing data over networks, whether that's cloud storage or a peer-to-peer network.

### The rise of Zarr

[Zarr](https://zarr.dev/) has emerged as a cloud-native format optimized for distributed storage:

- **Separation of metadata and data**: A `zarr.json` file at the root describes the dataset structure, enabling fast reads without scanning all data
- **Chunked by default**: Arrays are split into individually addressable chunks, allowing both partial and concurrent reads
- **Consolidated metadata**: All metadata can be consolidated into a single file for datasets with many arrays
- **Designed for network access patterns**: Distributed storage tends to have high throughput and high latency

> Note: To learn more about Zarr, check out the following resources: [Introduction to the Zarr format by Copernicus Marine](https://help.marine.copernicus.eu/en/articles/10401542-introduction-to-the-zarr-format), [What is Cloud-Optimized Scientific Data?](https://tom-nicholas.com/blog/2025/cloud-optimized-scientific-data/).

Zarr has seen widespread adoption across scientific domains, for example:

- **[Copernicus Marine Service](https://marine.copernicus.eu/)**: Provides free and open marine data for policy implementation and scientific innovation
- **[CMIP6](https://wcrp-cmip.org/cmip-phases/cmip6/)**: The Coupled Model Intercomparison Project Phase 6 distributes climate model outputs in Zarr format via cloud platforms like Google Cloud
- **Open Microscopy Environment**: [OME-NGFF](https://ngff.openmicroscopy.org/) (Next-generation file format) builds on Zarr for bioimaging
- **OGC**: The Open Geospatial Consortium has standardized Zarr in their [Zarr Storage Specification](https://www.ogc.org/standards/zarr-storage-specification/)

### Zarr and IPFS

- In IPFS, the common format for representing files and directories is [UnixFS](https://specs.ipfs.tech/unixfs/), and much like Zarr, files are chunked to enable incremental verification.
- Chunking:
  - Both Zarr and IPFS chunk data, for different reasons, with some overlap. Zarr chunks for partial access to reduce unnecessary data retrieval and enable concurrent retrieval. IPFS chunks for incremental verification and concurrent retrieval.
  - IPFS implementations enforce a block limit of 1 MiB
- Optimising Zarr chunk size is a nuanced topic and largely dependent on the access patterns of data
  - The established convention is to try to align Zarr chunk sizes with the IPFS maximal chunk size of 1 MiB whenever possible so that each Zarr chunk fetched maps to a single IPFS block.
  - There are many resources that cover this in more details:
    - https://zarr.readthedocs.io/en/stable/user-guide/performance/
    - https://element84.com/software-engineering/chunks-and-chunkability-tyranny-of-the-chunk/
    - https://eopf-toolkit.github.io/eopf-101/03_about_chunking/31_zarr_chunking_intro.html
    - https://esipfed.github.io/cloud-computing-cluster/optimization-practices.html
- There are a number of trade-offs to consider with UnixFS:
  - Overhead of around 0.5%-1% for the additional metadata and proto
  - But you might want to keep original copy of the data before encoding with UnixFS so that might double it
  - UnixFS is network agnostic but integrates seamlessly with the Web via IPFS gateways including the service worker gateway that allows for resilient multi-provider retrieval.
- IPFS is agnostic about metadata, and it's left to you to pick the conventions that's most applicable to your use case. Below are some of the conventions common within the ecosystem.

#### Metadata

Metadata in scientific datasets serves to make the data self-describing, like what the values represent, what units they're in, when and where they were measured, how they were processed, and how the dimensions relate to each other.

[**Climate and Forecast (CF) Conventions**](https://cfconventions.org/) are a community-maintained specification that defines how to write metadata in netCDF files so that scientific datasets are self-describing and interoperable. The spec covers things like how to label coordinate axes, encode time, specify units, and name variables using a standardized vocabulary (the CF Standard Name Table), so that software can automatically interpret data from different producers without custom parsing. Originally developed for the climate and weather communities, CF has become the dominant metadata convention for gridded earth science data more broadly, and its ideas have influenced newer cloud-native specifications like **GeoZarr**.

[**Attribute Convention for Data Discovery (ACDD)**](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) builds upon CF and is compatible with CF.

[**GeoZarr**](https://github.com/zarr-developers/geozarr-spec) is a specification for storing geospatial raster/grid data in the Zarr format. It defines conventions for how to encode coordinate reference systems, spatial dimensions, and other geospatial metadata within Zarr stores. It's conceptually downstream of the ideas in CF CDM (from the [netCDF ecosystem](https://docs.unidata.ucar.edu/netcdf-java/5.2/userguide/common_data_model_overview.html)), but designed for the Zarr ecosystem.

## Ecosystem tooling

### Organizing content-addressed data

#### UnixFS and CAR files

UnixFS is the default format for representing files and directories in IPFS. It chunks large files for incremental verification and parallel retrieval.

To learn more about how to use UnixFS to organize your data, check out the guide on [publishing geospatial Zarr data with IPFS](./publish-geospatial-zarr-data.md) which covers how to use UnixFS to publish Zarr datasets.

[CAR (Content Addressed Archive)](https://ipld.io/specs/transport/car/carv1/) files package IPFS data for backup or storage at rest, containing blocks and their CIDs in a single file. They can be stored anywhere while still giving you all the verification properties

#### Mutable File System (MFS)

MFS provides a familiar filesystem interface for organizing immutable content that is encoded with UnixFS. You can create directories, move files, and maintain a logical structure while the underlying data remains content-addressed.

Since UnixFS is an encoding format that is inherently mutable, MFS provides an API to construct and mutate trees, even without access to the underlying data, as long as you have the CIDs. This means that you can create new CIDs that reference existing CIDs without needing to fetch or have the data locally, which is useful for organizing and versioning datasets.

To learn more about how to use MFS to organize your data, check out the guide on [publishing geospatial Zarr data with IPFS](./publish-geospatial-zarr-data.md) which covers how to use MFS to organize Zarr datasets and add new data to existing data sets without needing to fetch the existing data.

### Publishing

#### Kubo

[Kubo](https://github.com/ipfs/kubo) is the reference IPFS implementation. It handles:

- Adding files, encoding with UnixFS and generating CIDs
- Providing content to the network via the DHT
- Serving (providing) content to other nodes

#### IPFS Cluster

[IPFS Cluster](https://ipfscluster.io/) is a cluster solution built on top of Kubo for multi-node deployments. IPFS Cluster coordinates pinning across a set of Kubo nodes, ensuring data redundancy and availability.
Support for the [Pinning API spec](https://ipfs.github.io/pinning-services-api-spec/).

#### Pinning services

Third-party pinning services provide managed infrastructure for persistent storage, useful when you don't want to run your own nodes.
See the [IPFS pinning services documentation](https://docs.ipfs.tech/how-to/pin-files/#use-a-pinning-service) for available options and usage patterns.

### Retrieval

#### ipfsspec

[ipfsspec](https://github.com/fsspec/ipfsspec/) integrates IPFS with Python's filesystem specification, enabling direct use with tools like xarray:

```python
import xarray as xr

ds = xr.open_dataset(
    "ipfs://bafybeif52irmuurpb27cujwpqhtbg5w6maw4d7zppg2lqgpew25gs5eczm",
    engine="zarr"
)
```

### Discovery, metadata, and data portals

Consider a scientist who needs historical sea surface temperature data for their research. Their journey starts with finding that the dataset exists and understanding what it contains. This is the human side of discovery, handled by catalogues and portals of different institutions. This is known as **CID discovery**: How do you find the CID for a given data set — assuming it's already published to IPFS and therefore content addressed. CID discovery is a corollary of **trust**, because while a CID can ensure the integrity of a dataset, it cannot ensure its authenticity. In other words, CID discovery is how you find the CID for data you are interested in.

Metadata plays a central role here: without rich, standardized metadata describing what a dataset contains and how it was collected, discovery is difficult regardless of the underlying transport. In earth science, the [CF Conventions](https://cfconventions.org/) have long served this role. Originally defined for netCDF files, but widely applied to Zarr datasets as well. Newer conventions are emerging in the [zarr-conventions](https://github.com/zarr-conventions) organization, though CF remains the dominant standard in practice.

### CID discovery

From a high level, there are a number of common approaches to CID discovery, that vary in terms of whether they're for human or programmatic discovery.

- **DNSLink**: Maps DNS names to CIDs, allowing human-readable URLs that resolve to IPFS content. Update the DNS record when you publish new data.
- **IPNS + DHT**: InterPlanetary Name System provides mutable pointers to content using cryptographic keys.
- **STAC:** The SpatioTemporal Asset Catalog specification defines a common metadata schema for geospatial data, making it easier to discover and understand datasets. [See below for more details.](#stac)
- **GitHub repositories**: Publishing CID lists and dataset metadata in version-controlled repositories, enabling collaborative discovery and maintenance.
- **Custom data portals/catalogue**: Purpose-built portals like the [Orcestra IPFS UI](https://github.com/orcestra-campaign/ipfsui) combine discovery by integrating metadata into one interface with retrieval by integrating with IPFS nodes and gateways, providing a seamless experience from discovery to retrieval.

#### STAC

[STAC (SpatioTemporal Asset Catalog)](https://stacspec.org/) is a specification for cataloging and discovering geospatial data assets. Rather than defining how data is stored internally, STAC describes _what_ data exists, _where_ it is, and _when_ it covers. A STAC catalog might point to assets that are NetCDF files or Zarr stores. One of the benefits of STAC is making cross-provider discovery possible, this is exemplified by the STAC web browser which works with any [STAC catalog](https://radiantearth.github.io/stac-browser).

The [EASIER Data Initiative](https://easierdata.org/) has built [ipfs-stac](https://github.com/DecentralizedGeo/ipfs-stac), a Python library that provides functionality for querying and interacting with STAC catalogs enriched with IPFS. The library supports seamless operations between leveraging STAC APIs enriched with IPFS metadata and interfacing with IPFS itself given a node.

The convention recommended by [EASIER for using CIDs in STAC](https://easierdata.org/updates/2022/2022-12-02-a-new-way-to-reference-and-retrieve-geographic-data) is to specify an `ipfs://` URI in the `href` according to the [alternate assets extension](https://github.com/stac-extensions/alternate-assets)

```json
{
 "alternate": {
   "IPFS": {
     "href": "ipfs://<CID>"
   }
 }
}
```

### Collaboration

#### Pinsets on GitHub

Teams can maintain shared lists of CIDs to pin, enabling collaborative data preservation. When one institution adds data, others can pin it automatically through CI/CD pipelines or manual synchronization.

## Next steps

- [Publishing Zarr Datasets with IPFS](./publish-geospatial-zarr-data.md) - A hands-on guide to publishing your first dataset
- [Kubo Configuration Reference](https://github.com/ipfs/kubo/blob/master/docs/config.md)
- [ipfsspec Documentation](https://github.com/fsspec/ipfsspec/)

## Resources

- [Zarr Format Documentation](https://zarr.dev/)
- [STAC Specification](https://stacspec.org/)
- [OME-NGFF Specification](https://ngff.openmicroscopy.org/)
- [Cloud-Optimized Scientific Data](https://tom-nicholas.com/blog/2025/cloud-optimized-scientific-data/) - Background on format design
