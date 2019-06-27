

// REFERENCE UNICODE TABLES:
// http://www.rikai.com/library/kanjitables/kanji_codes.unicode.shtml
// http://www.tamasoft.co.jp/en/general-info/unicode.html
//
// TEST EDITOR:
// http://www.gethifi.com/tools/regex
//
// UNICODE RANGE : DESCRIPTION
//
// 3000-303F : punctuation
// 3040-309F : hiragana
// 30A0-30FF : katakana
// FF00-FFEF : Full-width roman + half-width katakana
// 4E00-9FAF : Common and uncommon kanji
//
// Non-Japanese punctuation/formatting characters commonly used in Japanese text
// 2605-2606 : Stars
// 2190-2195 : Arrows
// u203B     : Weird asterisk thing

var regexJPString = /[\u3000-\u303F]|[\u3040-\u309F]|[\u30A0-\u30FF]|[\uFF00-\uFFEF]|[\u4E00-\u9FAF]|[\u2605-\u2606]|[\u2190-\u2195]|\u203B/g;
function isJPString(input){
//var input = "input string";
var res = false;
if(regexJPString.test(input)) {
    console.log("Japanese characters found")
res = true;
}
else {
    console.log("No Japanese characters");
}
return res;
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


var formatDate = function (date, format) {
    // 値が「空 or 日付型ではない or 日付変換エラー」の場合、値をそのまま返す
    if(isEmpty(date) || !isType(date, "Date") || date.toString() === "Invalid Date") return date;
    if(!format) format = 'YYYY-MM-DD hh:mm:ss.SSS';
    format = format.replace(/YYYY/g, ('000' + date.getFullYear()).slice(-4));
    format = format.replace(/yyyy/g, ('000' + date.getFullYear()).slice(-4));
    format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2));
    format = format.replace(/DD/g, ('0' + date.getDate()).slice(-2));
    format = format.replace(/dd/g, ('0' + date.getDate()).slice(-2));
    format = format.replace(/hh/g, ('0' + date.getHours()).slice(-2));
    format = format.replace(/mm/g, ('0' + date.getMinutes()).slice(-2));
    format = format.replace(/ss/g, ('0' + date.getSeconds()).slice(-2));
    if (format.match(/S/g)) {
        var milliSeconds = ('00' + date.getMilliseconds()).slice(-3);
        var length = format.match(/S/g).length;
        for (var i = 0; i < length; i++) format = format.replace(/S/, milliSeconds.substring(i, i + 1));
    }
    return format;
};

// 独自ソート処理(null、空文字が下に来るようにした)
var mySort = function(data, cols) {
    return data.sort(function(a,b){
        var res = 0;
        angular.forEach(cols, function(col, idx) {
            if(res != 0) return;
            if((a[col] != null && a[col] != "") && (b[col] == null || b[col] == "")) res = -1;
            else if((a[col] == null || a[col] == "") && (b[col] != null && b[col] != "")) res = 1;
            else if(a[col] < b[col]) res = -1;
            else if(a[col] > b[col]) res = 1;
        });
        return res;
    });
};

// 本日日付文字列取得
var getToday = function(){

    var today = new Date();
    return formatDate(today, "YYYY/MM/DD");

}

// 日付文字列のフォーマット
var dateFormat = function(dateStr, form) {
    return formatDate(toDate(dateStr), form);
}

// 日付の加算
var addDate = function(dateStr, addDay) {
    var dt = toDate(dateStr);
    dt.setDate(dt.getDate() + addDay);
    return formatDate(dt, "YYYY/MM/DD");
}

// 文字列日付→Date
var toDate = function(dateStr){
    // 空文字,null の場合は null を返す
    if(!dateStr){
        return null;
    }
    var date = new Date(dateStr);

    // 変換エラー時はnullを返す
    if(date.toString() == "Invalid Date"){
        return null;
    }else{
        return date;
    }
}

// 日付がValidかどうかチェックする
var isDate = function(txtDate) {
    var currVal = txtDate;
    if(currVal == '')
        return false;
    //Declare Regex
    if(currVal.split("/").join("").toString().length == 8) {
        var dtArray = /^(\d{4})[\/\-](\d{2})[\/\-](\d{2})$/.exec(currVal);
    } else {
        var dtArray = /^(\d{4})[\/\-](\d{2})$/.exec(currVal);
    }
    if(dtArray == null)
        return false;
    //Checks for mm/dd/yyyy format.
    dtMonth = dtArray[2];
    dtDay = dtArray[3];
    dtYear = dtArray[1];
    if(dtMonth < 1 || dtMonth > 12)
        return false;
    else if(dtDay < 1 || dtDay > 31)
        return false;
    else if((dtMonth == 4 || dtMonth == 6 || dtMonth == 9 || dtMonth == 11) && dtDay == 31)
        return false;
    else if(dtMonth == 2) {
        var isleap = (dtYear % 4 == 0 && (dtYear % 100 != 0 || dtYear % 400 == 0));
        if(dtDay > 29 || (dtDay == 29 && !isleap))
            return false;
    }
    return true;
}

