/*
The legal restrict values are:
    E for Element name
    A for Attribute
    C for Class
    M for Comment
By default the value is EA, meaning that both Element names and attribute names can invoke the directive.
*/
// 入力文字タイプを定義
var proptypes = {
    NUM : "num"
    ,TEL : "tel"
    ,DATE : "date"
    ,ALPHANUM : "alphanum"
    ,ALPHANUMSIGN : "alphanumsign"
    ,KANA : "kana"
    ,JAPAN : "japan"
    ,ALL : "all"
    ,DOT: "dot"
    ,COMMA: "comma"
    ,MINUS: "minus"
    ,PLUS: "plus"
};
var symbol = {
    DOT: "."
    ,COMMA: ","
    ,MINUS: "-"
    ,PLUS: "+"
};
// 文字タイプごとに入力可能文字を定義
var patterns = {
    NUM : "^[0-9]*$"                    // 半角数字
    ,TEL : "^[0-9\\-]*$"                // 半角数字
    ,DATE : "^[0-9\\/]*$"               // 日付
    ,ALPHANUM : "^[0-9a-zA-Z ]*$"       // 半角英数字
    ,ALPHANUMSIGN : "^[\x01-\x7E]*$"    // 半角英数字記号(1byte文字のみ)
    ,KANA : "^[\x01-\x7E|ｧ-ﾝｦﾞﾟ･]*$"     // 半角ｶﾅ
    ,JAPAN : "^[^ｧ-ﾝｦﾞﾟ]*$"              // 全角文字(半角ｶﾅ以外)
};
// 前回のフォーカス項目
var beforeFocus = "";

