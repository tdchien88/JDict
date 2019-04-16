
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

        //tu hien tai
        $scope.curIdx = -1;
        $scope.curWord = {};

        $scope.wrongCount = 0;
        $scope.wrongCount_GOI = 2;
        $scope.wrongCount_Kana1 = 4;
        $scope.wrongCount_Kana2 = 6;
        $scope.wrongCountMin = 2;
        $scope.wrongCountMax = 10;

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

        if($scope.wrongCount >= $scope.wrongCountMax){

            $scope.wrongCount = 0;
            $scope.ans = '';
            markScore();
            nextWord();
        }

        //tra loi dung
        else if($scope.ans == $scope.curWord.word ||
                $scope.ans == $scope.curWord.kana1 ||
                $scope.ans == $scope.curWord.kana2 ||

                isEqual(ansHiragana, wanakana.toHiragana($scope.curWord.word)) ||
                isEqual(ansHiragana, wanakana.toHiragana($scope.curWord.kana1)) ||
                isEqual(ansHiragana, wanakana.toHiragana($scope.curWord.kana2)) ||

                isEqual(ansKatakana, wanakana.toKatakana($scope.curWord.word)) ||
                isEqual(ansKatakana, wanakana.toKatakana($scope.curWord.kana1)) ||
                isEqual(ansKatakana, wanakana.toKatakana($scope.curWord.kana2)) ){

            // neu tra loi dung trong lan dau
            if($scope.wrongCount <= $scope.wrongCountMin){
                $scope.wrongCount = $scope.wrongCountMax + 1;
            }
            // neu la tra loi dung trong lan cuoi
            else if($scope.wrongCount == $scope.wrongCountMax-1 ) {
                // neu tu chua ton tai moi add vao
                if($scope.listNotRemember.indexOf($scope.curWord) === -1){
                    $scope.listNotRemember.push($scope.curWord) ;
                }
                $scope.wrongCount++;
            }
            else {
                $scope.wrongCount++;
                $scope.ans = '';
            }
        }

        //tra loi sai
        else {

            if($scope.wrongCount ==  $scope.wrongCount_GOI || $scope.wrongCount ==  $scope.wrongCount_Kana1 || $scope.wrongCount ==  $scope.wrongCount_Kana2){
                $scope.ans = '';
            }
 if($scope.wrongCount < $scope.wrongCountMax){

            $scope.wrongCount++;
 }
        }

    }

    init();
}]);


