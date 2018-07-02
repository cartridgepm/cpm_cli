const Promise = require('bluebird')
const _install = require('./install')
const utils = require('../../utils')
const ora = require('ora')
const fs = require('fs')

global.docker = new utils.docker({socketPath: '/var/run/docker.sock'})
global.spinner = ora()

const brain = {
    install: (name, options) => {
        spinner.start(`${name} loading...`)
        const _alias = (name.includes(':')) ? name.split(":")[0] : name
        let _config = {}
        // load the yaml file
        _install.load(name, options.branch || 'master')
        .then( config => {
            spinner.succeed(`${_alias} loaded.`)
            config = utils.replace(config, /\$DIR/g, _install.dir(config.dir || config.name))
            spinner.start(`Downloading ${_alias}....`)
            _config = config
            return _install.pull(config.image)
        })
        .then( done => {
            if (done) {
                spinner.succeed(`Downloading ${_alias}....`)
                spinner.start(`preparing ${_alias}....`)
                return _install.install(_config)
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
            if (_config.install && _config.install.instructions) Object.keys(_config.install.instructions).forEach( key => spinner[key](_config.install.instructions[key]))
        }).catch( err => {
            spinner.fail(err.toString())
            process.exit(1)
        })
    },
    remove : name => {
        spinner.start(`${name} removing...`)
        fs.unlink(`/usr/local/bin/${name}`, (err) => {
            if(err) spinner.fail(`Failed removing ${name}.`)
            else spinner.succeed(`${name} removed...`)
        })

    }
}




module.exports = brain
