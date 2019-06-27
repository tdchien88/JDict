
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
                ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                ['blockquote', 'code-block'],

                [{ 'header': 1 }, { 'header': 2 }],               // custom button values
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
                [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
                [{ 'direction': 'rtl' }],                         // text direction

                [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

                [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
                [{ 'font': [] }],
                [{ 'align': [] }],
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


        Quill.register({
            'modules/markdown-toolbar': MarkdownToolbar // Add this.
        });

        $scope.editor = new Quill('#editor-container', options);


    }

    init();


    $scope.copy = function (text){


        Clipboard.copy(text);
        showStatus("Copied!")
    }

});