/**
 * 日付大小関係チェック
 *
 * @param  past   日付文字列(YYYY/MM/DD)
 * @param  future 日付文字列(YYYY/MM/DD)
 * @reruen true : NG / false : OK
 */
var isDateRelationship  = function(past, future){
    // 戻り値の作成
    var ret = false;

    // 引数をDate型に変換する
    var pastDate = toDate(past);
    var futureDate = toDate(future);

    // 比較対象のどちらかがない場合はチェックしない
    if (isEmpty(pastDate) || isEmpty(futureDate)) {
        return false;
    }

    // Data型比較
    if (pastDate.getTime() > futureDate.getTime()) {
        ret = true;
    }

    return ret;
}


// 月初日を返す
function getFirstDate(input) {
    var inputDate = new Date(input);
    var firstDate = new Date(inputDate.getFullYear(), inputDate.getMonth(), 1);
    return formatDate(firstDate, "YYYY/MM/DD");
}

// 月末日を返す
function getLastDate(input) {
    var inputDate = new Date(input);
    var lastDate = new Date(inputDate.getFullYear(), inputDate.getMonth() + 1, 0);
    return formatDate(lastDate, "YYYY/MM/DD");
}

/**
 * 引数がundefinedか判定します。
 *
 * @param arg 判定対象
 * @returns true: undefinedである, false: undefinedでない
 */
function isUndefined(arg) {
    if(typeof arg == "undefined") return true;
    return false;
}

/**
 * 引数がundefinedでないか判定します。
 *
 * @param arg 判定対象
 * @returns true: undefinedでない, false: undefinedである
 */
function isNotUndefined(arg) {
    return !isUndefined(arg);
}

/**
 * 引数がnullか判定します。
 *
 * @param arg 判定対象
 * @returns true:nullである, false:nullでない
 */
function isNull(arg) {
    if(arg === null) return true;
    return false;
}

/**
 * 引数がnullでないか判定します。
 *
 * @param arg 判定対象
 * @returns true: nullでない, false: nullである
 */
function isNotNull(arg) {
    return !isNull(arg);
}

/**
 * 引数がundeifned, nullのいずれか判定します。
 *
 * @param arg 判定対象
 * @returns true: undeifned, nullのいずれかである
 */
function isNullOrUndefined(arg) {
    if(isUndefined(arg)) return true;
    if(isNull(arg)) return true;
    return false;
}

/**
 * 引数がundeifned, nullのいずれかでないか判定します。
 *
 * @param arg 判定対象
 * @returns true: undeifned, nullのいずれかである
 */
function isNotNullAndUndefined(arg) {
    return !isNullOrUndefined(arg);
}

/**
 * 引数のオブジェクトが空か判定します。
 *
 * @param arg 判定対象
 * @returns true: 空である
 */
function isEmptyObject(obj) {
    return isType(obj, "Object") && Object.keys(obj).length <= 0;
}

/**
 * 引数のオブジェクトが空でないことを判定します。
 *
 * @param arg 判定対象
 * @returns true: 空でない
 */
function isNotEmptyObject(obj) {
    return isType(obj, "Object") && Object.keys(obj).length > 0;
}

/**
 * 引数がundeifned, null, 空文字のいずれかであるか判定します。
 *
 * @param arg 判定対象
 * @returns true: undeifned, null, 空文字のいずれかである
 */
function isEmpty(arg){
    if(isUndefined(arg)) return true;
    if(isNull(arg)) return true;
    if(arg === "") return true;
    if(isEmptyObject(arg)) return true;
    if(Array.isArray(arg)) {
        return arg.length === 0;
    }
    return false;
}

/**
 * 引数がundeifned, null, 空文字のどれとも一致しないか判定します。
 *
 * @param arg 判定対象
 * @returns true:undeifned, null, 空文字のどれとも一致しないか
 */
function isNotEmpty(arg) {
    return !isEmpty(arg);
}

