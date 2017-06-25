function FastReader() {}

//TODO find words with hyphen
FastReader.prototype.take_text = function(paragraph, amount, begining) {
    var numWords = amount
    var sci = this.stickyCarriageIndex(paragraph, begining)
    if (begining) {
        if (sci > -1 && sci < this.indexOfRec(paragraph, numWords, " ")) {
            //change carriege for blank
            var replaced = paragraph.substr(0, sci) + " " + paragraph.substr(sci + " ".length);
            //go until next word
            return paragraph.substring(0, this.indexOfRec(replaced, numWords, " "))
        } else {
            //numWords = amount - 1}
            return paragraph.substring(0, this.indexOfRec(paragraph, numWords, " "))
        }
    } else {
        //if not begining then end is supossed
        if (sci > -1 && sci > this.lastIndexOfRec(paragraph, numWords, " ")) {
            numWords = amount - 1
        }
        return paragraph.substring(this.lastIndexOfRec(paragraph, numWords, " "))
    }
};


FastReader.prototype.find_before_next_word = function(text, from) {
        var nextAlphanum = text.substring(from).search("[A-Za-z]")
        if (nextAlphanum == -1) return text.length
        var lastCarriage = text.substring(from,from + nextAlphanum).lastIndexOf("\n")
        var lastBlank = text.substring(from,from + nextAlphanum).lastIndexOf(" ")
        if (lastCarriage > lastBlank) {
            return lastCarriage + from
        } else {
            return lastBlank + from
        }

    }
	
	FastReader.prototype.find_after_next_word = function(text, from) {
	        var nextAlphanum = text.substring(from).search("[A-Za-z]")
	        if (nextAlphanum == -1) return text.length
	        var lastCarriage = text.substring(from + nextAlphanum).indexOf("\n")
	        var lastBlank = text.substring(from + nextAlphanum).indexOf(" ")
	        if (lastCarriage > lastBlank) {
	            return lastCarriage + from
	        } else {
	            return lastBlank + from
	        }

	    }
    //TODO shouln't I be passing first take_text then stickyCharacter then anything else??

FastReader.prototype.delete_text = function(paragraph, amount, begining) {
    var numWords = amount
    var sci = this.stickyCarriageIndex(paragraph)
    if (begining) {
        if (sci > -1 && sci < this.indexOfRec(paragraph, numWords, " ")) {
            numWords = amount - 1
        }
        return paragraph.substring(this.indexOfRec(paragraph, numWords, " "))
    } else {
        //if not begining then end is supossed
        if (sci > -1 && sci > this.lastIndexOfRec(paragraph, numWords, " ")) {
            numWords = amount - 1
        }
        return paragraph.substring(0, this.lastIndexOfRec(paragraph, numWords, " "))
    }
};

FastReader.prototype.move_text = function(from, to, amount, fromBeginingFrom, toBeginningTo) {
    if (toBeginningTo) return this.take_text(from, amount, fromBeginingFrom) + to
    else return to + this.take_text(from, amount, fromBeginingFrom)


}

FastReader.prototype.indexOfRec = function(paragraph, amount, toFind) {
    if (paragraph.indexOf(toFind) == 0) {
        return paragraph.substring(1).split(toFind, amount).join(toFind).length + 1
    } else {
        return paragraph.split(toFind, amount).join(toFind).length
    }
}

FastReader.prototype.lastIndexOfRec = function(paragraph, amount, toFind) {
    var reversed = paragraph.split("").reverse().join("");
    return paragraph.length - this.indexOfRec(reversed, amount, toFind)
}


FastReader.prototype.stickyCarriageIndex = function(paragraph, beginning) {
    if (beginning) {
        return paragraph.search("\n\\S")
    } else {
        return this.stickyCarriageIndexRecursive(paragraph)
    }
}

FastReader.prototype.stickyCarriageIndexRecursive = function(paragraph) {
    function scirAcc(paragraph, acc) {
        if (acc == -1) {
            return -1
        } else if (paragraph.search("\n\\S") == -1 && acc != -1) {
            return acc
        } else {
            return scirAcc(paragraph.substring(paragraph.search("\n\\S") + 1), paragraph.search("\n\\S"))
        }
    }
    return scirAcc(paragraph, paragraph.search("\n\\S"))
}

