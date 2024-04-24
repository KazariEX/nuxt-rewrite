# Nuxt Rewrite

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

Nuxt module for rewriting your routes with suffix.

Just for fun!

## Features

- Automatically append suffix to every route's path

- Redirect origin path and aliases to the suffixed path

## Quick Setup

Install the module to your Nuxt application with one command:

```bash
npx nuxi module add @zinkawaii/nuxt-rewrite
```

That's it! You can now use nuxt-rewrite in your Nuxt app ✨

## Options

```ts
export default defineNuxtConfig({
  modules: ["@zinkawaii/nuxt-rewrite"],
  rewrite: {
    /* rewrite options */
  }
});
```

- ``suffix``: An arbitrary string, like "php".

## Utils

### ``defineRewriteRouter``

When manually configuring routes using ``app/router.options.ts``, it is necessary to use it to set the suffix.

```ts
// app/router.options.ts
export default defineRewriteRouter({
  suffix: "php",
  routes: [
    /* some routes */
  ]
});
```

## Contribution

```bash
# Install dependencies
npm install

# Generate type stubs
npm run dev:prepare

# Develop with the playground
npm run dev

# Build the playground
npm run dev:build

# Run ESLint
npm run lint

# Run Vitest
npm run test
npm run test:watch

# Release new version
npm run release
```


<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/@zinkawaii/nuxt-rewrite/latest.svg?style=flat&colorA=020420&colorB=00DC82
[npm-version-href]: https://npmjs.com/package/@zinkawaii/nuxt-rewrite

[npm-downloads-src]: https://img.shields.io/npm/dm/@zinkawaii/nuxt-rewrite.svg?style=flat&colorA=020420&colorB=00DC82
[npm-downloads-href]: https://npmjs.com/package/@zinkawaii/nuxt-rewrite

[license-src]: https://img.shields.io/npm/l/@zinkawaii/nuxt-rewrite.svg?style=flat&colorA=020420&colorB=00DC82
[license-href]: https://npmjs.com/package/@zinkawaii/nuxt-rewrite

[nuxt-src]: https://img.shields.io/badge/Nuxt-020420?logo=nuxt.js
[nuxt-href]: https://nuxt.com
