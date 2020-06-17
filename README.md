![IPFS documentation logo.](ipfs-docs-header.png)
[![Build status icon.](https://img.shields.io/circleci/project/github/ipfs/ipfs-docs/master.svg?style=flat-square)](https://circleci.com/gh/ipfs/ipfs-docs)
[![Made by icon.](https://img.shields.io/badge/made%20by-Protocol%20Labs-blue.svg?style=flat-square)](https://protocol.ai/)
[![Project icon.](https://img.shields.io/badge/project-IPFS-blue.svg?style=flat-square)](http://ipfs.io/)

This repository organizes overall documentation issues across the IPFS project.

## Join our monthly sync

Every month the team gets together to discuss plans for the coming four-ish weeks. This meeting usually happens on the last Tuesday of each month. Feel free to [join us](https://protocol.zoom.us/j/92681067428) using `92681067428` as the Zoom meeting ID! Here are the details for the next meeting:

| Date                  | Time                                                                            | Zoom ID       | Link                                                                     | Notes                                                                                                                                                                                         |
| --------------------- | ------------------------------------------------------------------------------- | ------------- | ------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tuesday 26th May 2020 | UTC: 16:00 - 16:30<br>EST: 11:00 - 11:30<br>PST 08:00-08:30<br>Unix: 1590508800 | `92681067428` | [protocol.zoom.us/j/92681067428](https://protocol.zoom.us/j/92681067428) | [Meeting notes](https://www.google.com/url?q=https://docs.google.com/document/d/1EOD-pJi4GvRmGi9HHocgVV8uVHMFIZlyVgJDkvC3DQ4/edit&sa=D&ust=1563045367944000&usg=AOvVaw1PXuFUmNdcfz8M0oJjv1dP) |

If you can't make the meeting, don't worry. We post a recording of each meeting in our [YouTube playlist](https://www.youtube.com/playlist?list=PLuhRWgmPaHtRnfsVYI2LbVS03BRX7TcXq). Notes from current and past calls can be found [here](https://www.google.com/url?q=https://docs.google.com/document/d/1EOD-pJi4GvRmGi9HHocgVV8uVHMFIZlyVgJDkvC3DQ4/edit&sa=D&ust=1563045367944000&usg=AOvVaw1PXuFUmNdcfz8M0oJjv1dP).

## Get involved

We would **love ❤️ your help** to improve existing items or make new ones even better! [We also have bounties available!](https://github.com/ipfs/devgrants/projects/1) Here are some ideas to get you started:

| Date                  | Time                                                                            | Zoom ID       | Link                                                                     | Notes                                                                                                |
| --------------------- | ------------------------------------------------------------------------------- | ------------- | ------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------- |
| Tuesday 26th May 2020 | UTC: 16:00 - 16:30<br>EST: 11:00 - 11:30<br>PST 08:00-08:30<br>Unix: 1590508800 | `92681067428` | [protocol.zoom.us/j/92681067428](https://protocol.zoom.us/j/92681067428) | [Meeting notes](https://cryptpad.fr/code/#/2/code/view/4xRbtK8Xt40a4FjhPiNcFVUeT6sum5YMuO-02+0Sn7s/) |

If you can't make the meeting, don't worry. A recording of each meeting is available on IPFS using the following CIDs:

| Date                  | Recording                                                                                                                            | Notes                                                                                       | Discussion                                           |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| Tuesday 26th May 2020 | [`QmS6TTMt2y3auLnjGmKUZL7thJRkXgyXr5sTL1RvUyp57n`](https://gateway.pinata.cloud/ipfs/QmS6TTMt2y3auLnjGmKUZL7thJRkXgyXr5sTL1RvUyp57n) | [Link](https://cryptpad.fr/code/#/2/code/view/4xRbtK8Xt40a4FjhPiNcFVUeT6sum5YMuO-02+0Sn7s/) | [#311](https://github.com/ipfs/ipfs-docs/issues/311) |

### Issues

If you find something wrong within this repository, please raise an [issue here](https://github.com/ipfs/ipfs-docs/issues).

## Project organization

### Objectives for 2020 Q2

Here's a summary of this our objectives for the first three months of 2020:

1. Deprecate the legacy site. ipfs/ipfs-docs#475
2. A web developer's introduction: create a series of tutorials aimed at giving web developers a hands-on introduction to IPFS and get them building cool stuff quickly. [Issue #464](https://github.com/ipfs/ipfs-docs/issues/464)
3. Replace the outdated material at dweb-primer.ipfs.io with the material updated and granted to ipfs-shipyard in January 2020, and point to it in docs as such.
4. Automate the docs: install/create automation tools to _automagically_ test the docs for spelling mistakes, grammar mistakes, and broken links. [Issue #463](https://github.com/ipfs/ipfs-docs/issues/463)
5. Single-source documentation: bring in all the documentation that currently lives in several different repos into the ipfs/ipfs-docs repo. [Issue #462](https://github.com/ipfs/ipfs-docs/issues/462)

For more information regarding these objectives, check out the [IPFS-wide Objectives and Key Results (OKRs) tracking document](https://docs.google.com/spreadsheets/d/1YTnvQ75v0jCuumOM9CPhx0BZHhJzZGy2u2ydU-rPh2w/edit#gid=2033312819).

## Suggestions

Do you have suggestions on future improvements to IPFS docs? You can [vote](https://ipfs.canny.io/docs-features) on what you think the IPFS docs site should contain, along with features that you'd like to see over at [canny.io/docs-features](https://ipfs.canny.io/docs-features).

### IPFS docs core members

- [@johnnymatthews](https://github.com/johnnymatthews): Project leadership, organization and primary contact
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
