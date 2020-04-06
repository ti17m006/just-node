/**
 * Primary file for the API
 * http library
 */

const PORT = process.env.PORT || 3000;


const http = require('http');

// use http module to define what a server does
// responding to all requests

const server = http.createServer(function (req, res) {
    res.end('Server hello message\n');
});

// start the server and listen on specific port
server.listen(PORT, function () {
    console.log(`The server has started.\nListening on port ${PORT}`);
});

// exports;