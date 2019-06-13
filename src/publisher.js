const redis = require('redis');
const express = require('express')
const bodyParser = require('body-parser')
const config = require('./config');
const { createClient } = require('./redis-utils');

// Create express app
const app = express()
const port = config.publisher.port

// Create redis publisher client
const pub = createClient(redis);
pub.on("error", err => console.log("Error " + err));

// Parse incoming application/json post body payloads to JSON
app.use(bodyParser.json())

// Publish POST API calls to redis
app.post('/event', (req, res) => {
    console.log('Event received, publishing to redis')
    pub.publish(config.redis.channel, JSON.stringify(req.body));
    res.send();
})

// Start the server
app.listen(port, () => {
    console.log(`Publisher app listening on http://localhost:${port}...`);
})

function shutdown() {
    if (pub) {
        pub.quit();
    }
    app.close(() => process.exit(0));
    setTimeout(() => {
        console.error('Server did not shut down properly...');
        process.exit(1);
    }, 3000);
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
