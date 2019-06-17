
_listData.forEach(function(e,i){
    if(i < _listData.length - 1){
        myApp.constant(e.key,  e.value);
    }
});