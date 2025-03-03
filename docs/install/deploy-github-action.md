---
title: Deploying Static Web Applications to IPFS
description: Guide on how to setup GitHub Actions to deploy static web applications to IPFS using the IPFS Deploy Action.
---

# Deploying Static Web Applications to IPFS with GitHub Actions

This guide will walk you through the process of configureing a GitHub Actions workflow to deploy a repository containing a static web application to IPFS using the [IPFS Deploy Action](https://github.com/ipfs/ipfs-deploy-action).

By the end of this guide, your app will be deployed to IPFS automatically when you push to your repository. It will also deploy pull request previews for each commit, and provide some other developer experience features, like commit status updates with the CID of the build, and a comment on pull requests with the IPFS CID and preview links.

Once deployed, each deployment of your app will be addressed by a CID and accessible via [recursive gateways](https://docs.ipfs.tech/concepts/ipfs-gateway/#recursive-vs-non-recursive-gateways), as well as the [Service Worker Gateway](https://inbrowser.link).

To see what this looks like in a real-world example, check out the [IPNS Inspector](https://github.com/ipfs-shipyard/ipfs-deploy-action-demo).

## What is the IPFS Deploy Action?

The IPFS Deploy Action is a [composite action](https://docs.github.com/en/actions/creating-actions/creating-a-composite-action), that can be called as a step in a GitHub Actions workflow, and combines the following features:

- 📦 Merkleizes your static site into a CAR file
- 🚀 Uploads CAR file to either Storacha, IPFS Cluster, or Kubo
- 📍 Optional pinning to Pinata
- 💾 Optional CAR file upload to Filebase
- 💬 PR Previews, with a comment containing the CID and preview links
- ✅ Commit Status updates

The IPFS Deploy Action works with both self-hosted IPFS nodes (Kubo or IPFS Cluster) and pinning services (Storacha, Pinata, Filebase) and was built based on the best practices in 2025.

The IPFS Deploy Action makes no assumptions about your build process. Whether you're using React, Vuepress, Astro, Next.js, or any other static site generator, this guide will help you get your web application deployed on IPFS. The only requirement is that your web application is static, meaning that once built, it is a folder containing HTML, CSS, and JavaScript files that are served as-is to the client.

## Custom domains and DNSLink

**TODO: This whole section should probably move to a separate guide that can be linked to from here**

By default, each deployment will be addressed with a CID. Since CIDs are long and hard to remember, they're not very user friendly, for example, `https://bafybeifhgtpm6kmbyqszbardceszvkv5rsi3dodtuufpcfskzggekcfl2y.ipfs.inbrowser.link/`.

To make your deployments easier to access, you can optionally configure a custom domain for your app, depending on how you want users to access your app.

### CID Signaling with DNSLink

DNSLink is a standard way to map human-readable domain names (DNS) to CIDs. For example, for the IPFS Docs, `docs.ipfs.tech`, the DNSLink record is a TXT record at `_dnslink.docs.ipfs.tech` with the value `dnslink=/ipfs/bafybeicv5tbyeahgm4pyskd2nverwsqxpiqloikqrufvof7vausglw6avm` (the CID will likely be different once you read this guide).

The main benefit of DNSLink is that it allows users to determine the latest CID for a given domain name, while leaving it up to the user how to retrieve the deployment addressed by the CID. For example, a user might have a local IPFS node, and want to access the latest deployment of your app, they can do so by resolving the DNSLink record and fetching the content from their local node. `http://localhost:8080/ipns/docs.ipfs.tech` will serve the CID found in the DNSLink record.

When a DNSLink record is present, any IPFS gateway (local or public) can take the DNS name and resolve it to the CID, and serve the content, for example, both `http://inbrowser.link/ipns/docs.ipfs.tech` and `http://ipfs.io/ipns/docs.ipfs.tech` will serve the same site, albeit with different origins.

When loading the site this way, you benefit from the resilience and censorship resistance of the IPFS network, because it's content addressed (addressed by CID) rather than being tied to a canonical origin. As long as there's at least one reachable provider for the CID, you can access the site.

The disadvantage is that loading the site this way is that the [origin](https://developer.mozilla.org/en-US/docs/Glossary/Origin) can vary depending on where the user is accessing the site from, which can impact how your app functions, like CORS access to external APIs.

## Access via custom domain

In the previous section, we discussed how DNSLink can be used to signal the CID for a domain name, while leaving it up to the user how to retrieve the content, be it a local node, service worker gateway or any other [public recursive gateway](https://docs.ipfs.tech/concepts/ipfs-gateway/#recursive-vs-non-recursive-gateways). In this instance, the user provides the domain name as input, instead of the CID.

To provide access to the app directly via the custom domain, you have the following options:

1. Deploy an IPFS Gateway that supports DNSLink, e.g. [Rainbow](https://github.com/ipfs/rainbow/) and point the CNAME/A record for your custom domain to it. You will likely want to also configure TLS with a reverse proxy like Caddy.
2. Use a service like Fleek
3. Deploy the site to a web hosting service like Cloudflare/GitHub Pages, and point the CNAME/A record for your custom domain to it, essentially getting the benefits of both IPFS and traditional web hosting.

Access via a custom domain is useful if you want to serve your app via a domain name that you own, for example, `app.example.com`.

## Prerequisites

Before you begin, make sure you have:

1. A GitHub repository with your static web application
2. GitHub Actions enabled on your repository
3. A Storacha account or running your own IPFS Node (Kubo or IPFS Cluster)

## Step 1: Setting Up Storacha (Easiest way to get started)

1. Install the w3cli tool:

   ```bash
   npm install -g @storacha/w3cli
   ```

2. Login to your Storacha account:

   ```bash
   w3 login
   ```

3. Create a new space for your deployments:

   ```bash
   w3 space create my-app-space
   ```

4. Create a signing key:

   ```bash
   $ w3 key create --json
   {
     "did": "did:key:YOUR_KEY_DID",
     "key": "STORACHA_KEY"
   }
   ```

   Save the key value as a GitHub secret named `STORACHA_KEY`

5. Create a UCAN proof:
   ```bash
   w3 delegation create did:key:YOUR_KEY_DID -c space/blob/add -c space/index/add -c filecoin/offer -c upload/add --base64
   ```
   Save the output as a GitHub secret named `STORACHA_PROOF`

## Step 2: Configure Your Workflow

Create a new file `.github/workflows/deploy.yml` in your repository:

```yaml
name: Deploy to IPFS

permissions:
  contents: read
  pull-requests: write
  statuses: write

on:
  push:
    branches:
      - main
  pull_request:

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build project
        run: npm run build

      - name: Deploy to IPFS
        uses: ipfs/ipfs-deploy-action@v1
        id: deploy
        with:
          path-to-deploy: dist # Change this to your build output directory
          storacha-key: ${{ secrets.STORACHA_KEY }}
          storacha-proof: ${{ secrets.STORACHA_PROOF }}
          github-token: ${{ github.token }}
```

## Step 3: Customize Build Output Directory

Modify the `path-to-deploy` input based on your build tool:

- React (Create React App): `build`
- Next.js: `out` (when using `next export`) or `.next` (for server-side rendering)
- Vue.js: `dist`
- Vite: `dist`
- Gatsby: `public`

## Step 4: Optional Configurations

### Adding Pinata Backup

To add redundancy with Pinata pinning:

1. Get your Pinata JWT token from the Pinata dashboard
2. Add it as a GitHub secret named `PINATA_JWT`
3. Add these lines to your workflow:

```yaml
- name: Deploy to IPFS
  uses: ipfs/ipfs-deploy-action@v1
  with:
    # ... other inputs ...
    pinata-jwt-token: ${{ secrets.PINATA_JWT }}
```

### Adding Filebase Storage

To store CAR files on Filebase:

1. Create a Filebase account and bucket
2. Get your access and secret keys
3. Add them as GitHub secrets
4. Add these lines to your workflow:

```yaml
- name: Deploy to IPFS
  uses: ipfs/ipfs-deploy-action@v1
  with:
    # ... other inputs ...
    filebase-bucket: 'your-bucket-name'
    filebase-access-key: ${{ secrets.FILEBASE_ACCESS_KEY }}
    filebase-secret-key: ${{ secrets.FILEBASE_SECRET_KEY }}
```

### Customizing IPFS Cluster Upload Settings

When using IPFS Cluster, you can customize both the number of retry attempts and the timeout duration for uploads:

```yaml
- name: Deploy to IPFS
  uses: ipfs/ipfs-deploy-action@v1
  with:
    # ... other inputs ...
    cluster-retry-attempts: '10' # Default is 5
    cluster-timeout-minutes: '5' # Default is 2
```

These settings are particularly useful when:

- Dealing with larger files that need more time to upload
- Working with slower or less reliable network connections
- Need to adjust the balance between retry attempts and timeout duration

## Accessing Your Deployed Site

After successful deployment, you can find your site:

1. In the GitHub Actions run output, which will contain the IPFS CID
2. In the PR comments (if deploying from a PR)
3. In the commit status checks

Your site will be accessible through:

- Storacha Gateway: `https://<CID>.ipfs.storacha.network`
- IPFS.io Gateway: `https://ipfs.io/ipfs/<CID>`
- Cloudflare Gateway: `https://cloudflare-ipfs.com/ipfs/<CID>`

## Troubleshooting

1. **Build Output Directory Not Found**

   - Double-check the `path-to-deploy` matches your build output directory
   - Ensure your build command is completing successfully

2. **Authentication Issues**

   - Verify your Storacha key and proof are correctly set in GitHub secrets
   - Check that the secrets are properly referenced in the workflow file

3. **Workflow Permission Issues**
   - Ensure the `permissions` block is included in your workflow
   - Check that your GitHub token has the necessary permissions

## Best Practices

1. Always use a specific version of the action (e.g., `@v1`)
2. Set up proper caching for your dependencies to speed up builds
3. Consider using multiple IPFS providers for redundancy
4. Use environment-specific configurations when needed

## Getting Help

If you encounter any issues:

1. Check the GitHub Actions run logs for detailed error messages
2. Review the [action's README](https://github.com/ipfs/ipfs-deploy-action) for updates
3. Open an issue in the action's repository with detailed information about your setup and the problem you're experiencing
