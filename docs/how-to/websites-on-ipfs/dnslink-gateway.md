---
title: Serve static sites and apps with a DNSLink Gateway
description: Learn how to set up a DNSLink Gateway with Kubo and Caddy to serve IPFS content via your own domain including TLS (HTTPS).
---

# Serve static sites and apps with a DNSLink Gateway

This guide explains how to host a static site or app on IPFS using a DNSLink Gateway.

For this, you will use a dedicated DNSLink IPFS gateway using Kubo and Caddy to serve content via a standard domain name like `thelocalgardener.com` and resolving DNSLink.

This allows users to access IPFS content through a known domain name without needing special browser extensions or users needing to know the specific Content Identifier (CID). The gateway automatically resolves the DNSLink TXT record associated with the domain, and fetches and serves the content of the CID.

This guide assumes the CID of the site or app is already pinned to IPFS. If not, check out the [Deploy Static Apps to IPFS with GitHub Actions](./deploy-github-action.md) guide.

## Goal

By the end of this guide, you will have:

- Your domain, e.g. `https://thelocalgardener.com`, serving the site or app specified in its DNSLink TXT record.
- A running Kubo IPFS node configured as a DNSLink gateway for `thelocalgardener.com`.
- A Caddy web server acting as a reverse proxy, handling TLS termination so that the site is served over HTTPS.

## Prerequisites

Before you start, ensure you have the following:

- A server with a static public IP address (e.g., `YOUR_SERVER_IP`).
- Port 443 open on your server's firewall to allow HTTPS traffic.
- A domain name (e.g., `thelocalgardener.com`).
- DNS configured for your domain:
  - An **`A` record** pointing `thelocalgardener.com` to your server's public IP address (`YOUR_SERVER_IP`).
  - _(We will configure the required DNSLink `TXT` record later in the guide)._
- Kubo installed and initialized on your server.
- Caddy installed on your server.

## Step 1: Configure Kubo

### Adjust Kubo Gateway Configuration

First, you need to adjust the Kubo gateway configuration. These settings tell Kubo to act as a specific gateway for your domain and disable certain default behaviors, like fetching arbitrary CIDs.

With this configuration, Kubo will match the domain in the [`host` header]() of requests that are proxied from Caddy, and if it matches the domain configured in this step, it will resolve the DNSLink TXT record and serve the content of the CID.

#### Commands to Run

1.  **Disable fetching content for arbitrary CIDs**:
    This prevents your gateway from being used as a general-purpose public gateway.

    ```bash
    ipfs config --json Gateway.NoFetch true
    ```

1.  **Disable DNSLink resolution globally (default)**:
    You'll enable it only for your specific domain in the next step.

    ```bash
    ipfs config --json Gateway.NoDNSLink true
    ```

1.  **Enable DNSLink for `thelocalgardener.com`**:
    This explicitly allows DNSLink resolution _only_ for requests hitting this hostname.

    ```bash
    ipfs config --json Gateway.PublicGateways '{
        "thelocalgardener.com": {
          "NoDNSLink": false,
          "Paths": []
        }
      }'
    ```

1.  **Restart the Kubo daemon** for the changes to take effect:
    ```bash
    systemctl restart ipfs
    ```

These commands modify the `config` file in your IPFS repository (usually `~/.ipfs/config`). The `Gateway.PublicGateways` setting defines specific configurations for different hostnames. Here, you override the global `NoDNSLink` setting specifically for `thelocalgardener.com`.

## Step 2: Configure Caddy

### Set Up Caddy as a Reverse Proxy

Next, configure Caddy to handle incoming HTTPS requests for `thelocalgardener.com` and proxy them to the Kubo gateway, which is listening by default on `127.0.0.1:8080`.

To check this, you can run the following command:

```bash
cat /data/kubo/config | jq .Addresses.Gateway
```

You should see something like this:

```json
"/ip4/127.0.0.1/tcp/8080"
```

This means that the Kubo gateway is listening on `127.0.0.1:8080`.

#### Caddyfile Configuration

Create or edit your `Caddyfile` (usually located at `/etc/caddy/Caddyfile` or in your current directory if running Caddy manually) with the following content:

