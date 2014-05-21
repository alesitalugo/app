//console.log('\'Allo \'Allo!');
 $.easing.expo = function (x, t, b, c, d) {
        return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
};
$('#next').on('click', function(){
   $('.grass').rotate({animateTo:180}, 300,  'expo');
   $('.title_section').rotate({animateTo: 360}, 300, 'expo');
});	
$('#prev').on('click',  function(){
	$('.grass').rotate({animateTo:-180},100,  'expo');
	$('.title_section').rotate({animateTo: 360}, 300, 'expo');
});

/*var sections = function(slider){
	var slider = slider;
	var actual_slide = null;
	var sections = null; 
	var prev_slide = null;
	var slide_direction = null; 
	var menu_indicator  = null;
	var on_first_slide = null;
	var slide_object = null;

	return {
		'init': function( el ){
			$('.grass').rotate({animateTo:180}, 100,  'expo');
   			$('.title_section').rotate({animateTo: 180}, 300, 'expo');
		}, 
		'slide_next':function(){

		}, 
		'slide_prev': function(){

		}
	} 
}*/


var mainAnimation = function(){
	var content = content;
	var title = null;
	return{
		'init': function(){
			
		}
	}
}
	$('#container').animate({'top':'0'}, 1000 , 'expo');
	$('.grass').rotate({animateTo: 180}, 100, 'expo');
	$('.title_section').rotate({animateTo:360}, 300, 'expo');

/*$('.selector').on('click', function(){
	
});

$('.menuon').ready(function(){

});*/
//create a global function for round the grass 360° and the sections appear in 180°
//when the section was selected we need to add the menu item that corresponde into the nav bar  . 
//if is back , the item menu goes away, and the section round to the other side in 180°
// all items only round when you click the corresponding button, prev or next 