#!/usr/bin/env sh
set -eu

API_FILE=`pwd`/docs/reference/http/api.md
ROOT=`pwd`
cd tools/http-api-docs

# extract go-ipfs release tag used in http-api-docs from go.mod in this repo
CURRENT_IPFS_TAG=`grep 'github.com/ipfs/go-ipfs ' ./go.mod | awk '{print $2}'`
echo "The currently used go-ipfs tag in http-api-docs is ${CURRENT_IPFS_TAG}"

# extract IPFS release
LATEST_IPFS_TAG=$INPUT_LATEST_IPFS_TAG
echo "The latest IPFS tag is ${LATEST_IPFS_TAG}"

# make the upgrade, if newer go-ipfs tags exist
if [ "$CURRENT_IPFS_TAG" = "$LATEST_IPFS_TAG" ]; then
    echo "http-api-docs already uses the latest go-ipfs tag."
else
     git checkout -b bump-ipfs-to-$LATEST_IPFS_TAG
     sed "s/^\s*github.com\/ipfs\/go-ipfs\s\+$CURRENT_IPFS_TAG\s*$/	github.com\/ipfs\/go-ipfs $LATEST_IPFS_TAG/" go.mod > go.mod2
     mv go.mod2 go.mod
     go mod tidy
     make
     http-api-docs > $API_FILE
     cd $ROOT # go back to root of ipfs-docs repo
     git config --global user.email "${GITHUB_ACTOR}"
     git config --global user.name "${GITHUB_ACTOR}@users.noreply.github.com"
     git add -u
     git commit -m "Bumped go-ipfs dependence of http-api-docs to tag $LATEST_IPFS_TAG."
     git push -u origin bump-http-api-docs-ipfs-to-$LATEST_IPFS_TAG
fi
echo "::set-output name=updated_branch::bump-http-api-docs-ipfs-to-$LATEST_IPFS_TAG"
