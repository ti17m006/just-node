// http server

const port = process.env.PORT || 3000;
const http = require('http');

const app = require('./08-app').app;

const server = http.createServer((req, res) => {
    app(req, res);
});

server.listen(port, () => {
    console.log(`Listening on port ${port}`);
});