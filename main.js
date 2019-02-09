

var data = [];
var vdchecked = 0;

function init(){

	data = [
		{code: "u1", name: "unit 1", cotent: u1}, 
		{code: "u2", name: "unit 2", cotent: u2}
	];

	for(var i in data){
		var unit = data[i];
		$("#unit").append('<option value="'+i+'">'+unit.name+'</option>');
	}


	if(localStorage.unitIdx == null){

		localStorage.unitIdx = $("#unit").val();
		for(var i in data[0].cotent){
			var lession = data[0].cotent[i];
			$("#lesson").append('<option value="'+i+'">'+lession.name+'</option>');
		}

		localStorage.lessonIdx = $("#lesson").val();
		localStorage.rubi = $("#checkffurigana").is(':checked')? 1: 0;
		localStorage.han = $("#hanviet").is(':checked')? 1: 0;
		localStorage.vidu = vdchecked;

	}else{

		$("#unit").val(localStorage.unitIdx);
		for(var i in data[localStorage.unitIdx].cotent){
			var lession = data[localStorage.unitIdx].cotent[i];
			$("#lesson").append('<option value="'+i+'">'+lession.name+'</option>');
		}
		
		$("#lesson").val(localStorage.lessonIdx);
		if(localStorage.rubi === "1") {
			$("#checkffurigana").prop('checked', true);
		}else{
			$("#checkffurigana").prop('checked', false);
		}
		if(localStorage.han === "1") {
			$("#hanviet").prop('checked', true);
		}else{
			$("#hanviet").prop('checked', false);
		}
		vdchecked = localStorage.vidu;

	}

	loadConntent();
}

function loadConntent(){

	var unitIdx = $("#unit").val();
	var unit = data[unitIdx];
	var lessonIdx = $("#lesson").val();
	var lesson = unit.cotent[lessonIdx];
	localStorage.unitIdx = unitIdx;
	localStorage.lessonIdx = lessonIdx;

	$("#content").empty();
	if(lesson){
		for(var i in lesson.cotent){
			$("#content").append(lesson.cotent[i]);
		}	
	}

	showRubi();

	showHan();

	showVD();
}
function showVD(){
	    
	localStorage.vidu = vdchecked;
    if(vdchecked == 0){

    	$("#vidubox").prop("checked", false);
    	$("#vidubox").prop("indeterminate", false); 
		$(".vidubox").hide();
		$(".vidunotfirst").hide();

    }else if(vdchecked ==1){
    	$("#vidubox").prop("checked", true);
    	$("#vidubox").prop("indeterminate", true); 
		$(".vidubox").show();
		$(".vidunotfirst").hide();
		
    }else{
    	$("#vidubox").prop("indeterminate", false); 
    	$("#vidubox").prop("checked", true);
		$(".vidubox").show();
		$(".vidunotfirst").show();

    }
}

function showHan(){
    
	localStorage.han = $("#hanviet").is(':checked')? 1: 0;
    if($("#hanviet").is(':checked')){
		$(".hanviet").show();
		$(".hanviet1").show();
		$(".hanviet2").show();
		$(".hanviet3").show();

		$(".nghia").show();
		$(".nghia1").show();
		$(".nghia2").show();
		$(".nghia3").show();
		$(".nghiavidu").show();
    
    }else{
		$(".hanviet").hide();
		$(".hanviet1").hide();
		$(".hanviet2").hide();
		$(".hanviet3").hide();

		$(".nghia").hide();
		$(".nghia1").hide();
		$(".nghia2").hide();
		$(".nghia3").hide();
		$(".nghiavidu").hide();
    }
}

function showRubi(){

	localStorage.rubi = $("#checkffurigana").is(':checked')? 1: 0;
    if($("#checkffurigana").is(':checked')){
        $("rt").removeClass("hiddenfurigana");
    } else {
    	$("rt").addClass("hiddenfurigana");
    }
}

$(window).on('load', function() {

	init();

	$("#unit").change(function(){
		var val = $(this).val();
		$("#lesson").empty();
		for(var i in data[val].cotent){
			var lession = data[val].cotent[i];
			$("#lesson").append('<option value="'+i+'">'+lession.name+'</option>');
		}

		loadConntent();
	});

	$("#lesson").change(function(){
		loadConntent();
	});

	$("#checkffurigana").click(function(){
		showRubi();
	});

	$("#vidubox").click(function(){

		vdchecked++;
	    if(vdchecked == 3) vdchecked=0;

		showVD();

	});

	$("#content").on('click', ".boxtv", function(){
		if($(this).find(".vidubox").is(':visible')){
			$(this).find(".vidubox").hide();
		}else{
			$(this).find(".vidubox").show();
		}		    
	});

	$("#hanviet").click(function(){
	    showHan();
	});

	$("#reset").click(function(){
		localStorage.unitIdx = 0;
		localStorage.lessonIdx = 0;
		localStorage.rubi = "1";
		localStorage.han = "1";
		localStorage.vidu = "1";

	});
});