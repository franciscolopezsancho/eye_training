

function View() {
}

View.prototype.redistribute = function (text,lines){
	//expects an array lines.length with strings
	//with best distribution
	function redistribute_acc(text,lines,acc){	
		if(lines == 1){
			acc.push(text)
			return acc
		}else{
			var mod = text.length/lines	
			var firstPiece = text.substring(0,mod)
			var secondPiece = text.substring(mod)
			
			var quickestBlankBefore =firstPiece.lastIndexOf(" ")+1	
			var quickestBlankAfter = secondPiece.indexOf(" ")
			var absolutQuickest = 0
			if(quickestBlankBefore == -1 && quickestBlankAfter != -1){
				absolutQuickest = quickestBlankAfter
			}else if(quickestBlankBefore != -1 && quickestBlankAfter == -1){
				absolutQuickest = quickestBlankBefore
			}else if(quickestBlankBefore == -1 && quickestBlankAfter == -1){
				absolutQuickest = quickestBlankBefore
				return acc.push(text)
			}else if(mod - quickestBlankBefore > quickestBlankAfter){
				absolutQuickest = quickestBlankAfter + mod 
			}else if(mod - quickestBlankBefore <= quickestBlankAfter){
				absolutQuickest = quickestBlankBefore
			}else{
				throw "None of the cases to redistribute reached. Not set what to do"
			}
			acc.push(text.substring(0,absolutQuickest))
			return redistribute_acc(text.substring(absolutQuickest),lines-1,acc)
		}
	}	
	return redistribute_acc(text,lines,new Array())
}

$.getScript("js/fastReader.js", function(){


});  

var items = ['Im very happy'];
var width = 600;
var time_to_read = 200;
var text = 'In the twelfth and thirteenth centuries, the Jurchen Jin Dynasty (1115–1234) waged a series of military campaigns against the Chinese Song Dynasty (960–1279). In 1115, the Jurchens rebelled against their overlords, the Khitans of the Liao Dynasty (907–1125), and declared the formation of the Jin. Allying with the Song against their common enemy the Liao, the Jin promised to return to the Song the territories in northern China that had fallen under Liao control since 938. The Jurchens quick defeat of the Liao combined with Song military failures made the Jin reluctant to cede these territories. After a series of failed negotiations that embittered both sides, the Jurchens attacked the Song in November 1125, dispatching one army towards Taiyuan and the other towards Kaifeng, the Song capital. Surprised by the news of an invasion, the Song general stationed in Taiyuan retreated from the city, which was besieged and later captured. As the second Jin army approached the capital, Emperor Huizong of the Song abdicated and fled south. A new emperor, Qinzong, was enthroned. The Jurchens began a siege against Kaifeng in 1126, but Qinzong negotiated for their retreat from the capital after he agreed to pay a large annual indemnity. Qinzong reneged on the deal and ordered Song forces to defend the prefectures instead of fortifying the capital. The Jin resumed their war against the Song and again besieged Kaifeng in 1127. The Chinese emperor was captured in an event known as the Jingkang Incident, the capital was looted, and the Song lost northern China to the Jin. Remnants of the Song retreated to southern China and, after brief stays in several temporary capitals, eventually relocated to Hangzhou. The retreat of the Song court marked the end of the Northern Song era and the beginning of the Southern Song.'
//var text = 'Lorem ipsum dolor draw attention sit amet, consectetuer adipiscing elit. Nam nibh. Nunc varius facilisis eros';
var number_words = 3;
var words_to_watch;
var response;
var min_total_letters_factor = 4;
var averageLength = 6
var numWords = 4
var maxLength = averageLength*numWords
var numLines = 2
var counterWords = 0
var initTime = 0 






function modify_width(to_add){
	this.width = this.width + to_add;
	apply_width();
}

function modify_words(to_add){
	this.number_words = this.number_words + to_add;
	apply_number_words();
}

function modify_time_to_read(to_add){
	this.time_to_read = this.time_to_read + to_add;
	apply_time_to_read();
}

function apply_time_to_read(){
	$("#time_to_read").text(this.time_to_read/1000)
}

function apply_number_words(){
	$("#number_words").text(this.number_words);
	
}

function apply_width(){
	$("#reader").css("width",this.width)	
}


function add_width(){
	modify_width(50)
}

