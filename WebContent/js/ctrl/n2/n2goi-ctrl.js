
/**
* @param $scope
* @param helloWorld (provider)
* @param helloWorldService
* @param helloWorldFactory
* @param
*/
myApp.controller("n2goiCtrl", ["$scope", "goin2", function($scope, goin2){

    function init(){
        $scope.listWords = goin2;//danh sach tat ca cac tu
        $scope.listUnit = [];//danh sach tat ca cac bai
        $scope.listCurrentWords = [];//danh sach cac tu trong bai
        $scope.listNotRemember = [];//danh sach cac tu chua thuoc
        $scope.listRemember = [];//danh sach cac tu da thuoc
        $scope.listNewWords = [];//danh sach cac tu chua hoc

        //tu hien tai
        $scope.curIdx = -1;
        $scope.curWord = {};
        $scope.isCorrect = false;

        $scope.learnType = 'all';

        $scope.wrongCount = 0;
        $scope.wrongCount_GOI = 2;
        $scope.wrongCount_Kana1 = 4;
        $scope.wrongCount_Kana2 = 6;
        $scope.wrongCountMin = 2;
        $scope.wrongCountMax = 10;

        var seen = {};
        var listtemp = $scope.listWords.filter(function (e) {
            return seen[e.unit] ? false : (seen[e.unit] = true);
        });

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

        $scope.isCorrect = true;
        $scope.wrongCount = 0;
        $scope.curIdx++;
        
        var temp =[];
        if($scope.learnType == 'all'){
            temp = $scope.listCurrentWords;
        }
        else if($scope.learnType == 'wrong'){
            temp = $scope.listNotRemember;
        }
        else if($scope.learnType == 'rememberd'){
            temp = $scope.listRemember;
        }
        else if($scope.learnType == 'newwords'){
            temp = $scope.listNewWords;
        }

        if($scope.curIdx >= temp.length ){
            $scope.curIdx = 0;
        }

        $scope.curWord = temp[$scope.curIdx];

    }

    function markScore(){
        if($scope.wrongCount > $scope.wrongCountMin){
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

    function isEqual(a, b){
        var regex = /[　 ０-９！＂＃＄％＆＇（）＊＋，－．／：；＜＝＞？＠［＼］＾＿｀｛｜｝～0-9`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi;
        a = a.replace(regex,'');
        b = b.replace(regex,'');

        return a == b;
    }

    $scope.changeUnit = function(){

        $scope.curIdx = -1;
        $scope.curWord = {};
        $scope.wrongCount = 0;
        $scope.listCurrentWords = [];
        $scope.listNotRemember = [];
        $scope.listRemember = [];
        $scope.listNewWords = [];

        $scope.listCurrentWords = $scope.listWords.filter(function (e) {
            return e.unit == $scope.unit ;
        });

        $scope.listNewWords = $scope.listWords.filter(function (e) {
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

        //tra loi dung
        if($scope.ans == $scope.curWord.word ||
                $scope.ans == $scope.curWord.kana1 ||
                $scope.ans == $scope.curWord.kana2 ||

                isEqual(ansHiragana, wanakana.toHiragana($scope.curWord.word)) ||
                isEqual(ansHiragana, wanakana.toHiragana($scope.curWord.kana1)) ||
                isEqual(ansHiragana, wanakana.toHiragana($scope.curWord.kana2)) ||

                isEqual(ansKatakana, wanakana.toKatakana($scope.curWord.word)) ||
                isEqual(ansKatakana, wanakana.toKatakana($scope.curWord.kana1)) ||
                isEqual(ansKatakana, wanakana.toKatakana($scope.curWord.kana2)) ){

            $scope.isCorrect = true;



            // neu la tra loi dung trong lan cuoi
             if($scope.wrongCount >= $scope.wrongCountMax ) {


                // neu tu chua ton tai moi add vao
                if($scope.listRemember.indexOf($scope.curWord) === -1 &&
                        $scope.listNotRemember.indexOf($scope.curWord) === -1){
                    $scope.listNotRemember.push($scope.curWord) ;
                }

                $scope.wrongCount = 0;
                $scope.ans = '';
                markScore();
                nextWord();

            }
            // neu tra loi dung trong lan dau
            else if($scope.wrongCount <= $scope.wrongCountMin){
                $scope.wrongCount = $scope.wrongCountMax ;

                // neu tu chua ton tai moi add vao
                if($scope.listRemember.indexOf($scope.curWord) === -1){
                    $scope.listRemember.push($scope.curWord) ;
                }

                if($scope.listNotRemember.indexOf($scope.curWord) != -1){
                    $scope.listNotRemember = $.grep($scope.listNotRemember, function(e){
                        return e.no != $scope.curWord.no;
                   });
                }

            }
            else {
                $scope.wrongCount++;
                $scope.ans = '';
            }
        }
        //tra loi sai
        else {
            $scope.isCorrect = false;
            if($scope.wrongCount ==  $scope.wrongCount_GOI ||
                    $scope.wrongCount ==  $scope.wrongCount_Kana1 ||
                    $scope.wrongCount ==  $scope.wrongCount_Kana2){
                $scope.ans = '';
            }

            if($scope.wrongCount <= $scope.wrongCount_Kana2){
                $scope.wrongCount++;
            }
        }

        
        if($scope.listRemember.indexOf($scope.curWord) != -1) ||
           $scope.listNotRemember.indexOf($scope.curWord) != -1)){
                $scope.listNewWords = $.grep($scope.listNewWords, function(e){
                   return e.no != $scope.curWord.no;
                });
        }
        
        
    }

    $scope.reset = function(){

        $scope.curIdx = -1;
        $scope.curWord = {};
        $scope.listNotRemember = [];
        $scope.listRemember = [];

        nextWord();
    }

    $scope.changeLearnType = function(){
        $scope.curIdx = -1;
        nextWord();
    }

    init();
}]);
