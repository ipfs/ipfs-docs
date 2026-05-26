---
title: 'Case study: Vereign & IPFS'
description: Explore how Vereign uses IPFS to deliver verifiable, encrypted messages at scale across Swiss healthcare.
---

# Case study: Vereign

::: callout
**"There is no central point of compromise anymore. There is no database that can be hacked, because the data just doesn't exist, even in encrypted form, in one place anywhere. It only comes together at the edge device of the patient."**

_Georg Greve, CEO and Co-founder, Vereign_
:::

@[youtube](uHFmRsRrjro)

## Overview

In this case study, you'll learn how [Vereign](https://www.vereign.com/) uses IPFS as the transport layer for a secure messaging system that serves Swiss healthcare, processing close to a million verified messages every month in partnership with the Swiss [Health Info Net (HIN)](https://www.hin.ch/).

## What is Vereign

Vereign is an infrastructure company building the trust layer for regulated digital communication. Its work spans decentralized key management, verifiable credentials, and secure data exchange, with a focus on environments where authenticity, privacy, and compliance are not optional.

Vereign's flagship system, [**SEAL**](https://vereign.com/seal/) (Secure Edge Application Layer), is deployed in Swiss healthcare in partnership with [HIN](https://www.hin.ch/), the secure communications provider owned by the Swiss Doctors Association. SEAL is the system that doctors and hospitals use to send sensitive messages to patients.

SEAL replaced HIN's previous patient-messaging system in 2025 and now handles the majority of patient-facing secure email across Swiss healthcare.

### Vereign by the numbers

<NumberBlock :items="[
  {value: '880K+', text: 'Verified messages per month'},
  {value: '2x+', text: 'Volume vs. the previous system'},
  {value: '~0', text: 'Level-3 support tickets per month'},
  {value: '30', text: 'Years HIN has run secure messaging for Swiss doctors'}
]" />

## The story

Switzerland's HIN has been running secure email for the country's doctors for nearly thirty years. For most of that time, the model was S/MIME: encryption between professionals who could be issued certificates, software, and training.

The hard part was always the other end: patients. You can't dictate the device a patient uses, the app they install, or the certificates they manage. HIN's previous patient-facing messaging system became a source of friction. Some hospitals reported support loads where the bulk of tickets came from patients who simply couldn't open their messages.

A few years ago, HIN began a sweeping modernization effort known internally as Project Phoenix — a top-to-bottom rethink of the organization, from infrastructure (moving from bare metal to OpenShift on a Swiss sovereign cloud) to processes (adopting DevOps and agile) to the product portfolio itself. Vereign joined as an innovation partner, and the first system slated for replacement was patient messaging, historically the most error-prone part of the stack.

