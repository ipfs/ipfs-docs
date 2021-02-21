---
title: Static-site generators
description:
---

# Static-site generators

Static-site generators like Hugo, VuePress, Next.js, and Jekyll are all incredibly popular platforms for building websites quickly. This guide walks through how to integrate IFPS into each of these workflows.

## Hugo

Refer the Hugo's [Quick Start](https://gohugo.io/getting-started/quick-start/) to install and set up your project.

In `config.toml` add `relativeURLS` and set it to `true`.

```
relativeURLS=true
```

Build static pages

```bash
hugo -D
```

Output will be in `./public/` directory by default. Upload the public folder to IPFS.

## VuePress

Refer the VuePress' [Getting Started](https://vuepress.vuejs.org/guide/) to install and set up your project.

To build a static site:

```bash
vuepress build
```

Output will be in `./.vuepress/dist` directory by default.

Use a command to convert a static site to only use relative urls. In this example, we'll be using [all-relative](https://www.npmjs.com/package/all-relative)

```bash
cd .vuepress/dist/
npx all-relative
```

Upload the `dist` folder to IPFS.

## Jekyll

Refer the Jekyll's [Installation](https://jekyllrb.com/docs/installation/) guide to to install Ruby and Jekyll.

Refer to Jekyll's [Quickstart](https://jekyllrb.com/docs/) to set up your project.

To build a static site:

```bash
jekyll build
```

Output will be in `./_site` by default.

Use a command to convert a static site to only use relative urls. In this example, we'll be using [all-relative](https://www.npmjs.com/package/all-relative)

```bash
cd _site/
npx all-relative
```

Upload the `_site` folder to IPFS.
