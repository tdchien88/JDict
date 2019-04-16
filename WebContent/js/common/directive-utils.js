/**
 * 初期表示時のフォーカス先を設定する
 * @returns
 */
function setFirstFocus() {
    var elementWithIndex = {};
    angular.forEach($("[focusmove]"), function(element, idx) {
        // 属性値にインデックスが設定されていて、活性化している要素の場合
        if(!!$(element).attr("focusmove") && $(element).filter(":visible").not(":disabled").length !== 0) {
            // 対象の要素を保持する
            elementWithIndex[$(element).attr("focusmove")] = element;
        }
    });
    // 次対象要素へフォーカスする（属性値が設定されている場合）
    if(Object.keys(elementWithIndex).length > 0) {
        elementWithIndex[Object.keys(elementWithIndex)[0]].focus();
        return;
    }

    // 次対象要素へフォーカスする（上記条件に該当しなかった場合）
    var targetElement = $("[focusmove]").filter(":visible").not(":disabled").not(".msg-dialog-btn").filter(":first");
    if(!!targetElement.length) {
        targetElement.focus();
        return;
    }
}

/**
 * 対象のフォーカス先を設定する
 * @param nameValue 要素のname属性の値
 * @param targetIndex リストコントロールのフォーカス対象先要素のindex値
 * @returns
 */
function setTargetFocus(nameValue, targetIndex) {
    var nameSelector = "[name='" + nameValue + "']";
    var notSelector = "button[ng-model]";
    var element = $(nameSelector);

    // リストコントロール内に存在しているとき
    if($("#isd-listctrl").find(nameSelector).not(notSelector).length > 0) {
        if(!Number.isNaN(Number(targetIndex)) && targetIndex !== "") {
            $('[data-row-index="' + targetIndex + '"]').find(nameSelector).not(notSelector).focus();
            return;
        }
        element.not(notSelector).focus();
        return;
    }

    // 照会画面と親画面で同じname属性が使われているとき
    if(element.length > 1) {
        // 照会画面のコントロールにフォーカスする
        element.eq(0).not(notSelector).focus();
        return;
    }

    // 対象のコントロールにフォーカスする
    element.not(notSelector).focus();
}

/**
 * フォーカス移動可能な全要素を取得する
 * （非活性項目、「combotabstop」属性の設定がある場合、
 *   searchformボタンと複数範囲指定表示ボタン、カレンダーボタンについてはフォーカスの対象にとらない）
 * @param element 要素
 * @returns
 */
function getElementsFocusMoveEnable(element) {
    if(isEmpty(element)) return;
    return element.parents("form").find(constMap.focusmoveSlector).filter(":visible").not(":disabled").not("[combotabstop]").not("#searchformBtn,#multiModalBtn,.ymd-btn");
}

/**
 * Enterキー移動と同じ動きにするときの判別用
 *
 * @param event キーダウンイベント
 * @param element 移動の起点となる要素
 * @returns
 */
function isSameEnterMove(event, element) {
    if(isEmpty(event) || isEmpty(element)) return false;
    var listctrlElement = element.closest("#isd-listctrl");
    return event.keyCode == 9 && listctrlElement.length == 1 && isNotUndefined(listctrlElement.attr("is-same-enter-move"));
}

/**
 * フォーカス移動を実行する
 * @param event イベントオブジェクト（keydownイベントを想定）
 * @param ownKey name属性値 or element（ディレクティブから呼ぶ場合）
 * @param attr Attribute（ディレクティブから呼ぶ場合）
 * @returns
 */
