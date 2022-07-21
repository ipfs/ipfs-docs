---
title: Implementation status
description: See the current status of various aspects of the core IPFS implementations.
---

# IPFS implementation status

### Legend: :green_heart: Done &nbsp; :yellow_heart: In Progress &nbsp; :broken_heart: Missing &nbsp; :heavy_minus_sign: Not planned

## Bitswap

### CLI

| Command                     |      Go       |       JS       |
| --------------------------- | :-----------: | :------------: |
| **`ipfs ledger`**           | :green_heart: | :yellow_heart: |
| **`ipfs reprovide`**        | :green_heart: | :broken_heart: |
| **`ipfs bitswap stat`**     | :green_heart: | :green_heart:  |
| **`ipfs bitswap unwant`**   | :green_heart: | :green_heart:  |
| **`ipfs bitswap wantlist`** | :green_heart: | :green_heart:  |

### HTTP

| Endpoint                        |      Go       |       JS       |
| ------------------------------- | :-----------: | :------------: |
| **`/api/v0/bitswap/ledger`**    | :green_heart: | :yellow_heart: |
| **`/api/v0/bitswap/reprovide`** | :green_heart: | :broken_heart: |
| **`/api/v0/bitswap/stat`**      | :green_heart: | :green_heart:  |
| **`/api/v0/bitswap/unwant`**    | :green_heart: | :green_heart:  |
| **`/api/v0/bitswap/wantlist`**  | :green_heart: | :green_heart:  |

### Core

