/**
 * Created by D on 29.4.2016 ã..
 */

app.controller('EditTaskProgressCtrl', function ($scope, $uibModalInstance, EditTaskService) {
    $scope.task = EditTaskService.getCurrentTask();

    $scope.ok = function () {
        //save the progress
        EditTaskService.updateTaskProgression($scope.task._id, $scope.task.completion);
        $uibModalInstance.close($scope.task.completion);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});