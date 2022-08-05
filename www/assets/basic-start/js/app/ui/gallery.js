function Gallery() {

    var startPosX,currentPosX;

    var init = function () {
        initGallery();
    }

    var initGallery = function() {
        // Setzt die Startwerte für die Zahlen Felder
        var maxZahl = document.getElementsByClassName("showImage");
        $('.nr_left').text('0' + maxZahl.length);

        var minZahl = 2;
        $('.nr_right').text('0' + minZahl);

        //SwipeAnimations
        $('#galerie-view').on('touchstart', function (event) {
            startPosX = event.touches[0].clientX;

        });

        $('#galerie-view').on('touchend', function (eve) {
            currentPosX = eve.changedTouches[0].clientX;

            if(startPosX < currentPosX){
                plusDivs(1);
                oldSlideIndex = slideIndex-2;
                plusOldDivs(1);
            }
            else if (startPosX > currentPosX) {
                plusDivs(-1);
                oldSlideIndex = slideIndex+2;
                minusOldDivs(-1);
            }
        });

        // Click Events für Pfeile
        $(".click_gallery_left").click(function () {
            plusDivs(-1);
            oldSlideIndex = slideIndex+2;
            minusOldDivs(-1);
        });

        $(".click_gallery_right").click(function () {
            plusDivs(1);
            oldSlideIndex = slideIndex-2;
            plusOldDivs(1);

        });

        var slideIndex = 1;
        var oldSlideIndex = 0;
        showDivs(slideIndex);
        showOldDivs(oldSlideIndex);

        // Slide Animation für das neu reinkommende Bild
        var plusDivs = function (n) {
            showDivs(slideIndex += n);
            currentImageBar()
            statusNrUnten();
            statusNrOben();
            var z = slideIndex;
            var x = document.getElementsByClassName("showImage");

            if (n<0) {
                TweenMax .fromTo(x[z+n],0.7, {right:'-65vw'}, {right:0});
                $('.images div').css({left: ''});
                $('.images div').css({right: ''});
            }

            if (n>0) {
                TweenMax .fromTo(x[z-n],0.7, {left:'-65vw'}, {left:0});
                $('.images div').css({left: ''});
                $('.images div').css({right: ''});
            }
        }

        // Slide Animation für das alte herausfahrende Bild bei weiter
        var plusOldDivs = function (n) {
            showOldDivs(oldSlideIndex += n);
            var z = oldSlideIndex;
            var x = document.getElementsByClassName("showOldImage");

            TweenMax .fromTo(x[z-n],0.7, {right:0}, {right:'-65vw'});

            $('.oldImage div').css({left: ''});
            $('.oldImage div').css({right: ''});
        }

        // Slide Animation für das alte herausfahrende Bild bei zurück
        var minusOldDivs = function (n) {
            showOldBackDivs(oldSlideIndex += n);
            var z = oldSlideIndex;
            var x = document.getElementsByClassName("showOldImage");

            TweenMax .fromTo(x[z+n],0.7, {left:0}, {left:'-65vw'});

            $('.oldImage div').css({left: ''});
            $('.oldImage div').css({right: ''});
        }

        // Klick auf kleines Bild aus der Galerie oben
        var currentDiv = function(n) {
            oldSlideIndex = slideIndex;
            showOldBackDivs(oldSlideIndex);
            currentOldDiv(oldSlideIndex);
            showDivs(slideIndex = n);
            statusNrUnten();
            statusNrOben();

            var z = slideIndex-1;
            var x = document.getElementsByClassName("showImage");

            TweenMax .fromTo(x[z],0.7, {left:'-65vw'}, {left:0});

            $('.images div').css({left: ''});
            $('.images div').css({right: ''});
        }

        var currentOldDiv = function (n) {
            var oldZ = n-1;
            var y = document.getElementsByClassName("showOldImage");

            TweenMax .fromTo(y[oldZ],0.7, {right:0}, {right:'-65vw'});

            $('.oldImage div').css({left: ''});
            $('.oldImage div').css({right: ''});

        }

        // zeigt das neue Bild
        function showDivs(n) {
            var i;
            var x = document.getElementsByClassName("showImage");
            if (n > x.length) {slideIndex = 1}
            if (n < 1) {slideIndex = x.length}
            for (i = 0; i < x.length; i++) {
                x[i].style.display = "none";
            }
            x[slideIndex-1].style.display = "block";
        }

        // zeigt das alte Bild bei weiter
        function showOldDivs(n) {
            var i;
            var x = document.getElementsByClassName("showOldImage");
            if (n > x.length) {oldSlideIndex = 1}
            if (n < 1) {oldSlideIndex = x.length}
            for (i = 0; i < x.length; i++) {
                x[i].style.display = "none";
            }
            x[oldSlideIndex-1].style.display = "block";
        }

        // zeigt das alte Bild bei zurück
        function showOldBackDivs(n) {
            var i;
            var x = document.getElementsByClassName("showOldImage");
            if (n > x.length) {oldSlideIndex = 1}
            if (n < 1) {oldSlideIndex = x.length}
            for (i = 0; i < x.length; i++) {
                x[i].style.display = "none";
            }
            x[oldSlideIndex-1].style.display = "block";
        }

        // Click Events für Image Reihe
        $(".slide1").click(function () {
            currentDiv(1);
            currentImageBar();
        });

        $(".slide2").click(function () {
            currentDiv(2);
            currentImageBar();
        });

        $(".slide3").click(function () {
            currentDiv(3);
            currentImageBar();
        });

        $(".slide4").click(function () {
            currentDiv(4);
            currentImageBar();
        });

        $(".slide5").click(function () {
            currentDiv(5);
            currentImageBar();
        });

        $(".slide6").click(function () {
            currentDiv(6);
            currentImageBar();
        });

        $(".slide7").click(function () {
            currentDiv(7);
            currentImageBar();
        });

        $(".slide8").click(function () {
            currentDiv(8);
            currentImageBar();
        });

        // Anzeige der Zahlen - unten
        var statusNrUnten = function () {
            var nrUnten = slideIndex;
            var maxWert = document.getElementsByClassName('showImage');
            if (nrUnten==maxWert.length){
                $(".nr_right").text('01');
            }else {
                $(".nr_right").text('0' + ((nrUnten) + 1));
            }
        }

        // Anzeige der Zahlen - oben
        var statusNrOben = function () {
            var nrOben = slideIndex;
            var maxWert = document.getElementsByClassName('showImage');
            if (nrOben==1){
                $(".nr_left").text('0'+ maxWert.length);
            }else {
                $(".nr_left").text('0' + ((nrOben) - 1));
            }
        }

        // Balken in ImageGallery über aktivem Bild
        var currentImageBar = function (){
            var z = slideIndex;
            var a = $( ".imagesGallery" ).find( 'div.activeImg' )
            TweenMax .fromTo(a,0.5, {bottom:'0.7vw'}, {bottom:0});

            $( ".imagesGallery" ).find( 'div.activeImg' ).removeClass( 'activeImg' );
            $( ".imagesGallery" ).find("div:nth-child(" + z + ")").addClass('activeImg');

            var b = $( ".imagesGallery" ).find( 'div.activeImg' )
            TweenMax .fromTo(b,0.5, {bottom:0}, {bottom:'0.7vw', ease: Sine.easeOut});
        }
    }

    init();

}


