/**
 * Created by D on 15.5.2016 ã..
 */
app.factory('userProfileService', function ($http, $q) {

    var profiles = null;
    var profile = null;

    function loadAllUserProfiles() {
        var dfd = $q.defer();
        if (profiles) {
            dfd.resolve(true);
        } else {
            $http.get('/user/profile').then(function (response) {
                if (response && response.data) {
                    profiles = response.data;
                    dfd.resolve(true);
                } else {
                    dfd.resolve(false);
                }
            });
        }
        return dfd.promise;
    }

    function getAllProfiles() {
        return profiles;
    }

    function getProfileById(id) {
        var dfd = $q.defer();
        $http.get(['/user/profile/', id].join('')).then(function (response) {
            if (response && response.data) {
                profile = response.data;
                dfd.resolve(true);
            } else {
                dfd.resolve(false);
            }
        });
        return dfd.promise;
    }

    function getProfile() {
        return profile;
    }

    function updateProfile(profile) {
        var dfd = $q.defer();
        $http.put(['/user/profile/', profile._id].join(''), profile).then(function (response) {
            if (response && response.data) {
                console.log(response);
                dfd.resolve(true);
            } else {
                dfd.resolve(false);
            }
        });
        return dfd.promise;
    }


    return {
        loadAllUserProfiles: loadAllUserProfiles,
        getAllProfiles: getAllProfiles,
        getProfileById: getProfileById,
        getProfile: getProfile,
        updateProfile: updateProfile
    }

});