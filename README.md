# systemjs-unpkg [![Latest version](https://badgen.net/npm/v/systemjs-unpkg)](https://npm.im/systemjs-unpkg) [![Monthly downloads](https://badgen.net/npm/dm/systemjs-unpkg)](https://npm.im/systemjs-unpkg) [![Install size](https://packagephobia.now.sh/badge?p=systemjs-unpkg)](https://packagephobia.now.sh/result?p=systemjs-unpkg) [![Bundle size](https://badgen.net/bundlephobia/minzip/systemjs-unpkg)](https://bundlephobia.com/result?p=systemjs-unpkg)

Auto-resolve bare specifiers in [SystemJS](https://github.com/systemjs/systemjs) using [UNPKG](https://unpkg.com).

**Before**

Without this plugin, you have to manually declare individual dependencies in an importmap.

```html
<script type="systemjs-importmap">
{
  "imports": {
    "lodash/": "//unpkg.com/lodash/",
    ...
  }
}
</script>
```

```js
// Won't work unless the importmap above is declared
const _ = await System.import('lodash');
```

**After<sup>✨</sup>**

```js
// Automatically resolved without importmap!
const _ = await System.import('lodash');
```

**You can also specify npm semver ranges and tags**

```js
const $ = await System.import('jquery@2.2.4');

const $ = await System.import('jquery@^2.2.4');

const d3 = await System.import('d3@next');
```

Here's a [starter CodePen template](https://codepen.io/privatenumber/pen/pobGZmR?editors=0010) to get you started!

<sub>If you like this project, please star it & [follow me](https://github.com/privatenumber) to see what other cool projects I'm working on! ❤️</sub>

## 🙋‍♂️ Why?
- **⚡️ Simplify SystemJS setup** Zero config setup to seamlessly resolve arbitrary bare specifiers with versions!
- **🔥 Import map fallback** Only resolves specifiers that aren't defined in your [import map](https://github.com/systemjs/systemjs/blob/master/docs/import-maps.md)!
- **🐥 Tiny** Only `338B`!

## 🚀 Install
```sh
npm i systemjs-unpkg
```

## 🚦 Quick Setup
Simply load `systemjs-unpkg` after you load SystemJS.

If you're using a JS bundler:

```js
// Load systemjs
import 'systemjs';

// Load the systemjs AMD extra, as most npm packages have UMD/AMD distributions
import 'systemjs/dist/extras/amd';

// Load systemjs-unpkg
import 'systemjs-unpkg';
```

If in a browser:

```html
<!-- Load systemjs -->
<script src="//unpkg.com/systemjs/dist/system.min.js"></script>

<!-- Load the systemjs AMD extra, as most npm packages have UMD/AMD distributions -->
<script src="//unpkg.com/systemjs/dist/extras/amd.min.js"></script>

<!-- Load systemjs-unpkg -->
<script src="//unpkg.com/systemjs-unpkg"></script>
```

