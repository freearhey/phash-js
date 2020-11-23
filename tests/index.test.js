const { loadImage } = require('canvas')
const pHash = require('../dist/phash.js')

test('pHash is correct', async () => {
  const image = await loadImage('./tests/images/forest/forest-copyright.jpg')
  expect(pHash(image)).toBe('bdf6520b2b0d4000')
})
