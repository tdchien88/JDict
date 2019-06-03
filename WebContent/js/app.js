var myApp = angular.module("myApp", ['ui.router', 'LocalStorageModule', 'ngMaterial', 'ngMessages',
    "ui.bootstrap", "ui.bootstrap.datepicker", "ui.bootstrap.datepickerPopup", "ui.bootstrap.dateparser", "ui.bootstrap.isClass", "ui.bootstrap.tabs", 'awesome-angular-swipe']);


myApp.run(["$rootScope", function($rootScope){
	$rootScope.showLoading = false;
}]);

