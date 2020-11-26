const input = document.getElementById('input')
const image = document.getElementById('image')
const output = document.getElementById('output')

input.onchange = function (event) {
  const file = event.target.files[0]

  // Display image
  const reader = new FileReader()
  reader.onload = event => {
    image.src = event.target.result
  }
  reader.readAsDataURL(file)

  // Calculate hash
  pHash.hash(file).then(hash => {
    output.innerText = `binary: ${hash.toBinary()}
      hex: ${hash.toHex()}
      int: ${hash.toInt()}
    `
  })

  // Compare two images
  // const files = event.target.files
  // hasher.compare(files[0], files[1]).then(distance => {
  //   console.log(distance)
  // })
}
