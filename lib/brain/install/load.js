const request = require('request')
const yaml = require('js-yaml')
const Promise = require('bluebird')

const _url = (name, branch) => {
    if (name.includes(":")) {
        return `https://raw.githubusercontent.com/cartridgepm/packages/${branch}/${name.split(":")[0]}/v${name.split(":")[1]}.yml`
    } else {
        return `https://raw.githubusercontent.com/cartridgepm/packages/${branch}/${name}/latest.yml`
    }
}
module.exports = (name, branch) => {
    return new Promise( (resolve, reject) => {
        request(_url(name, branch), (error, response, body) => {
          if (error || response.statusCode != 200) return reject(new Error(`Package not fount in ${branch}, use the default branch.`))
          yaml.safeLoadAll(body, (doc) => {
              return resolve(doc)
          })
        })
    })

}
