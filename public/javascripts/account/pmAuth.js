/**
 * Created by D on 13.2.2016 ã..
 */
app.factory('pmAuth', function ($http, pmIdentity, $q) {
    return {
        authenticateUser: function (username, password) {
            var dfd = $q.defer();
            $http.post('/login', {username: username, password: password}).then(function (response) {
                if (response.data.success) {
                    pmIdentity.currentUser = response.data.user;
                    dfd.resolve(true);
                } else {
                    dfd.resolve(false);
                }
            });
            return dfd.promise;
        },
        logoutUser: function () {
            pmIdentity.currentUser = undefined;
            var dfd = $q.defer();
            $http.post('/logout', {logout: true}).then(function () {
                pmIdentity.currentUser = undefined;
                dfd.resolve(true);
            });

            return dfd.promise;
        },
        registerUser: function (user) {
            var dfd = $q.defer();
            $http.post('/register', user).then(function (response) {
                if (response && response.status == 200) {
                    pmIdentity.currentUser = response.data.user;
                    dfd.resolve(true);
                } else {
                    dfd.resolve(false);
                }
            });
            return dfd.promise;
        }
    }
});