function focusmove(event, ownKey, attr) {
    if(isEmpty(event) || isEmpty(ownKey)) return;

    // 自オブジェクト
    var thisElement = attr ? $(ownKey) : $("[name='" + ownKey + "']");
    // form以下の移動可能タグを取得する（非活性項目、「combotabstop」属性の設定がある場合、searchformボタンと複数範囲指定表示ボタン、カレンダーボタンについてはフォーカスの対象にとらない）
    var formChildElement = getElementsFocusMoveEnable(thisElement);

    // 移動対象のインデックス
    var targetObj = {
        "index" : 0,
        "element": thisElement,
        "shiftKeyFlg": event.shiftKey // シフトキー入力時on
    };

    // 値に「-1」が設定されていたらEnterキー移動の対象にしない
    var isInvalidEnter = (thisElement.attr("focusmove") == -1);

    // Enterキー制御
    if(isSameEnterMove(event, thisElement) || event.keyCode == 13 && !isInvalidEnter) {
        // textareaの時は改行を許可する
        if(formChildElement.context.type == "textarea") return;

        // キー入力をリセット
        event.preventDefault();

        // 変数の初期化
        var elementWithIndex = [], elementWithNoIndex = [];
        // インデックスの有無によって、それぞれの配列に保持する
        angular.forEach(formChildElement, function(element, idx) {
            // focusmoveにインデックスが設定されている場合
            if($(element).attr("focusmove")) {
                // 値に「-1」が設定されている場合はEnterキーでのフォーカス移動の対象としない
                if($(element).attr("focusmove") != -1) {
                    // index順で保持する
                    elementWithIndex[$(element).attr("focusmove")] = element;
                }

            } else {
                // 上記以外を保持する
                elementWithNoIndex.push(element);
            }
        });

        var allElementArry = [], i = 0;
        // インデックスを"0"から採番し直す
        angular.forEach(elementWithIndex, function(element) {
            allElementArry[i++] = element;
        });
        // 一つの配列に保持する
        allElementArry = allElementArry.concat(elementWithNoIndex);

        // 次移動先のインデックスを取得する
        getTargeIndex(allElementArry, targetObj);

        // 活性項目が一つの場合、次の項目へフォーカスを移動できないため、フォーカスアウト処理を実行する
        if(allElementArry.length === 1) {
            $(allElementArry[targetObj.index]).blur();
        }

        // 「stop-focusmove」属性がある場合は、次の項目へフォーカスせず、フォーカスアウト処理を実行する
        // （画面側で制御できるようにするため）
        if(isNotEmpty(attr) && isNotUndefined(attr.stopFocusmove) && !targetObj.shiftKeyFlg) {
            $(targetObj.element).blur();
            return;
        }

        // 対象タグへ移動する
        $(allElementArry[targetObj.index]).eq(0).focus();

    // Tabキー制御
    } else if(event.keyCode == 9 || event.keyCode == 13 && isInvalidEnter) {
        // キー入力をリセット
        event.preventDefault();

        // 次移動先のインデックスを取得する
        getTargeIndex(formChildElement, targetObj);

        // 活性項目が一つの場合、次の項目へフォーカスを移動できないため、フォーカスアウト処理を実行する
        if(formChildElement.length === 1) {
            formChildElement.blur();
        }

        // 「stop-focusmove」属性がある場合は、次の項目へフォーカスせず、フォーカスアウト処理を実行する
        // （画面側で制御できるようにするため）
        if(isNotEmpty(attr) && isNotUndefined(attr.stopFocusmove) && !targetObj.shiftKeyFlg) {
            $(targetObj.element).blur();
            return;
        }

        // 対象タグへ移動する
        formChildElement.eq(targetObj.index).focus();
    }
}

/**
 * 次移動先のインデックスを取得する
 * @param elements オブジェクトまたは配列
 * @param target インデックスを参照渡しするためのオブジェクト
 * @returns
 */
function getTargeIndex(elements, targetObj) {
    $.each(elements, function(idx, element) {
        if(targetObj.element[0] === element) {
            // シフトキー押しながらの場合は逆方向へ移動する
            if(!!targetObj.shiftKeyFlg) {
                // -1をした後に対象インデックスに保持する
                targetObj.index += --idx;
                // 最初のinputタグに到達したとき、最後のinputタグを対象とする
                if(targetObj.index === -1) targetObj.index = elements.length - 1;
            } else {
                // +1をした後に対象インデックスに保持する
                targetObj.index += ++idx;
                // 最後のinputタグに到達したとき、最初のinputタグを対象とする
                if(targetObj.index === elements.length) targetObj.index = 0;
            }
            // 処理を抜ける
            return false;
        }
    });
}

