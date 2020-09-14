---
title: IPFS companion
description: Learn what the IPFS Companion browser extension is, why it's useful, and how you can use it!
---

# IPFS companion

The IPFS companion allows you to interact with your IPFS node and the extended IPFS network through your browser! The add-on is available for Brave, Chrome, Edge, Firefox, and Opera! The add-on enables support for `ipfs://` addresses, automatically loads websites and file paths from an IPFS gateway, allows you to easily import and share a file with IPFS, and more!

The IPFS companion works in tandem with an IPFS node running on your local machine, so make sure you have a [node installed](./ipfs-desktop) before installing this add-on.

## Install

The easiest way to install the IPFS companion is through your browser's add-on store.

| <img src="https://unpkg.com/@browser-logos/firefox/firefox_16x16.png" width="16" height="16"> [Firefox](https://www.mozilla.org/firefox/new/) \| [Firefox for Android](https://play.google.com/store/apps/details?id=org.mozilla.firefox)   | <img src="https://unpkg.com/@browser-logos/chrome/chrome_16x16.png" width="16" height="16"> [Chrome](https://www.google.com/chrome/) \| <img src="https://unpkg.com/@browser-logos/brave/brave_16x16.png" width="16" height="16"> [Brave](https://brave.com/) \| <img src="https://unpkg.com/@browser-logos/opera/opera_16x16.png" width="16" height="16"> [Opera](https://www.opera.com/) \| <img src="https://unpkg.com/@browser-logos/edge/edge_16x16.png" width="16" height="16"> [Edge](https://www.microsoftedgeinsider.com/) |
| --- | --- |
| [![Install From AMO](https://ipfs.io/ipfs/QmWNa64XjA78QvK3zG2593bSMizkDXXcubDHjnRDYUivqt)<br>![](https://img.shields.io/amo/users/ipfs-companion?label=AMO%20users&style=social)](https://addons.mozilla.org/firefox/addon/ipfs-companion/) | [![Install from Chrome Store](https://ipfs.io/ipfs/QmU4Qm5YEKy5yHmdAgU2fD7PjZLgrYTUUbxTydqG2QK3TT)<br>![](https://img.shields.io/chrome-web-store/users/nibjojkomfdiaoajekhjakgkdhaomnch?label=Chrome%20Web%20Store%20users&style=social)](https://chrome.google.com/webstore/detail/ipfs-companion/nibjojkomfdiaoajekhjakgkdhaomnch)                                                                                                                                                                                               |

Make sure you have [IPFS installed](https://ipfs.io/#install) on your computer as well. Because IPFS Companion (in its standard configuration) talks to your computer's local IPFS node to work its browser magic, you'll need to have IPFS running on your computer, too.

### Beta and development channels

If you're looking for a more current or bleeding-edge version of the IPFS companion, check out how to use the beta or development channels in the [project's GitHub repository](https://github.com/ipfs-shipyard/ipfs-companion)!

## Features

There is a bunch of stuff that the IPFS companion enables you to do!

### Automatically detect and redirect IPFS resources

#### Detect URLs with IPFS paths

IPFS Companion detects and tests requests for IPFS-like paths ( such as `/ipfs/{cid}` or `/ipns/{peerid_or_host-with-dnslink}`) on any website. If a path is a [valid IPFS address](https://github.com/ipfs/is-ipfs), it is redirected to load from your local gateway. The gateway at `localhost` will also automatically switch to a subdomain to provide a unique origin for each website:

> `https://ipfs.io/ipfs/QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR`  
> → `http://localhost:8080/ipfs/QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR`
> → `http://bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi.ipfs.localhost:8080`

#### Detect DNSLink-enabled URLs

IPFS Companion [detects DNSLink info](http://docs.ipfs.io/how-to/dnslink-companion/) in the DNS records of websites. If a site uses DNSLink (a few examples are https://docs.ipfs.io, https://ipld.io, and http://tr.wikipedia-on-ipfs.org), IPFS Companion redirects the HTTP request to your local gateway:

> `http://docs.ipfs.io`  
> → `http://localhost:8080/ipns/docs.ipfs.io` → `http://docs.ipfs.io.ipns.localhost:8080/`

#### Detect pages with `x-ipfs-path` headers

IPFS Companion also upgrades transport to IPFS if it finds the `x-ipfs-path` in any HTTP response headers; this also acts as a fallback for cases when an IPFS path is not present in the URL. [Learn more.](http://docs.ipfs.io/how-to/companion-x-ipfs-path-header/)

#### Toggle redirects globally or per site

You can disable and re-enable local gateway redirects by several means:

- Suspend redirects **globally** in IPFS Companion's preferences
- Suspend redirects **per site** using the toggle under "Current tab" ([illustrated below](#toggle-gateway-redirects-on-a-per-website-basis)) or in IPFS Companion's preferences
- Add `x-ipfs-companion-no-redirect` to the URL itself as a hash ([example](https://ipfs.io/ipfs/QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR#x-ipfs-companion-no-redirect)) or query parameter ([example](https://ipfs.io/ipfs/QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR?x-ipfs-companion-no-redirect))

### Access frequently-used IPFS actions from your browser bar

IPFS Companion enables you to quickly and easily access common actions from your browser bar with just a few clicks:

- See how many peers you're connected with a glance at the cube icon in your browser bar
- Check your IPFS API and gateway status by clicking the cube icon to reveal the main menu
- Right-click images and other page assets to easily add them to IPFS (including the option to preserve file names)
- Choose the _Quick Import/Share..._ option in the main menu for quick drag-and-drop import from a browser tab
- Pin or unpin IPFS resources (via API) directly from the main menu
- Copy shareable public gateway links, IPFS content paths, or CIDs of IPFS resources directly from the main menu
- Launch the [IPFS Web UI dashboard](https://github.com/ipfs-shipyard/ipfs-webui) from the main menu with a single click
- Toggle gateway redirects or switch all IPFS Companion features on/off quickly and easily from the main menu (illustrations below)

#### Toggle gateway redirects on a per-website basis

You can toggle redirects (of any IPFS sub-resources) for an individual website under the _Current Tab_ section of the main menu. If that site uses DNSLink, toggling off will restore the site's original URL, too.

![Toggle per-site opt-out](https://gateway.ipfs.io/ipfs/QmbAWhTk8GjtFqpNQVCRXWyJbh9YFC61nTNcBPZi87e4qo)

#### Switch all IPFS Companion features on/off

To temporarily suspend all IPFS integrations (redirects, API status content scripts, protocol handlers, etc.), use the on/off button at the top of the IPFS Companion menu.

![Turn IPFS Companion off and on again](https://gateway.ipfs.io/ipfs/QmVWFueChvoxfRpPcB9C7TJFucr2TJx6tPT3udtYd58GSy)

### Try out experiments!

IPFS Companion ships with a variety of experimental features. Some are disabled by default, so be sure to check out IPFS Companion's Preferences to see them all.

- Make plaintext IPFS links clickable ([demo](https://ipfs.io/ipfs/bafybeidvtwx54qr44kidymvhfzefzxhgkieigwth6oswk75zhlzjdmunoy/linkify-demo.html))
- Re-route requests made via the following [experimental protocols](https://github.com/ipfs/ipfs-companion/issues/164) to an HTTP gateway (public or custom):

  - `ipfs://$cid`
  - `ipns://$cid_or_fqdn`
  - `dweb:/ipfs/$cid`
  - `dweb:/ipns/$cid_or_fqdn`

- Switch between the external HTTP API of your local IPFS node (default setting) and a js-ipfs node embedded in your browser (note that this has some [functionality limitations](https://docs.ipfs.io/how-to/companion-node-types/))
  [![screenshot of node type switch](https://gateway.ipfs.io/ipfs/QmZVAyxih3qt99qED3Xp8wzHxsV3XJ3vVa7HuW21AGapPP)](http://docs.ipfs.io/how-to/companion-node-types/)
