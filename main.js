

var data = [];
var checked = 0;

function init(){

	data = [
		{code: "u1", name: "unit 1", cotent: u1}, 
		{code: "u2", name: "unit 2", cotent: u2}
	];

	for(var i in data){
		var unit = data[i];
		$("#unit").append('<option value="'+i+'">'+unit.name+'</option>');
	}
	for(var i in data[0].cotent){
		var lession = data[0].cotent[i];
		$("#lesson").append('<option value="'+i+'">'+lession.name+'</option>');
	}

	loadConntent();
}

function loadConntent(){

	var unitIdx = $("#unit").val();
	var unit = data[unitIdx];
	var lessonIdx = $("#lesson").val();
	var lesson = unit.cotent[lessonIdx];

	$("#content").empty();
	for(var i in lesson.cotent){
		$("#content").append(lesson.cotent[i]);
	}

	showRubi();

	showHan();

	showVD();
}
function showVD(){
	    
	    if(checked == 0){

	    	$("#vidubox").prop("checked", false);
	    	$("#vidubox").prop("indeterminate", false); 

			$(".vidubox").hide();

			$(".vidunotfirst").hide();

	    }else if(checked ==1){
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

		checked++;
	    if(checked == 3) checked=0;

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
});