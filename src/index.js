const Magick = require('wasm-imagemagick')

class Hash {
  constructor(bits) {
    this.value = bits.join('')
  }

  toBinary() {
    return this.value
  }

  toHex() {
    return this.toInt().toString(16)
  }

  toInt() {
    return parseInt(this.value, 2)
  }
}

const pHash = {
  async hash(file) {
    const content = await this._readAsArrayBuffer(file)
    const files = [{ name: 'input.jpg', content }]
    const command = ['convert', 'input.jpg', '-resize', '32x32!', 'output.txt']
    let output = await Magick.Call(files, command)
    let buffer = output[0].buffer
    let info = String.fromCharCode.apply(null, buffer)

    let data = {}
    let lines = info.split('\n')
    lines.shift()
    for (let line of lines) {
      const parts = line.split(' ').filter(v => v)
      if (parts[0] && parts[2]) {
        const key = parts[0].replace(':', '')
        const value = this._convertToRGB(parts[2])
        data[key] = value
      }
    }

    let matrix = []
    let row = []
    let rows = []
    let col = []

    const size = 32
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        let color = data[`${x},${y}`]
        row[x] = parseInt(Math.floor(color.r * 0.299 + color.g * 0.587 + color.b * 0.114))
      }
      rows[y] = this._calculateDCT(row)
    }

    for (let x = 0; x < size; x++) {
      for (let y = 0; y < size; y++) {
        col[y] = rows[y][x]
      }
      matrix[x] = this._calculateDCT(col)
    }

    // Extract the top 8x8 pixels.
    let pixels = []
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        pixels.push(matrix[y][x])
      }
    }

    // Calculate hash.
    let bits = []
    const compare = this._average(pixels)
    for (let pixel of pixels) {
      bits.push(pixel > compare ? 1 : 0)
    }

    return new Hash(bits)
  },

  async compare(file1, file2) {
    const hash1 = await this.hash(file1)
    const hash2 = await this.hash(file2)

    return this.distance(hash1, hash2)
  },

  distance(hash1, hash2) {
    let bits1 = hash1.value
    let bits2 = hash2.value
    const length = Math.max(bits1.length, bits2.length)

    // Add leading zeros so the bit strings are the same length.
    bits1 = bits1.padStart(length, '0')
    bits2 = bits2.padStart(length, '0')

    return Object.keys(this._arrayDiffAssoc(bits1.split(''), bits2.split(''))).length
  },

  _arrayDiffAssoc(arr1) {
    const retArr = {}
    const argl = arguments.length
    let k1 = ''
    let i = 1
    let k = ''
    let arr = {}
    arr1keys: for (k1 in arr1) {
      for (i = 1; i < argl; i++) {
        arr = arguments[i]
        for (k in arr) {
          if (arr[k] === arr1[k1] && k === k1) {
            continue arr1keys
          }
        }
        retArr[k1] = arr1[k1]
      }
    }
    return retArr
  },

  _readAsArrayBuffer(file) {
    return new Promise(resolve => {
      if (!window.FileReader)
        throw new Error('FileReader API is not available in this environment.')

      const reader = new FileReader()
      reader.onload = event => {
        const arrayBuffer = event.target.result
        const sourceBytes = new Uint8Array(arrayBuffer)
        resolve(sourceBytes)
      }
      reader.readAsArrayBuffer(file)
    })
  },

  /**
   * Perform a 1 dimension Discrete Cosine Transformation.
   */
  _calculateDCT(matrix) {
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
  _average(pixels) {
    // Calculate the average value from top 8x8 pixels, except for the first one.
    const n = pixels.length - 1

    return pixels.slice(1, n).reduce((a, b) => a + b, 0) / n
  },

  _convertToRGB(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        }
      : null
  }
}

export default pHash

if(window !== 'undefined') {
  window.pHash = pHash
}