const redis = require('redis');
const config = require('./config');
const { createClient } = require('./redis-utils');

const sub = createClient(redis);

sub.on("error", err => console.log("Error " + err));

sub.on("message", (channel, message) => {
    console.log('Received message:', message);
});

sub.subscribe(config.redis.channel);

console.log('Console subscriber app subscribed');

function shutdown() {
    if (sub) {
        sub.unsubscribe();
        sub.quit();
    }
    process.exit();
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