function shrink_width(){
	modify_width(-50)
}

var lastTopPar = "";
var lastBottomPar = "";
function populate_bottom(text) {
$("#bottom-container").children().remove()

	$.each(text.split("\n"),function( index,paragraph ) {
		$("#bottom-container").append("<p id="+index+">"+paragraph+"\n"+"</p>")
	})
	$("#bottom-container").children().bind("click",function(event){
    // code to handle children click here
	var clicked = this
	var last = $("#upper-container").children().last()
	var first = $("#bottom-container").children().first()
	if(last.attr('id') == first.attr('id')){
		$("#bottom-container").prepend('<p id="'+last.attr('id')+'">'+last.text()+first.text()+'</p>')
		
	}
	
			var t1 = new Date()

	$.each($("#bottom-container").children(),function(index,p)
	{
	if(parseInt(clicked.id) > parseInt(p.id)){$("#upper-container").append(p)}else{
		console.log("total bottom containter : "+(new Date().getTime()-t1.getTime())/1000)
		return false}
	});
			 t1 = new Date()

	$.each($("#upper-container p").get().reverse(),function(index,p){
	if(parseInt(clicked.id) < parseInt(p.id)){$("#bottom-container").prepend(p)}else{
		console.log("total up containter : "+(new Date().getTime()-t1.getTime())/1000)
		return false}
	});
			 t1 = new Date()

	$.each($("#upper-container").children(),function(index,p){
	if(parseInt(clicked.id) == parseInt(p.id)){$("#bottom-container").prepend(p)
		console.log("total same containter : "+(new Date().getTime()-t1.getTime())/1000)

		return false}
	});
	var dif = $("#upper-container")
	dif.scrollTop(dif[0].scrollHeight)
	var duf = $("#bottom-container")
	duf.scrollTop(0)
	
    event.stopPropagation(); // if you don't want event to bubble up
	}	);
}



$.getScript("fastReader.js", function(){
});  

var readerController = new FastReader()

var viewAke = new View()


function pickNumWords(from,amount){
	if(from.children().first().text().length == 0) return amount
	var allWords = readerController.take_text(from.children().first().text(),amount,true)
	if(allWords.length > maxLength){
		return pickNumWords(from,amount-1)
	}else{
		return amount
	}
}

var going_up = false

function blink(marks){
  if(!stopped){
		if(initTime == 0){initTime = new Date() }
		var amount = pickNumWords($("#bottom-container"),numWords)
		readerController.redistributing_up($("#bottom-container"),$("#reader-container"),amount,marks)	
		var paragraphs = viewAke.redistribute($("#reader-container").text(),numLines)
		$("#reader-container").children().remove()
		for(p in paragraphs){
		$("#reader-container").append("<p>"+paragraphs[p]+"</p>")
		}

		delay($("#reader-container").text(),reader2Upper,amount,time_to_read,marks)
	}	

}

function changeDirection(){
if(going_up){
	going_up = false
	setTimeout(blinkDown,1000)
}else{
going_up = true
setTimeout(blink,1000)
}
}

function start(){
 	stopped = false
	going_up = true
 	numWords = 4
	setTimeout(blink,1000)
	

}
var stopped = true
function stop(){
	stopped = true
}

var scrolling = false
function increaseSpeedUP(){
	if(!going_up){
		going_up = true
	}
	if(!scrolling){
		stop()
		
		scrolling = true
		blink([])
	}
	numWords = numWords*1.5
	

}



function increaseSpeedDown(){
	if(going_up){
		stop()	
		going_up = false
		blinkDown()		
	}
	numWords = numWords*1.5


}


function blinkDown(){

  if(!stopped){


var paragraphsText = $("#reader-container").text()

readerController.redistributing_down($("#upper-container"),$("#reader-container"),numWords)
readerController.redistributing_down($("#reader-container"),$("#bottom-container"),numWords)
if(!going_up){setTimeout(blinkDown,300)}
}		

}



function delay(readerText,callback,amount,time_to_read,marks){
	if(readerText.indexOf("\n")>-1){
	setTimeout(function() {callback(amount,marks)},time_to_read*1.5);
	}else if(readerText.indexOf(".")>-1 || readerText.indexOf(":")>-1){
	setTimeout(function() {callback(amount,marks)},time_to_read*2);
	}else if(readerText.indexOf(",")>-1 || readerText.indexOf("(")>-1 || readerText.indexOf(")")>-1 ){
		setTimeout(function() {callback(amount)},time_to_read*1.5);
	}else {
	setTimeout(function() {callback(amount,marks)},time_to_read);
	}
}

