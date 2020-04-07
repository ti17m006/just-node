/** */

const PORT = process.env.PORT || 3000;

const http = require('http');
const url = require('url');

const server = http.createServer(function (req, res) {

	const parsedUrl = url.parse(req.url, true);
	const path = parsedUrl.namepath;
	const trimmedPath = path.replace(/^\/+|\/+$/g , '');
	
	const queryStringObject = parsedUrl.query;
	const method = req.method.toLoweCase();
	const headers = req.headers;
	const body = req.body;
	
	
	const output = 'output';
	res.end(output);
	console.log();
});

server.listen(PORT, function () {
	console.log(`Listening on port: ${PORT}`);
});
