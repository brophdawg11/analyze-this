const config = require('./config');

function createClient(redis) {
    return redis.createClient({
        host: config.redis.hostName,
        port: config.redis.port,
    });
}

module.exports = {
    createClient,
};