/**
 * 起点要素の次要素へフォーカスする
 * @param nameValue 要素のname属性の値
 * @param targetIndex リストコントロールのフォーカス対象先要素のindex値
 * @returns
 */
function focusmoveToNext(ownName) {
    var nameSelector = "[name='" + ownName + "']";
    var element = $(nameSelector);
    var activeElements = getElementsFocusMoveEnable(element);

    $.each(activeElements, function(index, activeEle) {
        if($(activeEle).is(element)) {
            var targetElement = $(activeElements[++index]);
            if(targetElement.length <= 0) {
                // 次の要素が存在しないとき最初の要素にフォーカスする
                activeElements[0].focus();
            } else {
                // 次の要素にフォーカスする
                targetElement.focus();
            }
            return false;
        }
    });
}

/**
 * 起点要素の前要素へフォーカスする
 * @param nameValue 要素のname属性の値
 * @param targetIndex リストコントロールのフォーカス対象先要素のindex値
 * @returns
 */
function focusmoveToPrev(ownName) {
    var nameSelector = "[name='" + ownName + "']";
    var element = $(nameSelector);
    var activeElements = getElementsFocusMoveEnable(element);

    $.each(activeElements, function(index, activeEle) {
        if($(activeEle).is(element)) {
            var targetElement = $(activeElements[--index]);
            if(targetElement.length <= 0) {
                // 前の要素が存在しないとき最初の要素にフォーカスする
                activeElements[activeElements.length - 1].focus();
            } else {
                // 前の要素にフォーカスする
                targetElement.focus();
            }
            return false;
        }
    });
}

/**
 * Commitボタンにフォーカスを当てる
 * @returns
 */
function focusCommitBtn() {
    execFocus("#commitBtn");
}

/**
 * Endボタンにフォーカスを当てる
 * @returns
 */
function focusEndBtn() {
    execFocus("#endBtn");
}

/**
 * Clearボタンにフォーカスを当てる
 * @returns
 */
function focusClearBtn() {
    execFocus("#clearBtn");
}

/**
 * Otherボタンにフォーカスを当てる
 * @param id id名
 * @returns
 */
function focusOtherBtn(id) {
    execFocus("#" + id);
}

/**
 * フォーカスを当てる処理を実施する
 * @param targetId 対象のid名
 * @returns
 */
function execFocus(targetId) {
    $(targetId).filter(":visible").not(":disabled").focus();
}

/**
 * 文字列をboolean値に変換する
 * @param arg 変換する値
 * @returns true or false or arg
 */
function toBoolean(arg) {
    switch(arg) {
        case "true":
            return true;
        case "false":
            return false;
        default:
            return arg;
    }
}

/**
 * scopeの中からkeyで指定したオブジェクトに値を設定する
 * @param key オブジェクト名称を文字列で指定（"xxx.xxx"）
 * @param obj 参照するscopeを指定する
 * @param data オブジェクトに設定する値
 * @returns
 */
function setValueByKey(key, obj, data) {
    if(isEmpty(obj)) return;
    var keys = key.split(".");
    var value = obj;

    for(var i = 0; i < keys.length - 1; i++) {
        if(isNotEmpty(value[keys[i]])) {
            // Dateオブジェクト以外のオブジェクトを参照する
            if(isType(value[keys[i]], "Object") && !isType(value[keys[i]], "Date")) {
                value = value[keys[i]] // 参照オブジェクト
            }
        } else {
            value[keys[i]] = {}; // 存在しない場合オブジェクトを生成する
            value = value[keys[i]];
        }
    }
    value[keys[keys.length - 1]] = data; // 参照しているオブジェクトに値を追加する
}

