# Vanilla RWD Image Maps

### Allows image maps to be used in a responsive design by recalculating the area coordinates to match the actual image size on load and window.resize

---
This project is a vanilla JS clone of [stowball's jQuery-rwdImageMaps](https://github.com/stowball/jQuery-rwdImageMaps).


#### Usage:

* If possible, add [correct, unitless](http://dev.w3.org/html5/markup/img.html) `width` and `height` attributes to your image map images. You can override these in CSS to make them responsive.
* You don't need to add jQuery in you project anywhere, just this script!
* Just call the `rwdImageMaps()` function anywhere in your code:

```js
rwdImageMaps('img[usemap]');
```

If you want this applied to all your maps, pass `true` as the second parameter:

```js
rwdImageMaps('img[usemap]', true);
```

You may also want to wait until the Document has loaded before running the function (this is similar to `$(document).ready()`):

```js
document.addEventListener("DOMContentLoaded", function(e) {
    rwdImageMaps('img[usemap]');
});
```

#### Demo:

https://git.luca-kiebel.de/vanilla-rwdImageMaps/example.html

---

Copyright (c) 2019 [Luca Kiebel](https://luca-kiebel.de)  
Licensed under the MIT license *(see [LICENSE](https://github.com/lucakiebel/vanilla-rwdImageMaps/blob/master/LICENSE) for details)*  
Minified version created with Online YUI Compressor: http://www.refresh-sf.com/yui/
