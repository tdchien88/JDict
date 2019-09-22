var initMyApp = function(){
    console.log("load myApp");
    angular.bootstrap(document, ['myApp']);
}

var myApp = angular.module("myApp", ['ui.router', 'LocalStorageModule', 'ngMaterial', 'ngMessages',  'ngAnimate', 'ngFitText', 'ngSanitize', 'ng-showdown',
    "ui.bootstrap", "ui.bootstrap.datepicker", "ui.bootstrap.datepickerPopup", "ui.bootstrap.dateparser", "ui.bootstrap.isClass", "ui.bootstrap.tabs"]);


myApp.run( function($rootScope, $timeout, $interval, constMap, constList){
    $rootScope.constMap = constMap;
    $rootScope.constList = constList;


    $rootScope.isShowSearchIcon = false;
    $rootScope.searchText = "";


    $rootScope.loading = false;
    $rootScope.showLoading = function(callback){

        $timeout(function(){
            $rootScope.loading = true;
        },0)

        $timeout(function(){
            callback();
            $rootScope.loading = false;
        },100)

    }

    /**
     * clock timer
     */
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

