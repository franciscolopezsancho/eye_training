


function FastReader() {
}


FastReader.prototype.take_text = function(paragraph,amount,begining) {
	if(begining){
		return paragraph.substring(0,this.indexOfRec(paragraph,amount," "))
	}else{
		//if not begining then end is supossed
		return paragraph.substring(this.lastIndexOfRec(paragraph,amount," "))	
	}
};

FastReader.prototype.delete_text = function(paragraph,amount,begining) {
	if(begining){
		return paragraph.substring(this.indexOfRec(paragraph,amount," "))
	}else{
		//if not begining then end is supossed
		return paragraph.substring(0,this.lastIndexOfRec(paragraph,amount," "))	
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
FastReader.prototype.redistributing_up = function (from,to,amount){	
	//create new objects!!!! make it functional
	var text = this.take_text(from.text(),amount,true)	
	// if(to.children().length == 0 ){
	// 	if(toUpdated.indexOf("\n")==-1){
	// 		to.append('<p>'+toUpdated+'</p>')
	// 	}else if(toUpdated.indexOf("\n")>-1){
	// 		to.append('<p>'+toUpdated.substring(0,toUpdated.indexOf("\n")+1)+'</p>')					
	// 		var rest = toUpdated.substring(toUpdated.indexOf("\n")+1)
	// 		if(rest){
	// 			to.append('<p>'+rest+'</p>')
	// 		}
	// 	}else if(toUpdated.indexOf(".")>-1){
	// 		to.append('<p>'+toUpdated.substring(0,toUpdated.indexOf(".")+1)+'</p>')					
			
	// 	}
	// }else if(toUpdated.indexOf("\n")==-1){		
	// 	to.children().last().text(toUpdated)
	// }else{
	// 	//contains carriage
	// 	to.children().last().text(toUpdated.substring(0,toUpdated.indexOf("\n")+1))		
	// 	var rest = toUpdated.substring(toUpdated.indexOf("\n")+1)
	// 	if(rest){
	// 		to.append('<p>'+rest+'</p>')
	// 	}
	// }
	this.update_to(to,text,["\n","."," (",") ",","])
	//create new objects!!!! make it functional
	this.update_from(from,["\n","."," (",") ",","],amount)
	
	

}
FastReader.prototype.update_to = function(to,text,marks){
	var minIndex = this.find_mark(text,marks)
	if(to.children().length == 0 ){
		to.append('<p>'+this.substring_with_mark(text,minIndex)+'</p>')		
	}else{
		to.children().last().text(to.children().last().text()+this.substring_with_mark(text,minIndex))				
	}
	if(to.children().last().text().indexOf("\n")>-1){
		to.append('<p></p>')
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

FastReader.prototype.substring_with_mark = function(text,markIndex){
	if(markIndex > -1){
		return text.substring(0,markIndex+1)
	}else{
		return text
	}
}


FastReader.prototype.update_from = function(from,marks,amount){
	var text = from.children().first().text()
	var foundMark = this.find_mark(text,marks)
	if(foundMark < this.indexOfRec(text,amount," ")){
		from.children().first().text(text.substring(foundMark+1))			
	}else{
		from.children().first().text(this.delete_text(text,amount,true))	
	}
	if(from.children().first().text() == ""){
		from.children().first().remove()
	}
}

// FastReader.prototype.deal_with_marks_to(to,text){
//
// }

FastReader.prototype.redistributing_down = function (from,to,amount){	
	//create new objects!!!! make it functional	
	var toUpdated = this.move_text(from.children().last().text(),to.children().first().text(),amount,false,true)	
	if(to.children().length == 0 ){
		if(toUpdated.indexOf("\n")==-1){
			to.prepend('<p>'+toUpdated+'</p>')
		}else{
			to.prepend('<p>'+toUpdated.substring(0,toUpdated.indexOf("\n")+1)+'</p>')					
			var rest = toUpdated.substring(toUpdated.indexOf("\n")+2)
			if(rest){
				to.prepend('<p>'+rest+'</p>')
			}
		}
	}else if(toUpdated.indexOf("\n")==-1){		
		to.children().first().text(toUpdated)
	}else{
		//contains carriage
		to.children().first().text(toUpdated.substring(0,toUpdated.indexOf("\n")+1))		
		var rest = toUpdated.substring(toUpdated.indexOf("\n")+2)
		if(rest){
			to.prepend('<p>'+rest+'</p>')
		}
	}
	//create new objects!!!! make it functional
	from.children().last().text(this.delete_text(from.children().last().text(),amount,false))		
	if(from.children().last().text() == ""){
		from.children().last().remove()
	}
}

//make blink reader on punto
//make blink upper on punto y aparte