myApp.directive("myInput", function() {
    return {
        restrict : "E",
        template : "<h1>Made by a directive!</h1>",
    };
}).directive("myDropdown", function() {
    return {
        restrict : "E",
        scope: {
            items: '=',
            defaultItemIdx: '=',
            changeEvent: '&'
          },
        template : '<select focusmove class="form-control" selected-item="">'
                    + '    <option ng-repeat="item in items" ng-value="item.code"  > {{item.name}} </option>'
                    + '</select>' ,
        replace : true,
        link : function(scope, element, attr) {
            function init(){

                var selectedItem = scope.items[scope.defaultItemIdx].code;
                setValueByKey(attr.ngModel, scope.$parent, selectedItem);
            }
            scope.$parent.$watch(attr.items, init);

            element.on("focus", function(event) {
                beforeFocus = attr.name;
            });
        }
    };
})
.directive("myTextbox", function() {
    return {
        restrict : "E",
        replace : true,
        scope : {}, //
        require : "?ngModel",
        compile : function(element, attr) {
            // 設定がない場合、半角英数字で初期化
            if(isEmpty(attr.ctrlproptype))
                attr.ctrlproptype = proptypes.ALPHANUM;

            return function link(scope, element, attr, ngModel) {
                // イベントの順番を入れ替える（テキストボックスの処理を先にする）
                var addEventFirst = function(dom, eventName, func) {
                    var allEvents = $._data(dom.get(0), "events");
                    var handlerArr = [];

                    // イベントを一時退避する
                    angular.forEach(allEvents[eventName], function(event, idx) {
                        handlerArr[idx] = event.handler;
                    });

                    // domからイベントを一度offにする
                    dom.off(eventName);

                    // テキストボックスのイベントを最初に設定する
                    dom.on(eventName, func);

                    // 残りのイベント処理を設定する
                    angular.forEach(handlerArr, function(event, idx) {
                        dom.on(eventName, event);
                    });
                };

                // 入力チェック処理
                function invalidtext(inScope, inAttr, evt) {
                    if(isEmpty(evt) || isEmpty(inAttr.name)) return;

                    invalidFromTo(inScope, inAttr, evt);

                    var formName = $(evt.target).parents("form").attr("name");
                    var requiredElement = $('form[name="' + formName + '"]').find('[name="' + inAttr.name + '"]');

                    var key = formName + "." + inAttr.name + ".$error.required";
                    var isRequire = isRequireStr(inAttr, evt);
                    var isInvalid = isRequire ? isRequire : getValueByKey(key, inScope.$parent);

                    // 必須入力チェック
                    if(!!isInvalid) {
                        switch(isUndefined(attr.isGyomuHidukeDefault) && isUndefined(attr.isUnitDefaultDisplay) && isUndefined(attr.isCustomerCdAutomaticallyGet)) {
                            case true:
                                errMsgService.addMsgLabel(baseCheckErrCd.require, inAttr);
                                requiredElement.addClass("error-place");
                                throw new Error("invalidtext");
                            case false:
                        }
                    }
                    requiredElement.removeClass("error-place");

                    // 入力文字可否チェック
                    var key = formName + "." + inAttr.name + ".$error.pattern";
                    var isInvalid = getValueByKey(key, inScope.$parent);
                    if(!!isInvalid) {
                        errMsgService.addMsgLabel(baseCheckErrCd.inputOkNg, inAttr);
                        throw new Error("invalidtext");
                    }

                    // 入力桁数チェック
                    var key = formName + "." + inAttr.name + ".$error.maxlength";
                    var isInvalid = getValueByKey(key, inScope.$parent);
                    if(!!isInvalid) {
                        var maxlength = isNotEmpty(inAttr.ngMaxlength) ? inAttr.ngMaxlength : inAttr.maxlength;
                        if(isNotEmpty(maxlength)) {
                            errMsgService.addMsgLabel(baseCheckErrCd.inputSize, inAttr);
                            throw new Error("invalidtext");
                        }
                    }

                    // 関数allowOnlypadのチェック
                    if(isNotUndefined(scope.allowOnlypad)) {
                        // プロパティの指定が空の場合スキップ
                        if(isNotEmpty(attr.isAllowOnlypad)) {
                            // 文字詰め文字のみの場合エラーとする
                            if(!scope.allowOnlypad(attr)) {
                                errMsgService.addMsgLabel(baseCheckErrCd.onlyPadchar, inAttr);
                                throw new Error("invalidtext");
                            }
                        }
                    }

                    // 日付チェック
                    switch(attr.format) {
                        case constMap.format.yyyymmdd:
                            // 正しい日付に変換できないとエラーとする
                            if(isNotEmpty(evt.target.value) && (evt.target.value.length < 10 || !isDate(evt.target.value))) {
                                errMsgService.addMsgLabel(baseCheckErrCd.dateFormat, inAttr);
                                throw new Error("invalidtext");
                            }
                            break;
                        case constMap.format.yyyymm:
                            // 空の場合処理しない
                            if(isNotEmpty(evt.target.value)) {
                                var ymArry = evt.target.value.split("/");
                                // 年
                                var yyyy = isNotEmpty(ymArry[0]) ? ymArry[0] : "";
                                // 月
                                var mm = isNotEmpty(ymArry[1]) ? ymArry[1] : "";
                                // yyyy = 1～9999、mm = 1～12以外の場合エラーとする
                                if((yyyy.length !== 4 || (yyyy <= "0000" || "9999" < yyyy))
                                        || (mm.length !== 2 || (mm <= "00" || "13" <= mm))) {
                                    errMsgService.addMsgLabel(baseCheckErrCd.dateFormat, inAttr);
                                    throw new Error("invalidtext");
                                }
                            }
                            break;
                    }

                    // 日にちチェック（1～31 or 99の場合は正常とする。それ以外のときエラーとする。）
                    if(isNotUndefined(attr.daycheck) && !(1 <= evt.target.value && evt.target.value <= 31 || evt.target.value == 99)) {
                        errMsgService.addMsgLabel(baseCheckErrCd.dayFormat, inAttr);
                        throw new Error("invalidtext");
                    }

                    // テキストボックス内でチェックするエラーコードを配列として保持する
                    var errCdArr = Object.values(baseCheckErrCd);

                    // このチェック処理で発生したエラーではない場合、エラーメッセージの削除は実施しない
                    if(isNotEmpty($rootScope.errors.errCd) && errCdArr.indexOf($rootScope.errors.errCd[inAttr.name]) === -1) return;

                    // 正常の場合、エラーメッセージを削除する
                    errMsgService.delMsgLabel(inAttr);
                }

                function invalidFromTo(inScope, inAttr, evt) {
                    // FromToの設定がある場合、他のエラーメッセージとはキー名を別にしてエラーメッセージを表示する
                    //（他のエラーと分けて表示するため。また、From側、To側でそれぞれでエラーとなっても一つのエラーメッセージのみ表示する。）
                    if(isNotUndefined(inAttr.fromto)) {
                        // FromToキー名
                        var fromtoKeyName = inAttr.fromto + "FromTo";

                        // FromTo大小チェック
                        var isInvalid = isNotUndefined(inScope.$parent.isFromtoInvalid) ? inScope.$parent.isFromtoInvalid(evt) : false;

                        // エラーとなる場合
                        if(!!isInvalid) {
                            // Fromのname値を取得する
                            var fromName = $('[fromto="' + inAttr.fromto + '"]').get(0).name;
                            // name値を元にラベル名を取得する
                            var labelName = $("label[for='" + fromName + "']").text();
                            // エラーメッセージを表示する
                            errMsgService.addMsg(baseCheckErrCd.fromTo, fromtoKeyName, labelName);

                        } else {
                            // エラーメッセージを削除する
                            errMsgService.delMsg(fromtoKeyName);
                        }
                    }
                }

                // 「,」「.」「-」記号のみの入力の場合空にする
                function invalidSymbolOnly(inScope, inAttr, evt) {
                    var ctrlPropType = inAttr.ctrlproptype;
                    if(isEmpty(ctrlPropType)) return;
                    var arry = ctrlPropType.split(".");

                    // 数値かつドットまたはマイナスまたはカンマが設定されているとき
                    if(hasStr(arry, proptypes.NUM) && (hasStr(arry, proptypes.DOT) || hasStr(arry, proptypes.MINUS) || hasStr(arry, proptypes.COMMA))) {
                        var inputValue = evt.target.value;
                        inputValue = inputValue.replace(/[,.-]/g, "");

                        if(isNotEmpty(inputValue)) return;
                        // 記号のみのため入力を空にする
                        evt.target.value = inputValue;
                        ngModel.$setViewValue(inputValue);
                    }
                }

                // テキストボックスからフォーカスアウトした時
                addEventFirst(element, "blur", function(event) {
                    console.log("myTextboxBlur");

                    // nameの値を保持する
                    beforeFocus = attr.name;

                    // ng-modelの値を設定していない場合処理しない
                    if(isEmpty(attr.ngModel)) return;

                    invalidSymbolOnly(scope, attr, event);

                    // デフォルト値の設定がある場合設定する
                    if(isNotUndefined(scope.setDefvalue)) {
                        scope.setDefvalue(event.target, attr.ngModel, attr.defvalue);
                    }

                    // 文字詰め文字の設定がある場合設定する
                    if(isNotUndefined(scope.padformat)) {
                        // 文字詰めをする場合(未設定、空文字はtrue)
                        if(isEmpty(attr.isPad) || toBoolean(attr.isPad)) {
                            scope.padformat(event.target, attr.ngModel);
                        }
                    }

                });

                element.on("focus", function(event) {
                    if(event.target.value.length > 0) {
                        $(this).select();
                    }
                });

                // テキストボックスにキー入力をした時
                element.on("keydown", function(event) {
                    isKeyDown = true;
                    // 日付型の場合、「/」の入力は自動のため入力を受け付けないようにする
                    if(attr.ctrlproptype === "date" && event.key === "/") {
                        event.preventDefault();
                    }
                });

                // テキストボックスに値を入力した時
                element.on('input', function(event) {
                    console.log("myTextboxInput");

                });

                // カスタムイベント（scopeからng-model値に設定したとき
                element.on("invalid", function(event) {
                    if(isEmpty(event.target.value)) return;
                    try {
                        // 入力チェックをする
                        invalidtext(scope, attr, event);
                    } catch(e) {
                        if(e.message === "invalidtext") {
//                            event.stopImmediatePropagation();
                        } else {
                            throw e;
                        }
                    }
                });
            };
        },
        template : function(element, attr) {
         // タイプに応じたclassを設定する
            var css = "";
            if(isNotEmpty(attr.ctrlproptype)) {
                var type = attr.ctrlproptype.split(".")[0];
                css = "ctrlp-" + type;
            }
            var type = isNotEmpty(attr.type) ? attr.type : "text";
            return '<input '
                    + ' type="' + type + '"'
                    + ' class="form-control ng-dirty '+ css + '"'
                    + ' ctrlproptype="" '
                    + ' ng-pattern="" '
                    + ' padchar="" '
                    + ' is-allow-onlypad="" '
                    + ' defvalue="" '
                    + ' focusmove '
                    + ' maxlength="" '
                    + ' size="">'
        },
    };
})

