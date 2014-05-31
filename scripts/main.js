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

$('.selected_calf').on('click', function(){
	$('.selected').removeClass('on');
	$(this).find('.selected').addClass('on');
});

$('.table-content, .content_table, .tip_content').rollbar();

$('.line_home').animate({'height':'280px'}, 1000, function(){
	$('.plant_home').animate({'height': '150px'}, 2000, function(){
		//opacity 0 to 1
		$('.item_left .image').addClass('active', 500);
			$('.item_right .image').addClass('active');
		});
	});

/*$(function() {
    function load(url, push) {
        $.ajax({
            url: url,
            success: function (data) {
                var title = data.match("<title>(.*?)</title>")[1];
                document.title = title;
                if (push) {
                    history.pushState(null, title, url);
                }
            }
        });
    }

    $(document).click(function(e) {
        if (e.target.nodeName === 'A') {
            var url = $(e.target).attr('href');
            if (url.indexOf('#') !== 0) {
                load(url, true);
                e.preventDefault();
            }
        }
    });

    $(window).bind('popstate', function(e) {
        load(window.location.href, false);
    });
});*/

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
/*$('.selector').on('click', function(){
	
});

$('.menuon').ready(function(){

});*/
//create a global function for round the grass 360° and the sections appear in 180°
//when the section was selected we need to add the menu item that corresponde into the nav bar  . 
//if is back , the item menu goes away, and the section round to the other side in 180°
// all items only round when you click the corresponding button, prev or next 