The result was [SEAL](https://vereign.com/seal/). From the patient's perspective, it feels like opening a web page: tap a link, enter a code, read the message. Underneath, the message itself is encrypted, broken into fragments, and spread across an IPFS swarm; nothing reassembles until it reaches the patient's device.

A year after roll-out, SEAL is delivering more than 880,000 verified messages a month, more than twice the volume the old system carried, and HIN reports near-zero support load.

## How SEAL works

A doctor in HIN's network sends a message intended for a patient. From that point, the flow looks like this:

1. **Encryption**: The SEAL engine, operated by HIN, encrypts the message using AES-GCM-256. Each message gets multiple keys — one per MIME container, plus a message-level key — and all key material is held in [HashiCorp Vault](https://www.vaultproject.io/).
1. **Fragmentation**: The encrypted message is broken into fragments. Fragment boundaries deliberately don't align with the GCM blocks, making partial recovery harder for an attacker who finds a single fragment.
1. **Distribution**: Fragments are pinned across an IPFS swarm operated by HIN and Vereign.
1. **Delivery**: The patient receives a link (or QR code) that contains _one_ fragment, the encrypted message key, and the URL of the SEAL web app.
1. **Edge decryption**: The web app launches on the patient's device, retrieves the remaining fragments over IPFS, asks HIN's key service to release the decryption key (gated by an mTAN sent to the patient's phone), and reassembles and decrypts the message locally.
1. **Reply path**: Replies travel back through HIN's existing secure email infrastructure into the doctor's inbox.

Because the key service logs the moment the patient decrypts the key, the doctor receives proof of delivery, useful both clinically and for liability.

## How Vereign uses IPFS

SEAL is built around several IPFS-native design choices that make the system both secure and resilient.

### Encrypted swarm delivery

Rather than store a complete encrypted message on a single server, SEAL distributes encrypted fragments across an IPFS swarm. Combined with the encrypted message key delivered separately to the patient, this means the complete data never exists in one place. Even if a single node — or HIN's own infrastructure — were compromised, no complete message would be sitting there to steal.

### A public swarm with curated pinning

The SEAL swarm is public: any node can connect, and any client can retrieve content via standard IPFS interfaces, but only HIN can write to it. Pins are accepted only from HIN's own infrastructure, and content blocklists prevent the swarm from being used as a relay for unrelated material.

### A web app at the edge

The patient-facing application is a React Native app that runs in any environment that can execute JavaScript: a browser, a phone, a laptop. It can be served over plain HTTPS or, in clients that support it, over IPFS via DNSLink. The same architecture has been used to build companion apps for documents and other content types; the underlying delivery primitive is application-agnostic.

For performance, the app does not rely on DHT-based content routing. Because the location of HIN's gateways is known ahead of time, the app fetches fragments directly from the relevant gateway endpoints.

### Cluster-managed pinsets

Pinning is managed by [IPFS Cluster](https://ipfscluster.io/), which coordinates pin state across multiple [Kubo](https://github.com/ipfs/kubo) nodes for redundancy.

## IPFS benefits

Several IPFS properties were load-bearing in the SEAL design.

### Integrity protection by default

Content addressing means every retrieved fragment is verifiable: the CID is a hash of the content, so a fragment that doesn't match its CID is rejected by the client without any extra protocol work. In a system that aggregates fragments from multiple sources, that's a meaningful baseline.

### No central point of compromise

Because the message exists only as encrypted fragments spread across multiple nodes and is reassembled only on the patient's device, there is no central database to breach. In a sector where breach impact is uniquely severe, that architectural property is doing real work.

### Compliance through architecture

SEAL's design sidesteps a tension that often arises with replicated storage: the right to deletion. Because a SEAL message is only readable if its session key is available — and that key is held in HIN's key service — destroying the key effectively destroys the message, even if some fragments remain pinned elsewhere. Compliance is enforced through key lifecycle, not by chasing replicated data.

### A universal delivery substrate

The same swarm-delivery primitive that powers SEAL email is reused for document delivery, and is positioned to power other secure exchanges. IPFS is not application-specific here — it's a transport layer that facilitates new use cases as they appear.

## Operational lessons

Running IPFS in a regulated production environment came with a few sharp edges worth flagging for other teams:

- **Garbage collection is disruptive.** On a busy node, garbage collection effectively takes that node out of service while it runs. The operational pattern is to rotate a node out of the cluster, garbage-collect, then rotate it back in.
- **Corporate firewalls distrust IPFS.** Several enterprise environments inspect traffic and block requests that look like IPFS traffic. The SEAL gateway strips any IPFS headers on the patient-facing path so that messages reach users behind aggressive firewalls.
- **Production deployment patterns are under-documented.** Best practices for scaling, redundancy, and Kubernetes/OpenShift recipes for IPFS aren't well covered in public documentation. Teams adopting IPFS for production workloads should expect to invest in their own deployment patterns.

## Vereign & IPFS: the future

SEAL is one component of a larger trust layer that Vereign is building, currently being rebranded from "Stargate" to **VeryMesh**. VeryMesh extends the same principles (decentralized key management, verifiable credentials, peer-to-peer trust between organizations) to cross-institutional data exchange more broadly.

The longer-term aim is a technology stack where hospitals, government registries, identity providers, and individuals can verify each other's credentials and exchange data without ceding control to any central trust authority. SEAL fits into that picture as the bridge for the participants who are _not yet_ in the mesh — the patients, recipients, and partners reached through ordinary email and ordinary web browsers.

_Note: Details in this case study are current as of mid-2026. SEAL, VeryMesh, and the underlying infrastructure continue to evolve._
