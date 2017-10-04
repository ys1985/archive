(function($) {

    var config = {
        backend_url: "backend.php",
        polling_id: null,  // polling timer id
        polling_interval_talk: 1500,  // (ms)
        polling_stop_interval: 180000,
        last_request: null,
        myinfo: null
    };

    var flick_txts = [
        '今から会える？',
        '会えないかな？',
        '今日会えないかな？',
        '明日、会える？',
        '今週、会える日ある？',
        '会おう！！',
        'なんか会いたくなってきたなあ。',
        '会える日ないかな？',
        '会える、会えないでいうと、どっち？',
        'いつ会える？',
        '会いたい',
        '会いたい！',
        '会いたいな・・・',
        '会ってみたいな',
        'いつだったら会える？',
        '会う？',
        '今すぐ、会いたい。',
        '会いたい！',
        '会ってみない？',
        '会いたくてしょうがない。',
        '会ってみようか？',
        '会ったら、どうなるかな？',
        'とりあえず、会おう！',
        'どこにいけば会える？',
        '会おうぞ！',
        '会いたい！会いたい！会いたい！',
        '会いたい！そればかり考えてる。',
        '会いたい気持ちばかり大きくなってきた・・・',
        '会ってみる？',
        '会わない？',
        '会ってみたら、どうなるんだろう。'
    ];
    
    var stamps = {
        '{stmp0001_01}': 'http://cache.img.gmo.jp/muscle2013/muscle_talk/images/stamp/stmp0001_01.png',
        '{stmp0001_02}': 'http://cache.img.gmo.jp/muscle2013/muscle_talk/images/stamp/stmp0001_02.png',
        '{stmp0001_03}': 'http://cache.img.gmo.jp/muscle2013/muscle_talk/images/stamp/stmp0001_03.png',
        '{stmp0001_04}': 'http://cache.img.gmo.jp/muscle2013/muscle_talk/images/stamp/stmp0001_04.png',
        '{stmp0001_05}': 'http://cache.img.gmo.jp/muscle2013/muscle_talk/images/stamp/stmp0001_05.png',
        '{stmp0001_06}': 'http://cache.img.gmo.jp/muscle2013/muscle_talk/images/stamp/stmp0001_06.png',
        '{stmp0001_07}': 'http://cache.img.gmo.jp/muscle2013/muscle_talk/images/stamp/stmp0001_07.png',
        '{stmp0001_08}': 'http://cache.img.gmo.jp/muscle2013/muscle_talk/images/stamp/stmp0001_08.png',
        '{stmp0001_09}': 'http://cache.img.gmo.jp/muscle2013/muscle_talk/images/stamp/stmp0001_09.png',
        '{stmp0002_01}': 'http://cache.img.gmo.jp/muscle2013/muscle_talk/images/stamp/stmp0002_01.png',
        '{stmp0002_02}': 'http://cache.img.gmo.jp/muscle2013/muscle_talk/images/stamp/stmp0002_02.png',
        '{stmp0002_03}': 'http://cache.img.gmo.jp/muscle2013/muscle_talk/images/stamp/stmp0002_03.png',
        '{stmp0002_04}': 'http://cache.img.gmo.jp/muscle2013/muscle_talk/images/stamp/stmp0002_04.png',
        '{stmp0002_05}': 'http://cache.img.gmo.jp/muscle2013/muscle_talk/images/stamp/stmp0002_05.png',
        '{stmp0002_06}': 'http://cache.img.gmo.jp/muscle2013/muscle_talk/images/stamp/stmp0002_06.png',
        '{stmp0002_07}': 'http://cache.img.gmo.jp/muscle2013/muscle_talk/images/stamp/stmp0002_07.png',
        '{stmp0002_08}': 'http://cache.img.gmo.jp/muscle2013/muscle_talk/images/stamp/stmp0002_08.png',
        '{stmp0003_01}': 'http://cache.img.gmo.jp/muscle2013/muscle_talk/images/stamp/stmp0003_01.png',
        '{stmp0003_02}': 'http://cache.img.gmo.jp/muscle2013/muscle_talk/images/stamp/stmp0003_02.png',
        '{stmp0003_03}': 'http://cache.img.gmo.jp/muscle2013/muscle_talk/images/stamp/stmp0003_03.png',
        '{stmp0003_04}': 'http://cache.img.gmo.jp/muscle2013/muscle_talk/images/stamp/stmp0003_04.png',
        '{stmp0003_05}': 'http://cache.img.gmo.jp/muscle2013/muscle_talk/images/stamp/stmp0003_05.png',
        '{stmp0003_06}': 'http://cache.img.gmo.jp/muscle2013/muscle_talk/images/stamp/stmp0003_06.png',
        '{stmp0003_07}': 'http://cache.img.gmo.jp/muscle2013/muscle_talk/images/stamp/stmp0003_07.png',
        '{stmp0003_08}': 'http://cache.img.gmo.jp/muscle2013/muscle_talk/images/stamp/stmp0003_08.png',
        '{stmp0003_09}': 'http://cache.img.gmo.jp/muscle2013/muscle_talk/images/stamp/stmp0003_09.png',
        '{stmp0004_01}': 'http://cache.img.gmo.jp/muscle2013/muscle_talk/images/stamp/stmp0004_01.png',
        '{stmp0004_02}': 'http://cache.img.gmo.jp/muscle2013/muscle_talk/images/stamp/stmp0004_02.png',
        '{stmp0004_03}': 'http://cache.img.gmo.jp/muscle2013/muscle_talk/images/stamp/stmp0004_03.png',
        '{stmp0004_04}': 'http://cache.img.gmo.jp/muscle2013/muscle_talk/images/stamp/stmp0004_04.png',
        '{stmp0004_05}': 'http://cache.img.gmo.jp/muscle2013/muscle_talk/images/stamp/stmp0004_05.png',
        '{stmp0004_06}': 'http://cache.img.gmo.jp/muscle2013/muscle_talk/images/stamp/stmp0004_06.png',
        '{stmp0004_07}': 'http://cache.img.gmo.jp/muscle2013/muscle_talk/images/stamp/stmp0004_07.png',
        '{stmp0004_08}': 'http://cache.img.gmo.jp/muscle2013/muscle_talk/images/stamp/stmp0004_08.png',
        '{stmp0005_01}': 'http://cache.img.gmo.jp/muscle2013/muscle_talk/images/stamp/stmp0005_01.png',
        '{stmp0005_02}': 'http://cache.img.gmo.jp/muscle2013/muscle_talk/images/stamp/stmp0005_02.png',
        '{stmp0005_03}': 'http://cache.img.gmo.jp/muscle2013/muscle_talk/images/stamp/stmp0005_03.png',
        '{stmp0005_04}': 'http://cache.img.gmo.jp/muscle2013/muscle_talk/images/stamp/stmp0005_04.png',
        '{stmp0005_05}': 'http://cache.img.gmo.jp/muscle2013/muscle_talk/images/stamp/stmp0005_05.png',
        '{stmp0005_06}': 'http://cache.img.gmo.jp/muscle2013/muscle_talk/images/stamp/stmp0005_06.png',
        '{stmp0005_07}': 'http://cache.img.gmo.jp/muscle2013/muscle_talk/images/stamp/stmp0005_07.png',
        '{stmp0005_08}': 'http://cache.img.gmo.jp/muscle2013/muscle_talk/images/stamp/stmp0005_08.png',
        '{stmp0006_01}': 'http://cache.img.gmo.jp/muscle2013/muscle_talk/images/stamp/stmp0006_01.png',
        '{stmp0006_02}': 'http://cache.img.gmo.jp/muscle2013/muscle_talk/images/stamp/stmp0006_02.png',
        '{stmp0006_03}': 'http://cache.img.gmo.jp/muscle2013/muscle_talk/images/stamp/stmp0006_03.png',
        '{stmp0006_04}': 'http://cache.img.gmo.jp/muscle2013/muscle_talk/images/stamp/stmp0006_04.png',
        '{stmp0006_05}': 'http://cache.img.gmo.jp/muscle2013/muscle_talk/images/stamp/stmp0006_05.png',
        '{stmp0006_06}': 'http://cache.img.gmo.jp/muscle2013/muscle_talk/images/stamp/stmp0006_06.png',
        '{stmp0006_07}': 'http://cache.img.gmo.jp/muscle2013/muscle_talk/images/stamp/stmp0006_07.png',
        '{stmp0007_01}': 'http://cache.img.gmo.jp/muscle2013/muscle_talk/images/stamp/stmp0007_01.png',
        '{stmp0007_02}': 'http://cache.img.gmo.jp/muscle2013/muscle_talk/images/stamp/stmp0007_02.png',
        '{stmp0007_03}': 'http://cache.img.gmo.jp/muscle2013/muscle_talk/images/stamp/stmp0007_03.png',
        '{stmp0007_04}': 'http://cache.img.gmo.jp/muscle2013/muscle_talk/images/stamp/stmp0007_04.png',
        '{stmp0007_05}': 'http://cache.img.gmo.jp/muscle2013/muscle_talk/images/stamp/stmp0007_05.png',
        '{stmp0007_06}': 'http://cache.img.gmo.jp/muscle2013/muscle_talk/images/stamp/stmp0007_06.png',
        '{stmp0007_07}': 'http://cache.img.gmo.jp/muscle2013/muscle_talk/images/stamp/stmp0007_07.png',
        '{stmp0007_08}': 'http://cache.img.gmo.jp/muscle2013/muscle_talk/images/stamp/stmp0007_08.png',
        '{stmp0008_01}': 'http://cache.img.gmo.jp/muscle2013/muscle_talk/images/stamp/stmp0008_01.png',
        '{stmp0008_02}': 'http://cache.img.gmo.jp/muscle2013/muscle_talk/images/stamp/stmp0008_02.png',
        '{stmp0008_03}': 'http://cache.img.gmo.jp/muscle2013/muscle_talk/images/stamp/stmp0008_03.png',
        '{stmp0008_04}': 'http://cache.img.gmo.jp/muscle2013/muscle_talk/images/stamp/stmp0008_04.png',
        '{stmp0008_05}': 'http://cache.img.gmo.jp/muscle2013/muscle_talk/images/stamp/stmp0008_05.png',
        '{stmp0008_06}': 'http://cache.img.gmo.jp/muscle2013/muscle_talk/images/stamp/stmp0008_06.png',
        '{stmp0008_07}': 'http://cache.img.gmo.jp/muscle2013/muscle_talk/images/stamp/stmp0008_07.png',
        '{stmp0008_08}': 'http://cache.img.gmo.jp/muscle2013/muscle_talk/images/stamp/stmp0008_08.png',
        '{stmp0008_09}': 'http://cache.img.gmo.jp/muscle2013/muscle_talk/images/stamp/stmp0008_09.png',
        '{stmp0008_10}': 'http://cache.img.gmo.jp/muscle2013/muscle_talk/images/stamp/stmp0008_10.png',
        '{stmp0009_01}': 'http://cache.img.gmo.jp/muscle2013/muscle_talk/images/stamp/stmp0009_01.png',
        '{stmp0009_02}': 'http://cache.img.gmo.jp/muscle2013/muscle_talk/images/stamp/stmp0009_02.png',
        '{stmp0009_03}': 'http://cache.img.gmo.jp/muscle2013/muscle_talk/images/stamp/stmp0009_03.png',
        '{stmp0009_04}': 'http://cache.img.gmo.jp/muscle2013/muscle_talk/images/stamp/stmp0009_04.png',
        '{stmp0009_05}': 'http://cache.img.gmo.jp/muscle2013/muscle_talk/images/stamp/stmp0009_05.png',
        '{stmp0010_01}': 'http://cache.img.gmo.jp/muscle2013/muscle_talk/images/stamp/stmp0010_01.png',
        '{stmp0010_02}': 'http://cache.img.gmo.jp/muscle2013/muscle_talk/images/stamp/stmp0010_02.png',
        '{stmp0010_03}': 'http://cache.img.gmo.jp/muscle2013/muscle_talk/images/stamp/stmp0010_03.png',
        '{stmp0010_04}': 'http://cache.img.gmo.jp/muscle2013/muscle_talk/images/stamp/stmp0010_04.png',
        '{stmp0010_05}': 'http://cache.img.gmo.jp/muscle2013/muscle_talk/images/stamp/stmp0010_05.png',
        '{stmp0010_06}': 'http://cache.img.gmo.jp/muscle2013/muscle_talk/images/stamp/stmp0010_06.png',
        '{stmp0011_01}': 'http://cache.img.gmo.jp/muscle2013/muscle_talk/images/stamp/stmp0011_01.png',
        '{stmp0011_02}': 'http://cache.img.gmo.jp/muscle2013/muscle_talk/images/stamp/stmp0011_02.png',
        '{stmp0011_03}': 'http://cache.img.gmo.jp/muscle2013/muscle_talk/images/stamp/stmp0011_03.png',
        '{stmp0011_04}': 'http://cache.img.gmo.jp/muscle2013/muscle_talk/images/stamp/stmp0011_04.png',
        '{stmp0011_05}': 'http://cache.img.gmo.jp/muscle2013/muscle_talk/images/stamp/stmp0011_05.png',
        '{stmp0011_06}': 'http://cache.img.gmo.jp/muscle2013/muscle_talk/images/stamp/stmp0011_06.png',
        '{stmp0011_07}': 'http://cache.img.gmo.jp/muscle2013/muscle_talk/images/stamp/stmp0011_07.png',
        '{stmp0011_08}': 'http://cache.img.gmo.jp/muscle2013/muscle_talk/images/stamp/stmp0011_08.png',
        '{stmp0012_01}': 'http://cache.img.gmo.jp/muscle2013/muscle_talk/images/stamp/stmp0012_01.png',
        '{stmp0012_02}': 'http://cache.img.gmo.jp/muscle2013/muscle_talk/images/stamp/stmp0012_02.png',
        '{stmp0012_03}': 'http://cache.img.gmo.jp/muscle2013/muscle_talk/images/stamp/stmp0012_03.png',
        '{stmp0012_04}': 'http://cache.img.gmo.jp/muscle2013/muscle_talk/images/stamp/stmp0012_04.png',
        '{stmp0012_05}': 'http://cache.img.gmo.jp/muscle2013/muscle_talk/images/stamp/stmp0012_05.png',
        '{stmp0012_06}': 'http://cache.img.gmo.jp/muscle2013/muscle_talk/images/stamp/stmp0012_06.png',
        '{stmp0012_07}': 'http://cache.img.gmo.jp/muscle2013/muscle_talk/images/stamp/stmp0012_07.png',
        '{stmp0012_08}': 'http://cache.img.gmo.jp/muscle2013/muscle_talk/images/stamp/stmp0012_08.png',
        '{stmp0012_09}': 'http://cache.img.gmo.jp/muscle2013/muscle_talk/images/stamp/stmp0012_09.png',
        '{stmp0012_10}': 'http://cache.img.gmo.jp/muscle2013/muscle_talk/images/stamp/stmp0012_10.png',
        '{stmp0013_01}': 'http://cache.img.gmo.jp/muscle2013/muscle_talk/images/stamp/stmp0013_01.png',
        '{stmp0013_02}': 'http://cache.img.gmo.jp/muscle2013/muscle_talk/images/stamp/stmp0013_02.png',
        '{stmp0013_03}': 'http://cache.img.gmo.jp/muscle2013/muscle_talk/images/stamp/stmp0013_03.png',
        '{stmp0013_04}': 'http://cache.img.gmo.jp/muscle2013/muscle_talk/images/stamp/stmp0013_04.png',
        '{stmp0013_05}': 'http://cache.img.gmo.jp/muscle2013/muscle_talk/images/stamp/stmp0013_05.png',
        '{stmp0013_06}': 'http://cache.img.gmo.jp/muscle2013/muscle_talk/images/stamp/stmp0013_06.png',
        '{stmp0013_07}': 'http://cache.img.gmo.jp/muscle2013/muscle_talk/images/stamp/stmp0013_07.png',
        '{stmp0013_08}': 'http://cache.img.gmo.jp/muscle2013/muscle_talk/images/stamp/stmp0013_08.png',
        '{stmp0013_09}': 'http://cache.img.gmo.jp/muscle2013/muscle_talk/images/stamp/stmp0013_09.png',
        '{stmp0013_10}': 'http://cache.img.gmo.jp/muscle2013/muscle_talk/images/stamp/stmp0013_10.png',
        '{stmp0015_01}': 'http://cache.img.gmo.jp/muscle2013/muscle_talk/images/stamp/stmp0015_01.png',
        '{stmp0015_02}': 'http://cache.img.gmo.jp/muscle2013/muscle_talk/images/stamp/stmp0015_02.png',
        '{stmp0015_03}': 'http://cache.img.gmo.jp/muscle2013/muscle_talk/images/stamp/stmp0015_03.png',
        '{stmp0015_04}': 'http://cache.img.gmo.jp/muscle2013/muscle_talk/images/stamp/stmp0015_04.png',
        '{stmp0015_05}': 'http://cache.img.gmo.jp/muscle2013/muscle_talk/images/stamp/stmp0015_05.png',
        '{stmp0015_06}': 'http://cache.img.gmo.jp/muscle2013/muscle_talk/images/stamp/stmp0015_06.png',
        '{stmp0015_07}': 'http://cache.img.gmo.jp/muscle2013/muscle_talk/images/stamp/stmp0015_07.png'
    };

    var util = {
        escapeHtml: function htmlEscape(str){
	          str = str.replace(/&/g,'&amp;');
	          str = str.replace(/>/g,'&gt;');
	          str = str.replace(/</g,'&lt;');
	          return str;
        }
    };
    
    var ev = {
        txt_message_focus: function() {
            var txt = $('#txt_message');
            if(txt.val() == '会話してみよう！') {
                txt.val('');
                txt.css('color', '#000');
            }
        },
        
        txt_message_blur: function() {
            var txt = $('#txt_message');
            if(txt.val() == '') {
                txt.css('color', '#999');
                txt.val('会話してみよう！');
            }
        },
        
        btn_talk: function() {
            var message = $('#txt_message').val();
            if(message != "") {
                talk.append_and_send(config.myinfo.name, config.myinfo.icon, message);
                $('#txt_message').val('');
            }
        },
        
        scroll_bottom: function() {
            $("#chatWindow").animate({ scrollTop: 99999 }, 0);
        },

        stamp_click: function(e) {
            var src = $(e.currentTarget).find('IMG').attr('data-original');
            if(src == undefined) return;
            for(stamp_id in stamps) {
                if(src.indexOf(stamps[stamp_id]) >= 0) {
                    talk.append_and_send(config.myinfo.name, config.myinfo.icon, stamp_id);
                }
            }
        },

        flick_click: function(e)
        {
            var p = Math.floor(Math.random() * flick_txts.length);
            var text = flick_txts[p];
            talk.append_and_send(config.myinfo.name, config.myinfo.icon, text);

	    var flicker = $(".flicker").slideUp(300);
        }
    };

    var polling = {
        // 一定間隔で会話を読み込むスレッド
        talk: function() {
            if(!polling.has_stop_interval()) {
                talk.new_messages();
                polling.start();
            }
        },

        start: function() {
            clearTimeout(config.polling_id);
            config.polling_id = setTimeout(polling.talk, config.polling_interval_talk);
        },

        // あまり新規発言がない場合はポーリングを停止
        has_stop_interval: function() {
            if(new Date().getTime() - config.last_request > config.polling_stop_interval)
                return true;
            else
                return false;
        }
    };
    
    var talk = {

        // 自分のアカウント情報を取得する
        update_myinfo: function() {
            $.post(config.backend_url, { c: 'myinfo' })
                .done(function(data) {
                    config.myinfo = data;
                    
                    // 会話を読み込み
                    talk.messages();

                    // 会話を一番下までスクロール
                    ev.scroll_bottom();

                    // ポーリング開始
                    polling.start();
                });
        },
        
        // 発言を追加する
        append: function(member, icon, message) {

            member = util.escapeHtml(member);
            icon = util.escapeHtml(icon);
            message = util.escapeHtml(message);
            
            // スタンプを置き換え
            var has_stamp = false;
            for(stamp_id in stamps) {
                if(message == stamp_id) {
		    has_stamp = true;
                    var img = $('<p><img /></p>');
                    img.find('IMG').attr('src', stamps[stamp_id]);
                    img.find('IMG').attr('height', '263px');
                    img.find('IMG').attr('width', '213px');
                    message = message.replace(stamp_id, img.html());
                }
            }

            // URLをリンク
	   if(!has_stamp) {
	          message = message.replace(/http[s]?:\/\/[a-z\.\-\/]+/g,
                                      function(m) {
                                          return ('<a href="' + m + '" target="_blank">' + m + '</a>');
                                      });
           } 

            var $m;
            if(member == config.myinfo.name) {
                $m = $('<div class="user"><p class="name">' + '</p><div class="talks"><p>' +  '</p></div><p class="thumb"><img src="" alt=""></p></div>');
            } else {
                $m = $('<div class="opponent"><p class="name">' + '</p><div class="talks"><p>' + '</p></div><p class="thumb"><img src="" alt=""></p></div>');
            }

            $m.find('.name').append(member);
            $m.find('.talks P').append(message);
            $m.find('.thumb IMG').attr('src', "http://cache.img.gmo.jp/muscle2013/muscle_talk/" + icon.replace('.png', '_s.png'));
            
            $("#messages").append($m);
            
            ev.scroll_bottom();
        },

        // 発言をバックエンドに送る
        send: function(txt) {
            $.post(config.backend_url, { c: 'talk', m: txt });
        },

        // 発言を追加してバックエンドに送る
        append_and_send: function(member, icon, message) {

            if(polling.has_stop_interval) {
                polling.start();
            }
            config.last_request = new Date().getTime();
            
            talk.append(member, icon, message);
            talk.send(message);
        },

        // 新規発言を取得して会話ウインドウにセット
        new_messages: function()
        {
            $.post(config.backend_url, { c: 'new_messages' })
            .done(talk._callback_append_messages);
        },

        // 全発言を取得して会話ウインドウにセット
        messages: function()
        {
            $.post(config.backend_url, { c: 'messages' })
            .done(talk._callback_append_messages);
        },

        // ajax の new_message や get_message の完了イベントハンドラ
        _callback_append_messages: function(data)
        {
            var i = -1;
            
            for(i in data) {
                talk.append(data[i].member.name,
                            data[i].member.icon,
                            data[i].text);
            }
            
            if(i != -1) 
                ev.scroll_bottom();
        }
    };
    
    $(function() {
        
        // イベントのセット 

        // 発言ボタン
        $('#btn_talk').click(ev.btn_talk);

        // 入力エリアで Enter
        $('#txt_message').keypress(function (e) {
            if ((e.which && e.which == 13) ||
                (e.keyCode && e.keyCode == 13)) {
                ev.btn_talk();
            }
        })
        .blur(ev.txt_message_blur)
        .focus(ev.txt_message_focus);
        ev.txt_message_blur();
        
        // スタンプクリック
        $(".stampBox A").click(ev.stamp_click);
        
        // フリック
        $("#mflick A").click(ev.flick_click);
        
        // 入力エリアの削除
        $('#btn_truncate').click(function() {
            $.post(config.backend_url, { c: 'truncate' });
        });

        // 最終発言時刻を更新
        config.last_request = new Date().getTime();
        
        // アバター情報を更新
        talk.update_myinfo();
    });
    
})(jQuery);

