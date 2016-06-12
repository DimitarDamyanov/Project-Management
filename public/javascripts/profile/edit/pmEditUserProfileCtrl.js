/**
 * Created by D on 27.5.2016 ã..
 */
var EditUserProfileCtrl = function ($scope, $location, FileUploader, pmIdentity, userProfileService) {
    //load profile
    userProfileService.getProfileById(pmIdentity.currentUser.profile).then(function (success) {
        if (success) {
            $scope.profile = userProfileService.getProfile();
        }
    });

    $scope.updateProfile = function () {
        userProfileService.updateProfile($scope.profile);
        $location.url('/project/all');
    };
    var uploader = $scope.uploader = new FileUploader({
        url: 'upload/avatar/image'
    });

    uploader.filters.push({
        name: 'imageFilter',
        fn: function (item /*{File|FileLikeObject}*/, options) {
            var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        }
    });

    uploader.onCompleteItem = function (item, response, status, headers) {
        if (status == 200) {
            $scope.profile.avatar = response;
        }

    };

    $scope.uploader.uploadAvatar = function () {
        uploader.uploadAll();
    }

    $scope.phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
};

app.controller('EditUserProfileCtrl', ['$scope', '$location', 'FileUploader', 'pmIdentity', 'userProfileService', EditUserProfileCtrl]);