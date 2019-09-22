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
    .state('mimikara', {
        url: '/mimikara',
        templateUrl: 'partial/course/mimikara.html',
        controller: 'mimikaraCtrl'
    })
    .state('shadowing', {
        url: '/shadowing',
        params: {
            tag: null,
        },
        templateUrl: 'partial/course/shadowing.html',
        controller: 'shadowingCtrl'
    })
    .state('hantu', {
        url: '/hantu',
        templateUrl: 'partial/course/hanTu.html',
        controller: 'hanTuCtrl'
    })
});