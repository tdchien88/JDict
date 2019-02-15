

var data = [];
var vdchecked = 0;
var isShowSetting = true;

function init(){

	data = [
		{code: "u1", name: "unit 1", cotent: u1}, 
		{code: "u2", name: "unit 2", cotent: u2}, 
		{code: "u3", name: "unit 3", cotent: u3}, 
		{code: "u4", name: "unit 4", cotent: u4}, 
		{code: "u5", name: "unit 5", cotent: u5},
		{code: "u6", name: "unit 6", cotent: u6},
		{code: "u7", name: "unit 7", cotent: u7},
		{code: "u8", name: "unit 8", cotent: u8},
		{code: "u9", name: "unit 9", cotent: u9},
		{code: "u10", name: "unit 10", cotent: u10},
		{code: "u11", name: "unit 11", cotent: u11},
		{code: "u12", name: "unit 12", cotent: u12},
		{code: "u13", name: "unit 13", cotent: u13}
	];

	for(var i in data){
		var unit = data[i];
		$("#unit").append('<option value="'+i+'">'+unit.name+'</option>');
	}


	
	try{
		if(localStorage.score == null){

			var score = [];

			for(var u in data){
				var unit = data[u].cotent;
				score[u] = [];
				for (var l in unit) {
					var lession = unit[l].cotent;
						score[u][l] = [];
					for (var w in lession) {
						score[u][l][w] = 0;
					}
				}
			}
			localStorage.score = JSON.stringify(score);

		}else{
			var score = [];
			var ulw = JSON.parse(localStorage.score);

			for(var u in data){
				var unit = data[u].cotent;
				score[u] = [];
				for (var l in unit) {
					var lession = unit[l].cotent;
						score[u][l] = [];
					for (var w in lession) {
						score[u][l][w] = ulw[u][l][w];
					}
				}
			}

			localStorage.score = JSON.stringify(score);
		}


	}
	catch(err) {


		var score = [];

		for(var u in data){
			var unit = data[u].cotent;
			score[u] = [];
			for (var l in unit) {
				var lession = unit[l].cotent;
					score[u][l] = [];
				for (var w in lession) {
					score[u][l][w] = 0;
				}
			}
		}
		localStorage.score = JSON.stringify(score);

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


		$( ".boxtv" ).prepend( `<div class="score"></div>` );

		$("div:has(> span.lienquan)").removeClass("tuvung");
		$("div:has(> span.lienquan)").addClass("fontnho");

	}

	showRubi();

	showHan();

	showVD();

	showStar();
	showDiem();

	$("html, body").animate({ scrollTop: 0 }, "slow");
}

function showOnly(diem){
	if(localStorage.score){

		var unitIdx = $("#unit").val();
		var unit = data[unitIdx];
		var lessonIdx = $("#lesson").val();
		var ulw = JSON.parse(localStorage.score);

		for (var w in ulw[unitIdx][lessonIdx]) {
			var score = ulw[unitIdx][lessonIdx][w];	
			if(score.toString() == diem.toString()){
				$($( ".boxtv" )[w]).show();
			}else{
				$($( ".boxtv" )[w]).hide();
			}
		}

		$(".mainstar").removeClass("checked");
		$($(".mainstar")[diem]).addClass("checked");

		$("html, body").animate({ scrollTop: 0 }, "slow");
	}
}

function showDiem(){
	var diem = [0,0,0,0,0,0];


	if(localStorage.score){
		var unitIdx = $("#unit").val();
		var unit = data[unitIdx];
		var lessonIdx = $("#lesson").val();

		try{
			var ulw = JSON.parse(localStorage.score);
			for (var w in ulw[unitIdx][lessonIdx]) {
				var score = ulw[unitIdx][lessonIdx][w];
				switch(score.toString()){
					case "0":
						diem[0]++;
						break;
					case "1":
						diem[1]++;
						break;
					case "2":
						diem[2]++;
						break;
					case "3":
						diem[3]++;
						break;
					case "4":
						diem[4]++;
						break;
					case "5":
						diem[5]++;
					break;
				}
			}
			
		}catch(err){
			console.log(err)
		}
	}
	


	for (var i = 0; i <= 5; i++) {
		$($(".diem")[i]).text(diem[i]);
	}
}

function showStar(){
	if(localStorage.score){

		var unitIdx = $("#unit").val();
		var unit = data[unitIdx];
		var lessonIdx = $("#lesson").val();
		var lesson = unit.cotent[lessonIdx];
		try{
			var ulw = JSON.parse(localStorage.score);
			for (var w in ulw[unitIdx][lessonIdx]) {
				var score = ulw[unitIdx][lessonIdx][w];
				 updateStar(w, score);
			}
			
		}catch(err){
			console.log(err)
		}
	}
}