/**
 * scopeの中からkeyで指定したオブジェクトの値を取得する
 * @param key オブジェクト名称を文字列で指定（"xxx.xxx"）
 * @param obj 参照するscopeを指定する
 * @returns
 */
function getValueByKey(key, obj) {
    if(isEmpty(key)) return;
    var keys = key.split(".");
    var value = obj;

    for(var i = 0; i < keys.length; i++) {
        if(isNotEmpty(value[keys[i]])) {
            // 最終keyの場合
            if(keys.length === i + 1) break;

            // Dateオブジェクト以外のオブジェクトを参照する
            if(isType(value[keys[i]], "Object") && !isType(value[keys[i]], "Date")) {
                value = value[keys[i]] // 参照オブジェクト
            }
        }
    }
   return value[keys[keys.length - 1]];
}

/**
 * scopeの中からkeyで指定したオブジェクトが存在するかチェックする
 * @param key オブジェクト名称を文字列で指定（"xxx.xxx"）
 * @param obj 参照するscopeを指定する
 * @returns
 */
function isExistsKey(key, obj) {
   return isNotEmpty(getValueByKey(key, obj));
}

/**
 * クリックイベントをバインドする
 * @param element
 * @returns
 */
function bindClickEvent(element) {
    element.on("keyup", function(event) {
        // スペースキー入力時、クリックイベント発火する
        if(event.keyCode === 32) {
            $(event.target).trigger("click");
        }
    });
}

var inff118 = {
    templateUrl : "partials/INF/INFF118.html",
    controller : "INFF118Ctrl",
    openedClass : "INFF118",
    title : "複数範囲指定画面",
    size : "ssm"
};

var detailRetrieval = {
//    20181022 - Chien - INFF120画面を作成
//    templateUrl : "partials/INF/detail-retrieval-dialog.html",
//    controller : "detailRetrievalDialogCtrl",
//    openedClass : "detail-retrieval-dialog"

    templateUrl : "partials/INF/INFF120.html",
    controller : "INFF120Ctrl",
    openedClass : "INFF120"
};

var detailRetrieval2 = {
//    20181022 - Chien - INFF119画面を作成
//    templateUrl : "partials/INF/detail-retrieval-dialog2.html",
//    controller : "detailRetrievalDialog2Ctrl",
//    openedClass : "detail-retrieval-dialog2"

    templateUrl : "partials/INF/INFF119.html",
    controller : "INFF119Ctrl",
    openedClass : "INFF119"
};

/**
 * 担当者コードを取得する
 *
 * @returns
 */
var getTntocd = function(authService) {
    return authService.getUser().tntocd;
};

/**
 * システム日付を取得する
 *
 * @returns
 */
var getSysDate = function() {
    return getToday();
};

/**
 * searchform名に該当する要素のng-modelの値を取得する
 *
 * @param name searchform名
 * @param scope スコープ
 * @returns
 */
var getNgModelVal = function(name, scope, thisObj) {
    // オブジェクトに値がある場合
    if(!!thisObj) {
        // 前の兄弟要素から最初に条件に該当するng-modelを取得
        var ngModelFromSibling = $(thisObj).prevAll("[searchform='" + name + "']:first").attr("ng-model");
        // 兄弟要素から見つけた場合
        if(!!ngModelFromSibling) {
            return getValueByKey(ngModelFromSibling, scope);
        }

        // 上位階層の全親要素から最初に条件に該当するng-modelを取得
        var ngModelFromParent = $(thisObj).parents().find("[searchform='" + name + "']:first").attr("ng-model")
        // 上位階層の全親要素から見つけた場合
        if(!!ngModelFromParent) {
            return getValueByKey(ngModelFromParent, scope);
        }

        return null;
    }
    return getValueByKey($('[searchform="' + name + '"]:first').attr("ng-model"), scope);
};

/**
 * 内部倉庫コードの直近の倉庫コードを取得する
 *
 * @param attr attribute（属性一覧）
 * @returns
 */
