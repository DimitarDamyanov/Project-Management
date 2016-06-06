/**
 * Created by D on 29.4.2016 ã..
 */
var createTaskController = function ($scope, $http, ProjectService) {
    $scope.task = {};

    $scope.addToProject = function () {
        var task = {
            name: $scope.task.name,
            description: $scope.task.description,
            overallTime: $scope.task.overallTime,
            priority: $scope.task.priority,
            status: 'New',
            completion: 0
        };
        ProjectService.pushNewTaskToProject(task);
    }
};

app.controller('CreateTaskCtrl', ['$scope', '$http', 'ProjectService', createTaskController]);