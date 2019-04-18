//factory style, more involved but more sophisticated
myApp.factory('helloWorldFactory', function() {
    return {
        sayHello: function() {
            return "Hello, Factory World!";
        }
    };
})
.factory("dialogService", ["$uibModal", function($uibModal){

    return {
        okDialog: function(messageId, message, messageParam, okFunc, okBtnView) {

            // メッセージが設定されていない場合はメッセージIDからメッセージを取得する
            if(isEmpty(message)) message = getMsg(messageId, messageParam);

            var instance = $uibModal.open({
                templateUrl: 'partials/dialog/kakuninModal.html',
                openedClass : 'my-modal-popup',
                controller: function ($scope, $uibModalInstance) {
                    // キャンセルボタン非表示
                    $scope.cancelIsHide = true;
                    $scope.title = messageId;
                    $scope.message = message;

                    // OKボタンクリック後の処理
                    $scope.confirm = function () {
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

            return $uibModal.open({
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
        }
    };

// エラーメッセージサービス
}])