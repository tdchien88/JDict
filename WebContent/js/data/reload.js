_loaded++;

if (isEmpty(localStorage.getItem(_getKey("reload")))) {

    setInterval(function() {
        if(_loaded == _listData.length){
            localStorage.setItem(_getKey("reload"), JSON.stringify({data : 'reload'}));

            location.reload();
        }
    }, 1000);

} else {
}
