---
title: Create a simple chat app
description: Learn how to deploy a minimal chat app entirely in the browser using the JavaScript implementation of IPFS.
---

# Create a simple chat app

We see a lot of questions about how to get started with using `js-ipfs` in the browser. This post demonstrates a minimal chat example in `js-ipfs` entirely in the browser. It uses WebRTC to achieve browser-to-browser connectivity where possible, and a circuit relay to connect browser nodes where not. Message passing is done with libp2p's pubsub.

## Getting the code

You can see the live demo [here](https://ipfs.io/ipfs/bafybeia5f2yk6td7ciroeped2uwfivo333b524t3zmoderfhl3xn7wi7aa/). If you'd like a local copy you can edit yourself, you can download the whole directory using IPFS:

    ipfs get bafybeia5f2yk6td7ciroeped2uwfivo333b524t3zmoderfhl3xn7wi7aa

Then simply open `index.html` in your web browser and you'll immediately begin automatically connecting to nodes and looking for peers!

You can also fork [TheDiscordian/browser-ipfs-chat](https://github.com/TheDiscordian/browser-ipfs-chat) on GitHub, and it'll be ready to test right away! If you want to deploy your own version, simply edit `index.html` and follow the setup information below.

The libraries used in this example are [`js-ipfs`](https://github.com/ipfs/js-ipfs/blob/master/docs/BROWSERS.md) and Bootstrap (just their minified CSS). If you want a newer version of `js-ipfs`, feel free to download [this one here](https://cdn.jsdelivr.net/npm/ipfs/dist/index.min.js) to use the latest version available 😃.

Let's take a look at how this works.

## Peer discovery and connectivity

In a browser, discovering and connecting to peers can be very hard, as we can't listen for new peers and we don't have access to the DHT. In order to have the best experience working in a browser, it's important to understand how to both find peers and stay connected with them.

The chat example achieves this in two ways. Using WebRTC-Star, we achieve direct browser-to-browser communication, and with a circuit relay, we have a relay in the middle. The chat application also has a status indicator in the top left to let you know  what kind of connection you have. Green means you're connected to the relay, even if it's via another peer; yellow means you're only seeing direct peers; and red means you have no peers (at least none using the chat application).

![Network graph showing the paths nodes can use to discover and communicate with each other](https://ipfs.io/ipfs/QmX2og5BKJCMVaebEm9ZGsACEYExoGqxhJjePKNc2mZ2pE "Browser IPFS network graph")

🌟 The diagram above demonstrates what a three-user network can look like. It's worth noting that the browser nodes can communicate with `go-ipfs` as well, so BrowserC doesn't have to be a browser at all, but instead could be a `go-ipfs` node!

### Docker (optional)

If you don't want to use Docker, skip to the [**WebRTC-Star**](#🌟-webrtc-star) section.

After this section we'll go over what WebRTC-Star and circuit relay do, and how to set them up. However, if you'd like to quickly roll your own kit using Docker, I've prepared an image you can use. It might not be the best long-term solution, but it should be great if you want to quickly get rolling and experiment.

#### Create a volume

First, create a volume to store long-term data like keys and node data.

```bash
docker volume create ipfs_bundle
```

#### Configure a domain

You need a domain and SSL to use this kit with browser nodes. There are two options below: One will run certbot and automatically grab a certificate for the provided domain name. The other option won't handle SSL for you, and instead you'll have to reverse proxy port 9091 to 9090 (SSL), and port 4011 to 4430 (SSL).

When you execute either commands, your IPFS node will also be set up for the first time giving you information such as its `PeerID` and circuit relay addresses. Take note of these — you'll want to edit them into the chat client so you can use your own node (see [WebRTC-Star Usage](#usage) and [p2p-circuit Usage](#usage-2) for usage examples, or edit `index.html` and change my node's multiaddresses out for your own).

##### With certbot

Ensure port 80 isn't being used, follow the checklist below, and then run the following command:

```bash
docker run --mount source=ipfs_bundle,destination=/root -p 9091:9091 -p 4011:4011 -p 9090:9090 -p 4430:4430 -p 80:80 -it trdiscordian/ipfsbundle certbot DOMAIN.COM
```

##### No certbot (SSL disabled)

If you do this option, the container won't handle SSL at all, and you'll have to reverse proxy port 9091 to 9090 (SSL), and port 4011 to 4430 (SSL).

```bash
docker run --mount source=ipfs_bundle,destination=/root -p 9091:9091 -p 4011:4011 -it trdiscordian/ipfsbundle DOMAIN.COM
```

::: tip CHECKLIST
* Replace `DOMAIN.COM` with your domain
* Ensure the domain is correctly pointing to the machine you're running the container on (subdomains work fine too)
:::

#### Running the container

Once you're configured, running the container is simple. Ensure that, at minimum, ports 4430 and 9090 are forwarded.

```bash
docker run --mount source=ipfs_bundle,destination=/root -p 9091:9091 -p 4011:4011 -p 9090:9090 -p 4430:4430 -it trdiscordian/ipfsbundle
```

::: tip
You should now be able to use this machine as both a WebRTC-Star node and a p2p-circuit node.
:::

### WebRTC-Star

We can use [WebRTC-Star](https://github.com/libp2p/js-libp2p-webrtc-star) nodes to help discover other peers we can connect with directly browser-to-browser. I find it easy to think of this as similar to [STUN](https://en.wikipedia.org/wiki/STUN), if you're already familiar with that concept. Effectively, each connecting node will be given a WebRTC-Star [multiaddress](https://docs.libp2p.io/concepts/addressing/) that other nodes can use to discover and connect to your browser directly. This means that if you peer with someone using the star node, and the star node goes offline, you remain connected!

#### Usage

Connecting to a star node is quite simple:

```javascript
ipfs = await Ipfs.create({
    repo: 'ok' + Math.random(), // random so we get a new peerid every time, useful for testing
    config: {
        Addresses: {
            Swarm: [
                '/dns4/star.thedisco.zone/tcp/9090/wss/p2p-webrtc-star',
                '/dns6/star.thedisco.zone/tcp/9090/wss/p2p-webrtc-star'
            ]
        },
}});
```

#### Setup

Please note that this example uses my own star nodes — however, those won't necessarily always be accessible there. Currently it's important to either find a reliable star node or host your own. You can host your own quite simply by following the instructions [here](https://github.com/libp2p/js-libp2p-webrtc-star#rendezvous-server-aka-signaling-server) for a native setup and [here](https://github.com/libp2p/js-libp2p-webrtc-star/blob/master/DEPLOYMENT.md) for a Docker container which includes Nginx (for SSL). If you opt for the native setup, we cover the Nginx reverse proxy process and SSL cert retrieval later in this post.

::: tip
This is a very clean and effective method of P2P communications; however, sometimes NATs get in the way. We use [`p2p-circuit`](https://docs.libp2p.io/concepts/circuit-relay/) to get around that.
:::

### `p2p-circuit`

Using `p2p-circuit` is really helpful for peers behind tricky NATs (or a VPN, or anything really). I find the relaying of `p2p-circuit` to be similar to [TURN](https://en.wikipedia.org/wiki/Traversal_Using_Relays_around_NAT), so it's easy to think of it that way if you're already familiar with it.

#### Usage

Once all the services for `p2p-circuit` are put together, connecting to the node can be achieved in a few different ways. First, to connect on startup to _only_ our node(s):

```javascript
ipfs = await Ipfs.create({
    config: {
        Bootstrap: [
            '/dns6/ipfs.thedisco.zone/tcp/4430/wss/p2p/12D3KooWChhhfGdB9GJy1GbhghAAKCUR99oCymMEVS4eUcEy67nt',
            '/dns4/ipfs.thedisco.zone/tcp/4430/wss/p2p/12D3KooWChhhfGdB9GJy1GbhghAAKCUR99oCymMEVS4eUcEy67nt'
        ]
}});
```

Or we can add our own after, then manually initiate the connection:

```javascript
await ipfs.bootstrap.add('/dns6/ipfs.thedisco.zone/tcp/4430/wss/p2p/12D3KooWChhhfGdB9GJy1GbhghAAKCUR99oCymMEVS4eUcEy67nt');
await ipfs.swarm.connect('/dns6/ipfs.thedisco.zone/tcp/4430/wss/p2p/12D3KooWChhhfGdB9GJy1GbhghAAKCUR99oCymMEVS4eUcEy67nt');
await ipfs.bootstrap.add('/dns4/ipfs.thedisco.zone/tcp/4430/wss/p2p/12D3KooWChhhfGdB9GJy1GbhghAAKCUR99oCymMEVS4eUcEy67nt');
await ipfs.swarm.connect('/dns4/ipfs.thedisco.zone/tcp/4430/wss/p2p/12D3KooWChhhfGdB9GJy1GbhghAAKCUR99oCymMEVS4eUcEy67nt');
```

If you're looking to do your own client without copying the example, ensure you're also communicating with the announce channel, which is described under [Advertising](#advertising). The relevant code in the chat demo is this (simplified):

```javascript
var ipfs; // store the IPFS node you're using in this variable

// processes a circuit-relay announce over pubsub
async function processAnnounce(addr) {
    // get our peerid
    me = await ipfs.id();
    me = me.id;

    // not really an announcement if it's from us
    if (addr.from == me) {
        return;
    }

    // if we got a keep-alive, nothing to do
    if (addr == "keep-alive") {
        console.log(addr);
        return;
    }

    peer = addr.split("/")[9];
    console.log("Peer: " + peer);
    console.log("Me: " + me);
    if (peer == me) { // return if the peer being announced is us
        return;
    }

    // get a list of peers
    peers = await ipfs.swarm.peers();
    for (i in peers) {
        // if we're already connected to the peer, don't bother doing a
        // circuit connection
        if (peers[i].peer == peer) {
            return;
        }
    }
    // log the address to console as we're about to attempt a connection
    console.log(addr);

    // connection almost always fails the first time, but almost always
    // succeeds the second time, so we do this:
    try {
        await ipfs.swarm.connect(addr);
    } catch(err) {
        console.log(err);
        await ipfs.swarm.connect(addr);
    }
}

// process announcements over the relay network, and publish our own
// keep-alives to keep the channel alive
await ipfs.pubsub.subscribe("announce-circuit", processAnnounce);
setInterval(function(){ipfs.pubsub.publish("announce-circuit", "peer-alive");}, 15000);
```

#### Setup

Like the star nodes, it'll be important to host your own things as the ones in this post could go offline at any moment.

For the purposes of this example, you'll need to do a few things on a server hosting your own [go-ipfs](https://github.com/ipfs/go-ipfs) node. You'll also need a working Nginx install setup, which will be used for SSL, which is a requirement for browsers.

First configure the Go node, enabling [WebSocket](https://en.wikipedia.org/wiki/WebSocket) support, and designate it as a relay so we can communicate with it from a browser by editing `~/.ipfs/config` to add the following settings:

```json
{
    "Addresses": {
        "Swarm" : [
            "/ip4/0.0.0.0/tcp/4011/ws",
            "/ip6/::/tcp/4011/ws"
        ]
    },
    "Swarm": {
        "EnableRelayHop": true
    }
}
```

::: tip
Restart your `go-ipfs` node however you normally do (possibly `systemctl --user restart ipfs`), and we're mostly set up! We've enabled regular WebSockets with relaying support, however we need secure WebSockets (outlined in the SSL section below) — otherwise browsers won't be able to connect to us.
:::

#### Advertising

Using `p2p-circuit` can be a bit tricky. Once we connect to the relay from a browser, we're not advertising that we're able to be reached through it! For this purpose, I've created a Python script that runs alongside `go-ipfs` and advertises the browser `js-ipfs` peers it encounters over [PubSub](https://docs.libp2p.io/concepts/publish-subscribe/) with a `p2p-circuit` [multiaddress](https://docs.libp2p.io/concepts/addressing/).

You can find the Python script [here](https://gist.github.com/TheDiscordian/51962fea72f8d5a5c3bba79dd7009e1c). It can be run with a simple `python ipfs_peeradvertiser.py`. However, ensure you first edit `CIRCUIT` with your own node's information, or you won't announce the peers correctly, and they won't know how to use your relay to connect to other peers.

You can retrieve your own circuit info quite easily. Simply run `ipfs id` on your `go-ipfs` node to get your PeerID, then form the circuit URL like so:

    /dns6/ipfs.YOURDOMAIN.COM/tcp/4430/p2p/YOUR_PEERID/p2p-circuit/p2p/

You should see here where you simply fill out your domain name you got the SSL cert for, as well as your node's PeerID. For the script, the leading and trailing slash are required, too.

::: warning IMPORTANT
Ensure you specify DNS6 or DNS4, depending on if you're forming an IPv6 or IPv4 address. **It's important to ensure you use DNS, otherwise browser nodes likely won't be able to connect.** Also note the port 4430; if you used a different one, you'll need to specify that.
:::

## SSL (Nginx)

So far we've setup WebRTC-Star and `p2p-circuit` without SSL (unless you used the WebRTC-Star docker setup). If you want to use your nodes over the Internet, with a browser, they need to support SSL. If you're using the defaults currently WebRTC-Star should be running on port 9090 (no-SSL) and p2p-circuit will be on port 4011 (no-SSL). We're going to put those on port 9091 (SSL) and port 4430 (SSL), respectively.

First ensure Nginx is installed, then obtain and install [Certbot](https://certbot.eff.org/docs/install.html).

We're going to create two files from templates below. Ensure you're editing entries like `YOURDOMAIN.COM` with the full domain (including subdomain) you plan to use for your services.

`/etc/nginx/sites-available/ipfs` (p2p-circuit, 4430(SSL) ➡ 4011)

```nginx
map $http_upgrade $connection_upgrade {
	default upgrade;
	'' close;
}

upstream ipfs {
	server 127.0.0.1:4011;
}

server {
	server_name YOURDOMAIN.COM;
	listen 4430 ssl;
	ssl_certificate /etc/letsencrypt/live/YOURDOMAIN.COM/fullchain.pem;
	ssl_certificate_key /etc/letsencrypt/live/YOURDOMAIN.COM/privkey.pem;
	location / {
		proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

		proxy_pass http://ipfs;
		proxy_http_version 1.1;
		proxy_set_header Upgrade $http_upgrade;
		proxy_set_header Connection $connection_upgrade;
		proxy_set_header Host $host;
	}
}
```

***

`/etc/nginx/sites-available/star` (WebRTC-Star, 9091(SSL) ➡ 9090)

```nginx
map $http_upgrade $connection_upgrade {
	default upgrade;
	'' close;
}

upstream star {
	server 127.0.0.1:9090;
}

server {
	server_name YOURDOMAIN.COM;
	listen 9091 ssl;
	ssl_certificate /etc/letsencrypt/live/YOURDOMAIN.COM/fullchain.pem;
	ssl_certificate_key /etc/letsencrypt/live/YOURDOMAIN.COM/privkey.pem;
	location / {
		proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

		proxy_pass http://star;
		proxy_http_version 1.1;
		proxy_set_header Upgrade $http_upgrade;
		proxy_set_header Connection $connection_upgrade;
		proxy_set_header Host $host;
	}
}
```

So in this example you can see we're accepting SSL on port 4430 — this is our "wss port" (WebSocket Secure) — and then passing it to the unsecured port locally on 4011 — this is our "ws port". So if we want to connect to this node from a browser, we'd use port 4430.

After, run the following:

```bash
sudo systemctl stop nginx
sudo certbot -d YOURDOMAIN.COM --standalone # Edit YOURDOMAIN.COM to the domain you want a cert for, if you need multiple, fill in multiple or run the command multiple times
sudo ln -s /etc/nginx/sites-available/ipfs /etc/nginx/sites-enabled/ipfs
sudo ln -s /etc/nginx/sites-available/star /etc/nginx/sites-enabled/star
sudo systemctl start nginx
```

::: tip NOTE
Nginx is now operating as a reverse proxy, giving you secured WebSockets!
:::

## Communication

Whew! Since you made it this far, you might be wondering "what is communication like?" Luckily the answer is that it's _very_ easy in comparison to finding the peers, with only minor pitfalls. We're going to simply cover how we're using [PubSub](https://docs.libp2p.io/concepts/publish-subscribe/) in the chat example, and exactly what pitfalls were found while it was developed.

### PubSub

Using PubSub, we're able to subscribe to topics and retrieve any messages posted to those topics. In `js-ipfs`, we can set a callback function, which gets called whenever a message is received:

```javascript
function echo(msg) {
	msg = new TextDecoder().decode(msg.data);
	console.log(msg);
}

await ipfs.pubsub.subscribe("example_topic", echo);
```

Publishing is just as easy, too:

```javascript
await ipfs.pubsub.publish("example_topic", "Hello world!");
```

This is effectively what the chat demo is doing. It's subscribing to a global topic (named "discochat-global"), and simply relaying the messages people type around over PubSub.

### Possible browser pitfalls

So let's say you've done everything correctly. You're able to find peers using WebRTC-Star and `p2p-circuit` — awesome! However, you might find your connections expire, and you're unable to restore them. I'm not completely sure what causes this behaviour (probably some browser policy); however, we can do our best to mitigate these issues!

#### Staying connected to peers

We stay connected to peers in a couple of ways. The first way is more direct: by subscribing to and sending a "keepalive" announcement over `discochat-keepalive` every 4 seconds:

```javascript
setInterval(function(){sendmsg("1", prefix+"keepalive");}, 4000);
setInterval(checkalive, 1000);
```

This should help ensure we give peers looking to chat a high priority. Additionally, we  report over `announce-circuit` every 15 seconds to make sure we keep a connection to the circuit relay so we can connect to peers stuck behind a NAT. That's accomplished like so:

```javascript
// process announcements over the relay network, and publish our own keep-alives to keep the channel alive
await ipfs.pubsub.subscribe("announce-circuit", processAnnounce);
setInterval(function(){ipfs.pubsub.publish("announce-circuit", "peer-alive");}, 15000);
```

::: tip
A simplified version of `processAnnounce` is found under [p2p-circuit#Usage](#usage).
:::

The Python script on the circuit relay will report a keepalive every 4 seconds. You may have noticed we're reporting "peer-alive" instead of "keep-alive"; this is to separate peer requests from relay requests, making it easier to tell when we no longer see a relay.

#### Staying connected to the circuit relay

Outside of the simplified version of `processAnnounce`, in the real version there are a few variables used for tracking keep-alive and peer-alive. These are `lastAlive` and `lastPeer`, respectively. We even track the last time we bootstrapped via `lastBootstrap`. Using all this, we can display the yellow status when we're only connected to peers (tracked via `lastPeer`), and if we don't see a keep-alive for 35 seconds (and we haven't attempted a bootstrap in 60 seconds), we can attempt to re-connect to the bootstrap relay (and display a red status). This is accomplished like so:

```javascript
const bootstraps = [
    '/dns6/ipfs.thedisco.zone/tcp/4430/wss/p2p/12D3KooWChhhfGdB9GJy1GbhghAAKCUR99oCymMEVS4eUcEy67nt',
    '/dns4/ipfs.thedisco.zone/tcp/4430/wss/p2p/12D3KooWChhhfGdB9GJy1GbhghAAKCUR99oCymMEVS4eUcEy67nt'
];
var lastAlive = 0;	// last keep-alive we saw from a relay
var lastPeer = 0; 	// last keep-alive we saw from another peer
var lastBootstrap = 0; // used for tracking when we last attempted to bootstrap (likely to reconnect to a relay)

// if reconnect is true, it'll first attempt to disconnect from the bootstrap nodes
async function dobootstrap(reconnect) {
    now = new Date().getTime();
    if (now-lastBootstrap < 60000) { // don't try to bootstrap again if we just tried within the last 60 seconds
        return;
    }
    lastBootstrap = now;
    for (i in bootstraps) {
        if (reconnect) {
            try {
                await ipfs.swarm.disconnect(bootstraps[i]);
            } catch (e) {
                console.log(e);
            }
        } else {
            await ipfs.bootstrap.add(bootstraps[i]);
        }
        await ipfs.swarm.connect(bootstraps[i]);
    }
}

// check if we're still connected to the circuit relay
function checkalive() {
    now = new Date().getTime();
    if (now-lastAlive >= 35000) {
        if (now-lastPeer >= 35000) {
            document.getElementById("status-ball").style.color = "red";
        } else {
            document.getElementById("status-ball").style.color = "yellow";
        }
        dobootstrap(true); // let's try to reconnect
    } else {
        document.getElementById("status-ball").style.color = "lime";
    }
}

setInterval(checkalive, 1000);
```

::: warning IMPORTANT
The above should be used with the full version of `processAnnounce`, as it relies on `lastAlive` and `lastPeer`, which aren't updated in the simplified version.
:::

## More resources

If you were successful in following this entire guide, you now have the ability to deploy powerful IPFS apps that run entirely in the browser, and leverage decentralized p2p whenever you can! To learn more, check the resources below:

* [js-ipfs/docs/BROWSERS.md](https://github.com/ipfs/js-ipfs/blob/master/docs/BROWSERS.md)
* [js-ipfs/docs/CONFIG.md](https://github.com/ipfs/js-ipfs/blob/master/docs/CONFIG.md)
* [js-ipfs/docs/core-api](https://github.com/ipfs/js-ipfs/tree/master/docs/core-api)
* [js-ipfs/examples/circuit-relaying](https://github.com/ipfs/js-ipfs/tree/master/examples/circuit-relaying)
* [js-libp2p-webrtc-star](https://github.com/libp2p/js-libp2p-webrtc-star)

_Thanks to [TheDiscordian](https://github.com/thediscordian) for originally creating this material as a post in [IPFS Blog & News](https://blog.ipfs.io/2021-06-10-guide-to-ipfs-connectivity-in-browsers/)._