---
title: Use an existing private key
description: How to start an IPFS node with a pre-generated private key.
---

# Use an existing private key

There are two locations in which IPFS stores private keys:

1. In the config file (`~/.ipfs/config`), following the [config specification](https://github.com/ipfs/go-ipfs/blob/master/docs/config.md#identityprivkey) to store the default private key.
2. In the Keystore (`~/.ipfs/keystore`), following the [fs-repo specification](https://github.com/ipfs/specs/blob/master/REPO_FS.md) to store all other private keys.

Private keys are handled programmatically through code or via the CLI. Here we will show you how to use your existing private keys using both methods.

## CLI (`go-ipfs`)

There's no way of directly initializing an IPFS node using your private keys from IPFS's Go CLI at this moment. To learn more and look for possible workarounds, see the discussion on issue [ipfs/go-ipfs#4240](https://github.com/ipfs/go-ipfs/issues/4240).

You can, however, import private keys into the Keystore:

```sh
ipfs key import CustomKeyName ./CustomKeyFile

> k51qzi5uqu5dlli90qkt7xcnnjsd6jkn5rbdg7scuv6leozp1ecokewk5rzbeh
```

The content of the file holding the private key you want to import into the Keystore needs to be in the correct format to be valid.
The format of Keystore files is outlined in the [fs-repo](https://github.com/ipfs/specs/blob/master/REPO_FS.md#keystore) specification.

For more information on the CLI commands, you can check the help option for the specific command:

```sh
ipfs COMMAND --help
```

## CLI - JS (`js-ipfs`)

You can provide the private key inline as a string when initializing (see `--help` for info on valid formats):

```sh
jsipfs init --private-key 'my-private-key'
```

You can also import private keys into the Keystore:

```sh
jsipfs key import CustomKeyName --passin='your-pem-password' --input=./CustomKeyFile

> imported QmcasS8sQuasoFb2MDXbmBDwatWdhbkXrmx7131Rban9GG CustomKeyName
```

For more information on the CLI commands, you can check the help option for the specific command:

```sh
jsipfs COMMAND --help
```

## JavaScript

Using pre-generated private keys with JavaScript is pretty straight-forward:

1. Import the IPFS module.
2. Create the node, passing the desired private key in the [correct format](https://github.com/ipfs/js-ipfs/blob/master/docs/MODULE.md#optionsinit) to the `IPFS.create` function parameter:

```javascript
import IPFS from 'ipfs'

const myExistingPrivateKey = 'my-private-key'
const ipfs = await IPFS.create({ privateKey: myExistingPrivateKey })
```

## Go

Unfortunately, there's no clear way of initializing an IPFS node using your private keys from IPFS's Go Library at this moment.

## Troubleshooting

- Key not changing
  - If you already have an initialized repo (i.e., `~/.jsipfs` is not empty), the existing key from the config file (`~/.jsipfs/config`) will be used instead of the provided one ([ipfs/js-ipfs#2261](https://github.com/ipfs/js-ipfs/issues/2261#issuecomment-637449985)).

## Use cases

- Use the keys for IPNS publishing.
- Temporary and disposable keys.
- Use in CI/CD pipelines.
- Rotate the IPFS identity.
- Use keys created from a third-party.

## Security

You'll have to take care of the handling of keys and their security. Remember that private keys are your identity and the only way of seeing encrypted content, publishing as you, among other actions. It's a protection layer between the user and the raw data.

## Learn more

We highly recommend you check the existing GitHub issues for the library you're interested in using. They can be very insightful and help you through the learning process.
