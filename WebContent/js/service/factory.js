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
            var modalInstance = $uibModal.open({
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                openedClass : 'my-modal-popup',
                'class': 'modal show',
                animation : true,
                //backdrop: 'static', // disable outside click
                templateUrl: 'partial/dialog/myModal.html',
                controller: function ($scope, $uibModalInstance) {
                    // キャンセルボタン非表示
                    $scope.cancelIsHide = true;
                    $scope.title = title;
                    $scope.message = message;

                    // OKボタンクリック後の処理
                    $scope.ok = function () {
                        $uibModalInstance.close();
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

            modalInstance.result.then(function(){
                console.log("a");
                okFunc();
            }, function(res){
                console.log("b");
                okFunc();
            });

            return modalInstance;
        },
        confirmDialog: function(title, message, okFunc, cancelFunc) {
            var modalInstance = $uibModal.open({
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                openedClass : 'my-modal-popup',
                'class': 'modal show',
                animation : true,
                backdrop: 'static', // disable outside click
                templateUrl: 'partial/dialog/myModal.html',
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
        },
        searchDialog: function(searchText) {
            var modalInstance = $uibModal.open({
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                openedClass : 'my-modal-popup',
                'class': 'modal show ',
                windowClass: 'search-dialog',
                animation : true,
                templateUrl : "./partial/dialog/searchBox.html",
                controller: function ($scope, $uibModalInstance) {
                    $scope.title = "Search Box";
                    $scope.searchStr = searchText;

                    // OKボタンクリック後の処理
                    $scope.ok = function () {
                            $uibModalInstance.close();
                    };
                    // Cancelボタンクリック後の処理
                    $scope.cancel = function () {
                            $uibModalInstance.close();
                    };

                    $scope.isDialog = true;

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