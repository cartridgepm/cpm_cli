const Promise = require("bluebird")

module.exports = (image) => {
    return new Promise( (resolve, reject) => {
      // pull the image
      docker.image(image, (err, stream) => {
          if (err) return reject(err)
          stream.on('data', chunk => { _pulling(chunk) })
          stream.on('end', () => {
              return resolve(true)
          })
      })
    })
}

let _pulling =  (event) => {
    event = JSON.parse(event.toString())
    let layers = []
    let complete = []
    if (event.status == "Pulling fs layer") {
        spinner.start(`${event.id} downloading...`)
        layers.push(event.id)
    }
    if (event.status == "Pull complete") {
        spinner.succeed(`${event.id} downloaded.`)
        complete.push(event.id)
    }
    if (event.status == "Already exists") {
        spinner.start(`${event.id} exists :)`)
        complete.push(event.id)
    }
    if (layers.length == complete.length) {

    }
}
