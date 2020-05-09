---
title: Host a single-page site
legacyUrl: https://docs.ipfs.io/guides/examples/websites/
description: Learn how to host a simple single-page website on the decentralized web using IPFS.
---

# Host a single-page website

A great way to get to know IPFS is to use it to host a simple, single-page website. Here's a step-by-step guide to doing just that.

::: tip
You may also wish to look through these contributor-written guides to hosting your site on IPFS:

- [Make an Immortal Website using Ethereum Name Service and IPFS](https://medium.com/@kirpy/make-an-immortal-website-using-ethereum-name-service-and-ipfs-simple-939e66c893df) by [Richard Potter](https://medium.com/@kirpy). This tutorial uses the IPFS Desktop application and is more suitable for readers who aren't comfortable with the command-line.
- [Complete Beginner's Guide to Deploying Your First Static Website to IPFS](https://interplanetarygatsby.com/ipfs-deploy/) by [@agentofuser](https://twitter.com/agentofuser). This tutorial uses the command-line and the author's [GitHub repo](https://github.com/agentofuser/ipfs-deploy).
  :::

## Create your site

In this example, create a directory called `mysite`.

Then create an `index.html` file. We'll create a Random Planet Facts website:

```html
<!DOCTYPE html>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Random Planet Facts</title>
    <meta
      name="description"
      content="A Get a random fact about a planet in our solar system."
    />
    <meta name="author" content="The IPFS Docs team." />
    <style>
      body {
        margin: 15px auto;
        max-width: 650px;
        line-height: 1.2;
        font-family: sans-serif;
        font-size: 2em;
        color: #fff;
        background: #444;
      }
    </style>
  </head>
  <body onload="main()">
    <h1>Random Planet Facts</h1>
    <p id="output_p"></p>
    <script>
      function main() {
        const facts = [
          'Mars is home to the tallest mountain in our solar system.',
          'Only 18 out of 40 missions to Mars have been successful.',
          'Pieces of Mars have fallen to Earth.',
          'One year on Mars is 687 Earth days.',
          'The temperature on Mars ranges from -153 to 20 °C.',
          'One year on Mercury is about 88 Earth days.',
          'The surface temperature of Mercury ranges from -173 to 427°C.',
          'Mercury was first discovered in 14th century by Assyrian astronomers.',
          'Your weight on Mercury would be 38% of your weight on Earth.',
          'A day on the surface of Mercury lasts 176 Earth days.',
          'The surface temperature of Venus is about 462 °C.',
          'It takes Venus 225 days to orbit the sun.',
          'Venus was first discovered by 17th century Babylonian astronomers.',
          'Venus is nearly as big as the Earth with a diameter of 12,104 km.',
          'The Earth’s rotation is gradually slowing.',
          'There is only one natural satellite of the planet Earth, the moon.',
          'Earth is the only planet in our solar system not named after a god.',
          'The Earth is the densest planet in the solar system.',
          'A year on Jupiter lasts around 4333 earth days.',
          'The surface temperature of Jupiter is around -108°C.',
          'Jupiter was first discovered by 7th or 8th century Babylonian astronomers.',
          'Jupiter has 4 ring.',
          'A day on Jupiter lasts 9 hours and 55 minutes.',
          'Saturn was first discovered by 8th century Assyrians.',
          'Saturn takes 10756 days to orbit the Sun.',
          'Saturn can be seen with the naked eye.',
          'Saturn is the flattest planet.',
          'Saturn is made mostly of hydrogen.',
          'Four spacecraft have visited Saturn.',
          'Uranus was discovered by William Herschel in 1781.',
          'A year on Uranus takes 30687 earth days.',
          'Uranus turns on its axis once every 17 hours, 14 minutes.',
          'With minimum atmospheric temperature of -224°C Uranus is nearly coldest planet in the solar system.',
          'Only one spacecraft has flown by Uranus, the Voyager 2.',
          'Neptune was discovered in 1846 by Urbain Le Verrier and Johann Galle.',
          'Neptune has 14 moons.',
          'The average temperatue of Neptune is about -201 °C.',
          'There is a 1:20 million scale model of the solar system in Sweden.',
          'The gap between the Earth and our moon is bigger than the diameters of all the planets combined.',
          'The first accurate calculation of the speed of light was using Jupiter’s moons',
          'Jupiter’s magnetic field is believed to be a result of rapidly spinning metallic hydrogen at the core, and is ~10x stronger than the Earth’s.',
          'Venus spins backwards.',
          'Uranus spins sideways, relative to the ecliptic plane of the solar system.',
          'It is easier to reach Pluto or escape the solar system from Earth than being able to <i>land</i> on the Sun.'
        ]
        document.querySelector('#output_p').innerHTML =
          facts[Math.floor(Math.random() * facts.length)]
      }
    </script>
  </body>
</html>
```

Example:
[https://gateway.ipfs.io/ipfs/QmW7S5HRLkP4XtPNyT1vQSjP3eRdtZaVtF6FAPvUfduMjA](https://gateway.ipfs.io/ipfs/QmW7S5HRLkP4XtPNyT1vQSjP3eRdtZaVtF6FAPvUfduMjA)

## Publish your site

There are a few ways to publish your site. Through the [CLI](/install/#integrate-ipfs-into-your-app), [IPFS Desktop](/install/#install-ipfs-desktop), [Browser](/install/#give-your-web-browsing-decentralized-superpowers), or a pinning service

### IPFS Browser (Companion)

Make sure your IPFS daemon is running:

```bash
$ ipfs daemon
```

Open Web UI

![](https://gateway.ipfs.io/ipfs/QmTUtMnuranzPT1CxykWLALwTmrgTm75s74o9K58jv1byi)

Drag and drop your files in and share.

![](https://gateway.ipfs.io/ipfs/QmZJjekGBiHS8rar7vVZUjkshVnkG7LBzXUsja9YaKHpT9)

IPFS nodes treat the data they store like a cache, meaning that there is no guarantee that the data will continue to be stored. _Pinning_ a file tells an IPFS server that the data is essential and shouldn't be thrown away.

You should _pin_ any content you consider important to ensure that content is retained over the long term. Since data relevant to someone else may not be important to you, pinning enables you to have control over the disk space and data retention you need.

![](https://gateway.ipfs.io/ipfs/QmXzfNwCG5SzYw18eGh7zB5mZSXtFiKvhqv9xTJ9hD4SV9)

### Pinning Service

To ensure that your important data is retained, you may want to use a pinning service. [Pinata](https://pinata.cloud/) is one such service that offers pinning for free!

1. Go to [Pinata.cloud](https://pinata.cloud/) and sign up or log in.
2. Click [**Pinata Upload**](https://pinata.cloud/pinataupload).
3. Select **Upload File** or **Upload Directory** and click **Browse**.
4. Navigate to your file or directory and click **Open**.
5. Click **Upload**.
6. Once the file has finished uploading, click **Pin Explorer** to view any files you have pinned.
7. You should be able to see your file(s) pinned:

![](https://gateway.ipfs.io/ipfs/QmVVxBezaBty7cwH2LuJSfUCtuUDMzMc4QeMkcFHEjjVbu)

### CLI

For more control, use the CLI.

Make sure your IPFS daemon is running:

```bash
$ ipfs daemon
```

Then in a new terminal, add the directory with your website:

```bash
$ ls mysite
index.html
$ ipfs add -r mysite/
added QmW7S5HRLkP4XtPNyT1vQSjP3eRdtZaVtF6FAPvUfduMjA mysite/index.html
added QmNdcRk1XA1Q5ijYqE3NnFwjDdGnKhe8xoaV9oDaUtqzwo mysite
```

The last hash, next to the folder name, `mysite/` is the one to remember, call it `$SITE_CID` for now.

You can test it out locally by opening `http://localhost:8080/ipfs/$SITE_CID` in a browser or with `wget` or `curl` from the command line.

To view it from another ipfs node, you can try `http://gateway.ipfs.io/ipfs/$SITE_CID` in a browser. This will work from a browser on another device, inside or outside the network where you added the site's file.

## Routing and Images

Routing and images can be hosted together or separately.

Using a relative path:

```html
<a href="./about.html"> About </a> <img src="./ipfs.gif" />
```

Using an absolute path:

```html
<a href="https://gateway.ipfs.io/ipfs/$ABOUT_CID/"> About </a>
<img src="https://gateway.ipfs.io/ipfs/$IMAGE_CID/" />
```

Both will look the same, but the difference is how files are retrieved. An absolute path locates files according to content (CID). A relative path locates files within the current directory. For relative paths to work, make sure to upload the whole directory: `$ ipfs add -r mysite/`. IPFS has the ability to handle both.

## Edit your DNS records

Those hashes are difficult to remember. Let's look at some ways to get rid of them.

Assume you have the domain name `your.domain` and can access your registrar's control panel to manage DNS entries for it.

Create a DNS TXT record ([DNSLink](/concepts/dnslink/)), with the key `your.domain.` and the value `dnslink=/ipfs/$SITE_CID` where `$SITE_CID` is the value from the section above.

![](https://gateway.ipfs.io/ipfs/QmPBASDEEdBapj7GdcZSjEFPokoQ28UQYHr55PgS4U3pGU)

Once you've created that record, and it has propagated you should be able to find it.

```bash
$ dig +noall +answer TXT your.domain
your.domain.            60      IN      TXT     "dnslink=/ipfs/$SITE_CID"
```

Now you can view your site at `http://localhost:8080/ipns/your.domain`.

You can also try this on the gateway at `http://gateway.ipfs.io/ipns/your.domain`.

More questions about DNSLink? Check out the [DNSLink website](http://dnslink.io/) for tutorials, examples, and FAQs.

## Use IPNS

Each time you change your website, you will have to republish it, update the DNS TXT record with the new value of `$SITE_CID` and wait for it to propagate.

You can get around that limitation by using IPNS, the [InterPlanetary Naming System](/concepts/ipns/).

You might have noticed `/ipns/` instead of `/ipfs/` in the updated links in the previous section.

The IPNS is used for mutable content in the IPFS network. It's relatively easy to use, and will allow you to change your website without updating the dns record every time.

To enable the IPNS for your content, run the following command, where `$SITE_CID` is the hash value from the first step.

```bash
$ ipfs name publish $SITE_CID
Published to $PEER_ID: /ipfs/$SITE_CID
```

You will need to note and save that value of `$PEER_ID` for the next steps.

Load the urls `http://localhost:8080/ipns/$PEER_ID` and `http://gateway.ipfs.io/ipns/$PEER_ID` to confirm this step.

Return to your registrar's control panel, change the DNS TXT record with the key of `your.domain` to `dnslink=/ipns/$PEER_ID`, wait for that record to propagate, and then try the urls `http://localhost:8080/ipns/your.domain` and `http://gateway.ipfs.io/ipns/your.domain`.

**Note:** When using IPNS to update websites, assets may be loaded from two different resolved hashes while the update propagates. This may result in outdated URLs or missing assets until the update has completely propagated.

## Point your domain to IPFS

You now have a website on ipfs/ipns, but your visitors can't access it at `http://your.domain`.

What we can do is have requests for `http://your.domain` resolved by an IPFS gateway daemon.

Return to your registrar's control panel and add an A record with key of `your.domain` and value of the IP address of an ipfs daemon that listens on port 80 for HTTP requests (such as `gateway.ipfs.io`). If you don't know the IP address of the daemon you plan to use, you can find it using the command like:

```bash
$ nslookup gateway.ipfs.io
```

1. Note the IP addresses returned.
2. Create an A record for each IPv4 address (e.g. `209.94.90.1` for ipfs.io).
3. Create an AAAA record for each IPv6 address (e.g. use `2602:fea2:2::1` for ipfs.io).

Note: The ipfs.io gateway IP addresses won't change, so you can set them and forget them. If you use a custom gateway where you don't control the IP address and they could change you may need to re-check them periodically and update your DNS records if they do.

Visitors' browsers will send `your.domain` in the Host header of their requests. The ipfs gateway will recognize `your.domain`, look up the value of the DNS TXT for your domain, then serve the files in `/ipns/your.domain/` instead of `/`.

If you point `your.domain`'s A and AAAA record to the IP addresses of `gateway.ipfs.io`, and then wait for the DNS to propagate, then anyone should be able to access your ipfs-hosted site without any extra configuration at `http://your.domain`.

## Use CNAMEs

Alternatively, it is possible to use CNAME records to point at the DNS records of the gateway. This way, IP addresses of the gateway are automatically updated.

However you will need to change the key for the TXT record from `your.domain` to `_dnslink.your.domain`.

So by creating a CNAME for `your.domain` to `gateway.ipfs.io` and adding a `_dnslink.your.domain` record with `dnslink=/ipns/<your peer id>` you can host your website without explicitly referring to IP addresses of the ipfs gateway.

![](https://gateway.ipfs.io/ipfs/QmPBASDEEdBapj7GdcZSjEFPokoQ28UQYHr55PgS4U3pGU)

## Use ENS

IPFS also supports [EthDNS](https://docs-beta.ipfs.io/recent-releases/go-ipfs-0-5/features/#ethdns-support-for-eth), a secure and decentralized way to address resources both on and off the blockchain using simple, human-readable domain names. You'll be able to create a domain name like [RandomPlanetFacts.eth/](https://RandomPlanetFacts.eth.link).

First, install an Ethereum wallet such as [metamask](https://metamask.io/) and fund it with some Ethereum.

Search for your name: [https://app.ens.domains/](https://app.ens.domains/)

![](https://gateway.ipfs.io/ipfs/QmSMjQcsSNHPTZbnAXi4gCWcUFh9FxW1dWx7LP9jkHDKTQ)

Select the available name

![](https://gateway.ipfs.io/ipfs/Qma4aHf64oWpGxds5eNtGc6DhPSbXf25RVj7qxHenbDxKS)

Request To Register and follow steps 1-3.

![](https://gateway.ipfs.io/ipfs/QmcgmK1jyMv61k39avoE5ZQWgYzfChNprqhWBdNMw4VSjJ)

Once it's registered, under `My Names`, create a `CONTENT` record with value `ipfs://$SITE_CID`.

![](https://gateway.ipfs.io/ipfs/QmeuG5rawPDY5tdRkLrP9dWYyg1RNkqFbc2MdvuCFbS1RZ)

Your website should be available: [RandomPlanetFacts.eth/](https://RandomPlanetFacts.eth/). (Note the tailing slash). Because `.eth` is not a registered DNS top-level domain, it is normally inaccessible through regular browsers.

[Eth.link](https://eth.link/) provides a way for any browser to access your website. Simply append `.link` to your domain: [RandomPlanetFacts.eth.link](https://RandomPlanetFacts.eth.link). There are no additional steps for this. Simply give it time to propagate.

## Developer Tools

Everything up until this point has been very manual. There are a growing number of developer tools that can speed up your workflow. Below are a few resources on how to quickly get up and running:

- [Fleek.co](https://fleek.co/): A quick way to deploy web projects using IPFS. Fleek is not an official Protocol Labs project and is managed by Netlify.
- [Fleek.co + HelloWorld.html](https://medium.com/@leondo/terminal-co-helloworld-html-19c17f4b3142): An introduction to the Fleek workflow.
- [Next.js Static HTML Export](https://nextjs.org/docs/advanced-features/static-html-export): Next.js allows you to export static HTML. This can be uploaded to IPFS.
- [Vue Plugin IPFS](https://github.com/cwaring/vuepress-plugin-ipfs): Handles IPFS [relative paths](/how-to/host-single-page-site/#routing-and-images) for hosting on IPFS.
