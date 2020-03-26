---
title: Troubleshooting
issueUrl: https://github.com/ipfs/docs/issues/470
---

# Troubleshooting

<!-- Taken from https://docs.google.com/document/d/1QvqtZ4c6FnvfKPYb4oacQWCAE3qamaCUrx4gGvYARis/edit# -->

## What might break?

- If you’re using IPFS as a library you need to upgrade to the new interfaces.
- If you have a testing setup using small keys, need to either start using large keys or set an environment variable.
- If you have a node prior to version 0.4.20 - please upgrade! These nodes will be unstable and a performance issue for the network. Aka - they may drop connections, be unreliable, and maybe even crash!
- Ipfs-lite will be interoperabilidad with 0.5
- Js-ipfs nodes will no longer be able to read go-ipfs datastores - if your go-ipfs node reads a js-ipfs datastore it will upgrade it and no longer be compatible with js-ipfs.
- New QUIC protocol.
- When putting to the DHT times out to find the best nodes to put to, findProviders will now fail (vs incorrectly succeeding as it did before) after putting to the best available peers.

<ContentStatus />