var getSokoCdVal = function(attr) {
    // 直近のform属性を取得
    var closestForm = $(attr.$$element).closest("form");
    // 倉庫コードのオブジェクト取得
    var sokoCdObj = closestForm.find('input[searchform="warehouse"]');

    // 倉庫コードのオブジェクトが複数存在する場合、内部倉庫の位置から特定する
    if(sokoCdObj.length > 1) {
        // 内部倉庫コードのオブジェクト
        var naibuSokoCdObj = closestForm.find('input[searchform="inside-warehouse"]');
        // 対象の倉庫コードを特定するためのindexを保持する
        var tgtIndex = -1;

        $.each(naibuSokoCdObj, function(idx, obj) {
            if($(attr.$$element).is($(obj))) {
                tgtIndex = idx;
                return false;
            }
        });

        // 倉庫コードを返す（自身の要素からみて近くにある要素から取得）
        return sokoCdObj.eq(tgtIndex).val();

    } else {
        // 倉庫コードがselectboxの場合id属性から特定する
        if(sokoCdObj.length === 0) sokoCdObj = closestForm.find("#warehouse");
        // 倉庫コードを返す
        return sokoCdObj.val();
    }
};

/**
 * 業務系マスタデータ設定処理
 *
 * @param scope スコープ
 * @param attr 要素属性
 * @param data 設定する値
 * @returns
 */
var setGyData = function(scope, attr, data) {
    // モーダル画面の中にリストコントロールがあり、gyDataを取得する項目がある場合
    // スコープの親階層のさらに一つ上の親階層に保持する（画面側でgyDataが参照できないため）
    if(attr.$$element.closest("#isd-listctrl").closest(".modal-dialog").length > 0) {
        setValueByKey("gyData." + attr.name, scope.$parent.$parent, data);
    } else {
        setValueByKey("gyData." + attr.name, scope.$parent, data);
    }
};

/**
 * 内部関数設定処理
 *
 * @param scope スコープ
 * @param attr 要素属性
 * @param func 設定する関数
 * @param funcName 内部関数名
 * @returns
 */
var setGyFunc = function(scope, attr, func, funcName) {
    // 内部関数を設定する
    setValueByKey("gyFunc." + funcName + "." + attr.name, scope.$parent, func);
}

/**
 * 存在チェックタイプ取得
 *
 * @param scope スコープ
 * @param attr 要素属性
 */
var getExistType = function(scope, attr) {
    // 存在チェックタイプを確認する
    switch(attr.existschecktype) {
        case constMap.checktype.Exist:
        case constMap.checktype.NoExist:
        case constMap.checktype.DelFgNoCheck:
        case constMap.checktype.NoCheck:
            // 属性値に一致する場合はそのまま返す
            return attr.existschecktype;
        default:
            // 一致しなかった場合はscope内から取得する
            return getValueByKey(attr.existschecktype, scope);
    }
};

/**
 * 業務共通存在チェック処理
 * チェックタイプ：Exist, NoExist, DelFgNoCheck, NoCheck
 *
 * @param scope スコープ
 * @param attr 要素属性
 * @param idata 検索結果データ
 * @param existerrcd 存在エラーコード
 * @param notexisterrcd 未存在エラーコード
 * @param checkGyOriginCond 業務独自チェック処理
 * @param errMsgService エラーメッセージ表示ファクトリ
 * @returns boolean（trueなら正常、falseならエラー）
 */
