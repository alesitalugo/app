
var sizeAdjust = function(){
	var width = $(window).outerWidth();
	var height = $(window).outerHeight();

	if(width <= 1242){
		$('.container_modal').css({'margin':'70px auto'});
		$('#header-logo').css({

		});
		//$('#container').css({'top': '89px'});				
		$('#container').animate({'top':'89px'}, 1000 , 'expo');		
		$('#header').css({'top':'0px'});
		var imin = $('body').attr('class');
		if(imin == "estado"){
		}
	} else {

	}
	if( height <= 980){

	} else {

	}
}

$(window).resize(function(){
	sizeAdjust();
});

sizeAdjust();
