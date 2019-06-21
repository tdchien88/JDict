
const _tableName = "dataJSON"
_db_config.storeName = _tableName;
var dataJSON = localforage.createInstance(_db_config);

var _prefix = 'jdict.';
var _listData = [

    {key: 'n2try', link:'js/data/n2try.js', value: []},
    {key: 'bunpo', link:'js/data/bunpo.js', value: []},
    {key: 'bunpovd', link:'js/data/bunpovd.js', value: []},
    {key: 'shadowing2', link:'js/data/shadowing2.js', value: []},
    {key: 'n3goi', link:'js/data/n3goi.js', value: []},
    {key: 'n3kanji', link:'js/data/n3kanji.js', value: []},
    {key: 'n2goi', link:'js/data/n2goi.js', value: []},
    {key: 'n2kanji', link:'js/data/n2kanji.js', value: []},
    {key: 'n2tryDoc', link:'js/data/n2try-doc.js', value: []},
    {key: 'iword', link:'js/data/iword.js', value: []},
    {key: 'hanviet', link:'js/data/hanviet.js', value: []},

    {key: 'reload', link:'js/data/reload.js', value: null},
]

var _getDataByKey = function(key) {
    var res = _listData.find(x=> x.key === key);

    return isEmpty(res)? null: res.value;
}

var _listJsFile = [
    "js/data/init-constant-data.js",
//
//    "js/common/constant.js",
//    "js/data/init-constant-data.js",
//
//    "js/service/services.js",
//    "js/service/factory.js",
//    "js/service/provider.js",
//
//    "js/directive.js",
//    "js/config/config.js",
//
//    "js/ctrl/main-ctrl.js",
//    "js/ctrl/home-ctrl.js",
//    "js/ctrl/sample-ctrl.js",
//    "js/ctrl/n2/n2goi-ctrl.js",
//    "js/ctrl/n2/shadowing-ctrl.js",
//    "js/ctrl/n2/n2try-ctrl.js",
//    "js/ctrl/mimikara/mimikara-ctrl.js",
//
//    "js/config/router/config-router-begin.js",
//    "js/config/router/config-router-n2.js",
//    "js/config/router/config-router-mimikara.js",
//    "js/config/router/config-router-end.js",
];


var _loaded = 0;

function _getKey(key){
    return _prefix+key;
}

function _resetDATA(_key){
    if(isEmpty(_key)){
        dataJSON.dropInstance()
        .then(function() {
            console.log('Dropped the store of the current instance');
        });
    } else {
        var key = _getKey(_key);
        localStorage.removeItem(key)
    }
}

function loadScript(path) {
    var result = $.Deferred(),
    script = document.createElement("script");
    script.async = "async";
    script.type = "text/javascript";
    script.src = path;
    script.onload = script.onreadystatechange = function (_, isAbort) {
        if (!script.readyState || /loaded|complete/.test(script.readyState)) {
           if (isAbort)
               result.reject();
           else
              result.resolve();
      }
    };
    script.onerror = function () { result.reject(); };
    document.querySelector("head").appendChild(script);
    return result.promise();
  }


_listData.forEach(function(e,i){
    var key = _getKey(e.key);

    dataJSON.getItem(e.key).then(function(value) {
        if(isEmpty(value) || e.key == _listData[_listData.length-1].key){

            var script = document.createElement("script");
            script.type = "text/javascript";
           // if(callback)script.onload=callback;
            script.src = e.link;
            document.body.appendChild(script);

//            var scriptTag = document.createElement('script');
//            scriptTag.src = e.link;
//           // scriptTag.onload = yourCodeToBeCalled(calback);
//           // scriptTag.onreadystatechange = ;
//            document.body.appendChild(scriptTag);

            console.log("loadData> FILE: "+e.key)

        } else {
            console.log("loadData> localStore: "+e.key)
            e.value = value;


        }

    }).catch(function(err) {
        // This code runs if there were any errors
        console.log(err);
    });

})

var _loadListJsFile = function(){
    _listJsFile.forEach(function(e,i){

        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = e;
        document.body.appendChild(script);

        console.log("loadJs> FILE: "+e)


    })
}

//_listJS.forEach(function(e,i){
//
//    var scriptTag = document.createElement('script');
//    scriptTag.src = e;
//
//    document.body.appendChild(scriptTag);
//
//})



