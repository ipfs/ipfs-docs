---
title: 'Case study: ORCESTRA & IPFS'
description: Explore how a coordinated tropical atmospheric science campaign uses IPFS to share verifiable datasets across institutions worldwide.
---

# Case study: The ORCESTRA Campaign

::: callout
**"During our 2024 ORCESTRA campaign, the planned local data infrastructure was stuck in customs. We set up IPFS on our notebooks and a Raspberry Pi, and suddenly all scientists could sync, share data, and collaborate on a local network, with automatic uploads back to Hamburg during intermittent internet connectivity. Although addressing data with CIDs initially felt unfamiliar, it unlocked local collaboration through data sharing and later scaled to become the foundation of the ORCESTRA data browser—with little more than the initial adaptation."**

_Tobias Kölling, Max Planck Institute for Meteorology_
:::

## Overview

In this case study, you'll learn how [The ORCESTRA Campaign](https://orcestra-campaign.org/), a coordinated international atmospheric science campaign, uses IPFS to ensure that scientific datasets are verifiable, openly accessible, and collaboratively distributed across institutions worldwide.

## What is ORCESTRA

[ORCESTRA](https://orcestra-campaign.org/) (Organized Convection and EarthCARE Studies over the Tropical Atlantic) is an international field campaign that launched in early 2024 to study tropical mesoscale convective systems: the storm systems that play a significant role in the Earth's weather and climate dynamics.

The campaign brings together **over twenty scientific institutions** spanning Europe, North America, and Africa. Eight sub-campaigns (three airborne, one land-based, and four at sea) coordinate aircraft, ships,  and ground stations to collect atmospheric measurements across the tropical Atlantic and validate observations made by the [EarthCARE](https://earth.esa.int/eogateway/missions/earthcare) satellite, which was launched shortly before the start of the campaign.

ORCESTRA represents the kind of large-scale scientific collaboration where data infrastructure can make or break a mission: dozens of research groups generating terabytes of observational data that must be shared, verified, and preserved across institutional boundaries.

### ORCESTRA by the numbers

<NumberBlock :items="[
  {value: '20+', text:'Research institutions'},
  {value: '8', text: 'Sub-campaigns'},
  {value: '50+', text: 'Scientists on-site'},
  {value: '8+', text: 'Countries involved'}
]" />

## The story

Scientific campaigns like ORCESTRA face a fundamental infrastructure challenge: how do you enable real-time data sharing among researchers spread across aircraft, ships, and ground stations, often in remote locations with limited connectivity, while ensuring that every dataset remains verifiable and tamper-proof?

Traditional approaches involve centralized servers and institutional data portals. But centralized infrastructure introduces single points of failure, and when teams are in the field, connectivity to distant data centers can't be taken for granted.

ORCESTRA's IPFS story began not with a grand architectural plan, but with a practical crisis. During one of the field campaigns in Barbados, the team's planned server infrastructure was delayed in customs. With roughly 50 scientists on site needing to share and collaborate on data, they needed a solution fast.

A Raspberry Pi with a 1 TB SD card became that solution. Running a [Kubo](https://github.com/ipfs/kubo) IPFS node, the device enabled local data sharing from laptop to laptop, provided temporary storage on the Pi node, and facilitated eventual transfer to a data center in Hamburg. No central server required; just content-addressed, peer-to-peer data sharing that worked.

This improvised setup revealed something important: IPFS wasn't just a workaround, it was a better fit for how field science actually works. As the campaign evolved and datasets grew, the team expanded IPFS from an emergency fix to the core of their data publishing infrastructure.

## How ORCESTRA works

ORCESTRA's eight sub-campaigns cover sea, air and land. They collect atmospheric measurements such as temperature, humidity, wind, radiation, aerosols and cloud properties, as well as oceanic measurements such as sea-surface temperature, salinity, and ocean currents. This observational data is structured as multidimensional arrays and stored primarily in the [Zarr](https://zarr.dev/) format, a cloud-native format optimized for chunked, distributed access to large scientific datasets.

### From collection to publication

When researchers collect data in the field, it follows a path from raw measurements to published, citable datasets:

1. **Collection**: Instruments on aircraft, ships, and ground stations capture measurements
2. **Processing**: Raw data is quality-controlled, calibrated, and structured into Zarr datasets
3. **Publishing**: Processed datasets are added to IPFS, generating content identifiers (CIDs) that uniquely and verifiably identify each dataset
4. **Discovery**: Datasets are catalogued in a metadata-rich browser, making them findable by the wider community
5. **Retrieval**: Scientists worldwide access data through IPFS gateways or directly from peers

## How ORCESTRA uses IPFS

ORCESTRA uses IPFS to make scientific data openly accessible, verifiable, and resilient.

Raw data from the different sub-campaigns is processed at the Max Planck Institute for Meteorology into publishable datasets. These datasets are added to IPFS, producing content identifiers (CIDs) that correspond to the published data from each sub-campaign. Because each CID is derived from the content itself, anyone who retrieves the data can independently verify that they received exactly what was published, without needing to trust any specific server that served it.

The architecture involves several coordinated components:

### IPFS nodes for collaborative hosting

A team at the Max Planck Institute for Meteorology processes the data from the different teams into Zarr and publishes them to IPFS with a fleet of [Kubo](https://github.com/ipfs/kubo) nodes, ensuring some redundancy. The CID for the whole data set is published via [pinlist.yaml on GitHub](https://github.com/orcestra-campaign/ipfs_tools/blob/main/pinlist.yaml) with the CID of the whole data set, giving full snapshot history of the growing data set from all sub campaigns.

### A metadata-rich data browser

The [ORCESTRA data browser](http://browser.orcestra-campaign.org/) provides a web interface for discovering and retrieving datasets. Built on top of [Climate and Forecast (CF) conventions](https://cfconventions.org/) metadata embedded in the Zarr datasets, the browser lets researchers search by variable, time range, sub-campaign, and other dimensions, then retrieve data directly via IPFS.

The browser leverages Helia, the TypeScript implementation of IPFS.

### Pinset tracking on GitHub

The campaign maintains a "pinset" (a list of datasets and their CIDs) in a [GitHub repository](https://github.com/orcestra-campaign). This serves a dual purpose: it provides **CID discovery**, so researchers can find which CIDs correspond to which datasets, and **provenance tracking**, since the Git history records when datasets were published and updated. Other institutions can use this pinset to replicate the entire collection on their own IPFS nodes.

### Python ecosystem integration

Through [ipfsspec](https://github.com/fsspec/ipfsspec/), ORCESTRA data integrates seamlessly with the Python data science ecosystem. Scientists can open datasets directly with familiar tools:

```python
import xarray as xr

ds = xr.open_dataset(
    "ipfs://bafybeif52irmuurpb27cujwpqhtbg5w6maw4d7zppg2lqgpew25gs5eczm",
    engine="zarr"
)
```

ipfsspec implements the [fsspec](https://filesystem-spec.readthedocs.io/) interface, the same abstraction layer used by xarray, pandas, Dask for remote data access. This means IPFS retrieval works anywhere these tools expect a filesystem, with no special handling needed.

## IPFS benefits

ORCESTRA's adoption of IPFS demonstrates several properties that matter for open scientific data:

### Data integrity without trust

Every dataset on IPFS is identified by a CID derived from its content. When a researcher retrieves a dataset, they can verify it matches the published CID; there is no need to trust the server, the network, or any intermediary. For science built on reproducibility, this is foundational.

### Resilient, decentralized access

With multiple institutions hosting the same content-addressed data, there is no single point of failure. If one provider goes offline, others continue serving the same verified data. This resilience matters for long-lived scientific datasets that need to remain accessible beyond the lifetime of any single project or server.

### Collaborative distribution

IPFS enables a model where providing data is a collaborative effort. Any institution can pin ORCESTRA datasets on their own nodes, contributing bandwidth and availability without any coordination protocol beyond the shared pinset. The more institutions that participate, the more resilient and performant the system becomes.

### Open, auditable data sharing

<!-- markdown-link-check-disable-next-line -->
Because every dataset, its CID, and its metadata are public, anyone can audit the data: verify its integrity, replicate it, or build upon it. This aligns with the principles of open science and the [FAIR data principles](https://www.go-fair.org/fair-principles/) (Findable, Accessible, Interoperable, Reusable) that increasingly govern publicly funded research.

### Field-ready infrastructure

The Barbados Raspberry Pi story illustrates a property of IPFS worth highlighting: it works at the edge. In field conditions with limited connectivity, IPFS enables local peer-to-peer sharing without dependence on remote infrastructure. Data collected locally can be shared immediately among nearby peers and synced to institutional servers when connectivity is available.

## ORCESTRA & IPFS: the future

As ORCESTRA's datasets continue to grow and are used by research groups worldwide, the IPFS-based infrastructure positions the project for long-term sustainability. Datasets published today remain verifiable and retrievable as long as any node in the network continues to provide them, whether that's an ORCESTRA server, a university research group, or an individual scientist's node.

The campaign's approach also serves as a reference for other scientific communities. By demonstrating that content-addressed, peer-to-peer data sharing works at the scale of an international field campaign, ORCESTRA shows a practical path forward for scientific data infrastructure: one that prioritizes verifiability, openness, and collaboration over centralized control.

_Note: Details in this case study are current as of early 2026. The ORCESTRA campaign and its data infrastructure continue to evolve._
