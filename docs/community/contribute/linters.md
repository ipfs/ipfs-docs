---
title: Tools for Writing
description: Find out how to create interesting code examples and keep the IPFS documentation consistent.
---

# Tools for writing

The [grammar, formatting, and style](grammar-formatting-and-style.md) and [writing](writing-guide.md) guides provide various rules and suggestions for writing good content for the IPFS Docs Project. However, remembering and manually checking grammar, spelling, writing style, Markdown formatting and outbound links is time consuming and prone to human error, especially with a large documentation project like the IPFS Docs.

Fortunately, you can check your Markdown for errors using the following tools to check grammar, spelling, writing style, Markdown formatting and outbound links:

- [markdown-link-check](https://github.com/tcort/markdown-link-check)
- [markdownlint](https://github.com/igorshubovych/markdownlint-cli)
- [vale](https://vale.sh/)

## Check links with markdown-link-check

:::warning
The markdown-link-check tool is currently in beta for IPFS docs, and may occasionally incorrectly identify a link as broken. Please help us improve this Github action by reporting any false negatives, false positives or any other bugs by [opening a GH issue](https://github.com/ipfs/ipfs-docs/issues/new/choose). Please include markdown-link-check output in the issue, and reference any related PRs i.e. if you're reporting that GH Action was incorrectly failing when you created a PR, link to that PR in the issue.
:::



### Use locally

You can use markdown-link-check from the command line. To do so, [install](#install-markdown-link-check) and then [check one or more file](#check-files).

#### Install markdown-link-check
1. Install npm if it is not already installed.
1. In a suitable directory, install markdown-link-check using npm:

   ```bash
   npm install -g markdown-link-check
   ```

   :::warning
   Don't install markdown-link-check in the branch or fork of ipfs-docs that you're working off of, as you may accidentally attempt to commit it to the project. 
   :::
1. Check that markdown-link-check is installed by checking the version:

   ```bash
   markdown-link-check -V
   ```

   If markdown-link-check is correctly installed, you will see a verison number like:

   ```plaintext
   3.10.3
   ```

Now that the tool is installed, you can check Markdown files for broken links.

#### Check files 

Run the tool against a markdown file using the same configuration that the GitHub Action uses. The configuration file is  called `mlc_pull_req_config.json` and is located at the top of the `ipfs-docs` directory.


- _To check a single file_, run:

  ```bash
  markdown-link-check -c='<path-to-config-file>' <path-to-markdown-file>
   ```

- _To recursively check all files in a given folder_, run:

  ```bash
  find . -name \*.md -print0 | xargs -0 -n1 markdown-link-check -c='<path-to-config-file>' 
  ```

So, for example, if you're running markdown-link-check against `ipfs-docs/README.md` from your `~` directory and your ipfs-docs fork is located in `~/projects`, you would run:

```bash
markdown-link-check -c='~/projects/ipfs-docs/mlc_pull_req_config.json' ~/projects/ipfs-docs/README.md
``` 


### Use the GitHub Action

To view the results of this GitHub action, do the following:

1. Navigate to [Actions tab](https://github.com/ipfs/ipfs-docs/actions). 

   :::tip
   Alternatively, if you just created this PR or recently made a commit, do the following:
   
   1. Next to the **Check Markdown links for modified files** action in the **Checks** section at the bottom of the PR, elect the **Details** link . 
   2. Continue on to step 5 of this procedure
   :::


1. Under **Actions**, select the **Check Markdown links for modified files** action.
1. From the list of workflow runs for the action, select the workflow run that you'd like to view by clicking on it. The most recent workflow can be found at the top of the list. 
1. Under **Jobs**, select **markdown-link-check**.
1. In the search field in the upper right hand corner, search for the following:

   ```
   MARKDOWN LINK CHECK
   ```

The log jumps to the output of the markdown-link-check action.
1. Look through the log lines below the _=========================> MARKDOWN LINK CHECK <=========================_ line. 

   - Lines beginning with `FILE:` indidicate the file that was checked. If your PR updates more than one file, multiple `FILE:` lines will appear in the log. For example:

   ```
   FILE: docs/install/ipfs-updater.md
   ```

   - The number of links checked for a given file are listed below the `FILE:` line. For example:
   
   ```
   1 links checked.
   ```
   
   - If a dead link was found, it will be listed below the _ERROR_ line, along with the status code. Find the link in your markdown and fix it. For example:

   ``` 
   ERROR: 1 dead links found!
   [✖] https://givweueerervuvwbeiuv.com#nvruvwrveri → Status: 404
   ``` 

1. If a broken or incorrectly formatted link was correctly found, fix the link and push the update. 


## Check formatting with markdownlint

### Use locally

### Use the GitHub Action

## Check spelling with vale

### Use locally

### Use the GitHub Action