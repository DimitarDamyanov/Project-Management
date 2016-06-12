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
            assignTo: $scope.task.assignTo,
            completion: 0
        };
        ProjectService.pushNewTaskToProject(task);
    }

    $scope.participants = ProjectService.getSingleProject().participants;
};

app.controller('CreateTaskCtrl', ['$scope', '$http', 'ProjectService', createTaskController]);