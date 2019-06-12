const redis = require('redis');
const config = require('./config');
const { createClient } = require('./redis-utils');

const sub = createClient();
sub.on("error", function (err) {
    console.log("Error " + err);
});

let msg_count = 0;

function shutdown() {
    if (sub) {
        sub.unsubscribe();
        sub.quit();
    }
}

sub.on("subscribe", function (channel, count) {
    console.log('Subscribed to channel');
});

sub.on("message", function (channel, message) {
    console.log("sub channel " + channel + ": " + message);
    msg_count += 1;
    
});

sub.subscribe(config.redis.channel);

process.on('SIGINT', function() {
    shutdown();
    process.exit();
});
