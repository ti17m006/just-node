

const PORT = process.env.PORT || 3000;

const http = require('http');
const url = require('url');

const server = http.createServer(function (req, res) {

	const parsedUrl = url.parse(req.url, true);
	const path = parsedUrl.pathname;
	const trimmedPath = path.replace(/^\/+|\+$/g, '');

	const queryStringObject = parsedUrl.query;
	const method = req.method.toLowerCase();
	
	const output = `\nTrimmed path: ${trimmedPath}\nmethod: ${method}\n`;
	res.end(output);
	console.log(output);
	
});

server.listen(PORT, function () {
	console.log(`App started\n Listening on a port: ${PORT}`);
});