var checkExistType = function(scope, attr, idata, existErrCd, noExistErrCd, checkGyOriginCond, errMsgService) {
    // 存在チェックタイプ取得
    var existschecktype = getExistType(scope, attr);

    switch(existschecktype) {
        case constMap.checktype.Exist:
            // データが存在する場合エラーとする
            if(isNotEmpty(idata)) {
                // エラーメッセージを設定する
                errMsgService.addMsgLabel(existErrCd, attr);
                // エラーとして返す
                return false;
            }
            return execOriginFunc();
        case constMap.checktype.NoExist:
            // データが存在しない場合、または論理削除されている場合エラーとする
            if(isEmpty(idata) || idata.delkbn === kubunmap.DELKBN.DELZMI.code) {
                // エラーメッセージを設定する
                errMsgService.addMsgLabel(noExistErrCd, attr);
                // エラーとして返す
                return false;
            }
            return execOriginFunc();
        case constMap.checktype.DelFgNoCheck:
            // データが存在しない場合、エラーとする
            if(isEmpty(idata)) {
                // エラーメッセージを設定する
                errMsgService.addMsgLabel(noExistErrCd, attr);
                // エラーとして返す
                return false;
            }
            return execOriginFunc();
        case constMap.checktype.NoCheck:
            return execOriginFunc();
        default:
            // 該当するチェックタイプがない場合、チェックNGとして返す。
            return false;
    }

    function execOriginFunc() {
        // 業務独自エラーチェック処理が渡された場合
        if(isNotEmpty(checkGyOriginCond)) {
            // 業務独自エラーチェック処理を実施し、エラーの場合エラーとして返す
            if(!checkGyOriginCond()) return false;
        }
        // 正常として返す
        return true;
    }
};

var execFinallyFunc = function(scope, attr, idata, errMsgService, addArgs) {
    if(isNotEmpty(idata)) {
        // 画面に表示しない項目を含むデータの保持
        setGyData(scope, attr, idata);
    }
    // 正常の場合、エラーメッセージを削除する
    errMsgService.delMsgLabel(attr);
    // コールバック関数の設定がある場合実行する
    execCallBackFunc(addArgs);
}

/**
 * gyBankBranchCdDataAccessName共通処理
 * 銀行コード、支店コードの名称表示の同期など
 *
 * @param scope スコープ
 * @param attr 要素属性
 * @param result 検索結果データ
 * @param inputdata 入力値
 * @param asyncService 非同期通信サービス
 * @param GyCtrl 業務コントロール
 * @returns
 */
var setBankBranch = function(scope, attr, result, inputdata, asyncService, GyCtrl, errMsgService, addArgs) {
    // 銀行コードを表すフラグが設定されていない場合処理しない
    if(!result.isGnko && !result.isForm && attr.searchform !== "bank-branch") return;

    // name属性のセレクター定義
    var nameSelector = '[name="' + attr.name + '"]';
    // searchform属性のセレクター定義
    var searchformSelector = 'input[searchform="' + attr.searchform + '"]';

    // フォーカスしていた銀行コードまたは支店コードのオブジェクトを取得する
    var bankbranchObj = $(searchformSelector);
    // 支店コードにフォーカスしていたなら銀行コードのオブジェクトを取得する
    var bankObj = $(searchformSelector + "[bank]");
    // 銀行コードにフォーカスしていたなら支店コードのオブジェクトを取得する
    var branchObj = $(searchformSelector  + "[branch]");

    var bankName = bankObj.attr("name");              // 銀行コードのname属性値
    var bankNgModel = bankObj.attr("ng-model");       // 銀行コードのng-model名
    var branchName = branchObj.attr("name");          // 支店コードのname属性
    var branchNgModel = branchObj.attr("ng-model");   // 支店コードのng-model名
    var gnkocd = getValueByKey(bankNgModel, scope);   // 銀行コードの値
    var stencd = getValueByKey(branchNgModel, scope); // 支店コードの値

    // モーダル行から取得したデータの設定
    if(isEmpty(inputdata)) {
        var data = result.row;
        // データを該当する各ng-modelに設定する
        setValueByKey(bankNgModel, scope, data.gnkocd);   // 銀行コード
        setValueByKey(branchNgModel, scope, data.stencd); // 支店コード

        var bankSearchName = getSearchName(bankName);
        var branchSearchName = getSearchName(branchName);

        if(isNotEmpty(bankSearchName)) setValueByKey(bankSearchName, scope, data.gnkomeiknji);   // 銀行名称
        if(isNotEmpty(branchSearchName)) setValueByKey(branchSearchName, scope, data.stenmeiknji); // 支店名称
        return;
    }

    // 銀行コードと支店コード両方の値がある場合（テキストボックスから入力した場合に処理する）
    if(!!gnkocd && !!stencd) {
        asyncService.async(GyCtrl.getBankBranchcd({"gnkocd" : gnkocd, "stencd" : stencd}).$promise, function(result) {
            var idata = result.data;

            // エラーチェックを行う
            var isNotError = checkExistType(scope, attr, idata, "ECMN0390", "EMNT0270", null, errMsgService);

            // エラーではない場合、表示名称に値を設定する
            if(isNotError) {
                if(isNotEmpty(idata)) {
                    // データを該当する各ng-modelに設定する
                    setValueByKey(getSearchName(bankName), scope, idata.gnkomeiknji);   // 銀行名
                    setValueByKey(getSearchName(branchName), scope, idata.stenmeiknji); // 支店名
                }

                errMsgService.delMsg(bankName);
                errMsgService.delMsg(branchName);

                // 内部データ保持・コールバック関数実行・エラーメッセージ削除処理
                execFinallyFunc(scope, attr, idata, errMsgService, addArgs);
            } else {
                // エラーのとき、エラーコールバック関数が設定されている場合実行する
                if(isNotEmpty(addArgs.errCallbackFunc)) addArgs.errCallbackFunc(addArgs.errCallbackParam);
            }
        });
    }
};