// 入力可否文字の設定
.directive("ctrlproptype", ["$filter", function($filter) {
    return {
        restrict : "A", // A:属性
        require : "?ngModel",
        link : function(scope, element, attr, ngModel) {

            var regexp = null;
            function setpattern(pat, attr, kanaFlg) {
                regexp = new RegExp(pat);
                // 半角カナ設定の場合は入力確定後に入力チェックをするため、ng-patternの設定はしない
                if(kanaFlg) return;
                attr.ngPattern = regexp.toString();
            }

            switch(attr.ctrlproptype) {
                case proptypes.NUM:
                    setpattern(patterns.NUM, attr); break;
                case proptypes.TEL:
                    setpattern(patterns.TEL, attr); break;
                case proptypes.DATE:
                    setpattern(patterns.DATE, attr); break;
                case proptypes.ALPHANUM:
                    setpattern(patterns.ALPHANUM, attr); break;
                case proptypes.ALPHANUMSIGN:
                    setpattern(patterns.ALPHANUMSIGN, attr); break;
                case proptypes.KANA:
                    setpattern(patterns.KANA, attr, true); break;
                case proptypes.JAPAN:
                case proptypes.ALL:
                    break;
                default: // 数値型で小数点、カンマ、マイナスが含まれる場合
                    var pattern = "";
                    var types = attr.ctrlproptype.split(".");
                    for(var i = 0; i < types.length; i++) {
                        switch(types[i]) {
                            case proptypes.ALPHANUM:
                                pattern += "0-9a-zA-Z "; break;
                            case proptypes.NUM:
                                pattern += "0-9"; break;
                            case "plus":
                                pattern += "\\+"; break;
                            case "minus":
                                pattern += "\\-"; break;
                            case "comma":
                                pattern += "\\,"; break;
                            case "dot":
                                pattern += "\\."; break;
                            default:
                        }
                    }
                    setpattern("^[" + pattern + "]*$", attr);
            }

            // 入力不可の文字を削除する
            function delNgInput(event) {
                var str = event.target.value;
                // 設定値がALLもしくは、入力値が正規表現に一致するならスキップする
                if(isEmpty(regexp) || regexp.test(str)) return;
                for(var i = 0; i < str.length; i++) {
                    if(!regexp.test(str[i])) {
                        // 入力許可文字以外の値を消去する
                        str = str.replace(str[i], "");
                        // 消去したので減算し次の対象を調整
                        i -= 1;
                    }
                }
                event.target.value = str;
                ngModel.$setViewValue(event.target.value);
            }

            // IME入力確定後のイベント（半角カナ入力時用）
            element.on("compositionend change", function(event) {
                delNgInput(event);
            });

            element.on("input", function(event) {
                // IME入力時の処理は別イベントで実施するためこの処理はスキップする
                if(attr.ctrlproptype === proptypes.KANA) return;
                delNgInput(event);
            });
        }
    }
}])
.directive("isDisplayComma", ["$filter", function($filter) {
    return {
        restrict : "A",
        require : "?ngModel",
        link : function(scope, element, attr, ngModel) {

            var displayComma = function() {
                var focusFlg = false;
                return {
                    isFocus: function() {
                        return focusFlg;
                    },
                    onFocus: function() {
                        focusFlg = true;
                    },
                    init: function() {
                        focusFlg = false;
                    }
                }
            }();

            scope.$watch(attr.ngModel, function(value) {
                // データが設定されたときにカンマ編集をする
                if(isNotEmpty(value) && !displayComma.isFocus()) {
                    editComma(attr, element[0], ngModel, $filter);
                }
            });

            element.on("focus", function(event) {
                // フォーカスフラグをtrueにする
                displayComma.onFocus();

                var replaceValue = replaceAllComma(event.target.value);

                // フィルターを通したあとの値が存在する場合、テキストボックスの表示を数値のみにする
                if($filter("number")(replaceValue)) {
                    event.target.value = replaceValue;
                }
            });

            element.on("blur", function(event) {
                // フォーカスフラグをfalseにする
                displayComma.init();

                // カンマ編集をする
                editComma(attr, element[0], ngModel, $filter);
            });
        }
    }
}])
// デフォルト値の設定
.directive("defvalue", function() {
    return {
        restrict : "A", // A:属性
        require: "?ngModel",
        link : function(scope, element, attr, ngModel) {

            scope.setDefvalue = function(input, modelname, defvalue) {
                if(defvalue.length === 0) return;

                if(input.value.length === 0) {
                    // テキストボックスに表示する
                    input.value = defvalue;
                    // 設定したデフォルト値をng-modelに値を保持する
                    ngModel.$setViewValue(input.value);
                }
            }
        }
    }
});

