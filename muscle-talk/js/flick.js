/*
(function($) {

    var config = {
        panel_width: "50px",
        messages: [
            '機嫌いいね',
            'どうしたの？今日',
            '気にしてないよ～',
            'もういいって、すぐ謝る癖やめなよ',
            '気にしてないよ～',
            'もういいって、すぐ謝る癖やめなよ',
            'ほんとにそう思ってる？',
            'わかったわかった',
            'その～・・・えーっと・・・',
            'う～ん・・・・',
            'わかったわかった笑',
            'むしろ好都合',
            'まあ、アリかな',
            'どうした！テンションたかいなー',
            'わかった、ちょっとまってな',
            '今は無理！',
            'もう少し仲良くなったらでいい？',
            'しょうがないな～1分ちょうだい'            
        ]
    };
    
    var init = {
        panel: function() {
            var panel = $("#mflick A").mousedown(events.panel_click);
        },

        popup: function() {
            var panel = $("#mflick_popup");
            panel.click(null, events.popup_mouseout);

            $('#mflick_popup A').click(function() {
                setTimeout(events.popup_click, 100);
            }, function() {});
        }
    };
    
    var events = {
        panel_click: function(e) {
            var p = Math.floor(Math.random() * (config.messages.length - 1));
            
            $('#talk').append(config.messages[p] + "\n");
            
            events.popup_mouseout();
        },


        popup_mouseout: function() {
            $("#mflick_popup").css('display', 'none');
        }
    };

    $(function() {
        // for(var i = 1; i < 4; i++) {
        //     init.panel(i);
        // }
        init.popup();
    });


})(jQuery);
*/