function updateStar(w, score){
	$( $( ".score" )[w]).empty();
	for (var i = 1; i < 6; i++) {
		if(i <= score){
			$( $( ".score" )[w]).append( `<span class="fa fa-star star checked" wordidx="`+w+`" score="`+i+`"></span>`);
		}else{
			$( $( ".score" )[w]).append( `<span class="fa fa-star star" wordidx="`+w+`" score="`+i+`"></span>`);
		}
	}

}

function setScore(element){
	var score = $(element).attr("score");

	var wordIdx = $(element).attr("wordidx");

	var unitIdx = $("#unit").val();
	var unit = data[unitIdx];
	var lessonIdx = $("#lesson").val();
	var lesson = unit.cotent[lessonIdx];

	var ulw = JSON.parse(localStorage.score);
	ulw[unitIdx][lessonIdx][wordIdx] = score;

	localStorage.score = JSON.stringify(ulw);

	updateStar(wordIdx, score);

	showDiem();

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

	$("#content").on('click', ".score .star", function(){
		setScore(this);
	});

	$(".banstar").click(function(){
		loadConntent();
		$(".banstar").addClass("checked");
		$(".mainstar").removeClass("checked");
	});
	$(".mainstar").click(function(){
		var d = $(this).attr("diem");
		$(".banstar").removeClass("checked");
		showOnly(d);
	});
	$(".mainstar").dblclick(function(){
		loadConntent();
	}).on('doubletap', function() { // Mobile browsers only
	    window.location = this.href;
	});;

	$('.arrow').click(function () {
		if(!isShowSetting){
			$("#mybutton").animate({height:80});
			$(".satus").show();
		}else{
			$("#mybutton").animate({height:25});
			$(".satus").hide();

		}
		isShowSetting  = !isShowSetting;
	});

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

	$("#content").on('click', ".boxtv .tuvung", function(){
		if($(this).parent().find(".vidubox").is(':visible')){
			$(this).parent().find(".vidubox").hide();
		}else{
			$(this).parent().find(".vidubox").show();
			$(".vidunotfirst").show();
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

	// target elements with the "draggable" class
	interact('.draggable')
  	.resizable({
		// resize from all edges and corners
		edges: { left: true, right: true, bottom: true, top: true },

			// keep the edges inside the parent
			restrictEdges: {
			outer: 'parent',
			endOnly: true,
		},

		// minimum size
		restrictSize: {
			min: { width: 100, height: 50 },
		},
		onmove: resizeMoveListener,

		inertia: true,
	});

	function resizeMoveListener  (event) {
		var target = event.target,
		x = (parseFloat(target.getAttribute('data-x')) || 0),
		y = (parseFloat(target.getAttribute('data-y')) || 0);

		// update the element's style
		target.style.width  = event.rect.width + 'px';
		target.style.height = event.rect.height + 'px';

		// translate when resizing from top or left edges
		x += event.deltaRect.left;
		y += event.deltaRect.bottom;

		target.style.webkitTransform = target.style.transform =
        'translate(' + x + 'px,' + y + 'px)';

		target.setAttribute('data-x', x);
		target.setAttribute('data-y', y);
		// target.textContent = Math.round(event.rect.width) + '\u00D7' + Math.round(event.rect.height);
 
	}

/*

	interact('.draggable')
	.draggable({
		// enable inertial throwing
		inertia: true,
		// keep the element within the area of it's parent
		restrict: {
			restriction: "parent",
			endOnly: true,
			elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
		},
		// enable autoScroll
		autoScroll: true,

		// call this function on every dragmove event
		onmove: dragMoveListener,
		// call this function on every dragend event
		onend: function (event) {
			//var textEl = event.target.querySelector('p');

//			textEl && (textEl.textContent = 'moved a distance of '
//			+ (Math.sqrt(Math.pow(event.pageX - event.x0, 2) +
//			Math.pow(event.pageY - event.y0, 2) | 0))
//			.toFixed(2) + 'px');
		}
	});
	function dragMoveListener (event) {
		var target = event.target,
		// keep the dragged position in the data-x/data-y attributes
		x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
		y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

		// translate the element
		target.style.webkitTransform = target.style.transform =
		'translate(' + x + 'px, ' + y + 'px)';

		// update the posiion attributes
		target.setAttribute('data-x', x);
		target.setAttribute('data-y', y);
	}
*/

});