myApp.controller("articleCtrl", function($scope, $stateParams, localStorageService, dialogService, $timeout){
    var myarticle = _getDataByKey('myarticle');


    $scope.setPage = function (pageNo) {
      $scope.currentPage = pageNo;
    };

    $scope.pageChanged = function() {
      $log.log('Page changed to: ' + $scope.currentPage);
    };

    function init(){
        localStorageService.setPrefix('jdict.n2try');

        $scope.data = {};

        // Initial 50 characters will be displayed.
        $scope.strLimit = 50;

        // get list tags in myarticle
        var seen = {};
        var tempTags = myarticle.filter(function (e) {
            return seen[e.tag] ? false : (seen[e.tag] = true);
        });
        $scope.data.tags = tempTags.map((x)=>{return x.tag});

        //get list articles by tag
        $scope.data.articles = myarticle.filter(x=> x.tag === $stateParams.tag);

        $scope.setCurrentArticle(0);
        // https://morgul.github.io/ui-bootstrap4/
        $scope.maxSize = 5;
        $scope.currentPage = 1;
    }

    $scope.setCurrentArticle = function(idx){

        $scope.data.curArt = $scope.data.articles[idx];
        $scope.data.curArt.content = $scope.data.curArt.word;
        kuroshiroExc($scope.data.curArt.content).then(function(result){
            $scope.data.curArt.contentRuby = result;
        });
    }

    init();
});
