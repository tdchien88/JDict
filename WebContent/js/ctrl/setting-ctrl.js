
myApp.controller("settingCtrl", function($scope, $timeout, dialogService){
    function init(){
        $scope.data = {};

        $scope.listKey = [{code : -1 , name : "All"}];

        var list = _listData.forEach(function(item, idx){
            if(!item.isArraybuffer){
                $scope.listKey.push({code : idx , name : item.key});
            }
        });



        $scope.showPopup = function(){
            dialogService.confirmDialog("Delete Data", "DO YOU WANT TO RESET DATA?",  function() {
                if($scope.resetKey == -1){
                    _resetDATA();
                } else {

                    _resetData($scope.listKey[$scope.resetKey].name);
                }
          }, function() {
              console.log("cancel")
          });
        }
    }



    init();
});