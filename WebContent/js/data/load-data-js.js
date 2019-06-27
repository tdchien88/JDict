showStatus("✧٩(*ˊωˋ)و✧　～＞ Library is loading.. plz wait");

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

    {key: 'data_base', link:'js/lib/kuromoji/base.dat.gz', isArraybuffer:true, value: null},
    {key: 'data_check', link:'js/lib/kuromoji/check.dat.gz', isArraybuffer:true, value: null},
    {key: 'data_tid', link:'js/lib/kuromoji/tid.dat.gz', isArraybuffer:true, value: null},
    {key: 'data_tid_pos', link:'js/lib/kuromoji/tid_pos.dat.gz', isArraybuffer:true, value: null},
    {key: 'data_unk', link:'js/lib/kuromoji/unk.dat.gz', isArraybuffer:true, value: null},
    {key: 'data_tid_map', link:'js/lib/kuromoji/tid_map.dat.gz', isArraybuffer:true, value: null},
    {key: 'data_cc', link:'js/lib/kuromoji/cc.dat.gz', isArraybuffer:true, value: null},
    {key: 'data_unk_char', link:'js/lib/kuromoji/unk_char.dat.gz', isArraybuffer:true, value: null},
    {key: 'data_unk_map', link:'js/lib/kuromoji/unk_map.dat.gz', isArraybuffer:true, value: null},
    {key: 'data_unk_compat', link:'js/lib/kuromoji/unk_compat.dat.gz', isArraybuffer:true, value: null},
    {key: 'data_unk_invoke', link:'js/lib/kuromoji/unk_invoke.dat.gz', isArraybuffer:true, value: null},
    {key: 'data_unk_pos', link:'js/lib/kuromoji/unk_pos.dat.gz', isArraybuffer:true, value: null},

    // must at last array
    {key: 'reload', link:'js/data/reload.js', value: []}
];


var _getDataByKey = function(key) {
    var res = _listData.find(x=> x.key === key);
    if(isEmpty(res.value) || res.value.length == 0){
        console.log("_getDataByKey delay");
        //wait(1000);
        //return _getDataByKey(key);
    }
    return isEmpty(res)? null: res.value;
}

var _getDataByLink = function(link) {
    var res = _listData.find(x=> x.link === link);
    return isEmpty(res)? null: res.value;
}

var _listJsFile = [
    "js/lib/kuroshiro.js",
    "js/lib/kuroshiro-analyzer-kuromoji.js",
    "js/lib/kuroshiro-config.js",

    "end",
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

var loadArrayBuffer = function (e, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", e.link, true);
    xhr.responseType = "arraybuffer";
    xhr.onload = function () {
        if (this.status > 0 && this.status !== 200) {
            callback(xhr.statusText, null);
            return;
        }
        var arraybuffer = this.response;
        e.value = arraybuffer;
        dataJSON.setItem(e.key , arraybuffer);

        callback(null, arraybuffer);

    };
    xhr.onerror = function (err) {
        callback(err, null);
    };
    xhr.send();
};


var _loadListJsFile = function(){

    _listJsFile.forEach(function(e,i){
        //last file
        if(i == _listJsFile.length-1){
            // init angularjs
        }else{

            var script = document.createElement("script");
            script.type = "text/javascript";
            script.src = e;
            document.body.appendChild(script);

        }
        console.log("loadJsFILE> "+e)


    })
}


_listData.forEach(function(e,i){

    dataJSON.getItem(e.key).then(function(value) {
        if(isEmpty(value) || e.key == _listData[_listData.length-1].key){

            if(e.isArraybuffer){


                var callback = function(err, res){

                    _loaded++;//importance for reload

                    isEmpty(err)? null : console.error(err);
                    isEmpty(res)? null : console.log(res);
                }

                loadArrayBuffer(e, callback);
            }else{

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

            }

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



