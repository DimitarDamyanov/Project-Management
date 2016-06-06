/**
 * Created by D on 29.4.2016 ã..
 */
var userProjectController = function ($scope, $http, $location, $routeParams, ProjectService) {
    var profile = $routeParams.param;
    console.log(profile);
    ProjectService.retrieveUsersProjects(profile).then(function (success) {
        $scope.projects = ProjectService.getProjects();
        $scope.projects.forEach(function (project) {
            project.progress = ProjectService.calculateProgress(project);
            project.progressBarType = (project.progress > 75) ? 'success' : (project.progress > 50 ? 'info'
                : (project.progress > 25 ? 'warning' : 'danger'));
        });
    });
};

app.controller('UserProjectsCtrl', ['$scope', '$http', '$location', '$routeParams', 'ProjectService', userProjectController]);