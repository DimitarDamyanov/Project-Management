/**
 * Created by D on 29.4.2016 ã..
 */
var app = angular.module('App', ['ui.bootstrap', 'toastr', 'ngRoute', 'ngAnimate', 'angularFileUpload']);

(function () {
    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/project/create', {
            templateUrl: '/partials/project/create/create-project',
            controller: 'CreateProjectCtrl'
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
            controller: 'EditProjectCtrl'
        });
        $routeProvider.when('/task/create', {
            templateUrl: '/partials/task/create/create-task',
            controller: 'CreateTaskCtrl'
        });
        $routeProvider.when('/account/register', {
            templateUrl: '/partials/account/register',
            controller: 'CreateTaskCtrl'
        });
        $routeProvider.when('/profile/:param', {
            templateUrl: '/partials/profile/view/user-profile',
            controller: 'UserProfileCtrl'
        });
        $routeProvider.when('/profile', {
            templateUrl: '/partials/profile/edit/edit-user-profile',
            controller: 'EditUserProfileCtrl'
        });
    }]);
}());