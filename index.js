var express = require('express');
var fs = require('fs');
var multer  = require('multer');

var app = express();

var upload = multer({ dest: 'upload/'});
var type = upload.single('myfile');

app.use(express.static('public'));

/* Status indicates that new firmware need to update */
update = 'alluptodate'

app.get('/status', function(req, res) {
    status = update;
    update = 'alluptodate';
    res.send(status);
});

app.post('/pushFirmware', type, function(req, res) {

    var tmp_path = req.file.path;
    var target_path = './public/firmware/firmware.bin';

    console.log(req.file.originalname);
    switch(req.file.originalname)
    {
        case 'ecu_1_ver1.bin':
        case 'ecu_1_ver2.bin':
            update = 'ecu1';
            break;
        case 'ecu_2_ver1.bin':
        case 'ecu_2_ver2.bin':
            update = 'ecu2';
            break;
        case 'ecu_3_ver1.bin':
        case 'ecu_3_ver2.bin':
            update = 'ecu3';
            break;
        case 'ecu_4_ver1.bin':
        case 'ecu_4_ver2.bin':
            update = 'ecu4';
            break;
    }

    var src = fs.createReadStream(tmp_path);
    var dest = fs.createWriteStream(target_path);
    src.pipe(dest);
    src.on('end', function() { res.send('complete'); });
    src.on('error', function(err) { res.send('error'); });
})

app.get('/pushFirmwarePage', function(req, res) {
    res.sendFile(__dirname + "/" + "views/index.html");
});

var server = app.listen(process.env.PORT, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
