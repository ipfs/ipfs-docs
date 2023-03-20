#!/usr/bin/env bash
set -eu

BRANCH=bump-documentation-to-latest-versions
LATEST_IPFS_TAG=$INPUT_LATEST_IPFS_TAG

git config --global --add safe.directory "$PWD"

echo "The latest Kubo tag is ${LATEST_IPFS_TAG}"

ROOT=`pwd`
git checkout -b ${BRANCH}
API_FILE="$(pwd)/docs/reference/kubo/rpc.md"


# Update http api docs and cli docs

cd tools/http-api-docs

# extract kubo release tag used in http-api-docs from go.mod in this repo
CURRENT_IPFS_TAG=$(grep 'github.com/ipfs/kubo ' ./go.mod | awk '{print $2}')
echo "The currently used Kubo tag in http-api-docs is ${CURRENT_IPFS_TAG}"

# make the upgrade, if newer Kubo tags exist
if [ "$CURRENT_IPFS_TAG" = "$LATEST_IPFS_TAG" ]; then
    echo "http-api-docs already uses the latest Kubo tag."
else
     # update http-api-docs
     sed "s/^\s*github.com\/ipfs\/kubo\s\+$CURRENT_IPFS_TAG\s*$/	github.com\/ipfs\/kubo $LATEST_IPFS_TAG/" go.mod > go.mod2
     mv go.mod2 go.mod
     go mod tidy
     make
     http-api-docs > "$API_FILE"

     # update cli docs
     cd "$ROOT" # go back to root of ipfs-docs repo
     git clone https://github.com/ipfs/kubo.git
     cd kubo
     git fetch --all --tags
     git checkout "tags/$LATEST_IPFS_TAG"
     go install ./cmd/ipfs
     cd "$ROOT/docs/reference/kubo"
     ./generate-cli-docs.sh
fi


# Update external tools versions

update_version() {
    INPUT_REPOSITORY=$1
    INPUT_VERSION_IDENTIFIER=$2

    LATEST_VERSION_TAG=`curl -L -H "Accept: application/vnd.github.v3+json" "https://api.github.com/repos/${INPUT_REPOSITORY}/releases/latest" | jq --raw-output ".tag_name"`
    LATEST_VERSION_NUMBER=${LATEST_VERSION_TAG:1}

    if [ "$LATEST_VERSION_TAG" = "null" ]; then
        echo "https://api.github.com returned null, please re-run this job, if the problem persists this script needs to be rewritten"
        exit 1
    fi

    echo "Updating documentation files that rely on ${INPUT_VERSION_IDENTIFIER} to ${LATEST_VERSION_TAG}"

    while read -r file; do
        echo "updating ${INPUT_REPOSITORY} version to ${LATEST_VERSION_NUMBER} in ${file}"
        CURRENT_VERSION_TAG=`awk "/${INPUT_VERSION_IDENTIFIER}/{print \\$2; exit;}" "${file}"`
        CURRENT_VERSION_NUMBER=${CURRENT_VERSION_TAG:1}
        sed -E -i "s/$CURRENT_VERSION_NUMBER/$LATEST_VERSION_NUMBER/g" "${file}"
    done <<< "$(grep "${INPUT_VERSION_IDENTIFIER}" ./docs -R --files-with-matches)"
}

cd "${ROOT}"
update_version ipfs/ipfs-update current-ipfs-updater-version
update_version ipfs-cluster/ipfs-cluster current-ipfs-cluster-version
update_version ipfs/kubo current-ipfs-version


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
