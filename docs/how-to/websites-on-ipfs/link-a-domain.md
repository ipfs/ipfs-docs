---
title: Link a domain
description: Allow users to access your IPFS hosted site by linking up a domain name.
---

# Link a domain

Users can view your website by entering the CID into their address bar, but much like IP addresses, CIDs aren't particularly user-friendly or nice to look at. To fix this, we can map a domain name to your CID, so when users visit `www.YourDomain.com` they'll be forwarded to your site hosted on IPFS. In this guide we'll show you how map a regular domain name, along with a decentralized domain through the Ethereum naming service.

This section is completely optional, but following it through will give you solid grasp on how to manage domain names with IPFS.

## Domain name service (DNS)

Computers, smartphones, and anything with an internet connection all have no idea what website addresses actually say. They're just looking for an IP address to download content from. But most humans get scared when they're faced with a bunch of numbers. Enter DNS. Domain name services map easy-to-read website addresses to IP addresses so humans can go to `RandomPlanetFacts.xyz` and computers can download random planet facts.

In this section we're going to walk through mapping a domain name to a CID on IPFS. We're using Namecheap in this guide, but you can use any domain name registrar. All the steps are the same, but the links and settings will be in different places. We're not covering actually buying a domain name in this section; if you're looking for information on how to buy a domain name check the FAQs of your chosen domain name registrar.

### Things you'll need

Before we get started, you will need:

- A domain name, preferably not already registed to a website.
- A website hosted on IPFS. If you've been following this tutorial series through, you should already have a website and CID ready.

1. Access your registrar's control panel to manage the `CNAME` record and `TXT` records for your domain.
1. Add a `CNAME` record and set the value to `www.gateway.ipfs.io.`
1. Add a `TXT` record and set the value to `dnslink=/ipfs/SITE_CID` replacing `SITE_CID` with the CID of your website.
1. Save your changes. Traditional domain names can take some time to propagate through the internet, so it may take a few hours for your domain to point to your IPFS-hosted site.

And there we have it! You've just linked a domain name up to your site hosted on IPFS. Why not try doing the same thing with the [Ethereum naming service](#ethereum-naming-service) too?

## Ethereum naming service (ENS)

The Ethereum naming service (ENS) is a decentralized way to address resources. Similar to DNS, which converts human readable names to IP addresses, ENS converts human readable names such as `randomplanetfacts.eth.link` to Ethereum addresses. These addresses can then be used to point to CIDs on IPFS. Without going into to much detail, ENS aims to fix some of the problems that DNS has, mainly man-in-the-middle attacks and scalability. For more information on why DNS is broken, [check out Cynthia Taylor's post on recompilermag.com](https://recompilermag.com/issues/issue-1/the-web-is-broken-how-dns-breaks-almost-every-design-principle-of-the-internet/).

### Before we get started

You need these things to get a domain name through ENS:

- The [Metamask](https://metamask.io/) browser extension installed.
- An Ethereum account with some `ETH` in it. The amount you need will depend on the domain name you end up buying, but a balance of around \$10 USD is probably enough.
- A website hosted on IPFS. If you've been following this tutorial series through, you should already have a website and CID ready.
- An cool idea for a domain name!

### Purchase an Ethereum domain name

1. Go to [app.ens.domains](https://app.ens.domains/).
2. Log into MetaMask:

   ![Metamask pop-up showing a login screen.](./images/link-a-domain/ens-metamask-log-into-key.png)

3. Search for the domain you want to use:

   ![Searching for a domain in ENS.](./images/link-a-domain/ens-search-for-domain-name.png)

4. Click on the domain if it's available.
5. Click **Request To Register**:

   ![Registration screen within ENS.](./images/link-a-domain/ens-request-to-register.png)

6. In the MetaMask window that pops up, click **Confirm**. This action will cost you `ETH`.
7. Wait for the _Request to register_ transaction to complete. This process can take a couple of minutes:

   ![Registration screen within ENS.](./images/link-a-domain/ens-registration-transaction-pending.png)

8. Once the transaction has completed, ENS requires that you wait for around a minute. This delay is to make sure there is no-one else attempting to purchase the same domain at the same time as you:

   ![Waiting for registration confirmation screen in ENS.](./images/link-a-domain/ens-wait-a-minute.png)

9. Click **Register**. Then click **Confirm** in the MetaMask window that pops up:

   ![2nd transaction confirmation within MetaMask.](./images/link-a-domain/ens-metamask-complete-registration-transaction.png)

10. Wait for the transaction to be confirmed. This process can take a couple of minutes:

    ![Waiting for the 2nd transaction to be verified.](./images/link-a-domain/ens-complete-registration.png)

    You should now be able to see all the settings for your `.eth` domain:

    ![All the domain settings within ENS](./images/link-a-domain/ens-domain-settings-page.png)

### Link your IPFS content identifier (CID)

11. Click the plus `+` icon next to **Records**:

    ![The "add new records" icon in ENS.](./images/link-a-domain/ens-add-records-icon.png)

12. Select **Content** from the dropdown:

    ![Records dropdown menu in ENS.](./images/link-a-domain/ens-add-content-record.png)

13. Set the **Content** text box as the CID of your website, prefixed with `ipfs://`:

    ![Setting the content record as an IPFS CID.](./images/link-a-domain/ens-set-content-record-as-ipfs-cid.png)

14. Confirm this change by clicking **Confirm** in the MetaMask pop-up:

    ![MetaMask confirmation pop-up for changing a content record.](./images/link-a-domain/ens-metamask-content-record-transaction.png)

    This transaction can take a couple of minutes to complete.

In a few minutes, you'll be able to go to `Your_Domain.eth/` and view your website (note the tailing slash). Because `.eth` is not a registered DNS top-level domain, it is normally inaccessible through regular browsers.

[Eth.link](https://eth.link/) provides a way for any browser to access your website. Simply append `.link` to your domain `Your_Domain.eth.link`. There are no additional steps for this. Simply give it time to propagate.

## Up next

In the next tutorial in this series, we'll take a look at a tool that will help make this whole process easier: [Fleek](../introducing-fleek)
