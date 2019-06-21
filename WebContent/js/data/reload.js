_loaded++;

dataJSON.getItem("reload").then(function(value) {
    if(isEmpty(value)){

        var key = _listData[_listData.length-1].key;

        setInterval(function() {
            if(_loaded == _listData.length){
                dataJSON.setItem(key , {data : 'reload'})
                .then(function(value){
                    console.log("reload")
                    location.reload();
                });

            }
        }, 1000);

    }else{
        _loadListJsFile();
    }
}).catch(function(err) {
    // This code runs if there were any errors
    console.log(err);
});
