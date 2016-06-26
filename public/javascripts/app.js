/**
 * Created by D on 29.4.2016 �..
 */
var app = angular.module('App', ['ui.bootstrap', 'toastr', 'ngRoute', 'ngAnimate', 'angularFileUpload']);

(function () {
    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/project/create', {
            templateUrl: '/partials/project/create/create-project',
            controller: 'CreateProjectCtrl',
            authentication: true
        });
        $routeProvider.when('/project/all', {
            templateUrl: '/partials/project/view/all/all-projects',
            controller: 'ProjectCtrl'
        });
        $routeProvider.when('/:param/projects', {
            templateUrl: '/partials/project/view/user/all-projects',
            controller: 'UserProjectsCtrl'
        });
        $routeProvider.when('/project/:param', {
            templateUrl: '/partials/project/view/single/project-view',
            controller: 'ProjectViewCtrl'
        });
        $routeProvider.when('/project/edit/:param', {
            templateUrl: '/partials/project/edit/edit-project',
            controller: 'EditProjectCtrl',
            authentication: true
        });
        $routeProvider.when('/task/create', {
            templateUrl: '/partials/task/create/create-task',
            controller: 'CreateTaskCtrl',
            authentication: true
        });
        $routeProvider.when('/account/register', {
            templateUrl: '/partials/account/register',
            controller: 'CreateTaskCtrl',
            authentication: false
        });
        $routeProvider.when('/profile/:param', {
            templateUrl: '/partials/profile/view/user-profile',
            controller: 'UserProfileCtrl'
        });
        $routeProvider.when('/profile', {
            templateUrl: '/partials/profile/edit/edit-user-profile',
            controller: 'EditUserProfileCtrl',
            authentication: true
        });
    }]);
}());

app.run(['$rootScope', '$location', 'pmIdentity', function ($rootScope, $location, pmIdentity) {
    $rootScope.$on('$routeChangeStart', function (event, next) {
        if (next.$$route.authentication && !pmIdentity.isAuthenticated()) {
            event.preventDefault();
            $location.path("/project/all");
        }
    });

}]);