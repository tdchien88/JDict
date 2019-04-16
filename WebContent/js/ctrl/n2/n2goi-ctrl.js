
/**
* @param $scope
* @param helloWorld (provider)
* @param helloWorldService
* @param helloWorldFactory
* @param
*/
myApp.controller("n2goiCtrl", ["$scope", "goin2", function($scope, goin2){

    function init(){
        $scope.listWords = goin2;
        $scope.listCurrentWords = [];
        $scope.curWord = {};
        $scope.wrongCount = 0;
        $scope.wrongCount_GOI = 2;
        $scope.wrongCount_Kana1 = 4;
        $scope.wrongCount_Kana2 = 6;
        $scope.wrongCountMax = 10;

        $scope.curIdx = -1;

        $scope.listUnit = [];

        var seen = {};
        var listtemp = $scope.listWords.filter(function (e) {
            return seen[e.unit] ? false : (seen[e.unit] = true);
        });;

        $.each(listtemp, function(i,e){
            $scope.listUnit.push({code:e.unit, name: "Unit " + e.unit + " (Week "+e.week+ " - Day "+e.day + ")"});
        })

        nextWord();

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
        $scope.curIdx++;
        $scope.curWord = $scope.listCurrentWords[$scope.curIdx];
    }

    function markScore(){
        if($scope.wrongCount > 2){
            // chua thuoc
            $scope.curWord.difficult = "1";

        }else{
            // da thuoc
            $scope.curWord.difficult = "";
            if($scope.curWord.score <= 5){
                $scope.curWord.score++;
            }

        }
    }

    $scope.changeUnit = function(){

        $scope.curIdx = -1;
        $scope.curWord = {};
        $scope.wrongCount = 0;
        $scope.listCurrentWords = [];

        $scope.listCurrentWords = $scope.listWords.filter(function (e) {
            return e.unit == $scope.unit ;
        });
        nextWord();
    }

    $scope.ansKeydown = function(event){
        if(event.key != "Enter" || isEmpty($scope.ans)){
            return;
        }
        var ansRomaji = wanakana.toRomaji($scope.ans);
        var ansKatakana = wanakana.toKatakana($scope.ans);
        var ansHiragana = wanakana.toHiragana($scope.ans);

        if($scope.wrongCount > $scope.wrongCountMax){
            $scope.showALL = false;
            $scope.wrongCount = 0;
            $scope.ans = '';
            markScore();
            nextWord();
        }

        else if($scope.ans == $scope.curWord.word ||
                $scope.ans == $scope.curWord.kana1 ||
                $scope.ans == $scope.curWord.kana2 ||

                ansHiragana == wanakana.toHiragana($scope.curWord.word) ||
                ansHiragana == wanakana.toHiragana($scope.curWord.kana1) ||
                ansHiragana == wanakana.toHiragana($scope.curWord.kana2) ||

                ansKatakana == wanakana.toKatakana($scope.curWord.word) ||
                ansKatakana == wanakana.toKatakana($scope.curWord.kana1) ||
                ansKatakana == wanakana.toKatakana($scope.curWord.kana2)){
            
            if($scope.wrongCount <= 2){
                $scope.wrongCount = $scope.wrongCountMax + 1;
        
            }else {
                $scope.wrongCount++;
                $scope.ans = '';
            }
        }
        else {

            if($scope.wrongCount ==  $scope.wrongCount_GOI || $scope.wrongCount ==  $scope.wrongCount_Kana1 || $scope.wrongCount ==  $scope.wrongCount_Kana2){
                $scope.ans = '';
            }

            $scope.wrongCount++;

        }

    }

    init();
}]);


