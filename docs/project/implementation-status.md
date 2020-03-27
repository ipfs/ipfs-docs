---
title: Implementation status
description: See the current status of various aspects of the core IPFS implementations.
---

# IPFS implementation status

### Legend: :white_check_mark: Done &nbsp; :construction: In Progress &nbsp; :x: Missing &nbsp; :heavy_minus_sign: Not planned

## Bitswap

### CLI

| Command                                      | Go Impl       | JS Impl       |
| -------------------------------------------- | :-----------: | :-----------: |
| **`ipfs ledger`**                            | :white_check_mark: | :construction:       |
|     `peer`                                   | :white_check_mark: | :construction:       |
| **`ipfs reprovide`**                         | :white_check_mark: | :x:      |
| **`ipfs bitswap stat`**                      | :white_check_mark: | :white_check_mark: |
| **`ipfs bitswap unwant`**                    | :white_check_mark: | :white_check_mark: |
|     `key`                                    | :white_check_mark: | :white_check_mark: |
| **`ipfs bitswap wantlist`**                  | :white_check_mark: | :white_check_mark: |
|     `peer`                                   | :white_check_mark: | :white_check_mark: |

### HTTP

| Endpoint                                     | Go Impl       | JS Impl       |
| -------------------------------------------- | :-----------: | :-----------: |
| **`GET /api/v0/bitswap/ledger`**             | :white_check_mark: | :construction:       |
|     `arg=`                                   | :white_check_mark: | :construction:       |
| **`GET /api/v0/bitswap/reprovide`**          | :white_check_mark: | :x:      |
| **`GET /api/v0/bitswap/stat`**               | :white_check_mark: | :white_check_mark: |
| **`GET /api/v0/bitswap/unwant`**             | :white_check_mark: | :white_check_mark: |
|     `arg=`                                   | :white_check_mark: | :white_check_mark: |
| **`GET /api/v0/bitswap/wantlist`**           | :white_check_mark: | :white_check_mark: |
|     `peer=`                                  | :white_check_mark: | :white_check_mark: |

### Core

