const path = require('path');
const express = require('express')
const redis = require('redis');
const socketIo = require('socket.io');
const config = require('../../config');
const { createClient } = require('../../redis-utils');

const sub = createClient(redis);
const app = express()
const port = config.dashboard.port

app.use('/static/', express.static(path.resolve(__dirname, '../dist/')));
app.use('/', (req, res) => {
    const indexFile = path.join(__dirname, '../dist/index.html');
    console.log('Serving index.html', indexFile);
    res.sendFile(indexFile);
});

const server = require('http').createServer(app);
const io = socketIo(server);
io.on('connection', function (socket) {
    sub.on("error", function (err) {
        console.log("Error " + err);
    });

    sub.on("subscribe", function (channel, count) {
        console.log('Subscribed to channel');
    });

    sub.on("message", function (channel, message) {
        console.log('Emitting message over socket');
        socket.emit('anaytics-event', JSON.parse(message));
    });

    sub.subscribe(config.redis.channel);
});


server.listen(port, () => console.log(`Dashboard app listening on port ${port}!`))

function shutdown() {
    console.log('Received kill signal, shutting down gracefully');
    if (sub) {
        sub.unsubscribe();
        sub.quit();
    }
    server.close(() => process.exit(0));
    setTimeout(() => {
        console.error('Server did not shut down properly...');
        process.exit(1);
    }, 3000);
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
