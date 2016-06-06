/**
 * Created by D on 15.5.2016 ã..
 */
var express = require('express');

var routes = function (UserProfile) {
    var router = express.Router();

    router.get('/', function (req, res, next) {
        UserProfile.find({}, function (err, profiles) {
            res.json(profiles);
        });
    });

    router.get('/:id', function (req, res, next) {
        console.log(req);
        UserProfile.findOne({_id: req.params.id}, function (err, profile) {
            if (err)
                res.status(400).send({error: "Error occurred while getting profile."});
            res.json(profile);
        }).populate('avatar');
    });

    router.put('/:id', function (req, res, next) {
        console.log(req.body);
        UserProfile.findOne({_id: req.params.id}, function (err, profile) {
            if (err)
                res.status(400).send({error: "Error occurred while getting profile."});
            profile.phone = req.body.phone;
            profile.avatar = req.body.avatar;
            profile.position = req.body.position;
            profile.email = req.body.email;
            profile.name = req.body.name;
            profile.save(function (err, profile) {
                if (err)
                    res.status(400).send({error: "Error occurred while getting profile."});
                res.json(profile);
            });
        });
    });


    return router;
};
module.exports = routes;
