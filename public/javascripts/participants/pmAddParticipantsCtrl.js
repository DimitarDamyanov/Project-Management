/**
 * Created by D on 11.6.2016 �..
 */
var AddParticipantsCtrl = function ($scope, userProfileService) {
    userProfileService.loadAllUserProfiles().then(function (succsess) {
        if (succsess) {
            $scope.profiles = userProfileService.getAllProfiles();
        }
    });
};

app.controller('AddParticipantsCtrl', ['$scope', 'userProfileService', AddParticipantsCtrl]);