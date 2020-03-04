---
title: Host a static website on IPFS
legacyUrl: https://docs.ipfs.io/guides/examples/websites/
description: Learn how to host a static website on the decentralized web using IPFS.
---

# THIS TUTORIAL IS A WORK IN PROGRESS. DO NOT USE.

In this tutorial you'll import a simple one-page website to IPFS, have it use the CloudFlare Content Delivery Network (CDN), and link up a domain name so people can find your site easily.

## Install IPFS desktop

IPFS desktop is the simple to use and easy to install. Installation of the IPFS desktop differs between operating systems. Follow the instructions for your system.

### Windows

1. Go to the [IPFS desktop downloads page](https://github.com/ipfs-shipyard/ipfs-desktop/releases).
2. Find the link ending in `.exe` for the latest version of IPFS desktop:

    ![The IPFS desktop download page.](/images/download-exe-page.png)

3. Run the `.exe` file to start the installation.
4. Select whether you want to install the application for just yourself, or all users on the computer. Click **Next**:

    ![The IPFS desktop install options window.](/images/install-options.png)

5. Select the install location for the application. The default location is usually fine. Click **Next**:

    ![The IPFS desktop installation location window.](/images/install-location.png)

6. Wait for the installation to finish and click **Finish**:

    ![The IPFS desktop installation finished window.](/images/install-finish.png)

7. You can now find an IPFS icon in the status bar:

    ![The IPFS desktop status bar menu in the Windows status bar.](/images/ipfs-desktop-status-bar.png)

The IPFS desktop application has finished installing. You can now start to [add your site](#add-your-site).

### MacOS

1. Download the latest available `.dmg` file from the `ipfs-shipyard/ipfs-desktop` GitHub repository:

    ![List of available download links in GitHub.](images/install-macos-dmg-file-link.png)

2. Open the `ipfs-desktop.dmg` file.
3. Drag the IPFS icon into the **Applications** folder:

    ![Drag-to-install window in MacOS.](images/install-macos-drag-ipfs-drag.png)

4. Open your **Applications** folder and open the IPFS desktop application.
5. You may get a warning saying _IPFS Desktop.app can't be opened_. Click **Show in Finder**:

    ![Application cannot be installed error.](images/install-macos-ipfs-cannot-be-opened.png)

6. Find **IPFS Desktop.app** in your **Applications** folder.
7. Hold down the `control` key, click **IPFS Desktop.app**, and click **Open**:

    ![Right click context menu of IPFS Desktop.app.](images/install-macos-force-open.png)

8. Click **Open** in the new window:

    ![Open confirmation window.](images/install-macos-open-confirmation.png)

9. You can now find an IPFS icon in the status bar:

    ![The IPFS desktop status bar menu in the MacOS status bar.](images/install-macos-ipfs-desktop-status-bar.png)

The IPFS desktop application has finished installing. You can now start to [add your site](#add-your-site).

### Linux

1. Download the `.deb` package:
1. Open the `.deb` package in **Software Installer**:

    ![Right-click context menu of the IPFS deb package.](images/install-ubuntu-software-install.png)

1. Click **Install** and wait for the installation to finish:

    ![Install screen within the Ubuntu software installation window.](images/install-ubuntu-install.png)

1. Click **Applications** or press the Windows key on your keyboard.
1. Search for `IPFS` and select **IPFS Desktop**:

    ![Ubuntu search screen with IPFS desktop showing.](images/install-ubuntu-search-window.png)

1. You can now find an IPFS icon in the status bar:

    ![IPFS icon shown in the Ubuntu status bar.](images/install-ubuntu-ipfs-running-status-bar.png)

The IPFS desktop application has finished installing. You can now start to [add your site](#add-your-site).

## Add your site

The next step is to import your site into IPFS using the IPFS desktop app you just installed. The website we'll be using is incredibly simple. The purpose of it is to generate a random Hobbit-like name and display it to the visitor. Each time the page is refreshed a new name is displayed. The website is creativly called _Hobbit name generator_.

1. Create a file called `index.html` and paste in the following code:

    ```html
    <!doctype html>
    <html lang="en">
    <head>
        <meta charset="utf-8">
        <title>Hobbit Name Generator</title>
        <meta name="description" content="A Hobbit name generator, based of J.R.R Tolkien's 'Middle Earth'.">
        <meta name="author" content="IPFS">
        <style>body{margin:15px auto;max-width:650px;line-height:1.6;font-size:18px;color:#444;padding:0}</style>
    </head>
    <body onload="main()">
        <h1>Hobbit Name Generator</h1>
        <hr>
        <p>Your Hobbit name is: <b id="output_p"></b></p>
        <script>const first_names=["Abbo","Balbo","Caradas","Dado","Ebbo","Falco","Gararic","Humbert","Isumbras","Jolly","Kalimac","Lotho","Moro","Nordbert","Otto","Ponto","Rothad","Suger","Tassilo","Uffo","Vigor","Wulfram","Zwentibold","Achilla","Begona","Cosma","Dora","Estella","Forsythia","Goldilocks","Hyacynth","Iris","Jasmina","Kalmia","Lalia","Myrtle","Nigella","Opal","Primula","Ruellia","Silene","Tulip","Viola","Zinnia"];const last_names=["Boffin","Chubb","Diggle","Fairbairn","Galbasi","Harfoot","Lightfoot","Mugwort","Noaks","Oldbuck","Proudfoot","Roper","Sackville","Took","Underhill","Whitfoot","Zaragamba"];function main(){let name=first_names[Math.floor(Math.random()*first_names.length)]+" "+last_names[Math.floor(Math.random()*last_names.length)];document.querySelector('#output_p').innerHTML=name}
        </script>
    </body>
    </html>
    ```

2. Open IPFS desktop and go to the **Files** page.
3. Click **Add** → **File**.

    ![Add file menu in IPFS desktop.](/images/ipfs-desktop-add-file.png)

4. Navigate to your `index.html` file and select **Open**.

    ![Choose a file window open in IPFS desktop.](/images/ipfs-desktop-open-file.png)

5. Click the tripple dot menu on `index.html` and select **Share link**.
6. Click **Copy** to copy the file's URL to your clipboard.

    ![Share files window in IPFS desktop.](/images/ipfs-desktop-share-files.png)

7. Open a browser and paste in the URL you just copied.

After a few moments your browser will load the website! This can take up to a few minutes the first time. You can move onto the next section while the site is loading.

## Set up a DNS

### CloudFlare

## Pinning files

### Using Pinata

## Next Steps
