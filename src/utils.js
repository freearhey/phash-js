export default {
  createCanvas(image, size) {
    let canvas
    if (document === 'undefined') {
      const { createCanvas } = require('canvas')
      canvas = createCanvas(size, size)
    } else {
      canvas = document.createElement('canvas')
      canvas.width = canvas.height = size
    }
    canvas.getContext('2d').drawImage(image, 0, 0, image.width, image.height, 0, 0, size, size)

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
  },

  toHex(binaryString) {
    return parseInt(binaryString, 2).toString(16)
  }
}
