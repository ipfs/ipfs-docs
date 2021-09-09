#!/usr/bin/env sh
set -eu

# extract IPFS release
cd /tmp
git clone https://github.com/ipfs/go-ipfs.git
cd go-ipfs
LATEST_IPFS_TAG=`git describe --tags --abbrev=0`
echo "The latest IPFS tag is ${LATEST_IPFS_TAG}"
echo "::set-output name=latest_tag::${LATEST_IPFS_TAG}"
