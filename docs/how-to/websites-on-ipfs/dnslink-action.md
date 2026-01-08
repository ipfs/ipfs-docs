---
title: Automate DNSLink updates with GitHub Actions
description: Guide on how to use the DNSLink Action to automatically update DNS records when deploying static sites to IPFS.
---

# Automate DNSLink updates with GitHub Actions

This guide explains how to automatically update [DNSLink](../../concepts/dnslink.md) records when you deploy your site to IPFS. By the end, your DNS will automatically point to the latest CID whenever you push to your repository.

DNSLink lets users access your IPFS-hosted content through a human-readable domain name like `docs.ipfs.tech` instead of a CID like `bafybeic...`. When combined with [ipshipyard/ipfs-deploy-action](./deploy-github-action.md), you get a complete CI/CD pipeline for IPFS websites.

## Prerequisites

Before you begin, make sure you have:

1. Your site deployed to IPFS with a CID (see [Deploy static apps to IPFS with GitHub Actions](./deploy-github-action.md))
2. A domain name with DNS managed by a [supported provider](#step-1-configure-dns-provider) (Cloudflare, DNSimple, or Gandi), or any provider via [generic DNS tools](#alternative-generic-dns-tools)
3. A GitHub repository with Actions enabled

## Security Considerations

::: warning API Token Security
DNS API tokens are sensitive credentials. A compromised token could allow attackers to modify your DNS records, potentially redirecting your domain to malicious content.

For open source projects that accept pull requests from forks, use the [two-workflow pattern](#two-workflow-pattern-for-open-source-projects) to ensure fork code never has access to your DNS credentials.
:::

## Step 1: Configure DNS Provider

The [dnslink-action](https://github.com/ipshipyard/dnslink-action) provides turn-key DNSLink updates with built-in safety features for the providers below. If your provider is not listed, see [Alternative: Generic DNS Tools](#alternative-generic-dns-tools).

### Option A: Cloudflare (recommended)

1. Log into the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your domain
2. Go to the **Overview** tab and scroll down to find your **Zone ID** ([detailed instructions](https://github.com/ipshipyard/dnslink-action#finding-your-zone-id))
3. Go to **My Profile** > **API Tokens** > **Create Token** ([detailed instructions](https://github.com/ipshipyard/dnslink-action#creating-an-api-token))
4. Create a custom token with these permissions:
   - Zone > DNS > Edit
   - Scope the token to your specific zone
5. Add both values as [GitHub secrets](https://docs.github.com/en/actions/security-for-github-actions/security-guides/using-secrets-in-github-actions):
   - `CF_ZONE_ID`: Your Zone ID
   - `CF_AUTH_TOKEN`: Your API token

For a visual walkthrough, see the [Cloudflare video tutorial](https://github.com/ipshipyard/dnslink-action#cloudflare-video-tutorial).

### Option B: DNSimple

1. Log into DNSimple and go to **Account** > **Access Tokens**
2. Create a new API token
3. Add it as a GitHub secret named `DNSIMPLE_TOKEN`

### Option C: Gandi

1. Log into [Gandi](https://www.gandi.net/) and go to **Account** > **Security** > **Personal Access Tokens**
2. Create a new token with DNS management permissions
3. Add it as a GitHub secret named `GANDI_TOKEN`

## Step 2: Add DNSLink Action to Your Workflow

Add [ipshipyard/dnslink-action](https://github.com/ipshipyard/dnslink-action) to your workflow after deploying to IPFS. The action takes the CID from [ipshipyard/ipfs-deploy-action](https://github.com/ipshipyard/ipfs-deploy-action) and updates your DNS record.

For complete workflow examples, see:

- [Simple workflow (no fork PRs)](https://github.com/ipshipyard/ipfs-deploy-action#simple-workflow-no-fork-prs) - single workflow for repositories that don't accept external contributions
- [Dual workflows (with fork PRs)](https://github.com/ipshipyard/ipfs-deploy-action#dual-workflows-with-fork-prs) - secure pattern for open source projects

For DNS provider-specific configuration, see the [ipshipyard/dnslink-action README](https://github.com/ipshipyard/dnslink-action#usage).

## Step 3: Verify the DNSLink Record

After the workflow runs, verify the DNSLink record:

```bash
dig +short TXT _dnslink.yourdomain.com
```

You should see output like:

```
"dnslink=/ipfs/bafybeic..."
```

## Alternative: Generic DNS Tools

If your DNS provider is not supported by dnslink-action, or you need more control over DNS updates, you can use generic DNS automation tools in a custom workflow step.

DNSLink is a TXT record on the `_dnslink` subdomain. To update it, set a TXT record on `_dnslink.yourdomain.com` with the value:

```
dnslink=/ipfs/<CID>
```

Where `<CID>` is the output from [ipshipyard/ipfs-deploy-action](https://github.com/ipshipyard/ipfs-deploy-action).

Tools that support many DNS providers:

- [OctoDNS](https://github.com/octodns/octodns) - supports [many providers](https://octodns.readthedocs.io/en/latest/#providers) including AWS Route53, Google Cloud DNS, Azure DNS, DigitalOcean, and NS1. Can run in CI to sync DNS records from config files.
- [Terraform DNS providers](https://registry.terraform.io/search/providers?q=dns) - useful if you already manage infrastructure with Terraform.
- Your provider's API directly via a custom script or GitHub Action step.

## Two-Workflow Pattern for Open Source Projects

For repositories that accept pull requests from forks, use a two-workflow pattern to keep secrets secure. This is critical because **pull requests from forks can contain malicious code that could exfiltrate your secrets**.

The solution is to separate building (which runs untrusted code) from deploying (which uses secrets):

1. **Build workflow**: Runs on PR events, builds the site, uploads artifact. No secrets.
2. **Deploy workflow**: Triggered by `workflow_run` event after build succeeds. Has access to secrets but only runs trusted action code, not fork code.

For complete workflow examples, see:

- [ipshipyard/ipfs-deploy-action: Dual workflows with fork PRs](https://github.com/ipshipyard/ipfs-deploy-action#dual-workflows-with-fork-prs)
- [ipshipyard/dnslink-action: Dual workflows for secure fork PRs](https://github.com/ipshipyard/dnslink-action#dual-workflows-for-secure-fork-prs)

## Security: Sandboxed DNS Zone

For additional security, use a sandboxed DNS zone to limit what the CI API token can modify. This way, if the token is compromised, attackers can only modify TXT records on a dedicated zone, not your main domain's DNS records (like A, MX, or NS records).

### How it works

Instead of giving CI direct access to your domain's DNS:

1. Create a dedicated zone for DNSLink records (e.g., `dnslinks.example.com`)
2. Create an API token scoped only to that zone
3. On your main domain, add a CNAME record pointing `_dnslink.yourdomain.com` to `_dnslink.yourdomain.dnslinks.example.com`
4. The action updates the TXT record on the sandboxed zone

For detailed setup instructions, see the [ipshipyard/dnslink-action security documentation](https://github.com/ipshipyard/dnslink-action#security-sandboxed-dnslink-domain).

## HTTP Hosting

DNSLink maps a domain name to a CID, so IPFS gateways can serve your content. You also need HTTP hosting for users who access your site directly via `https://yourdomain.com`.

You have two options:

1. **Self-hosted**: Run your own Kubo + Caddy setup that resolves DNSLink and serves content over HTTPS. See [Setup a DNSLink Gateway](./dnslink-gateway.md).

2. **Third-party hosting**: Deploy to [GitHub Pages](https://pages.github.com/), [Cloudflare Pages](https://pages.cloudflare.com/), or [Netlify](https://www.netlify.com/). These handle HTTP hosting independently, while DNSLink provides IPFS access for users with local nodes or gateways.

## Troubleshooting

1. **DNSLink not updating**
   - Verify your API token has DNS edit permissions
   - Check that `dnslink_domain` matches your DNS setup
   - Review the GitHub Actions logs for error messages

2. **DNS propagation delays**
   - DNS changes can take time to propagate
   - Use `dig` to check the authoritative nameserver directly

3. **CNAME not resolving**
   - Ensure the CNAME target includes the full domain name
   - Verify both zones are properly configured

## Getting Help

If you encounter issues:

1. Check the GitHub Actions run logs for detailed error messages
2. Review the [ipshipyard/dnslink-action README](https://github.com/ipshipyard/dnslink-action) for updates
3. Open an issue in the [action's repository](https://github.com/ipshipyard/dnslink-action/issues/new)
