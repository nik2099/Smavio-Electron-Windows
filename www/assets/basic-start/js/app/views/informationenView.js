function InformationenView(data){
    var me = this;

    var myName = data.name;

    var videoTimeout;

    var playVideo;

    var x;

    var scrollInterval, scrollPosition;

    var init  = function(){
        initInfo();
    }

    var initInfo = function () {
        // Scroll-Funktion für das Textfeld
        x = 0;
        var maxX = 1;
        // 'Down' kann geklickt werden, bis man am Ende des Textes angekommen ist
        $(".scroll_down").bind("click", function () {
            if(x<maxX) {
                x = x + 50;

                $(".infoText").animate({scrollTop:(x)},'500');

                var divHeight = ($('.infoText div').height());
                maxX = ($('.infoParagraph').height())-divHeight;
            }
        });

        // 'Up' kann geklickt werden, bis man am Anfang des Textes angekommen ist
        $(".scroll_up").bind("click", function () {
            if (x>0) {
                x = x - 50;
                $(".infoText").animate({scrollTop:(x)},'500');
            }
        });

        scrollInterval = setInterval(function(){
            scrollPosition = $(".infoText").scrollTop();
            x = scrollPosition;
        }, 500);

        $(".infoButton").bind("click", function () {
            data.app.helpMeView.startHelpMeView();
            data.app.nav.changeToHelp();
            $('.helpMeButton2').css('pointer-events','none');
        });

    }

    // Start die Walking Shoes Animation
    var startVideo = function () {
        // guck, ob Videos verfügbar sind
        if(!document.getElementById("vLeft")&&!document.getElementById("vright")){
            console.log('nix da');
        }else {
            console.log('play');
            // Random Funktion, welches Video abgespielt wird
            playVideo = (Math.floor(Math.random() * (2 - 1 + 1)) + 1);

            if(playVideo==1) {
                videoLeft();
            }

            if(playVideo==2) {
                videoRight();
            }
        }

    }

    // Startet das Video auf der linken Seite, wenn vorhanden
    var videoLeft = function () {
        if(!document.getElementById("vLeft")){
            var waitTime = (Math.floor(Math.random() * (8 - 3 + 1)) + 3);
            videoTimeout = setTimeout(function () {
                startVideo();
            }, waitTime * 1000);
        } else {
            // Random Video Position links
            var videoplay = document.getElementById("vLeft");
            var minXLeft = 0 + ($('.infoVideoLeft').width() / 2);
            var maxXLeft = (30 / 100 * document.documentElement.clientWidth) - $('.infoVideoLeft').width();
            var minYLeft = 0 + ($('.infoVideoLeft').height() / 2);
            var maxYLeft = innerHeight - ($('.infoVideoLeft').height() / 2);
            var startXLeft = Math.random() * (maxXLeft - minXLeft) + minXLeft;
            var startYLeft = Math.random() * (maxYLeft - minYLeft) + minYLeft;
            var rotateLeft = Math.random() * (90 - (-90)) + (-90);

            $('.infoVideoLeft').css({
                transform: 'rotate(' + rotateLeft + 'deg)',
                left: startXLeft,
                top: startYLeft,
                display: 'block'
            });

            videoplay.currentTime = 0;
            try{
                videoplay.play();
            } catch (e) {

            }
            videoplay.onended = function () {
                $('.infoVideoLeft').css({
                    display: 'none',
                    left:'',
                    right:''
                });
                var waitTime = (Math.floor(Math.random() * (8 - 3 + 1)) + 3);
                videoTimeout = setTimeout(function () {
                    startVideo();
                }, waitTime * 1000);
            };
        }
    }

    // startet das Video auf der rechten Seite, wenn vorhanden
    var videoRight = function () {
        if(!document.getElementById("vRight")){
            var waitTime = (Math.floor(Math.random() * (8 - 3 + 1)) + 3);
            videoTimeout = setTimeout(function () {
                startVideo();
            }, waitTime * 1000);
        } else {
            // Random Video Position rechts
            var videoRplay = document.getElementById("vRight");
            var minXRight = 0 + ($('.infoVideoRight').width() / 2);
            var maxXRight = (30 / 100 * document.documentElement.clientWidth) - $('.infoVideoRight').width();
            var minYRight = 0 + ($('.infoVideoRight').height() / 2);
            var maxYRight = innerHeight - ($('.infoVideoRight').height() / 2);
            var startXRight = Math.random() * (maxXRight - minXRight) + minXRight;
            var startYRight = Math.random() * (maxYRight - minYRight) + minYRight;
            var rotateRight = Math.random() * (90 - (-90)) + (-90);

            $('.infoVideoRight').css({
                transform: 'rotate(' + rotateRight + 'deg)',
                right: startXRight,
                top: startYRight,
                display: 'block'
            });

            videoRplay.currentTime = 0;
            try{
                videoRplay.play();
            } catch (e) {

            }
            videoRplay.onended = function () {
                $('.infoVideoRight').css({
                    display: 'none',
                    left:'',
                    right:''
                });

                var waitTime = (Math.floor(Math.random() * (10 - 5 + 1)) + 5);
                videoTimeout = setTimeout(function () {
                    startVideo();
                }, waitTime * 1000);
            };
        }
    }

    // lässt die Informationen-View einfliegen bzw. starten
    me.startInformationenView = function() {
        //Pfeie nur sichtbar, wenn der Text auch scrollbar seinen muss
        $(document).ready(function() {
            // Länge des Kästchens
            var divHeight = ($('.infoText div').height());

            //Länge des Textes
            var textHeight = ($('.infoParagraph').height());

            if(textHeight > divHeight){
                // langer Text, Scrollbar wird automatisch geladen
            } else {
                // kurzer Text, daher keine Scrollbar erforderlich
                $(".scroll_down").css({display:'none'});
                $(".scroll_up").css({display:'none'});
                $('.infoText div').css({cursor:'default'});
            }
        });

        $("#informationen-view").show();

        // NiceScroll aktivieren
        $(".infoText").niceScroll();

        // Text an den Anfang scrollen
        $(".infoText").getNiceScroll(0).doScrollTop(0);

        // Start-Animation für die Informationen-Seite
        var left = $('.infoLeft');
        var right = $('.infoRight');

        var tlWillkommenStart = new TimelineMax();
        tlWillkommenStart.add(TweenMax.fromTo(left,0.5, {top:-innerHeight},{top:0, ease: Sine.easeInOut}));
        tlWillkommenStart.add(TweenMax.fromTo(right,0.5, {bottom:-innerHeight},{bottom:0, ease: Sine.easeInOut, onComplete:startInfomationenFunctions}),0.25);
    }

    // startet die Animationen der Informationen-View
    var startInfomationenFunctions = function () {
        data.app.nav.enableNav();

        videoTimeout = setTimeout(function () {
            startVideo();
        }, 3000)
    }

    // lässt die Informationen-View ausfliegen bzw. beendet die Animationen
    me.closeInformationenView = function() {
        clearTimeout(videoTimeout);
        clearInterval(scrollInterval);

        // Video unsichtbar + stop
        $('.infoVideoRight').css({
            display: 'none'
        });

        $('.infoVideoLeft').css({
            display: 'none'
        });

        // check ob Video vorhanden
        if(!document.getElementById("vLeft")){

        } else {
            var videoplay = document.getElementById("vLeft");
            try{
                videoplay.pause();
            } catch (e) {

            }
        }

        // check ob Video vorhanden
        if(!document.getElementById("vRight")){

        } else {
            var videoRplay = document.getElementById("vRight");
            try {
                videoRplay.pause();
            } catch (e) {

            }
        }


        // Close-Animation für die Informationen-Seite
        var left = $('.infoLeft');
        var right = $('.infoRight');

        TweenMax.fromTo(left,0.5, {top:0},{top:-innerHeight, ease: Sine.easeInOut});
        TweenMax.fromTo(right,0.5, {bottom:0},{bottom:-innerHeight, ease: Sine.easeInOut, onComplete:endInformationenFunctions});

    }

    // beendet die Animationen der Information-View
    var endInformationenFunctions = function () {
        var left = $('.infoLeft');
        var right = $('.infoRight');

        TweenMax.killTweensOf(left);
        TweenMax.killTweensOf(right);

        hideInformationenView();
    }

    // blendet die Informationen-View aus
    var hideInformationenView = function () {
        $('#informationen-view').hide();
        TweenMax.killChildTweensOf( document.getElementById("informationen-view"));
    }

    init();

}

