var loadName = false;
var rcxMain = new rcxDict(loadName);
rcxMain.config = {
    copySeparator: "tab",
    css: "blue",
    disablekeys: "false",
    highlight: "true",
    kanjicomponents: "true",
    kanjiinfo: ["true", "true", "true", "true", "true", "true", "true", "true", "true", "true", "true"],
    lineEnding: "n",
    maxClipCopyEntries: "7",
    minihelp: "true",
    onlyreading: "false",
    popupDelay: 150,
    showOnKey: "",
    textboxhl: "false",
    doName: "false",
};
rcxContent.enableTab();

$(document).ready(function(){
    $('#btnClear').click(function(e){
        angular.element("#contents").scope().textContent = "";
        angular.element("#contents").scope().$digest();
    });

    $('input[name="searchtype"]:radio').change(function(e){
        if($(this).val() == "name"){
            rcxMain.config.doName = "true";
        }else if($(this).val() == "word"){
            rcxMain.config.doName = "false";
        }
    });

});