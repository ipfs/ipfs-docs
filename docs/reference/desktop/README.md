---
title: IPFS Desktop Reference
description: IPFS Desktop Ref
---

# IPFS Desktop

[![](https://img.shields.io/badge/made%20by-Protocol%20Labs-blue.svg?style=flat-square)](https://protocol.ai/)
[![](https://img.shields.io/badge/project-IPFS-blue.svg?style=flat-square)](https://ipfs.tech/)
[![total download count](https://img.shields.io/github/downloads/ipfs-shipyard/ipfs-desktop/total.svg?style=flat-square&label=all%20downloads)](https://github.com/ipfs-shipyard/ipfs-desktop/releases)
[![latest release download count](https://img.shields.io/github/downloads/ipfs-shipyard/ipfs-desktop/v0.25.0/total.svg?style=flat-square)](https://github.com/ipfs-shipyard/ipfs-desktop/releases/tag/v0.25.0)

**IPFS Desktop gives you all the power of [IPFS](https://ipfs.io) in a convenient desktop app: a complete IPFS node, plus handy OS menubar/taskbar shortcuts and an all-in-one file manager, peer map, and content explorer.**

Use IPFS Desktop to get acquainted with IPFS without needing to touch the terminal — or, if you're already experienced, use the powerful menubar/taskbar shortcuts alongside the command line to make your IPFS workflow faster.

![Status screen of IPFS Desktop](https://gateway.ipfs.io/ipfs/QmYHuXitXMf5xTjiQXmXdqszvMTADvrM5zA7EqoDj3d3RH)

| Files screen | Explore screen | Peers screen | Settings screen | Menubar/taskbar |
|-------|---------|-------|----------|------|
| ![Screenshot of the Files screen](https://gateway.ipfs.io/ipfs/QmRN82RPWHKuSuBadijTQuaCjFKAGaymt3aFBoG6Du9Vi3) | ![Screenshot of the Explore screen](https://gateway.ipfs.io/ipfs/Qmaerxh9UKf9F3YPKnV2cBEnPQoJdVmkswFdz7kNQGncKt) | ![Screenshot of the Peers screen](https://gateway.ipfs.io/ipfs/QmaVbBYsEBb34HMP1YWeErrS7X3TB6Y9t1iQ4sBRnTvSwa) | ![Screenshot of the Settings screen](https://gateway.ipfs.io/ipfs/Qmby5RuN7K9s5W9RVLdrQSE8gRKQ66EX8c39iC31DLAxN6) | ![Screenshot of Mac/Windows menus](https://gateway.ipfs.io/ipfs/QmbT2YtuNo17Qaq31FJWRZgRMY4E6N9cdfBwzZTFSHUoBP) |

### Quick-install shortcuts

When in doubt, pick one of package formats with built-in automatic update mechanism:

- **Mac:** [ipfs-desktop-0.25.0-mac.dmg](https://github.com/ipfs-shipyard/ipfs-desktop/releases/download/v0.25.0/ipfs-desktop-0.25.0-mac.dmg)
- **Windows:** [IPFS-Desktop-Setup-0.25.0.exe](https://github.com/ipfs-shipyard/ipfs-desktop/releases/download/v0.25.0/IPFS-Desktop-Setup-0.25.0.exe)
- **Linux:**  [ipfs-desktop-0.25.0-linux-x86_64.AppImage](https://github.com/ipfs-shipyard/ipfs-desktop/releases/download/v0.25.0/ipfs-desktop-0.25.0-linux-x86_64.AppImage)
  - If you prefer to manage updates on your own, see [other package formats](#install) below.

### Table of Contents

- [IPFS Desktop](#ipfs-desktop)
    - [Quick-install shortcuts](#quick-install-shortcuts)
    - [Table of Contents](#table-of-contents)
  - [Features](#features)
    - [Start your node at system startup and control it from your OS](#start-your-node-at-system-startup-and-control-it-from-your-os)
    - [Quickly import files, folders, and screenshots to IPFS](#quickly-import-files-folders-and-screenshots-to-ipfs)
    - [Easily manage the contents of your node](#easily-manage-the-contents-of-your-node)
    - [Visualize your IPFS peers worldwide](#visualize-your-ipfs-peers-worldwide)
    - [Explore the "Merkle Forest" of IPFS files](#explore-the-merkle-forest-of-ipfs-files)
    - [Enjoy OS-wide support for IPFS files and links](#enjoy-os-wide-support-for-ipfs-files-and-links)
    - [Learn IPFS commands as you go](#learn-ipfs-commands-as-you-go)
  - [Install](#install)
    - [Mac](#mac)
    - [Windows](#windows)
    - [Linux/FreeBSD](#linuxfreebsd)
    - [Install from source](#install-from-source)
  - [Contribute](#contribute)
    - [Translations](#translations)
    - [Developer notes](#developer-notes)
  - [FAQ & Troubleshooting](#faq--troubleshooting)
    - [Why am I missing the system tray menu on Linux?](#why-am-i-missing-the-system-tray-menu-on-linux)
    - [Why can't I install IPFS Desktop under Debian 11?](#why-cant-i-install-ipfs-desktop-under-debian-11)
    - [Why can't I start IPFS Desktop under Debian 10?](#why-cant-i-start-ipfs-desktop-under-debian-10)
    - [Where are my IPFS configuration and log files?](#where-are-my-ipfs-configuration-and-log-files)
    - [How does IPFS Desktop select the IPFS repo location?](#how-does-ipfs-desktop-select-the-ipfs-repo-location)
    - [Which version of IPFS does IPFS Desktop use?](#which-version-of-ipfs-does-ipfs-desktop-use)
    - [Which flags does IPFS Desktop boot with?](#which-flags-does-ipfs-desktop-boot-with)
    - [I got a `repo.lock` error. How do I resolve this?](#i-got-a-repolock-error-how-do-i-resolve-this)
    - [I got a network error (e.g. `Error fetching`). What should I do?](#i-got-a-network-error-eg-error-fetching-what-should-i-do)
    - [I need more help!](#i-need-more-help)
  - [License](#license)


## Install IPFS Desktop

To learn how to install IPFS Desktop on Windows, Mac and Linux systems, see the [IPFS Desktop quickstart guide](../../install/). 

## Advanced Functionality 

## Contribute

We welcome all contributions to IPFS Desktop! The best way to get started is to check the current [open issues](https://github.com/ipfs-shipyard/ipfs-desktop/issues) (or drill down specifically for [issues labeled "help wanted"](https://github.com/ipfs-shipyard/ipfs-desktop/issues?q=is%3Aissue+is%3Aopen+label%3A%22help+wanted%22)) and find something interesting. All issues are categorized by the [standard label taxonomy](https://github.com/ipfs/community/blob/master/ISSUE_LABELS.md) used across the IPFS project, so you can also drill by topic (for example, [UX-related issues](https://github.com/ipfs-shipyard/ipfs-desktop/issues?q=is%3Aissue+is%3Aopen+label%3Atopic%2Fdesign-ux)).

No matter how you contribute, please be sure you read and follow the [IPFS Contributing Guidelines](https://github.com/ipfs/community/blob/master/CONTRIBUTING.md) and the [IPFS Community Code of Conduct](https://github.com/ipfs/community/blob/master/code-of-conduct.md).

### Translations

Contributing translations in your language is particularly valuable! We use Transifex to manage internationalization, which means you don't need to change a single line of code to add your translations — just sign up for a Transifex account.

Because IPFS Desktop app includes text from [IPFS Web UI](https://github.com/ipfs-shipyard/ipfs-webui) and [IPLD Explorer](https://github.com/ipfs-shipyard/ipld-explorer), you'll want to join all three Transifex projects in order to see all the text:
- https://www.transifex.com/ipfs/ipfs-desktop/
- https://www.transifex.com/ipfs/ipfs-webui/
- https://www.transifex.com/ipfs/ipld-explorer/

*Note for developers: We use English as our source of truth. This means that if you add any new text, make those additions in [`./assets/locales/en.json`](./assets/locales/en.json) and they will automatically propagate in Transifex for other languages.*

### Developer notes

For more detailed information about hacking on IPFS Desktop, including a release checklist, please see the full [developer notes](DEVELOPER-NOTES.md).

## FAQ & Troubleshooting

### Why am I missing the system tray menu on Linux?

IPFS Desktop is built using Electron, and unfortunately, poor system tray support has been a [longstanding problem with Electron apps](https://github.com/electron/electron/issues/21445).

You may wish to try troubleshooting according to the [Electron v9.3.0 docs](https://github.com/electron/electron/blob/v9.3.0/docs/api/tray.md#class-tray):

- On Linux, the app indicator will be used if it is supported; otherwise `GtkStatusIcon` will be used
- On Linux distributions that only have app indicator support, you must install `libappindicator1` to make the tray icon work

If you've noticed that the old system tray is back in IPFS Desktop v0.13, this is because the Electron team [removed support for `StatusNotifier` and restored the old tray interface on Linux called `XEmbed`](https://github.com/electron/electron/issues/21445#issuecomment-634163402).

### Why can't I install IPFS Desktop under Debian 11?

Debian package depends on `libappindicator3-1` which does not exist in Debian 11 anymore.

You need to install this missing dependency [on your own](https://gist.github.com/keyle/b4536dc922bb13d7b5dce16a7db7e328), or use `.AppImage` instead.

### Why can't I start IPFS Desktop under Debian 10?

Some Linux users may see one of the following errors when trying to launch IPFS Desktop:

When launching by double-clicking the app icon:
> The SUID sandbox helper binary was found, but is not configured correctly.
Rather than run without sandboxing I'm aborting now. You need to make sure that
chrome-sandbox is owned by root and has mode 4755.

When launching from the terminal:
```console
$ ipfs-desktop
$Trace/breakpoint trap
```

This is a known issue with Electron/Chrome and some hardened kernels. More details can be found [here](https://github.com/ipfs-shipyard/ipfs-desktop/issues/1362#issuecomment-596857282), but a fix is to start IPFS Desktop from the terminal with the following additional parameter:
```console
$ ipfs-desktop --no-sandbox
```

### Where are my IPFS configuration and log files?

You can open these files from the IPFS logo menu by selecting `Open Logs Directory` or `Open Configuration File` from the `Advanced` submenu. Or, find them in your OS as follows:
- **Mac:** `~/Library/Application Support/IPFS Desktop/`
- **Windows:** `%appdata%/IPFS Desktop/`
- **Linux:** `~/.config/IPFS Desktop/`

### How does IPFS Desktop select the IPFS repo location?

IPFS Desktop uses [ipfsd-ctl](https://github.com/ipfs/js-ipfsd-ctl), which, by default, checks the `IPFS_PATH` environment variable. If that isn't set, it falls back to `$HOME/.ipfs`. As soon as the first run has succeded, repository location info is saved in the configuration file, which becomes the source of truth.

To open your repo directory from the IPFS logo menu, select `Open Repository Directory` from the `Advanced` submenu.

### Which version of IPFS does IPFS Desktop use?

IPFS Desktop includes its own embedded binary of Kubo (`go-ipfs` version defined in `package.json`); this is the latest version of [Kubo](https://github.com/ipfs/kubo) that has passed QA for IPFS Desktop use.

You can check which version of IPFS you're running from the IPFS logo menu by looking in the `About` submenu.

### Which flags does IPFS Desktop boot with?

By default, IPFS Desktop starts the IPFS daemon with the flags `--migrate=true --enable-gc=true`.

You can change this in the IPFS Desktop config file by selecting `Open Configuration File` from the `Advanced` submenu.

### I got a `repo.lock` error. How do I resolve this?

In general, this means that a previous process was unable to remove the repository lock (indicator that file is in use) from the repository directory. This is supposed to be handled automatically, but sometimes it isn't. If you get this error, you can generally safely delete this file after shutting down any running IPFS daemon's or applications. Simple process is as follows:

1. Stop ipfs processes;
2. Manually delete lock file, located within the [repository](#how-does-ipfs-desktop-select-the-ipfs-repo-location);
3. Attempt to start ipfs desktop (or other process that received the `repo.lock` error) again.

### I got a network error (e.g. `Error fetching`). What should I do?

When upgrading, IPFS may need to perform migrations and for that we need a stable connection to download the required information for the migrations. Sometimes, the Internet connection may fail or be blocked by firewalls or antiviruses, and then you will run into a network error. Before submitting an issue, please try the following:

1. Check if you are connected to the Internet;
2. Make sure your firewall or antivirus is not blocking requests, such as P2P traffic;
3. Try again, by restarting IPFS Desktop.

### I need more help!

If you need help with using IPFS Desktop, the quickest way to get answers is to post them in the [official IPFS forums](https://discuss.ipfs.tech).

If you think you've found a bug or other issue with IPFS Desktop itself, please [open an issue](https://github.com/ipfs-shipyard/ipfs-desktop/issues/new/choose).

## License

[MIT — Protocol Labs, Inc.](./LICENSE)