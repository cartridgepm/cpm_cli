const fs = require('fs-extra')
const exec = require('child_process').exec

let docker_cmd = config => {
  let _script = 'docker container run'
  let _docker = config.docker
  if (_docker.args) {
    if (_docker.args.rm) _script += ' --rm'
    if (_docker.args.it) _script += ' -it'
    if (_docker.args.volumes) {
      _docker.args.volumes.forEach( volume => {
        _script += ` -v ${volume}`
      })
    }
    if (_docker.args.environment && _docker.args.environment.length > 1) {
      _docker.args.environment.forEach( env => {
        if (env != '') _script += ` -e ${env}`
      })
    }
    if (_docker.args.network) {
      if (_docker.args.network.mode) _script += ` --network ${_docker.args.network.mode}`
    }
    _script += ` ${config.image} ${_docker.args.command}`
  }
  return _script
}

module.exports = config => {
    return new Promise( (resolve, reject) => {
      let _script = `${docker_cmd(config)} $*`
      fs.writeFile(`/usr/local/bin/${config.alias}`, _script, 'utf-8', (err) => {
        if (err) return reject(err)
        exec(`chmod +x /usr/local/bin/${config.alias}`)
        return resolve(true)
      })
    })
}
