const redis = require('redis');
const socketIo = require('socket.io');
const config = require('./config');

// Create redis subscriber
const sub = redis.createClient({
    host: config.redis.hostName,
    port: config.redis.port,
});
sub.on("error", err => console.log("Error " + err));

// Create HTTP server
const app = require('http').createServer((req, res) => {
    res.writeHead(200);
    res.end();
});

// Wire up socket.io using the http server
const io = socketIo(app);

// Start the server
const port = config.sitespect.subscriberPort;
app.listen(port, () => {
    console.log(`DY subscriber app listening on http://localhost:${port}...`);
});

io.on('connection', (socket) => {
    console.log('socket.io connection made')
    sub.on('message', (channel, message) => {
        const parsed = JSON.parse(message)
        if (parsed.type === 'rec-tray-click') {
            console.log('Received subscription message, sending to client:', parsed);
            socket.emit(config.sitespect.socketEvent, parsed);
        } else {
            console.log('Ignoring subscription message:', parsed);
        }
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
