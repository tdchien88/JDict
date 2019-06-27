myApp.config(function() {
    myStateProvider
    .state('mimikara', {
        url: '/mimikara',
        templateUrl: 'partial/mimikara/mimikara.html',
        controller: 'mimikaraCtrl'
    })
    .state('shadowing', {
        url: '/shadowing',
        templateUrl: 'partial/n2/shadowing.html',
        controller: 'shadowingCtrl'
    })
});
