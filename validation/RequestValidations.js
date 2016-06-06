/**
 * Created by D on 5.6.2016 ã..
 */
var usernameRegex = /^[a-z0-9_-]{3,15}$/;
var passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
var personalName = /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ]){3,15}$/;

var RequestValidations = function () {
    var username = function (username) {
        if (username && typeof username === 'string' && username.match(usernameRegex)) {
            return true;
        } else {
            return false;
        }
    }

    var password = function (pwd) {
        if (pwd && typeof pwd === 'string' && pwd.match(passwordRegex)) {
            return true;
        } else {
            return false;
        }
    }

    var pName = function (name) {
        if (name && typeof name === 'string' && name.match(personalName)) {
            return true;
        } else {
            return false;
        }
    }

    var UserRegistrationValidation = {
        validate: function (req) {
            return (username(req.body.username) && password(req.body.password) && req.body.profile && pName(req.body.profile.name))
        }
    }

    return {
        UserRegistrationValidation: UserRegistrationValidation
    }

};

module.exports = RequestValidations;