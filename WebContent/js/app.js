var myApp = angular.module("myApp", ['ui.router', 'LocalStorageModule', 'ngMaterial', 'ngMessages',
    "ui.bootstrap", "ui.bootstrap.datepicker", "ui.bootstrap.datepickerPopup", "ui.bootstrap.dateparser", "ui.bootstrap.isClass", "ui.bootstrap.tabs", 'awesome-angular-swipe']);


myApp.run( function($rootScope, $timeout){
	$rootScope._loading = false;
	$rootScope.showLoading = function(callback){
        $rootScope._loading = true;
        setTimeout(function(){
            callback();
            $rootScope._loading = false;
        }, 0);
	}

});

