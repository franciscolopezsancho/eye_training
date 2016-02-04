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

var equis = window.screen.availWidth;
var ies = $(window).height();
var x;
var y;
var timeOut = 1000;

function getX(){
   x = my_random(equis);
   return x;
}

function getY(){
    y = my_random(ies);
	return y;
}

function move(x,y) {
	$("#shaker").offset({ top: y, left: x });
}

function lets_move(){
	move(getX(),getY());
    <!--$("#pos").text("left:" + $("#shaker").offset().left	+" top:"+$("#shaker").offset().top);-->
	
}

function start_game() {
		setInterval(lets_move,700);
	
}
start_game();


