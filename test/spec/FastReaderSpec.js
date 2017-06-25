describe("FastReader", function() {
  

  beforeEach(function() {
     reader = new FastReader();
  });

  it("1 should be able to take 3 words from the begining of 'should be able to play a Song'", function() {
    expect("should be able").toEqual(reader.take_text("should be able to play a Song",3,true));
  });
  
  it("1.1 should be able to take 3 words from the begining of ' to play a Song' even with blank in the begining", function() {
    expect(" to play a").toEqual(reader.take_text(" to play a Song",3,true));
  });
  
  
  it("1.1.1 should be able to take 3 words from the begining of ' to play a Song' even with blank in the begining", function() {
    expect("way I can.’\n").toEqual(reader.take_text("way I can.’\n\nThe man leaned aga",3,true));
  });
  


  it("1.2 should be able to take words from the begining of ' to play a Song' even with blank in the the middle", function() {
    expect(" to play a Song \n some else").toEqual(reader.take_text(" to play a Song \n some else",7,true));
  });


  it("1.3 should be able to take words from the begining of ' to play a Song' even with blank at the end", function() {
    expect(" to play a Song \n").toEqual(reader.take_text(" to play a Song \n",5,true));
  });
 
it("1.4 should be able to find is a string contains a carriage followed by some letter....or anything but a blank", function() {
    expect(reader.stickyCarriageIndex(" to play a Song \ntruki",5,true)).not.toBeLessThan(0);
  });

it("1.5 should be able to take 5 counting carriage as such even with a dodgy one", function() {
    expect("play a Song \ntruki").toEqual(reader.take_text(" to play a Song \ntruki",5,false));
  });

it("1.5.1 should be able to take words from the begining of even with dodgy blank in the the middle but when ask for words before that blank", function() {
    expect(" to play a Song era").toEqual(reader.take_text(" to play a Song era del atun \ntruki",5,true));
  });

it("1.5.2 should be able to take words from the end of even with dodgy blank in the the middle but when ask for words before that blank", function() {
    expect("era del atun \ntruki").toEqual(reader.take_text(" to play a Song era del atun \ntruki",5,false));
  });

it("1.5.3 should be able to take words from the end of even with dodgy blank in the the middle but when ask for words before that blank", function() {
    expect("o producto realizado \nA lo largo del ").toEqual(reader.take_text("La historia del arte es \nEntendido como cualquier actividad o producto realizado \nA lo largo del ",8,false));
  });
  
  it("1.5.4 should find that one dot among alphanumerics is not a mark, is a reference and take all text", function() {
    		expect("as a social good.33").toEqual(reader.take_text("as a social good.33 Historians ",4,true))


    });
	
    it("1.5.4.1 should find that one dot among alphanumerics is not a mark, is a reference and take all text", function() {
      		expect("as a social good.33 Historians").toEqual(reader.take_text("as a social good.33 Historians ",5,true))


      });
  
  	
			

 
  it("1.6 should find, after the index, the position before the next word, avoiding wierd marks",function(){
  var phrase = "Era del atun!.!!!. Carajo!";
  	expect(phrase.indexOf("C")-1).toEqual(reader.find_before_next_word("Era del atun!.!!!. Carajo!",13))
  });
  
  it("1.6.1 should find, after the index, the position before the next word, avoiding dots",function(){
  var phrase = "Era del atun!.!!!. Carajo!";
  	expect(phrase.indexOf("C")-1).toEqual(reader.find_before_next_word("Era del atun!. . . Carajo!",13))
  });
  
  it("1.6.1 should find, after the index, the position before the next word, going to the end if no more words",function(){
  var phrase = " or Salamanca men.17";
  	expect(phrase.length).toEqual(reader.find_before_next_word(" or Salamanca men.17",18))
  });
  
  
  
  it("1.6.2 should find after next word when ",function(){
  var phrase = "From an institutional point of view,-the enlightment";
  	expect(phrase.indexOf(",")+5).toEqual(reader.find_after_next_word("From an institutional point of view,-the enlightment",34))
  });
  
  it("1.6.3 should find end of phrase when after next word is a reference ",function(){
  var phrase = " or Salamanca men.17"
  	expect(phrase.length).toEqual(reader.find_after_next_word(" or Salamanca men.17",17))
  });
  

  	


  " for.’\n\nBourne gripped the wom"


  it("2 should be able to move 3 first words from 'should be able to play a Song' to 'almos nothing',adding it before and keep the rest", function() {

    expect("should be able almos nothing").toEqual(reader.move_text("should be able to play a Song"," almos nothing",3,true,true));
  });
  
  it("3 should be able to move 'play a Song' words from 'should be able to play a Song' to 'almos nothing',blank included", function() {
    expect("almos nothingplay a Song").toEqual(reader.move_text("should be able to play a Song","almos nothing",3,false,false));
  });
  
  it("4 should be able to take 3 words from the end of 'should be able to play a Song'", function() {
    expect("play a Song").toEqual(reader.take_text("should be able to play a Song",3,false));
  });
  
  it("5 should be able to find index of 3rd blank from the end of 'should be able to play a Song',blank included", function() {
    expect(18).toEqual(reader.lastIndexOfRec("should be able to play a Song",3," "));
  });
  
  // it("should be able to redistribute", function() {
 // var html = $('<div class="book"></div>')
 // 	  				html.append('<div id="upper-container" class="upper">')
 // 					html.append(' <span id="text-bucket-init" class="text-upper">The story of human kind</span>')
 // 					html.append('</div>')
 // 					html.append('<div id="text-bucket-styled" class="reader">Im looking at</div>')
 // 					html.append('<div id="text-bucket-end" class="downer"></div>')
 // 	  				html.append('</div>')
 // 	  var from = $("#text-bucket-styled",html);
 // 	  var to = $("#text-bucket-init",html);
 // 	  reader.goingUp(from,to,3)
 //    expect("The story of human kind Im looking at").toEqual(to.text());
 //  });
 it("6 should be able to redistribute 3 words up with nothing in upper container and 'Im looking at' in center", function() {
var html = $('<div class="book">')		
  				html.append('<div id="upper-container" class="upper"></div>')		
					html.append('<div id="text-bucket-styled" class="reader"><p>Im looking at</p></div>')	
					html.append('<div id="text-bucket-end" class="downer"></div>')	
	  				html.append('</div>')
  var readerr = $("#text-bucket-styled",html);
  var upper = $("#upper-container",html);
  reader.redistributing_up(readerr,upper,3)
   expect("Im looking at").toEqual(upper.text());
 });
  it("7 should be able to redistribute with some <p> in upper container without adding one blank", function() {
 var html = $('<div class="book">')		
	  				html.append('<div id="upper-container" class="upper"><p>Something </p></div>')		
 					html.append('<div id="text-bucket-styled" class="reader"><p>Im looking at</p></div>')	
 					html.append('<div id="text-bucket-end" class="downer"></div>')	
 	  				html.append('</div>')
	  var from = $("#text-bucket-styled",html);
	  var to = $("#upper-container",html);
	  reader.redistributing_up(from,to,3)
    expect("Something Im looking at").toEqual(to.children().last().text());
  });
  it("8 should be able to redistribute to upper with 'Something' and center 'Im looking at' and clean center", function() {
 var html = $('<div class="book">')		
	  				html.append('<div id="upper-container" class="upper"><p>Something </p></div>')		
 					html.append('<div id="text-bucket-styled" class="reader"><p>Im looking at</p></div>')	
 					html.append('<div id="text-bucket-end" class="downer"></div>')	
 	  				html.append('</div>')
	  var from = $("#text-bucket-styled",html);
	  var to = $("#upper-container",html);
	  reader.redistributing_up(from,to,3)
    expect("Something Im looking at").toEqual(to.children().last().text());
    expect("").toEqual(from.text());
	
  });
  
  it("9 should be able to redistribute from bottom with 'Something dude was almost walking...' to reader with 'Im looking at'", function() {
 var html = $(		'<div class="book">'+
 						'<div id="upper-container" class="upper"><p>Something</p></div>'+
						'<div id="text-bucket-styled" class="reader"><p>Im looking at </p></div>'+
						'<div id="text-bucket-end" class="downer"><p>Something dude was almost walking...</p></div>'+
					'</div>')
	  var bottom = $("#text-bucket-end",html);
	  var focus = $("#text-bucket-styled",html);
	  reader.redistributing_up(bottom,focus,3)
    expect("Im looking at Something dude was").toEqual(focus.text());
    expect(" almost walking...").toEqual(bottom.text());
	
  });
  it("10 should be able to redistribute from bottom to reader and erase bottom paragraph if empty", function() {
 var html = $('<div class="book">')		
	  				html.append('<div id="upper-container" class="upper"><p>Something</p></div>')		
 					html.append('<div id="text-bucket-styled" class="reader"><p>Im looking at </p></div>')	
 					html.append('<div id="text-bucket-end" class="downer"><p>Something dude was</p></div>')	
 	  				html.append('</div>')
	  var from = $("#text-bucket-end",html);
	  var to = $("#text-bucket-styled",html);
	  reader.redistributing_up(from,to,3)
    expect("Im looking at Something dude was").toEqual(to.text());
    expect(0).toEqual(from.children().length);
	
  });
  
  // it("11 should be able to redistribute from reader to bottom to bottom erase bottom paragraph if empty", function() {
 // var html = $('<div class="book">')
 // 	  				html.append('<div id="upper-container" class="upper"><p>Something</p></div>')
 // 					html.append('<div id="text-bucket-styled" class="reader"><p>Im looking at </p></div>')
 // 					html.append('<div id="text-bucket-end" class="downer"><p>Something dude was </p></div>')
 // 	  				html.append('</div>')
 // 	  var focus = $("#text-bucket-styled",html);
 // 	  var bottom = $("#text-bucket-end",html);
 // 	  reader.redistributing_down(focus,bottom,3)
 //    expect("Im looking at Something dude was ").toEqual(bottom.text());
 //    expect(0).toEqual(focus.children().length);
 //
 //  });

  // it("12 should be able to redistribute from reader to upper creating new paragraph because carriage", function() {
 // var html = $('<div class="book">'+
 // 	'<div id="upper-container" class="upper"><p>Something </p></div>'+
 // 	'<div id="text-bucket-styled" class="reader"><p>Im looking \n</p></div>'+
 // 	'<div id="text-bucket-end" class="downer"><p>Something dude was </p></div>'+
 // 	'</div>')
 // 	  var focus = $("#text-bucket-styled",html);
 // 	  var upper = $("#upper-container",html);
 // 	  reader.redistributing_up(focus,upper,3)
 //    expect("Something Im looking \n").toEqual(upper.children().first().text());
 //    expect("").toEqual(upper.children().last().text());
 //  });
  
  it("13 should be able to redistribute from bottom to reader keeping deleting text from bottom propertly", function() {
 var html = $('<div class="book">')		
	  				html.append('<div id="upper-container" class="upper"><p>Something</p></div>')		
 					html.append('<div id="text-bucket-styled" class="reader"><p>Im looking \n</p></div>')	
 					html.append('<div id="text-bucket-end" class="downer"><p>Something dude was some \n</p>'
					+'<p>trouble when all of the sudden \n</p>'+
					+'</div>')	
 	  				html.append('</div>')
	  var from = $("#text-bucket-end",html);
	  var to = $("#text-bucket-styled",html);
	  reader.redistributing_up(from,to,3)
	  reader.redistributing_up(from,to,3)
	  reader.redistributing_up(from,to,3)	  
    expect(" of the sudden \n").toEqual(from.children().first().text());
  });
  
  // it("13 should be able to redistribute from bottom to reader and the upper creating paragraphs in upper when needed", function() {
//  var html = $('<div class="book">')
// 	  				html.append('<div id="upper-container" class="upper"><p>Something</p></div>')
//  					html.append('<div id="text-bucket-styled" class="reader"><p>Im looking \n</p></div>')
//  					html.append('<div id="text-bucket-end" class="downer"><p>Something dude was some \n</p>'
// 					+'<p>trouble when all of the sudden \n</p>'+
// 					+'</div>')
//  	  				html.append('</div>')
// 	  var bottom = $("#text-bucket-end",html);
// 	  var readerr = $("#text-bucket-styled",html);
// 	  var upper = $("#upper-container",html);
//
// 	  reader.redistributing_up(readerr,upper,3)
// 	  reader.redistributing_up(bottom,readerr,3)
//       expect("Something Im looking \n").toEqual(upper.children().first().text());
//       expect("Something dude was").toEqual(readerr.children().first().text());
//       expect(" some \n").toEqual(bottom.children().first().text());
//
//
// 	  reader.redistributing_up(readerr,upper,3)
// 	  reader.redistributing_up(bottom,readerr,3)
//
//     expect("Something Im looking \n").toEqual(upper.children().first().text());
//   	expect("Something dude was").toEqual(upper.children().last().text());
//
//   });
// it("13.1 should be able to update_to some empty node  when down", function() {
//
//   var node = $('<div id="text-bucket-end"></div>')
//
//   reader.update_to(node,"actividad o producto realizado \nA lo largo del",["\n"],true)
//   expect("A lo largo del").toEqual(node.children().last().text());
//   expect("actividad o producto realizado \n").toEqual(node.children().first().text());
//
//
//
//   });
//
  // it("13.2 should be able to update_to some empty node  when down", function() {
 //
 //    var node = $('<div id="text-bucket-end"></div>')
 //
 //    reader.update_to(node,"La historia del",["\n"],true)
 //    expect("La historia del").toEqual(node.children().first().text());
 //    expect(1).toEqual(node.children().length);
 //
 //
 //
 //    });
 //
 //    it("13.3 should be able to update_to some empty node  when down just passing after carriage", function() {
 //
 //      var node = $('<div id="text-bucket-end"><p>tiempo el arte se ha clasificado</div>')
 //
 //      reader.update_to(node,"actividad o producto realizado \n a lo largo del ",["\n"],true)
 //      expect("actividad o producto realizado \n").toEqual(node.children().first().text());
 //      expect(" a lo largo del tiempo el arte se ha clasificado").toEqual(node.children().last().text());
 //
 //      expect(2).toEqual(node.children().length);
 //
 //
 //
 //      });

  
  it("14 should be able to redistribute multiple times", function() {
 	   var html = $('<div class="book"><div id="upper-container" class="upper">'+
	   '</div><div id="text-bucket-styled" class="reader"></div>'+
	   '<div id="text-bucket-end" class="downer">'+
	   '<p>La historia del arte es una. \n</p>'+
	   '<p>Entendido como cualquier actividad o producto realizado . \n</p>'+
	   '<p>A lo largo del tiempo el arte se ha clasificado de . \n</p></div>')	
	  var bottom = $("#text-bucket-end",html);
	  var readerr = $("#text-bucket-styled",html);
	  var upper = $("#upper-container",html);	  
	  
	  reader.redistributing_up(bottom,readerr,3)
	  
      expect("La historia del").toEqual(readerr.children().first().text());
      expect(" arte es una. \n").toEqual(bottom.children().first().text());
      expect(3).toEqual(bottom.children().length);
	  
	  
	  reader.redistributing_up(readerr,upper,3)
	  
      expect("La historia del").toEqual(upper.children().first().text());	
      expect(0).toEqual(readerr.children().length);
      expect(" arte es una. \n").toEqual(bottom.children().first().text());
	  
	  
	  //next blink
	  reader.redistributing_up(bottom,readerr,3)
      expect(" arte es una.").toEqual(readerr.children().first().text());
      expect(" \n").toEqual(bottom.children().first().text());
      expect(3).toEqual(bottom.children().length);
	  
	  
	  reader.redistributing_up(readerr,upper,3)
      expect("La historia del arte es una.").toEqual(upper.children().first().text());
      expect(0).toEqual(readerr.children().length);
	 
	  //next blink	  
	  reader.redistributing_up(bottom,readerr,3)
	  //if find \n will just take that word and stop moving more text	  
      expect(" \n").toEqual(readerr.text());
      expect("Entendido como cualquier actividad o producto realizado . \n").toEqual(bottom.children().first().text());
      expect(2).toEqual(bottom.children().length);
	  //next blink	  
	  reader.redistributing_up(readerr,upper,3)
      expect("La historia del arte es una. \n").toEqual(upper.children().first().text());
      expect("").toEqual(upper.children().last().text());
      expect(1).toEqual(readerr.children().length);
	  
	  //next blink	  
	  reader.redistributing_up(bottom,readerr,3)
      expect("Entendido como cualquier").toEqual(readerr.text());
      expect(" actividad o producto realizado . \n").toEqual(bottom.children().first().text());
      expect(2).toEqual(bottom.children().length);
	  
	  //next blink	  
	  reader.redistributing_up(readerr,upper,3)
      expect("Entendido como cualquier").toEqual(upper.children().last().text());
      expect(0).toEqual(readerr.children().length);
     
	  
	  
	  // reader.redistributing_up(readerr,upper,3)
// 	  reader.redistributing_up(bottom,readerr,3)
//
//     expect("Something Im looking \n").toEqual(upper.children().first().text());
//   	expect("Something dude was").toEqual(upper.children().last().text());
	
  });
  
  it("15 should be able to redistribute with period in between so doesn't ", function() {
 	   var html = $('<div class="book"><div id="upper-container" class="upper"></div>'+
	   '<div id="text-bucket-styled" class="reader"></div>'+
	   '<div id="text-bucket-end" class="downer">'+
	   '<p>La historia fue asi. Cuando se quiso dar cuenta se acabo \n</p></div>'
	   +'</div>')	
	  var bottom = $("#text-bucket-end",html);
	  var readerr = $("#text-bucket-styled",html);
	  var upper = $("#upper-container",html);	  
	  
	  reader.redistributing_up(bottom,readerr,3)	  
      expect("La historia fue").toEqual(readerr.children().first().text());
      expect(" asi. Cuando se quiso dar cuenta se acabo \n").toEqual(bottom.children().first().text());
      
	   reader.redistributing_up(readerr,upper,3)
	   expect("La historia fue").toEqual(upper.children().first().text());
	   expect("").toEqual(readerr.text());
	   
 	  reader.redistributing_up(bottom,readerr,3)	  
       expect(" asi. ").toEqual(readerr.children().first().text());
       expect("Cuando se quiso dar cuenta se acabo \n").toEqual(bottom.children().first().text());
     
	  
	  
	  // reader.redistributing_up(readerr,upper,3)
// 	  reader.redistributing_up(bottom,readerr,3)
//
//     expect("Something Im looking \n").toEqual(upper.children().first().text());
//   	expect("Something dude was").toEqual(upper.children().last().text());
	
  });
  
  it("15.1 should be able to redistribute with comma in between so doesn't ", function() {
 	   var html = $('<div class="book"><div id="upper-container" class="upper"></div>'+
	   '<div id="text-bucket-styled" class="reader"></div>'+
	   '<div id="text-bucket-end" class="downer">'+
	   '<p>La historia fue asi, Cuando se quiso dar cuenta se acabo \n</p></div>'
	   +'</div>')	
	  var bottom = $("#text-bucket-end",html);
	  var readerr = $("#text-bucket-styled",html);
	  var upper = $("#upper-container",html);	  
	  
	  reader.redistributing_up(bottom,readerr,3)	  
      expect("La historia fue").toEqual(readerr.children().first().text());
      expect(" asi, Cuando se quiso dar cuenta se acabo \n").toEqual(bottom.children().first().text());
      
	   reader.redistributing_up(readerr,upper,3)
	   expect("La historia fue").toEqual(upper.children().first().text());
	   expect("").toEqual(readerr.text());
	   
 	  reader.redistributing_up(bottom,readerr,3)	  
       expect(" asi, ").toEqual(readerr.children().first().text());
       expect("Cuando se quiso dar cuenta se acabo \n").toEqual(bottom.children().first().text());
	
  });

 it("15.2 should be able to redistribute with parenthesis in between so doesn't ", function() {
 	   var html = $('<div class="book"><div id="upper-container" class="upper"></div>'+
	   '<div id="text-bucket-styled" class="reader"></div>'+
	   '<div id="text-bucket-end" class="downer">'+
	   '<p>La historia fue asi (Cuando se quiso dar cuenta) se acabo \n</p></div>'
	   +'</div>')	
	  var bottom = $("#text-bucket-end",html);
	  var readerr = $("#text-bucket-styled",html);
	  var upper = $("#upper-container",html);	  
	  
	  reader.redistributing_up(bottom,readerr,3)	  
      expect("La historia fue").toEqual(readerr.children().first().text());
      expect(" asi (Cuando se quiso dar cuenta) se acabo \n").toEqual(bottom.children().first().text());
      
	   reader.redistributing_up(readerr,upper,3)
	   expect("La historia fue").toEqual(upper.children().first().text());
	   expect("").toEqual(readerr.text());
	   
 	  reader.redistributing_up(bottom,readerr,3)	  
       expect(" asi ").toEqual(readerr.children().first().text());
       expect("(Cuando se quiso dar cuenta) se acabo \n").toEqual(bottom.children().first().text());
	
  });

  it("16 should find first index of a mark (like period,carriage,parenthesis,comma)", function() {
  		expect(13).toEqual(reader.find_mark("era del atun. \n",["\n","."]))
  
  
  });

it("16.1 should find first index of a mark (like period,carriage,parenthesis,comma)", function() {
  		expect(13).toEqual(reader.find_mark("era del atun. \n",["\n","."]))
  
  
  });
  
  it("16.1.1 should   find mark but realize is a period", function() {
    		var text = " or Salamanca men.17"
   		expect(text.length).toEqual(reader.find_mark(text,["\n","."])) 
  
    });

  it("16.2 should find that one letter and one dot is not a stop mark", function() {
    		expect(true).toEqual(reader.isAcronym("d a. C.)",3))
  
  
    });
	
    it("16.3 should find that one letter and one dot is not a stop mark", function() {
      		expect(true).toEqual(reader.isAcronym("d a. C.)",6))
  
  
      });

  it("16.4 should find that one letter and one dot is not a stop mark", function() {
    		expect("(3000-1000 a. C.)").toEqual(reader.substring_with_mark("(3000-1000 a. C.)",reader.find_mark("(3000-1000 a. C.)",["\n","."])))
  
  
    });
	
	
	
	" or Salamanca men.17"
	
    it("16.5 should find that one dot among alphanumerics is not a mark, is a reference", function() {
      		expect(true).toEqual(reader.isReference("as a social good.3 Historians ",16))
  
  
      });
	  
      it("16.5.1 should find that one dot among alphanumerics is not a mark, is a reference", function() {
        		expect(true).toEqual(reader.isReference("as a social good.33 Historians ",16))
  
  
        });
	  
      it("16.6 should find that one dot among alphanumerics and bracket is not a mark, is a reference", function() {
        		expect(true).toEqual(reader.isReference("as a social good.[3] Historians ",16))
  
  
        });
		
        it("16.7 should find that one dot among alphanumerics and wierd signs is not a mark, is a reference", function() {
          		expect(true).toEqual(reader.isReference("as a social good.’3 Historians ",16))
  
  
          });
		  
          it("16.8 should find that one dot among alphanumerics and wierd signs is not a mark, is a reference", function() {
            		expect(true).toEqual(reader.isReference("as a social (210).3 Historians ",17))
  
  
            });
			
            it("16.9 should find that one dot among alphanumerics and wierd signs is not a mark, is a reference", function() {
              		expect(true).toEqual(reader.isReference("‘invented’ or ‘constructed’.4 But at ",27))
  
  
              });
			  
 
it("17 should leave the same when don't find any mark (like period,carriage,parenthesis,comma)", function() {
  		var text = "era del aturn"
 		expect(text).toEqual(text.substring(0,reader.find_mark(text,["\n","."]))) 
  
  });
  

  
  
  

  it("18 should be able to redistribute from bottom to reader keeping deleting text from bottom propertly", function() {
 var html = $('<div class="book">')		
	  				html.append('<div id="upper-container" class="upper"><p>Something</p></div>')		
 					html.append('<div id="text-bucket-styled" class="reader"><p>Im looking \n</p></div>')	
 					html.append('<div id="text-bucket-end" class="downer"><p>Was some \n</p>'
					+'<p>trouble when all of the sudden \n</p>'+
					+'</div>')	
 	  				html.append('</div>')
	  var from = $("#text-bucket-end",html);
	  var to = $("#text-bucket-styled",html);
	  reader.update_from(from,["\n","."],3)	  
    expect("trouble when all of the sudden \n").toEqual(from.children().first().text());
  });
  
  
  // it("19 should be able to redistribute up and down multiple times", function() {
//  	   var html = $('<div class="book"><div id="upper-container" class="upper">'+
// 	   '</div><div id="text-bucket-styled" class="reader"></div>'+
// 	   '<div id="text-bucket-end" class="downer">'+
// 	   '<p>La historia del arte es una. \n</p>'+
// 	   '<p>Entendido como cualquier actividad o producto realizado . \n</p>'+
// 	   '<p>A lo largo del tiempo el arte se ha clasificado de . \n</p></div>')
// 	  var bottom = $("#text-bucket-end",html);
// 	  var readerr = $("#text-bucket-styled",html);
// 	  var upper = $("#upper-container",html);
//
// 	  reader.redistributing_up(bottom,readerr,3)
//
//       expect("La historia del").toEqual(readerr.children().first().text());
//       expect(" arte es una. \n").toEqual(bottom.children().first().text());
//       expect(3).toEqual(bottom.children().length);
//
//
// 	  reader.redistributing_up(readerr,upper,3)
//
//       expect("La historia del").toEqual(upper.children().first().text());
//       expect(0).toEqual(readerr.children().length);
//       expect(" arte es una. \n").toEqual(bottom.children().first().text());
//
//
// 	  //next blink
// 	  reader.redistributing_down(upper,readerr,3)
//       expect("La historia del").toEqual(readerr.children().first().text());
//       expect(0).toEqual(upper.children().length);
//
// 	  reader.redistributing_down(readerr,bottom,3)
//       expect("La historia del arte es una. \n").toEqual(bottom.children().first().text());
//       expect(0).toEqual(readerr.children().length);
//
//
//
//
//
//   });
//
//   it("20 should be able to redistribute down multiple times", function() {
//  	   var html = $('<div class="book"><div id="upper-container" class="upper">'+
// 	   	   '<p>La historia del arte es \n</p>'+
// 	   	   '<p>Entendido como cualquier actividad o producto realizado \n</p>'+
// 	   	   '<p>A lo largo del tiempo el arte se ha clasificado de \n</p>'+
// 	   '</div><div id="text-bucket-styled" class="reader"></div>'+
// 	   '<div id="text-bucket-end" class="downer"></div>')
// 	  var bottom = $("#text-bucket-end",html);
// 	  var readerr = $("#text-bucket-styled",html);
// 	  var upper = $("#upper-container",html);
//
// 	  reader.redistributing_down(upper,readerr,8)
//
//       expect("tiempo el arte se ha clasificado de \n").toEqual(readerr.children().first().text());
//       expect("A lo largo del ").toEqual(upper.children().last().text());
//       expect(3).toEqual(upper.children().length);
//       expect(1).toEqual(readerr.children().length);
//
//
// 	  reader.redistributing_down(readerr,bottom,8)
//       expect("tiempo el arte se ha clasificado de \n").toEqual(bottom.children().first().text());
//       expect(1).toEqual(bottom.children().length);
//       expect("").toEqual(readerr.children().text());
//       expect(0).toEqual(readerr.children().length);
//
//
// 	  reader.redistributing_down(upper,readerr,8)
//       expect("o producto realizado \n").toEqual(readerr.children().first().text());
//       expect("A lo largo del ").toEqual(readerr.children().last().text());
//       expect("Entendido como cualquier actividad ").toEqual(upper.children().last().text())
//       expect(2).toEqual(upper.children().length);
//       expect(2).toEqual(readerr.children().length);
//
//
//
// 	  reader.redistributing_down(readerr,bottom,8)
//       expect("o producto realizado \n").toEqual(bottom.children().first().text());
//       expect("A lo largo del tiempo el arte se ha clasificado de \n").toEqual(bottom.children().last().text());
//       expect("").toEqual(readerr.children().text());
//       expect(2).toEqual(bottom.children().length);
//
// 	  reader.redistributing_down(upper,readerr,8)
// 	  expect("del arte es \n").toEqual(readerr.children().first().text());
//       expect("Entendido como cualquier actividad ").toEqual(readerr.children().eq(1).text());
//       expect(1).toEqual(upper.children().length);
//
//
//
// 	  reader.redistributing_down(readerr,bottom,8)
//       expect("del arte es \n").toEqual(bottom.children().first().text());
//       expect("Entendido como cualquier actividad o producto realizado \n").toEqual(bottom.children().eq(1).text());
//       expect(0).toEqual(readerr.children().length);
//       expect(3).toEqual(bottom.children().length);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//   });
//
  // it("21 should be able to redistribute down multiple times", function() {
//  	   var html = $('<div class="book"><div id="upper-container" class="upper">'+
// 	   	   '<p>La historia del arte es \n</p>'+
// 	   	   '<p>Entendido como cualquier actividad o producto realizado \n</p>'+
// 	   	   '<p>A lo largo del tiempo el arte se ha clasificado de \n</p>'+
// 	   '</div><div id="text-bucket-styled" class="reader"></div>'+
// 	   '<div id="text-bucket-end" class="downer"></div>')
// 	  var bottom = $("#text-bucket-end",html);
// 	  var readerr = $("#text-bucket-styled",html);
// 	  var upper = $("#upper-container",html);
//
// 	  reader.redistributing_down(upper,readerr,3)
//
//       expect("clasificado de \n").toEqual(readerr.children().first().text());
//       expect("A lo largo del tiempo el arte se ha ").toEqual(upper.children().last().text());
//       expect(3).toEqual(upper.children().length);
//
//
// 	  reader.redistributing_down(readerr,bottom,3)
//       expect("clasificado de \n").toEqual(bottom.children().first().text());
//       expect(0).toEqual(readerr.children().length);
//
// 	  reader.redistributing_down(upper,readerr,3)
//       expect("arte se dha").toEqual(readerr.children().first().text());
//       expect("A lo largo del tiempo el ").toEqual(upper.children().last().text());
//       expect(3).toEqual(upper.children().length);
	  
	  // reader.redistributing_down(readerr,bottom,3)
//       expect("clasificado de \n").toEqual(bottom.children().first().text());
//       expect(0).toEqual(readerr.children().length);
//
// 	  reader.redistributing_down(upper,readerr,8)
//       expect("Entendido como cualquier actividad o producto realizado \n").toEqual(readerr.children().first().text());
//       expect(1).toEqual(upper.children().length);
//
// 	  reader.redistributing_down(readerr,bottom,8)
//       expect("Entendido como cualquier actividad o producto realizado \n").toEqual(bottom.children().first().text());
//       expect(0).toEqual(readerr.children().length);
//       expect(2).toEqual(bottom.children().length);
	  
	  
	  
	  
	  
	  
     
	  
	  
      
	  
	  
	
	
  // });
  
  
  
  
});
