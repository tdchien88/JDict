
/**
* @param $scope
* @param helloWorld (provider)
* @param helloWorldService
* @param helloWorldFactory
* @param
*/
myApp.controller("sampleCtrl", ["$scope", "helloWorld", "helloWorldService" , "helloWorldFactory", "goin2",
                    function($scope, helloWorld, helloWorldService, helloWorldFactory, goin2){

    // helloWorld Provider
    $scope.provider = helloWorld.title;

    // helloWorldService
    $scope.service = helloWorldService.sayHello();

    // helloWorldFactory
    $scope.factory = helloWorldFactory.sayHello();

    //$scope.constant = goin2;

}]);


