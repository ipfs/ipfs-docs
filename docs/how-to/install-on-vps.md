---
title: Install Node on a VPS
description: IPFS nodes can be installed on a VPS. This guide will walk you through the process of installing IPFS on a VPS.
---

# Find a provider

### Traditional VPS Hosting

In a nutshell, a virtual private server is a single instance of a virtual machine that resides on a larger physical machine. They tend to be a relatively cheap option, and they are less-frequently employed than the ubiquitous cloud platforms so they tend to contribute more towards the Ethereum network's decentralization.

However, they rarely have high-availability support; if the physical server goes down, it's likely that your VPS hosted on it will go down as well. Also, they have a fixed resource footprint; it's usually not possible to increase or decrease resources like CPU and RAM on demand.

Some well-known VPS providers that IPFS Node operators have used include [Contabo](https://contabo.com), [Vultr](https://www.vultr.com/) and [OVH](https://www.ovhcloud.com/en/).

### Cloud Hosting

Cloud hosting refers to virtual machines that are split across on a distributed network of multiple servers, rather than being hosted on a single physical machine. If one of the hosting machines fails, the others can seamlessly take over for it so availability and reliability tend to be extremely high on these platforms. They also tend to offer flexible resource options; it's relatively simple to add more CPU, RAM, or disk space on demand.

Due to these extra benefits, cloud-based servers tend to be more expensive than VPS solutions. They're also very popular platforms, so using them generally reduces the overall decentralization of the Ethereum network.

The 3 primary cloud providers are [Amazon Web Services (AWS)](https://aws.amazon.com/), [Microsoft Azure](https://azure.microsoft.com/en-us), and [Google Cloud Platform (GCP)](https://cloud.google.com/).

### Choose Operating System

The IPFS Node software is designed to run on Linux. If you're not familiar with Linux, we recommend using Ubuntu 20.04 LTS / 22.04 LTS. It's a popular distribution with a large community, so it's easy to find help if you run into problems.

# Accessing the Machine

Accessing the Machine

To access the machine, open a new terminal on Linux or macOS (use Powershell on Windows) and type the following command:

ssh [your VPS IP address]

If you stored your keys in the .ssh folder, this will use the private key pair you generated during setup to authenticate with the machine automatically - no usernames, no passwords.

Once here, you have complete terminal access to the system.

On Windows you can use [PuTTY](https://www.putty.org/) to connect to your VPS or some more modern alternatives like [Terminus](https://termius.com/).


# Install IPFS Node

Once your VPS is ready to use, you can choose an IPFS implementation to install. 

We recommend to use IPFS Kubo with Docker as the easiest way to get started and keep up to date thanks to docker images.

For this you will need to instal Docker first:

````bash
curl -fsSL https://get.docker.com -o install-docker.sh
sudo sh install-docker.sh
````

Then you can follow the steps [IPFS Kubo inside Docker](https://docs.ipfs.tech/install/run-ipfs-inside-docker/) to install IPFS Kubo.

#### Choose other IPFS implementation

Guides for other clients are [here](https://docs.ipfs.tech/install/).