var express = require('express');
var fs = require('fs');
var multer  = require('multer');

var upload = multer({ dest: 'upload/'});
var app = express();

var type = upload.single('recfile');

app.use(express.static('public'));

/* Status indicates that new firmware need to update */
update = 'false'

app.get('/status', function(req, res) {
    status = update;
    update = 'false';
    res.send(status);
});

app.post('/pushFirmware', type, function(req, res) {
    update = 'true';

    var tmp_path = req.file.path;
    var target_path = '/uploads/' + req.file.originalname;

    var src = fs.createReadStream(tmp_path);
    var dest = fs.createWriteStream(target_path);
    src.pipe(dest);
    src.on('end', function() { res.send('complete'); });
    src.on('error', function(err) { res.send('error'); });
})

app.get('/pushFirmwarePage', function(req, res) {
    res.sendFile(__dirname + "/" + "views/index.html");
});

var server = app.listen(/*process.env.PORT*/5000, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
