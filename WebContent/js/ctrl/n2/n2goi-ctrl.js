/**
* @param $scope
* @param helloWorld (provider)
* @param helloWorldService
* @param helloWorldFactory
* @param
*/
myApp.controller("n2goiCtrl", ["$scope", "$stateParams", 'localStorageService', 'dialogService', "$timeout", '$location', '$anchorScroll', "n2goi", "n2kanji",
function($scope, $stateParams, localStorageService, dialogService, $timeout, $location, $anchorScroll, n2goi, n2kanji){

    function init(){
        localStorageService.setPrefix('jdict.n2goi');

        $scope.data = {};
        if($stateParams.type){
            if($stateParams.type == "GOI"){
                $scope.data.listWords = n2goi;//danh sach tat ca cac tu

            }
            else if($stateParams.type == "KANJI"){
                $scope.data.listWords = n2kanji;//danh sach tat ca cac tu
            }
        }else{
            $scope.data.listWords = n2goi;//danh sach tat ca cac tu
        }
        $scope.data.listUnit = [];//danh sach tat ca cac bai

        //tu hien tai
        $scope.data.curIdx = -1;
        $scope.data.curUnit = {};
        $scope.data.curWord = {};
        $scope.data.isCorrect = false;
        $scope.data.isFirstCorrect = false;

        $scope.data.learnType = 'newwords';//[all wrong rememberd newwords hardwords]
        $scope.data.cardType = 'mean';//[word mean]
        $scope.data.curList = [];

        $scope.data.wrongCount = 0;
        $scope.data.wrongCount_GOI = 2;
        $scope.data.wrongCount_HAN = 3;
        $scope.data.wrongCount_Kana2 = 4;
        $scope.data.wrongCountMin = 2;
        $scope.data.wrongCountMax = 10;

        $scope.fcardChecked = false;

        var seen = {};
        var listUnit = $scope.data.listWords.filter(function (e) {
            return seen[e.unit] ? false : (seen[e.unit] = true);
        });

        $.each(listUnit, function(i,e){
            $scope.data.listUnit.push({
                unit: e.unit,
                week: e.week,
                day: e.day,
                code: e.unit,
                name: "U" + e.unit + " (W"+e.week+ " - D"+e.day + ") NG:0",
                listCurrentWords: [],//danh sach cac tu trong bai
                listNotRemember: [],//danh sach cac tu chua thuoc
                listRemember: [],//danh sach cac tu da thuoc
                listNewWords: [],//danh sach cac tu chua hoc
                listHardWords: [],//ds cac tu kho
           });
        })


        $timeout(function(){
            var data = getStore();

            if (data){
                $scope.data.unit = data.unit;

                $scope.data.listUnit.forEach(e => {
                    var unit = data.listUnit.find(x=> x.code === e.code);

                    e.listNotRemember = isEmpty(unit.listNotRemember) ? [] : unit.listNotRemember;
                    e.listRemember = isEmpty(unit.listRemember) ? [] : unit.listRemember;
                    e.listNewWords = isEmpty(unit.listNewWords) ? [] : unit.listNewWords;
                    e.listHardWords = isEmpty(unit.listHardWords) ? [] : unit.listHardWords;
                    $.each(e.listHardWords, function(i,w){
                        e.listHardWords[i] = $scope.data.listWords.find(w2=> w2.no === w.no);
                    });
                    e.name = "U" + e.unit + " (W"+e.week+ " - D"+e.day + ") [NG:" + e.listNotRemember.length + " - ★:" +e.listHardWords.length + "]";

                });
            } else {
                $scope.data.listUnit.forEach(eUnit => {
                    eUnit.listNewWords = $scope.data.listWords.filter(function (word) {
                        return eUnit.code == word.unit ;
                    });
                });
            }

            $scope.changeUnit();


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

         if(($scope.data.curUnit.listRemember.indexOf($scope.data.curWord) != -1) ||
                   ($scope.data.curUnit.listNotRemember.indexOf($scope.data.curWord) != -1)){
            $scope.data.curUnit.listNewWords = $.grep($scope.data.curUnit.listNewWords, function(e){
               return e.no != $scope.data.curWord.no;
            });
         }

        $scope.data.isCorrect = true;
        $scope.data.wrongCount = 0;
        $scope.data.ans = "";
        $scope.fcardChecked = false;

        $scope.data.curList = [];
        if($scope.data.learnType == 'all'){
            $scope.data.curList = $scope.data.curUnit.listCurrentWords;
            $scope.data.curIdx++;
        }
        else if($scope.data.learnType == 'wrong'){
            $scope.data.curList = $scope.data.curUnit.listNotRemember;

            if($scope.data.isFirstCorrect){
                //$scope.data.curIdx = 0;
            }  else {
                $scope.data.curIdx++;
            }

            if($scope.data.curIdx >= 7){
                $scope.data.curIdx = 0;
            }

        }
        else if($scope.data.learnType == 'rememberd'){
            $scope.data.curList = $scope.data.curUnit.listRemember;
            if($scope.data.isFirstCorrect){
                $scope.data.curIdx++;
            } else {
                $scope.data.curIdx = 0;
            }
        }
        else if($scope.data.learnType == 'newwords'){
            $scope.data.curList = $scope.data.curUnit.listNewWords;
            $scope.data.curIdx = 0;
        }
        else if($scope.data.learnType == 'hardwords'){
            $scope.data.curList = $scope.data.curUnit.listHardWords;
            $scope.data.curIdx++;
        }

        if($scope.data.curIdx >= $scope.data.curList.length ){
            $scope.data.curIdx = 0;
        }

        $scope.data.curWord = $scope.data.curList[$scope.data.curIdx];

        $scope.data.isFirstCorrect = false;

        saveStore();

        setTargetFocus("ans");
    }

    function saveStore(){

        if($stateParams.type == "GOI"){
           localStorageService.set("dataGOI", $scope.data);
        }
        else if($stateParams.type == "KANJI"){
            localStorageService.set("dataKANJI", $scope.data);
        }
    }

    function getStore(){

        if($stateParams.type == "GOI"){
            return  localStorageService.get("dataGOI");
        }
        else if($stateParams.type == "KANJI"){
            return  localStorageService.get("dataKANJI");
        }

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

    $scope.changeUnit = function(){

        $scope.data.curUnit = $scope.data.listUnit.find(x=> x.code === $scope.data.unit);
        $scope.data.curIdx = -1;
        $scope.data.curWord = {};
        $scope.data.wrongCount = 0;
        $scope.fcardChecked = false;

        $scope.data.curUnit.listCurrentWords = $scope.data.listWords.filter(function (e) {
            return e.unit == $scope.data.unit ;
        });

        var data = getStore();
        if(data){
            var listUnit = data.listUnit.find(x=> x.code === $scope.data.unit);
            if(listUnit.listNotRemember && listUnit.listNotRemember.length != 0){
                $.each(listUnit.listNotRemember, function(i,w){
                    $scope.data.curUnit.listNotRemember[i] = $scope.data.listWords.find(w2=> w2.no === w.no);
                });
            }

            if(listUnit.listRemember && listUnit.listRemember.length != 0){
                $.each(listUnit.listRemember, function(i,w){
                    $scope.data.curUnit.listRemember[i] = $scope.data.listWords.find(w2=> w2.no === w.no);
                });
            }

            if(listUnit.listNewWords && listUnit.listNewWords.length != 0){
                $.each(listUnit.listNewWords, function(i,w){
                    $scope.data.curUnit.listNewWords[i] = $scope.data.listWords.find(w2=> w2.no === w.no);
                });
            }


        } else {
            $scope.data.curUnit.listNotRemember = [];
            $scope.data.curUnit.listRemember = [];

        }

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
                $scope.data.ans == $scope.data.curWord.kana2 ||
                isEqual($scope.data.ans, $scope.data.curWord.word) ||
                isEqual($scope.data.ans, $scope.data.curWord.kana2)){

            $scope.data.isCorrect = true;

            // neu la tra loi dung trong lan cuoi
             if($scope.data.wrongCount >= $scope.data.wrongCountMax ) {


                // neu k phai dung trong lan fai va tu chua ton tai moi add vao
               if(!$scope.data.isFirstCorrect && !$scope.data.curUnit.listHardWords.find(x => x.no === $scope.data.curWord.no)){
                    $scope.data.curUnit.listHardWords.push($scope.data.curWord) ;
               }

                // neu k phai dung lan dau va co trong tu da hoc thi xoa
                if(!$scope.data.isFirstCorrect && $scope.data.curUnit.listRemember.find(x => x.no === $scope.data.curWord.no)) {
                   $scope.data.curUnit.listRemember = $.grep($scope.data.curUnit.listRemember, function(e){
                       return e.no != $scope.data.curWord.no;
                   });
                }

                // neu tu chua ton tai moi add vao
                if(!$scope.data.curUnit.listRemember.find(x => x.no === $scope.data.curWord.no) &&
                        !$scope.data.curUnit.listNotRemember.find(x => x.no === $scope.data.curWord.no)){
                    $scope.data.curUnit.listNotRemember.push($scope.data.curWord) ;
                }
/*
                if(!$scope.data.curUnit.listRemember.find(x => x.no === $scope.data.curWord.no) &&
                        !$scope.data.curUnit.listNotRemember.find(x => x.no === $scope.data.curWord.no)){
                    $scope.data.curUnit.listNotRemember.push($scope.data.curWord) ;
                }
*/
                $scope.data.wrongCount = 0;
                $scope.data.ans = '';
                markScore();
                nextWord();

            }
            // neu tra loi dung trong lan dau
            else if($scope.data.wrongCount <= $scope.data.wrongCountMin){
                $scope.data.isFirstCorrect = true;
                $scope.data.wrongCount = $scope.data.wrongCountMax ;

                // neu tu chua ton tai moi add vao
                if(!$scope.data.curUnit.listRemember.find(x => x.no === $scope.data.curWord.no)){
                    $scope.data.curUnit.listRemember.push($scope.data.curWord) ;
                }

                if($scope.data.curUnit.listNotRemember.find(x => x.no === $scope.data.curWord.no)){
                    $scope.data.curUnit.listNotRemember = $.grep($scope.data.curUnit.listNotRemember, function(e){
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
                    $scope.data.wrongCount ==  $scope.data.wrongCount_HAN ||
                    $scope.data.wrongCount ==  $scope.data.wrongCount_Kana2){
                $scope.data.ans = '';
            }

            if($scope.data.wrongCount <= $scope.data.wrongCount_Kana2){
                $scope.data.wrongCount++;
            }
        }

        $scope.data.ans = '';

        scrolTo('ans');
    }

    function scrolTo(element){

        // set the location.hash to the id of
        // the element you wish to scroll to.
        $location.hash(element);
        $anchorScroll();

    }

    $scope.reset = function(){
        dialogService.confirmDialog("Reset All Data", "Do you want to reset data",  function() {
            console.log("ok")
            localStorageService.clearAll();
            init();
        }, function() {
            console.log("cancel")
        });
    }

    $scope.reZero = function(){
        $scope.data.curIdx = -1;
        $scope.data.curWord = {};
        $scope.data.isFirstCorrect = false;
        nextWord();
    }

    $scope.changeLearnType = function(){
        $scope.data.curIdx = -1;
        $scope.data.isFirstCorrect = false;
        nextWord();
    }

    $scope.itemCardClick = function(mode){
        switch(mode){
        case "previous":
            break;
        case "next":
            nextWord();
            break;
        case "ok":
            // neu tu chua ton tai moi add vao
            if(!$scope.data.curUnit.listRemember.find(x => x.no === $scope.data.curWord.no)){
                $scope.data.curUnit.listRemember.push($scope.data.curWord) ;
            }

            if($scope.data.curUnit.listNotRemember.find(x => x.no === $scope.data.curWord.no)){
                $scope.data.curUnit.listNotRemember = $.grep($scope.data.curUnit.listNotRemember, function(e){
                    return e.no != $scope.data.curWord.no;
               });
            }

            $scope.data.isFirstCorrect = true;

            markScore();
            nextWord();

            break;
        case "ng":

           // neu co trong tu da hoc thi xoa
           if($scope.data.curUnit.listRemember.find(x => x.no === $scope.data.curWord.no)) {
                   $scope.data.curUnit.listRemember = $.grep($scope.data.curUnit.listRemember, function(e){
                       return e.no != $scope.data.curWord.no;
                   });
            }

            // neu tu chua ton tai moi add vao
            if(!$scope.data.curUnit.listRemember.find(x => x.no === $scope.data.curWord.no) &&
                    !$scope.data.curUnit.listNotRemember.find(x => x.no === $scope.data.curWord.no)){
                $scope.data.curUnit.listNotRemember.push($scope.data.curWord) ;
            }

            // neu tu chua ton tai moi add vao
            if(!$scope.data.curUnit.listHardWords.find(x => x.no === $scope.data.curWord.no)){
                $scope.data.curUnit.listHardWords.push($scope.data.curWord) ;
            }


            markScore();
            nextWord();

            break;
        }
    }

    $scope.delayedClose = function() {
        $timeout($scope.swipeClose, 1000);
      }

    init();
}]);
