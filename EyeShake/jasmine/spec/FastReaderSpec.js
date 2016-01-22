describe("FastReader", function() {
  

  beforeEach(function() {
     reader = new FastReader();
  });

  it("1 should be able to take 3 words from the begining of 'should be able to play a Song'", function() {
    expect("should be able").toEqual(reader.take_text("should be able to play a Song",3,true));
  });
  
  it("2 should be able to move 3 first words from 'should be able to play a Song' to 'almos nothing',adding it before and keep the rest", function() {
    expect("should be able almos nothing").toEqual(reader.move_text("should be able to play a Song","almos nothing",3,true,true));
  });
  
  it("3 should be able to move 'play a Song' words from 'should be able to play a Song' to 'almos nothing',blank included", function() {
    expect("almos nothing play a Song").toEqual(reader.move_text("should be able to play a Song","almos nothing",3,false,false));
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
  var from = $("#text-bucket-styled",html);
  var to = $("#upper-container",html);
  reader.redistributing_up(from,to,3)
   expect("Im looking at").toEqual(to.children().last().text());
 });
  it("7 should be able to redistribute with some <p> in upper container without adding one blank", function() {
 var html = $('<div class="book">')		
	  				html.append('<div id="upper-container" class="upper"><p>Something</p></div>')		
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
	  				html.append('<div id="upper-container" class="upper"><p>Something</p></div>')		
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
 var html = $('<div class="book">')		
	  				html.append('<div id="upper-container" class="upper"><p>Something</p></div>')		
 					html.append('<div id="text-bucket-styled" class="reader"><p>Im looking at</p></div>')	
 					html.append('<div id="text-bucket-end" class="downer"><p>Something dude was almost walking...</p></div>')	
 	  				html.append('</div>')
	  var from = $("#text-bucket-end",html);
	  var to = $("#text-bucket-styled",html);
	  reader.redistributing_up(from,to,3)
    expect("Im looking at Something dude was").toEqual(to.text());
    expect(" almost walking...").toEqual(from.text());
	
  });
  it("10 should be able to redistribute from bottom to reader and erase bottom paragraph if empty", function() {
 var html = $('<div class="book">')		
	  				html.append('<div id="upper-container" class="upper"><p>Something</p></div>')		
 					html.append('<div id="text-bucket-styled" class="reader"><p>Im looking at</p></div>')	
 					html.append('<div id="text-bucket-end" class="downer"><p>Something dude was </p></div>')	
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
 					html.append('<div id="text-bucket-styled" class="reader"><p>Im looking at</p></div>')	
 					html.append('<div id="text-bucket-end" class="downer"><p>Something dude was </p></div>')	
 	  				html.append('</div>')
	  var from = $("#text-bucket-styled",html);
	  var to = $("#text-bucket-end",html);
	  reader.redistributing_down(from,to,3)
    expect("Im looking at Something dude was ").toEqual(to.text());
    expect(0).toEqual(from.children().length);
	
  });

  it("12 should be able to redistribute from reader to upper creating new paragraph because carriage", function() {
 var html = $('<div class="book">')		
	  				html.append('<div id="upper-container" class="upper"><p>Something</p></div>')		
 					html.append('<div id="text-bucket-styled" class="reader"><p>Im looking \n</p></div>')	
 					html.append('<div id="text-bucket-end" class="downer"><p>Something dude was </p></div>')	
 	  				html.append('</div>')
	  var from = $("#text-bucket-styled",html);
	  var to = $("#upper-container",html);
	  reader.redistributing_up(from,to,3)
    expect("Something Im looking \n").toEqual(to.children().first().text());
    expect("").toEqual(to.children().last().text());	
  });
  
});
