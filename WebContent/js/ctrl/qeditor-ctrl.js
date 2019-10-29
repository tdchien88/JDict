
/**
* @param $scope
* @param helloWorld (provider)
* @param helloWorldService
* @param helloWorldFactory
* @param
*/
myApp.controller("qeditorCtrl", function($scope, $timeout, dialogService){


    var toolbarOpton = {
            container: [
                [{ 'font': [] }],                                 // select font
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],        // select header (tag h)
//                [{ 'header': 1 }, { 'header': 2 }],               // custom button values
                [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown

                [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
                ['bold', 'italic', 'underline', 'strike'],        // toggled buttons

                [{ 'align': [] }],                                // align
                [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent

                [{ 'list': 'ordered'}, { 'list': 'bullet' }],     // list ordered

                ['blockquote', 'code-block'],                     // blockquote
                [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
//                [{ 'direction': 'rtl' }],                       // text direction

                ['markdown'], // Add this.

                ['clean']                                         // remove formatting button

            ],
            handlers: { // Add this.
                'markdown': function () {}
            }
    };

    var options = {
            modules: {
                toolbar: toolbarOpton,
                'markdown-toolbar': true // Add this.
            },
            placeholder: 'Compose an epic...',
            theme: 'snow'  // or 'bubble'
    };

    function init(){

        $scope.data = {};

        // convert class to inline code
        Quill.register(Quill.import('attributors/class/color'), true);
        Quill.register(Quill.import('attributors/style/direction'), true);
        Quill.register(Quill.import('attributors/style/align'), true);
        //Quill.register(Quill.import('attributors/style/size'), true);

        Quill.register({
            'modules/markdown-toolbar': MarkdownToolbar // Add this.
        });

        $scope.editor = new Quill('#editor-container', options);

        /*
        $scope.editor.on('selection-change', function(range, oldRange, source) {
            if (range === null && oldRange !== null) {
                //console.log('blur');
            } else if (range !== null && oldRange === null){
                //console.log('focus');
            }
        });


        $scope.editor.on('text-change', function(){
        });

        */

    }

    $scope.convert2Ruby = function(){
        kuroshiroExc($scope.editor.container.firstChild.innerHTML).then(function(result){
            $scope.data.toRuby = result;
        });
    }

    $scope.convert2Json = function(){
        $scope.data.toJson = JSON.stringify($scope.editor.getContents(), null, 0);
        $scope.data.toJson2 = JSON.stringify($scope.editor.getContents(), null, 2);
    }

    init();

    $scope.copy = function (text){


        Clipboard.copy(text);
        showStatus("Copied!",true)
    }

});



