
/**
* @param $scope
* @param helloWorld (provider)
* @param helloWorldService
* @param helloWorldFactory
* @param
*/
myApp.controller("sampleCtrl", function($scope, $timeout, dialogService, helloWorld, helloWorldService, helloWorldFactory){

    var n2goi = _getDataByKey('n2goi');


    // helloWorld Provider
    $scope.provider = helloWorld.title;

    // helloWorldService
    $scope.service = helloWorldService.sayHello();

    // helloWorldFactory
    $scope.factory = helloWorldFactory.sayHello();

    //$scope.constant = n2goi;

    var options = {
            modules: {
                toolbar: [
                    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                    ['blockquote', 'code-block'],

                    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
                    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
                    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
                    [{ 'direction': 'rtl' }],                         // text direction

                    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
                    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

                    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
                    [{ 'font': [] }],
                    [{ 'align': [] }],

                    ['clean']                                         // remove formatting button
                ]
              },
              placeholder: 'Compose an epic...',
              theme: 'snow'  // or 'bubble'
            };
    var editor = new Quill('#editor-container', options);

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

});


myApp.controller('BottomSheetExample', function($scope, $timeout, $mdBottomSheet, $mdToast) {
  $scope.alert = '';

  $scope.showListBottomSheet = function() {
    $scope.alert = '';
    $mdBottomSheet.show({
      templateUrl: 'bottom-sheet-list-template.html',
      controller: 'ListBottomSheetCtrl'
    }).then(function(clickedItem) {
      $scope.alert = clickedItem['name'] + ' clicked!';
    }).catch(function(error) {
      // User clicked outside or hit escape
    });
  };

  $scope.showGridBottomSheet = function() {
    $scope.alert = '';
    $mdBottomSheet.show({
      templateUrl: 'bottom-sheet-grid-template.html',
      controller: 'GridBottomSheetCtrl',
      clickOutsideToClose: false
    }).then(function(clickedItem) {
      $mdToast.show(
            $mdToast.simple()
              .textContent(clickedItem['name'] + ' clicked!')
              .position('top right')
              .hideDelay(1500)
          );
    }).catch(function(error) {
      // User clicked outside or hit escape
    });
  };
})

.controller('ListBottomSheetCtrl', function($scope, $mdBottomSheet) {

  $scope.items = [
    { name: 'Share', icon: 'share' },
    { name: 'Upload', icon: 'upload' },
    { name: 'Copy', icon: 'copy' },
    { name: 'Print this page', icon: 'print' },
  ];

  $scope.listItemClick = function($index) {
    var clickedItem = $scope.items[$index];
    $mdBottomSheet.hide(clickedItem);
  };
})
.controller('GridBottomSheetCtrl', function($scope, $mdBottomSheet) {
  $scope.items = [
    { name: 'Hangout', icon: 'hangout' },
    { name: 'Mail', icon: 'mail' },
    { name: 'Message', icon: 'message' },
    { name: 'Copy', icon: 'copy2' },
    { name: 'Facebook', icon: 'facebook' },
    { name: 'Twitter', icon: 'twitter' },
  ];

  $scope.listItemClick = function($index) {
    var clickedItem = $scope.items[$index];
    $mdBottomSheet.hide(clickedItem);
  };
})
;


