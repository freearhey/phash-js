class Hash {
  constructor(value) {
    this.value = value
  }

  toBits() {
    return this.value.toString(2)
  }

  static fromBits(bits) {
    if (Array.isArray(bits)) {
      bits = bits.join('')
    }

    return new Hash(bigInt(bits, 2))
  }

  distance(hash) {
    let bits1 = this.toBits()
    let bits2 = hash.toBits()
    const length = Math.max(bits1.length, bits2.length)

    // Add leading zeros so the bit strings are the same length.
    bits1 = bits1.padStart(length, '0')
    bits2 = bits2.padStart(length, '0')
    // console.log({ bits1, bits2 })

    return Object.keys(array_diff_assoc(bits1.split(''), bits2.split(''))).length
  }
}

function array_diff_assoc(arr1) {
  const retArr = {}
  const argl = arguments.length
  let k1 = ''
  let i = 1
  let k = ''
  let arr = {}
  arr1keys: for (k1 in arr1) {
    // eslint-disable-line no-labels
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
}
