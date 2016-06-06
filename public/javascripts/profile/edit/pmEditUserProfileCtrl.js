/**
 * Created by D on 27.5.2016 ã..
 */
var EditUserProfileCtrl = function ($scope, FileUploader, pmIdentity, userProfileService) {
    //load profile
    userProfileService.getProfileById(pmIdentity.currentUser.profile).then(function (success) {
        if (success) {
            $scope.profile = userProfileService.getProfile();
        }
    });

    $scope.updateProfile = function () {
        userProfileService.updateProfile($scope.profile);
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

    //$scope.uploader.onBeforeUploadItem = onBeforeUploadItem;
    //
    //function onBeforeUploadItem(item) {
    //    item.formData.push({userid: gpIdentity.currentUser._id});
    //}

    uploader.onCompleteItem = function (item, response, status, headers) {
        if (status == 200) {
            $scope.profile.avatar = response;
        }

    };

    $scope.uploader.uploadAvatar = function () {
        uploader.uploadAll();
    }


};

app.controller('EditUserProfileCtrl', ['$scope', 'FileUploader', 'pmIdentity', 'userProfileService', EditUserProfileCtrl]);