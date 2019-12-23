---
title: Configuring Your Node
menu:
    guides:
        parent: examples
weight: 1
summary: IPFS is configured through a json formatted text file, located by default at `~/.ipfs/config`. The config file stores a few different address types, all of which use the multiaddr addressing format. Lets go over what each address type means…
---

<div class="alert alert-info">
Our interactive tutorials help you learn about the the decentralized web by writing code and solving challenges:
<a class="button button-primary" href="https://proto.school/#/tutorials" role="button" target="_blank">Open Tutorials at ProtoSchool</a> &nbsp;<i class="fa fa-external-link-square-alt"></i>
</div>

IPFS is configured through a json formatted text file, located by default at
`~/.ipfs/config`. Implementation specific information can be found within the [go-ipfs](https://github.com/ipfs/go-ipfs/blob/master/docs/config.md) and [js-ipfs](https://github.com/ipfs/js-ipfs/blob/master/docs/config.md) repositories.

### Addresses

The config file stores a few different address types, all of which use the
multiaddr addressing format. Lets go over what each address type means.

```json
"Addresses": {
    "Swarm": [
      "/ip4/0.0.0.0/tcp/4001"
    ],
    "API": "/ip4/127.0.0.1/tcp/5001",
    "Gateway": "/ip4/127.0.0.1/tcp/8080"
  }
```

#### Swarm

Swarm addresses are addresses that the local daemon will listen on for
connections from other IPFS peers. You should try to ensure that these
addresses can be dialed from a separate computer and that there are no
firewalls blocking the ports you specify.

#### API

The API address is the address that the daemon will serve the http API from.
This API is used to control the daemon through the command line, or simply
via curl if you're feeling adventurous. You should ensure that this address
is not dialable from outside of your machine, or other potentially malicious
parties may be able to send commands to your IPFS daemon.

#### Gateway

The Gateway address is the address that the daemon will serve the gateway
interface from. The gateway may be used to view files through IPFS, and serve
static web content. This port may or may not be dialable from outside of your
machine, thats entirely up to you. The gateway address is optional, if you
leave it blank, the gateway server will not start.

### Mounts

The mounts config values specifies the default mount points for the IPFS and
ipns virtual file systems, if no other directories are specified by the
`ipfs mount` command. These folders should exist, and have permissions for your
user to be able to mount to them via fuse.

### Bootstrap

The Bootstrap config array specifies the list of IPFS peers that your daemon
will connect to on startup. The default values for this are the 'ipfs solarnet'
nodes, which are a set of VPS servers distributed around the country.
