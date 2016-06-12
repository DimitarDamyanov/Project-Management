/**
 * Created by D on 11.2.2016 ã..
 */
var express = require('express');
var passport = require('passport');
var rv = require('../validation/RequestValidations.js')();

var routes = function (User, UserProfile) {
    var router = express.Router();

    router.use(function (req, res, next) {
        var url = req.originalUrl;
        switch (url) {
            case  '/login' :
                //perform validation of the login data
                next();
                break;
            case '/register' :
                //perform validation of the registration data
                (rv.UserRegistrationValidation.validate(req)) ? next() : res.status(400).json({message: "Invalid  request!"});


                break;
            case '/check/username' :
                //perform validation of the username
                var usernameRegex = /^[a-z0-9_-]{3,15}$/;
                var username = req.body.username;
                if (username && username.match(usernameRegex)) {
                    next();
                } else {
                    res.status(400).json({message: "Invalid  username!"});
                }

                break;
            default :
                next();
        }
    });

    router.post('/login', function (req, res, next) {
        var auth = passport.authenticate('local', function (err, user) {
            if (err) {
                return next(err)
            }
            if (!user) {
                res.send({success: false})
            }
            req.logIn(user, function (err) {
                res.send({success: true, user: user});
            });
        });
        auth(req, res, next);
    });

    router.post('/logout', function (req, res, next) {
        req.logout();
        res.end();
    });

    router.post('/register', function (req, res, next) {
        //validate the incoming information
        var userProfile = new UserProfile(req.body.profile);
        //set default avatar
        userProfile.avatar = "574b480bd40603181e2a346a";
        userProfile.save(function (err, profile) {
            if (err) {
                res.status(412);
                res.json({error: "User profile cannot be saved!"});
            } else {
                var user = new User({
                    username: req.body.username,
                    profile: profile
                });
                var u = user.register(req.body.password);
                u.save(function (err, user) {
                    if (err) {
                        res.status(412);
                        res.json({error: "User with this username exists!"});
                    } else {
                        var auth = passport.authenticate('local', function (err, user) {
                            if (err) {
                                return next(err)
                            }
                            if (!user) {
                                res.send({success: false})
                            }
                            req.logIn(user, function (err) {
                                res.send({success: true, user: user});
                            });
                        });
                        auth(req, res, next);
                        //res.json({message: "User successfully registered!"}, user);
                    }
                });
            }
        });
    });

    router.post('/check/username', function (req, res, next) {
        User.count({username: req.body.username}, function (err, count) {
            if (err) res.status(401).json({message: "Unexpected error occurred!"});
            count == 0 ? res.json({"registered": false}) : res.json({"registered": true});
        });

    });
    return router;
};

module.exports = routes;
