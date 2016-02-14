$.getScript("js/fastReader.js", function(){});  
function View() {}
var readerController = new FastReader()
var viewAke = new View()

var time_to_read = 250;
var number_words = 3;
var words_to_watch;
var averageLength = 8
var numWords = 3
var maxLength = averageLength*numWords
var numLines = 2
var counterWords = 0
var initTime = 0 
var going_up = false




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


function populate_bottom(text) {
$("#bottom-container").children().remove()
$("#all-container").children().remove()

	$.each(text.split("\n"),function( index,paragraph ) {
		$("#bottom-container").append("<p id="+index+">"+paragraph+"\n"+"</p>")
		$("#all-container").append("<p id="+index+">"+paragraph+"\n"+"</p>")
		
	})
	$("#all-container").children().bind("click",readerController.reset_focus	);
	
	$("#current").text("0")
	$("#goto").val("0")
}


function pickNumWords(from,amount){
	if(from.children().first().text().length == 0) return amount
	var allWords = readerController.take_text(from.children().first().text(),amount,true)
	if(allWords.length > maxLength){
		return pickNumWords(from,amount-1)
	}else{
		return amount
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
 	numWords = 3
	$("#loader").hide()
	$("#stats").show()
	
	$("#all-container").hide()
	$("#upper-container").show()
	$("#bottom-container").show()
	$("#timeo-2-read").hide()
	
	$("#truki").show()
	setTimeout(blink,700)
	

}


function halt(){
if(stopped){
	stopped = false
	setTimeout(blink,300)
	}else{
	stopped = true}
}
var stopped = true
function stop(){
$("#goto").val($("#current").text())

	$("#loader").show()
	$("#stats").hide()
	$("#timeo-2-read").show()
	
	$("#truki").hide()
	$("#upper-container").hide()
	$("#bottom-container").hide()
	$("#all-container").show()
	$("#all-container").scrollTo($("#all-container").children().eq($("#current").text()),
	{
	  offset: {top:-300},
	})
	
	
	setTimeout($("#all-container").children().eq($("#current").text()).addClass('upper-last-child'),100)
	


stopped = true
}

var scrolling = false


function blinkDown(){

  if(!stopped){


var paragraphsText = $("#reader-container").text()

readerController.redistributing_down($("#upper-container"),$("#reader-container"),numWords)
readerController.redistributing_down($("#reader-container"),$("#bottom-container"),numWords)
if(!going_up){setTimeout(blinkDown,300)}
}		

}



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
		var endOfSentence = addPeriodMark();
		delay($("#reader-container").text(),reader2Upper,amount,time_to_read,marks,endOfSentence)
	}	

}
var lastWordIsEndOfSentece = false

function delay(readerText,callback,amount,time_to_read,marks,endOfSentence){
	var isBegining = !lastWordIsEndOfSentece
	if(lastWordIsEndOfSentece){
	setTimeout(function() {callback(amount,marks)},time_to_read*2);	
	}else if(endOfSentence){
	setTimeout(function() {callback(amount,marks)},time_to_read*4);
	}else if(readerText.indexOf("\n")>-1 && readerText.indexOf(".")==-1 && readerText.trim().length > 2){	
	setTimeout(function() {callback(amount,marks)},time_to_read*4);
	}else  if(readerText.indexOf(",")>-1 || readerText.indexOf("(")>-1 || readerText.indexOf(")")>-1 || readerText.indexOf(":")>-1){
		setTimeout(function() {callback(amount)},time_to_read*1.5);
	}else {
	setTimeout(function() {callback(amount,marks)},time_to_read);
	}
	lastWordIsEndOfSentece = endOfSentence
	
}

function reader2Upper(amount,marks){
	
	var paragraphsText = $("#reader-container").text()
	showSpeed(paragraphsText)
	$("#reader-container").children().remove()
	$("#reader-container").append("<p>"+paragraphsText+"</p>")
	readerController.redistributing_up($("#reader-container"),$("#upper-container"),amount,marks)
	//because redistributing creates an empty <p>
	//we look for the previous one
	addParagraphFlash($("#upper-container"))
	//$("#upper-container").children().bind("click",readerController.reset_focus	)
	$("#current").text($("#upper-container").children().last().attr("id"))
	
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

function addPeriodMark(){
	var text = $("#reader-container").children().last().text();
	if(text.indexOf(".") == (text.length -1)){
 	   $("#reader-container").children().addClass("period")	
	   return true
	   }
	   return false
	
}
function addParagraphFlash(to){
var penultimate = to.children()[to.children().length-2]
	if(penultimate){
		if($(penultimate).text().indexOf("\n") != -1){
			$(penultimate).addClass('upper-last-child')
		
		}
	}
	
}

function cleanPeriodMark(){
	$("#dot").remove();
}

function cleanParagraphMark(){
	//$("#paragraphMark").remove();
	$(penultimate).removeClass('upper-last-child')
	
}



function changeState(){
if(stopped){
	start()
}else{
	stop()
}
}

var idInterval = undefined;

$(document).ready(function() {
	//configuration buttons
	$("#start").click(start);
	$("#stop").click(stop);
	$("#truki").click(stop)
	$("#upper-container").bind("click",changeState)	
	$("#bottom-container").bind("click",changeState)
	
	$("#goto").bind("blur",function(){
		//$("#"+$(this).val()).click()
		$("#current").text($(this).val())
		$("#all-container").children().eq($(this).val()).click()
// 		$("#"+$("#current").text($(this).val())+"").get(0).scrollIntoView()
		
	})
	$("#goto").keydown(function(e){
	  
	     
				     if(e.keyCode == 13){
				         // user has pressed enter
				 		$("#current").text($(this).val())
				 		$("#all-container").children().eq($(this).val()).click()
							return false
							     }
			  	
				
	 				}
					
					);
	$("#time-2-read").val(time_to_read)				
	$("#time-2-read").bind("change",function(e){
		time_to_read = $("#time-2-read").val()
	})
	
	 $("#file-select").change(function(){
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
}});
	  
	  $(document).keydown(function(e){
	  
	     if(e.keyCode == 32){
	         // user has pressed space
			 	halt()	
				return false
				     }
				     
			  	
				
	 				}
					
					);
	  
	$.get("articuloHistoriaArteWiki.txt", function( data ) {
  	populate_bottom( data );
	
	stop();
});
	 
	//$("#text-bucket").text(text);
	
});

var count = 0;

function loading(){
      count++;
      var dots = new Array(count % 10).join('.');
      $("#loading-message").text(dots)
    }
  
function receivedText(loading) {
	populate_bottom(fr.result)
	}    













































