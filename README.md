# systemjs-unpkg [![Latest version](https://badgen.net/npm/v/systemjs-unpkg)](https://npm.im/systemjs-unpkg) [![Monthly downloads](https://badgen.net/npm/dm/systemjs-unpkg)](https://npm.im/systemjs-unpkg) [![Install size](https://packagephobia.now.sh/badge?p=systemjs-unpkg)](https://packagephobia.now.sh/result?p=systemjs-unpkg) [![Bundle size](https://badgen.net/bundlephobia/minzip/systemjs-unpkg)](https://bundlephobia.com/result?p=systemjs-unpkg)

Auto-resolve bare specifiers in [SystemJS](https://github.com/systemjs/systemjs) using [UNPKG](https://unpkg.com)

**Before**

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
const _ = await System.import('lodash'); // ⬅ Won't work unless the import map above is defined
```

**After**

```js
const _ = await System.import('lodash'); // ⬅ Automatically resolved without import map
```

## 🙋‍♂️ Why?
- **⚡️ Simplify SystemJS setup** Zero config setup to seemlessly resolve arbitrary bare specifiers!
- **🔥 Import map fallback** Only resolves specifiers that aren't defined in your [import map](https://github.com/systemjs/systemjs/blob/master/docs/import-maps.md)!
- **🐥 Tiny** Only `255B`!

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

