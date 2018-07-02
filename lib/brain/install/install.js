const exec = require('child_process').exec
const Promise = require("bluebird")

module.exports = config => {
    return new Promise((resolve, reject) => {
        if (config.install && Array.isArray(config.install.steps)) {
            config.install.steps.forEach((step, key) => {
                exec(`docker container run -v ${config.dir}:${config.dir} ${config.image} ${step}`, (error, stdout, stderr) => {
                    if (key == config.install.steps.length - 1) return resolve(true)
                });
            })
        } else if (config.install && Array.isArray(config.install.post)) {
            config.install.post.forEach((step, key) => {
                exec(step, (error, stdout, stderr) => {
                    if (key == config.install.post.length - 1) return resolve(true)
                });
            })
        } else if (config.install && Array.isArray(config.install.setenv)) {
            config.install.setenv.forEach((env, key) => {
                exec(`echo export ${env} >> $HOME/.cpm/bash.sh && export ${env}`, (error, stdout, stderr) => {
                    if (key == config.install.setenv.length - 1) return resolve(true)
                });
            })
        } else {
            return resolve(true)
        }

    })
}
