
/**
* @param $scope
* @param helloWorld (provider)
* @param helloWorldService
* @param helloWorldFactory
* @param
*/
myApp.controller("mainController", ["$scope", function($scope){


    $scope.menulist = [
                {sref:"home", name:"Home"},
                {sref:"sample", name:"Sample"},
                {sref:"n2goi", name:"N2 GOI", param:"{type: 'GOI'}"},
                {sref:"n2goi", name:"N2 KANJI", param:"{type: 'KANJI'}"},
                {sref:"mimikara", name:"Mimi Kara"},
                {sref:"about", name:"About"},
                ];

    $scope.createLink = function(menu){
        return menu.sref+'('+menu.param+')';
    }
}]);


