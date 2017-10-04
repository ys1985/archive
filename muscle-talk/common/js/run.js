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

var uacheck = {
	ua: navigator.userAgent.toLowerCase(),
	uacheck: function (t) {
		return (this.ua.indexOf(t) != -1) ? true : false;	
	},
	numberformat: function (num) {
		return num.toString().replace(/([0-9]+?)(?=(?:[0-9]{3})+$)/g, '$1,');
	},
	ieversion: function () {
		return parseInt(this.ua.replace(/.*msie[ ]/,'').match(/^[0-9]+/));
	},
};

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
	
	/* Light Box */
	
	var popup = $(".popup"),
		opacity = $(".opacity");
	
	$(".listFriend .goTalk").click(function(e) {
		e.preventDefault();
		var obj = $(this),
			prt = obj.closest("li");
		if(prt.hasClass("block") === false) {
			opacity.show();
			$(this.hash).show();
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
	
	// btnSend.click(function (e) {
	// 	e.preventDefault();
	// 	//送信処理
		
	// 	input.val("");
	// 	input.focus();
		
	// 	//処理後呼び出し
		
	// 	scrollBottom();
		
	// });
	
	// input.on("keypress", function(e) {
	// 	if(e.which === 13) {
	// 		btnSend.trigger("click");
	// 	}
	// });
	
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
/*
		var html = '<div class="user">';
			html += '<p class="name">ツトム</p>';
			html += '<p class="stamp"><img src="' + src + '" alt=""></p>';
			html += '<p class="thumb"><img src="http://img.gmo.jp/muscle2013/common/images/img-player_01.png" alt=""></p>';
			html += '</div><!-- .user -->';
		
		chatArea.append(html);
*/

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
	$(".callEnd a").rollOver();
	
	
	
	/*Roll Over End*/
});


/*Sub Buttons*/
$(function() {
	var nav = $("#nav");
	var subPanel = nav.find(".listSubPanel");
	var btnSub = nav.find(".btnSub a");
	var body = $(document.body);
	
	var contents = $(".subPanelContents");
	var straps = contents.find(".strap p");
	var present = contents.find(".present");
	var rotateObj = contents.find(".rotate");
	var rotateImg = rotateObj.find("img");
	var block = contents.find(".block");
	var blockClose = block.find(".btnClose a");
	var blockImg = block.find(".img img");
	var blockOpacity = $("#opacityBlock");
	var blockImgs = [
		"img-block_01.png",
		"img-block_02.png",
		"img-block_03.png",
		"img-block_04.png",
		"img-block_05.png"
	];
	
	var share = contents.find(".share");
	
	var imgrotate = "http://img.gmo.jp/muscle2013/common/images/img-rotate_01.png";
	var imgrotatemove = "http://img.gmo.jp/muscle2013/common/images/img-rotate_02.png";
	var rotateInfi = null;
	
	var tel = contents.find(".tel");
	var timertext = tel.find(".timer");
	var endCall = tel.find(".callEnd a");
	var opacityCall = $("#opacityTel");
	var calltimer = null;
	
	/*Share Common*/
		
	var share = contents.find(".share");
	var closeShare = share.find(".btnClose");	
	var opacityShare = $("#opacityShare");
	var btnShare = $(".btnShare a");
	
	btnShare.click(function(e) {
		e.preventDefault();
		opacityShare.show();
		share.show();
	});
	
	opacityShare.click(function(e) {
		e.preventDefault();
		opacityShare.hide();
		share.hide();
	});
	
	closeShare.click(function(e) {
		e.preventDefault();
		opacityShare.hide();
		share.hide();
	});
	
	/*Slide Down Sub Panel*/
	
	var moveY = [885, 695, 369, 621, 798, 810, 700];	
	var gap = 85;
	
	blockClose.click(function(e) {
		e.preventDefault();
		block.hide();
		blockOpacity.hide();
	});
	
	blockOpacity.click(function(e) {
		e.preventDefault();
		block.hide();
		blockOpacity.hide();
	});
	
	var voiceflg = true;
	
	if(uacheck.uacheck("msie") && uacheck.ieversion() < 9) {
		voiceflg = false;
	}
	
	var soundTel = null;
	
	if(voiceflg === true) {
		var mime = "ogg";
		if(uacheck.uacheck("msie")) {
			mime = "mp3";
		} else if(uacheck.uacheck("safari")) {
			mime = "m4a";
		}
		soundTel = document.createElement("audio");
		soundTel.setAttribute("src", "/common/voice/tel." + mime);
	}
	
	endCall.click(function(e) {
		e.preventDefault();
		tel.hide();
		if(voiceflg === true) {
			soundTel.pause();
		}
		opacityCall.hide();
		timertext.text("0:00");
		clearInterval(calltimer);
	});
	
	opacityCall.click(function(e) {
		e.preventDefault();
		tel.hide();
		if(voiceflg === true) {
			soundTel.pause();
		}
		opacityCall.hide();
		timertext.text("0:00");
		clearInterval(calltimer);
	});
		
	btnSub.click(function(e) {
		e.preventDefault();
		img = $("img", this);
		if($(this).hasClass("open")) {
			$(this).removeClass("open");
			subPanel.stop().slideUp(300);
			img[0].src = img[0].src.replace(/^(.+)_a(\.[a-z]+)$/,"$1$2");
		} else {
			$(this).addClass("open");
			subPanel.stop().slideDown(300);
			img[0].src = img[0].src.replace(/^(.+)(\.[a-z]+)$/,"$1_a$2");
		}
	});
	
	var fevers = ["present", "rotate", "strap"];
	
	subPanel.find("a").click(function(e) {
		e.preventDefault();
		btnSub.trigger("click");
		var pid = e.currentTarget.parentNode.id;
		
		if(pid === "btnSubStamp") {
			window.location.href = this.href;
		} else if(pid === "btnSubShare") {
			opacityShare.show();
			share.show();
		} else if(pid === "btnSubFever") {
			
			var rand = Math.floor(Math.random() * fevers.length);
			var fever = fevers[rand];
		
			if(fever === "present") {
				present.css("bottom", -716).show().animate({"bottom": 56}, 300, function() {
					var hidePresent = setTimeout(function() {
						clearTimeout(hidePresent);
						present.animate({"bottom": -716}, 300, function() {
							present.hide();
						});
						
					}, 500);
				});
			} else if(fever === "rotate") {
				rotateObj.show()
				var viewrotate = setTimeout(function() {
					rotateImg[0].src = imgrotatemove;
					rotateObj.animate({
						rotate: "+=360deg", 
						left: parseInt($(window).width(), 10) - 468
						}, 800, function() {
							rotateObj.animate({
								rotate: "-=360deg", 
								left: 0
								}, 800, function() {
									rotateImg[0].src = imgrotate;
									rotateObj.hide();
							});
					});
					clearTimeout(viewrotate);
				}, 500)
				
				
				
			} else if(fever === "strap") {
				
				var showtime = 200;
				var hidetime = showtime * 6;
				var type = Math.floor(Math.random() * 2);
				
				if(type === 0) {
					straps.each(function(i) {
						straps.eq(i).css({ "top": (moveY[i] + 85) * -1 }).show().stop().animate({"top": 85}, showtime);
					});
				} else {
					var check = 1;
					var strapDown = setInterval(function() {
						if(straps.length === check) {
							clearInterval(strapDown);
						} else {
							check++;
						}
						straps.eq(check - 1).show().stop().animate({"top": 85}, showtime);
					}, showtime);
					hidetime = showtime + (showtime * straps.length);
				}
				
				var straphide = setTimeout(function() {
					straps.each(function(i) {
						straps.eq(i).stop().animate({"top": (moveY[i] + 85) * -1}, showtime, function() {
							$(this).hide();
						});
					});
					clearTimeout(straphide);
				}, hidetime);
				
			}
			
		} else if(pid === "btnSubTel") {
			tel.show();
			opacityCall.show();
			//timertext
			var cnt = 0;
			calltimer = setInterval(function() {
				cnt++;
				if(cnt === 2 && voiceflg === true) {
					soundTel.currentTime=0;
					soundTel.play();
				}
				var m = Math.floor(cnt / 60);
				var s = (m > 0) ? cnt - (m * 60) : cnt;
				timertext.text((s < 10) ? m + ":0"+s : m + ":"+s);
			}, 1000);
		} else if(pid === "btnSubBlock") {
			block.show();
			blockOpacity.show();
			blockImg[0].src = "http://img.gmo.jp/muscle2013/common/images/" + blockImgs[Math.floor(Math.random() * blockImgs.length)];
		} else if(pid === "btnSubChgApp") {
			if(body.hasClass("cacao")) {
				body.removeClass("cacao");
			} else {
				body.addClass("cacao");
			}
		}
		
	});
	
});

$(function() {
	var shareStamp = $("#shareStamp");
	var closeShareStamp = shareStamp.find(".btnClose");	
	var opacityShareStamp = $("#opacityShareStamp");
	var btnShareStamp = $(".btnStampShare a");
	
	btnShareStamp.click(function(e) {
		e.preventDefault();
		opacityShareStamp.show();
		shareStamp.show();
	});
	
	opacityShareStamp.click(function(e) {
		e.preventDefault();
		opacityShareStamp.hide();
		shareStamp.hide();
	});
	
	closeShareStamp.click(function(e) {
		e.preventDefault();
		opacityShareStamp.hide();
		shareStamp.hide();
	});
	
});
