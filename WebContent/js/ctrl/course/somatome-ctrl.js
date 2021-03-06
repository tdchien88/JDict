/**
* @param $scope
* @param helloWorld (provider)
* @param helloWorldService
* @param helloWorldFactory
* @param
*/
myApp.controller("somatomeCtrl", function($scope, $stateParams, localStorageService, dialogService, $timeout, $location, $anchorScroll, constMap){
    var courses = [
        {lv:'n3goi', type: 'GOI', name: '語彙 N3', data:_getDataByKey('n3goi')},
        {lv:'n2goi', type: 'GOI', name: '語彙 N2', data: _getDataByKey('n2goi')},
        {lv:'n3kanji', type: 'KANJI', name: '漢字 N3', data: _getDataByKey('n3kanji')},
        {lv:'n2kanji', type: 'KANJI', name: '漢字 N2', data: _getDataByKey('n2kanji')}
    ];

    function init(){
        localStorageService.setPrefix('jdict.somatome');

        $scope.data = {};
        $scope.lv = $stateParams.lv;
        $scope.curCourse = {};
        // danh sach tat ca cac tu
        if($scope.lv){
            $scope.curCourse = courses.find(function(course){
                return course.lv == $scope.lv
            });
            $scope.data.listWords = $scope.curCourse.data;
        }else{
            $scope.data.listWords = n2goi;
        }

        $scope.data.listUnit = [];// danh sach tat ca cac bai

        // tu hien tai
        $scope.data.curIdx = -1;
        $scope.data.curUnit = {};
        $scope.data.curWord = {};
        $scope.data.isCorrect = false;
        $scope.data.isFirstCorrect = false;

        $scope.data.curList = [];// list current word in unit
        $scope.data.learnModel = constMap.learnModel.All.code; // [All Type Card Choice]
        $scope.data.learnType = constMap.learnType.newwords.code; // [all wrong rememberd newwords hardwords]
        $scope.data.cardType = constMap.cardType.mean.code; // [word mean]

        $scope.data.choiceType = constMap.choiceType.mean.code; // [word mean furi]
        $scope.data.correctAnsInx = 0;
        $scope.data.randomAnsCount = 8;
        $scope.data.showPopupResult = true;
        $scope.data.listRandomAns = [];// list random ans

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
                code: e.unit,
                week: e.week,
                day: e.day,
                name: "U" + e.unit + " (W"+e.week+ " - D"+e.day + ") NG:0",
                listCurrentWords: [],// danh sach cac tu trong bai
                listNotRemember: [],// danh sach cac tu chua thuoc
                listRemember: [],// danh sach cac tu da thuoc
                listNewWords: [],// danh sach cac tu chua hoc
                listHardWords: [],// ds cac tu kho
           });
        })


        $timeout(function(){
            var oldData = getStore();

            if (oldData){
                $scope.data.unit = isEmpty(oldData.unit)? 0 : oldData.unit;

                $scope.data.listUnit.forEach(e => {
                    var unit = oldData.listUnit.find(x=> x.code === e.code);

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

            if (oldData){
                settingBack(oldData);
            }

        }, 100);

        wanakana.bind($("#ans")[0] /* options */);

    }


    function settingBack(oldData){

        $scope.data.learnType = oldData.learnType;
        $scope.data.curIdx = oldData.curIdx;
        $scope.data.curWord = oldData.curWord;

        $scope.data.learnModel = oldData.learnModel;
        $scope.data.learnType = oldData.learnType;
        $scope.data.cardType = oldData.cardType;

        $scope.data.choiceType = oldData.choiceType;
    }

    function nextWord(){
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
        if($scope.data.learnType == constMap.learnType.all.code){
            $scope.data.curList = $scope.data.curUnit.listCurrentWords;
            $scope.data.curIdx++;
        }
        else if($scope.data.learnType == constMap.learnType.wrong.code){
            $scope.data.curList = $scope.data.curUnit.listNotRemember;

            if($scope.data.isFirstCorrect){
                // $scope.data.curIdx = 0;
            }  else {
                $scope.data.curIdx++;
            }

            if($scope.data.curIdx >= 7){
                $scope.data.curIdx = 0;
            }

        }
        else if($scope.data.learnType == constMap.learnType.rememberd.code){
            $scope.data.curList = $scope.data.curUnit.listRemember;
            if($scope.data.isFirstCorrect){
                $scope.data.curIdx++;
            } else {
                // $scope.data.curIdx = 0;
            }
        }
        else if($scope.data.learnType == constMap.learnType.newwords.code){
            $scope.data.curList = $scope.data.curUnit.listNewWords;
            $scope.data.curIdx = 0;
        }
        else if($scope.data.learnType == constMap.learnType.hardwords.code){
            $scope.data.curList = $scope.data.curUnit.listHardWords;
            $scope.data.curIdx++;
        }

        if($scope.data.curIdx < 0 || $scope.data.curIdx >= $scope.data.curList.length ){
            $scope.data.curIdx = 0;
        }

        $scope.data.curWord = $scope.data.curList[$scope.data.curIdx];

        $scope.data.isFirstCorrect = false;

        getListRandomAns();

        saveStore();

        setTargetFocus("ans");
    }


    function getListRandomAns() {
        if($scope.data.curWord == null) {
            $scope.data.listRandomAns = [];
            return;
        }

        // lay ds cau tra loi
        var lstAns =  randomList($scope.data.curUnit.listCurrentWords, $scope.data.randomAnsCount);

        // tim cau tra loi bi trung trong ds cau tra loi
        var listCorrectAns = lstAns.filter(function(item){
            return (item.mean == $scope.data.curWord.mean) || (item.word == $scope.data.curWord.word) ;
        })

        // neu k co cau tl dung trong ds thi them vao
        if(listCorrectAns.length == 0){
            $scope.data.correctAnsInx = randomFromInterval(0, $scope.data.randomAnsCount - 1);
            lstAns[$scope.data.correctAnsInx] = $scope.data.curWord;

        }
        // neu co nhieu cau tra loi trung thi chay lai
        else if(listCorrectAns.length > 1){
            getListRandomAns();
        }

        $scope.data.listRandomAns = lstAns;
    }



    function saveStore(){
        localStorageService.set($scope.lv, null);
        localStorageService.set($scope.lv, $scope.data);
    }

    function getStore(){

        return  localStorageService.get($scope.lv);

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

        $scope.data.curUnit.listCurrentWords = [];
        $scope.data.curUnit.listCurrentWords = $scope.data.listWords.filter(function (e) {
            return e.unit == $scope.data.unit ;
        });

        var data = getStore();
        if(data){
            var unit = data.listUnit.find(x=> x.code === $scope.data.unit);
            if(unit.listNotRemember && unit.listNotRemember.length != 0){
                $.each(unit.listNotRemember, function(i,w){
                    $scope.data.curUnit.listNotRemember[i] = $scope.data.listWords.find(w2=> w2.no === w.no);
                });
            }

            if(unit.listRemember && unit.listRemember.length != 0){
                $.each(unit.listRemember, function(i,w){
                    $scope.data.curUnit.listRemember[i] = $scope.data.listWords.find(w2=> w2.no === w.no);
                });
            }

            if(unit.listNewWords && unit.listNewWords.length != 0){
                $.each(unit.listNewWords, function(i,w){
                    $scope.data.curUnit.listNewWords[i] = $scope.data.listWords.find(w2=> w2.no === w.no);
                });
            }


        } else {
            $scope.data.curUnit.listNotRemember = [];
            $scope.data.curUnit.listRemember = [];

        }

        if($scope.data.randomAnsCount > $scope.data.curUnit.listCurrentWords.length){
            $scope.data.randomAnsCount = $scope.data.curUnit.listCurrentWords.length;
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

        // tra loi dung
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
        // tra loi sai
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

        scrolTo('scroll2here');
    }

    function scrolTo(element){

        // set the location.hash to the id of the element you wish to scroll to.
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

    $scope.choiceCardClick = function(idx){

        var han = isEmpty($scope.data.curWord.han)? "" : $scope.data.curWord.han;
        var msg =
            `<dl >
                <dd class="col-sm-10"><h4>` + $scope.data.curWord.mean + `</h4></dd>
                <dd class="col-sm-10"><h4>` + han + `</h4></dd>
                <dd class="col-sm-10 text-danger"><h4>` + $scope.data.curWord.word + `</h4></dd>
                <dd class="col-sm-10 text-danger"><h4>` + $scope.data.curWord.kana2 + `</h4></dd>
              </dl>`;

        if ($scope.data.curWord.no == $scope.data.listRandomAns[idx].no) {

            if($scope.data.showPopupResult){
                dialogService.okDialog("正解！", msg,  function() {
                    $scope.itemCardClick('ok');
                });
            } else {
                $scope.itemCardClick('ok');
            }
        } else {
            dialogService.okDialog("残念、頑張ってね！", msg,  function() {
                $scope.itemCardClick('ng');
            });
        }

    }

    $scope.delayedClose = function() {
        $timeout($scope.swipeClose, 1000);
      }

    init();
});
