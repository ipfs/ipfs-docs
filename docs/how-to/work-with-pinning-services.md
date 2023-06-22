---
title: Work with pinning services
description: Learn how to use or create remote pinning services with IPFS, the InterPlanetary File System.
---


# Work with remote pinning services

Depending on how you use IPFS, you might find it helpful to use a **remote pinning service** instead of, or in addition to, pinning files on your local IPFS node. Whether it happens remotely or locally, **pinning** an item in IPFS identifies it as something you always wish to keep available, exempting it from the routine _garbage collection_ that IPFS does on infrequently-used items in order to efficiently manage storage space. [Learn more about local pinning →](pin-files.md)

If you've got just one local IPFS node that's always running, local pinning may be all you need to ensure your important items are persisted and never garbage-collected. However, using a remote pinning service — or creating your own — might be useful to you if:

- Your local node isn't always online, but you need items to be consistently available.
- You'd like to keep a persistent backup of your local node's files somewhere else.
- You don't have all the disk space you need on your local node.
- You run more than one IPFS node, and would like to use one of them as a "personal pinning service" as your preferred location for permanent storage.

There are a number of commercial pinning services that make it easy for you to purchase pinning capacity for your important files. Some of the notable services include [Pinata](https://pinata.cloud/), [Filebase](https://filebase.com/), [Temporal](https://temporal.cloud/), [Crust](https://crust.network/), [Infura](https://infura.io/), and others. Each of these third-party services has its own unique interface for pinning files and managing those pins; this could include a GUI, an API, CLI commands, or other tooling.

However, you don't need to learn new commands or tools if your pinning service of choice supports the vendor-agnostic [IPFS Pinning Service API](https://ipfs.github.io/pinning-services-api-spec/) specification. Those services are supported within IPFS itself through the command line: `ipfs pin remote --help`.

As of June 2023, [Filebase](https://filebase.com) and [Pinata](https://pinata.cloud/) support the IPFS Pinning Service API endpoint, with more pinning services on the way! [Learn how to create your own](#create-your-own-pinning-service).
[Learn how to create your own →](#create-your-own-pinning-service)

## Use an existing pinning service

There are two methods to add an existing pinning service to your IPFS installation:

- [IPFS Desktop or IPFS Web UI](#ipfs-desktop-or-ipfs-web-ui)
- [IPFS CLI](#ipfs-cli)

To add and use a remote pinning service directly in IPFS, you'll first need to have an account with that service.

### IPFS Desktop or IPFS Web UI

You can add your favorite pinning service(s) to IPFS Desktop/Web UI directly, enabling you to pin and unpin items from the Files screen in the same way you would add or remove local pins.

#### Adding a new pinning service

To add a new pinning service, open up IPFS Desktop or Web UI, navigate to the **Pinning Services** section of the **Settings** screen, and click the **Add Service** button:

> ![The Desktop/Web UI Settings screen, ready for adding a new pinning service](./images/work-with-pinning-services/add-service.jpg)

Then, select your chosen pinning service from the modal that pops up. If the pinning service you'd like to add isn't listed in that modal, don't worry — you can add any remote pinning service that supports the IPFS Pinning Service API by clicking the **Add a custom one** link.

> ![Desktop/Web UI modal for selecting a pinning service to add](./images/work-with-pinning-services/add-service-picker.jpg)

In the next screen, you’ll be asked for a few other details:

| Preconfigured service (e.g., Pinata)                                                    | Custom service                                                                                                 |
| ----                                                                                           | ----                                                                                                           |
| ![Adding Pinata in Desktop/Web UI](./images/work-with-pinning-services/add-service-pinata.jpg) | ![Adding custom pinning service in Desktop/Web UI](./images/work-with-pinning-services/add-service-custom.jpg) |

- A **nickname** for this service. This can be helpful if, for example, you want to add two accounts from the same service.
- The URL for your service's **API endpoint**.
  _Note: This field only appears if you've selected a custom pinning service!_
- Your **secret access token**. This is the unique token provided to you by the pinning service — check its documentation for more info.
  _To illustrate, example below shows which value should be copied from [pinata.cloud/keys](https://pinata.cloud/keys)_
  > ![Pinata secret access token](./images/work-with-pinning-services/add-service-pinata-token.jpg)
    _Note: Since some dashboards look different on the surface, this is an illustration example showing which values should be copied from 
   [console.filebase.com/keys](https://console.filebase.com/keys)._
    > ![Filebase secret access token](./images/work-with-pinning-services/add-service-filebase-token.png)

After you hit **Save**, you’ll see your new pinning service added to the **Pinning Services** section of your **Settings** screen.

> ![Desktop/Web UI Settings screen with a new pinning service added](./images/work-with-pinning-services/added-service.jpg)

#### Using a pinning service

Now that you’re set up, you can pin or unpin files to your new pinning service directly from the Files screen. Just right-click any file or click the **three dots** action icon in the files list, and select **Set pinning**:

> ![Desktop/Web UI Files screen with the action menu open and "Set pinning" visible](./images/work-with-pinning-services/set-pinning.jpg)

### IPFS CLI

Command-line users benefit from `ipfs pin remote` commands, which simplify remote pinning operations. The built-in pinning service API client executes all the necessary remote calls under the hood.

#### Adding a new pinning service

To add a new pinning service, use the following command:

```shell
$ ipfs pin remote service add nickname https://my-pin-service.example.com/api-endpoint myAccessToken
```

- `nickname` is a unique name for this particular instantiation of a pinning service. This can be helpful if, for example, you want to add two accounts from the same service.
- `https://my-pin-service.example.com/api-endpoint` is the endpoint supplied to you by the pinning service. Check the service's documentation for more info.
- `myAccessToken` is the unique secret token provided to you by the pinning service. Check the service's documentation for more info.

#### Using a pinning service

Here are a few CLI commands to get you started. In all examples, replace `nickname` with the unique name you gave the pinning service when you added it.

To pin a CID under a human-readable name:

```shell
$ ipfs pin remote add --service=nickname --name=war-and-peace.txt bafybeib32tuqzs2wrc52rdt56cz73sqe3qu2deqdudssspnu4gbezmhig4
```

To list successful pins:

```shell
$ ipfs pin remote ls --service=nickname
```

To list all "pending" pins:

```shell
$ ipfs pin remote ls --service=nickname --status=queued,pinning,failed
```

For more commands and general help:

```shell
$ ipfs pin remote --help
```

## Create your own pinning service

Obviously you aren't limited to a static list of pre-approved services. Any remote pinning service compatible with the [IPFS Pinning Service API](https://ipfs.github.io/pinning-services-api-spec) can be added as a custom pinning service — which also means that you can create your own! This might be useful in circumstances like:

- Designating one of your own IPFS nodes to be a _personal pinning service_ as a preferred location for permanent storage.
- Running a private pinning service for your friends or company.
- Starting your own commercial pinning service.

As noted above, your service must use the [IPFS Pinning Service API](https://ipfs.github.io/pinning-services-api-spec) in order to be interoperable with client behind `ipfs pin remote` commands.


::: tip
If you're interested in creating your own pinning service for your own personal or shared use, you can [generate client and server from the OpenAPI spec](https://github.com/ipfs/pinning-services-api-spec#code-generation), reducing the development time, or [reuse an existing solution](https://github.com/ipfs/pinning-services-api-spec#adoption)

You may also wish to read continuing details on how the API is evolving in the [Pinning Service API Spec GitHub repo](https://github.com/ipfs/pinning-services-api-spec), and be part of the discussion on its further development!
:::

If you'd like to make your custom pinning service available to every IPFS user, we welcome your submissions. Once you're ready to open the doors to the public, make a PR against the [IPFS Web UI GitHub repo](https://github.com/ipfs-shipyard/ipfs-webui) in order to add it to the default list of pinning services that are displayed in the Desktop/Web UI Settings screen, and one of the core maintainers will be in touch.

