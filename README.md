# pHash

pHash provides perceptual hashing and visual comparison of images in the browser without using HTML canvas.

## Installation

```html
<script src="https://cdn.jsdelivr.net/npm/phash-js/dist/phash.js"></script>
```

## Usage

```html
<!DOCTYPE html>
<html>
  <head>
    ...
  </head>
  <body>
    <input id="input" type="file" accept="image/*" />
    ...
  
    <script src="https://cdn.jsdelivr.net/npm/phash-js/dist/phash.js"></script>
    <script>
      const input = document.getElementById('input')
      input.onchange = function (event) {
        pHash.hash(event.target.files[0]).then(hash => {
          console.log(hash.value) // 1011010111010110010100100000101100101011001011110011110111110111
        })
      }
    </script>
  </body>
</html>
```

## API

**hash(image)**

```js
pHash.hash(image).then(hash => {
  console.log(hash.toBinary()) // 1011010111010110010100100000101100101011001011110011110111110111
  console.log(hash.toHex()) // b5d6520b2b2f4000
  console.log(hash.toInt()) // 13102750373803672000
})
```

**compare(image1, image2)**

```js
pHash.compare(image1, image2).then(distance => {
  console.log(distance) // 3
})
```

## Why?

If you try to generate an image hash using the Canvas API will notice that it changes depending on the browser and environment. This happens for several reasons. At the image format level – web browsers use different image processing engines, image export options, compression level, the final images may get different checksum even if they are pixel-identical. At the system level – operating systems have different fonts, they use different algorithms and settings for anti-aliasing and sub-pixel rendering. On this basis, for example, the technique [Canvas Fingerprinting](https://browserleaks.com/canvas) works.

## Caveats

Since one of the dependencies of the library is [KnicKnic/WASM-ImageMagick](https://github.com/KnicKnic/WASM-ImageMagick), its work requires a file `magick.wasm`, which size exceeds 4Mb.

## Contribute

If you find a bug or want to contribute to the code or documentation, you can help by submitting an [issue](https://github.com/freearhey/phash-js/issues) or a [pull request](https://github.com/freearhey/phash-js/pulls).

## License

[MIT](http://opensource.org/licenses/MIT)