/**
 * Created by D on 29.4.2016 ã..
 */
var projectController = function ($scope, $http, ProjectService) {
    ProjectService.retrieveProjects().then(function (success) {
        $scope.projects = ProjectService.getProjects();
        $scope.projects.forEach(function (project) {
            project.progress = ProjectService.calculateProgress(project);
            project.progressBarType = (project.progress > 75) ? 'success' : (project.progress > 50 ? 'info'
                : (project.progress > 25 ? 'warning' : 'danger'));
        });
    });

    $scope.filter = 'name';

    $scope.filterOptions = [{label: 'Name', value: 'name'}, {
        label: 'Description',
        value: 'description'
    }, {label: 'Time', value: 'overallTime'}, {label: 'Participants', value: 'participants'}]

};

app.controller('ProjectCtrl', ['$scope', '$http', 'ProjectService', projectController]);