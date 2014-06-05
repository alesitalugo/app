

var rotate_circle = function( section ){
	console.log( section );
	/*
	$('.grass').rotate({animateTo:-180}, 100, 'expo', function(){
		$('.title_section div').removeClass().addClass(section).rotate({animateTo: 360}, 300, 'expo');
	}) ;
*/
};

var get_mapa_mexico = function(){

	$.ajax({
		type: 'GET',
		url: '/templates/template_mapa.html',
		beforeSend: function(){
			console.log( 'Cargando' );
		},
		success: function( response ) {
			$('#home').hide();
			$('#stage').html( response ).fadeIn();
			rotate_circle('mapa');
		}
	});
};

var get_mapa_estado = function( estado ){

	$.ajax({
		type: 'GET',
		url: '/templates/template_'+estado+'.html',
		beforeSend: function(){
			console.log( 'Cargando' );
		},
		success: function( response ) {
			console.log( response );
			$('#home').hide();
			$('#stage').html( response ).fadeIn();
			rotate_circle('estado');
		}
	});
};


/***** BACKBONE ROUTER ***/

var AppRouter = Backbone.Router.extend({
	routes: {
		"": "home",
		"estados": "ver_pais",
		"estados/:estado": "ver_estado"
	}
});

var show_section_home = function(){
	$('#stage').hide();
	$('#home').fadeIn();
};

var app_router = new AppRouter;
app_router.on('route:home', function ( actions ) {
	show_section_home();
});
app_router.on('route:ver_pais', function ( actions ) {
	get_mapa_mexico();
});
app_router.on('route:ver_estado', function ( estado ) {
	get_mapa_estado( estado );
});

Backbone.history.start({ pushState: true });

/**** ***/
$('#stage').on('click', '#mexico_map path', function(){
	var estado = $(this).data('estado');
	Backbone.history.navigate( 'estados/'+estado, true );
});
$.easing.expo = function (x, t, b, c, d) {
    return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
};
$('.table-content, .content_table, .tip_content').rollbar();

//tooltip function
(function( $ ) {
  	$.fn.tooltips = function(el) {
	    var $tooltip,
	      	$body = $('body'),
	      	$el;
	    	return this.each(function(i, el) {
	      		$el = $(el).attr("data-tooltip", i);
	      		var $tooltip = $('<div class="tooltip" data-tooltip="' + i + '">' + $el.attr('title') + '<div class="pico"></div></div>').appendTo("body");
	      		var linkPosition = $el.position();

	      		$tooltip.css({
	        		top: linkPosition.top - $tooltip.outerHeight() + 180,
	        		left: linkPosition.left - ($tooltip.width()/2)
	      		});

	      		$el.removeAttr("title").hover(function() {

	        		$el = $(this);

	        		$tooltip = $('div[data-tooltip=' + $el.data('tooltip') + ']');
	        		var linkPosition = $el.position();

	        		$tooltip.css({
	          			top: linkPosition.top - $tooltip.outerHeight() + 180,
	          			left: linkPosition.left - ($tooltip.width()/2)
	        		});
	        		$tooltip.addClass("active");
	      		}, function() {

	        		$el = $(this);
	        		$tooltip = $('div[data-tooltip=' + $el.data('tooltip') + ']').addClass("out");
	        		setTimeout(function() {
	          			$tooltip.removeClass("active").removeClass("out");
	          		}, 300);
	        	});
	      	});
	}
})(jQuery);

$(".masterTooltip").tooltips();

var menuActive = $('.link-menu').data('menu');
var nextHref = $(menuActive).next();
var ultimoActive = $('.menuon a').last().data('menu');
var section = $('body').attr('class');

var sizeAdjust = function(){
	var width = $(window).outerWidth();
	var height = $(window).outerHeight();

	if(height <= 730){
		$('.container_modal').css({'margin':'70px auto'});
		$('#header-logo').css({

		});
	} else {

	}
	if(width <= 980){

	} else {

	}
}

$(window).resize(function(){
	sizeAdjust();
});

sizeAdjust();

var select_next = function(section){
	
}

var move_section =function(arrow) {
	var arrow = arrow;
	var section = $('body').attr('class');
	var nextSection = null;
	var prevSection = null;

	return{
		'init': function(){
			if(section !== null){
				counter = 0;
				$('.menu-item .link-menu').each(function(){
					section = $('body').attr('class');
					counter++;
				});		
			}
		},
		'next_section': function(){
			/*$('.grass').rotate({animateTo:180}, 300,  'expo', function(){
   				$('.title_section').rotate({animateTo: 360}, 600, 'expo');
   			});
			.data('menu', section)
			*/ 
   			//console.log(section);
   			$('body').attr('class');

   			var menulink = $('.link-menu').data('menu', section).addClass('activate');
   			//console.log(menulink);

   			//console.log(counter);
   			select_next(section);

		}, 	
		'prev_section': function(){
			/*$('.grass').rotate({animateTo:-180}, 100, 'expo', function(){
				$('.title_section').rotate({animateTo: 360}, 300, 'expo');
			});*/
		}
	}
}
var navigate = new move_section(document.getElementById('next'));
   	navigate.init();

$('#next').on('click', function(e){
   	e.preventDefault();
	Backbone.history.navigate( 'estados', true );
});	
$('#prev').on('click',  function(e){
	e.preventDefault();
	navigate.prev_section();
});
$('.selected_calf').on('click', function(){
	$('.selected').removeClass('on');
	$(this).find('.selected').addClass('on');
});
$('.line_home').animate({'height':'280px'}, 1000, function(){
	$('.item_left').animate({
		'left': '0px',
		'opacity':1
	}, 800, 'expo', function(){
		$('.item_right').animate({
			'left':'0px',
			'opacity':1
		}, 800, 'expo', function(){
			$('#go_init').animate({
				'opacity':1
			}, 500);
		});
	});
});
$('#container').animate({'top':'0'}, 1000 , 'expo');
$('.grass').rotate({animateTo: 180}, 100, 'expo');
$('.title_section').rotate({animateTo:360}, 300, 'expo');
$('.modal_button').on('click', function(){
	$('.modal_button').removeClass('active');
	$(this).addClass('active');
});
$('.close_modal').on('click', function(){
	console.log('click');
    $('.modal_tip').fadeOut(500);
});
$('#link_tips').on('click', function(){
	$('.modal_tip').fadeIn(500, function(){
		$('.content_modal').fadeIn(1000);
	});
});

/*GRÁFICA ROUND SVG ANIMATE

 	var colors = [
        	['#e9ebbf', '#cccc33'], ['#f4d9ae', '#ff9900'], ['#cce2e8', '#66cccc'], ['#e0e0e0', '#8ba3a6'], ['#eee0b1', '#cc9900']
       	];
            
    $('.round_graphic').each(function(){
    	var num = $(this).find('.circle').data('percent');
    	$(this).find('.number').html(num+'<span>%</span>');
    });

    for (var i = 1; i <= 5; i++) {
        var child = document.getElementById('circles-' + i),
        	percentage = child.dataset.percent;

                    //$(child).find('.number').html(percentage);

                Circles.create({
                    id:         child.id,
                    percentage: percentage,
                    radius:     55,
                    width:      10,
                    number:     percentage ,
                    text:       '%',
                    colors:     colors[i - 1]
                });
            }

    if ($.browser.msie  && parseInt($.browser.version, 10) === 8) {
  		alert('IE8'); 
	} else {
  		alert('Non IE8');
	}

var busquedaTable = function(){
	var imageCalification = $('.calf_column').data('calif');
	var califList = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
	for(i = 0; i >= i.length; i++){

	}
} */