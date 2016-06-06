/**
 * Created by D on 29.4.2016 ã..
 */
var createProjectController = function ($scope, $http, $location, ProjectService, userProfileService) {
    $scope.project = {};

    $scope.validations = {
        name: {
            message: "Invalid project name!",
            regex: /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ]){3,50}$/
        },
        description: {
            message: "Invalid project description!",
            regex: /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-,]){0,500}$/
        }
    };


    $scope.saveProject = function () {
        ProjectService.saveProject($scope.project).then(function (data) {
            if (data) {
                var path = ['/project', data._id].join('/');
                $location.url(path);
            }
        });
    };

    userProfileService.loadAllUserProfiles().then(function (succsess) {
        if (succsess) {
            $scope.profiles = userProfileService.getAllProfiles();
        }
    });

    $scope.project.participants = [];
    //$scope.addParticipant = function(index){
    //    $scope.project.participants.push( $scope.profiles[index]);
    //    $scope.profiles.splice(index, 1);
    //};

    $scope.addParticipant = function (profile) {
        if (profile) {
            try {
                $scope.project.participants.push(profile);
            } catch (err) {
                console.log("Duplicated records!");
            }

        }

        // $scope.profiles.splice(index, 1);
    };

    $scope.removeParticipant = function (index) {
        $scope.profiles.push($scope.project.participants[index]);
        $scope.project.participants.splice(index, 1);
    }
};

app.controller('CreateProjectCtrl', ['$scope', '$http', '$location', 'ProjectService', 'userProfileService', createProjectController]);