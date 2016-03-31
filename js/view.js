$.getScript("js/fastReader.js", function() {});

var readerController = new FastReader()
var viewAke = new View()

var time_to_read = 222;
var number_words = 3;
var words_to_watch;
var averageLength = 8
var numWords = 3
var maxLength = averageLength * numWords
var numLines = 2
var counterWords = 0
var initTime = 0
var going_up = false
var stopped = true
var lastWordIsEndOfSentece = false



function View() {}


//This will redistribute evenly text in reader paragraph 
//in as many lines as commanded
View.prototype.redistribute = function(text, lines) {
    //expects an array lines.length with strings
    //with best distribution
    function redistribute_acc(text, lines, acc) {
        if (lines == 1) {
            acc.push(text)
            return acc
        } else {
            var mod = text.length / lines
            var firstPiece = text.substring(0, mod)
            var secondPiece = text.substring(mod)

            var quickestBlankBefore = firstPiece.lastIndexOf(" ") + 1
            var quickestBlankAfter = secondPiece.indexOf(" ")
            var absolutQuickest = 0
            if (quickestBlankBefore == -1 && quickestBlankAfter != -1) {
                absolutQuickest = quickestBlankAfter
            } else if (quickestBlankBefore != -1 && quickestBlankAfter == -1) {
                absolutQuickest = quickestBlankBefore
            } else if (quickestBlankBefore == -1 && quickestBlankAfter == -1) {
                absolutQuickest = quickestBlankBefore
                return acc.push(text)
            } else if (mod - quickestBlankBefore > quickestBlankAfter) {
                absolutQuickest = quickestBlankAfter + mod
            } else if (mod - quickestBlankBefore <= quickestBlankAfter) {
                absolutQuickest = quickestBlankBefore
            } else {
                throw "None of the cases to redistribute reached. Not set what to do"
            }
            acc.push(text.substring(0, absolutQuickest))
            return redistribute_acc(text.substring(absolutQuickest), lines - 1, acc)
        }
    }
    return redistribute_acc(text, lines, new Array())
}


function loadBook(text) {
    $("#bottom-container").children().remove()
    $("#all-container").children().remove()
    $.each(text.split("\n"), function(index, paragraph) {
       // $("#bottom-container").append("<p id=" + index + ">" + paragraph + "\n" + "</p>")
        $("#all-container").append("<p id=" + index + ">" + paragraph + "\n" + "</p>")
    })
    $("#all-container").children().bind("click", partialLoadBook);
    $("#current").text("0")
    $("#goto").val("0")
    activateFullScreen();
}


function partialLoadBook(){
	$("#bottom-container").children().remove()
	var curr = parseInt(this.getAttribute("id"))
    $("#current").text(curr)
    $("#goto").val(curr)
	
	
	
	//fill bottom
	for(var index = curr;index < curr + 100;index++){
    	$("#bottom-container").append("<p id=" + index + ">" +$("#all-container").children().eq(index).text()+ "</p>")	
	}
	//fill upper
	for(var index = (parseInt(curr) -1);index + 20  > curr ;index--){
    	$("#upper-container").prepend("<p id=" + index + ">" +$("#all-container").children().eq(index).text()+ "</p>")	
	}
	//$("#upper-container").children().bind("click",this.reset_focus	)
	//$("#bottom-container").children().bind("click",this.reset_focus	)
	var dif = $("#upper-container")
	dif.scrollTop(dif[0].scrollHeight)
	var duf = $("#bottom-container")
	duf.scrollTop(0)
	start();
	//e
}

function keepUpperFitted(margin){

if($("#upper-container").children().length > margin){
	$("#upper-container").children().first().remove()
	}


}


function keepBottomFitted(check,fulfil){
if($("#bottom-container").children().length < check){
var last = parseInt($("#bottom-container").children().last().attr("id"))+1;	
for(var index = last;index < last + fulfil;index++){
	$("#bottom-container").append("<p id=" + index + ">" +$("#all-container").children().eq(index).text()+ "</p>")	
}
}
}


function pickNumWords(from, amount) {
    if (from.children().first().text().length == 0) return amount
    var allWords = readerController.take_text(from.children().first().text(), amount, true)
    if (allWords.length > maxLength) {
        return pickNumWords(from, amount - 1)
    } else {
        return amount
    }
}


function start() {
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
    activateFullScreen()
    setTimeout(blink, 700)
}


function halt() {
    if (stopped) {
        stopped = false
        setTimeout(blink, 300)
    } else {
        stopped = true
    }
}


function stop() {
    $("#goto").val($("#current").text())
    $("#loader").show()
    $("#stats").hide()
    $("#timeo-2-read").show()
    $("#truki").hide()
    $("#upper-container").hide()
    $("#bottom-container").hide()
    $("#all-container").show()
    $("#all-container").scrollTo($("#all-container").children().eq($("#current").text()), {
        offset: {
            top: -200
        },
    })
    setTimeout($("#all-container").children().eq($("#current").text()).addClass('upper-last-child'), 100)
    stopped = true
}
//TODO pause ; and pause begining of a paragraph

