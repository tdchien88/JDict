
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
//                [{ 'header': 1 }, { 'header': 2 }],             // custom button values
                [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
                [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
                ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                [{ 'align': [] },                                  // align
                 { 'indent': '-1'},                               // indent -1
                 { 'indent': '+1' },                              // indent +1
                ],
                [
                 { 'list': 'ordered'},                            // list ordered
                 { 'list': 'bullet' },                            // list ordered
                ],
                ['blockquote', 'code-block'],                     // blockquote
                [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
//                [{ 'direction': 'rtl' }],                       // text direction
                ['clean']                                         // remove formatting button
                ['markdown'], // Add this.
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



