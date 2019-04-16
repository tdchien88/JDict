/**
*
*
*/
myApp.config(function($stateProvider) {
    angular.forEach(stateMap, function(params, key) {
        $stateProvider.state(key, params);
    });
});