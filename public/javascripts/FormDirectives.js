/**
 * Created by D on 29.5.2016 ã..
 */

var USERNAME_REGEX = /^[a-z0-9_-]{3,15}$/;

app.directive('username', function ($q, $http, $timeout) {
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {

            ctrl.$asyncValidators.username = function (modelValue, viewValue) {

                if (ctrl.$isEmpty(modelValue)) {
                    // consider empty model valid
                    return $q.when();
                }

                var def = $q.defer();
                if (!USERNAME_REGEX.test(modelValue)) {
                    def.reject();
                }

                $http.post('/check/username', {username: modelValue}).then(function (response) {
                    if (response.status === 200) {
                        response.data.registered ? def.reject() : def.resolve();
                    } else {
                        def.reject();
                    }
                });

                return def.promise;
            };
        }
    };
});
