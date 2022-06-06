#!/usr/bin/env bash
set -eu

SCRIPT_DIRECTORY="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

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
     # update http-api-docs
     git checkout -b bump-http-api-docs-ipfs-to-$LATEST_IPFS_TAG
     sed "s/^\s*github.com\/ipfs\/go-ipfs\s\+$CURRENT_IPFS_TAG\s*$/	github.com\/ipfs\/go-ipfs $LATEST_IPFS_TAG/" go.mod > go.mod2
     mv go.mod2 go.mod
     go mod tidy
     make
     http-api-docs > $API_FILE

     # update cli docs
     cd $ROOT # go back to root of ipfs-docs repo
     git clone https://github.com/ipfs/go-ipfs.git
     cd go-ipfs
     git fetch --all --tags
     git checkout tags/$LATEST_IPFS_TAG
     go install ./cmd/ipfs
     cd $ROOT/docs/reference
     ./generate-cli-docs.sh
fi

# update versions in docs
cd $ROOT # go back to root of ipfs-docs repo
"${SCRIPT_DIRECTORY}/update_version.sh" ipfs/ipfs-update current-ipfs-updater-version
"${SCRIPT_DIRECTORY}/update_version.sh" ipfs/ipfs-cluster current-ipfs-cluster-version
"${SCRIPT_DIRECTORY}/update_version.sh" ipfs/go-ipfs current-ipfs-version

# submit a PR
if [[ ! `git status --porcelain` ]]; then
    echo "No changes to commit."
    exit 0;
fi

cd $ROOT # go back to root of ipfs-docs repo
git config --global user.email "${GITHUB_ACTOR}"
git config --global user.name "${GITHUB_ACTOR}@users.noreply.github.com"
git add -u
git commit -m "Bumped documentation & installation docs."
git push -fu origin bump-docs-to-$LATEST_IPFS_TAG
echo "::set-output name=updated_branch::bump-docs-to-$LATEST_IPFS_TAG"
