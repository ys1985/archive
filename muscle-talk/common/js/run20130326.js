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

(function($){
	$.fn.setImageWidth = function() {
		return this.each(function() {
			var obj = this;
			var img = $("img", obj);
			img.load(function() {
				$(obj).width(img.outerWidth(true));	
			});
		});
	};
})(jQuery);

/* Liquid Height */
(function($){
	$.fn.liquidHieght = function(o){
		var o = $.extend({
			target: window,
			decrease: 0,
			min: 0
		}, o);
		var obj = $(this),
			h = parseInt($(o.target).height(), 10) - o.decrease;
		obj.height((h > o.min) ? h : o.min);
		$(window).on("resize", function() {
			var rh = parseInt($(o.target).height(), 10) - o.decrease;
			obj.height((rh > o.min) ? rh : o.min);
		});
	};
})(jQuery);

(function($){
	$.fn.heightEqualizer = function(o){
		var o = $.extend({
			group: 2,
			collect: null
		}, o);
		var obj = this,
			parant = obj.parent();
		parant.each(function() {
			var setobj = $(this).find(obj),
				set = 0,
				total = setobj.length;
			setobj.each(function(i) {
				i++;
				var n = i % o.group;
				if(n === 0 || (i === total && n > 0)) {
					var t = setobj.slice(set, i);
					
					if(o.collect) {
						var cmH = t.find(o.collect).map(function(i,e) {
							return $(e).height();
						}).get();
						t.find(o.collect).height(Math.max.apply(null, cmH));
					}
					
					var mH = t.map(function(i,e) {
						return $(e).height();
					}).get();
					t.height(Math.max.apply(null, mH));
					set = i;
				
				}
			});
		});
	};
})(jQuery);

/*window*/
jQuery.event.add(window, "load", function() {
	$(".stampItem li").heightEqualizer({ group: 4 });
});

$(function() {
	
	/*Edit Name*/
	var nflg = false,
		myName = $(".me .myName").text();
	
	$(".me .btns a").click(function(e) {
		e.preventDefault();
		var target = $(".me .myName");
		if(nflg === false) {
			var name = target.text(),
				newinput = $('<input type="text" name="myName" id="myName" value="" />');
			
			target.empty().append(newinput);
			newinput.focus().val(name);
			newinput.one("keypress", function() {
				newinput.val("");
			});
			nflg = true;
		} else {
			var input = target.find("input"),
				val = input.val();
			input.remove();
			target.text((val === "") ? myName : val);
			nflg = false;
		}
	});
	
	/*Set Liquid Height Content*/
	
	var content = $("#content"),
		hdH = parseInt($("#header").height(), 10),
		ftH = parseInt($("#footer").height(), 10),
		navH = parseInt($("#nav").height(), 10),
		gap = 10;
	
	
	
	var chatWin = $("#chatWindow");
	
	if(chatWin.length) {
		var chatControll = $("#chatControll");
		content.liquidHieght({ decrease: (hdH + ftH + navH + gap), min: 700 });
		chatWin.liquidHieght({ decrease: parseInt(chatControll.height(), 10) - gap, target: "#content" });
		chatWin.css({ "overflow": "auto" });
	} else {
		content.liquidHieght({ decrease: (hdH + ftH + navH + gap)});
		content.css({ "overflow": "auto" });
	}
	
	
	
	/*Slide Down Sub Panel*/
		
	$(".btnSub a").click(function(e) {
		e.preventDefault();
		var box = $(".listSubPanel"),
			img = $("img", this);
		if($(this).hasClass("open")) {
			$(this).removeClass("open");
			box.stop().slideUp(300);
			img[0].src = img[0].src.replace(/^(.+)_a(\.[a-z]+)$/,"$1$2");
		} else {
			$(this).addClass("open");
			box.stop().slideDown(300);
			img[0].src = img[0].src.replace(/^(.+)(\.[a-z]+)$/,"$1_a$2");
		}
	});
	
	/* Light Box */
	
	var popup = $("#popup"),
		opacity = $("#opacity");
	
	$(".listFriend .goTalk").click(function(e) {
		e.preventDefault();
		var obj = $(this),
			prt = obj.closest("li");
		if(prt.hasClass("block") === false) {
			var id = parseInt(obj.attr("data-id"), 10);
			opacity.show();
			popup.show();
		} else {
			//ブロック時の処理
		}
	});
	
	opacity.on("click", function(e) {
		e.preventDefault();
		opacity.hide();
		popup.hide();
	});
	
	popup.find(".closePopup a").on("click", function(e) {
		e.preventDefault();
		opacity.hide();
		popup.hide();
	});
	
});

