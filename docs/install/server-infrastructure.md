---
title: Server infrastructure
description: IPFS Cluster provides data orchestration across a swarm of IPFS daemons by allocating, replicating, and tracking a global pin-set distributed among multiple peers. Learn how to install it here.
current-ipfs-cluster-version: v0.9.1
---

# Server infrastructure

If you want to install IPFS in a server environment and offer IPFS as a service, you should look at IPFS Cluster. IPFS Cluster provides data orchestration across a swarm of IPFS daemons by allocating, replicating, and tracking a global pin-set distributed among multiple peers. This makes it significantly easier to manage multiple IPFS nodes and ensure that data is available across an internal network.

## Create a local cluster

To see if IPFS Cluster is suitable for your project, follow this quick start guide and spin up a local IPFS Cluster instance. At the end of this guide, you will have a solid understanding of how IPFS Cluster is set up and how to interact with it. If you'd rather create a production-ready cluster, take a look at the [official IPFS Cluster documentation →](https://cluster.ipfs.io/)

### Prerequisites

You must have both [Docker](https://docs.docker.com/install/) and [Docker Compose](https://docs.docker.com/compose/install/) installed. Check that they're both installed properly by asking for their version:

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

If you're having issues here, head over to the [official Docker documentation to fix your problem →](https://docs.docker.com/)

### Steps

1. Download the latest `ipfs-cluster-ctl` package from [dist.ipfs.io](https://dist.ipfs.io/#ipfs-cluster-ctl):

    ```shell
    wget https://dist.ipfs.io/ipfs-cluster-ctl/v0.9.1/ipfs-cluster-ctl_v0.9.1_linux-amd64.tar.gz
    ```

1. Unzip the package:

    ```shell
    tar xvzf ipfs-cluster-ctl_v0.9.1_linux-amd64.tar.gz

    > ipfs-cluster-ctl/ipfs-cluster-ctl
    > ipfs-cluster-ctl/LICENSE
    > ipfs-cluster-ctl/LICENSE-APACHE
    > ipfs-cluster-ctl/LICENSE-MIT
    > ipfs-cluster-ctl/README.md
    ```

1. Download the [`docker-compose.yml` file](https://raw.githubusercontent.com/ipfs/ipfs-cluster/v0.9.1/docker-compose.yml) and place it into the `ipfs-cluster-ctl` directory:

    ```shell
    wget https://raw.githubusercontent.com/ipfs/ipfs-cluster/v0.9.1/docker-compose.yml
    ```

1. Start the cluster using `docker-compose`. You may have to run as root:

    ```shell
    docker-compose up

    > Recreating ipfs2 ... done
    > Recreating ipfs1    ... done
    > Recreating ipfs0    ... done
    > Recreating cluster2 ... done
    > ...
    ```

You may see some errors like:

    ```shell
    cluster2    | 2020-10-27T15:20:15.116Z  ERROR   ipfshttp    error posting to IPFS:Post "http://172.18.0.2:5001/api/v0/pin/ls?type=recursive": dial tcp 172.18.0.2:5001: connect: connection refused
    ```

You can safely ignore these for now. They're showing because some of the IPFS nodes within the cluster haven't finished spinning up yet. Everything should have loaded after a couple of minutes:

    ```shell
    > ipfs1       | API server listening on /ip4/0.0.0.0/tcp/5001
    > ipfs1       | WebUI: http://0.0.0.0:5001/webui
    > ipfs1       | Gateway (readonly) server listening on /ip4/0.0.0.0/tcp/8080
    > ipfs1       | Daemon is ready
    ```

1. You can now interact with your cluster. In a new terminal, navigate to the `ipfs-cluster-ctl` directory and list the peers within the cluster:

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

This shows us that `QmdzvHZ...` is pinned across the three IPFS nodes within our cluster.

1. When you're finished playing around, kill the cluster. You may have to run this as root:

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
