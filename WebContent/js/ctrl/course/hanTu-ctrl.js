/**
* @param $scope
* @param helloWorld (provider)
* @param helloWorldService
* @param helloWorldFactory
* @param
*/
myApp.controller("hanTuCtrl", function($scope, $stateParams, localStorageService, dialogService, $timeout, $location, $anchorScroll, constMap){
    var _listWord = _getDataByKey('hanviet');

    function init(){

        $scope.data = {};
        $scope.data.tagName = constMap.hanTuTagName.JLPT.code;
        $scope.changeTagName();
    }

    $scope.changeTagName = function(){

        $scope.curCourse = {};
        if($scope.data.tagName == constMap.hanTuTagName.JLPT.code){
            localStorageService.setPrefix('jdict.hanviet_jlpt');
            _listWord.forEach(function(e){
                e.unit = e.jlpt;
            });
            $scope.data.listWords = _listWord;
        } else {
            localStorageService.setPrefix('jdict.hanviet_gakko');
            _listWord.forEach(function(e){
                e.unit = e.tag;
            });
            $scope.data.listWords = _listWord;
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
        $scope.data.cardType = constMap.cardType.word.code; // [word mean]

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
                name: e.unit + " [NG:0]",
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
                    e.name = e.unit + " [NG:" + e.listNotRemember.length + " - ★:" +e.listHardWords.length + "]";

                });
            } else {
                $scope.data.listUnit.forEach(eUnit => {
                    eUnit.listNewWords = $scope.data.listWords.filter(function (word) {
                        return eUnit.unit == word.unit ;
                    });
                });
            }

            $scope.changeUnit();

            if (oldData){
                settingBack(oldData);
            }

        }, 100);

    }

    function settingBack(oldData){

        $scope.data.learnType = oldData.learnType;
        $scope.data.curIdx = oldData.curIdx;
        $scope.data.curWord = oldData.curWord;

        $scope.data.learnModel = oldData.learnModel;
        $scope.data.learnType = oldData.learnType;
        $scope.data.cardType = oldData.cardType;

        $scope.data.choiceType = oldData.choiceType;

        $scope.changeLearnType();
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
        $scope.fcardCheckedChange();
        setTargetFocus("ans");

        $scope.data.curListSorted = $scope.data.curList.sort(function(a,b){return a.no - b.no})
    }

    $scope.fcardCheckedChange = function(){
        if(!$scope.fcardChecked){
            $("#draw").empty();
            $timeout(function(){
                $("#draw").append("<div id='drawKanji'></div>");
             },0)
            return;
        }

        $timeout(function(){
           $("#drawKanji").dmak($scope.data.curWord.word);
        },200)

    }


    function getListRandomAns() {
        if($scope.data.curWord == null) {
            $scope.data.listRandomAns = [];
            return;
        }

        // lay ds cau tra loi
        var lstAns =  randomList($scope.data.curUnit.listCurrentWords, $scope.data.randomAnsCount);

        if(!lstAns){
            console.log("lstAns errorrrrrrrrrrr")
            return;
        }

        // tim cau tra loi bi trung trong ds cau tra loi
        var listCorrectAns = lstAns.filter(function(item){
            return (item.han == $scope.data.curWord.han) || (item.word == $scope.data.curWord.word) ;
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
        localStorageService.set("data", null);
        localStorageService.set("data", $scope.data);
    }

    function getStore(){

        return  localStorageService.get("data");

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

        var oldData = getStore();
        if(oldData){
            var unit = oldData.listUnit.find(x=> x.code === $scope.data.unit);
            if(unit.listNotRemember && unit.listNotRemember.length != 0){
                $.each(unit.listNotRemember, function(i,w){
                    $scope.data.curUnit.listNotRemember[i] = $scope.data.listWords.find(w2=> w2.no === w.no);
                    $scope.data.curUnit.listNotRemember[i].wordSts = constMap.wordSts.ng.code;
                });
            }

            if(unit.listRemember && unit.listRemember.length != 0){
                $.each(unit.listRemember, function(i,w){
                    $scope.data.curUnit.listRemember[i] = $scope.data.listWords.find(w2=> w2.no === w.no);
                    $scope.data.curUnit.listRemember[i].wordSts = constMap.wordSts.ok.code;
                });
            }

            if(unit.listNewWords && unit.listNewWords.length != 0){
                $.each(unit.listNewWords, function(i,w){
                    $scope.data.curUnit.listNewWords[i] = $scope.data.listWords.find(w2=> w2.no === w.no);
                });
            }

            $.each($scope.data.curUnit.listCurrentWords, function(i,w){
                var x = oldData.curUnit.listCurrentWords.find(w2=> w2.no === w.no);
                if(x != null){
                    $scope.data.curUnit.listCurrentWords[i] = x;
                }
            });


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

        // tra loi dung
        if($scope.data.ans.toUpperCase() == $scope.data.curWord.han.toUpperCase()  ){

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
            $scope.data.curWord.wordSts = constMap.wordSts.ok.code;
            $scope.data.curUnit.listCurrentWords.find(x => x.no === $scope.data.curWord.no).wordSts = constMap.wordSts.ok.code;

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
            $scope.data.curWord.wordSts = constMap.wordSts.ng.code;
            $scope.data.curUnit.listCurrentWords.find(x => x.no === $scope.data.curWord.no).wordSts = constMap.wordSts.ng.code;

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

    function getMSG(){
        var title = $scope.data.curWord.word +' [' + $scope.data.curWord.han + ']';
        var  msg = `
            <div class="align-center pt-1 mb-2 bg-primary text-white"><h1>` + title + `</h1></div>
            <table class="wp100">
              <tr>
                <td class=" w150"  rowspan='2'>
                  <div class="w150 " style="heigth:150px">
                    <div id="draw1" ><div id='drawKanji1'></div></div>
                  </div>
                </td>
                <td class="align-left text-danger1" style="vertical-align:middle">
                  <p>訓(kun)：` + $scope.data.curWord.kun + `</p>
                  <p>音(ON) ：` + $scope.data.curWord.on + `</p>
                </td>
              </tr>
              <tr>
                <td class="align-left">
                  <p class="">Bộ thành phần:` + $scope.data.curWord.bo + `</p>
                </td>
              </tr>
              <tr>
                <td class="p-2" colspan='2'>
                  <div class="docs-callout docs-callout-info">
                  <blockquote class="blockquote">
                    <p class="align-left mb-0">` + $scope.data.curWord.mean + `</p>
                    <p class="align-left mb-0">` + $scope.data.curWord.eng + `</p>
                    <footer class="align-right blockquote-footer">` + $scope.data.curWord.note + `</footer>
                  </blockquote>
                  </div>
                </td>
              </tr>
              <tr>
                <td class="p-2" colspan='2'>
                    <p class="align-left mb-0">` + $scope.data.curWord.sample + `</p>
                </td>
              </tr>
            </table>
            `;
        return msg;
    }

    $scope.choiceCardClick = function(idx){

        var msg = getMSG();

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

        $timeout(function(){
            $("#drawKanji1").dmak($scope.data.curWord.word);
         },200)

    }

    $scope.changeLearnModel = function() {
        if($scope.data.learnModel == constMap.learnModel.All2.code)
            $scope.data.learnType = constMap.learnType.all.code;

        $scope.changeLearnType();
    }

    $scope.delayedClose = function() {
        $timeout($scope.swipeClose, 1000);
      }

    $scope.displayWord = function(curWord){
        $scope.data.curWord = $scope.data.listWords.find(x => x.no === curWord.no);

        var title = $scope.data.curWord.word +' [' + $scope.data.curWord.han + ']';
        var msg = getMSG();

        dialogService.confirmDialog(title, msg,  function() {
            $scope.itemCardClick('ok');
        },  function() {
            $scope.itemCardClick('ng');
        },"OK","NG");

        $timeout(function(){
            $("#drawKanji1").dmak($scope.data.curWord.word);
         },200)
    }

    init();
});
