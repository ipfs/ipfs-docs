---
title: Notes for developers
legacyUrl:
description: Developer notes for IPFS Companion, including building and running from source in Firefox, Chromium, and Android.
---

# IPFS Companion developer notes

If you're looking to develop on IPFS Companion, you'll want to build from source. See the details below

## Building from source

You will need [NodeJS](https://nodejs.org/) and [Firefox](https://www.mozilla.org/en-US/firefox/developer/). Make sure `npm` and `firefox` are in your `PATH`.

It may be a good idea to use `yarn` instead of `npm`. We provide `yarn.lock` if you choose to do so.

### Installing dependencies

To install all dependencies into your `node_modules` directory, execute:

```bash
npm install
```

### Build and run in Firefox

You can build, test and deploy the add-on to Firefox in a single command:

```bash
npm start        # all-in-one
```

Or, if you prefer to do each step manually:
```bash
npm run build    # build runs bundle:firefox at the end, so manifest will be OK
npm run test     # test suite
npm run firefox  # spawn new Firefox
```

It is also possible to load the extension manually. Enter `about:debugging` in the URL bar, and then click "Load Temporary Add-on" and point it at `add-on/manifest.json`.

### Build and manual install in Chromium

First, build it manually:

```bash
npm run build bundle:chromium # last part is important: it overwrites manifest
```

Then open up `chrome://extensions` in your Chromium-based browser, enable "Developer mode", click "Load unpacked extension..." and point it at `add-on`.

| Chrome "unpacked extension" | Firefox "temporary add-on" |
|-----------------------------|----------------------------|
| ![installing ipfs-companion as an unpacked extension in chrome](../images/ipfs-companion-install-chrome-dev.gif) | ![installing ipfs-companion as a temporary add on in firefox](../images/ipfs-companion-install-firefox-dev.gif) |


### Firefox for Android

For complete details on running Companion in Firefox for Android, see [these instructions](companion-android-firefox.md).

## Useful tasks

Each `npm` task can be run separately, but most of the time, `dev-build`, `test`, and `fix:lint` are all you need.

- `npm install`: Install all NPM dependencies
- `npm run build`: Build the add-on (copy external libraries, create `.zip` bundles for Chrome and Firefox)
- `npm run bundle:chromium`: Overwrite manifest and package a generic, Chromium-compatible version
- `npm run bundle:brave`: Overwrite manifest and package a Brave-compatible version requesting access to `chrome.sockets`
- `npm run bundle:firefox`: Overwrite manifest and package a Firefox-compatible version
- `npm run build:rename-artifacts`: Rename artifacts to include runtimes in filenames
- `npm run ci`: Run tests and build (with frozen `yarn.lock`)
- `npm test`: Run entire test suite
- `npm run lint`: Read-only check for potential syntax problems (run all linters)
- `npm run fix:lint`: Try to fix simple syntax problems (run `standard` with `--fix`, etc.)
- `npm run lint:standard`: Run [Standard](http://standardjs.com) linter ([IPFS JavaScript projects default to standard code style](https://github.com/ipfs/community/blob/master/CONTRIBUTING_JS.md))
- `npm run lint:web-ext`: Run [addons-linter](https://github.com/mozilla/addons-linter) shipped with `web-ext` tool
- `npm run firefox`: Run as temporary add-on in Firefox
- `npm run chromium`: Run as temporary add-on in Chromium
- `npm run get-firefox-nightly`: Fetch latest Firefox nightly build to `./firefox/`
- `npm run firefox:beta:add -- --update-link "https://host/path/to/file.xpi" file.xpi`: Add a manifest entry for new self-hosted beta for Firefox

Release build shortcuts:
- `npm run dev-build`: All-in-one: fast dependency install, build with yarn (updates yarn.lock if needed)
- `npm run beta-build`: Reproducible beta build in docker with frozen `yarn.lock`
- `npm run release-build`: Reproducible release build in docker with frozen `yarn.lock`

## Other tips

- You can switch to an alternative Firefox version by overriding your `PATH`:

  ```bash
  export PATH="/path/to/alternative/version/of/firefox/:${PATH}"
  ```
- [Using localization in IPFS Companion](companion-localization.md) (running browsers with specific locale, etc.)
- [Testing persistent and restart features (Mozilla)](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Testing_persistent_and_restart_features)