var marks = ["\n",".’",".'", ".", " (", ") ", , "?", " '", "' "," ‘","’ ",";",", "]

FastReader.prototype.redistributing_up = function(from, to, amount) {

    //create new objects!!!! make it functional
    var text = this.take_text(from.text(), amount, true)
    this.update_to(to, text, marks)
        //create new objects!!!! make it functional
    this.update_from(from, marks, amount)

}







FastReader.prototype.update_to = function(to, text, marks, down) {
    var minIndex = this.find_mark(text, marks)
	if(minIndex == -1){
		
		}
    var beforeNextWord = this.find_before_next_word(text, minIndex)
    if (to.children().last().text().indexOf("\n") > -1) {
        to.append('<p id="' + to.children().length + '"></p>')
    }
    var child = to.children().last()

    if (to.children().length == 0) {

        to.append('<p id="0">' + this.substring_with_mark(text, beforeNextWord) + '</p>')
    } else {
        child.text(child.text() + this.substring_with_mark(text, beforeNextWord))
    }
    if (to.children().last().text().indexOf("\n") > -1) {
        to.append('<p id="' + to.children().length + '"></p>')
    }
}

// if(to.children().last().text().indexOf("\n")>-1){
//   -               to.append('<p></p>')
// 		}	


FastReader.prototype.update_from = function(from, marks, amount, down) {
    var child = from.children().first()
    var text = child.text()
    var foundMark = this.find_mark(text, marks)
    var beforeNextWord = this.find_before_next_word(text, foundMark)

    if (beforeNextWord < this.indexOfRec(text, amount, " ")) {
        child.text(text.substring(beforeNextWord + 1))
    } else {
        child.text(this.delete_text(text, amount, true))
    }
    if (child.text() == "") {
        child.remove()
    }
    this.clean_reader(from,"reader-container")
}


FastReader.prototype.clean_reader = function(from,readerName){
    if(from.attr("id") == readerName){
        from.children().remove()
    }


}





FastReader.prototype.find_mark = function(text, marks) {
    var minFoundAt = text.length + 1;
    for (i in marks) {
        var foundAt = text.indexOf(marks[i])
        if (foundAt != -1 && foundAt < minFoundAt) {
            if (!this.isAcronym(text, foundAt) && !this.isDigit(text, foundAt)) {
				if(this.isReference(text, foundAt)) {
					minFoundAt = this.find_after_next_word(text,foundAt) 
				}else{
                	minFoundAt = foundAt + 1
				}
            }
        }
    }
    if (minFoundAt < text.length + 1) {
        return minFoundAt
    }
}

FastReader.prototype.isAcronym = function(text, index) {
    if (text.charAt(index) == ".") {
        if (index == 1) return true
        if (text.charAt(index - 2) == " ") return true
    }
    return false
}

FastReader.prototype.isReference = function(text, index) {
    if (text.charAt(index) == ".") {
        if (text.charAt(index - 1).match(/[a-z]/i) && $.isNumeric(text.charAt(index + 1))) return true
        if (text.charAt(index - 1).match(/[a-z]/i) && text.charAt(index + 1) == "[") return true
        if (text.charAt(index - 1).match(/[a-z]/i) && text.charAt(index + 1) == "’") return true
        if (text.charAt(index - 1) == ")" && $.isNumeric(text.charAt(index + 1))) return true
        if (text.charAt(index - 1) == "’" && $.isNumeric(text.charAt(index + 1))) return true	
    }
	if(text.charAt(index) == "?"){
        if (text.charAt(index - 1).match(/[a-z]/i) && $.isNumeric(text.charAt(index + 1))) return true
	}
    return false
}

FastReader.prototype.isDigit = function(text, index) {
    if (text.charAt(index) == ".") {
        if ($.isNumeric(text.charAt(index + 1)) && $.isNumeric(text.charAt(index - 1))) return true
    }
    if (text.charAt(index) == ",") {
        if ($.isNumeric(text.charAt(index + 1)) && $.isNumeric(text.charAt(index - 1))) return true
    }
    return false
}

FastReader.prototype.substring_with_mark = function(text, markIndex, down) {
    if (markIndex > -1) {
        if (down) {
            return text.substring(markIndex + 1)
        } else {
            return text.substring(0, markIndex + 1)
        }
    } else {
        return text
    }
}