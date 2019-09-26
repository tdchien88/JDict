myApp.constant('testConst', 'This is an contain value');

myApp.constant('config', {
    appName: 'My App',
    appVersion: 1.0,
    apiUrl: 'http://www.facebook.com?api'
});

myApp.constant('constMap', {
    learnModel : {
        All :    {code : 0, msg :'All'},
        Type :   {code : 1, msg :'Type'},
        Card :   {code : 2, msg :'Card'},
        Choice : {code : 3, msg :'Choice'}
    },
    learnType : {
        all :       {code : 0, msg :'all'},
        wrong :     {code : 1, msg :'wrong'},
        rememberd : {code : 2, msg :'rememberd'},
        newwords :  {code : 3, msg :'newwords'},
        hardwords : {code : 4, msg :'hardwords'},
    },
    cardType : {
        word : {code : 0, msg :'word'},
        mean : {code : 1, msg :'mean'},
    },
    choiceType : {
        word : {code : 0, msg :'word'},
        mean : {code : 1, msg :'mean'},
        furi : {code : 2, msg :'furi'},
    },
    hanTuTagName :{
        JLPT : {code : 0, msg :'JLPT'},
        JP : {code : 1, msg :'JP'},
    }
});

myApp.constant('constList', {
    learnModel : [
        {code : 0, name :'All', def:true},
        {code : 1, name :'Type'},
        {code : 2, name :'Card'},
        {code : 3, name :'Choice'}
    ],
    hanTuTagName :[
        {code:0, name:"JLPT"},
        {code:1, name:"JP"}
    ]
});