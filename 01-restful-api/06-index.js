
const PORT = process.env.PORT || 3000;

const http = require('http');


// create http server
const server = http.createServer(function (req, res) {

});


// run the server
server.listen(PORT, function () {
	console.log(`Server is running on a port {PORT}`);
});
