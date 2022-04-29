# Search for version numbers from a list of pages
# and updates those versions to the lastest available
# version for that particular app/program/project.
import requests
import json
import re
import os

# Dictionary of pages to edit.
pages_to_update = {
    "docs/install/command-line.md": "ipfs/go-ipfs",
    "docs/install/ipfs-updater.md": "ipfs/ipfs-update",
    "docs/install/server-infrastructure.md": "ipfs/ipfs-cluster"
}
pattern = "\d{1,2}\.\d{1,2}\.\d{1,2}"
version_pattern = r"v"+pattern
ipfs_pattern = r"ipfs version "+pattern
updater_pattern = r"ipfs-update version "+pattern
# unpack dictionary & loop through each pages_to_update.
for page, repo in pages_to_update.items():
    page_path = os.path.dirname(__file__) + "/../" + page

    # Grab version from GitHub API.
    response = requests.get('https://api.github.com/repos/' + repo + '/releases/latest', headers={'Accept': 'application/vnd.github.v3+json'})
    json_reponse = json.loads(response.text)
    version_number = json_reponse["tag_name"]

    # Read file.
    with open(page_path, "r") as page_file:
        page_content = page_file.read()

    # Find and replace version numbers in page.
    updated_page_content = re.sub(version_pattern, version_number, page_content)
    updated_page_content = re.sub(ipfs_pattern, "ipfs version " + version_number.lstrip("v"), updated_page_content)
    updated_page_content = re.sub(updater_pattern, "ipfs-update version " + version_number.lstrip("v"), updated_page_content)
    page_file.close()

    # Write changes to page.
    page_open = open(page_path, "w")
    page_open.write(updated_page_content)
    page_open.close()