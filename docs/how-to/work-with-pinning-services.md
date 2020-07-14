---
title: Work with pinning services
description: Learn how to use or create remote pinning services with IPFS, the InterPlanetary File System.
---

# Work with remote pinning services

Depending on how you use IPFS, you might find it helpful to use a **remote pinning service** instead of, or in addition to, pinning files on your local IPFS node. Whether it happens remotely or locally, **pinning** something in IPFS identifies it as something you always wish to keep available, exempting it from the routine "garbage collection" that IPFS does on infrequently-used objects in order to efficiently manage storage space. (For more details on pinning as a concept, [see this guide](/how-to/pin-files).)

If you've got a single, always-on local IPFS node, local pinning may be all you need to insure your important items are persisted and never garbage-collected. However, using a remote pinning service might be useful to you if:

- Your local node isn't always online, but you need items to be consistently available
- You'd like to keep a persistent backup of your local node's files somewhere else
- You don't have all the disk space you need on your local node
- You run more than one IPFS node, and would like to designate one as your preferred location for permanent storage

Many remote pinning services operate as commercial endeavors (examples of these include Pinata, Temporal, Infura, and others), enabling you to purchase pinning capacity and offering an interface for the pinning action itself. However, if you don't want to bother with using more than one interface, integrating remote pinning services with IPFS can be simple. [IPFS Desktop](https://github.com/ipfs-shipyard/ipfs-desktop) and its equivalent in-browser IPFS web interface, the [IPFS Web UI](https://github.com/ipfs-shipyard/ipfs-webui), both support integration with remote pinning services so you can pin either remotely or locally straight from the UI.

## Use an existing pinning service

To add and use a remote pinning service in IPFS Desktop or Web UI, you'll first need to have an account with that service (you can do this by signing up directly with the service itself). Once you're got an account, follow these steps to add it to Desktop or Web UI:

_Instructions and screenshots to come when workflow finalized_

If your remote pinning service isn't listed here, don't worry — you can add any remote pinning service you'd like by specifying the following information:

_Details to come when custom add workflow finalized_

Then, to pin a file:

_Details to come when workflow finalized, particularly manual/automatic rules_

## Create your own pinning service

As noted above, you aren't limited to adding the remote pinning services listed in the Settings screen. Any remote pinning service that uses the [IPFS Pinning Service API](https://ipfs.github.io/pinning-services-api-spec) can be added as a custom pinning service — which also means that you can create your own! This might be useful in circumstances like:

- Designating one of your own IPFS nodes as a preferred location for permanent storage
- Running a private pinning service for your friends or company
- Starting your own commercial remote pinning service

As noted above, your service must use the [IPFS Pinning Service API](https://ipfs.github.io/pinning-services-api-spec) in order to be interoperable with IPFS Desktop and Web UI. You may also wish to read continuing details on how the API is evolving in the [Pinning Service API Spec GitHub repo](https://github.com/ipfs/pinning-services-api-spec), and be part of the discussion on its further development!

If you'd like to make your custom remote pinning service available to every IPFS user, you can make a PR against the [IPFS Web UI GitHub repo](https://github.com/ipfs-shipyard/ipfs-webui) in order to add it to the default list of pinning services.