function reader2Upper(amount,marks){
	
	var paragraphsText = $("#reader-container").text()
	showSpeed(paragraphsText)
	$("#reader-container").children().remove()
	$("#reader-container").append("<p>"+paragraphsText+"</p>")
	readerController.redistributing_up($("#reader-container"),$("#upper-container"),amount,marks)
	//because redistributing creates an empty <p>
	//we look for the previous one
	addParagraphMark($("#upper-container"))
	var dif = $("#upper-container")
	dif.scrollTop(dif[0].scrollHeight)
	var duf = $("#bottom-container")
	duf.scrollTop(0)
    if(going_up)(blink());	

}

function showSpeed(paragraphsText){
 counterWords = counterWords + paragraphsText.split(" ").length
 if((new Date().getTime() - initTime.getTime())/1000 > 59 && (new Date().getTime() - initTime.getTime())/1000 <61){
	 $("#speed").text(counterWords)
	 initTime = new Date()
	 counterWords = 0
	 }
}



function addMark(){
	var text = $("#reader-container").text()
	addParagraphMark(text)
	
}

function addPeriodMark(text){
	if(text.indexOf(".") != -1){
		$("#period").prepend('<span id="dot" class="period">'+".."+"</span>");
	}
	setTimeout(cleanPeriodMark,150)
	
}
function addParagraphMark(to){
var penultimate = to.children()[to.children().length-2]
	if(penultimate){
		if($(penultimate).text().indexOf("\n") != -1){
			//$("#paragraph").append('<span id="paragraphMark" class="paragraph">'+".."+"</span>");
			$(penultimate).addClass('upper-last-child')
		
		}
		//setTimeout(function(){cleanParagraphMark(penultimate)},1000)
	}
	
}

function cleanPeriodMark(){
	$("#dot").remove();
}

function cleanParagraphMark(){
	//$("#paragraphMark").remove();
	$(penultimate).removeClass('upper-last-child')
	
}






$(document).ready(function() {
	//configuration buttons
	$("#more_width").click(add_width);
	$("#less_width").click(shrink_width);
	$("#more_words").bind("click",function(e){
		modify_words(1)
	});
	$("#less_words").bind("click",function(e){
		modify_words(-1)
	});
	$("#less_time_to_read").bind("click",function(e){
		modify_time_to_read(-1000)
	});
	$("#more_time_to_read").bind("click",function(e){
		modify_time_to_read(1000)
	});
	$("#change_direction").click(changeDirection);
	$("#start").click(start);
	$("#stop").click(stop);
	$("#up_faster").click(increaseSpeedUP);
	$("#down_faster").click(increaseSpeedDown);
	
	//avoiding reload page
	// $("#response").bind("enterKey",function(e){
// 		blink();
// 		});
	$("#response").keydown(function(e){
	    if(e.keyCode == 13)
	    {
	        $(this).trigger("enterKey");
	    }
	});
	
	$("#main_form").submit(function(event) {
	      
		  /* stop form from submitting normally */
	      event.preventDefault();
	       $("#upload-button").innerHTML = 'Uploading...';
	       // Get the selected files from the input.
	        var files = $("#file-select")[0].files;
	       // Create a new FormData object.
	        var formData = new FormData();
	       // Loop through each of the selected files.
	        for (var i = 0; i < files.length; i++) {
	          var file = files[i];
	       // Check the file type.
	       // Add the file to the request.
	        fr = new FileReader();
	        fr.onload = receivedText;
	       fr.readAsText(file);
	       //                   fr.readAsDataURL(file);
	          formData.append('photos[]', file, file.name);
		}
	  });
	  
	$.get("articuloHistoriaArteWiki.txt", function( data ) {
  	populate_bottom( data );
});
	 
	//$("#text-bucket").text(text);
	apply_width();
	apply_number_words();
	apply_time_to_read();
});




function receivedText() {
	populate_bottom(fr.result)
	  
	      }    


var form = document.getElementById('main_form');
var fileSelect = document.getElementById('file-select');
var uploadButton = document.getElementById('upload-button');










































