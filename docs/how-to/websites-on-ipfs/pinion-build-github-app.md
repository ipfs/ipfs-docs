---
title: Deploy to IPFS with the Pinion Build GitHub App
description: Guide on how to install and configure the Pinion Build GitHub App to automatically pin websites, releases, and build artifacts to IPFS.
---

# Deploy to IPFS with the Pinion Build GitHub App

[Pinion Build](https://pinion.build) offers a [GitHub App](https://github.com/settings/apps/pinion-build) that automatically pins your repository content — websites, release assets, and build artifacts — to IPFS. It is an alternative to the [IPFS Deploy Action](./deploy-github-action.md) and operates as an external service that reacts to GitHub events. No workflow file is required.

## When to use the GitHub App

The GitHub App may be a good fit if any of the following apply:

- **OAuth authentication**: The app authenticates via OAuth. No long-lived API tokens need to be created or stored as repository secrets, reducing the risk of credential exposure.
- **CI status checks**: The app posts a commit status check under the `pinion/ipfs` context, which appears as a green checkmark in the GitHub UI alongside your other checks.
- **CID visibility**: The pinned CID is shown directly in the commit status area of the GitHub interface, making it accessible to contributors without inspecting workflow logs.
- **Release and artifact pinning**: The app can pin GitHub release assets using glob pattern filters, in addition to website directories.

## Prerequisites

- A GitHub repository
- A [Pinion Build](https://pinion.build) account

## Step 1: Install the GitHub App

1. Sign in to your [Pinion Build dashboard](https://pinion.build).
2. Navigate to your profile page.
3. Click **Install the GitHub App** and follow the GitHub OAuth flow to grant Pinion Build access to the repositories you want to enable.

Alternatively, you can initiate the installation directly from [github.com/settings/apps/pinion-build](https://github.com/settings/apps/pinion-build).

During installation, you can choose to grant access to all repositories or only specific ones.

## Step 2: Add a configuration file

Add a `pinion.build.yaml` file to the root of your repository. This file tells the app what to pin.

```yaml
version: 1

# Pin subdirectories on push to a branch
subdirectories:
  enabled: true
  branch: "main"       # Branch to watch
  paths:
    - "dist/"          # Build output directory
    - "docs/"          # Documentation directory

# Pin release assets when a GitHub release is published
release_assets:
  enabled: true
  patterns:
    - "*.tar.gz"
    - "*.zip"
  include_source_code: true
```

Commit and push this file to your repository. The app will begin reacting to events immediately.

### Configuration reference

#### `subdirectories`

Pins one or more directories from your repository on every push to the configured branch.

| Field | Type | Description |
|---|---|---|
| `enabled` | bool | Enable or disable subdirectory pinning |
| `branch` | string | The branch to watch (default: `"main"`) |
| `paths` | list of strings | Repository paths to pin independently |

Each path is pinned as a separate IPFS object and gets its own CID. If your site is built in CI and committed to the repository (e.g. a `dist/` or `_site/` directory), this is how you pin it automatically on every push.

#### `release_assets`

Pins assets attached to GitHub releases.

| Field | Type | Description |
|---|---|---|
| `enabled` | bool | Enable or disable release asset pinning |
| `patterns` | list of glob strings | Only pin assets whose filenames match these patterns |
| `include_source_code` | bool | Whether to include the auto-generated source code archives (`Source code (zip)`, `Source code (tar.gz)`) that GitHub attaches to every release |

## Step 3: Verify the integration

After pushing your `pinion.build.yaml` file:

1. Open your repository on GitHub and navigate to a recent commit.
2. Click the status check indicator (the circle next to the commit hash) to expand the checks panel.
3. Look for the `pinion/ipfs` check. Once content is pinned, the check will show a green checkmark and the resulting CID.

You can also view webhook delivery logs from the GitHub Events page in your Pinion Build dashboard to diagnose any issues.

## Accessing your pinned content

Once a pin is complete, you can access the content through any IPFS gateway using the CID shown in the commit status check:

- **Public Good Gateway**: `https://<CID>.ipfs.dweb.link`
- **Service Worker Gateway**: `https://<CID>.ipfs.inbrowser.link`

## Next steps

- **Add a custom domain**: Use [DNSLink](./dnslink-action.md) to point a human-readable domain name at your latest pinned CID.
- **Set up a DNSLink gateway**: Serve your site over HTTPS from your own domain with a [DNSLink gateway](./dnslink-gateway.md).
