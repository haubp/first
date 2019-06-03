var express = require('express');
var app = express();

update = 'false'

app.get('/status', function(req, res) {
    status = update;
    update = 'false';
    res.send(status);
});

app.post('/pushFirmware', function(req, res) {
    update = 'true';

    // Save new firmware


    res.send('saved new firmware');
});

app.get('/pushFirmwarePage', function(req, res) {
    res.sendFile(__dirname + "/" + "views/index.html");
});

app.use(express.static('public'));

var server = app.listen(process.env.PORT, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
