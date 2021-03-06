
const PORT = process.env.PORT || 3000;

const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;


/***************************************************************/
let handler = {}

handler.first = function (data, callback) {
	// Callback a http status code, and a payload object
	callback(200, {
		'name': 'first handler'
	});
};

handler.second = function (data, callback) {
	callback(200, {
		'name': 'second handler'
	});
};

function notFound(data, callback) {
	callback(404);
};


// define a request router

const router = {
	'first': handler.first,
	'second': handler.second
};

/***************************************************************/

// create http server
const server = http.createServer(function (req, res) {

	// Get the URL and parse it
	// true is a parametar that
	const parsedUrl = url.parse(req.url, true);
	const path = parsedUrl.pathname;
	const trimmedPath = path.replace(/^\/+|\/+$/g, '');
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


		const currentHandler = typeof (router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : notFound;

		const data = {
			'trimmedPath': trimmedPath,
			'quertStringObject': queryStringObject,
			'method': httpMethod,
			'headers': httpHeaders,
			'payload': buffer
		};


		currentHandler(data, function (statusCode, payload) {
			statusCode = typeof (statusCode) == 'number' ? statusCode : 200;
			payload = typeof (payload) == 'object' ? payload : new String();

			// payload that is responding - must be a string!
			const payloadString = JSON.stringify(payload);

			res.writeHead(statusCode);
			res.end(payloadString);
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