$(function() {
	var chatControll = $("#chatControll");
	var inputArea = chatControll.find(".inputArea");
	var input = inputArea.find("input");
	var btnSend = chatControll.find(".btnSend a");
	var openStamp = chatControll.find(".btnChatStamp");
	var btnOpenStamp = openStamp.find("a");
	var closeStamp = chatControll.find(".btnCloseStamp");
	var btnCloseStamp = closeStamp.find("a");
	var stampArea = chatControll.find(".stampArea");
	var btnFlicker = chatControll.find(".btnChatFlicker a");
	var btnFlickerHide = $(".btnFlickerHide a");
	var flicker = $(".flicker");
	
	inputArea.find(".btnClear").click(function(e) {
		e.preventDefault();
		input.val("");
		input.focus();
	});
	
	btnSend.click(function (e) {
		e.preventDefault();
		//送信処理
		
		input.val("");
		input.focus();
		
		//処理後呼び出し
		
		scrollBottom();
		
	});
	
	input.on("keypress", function(e) {
		if(e.which === 13) {
			btnSend.trigger("click");
		}
	});
	
	btnOpenStamp.click(function(e) {
		e.preventDefault();
		stampArea.slideDown(300);
		openStamp.hide();	
		closeStamp.show();
	});
	
	btnCloseStamp.click(function(e) {
		e.preventDefault();
		stampArea.slideUp(300);
		openStamp.show();	
		closeStamp.hide();
	});
	
	btnFlicker.click(function(e) {
		e.preventDefault();
		flicker.slideDown(300);
		if(stampArea.is(":visible")) {
			stampArea.hide();
			openStamp.show();	
			closeStamp.hide();
		}
		
	});
	
	btnFlickerHide.click(function(e) {
		e.preventDefault();
		flicker.slideUp(300);
	});
	
	var chatWin = $("#chatWindow");
	var chatArea = $("#chatWindow").find(".scrollArea");
	
	
	function scrollBottom() {
		chatWin.scrollTop(chatWin[0].scrollHeight);
	}
	
	var stampCatList = stampArea.find(".lists");
	var catListUl = stampCatList.find("ul");
	var lists = catListUl.find("li");
	var listsW = 120;
	var listLnt = lists.length;
	var totalW =  listLnt * listsW;
	var shows = 5;
	var viewFlg = 0;
	var flg = 0;
	var stamps = $(".stamps");
	
	var stampBox = stamps.find(".stampBox")
	
	var group = 0;
		
	lists.each(function(i) {
		if(i % shows === 0) {
			group++;
		}
		$(this).addClass("group" + group);
		$(this)[0].stampgroup = group;
	});
	
	stampBox.hide();
	stampBox.first().show();
	lists.first().addClass("current");
	
	stampBox.find("a").click(function(e) {
		e.preventDefault();
		
		var src = $("img", this)[0].src;
		
		/*スタンプを押したときの処理*/
		var html = '<div class="user">';
			html += '<p class="name">ツトム</p>';
			html += '<p class="stamp"><img src="' + src + '" alt=""></p>';
			html += '<p class="thumb"><img src="http://img.gmo.jp/muscle2013/common/images/img-player_01.png" alt=""></p>';
			html += '</div><!-- .user -->';
		
		chatArea.append(html);
		stampArea.hide();
		openStamp.show();	
		closeStamp.hide();
		
		scrollBottom();
	});
	
	var btnNext = stampArea.find(".btnNext");
	
	var blocks = Math.ceil(listLnt / shows);
	
	catListUl.width(totalW);
	
	lists.find("a").click(function(e) {
			e.preventDefault();
			var target = $(this.hash);
			if(viewFlg !== target.index()) {
				var parantLi = $(this).closest("li");
				lists.removeClass("current");
				parantLi.addClass("current");
				viewFlg = target.index();
				stampBox.hide();
				target.show();
				if(parantLi[0].stampgroup !== (flg + 1)) {
					lists.hide();
					lists.filter(".group" + parantLi[0].stampgroup).show();
					flg = parantLi[0].stampgroup - 1;
				}
				
			}
	});
	

	if(blocks === 1 || blocks === 0) {
		btnNext.hide();
	} else {
		btnNext.find("a").click(function(e) {
			e.preventDefault();
			
			if((flg + 1) === blocks) {
				flg = 0;
			} else {
				flg++;
			}
			
			lists.hide();
			lists.filter(".group" + (flg + 1)).show();
		});
	}
	
	var prevStamp = stamps.find(".prevStamp a");
	var nextStamp = stamps.find(".nextStamp a");
	
	prevStamp.click(function(e) {
		e.preventDefault();
		var teq = 0;
		if(viewFlg === 0) {
			teq = listLnt - 1;
		} else {
			teq = viewFlg - 1;
		}
		lists.eq(teq).find("a").trigger("click");
	});
	
	nextStamp.click(function(e) {
		e.preventDefault();
		var teq = 0;
		if((viewFlg + 1) === listLnt) {
			teq = 0;
		} else {
			teq = viewFlg + 1;
		}
		lists.eq(teq).find("a").trigger("click");
	});
	
	
});

$(function() {
	/*Roll Over*/
	
	$(".btnBack a").rollOver();
	$(".listFriend .btns a").rollOver();
	$(".btnMore a").rollOver();
	$(".me .btns a").rollOver();
	$(".listSubPanel li a").rollOver();
	$(".listPopup li a").rollOver();
	$(".listBtn2 li a").rollOver();
	$("#chatControll .btnChatStamp a").rollOver();
	$("#chatControll .btnChatFlicker a").rollOver();
	$("#chatControll .btnSend a").rollOver();
	$(".btnFlickerHide a").rollOver();
	$(".btnAdd a").rollOver();
	
	
	/*Roll Over End*/
});