//search box
myApp.directive("searchBox", ["goin2", "kanjin2",  function(goin2, kanjin2) {
    return {
        restrict : "E", // A:属性
        require: "?ngModel",
        compile : function(element, attr) {
            return function link (scope, element, attr, ngModel) {

                function searchText (scope){
                    console.log("search: "+scope.searchStr);
                    console.log(goin2);

                    var res = JSON.stringify(jQuery.grep(goin2, (x, i) => (
                            isEqual(x.word, scope.searchStr) ||
                            isEqual(x.kana1, scope.searchStr) ||
                            isEqual(x.kana2, scope.searchStr) ||
                            x.mean.indexOf(scope.searchStr) > -1
                        )
                    ),null,2);
                    res += JSON.stringify(jQuery.grep(kanjin2, (x, i) => (
                            isEqual(x.word, scope.searchStr) ||
                            isEqual(x.kana1, scope.searchStr) ||
                            isEqual(x.kana2, scope.searchStr) ||
                            x.mean.indexOf(scope.searchStr) > -1
                        )
                    ),null,2);
                    scope.returnValue =  res;
                }

                scope.search = function() {
                    searchText(scope);
                }
            };
        },
        templateUrl : "./partial/search.html",
        /*
        template : `
<form name="search-form">
  <div class="input-group mb-3">
    <div class="input-group-prepend">
      <span class="input-group-text w70">検索</span>
    </div>
    <my-textbox ctrlproptype="japan" ng-model="searchStr" placeholder="さあ、今日も頑張ろう！"></my-textbox>
    <span class="input-group-append">
      <button class="btn btn-primary" ng-click="search()" type="button"><i class="fa fa-search"></i></button>
    </span>
  </div>
  <div>
  <pre class="ng-binding">{{returnValue}}
  </pre>
  </div>
</form>
        `,
        */
    };
}]);

