const express   = require('express');
const fs        = require('fs');
const multer    = require('multer');
const path      = require('path');
const logger    = require('morgan');
const cors      = require('cors');
const cookieParser  = require('cookie-parser');
const bodyParser    = require('body-parser');
const fileUpload    = require('express-fileupload');

var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(fileUpload());
app.use('/public', express.static(__dirname + '/public'));

 /* Status indicates that new firmware need to update */
update = 'alluptodate';
version = ''

/* Handle POST new firmware coming */
app.post('/upload', (req, res) => {
	let imageFile = req.files.file;

    imageFile.mv(`${__dirname}/public/firmware.bin`, function(err) {
        if (err) {
            return res.status(500).send(err);
        }

        /* Handle which ECU need to update */
        switch(req.body.id) 
        {
        case '1':
            update = 'ecu_1';
            break;
        case '2':
            update = 'ecu_2';
            break;
        case '3':
            update = 'ecu_3';
            break;
        case '4':
            update = 'ecu_4';
            break;
        }

        version = req.body.version;

        res.json({message: 'Firmware saved'});
    });
 });

/* Handle POST new image coming */
app.post('/uploadimg', (req, res) => {
    let imageFile = req.files.file;

    imageFile.mv(`${__dirname}/public/image.jpeg`, function(err) {
        if (err) {
            return res.status(500).send(err);
        }

        res.json({message: 'Image saved'});
    });

    update = 'having_image';
 });

/* Get Status Update Firmware */
app.get('/status', function(req, res) {

    status = update;

    update = 'alluptodate';

    res.json({status: status, version: version})
});

app.listen(process.env.PORT, () => {
    console.log('start');
});
