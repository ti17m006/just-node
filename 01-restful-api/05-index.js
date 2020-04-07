/** 
*	Working with payload
*/


const PORT = process.env.PORT || 3000;

const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;
const decoder = new StringDecoder('utf-8');

const server = http.createServer(function (req, res) {

	const parsedUrl = url.parse(req.url, true);
	const path = parsedUrl.pathname;
	const trimmedPath = path.replace(/^\/+|\/+$/g , '');
	const queryStringObject = parsedUrl.query;
	const method = req.method.toLowerCase();
	const headers = req.headers;

	let buffer = '';
	// request object emits the event "data"
	// on the event called "data"
	req.on('data', function (data) {
		buffer += decoder.write(data);
	});
	
	// event "end" means the event is done
	req.on('end', function () {
		buffer += decoder.end();

		// handler of "end" event
		// const output = buffer;
		res.end(buffer);
	});
});

server.listen(PORT, function () {
	console.log(`Listening on port: ${PORT}`);
});
