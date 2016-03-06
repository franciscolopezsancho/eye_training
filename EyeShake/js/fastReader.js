


function FastReader() {
}

//TODO find words with hyphen
FastReader.prototype.take_text = function(paragraph,amount,begining) {
	var numWords = amount
	var sci = this.stickyCarriageIndex(paragraph,begining)
	if(begining){
		if(sci >-1 && sci < this.indexOfRec(paragraph,numWords," ")){
			//change carriege for blank
			var replaced = paragraph.substr(0, sci) + " " + paragraph.substr(sci+" ".length);
			//go until next word
		return paragraph.substring(0,this.indexOfRec(replaced,numWords," "))}else{
			//numWords = amount - 1}
		
		return paragraph.substring(0,this.indexOfRec(paragraph,numWords," "))
	}
	}else{
		//if not begining then end is supossed
		if(sci >-1 && sci > this.lastIndexOfRec(paragraph,numWords," ")){numWords = amount - 1}
		return paragraph.substring(this.lastIndexOfRec(paragraph,numWords," "))	
	}
};


FastReader.prototype.find_before_next_word = function(text,from) {
	var nextAlphanum = text.substring(from).search("[A-Za-z0-9]")
	if(nextAlphanum == -1) return text.length
	var lastCarriage = text.substring(from,from+nextAlphanum).lastIndexOf("\n")
	var lastBlank = text.substring(from,from+nextAlphanum).lastIndexOf(" ")
	if(lastCarriage > lastBlank){
		return lastCarriage+from}else{
		return lastBlank+from}
	
}
//TODO shouln't I be passing first take_text then stickyCharacter then anything else??

FastReader.prototype.delete_text = function(paragraph,amount,begining) {
	var numWords = amount
	var sci = this.stickyCarriageIndex(paragraph)
	if(begining){
		if(sci >-1 && sci < this.indexOfRec(paragraph,numWords," ")){numWords = amount - 1}
		return paragraph.substring(this.indexOfRec(paragraph,numWords," "))
	}else{
		//if not begining then end is supossed
		if(sci >-1 && sci > this.lastIndexOfRec(paragraph,numWords," ")){numWords = amount - 1}
		return paragraph.substring(0,this.lastIndexOfRec(paragraph,numWords," "))	
	}
};

FastReader.prototype.move_text = function(from,to,amount,fromBeginingFrom,toBeginningTo){		
	if(toBeginningTo) return this.take_text(from,amount,fromBeginingFrom)+to
		else return to+this.take_text(from,amount,fromBeginingFrom)
			
    
}

FastReader.prototype.indexOfRec = function(paragraph,amount,toFind){
	if(paragraph.indexOf(toFind) == 0){
		return paragraph.substring(1).split(toFind, amount).join(toFind).length + 1
	}else{
		return paragraph.split(toFind, amount).join(toFind).length
	}
}

FastReader.prototype.lastIndexOfRec = function(paragraph,amount,toFind){
	var reversed = paragraph.split("").reverse().join("");
	return paragraph.length - this.indexOfRec(reversed,amount,toFind)
}


FastReader.prototype.stickyCarriageIndex = function(paragraph,beginning){
	if(beginning){ return paragraph.search("\n\\S") }
		else {return this.stickyCarriageIndexRecursive(paragraph)}
}

FastReader.prototype.stickyCarriageIndexRecursive = function(paragraph){
	function scirAcc(paragraph,acc){
		if(acc == -1){
			return -1
		}else if(paragraph.search("\n\\S") == -1 && acc != -1){
			return acc
		}else{
			return scirAcc(paragraph.substring(paragraph.search("\n\\S")+1),paragraph.search("\n\\S"))
		}
	}
	return scirAcc(paragraph,paragraph.search("\n\\S"))
}

var 	marks = ["\n","."," (",") ",",","?"," '","' ",";"]

FastReader.prototype.redistributing_up = function (from,to,amount	){	

	//create new objects!!!! make it functional
	var text = this.take_text(from.text(),amount,true)	
	this.update_to(to,text,marks)
	//create new objects!!!! make it functional
	this.update_from(from,marks,amount)	

}


