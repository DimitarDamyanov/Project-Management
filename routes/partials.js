/**
 * Created by D on 29.4.2016 ã..
 */
var express = require('express');
var router = express.Router();

router.get('/partials/*', function (req, res) {
    res.render(req.params[0]);
});

module.exports = router;