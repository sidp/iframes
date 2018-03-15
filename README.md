# @sidp/iframes

Give control of the parent window in an iframed page. Works cross-domain by utilizing the postMessage API. It is under development and things might still break.

## API

In the parent document:

```html
<iframe src="https://[...]" id="iframe"></iframe>
```

```js
import { setup } from '@sidp/iframes';
const iframe = setup(document.getElementById('iframe'));
```

In the iframed document:

```js
import { parentWindow, iframe } from '@sidp/iframes';
```

The `parentWindow` object contains functions referring to the parent window and and `iframe` contains functions referring ot the iframe element in the parent document.

### Set the scroll position

```js
parentWindow.scrollTo(x, y);
```

The arguments must be provided as numbers. They are interpreted as pixel values.

### Get and set the size of the iframe

Get and set the height and width of the iframe. Numbers are interpreted as pixels and strings as css values.

```js
iframe.height(); // -> 620
iframe.height('100vh');
```

### Position of the iframe in the parent document

The following functions return the position of the iframe in the parent document. The returned number is a pixel value. The functions take no arguments.

```js
iframe.top() // -> 360
iframe.left() // -> 16
iframe.right() // -> 16
iframe.bottom(): // -> 840
```

The following funtions return the position of the iframe relative to the viewport. The returned number is a pixel value. The functions take no arguments.

```js
iframe.viewport.top(); // -> 100
iframe.viewport.left(); // -> 16
iframe.viewport.right(); // -> 16
iframe.viewport.bottom(); // -> 200
```

### Listen to events (not implemented yet)

In the parent document:

```js
import { setup } from '@sidp/iframes';
const iframe = setup(document.getElementById('iframe'));

iframe.on('resize', ({ width, height }) => {
	console.log('the iframe resized itself', width, height);
});

iframe.on('scroll', ({ x, y }) => {
	console.log('iframe scrolled the window to', x, y);
});
```

In the iframed document:

```js
import { parent, iframe } from '@sidp/iframes';
parent.on('init', () => {
	console.log(
		'The parent document initialized the iframe script for this iframe'
	);
});
```
