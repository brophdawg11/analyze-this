const redis = require('redis');
const config = require('./config');
const { createClient } = require('./redis-utils');

const pub = createClient();
pub.on("error", function (err) {
    console.log("Error " + err);
});

console.log('publishing message 1');
pub.publish(config.redis.channel, "I am sending a message.");

setTimeout(() => {
    console.log('publishing message 2');
    pub.publish(config.redis.channel, "I am sending a second message.");
}, 1000);

setTimeout(() => {
    console.log('publishing message 3');
    pub.publish(config.redis.channel, "I am sending my last message.");
}, 2000);

process.on('SIGINT', function() {
    pub.quit();
    process.exit();
});
