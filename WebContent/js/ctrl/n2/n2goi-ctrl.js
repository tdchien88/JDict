
/**
* @param $scope
* @param helloWorld (provider)
* @param helloWorldService
* @param helloWorldFactory
* @param
*/
myApp.controller("n2goiCtrl", ["$scope", 'localStorageService', 'dialogService', "$timeout", "goin2", function($scope, localStorageService, dialogService, $timeout, goin2){

    function init(){
        localStorageService.setPrefix('jdict.n2goi');

        $scope.data = {};
        $scope.data.listWords = goin2;//danh sach tat ca cac tu
        $scope.data.listUnit = [];//danh sach tat ca cac bai
        $scope.data.listCurrentWords = [];//danh sach cac tu trong bai
        $scope.data.listNotRemember = [];//danh sach cac tu chua thuoc
        $scope.data.listRemember = [];//danh sach cac tu da thuoc
        $scope.data.listNewWords = [];//danh sach cac tu chua hoc

        //tu hien tai
        $scope.data.curIdx = -1;
        $scope.data.curWord = {};
        $scope.data.isCorrect = false;
        $scope.data.isFirstCorrect = false;

        $scope.data.learnType = 'newwords';

        $scope.data.wrongCount = 0;
        $scope.data.wrongCount_GOI = 2;
        $scope.data.wrongCount_Kana1 = 4;
        $scope.data.wrongCount_Kana2 = 6;
        $scope.data.wrongCountMin = 2;
        $scope.data.wrongCountMax = 10;

        var seen = {};
        var listtemp = $scope.data.listWords.filter(function (e) {
            return seen[e.unit] ? false : (seen[e.unit] = true);
        });

        $.each(listtemp, function(i,e){
            $scope.data.listUnit.push({code:e.unit, name: "Unit " + e.unit + " (Week "+e.week+ " - Day "+e.day + ")"});
        })


        $timeout(function(){
            var data = localStorageService.get("data");
            if(data){
                $scope.data.unit = data.unit;
            }

            $scope.changeUnit();

            if(data){
                $scope.data.listNotRemember = data.listNotRemember;
                $scope.data.listRemember = data.listRemember;
                $scope.data.listNewWords = data.listNewWords;

                //tu hien tai
                $scope.data.curIdx = data.curIdx;
                $scope.data.curWord = data.curWord;
                $scope.data.isCorrect = data.isCorrect;

                $scope.data.learnType = data.learnType;
                $scope.data.unit = data.unit;

            }

        }, 100);

        wanakana.bind($("#ans")[0] /* options */);

    }



    function nextWord(){
        /*
            day: 1
            difficult: ""
            kana1: "さんがいだて"
            kana2: "さんがいだて"
            mean: "nhà 3 tầng"
            no: 9
            score: "0"
            unit: 1
            week: 1
            word: "３階建て"
         */

         if(($scope.data.listRemember.indexOf($scope.data.curWord) != -1) ||
           ($scope.data.listNotRemember.indexOf($scope.data.curWord) != -1)){
                $scope.data.listNewWords = $.grep($scope.data.listNewWords, function(e){
                   return e.no != $scope.data.curWord.no;
                });
         }

        $scope.data.isCorrect = true;
        $scope.data.wrongCount = 0;
        $scope.data.ans = "";

        var temp =[];
        if($scope.data.learnType == 'all'){
            temp = $scope.data.listCurrentWords;
        $scope.data.curIdx++;
        }
        else if($scope.data.learnType == 'wrong'){
            temp = $scope.data.listNotRemember;

            if($scope.data.isFirstCorrect){
                $scope.data.curIdx = 0;
            } else {
                $scope.data.curIdx++;
            }
        }
        else if($scope.data.learnType == 'rememberd'){
            temp = $scope.data.listRemember;
            $scope.data.curIdx++;
        }
        else if($scope.data.learnType == 'newwords'){
            temp = $scope.data.listNewWords;
            $scope.data.curIdx = 0;
        }

        if($scope.data.curIdx >= temp.length ){
            $scope.data.curIdx = 0;
        }

        $scope.data.curWord = temp[$scope.data.curIdx];

        $scope.data.isFirstCorrect = false;

        saveStore();
    }

    function saveStore(){
        localStorageService.remove("data");
        localStorageService.set("data", $scope.data);
    }

    function markScore(){
        if($scope.data.wrongCount > $scope.data.wrongCountMin){
            // chua thuoc
            $scope.data.curWord.difficult = "1";

        }else{
            // da thuoc
            $scope.data.curWord.difficult = "";
            if($scope.data.curWord.score <= 5){
                $scope.data.curWord.score++;
            }

        }
    }

    function isEqual(a, b){
        var regex = /[〜’”【】「」。、　 ０-９！＂＃＄％＆＇（）＊＋，－．／：；＜＝＞？＠［＼］＾＿｀｛｜｝～0-9`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi;

        a = a.replace(regex,'');
        var aR = wanakana.toRomaji(a);
        var aH = wanakana.toHiragana(a);
        var aK = wanakana.toKatakana(a);

        b = b.replace(regex,'');
        var bR = wanakana.toRomaji(b);
        var bH = wanakana.toHiragana(b);
        var bK= wanakana.toKatakana(b);

        return a == b ||

                aR == bR ||
                aR == bH ||
                aR == bK ||

                aH == bR ||
                aH == bH ||
                aH == bK ||

                aK == bR ||
                aK == bH ||
                aK == bK;
    }

    $scope.changeUnit = function(){

        $scope.data.curIdx = -1;
        $scope.data.curWord = {};
        $scope.data.wrongCount = 0;
        $scope.data.listCurrentWords = [];
        $scope.data.listNotRemember = [];
        $scope.data.listRemember = [];
        $scope.data.listNewWords = [];

        $scope.data.listCurrentWords = $scope.data.listWords.filter(function (e) {
            return e.unit == $scope.data.unit ;
        });

        $scope.data.listNewWords = $scope.data.listWords.filter(function (e) {
            return e.unit == $scope.data.unit ;
        });

        nextWord();
    }

    $scope.ansKeydown = function(event){
        if(event.key != "Enter" || isEmpty($scope.data.ans)){
            return;
        }
        var ansRomaji = wanakana.toRomaji($scope.data.ans);
        var ansKatakana = wanakana.toKatakana($scope.data.ans);
        var ansHiragana = wanakana.toHiragana($scope.data.ans);

        //tra loi dung
        if($scope.data.ans == $scope.data.curWord.word ||
                $scope.data.ans == $scope.data.curWord.kana1 ||
                $scope.data.ans == $scope.data.curWord.kana2 ||

                isEqual($scope.data.ans, $scope.data.curWord.word) ||
                isEqual($scope.data.ans, $scope.data.curWord.kana1) ||
                isEqual($scope.data.ans, $scope.data.curWord.kana2)){

            $scope.data.isCorrect = true;

            // neu la tra loi dung trong lan cuoi
             if($scope.data.wrongCount >= $scope.data.wrongCountMax ) {
                // neu tu chua ton tai moi add vao
                if($scope.data.listRemember.indexOf($scope.data.curWord) === -1 &&
                        $scope.data.listNotRemember.indexOf($scope.data.curWord) === -1){
                    $scope.data.listNotRemember.push($scope.data.curWord) ;
                }
                $scope.data.isFirstCorrect = true;
                $scope.data.wrongCount = 0;
                $scope.data.ans = '';
                markScore();
                nextWord();

            }
            // neu tra loi dung trong lan dau
            else if($scope.data.wrongCount <= $scope.data.wrongCountMin){
                $scope.data.wrongCount = $scope.data.wrongCountMax ;

                // neu tu chua ton tai moi add vao
                if($scope.data.listRemember.indexOf($scope.data.curWord) === -1){
                    $scope.data.listRemember.push($scope.data.curWord) ;
                }

                if($scope.data.listNotRemember.indexOf($scope.data.curWord) != -1){
                    $scope.data.listNotRemember = $.grep($scope.data.listNotRemember, function(e){
                        return e.no != $scope.data.curWord.no;
                   });
                }

            }
            else {
                $scope.data.wrongCount++;
                $scope.data.ans = '';
            }
        }
        //tra loi sai
        else {
            $scope.data.isCorrect = false;
            if($scope.data.wrongCount ==  $scope.data.wrongCount_GOI ||
                    $scope.data.wrongCount ==  $scope.data.wrongCount_Kana1 ||
                    $scope.data.wrongCount ==  $scope.data.wrongCount_Kana2){
                $scope.data.ans = '';
            }

            if($scope.data.wrongCount <= $scope.data.wrongCount_Kana2){
                $scope.data.wrongCount++;
            }
        }

    }

    $scope.reset = function(){
//        $scope.openModal = function () {
//            $uibModal.open({
//              templateUrl: 'partial/dialog/myModal.html',
//              controller: function ($scope, $uibModalInstance) {
//                $scope.ok = function () {
//                  $uibModalInstance.close();
//                };
//
//                $scope.cancel = function () {
//                  $uibModalInstance.dismiss('cancel');
//                };
//              }
//            })
//          };
//        dialogService.confirmDialog("WCMN0060", "WCMN0060",  function() {
//
//            console.log("ok")
//            localStorageService.clearAll();
//            init();
//        }, function() {
//            console.log("cancel")
//        });
          localStorageService.clearAll();
          init();
    }

    $scope.reZero = function(){
        $scope.data.curIdx = -1;
        $scope.data.curWord = {};

        nextWord();
    }

    $scope.changeLearnType = function(){
        $scope.data.curIdx = -1;
        nextWord();
    }

    init();
}]);
