const _Docker = require('dockerode')

module.exports = class Docker {
    constructor(opts) {
        this.docker = new _Docker(opts);
    }
    image(name, callback) {
        this.docker.pull(name, (err, stream) => {
            if (!err) {
                return callback(null, stream)
            } else {
                return callback(err)
            }
    	});
    }
}
