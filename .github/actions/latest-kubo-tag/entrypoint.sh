#!/usr/bin/env sh
set -eu

# extract tag name from latest stable release
REPO="ipfs/kubo"
LATEST_IPFS_TAG=$(curl -L -H "Accept: application/vnd.github.v3+json" "https://api.github.com/repos/${REPO}/releases/latest" | jq --raw-output ".tag_name")

# extract IPFS release
cd /tmp
git clone "https://github.com/$REPO.git"
cd kubo

# confirm tag is valid
git describe --tags "${LATEST_IPFS_TAG}"

echo "The latest Kubo tag is ${LATEST_IPFS_TAG}"
echo "::set-output name=latest_tag::${LATEST_IPFS_TAG}"
