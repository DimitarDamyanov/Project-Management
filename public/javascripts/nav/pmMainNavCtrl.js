/**
 * Created by D on 2.6.2016 ã..
 */
var MainNavController = function ($scope, pmIdentity) {
    $scope.identity = pmIdentity;
}
app.controller("MainNavCtrl", ["$scope", "pmIdentity", MainNavController]);