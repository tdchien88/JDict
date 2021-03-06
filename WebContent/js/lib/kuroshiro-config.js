/**
 * https://github.com/hexenq/kuroshiro
 */
var _kuroshiro = null;
const _kuroshiroOption = {mode:"furigana", to:"hiragana"};




var kuroshiroExc = function(string){
    if(!libDicLoaded) return Promise.resolve("Library is loading.. plz wait");
    return _kuroshiro.convert(string, _kuroshiroOption);
}

var _kuroshiroInit = function(callback) {

    if(typeof Kuroshiro == 'undefined' || typeof KuromojiAnalyzer == 'undefined' ){

        setTimeout(function(){
            _kuroshiroInit(callback);
        },1000)
        return;

    }else{

        _kuroshiro = new Kuroshiro();
        _kuroshiro.init(new KuromojiAnalyzer({ dictPath: "js/lib/kuromoji/" }))
        .then(()=>{
            libDicLoaded = true;
            kuroshiroExc("頑張ってね！").then(function(result){
                showStatus(result,true);
            })

            callback();
        });
    }
    // your code here

};

_kuroshiroInit(initMyApp);

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