function blink(marks) {
    if (!stopped) {
        if (initTime == 0) {
            initTime = new Date()
        }
        var amount = pickNumWords($("#bottom-container"), numWords)
        readerController.redistributing_up($("#bottom-container"), $("#reader-container"), amount, marks)
        var paragraphs = viewAke.redistribute($("#reader-container").text(), numLines)
        $("#reader-container").children().remove()
        for (p in paragraphs) {
            $("#reader-container").append("<p>" + paragraphs[p] + "</p>")
        }
        var endOfSentence = addPeriodClass();
		keepBottomFitted(20,50)
        delay($("#reader-container").text(), reader2Upper, amount, time_to_read, marks, endOfSentence)
    }

}

function delay(readerText, callback, amount, time_to_read, marks, endOfSentence) {
    var isBegining = lastWordIsEndOfSentece
    if (isBegining) {
		lastWordIsEndOfSentece = false
        setTimeout(function() {
            callback(amount, marks)
        }, time_to_read * 2);
    } else if (endOfSentence) {
        setTimeout(function() {
            callback(amount, marks)
        }, time_to_read * 2.5);
    } else if (readerText.indexOf("\n") > -1 && readerText.indexOf(".") == -1 && readerText.trim().length > 2) {
        setTimeout(function() {
            callback(amount, marks)
        }, time_to_read * 2);
    } else if (readerText.indexOf(";") > -1 || readerText.indexOf(",") > -1 || readerText.indexOf("(") > -1 || readerText.indexOf(")") > -1 || readerText.indexOf(":") > -1) {
        setTimeout(function() {
            callback(amount)
        }, time_to_read * 1.5);
    } else {
        setTimeout(function() {
            callback(amount, marks)
        }, time_to_read);
    }
    lastWordIsEndOfSentece = endOfSentence

}

function reader2Upper(amount, marks) {

    var paragraphsText = $("#reader-container").text()
    showSpeed(paragraphsText)
    $("#reader-container").children().remove()
    $("#reader-container").append("<p>" + paragraphsText + "</p>")
    readerController.redistributing_up($("#reader-container"), $("#upper-container"), amount, marks)
    addParagraphFlash($("#upper-container"))
    $("#current").text($("#bottom-container").children().first().attr("id"))

    var dif = $("#upper-container")
    dif.scrollTop(dif[0].scrollHeight)
    var duf = $("#bottom-container")
    duf.scrollTop(0)
	keepUpperFitted(20)
    if (going_up)(blink());

}


function showSpeed(paragraphsText) {
    counterWords = counterWords + paragraphsText.split(" ").length
	var now = new Date();
    if ((now.getTime() - initTime.getTime()) / 1000 > 59 && (now.getTime() - initTime.getTime()) / 1000 < 61) {
        $("#speed").text(counterWords)
        initTime = new Date()
        counterWords = 0
    }
	
	if ((now.getTime() - initTime.getTime()) / 1000 > 61){
        $("#speed").text(0)
        initTime = new Date()
        counterWords = 0
	}
}



function addMark() {
    var text = $("#reader-container").text()
    addParagraphMark(text)

}

function addPeriodClass() {
    var text = $("#reader-container").children().last().text();
    if (text.indexOf(".") != -1 || text.indexOf("\n") != -1 || text.indexOf("?") != -1 ) {
        $("#reader-container").children().addClass("period")
        return true
    }
    return false

}

function addParagraphFlash(to) {
    var penultimate = to.children()[to.children().length - 2]
    if (penultimate) {
        if ($(penultimate).text().indexOf("\n") != -1) {
            $(penultimate).addClass('upper-last-child')

        }
    }

}

function cleanPeriodMark() {
    $("#dot").remove();
}

function cleanParagraphMark() {
    //$("#paragraphMark").remove();
    $(penultimate).removeClass('upper-last-child')

}



function changeState() {
    if (stopped) {
        start()
    } else {
        stop()
    }
}

var idInterval = undefined;

$(document).ready(function() {
    //configuration buttons
    $("#start").click(start);
    $("#stop").click(stop);
    $("#truki").click(stop)
    $("#upper-container").bind("click", changeState)
    $("#bottom-container").bind("click", changeState)
    $("#goto").bind("blur", function() {
        $("#current").text($(this).val())
        $("#all-container").children().eq($(this).val()).click()
    })
    $("#goto").keydown(function(e) {
        if (e.keyCode == 13) {
            // user has pressed enter
            $("#current").text($(this).val())
            $("#all-container").children().eq($(this).val()).click()
            return false
        }
        });      
    $("#time-2-read").val(time_to_read)
    $("#time-2-read").bind("change", function(e) {
        time_to_read = $("#time-2-read").val()
    })
    $("#file-select").change(function() {
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
    $(document).keydown(function(e) {
            if (e.keyCode == 32) {
                // user has pressed space
                halt()
                return false
            }
        }
    );
    $.get("articuloHistoriaArteWiki.txt", function(data) {
        loadBook(data);
        stop();
    });

    //$("#text-bucket").text(text);

});

var count = 0;

function loading() {
    count++;
    var dots = new Array(count % 10).join('.');
    $("#loading-message").text(dots)
}

function receivedText(loading) {
    loadBook(fr.result)
}


function activateFullScreen() {
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    }
}