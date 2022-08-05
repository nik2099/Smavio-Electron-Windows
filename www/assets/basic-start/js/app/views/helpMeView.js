function HelpMeView(data) {
    var me = this;

    var myName = data.name;

    var barLeft, barMiddle, barRight, bubLeft, bubRight, textArea;

    var bubTimeout;

    var init = function () {

    }

    // Start-Animation für den HelpMe View
    me.startHelpMeView = function() {
         $("#help-view").show();

         barLeft = $('.helpBar1');
         barMiddle = $('.helpBar2');
         barRight = $('.helpBar3');
         bubLeft = $('.helpBubLeft');
         bubRight = $('.helpBubRight');
         textArea = $('.helpWrapper');

         var tl = new TimelineMax();
         tl.add(TweenMax.fromTo(barMiddle,0.5,{top: innerHeight-100},{top:0}));
         tl.add(TweenMax.fromTo(barLeft,0.5,{top: -innerHeight-100},{top:0}),0.5);
         tl.add(TweenMax.fromTo(barRight,0.5,{top: -innerHeight-100},{top:0}),0.5);
         tl.add(TweenMax.fromTo(bubLeft,0.5,{scale:0},{scale:9, ease: Bounce.easeOut}),1);
         tl.add(TweenMax.fromTo(bubRight,0.5,{scale:0},{scale:9, ease: Bounce.easeOut,onComplete:bubAnimation}),1);
         tl.add(TweenMax.fromTo(textArea,1.5,{alpha:0},{alpha:1}),1.5);
    }

    // startet die Wave-Animation der beiden Bubbles
    var bubAnimation = function () {
        bubTimeout = setTimeout(function () {
            bubLeft = $('.helpBubLeft');
            bubRight = $('.helpBubRight');

            TweenMax.fromTo(bubLeft,2,{scale:9},{scale:8, ease: Bounce.easeInOut, yoyo:true, repeat:-1, ease: Sine.easeInOut});
            TweenMax.fromTo(bubRight,2,{scale:9},{scale:8, ease: Bounce.easeInOut, yoyo:true, repeat:-1, ease: Sine.easeInOut});
        },500)
    }

    // Ausfliegen der HelpMe-View
    me.closeHelpMeView = function() {
        barLeft = $('.helpBar1');
        barMiddle = $('.helpBar2');
        barRight = $('.helpBar3');
        bubLeft = $('.helpBubLeft');
        bubRight = $('.helpBubRight');
        textArea = $('.helpWrapper');

        var tl = new TimelineMax();
        tl.add(TweenMax.fromTo(textArea,0.5,{alpha:1},{alpha:0}),0);
        tl.add(TweenMax.to(bubLeft,0.5,{scale:0}),0.5);
        tl.add(TweenMax.to(bubRight,0.5,{scale:0}),0.5);
        tl.add(TweenMax.fromTo(barMiddle,0.5,{top: 0},{top:innerHeight}),1);
        tl.add(TweenMax.fromTo(barLeft,0.5,{top: 0},{top:-innerHeight}),1);
        tl.add(TweenMax.fromTo(barRight,0.5,{top: 0},{top:-innerHeight,onComplete:hideHelpMeView}),1);

    }

    // Hilfsfunktion zum Beenden der HelpMeView
    var hideHelpMeView = function() {
        $("#help-view").hide();
        data.app.nav.enableNav();
        $('#help-view').css('pointer-events','');
        clearTimeout(bubTimeout);
        $('.helpMeButton2').css('pointer-events','');
    }

    init();

}