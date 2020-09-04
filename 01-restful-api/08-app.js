const url = require('url');
const stringDecoder = require('string_decoder').StringDecoder;

// handlers

handlerFirst = (data, callback) => {
    // Callback a http status code, and a payload object
    callback(200, {
        'name': '8 - first handler'
    });
};

handlerSecond = (data, callback) => {
    // Callback a http status code, and a payload object
    callback(200, {
        'name': '8 - second handler'
    });
};

handlerNotFound = (data, callback) => {
    // Callback a http status code, and a payload object
    callback(404, {
        'name': '8 - not found handler'
    });
};

const router = {
    'first': handlerFirst,
    'second': handlerSecond
};

module.exports.app = function (req, res) {
    const parsedUrl = url.parse(req.url, true);
    const trimmedPath = parsedUrl.pathname.replace(/^\/+|\/+$/g, '');
    const queryString = parsedUrl.query;

    const httpMethod = req.method.toLowerCase();
    const httpHeaders = req.headers;

    const decoder = new stringDecoder('utf-8');

    let buffer = new String();
    req.on('data', (data) => {
        buffer += decoder.write(data);
    });
    req.on('end', () => {
        buffer += decoder.end();
        //  console.log(`Input ${buffer}`);
        const currnetHandler = typeof (router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlerNotFound;

        const data = {
            'trimmedPath': trimmedPath,
            'queryString': queryString,
            'method': httpMethod,
            'headers': httpHeaders,
            'payload': buffer
        };

        currnetHandler(data, (statusCode, payload) => {
            statusCode = typeof (statusCode) == 'number' ? statusCode : 200;
            payload = typeof (payload) == 'object' ? data.payload : new String();
            const payloadString = JSON.stringify(payload);
            //
            res.setHeader('Content-Type', 'application/json');
            //
            res.writeHead(statusCode);
            res.end(payload);
            console.log(`Response:\n status code: ${statusCode}\n payload ${payload}`);
        });
    });

}