/**
 * Primary file for the API
 * http and url library
 */

const PORT = process.env.PORT || 3000;

const http = require('http');
const url = require('url');

const server = http.createServer(function (req, res) {
    // get the url and parse it\
    // "true" -> invokes "query string" module
    const parseUrl = url.parse(req.url, true);

    // Get the url path
    // pathname alone is untrimmed
    // trimm regex -> /^\/+|\/+$/g, ''
    const urlPath = parseUrl.pathname;
    const trimmedPath = urlPath.replace(/^\/+|\/+$/g, '');

    res.end('Hello from the server\n');
    console.log(`path request: ${trimmedPath}`);
});

server.listen(PORT, function () {
    const message = `Listening on the port ${PORT}\n`
});