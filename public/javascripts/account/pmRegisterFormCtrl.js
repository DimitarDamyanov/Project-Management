/**
 * Created by D on 11.2.2016 ã..
 */

var RegisterFormController = function ($scope, $http, toastr, pmIdentity, pmAuth, $location) {
    $scope.register = function () {
        pmAuth.registerUser($scope.user).then(function (success) {
            if (success) {
                $location.url("/profile")
            }
        });
    };


    $scope.validations = {
        username: {
            regex: /^[a-z0-9_-]{3,15}$/,
            message: "Invalid username!"
        },
        email: {},
        personalName: {
            regex: /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ]){3,15}$/,
            message: "Invalid personal name!"
        },
        password: {
            regex: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
            message: "Invalid personal password!"
        }
    };

};

app.controller('RegisterFormController', ['$scope', '$http', 'toastr', 'pmIdentity', 'pmAuth', '$location', RegisterFormController]);


