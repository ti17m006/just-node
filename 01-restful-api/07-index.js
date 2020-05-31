const port = process.env.PORT || 3000;

const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;

// handlers

handlerFirst = (callback) => {
    callback(200, {
        'name': 'first handler'
    });
}

handlerSecond = (callback) => {
    callback(200, {
        'name': 'second handler'
    });
}

handlerNotFound = (callback) => {
    callback(404, {
        'name': 'Not found'
    });
}

const router = {
    'first': handlerFirst,
    'second': handlerSecond
}

// create server

const server = http.createServer((req, res) => {

    const parsedUrl = url.parse(req.url, true);
    const trimmedPath = parsedUrl.pathname.replace(/^\/+|\/+$/g, '');
    const queryString = parsedUrl.query;

    const httpMethod = req.method.toLowerCase();
    const httpHeaders = req.headers;

    const decoder = new StringDecoder('utf-8');

    let buffer = new String();
    req.on('data', (data) => {
        buffer += decoder.write(data);
    });
    req.on('end', () => {
        buffer += decoder.end();
        let message = `Input ${buffer}`;

        const currnetHandler = typeof (router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlerNotFound;

        const data = {
            'trimmedPath': trimmedPath,
            'queryString': queryString,
            'method': httpMethod,
            'headers': httpHeaders,
            'payload': buffer
        };

        currnetHandler((statusCode, payload) => {
            statusCode = typeof (statusCode) == 'number' ? statusCode : 200;
            payload = typeof (payload) == 'object' ? payload : new String();
            const payloadString = JSON.stringify(payload);
            //
            res.setHeader('Content-Type', 'application/json');
            //
            res.writeHead(statusCode);
            res.end(payloadString);
            console.log(`Response:\n status code: ${statusCode}\n payload ${payloadString}`);
        });
    });
});


// listen 
server.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});
