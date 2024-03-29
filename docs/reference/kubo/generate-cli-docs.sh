#!/bin/bash
# Updates /docs/reference/kubo/cli.md from the locally installed kubo (go-ipfs).
# TODO: Structure this around command groups (dag, object, files, etc.) 

exec &> ./cli.md

VER="$(ipfs version -n)"
echo "---
title: \"Kubo CLI\"
description: API documentation for the Kubo command-line executable.
---

# Kubo command-line

::: tip Generated on $(date +"%Y-%m-%d %T"), from kubo $VER
This document was autogenerated from CLI help text in [kubo $VER](https://github.com/ipfs/kubo/releases/tag/v${VER})
For issues and support, check out the [generate-cli-docs.sh](https://github.com/ipfs/ipfs-docs/blob/main/docs/reference/kubo/generate-cli-docs.sh) script on GitHub.
:::

<!-- DO NOT EDIT THIS FILE. This file is auto-generated from \`generate-cli-docs.sh\`. Any changes you make to this file will be overwritten. To edit this file, change the contents of the \`generate-cli-docs.sh\` script. -->

IPFS can run in either _online_ or _offline_ mode. Online mode is when you have IPFS running separately as a daemon process. If you do not have an IPFS daemon running, you are in offline mode. Some commands, like \`ipfs swarm peers\`, are only supported when online.

The [command-line quickstart guide](/how-to/command-line-quick-start/#take-your-node-online) explains how to start the IPFS daemon and take your node online.

"

echo "
### Alignment with Kubo RPC API

Every command usable from the CLI is also available through the [RPC API v0](/reference/kubo/rpc). For example:

\`\`\`sh
> ipfs swarm peers
/ip4/104.131.131.82/tcp/4001/p2p/QmaCpDMGvV2BGHeYERUEnRQAwe3N8SzbUtfsmvsqQLuvuJ
/ip4/104.236.151.122/tcp/4001/p2p/QmSoLju6m7xTh3DuokvT3886QRYqxAzb1kShaanJgW36yx
/ip4/104.236.176.52/tcp/4001/p2p/QmSoLnSGccFuZQJzRadHn95W2CrSFmZuTdDWP8HXaHca9z

> curl -X POST http://127.0.0.1:5001/api/v0/swarm/peers
{
  \"Strings\": [
    \"/ip4/104.131.131.82/tcp/4001/p2p/QmaCpDMGvV2BGHeYERUEnRQAwe3N8SzbUtfsmvsqQLuvuJ\",
    \"/ip4/104.236.151.122/tcp/4001/p2p/QmSoLju6m7xTh3DuokvT3886QRYqxAzb1kShaanJgW36yx\",
    \"/ip4/104.236.176.52/tcp/4001/p2p/QmSoLnSGccFuZQJzRadHn95W2CrSFmZuTdDWP8HXaHca9z\",
  ]
}
\`\`\`

"
printf "\n"
ipfs commands | while read line ; do
  printf "## $line\n\n\`\`\`\n"
  $line --help
  printf "\`\`\`\n\n"
done
