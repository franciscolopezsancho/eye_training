


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
	var toUpdated = this.move_text(from.children().first().text(),to.children().last().text(),amount,true,false)	
	if(to.children().length == 0 ){
		if(toUpdated.indexOf("\n")==-1){
			to.append('<p>'+toUpdated+'</p>')
		}else{
			to.append('<p>'+toUpdated.substring(0,toUpdated.indexOf("\n")+1)+'</p>')					
			var rest = toUpdated.substring(toUpdated.indexOf("\n")+1)
			if(rest){
				to.append('<p>'+rest+'</p>')
			}
		}
	}else if(toUpdated.indexOf("\n")==-1){		
		to.children().last().text(toUpdated)
	}else{
		//contains carriage
		to.children().last().text(toUpdated.substring(0,toUpdated.indexOf("\n")+1))		
		var rest = toUpdated.substring(toUpdated.indexOf("\n")+1)
		if(rest){
			to.append('<p>'+rest+'</p>')
		}
	}
	//create new objects!!!! make it functional
	
	from.children().first().text(this.delete_text(from.children().first().text(),amount,true))	
	if(from.children().first().text() == ""){
		from.children().first().remove()
	}
	
}

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














