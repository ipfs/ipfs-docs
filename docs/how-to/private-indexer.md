---
title: How to Index a Private Network
sidebarDepth: 0
---

# How to Index a Private Network

This tutorial walks you through setting up a private IPFS network (using the standard swarm.key v1 mechanism) and then layering two optional components on top of it that make the network behave like a small, private "content-delivery network":

1. A Private Indexer - a swarm-scoped CID → providers registry, mirroring IPFS' content discovery mechanisms from the public DHT performantly.
2. A Swarm Accelerator - a small CDN-like HTTP gateway in front of the swarm that caches popular content, fetches blocks in parallel, and uses hedged retries to keep tail latency low across a distributed (and potentially heterogeneous) swarm.

Both extra components are [open source](https://github.com/neova-protocol/Private-Indexer), written in Go, and run as single-binary services "next to" a normal Kubo node, i.e. on the same servers and VPSs. They are 100% compatible with stock Kubo and do not modify the IPFS and IPNI protocols – they just optimize it for the kinds of private networks used in enterprise environments.

The example below uses 3 nodes for clarity. The same recipe scales to 10, 50, or 100 nodes - every node is configured the same way.
 
## Part 1 - Set up the private swarm

### Step 1.1 - Generate a swarm key

Every node in a private swarm must share the same swarm.key file. Any node without it cannot talk to the others, and nodes that have detected its presence will ignore every public IPFS peer in its search for peers to swarm with.

Generate a peer ID with a single command:

```sh         
mkdir -p ~/private-swarm && cd ~/private-swarm    
        
cat > swarm.key <<EOF    
/key/swarm/psk/1.0.0/    
/base16/    
$(od -vN 32 -An -tx1 /dev/urandom | tr -d ' \n')    
EOF    
        
cat swarm.key    
```

You should see three lines: the protocol identifier, the encoding marker, and a 64-character hex secret.
The file outputted by this is a precious secret and should be managed accordingly: it defines the boundary of your network!
Treat the swarm key at least as carefully as you do an SSH private key.
Anyone who has it can join your swarm.
 
### Step 1.2 — Write a shared init script

Every node needs the same Kubo configuration tweaks: drop public-network bootstrap peers, disable the public DHT, disable AutoConf (which would otherwise refuse to operate on a private network using an older version of Kubo, i.e. v0.37).
Kubo runs any script in /container-init.d/ on first launch, so we'll put our config changes there.

Save the following as ipfs-init.sh in the same directory:

```sh
#!/bin/sh    
set -e    
echo "[init] configuring Kubo for private swarm"    
        
# Drop public bootstrap nodes    
ipfs bootstrap rm --all 2>/dev/null || true    
        
# Disable the public DHT — we are not part of the public network    
ipfs config Routing.Type dhtclient 2>/dev/null || true    
        
# Disable relay (not needed in a private swarm)    
ipfs config --bool Swarm.RelayClient.Enabled false 2>/dev/null || true    
ipfs config --bool Swarm.RelayService.Enabled false 2>/dev/null || true    
        
# Disable AutoConf (Kubo v0.37+ refuses public AutoConf on private nets)    
ipfs config --bool AutoConf.Enabled false 2>/dev/null || true    
        
# Expose the HTTP API and gateway inside the container    
ipfs config Addresses.API     /ip4/0.0.0.0/tcp/5001 2>/dev/null || true    
ipfs config Addresses.Gateway /ip4/0.0.0.0/tcp/8080 2>/dev/null || true    
        
# Allow API access from any origin (dev setting — tighten in production)    
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["*"]' 2>/dev/null || true    
        
echo "[init] private swarm configuration done"    
```

Make it executable: `chmod +x ipfs-init.sh.`

### Step 1.3 - Start the first node (bootstrap node)

We'll designate `node1` as the swarm's bootstrap peer - every other node will discover the swarm through it.
Depending on your use case, you may want to put this node at a stable IPv4, IPv6, or domain name and/or configure additional authentication or access-gating to the domain;
 see [the glossary entry for multiaddresses](../concepts/glossary/#multiaddr) and
 [checking multiaddrs](../how-to/troubleshooting-kubo/#checking-multiaddrs) for additional information on how to make your bootstrap node findable to the rest of your private network.

```sh
docker network create swarm-net    
        
docker run -d --name ipfs-node1 --restart unless-stopped \    
    --network swarm-net \    
    -p 4001:4001 -p 5001:5001 -p 8080:8080 \    
    -v "$PWD/swarm.key:/data/ipfs/swarm.key:ro" \    
    -v "$PWD/ipfs-init.sh:/container-init.d/001-init.sh:ro" \    
    -v node1-data:/data/ipfs \    
    -e LIBP2P_FORCE_PNET=1 \    
    -e IPFS_SWARM_KEY_FILE=/data/ipfs/swarm.key \    
    -e IPFS_MIGRATE=true \    
    ipfs/kubo:v0.37.0    
```

Wait a few seconds for Kubo to initialise, then check its identity:

```sh         
docker exec ipfs-node1 ipfs id | jq .ID    
```         
 
You should see a peer ID that starts with something like `12D3KooW…`.
Save it somewhere - you'll use it when bootstrapping the other nodes.

### Step 1.4 - Start the worker nodes

`node2` and `node3` each get their own data volume, but mount the same `swarm.key` and `ipfs-init.sh`.
They use a different host port for the API + gateway so they do not collide on a single host (when you deploy on separate machines, you can use the standard ports).

```sh
# node2    
docker run -d --name ipfs-node2 --restart unless-stopped \    
    --network swarm-net \    
    -p 5002:5001 -p 8082:8080 \    
    -v "$PWD/swarm.key:/data/ipfs/swarm.key:ro" \    
    -v "$PWD/ipfs-init.sh:/container-init.d/001-init.sh:ro" \    
    -v node2-data:/data/ipfs \    
    -e LIBP2P_FORCE_PNET=1 \    
    -e IPFS_SWARM_KEY_FILE=/data/ipfs/swarm.key \    
    -e IPFS_MIGRATE=true \    
    ipfs/kubo:v0.37.0    
        
# node3    
docker run -d --name ipfs-node3 --restart unless-stopped \    
    --network swarm-net \    
    -p 5003:5001 -p 8083:8080 \    
    -v "$PWD/swarm.key:/data/ipfs/swarm.key:ro" \    
    -v "$PWD/ipfs-init.sh:/container-init.d/001-init.sh:ro" \    
    -v node3-data:/data/ipfs \    
    -e LIBP2P_FORCE_PNET=1 \    
    -e IPFS_SWARM_KEY_FILE=/data/ipfs/swarm.key \    
    -e IPFS_MIGRATE=true \    
    ipfs/kubo:v0.37.0    
```

### Step 1.5 - Connect the worker nodes to the bootstrap node

Grab node1's peer ID, build its libp2p multiaddr, then tell each worker to connect to it:

```sh
NODE1_ID=$(docker exec ipfs-node1 ipfs id -f '<id>')    
BOOTSTRAP=/dns4/ipfs-node1/tcp/4001/p2p/$NODE1_ID    
echo "$BOOTSTRAP"    
        
for NAME in ipfs-node2 ipfs-node3 ; do    
    docker exec "$NAME" ipfs bootstrap add "$BOOTSTRAP"    
    docker exec "$NAME" ipfs swarm connect "$BOOTSTRAP"    
done    
```

### Step 1.6 - Verify the swarm is working

Check that each node can see the others:

```sh
    docker exec ipfs-node1 ipfs swarm peers    
```

You should see two peers listed. Now prove that content flows across the swarm and only across the swarm:

```sh
# add an arbitrary test-file on node1    
CID=$(echo "hello private swarm" | docker exec -i ipfs-node1 ipfs add -q)    
echo "CID = $CID"    
        
# fetch it from node3 - should succeed in well under a second    
docker exec ipfs-node3 ipfs cat "$CID"    
```

If `ipfs cat` returns `hello private swarm` on `node3`, your private swarm is live.
Try the same CID from https://ipfs.io/ipfs/$CID in a browser - it will hang and time out, because public gateways are not part of your swarm and have no way to reach it.
That's the point.

## Part 2 - Add fast content discovery (Private Indexer)

So far, the private swarm works, but content discovery still goes through Bitswap's default wantlist broadcast, circulating peer-to-peer over the gossip protocol.
In small swarms, this is fine; in larger ones it can be wasteful to re-publish who hosts which CIDs every 24 hours, particularly in architectures where network traffic is expensive between the nodes.
Our next step is to run a private-swarm-intenal equivalent of the public IPNI "search index" which we can be more efficient for high-volume or speed-critical use-cases.

The Private Indexer is a simplified, miniaturized version of the IPNI HTTP service that maintains a CID → providers map just for your swarm.
At global scale, the IPNI indexing system can be very complicated to host, but for a private swarm less than 1% of the size, it is not such a feat of engineering, and can run on the same commodity hardware you would likely be using for the rest of your private swarm in a commercial usecase.
Every node tells the indexer "I have these CIDs", and any client can ask "who has CID X?" in O(1) time, which can be particularly helpful in cases where nodes of the private swarm are network-constrained or slow to gossip with the rest of the network.

These configurations can be modified, but for the purposes of our tutorial here, the swarm-internal indexer listens on port `:8090` and exposes:

```sh
Endpoint
Purpose
POST /announce
Register a peer + its CIDs (bearer-token protected)
GET  /providers?cid=<cid>
Look up providers for a CID, sorted by score
GET  /peers
List known peers and their last-seen metadata
GET  /health
Health check + uptime
GET  /metrics
Prometheus metrics
```

### Step 2.1 - Run the indexer on one host

Pick one node to host the indexer (any node will do - most operators put it on the bootstrap node). Run it as a container next to Kubo:

```sh
docker run -d --name swarm-indexer --restart unless-stopped \    
    --network swarm-net \    
    -p 8090:8090 \    
    -e INDEXER_LISTEN=:8090 \    
    -e INDEXER_TTL=24h \    
    -e INDEXER_AUTH_TOKEN="change-me-to-a-secret" \    
    -e INDEXER_PROBE_INTERVAL=30s \    
    -e INDEXER_PROBE_TIMEOUT=5s \    
    neova-protocol/private-swarm:latest \    
    private-indexer    
```

A quick sanity check will tell you if the node has enough resources to run the indexer as well as an ipfs node:

```sh
curl -s http://localhost:8090/health | jq    
```

### Step 2.2 - Run an announcer on every Kubo node

The announcer is a tiny sidecar process that polls `ipfs pin/ls` on a local Kubo node and pushes the resulting CID list to the indexer.
Run one alongside every Kubo container - including the one that hosts the indexer itself.

```sh
# on the host that runs ipfs-node1 (and the indexer)    
docker run -d --name announcer-node1 --restart unless-stopped \    
    --network swarm-net \    
    -e KUBO_API=http://ipfs-node1:5001 \    
    -e INDEXER_URL=http://swarm-indexer:8090 \    
    -e INDEXER_AUTH_TOKEN="ipfstoken" \    
    -e NODE_NAME=node1 \    
    neova-protocol/private-swarm:latest    
        
# on the host that runs ipfs-node2    
docker run -d --name announcer-node2 --restart unless-stopped \    
    --network swarm-net \    
    -e KUBO_API=http://ipfs-node2:5001 \    
    -e INDEXER_URL=http://<indexer-host>:8090 \    
    -e INDEXER_AUTH_TOKEN="change-me-to-a-secret" \    
    -e NODE_NAME=node2 \    
    neova-protocol/private-swarm:latest    
```

Now repeat/automate this for every node.

If the worker is on a different machine from the indexer, replace <indexer-host> with the indexer's reachable address (IP or DNS name) and make sure port 8090 is open between them.
The announcer runs a back-fill on startup, then polls every 30 seconds by default and re-announces the full pin set every 12 hours (so old records do not expire).

### Step 2.3 - Verify a CID gets announced and discovered

```sh
# pin some content on node2    
CID=$(echo "indexer demo $(date)" | docker exec -i ipfs-node2 ipfs add -q --pin=true)    
echo "CID = $CID"    
        
# wait a few seconds (or restart the announcer to trigger immediate backfill)    
docker restart announcer-node2    
        
# ask the indexer who has it    
curl -s "http://localhost:8090/providers?cid=$CID" | jq    
```

You should see one provider - node2's peer ID - with its multiaddrs and a score (freshness × latency × success rate).

## Part 3 - Add a CDN-like Accelerator

The accelerator is an HTTP gateway that sits between clients and the swarm.
It speaks the familiar GET /ipfs/<cid> path but adds:

- Indexer-guided provider selection - picks the top-N providers from the indexer instead of blasting Bitswap broadcasts
- In-memory LRU cache with configurable TTL
- Hedged retries - if the primary fetch is slow, a backup fetch starts after a small delay; the first to finish wins
- Prefetch + hot-set - keep a named set of CIDs perpetually warm
- Prometheus metrics

It listens on port `:8070` by default.

### Step 3.1 - Run the accelerator on each node that serves clients

You can run one on every node, or only on the nodes you want to use as public entry points (an "edge" tier). Each accelerator uses its local Kubo for block transfer and the central indexer for discovery.

```sh
docker run -d --name swarm-accelerator --restart unless-stopped \    
    --network swarm-net \    
    -p 8070:8070 \    
    -e ACCEL_LISTEN=:8070 \    
    -e INDEXER_URL=http://swarm-indexer:8090 \    
    -e KUBO_API=http://ipfs-node1:5001 \    
    -e ACCEL_MAX_PROVIDERS=3 \    
    -e ACCEL_FETCH_TIMEOUT=30s \    
    -e ACCEL_CACHE_MAX_SIZE=1000 \    
    -e ACCEL_CACHE_TTL=10m \    
    -e ACCEL_HEDGE_DELAY=200ms \    
    -e ACCEL_HEDGE_RETRIES=1 \    
    -e ACCEL_PREFETCH_CONCURRENCY=4 \    
    -e ACCEL_HOTSET_REFRESH=5m \    
    neova-protocol/private-swarm:latest \    
    swarm-accelerator    
```

Health check:

```sh
curl -s http://localhost:8070/health | jq '.status, .indexer'    
# → "ok"  "ok"
```

### Step 3.2 - Fetch a CID end-to-end

```sh         
# first request — cache miss, resolves via indexer    
curl -sI "http://localhost:8070/ipfs/$CID" | grep -i x-accel-    
        
# second request — cache hit    
curl -sI "http://localhost:8070/ipfs/$CID" | grep -i x-accel-    
```

Useful headers to look for:

- Header -- Meaning
- `X-Accel-Source: indexer` -- Resolved provider through the indexer
- `X-Accel-Source: cache` -- Served from the in-memory cache
- `X-Accel-Source: fallback` -- Indexer had no record; fell back to default Bitswap
- `X-Accel-Providers: N` -- N is the number of providers considered
- `X-Accel-Fetch-Strategy` -- primary or hedged depending on which fetch won
- `X-Accel-Duration-Ms` -- Fetch duration in milliseconds

The accelerator also exposes CDN-style endpoints for prefetching and hot-set management - see the repository README for the full reference.

## Part 4 - Putting it all together with Docker Compose (optional)

For a single-host deployment, the easiest production layout is a single `docker-compose.yml` that brings everything up in the right order.
Drop this next to your `swarm.key` and `ipfs-init.sh`:

```yaml
    services:    
      ipfs:    
        image: ipfs/kubo:v0.37.0    
        restart: unless-stopped    
        environment:    
          - LIBP2P_FORCE_PNET=1    
          - IPFS_SWARM_KEY_FILE=/data/ipfs/swarm.key    
          - IPFS_MIGRATE=true    
        volumes:    
          - ipfs-data:/data/ipfs    
          - ./swarm.key:/data/ipfs/swarm.key:ro    
          - ./ipfs-init.sh:/container-init.d/001-init.sh:ro    
        ports:    
          - "4001:4001"    
          - "5001:5001"    
          - "8080:8080"    
         
      indexer:    
        image: ghcr.io/<your-org>/private-swarm:latest    
        restart: unless-stopped    
        command: ["private-indexer"]    
        environment:    
          - INDEXER_LISTEN=:8090    
          - INDEXER_TTL=24h    
          - INDEXER_AUTH_TOKEN=change-me    
        ports:    
          - "8090:8090"    
         
      announcer:    
        image: ghcr.io/<your-org>/private-swarm:latest    
        restart: unless-stopped    
        depends_on: [ipfs, indexer]    
        environment:    
          - KUBO_API=http://ipfs:5001    
          - INDEXER_URL=http://indexer:8090    
          - INDEXER_AUTH_TOKEN=change-me    
         
      accelerator:    
        image: ghcr.io/<your-org>/private-swarm:latest    
        restart: unless-stopped    
        command: ["swarm-accelerator"]    
        depends_on: [ipfs, indexer]    
        environment:    
          - ACCEL_LISTEN=:8070    
          - INDEXER_URL=http://indexer:8090    
          - KUBO_API=http://ipfs:5001    
        ports:    
          - "8070:8070"    
         
    volumes:    
      ipfs-data:    
```  

Then launch the services defined in that configuration file:

```sh
docker compose up -d    
docker compose logs -f    
```

For a multi-host swarm, run the ipfs + announcer (+ optionally accelerator) services on every host, and run the indexer service on exactly one host.
Point every worker's INDEXER_URL at the indexer host's IP, and make sure port 8090 is open between them.

## Configuration reference

### Private Indexer

| Variable | Default | Purpose |
| :---- | :---- | :---- |
| INDEXER\_LISTEN | :8090 | HTTP listen address |
| INDEXER\_TTL | 24h | Provider record expiry |
| INDEXER\_GC\_INTERVAL | 5m | Expired-record sweep interval |
| INDEXER\_AUTH\_TOKEN | *(off)* | Required bearer token on POST /announce |
| INDEXER\_ALLOWED\_PEERS | *(any)* | Comma-separated peer-ID allow-list |
| INDEXER\_PROBE\_INTERVAL | 30s | Background RTT probe interval |
| INDEXER\_PROBE\_TIMEOUT | 5s | RTT probe dial timeout |

### Announcer

| Variable | Default | Purpose |
| :---- | :---- | :---- |
| KUBO\_API | http://localhost:5001 | Local Kubo HTTP API |
| INDEXER\_URL | http://localhost:8090 | Target indexer |
| INDEXER\_AUTH\_TOKEN | *(off)* | Bearer token for POST /announce |
| ANNOUNCE\_INTERVAL | 30s | Pin-list poll interval |
| REANNOUNCE\_INTERVAL | 12h | Full re-announce period |
| ANNOUNCE\_BATCH\_SIZE | 1000 | Max CIDs per announce request |
| NODE\_NAME | *(empty)* | Free-form per-node label |

### Swarm Accelerator

| Variable | Default | Purpose |
| :---- | :---- | :---- |
| ACCEL\_LISTEN | :8070 | HTTP listen address |
| INDEXER\_URL | *(req)* | Indexer to query for providers |
| KUBO\_API | *(req)* | Local Kubo HTTP API |
| ACCEL\_MAX\_PROVIDERS | 3 | Top-N providers per request |
| ACCEL\_FETCH\_TIMEOUT | 30s | Per-fetch timeout |
| ACCEL\_CACHE\_MAX\_SIZE | 1000 | LRU cache entries |
| ACCEL\_CACHE\_TTL | 10m | Cache entry TTL |
| ACCEL\_HEDGE\_DELAY | 200ms | Delay before launching backup fetch |
| ACCEL\_HEDGE\_RETRIES | 1 | Retries on primary failure |
| ACCEL\_PREFETCH\_CONCURRENCY | 4 | Concurrent prefetch workers |
| ACCEL\_HOTSET\_REFRESH | 5m | Hot-set re-warm interval |

## **Troubleshooting**

| Symptom | Cause / fix |
| :---- | :---- |
| ipfs swarm peers returns nothing on the workers | Bootstrap step failed. Re-run Step 1.5 with the correct NODE1\_ID and check LIBP2P\_FORCE\_PNET=1 is set. |
| ipfs cat \<cid\> from node3 hangs even though it works on node1 | Workers cannot reach node1's port 4001, or the swarm.key files differ. Verify both with sha256sum swarm.key on each host. |
| curl http://localhost:8090/providers?cid=... returns 0 results | The announcer is not registering with the indexer. Check the announcer logs, the INDEXER\_URL, and the auth token match. |
| Accelerator GET /ipfs/\<cid\> returns 502 | The CID is a directory or unixfs DAG — ipfs cat cannot dereference those. Request a leaf CID, or use the standard Kubo gateway. |
| Public gateways can fetch your content | LIBP2P\_FORCE\_PNET=1 is not set or swarm.key is missing in the Kubo container. The node has fallen back to the public network. |
| unauthorized errors in announcer logs | INDEXER\_AUTH\_TOKEN on the announcer does not match the one on the indexer. |

## **Where to go next**

- **Source code** \- https://github.com/neova-protocol/Private-Indexer
- **Indexer protocol spec** \- see docs/indexer-technical-guide.md in the repository for the full HTTP \+ JSON schema and the scoring algorithm.
- **Accelerator deep dive** \- see accelerator-technicalguide.md for the hedged-fetch and hot-set algorithms.
- **Private swarm key concepts** \- the Kubo manual's section on private networks.
