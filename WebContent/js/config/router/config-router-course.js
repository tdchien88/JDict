myApp.config(function() {
    myStateProvider
    .state('somatome', {
        url: '/somatome/:lv',
        params: {
            lv: null,
        },
        templateUrl: 'partial/course/somatome.html',
        controller: 'somatomeCtrl'
    })
    .state('try', {
        url: '/try/:lv',
        params: {
            lv: null,
        },
        templateUrl: 'partial/course/try.html',
        controller: 'tryCtrl'
    })
});
