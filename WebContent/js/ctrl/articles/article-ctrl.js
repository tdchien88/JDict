myApp.controller("articleCtrl", function($scope, $stateParams, localStorageService, dialogService, $timeout){
    var myarticle = _getDataByKey('myarticle');


    function init(){
        $scope.prefix = 'jdict.article.'+$stateParams.tag;
        localStorageService.setPrefix($scope.prefix);

        $scope.data = {};

        // get list tags in myarticle
        var seen = {};
        var tempTags = myarticle.filter(function (e) {
            return seen[e.tag] ? false : (seen[e.tag] = true);
        });
        $scope.data.tags = tempTags.map((x)=>{return x.tag});

        //get list articles by tag
        $scope.data.articles = myarticle.filter(x=> x.tag === $stateParams.tag);
        $scope.data.articlesOnPage = [];

        // https://morgul.github.io/ui-bootstrap4/
        $scope.paging = {};
        $scope.paging.totalItems = $scope.data.articles.length;
        $scope.paging.maxSize = 3;
        $scope.paging.currentPage = 1;
        $scope.paging.itemsPerPage = 3;
        $scope.setPagingData();


    }

    $scope.setPagingData = function() {
        var from = ($scope.paging.currentPage - 1) * $scope.paging.itemsPerPage;
        var get = $scope.paging.currentPage * $scope.paging.itemsPerPage;
        $scope.data.articlesOnPage = $scope.data.articles.slice(from, get);

        $scope.data.articlesOnPage.map(function(item){
            item.content = item.word;
            item.isShow = false;
            kuroshiroExc(item.content).then(function(result){
                item.contentRuby = result;
            });
        });


    }
    $scope.showContent = function(no) {
        $scope.data.articles.forEach(function(x){x.isShow = false;});
        var item = $scope.data.articles.find(function(x){return x.no == no});
        item.isShow = !item.isShow;
    }



    init();
});
