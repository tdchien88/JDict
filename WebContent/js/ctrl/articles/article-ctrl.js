myApp.controller("articleCtrl", function($scope, $stateParams, localStorageService, dialogService, $timeout){
    var myarticle = _getDataByKey('myarticle');

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

        setCurrentArticle(0);
    }

    $scope.showMore = function(content) {
        $scope.strLimit = content.length;
    };

    // Event trigger on click on the Show less button.
    $scope.showLess = function() {
      $scope.strLimit = 50;
    };

    function setCurrentArticle (idx){

        $scope.data.curArt = $scope.data.articles[idx];
        $scope.data.curArt.content = $scope.data.curArt.word;
        kuroshiroExc($scope.data.curArt.content).then(function(result){
            $scope.data.curArt.contentRuby = result;
        });
    }

    init();
});
