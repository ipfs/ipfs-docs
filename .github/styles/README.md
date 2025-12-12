# Vale Styles

This directory contains Vale linting configuration for ipfs-docs.

## Spelling Rules

There are two spelling systems:

1. **`Vocab/ipfs-docs-vocab/accept.txt`** - General Vale vocabulary
2. **`pln-ignore.txt`** - Custom ignore file for `docs/PLNSpelling.yml`

### Fixing PLNSpelling Errors

When CI fails with `[docs.PLNSpelling] Did you really mean 'word'?`:

1. Add the word to **`pln-ignore.txt`** (lowercase)
2. Do NOT add to `Vocab/accept.txt` - that file is for other Vale rules

The `PLNSpelling.yml` rule explicitly references `pln-ignore.txt`:

```yaml
extends: spelling
ignore:
  - pln-ignore.txt
```
