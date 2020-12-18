---
title: Work with pinning services
description: Learn how to use or create remote pinning services with IPFS, the InterPlanetary File System.
---

# Work with remote pinning services

Depending on how you use IPFS, you might find it helpful to use a **remote pinning service** instead of, or in addition to, pinning files on your local IPFS node. Whether it happens remotely or locally, **pinning** an item in IPFS identifies it as something you always wish to keep available, exempting it from the routine _garbage collection_ that IPFS does on infrequently-used items in order to efficiently manage storage space. [Learn more about pinning →](/how-to/pin-files).

If you've got just one local IPFS node that's always running, local pinning may be all you need to ensure your important items are persisted and never garbage-collected. However, using a remote pinning service — or creating your own — might be useful to you if:

- Your local node isn't always online, but you need items to be consistently available
- You'd like to keep a persistent backup of your local node's files somewhere else
- You don't have all the disk space you need on your local node
- You run more than one IPFS node, and would like to use one of them as a "personal pinning service" as your preferred location for permanent storage

There are a number of commercial pinning services that make it easy for you to purchase pinning capacity for your important files (examples of these include Pinata, Temporal, Infura, and others). Each of these third-party services has its own unique interface for pinning files and managing those pins; this could include a GUI, an API, CLI commands, or other tooling.

However, you don't need to learn new commands or tools if your pinning service of choice supports the [IPFS Pinning Service API](https://ipfs.github.io/pinning-services-api-spec/) specification — because those pinning services are supported within IPFS itself via the command line, [IPFS Desktop](https://github.com/ipfs-shipyard/ipfs-desktop), and the [IPFS Web UI](https://github.com/ipfs-shipyard/ipfs-webui). And, if you're interested in creating your own pinning service for your own personal or shared use, you can directly integrate it with IPFS Desktop/Web UI and the IPFS CLI by using the IPFS Pinning Service API.

As of January 2021, [Pinata](https://pinata.cloud/) supports the IPFS Pinning Service API, with more pinning services on the way!

## Use an existing pinning service

To add and use a remote pinning service directly in IPFS, you'll first need to have an account with that service (you can do this by signing up directly with the service itself). Once you're got an account, follow these steps to add and use it:

### IPFS Desktop or IPFS Web UI

You can add your favorite pinning service(s) to IPFS Desktop/Web UI directly, enabling you to pin and unpin items from the Files screen in the same way as as you do local pins.

#### Adding a new pinning service

To add a new pinning service, open up IPFS Desktop or Web UI, navigate to the “Pinning Services” section of the Settings screen, and click the “Add Service” button:

![The Desktop/Web UI Settings screen, ready for adding a new pinning service](https://user-images.githubusercontent.com/1507828/102558464-b0c07700-408a-11eb-8ae4-cd30e3ce81fd.png)

Then, select your chosen pinning service from the modal that pops up. If the pinning service you'd like to add isn't listed in that modal, don't worry — you can add any remote pinning service that supports the IPFS Pinning Service API by clicking the "Add a custom one" link.

![Desktop/Web UI modal for selecting a pinning service to add](https://user-images.githubusercontent.com/1507828/102558471-b918b200-408a-11eb-9a28-b06d03f99121.png)

In the next screen, you’ll be asked for a few other details:

- A nickname for this service (this can be helpful if, for example, you want to add two accounts from the same service)
- The URL for your service's API endpoint _(note: this field only appears if you've selected a custom pinning service!)_
- Your secret API key (this is the unique token provided to you by the pinning service — check its documentation for more info)
- Whether you want to automatically add all files in your local node’s Files directory to the pinning service, or choose which ones you upload

![Details modals for adding a new pinning service or a new custom pinning service in Desktop/Web UI](https://user-images.githubusercontent.com/1507828/102558910-ca15f300-408b-11eb-9fe3-742186c077c7.png)

After you hit **Save**, you’ll see your new pinning service added to the **Pinning Services** section of your **Settings** screen.

![Desktop/Web UI Settings screen with a new pinning service added](https://user-images.githubusercontent.com/1507828/102558530-db123480-408a-11eb-9e3b-58bbd59b2880.png)

#### Using a pinning service

Now that you’re set up, you can pin or unpin files to your new pinning service directly from the Files screen. Just right-click any file or click the **three dots** action icon in the files list, and select **Set pinning**:

![Desktop/Web UI Files screen with the action menu open and "Set pinning" visible](https://user-images.githubusercontent.com/1507828/102558546-e6656000-408a-11eb-97b8-5fdb060602d2.png)

### IPFS CLI

In addition to integrating your favorite pinning service into IPFS Desktop or Web UI, you can also use it directly from the command line using the `ipfs` command.

#### Adding a new pinning service

To add a new pinning service, use the following command:

```bash
ipfs pin remote service add nickname https://api.mypinningservice.com/endpoint myAccessToken
```

- `nickname` is a unique name for this particular instantiation of a pinning service. TThis can be helpful if, for example, you want to add two accounts from the same service.
- `https://api.mypinningservice.com/endpoint` is the endpoint supplied to you by the pinning service. Check the service's documentation for more info.
- `myAccessToken` is the unique token provided to you by the pinning service. Check the service's documentation for more info.

#### Using a pinning service

Here are a few CLI commands to get you started. In all examples, replace `nickname` with the unique name you gave the pinning service when you added it.

To pin a CID under under a human-readable name:

```bash
ipfs pin remote add --service=nickname --name=war-and-peace.txt bafybeib32tuqzs2wrc52rdt56cz73sqe3qu2deqdudssspnu4gbezmhig4
```

To list successful pins:

```bash
ipfs pin remote ls --service=nickname
```

To list pending pins:

```bash
ipfs pin remote ls --service=nickname --status=queued,pinning,failed
```

For more commands and general help:

```bash
ipfs pin remote --help
```

## Create your own pinning service

As noted above, you aren't limited to adding the remote pinning services listed in the Settings screen of Desktop/Web UI. Any remote pinning service that uses the [IPFS Pinning Service API](https://ipfs.github.io/pinning-services-api-spec) can be added as a custom pinning service — which also means that you can create your own! This might be useful in circumstances like:

- Designating one of your own IPFS nodes to be a _personal pinning service_ as a preferred location for permanent storage.
- Running a private pinning service for your friends or company.
- Starting your own commercial pinning service.

As noted above, your service must use the [IPFS Pinning Service API](https://ipfs.github.io/pinning-services-api-spec) in order to be interoperable with IPFS Desktop/Web UI and the IPFS CLI. You may also wish to read continuing details on how the API is evolving in the [Pinning Service API Spec GitHub repo](https://github.com/ipfs/pinning-services-api-spec), and be part of the discussion on its further development!

If you'd like to make your custom pinning service available to every IPFS user, we welcome your submissions. Once you're ready to open the doors to the public, make a PR against the [IPFS Web UI GitHub repo](https://github.com/ipfs-shipyard/ipfs-webui) in order to add it to the default list of pinning services that are displayed in the Desktop/Web UI Settings screen, and one of the core maintainers will be in touch.
