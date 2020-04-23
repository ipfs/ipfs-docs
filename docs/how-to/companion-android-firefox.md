---
title: Use Companion on Android Firefox
legacyUrl:
description: Instructions for installing and using IPFS Companion on Firefox for Android.
---

# Using IPFS Companion on Firefox for Android

Firefox for Android is capable of running the same extensions as the desktop version. This makes it very useful for experimenting with IPFS!

## Install Firefox for Android

All channels are available at Google Play Store:

- [Latest stable](https://play.google.com/store/apps/details?id=org.mozilla.firefox&hl=en)
- [Latest beta](https://play.google.com/store/apps/details?id=org.mozilla.firefox_beta)
- [Nightly](https://play.google.com/store/apps/details?id=org.mozilla.fennec_aurora)

## Install IPFS Companion

For full installation instructions, see [`README/#install`](https://github.com/ipfs-shipyard/ipfs-companion#install) in the IPFS Companion repo.

You can also test the latest code locally on an emulator, or via USB on your own device. See below for details.

## Hot-deploy over USB

To run your extension in [Firefox for Android](https://www.mozilla.org/en-US/firefox/mobile/), follow these instructions:

- [Set up your computer and Android emulator or device](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Developing_WebExtensions_for_Firefox_for_Android#Set_up_your_computer_and_Android_emulator_or_device) (enable Developer Mode, USB debugging, etc.)

Build everything, and switch `add-on/manifest.json` to the Fennec profile:

```
npm run dev-build
npm run bundle:fennec
```

Then, with your device connected to your development computer, run:

```
web-ext run -s add-on --target=firefox-android
```

It will list all connected devices with their IDs. If the list is empty, go back to the setup step and try again.

Next, deploy your extension to the specific device:

```
web-ext run -s add-on --target=firefox-android --android-device=<device ID>
```

The first time you run this command, there may be a popup on your Android device asking if you want to grant access over USB.

## Debugging in Firefox for Android

The remote debug port will be printed to the console right after successful deployment:

```
You can connect to this Android device on TCP port <debug PORT>
```

The fastest way to connect is to open `chrome://devtools/content/framework/connect/connect.xhtml` in Firefox on the same machine you run `web-ext` from.

## Additional resources

- [MDN: Developing extensions for Firefox for Android](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Developing_WebExtensions_for_Firefox_for_Android)
