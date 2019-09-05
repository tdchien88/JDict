//factory style, more involved but more sophisticated
myApp.factory('helloWorldFactory', function() {
    return {
        sayHello: function() {
            return "Hello, Factory World!";
        }
    };
})
.factory("dialogService", function($uibModal){

    return {
        okDialog: function(title, message, okFunc, okBtnView) {

            var instance = $uibModal.open({
                templateUrl: 'partial/dialog/myModal.html',
                openedClass : 'my-modal-popup',
                'class': 'modal show',
                controller: function ($scope, $uibModalInstance) {
                    // キャンセルボタン非表示
                    $scope.cancelIsHide = true;
                    $scope.title = title;
                    $scope.message = message;

                    // OKボタンクリック後の処理
                    $scope.ok = function () {
                        if(isNotEmpty(okFunc)){
                            $uibModalInstance.close(okFunc());
                        } else {
                            $uibModalInstance.close();
                        }
                    };

                    // OKボタン表示名称に「false」が設定されている場合、OKボタンを表示しない
                    if(okBtnView === false) {
                        $scope.okIsHide = !okBtnView;
                        return;
                    }

                    // OKボタン表示名称設定
                    $scope.okView = isNotEmpty(okBtnView) ? okBtnView : "OK";
                }
            });
            return instance;
        },
        confirmDialog: function(title, message, okFunc, cancelFunc) {
            var modalInstance = $uibModal.open({
                templateUrl: 'partial/dialog/myModal.html',
                openedClass : 'my-modal-popup',
                'class': 'modal show',
                controller: function ($scope, $uibModalInstance) {
                    $scope.title = title;
                    $scope.message = message;
                    // OKボタンクリック後の処理
                    $scope.ok = function () {
                        if(isNotEmpty(okFunc)){
                            $uibModalInstance.close(okFunc());
                        } else {
                            $uibModalInstance.close();
                        }
                    };
                    // Cancelボタンクリック後の処理
                    $scope.cancel = function () {
                        if(isNotEmpty(cancelFunc)){
                            $uibModalInstance.close(cancelFunc());
                        } else {
                            $uibModalInstance.close();
                        }
                    };
                    // OKボタン表示名称設定
                    $scope.okView =  "OK";
                    // Cancelボタン表示名称設定
                    $scope.cancelView =  "Cancel";
                }
            });

            modalInstance.result.then(function(){
                console.log("a");
            }, function(res){
                console.log("b");

            });

            return modalInstance;
        }
    };

// エラーメッセージサービス
})
.factory("bottomSheetService", function($mdBottomSheet){
  var _listItem = [];
  var _clearFnc;
  var _bottomSheetPresets = {
    templateUrl: 'partial/dialog/history.html',
    parent: angular.element(document.getElementById('content')),
    controller: function ($scope, $mdBottomSheet) {
        $scope.listHistory = _listItem;

        $scope.selectListItem = function ($index) {
            var selectedItem = $scope.listHistory[$index];

            $mdBottomSheet.hide(selectedItem);

        }

        $scope.clearHistory = function () {
            if(_clearFnc){
                _clearFnc();

                $mdBottomSheet.hide();

            }

        }
    }
  };

  var _showHistory = function (list, clearFnc) {
    _bottomSheetPresets.targetEvent = event;
    _listItem = list;
    _clearFnc = clearFnc;
    return $mdBottomSheet.show(_bottomSheetPresets);
  };

  return {
    showHistory: _showHistory
  }

});