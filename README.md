<p align="center">
<img align="center" src="./images/ipfs-docs-header.png" width="1000">
</p>

<div align="center">
<h3> IPFS is an open system to manage data without a central server </h3>
<br>

[![Made by icon.](https://img.shields.io/badge/made%20by-Protocol%20Labs-blue.svg?style=flat-square)](https://protocol.ai/)
[![Project icon.](https://img.shields.io/badge/project-IPFS-blue.svg?style=flat-square)](http://ipfs.tech/)
[![Build status icon.](https://img.shields.io/circleci/project/github/ipfs/ipfs-docs/master.svg?style=flat-square)](https://circleci.com/gh/ipfs/ipfs-docs)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)
</div>

<!-- TOC -->
- [Project set up](#project-set-up)
  - [Run locally](#run-locally)
  - [Troubleshooting](#troubleshooting)
    - [Digital envelope routines initialization error](#digital-envelope-routines-initialization-error)
- [Contribute to documentation](#contribute-to-documentation)
  - [Issues](#issues)
  - [Bounties](#bounties)
  - [Suggestions](#suggestions)
  - [Pull requests welcome](#pull-requests-welcome)
- [Style and configuration guide](#style-and-configuration-guide)
  - [Static-site generator](#static-site-generator)
  - [Automated deployments](#automated-deployments)
  - [Translation](#translation)
- [Primary maintainers](#primary-maintainers)
- [License](#license)
<!-- /TOC -->

---

Welcome to the official IPFS documentation. The Interplanetary File System (IPFS) is a distributed, peer-to-peer network for storing and accessing files, websites, applications, and data. Protocol Labs is the primary maintainer of the IPFS documentation and will review all issues and pull requests created in this repository.

**If you'd just like to read the IPFS documentation, we recommend the [website version](https://docs.ipfs.tech).**

## Project set up

### Run locally

To build the site locally, follow the steps below.

1. Clone this repository:

   ```bash
   git clone https://github.com/ipfs/ipfs-docs.git
   ```

1. Move into the `ipfs-docs` folder:

   ```bash
   cd ipfs-docs
   ```
   
1. Install the NPM dependencies:

   ```bash
   npm install
   ```

1. Set `NODE_OPTIONS`:

   ```bash
   export NODE_OPTIONS=--openssl-legacy-provider
   ```

1. Boot up the application in _dev mode_:

   ```bash
   npm start
   ```

1. Open [localhost:8080](http://localhost:8080) in your browser.
1. Close the local server with `CTRL` + `c`.
1. To restart the local server, run `npm start` from within the `ipfs-docs` folder.

### Troubleshooting

If you're having trouble setting up the site locally, check this section for solutions to common issues.

#### Digital envelope routines initialization error

The following error message may display when using Node.js version 18.0.0 when attempting to deploy this project for the first time:

   ```shell
   opensslErrorStack: [ 'error:03000086:digital envelope routines::initialization error' ],
   library: 'digital envelope routines',
   reason: 'unsupported',
   code: 'ERR_OSSL_EVP_UNSUPPORTED'
   ```

To solve this error, perform the following steps:

1. Open a terminal.
2. Navigate into the `ipfs-docs` folder:

   ```bash
   cd ipfs-docs
   ```

3. Run the following command:

   ```shell
    export NODE_OPTIONS=--openssl-legacy-provider
   ```

4. Run `npm start`.

   ```bash
   npm start
   ```

You can return to the [Project set-up](#project-set-up) section above and continue with the steps. You can also check [this issue in the Webpack GitHub repository](https://github.com/webpack/webpack/issues/14532) for more information about this error.

## Contribute to documentation

We would **love ❤️ your help** to improve existing items or make new ones even better! [We also have bounties available](https://github.com/ipfs/devgrants/projects/1)!

### Issues

If you find something wrong within this repository, please raise an issue [here →](https://github.com/ipfs/ipfs-docs/issues). Unless the issue is urgent, updates will be batch-merged into `main` on Tuesdays or Thursdays.

### Bounties

You can earn the undying love of the IPFS community, _and_ get rewarded by closing an issue containing the [`bounty` tag](https://github.com/ipfs/ipfs-docs/issues?q=is%3Aopen+is%3Aissue+label%3Abounty). Submissions must be production-ready and meet all the specifications listed on the issue page. To get started, check out the [current list of open bounties →](https://github.com/ipfs/devgrants/projects/1).

If you are attempting to close an issue, great! Thanks for the help! Please leave a comment within the issue requesting to be assigned to that issue **before** submitting a pull request. This minimizes the chance of multiple contributors duplicating work by submitting pull requests for the same issue. If you submit a pull request to an issue _without_ first being assigned to it, your pull request may not be accepted.

### Suggestions

Everyone has an opinion when it comes to documentation, and **that's a good thing**! Having folks from different backgrounds add to a discussion empowers everyone within that discussion, so if you've got something to add or would like to bring up a topic for discussion about the documentation, please do so! Create an issue using the [`kind/question` tag](https://github.com/ipfs/ipfs-docs/issues?q=is%3Aopen+is%3Aissue+label%3Akind%2Fquestion).

### Pull requests welcome

Feel free to submit pull requests with any changes you'd like to see. We will review and approve, or leave change requests, as soon as we are able.

## Style and configuration guide

A writing style and template guide is in the process of being written that contributors can use as a guideline.

### Static-site generator

The IPFS documentation site uses the [VuePress static website generator](https://vuepress.vuejs.org/) to convert the Markdown guides into a documentation website. All the documentation is written in Markdown; follow the [VuePress Markdown documentation](https://vuepress.github.io/guide/markdown.html) for information on how to write markdown files for VuePress.

### Automated deployments

When opening a pull request, CI scripts will run against your feature branch to test your changes.

The CI/CD production workflow builds on the `main` branch and deploys the documentation site on [fleek](https://fleek.co/). The site reflects the latest commit on `main`.

## Primary maintainers

- [@ElPaisano](https://github.com/ElPaisano): Primary contact, technical writing
- [@johnnymatthews](https://github.com/johnnymatthews): Primary contact, technical writing
- [@2color](https://github.com/2color): Developer relations & technical writing(ecosystem)

## License

All software code is copyright (c) Protocol Labs, Inc. under the **MIT license**. Other written documentation and content are copyright (c) Protocol Labs, Inc. under the [**Creative Commons Attribution-Share-Alike License**](https://creativecommons.org/licenses/by/4.0/).
