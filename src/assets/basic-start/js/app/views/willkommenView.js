function WillkommenView(data){
    var me = this;

    var myName = data.name;

    var init  = function(){
        initView();
    }

    var initView = function () {
        startWelcomeVideo();
        startBackgroundTextAnimation();
    }

    // lässt die Willkommen-View einfliegen bzw. starten
    me.startWillkommenView = function(){
        $("#welcome-view").show();

        startWelcomeVideo();

        var left = $('.welcomeLeft');
        var right = $('.welcomeRight');
        var bigName = $('.bigName');

        $('.bigName').css({color: 'black'});

        var divWidth = ($('.bigName').width());

        var tlWillkommenStart = new TimelineMax();
        tlWillkommenStart.add(TweenMax.fromTo(left,0.5, {top:-innerHeight},{top:0, ease: Sine.easeInOut}));
        tlWillkommenStart.add(TweenMax.fromTo(right,0.5, {bottom:-innerHeight},{bottom:0, ease: Sine.easeInOut}),0.5);
        tlWillkommenStart.add(TweenMax.to(bigName,0.5, {x:0-divWidth/2}),0.5);
        //startBackgroundTextAnimation mit folgendem Screen
        tlWillkommenStart.add(TweenMax.fromTo(bigName, divWidth/150, {x:0-(divWidth/2)},{x:innerWidth-(divWidth/2), repeat:-1, yoyo:true, ease: Linear.easeInOut}),0.5);
        tlWillkommenStart.add(TweenMax.fromTo(bigName,0.5, {alpha:0},{alpha:1, ease: Sine.easeInOut,onComplete:startWillkommenFunctions}),1);
    }

    // lässt die Willkommen-View ausfliegen bzw. beendet die Animationen
    me.closeWillkommenView = function(){
        var bigName = $('.bigName');
        var left = $('.welcomeLeft');
        var right = $('.welcomeRight');

        TweenMax.fromTo(bigName,0.1, {alpha:1},{alpha:0, ease: Sine.easeInOut});
        TweenMax.fromTo(left,0.5, {top:0},{top:-innerHeight, ease: Sine.easeInOut});
        TweenMax.fromTo(right,0.5, {bottom:0},{bottom:-innerHeight, ease: Sine.easeInOut,onComplete:endWillkommenFunctions});
    }

    // startet die Animationen der Willkommen-View
    var startWillkommenFunctions = function () {
        data.app.nav.enableNav();
    }

    // startet das Video auf der Willkommen-View
    var startWelcomeVideo = function () {
        // wenn es kein Video gibt
        if(!document.getElementById("vWelcome")){

        } else {
            var videoWelcome = document.getElementById("vWelcome");
            videoWelcome.currentTime = 0;
            try {
                videoWelcome.play();
            }  catch (e) {

            }
            videoWelcome.loop = true;
        }
    }

    // startet die Animation des großen Textes im Hintergrund der Willkommen-View
    var startBackgroundTextAnimation = function () {
        var text = $(".welcomeMainTitle").text();
        var bigName = $('.bigName');
        $('.bigName div p').text(text);
        var divWidth = ($('.bubbles').width());

        TweenMax.fromTo(bigName, 10, {x:0-(divWidth/2)},{x:innerWidth-(divWidth/2), repeat:-1, yoyo:true, ease: Linear.easeInOut});
        // Bubble Animation
        jQuery(document).ready(function($){

            // Define a blank array for the effect positions. This will be populated based on width of the title.
            var bArray = [];
            // Define a size array, this will be used to vary bubble sizes
            var bubbleSize = 0.00001*(document.documentElement.clientWidth *100);
            var sArray = [10*bubbleSize,20*bubbleSize,30*bubbleSize,40*bubbleSize];

            // Push the header width values to bArray
            for (var i = 0; i < $('.bubbles').width(); i++) {
                bArray.push(i);
            }

            // Function to select random array element
            // Used within the setInterval a few times
            function randomValue(arr) {
                return arr[Math.floor(Math.random() * arr.length)];
            }

            // setInterval function used to create new bubble every 350 milliseconds
            setInterval(function(){
                // Get a random size, defined as variable so it can be used for both width and height
                var size = randomValue(sArray);


                // New bubble appeneded to div with it's size and left position being set inline
                // Left value is set through getting a random value from bArray
                $('.bubbles').append('<div class="individual-bubble" style="left: ' + randomValue(bArray) + 'px; width: ' + size + 'px; height:' + size + 'px; display: none"></div>');
                // Animate each bubble to the top (bottom 100%) and reduce opacity as it moves
                // Callback function used to remove finsihed animations from the page

                //$('.individual-bubble').fadeIn(2000, function () {
                    $('.individual-bubble').fadeIn(400).animate({
                            'bottom': '100%',
                            'opacity' : '-=1'
                        }, 3000, function(){
                            $(this).remove()
                        }
                    );
            }, 350);
        });
    }

    // beendet die Animationen der Willkommen-View
    var endWillkommenFunctions = function () {
        // wenn es kein Video gibt
        if(!document.getElementById("vWelcome")){

        } else {
            // beendet das Video
            var videoWelcome = document.getElementById("vWelcome");
            try{
                videoWelcome.pause();
            }  catch (e) {

            }
        }
        // beendet die TweenMax Animationen
        var left = $('.welcomeLeft');
        var right = $('.welcomeRight');
        var bigName = $('.bigName');
        TweenMax.killTweensOf(left);
        TweenMax.killTweensOf(right);
        TweenMax.killTweensOf(bigName);

        // blendet die View aus
        hideWillkommenView();
    }

    // blendet die Willkommen-View aus
    var hideWillkommenView = function () {
        $('#welcome-view').hide();
        TweenMax.killChildTweensOf( document.getElementById("welcome-view"));
    }

    init();
}







