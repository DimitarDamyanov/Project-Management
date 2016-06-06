/**
 * Created by D on 13.2.2016 �..
 */
app.factory('pmIdentity', function ($window) {
    var currentUser = undefined;
    if (!!$window.bootstrappedUserObject) {
        currentUser = $window.bootstrappedUserObject;
    }
    return {
        currentUser: currentUser,
        isAuthenticated: function () {
            return !!this.currentUser;
        }
    }
});