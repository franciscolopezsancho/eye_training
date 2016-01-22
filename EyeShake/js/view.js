var items = ['Im very happy'];
var width = 600;
var time_to_read = 100;
var text = 'In the twelfth and thirteenth centuries, the Jurchen Jin Dynasty (1115–1234) waged a series of military campaigns against the Chinese Song Dynasty (960–1279). In 1115, the Jurchens rebelled against their overlords, the Khitans of the Liao Dynasty (907–1125), and declared the formation of the Jin. Allying with the Song against their common enemy the Liao, the Jin promised to return to the Song the territories in northern China that had fallen under Liao control since 938. The Jurchens quick defeat of the Liao combined with Song military failures made the Jin reluctant to cede these territories. After a series of failed negotiations that embittered both sides, the Jurchens attacked the Song in November 1125, dispatching one army towards Taiyuan and the other towards Kaifeng, the Song capital. Surprised by the news of an invasion, the Song general stationed in Taiyuan retreated from the city, which was besieged and later captured. As the second Jin army approached the capital, Emperor Huizong of the Song abdicated and fled south. A new emperor, Qinzong, was enthroned. The Jurchens began a siege against Kaifeng in 1126, but Qinzong negotiated for their retreat from the capital after he agreed to pay a large annual indemnity. Qinzong reneged on the deal and ordered Song forces to defend the prefectures instead of fortifying the capital. The Jin resumed their war against the Song and again besieged Kaifeng in 1127. The Chinese emperor was captured in an event known as the Jingkang Incident, the capital was looted, and the Song lost northern China to the Jin. Remnants of the Song retreated to southern China and, after brief stays in several temporary capitals, eventually relocated to Hangzhou. The retreat of the Song court marked the end of the Northern Song era and the beginning of the Southern Song.'
//var text = 'Lorem ipsum dolor draw attention sit amet, consectetuer adipiscing elit. Nam nibh. Nunc varius facilisis eros';
var number_words = 3;
var words_to_watch;
var response;
var min_total_letters_factor = 4;




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


// function build_div(pos){
// 	var words = get_words(text,number_words,pos);
// 	words_to_watch = print_words(words[0]);
// 	var index = text.indexOf(words_to_watch)
// 	//$("#text").text(words_to_watch);
// 	lastTopPar = append_p_to_div(this.text.substring(index,  index + words_to_watch.length),"#upper-container",lastTopPar,true)
// 	printPart(this.text,0,index,"text-bucket-init")
// 	printPart(this.text,index,index + words_to_watch.length,"text-bucket-styled")
// 	update_bottom(words_to_watch)
// 	return words[1];
// }
//
// function build_div2(paragraphId,number_words){
//
// }
//
// function append_p_to_div(words,div,lastPar,up){
// 	if(words.indexOf("\n")>-1){
// 		$(div).append("<p>"+lastPar + words.substring(0,words.indexOf("\n"))+"</p>")
// 		var dif = $(div)
// 		if(up){dif.scrollTop(dif[0].scrollHeight)}else{};
// 		return words.substring(words.indexOf("\n"),words.length)
// 	}
// 	return lastPar + words
// }
//
function populate_bottom(text) {
	$.each(text.split("\n"),function( index,paragraph ) {
		$("#bottom-container").append("<p>"+paragraph+"</p>")
	})
}
// function build_paragraph(text,div,order){
// 	var content = $(div+" p").apply(order).text()
// 	if(text.indexOf("\n")>-1){
// 		$(div+ " p").apply(order).remove()
// 	}else{
// 		$(div+ " p").apply(order).remove()
// 		$(div).append("<p>"+content.substring(content.indexOf(text)+text.length)+"</p>")
// 	}
// }




//make blink reader on punto
//make blink upper on punto y aparte


// function update_bottom(text) {
// 	var content = $("#text-bucket-end p").first().text()
// 	if(text.indexOf("\n")>-1){
// 		$("#text-bucket-end p").first().remove()
//
// 	}else{
// 		$("#text-bucket-end p").first().remove()
// 		$("#text-bucket-end").prepend("<p>"+content.substring(content.indexOf(text)+text.length)+"</p>")
// 	}
// }


var readerController = new FastReader()

function blink(){
		readerController.redistributing_up($("#reader-container"),$("#upper-container"),3)
		readerController.redistributing_up($("#bottom-container"),$("#reader-container"),3)
		setTimeout(blink,time_to_read);

}
//
// function start_horizontal() {
// 		setInterval(blink,1000);
// }
//
// function get_words(text,number_words,pos){
// 	var words =  text.split(' ');
// 	var chunk = new Array();
// 	var words_sin = 0;
// 	for(var i=0;words_sin<number_words;i++){
// 		chunk[i] = words[pos+i];
// 		words_sin = words_sin + 1
//
// 	}
// 	return [chunk,pos+chunk.length];
// }
//
// function printPart(initText,from,to,where){
// 	$("#"+where).text(initText.substring(from,to))
// }
//
//
//
//
// function print_words(words){
// 	var to_print = '';
// 	for(var i=0;i<words.length;i++){
// 		to_print = to_print + words[i]+' '
// 	}
// 	return to_print;
// }







$(document).ready(function() {
	$("#start").click(blink);
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
	//avoiding reload page
	$("#response").bind("enterKey",function(e){
		blink();
		});
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
	  
	 
	//$("#text-bucket").text(text);
	apply_width();
	apply_number_words();
	apply_time_to_read();
});




function receivedText() {
	  //document.getElementById('editor').appendChild(document.createTextNode(fr.result));
	populate_bottom(fr.result)
	  
	      }    


var form = document.getElementById('main_form');
var fileSelect = document.getElementById('file-select');
var uploadButton = document.getElementById('upload-button');












