//provider style, full blown, configurable version    

/**
* custom provider 
* tham khao them file config helloWorldProvider
*/ 
myApp.provider('helloWorld', function() {

  var version;
  return {
    setVersion: function (value) {
      version = value;
    },
    $get: function () {
      return {
          title: 'The Matrix' + ' ' + version
      }
    }
  }
});