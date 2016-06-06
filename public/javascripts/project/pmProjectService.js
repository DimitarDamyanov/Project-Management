/**
 * Created by D on 29.4.2016 ã..
 */
app.factory('ProjectService', function ($q, $http, $location) {

    var projects = [];
    var singleProject = {};

    function saveProject(project) {
        var dfd = $q.defer();
        var url = '/project/create';
        $http.post(url, project).then(function (response) {

            if (response && response.status == 200) {
                dfd.resolve(response.data);
            } else {
                dfd.resolve(false);
            }

        });
        return dfd.promise;
    }

    function updateProject(project) {
        var dfd = $q.defer();
        var url = ['/project/update', project._id].join('/');
        $http.post(url, project).then(function (response) {
            if (response && response.status === 200) {
                dfd.resolve(response.data);
            } else {
                dfd.resolve(false);
            }
        });
        return dfd.promise;
    }

    function retrieveProjects() {
        var dfd = $q.defer();
        $http.get('/project').then(function (response) {
            if (response && response.data) {
                projects = response.data;
                dfd.resolve(true);
            } else {
                dfd.resolve(false);

            }
        });
        return dfd.promise;
    }

    function retrieveUsersProjects(profile) {
        var dfd = $q.defer();
        $http.get(['/project', profile, 'projects'].join('/')).then(function (response) {
            if (response && response.data) {
                projects = response.data;
                dfd.resolve(true);
            } else {
                dfd.resolve(false);
            }
        });
        return dfd.promise;
    }

    function pushNewTaskToProject(task) {
        singleProject.tasks.push(task);
    }

    function removeTaskFromProject(task) {
        for (var i = 0; i < singleProject.tasks.length; i++) {
            var t = singleProject.tasks[i];
            if (t.name === task.name && t.description === task.description && t.overallTime === task.overallTime) {
                singleProject.tasks.splice(i, 1);
                break;
            }
        }
    }

    function retrieveSingleProjectsById(id) {
        var dfd = $q.defer();
        $http.get(['/project', id].join('/')).then(function (response) {
            if (response && response.data) {
                singleProject = response.data;
                dfd.resolve(true);
            } else {
                dfd.resolve(false);
            }
        });
        return dfd.promise;
    }

    function getProjects() {
        return projects;
    }

    function getSingleProject() {
        return singleProject;
    }


    var calculateProgress = function (project) {
        if (!project.tasks || project.tasks.length == 0) {
            return 0;
        }
        var progress = 0;
        var tasksProgress = [];
        if (project.tasks && project.tasks.length > 0) {
            project.tasks.forEach(function (task) {
                tasksProgress.push(task.completion);
            });
        }

        progress = tasksProgress.reduce(function (a, b) {
                return a + b;
            }) / project.tasks.length;

        return Math.round(progress);
    };


    var deleteProjectById = function (id) {
        $http.delete('/project/' + id).then(function (response) {
            console.log(response);
        });
    };


    return {
        saveProject: saveProject,
        retrieveProjects: retrieveProjects,
        getProjects: getProjects,
        retrieveSingleProjectsById: retrieveSingleProjectsById,
        retrieveUsersProjects: retrieveUsersProjects,
        deleteProjectById: deleteProjectById,
        getSingleProject: getSingleProject,
        pushNewTaskToProject: pushNewTaskToProject,
        updateProject: updateProject,
        removeTaskFromProject: removeTaskFromProject,
        calculateProgress: calculateProgress
    }
});
