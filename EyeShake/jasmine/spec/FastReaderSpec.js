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
  
  it("11 should be able to redistribute from reader to bottom to bottom erase bottom paragraph if empty", function() {
 var html = $('<div class="book">')		
	  				html.append('<div id="upper-container" class="upper"><p>Something</p></div>')		
 					html.append('<div id="text-bucket-styled" class="reader"><p>Im looking at </p></div>')	
 					html.append('<div id="text-bucket-end" class="downer"><p>Something dude was </p></div>')	
 	  				html.append('</div>')
	  var from = $("#text-bucket-styled",html);
	  var to = $("#text-bucket-end",html);
	  reader.redistributing_down(from,to,3)
    expect("Im looking at Something dude was ").toEqual(to.text());
    expect(0).toEqual(from.children().length);
	
  });

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
       expect(" asi.").toEqual(readerr.children().first().text());
       expect(" Cuando se quiso dar cuenta se acabo \n").toEqual(bottom.children().first().text());
     
	  
	  
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
       expect(" asi,").toEqual(readerr.children().first().text());
       expect(" Cuando se quiso dar cuenta se acabo \n").toEqual(bottom.children().first().text());
	
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
  		expect(12).toEqual(reader.find_mark("era del atun. \n",["\n","."]))
  
  
  });

it("16.1 should find first index of a mark (like period,carriage,parenthesis,comma)", function() {
  		expect(12).toEqual(reader.find_mark("era del atun. \n",["\n","."]))
  
  
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
 
it("17 should leave the same when don't find any mark (like period,carriage,parenthesis,comma)", function() {
  		var text = "era del aturn"
 		expect(text).toEqual(text.substring(reader.find_mark(text,["\n","."]))) 
  
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
  
  
  
  
  
});
