/**
 * Created by D on 3.5.2016 ã..
 */
/**
 * Created by D on 29.4.2016 ã..
 */
app.factory('EditTaskService', function ($q, $http, $location) {

    var currentTask = {};
    var currentProjectId = {};

    var getCurrentTask = function () {
        return currentTask;
    };

    var setCurrentTask = function (task) {
        currentTask = task;
    };

    var getCurrentProjectId = function () {
        return currentProjectId;
    };

    var setCurrentProjectId = function (id) {
        currentProjectId = id;
    };

    var updateTaskProgression = function (id, progress) {
        var dfd = $q.defer();
        var url = ["/project/update", currentProjectId, "task", id, "progress", progress].join('/');
        $http.post(url).then(function (response) {
            if (response && response.status === 200) {
                dfd.resolve(response.data);
            } else {
                dfd.resolve(false);
            }
        });
        return dfd.promise;
    };

    return {
        getCurrentTask: getCurrentTask,
        setCurrentTask: setCurrentTask,
        getCurrentProjectId: getCurrentProjectId,
        setCurrentProjectId: setCurrentProjectId,
        updateTaskProgression: updateTaskProgression
    }
});
