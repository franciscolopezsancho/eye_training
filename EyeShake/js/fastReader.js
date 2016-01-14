(function($) {
    $.rand = function(arg) {
        if ($.isArray(arg)) {
            return arg[$.rand(arg.length)];
        } else if (typeof arg === "number") {
            return Math.floor(Math.random() * arg);
        } else {
            return 4;  // chosen by fair dice roll
        }
    };
})(jQuery);

function my_random(max){
	 return Math.floor(Math.random() * max)
}

var items = ['Im very happy'];
var width = 300;
var time_to_read = 500;
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
	$("#text").css("width",this.width)
	$("#marker").css("width",this.width)
	$("#width-checker").text(this.width)
	
	
}


function add_width(){
modify_width(50)
}

function shrink_width(){
	modify_width(-50)
}



function build_div(pos){	
	var words = get_words(text,number_words,pos); 
	words_to_watch = print_words(words[0]);
	var index = text.indexOf(words_to_watch)
	$("#text").text(words_to_watch);
	printPart(this.text,0,index,"text-bucket-init")
	printPart(this.text,index,  index + words_to_watch.length,"text-bucket-styled")
	printPart(this.text,index + words_to_watch.length, this.text.length,"text-bucket-end")
	return words[1];
}

function deletes(){
	$("#text").text('| |');
}
var currentPos = 0;
function blink(){
	currentPos = build_div(this.currentPos);
	setTimeout(blink,time_to_read);
}

function start_horizontal() {
		setInterval(blink,1000);	
}

function get_words(text,number_words,pos){
	var words =  text.split(' ');
	var chunk = new Array();
	var words_sin = 0;
	for(var i=0;words_sin<number_words;i++){
		chunk[i] = words[pos+i];
		if(!has_sin(chunk[i])){
			words_sin = words_sin + 1
		}
		
	}
	return [chunk,pos+chunk.length];
}

function printPart(initText,from,to,where){
	$("#"+where).text(initText.substring(from,to))
}

function count_words_sin(text){
	var has_sin = 0 
	for(var i in forbidden_punctuations){
		if(text.indexOf(forbidden_punctuations[i]) != -1){
			has_sin = has_sin + 1;
		}		
	}
	return has_sin;
}

var forbidden_punctuations = [',','.',';',':'];
//if has any forbidden punctuation sign return true
function has_sin(text){
	var has_sin = false
	for(var i in forbidden_punctuations){
		if(text.indexOf(forbidden_punctuations[i]) != -1){
			has_sin = true;
			break;
		}		
	}
	return has_sin;
}

function avoid_pause_simbols(text,number_words){
	var chunk = new Array();	
	while(chunk == null  || chunk.length == 0){
		chunk = get_words(text,number_words);
	}
	return chunk;
}

function print_words(words){
	var to_print = '';
	for(var i=0;i<words.length;i++){
		to_print = to_print + words[i]+' '
	}
	return to_print;
}



var already_responded = false;

function manage_check_response(){
	if($("#response") == null || $("#response").val() == ''){
		blink();		
	}else{
		check_response();			
	}
}

function check_response(){
	
	if(!($("#response").val().trim() == words_to_watch.trim())){
		$("#error_message").text('Response was:'+ words_to_watch )
		$("#error_message").show();	
		setTimeout(function(){
			$("#error_message").hide();	
		},5000);
	}else{
		$("#success_message").show();	
		setTimeout(function(){
			$("#success_message").hide();	
		},1000);
	}
	$("#response").val("");
	
}




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
		manage_check_response();
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
	  
	  $("#text-bucket").change(function(e) {
	    //this.text = $("#text-bucket").val();
		assign_to_bucket($("#text-bucket").val());
		//build_div();
	  });
	//$("#text-bucket").text(text);
	apply_width();
	apply_number_words();
	apply_time_to_read();
});


function assign_to_bucket(text) {
	this.text = text;
}

function receivedText() {
	    document.getElementById('editor').appendChild(document.createTextNode(fr.result));
	      }    


var form = document.getElementById('main_form');
var fileSelect = document.getElementById('file-select');
var uploadButton = document.getElementById('upload-button');












