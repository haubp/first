// const express = require('express')
// const path = require('path')
// const PORT = process.env.PORT || 5000

// doUpdate = "false"

// express()
//   .use(express.static(path.join(__dirname, 'public')))
//   .set('views', path.join(__dirname, 'views'))
//   .set('view engine', 'ejs')
//   .get('/', (req, res) => res.send(doUpdate))
//   .listen(PORT, () => console.log(`Listening on ${ PORT }`))

var express = require('express');
var app = express();

app.get('/', function(req, res) {
    res.send('Hi there');
})

var server = app.listen(process.env.PORT, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
})
