/**
 * Created by D on 11.6.2016 �..
 */
var EmbUserProfile = function ($scope, userProfileService) {
    userProfileService.getProfileById($scope.profileId).then(function (success) {
        if (success) {
            $scope.profile = userProfileService.getProfile();
        }
    });
};

app.controller('EmbUserProfileCtrl', ['$scope', 'userProfileService', EmbUserProfile])
