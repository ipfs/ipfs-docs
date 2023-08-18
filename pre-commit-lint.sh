#!/bin/bash

DOCLINK="https://github.com/ipfs/ipfs-docs"
bold=$(tput bold)
normal=$(tput sgr0)
regularBar="----------------------------------------------------"
boldBar="===================================================="
errorBar="!**************************************************!"
fileList=$(git diff --diff-filter=d --cached --name-only)
mdFileList=$(echo "$fileList" | grep -E '\.(md)$')

echo " "
echo $boldBar
echo "${bold}PRE-COMMIT CHECK${normal}"
echo "We're checking all the markdown files changed in"
echo "this commit for any broken links, spelling mistakes,"
echo "or formatting errors."
echo "For details, see"
echo "$DOCLINK."

if [ ${#mdFileList} -gt 0 ]; then

    errors=0
    echo " "
    echo "The following files were changed:"
    for file in $mdFileList; do
        echo " - $file"
    done
    echo $boldBar

    echo " "
    echo $regularBar
    echo "${bold}Spelling and writing style check${normal}"
    echo $regularBar
    pre-commit run
    spellPassed=$?

    echo " "
    echo $regularBar
    echo "${bold}Link check${normal}"
    echo $regularBar
    npx markdown-link-check --config .mdlinkcheck-config.json -q -p $mdFileList "$@"
    linksPassed=$?

    echo " "
    echo $regularBar
    echo "${bold}Formatting check${normal}"
    echo $regularBar
    npx markdownlint-cli2 $mdFileList "$@"
    formatPassed=$?

    errorDescr=""

    if [ $linksPassed -ne 0 ]; then
        errorDescr+="\n- Broken links."
        errors=1
    fi
    if [ $spellPassed -ne 0 ]; then        
        errorDescr+="\n- Spelling errors."
        errors=1
    fi
    if [ $formatPassed -ne 0 ]; then
        errorDescr+="\n- Markdown formatting errors."
        errors=1
    fi
    if [ "$errors" -eq 1 ]; then
        echo " "
        echo $errorBar
        echo "${bold}ERRORS FOUND${normal}"
        echo "There are some problems with your commit:"
        echo "$errorDescr"
        echo " "
        echo "For details on how to fix these errors, see"
        echo "$DOCLINK."
        echo $errorBar
        echo " "
        exit 1
    else
        echo " "
        echo $regularBar
        echo "${bold}No errors were found!${normal}"
        exit 0
    fi
else

    echo " "
    echo $regularBar
    echo "No markdown files were changed in this commit."
    echo "Skipping checks..."
    echo $regularBar
    echo " "
    exit 0
fi