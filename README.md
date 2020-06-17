![IPFS documentation logo.](ipfs-docs-header.png)
[![Build status icon.](https://img.shields.io/circleci/project/github/ipfs/ipfs-docs/master.svg?style=flat-square)](https://circleci.com/gh/ipfs/ipfs-docs)
[![Made by icon.](https://img.shields.io/badge/made%20by-Protocol%20Labs-blue.svg?style=flat-square)](https://protocol.ai/)
[![Project icon.](https://img.shields.io/badge/project-IPFS-blue.svg?style=flat-square)](http://ipfs.io/)

This repository organizes overall documentation issues across the IPFS project.

## Get involved

We would **love ❤️ your help** to improve existing items or make new ones even better! [We also have bounties available](https://github.com/ipfs/devgrants/projects/1)!

### Issues and suggestions

If you find something wrong within this repository, please raise an [issue here](https://github.com/ipfs/ipfs-docs/issues). If there's something you'd like to see, use the [Suggestion template issue](https://github.com/ipfs/ipfs-docs/issues)!

## Project organization

### Objectives for 2020 Q2

Here's a summary of this our objectives for the first three months of 2020:

1. ~~Deprecate the legacy site. [Milestone](https://github.com/ipfs/ipfs-docs/milestone/1)~~
2. A web developer's introduction: create a series of tutorials aimed at giving web developers a hands-on introduction to IPFS and get them building cool stuff quickly.
3. ~~Replace the outdated material at dweb-primer.ipfs.io with the material updated and granted to ipfs-shipyard in January 2020, and point to it in docs as such.~~
4. Automate the docs: install/create automation tools to _automagically_ test the docs for spelling mistakes, grammar mistakes, and broken links.
5. Single-source documentation: bring in all the documentation that currently lives in several different repos into the ipfs/ipfs-docs repo.

For more information regarding these objectives, check out the [IPFS-wide Objectives and Key Results (OKRs) tracking document](https://docs.google.com/spreadsheets/d/1YTnvQ75v0jCuumOM9CPhx0BZHhJzZGy2u2ydU-rPh2w/edit#gid=2033312819).

### IPFS docs core members

- [@johnnymatthews](https://github.com/johnnymatthews): Project leadership, organization, and primary contact
- [@cwaring](https://github.com/cwaring): Development support

## Bounties

You can earn the undying love of the IPFS community _and_ make some money by closing an issue with the [`bounty` tag](https://github.com/ipfs/ipfs-docs/issues?q=is%3Aopen+is%3Aissue+label%3Abounty)! Submissions must be production-ready and meet all the specifications listed on the issue page. Check out the [current list of open bounties →](https://github.com/ipfs/devgrants/projects/1)

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

## License

All software code is copyright (c) Protocol Labs, Inc. under the **MIT license**. Other written documentation and content is copyright (c) Protocol Labs, Inc. under the [**Creative Commons Attribution-Share-Alike License**](https://creativecommons.org/licenses/by/4.0/). See [LICENSE file](./LICENSE) for details.
