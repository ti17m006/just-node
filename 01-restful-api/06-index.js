
const PORT = process.env.PORT || 3000;

const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;

// create http server
const server = http.createServer(function (req, res) {

	// Get the URL and parse it
	// true is a parametar that
	const parsedUrl = url.parse(req.url, true);
	const path = parsedUrl.pathname;
	const trimmedPath = path.replace(/^\|\/+$/g, '');
	const queryStringObject = parsedUrl.query;
	const httpMethod = req.method.toLowerCase();
	const httpHeaders = req.headers;

	// Get the payload
	const decoder = new StringDecoder('utf-8');
	let buffer = '';
	req.on('data', function (data) {
		buffer += decoder.write(data);
	});
	req.on('end', function () {
		buffer += decoder.end();
		message = `Input {buffer}`;


		const currentHandler = typeof(router[trimmedPath] !== 'undefined') ? router[trimmedPath] : handlers.notFound;

		const data = {
			'trimmedPath': trimmedPath,	
			'quertStringObject' : queryStringObject,
			'method': method,
			'headers' : headers,
			'payload': buffer
		};

		currentHandler(data, function(statusCode, payoad) {
		
			statusCode = typeof(statusCode) == 'number' ? statusCode : 200;
			payload = typeof(payload) == 'object' ? payload : {};

			// payload that is responding
			const payloadString = JSON.stringify(payload);

			res.writeHeas(statusCode);
			res.end(payload);
			console.log(`Response:\n status code: ${statusCode}\n payload ${payloadString}`);
		});
		
		// res.end(message);
		// console.log(message);
	});
});


// run the server
server.listen(PORT, function () {
	console.log(`Server is running on a port ${PORT}`);
});

const handlers = {};


handlers.first = function (data, callback) {
	// Callback a http status code, and a payload object
	callback(200, {
		'name' : 'first handler'
	});
};

handlers.second = function (data, callback) {
	callback(200, {
		'name' : 'second handler'
	});
};

handlers.notFound = function (data, callback) {
	callback(404);
};


// define a request router

const router = {
	'first': handlers.first,
	'second': handlers.second
}
