$(function() {
	
	/*------------------------------------------------------
	/* menu スライド */
	/*------------------------------------------------------*/
	var srcroll_Top = 0;
	
	$('.index_header .menu_ico').click(function(){
		$('.menu_wrapper').slideToggle(300,'swing',function(){
			if(srcroll_Top == 0){
				$('#header').stop().animate({top:'-56px'},300,"easeInOutCubic");
			}			
		});
		
	})
	$('.index_header .close_btn').click(function(){
		$('.menu_wrapper').slideUp(300,'swing',function(){
			if(srcroll_Top == 0){
				$('#header').stop().animate({top:'-56px'},300,"easeInOutCubic");
			}		
		});
	})
	$('.menu_list li').click(function(){
		$('.menu_wrapper').stop().slideUp(300,'swing');
	})
	
	
	$('.contents_header .menu_ico').click(function(){
		$('.menu_wrapper').slideToggle(300,'swing')
		
	})
	$('.contents_header .close_btn').click(function(){
		$('.menu_wrapper').slideToggle(300,'swing')
	})
	
	/*------------------------------------------------------
	/* menu スクロール */
	/*------------------------------------------------------*/
	
	$(window).scroll(function(){
		var menu_display = $('.menu_wrapper').css("display");
		srcroll_Top = $(this).scrollTop();	
		
		if(menu_display == "block"){
			return false;
		}
		
		else{
			if(srcroll_Top > 50){
			$('.index_header').stop().animate({top:'0px'},300,"easeInOutCubic");
			}
			if(srcroll_Top < 50){
				$('.index_header').stop().animate({top:'-56px'},300,"easeInOutCubic");
			}
		}
		
	})
	
	/*------------------------------------------------------
	/* service toggle */
	/*------------------------------------------------------*/
	$('.service_list li').click(function(){
		var target = $(this).find('.service_desc');
		var target_display = target.css('display')
		target.slideToggle(300,'swing');
		if(target_display == "block"){
			$(this).find('.plus_ico').css({'background-position': 0 + 'px ' + 0 + 'px'});
			
		}
		if(target_display == "none"){
			$(this).find('.plus_ico').css({'background-position':  0 + 'px ' + '-' + 20 + 'px'})
		}	
		
	})
	
	
	/*------------------------------------------------------
	/* スムーススクロール */
	/*------------------------------------------------------*/
	$(".smoothscroll").click(function()
	{	
		$('.menu_wrapper').stop().slideUp(300,'swing');		
		var targetID = $(this).attr('href');
		var target = $(targetID);
		$('html,body').stop().animate({scrollTop : target.offset().top}, 1000 , "easeInOutCubic");
		return false;
	});
	
	
	
});