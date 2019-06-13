const redis = require('redis');
const socketIo = require('socket.io');
const config = require('./config');
const { createClient } = require('./redis-utils');

// Create redis subscriber
const sub = createClient(redis);
sub.on("error", err => console.log("Error " + err));

// Create HTTP server
const app = require('http').createServer((req, res) => {
    res.writeHead(200);
    res.end();
});

// Wire up socket.io using the http server
const io = socketIo(app);

// Start the server
const port = config.dashboard.subscriberPort;
app.listen(port, () => {
    console.log(`Dashboard subscriber app listening on http://localhost:${port}...`);
});

io.on('connection', (socket) => {
    console.log('socket.io connection made')
    sub.on('message', (channel, message) => {
        console.log('Received subscription message, sending to client:', message);
        socket.emit(config.dashboard.socketEvent, JSON.parse(message));
    });
    sub.subscribe(config.redis.channel);
});

function shutdown() {
    if (sub) {
        sub.unsubscribe();
        sub.quit();
    }
    app.close(() => process.exit(0));
    setTimeout(() => {
        console.error('Server did not shut down properly...');
        process.exit(1);
    }, 3000);
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);