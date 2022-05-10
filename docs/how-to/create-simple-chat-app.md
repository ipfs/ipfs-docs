---
title: "Create a simple chat app"
description: "Learn how to deploy a minimal chat app entirely in the browser using the JavaScript implementation of IPFS."
---

# Create a simple chat app

This how-to demonstrates a minimal chat app in [js-ipfs](../reference/js/api/#js-ipfs) entirely in the browser.

Here’s a quick demo of the app:

![A quick demo of the browser chat app](./create-simple-chat-app/example-animation.gif)

The heading shows which user is chatting and has a status indicator in the top left to let you know what kind of connection you have.

![Diagram of app with callouts.](./create-simple-chat-app/app-diagram.png)

- Green means you're connected to the relay, even if it's via another peer.
- Yellow means you're only seeing direct peers (no other peer in the middle).
- Red means you have no peers (at least none using the chat application).

To see a live demo, start your ipfs daemon (open IPFS Desktop or enter `ipfs daemon` in the CLI) and have a chat buddy do the same. Then you can both open the [live demo](https://ipfs.io/ipfs/bafybeia5f2yk6td7ciroeped2uwfivo333b524t3zmoderfhl3xn7wi7aa/&sa=D&source=editors&ust=1651157762663308&usg=AOvVaw1sQEgWa5q7YI8HnLTPUq0Y) and chat. Once our chat app gets some traction, you’ll be able to make new friends on the network.

## How it works

To get a minimal chat app going in your browser, you can [download a copy of the chat app code](#getting-the-code), run the daemon, and open index.html (instructions below).

To test and deploy your own version with your own star nodes and addresses, follow the setup below for:

- [Get the code](#get-the-code)
- [Set up discovery and connectivity to peers](#peer-discovery-and-connectivity)
- [Set up advertising](#set-up-advertising) to let other peers know your users are there
- [Set up publishing and stay connected](#set-up-publishing-and-stay-connected) to peers

Besides [IPFS](/concepts/what-is-ipfs) (with CIDv1) and JavaScript, our chat app uses these technologies:

- [Libp2p](https://libp2p.io/)’s [WebRTC-Star](https://github.com/libp2p/js-libp2p-webrtc-star) and [circuit relay](https://docs.libp2p.io/concepts/circuit-relay) for discovery and connecting (with two libraries: [js-ipfs](../reference/js/api),  Bootstrap–with minified CSS), and [go-ipfs](../reference/go/api) for p2p circuit connecting with websockets,
- some [Python code](#advertising) that we supply for advertising, and
- Libp2p’s experimental [PubSub](https://docs.libp2p.io/concepts/publish-subscribe) feature for publishing, with some tips for staying connected.

## Get the code

There are two ways to get the code: You can download it or you can clone or fork it from GitHub.

### Download the code

1. In the CLI, start your daemon with: `ipfs daemon`
2. In another instance of the CLI, get the chat app code directory with:  

    ```shell
    ipfs get bafybeia5f2yk6td7ciroeped2uwfivo333b524t3zmoderfhl3xn7wi7aa
    ```
3. Change directories:  

    ```shell
    cd bafybeia5f2yk6td7ciroeped2uwfivo333b524t3zmoderfhl3xn7wi7aa
    ```

4. Use `open index.html` to see it in the browser.

A tab with the app opens and you’ll automatically begin connecting to nodes and looking for peers! Your home folder will contain the new directory with the html, bootstrap, and js files.

### Clone or fork the code

Go to [TheDiscordian/browser-ipfs-chat](https://github.com/TheDiscordian/browser-ipfs-chat) in GitHub. Your home folder will contain the new directory with the html, bootstrap, and js files.

To test and deploy your own version, you’ll be editing `index.html`.

Let's take a look at how this works.

## Set up discovery and connectivity to peers

Browsers don’t automatically provide discovery and connectivity, so, without the code we provide, you can't listen for new peers and get access to the navigation system that the [distributed hash table (DHT)](https://docs.ipfs.io/concepts/dht) provides. Our chat app provides discovery and connectivity in two ways:

- [WebRTC-Star](https://webrtc.org/) achieves direct browser-to-browser communication.
- [circuit relay](https://docs.libp2p.io/concepts/circuit-relay/), maintains the connection with a relay in the middle.

This diagram demonstrates what a three-user network can look like.

![Network graph showing the paths nodes can use to discover and communicate with each other](./create-simple-chat-app/discovery-diagram.png)

The browser nodes can communicate with go-ipfs as well, so BrowserC doesn't have to be a browser at all, but instead could be a go-ipfs node.

### WebRTC-Star

We use [WebRTC-Star](https://github.com/libp2p/js-libp2p-webrtc-star) nodes to help discover other peers to connect with directly, browser-to-browser. WebRTC stands for Web Real Time Communication. Nodes using the libp2p-webrtc-star transport connect to a known rendezvous point in the network, where they can learn about other nodes (Discovery) and exchange their [Session Description Protocol (SDP)](https://www.html5rocks.com/en/tutorials/webrtc/infrastructure/) offers (their signaling data).

We use the [js-ipfs](https://github.com/ipfs/js-ipfs/blob/master/docs/BROWSERS.md) and Bootstrap libraries. For Bootstrap, we’re only using minified CSS. If you want a newer version of "js-ipfs" (It now just goes by _ipfs_), you can use the [latest version available](https://cdn.jsdelivr.net/npm/ipfs/) from JSDelivr.

If you're familiar with the concept of [STUN](https://en.wikipedia.org/wiki/STUN), it might be helpful to think of WebRTC-Star nodes as conceptually similar. Effectively, each connecting node is given a WebRTC-Star [multiaddress](https://docs.libp2p.io/concepts/addressing/) that other nodes can use to discover and connect to your browser directly. This means that if you peer with someone using the star node, and the star node goes offline, you remain connected.

Here’s how we connect to a star node, in the \<script\> of the html files:

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
    }
});
```

#### Host your own WebRTC-Star

This how-to uses example star nodes; however, those won't necessarily always be accessible. Currently it's important to either find a reliable star node or host your own.

Host your own by following the Install and Usage instructions for a [js-libp2p-webrtc-star-signaling-server](https://github.com/libp2p/js-libp2p-webrtc-star/tree/master/packages/webrtc-star-signalling-server).

### p2p-circuit

Using p2p-circuit is helpful for peers behind tricky NATs (or a VPN, or anything really). If you're familiar with [TURN](https://en.wikipedia.org/wiki/Traversal_Using_Relays_around_NAT), it might be useful to think of the relaying of p2p-circuit as something similar.

WebRTC-Star is a very clean and effective method of P2P communications; however, sometimes NATs get in the way, so we use [p2p-circuit](https://docs.libp2p.io/concepts/circuit-relay) to get around that.

#### Connect to a star node

Once all the services for p2p-circuit are put together, you can connect to the star node in a few different ways.

To connect on startup to only our star node(s):

```javascript
ipfs = await Ipfs.create({
    config: {
        Bootstrap: \[
            '/dns6/ipfs.thedisco.zone/tcp/4430/wss/p2p/12D3KooWChhhfGdB9GJy1GbhghAAKCUR99oCymMEVS4eUcEy67nt',
            '/dns4/ipfs.thedisco.zone/tcp/4430/wss/p2p/12D3KooWChhhfGdB9GJy1GbhghAAKCUR99oCymMEVS4eUcEy67nt'
        \]
}});
```

To add your own star node and then manually initiate the connection:

```javascript
await ipfs.bootstrap.add('/dns6/ipfs.thedisco.zone/tcp/4430/wss/p2p/12D3KooWChhhfGdB9GJy1GbhghAAKCUR99oCymMEVS4eUcEy67nt');
await ipfs.swarm.connect('/dns6/ipfs.thedisco.zone/tcp/4430/wss/p2p/12D3KooWChhhfGdB9GJy1GbhghAAKCUR99oCymMEVS4eUcEy67nt');
await ipfs.bootstrap.add('/dns4/ipfs.thedisco.zone/tcp/4430/wss/p2p/12D3KooWChhhfGdB9GJy1GbhghAAKCUR99oCymMEVS4eUcEy67nt');
await ipfs.swarm.connect('/dns4/ipfs.thedisco.zone/tcp/4430/wss/p2p/12D3KooWChhhfGdB9GJy1GbhghAAKCUR99oCymMEVS4eUcEy67nt');
```

If you're looking to do your own client without copying the example, ensure that you're also communicating with the announce channel, which is described under [Advertising](https://docs.ipfs.io/how-to/create-simple-chat-app/#advertising) below. This is the simplified version of the relevant code in the chat demo:

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

    // if we got a keepalive, nothing to do
    if (addr == "keep-alive") {
        console.log(addr);
        return;
    }

    peer = addr.split("/")\[9\];
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
        if (peers\[i\].peer == peer) {
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
// keepalives to keep the channel alive
await ipfs.pubsub.subscribe("announce-circuit", processAnnounce);
setInterval(function(){ipfs.pubsub.publish("announce-circuit", "peer-alive");}, 15000);
```

#### Host your own go-ipfs star node on a server

Like the WebRTC star nodes, it's important to host your own [go-ipfs](https://github.com/ipfs/go-ipfs) star node on a server, as the one in this how-to could go offline at any moment.  Configuring a Go node enables WebSocket support and designates it as a relay so we can communicate with it from a browser. To configure the Go node, add the following settings to `~/.ipfs/config`:

```javascript
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

:::tip
Restart your go-ipfs node however you normally would (such as by using `systemctl --user restart ipfs`), and you're mostly set up! You've enabled regular WebSockets with relaying support; however, you still need secure WebSockets (outlined in the [SSL](https://docs.ipfs.io/how-to/create-simple-chat-app/%23ssl-nginx) section below) — otherwise browsers won't be able to connect to us.
:::

#### Set up SSL and Nginx

So far you've setup WebRTC-Star and p2p-circuit without SSL. If you want to use your nodes over the internet with a browser, they need to support SSL. If you're using the defaults, currently WebRTC-Star should be running on port 9090 (no-SSL) and p2p-circuit will be on port 4011 (no-SSL). We're going to put those on port 9091 (SSL) and port 4430 (SSL), respectively.

Make sure you have a working [Nginx](https://www.nginx.com/) installed, a requirement for browsers to be used for SSL.

Then obtain and install [Certbot](https://certbot.eff.org/docs/install.html).

Create two files from the templates below. Ensure that you're editing entries like YOURDOMAIN.COM with the full domain (including subdomain) that you plan to use for your services.

```plaintext
/etc/nginx/sites-available/ipfs (p2p-circuit, 4430(SSL) ➡ 4011)
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

-----

/etc/nginx/sites-available/star (WebRTC-Star, 9091(SSL) ➡ 9090)
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
        location {

                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_pass http://star;
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection $connection_upgrade;
                proxy_set_header Host $host;
        }
}
```

In this example, we're accepting SSL on port 4430 (our "wss port," which is WebSocket secure) and then passing it to the unsecured port locally on 4011 (our "ws port"). If you want to connect to this node from a browser, you'd use port 4430.

Next, run the following:

```shell
sudo systemctl stop nginx
sudo certbot -d YOURDOMAIN.COM --standalone
```

Edit YOURDOMAIN.COM to the domain you want a cert for, if you need multiple, fill in multiple or run the command multiple times.

Next, run:

```shell
sudo ln -s /etc/nginx/sites-available/ipfs /etc/nginx/sites-enabled/ipfs
sudo ln -s /etc/nginx/sites-available/star /etc/nginx/sites-enabled/star
sudo systemctl start nginx
```

Nginx is now operating as a reverse proxy, giving you secured WebSockets.

## Set up advertising

When you connect to the relay from a browser, you're still not advertising that you're able to be reached through it. For this purpose, we provide a Python script that runs alongside go-ipfs and advertises the browser js-ipfs peers it encounters over [PubSub](https://docs.libp2p.io/concepts/publish-subscribe/) with a p2p-circuit [multiaddress](https://docs.libp2p.io/concepts/addressing/).

Before you use the code, you'll need your own node's PeerID, or you won't announce peers correctly, and they won't know how to use your relay to connect to other peers.

To retrieve your own PeerID, run `ipfs id` on your go-ipfs node.

You'll be customizing the code for `CIRCUITS =...`:

```shell
CIRCUITS = ["/dns6/ipfs.thedisco.zone/tcp/4430/p2p/12D3KooWChhhfGdB9GJy1GbhghAAKCUR99oCymMEVS4eUcEy67nt/p2p-circuit/p2p/", "/dns4/ipfs.thedisco.zone/tcp/4430/p2p/12D3KooWChhhfGdB9GJy1GbhghAAKCUR99oCymMEVS4eUcEy67nt/p2p-circuit/p2p/"]
```

:::warning
Ensure you specify DNS6 or DNS4, depending on whether you're forming an IPv6 or IPv4 address. It's important to ensure that you use DNS, otherwise browser nodes likely won't be able to connect. Also note the port 4430; if you used a different one, you'll need to specify that.
:::

Notice where you fill out the domain name that you got the SSL cert for, as well as your node's PeerID. For the script, the leading and trailing slash are required, too. Now you can form the circuit URL, as follows:

```shell
/dns6/ipfs.YOURDOMAIN.COM/tcp/4430/p2p/YOUR\_PEERID/p2p-circuit/p2p/
```
Use this URL to update the [Python script](https://gist.github.com/TheDiscordian/51962fea72f8d5a5c3bba79dd7009e1c).

Then you can run it with python `ipfs_peeradvertiser.py`.

## Set up publishing and stay connected

We're just rolling out [PubSub](https://docs.libp2p.io/concepts/publish-subscribe/) for communication. It still has a couple issues to handle manually, so we’ll walk you through those.

### PubSub

With PubSub, you can subscribe to topics and retrieve any messages posted to those topics. In js-ipfs, you can set a callback function, which gets called whenever a message is received:

```javascript
function echo(msg) {
        msg = new TextDecoder().decode(msg.data);
        console.log(msg);
}

await ipfs.pubsub.subscribe("example\_topic", echo);
```

To publish use:

```shell
await ipfs.pubsub.publish("example\_topic", "Hello world\!");
```

This is effectively what the chat demo is doing: It's subscribing to a global topic (named `discochat-global`) and relaying the messages people type over PubSub.

### Staying connected

So let's say you've done everything correctly. You're able to find peers using WebRTC-Star and p2p-circuit — awesome! However, you might find your connections expire, and you're unable to restore them, so here's how to mitigate these issues:

#### Stay connected to peers

We stay connected to peers in two ways:

**Keepalive every 4 seconds:** The first way is more direct: by subscribing to and sending a `keepalive` announcement over discochat-keepalive every 4 seconds:

```javascript
setInterval(function(){sendmsg("1", prefix+"keepalive");}, 4000);
setInterval(checkalive, 1000);
```

This should help ensure that you give peers looking to chat a high priority.

**Announce-circuit every 15 seconds:** Additionally, we report over announce-circuit every 15 seconds to make sure we keep a connection to the circuit relay so we can connect to peers stuck behind a [Network Address Translation (NAT)](https://www.comptia.org/content/guides/what-is-network-address-translation). That's accomplished like so:

```javascript
// process announcements over the relay network, and publish our own keepalives to keep the channel alive
await ipfs.pubsub.subscribe("announce-circuit", processAnnounce);
setInterval(function(){ipfs.pubsub.publish("announce-circuit", "peer-alive");}, 15000);
```

:::tip
A simplified version of `processAnnounce` is found under [p2p-circuit](#p2p-circuit), above.
:::

The Python script on the circuit relay reports a `keepalive` every 4 seconds. You may have noticed we're reporting `peeralive` instead of `keepalive`; this is to separate peer requests from relay requests, making it easier to tell when we no longer see a relay.

#### Stay connected to the circuit relay

Outside of the simplified version of `processAnnounce`, in the real version there are a few variables used for tracking `keepalive` and `peeralive`. These are `lastAlive` and `lastPeer`, respectively. We even track the last time you bootstrapped with `lastBootstrap`. We display the yellow status when you're only connected to peers (tracked via `lastPeer`). If we don't see a `keepalive` for 35 seconds (and you haven't attempted a bootstrap in 60 seconds), we attempt to re-connect to the bootstrap relay (and display a red status). We accomplish this like so:

```javascript
const bootstraps = \[
    '/dns6/ipfs.thedisco.zone/tcp/4430/wss/p2p/12D3KooWChhhfGdB9GJy1GbhghAAKCUR99oCymMEVS4eUcEy67nt',
    '/dns4/ipfs.thedisco.zone/tcp/4430/wss/p2p/12D3KooWChhhfGdB9GJy1GbhghAAKCUR99oCymMEVS4eUcEy67nt'
\];

var lastAlive = 0;        // last keepalive we saw from a relay
var lastPeer = 0;         // last keepalive we saw from another peer
var lastBootstrap = 0; // used for tracking when we last attempted to bootstrap (likely to reconnect to a relay)

// if reconnect is true, it'll first attempt to disconnect from the bootstrap nodes
async function dobootstrap(reconnect) {
    now = new Date().getTime();
    if (now-lastBootstrap \< 60000) { // don't try to bootstrap again if we just tried within the last 60 seconds
        return;
    }

    lastBootstrap = now;

    for (i in bootstraps) {
        if (reconnect) {
            try {
                await ipfs.swarm.disconnect(bootstraps\[i\]);
            } catch (e) {
                console.log(e);
            }
        } else {
            await ipfs.bootstrap.add(bootstraps\[i\]);
        }
        await ipfs.swarm.connect(bootstraps\[i\]);
    }
}

// check if we're still connected to the circuit relay
function checkalive() {
    now = new Date().getTime();

    if (now-lastAlive \>= 35000) {
        if (now-lastPeer \>= 35000) {
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

:::warning
Use the above code with the full version of `processAnnounce`, as it relies on `lastAlive` and `lastPeer`, which aren't updated in the simplified version.
:::

## More resources

If you were successful in following this entire guide, you now have the ability to deploy powerful IPFS apps that run entirely in the browser and leverage decentralized p2p whenever you can. To learn more, check the resources below:

- [js-ipfs/docs/BROWSERS.md](https://github.com/ipfs/js-ipfs/blob/master/docs/BROWSERS.md)
- [js-ipfs/docs/CONFIG.md](https://github.com/ipfs/js-ipfs/blob/master/docs/CONFIG.md)
- [js-ipfs/docs/core-api](https://github.com/ipfs/js-ipfs/tree/master/docs/core-api)
- [js-ipfs/examples/circuit-relaying](https://github.com/ipfs-examples/js-ipfs-examples/tree/master/examples/circuit-relaying)
- [js-libp2p-webrtc-star](https://github.com/libp2p/js-libp2p-webrtc-star)

Thanks to [TheDiscordian](https://github.com/thediscordian) for originally creating this material as a post in [IPFS Blog & News](https://blog.ipfs.io/2021-06-10-guide-to-ipfs-connectivity-in-browsers).