/**
 * 数値3桁ごとにカンマ区切りの設定
 * @param attr
 * @param elementObj
 * @param ngModel
 * @param $filter
 * @returns
 */
function editComma(attr, elementObj, ngModel, $filter) {

    // プロパティタイプにcommaが設定されており、入力値が存在する場合
    if(isNotUndefined(attr.isDisplayComma) && !!elementObj.value) {

        // カンマを除き、数値のみを保持する
        var replaceValue = Number(replaceAllComma(elementObj.value));

        // 数値でない場合は処理をしない
        if(Number.isNaN(replaceValue)) return;
        // Javascript上の安全な数値の最大値を超える場合は処理をしない
        if(Number.MAX_SAFE_INTEGER < replaceValue) return;

        // 小数部最大桁数設定がある場合
        if(!!attr.maxdeclength) {
            // 3桁ごとに「,」を設定しテキストボックス内に表示する
            //（最大桁数まで0埋めされるため小数部の右端の0を取り除く）
            elementObj.value = editDecimalZero($filter("number")(replaceValue, Number(attr.maxdeclength)));
        } else {
            // 3桁ごとに「,」を設定しテキストボックス内に表示する
            elementObj.value = $filter("number")(replaceValue);
        }
        // ng-modelの値は数値のみの値で保持する
        ngModel.$setViewValue(replaceValue);
    }
}

/**
 * 「,」を取り除き数値のみに整形する（1,234,567→1234567）
 * @param input
 * @returns
 */
function replaceAllComma(input) {
    return input.replace(/,/g, "");
}

/**
 * 業務エラーメッセージを初期化する
 * @param $scope 対象スコープ
 */
var initErrormsg = function($scope) {
    delete $scope.$parent.errors;
};

/**
 * searchname,nameの値の一致するsearchname側の要素のng-modelのキーを取得する
 * @param name searchnameと同じ値をもつname
 */
function getSearchName(name) {
    return $('[searchname="' + name + '"]' ).attr("ng-model");
}

/**
 * 画面に表示しない項目を含むデータの保持
 * @param scope
 * @param data
 * @param name
 */
function saveBackdata(scope, data, name) {
    //画面に表示しない項目を含むデータの保持
    setValueByKey("gyData." + name, scope.$parent, data);
}

/**
 * 入力データ保持共通処理
 * @param scope
 * @param inputdata
 * @param key
 */
function saveInputdata(scope, inputdata, key) {
    // 入力データ保持
    inputdata = getValueByKey(key, scope);
    scope.beforedata = inputdata;
}