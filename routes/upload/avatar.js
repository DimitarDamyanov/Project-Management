/**
 * Created by D on 15.3.2016 ã..
 */

var express = require('express'),
    Jimp = require('jimp');

var routes = function (upload, User, UserProfile, Image) {
    var router = express.Router();
    router.post('/avatar/image', upload.single('file'), function (req, res, next) {
        //find configuration
        var img = new Image({name: req.file.filename, title: 'Anonymous', mimetype: req.file.mimetype});
        console.log(req.file);
        resizeImg(req.file.path, req.file.destination, req.file.filename);
        console.log('image saved and resized');

        img.save(function (err, img) {
            if (err) {
                res.status(400).send({"error": "Error occurred while saving the avatar!"});
            }
            console.log('Image with id ' + img._id + ' saved!');
            res.json(img);
        });
    });

    return router;
};


function resizeImg(path, destination, name) {
    var dest = [destination, '/', 'sm-', name].join('');
    console.log(dest);
    Jimp.read(path).then(function (img) {
        img.resize(30, 30) // resize
            .write(dest); // save
    }).catch(function (err) {
        console.error(err);
    });
}


module.exports = routes;

