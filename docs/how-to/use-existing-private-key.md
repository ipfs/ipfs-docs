---
title: Use an existing private key
description: How to start an IPFS node with a pre-generated private key.
---

# Use an existing private key

There are two locations in which IPFS stores private keys:

| Location                       | Purpose                                                                                               | Specification                                                                                        |
| ------------------------------ | ----------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| Config file (`~/.ipfs/config`) | Holds a single private key; used as the default for initializing the IPFS node, IPNS publishing, etc. | [config#identityprivkey](https://github.com/ipfs/kubo/blob/master/docs/config.md#identityprivkey) |
| Keystore (`~/.ipfs/keystore`)  | Holds additional private keys the node has access to; can be used for IPNS signing, publishing, etc.  | [fs-repo#keystore](https://github.com/ipfs/specs/blob/master/REPO_FS.md#keystore)                    |

Private keys are handled programmatically through code or through the CLI. Here we will show you how to use your existing private keys using both methods.

## CLI

Use the CLI to manage your private keys.

### Go-IPFS

There's no way of directly initializing an IPFS node using your private keys from the Go-IPFS CLI at this time. To learn more and look for possible workarounds, see the discussion on issue [ipfs/kubo#4240](https://github.com/ipfs/kubo/issues/4240).

You can, however, import private keys into the IPFS keystore:

```sh
ipfs key import CustomKeyName ./CustomKeyFile

> k51qzi5uqu5dlli90qkt7xcnnjsd6jkn5rbdg7scuv6leozp1ecokewk5rzbeh
```

The content of the file holding the private key you want to import into the IPFS keystore needs to be in the correct format to be valid. The format of keystore files is outlined in the [fs-repo](https://github.com/ipfs/specs/blob/master/REPO_FS.md#keystore) specification.

### JS-IPFS

You can provide the private key inline as a string when initializing:

```sh
jsipfs init --private-key 'my-private-key'
```

You can also import private keys into the IPFS keystore:

```sh
jsipfs key import CustomKeyName --passin='your-pem-password' --input=./CustomKeyFile

> imported QmcasS8sQuasoFb2MDXbmBDwatWdhbkXrmx7131Rban9GG CustomKeyName
```

## Programmatically

Manage your private keys programmatically.

### JavaScript

Using pre-generated private keys with JavaScript is straight-forward:

1. Import the IPFS module.
2. Create the node, passing the desired private key in the [correct format](https://github.com/ipfs/js-ipfs/blob/master/docs/MODULE.md#optionsinit) to the `IPFS.create` function parameter:

```javascript
import IPFS from 'ipfs'

const myExistingPrivateKey = 'my-private-key'
const ipfs = await IPFS.create({ privateKey: myExistingPrivateKey })
```

### Go

Unfortunately, there's no clear way of initializing an IPFS node using your private keys from IPFS's Go Library at this moment.

## Troubleshooting

### Key not changing

- If you already have an initialized repo (i.e., `~/.jsipfs` is not empty), the existing key from the config file (`~/.jsipfs/config`) will be used instead of the provided one ([ipfs/js-ipfs#2261](https://github.com/ipfs/js-ipfs/issues/2261#issuecomment-637449985)).

## Use cases

- Use the keys for IPNS publishing.
- Temporary and disposable keys.
- Use in CI/CD pipelines.
- Rotate the IPFS identity.
- Use keys created from a third-party.

## Security

Using pre-existing keys with your IPFS installation comes with some security concerns that aren't present when using the IPFS-generated keys. You have to manage your keys and their security. Remember that private keys are your identity and the only way of seeing encrypted content, publishing as you, among other actions.
