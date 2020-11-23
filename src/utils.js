export default {
  createCanvas(image) {
    let canvas
    if (document === 'undefined') {
      const { createCanvas } = require('canvas')
      canvas = createCanvas(image.naturalWidth, image.naturalHeight)
    } else {
      canvas = document.createElement('canvas')
      canvas.width = image.naturalWidth
      canvas.height = image.naturalHeight
    }

    const context = canvas.getContext('2d')
    context.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight)

    return canvas
  },

  grayscale(canvas) {
    const context = canvas.getContext('2d')
    var imageData = context.getImageData(0, 0, canvas.width, canvas.height)
    var data = imageData.data

    for (var i = 0; i < data.length; i += 4) {
      var brightness = 0.34 * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2]
      // red
      data[i] = brightness
      // green
      data[i + 1] = brightness
      // blue
      data[i + 2] = brightness
    }

    // overwrite original image
    context.putImageData(imageData, 0, 0)

    return canvas
  },

  resize(oldCanvas, size) {
    let canvas
    if (document === 'undefined') {
      const { createCanvas } = require('canvas')
      canvas = createCanvas(size, size)
    } else {
      canvas = document.createElement('canvas')
      canvas.width = size
      canvas.height = size
    }
    const context = canvas.getContext('2d')
    context.drawImage(oldCanvas, 0, 0, oldCanvas.width, oldCanvas.height, 0, 0, size, size)

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
