/**
 * Created by D on 29.4.2016 ã..
 */
var editProjectController = function ($scope, $http, $location, $routeParams, ProjectService) {
    var projectId = $routeParams.param;
    $scope.showCreateTaskPanel = function () {
        return false;
    };


    $scope.removeTask = function (task) {
        ProjectService.removeTaskFromProject(task);
    };

    $scope.updateProject = function () {
        //var project = ProjectService.getSingleProject();
        ProjectService.updateProject($scope.project).then(function (result) {
            if (result !== false) {
                var path = ['/project', result._id].join('/');
                $location.path(path);
            } else {
                console.log('Error occurred!')
            }

        });
    };

    ProjectService.retrieveSingleProjectsById(projectId).then(function (success) {
        $scope.project = ProjectService.getSingleProject();
    });

    $scope.deleteProject = function () {
        ProjectService.deleteProjectById($scope.project._id);
        $location.path('/project/all');
    }
};

app.controller('EditProjectCtrl', ['$scope', '$http', '$location', '$routeParams', 'ProjectService', editProjectController]);