/* Roll Over */
(function($){
	$.fn.rollOver = function(o){
		var o = $.extend({
			over: "_o",
			disable: null
		}, o);
		return this.each(function() {
			var img = $("img", this);
			if(o.disable !== null && ($(this).is(o.disable) || $(this).has(o.disable))) {
				return;
			}
			$(this).on("mouseenter mouseleave focusin focusout", function(e) {
				if((e.type === "mouseenter" || e.type === "focusin") && img[0].src.indexOf(o.over) === -1) {
						img[0].src = img[0].src.replace(/^(.+)(\.[a-z]+)$/,"$1" + o.over + "$2");
				} else if(e.type === "mouseleave" || e.type === "focusout") {
					var srcReg = new RegExp("^(.+)" + o.over + "(\.[a-z]+)$");
					img[0].src = img[0].src.replace(srcReg,"$1$2");
				}
			});
		});
		
	};
})(jQuery);

var moveFlg = false;			

$(function() {
	
	$(".btnRoll").rollOver();
	$(".contents .btns a").rollOver();
	
	
	$("#gnav a").click(function(e) {
		e.preventDefault();
		var position = $(this.hash).offset().top;
		$("html, body").animate({
			"scrollTop": position
		}, 1000, "easeInOutElastic");
		
	});
	
	var opacity = $("#opacity");
	var mikesselect = $("#mikesselect");
	var movieframe = $("#jsmovie");
	var framesrc = "/select/index.html";
	var loader = mikesselect.find(".loading");
	
	opacity.click(function() {
		mikesselect.hide();
		opacity.hide();
	});
	
	var wrap = $("#wrap");
	
	var loadFlg = false;
	
	$("#nowCall").click(function(e) {
		e.preventDefault();
		opacity.show();
		opacity.height(wrap.height());
		
		mikesselect.show();
		if(loadFlg === false) {
			loader.show();
			movieframe.load(function() {
				loader.hide();
			}).attr("src", framesrc);
			loadFlg = true;
		} else {
			movieframe.attr("src", framesrc);
		}
	});
	
	var imageMap = $("#imageMap");
	var img = imageMap.find(".imageMap img");
	var defSrc = img[0].src;
	
	imageMap.find("area").on("mouseenter mouseleave focusin focusout", function(e) {
		var classname = "_" + this.className;
		if(e.type === "mouseenter" || e.type === "focusin") {
				img[0].src = img[0].src.replace(/^(.+)(\.[a-z]+)$/,"$1" + classname + "$2");
		} else if(e.type === "mouseleave" || e.type === "focusout") {
			img[0].src = defSrc;
		}
	});
	
	//var footerH = parseInt($("#footer").outerHeight(), 10);
	var footerH = 0;
	var moveObj = $('<p id="moving"><img src="http://img.gmo.jp/muscle2013/images/top/btn-top_move_01.png" alt="" /></p>');
	
	$(document.body).append(moveObj);
	
	moveObj.css("bottom", footerH);
	
	
	var movex = null;
	var movey = null;
	var moveFlgX = false;
	var moveFlgY = false;
	var moveRight = moveObj.css("right");
	var pageTop = $(".pageTop");
	pageTop.hide();
	pageTop.css("bottom", footerH).find("a").on("mouseenter mouseleave click", function(e) {
		
		var anc = $(this);
		
		if(e.type === "mouseenter") {
			anc.stop().animate({
				height: 164
			}, 100);
		} else if(e.type === "mouseleave") {
			anc.stop().animate({
				height: 156
			}, 100);
		} else if(e.type === "click") {
			e.preventDefault();
			moveObj.show();
			pageTop.hide();
			
			moveFlg = true;
			
			
			movex = setInterval(function() {
				if(moveFlgX === false) {
					moveObj.animate({ right: 50 } ,200, "easeInBounce");
					moveFlgX = true;
				} else {
					moveObj.animate({ right: 20 }, 200, "easeInBounce");
					moveFlgX = false;
				}
				
			}, 200);
			
			movey = setInterval(function() {
				if(moveFlgY === false) {
					moveObj.animate({ bottom: (footerH + 10) }, 100, "easeInBounce");
					moveFlgY = true;
				} else {
					moveObj.animate({ bottom: footerH }, 100, "easeInBounce");
					moveFlgY = false;
				}
				
			},100);
			
			
			$("html, body").animate({ scrollTop: 0 }, 2000, function() {
				clearInterval(movex);
				clearInterval(movey);
				moveObj.stop(true, false).animate({
					"bottom": $(window).height()
					}, 300, "easeInQuad", function() {
						moveFlg = false;
						moveObj.hide().css({ 
							"right": moveRight,
							"bottom": footerH
						});
				});
				
			});
		}
	})
	

	
});

/*window*/
jQuery.event.add(window, "load", function() {
	var pageTop = $(".pageTop");
	var start = parseInt($(window).scrollTop(), 10);
	
	if(start > 0) {
		pageTop.show();
	} else {
		pageTop.hide();
	}
	
	$(window).scroll(function() {
		var scrolly = parseInt($(window).scrollTop(), 10);
		if(moveFlg === false) {
			if(scrolly > 0) {
				pageTop.show();
			} else {
				pageTop.hide();
			}
		}
	});
});