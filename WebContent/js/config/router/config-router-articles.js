myApp.config(function() {
    myStateProvider
    .state('articles', {
        url: '/articles/:tag',
        params: {
            tag: null,
        },
        templateUrl: 'partial/articles/article.html',
        controller: 'articleCtrl'
    })
});
