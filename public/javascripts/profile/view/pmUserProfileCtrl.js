/**
 * Created by D on 27.5.2016 ã..
 */
var UserProfileCtrl = function ($scope, $routeParams, userProfileService) {
    var id = $routeParams.param;
    userProfileService.getProfileById(id).then(function (success) {
        if (success) {
            $scope.profile = userProfileService.getProfile();
        }
    });
};

app.controller('UserProfileCtrl', ['$scope', '$routeParams', 'userProfileService', UserProfileCtrl]);