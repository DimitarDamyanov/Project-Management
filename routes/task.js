/**
 * Created by D on 3.5.2016 ã..
 */
var express = require('express');

var routes = function (Task) {
    var router = express.Router();

    router.get('/', function (req, res, next) {
        Task.find({}, function (err, tasks) {
            res.json(tasks);
        });

    });

    return router;
};
module.exports = routes;