/**
 * 引数がundeifned, null, 空文字, 0, NaN のどれとも一致しないか判定します。
 *
 * @param arg 判定対象
 * @returns true: undeifned, null, 0 空文字のどれとも一致しないか
 */
function isNotEmptyAndZero(arg){
    var rtn = isNotEmpty(arg);
    return (rtn && (arg != 0) && !Number.isNaN(arg));
}

/**
 * 日付文字列を比較してFromよりToのほうが小さい場合、trueを返す。
 * @param from 日付文字列(YYYY/MM/DD)
 * @param to 日付文字列(YYYY/MM/DD)
 * @returns true:NG, false:OK
 */
var isFromToInvalid = function(params){

    var ret = false;
    var fromDate = null;
    var toDate = null;

    for(var key in params) {
          if(params.hasOwnProperty(key)) {
              // 「From」を含むparamsのバリューをDate型に変換
              if (key.lastIndexOf("From") > 0){
                  var from = params[key];
                  fromDate = new Date(from);
              }
              // 「To」を含むparamsのバリューをDate型に変換
              if (key.lastIndexOf("To") > 0){
                  var to = params[key];
                  toDate = new Date(to);
              }
        }
    }

    // FromとToのどちらかが無い場合はチェックしない
    if(isEmpty(fromDate) || isEmpty(toDate)){
        return false;
    }

    //Date型比較
    if (fromDate.getTime() > toDate.getTime()){
        ret = true;
    }
    return ret;
}

/**
 * 日付文字列を比較してlaterよりboforeのほうが小さい場合、trueを返す。
 * @param from 日付文字列(YYYY/MM/DD)
 * @param to 日付文字列(YYYY/MM/DD)
 * @returns true:NG, false:OK
 */
var isLaterValid = function(later, bofore){

    var ret = false;

    var laterDate = new Date(later);
    var boforeDate = new Date(bofore);

    //Date型比較
    if (laterDate.getTime() > boforeDate.getTime()){
        ret = true;
    }
    return ret;
}

/**
 * 0埋めを行います。
 */
function zeroPad(num, padding){
    var strPad = '';
    for(i=1;i<=padding;i++){
        strPad += strPad + '0';
    }

    return (strPad + num).slice(-padding);
}

function getDotPosition(value){
    // 数値のままだと操作できないので文字列化する
    var strVal = String(value);
    var dotPosition = 0;
    // 小数点が存在するか確認
    if(strVal.lastIndexOf('.') > -1){
        // 小数点があったら位置を取得
        var list = (value + '').split('.');
        dotPosition = list[1].length;
    }
    return dotPosition;
}

function culcFloatCommon(value1,value2){
    var culcObj = {};
    // それぞれの小数点の位置を取得
    var dotPosition1 = getDotPosition(value1);
    var dotPosition2 = getDotPosition(value2);

    // 位置の値が大きい方（小数点以下の位が多い方）の位置を取得
    var max = Math.max(dotPosition1,dotPosition2);

    // 大きい方に小数の桁を合わせて文字列化、
    // 小数点を除いて整数の値にする
    culcObj.intValue1 = parseInt((value1.toFixed(max) + '').replace('.', ''));
    culcObj.intValue2 = parseInt((value2.toFixed(max) + '').replace('.', ''));

    // 10^N の値を計算
    culcObj.power = Math.pow(10,max);
    return culcObj;
}

// 少数足し算
function calcFloatAdd(value1,value2){
    var culcObj = culcFloatCommon(value1,value2)
    return (culcObj.intValue1 + culcObj.intValue2) / culcObj.power;
}

// 少数値比較 (value1 > value2 → true)
function compareFloatLargerFirst(value1,value2) {
    var culcObj = culcFloatCommon(value1,value2)
    return (culcObj.intValue1 > culcObj.intValue2) ? true : false;
}

//少数値比較 (value1 => value2 → true)
function compareFloatEqualOrLargerFirst(value1,value2) {
    var culcObj = culcFloatCommon(value1,value2)
    return (culcObj.intValue1 >= culcObj.intValue2) ? true : false;
}

//少数値比較 (value1 != value2 → true)
function isDifferentFloatValue(value1,value2) {
    var culcObj = culcFloatCommon(value1,value2)
    return (culcObj.intValue1 != culcObj.intValue2) ? true : false;
}

