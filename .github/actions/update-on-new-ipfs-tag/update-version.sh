#!/usr/bin/env sh
# Usage:
# update_version.sh repository project-version-identifier
#
# Update the version number in the documentation by the latest version tagged
# on the repository.
#
# Example:
#   update_version.sh ipfs/ipfs-update current-ipfs-updater-version
set -o errexit
set -o pipefail
set -o nounset

REPO=$1
IDENTIFIER=$2

LATEST_VERSION_TAG=`curl -H "Accept: application/vnd.github.v3+json" https://api.github.com/repos/${REPO}/releases/latest | jq --raw-output ".tag_name"` 
LATEST_VERSION_NUMBER=${LATEST_VERSION_TAG:1}

while read -r file; do
    echo "updating ${REPO} version to ${LATEST_VERSION_NUMBER} in ${file}"
    CURRENT_VERSION_TAG=`awk "/${IDENTIFIER}/{print \\$2; exit;}" "${file}"`
    CURRENT_VERSION_NUMBER=${CURRENT_VERSION_TAG:1}
    sed -E -i "s/$CURRENT_VERSION_NUMBER/$LATEST_VERSION_NUMBER/g" ${file}
done <<< "$(grep "${IDENTIFIER}" ./docs -R --files-with-matches)"
