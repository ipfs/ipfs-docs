---
title: "Beginners Guide to IPFS Desktop"
description: "Walkthrough of the basic funtions of IPFS Desktop"
---

# Beginners Guide to IPFS Desktop

This guide will walk you through the basics of IPFS Desktop and will teach you how to add, remove and download a file using IPFS. This guide will only cover the basics and will avoid talking about more complex concepts. 

If you are unsure what some of the terms mean, check out the [glossary](../concepts/glossary/) where you can find definitions of all the common terms used when talking about IPFS.

---

## Install IPFS Desktop

Installation instructions for [Windows](../install/ipfs-desktop/#windows), [MacOS](../install/ipfs-desktop/#macos) and [Ubuntu](../install/ipfs-desktop/#ubuntu).

The installation guides linked above are straight forward and easy to follow; simply follow the instructions that correspond to your operating system and you will have IPFS Desktop going in just a few minutes.



## Share a local file using IPFS Desktop

Now that you have IPFS Desktop up and running, you can add the files that you wish to host on IPFS.

1. First, open IPFS Desktop and make sure you are connected to IPFS. Navigate to the status screen by clicking on the `Status` tab on the left side of the app. At the top of the status screen you will see that it says "Connected to IPFS".
1. Now that you know you are connected to IPFS, navigate to the files screen. To do this simply click on the `Files` tab on the left side of the app.
1. On the files screen, you will see a button that says `+Import`, click on that and then select either `File` or `Folder`. If you are uploading just a single file to IPFS, select the `File` option. If you are uploading a folder containing multiple files, select the `Folder` option. Selecting either option will bring up a file selection window.
1. In the file selection window, navigate to the file or folder that you wish to upload and host on IPFS. Once you have found the file or folder, simply double click on it.
1. Your file has now been imported to your local IPFS node!

When files are imported to your IPFS node, they are automatically given a content identifier (CID). The CID for each file is listed directly under the file name on the `Files` page. To share a file that you are hosting on IPFS, simply click the 3 dots to the right of the desired file, select `Copy CID` and send the CID to who ever you would like to have access to the file. Remember that your node must be online for other peers to retrieve the data from you.


---


## Download a remote file using IPFS Desktop

Importing and downloading a remote file to your local storage using IPFS is an easy task with IPFS Desktop, these simple steps will walk you through the process.

1. First, you will need the CID of the file or directory that you wish to import and download. The CID needs to be shared with you, either by the owner of the file or by a peer who has previously imported the file to their IPFS node.

1. In IPFS Desktop, navigate to the files screen.

1. In the files screen, there will be a large button that says `+Import`, click on that.

1. In the drop down menu that appears, select `From IPFS`, a new window will appear.

1. In this new "Import from IPFS" window, paste the desired CID into the "Path or CID (required)" field. A couple of example CIDs are given for you to try it out. If you wish to give the file a specific name, there is also an optional field to do that.

1. Once you have the desired CID and name filled out, click `import`. The file metadata will be automatically retrieved over IPFS and it will now appear in the list of files with the name you have chosen.

You now have a pointer to the file on your local IPFS node, but it is important to know that this does not mean it is saved to your computers local storage. This type of import is called lazy-loaded, meaning the actual data is fetched on-demand. If you wish to download and save a copy of the file directly to your computers storage, the following steps will walk you through the process.

1. Click on the 3 dots that correspond to the file that you wish to download and save. In the drop down menu that appears, select `Download`.

1. A new window will appear asking you to choose a name for the file and to select a save destination for the file.

1. Once you have decided on the name and destination, click the `Save` button.

You now have a copy of the file saved to your computers local storage! You can access this file at any time, no IPFS connection needed!


---


## Delete a file from IPFS Desktop

Now that you know how to import files using IPFS Desktop, you may want to know how to remove them as well. The following steps will guide you through the simple process.

### Important note
Removing a file from your local IPFS node will not necessarily remove the file from the IPFS network. If your file has been shared and imported by other peers on IPFS, they will continue to have access to the file and will continue hosting it for others to import and download.

1. In IPFS Desktop, navigate to the `Files` tab.

1. Click on the 3 dots next to the file that you wish to remove.

1. Click `Remove` in the drop down menu, a confirmation window will appear.

1. In the confirmation window, ensure you have the `Also remove local pin` box checked (only present if the file is pinned). Confirm the removal by clicking the `Remove` button.

No further action is required to permanently remove the file from IPFS, the garbage collector (GC) that is built into IPFS Desktop automatically runs every hour by default. If you wish to manually run the garbage collector to immediately remove the file, follow the steps below.

1. Find the small IPFS logo. On MacOS it is in the top right of the screen on the Menu Bar, on Windows it is in the bottom right of the screen in the System Tray.

1. Click on the IPFS logo and a drop down menu will appear.

1. In the drop down menu go to `Advanced` and click `Run Garbage Collector`.

1. A confirmation window will appear confirming that garbage collection has been successful.

That's the basics of IPFS Desktop! You now know how to share, recieve, download and remove files from the InterPlanetary File System! For more information and to continue learning about IPFS, check out the rest of the [docs](../)!
