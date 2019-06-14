var _prefix = 'jdict.';
var _listData = [
    {key: 'bunpo', link:'js/data/bunpo.js', value: null},
    {key: 'bunpovd', link:'js/data/bunpovd.js', value: null},
    {key: 'shadowing2', link:'js/data/shadowing2.js', value: null},
    {key: 'n3goi', link:'js/data/n3goi.js', value: null},
    {key: 'n3kanji', link:'js/data/n3kanji.js', value: null},
    {key: 'n2goi', link:'js/data/n2goi.js', value: null},
    {key: 'n2kanji', link:'js/data/n2kanji.js', value: null},
    {key: 'n2try', link:'js/data/n2try.js', value: null},
    {key: 'n2try-doc', link:'js/data/n2try-doc.js', value: null},
    {key: 'iword', link:'js/data/iword.js', value: null},
    {key: 'hanviet', link:'js/data/hanviet.js', value: null},
]
var _listJS = [
    'js/service/services.js',
    'js/service/factory.js',
    'js/service/provider.js',

    'js/directive.js',
    'js/config/config.js',

    'js/ctrl/main-ctrl.js',
    'js/ctrl/home-ctrl.js',
    'js/ctrl/sample-ctrl.js',
    'js/ctrl/n2/n2goi-ctrl.js',
    'js/ctrl/n2/shadowing-ctrl.js',
    'js/ctrl/n2/n2try-ctrl.js',
    'js/ctrl/mimikara/mimikara-ctrl.js',

    'js/config/router/config-router-begin.js',
    'js/config/router/config-router-n2.js',
    'js/config/router/config-router-mimikara.js',
    'js/config/router/config-router-end.js',
]
function _getKey(key){
    return _prefix+key;
}
_listData.forEach(function(e,i){

    if (localStorage.getItem(_getKey(_listData[0].key)) !== ""){
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
        _listData[0].value = localStorage.getItem(_getKey(_listData[0].key))
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

