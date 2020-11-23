const utils = {
  resize(image, size) {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    canvas.width = canvas.height = size
    context.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight, 0, 0, size, size)

    return canvas
  },

  pickColor(canvas, x, y) {
    const context = canvas.getContext('2d')
    var pixel = context.getImageData(x, y, 1, 1)
    var data = pixel.data

    return [data[0], data[1], data[2], data[3] / 255]
  },

  /**
   * Perform a 1 dimension Discrete Cosine Transformation.
   */
  calculateDCT(matrix) {
    let transformed = []
    const size = matrix.length

    for (let i = 0; i < size; i++) {
      let sum = 0
      for (let j = 0; j < size; j++) {
        sum += matrix[j] * Math.cos((i * Math.PI * (j + 0.5)) / size)
      }
      sum *= Math.sqrt(2 / size)
      if (i == 0) {
        sum *= 1 / Math.sqrt(2)
      }
      transformed[i] = sum
    }

    return transformed
  },

  /**
   * Get the average of the pixel values.
   */
  average(pixels) {
    // Calculate the average value from top 8x8 pixels, except for the first one.
    const n = pixels.length - 1

    return pixels.slice(1, n).reduce((a, b) => a + b, 0) / n
  }
}

function pHash(image) {
  const size = 32
  // Resize the image.
  const resized = utils.resize(image, size)
  const img = new Image()
  img.src = resized.toDataURL('image/jpeg', 100)
  img.width = 500
  img.height = 500
  output.appendChild(img)

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

  return bits.join('')
}
