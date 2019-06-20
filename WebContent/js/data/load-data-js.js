
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

_listData.forEach(function(e,i){
    var key = _getKey(e.key);

    dataJSON.getItem(e.key).then(function(value) {
        if(isEmpty(value)){

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

//_listJS.forEach(function(e,i){
//
//    var scriptTag = document.createElement('script');
//    scriptTag.src = e;
//
//    document.body.appendChild(scriptTag);
//
//})



