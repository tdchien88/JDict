var _prefix = 'jdict.';
var _listData = [

    {key: 'n2try', link:'js/data/n2try-bk.js', value: null},
    /*
    {key: 'bunpo', link:'js/data/bunpo.js', value: null},
    {key: 'bunpovd', link:'js/data/bunpovd.js', value: null},
    {key: 'shadowing2', link:'js/data/shadowing2.js', value: null},
    {key: 'n3goi', link:'js/data/n3goi.js', value: null},
    {key: 'n3kanji', link:'js/data/n3kanji.js', value: null},
    {key: 'n2goi', link:'js/data/n2goi.js', value: null},
    {key: 'n2kanji', link:'js/data/n2kanji.js', value: null},
    {key: 'n2try-doc', link:'js/data/n2try-doc.js', value: null},
    {key: 'iword', link:'js/data/iword.js', value: null},
    {key: 'hanviet', link:'js/data/hanviet.js', value: null},
    */
]
var _n2try = [];

function _getKey(key){
    return _prefix+key;
}
_listData.forEach(function(e,i){
    var key = _getKey(_listData[0].key);
    if (isEmpty(localStorage.getItem(key))){
        var script = document.createElement("script");
        script.type = "text/javascript";
       // if(callback)script.onload=callback;
        script.src = e.link;
        document.body.appendChild(script);

//        var scriptTag = document.createElement('script');
//        scriptTag.src = e.link;
//
//       // scriptTag.onload = yourCodeToBeCalled(calback);
//     //   scriptTag.onreadystatechange = ;
//
//        document.body.appendChild(scriptTag);
    }else{
        _n2try = JSON.parse(localStorage.getItem(key));
    }

})

//_listJS.forEach(function(e,i){
//
//    var scriptTag = document.createElement('script');
//    scriptTag.src = e;
//
//    document.body.appendChild(scriptTag);
//
//})

