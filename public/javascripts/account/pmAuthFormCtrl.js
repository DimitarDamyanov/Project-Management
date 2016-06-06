/**
 * Created by D on 11.2.2016 ã..
 */

var AuthFormController = function ($scope, $http, toastr, pmIdentity, pmAuth, $location) {
    $scope.identity = pmIdentity;
    $scope.signin = function (username, password) {
        pmAuth.authenticateUser(username, password).then(function (success) {
            if (success) {
                //$location.url(['/',$scope.identity.currentUser.profile,'/projects'].join(''));
                toastr.success('You have been successfully logged in! ');
            } else {
                toastr.error('Invalid combination of username/password!');
            }
        });
    };
    $scope.signout = function () {
        pmAuth.logoutUser().then(function () {
            $scope.username = '';
            $scope.password = '';
            $location.path('/');
        });
    };
};

app.controller('AuthFormController', ['$scope', '$http', 'toastr', 'pmIdentity', 'pmAuth', '$location', AuthFormController]);



