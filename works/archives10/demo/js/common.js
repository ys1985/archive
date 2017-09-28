$(function() {
	$('.rollover img').hover(function(){
		$(this).stop().fadeTo(150, 0.75);
	},
	function(){
		$(this).stop().fadeTo(150, 1);
	});

	
	var date_obj = new Date()
	var my_year = date_obj.getFullYear();
	$('.copyright_year').text(my_year);

	function imgOvAnimeFade(){
		var ovClass = "trans", //ロールオーバーする要素のクラス名
		ovStr = "_on", //ロールオーバー後の画像に追加する文字列
		ovImg = "ovImg",
		speed = 150; //アニメーションの速度

		//classがrolloverのimg要素に対しての処理
		$("img."+ovClass).each(function(){


			var self = $(this),
			
			url = self.attr("src").replace(/^(.+)(\.[a-z]+)$/,"$1"+ovStr+"$2");
			
			function ovElmLen(){ //ロールオーバー画像表示確認関数
				return self.prev("img."+ovImg).length;
			}
			
			//ホバーイベント
			self.hover(
			function(){
				if(!self.attr("src").match(ovStr+".")){
					if(!ovElmLen()){
						if(jQuery.support.checkOn && jQuery.support.htmlSerialize && !window.globalStorage){ //Operaバグ対策
							self.before("<span style='display:inline-block;' class='"+ovImg+"' ></span>");
						}
						self.css({position:"relative"}).before("<img style='position:absolute;' class='"+ovImg+"' src='"+url+"' alt='' />");
					}
					self.stop().animate({opacity:"0"},speed);
				}
			},
			function(){
				if(ovElmLen()){
					self.stop().animate({opacity:"1"},speed,function(){
						self.css({position:"static"})
						.prevAll("."+ovImg).remove();
					});
				}
			})
			.each(function(){ //プリロード設定
				$("<img>").attr("src",url);
			});
		});
	}
	imgOvAnimeFade();
	$('.facebookLink').children('a').click(function(e) {
		e.preventDefault();
		var href = $(this).attr('href');
		var name = $(this).attr('data-window');
		window.open(href, name, 'width=550, height=450, menubar=no, toolbar=no, scrollbars=yes');
	});

	if(!(0 < $('#tweets').size())){
		$('.twitterLink').children('a').click(function(e) {
			e.preventDefault();
			var href = $(this).attr('href');
			var name = $(this).attr('data-window');
			window.open(href, name, 'width=550, height=450, menubar=no, toolbar=no, scrollbars=yes');
		});
	};
	
	$('#header_sp .menu_ico').click(function(){
			$('.menu_wrapper').slideToggle(300,'swing')
			
	})
	$('.contents_header .close_btn').click(function(){
		$('.menu_wrapper').slideToggle(300,'swing')
	})

	/*------------------------------------------------------
	/* スムーススクロール */
	/*------------------------------------------------------*/
	$(".smoothscroll").click(function()
	{
		
		var startOffset = $(this).offset().top;
		var targetID = $(this).attr('href');
		var target = $(targetID);
		
		$('html,body').stop().animate({scrollTop : target.offset().top}, 1000 , "easeInOutCubic");
		return false;
	});
	
	
	
});