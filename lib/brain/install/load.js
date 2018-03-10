const request = require('request')
const yaml = require('js-yaml')
const Promise = require('bluebird')

const _url = name => {
    if (name.includes(":")) {
        return `https://raw.githubusercontent.com/cartridgepm/packages/master/${name.split(":")[0]}/v${name.split(":")[1]}.yml`
    } else {
        return `https://raw.githubusercontent.com/cartridgepm/packages/master/${name}/latest.yml`
    }
}
module.exports = name => {
    return new Promise( (resolve, reject) => {
        request(_url(name), (error, response, body) => {
          if (error) return reject(error)
          yaml.safeLoadAll(body, (doc) => {
              return resolve(doc)
          })
        })
    })

}
