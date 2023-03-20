---
title: IPFS Cluster
description: IPFS Cluster provides data orchestration across a swarm of IPFS daemons by allocating, replicating, and tracking a global pin-set distributed among multiple peers. Learn how to install it here.
current-ipfs-cluster-version: v1.0.6
---

# Set up server infrastructure with IPFS Cluster

If you want to install IPFS in a server environment and offer IPFS as a service, you should look at [IPFS Cluster](https://cluster.ipfs.io/) as a way to scale your IPFS deployment beyond a single IPFS daemon. IPFS Cluster provides data orchestration across a swarm of IPFS daemons by allocating, replicating, and tracking a global pin-set distributed among multiple peers. This makes it significantly easier to manage multiple IPFS nodes and ensure that data is available across an internal network.

IPFS Cluster is a distributed application that works as a sidecar to IPFS peers, maintaining a global cluster pinset and intelligently allocating its items to the IPFS peers. This makes it significantly easier to manage multiple IPFS nodes and ensure that data is available across an internal network. IPFS Cluster powers large IPFS storage services like [nft.storage](https://nft.storage/) and [web3.storage](https://web3.storage/). 

:::tip
As a Kubernetes user, you can use a Kubernetes operator for IPFS called [IPFS operator](https://kubernetes.io/docs/concepts/extend-kubernetes/operator/) to easily create and manage clusters consisting of hundreds of peers.
The IPFS operator is in active development and not yet recommended for production use cases. If the operator is something you would like to include in your infrastructure, 
check out the [official documentation](https://ipfs-operator.readthedocs.io/) and [operator source code](https://github.com/redhat-et/ipfs-operator) for instructions and the latest progress.
:::

## Features 

IPFS Cluster has the following features:

- _Easy to run_: Runs independently from IPFS and the IPFS daemon’s API.
- _Handles replication of millions of pins to hundreds of IPFS daemons:_ Tracks pin lifetime asynchronously, asks IPFS to pin things at a sustainable rate and retries pinning in case of failures.
- _Clever pinning prioritization:_ New pins are prioritized over pin requests that are old or have repeatedly failed to pin.
- _Ingest pins at scale:_ Pins can be added at a rate hundreds of pins per second into the cluster from that moment they are tracked and managed by the cluster peers.
- _Balanced allocation:_ Distributes pins evenly among peers in different groups and subgroups (i.e regions, availability zones), ultimately choosing those with most free storage space available.
- _API and CLI_: Provides a command-line client and a fully featured Cluster HTTP REST API.
_No central server to manage:_ Cluster peers form a distributed network and maintain a global, replicated, conflict-free list of pins.
- _Baked-in permissions:_ The embedded permission model supports peers with permissions to change the cluster pinset and peers which store content as instructed but that cannot modify the pinset.
- _Name your pins:_ Supports custom replication factors, names and metadata for every pin.
- _Multi-peer add:_ Ingests IPFS content to multiple daemons directly.
- _CAR import support:_ Directly imports CAR-archived content using custom DAGs.
- _IPFS proxy API:_ Cluster peers provide an additional IPFS proxy API that behaves exactly like the IPFS daemon’s API does.
- _Integration-ready:_ Cluster peers can be programmatically launched and controlled using Go and Javascript clients for its API.
- _Powered by [libp2p](https://libp2p.io/):_ Built on libp2p, the battle-tested, next-generation p2p networking library used by IPFS, Filecoin and Ethereum V2.

<!-- markdown-link-check-disable -->
@[youtube](-SYDlid7Nqs)
<!-- markdown-link-check-enable-->

## Create a local cluster

To see if IPFS Cluster is suitable for your project, follow this quick start guide and spin up a local IPFS Cluster instance. At the end of this guide, you will have a solid understanding of how IPFS Cluster is set up and how to interact with it. To create a local cluster, complete the prerequisites. Then, follow the procedure.

:::tip
If you'd rather create a production-ready cluster, take a look at the [official IPFS Cluster documentation →](https://cluster.ipfs.io/)
:::

### Prerequisites

You must have both [Docker](https://docs.docker.com/install/) and [Docker Compose](https://docs.docker.com/compose/install/) installed. Check that they're both installed properly by checking the version:

```shell
docker version

> Client: Docker Engine - Community
> Version:           19.03.13
> API version:       1.40
> ...

docker-compose version

> docker-compose version 1.27.4, build 40524192
> docker-py version: 4.3.1
> ...
```

If you're having issues installing or using Docker or Docker-Compose, see the [official documentation →](https://docs.docker.com/).

### Procedure

1. Download the latest `ipfs-cluster-ctl` package from [dist.ipfs.tech](https://dist.ipfs.tech/#ipfs-cluster-ctl):

    ```shell
    wget https://dist.ipfs.tech/ipfs-cluster-ctl/v1.0.6/ipfs-cluster-ctl_v1.0.6_linux-amd64.tar.gz
    ```

1. Unzip the package:

    ```shell
    tar xvzf ipfs-cluster-ctl_v1.0.6_linux-amd64.tar.gz

    > ipfs-cluster-ctl/ipfs-cluster-ctl
    > ipfs-cluster-ctl/LICENSE
    > ipfs-cluster-ctl/LICENSE-APACHE
    > ipfs-cluster-ctl/LICENSE-MIT
    > ipfs-cluster-ctl/README.md
    ```

1. Download the [`docker-compose.yml` file](https://raw.githubusercontent.com/ipfs/ipfs-cluster/v1.0.6/docker-compose.yml) and place it into the `ipfs-cluster-ctl` directory:

    ```shell
    wget https://raw.githubusercontent.com/ipfs/ipfs-cluster/v1.0.6/docker-compose.yml
    ```

1. Start the cluster using `docker-compose`:

   :::callout
   Depending on your system permissions, you may have to run the command as a root user.
   :::

    ```shell
    docker-compose up

    > Recreating ipfs2 ... done
    > Recreating ipfs1    ... done
    > Recreating ipfs0    ... done
    > Recreating cluster2 ... done
    > ...
    ```
    
    :::warning

    Errors such as the following may display:

    ```shell
    cluster2    | 2020-10-27T15:20:15.116Z  ERROR   ipfshttp    error posting to IPFS:Post "http://172.18.0.2:5001/api/v0/pin/ls?type=recursive": dial tcp 172.18.0.2:5001: connect: connection refused
    ```

    You can safely ignore these errors for now. They're showing because some of the IPFS nodes within the cluster haven't finished spinning up yet. Everything should have loaded after a couple of minutes:

    ```shell
    > ipfs1       | API server listening on /ip4/0.0.0.0/tcp/5001
    > ipfs1       | WebUI: http://0.0.0.0:5001/webui
    > ipfs1       | Gateway (readonly) server listening on /ip4/0.0.0.0/tcp/8080
    > ipfs1       | Daemon is ready
    ```
    :::

1. Open a new terminal window.

1. You can now interact with your cluster. In a new terminal window, navigate to the `ipfs-cluster-ctl` directory.
 
1. List the peers within the cluster:

    ```shell
    ./ipfs-cluster-ctl peers ls

    > 12D3KooWBaQ9SGtdnJmyS2fe7uq5gXQnejCf5ma2n9cUEbwVD5gf | cluster2 | Sees 2 other peers
    > > Addresses:
    > - /ip4/127.0.0.1/tcp/9096/p2p/12D3KooWBaQ9SGtdnJmyS2fe7uq5gXQnejCf5ma2n9cUEbwVD5gf
    > - /ip4/172.18.0.5/tcp/9096/p2p/12D3KooWBaQ9SGtdnJmyS2fe7uq5gXQnejCf5ma2n9cUEbwVD5gf
    > ...
    > 12D3KooWDmjW55h3vSqLmSm1fBxPzs1dHkbtjWSHEj7RhzpcY9vE | cluster0 | Sees 2 other peers
    > > Addresses:
    > - /ip4/127.0.0.1/tcp/9096/p2p/12D3KooWDmjW55h3vSqLmSm1fBxPzs1dHkbtjWSHEj7RhzpcY9vE
    > - /ip4/172.18.0.7/tcp/9096/p2p/12D3KooWDmjW55h3vSqLmSm1fBxPzs1dHkbtjWSHEj7RhzpcY9vE
    > ...
    > 12D3KooWLhGJaddVKj8gsYXfYpyMKL5NhcmtiakDCWhDGtZJSu2w | cluster1 | Sees 2 other peers
    > > Addresses:
    > - /ip4/127.0.0.1/tcp/9096/p2p/12D3KooWLhGJaddVKj8gsYXfYpyMKL5NhcmtiakDCWhDGtZJSu2w
    > - /ip4/172.18.0.6/tcp/9096/p2p/12D3KooWLhGJaddVKj8gsYXfYpyMKL5NhcmtiakDCWhDGtZJSu2w
    > ...
    ```

1. Add a file into the cluster:

    ```shell
    wget https://upload.wikimedia.org/wikipedia/commons/6/63/Neptune_-_Voyager_2_%2829347980845%29_flatten_crop.jpg
    ./ipfs-cluster-ctl add Neptune_-_Voyager_2_\(29347980845\)_flatten_crop.jpg

    > added QmdzvHZt6QRJzySuVzURUvKCUzrgGwksvrsnqTryqxD4yn Neptune_-_Voyager_2_(29347980845)_flatten_crop.jpg
    ```

1. See the status of that file across the cluster of IPFS nodes using the CID given above:

    ```shell
    ./ipfs-cluster-ctl status QmdzvHZt6QRJzySuVzURUvKCUzrgGwksvrsnqTryqxD4yn

    > QmdzvHZt6QRJzySuVzURUvKCUzrgGwksvrsnqTryqxD4yn:
    > > cluster2             : PINNED | 2020-10-27T15:42:39.984850961Z
    > > cluster0             : PINNED | 2020-10-27T15:42:39.984556496Z
    > > cluster1             : PINNED | 2020-10-27T15:42:39.984842325Z
    ```

   The output shows that `QmdzvHZ...` is pinned across the three IPFS nodes within our cluster.

1. When you're finished playing around, kill the cluster:

   :::callout
   Depending on your system permissions, you may have to run the command as a root user.
   :::

    ```shell
    docker-compose kill

    > Killing cluster0 ... done
    > Killing cluster1 ... done
    > Killing cluster2 ... done
    > Killing ipfs1    ... done
    > Killing ipfs0    ... done
    > Killing ipfs2    ... done
    ```

   The terminal running the `ipfs-cluster-ctl` daemon will close any open connections:

    ```shell
    > ...
    > ipfs0 exited with code 137
    > ipfs1 exited with code 137
    > cluster0 exited with code 137
    > cluster2 exited with code 137
    > cluster1 exited with code 137
    > ipfs2 exited with code 137
    ```

## Next steps

If you want to delve deeper into IPFS Cluster, check out the project's documentation at [cluster.ipfs.io →](https://cluster.ipfs.io/)
