var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var multer = require('multer');
var crypto = require('crypto');
var mime = require('mime');
var multerConf = require('./config/multer.js')(multer, crypto, mime);
var app = express();

var User = require('./models/user');
var userProfileModel = require('./models/UserProfile');
var imgModel = require('./models/image');
var projectModel = require('./models/Project');
var taskModel = require('./models/Task');
var routes = require('./routes/index');
var users = require('./routes/users');
var partials = require('./routes/partials');
var project = require('./routes/project')(projectModel);
var authentication = require('./routes/auth')(User, userProfileModel);
var task = require('./routes/task')(taskModel);
var userProfile = require('./routes/userProfile')(userProfileModel);
var avatarUploadRoute = require('./routes/upload/avatar')(multerConf.profileAvatar(), User, userProfile, imgModel);

// view engine setup
app.set('views', [path.join(__dirname, 'views'), path.join(__dirname, '/public/javascripts')]);
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({secret: 'secret'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));
var db = mongoose.connect('mongodb://localhost/ProjectManagementDB');

app.use('/', routes);
app.use('/', partials);
app.use('/project', project);
app.use('/users', users);
app.use('/', authentication);
app.use('/task', task);
app.use('/user/profile', userProfile);
app.use('/upload', avatarUploadRoute);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.listen(80, '192.168.1.2', function () {
    console.log('Gulp Running on port:' + 3000);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
