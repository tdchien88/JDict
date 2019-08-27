
/**
* @param $scope
* @param helloWorld (provider)
* @param helloWorldService
* @param helloWorldFactory
* @param
*/
myApp.controller("mainController", function($scope){


    $scope.menulist = [
        {sref:"home", name:"Home"},
        {sref:"", name:"N2",  sub:[
            {sref:"n2goi", name:"N2 GOI", param:"{type: 'GOI'}"},
            {sref:"n2goi", name:"N2 KANJI", param:"{type: 'KANJI'}"},
            {sref:"n2try", name:"TRY N2"},
        ]},
        {sref:"", name:"聴解",  sub:[
            {sref:"shadowing", name:"Shadowing"},
            {sref:"mimikara", name:"Mimi Kara"},
        ]},
        {sref:"", name:"Articles",  sub:[
            {sref:"articles", name:"Works", param:"{tag: 'oshigoto'}"},
            {sref:"articles", name:"Musics", param:"{tag: 'music'}"},
        ]},
        {sref:"", name:"Tool",  sub:[
            {sref:"sample", name:"Sample"},
            {sref:"qeditor", name:"Editor"},
        ]},
        {sref:"about", name:"About"},
    ];

    $scope.createLink = function(menu){
        return menu.sref+'('+menu.param+')';
    }
});


