var myApp = angular.module("myApp", ['ui.router', 'LocalStorageModule', 'ngMaterial', 'ngMessages',
    "ui.bootstrap", "ui.bootstrap.datepicker", "ui.bootstrap.datepickerPopup", "ui.bootstrap.dateparser", "ui.bootstrap.isClass", "ui.bootstrap.tabs"]);


myApp.run( function($rootScope, $timeout, $interval){
	$rootScope._loading = false;
	$rootScope.showLoading = function(callback){
        $rootScope._loading = true;
        setTimeout(function(){
            callback();
            $rootScope._loading = false;
        }, 0);
	}

	$rootScope.clientCurrent;
	$rootScope.clientCurrentPoint;

    var dateProgress = $interval(function() {
        setDate();
    }, 1000);

    setDate();

    function setDate() {
        $rootScope.clientCurrent = new Date();
        $rootScope.clientCurrentPoint = ($rootScope.clientCurrent.getSeconds() % 2 == 0);
    }

});

