# Search for version numbers from a list of pages
# and updates those versions to the lastest available
# version for that particular app/program/project.

import requests
import json
import re

# Dictionary of pages to edit.
pages_to_update = {
    "docs/install/command-line.md": "ipfs/go-ipfs",
    "docs/install/ipfs-updater.md": "ipfs/ipfs-update",
    "docs/install/server-infrastructure.md": "ipfs/ipfs-cluster"
}

# Loop through each pages_to_update.
for page_path in pages_to_update:

    # Read file.
    with open("../" + page_path, "r") as page_file:
        page_content = page_file.read()

    # Define org and repo. 
    org_and_repo = pages_to_update.get(page_path) 

    # Grab version from GitHub API.
    response = requests.get('https://api.github.com/repos/' + org_and_repo + '/releases/latest', headers={'Accept': 'application/vnd.github.v3+json'}) 
    json_reponse = json.loads(response.text)
    version_number = json_reponse["tag_name"]

    # Find and replace version numbers in page.
    updated_page_content = re.sub("v\d{1,2}\.\d{1,2}\.\d{1,2}", version_number, page_content)

    # Write changes to page.
    page_open = open("../" + page_path, "w")
    page_open.write(updated_page_content)
    page_open.close()