See [interface-ipfs-core](https://github.com/ipfs/interface-ipfs-core).


## Block `ipfs block`

### CLI

| Command                                      | Go Impl       | JS Impl       |
| -------------------------------------------- | :-----------: | :-----------: |
| **`ipfs block get`**                         | :white_check_mark: | :white_check_mark: |
|     `key`                                    | :white_check_mark: | :white_check_mark: |
| **`ipfs block put`**                         | :white_check_mark: | :white_check_mark: |
|     `data`                                   | :white_check_mark: | :white_check_mark: |
|     `format`                                 | :white_check_mark: | :white_check_mark: |
|     `mhtype`                                 | :white_check_mark: | :white_check_mark: |
|     `mhlen`                                  | :white_check_mark: | :white_check_mark: |
| **`ipfs block rm`**                          | :white_check_mark: | :construction:       |
|     `hash`                                   | :white_check_mark: | :construction:       |
|     `force`                                  | :white_check_mark: | :construction:       |
| **`ipfs block stat`**                        | :white_check_mark: | :white_check_mark: |
|     `key`                                    | :white_check_mark: | :white_check_mark: |

### HTTP

| Endpoint                                     | Go Impl       | JS Impl       |
| -------------------------------------------- | :-----------: | :-----------: |
| **`GET /api/v0/block/get`**                  | :white_check_mark: | :white_check_mark: |
|     `arg=`                                   | :white_check_mark: | :white_check_mark: |
| **`POST /api/v0/block/put`**                 | :white_check_mark: | :white_check_mark: |
|     `arg=`                                   | :white_check_mark: | :white_check_mark: |
|     `format=`                                | :white_check_mark: | :white_check_mark: |
|     `mhtype=`                                | :white_check_mark: | :white_check_mark: |
|     `mhlen=`                                 | :white_check_mark: | :white_check_mark: |
| **`GET /api/v0/block/rm`**                   | :white_check_mark: | :construction:       |
|     `arg=`                                   | :white_check_mark: | :construction:       |
|     `force=`                                 | :white_check_mark: | :construction:       |
| **`GET /api/v0/block/stat`**                 | :white_check_mark: | :white_check_mark: |
|     `arg=`                                   | :white_check_mark: | :white_check_mark: |

### Core

See [interface-ipfs-core](https://github.com/ipfs/interface-ipfs-core).

## Bootstrap

### CLI

| Command                                      | Go Impl       | JS Impl       |
| -------------------------------------------- | :-----------: | :-----------: |
| **`ipfs bootstrap add`**                     | :white_check_mark: | :white_check_mark: |
|     `arg=`                                   | :white_check_mark: | :white_check_mark: |
|     `default=`                               | :white_check_mark: | :white_check_mark: |
| **`ipfs bootstrap list`**                    | :white_check_mark: | :white_check_mark: |
| **`ipfs bootstrap rm`**                      | :white_check_mark: | :white_check_mark: |
|     `arg=`                                   | :white_check_mark: | :white_check_mark: |
|     `all=`                                   | :white_check_mark: | :white_check_mark: |

### HTTP

| Endpoint                                     | Go Impl       | JS Impl       |
| -------------------------------------------- | :-----------: | :-----------: |
| **`GET /api/v0/bootstrap/add`**              | :white_check_mark: | :white_check_mark: |
|     `arg=`                                   | :white_check_mark: | :white_check_mark: |
|     `default=`                               | :white_check_mark: | :white_check_mark: |
| **`GET /api/v0/bootstrap/add/default`**      | :white_check_mark: | :x:      |
| **`GET /api/v0/bootstrap/list`**             | :white_check_mark: | :white_check_mark: |
| **`GET /api/v0/bootstrap/rm`**               | :white_check_mark: | :white_check_mark: |
|     `arg=`                                   | :white_check_mark: | :white_check_mark: |
|     `all=`                                   | :white_check_mark: | :white_check_mark: |
| **`GET /api/v0/bootstrap/rm/all`**           | :white_check_mark: | :x:      |

### Core

See [interface-ipfs-core](https://github.com/ipfs/interface-ipfs-core).


## Config

### CLI

| Command                                      | Go Impl       | JS Impl       |
| -------------------------------------------- | :-----------: | :-----------: |
| **`ipfs config edit`**                       | :white_check_mark: | :heavy_minus_sign:    |
| **`ipfs config`**                            | :white_check_mark: | :heavy_minus_sign:    |
|     `key`                                    | :white_check_mark: | :white_check_mark: |
|     `value`                                  | :white_check_mark: | :white_check_mark: |
|     `bool=`                                  | :white_check_mark: | :white_check_mark: |
|     `json=`                                  | :white_check_mark: | :white_check_mark: |
| **`ipfs config replace`**                    | :white_check_mark: | :white_check_mark: |
|     `file`                                   | :white_check_mark: | :white_check_mark: |
| **`ipfs config show`**                       | :white_check_mark: | :white_check_mark: |
| **`ipfs log level`**                         | :white_check_mark: | :heavy_minus_sign:    |
|     `subsystem`                              | :white_check_mark: | :heavy_minus_sign:    |
|     `level`                                  | :white_check_mark: | :heavy_minus_sign:    |
| **`ipfs log ls`**                            | :white_check_mark: | :heavy_minus_sign:    |
| **`ipfs log tail`**                          | :white_check_mark: | :heavy_minus_sign:    |

### HTTP

| Endpoint                                     | Go Impl       | JS Impl       |
| -------------------------------------------- | :-----------: | :-----------: |
| **`GET /api/v0/config/edit`**                | :white_check_mark: | :heavy_minus_sign:    |
| **`POST /api/v0/config`**                    | :white_check_mark: | :heavy_minus_sign:    |
|     `arg1=`                                  | :white_check_mark: | :white_check_mark: |
|     `arg2=`                                  | :white_check_mark: | :white_check_mark: |
|     `bool=`                                  | :white_check_mark: | :white_check_mark: |
|     `json=`                                  | :white_check_mark: | :white_check_mark: |
| **`POST /api/v0/config/replace`**            | :white_check_mark: | :white_check_mark: |
|     `arg=`                                   | :white_check_mark: | :white_check_mark: |
| **`GET /api/v0/config/show`**                | :white_check_mark: | :white_check_mark: |
| **`POST /api/v0/log/level`**                 | :white_check_mark: | :heavy_minus_sign:    |
|     `arg1=`                                  | :white_check_mark: | :heavy_minus_sign:    |
|     `arg2=`                                  | :white_check_mark: | :heavy_minus_sign:    |
| **`GET /api/v0/log/ls`**                     | :white_check_mark: | :heavy_minus_sign:    |
| **`GET /api/v0/log/tail`**                   | :white_check_mark: | :heavy_minus_sign:    |

### Core

See [interface-ipfs-core](https://github.com/ipfs/interface-ipfs-core).


## DAG

> **Blocked until the following are resolved:**
- https://github.com/ipfs/js-ipfs-api/pull/534
- https://github.com/ipfs/go-ipfs/issues/3771#issue-213068794

### CLI

### HTTP

### Core

See [interface-ipfs-core](https://github.com/ipfs/interface-ipfs-core).

## Stats and diagnostics

### CLI

| Command                                      | Go Impl       | JS Impl       |
| -------------------------------------------- | :-----------: | :-----------: |
| **`ipfs stats bitswap`**                     | :white_check_mark: | :x:      |
| **`ipfs stats bw`**                          | :white_check_mark: | :x:      |
|     `peer`                                   | :white_check_mark: | :x:      |
|     `proto`                                  | :white_check_mark: | :x:      |
|     `poll`                                   | :white_check_mark: | :x:      |
|     `interval `                              | :white_check_mark: | :x:      |
| **`ipfs stats repo`**                        | :white_check_mark: | :x:      |
| **`ipfs diag cmds`**                         | :white_check_mark: | :heavy_minus_sign:    |
| **`ipfs diag cmds clear`**                   | :white_check_mark: | :heavy_minus_sign:    |
| **`ipfs diag cmds set-time`**                | :white_check_mark: | :heavy_minus_sign:    |
|     `time`                                   | :white_check_mark: | :heavy_minus_sign:    |
| **`ipfs diag sys`**                          | :white_check_mark: | :heavy_minus_sign:    |

### HTTP

| Endpoint                                     | Go Impl       | JS Impl       |
| -------------------------------------------- | :-----------: | :-----------: |
| **`GET /api/v0/stats/bitswap`**              | :white_check_mark: | :x:      |
| **`POST /api/v0/stats/bw`**                  | :white_check_mark: | :x:      |
|     `peer=`                                  | :white_check_mark: | :x:      |
|     `proto=`                                 | :white_check_mark: | :x:      |
|     `poll=`                                  | :white_check_mark: | :x:      |
|     `interval=`                              | :white_check_mark: | :x:      |
| **`GET /api/v0/stats/repo`**                 | :white_check_mark: | :x:      |
| **`GET /api/v0/diag/cmds`**                  | :white_check_mark: | :heavy_minus_sign:    |
| **`GET /api/v0/diag/cmds/clear`**            | :white_check_mark: | :heavy_minus_sign:    |
| **`GET /api/v0/diag/cmds/set-time`**         | :white_check_mark: | :heavy_minus_sign:    |
|     `arg=`                                   | :white_check_mark: | :heavy_minus_sign:    |
| **`GET /api/v0/net`**                        | :white_check_mark: | :heavy_minus_sign:    |
|     `vis`                                    | :white_check_mark: | :heavy_minus_sign:    |
| **`GET /api/v0/sys`**                        | :white_check_mark: | :heavy_minus_sign:    |

### Core

See [interface-ipfs-core](https://github.com/ipfs/interface-ipfs-core).

## DHT

### CLI

| Command                                      | Go Impl       | JS Impl       |
| -------------------------------------------- | :-----------: | :-----------: |
| **`ipfs dht findpeer`**                      | :white_check_mark: | :white_check_mark: |
|     `peer ID`                                | :white_check_mark: | :white_check_mark: |
|     `verbose=`                               | :white_check_mark: | :x:      |
| **`ipfs dht findprovs`**                     | :white_check_mark: | :white_check_mark: |
|     `key`                                    | :white_check_mark: | :white_check_mark: |
|     `verbose=`                               | :white_check_mark: | :x:      |
|     `num-providers=`                         | :white_check_mark: | :white_check_mark: |
| **`ipfs dht get`**                           | :white_check_mark: | :white_check_mark: |
|     `key`                                    | :white_check_mark: | :white_check_mark: |
|     `verbose=`                               | :white_check_mark: | :x:      |
| **`ipfs dht provide`**                       | :white_check_mark: | :white_check_mark: |
|     `key`                                    | :white_check_mark: | :white_check_mark: |
|     `verbose=`                               | :white_check_mark: | :x:      |
|     `recursive=`                             | :white_check_mark: | :x:      |
| **`ipfs dht put`**                           | :white_check_mark: | :white_check_mark: |
|     `key`                                    | :white_check_mark: | :white_check_mark: |
|     `value`                                  | :white_check_mark: | :white_check_mark: |
|     `verbose=`                               | :white_check_mark: | :x:      |
| **`ipfs dht query`**                         | :white_check_mark: | :x:      |
|     `peer ID`                                | :white_check_mark: | :white_check_mark: |
|     `verbose=`                               | :white_check_mark: | :x:      |

### HTTP

| Endpoint                                     | Go Impl       | JS Impl       |
| -------------------------------------------- | :-----------: | :-----------: |
| **`GET /api/v0/dht/findpeer`**               | :white_check_mark: | :white_check_mark: |
|     `arg=`                                   | :white_check_mark: | :white_check_mark: |
|     `verbose=`                               | :white_check_mark: | :x:      |
| **`GET /api/v0/dht/findprovs`**              | :white_check_mark: | :white_check_mark: |
|     `arg=`                                   | :white_check_mark: | :white_check_mark: |
|     `verbose=`                               | :white_check_mark: | :x:      |
|     `num-providers=`                         | :white_check_mark: | :white_check_mark: |
| **`GET /api/v0/dht/get`**                    | :white_check_mark: | :white_check_mark: |
|     `arg=`                                   | :white_check_mark: | :white_check_mark: |
|     `verbose=`                               | :white_check_mark: | :x:      |
| **`GET /api/v0/dht/provide`**                | :white_check_mark: | :white_check_mark: |
|     `arg=`                                   | :white_check_mark: | :white_check_mark: |
|     `verbose=`                               | :white_check_mark: | :x:      |
|     `recursive=`                             | :white_check_mark: | :x:      |
| **`GET /api/v0/dht/put`**                    | :white_check_mark: | :white_check_mark: |
|     `arg1=`                                  | :white_check_mark: | :white_check_mark: |
|     `arg2=`                                  | :white_check_mark: | :white_check_mark: |
|     `verbose=`                               | :white_check_mark: | :x:      |
| **`GET /api/v0/dht/query`**                  | :white_check_mark: | :white_check_mark: |
|     `arg=`                                   | :white_check_mark: | :white_check_mark: |
|     `verbose=`                               | :white_check_mark: | :x:      |

### Core

See [interface-ipfs-core](https://github.com/ipfs/interface-ipfs-core).


## Files

### CLI

| Command                                      | Go Impl       | JS Impl       |
| -------------------------------------------- | :-----------: | :-----------: |
| **`ipfs add`**                               | :white_check_mark: | :construction:       |
|     `file`                                   | :white_check_mark: | :white_check_mark: |
|     `recursive`                              | :white_check_mark: | :white_check_mark: |
|     `quiet`                                  | :white_check_mark: | :white_check_mark: |
|     `quieter`                                | :white_check_mark: | :white_check_mark: |
|     `silent`                                 | :white_check_mark: | :white_check_mark: |
|     `progress`                               | :white_check_mark: | :white_check_mark: |
|     `trickle`                                | :white_check_mark: | :white_check_mark: |
|     `only-hash`                              | :white_check_mark: | :white_check_mark: |
|     `wrap-with-directory`                    | :white_check_mark: | :white_check_mark: |
|     `hidden`                                 | :white_check_mark: | :x:      |
|     `chunker`                                | :white_check_mark: | :x:      |
|     `pin`                                    | :white_check_mark: | :construction:       |
|     `raw-leaves`                             | :white_check_mark: | :x:      |
|     `nocopy`                                 | :white_check_mark: | :x:      |
|     `fscache`                                | :white_check_mark: | :x:      |
|     `cid-version`                            | :white_check_mark: | :x:      |
|     `hash`                                   | :white_check_mark: | :x:      |
| **`ipfs cat`**                               | :white_check_mark: | :white_check_mark: |
|     `arg`                                    | :white_check_mark: | :white_check_mark: |
| **`ipfs ls`**                                | :white_check_mark: | :construction:       |
|     `arg`                                    | :white_check_mark: | :construction:       |
|     `headers`                                | :white_check_mark: | :construction:       |
|     `resolve-type`                           | :white_check_mark: | :construction:       |
| **`ipfs file ls`**                           | :white_check_mark: | :heavy_minus_sign:    |
|     `path`                                   | :white_check_mark: | :heavy_minus_sign:    |
| **`ipfs files cp`**                          | :white_check_mark: | :x:      |
|     `src`                                    | :white_check_mark: | :x:      |
|     `dst`                                    | :white_check_mark: | :x:      |
|     `flush`                                  | :white_check_mark: | :x:      |
| **`ipfs files flush`**                       | :white_check_mark: | :x:      |
|     `path`                                   | :white_check_mark: | :x:      |
| **`ipfs files ls`**                          | :white_check_mark: | :x:      |
|     `path`                                   | :white_check_mark: | :x:      |
|     `level`                                  | :white_check_mark: | :x:      |
|     `flush`                                  | :white_check_mark: | :x:      |
| **`ipfs files mkdir`**                       | :white_check_mark: | :x:      |
|     `path`                                   | :white_check_mark: | :x:      |
|     `parents`                                | :white_check_mark: | :x:      |
|     `flush`                                  | :white_check_mark: | :x:      |
| **`ipfs files mv`**                          | :white_check_mark: | :x:      |
|     `src`                                    | :white_check_mark: | :x:      |
|     `dst`                                    | :white_check_mark: | :x:      |
|     `flush`                                  | :white_check_mark: | :x:      |
| **`ipfs files read`**                        | :white_check_mark: | :x:      |
|     `path`                                   | :white_check_mark: | :x:      |
|     `offset`                                 | :white_check_mark: | :x:      |
|     `count`                                  | :white_check_mark: | :x:      |
|     `flush`                                  | :white_check_mark: | :x:      |
| **`ipfs files rm`**                          | :white_check_mark: | :x:      |
|     `path`                                   | :white_check_mark: | :x:      |
|     `recursive`                              | :white_check_mark: | :x:      |
|     `flush`                                  | :white_check_mark: | :x:      |
| **`ipfs files stat`**                        | :white_check_mark: | :x:      |
|     `path`                                   | :white_check_mark: | :x:      |
|     `flush`                                  | :white_check_mark: | :x:      |
| **`ipfs files write`**                       | :white_check_mark: | :x:      |
|     `path`                                   | :white_check_mark: | :x:      |
|     `data`                                   | :white_check_mark: | :x:      |
|     `offset`                                 | :white_check_mark: | :x:      |
|     `create`                                 | :white_check_mark: | :x:      |
|     `truncate`                               | :white_check_mark: | :x:      |
|     `count`                                  | :white_check_mark: | :x:      |
|     `flush`                                  | :white_check_mark: | :x:      |
| **`ipfs get`**                               | :white_check_mark: | :white_check_mark: |
|     `path`                                   | :white_check_mark: | :white_check_mark: |
|     `archive`                                | :white_check_mark: | :x:      |
|     `compress`                               | :white_check_mark: | :x:      |
|     `compression-level`                      | :white_check_mark: | :x:      |

### HTTP

| Endpoint                                     | Go Impl       | JS Impl       |
| -------------------------------------------- | :-----------: | :-----------: |
| **`POST /api/v0/add`**                       | :white_check_mark: | :construction:       |
|     `arg=`                                   | :white_check_mark: | :white_check_mark: |
|     `recursive=`                             | :white_check_mark: | :white_check_mark: |
|     `quiet=`                                 | :white_check_mark: | :x:      |
|     `quieter=`                               | :white_check_mark: | :x:      |
|     `silent=`                                | :white_check_mark: | :x:      |
|     `progress=`                              | :white_check_mark: | :white_check_mark: |
|     `trickle=`                               | :white_check_mark: | :white_check_mark: |
|     `only-hash=`                             | :white_check_mark: | :white_check_mark: |
|     `wrap-with-directory`                    | :white_check_mark: | :white_check_mark: |
|     `hidden`                                 | :white_check_mark: | :x:      |
|     `chunker`                                | :white_check_mark: | :x:      |
|     `pin`                                    | :white_check_mark: | :construction:       |
|     `raw-leaves`                             | :white_check_mark: | :x:      |
|     `nocopy`                                 | :white_check_mark: | :x:      |
|     `fscache`                                | :white_check_mark: | :x:      |
|     `cid-version`                            | :white_check_mark: | :x:      |
|     `hash`                                   | :white_check_mark: | :x:      |
| **`GET /api/v0/cat`**                        | :white_check_mark: | :white_check_mark: |
|     `arg=`                                   | :white_check_mark: | :white_check_mark: |
| **`GET /api/v0/ls`**                         | :white_check_mark: | :construction:       |
|     `arg=`                                   | :white_check_mark: | :construction:       |
|     `headers=`                               | :white_check_mark: | :construction:       |
|     `resolve-type=`                          | :white_check_mark: | :construction:       |
| **`GET /api/v0/file/ls`**                    | :white_check_mark: | :heavy_minus_sign:    |
|     `arg=`                                   | :white_check_mark: | :heavy_minus_sign:    |
| **`GET /api/v0/files/cp`**                   | :white_check_mark: | :x:      |
|     `arg=`                                   | :white_check_mark: | :x:      |
|     `arg2=`                                  | :white_check_mark: | :x:      |
|     `flush=,f=`                              | :white_check_mark: | :x:      |
| **`GET /api/v0/files/flush`**                | :white_check_mark: | :x:      |
|     `arg=`                                   | :white_check_mark: | :x:      |
| **`GET /api/v0/files/ls`**                   | :white_check_mark: | :x:      |
|     `arg=`                                   | :white_check_mark: | :x:      |
|     `l=`                                     | :white_check_mark: | :x:      |
|     `flush=,f=`                              | :white_check_mark: | :x:      |
| **`GET /api/v0/files/mkdir`**                | :white_check_mark: | :x:      |
|     `arg=`                                   | :white_check_mark: | :x:      |
|     `parents=,p=`                            | :white_check_mark: | :x:      |
|     `flush=,f=`                              | :white_check_mark: | :x:      |
| **`GET /api/v0/files/mv`**                   | :white_check_mark: | :x:      |
|     `arg=`                                   | :white_check_mark: | :x:      |
|     `arg2=`                                  | :white_check_mark: | :x:      |
|     `flush=,f=`                              | :white_check_mark: | :x:      |
| **`GET /api/v0/files/read`**                 | :white_check_mark: | :x:      |
|     `arg=`                                   | :white_check_mark: | :x:      |
|     `offset=,o=`                             | :white_check_mark: | :x:      |
|     `count=,n=`                              | :white_check_mark: | :x:      |
|     `flush=,f=`                              | :white_check_mark: | :x:      |
| **`POST /api/v0/files/rm`**                  | :white_check_mark: | :x:      |
|     `arg=`                                   | :white_check_mark: | :x:      |
|     `recursive=,r=`                          | :white_check_mark: | :x:      |
|     `flush=,f=`                              | :white_check_mark: | :x:      |
| **`GET /api/v0/files/stat`**                 | :white_check_mark: | :x:      |
|     `arg=`                                   | :white_check_mark: | :x:      |
|     `flush=,f=`                              | :white_check_mark: | :x:      |
| **`POST /api/v0/files/write`**               | :white_check_mark: | :x:      |
|     `arg=`                                   | :white_check_mark: | :x:      |
|     `arg2=`                                  | :white_check_mark: | :x:      |
|     `offset=,o=`                             | :white_check_mark: | :x:      |
|     `create=,e=`                             | :white_check_mark: | :x:      |
|     `truncate=,t=`                           | :white_check_mark: | :x:      |
|     `count=,n=`                              | :white_check_mark: | :x:      |
|     `flush=,f=`                              | :white_check_mark: | :x:      |
| **`POST /api/v0/get`**                       | :white_check_mark: | :white_check_mark: |
|     `arg=`                                   | :white_check_mark: | :white_check_mark: |
|     `archive=`                               | :white_check_mark: | :x:      |
|     `compress=`                              | :white_check_mark: | :x:      |
|     `compression-level=-1`                   | :white_check_mark: | :x:      |
|     `compression-level=0`                    | :white_check_mark: | :x:      |
|     `compression-level=1`                    | :white_check_mark: | :x:      |
|     `compression-level=2`                    | :white_check_mark: | :x:      |
|     `compression-level=3`                    | :white_check_mark: | :x:      |
|     `compression-level=4`                    | :white_check_mark: | :x:      |
|     `compression-level=5`                    | :white_check_mark: | :x:      |
|     `compression-level=6`                    | :white_check_mark: | :x:      |
|     `compression-level=7`                    | :white_check_mark: | :x:      |
|     `compression-level=8`                    | :white_check_mark: | :x:      |
|     `compression-level=9`                    | :white_check_mark: | :x:      |

### Core

See [interface-ipfs-core](https://github.com/ipfs/interface-ipfs-core).

## File store (IPFS pack)

> **Note:** Implementation in js-ipfs is not planned for now.

### CLI

### HTTP

### Core

See [interface-ipfs-core](https://github.com/ipfs/interface-ipfs-core).


## Key management

### CLI

| Command                                      | Go Impl       | JS Impl        |
| -------------------------------------------- | :-----------: | :-----------:  |
| **`ipfs key gen`**                           | :white_check_mark: | :heavy_minus_sign:     |
|     `name`                                   | :white_check_mark: | :heavy_minus_sign:     |
|     `type=`                                  | :white_check_mark: | :heavy_minus_sign:     |
|     `size=`                                  | :white_check_mark: | :heavy_minus_sign:     |
| **`ipfs key list`**                          | :white_check_mark: | :heavy_minus_sign:     |
|     `l=`                                     | :white_check_mark: | :heavy_minus_sign:     |
| **`ipfs key rename`**                        | :white_check_mark: | :heavy_minus_sign:     |
|     `name`                                   | :white_check_mark: | :heavy_minus_sign:     |
|     `newName`                                | :white_check_mark: | :heavy_minus_sign:     |
|     `force=`                                 | :white_check_mark: | :heavy_minus_sign:     |
| **`ipfs key rm`**                            | :white_check_mark: | :heavy_minus_sign:     |
|     `name`                                   | :white_check_mark: | :heavy_minus_sign:     |
|     `l=`                                     | :white_check_mark: | :heavy_minus_sign:     |

### HTTP

| Endpoint                                     | Go Impl       | JS Impl        |
| -------------------------------------------- | :-----------: | :-----------:  |
| **`GET /api/v0/key/gen`**                    | :white_check_mark: | :heavy_minus_sign:     |
|     `arg=`                                   | :white_check_mark: | :heavy_minus_sign:     |
|     `type=`                                  | :white_check_mark: | :heavy_minus_sign:     |
|     `size=`                                  | :white_check_mark: | :heavy_minus_sign:     |
| **`GET /api/v0/key/list`**                   | :white_check_mark: | :heavy_minus_sign:     |
|     `l=`                                     | :white_check_mark: | :heavy_minus_sign:     |
| **`GET /api/v0/key/rename`**                 | :white_check_mark: | :heavy_minus_sign:     |
|     `arg=`                                   | :white_check_mark: | :heavy_minus_sign:     |
|     `arg=`                                   | :white_check_mark: | :heavy_minus_sign:     |
|     `force=`                                 | :white_check_mark: | :heavy_minus_sign:     |
| **`GET /api/v0/key/rm`**                     | :white_check_mark: | :heavy_minus_sign:     |
|     `arg=`                                   | :white_check_mark: | :heavy_minus_sign:     |
|     `l=`                                     | :white_check_mark: | :heavy_minus_sign:     |

### Core

See [interface-ipfs-core](https://github.com/ipfs/interface-ipfs-core).


## Miscellaneous

### CLI

| Command                                      | Go Impl       | JS Impl       |
| -------------------------------------------- | :-----------: | :-----------: |
| **`ipfs ping`**                              | :white_check_mark: | :construction:       |
|     `peer ID`                                | :white_check_mark: | :x:      |
|     `count`                                  | :white_check_mark: | :x:      |
| **`ipfs update`**                            | :heavy_minus_sign:    | :heavy_minus_sign:    |
| **`ipfs version`**                           | :white_check_mark: | :white_check_mark: |
| **`ipfs commands`**                          | :white_check_mark: | :white_check_mark: |
| **`ipfs id`**                                | :white_check_mark: | :white_check_mark: |
|     `peerid`                                 | :white_check_mark: | :x:      |
|     `aver`                                   | :white_check_mark: | :x:      |
|     `pver`                                   | :white_check_mark: | :x:      |
|     `pubkey`                                 | :white_check_mark: | :x:      |
|     `addrs`                                  | :white_check_mark: | :x:      |
| **`ipfs mount`**                             | :white_check_mark: | :heavy_minus_sign:    |
|     `ipfs-path=`                             | :white_check_mark: | :heavy_minus_sign:    |
|     `ipns-path=`                             | :white_check_mark: | :heavy_minus_sign:    |
| **`ipfs mount`**                             | :white_check_mark: | :heavy_minus_sign:    |

### HTTP

| Endpoint                                     | Go Impl       | JS Impl       |
| -------------------------------------------- | :-----------: | :-----------: |
| **`GET /api/v0/ping`**                       | :white_check_mark: | :construction:       |
|     `arg=`                                   | :white_check_mark: | :x:      |
|     `count=`                                 | :white_check_mark: | :x:      |
| **`GET /api/v0/update`**                     | :heavy_minus_sign:    | :heavy_minus_sign:    |
| **`GET /api/v0/version`**                    | :white_check_mark: | :white_check_mark: |
| **`GET /api/v0/commands`**                   | :white_check_mark: | :white_check_mark: |
| **`POST /api/v0/id`**                        | :white_check_mark: | :white_check_mark: |
|     `arg=`                                   | :white_check_mark: | :white_check_mark: |
| **`GET /api/v0/mount`**                      | :white_check_mark: | :heavy_minus_sign:    |
|     `ipfs-path=`                             | :white_check_mark: | :heavy_minus_sign:    |
|     `ipns-path=`                             | :white_check_mark: | :heavy_minus_sign:    |
| **`GET /api/v0/mount`**                      | :white_check_mark: | :heavy_minus_sign:    |

### Core

See [interface-ipfs-core](https://github.com/ipfs/interface-ipfs-core).


## Naming

> **Note:** Implementation in js-ipfs is blocked until DHT is finished.

### CLI

| Command                                      | Go Impl       | JS Impl       |
| -------------------------------------------- | :-----------: | :-----------: |
| **`ipfs name publish`**                      | :white_check_mark: | :x:      |
|     `ipfs-path`                              | :white_check_mark: | :x:      |
|     `resolve=`                               | :white_check_mark: | :x:      |
|     `lifetime=`                              | :white_check_mark: | :x:      |
|     `ttl=`                                   | :white_check_mark: | :x:      |
|     `key=`                                   | :white_check_mark: | :x:      |
| **`ipfs name resolve`**                      | :white_check_mark: | :x:      |
|     `name`                                   | :white_check_mark: | :x:      |
|     `recursive=`                             | :white_check_mark: | :x:      |
|     `nocache=`                               | :white_check_mark: | :x:      |
| **`ipfs resolve`**                           | :white_check_mark: | :x:      |
|     `name`                                   | :white_check_mark: | :x:      |
|     `recursive=`                             | :white_check_mark: | :x:      |
| **`ipfs dns`**                               | :white_check_mark: | :x:      |
|     `domain`                                 | :white_check_mark: | :x:      |
|     `recursive=`                             | :white_check_mark: | :x:      |

### HTTP

| Endpoint                                     | Go Impl       | JS Impl       |
| -------------------------------------------- | :-----------: | :-----------: |
| **`POST /api/v0/name/publish`**              | :white_check_mark: | :x:      |
|     `arg=`                                   | :white_check_mark: | :x:      |
|     `resolve=`                               | :white_check_mark: | :x:      |
|     `lifetime=`                              | :white_check_mark: | :x:      |
|     `ttl=`                                   | :white_check_mark: | :x:      |
|     `key=`                                   | :white_check_mark: | :x:      |
| **`GET /api/v0/name/resolve`**               | :white_check_mark: | :x:      |
|     `arg=`                                   | :white_check_mark: | :x:      |
|     `recursive=`                             | :white_check_mark: | :x:      |
|     `nocache=`                               | :white_check_mark: | :x:      |
| **`GET /api/v0/resolve`**                    | :white_check_mark: | :x:      |
|     `arg=`                                   | :white_check_mark: | :x:      |
|     `recursive=`                             | :white_check_mark: | :x:      |
| **`GET /api/v0/dns`**                        | :white_check_mark: | :x:      |
|     `arg=`                                   | :white_check_mark: | :x:      |
|     `recursive=`                             | :white_check_mark: | :x:      |

### Core

See [interface-ipfs-core](https://github.com/ipfs/interface-ipfs-core).


## Object `ipfs object`

### CLI

| Endpoint                                     | Go Impl       | JS Impl       |
| -------------------------------------------- | :-----------: | :-----------: |
| **`ipfs object data`**                       | :white_check_mark: | :white_check_mark: |
|     `key`                                    | :white_check_mark: | :white_check_mark: |
| **`ipfs object diff`**                       | :white_check_mark: | :x:      |
|     `key1`                                   | :white_check_mark: | :x:      |
|     `key2`                                   | :white_check_mark: | :x:      |
| **`ipfs object/get`**                        | :white_check_mark: | :white_check_mark: |
|     `key`                                    | :white_check_mark: | :white_check_mark: |
|     `encoding`                               | :white_check_mark: | :white_check_mark: |
| **`GET /api/v0/object/links`**               | :white_check_mark: | :white_check_mark: |
|     `key`                                    | :white_check_mark: | :white_check_mark: |
| **`GET /api/v0/object/new`**                 | :white_check_mark: | :white_check_mark: |
|     `template`                               | :white_check_mark: | :white_check_mark: |
| **`GET /api/v0/object/patch/append-data`**   | :white_check_mark: | :white_check_mark: |
|     `root`                                   | :white_check_mark: | :white_check_mark: |
|     `data`                                   | :white_check_mark: | :white_check_mark: |
| **`POST /api/v0/object/patch/add-link`**     | :white_check_mark: | :white_check_mark: |
|     `root`                                   | :white_check_mark: | :white_check_mark: |
|     `name`                                   | :white_check_mark: | :white_check_mark: |
|     `ref`                                    | :white_check_mark: | :construction:       |
|     `create`                                 | :white_check_mark: | :x:      |
| **`POST /api/v0/object/patch/rm-link`**      | :white_check_mark: | :white_check_mark: |
|     `root`                                   | :white_check_mark: | :white_check_mark: |
|     `link`                                   | :white_check_mark: | :white_check_mark: |
| **`POST /api/v0/object/patch/set-data`**     | :white_check_mark: | :white_check_mark: |
|     `root`                                   | :white_check_mark: | :white_check_mark: |
|     `data`                                   | :white_check_mark: | :white_check_mark: |
| **`GET /api/v0/object/put`**                 | :white_check_mark: | :white_check_mark: |
|     `data`                                   | :white_check_mark: | :white_check_mark: |
|     `inputenc`                               | :white_check_mark: | :white_check_mark: |
|     `datafieldenc`                           | :white_check_mark: | :x:      |
|     `pin`                                    | :white_check_mark: | :x:      |
| **`GET /api/v0/object/stat`**                | :white_check_mark: | :white_check_mark: |
|     `root`                                   | :white_check_mark: | :white_check_mark: |

### HTTP

| Endpoint                                     | Go Impl       | JS Impl       |
| -------------------------------------------- | :-----------: | :-----------: |
| **`GET /api/v0/object/data`**                | :white_check_mark: | :white_check_mark: |
|     `arg=`                                   | :white_check_mark: | :white_check_mark: |
| **`GET /api/v0/object/diff`**                | :white_check_mark: | :x:      |
|     `arg1=`                                  | :white_check_mark: | :x:      |
|     `arg2=`                                  | :white_check_mark: | :x:      |
| **`POST /api/v0/object/get`**                | :white_check_mark: | :white_check_mark: |
|     `arg=`                                   | :white_check_mark: | :white_check_mark: |
|     `encoding=json,enc=json`                 | :white_check_mark: | :white_check_mark: |
|     `encoding=protobuf,enc=protobuf`         | :white_check_mark: | :white_check_mark: |
|     `encoding=xml,enc=xml`                   | :white_check_mark: | :white_check_mark: |
| **`GET /api/v0/object/links`**               | :white_check_mark: | :white_check_mark: |
|     `arg=`                                   | :white_check_mark: | :white_check_mark: |
| **`GET /api/v0/object/new`**                 | :white_check_mark: | :white_check_mark: |
|     `arg=unixfs-dir`                         | :white_check_mark: | :white_check_mark: |
| **`GET /api/v0/object/patch/append-data`**   | :white_check_mark: | :white_check_mark: |
|     `arg1=`                                  | :white_check_mark: | :white_check_mark: |
|     `arg2=`                                  | :white_check_mark: | :white_check_mark: |
| **`POST /api/v0/object/patch/add-link`**     | :white_check_mark: | :white_check_mark: |
|     `arg1=`                                  | :white_check_mark: | :white_check_mark: |
|     `arg2=`                                  | :white_check_mark: | :white_check_mark: |
|     `arg3=`                                  | :white_check_mark: | :white_check_mark: |
|     `create=`                                | :white_check_mark: | :white_check_mark: |
| **`POST /api/v0/object/patch/rm-link`**      | :white_check_mark: | :white_check_mark: |
|     `arg1=`                                  | :white_check_mark: | :white_check_mark: |
|     `arg2=`                                  | :white_check_mark: | :white_check_mark: |
| **`POST /api/v0/object/patch/set-data`**     | :white_check_mark: | :white_check_mark: |
|     `arg1=`                                  | :white_check_mark: | :white_check_mark: |
|     `arg2=`                                  | :white_check_mark: | :white_check_mark: |
| **`GET /api/v0/object/put`**                 | :white_check_mark: | :white_check_mark: |
|     `arg=`                                   | :white_check_mark: | :white_check_mark: |
|     `inputenc`                               | :white_check_mark: | :white_check_mark: |
| **`GET /api/v0/object/stat`**                | :white_check_mark: | :white_check_mark: |
|     `arg=`                                   | :white_check_mark: | :white_check_mark: |

### Core

See [interface-ipfs-core](https://github.com/ipfs/interface-ipfs-core).


## p2p (libp2p exposed API)

> **This is blocked until there is a formalized `interface-libp2p`**. Currently, js-ipfs exposes libp2p directly while go-ipfs exposes a subset of commands that use libp2p.

### CLI

### HTTP

### Core

See [interface-ipfs-core](https://github.com/ipfs/interface-ipfs-core).


## Pinning

### CLI

| Command                                      | Go Impl       | JS Impl       |
| -------------------------------------------- | :-----------: | :-----------: |
| **`ipfs pin add`**                           | :white_check_mark: | :construction:       |
|     `hash`                                   | :white_check_mark: | :construction:       |
|     `recursive`                              | :white_check_mark: | :construction:       |
|     `progress`                               | :white_check_mark: | :x:      |
| **`ipfs pin ls`**                            | :white_check_mark: | :construction:       |
|     `type`                                   | :white_check_mark: | :construction:       |
|     `quiet`                                  | :white_check_mark: | :construction:       |
| **`ipfs pin rm`**                            | :white_check_mark: | :construction:       |
|     `hash`                                   | :white_check_mark: | :construction:       |
|     `recursive`                              | :white_check_mark: | :construction:       |
| **`ipfs pin update`**                        | :white_check_mark: | :x:      |
|     `hash`                                   | :white_check_mark: | :x:      |
|     `unpin`                                  | :white_check_mark: | :x:      |
| **`ipfs pin verify`**                        | :white_check_mark: | :x:      |
|     `verbose`                                | :white_check_mark: | :x:      |
| **`ipfs refs`**                              | :white_check_mark: | :x:      |
|     `hash`                                   | :white_check_mark: | :x:      |
|     `format`                                 | :white_check_mark: | :x:      |
|     `edges`                                  | :white_check_mark: | :x:      |
|     `unique`                                 | :white_check_mark: | :x:      |
|     `recursive`                              | :white_check_mark: | :x:      |
| **`ipfs refs local`**                        | :white_check_mark: | :x:      |

### HTTP

| Endpoint                                     | Go Impl       | JS Impl       |
| -------------------------------------------- | :-----------: | :-----------: |
| **`GET /api/v0/pin/add`**                    | :white_check_mark: | :construction:       |
|     `arg=`                                   | :white_check_mark: | :construction:       |
|     `recursive=`                             | :white_check_mark: | :construction:       |
| **`POST /api/v0/pin/ls`**                    | :white_check_mark: | :construction:       |
|     `type=`                                  | :white_check_mark: | :x:      |
|     `quiet=`                                 | :white_check_mark: | :x:      |
| **`GET /api/v0/pin/rm`**                     | :white_check_mark: | :x:      |
|     `arg=`                                   | :white_check_mark: | :x:      |
|     `recursive=`                             | :white_check_mark: | :x:      |
| **`GET /api/v0/pin/update`**                 | :white_check_mark: | :x:      |
|     `arg=`                                   | :white_check_mark: | :x:      |
|     `unpin=`                                 | :white_check_mark: | :x:      |
| **`GET /api/v0/pin/verify`**                 | :white_check_mark: | :x:      |
|     `verbose=`                               | :white_check_mark: | :x:      |
| **`GET /api/v0/refs`**                       | :white_check_mark: | :x:      |
|     `arg=`                                   | :white_check_mark: | :x:      |
|     `format=`                                | :white_check_mark: | :x:      |
|     `edges=`                                 | :white_check_mark: | :x:      |
|     `unique=`                                | :white_check_mark: | :x:      |
|     `recursive=`                             | :white_check_mark: | :x:      |
| **`GET /api/v0//refs/local`**                | :white_check_mark: | :x:      |

### Core

See [interface-ipfs-core](https://github.com/ipfs/interface-ipfs-core).


## PubSub

### CLI

| Command                                      | Go Impl       | JS Impl       |
| -------------------------------------------- | :-----------: | :-----------: |
| **`ipfs pubsub ls`**                         | :white_check_mark: | :white_check_mark: |
| **`ipfs pubsub peers`**                      | :white_check_mark: | :white_check_mark: |
|     `topic`                                  | :white_check_mark: | :white_check_mark: |
| **`ipfs pubsub pub`**                        | :white_check_mark: | :white_check_mark: |
|     `topic`                                  | :white_check_mark: | :white_check_mark: |
|     `data`                                   | :white_check_mark: | :white_check_mark: |
| **`ipfs pubsub sub`**                        | :white_check_mark: | :white_check_mark: |
|     `topic`                                  | :white_check_mark: | :white_check_mark: |
|     `discover`                               | :white_check_mark: | :x:      |

### HTTP

| Endpoint                                     | Go Impl       | JS Impl       |
| -------------------------------------------- | :-----------: | :-----------: |
| **`GET /api/v0/pubsub/ls`**                  | :white_check_mark: | :white_check_mark: |
| **`GET /api/v0/pubsub/peers`**               | :white_check_mark: | :white_check_mark: |
|     `arg=`                                   | :white_check_mark: | :white_check_mark: |
| **`GET /api/v0/pubsub/pub`**                 | :white_check_mark: | :white_check_mark: |
|     `arg=`                                   | :white_check_mark: | :white_check_mark: |
|     `arg=`                                   | :white_check_mark: | :white_check_mark: |
| **`GET /api/v0/pubsub/sub`**                 | :white_check_mark: | :white_check_mark: |
|     `arg=`                                   | :white_check_mark: | :white_check_mark: |
|     `discover=`                              | :white_check_mark: | :white_check_mark: |

### Core

See [interface-ipfs-core](https://github.com/ipfs/interface-ipfs-core).


## Repo

### CLI

| Command                                      | Go Impl       | JS Impl       |
| -------------------------------------------- | :-----------: | :-----------: |
| **`ipfs repo fsck`**                         | :white_check_mark: | :heavy_minus_sign:    |
| **`ipfs repo gc`**                           | :white_check_mark: | :x:      |
| **`ipfs repo stat`**                         | :white_check_mark: | :x:      |
| **`ipfs repo verify`**                       | :white_check_mark: | :heavy_minus_sign:    |
| **`ipfs repo version`**                      | :white_check_mark: | :white_check_mark: |

### HTTP

| Endpoint                                     | Go Impl       | JS Impl       |
| -------------------------------------------- | :-----------: | :-----------: |
| **`GET /api/v0/repo/fsck`**                  | :white_check_mark: | :heavy_minus_sign:    |
| **`GET /api/v0/repo/gc`**                    | :white_check_mark: | :x:      |
| **`GET /api/v0/repo/stat`**                  | :white_check_mark: | :x:      |
| **`GET /api/v0/repo/verify`**                | :white_check_mark: | :heavy_minus_sign:    |
| **`GET /api/v0/repo/version`**               | :white_check_mark: | :white_check_mark: |

### Core

See [interface-ipfs-core](https://github.com/ipfs/interface-ipfs-core).


## Swarm

### CLI

| Command                                      | Go Impl       | JS Impl       |
| -------------------------------------------- | :-----------: | :-----------: |
| **`ipfs swarm addrs`**                       | :white_check_mark: | :white_check_mark: |
| **`ipfs swarm addrs listen`**                | :white_check_mark: | :x:      |
| **`ipfs swarm addrs local`**                 | :white_check_mark: | :white_check_mark: |
|     `id=`                                    | :white_check_mark: | :x:      |
| **`ipfs swarm connect`**                     | :white_check_mark: | :white_check_mark: |
|     `arg=`                                   | :white_check_mark: | :white_check_mark: |
| **`ipfs swarm disconnect`**                  | :white_check_mark: | :white_check_mark: |
|     `arg=`                                   | :white_check_mark: | :white_check_mark: |
| **`ipfs swarm filters`**                     | :white_check_mark: | :x:      |
| **`ipfs swarm filters add`**                 | :white_check_mark: | :x:      |
|     `arg=`                                   | :white_check_mark: | :x:      |
| **`ipfs swarm filters rm`**                  | :white_check_mark: | :x:      |
|     `arg=`                                   | :white_check_mark: | :x:      |
| **`ipfs swarm peers`**                       | :white_check_mark: | :white_check_mark: |
|     `verbose=`                               | :white_check_mark: | :x:      |
|     `latency=`                               | :white_check_mark: | :x:      |
|     `streams=`                               | :white_check_mark: | :x:      |

### HTTP

| Endpoint                                     | Go Impl       | JS Impl       |
| -------------------------------------------- | :-----------: | :-----------: |
| **`GET /api/v0/swarm/addrs`**                | :white_check_mark: | :white_check_mark: |
| **`GET /api/v0/swarm/addrs/listen`**         | :white_check_mark: | :x:      |
| **`GET /api/v0/swarm/addrs/local`**          | :white_check_mark: | :white_check_mark: |
|     `id=`                                    | :white_check_mark: | :x:      |
| **`GET /api/v0/swarm/connect`**              | :white_check_mark: | :white_check_mark: |
|     `arg=`                                   | :white_check_mark: | :white_check_mark: |
| **`GET /api/v0/swarm/disconnect`**           | :white_check_mark: | :white_check_mark: |
|     `arg=`                                   | :white_check_mark: | :white_check_mark: |
| **`GET /api/v0/swarm/filters`**              | :white_check_mark: | :x:      |
| **`GET /api/v0/swarm/filters/add`**          | :white_check_mark: | :x:      |
|     `arg=`                                   | :white_check_mark: | :x:      |
| **`GET /api/v0/swarm/filters/rm`**           | :white_check_mark: | :x:      |
|     `arg=`                                   | :white_check_mark: | :x:      |
| **`GET /api/v0/swarm/peers`**                | :white_check_mark: | :white_check_mark: |
|     `verbose=`                               | :white_check_mark: | :x:      |
|     `latency=`                               | :white_check_mark: | :x:      |
|     `streams=`                               | :white_check_mark: | :x:      |

### Core

See [interface-ipfs-core](https://github.com/ipfs/interface-ipfs-core).
