$(function(){
	/****************************/
	// videoリサイズ 
	/****************************/
	var window_W;
	var window_H;
	
	function resizeHandler(){
		
		window_W = window.innerWidth ? window.innerWidth: $(window).width();
		window_H = window.innerHeight ? window.innerHeight: $(window).height();
		
		var video_H = $('.video').height();
		
		if(video_H > 530){
			$('.video_container').css({height:"530px"});
		}
		else{
			$('.video_container').css({height:video_H});
		}
		
		
	}
	
	$(window).resize(function(){resizeHandler();});
	$(window).load(function(){resizeHandler();});
	resizeHandler();
})
	