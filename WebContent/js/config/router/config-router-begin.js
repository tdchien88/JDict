var stateMap = {};
var myStateProvider = {
    // state設定
    state: function(name, params) {
        stateMap[name] = params;
        return this;
    }
};

// ルーティング定義
myApp.config(function($stateProvider, $urlRouterProvider){
    //Mọi đường dẫn không hợp lệ đều được chuyển đến state home
    $urlRouterProvider.otherwise('/404');

    myStateProvider
    .state('home', {
        url: '/home',
        templateUrl: 'partial/home.html',
        controller: 'homeCtrl'
    })
    .state('404', {
        url: '/404',
        templateUrl: 'partial/404.html'
    })
    .state('sample', {
        url: '/sample',
        templateUrl: 'partial/sample.html',
        controller: 'sampleCtrl'
    })
    .state('qeditor', {
        url: '/qeditor',
        templateUrl: 'partial/qeditor.html',
        controller: 'qeditorCtrl'
    })
    .state('setting', {
        url: '/setting',
        templateUrl: 'partial/setting.html',
        controller: 'settingCtrl'
    })
    .state('about', {
        url: '/about',
        templateUrl: 'partial/about.html'
    })
});