```caddy
thelocalgardener.com {
  # Caddy automatically handles HTTPS provisioning for your domain

  # Proxy all requests to the local Kubo gateway
  reverse_proxy localhost:8080

  # Optional: Configure logging
  log {
    output stdout
    format json
    level INFO
  }
}
```

**Explanation:**

- `thelocalgardener.com { ... }`: Defines a site block for your domain. Caddy will automatically obtain and renew a TLS certificate for it, provided the `A` record DNS is set correctly.
- `reverse_proxy localhost:8080`: Forwards all incoming requests for `thelocalgardener.com` to the Kubo daemon listening on port 8080.
- `log { ... }`: Configures access logging (optional but recommended).

**Start or reload Caddy** for the configuration to apply:

```bash
# If using systemd:
sudo systemctl reload caddy

# Or, if running Caddy manually in the directory with the Caddyfile:
caddy run
```

## Step 3: Set up DNSLink TXT Record

### Configure DNSLink DNS Record

Now, you will create the DNSLink `TXT` record for your domain to point to CID of the site or app you want to serve, which is necessary in addition to the `A` record pointing to your server's IP address.

When requests are made to `thelocalgardener.com`, the DNSLink gateway will automatically resolve the DNSLink TXT record, retrieve the data from providers (unless the data is already pinned to your IPFS node) and serve the content of the CID.

#### Steps to Create a TXT Record

1.  **Get the CID** of the content you want to serve.

2.  **Go to your DNS provider's dashboard** for `thelocalgardener.com`.

3.  **Create a `TXT` record**:

    - **Name/Host**: `_dnslink.thelocalgardener` (or `_dnslink.thelocalgardener.com` depending on your provider's interface)
    - **Type**: `TXT`
    - **Value/Content**: `dnslink=/ipfs/bafybeiay2koog2jnndn5gr2raytxh7evobry5lo2w4s7nhugc7xipy6aze` (Replace the example CID with your actual CID)

    **Note:** The record name _must_ start with `_dnslink.`. DNS propagation might take some time.. You can check if it has propagated using tools like `dig` or `nslookup`:

    ```bash
    dig +short TXT _dnslink.thelocalgardener.com
    # Expected Output: "dnslink=/ipfs/bafybeiay2koog2jnndn5gr2raytxh7evobry5lo2w4s7nhugc7xipy6aze"

    # Also verify your A record:
    dig +short A thelocalgardener.com
    # Expected Output: YOUR_SERVER_IP
    ```

> **Note:** The DNSLink record will need to be updated everytime you update the site or app, leading to a new CID for the build. In order to automate this, you can use the [DNSLink GitHub Action](https://github.com/ipshipyard/dnslink-action), as part of your CI/CD pipeline.

## Step 4: Verify

### Ensure Everything is Working

Once both DNS records (`A` and `TXT`) have propagated and both Kubo and Caddy are running with the correct configurations:

1.  Open your web browser and navigate to that domain, e.g. `https://thelocalgardener.com`.
2.  You should see the content associated with your CID served securely over HTTPS via your Caddy server, which fetched it from your Kubo node using the DNSLink record.

Your gateway will now automatically serve the content specified in the `_dnslink.thelocalgardener.com` TXT record. To update the site, simply pin the new version to IPFS, get the new CID, and update the `TXT` record's value with the new CID path (`dnslink=/ipfs/NEW_CID_HERE`).

## Troubleshooting

### Common Issues and Solutions

- **DNS Propagation Delays**: If your domain isn't resolving, check the DNS settings and ensure the records have propagated. Use `dig` or `nslookup` to verify.
- **Caddy Configuration Errors**: Ensure your `Caddyfile` syntax is correct. Check Caddy logs for any errors.
- **IPFS Node Issues**: Make sure your IPFS node is running and accessible. Restart the daemon if necessary.

## Summary

You've successfully set up a DNSLink Gateway using Kubo and Caddy to serve IPFS content via your domain. Keep your software updated and monitor your server for any issues. For further customization, refer to the [Kubo config documentation](https://github.com/ipfs/kubo/blob/master/docs/config.md) and [Caddy documentation](https://caddyserver.com/docs).

## Feedback

We'd love to hear your thoughts on this guide. If you have suggestions or encounter issues, please let us know to help improve future versions.