// 数値を文字列に変換し、値をチェック
function numValueCheck(value, variablemeasureitemcode) {
    var afterPeriod = false;
    var msgFlg = "";
    var firstChar = "";
    var secondChar = "";

    value = value + "";
    if (variablemeasureitemcode == 0) {
        var numStrArr = value.split( "." );
        msgFlg = isNumSequene(numStrArr[0]);
    } else {
        msgFlg = isNumSequene(value);
    }

    //3桁超過
    if (Number(value) > 99) {
        msgFlg = "bigDigits";
    }
    return msgFlg;
}

// 文字列の引数が整数表現かチェックする
function isInteger(x) {
    return Math.round(x) == x;
}

// 数値判定
function isNumber(val) {
    return isFinite(val);
}

// 四捨五入
function roundDigit(val, digit) {
    if(isEmpty(digit)) digit = 1;
    var n = Math.pow(10,-digit);
    return Math.round(val / n) * n;
}

// JavaScriptオブジェクトの型をチェック
function isType(obj, type) {
    var clas = Object.prototype.toString.call(obj).slice(8, -1);
    return obj !== undefined && obj !== null && clas === type;
}

// 小数点以下の右端の0を取り除く（123.100→123.1）
function editDecimalZero(input) {
    var dot = ".";
    var intdecimal = input.split(dot);
    // 複数のdotが存在する場合は不正のため入力値をそのまま返す
    if(intdecimal.length !== 2) return input;

    // 整数部
    var int = intdecimal[0];
    // 小数部
    var decimal = intdecimal[1];

    // 小数部の右端の0を取り除き、残った値を保持
    var decimalAfterEdit = Number("0." + decimal).toString().split(dot)[1];
    // 整形後の小数部が存在しない場合は整数部のみ返す
    if(isEmpty(decimalAfterEdit)) return int;
    // 整形後の値を返す
    return int + dot + decimalAfterEdit;
}

/**
 * CSVパースユーティリティ
 */
function parseCSV(text, delim) {
    if(isEmpty(text)) {
        return [];
    }
    if (!delim) delim = ',';
    var tokenizer = new RegExp(delim + '|\r?\n|[^' + delim + '"\r\n][^' + delim + '\r\n]*|"(?:[^"]|"")*"', 'g');

    var record = 0, field = 0, data = [['']], qq = /""/g;
    text.replace(/\r?\n$/, '').replace(tokenizer, function(token) {
        switch (token) {
            case delim:
                data[record][++field] = '';
                break;
            case '\n': case '\r\n':
                data[++record] = [''];
                field = 0;
                break;
            default:
                data[record][field] = (token.charAt(0) != '"') ? token : token.slice(1, -1).replace(qq, '"');
        }
    });

    return data;
}

/**
 * CSVエクスポートユーティリティ
 * ※動作には「encoding.js」とappに以下の記載が必須
 * .config(function($compileProvider) {
 *     $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|blob):/);
 * })
 */
