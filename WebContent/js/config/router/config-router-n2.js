myApp.config(function() {
    myStateProvider
    .state('n2goi', {
        url: '/n2goi/:type',
        params: {
            type: null,
        },
        templateUrl: 'partial/n2/n2goi.html',
        controller: 'n2goiCtrl'
    })
    .state('n2try', {
        url: '/n2try',
        templateUrl: 'partial/n2/n2try.html',
        controller: 'n2tryCtrl'
    })
});
