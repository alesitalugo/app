var rotate_circle = function( section ){	
	$('.grass').rotate({animateTo: 180}, 100, 'expo');	
	$('.title_section').rotate({animateTo: 360}, 300, 'expo');
	$('#add_title').removeClass().addClass(section);
	$('#button_'+section).fadeIn();	
};

var get_mapa_mexico = function(){

	$.ajax({
		type: 'GET',
		url: '/templates/template_mapa.html',
		beforeSend: function(){
			//console.log( 'Cargando' );
		},
		success: function( response ) {
			//console.log('success');
			$('#home').hide();
			$('#stage').html( response ).fadeIn();
			rotate_circle('mapa');			
		}
	});
};

var next_section = function(place){
	var keep_select = null ;


}
var get_mapa_estado = function( estado ){

	$.ajax({
		type: 'GET',
		url: '/templates/maps/template_'+estado+'.html',
		beforeSend: function(){
			//console.log( 'Cargando' );
		},
		success: function( response ) {
			//console.log( response );
			//console.log(estado);
			$('body').removeClass().addClass(response);
			$('#home').hide();

			$('#stage').html( response ).fadeIn();
			rotate_circle('estado');
			$('#stage .table-content, #stage .content_table').rollbar();


			$('#stage .masterTooltip').each(function(){
				var getTitle  = $(this).attr('title');
				console.log(getTitle);		
					var items = new Array(getTitle);
					var ul;
					$.each(items, function (index, value) {
		    		if (index % 3==0)  {
		        		$('.table-content').append(ul);
		        			ul = $('.items-table');
		    			}
		    			var li = $('.item-row .item-column p').append(value);
		    			ul.append(li);
					});
					$('body').append(ul);
			});
			
        

			/*var tooltip = 1;
			var list = $('.items-table');
			var howmany  = $('#stage .masterTooltip');
			var name = $(howmany).attr('title');
			for(m = 0; m <= howmany.length; m++){
				//console.log(howmany[m]);
				var array = howmany[m];
				var ques = $(array).attr('title');
				$('#stage').each.html(ques[m]);
			}*/


			/*$(' #stage .masterTooltip').each(function(){
				var name = $(this).attr('title');
				var noteList = '.items-row .item-column p a';
				var createList  = $(noteList).html(name);
				var el = $.map(name, function(val, i){
					return $(noteList).html(val);
				});
				tooltip++;
			});*/

		}
	});
};

var get_calificacion = function(calificacion){
	$.ajax({
		type: 'GET',
		url: '/templates/template_calificacion.html',
		beforeSend: function(){

		}, 
		success: function(response){
			//console.log(response);
			$('#home').hide();
			$('#stage').html(response).fadeIn();
			rotate_circle('estado');
		}
	});
}

/***** BACKBONE ROUTER ***/

var AppRouter = Backbone.Router.extend({
	routes: {
		"": "home",
		"estados": "ver_pais",
		"estados/:estado": "ver_estado",
		"calificacion": "ver_calificacion",
	}
});
var global_sections = function(){
	$('#header-logo').show();
};
var show_section_home = function(){
	$('#stage').hide();
	$('#home').fadeIn();
	$('#header-logo').hide();
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
	$('#go_init').on('click', function(e){
		e.preventDefault();
		Backbone.history.navigate( 'estados', true );
	});
};

var app_router = new AppRouter;
app_router.on('route:home', function ( actions ) {
	show_section_home();
});
app_router.on('route:ver_pais', function ( actions ) {
	get_mapa_mexico();
	global_sections();
});
app_router.on('route:ver_estado', function ( estado ) {
	get_mapa_estado( estado );
});
app_router.on('route:ver_calificacion', function(calificacion){
	get_calificacion(calificacion);
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
			 
   			//console.log(section);
   			$('body').attr('class');

   			var menulink = $('.link-menu').data('menu', section).addClass('activate');
   			//console.log(menulink);

   			//console.log(counter);
   			select_next(section);*/

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
	$('.grass').rotate({animateTo:180}, 300,  'expo', function(){
   		$('.title_section').rotate({animateTo: 360}, 600, 'expo');
   	});
});	
$('#prev').on('click',  function(e){
	e.preventDefault();
	//navigate.prev_section();
});
$('.selected_calf').on('click', function(){
	$('.selected').removeClass('on');
	$(this).find('.selected').addClass('on');
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

var select_next = function(section){
	
}

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