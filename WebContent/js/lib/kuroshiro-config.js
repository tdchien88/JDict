/**
 * https://github.com/hexenq/kuroshiro
 */

var _kuroshiro = new Kuroshiro();
var _kuroshiroOption = {mode:"furigana", to:"hiragana"};

var _libDicLoaded = false;
var kuroshiroExc = function(string){
    if(!libDicLoaded) return Promise.resolve("Library is loading.. plz wait");
    return _kuroshiro.convert(string, _kuroshiroOption);
}

$("#test-shirokuro").html("Library is loading.. plz wait");

_kuroshiro.init(new KuromojiAnalyzer({ dictPath: "js/lib/kuromoji/" }))
.then(()=>{
    libDicLoaded = true;
    kuroshiroExc(" (oﾟ▽ﾟ)oﾟ　頑張ってね！").then(function(result){
    $("#test-shirokuro").html(result);
})});


/*
var kuroshiro = new Kuroshiro();
kuroshiro.init(new KuromojiAnalyzer({ dictPath: "js/lib/kuromoji/" }))
.then(function () {
    return kuroshiro.convert("感じ取れたら手を繋ごう、重なるのは人生のライン and レミリア最高！", _koroshiroOption);
})
.then(function(result){
    document.getElementById("test-shirokuro").innerHTML+= result
    console.log(result);
})*/
