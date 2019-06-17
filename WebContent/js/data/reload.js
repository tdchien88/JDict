if(localStorage.getItem(_getKey("reload")) != 'reload'){
    localStorage.setItem(_getKey("reload"), 'reload');
    location.reload();
}else{
}