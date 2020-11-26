const input = document.getElementById('input')
const output = document.getElementById('output')

input.onchange = function (event) {
  const files = event.target.files

  output.innerHTML = ''

  for(let file of files) {
    const box = document.createElement('div')
    output.appendChild(box)
    // Display image
    const reader = new FileReader()
    reader.onload = event => {
      const image = new Image()
      image.src = event.target.result
      box.appendChild(image)
    }
    reader.readAsDataURL(file)

    // Calculate hash
    pHash.hash(file).then(hash => {
      const textbox = document.createElement('div')
      textbox.innerText = `binary: ${hash.toBinary()}
        hex: ${hash.toHex()}
        int: ${hash.toInt()}
      `
      box.appendChild(textbox)
    })
  }

  // Compare two images
  if(files.length === 2) {
    pHash.compare(files[0], files[1]).then(distance => {
      console.log({distance})
    })
  }
}
