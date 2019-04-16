//factory style, more involved but more sophisticated
myApp.factory('helloWorldFactory', function() {
    return {
        sayHello: function() {
            return "Hello, Factory World!";
        }
    };
});