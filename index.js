var http = require('http');

var server = http.createServer(function(req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/plain'
  });
  res.end('Hello World');
});

server.listen(process.env.PORT, '127.0.0.1');
