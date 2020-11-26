const { loadImage } = require('canvas')
const pHash = require('../dist/phash.js')

describe.skip('index', () => {
  it('forest-copyright.jpg', async () => {
    const image = await loadImage('./tests/images/forest/forest-copyright.jpg')
    expect(pHash(image)).toBe('bdd6520b2b2f4000')
  })

  it('forest-cropped.jpg', async () => {
    const image = await loadImage('./tests/images/forest/forest-cropped.jpg')
    expect(pHash(image)).toBe('bdd6520b2b2f4000')
  })

  it('forest-high.jpg', async () => {
    const image = await loadImage('./tests/images/forest/forest-high.jpg')
    expect(pHash(image)).toBe('b5d6520b0b2f4000')
  })

  it('forest-low.jpg', async () => {
    const image = await loadImage('./tests/images/forest/forest-low.jpg')
    expect(pHash(image)).toBe('b5d6520b0b2f4000')
  })

  it('forest-thumb.jpg', async () => {
    const image = await loadImage('./tests/images/forest/forest-thumb.jpg')
    expect(pHash(image)).toBe('b5d6520b2b2f4000')
  })
})
