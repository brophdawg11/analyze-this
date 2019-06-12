const redis = require('redis');
const config = require('./config');

function createClient() {
    return redis.createClient({
        host: config.redis.hostName,
        port: config.redis.port,
    });
}

module.exports = {
    createClient,
};
