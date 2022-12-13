<!-- 
Please feel free to delete this note AFTER reading through it :) 
!-->

## A note on the markdown-link-chech GitHub action

The IPFS docs team recently added a GitHub action that checks all pull requests for broken links.

The action runs on both initial PR creation and every commit to that repo.

Because the [markdown-link-check](https://github.com/ipfs/ipfs-docs/actions/workflows/action.yml) is currently in beta, and may incorrectly identify some links as broken, **it is not required to be passing before merging at this time**. 

To view the results of this GitHub action, do the following:

1. Navigate to [Actions tab](https://github.com/ipfs/ipfs-docs/actions). Alternatively, if you just created this PR or recently made a commit, select the **Details** link next to the **Check Markdown links for modified files** action in the **Checks** section at the bottom of the PR. From here, skip to step 5.
1. Under **Actions**, select the **Check Markdown links for modified files** action.
1. From the list of **workflow runs**, select the workflow run that you'd like to view by clicking on it. The most recent workflow can be found at the top of the list. 
1. Under **Jobs**, select **markdown-link-check**.
1. In the search field (upper right hand corner), type _MARKDOWN LINK CHECK_. The log jumps to the output of the markdown-link-check action.
1. Look through the log lines below the _=========================> MARKDOWN LINK CHECK <=========================_ line. 
   If a dead link was found, it, will be listed below the _ERROR_ line, along with the status code. Find the link in your markdown and fix it.
   **Example:**
   ``` 
   ERROR: 1 dead links found!
   [✖] https://givweueerervuvwbeiuv.com#nvruvwrveri → Status: 404
   ``` 
1. If the action incorrectly failed, please help us improve this Github action by reporting any false negatives, false positives or any other issues by [opening a GH issue](https://github.com/ipfs/ipfs-docs/issues/new/choose). Please reference this PR in the issue, and include the log output in the issue description.
<!-- 
Please feel free to delete everything above this comment line after reading the note on the markdown-link-chech GitHub action :) 
!-->


## Describe your changes
<!-- 
In a few sentences, described the changes made here, and why the changes are being made
!-->


## Files changed
<!-- 
Add the paths of the files that are being updated in this PR
!-->
- <!-- EXAMPLE: docs/install/ipfs-companion.md !-->
- 
- 

## What issue(s) does this address?

<!-- 
Add links to any issues that this PR addresses
!-->

- 
- 
- 

## Does this update depend on any other PRs?

<!-- 
Add links to any PRs that this PR depends on. For example, if this is a documentation update describing a new feature that imust be tested and merged before the documentation can be published, link to that PR here
!-->

- 
- 

## Checklist before requesting a review
- [ ] Passing the beta version of the **Check Markdown links for modified files** check. Action results can be viewed [here](https://github.com/ipfs/ipfs-docs/actions/workflows/action.yml).

## Checklist before merging
- [ ] Passing all required checks (The beta **Check Markdown links for modified files** check is not required)
