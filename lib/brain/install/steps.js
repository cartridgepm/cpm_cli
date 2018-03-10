const exec = require('child_process').exec
const Promise = require("bluebird")

module.exports = config => {
  return new Promise( (resolve, reject) => {
    config.install.steps.forEach( step => {
        exec(`docker container run -v ${config.dir}:${config.dir} -it ${config.image} ${step}`)
    })
    return resolve(true);
  })
}
