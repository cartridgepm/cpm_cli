const exec = require('child_process').exec
const Promise = require("bluebird")

module.exports = config => {
  return new Promise( (resolve, reject) => {
      if (Array.isArray(config.install.steps)) {
          config.install.steps.forEach( (step, key) => {
              exec(`docker container run -v ${config.dir}:${config.dir} ${config.image} ${step}`, (error, stdout, stderr) => {
                  if (key == config.install.steps.length-1) return resolve(true)
                });
          })
      } else {
          return resolve(true)
      }

  })
}
