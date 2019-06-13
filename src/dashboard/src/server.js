const path = require('path');
const express = require('express')
const config = require('../../config');

const { port } = config.dashboard;
const app = express();

app.use('/static/', express.static(path.resolve(__dirname, '../dist/')));
app.use('/favicon.ico', (req, res) => res.send());
app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../dist/index.html')));
app.listen(port, () => {
    console.log(`Dashboard web app listening on http://localhost:${port}...`);
});

function shutdown() {
    console.log('Received kill signal, shutting down gracefully');
    app.close(() => process.exit(0));
    setTimeout(() => {
        console.error('Server did not shut down properly...');
        process.exit(1);
    }, 3000);
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
