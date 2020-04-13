---
title: Troubleshooting
issueUrl: https://github.com/ipfs/docs/issues/470
---

# Troubleshooting

## Dropped connections

If you are running an IPFS node prior to version `0.4.20` you need to upgrade. These nodes will be unstable and cause performance issues for the network. They may drop connections, be unreliable, and frequently crash.

## IPFS/Libp2p address format changes

If you were using a multiaddr library (go, js, etc.) to name files because `/ipfs/QmSomePeerID` looks like `/ipfs/QmSomeFile`, your tool may break if you upgrade this library. If you're manually parsing multiaddrs and are searching for the string `/ipfs/...` , you'll need to search for `/p2p/...`.

## Curl requests failing

The gateway will redirect from `http://localhost:5001/ipfs/CID/...` to `http://CID.ipfs.localhost:5001/...` by default. Curl doesn't follow redirects by default. To avoid breaking cURL and other clients that don't support redirects, Go-IPFS will return the requested file along with the redirect. Browsers will follow the redirect and abort the download while cURL will ignore the redirect and finish the download.

## Minimum RSA key size

IPFS now enforces a minimum key size of 2048. IPFS generates 2048 bit RSA keys by default so this shouldn't be an issue for most people. However, users who explicitly chose a smaller key size will not be able to communicate with new nodes.

<ContentStatus />
