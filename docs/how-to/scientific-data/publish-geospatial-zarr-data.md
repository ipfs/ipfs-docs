---
title: Publish geospatial Zarr data with IPFS
description: Learn how to publish geospatial datasets using IPFS and Zarr for decentralized distribution, data integrity, and open access.
---

# Publish geospatial Zarr data with IPFS

In this guide, you will learn how to publish public geospatial data sets using IPFS, with a focus on the [Zarr](https://zarr.dev/) format. You'll learn how to leverage decentralized distribution with IPFS for better collaboration, data integrity, and open access.

Note that while this guide focuses on Zarr, it's applicable to other data sets.

By the end of this guide, you will publish a Zarr dataset to the IPFS network in a way that is retrievable directly within [Xarray](https://xarray.dev/).

If you are interested in a real-world example following the patterns in this guide, check out the [ORCESTRA Campaign case study](../../case-studies/orcestra.md).

- [Why IPFS for Geospatial Data?](#why-ipfs-for-geospatial-data)
- [Prerequisites](#prerequisites)
- [Step 1: Prepare your Zarr data set](#step-1-prepare-your-zarr-data-set)
- [Step 2: Add your data set to IPFS](#step-2-add-your-data-set-to-ipfs)
- [Step 3: Organizing your data](#step-3-organizing-your-data)
- [Step 4: Verify providing status](#step-4-verify-providing-status)
- [Step 5: Content discovery](#step-5-content-discovery)
  - [Option A: Share the CID directly](#option-a-share-the-cid-directly)
  - [Option B: Use IPNS for updatable references](#option-b-use-ipns-for-updatable-references)
  - [Option C: Use DNSLink for human-readable URLs](#option-c-use-dnslink-for-human-readable-urls)
- [Accessing published data](#accessing-published-data)
- [Choosing your approach](#choosing-your-approach)
- [Reference](#reference)

## Why IPFS for geospatial data?

Geospatial data sets such as weather observations, satellite imagery, and sensor readings, are typically stored as multidimensional arrays, also commonly known as tensors.

As these data sets grow larger and more distributed, traditional formats like NetCDF and HDF5 show their limitations: metadata interleaved with data requires large sequential reads before you can access the data you need.

**[Zarr](https://zarr.dev/)** is a modern format that addresses these limitations and is optimized for networked and distributed storage characterised by high throughput with high latency. Zarr complements the popular [Xarray](https://xarray.dev/) which provides the data structures and operations for analyzing the data sets.

Some of the key properties of Zarr include:

- **Separated metadata**: A data catalogue/index lets you understand data set structure before fetching any data,
- **Chunked by default**: Arrays split into small chunks let you download only the subset you need.
- **Consolidated metadata**: All metadata in a single `zarr.json` file speeds reads for multi-array data sets.

> **Note:** For a more elaborate explanation on the underlying principles and motivation for Zarr, check out [this blog post](https://tom-nicholas.com/blog/2025/cloud-optimized-scientific-data/), by one of the Zarr contributors.
:::callout
This guide uses Zarr v3 conventions. Zarr v2 works the same way with IPFS, but uses different metadata files (`.zmetadata`, `.zarray`, `.zattrs`, `.zgroup`) instead of `zarr.json`. The `--hidden` flag in the `ipfs add` command ensures these files are included. See the [Zarr v2 to v3 migration guide](https://zarr.readthedocs.io/en/stable/user-guide/v3_migration.html) for more details.
:::


**IPFS** complements Zarr with decentralized distribution:

- **Content addressing**: Data is identified by what it contains using CIDs, not where it's stored
- **Built-in integrity**: Cryptographic hashes verify data hasn't been corrupted or tampered with
- **Participatory sharing**: Anyone can help distribute data sets they've downloaded
- **Open access**: No vendor lock-in or centralized infrastructure required

This combination has proven effective in real-world campaigns like [ORCESTRA](https://orcestra-campaign.org/orcestra.html), where scientists collaborated with limited internet connectivity in the field while sharing data globally.

## Prerequisites

Before starting, ensure you have:

- A Zarr data set ready for publishing
- Basic familiarity with the command line
- [Kubo](../../install/command-line.md) or [IPFS Desktop](../../install/ipfs-desktop.md) installed on a machine.

:::callout
See the [NAT and port forwarding guide](../nat-configuration.md) for more information on how to configure port forwarding so that your IPFS node is publicly reachable, thus allowing reliable retrievability of data by other nodes.

To check if your Kubo is publicly reachable, you can use the `ipfs swarm addrs autonat` command.
:::

## Step 1: Prepare your Zarr data set

When preparing your Zarr data set for IPFS, aim for approximately 1 MiB chunks to align with IPFS's 1 MiB maximum block size. While this is not a strict requirement, using larger Zarr chunks will cause IPFS to split them into multiple blocks, potentially increasing retrieval latency.

To calculate chunk dimensions for a target byte size, work backwards from your datatype:

```python
import xarray as xr

ds = xr.open_dataset(filename)
# Example: targeting ~1 MB chunks with float32 data
ds.to_zarr('output.zarr', encoding={
    'var_name': {'chunks': (1, 512, 512)}
})

# Total size: 1 × 512 × 512 × 4 bytes (float32) = 1048576 bytes = 1 MiB per chunk
```

:::callout
Chunking in Zarr is a nuanced topic beyond the scope of this guide. For more information on optimizing chunk sizes, see:

- [Zarr performance guide](https://zarr.readthedocs.io/en/stable/user-guide/performance/)
- [Chunks and chunkability](https://element84.com/software-engineering/chunks-and-chunkability-tyranny-of-the-chunk/)
- [Zarr chunking introduction](https://eopf-toolkit.github.io/eopf-101/03_about_chunking/31_zarr_chunking_intro.html)
- [Cloud optimization practices](https://esipfed.github.io/cloud-computing-cluster/optimization-practices.html)

:::

## Step 2: Add your data set to IPFS

First, apply the [unixfs-v1-2025 UnixFS profile](https://github.com/ipfs/specs/pull/499) which configures optimal defaults for content-addressed data (CIDv1, raw leaves, and 1 MiB chunking):

```bash
ipfs config profile apply unixfs-v1-2025
```

Then add your Zarr folder to IPFS using the `ipfs add` command:

```bash
ipfs add --recursive \
        --hidden \
        --pin-name="halo-measurements-2026-01-23" \
        --quieter \
        ./my-dataset.zarr
```

This command:

1. **Merkleizes** the folder: converts files and directories into content-addressed blocks with UnixFS
2. **Pins** the data locally: prevents garbage collection from removing it
3. **Provides** to the IPFS network that your node has this data
4. **Outputs the root CID**: the identifier for your entire dataset

The `--quieter` flag outputs only the root CID, which identifies the complete dataset.

> **Note:** Check out the [lifecycle of data in IPFS](../../concepts/lifecycle.md) to learn more about how merkleizing, pinning, and providing work under the hood.

## Step 3: Organizing your data

Two options help manage multiple datasets on your node:

- **Named pins** — a key/value store where the key is a name you choose and the value is a CID. Useful for labelling individual datasets without any folder structure.
- **MFS (Mutable File System)** — a mutable file and directory hierarchy you can reorganize freely, like a local filesystem backed by immutable content-addressed data.

### **Named pins**

The `--pin-name` flag attaches a human-readable label to a pin at the time you add data. This makes it easy to identify datasets when listing pins without needing to remember raw CIDs.

```bash
# Pin a dataset and give it a descriptive name
ipfs add --recursive --pin-name="sst-global-2024-q1" ./zarr-store/sst/
```

List your pins to see the label alongside the CID:

```bash
ipfs pin ls --type=recursive --names
# bafybeiaxkxdnj7wfivrkjw7qhglcvbulryvpxp5cqr7djjdnywefr4cmq4 recursive sst-global-2024-q1
```

You can also add a pin name retroactively:

```bash
ipfs pin add --pin-name="precipitation-monthly-2024" bafybeibpfqhzuicdpfzzfujkzaqnxz5e7c5e44erjpxjrguqxs7y6bcnve
```

Named pins are local metadata — they exist only on your node and do not affect the CID or how others see the data on the network.

### **MFS (Mutable File System)**

[MFS (Mutable File System)](../../concepts/file-systems.md#mutable-file-system-mfs): MFS gives you an interface to organize content-addressed data under a familiar file system structure with folders and names, where the root of the MFS is a CID that changes every time you change anything in the MFS tree.

By default, Kubo has a single MFS root that you can use to organize all your data. The MFS root is mutable, but the content it points to is immutable. When you add a file or directory to MFS, it creates a new CID for the updated tree, but the original content remains unchanged and accessible by its original CID.

The simplest way to add content to MFS is to pass the `--to-files` flag when adding content to IPFS. This adds the content to IPFS and also creates a path in MFS that points to the CID of the added content:

```bash
ipfs add --recursive ./halo-measurements-2026-01-23 --to-files=/datasets/halo/2026-01-23
```

You can also assemble a combined dataset from multiple sources, including datasets already published by other contributors, without fetching all the data (only the root block typically well under 2 MiB is needed). For example, suppose two HALO flight datasets are already on the IPFS network and you want to group them with a third dataset that you are adding locally:

```bash
# Note these CIDs are for demonstration purposes only and do not correspond to real datasets on the network.
#   2026-01-21 flight → bafybeiaxkxdnj7wfivrkjw7qhglcvbulryvpxp5cqr7djjdnywefr4cmq4
#   2026-01-22 flight → bafybeibpfqhzuicdpfzzfujkzaqnxz5e7c5e44erjpxjrguqxs7y6bcnve

# Add the new local flight dataset, placing it directly into MFS
ipfs add --recursive ./halo-measurements-2026-01-23 --to-files=/datasets/halo/2026-01-23
# added bafybeiheegb3h5s4v4igmxqivp4mq5gvp4zyv6lc3nmjjifgybqovzh4ji  halo-measurements-2026-01-23

# Link the two remote datasets into the same MFS directory —
# the remote data stays on the network, no local download required
ipfs files cp /ipfs/bafybeiaxkxdnj7wfivrkjw7qhglcvbulryvpxp5cqr7djjdnywefr4cmq4 /datasets/halo/2026-01-21
ipfs files cp /ipfs/bafybeibpfqhzuicdpfzzfujkzaqnxz5e7c5e44erjpxjrguqxs7y6bcnve /datasets/halo/2026-01-22

# Each mutation produces a new root CID — a lightweight versioned snapshot
ipfs files stat --hash /datasets/halo
# bafybeihqixf5ew7mfr74bzb74qiw2mgtnytabnpzjnf5xeejzq4p2ocygu

# To list the contents of the combined dataset:
ipfs files ls -l /datasets/halo
# 2026-01-21/	bafybeiaxkxdnj7wfivrkjw7qhglcvbulryvpxp5cqr7djjdnywefr4cmq4	0
# 2026-01-22/	bafybeibpfqhzuicdpfzzfujkzaqnxz5e7c5e44erjpxjrguqxs7y6bcnve	0
# 2026-01-23/	bafybeiheegb3h5s4v4igmxqivp4mq5gvp4zyv6lc3nmjjifgybqovzh4ji	0
```

`bafybeihqixf5ew7mfr74bzb74qiw2mgtnytabnpzjnf5xeejzq4p2ocygu` is a new CID representing the combined dataset containing all three HALO flight datasets. The original CIDs are referenced, not copied, so no data is duplicated.

## Step 4: Verify providing status

After adding, Kubo continuously announces your content to the network. Check the status:

```bash
ipfs provide stat
```

For detailed diagnostics, see the [provide system documentation](https://github.com/ipfs/kubo/blob/master/docs/provide-stats.md).

## Step 5: Content discovery

Now that your data is available on the public network, the next step is making it discoverable to others. Choose a sharing approach based on your needs:

### Option A: Share the CID directly

For one-off sharing, provide the CID directly:

```
ipfs://bafybeif52irmuurpb27cujwpqhtbg5w6maw4d7zppg2lqgpew25gs5eczm
```

### Option B: Use IPNS for updatable references

If you want to share a stable identifier but be able to update the underlying dataset, create an [IPNS](https://docs.ipfs.tech/concepts/ipns/) identifier and share that instead. This is useful for datasets that get updated regularly — users can bookmark your IPNS name and always retrieve the latest version.

```bash
# Publish your dataset under your node's IPNS key
ipfs name publish /ipfs/<your-dataset-cid>

# Update to a new version later
ipfs name publish /ipfs/<new-dataset-cid>
```

IPNS is supported by all the retrieval methods in the [Accessing Published Data](#accessing-published-data) section below. Keep in mind that IPNS name resolution adds latency to the retrieval process.

### Option C: Use DNSLink for human-readable URLs

Link a DNS name to your CID by adding a TXT record:

```
_dnslink.data.example.org  TXT  "dnslink=/ipfs/<cid>"
```

Updating the DNS record can be done whenever you publish a new version, allowing you to maintain a human-readable URL that always points to the latest dataset. This is ideal for datasets that are updated frequently and need a stable, user-friendly URL.

To update the DNSLink record, you can use tools like [OctoDNS](https://github.com/octodns/octodns) or [DNSControl](https://dnscontrol.org/), which work with many DNS providers and can be integrated into CI/CD pipelines for automated updates when you publish new data. Another option, if you are using GitHub Actions, is to use the [DNSLink Action](https://github.com/ipshipyard/dnslink-action).

To access data linked with DNSLink, you can use one of the following methods:

- With an IPFS gateway: `https://inbrowser.link/ipns/data.example.org`
- With Kubo: `ipfs cat /ipns/data.example.org/zarr.json`
- Using ipfsspec in Python as detailed below in [Python with ipfsspec](#python-with-ipfsspec), which also supports IPNS names, so you can use `ipns://data.example.org/zarr.json` directly.

> **Note:** the `ipns://` scheme can seem misleading because it's used for both IPNS and DNSLink names. The reason is that both are mutable.

## Accessing published data

Once published, users can access your Zarr datasets through multiple methods:

### IPFS HTTP gateways

See the [retrieval guide](../../quickstart/retrieve.md).

### Python with ipfsspec

[ipfsspec](https://pypi.org/project/ipfsspec/) brings verified IPFS retrieval to the Python ecosystem by implementing the [fsspec](https://github.com/fsspec/filesystem_spec) interface, the same abstraction layer used by xarray, pandas, Dask, and Zarr for remote data access.

```python
import xarray as xr

# after the installation of ipfsspec, `ipfs://` urls are automatically recognized
ds = xr.open_dataset(
    "ipfs://bafybeiesyutuduzqwvu4ydn7ktihjljicywxeth6wtgd5zi4ynxzqngx4m",
    engine="zarr"
)
```

### JavaScript with Verified Fetch

```javascript
import { verifiedFetch } from '@helia/verified-fetch'

const response = await verifiedFetch('ipfs://<cid>/zarr.json')
```

## Choosing your approach

Consider these factors when planning your publishing strategy:

| Factor              | Considerations                               |
| ------------------- | -------------------------------------------- |
| **Publishers**      | Single node or multiple providers?           |
| **Dataset size**    | How large are individual datasets?           |
| **Growth rate**     | How frequently do you add new data?          |
| **Content routing** | Public DHT, private DHT, or central indexer? |

For most Geospatial use cases, start with a single Kubo node publishing to the public Amino DHT. Scale to multiple providers or private infrastructure as your needs grow.

## Reference

- [Kubo documentation](https://docs.ipfs.tech/install/command-line/)
- [Kubo configuration options](https://github.com/ipfs/kubo/blob/master/docs/config.md)
- [ipfsspec for Python](https://github.com/fsspec/ipfsspec/)
- [Cloud-Optimized Scientific Data (Zarr deep-dive)](https://tom-nicholas.com/blog/2025/cloud-optimized-scientific-data/)
