---
title: HTTP APIs for IPFS
legacyUrl: https://docs.ipfs.io/reference/api/http/
description: HTTP APIs provided by IPFS implementations.
---

# HTTP APIs

<!-- this page is provided for backward-compatibility, ensuring existing hotlinks to our docs remain functional -->

<script>
// migrate users linking to specific RPC command to the new location
if (window.location.hash.startsWith('#api-v0')) {
  window.location.replace(window.location.href.replace('/reference/http/api','/reference/kubo/rpc'))
}
// otherwise, user can manually click one of links below..
</script>

- [HTTP Gateway](/reference/http/gateway/): implementation-agnostic interface for retrieving [content-addressed](../concepts/glossary/#content-addressing) data from IPFS
- [Kubo RPC API v0](/reference/kubo/rpc/): RPC for managing Kubo IPFS nodes
