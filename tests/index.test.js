const { loadImage } = require('canvas')
const pHash = require('../dist/phash.js')

test('pHash is correct', async () => {
  const image = await loadImage('./tests/images/forest/forest-copyright.jpg')
  expect(pHash(image)).toBe('bdd65a2b2b0d4000')
})
