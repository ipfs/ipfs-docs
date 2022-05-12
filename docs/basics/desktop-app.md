---
title: "Desktop app"
description: "A simple walkthrough of the basic funtions of the IPFS desktop app."
---

# IPFS Desktop app basics

This guide will walk you through the basics of IPFS Desktop and teach you how to add, remove, and download a file using IPFS. This guide will only cover the basics and will avoid talking about more complex concepts.

:::tip Use the glossary
Some of these terms might be unfamiliar to you, and that's ok! Just check out the [glossary](../concepts/glossary/)! There you'll find definitions of all the common terms used when talking about IPFS.
:::

## Install IPFS Desktop

Installation instructions for [macOS](../install/ipfs-desktop/#macos), [Ubuntu](../install/ipfs-desktop/#ubuntu), and [Windows](../install/ipfs-desktop/#windows).

The installation guides linked above are straightforward and easy to follow; simply follow the instructions that correspond to your operating system and you will have IPFS Desktop going in just a few minutes.

## Add Local Files to IPFS

Now that you have IPFS Desktop up and running, you can add the files that you wish to host on IPFS.

1. First, open IPFS Desktop and make sure you are connected to IPFS. Navigate to the status screen by clicking on the **Status** tab on the left side of the app. At the top of the status screen you will see that it says "Connected to IPFS".
![Status and Connected](https://ipfs.io/ipfs/bafkreidfsaiakraedkl3u7zlxzjpjy3typhdqz24bam7vhietdcn7gzm3u "Status and Connected.png")
1. Now that you know you are connected to IPFS, navigate to the files screen. To do this, simply click on the **files** tab on the left side of the app.
1. On the files screen, you will see a button that says **+Import**, click on that and then select either **File** or **Folder**. If you are uploading just a single file to IPFS, select the **File** option. If you are uploading a folder containing multiple files, select the **Folder** option. Selecting either option will bring up a file selection window.
![Files Tab and Import Button](https://ipfs.io/ipfs/bafkreib766pjfowf3z66yz2culsqjb7pe26s5kw45y7euubfv7txwyau74 "Files Import.png")
1. In the file selection window, navigate to the file or folder that you wish to upload and host on IPFS. Once you have found the file or folder, simply double-click on it.
1. Your file has now been imported to your local IPFS node!

When files are imported to your IPFS node, they are automatically given a content identifier (CID). The CID for each file is listed directly under the file name on the **Files** page.

## Share Files using IPFS

Sharing a file over IPFS is simple. All you have to do is find the file you wish to share, copy the CID of that file, and send the CID to the person you wish to share it with.

1. First, navigate to the files page by clicking on the **Files** tab.
1. Now find the file that you wish to share, for this example I will be sharing a plaintext file.
1. Once you have found the desired file, click the 3 dots that correspond to that file.
1. In the dropdown menu, click **Copy CID**, the CID is now copied to your clipboard.
![Copy Desired CID](https://ipfs.io/ipfs/bafkreig6g5k5tu5k6vgwvwstzn6lzppjtoxzdzczb4fthrcfngetoz4klm "CopyCID.png")
1. Paste the CID that you just copied into a message and send it to the person you wish to have the file.

## Import and Download

Importing and downloading a remote file to your local storage using IPFS is an easy task with IPFS Desktop, these simple steps will walk you through the process.

1. First, you will need the CID of the file or directory that you wish to import and download. The CID needs to be shared with you, either by the owner of the file or by a peer who has previously imported the file to their IPFS node.
1. In IPFS Desktop, navigate to the files screen.
1. In the files screen, there will be a large button that says **+Import**, click on that.
1. In the dropdown menu that appears, select **From IPFS**, a new window will appear.
1. In this new "Import from IPFS" window, paste the desired CID into the "Path or CID (required)" field. A couple of example CIDs are given for you to try it out. If you wish to give the file a specific name, there is also an optional field to do that.
1. Once you have the desired CID and name filled out, click **import**. The file metadata will be automatically retrieved over IPFS and it will now appear in the list of files with the name you have chosen.
![Import from IPFS](https://ipfs.io/ipfs/bafkreihzdmqtouxjkdn6wrxlvx64dzxkvdnu4rwpveed5plvyon2zogx5y "Import from IPFS.png")
You now have a pointer to the file on your local IPFS node, but it is important to know that this does not mean it is saved to your computer's local storage. This type of import is called lazy-loaded, meaning the actual data is fetched on-demand. If you wish to download and save a copy of the file directly to your computer's storage, the following steps will walk you through the process.

1. Click on the 3 dots that correspond to the file that you wish to download and save. In the dropdown menu that appears, select **Download**.
![Download the file](https://ipfs.io/ipfs/bafkreid4wkkwreywwdj2qqjnho56kodskmhi4e7tpzzvjpu3hn4o5eaxk4 "Download File.png")
1. A new window will appear asking you to choose a name for the file and to select a save destination for the file.
1. Once you have decided on the name and destination, click the **Save** button.

You now have a copy of the file saved to your computer's local storage, you can access this file at any time, no IPFS connection needed!

## Remove Files From Your IPFS Node

Now that you know how to import files using IPFS Desktop, you may want to know how to remove them as well. 

:::tip Removing a file from your local IPFS node will not necessarily remove the file from the IPFS network. If your file has been shared and imported by other peers on IPFS, they will continue to have access to the file and will continue hosting it for others to import and download.
:::

1. In IPFS Desktop, navigate to the **Files** tab.
1. Click on the 3 dots next to the file that you wish to remove.
1. Click **Remove** in the dropdown menu, a confirmation window will appear.
![Remove](https://ipfs.io/ipfs/bafkreihqa4a5nhldieme2h66fbpnp52zihk7oqne5ble377qcqxppn4l6y "Remove.png")
1. In the confirmation window, ensure you have the "Also remove local pin" box checked (only present if the file is pinned). Confirm the removal by clicking the **Remove** button.
![Confirm Removal](https://ipfs.io/ipfs/bafkreibkhgbhkgooue2h23qb4qxljbcco2gpoi4fz42coaxq5yeqgp6rry "ConfirmRemove.png")

No further action is required to remove the file from your IPFS node, the garbage collector that is built into IPFS Desktop automatically runs every hour by default. If you wish to run the garbage collector manually to remove the file, follow the steps below.

:::warning Before running the garbage collection, ensure any items you wish to keep are either pinned or saved to your computer locally. Garbage collection will remove all items that are not pinned or saved locally.
:::

1. Find the small IPFS logo. On macOS it is in the top right of the screen on the Menu Bar, on Windows it is in the bottom right of the screen in the System Tray.
1. Click on the IPFS logo and a dropdown menu will appear.
1. In the dropdown menu, go to **Advanced** and click **Run Garbage Collector**.
![Garbage Collection](https://ipfs.io/ipfs/bafkreigwixo5aexortfcjkkryzk2q5pxocvqvb7ohrbuz6uk52qdes43si "GarbageCollector.png")
1. A confirmation window will appear confirming that garbage collection has been successful.

That's the basics of IPFS Desktop! You now know how to share, recieve, download and remove files from the InterPlanetary File System! For more information and to continue learning about IPFS, check out the rest of the [docs](../)!
