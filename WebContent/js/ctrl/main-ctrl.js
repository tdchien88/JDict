
/**
* @param $scope
* @param helloWorld (provider)
* @param helloWorldService
* @param helloWorldFactory
* @param
*/
myApp.controller("mainController", ["$scope", function($scope){


    $scope.menulist = [
                {sref:"home", link:"home", name:"Home"},
                {sref:"sample", link:"about", name:"Sample"},
                {sref:"n2goi", link:"n2goi", name:"N2GOI"},
                {sref:"about", link:"about", name:"About"},
                ];


}]);


