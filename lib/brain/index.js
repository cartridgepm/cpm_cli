const Promise = require('bluebird')
const _install = require('./install')
const utils = require('../../utils')
const ora = require('ora')
global.docker = new utils.docker({socketPath: '/var/run/docker.sock'})
global.spinner = ora()

const install = name => {
    spinner.start(`${name} loading...`)
    const _alias = (name.includes(':')) ? name.split(":")[0] : name
    let _config = {}
    // load the yaml file
    _install.load(name)
    .then( config => {
        spinner.succeed(`${_alias} loaded.`)
        config = utils.replace(config, /\$DIR/g, _install.dir(config.name))
        spinner.start(`Downloading ${_alias}....`)
        _config = config
        return _install.pull(config.image)
    })
    .then( done => {
        if (done) {
            spinner.succeed(`Downloading ${_alias}....`)
            spinner.start(`preparing ${_alias}....`)
            return _install.steps(_config)
        }
    })
    .then( done => {
        if (done) {
            spinner.succeed(`preparing ${_alias}....`)
            spinner.start(`Installing ${_alias}....`)
            return _install.script(_config)
        }
    }).then( done => {
        spinner.succeed(`Installing ${_alias}....`)
    }).catch( err => {
        console.log(err)
    })
}

module.exports = {
    install
}
