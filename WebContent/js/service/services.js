//service style, probably the simplest one
myApp.service('helloWorldService', function() {
    this.sayHello = function() {
        return "Hello, Service World!";
    };
});