// Simple internal ping function caller

const http = require('http');

const req = http.request({
	host: 'localhost',
	port: '4001',
	path: '/ping',
	method: 'POST',
	headers: {
		'Content-Type': 'application/json',
		'Content-Length': 0
	}
}, res => {
	res.on('data', d => {
		process.stdout.write(d)
	});
});

req.on('error', error => {
	console.error(error)
});

req.end();