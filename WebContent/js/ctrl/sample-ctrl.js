
/**
* @param $scope
* @param helloWorld (provider)
* @param helloWorldService
* @param helloWorldFactory
* @param
*/
myApp.controller("sampleCtrl", ["$scope", "$timeout", "dialogService", "helloWorld", "helloWorldService" , "helloWorldFactory", "goin2",
                    function($scope, $timeout, dialogService, helloWorld, helloWorldService, helloWorldFactory, goin2){

    // helloWorld Provider
    $scope.provider = helloWorld.title;

    // helloWorldService
    $scope.service = helloWorldService.sayHello();

    // helloWorldFactory
    $scope.factory = helloWorldFactory.sayHello();

    //$scope.constant = goin2;

    $scope.showPopup = function(){
        dialogService.confirmDialog("ttile", "content",  function() {
          console.log("ok")
      }, function() {
          console.log("cancel")
      });
    }

    $scope.swipeAction = 'idle';
    function _idle() {
        $scope.swipeClose();
        $scope.$apply(function() {
          $scope.swipeAction = 'idle';
        });
      }

      $scope.onSwipeLeft = function() {
        $scope.$apply(function() {
          $scope.swipeAction = 'swipe left';
        });
        $timeout(_idle, 1000);
      };

      $scope.onSwipeRight = function() {
        $scope.$apply(function() {
          $scope.swipeAction = 'swipe right';
        });
        $timeout(_idle, 1000);
      };

      $scope.delayedClose = function() {
        $timeout($scope.swipeClose, 1000);
      }

}]);


