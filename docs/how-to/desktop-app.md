---
title: "Advanced IPFS Desktop Usage"
description: "A simple walkthrough of the basic functions of the IPFS desktop app."
---

# Advanced IPFS Desktop Usage

This guide will walk you through the basics of IPFS Desktop and teach you how to add, remove, and download a file using IPFS. This guide will only cover the basics and will avoid talking about more complex concepts.

:::tip Use the glossary
Some of these terms might be unfamiliar to you, and that's ok! Just check out the [glossary](../concepts/glossary.md)! There you'll find definitions of all the common terms used when talking about IPFS.
:::

## Install IPFS Desktop

Installation instructions for [macOS](../install/ipfs-desktop.md#macos), [Ubuntu](../install/ipfs-desktop.md#ubuntu), and [Windows](../install/ipfs-desktop.md#windows).

The installation guides linked above are straightforward and easy to follow; simply follow the instructions that correspond to your operating system, and you will have IPFS Desktop going in just a few minutes.

## Add local files

Now that you have IPFS Desktop up and running, you can add the files that you wish to host on IPFS.

1. First, open IPFS Desktop and make sure you are connected to IPFS.
1. Navigate to the status screen by clicking on the **Status** tab on the left side of the app. At the top of the status screen, you will see that it says _Connected to IPFS_:

    ![Status and Connected](https://ipfs.io/ipfs/bafkreidfsaiakraedkl3u7zlxzjpjy3typhdqz24bam7vhietdcn7gzm3u "Status and Connected.png")

1. Now that you know you are connected to IPFS, navigate to the files screen by clicking the **Files** tab.
1. Click the **Import** button and select either **File** or **Folder**.

    ![Files Tab and Import Button](https://ipfs.io/ipfs/bafkreib766pjfowf3z66yz2culsqjb7pe26s5kw45y7euubfv7txwyau74 "Files Import.png")

1. In the file selection window, navigate to the file or folder that you wish to upload and host on IPFS. Once you have found the file or folder, simply double-click on it.
1. Your file has now been imported to your local IPFS node!

When files are imported to your IPFS node, the content identifier (CID) of that file is _calculated_. The CID for each file is listed directly under the file name on the **Files** page.

## Share files

Sharing a file over IPFS is simple. All you have to do is find the file you wish to share, copy the CID of that file, and then send that CID to the person you wish to share it with. They can then use the [Download](#download) instructions to grab the file using IPFS.

1. First, navigate to the **Files** tab.
1. Find the file that you wish to share.
1. Click the three dots next to your file and select **Copy CID**. This copies the CID of that file to your clipboard.

    ![Copy Desired CID](https://ipfs.io/ipfs/bafkreig6g5k5tu5k6vgwvwstzn6lzppjtoxzdzczb4fthrcfngetoz4klm "CopyCID.png")

1. Send the CID to your friend. They can use the [Download](#download) instruction to retrieve the file.

You can also select the **Share link** option from the dropdown menu. This copies your file's CID along with a gateway URL. You can share this special gateway link with anyone, even if they don't have IPFS Desktop installed! [Check out the Gateway section to learn more about how they work](../concepts/ipfs-gateway.md).

## Download

Importing and downloading a remote file to your local storage using IPFS is an easy task with IPFS Desktop. These simple steps will walk you through the process:

1. Get the CID of the file or directory that you want to download. If you don't already have one, you can use our example:

    ```plaintext
    bafkreig6g5k5tu5k6vgwvwstzn6lzppjtoxzdzczb4fthrcfngetoz4klm
    ```

1. In the IPFS Desktop app, go to the **Files** tab and click **Import**.
1. In the dropdown menu that appears, select **From IPFS**, and a new window will appear.
1. Paste the CID into the **Path or CID** field. You can also name this particular file/folder.
1. Click **Import**. The file metadata will be automatically retrieved over IPFS, and it will now appear in the list of files with the name you have chosen.

    ![Import from IPFS](https://ipfs.io/ipfs/bafkreihzdmqtouxjkdn6wrxlvx64dzxkvdnu4rwpveed5plvyon2zogx5y "Import from IPFS.png")

You now have a pointer to the file on your local IPFS node, but it is important to know that this does not mean it is saved to your computer's local storage. This type of import is called _lazy-loading_, meaning the actual data is fetched on-demand. If you wish to download and save a copy of the file directly to your computer's storage, the following steps will walk you through the process.

1. Click on the three dots that correspond to the file that you wish to download and save. In the dropdown menu that appears, select **Download**.

    ![Download the file](https://ipfs.io/ipfs/bafkreid4wkkwreywwdj2qqjnho56kodskmhi4e7tpzzvjpu3hn4o5eaxk4 "Download File.png")

1. A new window will appear asking you to choose a name for the file and to select a save destination for the file.
1. Once you have decided on the name and destination, click **Save**.

You now have a copy of the file saved to your computer's local storage. You can access this file at any time; no IPFS connection is needed!

## Remove files

Now that you know how to import files using IPFS Desktop, you may want to know how to remove them as well.

Removing a file from your local IPFS node will not necessarily remove the file from the IPFS network. If your file has been downloaded by other peers on the IPFS network, they may continue hosting it for others to import and download. Just like uploading a file to a regular web server, there is no way to _guarantee_ that there are no copies of a file on the network.

1. In IPFS Desktop, navigate to the **Files** tab.
1. Click on the three dots next to the file that you wish to remove.
1. Click **Remove** in the dropdown menu, and a confirmation window will appear:

    ![Remove](https://ipfs.io/ipfs/bafkreihqa4a5nhldieme2h66fbpnp52zihk7oqne5ble377qcqxppn4l6y "Remove.png")

1. In the confirmation window, ensure you have the **Also remove local pin** box checked. This option is only present if the file is pinned.
1. Confirm the removal by clicking the **Remove** button:

    ![Confirm Removal](https://ipfs.io/ipfs/bafkreibkhgbhkgooue2h23qb4qxljbcco2gpoi4fz42coaxq5yeqgp6rry "ConfirmRemove.png")

No further action is required to remove the file from your IPFS node. The garbage collector (GC) that is built into IPFS Desktop automatically runs every hour by default. The GC will remove any files marked for deletion. However, if you wish to run the garbage collector manually to remove the file, follow these steps:

:::warning
Before running the garbage collection, ensure any items you wish to keep are either pinned or saved to your computer locally. Garbage collection will remove all items that are not pinned or saved locally.
:::

1. Find the IPFS logo in your status or taskbar. On macOS, it is in the top right of the screen on the Menu Bar. On Windows, it is in the bottom right of the screen in the System Tray.
1. Click on the IPFS logo, and a dropdown menu will appear.
1. In the dropdown menu, go to **Advanced** and click **Run Garbage Collector**.

    ![Garbage Collection](https://ipfs.io/ipfs/bafkreigwixo5aexortfcjkkryzk2q5pxocvqvb7ohrbuz6uk52qdes43si "GarbageCollector.png")

1. A confirmation window will appear confirming that garbage collection has been successful.

That's the basics of IPFS Desktop! You now know how to share, receive, download and remove files from the InterPlanetary File System! If you're interested in web development, why not try out the [Websites on IPFS tutorial](../how-to/websites-on-ipfs/single-page-website.md)
