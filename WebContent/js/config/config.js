//hey, we can configure a provider!

/**
* Config helloWorld Provider
* chu y phai them chu Provider vao sau helloWorld
*/
myApp.config(function(helloWorldProvider) {
    helloWorldProvider.setVersion('1.0.1');
});

//config local storegate
myApp.config(function (localStorageServiceProvider) {
    localStorageServiceProvider
    .setPrefix('myApp')
    .setStorageType('localStorage')///localStorage or sessionStorage
    .setNotify(true, true);
});