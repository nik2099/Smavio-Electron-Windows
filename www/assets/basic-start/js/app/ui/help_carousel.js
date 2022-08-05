function HelpCarousel (data) {

    var me = this;

    var wait1, wait2, wait3, wait4;

    var wait = false;

    var init = function () {
        helpClick();
    }

    var helpClick = function () {
        // Carousel aktivieren
        $('#cascade-slider').cascadeSlider({
            itemClass: 'cascade-slider_item',
            arrowClass: 'cascade-slider_arrow'
        });

        // Close Button in der HelpView
        $('.help_close').bind('click', function () {
            $('#help-view').css('pointer-events','none');
            data.app.nav.closeView();
        });

        // Ausgangswerte für Carousel setzen
        $('.prev div div.my-progress-bar').css({display:'none'});
        $('.now div div.my-progress-bar').css({display:'inline-block'});
        $('.next div div.my-progress-bar').css({display:'none'});

        var w = 0.0003 * (document.documentElement.clientWidth *100)
        $('.my-progress-bar').css({
            height: w+'px',
            width: w+'px'
        })

        $('.prev div div.miniText').css({display:'none'});
        $('.now div div.miniText').css({display:'block'});
        $('.next div div.miniText').css({display:'none'});

        $('.prev div div.clickDiv').css({display:'none'});
        $('.now div div.clickDiv').css({display:'block'});
        $('.next div div.clickDiv').css({display:'none'});

        $('.prev div div div img').css({display:'none'});
        $('.now div div div img').css({display:'block'});
        $('.next div div div img').css({display:'none'});

        // EventListener für Menüpunkte des Carousels
        $(".clickDiv").bind("click", function () {
            if (wait==true){
                // passiert nichts, da gerade Abspielpause
            }else if (wait==false){
                var soundEffect = $('.now div div div audio')[0];
                soundEffect.play();
                startProgressBar();
            }
        })

    }

    // startet die ProgressBar + die Text-Animationen
    var startProgressBar = function() {
        wait = true;
        var w = 0.0003 * (document.documentElement.clientWidth *100);
        var strokeW = 0.000015 * (document.documentElement.clientWidth *100);
        $('.now div div.my-progress-bar').radialProgress("init", {
            'size': w+'px',
            'fill': strokeW+'px',
            'text-color': "transparent",
            "background": "transparent",
            "color": "white"
        }).radialProgress("to", {'perc': 100, 'time': 15000});

       wait1 = $('.now div div div.wait1');
        wait2 = $('.now div div div.wait2');
        wait3 = $('.now div div div.wait3');
        wait4 = $('.now div div div.wait4');

        var tl = new TimelineMax({onComplete:function(){
            $('.now div div.my-progress-bar').css({display:'none'});
            $('.now div div.my-progress-bar div').remove('div');
            wait = false;
        }});

        tl.to(wait1,2,{opacity:1})
          .to(wait1,2,{opacity:0})
          .to(wait2,2,{opacity:1})
          .to(wait2,2,{opacity:0})
          .to(wait3,2,{opacity:1})
          .to(wait3,2,{opacity:0})
          .to(wait4,2,{opacity:1})
          .to(wait4,2,{opacity:0});
    }

    init();

}
