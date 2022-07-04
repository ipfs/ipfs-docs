![IPFS documentation logo.](ipfs-docs-header.png)
[![Build status icon.](https://img.shields.io/circleci/project/github/ipfs/ipfs-docs/master.svg?style=flat-square)](https://circleci.com/gh/ipfs/ipfs-docs)
[![Made by icon.](https://img.shields.io/badge/made%20by-Protocol%20Labs-blue.svg?style=flat-square)](https://protocol.ai/)
[![Project icon.](https://img.shields.io/badge/project-IPFS-blue.svg?style=flat-square)](http://ipfs.io/)

This repository organizes overall documentation issues across the IPFS project.

**If you'd just like to read the IPFS docs, we recommend the website version of the info contained in this repo! https://docs.ipfs.io**

## Get involved

We would **love ❤️ your help** to improve existing items or make new ones even better! [We also have bounties available](https://github.com/ipfs/devgrants/projects/1)!

### Issues

If you find something wrong within this repository, please raise an [issue here →](https://github.com/ipfs/ipfs-docs/issues). Unless the issue is urgent, updates will be batch-merged into `main` on Tuesdays or Thursdays.

### Bounties

You can earn the undying love of the IPFS community _and_ make some money by closing an issue with the [`bounty` tag](https://github.com/ipfs/ipfs-docs/issues?q=is%3Aopen+is%3Aissue+label%3Abounty)! Submissions must be production-ready and meet all the specifications listed on the issue page. Check out the [current list of open bounties →](https://github.com/ipfs/devgrants/projects/1)

If you are attempting to close an issue, great! Thanks for the help! Please leave a comment within the issue requesting to be assigned to that issue **before** submitting a pull request. This minimizes the chance of multiple different contributors duplicating work by submitting pull requests for the same issue. If you submit a pull request to an issue _without_ first being assigned to it, that pull request may not be accepted.

### Suggestions

Everyone has an opinion when it comes to docs, and **that's a good thing**! Having folks from different backgrounds add to a discussion empowers everyone within that discussion. So if you've got something to add or would like to bring up a topic for discussion about the IPFS Docs project, please do so! [Just create an issue using the `kind/question` tag!](https://github.com/ipfs/ipfs-docs/issues?q=is%3Aopen+is%3Aissue+label%3Akind%2Fquestion).

#### Pull requests welcome

Feel free to submit pull requests with any changes you'd like to see! If you're simply changing a typo or editing out a styling bug, you can add `ciskip` to the title of your pull request to stop Filecorgi from running.

## Project set up

If you want to build this site locally, run the following:

1. Clone this repository:

   ```bash
   git clone https://github.com/ipfs/ipfs-docs.git
   ```

1. Move into the `ipfs-docs` folder and install the NPM dependencies:

   ```bash
   cd ipfs-docs
   npm install
   ```

1. Boot up the application in _dev mode_:

   ```bash
   npm start
   ```

1. Open [localhost:8080](http://localhost:8080) in your browser.
1. Close the local server with `CTRL` + `c`.
1. To restart the local server, run `npm start` from within the `ipfs-docs` folder.

## Troubleshooting

If you're having trouble setting up the site locally, check here for solutions to some common problems.

### Digital envelope routines initialization error

The following error message may display when using Node.js version 18.0.0 when attempting to locally deploy this project for the first time:

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
You can now return to the `Project set up` section above and continue on with the steps. You can also check [this issue](https://github.com/webpack/webpack/issues/14532) for more information about this error.

## Core members

- [@johnnymatthews](https://github.com/johnnymatthews): Project leadership, organization, and primary contact
- [@cwaring](https://github.com/cwaring): Development support

## License

All software code is copyright (c) Protocol Labs, Inc. under the **MIT license**. Other written documentation and content is copyright (c) Protocol Labs, Inc. under the [**Creative Commons Attribution-Share-Alike License**](https://creativecommons.org/licenses/by/4.0/).
