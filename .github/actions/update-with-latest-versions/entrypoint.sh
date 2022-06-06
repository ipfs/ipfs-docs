#!/usr/bin/env bash
set -eu

BRANCH=bump-documentation-to-latest-versions
LATEST_IPFS_TAG=$INPUT_LATEST_IPFS_TAG

echo "The latest IPFS tag is ${LATEST_IPFS_TAG}"

ROOT=`pwd`
git checkout -b ${BRANCH}
API_FILE=`pwd`/docs/reference/http/api.md


# Update http api docs and cli docs

cd tools/http-api-docs

# extract go-ipfs release tag used in http-api-docs from go.mod in this repo
CURRENT_IPFS_TAG=`grep 'github.com/ipfs/go-ipfs ' ./go.mod | awk '{print $2}'`
echo "The currently used go-ipfs tag in http-api-docs is ${CURRENT_IPFS_TAG}"

# make the upgrade, if newer go-ipfs tags exist
if [ "$CURRENT_IPFS_TAG" = "$LATEST_IPFS_TAG" ]; then
    echo "http-api-docs already uses the latest go-ipfs tag."
else
     # update http-api-docs
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


# Update external tools versions

update_version() {
    INPUT_REPOSITORY=$1
    INPUT_VERSION_IDENTIFIER=$2

    LATEST_VERSION_TAG=`curl -H "Accept: application/vnd.github.v3+json" https://api.github.com/repos/${INPUT_REPOSITORY}/releases/latest | jq --raw-output ".tag_name"` 
    LATEST_VERSION_NUMBER=${LATEST_VERSION_TAG:1}

    while read -r file; do
        echo "updating ${INPUT_REPOSITORY} version to ${LATEST_VERSION_NUMBER} in ${file}"
        CURRENT_VERSION_TAG=`awk "/${INPUT_VERSION_IDENTIFIER}/{print \\$2; exit;}" "${file}"`
        CURRENT_VERSION_NUMBER=${CURRENT_VERSION_TAG:1}
        sed -E -i "s/$CURRENT_VERSION_NUMBER/$LATEST_VERSION_NUMBER/g" ${file}
    done <<< "$(grep "${INPUT_VERSION_IDENTIFIER}" ./docs -R --files-with-matches)"
}

cd "${ROOT}"
update_version ipfs/ipfs-update current-ipfs-updater-version
update_version ipfs/ipfs-cluster current-ipfs-cluster-version
update_version ipfs/go-ipfs current-ipfs-version


# Push on change

if [[ ! `git status --porcelain` ]]; then
    echo "No changes to commit."
    exit 0;
fi

git config --global user.email "${GITHUB_ACTOR}"
git config --global user.name "${GITHUB_ACTOR}@users.noreply.github.com"
git add -u
git commit -m "Bumped documentation & installation docs."
git push -fu origin ${BRANCH}
echo "::set-output name=updated_branch::${BRANCH}"