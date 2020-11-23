import utils from './utils'

export default function pHash(image) {
  const size = 32
  // Resize the image.
  const resized = utils.resize(image, size)

  let matrix = []
  let row = []
  let rows = []
  let col = []

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      let rgb = utils.pickColor(resized, x, y)
      row[x] = parseInt(Math.floor(rgb[0] * 0.299 + rgb[1] * 0.587 + rgb[2] * 0.114))
    }
    rows[y] = utils.calculateDCT(row)
  }

  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      col[y] = rows[y][x]
    }
    matrix[x] = utils.calculateDCT(col)
  }

  // Extract the top 8x8 pixels.
  let pixels = []
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      pixels.push(matrix[y][x])
    }
  }

  const compare = utils.average(pixels)

  // Calculate hash.
  let bits = []
  for (let pixel of pixels) {
    bits.push(pixel > compare ? 1 : 0)
  }

  return utils.toHex(bits.join(''))
}
