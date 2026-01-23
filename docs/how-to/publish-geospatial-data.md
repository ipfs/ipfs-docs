---
title: Publish Geospatial Data with IPFS
description:
---

# Publish Geospatial Data with IPFS

In this guide, you will learn how to publish public geospatial data sets using IPFS, with a focus on the [Zarr](https://zarr.dev/) format. You'll learn how to leverage decentralized distribution with IPFS for better collaboration, data integrity, and open access.

Note that while this guide focuses on Zarr, it's applicable to other data sets.

By the end of this guide, you will publish a Zarr dataset to the IPFS network in a way that is retrievable directly within [Xarray](https://xarray.dev/)

If you are interested in a real-world example following the patterns in this guide, check out the [The ORCESTRA campaign](https://orcestra-campaign.org/intro.html).

- [Why IPFS for Geospatial Data?](#why-ipfs-for-geospatial-data)
- [Prerequisites](#prerequisites)
- [Step 1: Prepare Your Zarr Data Set](#step-1-prepare-your-zarr-data-set)
- [Step 2: Add Your Data Set to IPFS](#step-2-add-your-data-set-to-ipfs)
  - [Step 3: Organizing Your Data](#step-3-organizing-your-data)
- [Step 4: Verify Providing Status](#step-4-verify-providing-status)
- [Step 5: Content Discovery](#step-5-content-discovery)
  - [Option A: Share the CID Directly](#option-a-share-the-cid-directly)
  - [Option B: Use IPNS for Updatable References](#option-b-use-ipns-for-updatable-references)
  - [Option C: Use DNSLink for Human-Readable URLs](#option-c-use-dnslink-for-human-readable-urls)
- [Accessing Published Data](#accessing-published-data)
- [Choosing Your Approach](#choosing-your-approach)
- [Reference](#reference)

## Why IPFS for Geospatial Data?

Geospatial data sets such as weather observations, satellite imagery, and sensor readings, are typically stored as multidimensional arrays, also commonly known as tensors.

As these data sets grow larger and more distributed, traditional formats like NetCDF and HDF5 show their limitations: metadata interleaved with data requires large sequential reads before you can access the data you need.

**[Zarr](https://zarr.dev/)** is a modern format that addresses these limitations and is optimized for networked and distributed storage characterised by high throughput with high latency. Zarr complements the popular [Xarray](https://xarray.dev/) which provides the data structures and operations for analyzing the data sets.

Some of the key properties of Zarr include:

- **Separated metadata**: A data catalogue/index lets you understand data set structure before fetching any data,
- **Chunked by default**: Arrays split into small chunks let you download only the subset you need.
- **Consolidated metadata**: All metadata in a single `zarr.json` file speeds reads for multi-array data sets.

> **Note:** For a more elaborate explanation on the underlying principles and motivation for Zarr, check out [this blog post](https://tom-nicholas.com/blog/2025/cloud-optimized-scientific-data/), by one of the Zarr contributors.

**IPFS** complements Zarr with decentralized distribution:

- **Content addressing**: Data is identified by what it contains using CIDs, not where it's stored
- **Built-in integrity**: Cryptographic hashes verify data hasn't been corrupted or tampered with
- **Participatory sharing**: Anyone can help distribute data sets they've downloaded
- **Open access**: No vendor lock-in or centralized infrastructure required

This combination has proven effective in real-world campaigns like [Orcestra](https://orcestra-campaign.org/orcestra.html), where scientists collaborated with limited internet connectivity in the field while sharing data globally.

## Prerequisites

Before starting, ensure you have:

- A Zarr data set for
- [Kubo](/install/command-line/) or [IPFS Desktop](/install/ipfs-desktop/) installed on a machine with a public IP
- Basic familiarity with the command line

## Step 1: Prepare Your Zarr Data Set

When preparing your Zarr data set for IPFS, aim for approximately 1 MiB chunks. This aligns well with IPFS's chunking strategy and provides a good balance between granularity and overhead. Note that this is not strictly required.

To calculate chunk dimensions for a target byte size, work backwards from your datatype:

```python
import xarray as xr

ds = xr.open_dataset(filename)
# Example: targeting ~1 MB chunks with float32 data
ds.to_zarr('output.zarr', encoding={
    'var_name': {'chunks': (1, 512, 512)}
})

# Total size: 1 × 512 × 512 × 4 bytes (float32) = ~1 MB per chunk
```

## Step 2: Add Your Data Set to IPFS

Add your Zarr folder to IPFS using the `ipfs add` command:

```bash
ipfs add --recursive \
         --hidden \
         --raw-leaves \
         --chunker=size-1048576 \
         --cid-version=1 \
         --pin-name="halo-measurements-2026-01-23" \
         --quieter \
         ./my-dataset.zarr
```

This command:

1. **Merkleizes** the folder: converts files and directories into content-addressed blocks with UnixFS
2. **Pins** the data locally: prevents garbage collection from removing it
3. **Queues providing**: announces to the IPFS network that your node has this data
4. **Outputs the root CID**: the identifier for your entire dataset

The `--quieter` flag outputs only the root CID, which identifies the complete dataset.

> **Note:**

### Step 3: Organizing Your Data

Two options help manage multiple data sets on your node:

**Named pins** (`--pin-name`): Label data sets for easy identification in `ipfs pin ls`.

**MFS (Mutable File System)**: Create a human-readable directory structure for your CIDs:

```bash
ipfs add ... --to-files=/datasets/halo-measurements-2026-01-23
```

MFS gives you a familiar filesystem interface to organize content-addressed data.

## Step 4: Verify Providing Status

After adding, Kubo continuously announces your content to the network. Check the status:

```bash
ipfs stats provide
```

For detailed diagnostics, see the [provide system documentation](https://github.com/ipfs/kubo/blob/master/docs/provide-stats.md).

## Step 5: Content Discovery

Users need a way to discover your datasets. Choose an approach based on your needs:

### Option A: Share the CID Directly

For one-off sharing, provide the CID directly:

```
ipfs://bafybeif52irmuurpb27cujwpqhtbg5w6maw4d7zppg2lqgpew25gs5eczm
```

### Option B: Use IPNS for Updatable References

IPNS provides a stable identifier that you can update when datasets change:

```bash
# Publish your dataset under your node's IPNS key
ipfs name publish /ipfs/<your-dataset-cid>

# Update to a new version later
ipfs name publish /ipfs/<new-dataset-cid>
```

Users can subscribe to your IPNS name to always get the latest version.

### Option C: Use DNSLink for Human-Readable URLs

Link a DNS name to your content by adding a TXT record:

```
_dnslink.data.example.org  TXT  "dnslink=/ipfs/<cid>"
```

Users can then access your data at:

```
https://data.example.org.ipfs.dweb.link/
```

## Accessing Published Data

Once published, users can access your Zarr datasets through multiple methods:

**IPFS HTTP Gateways**:

See the [retrieval guide](../quickstart/retrieve.md)

**Python with ipfsspec**:

```python
import xarray as xr

ds = xr.open_dataset(
    "ipfs://bafybeif52irmuurpb27cujwpqhtbg5w6maw4d7zppg2lqgpew25gs5eczm",
    engine="zarr"
)
```

**JavaScript with Verified Fetch**:

```javascript
import { verifiedFetch } from '@helia/verified-fetch'

const response = await verifiedFetch('ipfs://<cid>/zarr.json')
```

## Choosing Your Approach

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
- [Cloud-Optimized Geospatial Data (Zarr deep-dive)](https://tom-nicholas.com/blog/2025/cloud-optimized-Geospatial-data/)