FastReader.prototype.redistributing_down = function (from,to,amount){	
	//create new objects!!!! make it functional
	var text = this.take_text(from.text(),amount,false)	
	this.update_to(to,text,["\n"],true)
	//create new objects!!!! make it functional
	this.update_from(from,[],amount,true)
	
	

}



FastReader.prototype.up_to_reader  = function(upper,reader,amount){
	var taken = this.take_text(upper.children().last().text(),amount,false)
	var parag = reader.children().first()
	if(parag.length == 0){
		reader.append('<p></p>') 		
		parag = reader.children().first()
	}
	parag.text(taken+parag.text())	
		
	if(taken.split(" ").length < amount){
		upper.children().last().remove()
		var words = taken.trim().split(" ").length
		if(taken.indexOf("\n")>-1){
			words = words + 1
		}
		upper.children().last().text(this.delete_text(upper.children().last().text(),words,false))			
		this.up_to_reader(upper,reader,amount - words)
	}else if(taken.split(" ") == amount){
		upper.children().last().remove()		
		upper.children().last().text(this.delete_text(upper.children().last().text(),amount,false))	
		
	}else{
		upper.children().last().text(this.delete_text(upper.children().last().text(),amount,false))	
	}
	
}
FastReader.prototype.melt = function(node){
	var textContent = node.children().text()
	node.children().remove()
	node.append("<p>"+textContent+"</p>")
}

FastReader.prototype.update_to = function(to,text,marks,down){
	var minIndex = this.find_mark(text,marks)
	
	var beforeNextWord = this.find_before_next_word(text,minIndex)
		if(to.children().last().text().indexOf("\n")>-1){
                 to.append('<p id="'+to.children().length+'"></p>')
		}	
		var child = to.children().last()

	if(to.children().length == 0 ){
		
			to.append('<p id="0">'+this.substring_with_mark(text,beforeNextWord)+'</p>') 		
			
	}else{
		
		child.text(child.text()+this.substring_with_mark(text,beforeNextWord))
	    
		
	}

	
	 
	
    
    if(to.children().last().text().indexOf("\n")>-1){
                 to.append('<p id="'+to.children().length+'"></p>')
		}	
	}
	 
    // if(to.children().last().text().indexOf("\n")>-1){
 //   -               to.append('<p></p>')
 // 		}	


FastReader.prototype.update_from = function(from,marks,amount,down){
	var child = from.children().first()
	var text = child.text()
	
	

	var foundMark = this.find_mark(text,marks)
	var beforeNextWord = this.find_before_next_word(text,foundMark)
	
	if(beforeNextWord < this.indexOfRec(text,amount," ")){
		child.text(text.substring(beforeNextWord+1))			
	}else{
		child.text(this.delete_text(text,amount,true))	
	}
	if(child.text() == ""){
		child.remove()
	}
}


FastReader.prototype.pre_post_append = function(to,text,down){
	if(down){
		to.prepend('<p>'+text+'</p>')
	}else{
		to.append('<p>'+text+'</p>')		
	}
}



FastReader.prototype.find_mark = function(text,marks){
	var minFoundAt = text.length + 1;
	for(i in marks){
		var foundAt = text.indexOf(marks[i])
		if(foundAt != -1  && foundAt < minFoundAt){
			if(!this.isAcronym(text,foundAt) && !this.isDigit(text,foundAt)){
				minFoundAt = foundAt				
			}
		}
	}
	if(minFoundAt < text.length + 1){
		return minFoundAt
	}
}

FastReader.prototype.isAcronym = function(text,index){
	if(text.charAt(index) == "."){
		if(index == 1) return true
		if(text.charAt(index - 2) == " ") return true
	}
	return false
}

FastReader.prototype.isDigit = function(text,index){
	if(text.charAt(index) == "."){
		if($.isNumeric(text.charAt(index + 1)) && $.isNumeric(text.charAt(index -1))) return true
	}
	return false
}

FastReader.prototype.substring_with_mark = function(text,markIndex,down){
	if(markIndex > -1){
		if(down){
			return text.substring(markIndex+1)
			}
		else{return text.substring(0,markIndex+1)}
	}else{
		return text
	}
}


















