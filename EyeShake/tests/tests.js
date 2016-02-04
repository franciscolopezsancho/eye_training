test( "get_words", function() {
  function date(when, expected) {
      equal(get_words("In the twelfth", when), expected);
    }
	var response = ["In","the","twelfth"];
    date("3", response);
	
});

test( "check_response", function() {
  function dite(when, expected) {
      equal(check_response("In the twelfth", when), expected);
    }
    dite(get_words("In the twelfth","3"), true);
	
});