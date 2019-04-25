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

/**
 * システム日付を取得する
 *
 * @returns
 */
var getSysDate = function() {
    return getToday();
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