var exportCSV = function(data, cols, fileName, headerCnt){

    var csvOutStr = "";
    var csvOutEnc = "\"";
    var csvSep="";

    // ヘッダの書き込み
    angular.forEach(cols, function(col, idx){
        if(col.hideCsv === true) return;
        csvOutStr += csvSep + csvOutEnc + col.displayName + csvOutEnc;
        csvSep=",";
    });

    // ヘッダの最後に改行追加
    csvOutStr += "\r\n";

    // ヘッダ列数の引数が指定されている場合はヘッダを2行目以降出力しない
    if(!!headerCnt) {

        var befHeaderStr = "";

        // 画面に表示されているデータをループ
        angular.forEach(data, function(recode, idx) {
            csvSep = "";
            var headerStr = "";
            var headerStrEnpty = "";
            for(var i=0;i<headerCnt;i++) {
                headerStrEnpty += ",";
            }
            // 画面に表示されているカラムごとのループ（recodeの順にループすると画面表示項目順が崩れるため、colの順にループ）
            angular.forEach(cols, function(col, index){
                if(col.hideCsv === true) return;
                // ダブルクォーテーションエスケープ
                value=String(recode[col.field]).replace(/"/g,'""');
                var tempStr = csvSep + csvOutEnc + value + csvOutEnc;
                if(index != 0 && index <= headerCnt) {
                    headerStr += tempStr;
                    if(index == headerCnt) {
                        if(headerStr != befHeaderStr) {
                            csvOutStr += headerStr;
                            befHeaderStr = headerStr;
                        } else {
                            csvOutStr += headerStrEnpty;
                        }
                    }
                } else {
                    csvOutStr += tempStr;
                }

                csvSep = ",";
            });
            csvOutStr += "\r\n";
        });
    } else {

        // 画面に表示されているデータをループ
        angular.forEach(data, function(recode, idx) {
            csvSep = "";
            // 画面に表示されているカラムごとのループ（recodeの順にループすると画面表示項目順が崩れるため、colの順にループ）
            angular.forEach(cols, function(col, index){
                if(col.hideCsv === true) return;
                // ダブルクォーテーションエスケープ
                value=String(recode[col.field]).replace(/"/g,'""');
                csvOutStr += csvSep + csvOutEnc + value + csvOutEnc;
                csvSep = ",";
            });
            csvOutStr += "\r\n";
        });
    }

    downloadText(csvOutStr, fileName);
};

/**
 * テキストダウンロードユーティリティ
 */
var downloadText = function(outStr, fileName){

    // utf8 bom付きCSVで保存する(excelでutf8を認識させるため)
    var bom = new Uint8Array([0xEF, 0xBB, 0xBF]);
    var blob = new Blob([ bom, outStr ], { "type" : "text/csv" });

    // IEとIE以外でダウンロード方法を分ける(IEだけ特別な対処がいる
    // IEの場合
    if(window.navigator.msSaveBlob){
        window.navigator.msSaveBlob(blob, document.getElementById("csvdownload").getAttribute("download"));
    } else {
        //IE以外
        var link = window.document.getElementById("csvdownload");
        if (link == null) {
            link = window.document.createElement("a");
            link.setAttribute("id", "csvdownload");
            link.setAttribute("style", "display:none;");
            link.setAttribute("download", fileName);
        }
        link.setAttribute("href", window.URL.createObjectURL(blob));
        link.click();

        //document.getElementById("csvdownload").href = window.URL.createObjectURL(blob);
    }
}
// 半角（1byte）か全角（2byte）文字なのか判別する
String.prototype.bytes = function () {
    var length = 0;
    for (var i = 0; i < this.length; i++) {
        var c = this.charCodeAt(i);
        if ((c >= 0x0 && c < 0x81) || (c === 0xf8f0) || (c >= 0xff61 && c < 0xffa0) || (c >= 0xf8f1 && c < 0xf8f4)) {
            length += 1;
        } else {
            length += 2;
        }
    }
    return length;

};
// byte数で桁数をチェックする
function substr(text, len, truncation) {
    if (isUndefined(truncation)) truncation = "";
    var text_array = text.split("");
    var count = 0;
    var str = "";
    for (i = 0; i < text_array.length; i++) {
        if (text_array[i].match(/[ｧ-ﾝｦﾞﾟ･]+/)){
            // 半角カタカナ
            count++;
        } else {
            esc = escape(text_array[i]);
            if (esc.match(/^\%u/)){
                // 全角
                count += 2;
            } else {
                // 半角英数
                count++;
            }
        }
        if (count > len) {
            return str + truncation;
        }
        str += text.charAt(i);
    }
    return text;
}

function csvCheckFile(csvArray, fileName) {
    if(isNotEmpty(fileName) && isNotEmpty(csvArray)) {
        if(!fileName.toUpperCase().endsWith(".CSV")) {
            return {
                errorCode: messagemap.IIRG0030[0],
                errorMessage: "",
            };
        }
        if(csvArray.length < 0) {
            return {
                errorCode: messagemap.EIRG0030[0],
                errorMessage: "",
            };
        }
        return {
            errorCode: "",
            errorMessage: "",
        };
    } else {
        return {
            errorCode: messagemap.EIRG0030[0],
            errorMessage: "",
        };
    }
}

// 文字列に検索したい文字が含む場合「true」を返す
function hasStr(targetStr, search) {
    if(isEmpty(targetStr) || isEmpty(search)) return;
    return targetStr.indexOf(search) != -1;
}

// 対象の文字を全置換して返す
function replaceAll(string, target, replacement) {
    if(isEmpty(string)) return string;
    return string.split(target).join(replacement);
}

function emptyToString(str){
    return isEmpty(str)? "" : str;
}

function wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
      end = new Date().getTime();
   }
 }


function showStatus(status){
    setTimeout(function(){
        if($("#myAlert").find("div#myAlert2").length > 0){
            $("#myAlert").empty();
        }
        $("#myAlert").append("<div class='alert alert-success alert-dismissable' id='myAlert2'> <button type='button' class='close' data-dismiss='alert'  aria-hidden='true'>&times;</button>"+status+"</div>");
        $("#myAlert").css("display", "");
        $(".alert button.close").click(function (e) {
            closeStatus();
        });
    },0)
}

function closeStatus(){
    $(".alert button.close").parent().fadeOut('slow');
}

