/**
 * Created by D on 29.4.2016 ã..
 */
var ProjectViewController = function ($scope, $http, $routeParams, $location, $uibModal, ProjectService, EditTaskService, pmIdentity) {
    var projectId = $routeParams.param;
    $scope.identity = pmIdentity;
    console.log(projectId);
    ProjectService.retrieveSingleProjectsById(projectId).then(function (sucess) {
        $scope.project = ProjectService.getSingleProject();
        $scope.project.progress = ProjectService.calculateProgress($scope.project);
        calculateTasksOverallTime($scope.project.tasks);
        $scope.project.progressBarType = ( $scope.project.progress > 75) ? 'success' : ( $scope.project.progress > 50 ? 'info'
            : ( $scope.project.progress > 25 ? 'warning' : 'danger'));
    });

    $scope.goToUserProfile = function (id) {
        console.log("User profile");
        console.log(id);
        var path = ['/profile', id].join('/');
        console.log(path);
        $location.url(path);
    };

    $scope.setTaskPriority = function (priority) {
        return priority == 1 ? 'Low' : (priority == 2) ? 'Medium' : (priority == 3) ? 'High' : 'N/A';
    }

    $scope.filterOptions = [{label: 'Name', value: 'name'}, {
        label: 'Description',
        value: 'description'
    }];

    function calculateTasksOverallTime(tasks) {
        var overallTime = 0;
        tasks.forEach(function (task) {
            overallTime += task.overallTime;
        });
        $scope.taskOverallTime = overallTime;
    }

    $scope.open = function (task) {
        EditTaskService.setCurrentTask(task);
        EditTaskService.setCurrentProjectId(projectId);


        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: '/partials/task/edit/progress/edit-task-progress',
            controller: 'EditTaskProgressCtrl',
            size: 'sm',
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
        });

        modalInstance.result.then(function (completion) {
            console.log(completion);
            task.completion = completion;
            $scope.project.progress = ProjectService.calculateProgress($scope.project);
            $scope.project.progressBarType = ( $scope.project.progress > 75) ? 'success' : ( $scope.project.progress > 50 ? 'info'
                : ( $scope.project.progress > 25 ? 'warning' : 'danger'));
        }, function () {
            //$log.info('Modal dismissed at: ' + new Date());
        });
    };
};


app.controller('ProjectViewCtrl', ['$scope', '$http', '$routeParams', '$location', '$uibModal', 'ProjectService', 'EditTaskService', 'pmIdentity', ProjectViewController]);