See [bitswap](https://github.com/ipfs/js-ipfs/blob/master/docs/core-api/BITSWAP.md).

## Block

### CLI

| Command               |      Go       |      JS       |
| --------------------- | :-----------: | :-----------: |
| **`ipfs block get`**  | :green_heart: | :green_heart: |
| `key`                 | :green_heart: | :green_heart: |
| **`ipfs block put`**  | :green_heart: | :green_heart: |
| `data`                | :green_heart: | :green_heart: |
| `format`              | :green_heart: | :green_heart: |
| `mhtype`              | :green_heart: | :green_heart: |
| `mhlen`               | :green_heart: | :green_heart: |
| **`ipfs block rm`**   | :green_heart: | :green_heart: |
| `hash`                | :green_heart: | :green_heart: |
| `force`               | :green_heart: | :green_heart: |
| **`ipfs block stat`** | :green_heart: | :green_heart: |
| `key`                 | :green_heart: | :green_heart: |

### HTTP

| Endpoint                 |      Go       |      JS       |
| ------------------------ | :-----------: | :-----------: |
| **`/api/v0/block/get`**  | :green_heart: | :green_heart: |
| **`/api/v0/block/put`**  | :green_heart: | :green_heart: |
| `format=`                | :green_heart: | :green_heart: |
| `mhtype=`                | :green_heart: | :green_heart: |
| `mhlen=`                 | :green_heart: | :green_heart: |
| **`/api/v0/block/rm`**   | :green_heart: | :green_heart: |
| `force=`                 | :green_heart: | :green_heart: |
| **`/api/v0/block/stat`** | :green_heart: | :green_heart: |

### Core

See [block](https://github.com/ipfs/js-ipfs/blob/master/docs/core-api/BLOCK.md).

## Bootstrap

### CLI

| Command                   |      Go       |      JS       |
| ------------------------- | :-----------: | :-----------: |
| **`ipfs bootstrap add`**  | :green_heart: | :green_heart: |
| `default=`                | :green_heart: | :green_heart: |
| **`ipfs bootstrap list`** | :green_heart: | :green_heart: |
| **`ipfs bootstrap rm`**   | :green_heart: | :green_heart: |
| `all=`                    | :green_heart: | :green_heart: |

### HTTP

| Endpoint                            |      Go       |      JS       |
| ----------------------------------- | :-----------: | :-----------: |
| **`/api/v0/bootstrap/add`**         | :green_heart: | :green_heart: |
| `default=`                          | :green_heart: | :green_heart: |
| **`/api/v0/bootstrap/add/default`** | :green_heart: | :green_heart: |
| **`/api/v0/bootstrap/list`**        | :green_heart: | :green_heart: |
| **`/api/v0/bootstrap/rm`**          | :green_heart: | :green_heart: |
| `all=`                              | :green_heart: | :green_heart: |
| **`/api/v0/bootstrap/rm/all`**      | :green_heart: | :green_heart: |

### Core

See [bootstrap](https://github.com/ipfs/js-ipfs/blob/master/docs/core-api/BOOTSTRAP.md).

## Config

### CLI

| Command                   |      Go       |         JS         |
| ------------------------- | :-----------: | :----------------: |
| **`ipfs config edit`**    | :green_heart: |   :green_heart:    |
| **`ipfs config`**         | :green_heart: |   :green_heart:    |
| `bool=`                   | :green_heart: |   :green_heart:    |
| `json=`                   | :green_heart: |   :green_heart:    |
| **`ipfs config replace`** | :green_heart: |   :green_heart:    |
| **`ipfs config show`**    | :green_heart: |   :green_heart:    |
| **`ipfs log level`**      | :green_heart: | :heavy_minus_sign: |
| **`ipfs log ls`**         | :green_heart: | :heavy_minus_sign: |
| **`ipfs log tail`**       | :green_heart: | :heavy_minus_sign: |

### HTTP

| Endpoint                     |      Go       |         JS         |
| ---------------------------- | :-----------: | :----------------: |
| **`/api/v0/config/edit`**    | :green_heart: | :heavy_minus_sign: |
| **`/api/v0/config`**         | :green_heart: |   :green_heart:    |
| `bool=`                      | :green_heart: |   :green_heart:    |
| `json=`                      | :green_heart: |   :green_heart:    |
| **`/api/v0/config/replace`** | :green_heart: |   :green_heart:    |
| **`/api/v0/config/show`**    | :green_heart: |   :green_heart:    |
| **`/api/v0/log/level`**      | :green_heart: | :heavy_minus_sign: |
| **`/api/v0/log/ls`**         | :green_heart: | :heavy_minus_sign: |
| **`/api/v0/log/tail`**       | :green_heart: | :heavy_minus_sign: |

### Core

See [config](https://github.com/ipfs/js-ipfs/blob/master/docs/core-api/CONFIG.md).

## DAG

### CLI

| Command                |      Go       |       JS       |
| ---------------------- | :-----------: | :------------: |
| **`ipfs dag export`**  | :green_heart: | :broken_heart: |
| **`ipfs dag get`**     | :green_heart: | :green_heart:  |
| **`ipfs dag import`**  | :green_heart: | :broken_heart: |
| **`ipfs dag put`**     | :green_heart: | :green_heart:  |
| **`ipfs dag resolve`** | :green_heart: | :green_heart:  |

### HTTP

| Command                   |      Go       |       JS       |
| ------------------------- | :-----------: | :------------: |
| **`/api/v0/dag/export`**  | :green_heart: | :broken_heart: |
| **`/api/v0/dag/get`**     | :green_heart: | :green_heart:  |
| **`/api/v0/dag/import`**  | :green_heart: | :broken_heart: |
| **`/api/v0/dag/put`**     | :green_heart: | :green_heart:  |
| **`/api/v0/dag/resolve`** | :green_heart: | :green_heart:  |

### Core

See [dag](https://github.com/ipfs/js-ipfs/blob/master/docs/core-api/DAG.md).

## Stats and diagnostics

### CLI

| Command                       |      Go       |         JS         |
| ----------------------------- | :-----------: | :----------------: |
| **`ipfs stats bitswap`**      | :green_heart: |   :green_heart:    |
| **`ipfs stats bw`**           | :green_heart: |   :green_heart:    |
| `peer`                        | :green_heart: |   :green_heart:    |
| `proto`                       | :green_heart: |   :green_heart:    |
| `poll`                        | :green_heart: |   :green_heart:    |
| `interval`                    | :green_heart: |   :green_heart:    |
| **`ipfs stats repo`**         | :green_heart: |   :green_heart:    |
| **`ipfs diag cmds`**          | :green_heart: | :heavy_minus_sign: |
| **`ipfs diag cmds clear`**    | :green_heart: | :heavy_minus_sign: |
| **`ipfs diag cmds set-time`** | :green_heart: | :heavy_minus_sign: |
| `time`                        | :green_heart: | :heavy_minus_sign: |
| **`ipfs diag sys`**           | :green_heart: | :heavy_minus_sign: |

### HTTP

| Endpoint                         |      Go       |         JS         |
| -------------------------------- | :-----------: | :----------------: |
| **`/api/v0/stats/bitswap`**      | :green_heart: |   :green_heart:    |
| **`/api/v0/stats/bw`**           | :green_heart: |   :green_heart:    |
| `peer=`                          | :green_heart: |   :green_heart:    |
| `proto=`                         | :green_heart: |   :green_heart:    |
| `poll=`                          | :green_heart: |   :green_heart:    |
| `interval=`                      | :green_heart: |   :green_heart:    |
| **`/api/v0/stats/repo`**         | :green_heart: |   :green_heart:    |
| **`/api/v0/diag/cmds`**          | :green_heart: | :heavy_minus_sign: |
| **`/api/v0/diag/cmds/clear`**    | :green_heart: | :heavy_minus_sign: |
| **`/api/v0/diag/cmds/set-time`** | :green_heart: | :heavy_minus_sign: |
| `arg=`                           | :green_heart: | :heavy_minus_sign: |
| **`/api/v0/net`**                | :green_heart: | :heavy_minus_sign: |
| `vis`                            | :green_heart: | :heavy_minus_sign: |
| **`/api/v0/sys`**                | :green_heart: | :heavy_minus_sign: |

### Core

See [stats](https://github.com/ipfs/js-ipfs/blob/master/docs/core-api/STATS.md).

## DHT

### CLI

| Command                  |      Go       |       JS       |
| ------------------------ | :-----------: | :------------: |
| **`ipfs dht findpeer`**  | :green_heart: | :green_heart:  |
| `verbose=`               | :green_heart: | :broken_heart: |
| **`ipfs dht findprovs`** | :green_heart: | :green_heart:  |
| `verbose=`               | :green_heart: | :broken_heart: |
| `num-providers=`         | :green_heart: | :green_heart:  |
| **`ipfs dht get`**       | :green_heart: | :green_heart:  |
| `verbose=`               | :green_heart: | :broken_heart: |
| **`ipfs dht provide`**   | :green_heart: | :green_heart:  |
| `verbose=`               | :green_heart: | :broken_heart: |
| `recursive=`             | :green_heart: | :broken_heart: |
| **`ipfs dht put`**       | :green_heart: | :green_heart:  |
| `verbose=`               | :green_heart: | :broken_heart: |
| **`ipfs dht query`**     | :green_heart: | :broken_heart: |
| `verbose=`               | :green_heart: | :broken_heart: |

### HTTP

| Endpoint                    |      Go       |       JS       |
| --------------------------- | :-----------: | :------------: |
| **`/api/v0/dht/findpeer`**  | :green_heart: | :green_heart:  |
| `verbose=`                  | :green_heart: | :broken_heart: |
| **`/api/v0/dht/findprovs`** | :green_heart: | :green_heart:  |
| `verbose=`                  | :green_heart: | :broken_heart: |
| `num-providers=`            | :green_heart: | :green_heart:  |
| **`/api/v0/dht/get`**       | :green_heart: | :green_heart:  |
| `verbose=`                  | :green_heart: | :broken_heart: |
| **`/api/v0/dht/provide`**   | :green_heart: | :green_heart:  |
| `verbose=`                  | :green_heart: | :broken_heart: |
| `recursive=`                | :green_heart: | :broken_heart: |
| **`/api/v0/dht/put`**       | :green_heart: | :green_heart:  |
| `verbose=`                  | :green_heart: | :broken_heart: |
| **`/api/v0/dht/query`**     | :green_heart: | :green_heart:  |
| `verbose=`                  | :green_heart: | :broken_heart: |

### Core

See [dht](https://github.com/ipfs/js-ipfs/blob/master/docs/core-api/DHT.md).

## Files

### CLI

| Command                |      Go       |       JS       |
| ---------------------- | :-----------: | :------------: |
| **`ipfs add`**         | :green_heart: | :green_heart:  |
| `file`                 | :green_heart: | :green_heart:  |
| `recursive`            | :green_heart: | :green_heart:  |
| `quiet`                | :green_heart: | :green_heart:  |
| `quieter`              | :green_heart: | :green_heart:  |
| `silent`               | :green_heart: | :green_heart:  |
| `progress`             | :green_heart: | :green_heart:  |
| `trickle`              | :green_heart: | :green_heart:  |
| `only-hash`            | :green_heart: | :green_heart:  |
| `wrap-with-directory`  | :green_heart: | :green_heart:  |
| `hidden`               | :green_heart: | :broken_heart: |
| `chunker`              | :green_heart: | :green_heart:  |
| `pin`                  | :green_heart: | :green_heart:  |
| `raw-leaves`           | :green_heart: | :green_heart:  |
| `nocopy`               | :green_heart: | :broken_heart: |
| `fscache`              | :green_heart: | :broken_heart: |
| `cid-version`          | :green_heart: | :green_heart:  |
| `hash`                 | :green_heart: | :green_heart:  |
| **`ipfs cat`**         | :green_heart: | :green_heart:  |
| **`ipfs ls`**          | :green_heart: | :green_heart:  |
| `headers`              | :green_heart: | :yellow_heart: |
| `resolve-type`         | :green_heart: | :yellow_heart: |
| **`ipfs file ls`**     | :green_heart: | :green_heart:  |
| **`ipfs files cp`**    | :green_heart: | :green_heart:  |
| `flush`                | :green_heart: | :green_heart:  |
| **`ipfs files flush`** | :green_heart: | :green_heart:  |
| **`ipfs files ls`**    | :green_heart: | :green_heart:  |
| **`ipfs files mkdir`** | :green_heart: | :green_heart:  |
| `parents`              | :green_heart: | :green_heart:  |
| `flush`                | :green_heart: | :green_heart:  |
| **`ipfs files mv`**    | :green_heart: | :green_heart:  |
| `flush`                | :green_heart: | :green_heart:  |
| **`ipfs files read`**  | :green_heart: | :green_heart:  |
| `offset`               | :green_heart: | :green_heart:  |
| `count`                | :green_heart: | :green_heart:  |
| **`ipfs files rm`**    | :green_heart: | :green_heart:  |
| `recursive`            | :green_heart: | :green_heart:  |
| **`ipfs files stat`**  | :green_heart: | :green_heart:  |
| `format`               | :green_heart: | :broken_heart: |
| `hash`                 | :green_heart: | :green_heart:  |
| `size`                 | :green_heart: | :green_heart:  |
| `with-local`           | :green_heart: | :green_heart:  |
| **`ipfs files write`** | :green_heart: | :green_heart:  |
| `offset`               | :green_heart: | :green_heart:  |
| `create`               | :green_heart: | :green_heart:  |
| `parents`              | :green_heart: | :green_heart:  |
| `truncate`             | :green_heart: | :green_heart:  |
| `count`                | :green_heart: | :green_heart:  |
| `raw-leaves`           | :green_heart: | :green_heart:  |
| `cid-version`          | :green_heart: | :green_heart:  |
| `hash`                 | :green_heart: | :green_heart:  |

### HTTP

| Endpoint                  |      Go       |       JS       |
| ------------------------- | :-----------: | :------------: |
| **`/api/v0/add`**         | :green_heart: | :green_heart:  |
| `recursive=`              | :green_heart: | :green_heart:  |
| `quiet=`                  | :green_heart: | :green_heart:  |
| `quieter=`                | :green_heart: | :green_heart:  |
| `silent=`                 | :green_heart: | :green_heart:  |
| `progress=`               | :green_heart: | :green_heart:  |
| `trickle=`                | :green_heart: | :green_heart:  |
| `only-hash=`              | :green_heart: | :green_heart:  |
| `wrap-with-directory`     | :green_heart: | :green_heart:  |
| `hidden`                  | :green_heart: | :broken_heart: |
| `chunker`                 | :green_heart: | :green_heart:  |
| `pin`                     | :green_heart: | :green_heart:  |
| `raw-leaves`              | :green_heart: | :green_heart:  |
| `nocopy`                  | :green_heart: | :broken_heart: |
| `fscache`                 | :green_heart: | :broken_heart: |
| `cid-version`             | :green_heart: | :green_heart:  |
| `hash`                    | :green_heart: | :green_heart:  |
| **`/api/v0/cat`**         | :green_heart: | :green_heart:  |
| **`/api/v0/ls`**          | :green_heart: | :green_heart:  |
| `headers=`                | :green_heart: | :yellow_heart: |
| `resolve-type=`           | :green_heart: | :yellow_heart: |
| **`/api/v0/file/ls`**     | :green_heart: | :green_heart:  |
| **`/api/v0/files/cp`**    | :green_heart: | :green_heart:  |
| `flush=,f=`               | :green_heart: | :green_heart:  |
| **`/api/v0/files/flush`** | :green_heart: | :green_heart:  |
| **`/api/v0/files/ls`**    | :green_heart: | :green_heart:  |
| `l=`                      | :green_heart: | :green_heart:  |
| `flush=,f=`               | :green_heart: | :green_heart:  |
| **`/api/v0/files/mkdir`** | :green_heart: | :green_heart:  |
| `parents=,p=`             | :green_heart: | :green_heart:  |
| `flush=,f=`               | :green_heart: | :green_heart:  |
| **`/api/v0/files/mv`**    | :green_heart: | :green_heart:  |
| `flush=,f=`               | :green_heart: | :green_heart:  |
| **`/api/v0/files/read`**  | :green_heart: | :green_heart:  |
| `offset=,o=`              | :green_heart: | :green_heart:  |
| `count=,n=`               | :green_heart: | :green_heart:  |
| `flush=,f=`               | :green_heart: | :green_heart:  |
| **`/api/v0/files/rm`**    | :green_heart: | :green_heart:  |
| `recursive=,r=`           | :green_heart: | :green_heart:  |
| `flush=,f=`               | :green_heart: | :green_heart:  |
| **`/api/v0/files/stat`**  | :green_heart: | :green_heart:  |
| `flush=,f=`               | :green_heart: | :green_heart:  |
| **`/api/v0/files/write`** | :green_heart: | :green_heart:  |
| `offset=,o=`              | :green_heart: | :green_heart:  |
| `create=,e=`              | :green_heart: | :green_heart:  |
| `truncate=,t=`            | :green_heart: | :green_heart:  |
| `count=,n=`               | :green_heart: | :green_heart:  |
| `flush=,f=`               | :green_heart: | :green_heart:  |

### Core

See [files](https://github.com/ipfs/js-ipfs/blob/master/docs/core-api/FILES.md).

## File store (IPFS pack)

> **Note:** Implementation in js-ipfs is not planned for now.

### CLI

### HTTP

### Core

## Key management

### CLI

| Command               |       Go       |      JS       |
| --------------------- | :------------: | :-----------: |
| **`ipfs key gen`**    | :green_heart:  | :green_heart: |
| `type=`               | :green_heart:  | :green_heart: |
| `size=`               | :green_heart:  | :green_heart: |
| **`ipfs key list`**   | :green_heart:  | :green_heart: |
| `l=`                  | :green_heart:  | :green_heart: |
| **`ipfs key rename`** | :green_heart:  | :green_heart: |
| `force=`              | :green_heart:  | :green_heart: |
| **`ipfs key rm`**     | :green_heart:  | :green_heart: |
| `l=`                  | :green_heart:  | :green_heart: |
| **`ipfs key rm`**     | :green_heart:  | :green_heart: |
| **`ipfs key export`** | :broken_heart: | :green_heart: |
| **`ipfs key import`** | :broken_heart: | :green_heart: |

### HTTP

| Endpoint                 |       Go       |      JS       |
| ------------------------ | :------------: | :-----------: |
| **`/api/v0/key/gen`**    | :green_heart:  | :green_heart: |
| `type=`                  | :green_heart:  | :green_heart: |
| `size=`                  | :green_heart:  | :green_heart: |
| **`/api/v0/key/list`**   | :green_heart:  | :green_heart: |
| `l=`                     | :green_heart:  | :green_heart: |
| **`/api/v0/key/rename`** | :green_heart:  | :green_heart: |
| `force=`                 | :green_heart:  | :green_heart: |
| **`/api/v0/key/rm`**     | :green_heart:  | :green_heart: |
| `l=`                     | :green_heart:  | :green_heart: |
| **`/api/v0/key/export`** | :broken_heart: | :green_heart: |
| **`/api/v0/key/import`** | :broken_heart: | :green_heart: |

### Core

See [key](https://github.com/ipfs/js-ipfs/blob/master/docs/core-api/KEY.md).

## Miscellaneous

### CLI

| Command             |         Go         |         JS         |
| ------------------- | :----------------: | :----------------: |
| **`ipfs ping`**     |   :green_heart:    |   :green_heart:    |
| `count`             |   :green_heart:    |   :green_heart:    |
| **`ipfs update`**   | :heavy_minus_sign: | :heavy_minus_sign: |
| **`ipfs version`**  |   :green_heart:    |   :green_heart:    |
| **`ipfs commands`** |   :green_heart:    |   :green_heart:    |
| **`ipfs id`**       |   :green_heart:    |   :green_heart:    |
| `format`            |   :green_heart:    |   :green_heart:    |
| **`ipfs mount`**    |   :green_heart:    | :heavy_minus_sign: |
| `ipfs-path=`        |   :green_heart:    | :heavy_minus_sign: |
| `ipns-path=`        |   :green_heart:    | :heavy_minus_sign: |

### HTTP

| Endpoint               |         Go         |         JS         |
| ---------------------- | :----------------: | :----------------: |
| **`/api/v0/ping`**     |   :green_heart:    |   :green_heart:    |
| `count=`               |   :green_heart:    |   :green_heart:    |
| **`/api/v0/update`**   | :heavy_minus_sign: | :heavy_minus_sign: |
| **`/api/v0/version`**  |   :green_heart:    |   :green_heart:    |
| **`/api/v0/commands`** |   :green_heart:    |   :green_heart:    |
| **`/api/v0/id`**       |   :green_heart:    |   :green_heart:    |
| `format=`              |   :green_heart:    |   :green_heart:    |
| **`/api/v0/mount`**    |   :green_heart:    | :heavy_minus_sign: |
| `ipfs-path=`           |   :green_heart:    | :heavy_minus_sign: |
| `ipns-path=`           |   :green_heart:    | :heavy_minus_sign: |

### Core

See [misc](https://github.com/ipfs/js-ipfs/blob/master/docs/core-api/MISCELLANEOUS.md).

## Naming

> **Note:** Implementation in js-ipfs is blocked until DHT is finished.

### CLI

| Command                 |      Go       |      JS       |
| ----------------------- | :-----------: | :-----------: |
| **`ipfs name publish`** | :green_heart: | :green_heart: |
| `resolve=`              | :green_heart: | :green_heart: |
| `lifetime=`             | :green_heart: | :green_heart: |
| `ttl=`                  | :green_heart: | :green_heart: |
| `key=`                  | :green_heart: | :green_heart: |
| **`ipfs name resolve`** | :green_heart: | :green_heart: |
| `recursive=`            | :green_heart: | :green_heart: |
| `nocache=`              | :green_heart: | :green_heart: |
| **`ipfs name pubsub`**  | :green_heart: | :green_heart: |
| **`ipfs name resolve`** | :green_heart: | :green_heart: |
| **`ipfs resolve`**      | :green_heart: | :green_heart: |
| `recursive=`            | :green_heart: | :green_heart: |
| **`ipfs dns`**          | :green_heart: | :green_heart: |
| `recursive=`            | :green_heart: | :green_heart: |

### HTTP

| Endpoint                   |      Go       |      JS       |
| -------------------------- | :-----------: | :-----------: |
| **`/api/v0/name/publish`** | :green_heart: | :green_heart: |
| `resolve=`                 | :green_heart: | :green_heart: |
| `lifetime=`                | :green_heart: | :green_heart: |
| `ttl=`                     | :green_heart: | :green_heart: |
| `key=`                     | :green_heart: | :green_heart: |
| **`/api/v0/name/resolve`** | :green_heart: | :green_heart: |
| `recursive=`               | :green_heart: | :green_heart: |
| `nocache=`                 | :green_heart: | :green_heart: |
| **`/api/v0/name/pubsub`**  | :green_heart: | :green_heart: |
| **`/api/v0/resolve`**      | :green_heart: | :green_heart: |
| `recursive=`               | :green_heart: | :green_heart: |
| **`/api/v0/dns`**          | :green_heart: | :green_heart: |
| `recursive=`               | :green_heart: | :green_heart: |

### Core

See [name](https://github.com/ipfs/js-ipfs/blob/master/docs/core-api/NAME.md) and [misc](https://github.com/ipfs/js-ipfs/blob/master/docs/core-api/MISCELLANEOUS.md).

## Object

### CLI

| Endpoint                            |      Go       |       JS       |
| ----------------------------------- | :-----------: | :------------: |
| **`ipfs object data`**              | :green_heart: | :green_heart:  |
| **`ipfs object diff`**              | :green_heart: | :broken_heart: |
| **`ipfs object get`**               | :green_heart: | :green_heart:  |
| `encoding`                          | :green_heart: | :green_heart:  |
| **`ipfs object links`**             | :green_heart: | :green_heart:  |
| **`ipfs object new`**               | :green_heart: | :green_heart:  |
| **`ipfs object patch append-data`** | :green_heart: | :green_heart:  |
| **`ipfs object patch add-link`**    | :green_heart: | :green_heart:  |
| `create`                            | :green_heart: | :broken_heart: |
| **`ipfs object patch rm-link`**     | :green_heart: | :green_heart:  |
| **`ipfs object patch set-data`**    | :green_heart: | :green_heart:  |
| **`ipfs object put`**               | :green_heart: | :green_heart:  |
| `inputenc`                          | :green_heart: | :green_heart:  |
| `datafieldenc`                      | :green_heart: | :broken_heart: |
| `pin`                               | :green_heart: | :broken_heart: |
| **`ipfs object stat`**              | :green_heart: | :green_heart:  |

### HTTP

| Endpoint                               |      Go       |       JS       |
| -------------------------------------- | :-----------: | :------------: |
| **`/api/v0/object/data`**              | :green_heart: | :green_heart:  |
| **`/api/v0/object/diff`**              | :green_heart: | :broken_heart: |
| **`/api/v0/object/get`**               | :green_heart: | :green_heart:  |
| `encoding=json,enc=json`               | :green_heart: | :green_heart:  |
| `encoding=protobuf,enc=protobuf`       | :green_heart: | :green_heart:  |
| `encoding=xml,enc=xml`                 | :green_heart: | :green_heart:  |
| **`/api/v0/object/links`**             | :green_heart: | :green_heart:  |
| **`/api/v0/object/new`**               | :green_heart: | :green_heart:  |
| **`/api/v0/object/patch/append-data`** | :green_heart: | :green_heart:  |
| **`/api/v0/object/patch/add-link`**    | :green_heart: | :green_heart:  |
| `create=`                              | :green_heart: | :green_heart:  |
| **`/api/v0/object/patch/rm-link`**     | :green_heart: | :green_heart:  |
| **`/api/v0/object/patch/set-data`**    | :green_heart: | :green_heart:  |
| **`/api/v0/object/put`**               | :green_heart: | :green_heart:  |
| `inputenc`                             | :green_heart: | :green_heart:  |
| **`/api/v0/object/stat`**              | :green_heart: | :green_heart:  |

### Core

See [object](https://github.com/ipfs/js-ipfs/blob/master/docs/core-api/OBJECT.md).

## p2p (libp2p exposed API)

> **This is blocked until there is a formalized `interface-libp2p`**. Currently, js-ipfs exposes libp2p directly while Kubo exposes a subset of commands that use libp2p.

### CLI

### HTTP

### Core

See [core](https://github.com/ipfs/js-ipfs/blob/master/docs/README.md).

## Pinning

### CLI

| Command               |      Go       |       JS       |
| --------------------- | :-----------: | :------------: |
| **`ipfs pin add`**    | :green_heart: | :green_heart:  |
| `recursive`           | :green_heart: | :green_heart:  |
| `progress`            | :green_heart: | :broken_heart: |
| **`ipfs pin ls`**     | :green_heart: | :green_heart:  |
| `type`                | :green_heart: | :green_heart:  |
| `quiet`               | :green_heart: | :green_heart:  |
| **`ipfs pin rm`**     | :green_heart: | :green_heart:  |
| `recursive`           | :green_heart: | :green_heart:  |
| **`ipfs pin update`** | :green_heart: | :broken_heart: |
| **`ipfs pin verify`** | :green_heart: | :broken_heart: |
| `verbose`             | :green_heart: | :broken_heart: |
| **`ipfs refs`**       | :green_heart: | :green_heart:  |
| `format`              | :green_heart: | :green_heart:  |
| `edges`               | :green_heart: | :green_heart:  |
| `unique`              | :green_heart: | :green_heart:  |
| `recursive`           | :green_heart: | :green_heart:  |
| **`ipfs refs local`** | :green_heart: | :green_heart:  |

### HTTP

| Endpoint                  |      Go       |       JS       |
| ------------------------- | :-----------: | :------------: |
| **`/api/v0/pin/add`**     | :green_heart: | :green_heart:  |
| `recursive=`              | :green_heart: | :green_heart:  |
| **`/api/v0/pin/ls`**      | :green_heart: | :green_heart:  |
| `type=`                   | :green_heart: | :green_heart:  |
| `quiet=`                  | :green_heart: | :green_heart:  |
| **`/api/v0/pin/rm`**      | :green_heart: | :green_heart:  |
| `recursive=`              | :green_heart: | :green_heart:  |
| **`/api/v0/pin/update`**  | :green_heart: | :broken_heart: |
| `unpin=`                  | :green_heart: | :broken_heart: |
| **`/api/v0/pin/verify`**  | :green_heart: | :broken_heart: |
| `verbose=`                | :green_heart: | :broken_heart: |
| **`/api/v0/refs`**        | :green_heart: | :green_heart:  |
| `format=`                 | :green_heart: | :green_heart:  |
| `edges=`                  | :green_heart: | :green_heart:  |
| `unique=`                 | :green_heart: | :green_heart:  |
| `recursive=`              | :green_heart: | :green_heart:  |
| **`/api/v0//refs/local`** | :green_heart: | :green_heart:  |

### Core

See [pin](https://github.com/ipfs/js-ipfs/blob/master/docs/core-api/PIN.md) and [refs](https://github.com/ipfs/js-ipfs/blob/master/docs/core-api/REFS.md).

## PubSub

### CLI

| Command                 |      Go       |       JS       |
| ----------------------- | :-----------: | :------------: |
| **`ipfs pubsub ls`**    | :green_heart: | :green_heart:  |
| **`ipfs pubsub peers`** | :green_heart: | :green_heart:  |
| **`ipfs pubsub pub`**   | :green_heart: | :green_heart:  |
| **`ipfs pubsub sub`**   | :green_heart: | :green_heart:  |
| `discover`              | :green_heart: | :broken_heart: |

### HTTP

| Endpoint                   |      Go       |       JS       |
| -------------------------- | :-----------: | :------------: |
| **`/api/v0/pubsub/ls`**    | :green_heart: | :green_heart:  |
| **`/api/v0/pubsub/peers`** | :green_heart: | :green_heart:  |
| **`/api/v0/pubsub/pub`**   | :green_heart: | :green_heart:  |
| **`/api/v0/pubsub/sub`**   | :green_heart: | :green_heart:  |
| `discover=`                | :green_heart: | :broken_heart: |

### Core

See [pubsub](https://github.com/ipfs/js-ipfs/blob/master/docs/core-api/PUBSUB.md).

## Repo

### CLI

| Command                 |      Go       |         JS         |
| ----------------------- | :-----------: | :----------------: |
| **`ipfs repo fsck`**    | :green_heart: | :heavy_minus_sign: |
| **`ipfs repo gc`**      | :green_heart: |   :green_heart:    |
| **`ipfs repo stat`**    | :green_heart: |   :green_heart:    |
| **`ipfs repo verify`**  | :green_heart: | :heavy_minus_sign: |
| **`ipfs repo version`** | :green_heart: |   :green_heart:    |

### HTTP

| Endpoint                   |      Go       |         JS         |
| -------------------------- | :-----------: | :----------------: |
| **`/api/v0/repo/fsck`**    | :green_heart: | :heavy_minus_sign: |
| **`/api/v0/repo/gc`**      | :green_heart: |   :green_heart:    |
| **`/api/v0/repo/stat`**    | :green_heart: |   :green_heart:    |
| **`/api/v0/repo/verify`**  | :green_heart: | :heavy_minus_sign: |
| **`/api/v0/repo/version`** | :green_heart: |   :green_heart:    |

### Core

See [repo](https://github.com/ipfs/js-ipfs/blob/master/docs/core-api/REPO.md).

## Swarm

### CLI

| Command                       |      Go       |       JS       |
| ----------------------------- | :-----------: | :------------: |
| **`ipfs swarm addrs`**        | :green_heart: | :green_heart:  |
| **`ipfs swarm addrs listen`** | :green_heart: | :broken_heart: |
| **`ipfs swarm addrs local`**  | :green_heart: | :green_heart:  |
| **`ipfs swarm connect`**      | :green_heart: | :green_heart:  |
| **`ipfs swarm disconnect`**   | :green_heart: | :green_heart:  |
| **`ipfs swarm filters`**      | :green_heart: | :broken_heart: |
| **`ipfs swarm filters add`**  | :green_heart: | :broken_heart: |
| **`ipfs swarm filters rm`**   | :green_heart: | :broken_heart: |
| **`ipfs swarm peers`**        | :green_heart: | :green_heart:  |
| `verbose=`                    | :green_heart: | :green_heart:  |
| `latency=`                    | :green_heart: | :green_heart:  |
| `streams=`                    | :green_heart: | :green_heart:  |

### HTTP

| Endpoint                         |      Go       |       JS       |
| -------------------------------- | :-----------: | :------------: |
| **`/api/v0/swarm/addrs`**        | :green_heart: | :green_heart:  |
| **`/api/v0/swarm/addrs/listen`** | :green_heart: | :broken_heart: |
| **`/api/v0/swarm/addrs/local`**  | :green_heart: | :green_heart:  |
| **`/api/v0/swarm/connect`**      | :green_heart: | :green_heart:  |
| **`/api/v0/swarm/disconnect`**   | :green_heart: | :green_heart:  |
| **`/api/v0/swarm/filters`**      | :green_heart: | :broken_heart: |
| **`/api/v0/swarm/filters/add`**  | :green_heart: | :broken_heart: |
| **`/api/v0/swarm/filters/rm`**   | :green_heart: | :broken_heart: |
| **`/api/v0/swarm/peers`**        | :green_heart: | :green_heart:  |
| `verbose=`                       | :green_heart: | :green_heart:  |
| `latency=`                       | :green_heart: | :green_heart:  |
| `streams=`                       | :green_heart: | :green_heart:  |

### Core

See [swarm](https://github.com/ipfs/js-ipfs/blob/master/docs/core-api/SWARM.md).
