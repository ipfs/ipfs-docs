---
title: Install IPFS Kubo inside Docker
description: You can run IPFS inside Docker to simplify your deployment processes, and horizontally scale your IPFS infrastructure.
current-ipfs-version: v0.35.0
---

# Install IPFS Kubo inside Docker

You can run Kubo IPFS inside Docker to simplify your deployment processes, as well as horizontally scale your IPFS infrastructure.

## Set up

1. Grab the IPFS docker image hosted at [hub.docker.com/r/ipfs/kubo](https://hub.docker.com/r/ipfs/kubo/).
1. To make files visible inside the container, you need to mount a host directory with the `-v` option to Docker. Choose a directory that you want to use to import and export files from IPFS. You should also choose a directory to store IPFS files that will persist when you restart the container.

    ```shell
    export ipfs_staging=</absolute/path/to/somewhere/>
    export ipfs_data=</absolute/path/to/somewhere_else/>
    ```

1. Start a container running ipfs and expose ports `4001` (P2P TCP/QUIC transports), `5001` (RPC API) and `8080` (Gateway):

    ```shell
    docker run -d --name ipfs_host -v $ipfs_staging:/export -v $ipfs_data:/data/ipfs -p 4001:4001 -p 4001:4001/udp -p 127.0.0.1:8080:8080 -p 127.0.0.1:5001:5001 ipfs/kubo:v0.35.0
    ```

    ::: danger NEVER EXPOSE THE RPC API TO THE PUBLIC INTERNET

    The API port provides admin-level access to your IPFS node.  See [RPC API docs](../reference/kubo/rpc.md) for more information.

    :::

1. Watch the ipfs log:

    ```shell
    docker logs -f ipfs_host
    ```

1. Wait for IPFS to start:

    ```shell
    RPC API server listening on /ip4/0.0.0.0/tcp/5001
    WebUI: http://0.0.0.0:5001/webui
    Gateway server listening on /ip4/0.0.0.0/tcp/8080
    Daemon is ready
    ```

    You can now stop watching the log.

1. Run IPFS commands with `docker exec ipfs_host ipfs <args...>`. For example:

    To connect to peers:

    ```shell
    docker exec ipfs_host ipfs swarm peers
    ```

    To add files:

    ```shell
    cp -r <something> $ipfs_staging
    docker exec ipfs_host ipfs add -r /export/<something>
    ```

1. Stop the running container:

    ```shell
    docker stop ipfs_host
    ```

When starting a container running ipfs for the first time with an empty data directory, it will call `ipfs init` to initialize configuration files and generate a new keypair. At this time, you can choose which profile to apply using the `IPFS_PROFILE` environment variable:

```shell
docker run -d --name ipfs_host -e IPFS_PROFILE=server -v $ipfs_staging:/export -v $ipfs_data:/data/ipfs -p 4001:4001 -p 4001:4001/udp -p 127.0.0.1:8080:8080 -p 127.0.0.1:5001:5001 ipfs/kubo:v0.35.0
```

## Customizing your node

Custom initialization code can be run by mounting scripts in the `/container-init.d` directory in the container. These are executed sequentially and in lexicographic order, after `ipfs init` is run and the swarm keys are copied (if the IPFS repo needs initialization), and before the IPFS daemon is started.

Since this runs each time the container is started, you should check if your initialization code should be idempotent, particularly if you're persisting state outside of the container (e.g. using mounted directories).

For example, this sets a custom bootstrap node before the daemon starts:

```shell
#!/bin/sh
set -ex
ipfs bootstrap rm all
ipfs bootstrap add "/ip4/$PRIVATE_PEER_IP_ADDR/tcp/4001/ipfs/$PRIVATE_PEER_ID"
```

This shows how to mount the file into the `container-init.d` directory when running the container:

```shell
docker run -d --name ipfs \
  -e PRIVATE_PEER_ID=... \
  -e PRIVATE_PEER_IP_ADDR=... \
  -v ./001-test.sh:/container-init.d/001-test.sh \
  -p 4001:4001 \
  -p 127.0.0.1:8080:8080 \
  -p 127.0.0.1:5001:5001 \
  ipfs/kubo
```

:::tip Use in custom images
See the `gateway` example on the [go-ipfs-docker-examples repository](https://github.com/ipfs-shipyard/go-ipfs-docker-examples)
:::

## Configuring resource limits

When deploying IPFS Kubo in containerized environments, it's crucial to align the Go runtime's resource awareness with the container's defined resource constraints via environment variables:

- `GOMAXPROCS`: Configures the maximum number of OS threads that can execute Go code concurrently (should not be bigger than the hard container limit set via `docker --cpus`)
- `GOMEMLIMIT`: Sets the soft [memory allocation limit for the Go runtime](https://tip.golang.org/doc/gc-guide#Memory_limit) (should be slightly below the hard limit set for container via `docker --memory`)

Example:

```shell
docker run # (....)
    --cpus="4.0" -e GOMAXPROCS=4 \
    --memory="8000m" -e GOMEMLIMIT=7500MiB \
    ipfs/kubo:v0.35.0
```

## Private swarms inside Docker

It is possible to initialize the container with a swarm key file (`/data/ipfs/swarm.key`) using the variables `IPFS_SWARM_KEY` and `IPFS_SWARM_KEY_FILE`. The `IPFS_SWARM_KEY` creates `swarm.key` with the contents of the variable itself, while `IPFS_SWARM_KEY_FILE` copies the key from a path stored in the variable. The `IPFS_SWARM_KEY_FILE` **overwrites** the key generated by `IPFS_SWARM_KEY`.

```shell
docker run -d --name ipfs_host -e IPFS_SWARM_KEY=<your swarm key> -v $ipfs_staging:/export -v $ipfs_data:/data/ipfs -p 4001:4001 -p 4001:4001/udp -p 127.0.0.1:8080:8080 -p 127.0.0.1:5001:5001 ipfs/kubo:v0.35.0
```

The swarm key initialization can also be done using docker secrets, and requires `docker swarm` or `docker-compose`:

```shell
cat your_swarm.key | docker secret create swarm_key_secret -
docker run -d --name ipfs_host --secret swarm_key_secret -e IPFS_SWARM_KEY_FILE=/run/secrets/swarm_key_secret -v $ipfs_staging:/export -v $ipfs_data:/data/ipfs -p 4001:4001 -p 4001:4001/udp -p 127.0.0.1:8080:8080 -p 127.0.0.1:5001:5001 ipfs/kubo:v0.35.0
```

## Key rotation inside Docker

It is possible to do key rotation in an ephemeral container that is temporarily executing against a volume that is mounted under `/data/ipfs`:

```shell
# given container named 'ipfs-test' that persists repo at /path/to/persisted/.ipfs
docker run -d --name ipfs-test -v /path/to/persisted/.ipfs:/data/ipfs ipfs/kubo:v0.35.0
docker stop ipfs-test  

# key rotation works like this (old key saved under 'old-self')
docker run --rm -it -v /path/to/persisted/.ipfs:/data/ipfs ipfs/kubo:v0.35.0 key rotate -o old-self -t ed25519
docker start ipfs-test # will start with the new key
```
