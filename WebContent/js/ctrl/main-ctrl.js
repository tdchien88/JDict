
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
        {sref:"", name:"N3",  sub:[
            {sref:"somatome", name:"N3 GOI", param:"{lv: 'n3goi'}"},
            {sref:"somatome", name:"N3 KANJI", param:"{lv: 'n3kanji'}"},
        ]},
        {sref:"", name:"N2",  sub:[
            {sref:"somatome", name:"N2 GOI", param:"{lv: 'n2goi'}"},
            {sref:"somatome", name:"N2 KANJI", param:"{lv: 'n2kanji'}"},
            {sref:"try", name:"TRY N2", param:"{lv: 'n2'}"},
        ]},
        {sref:"", name:"聴解",  sub:[
            {sref:"shadowing", name:"Shadowing"},
            {sref:"mimikara", name:"Mimi Kara"},
        ]},
        {sref:"", name:"Articles",  sub:[
            {sref:"articles", name:"Works", param:"{tag: 'oshigoto'}"},
            {sref:"articles", name:"Musics", param:"{tag: 'music'}"},
            {sref:"articles", name:"Short Stories", param:"{tag: 'stories'}"},
            {sref:"articles", name:"Life", param:"{tag: 'life'}"},
        ]},
        {sref:"", name:"Tool",  sub:[
            {sref:"sample", name:"Sample"},
            {sref:"qeditor", name:"Editor"},
            {sref:"setting", name:"Setting"},
        ]},
        {sref:"about", name:"About"},
    ];

    $scope.createLink = function(menu){
        return menu.sref+'('+menu.param+')';
    }
});


