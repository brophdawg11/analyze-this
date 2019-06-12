const redis = require('redis');
const config = require('./config');
const { createClient } = require('./redis-utils');

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = config.publisher.port

const pub = createClient();
pub.on("error", function (err) {
    console.log("Error " + err);
});

// console.log('publishing message 1');
// pub.publish(config.redis.channel, "I am sending a message.");

// setTimeout(() => {
//     console.log('publishing message 2');
//     pub.publish(config.redis.channel, "I am sending a second message.");
// }, 1000);

// setTimeout(() => {
//     console.log('publishing message 3');
//     pub.publish(config.redis.channel, "I am sending my last message.");
// }, 2000);

app.use(bodyParser.json())

app.get('/', (req, res) => res.send('Hello World!'))

app.post('/event', (req, res) => {
    pub.publish(config.redis.channel, JSON.stringify(req.body));
    //console.log(req.body);
    res.send();
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

process.on('SIGINT', function() {
    pub.quit();
    process.exit();
});
