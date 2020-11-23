class ImageHash {
  constructor(implementation = null) {
    this.implementation = implementation || this.defaultImplementation()
  }

  /**
   * Calculate a perceptual hash of an image.
   * @param mixed image
   * @return Hash
   */
  hash(image) {
    return this.implementation.hash(image)
  }

  defaultImplementation() {
    return new PerceptualHash()
  }

  /**
   * Compare 2 images and get the hamming distance.
   * @param mixed resource1
   * @param mixed resource2
   * @return int
   */
  compare(resource1, resource2) {
    const hash1 = this.hash(resource1)
    const hash2 = this.hash(resource2)

    return this.distance(hash1, hash2)
  }

  distance(hash1, hash2) {
    return hash1.distance(hash2)
  }
}
