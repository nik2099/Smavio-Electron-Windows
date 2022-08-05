function Farben () {

        var init = function () {
            initFarben();
        }

        var initFarben = function() {
            // Click Events für Image Reihe
            $(".farbe1").click(function () {
                $('.mainFarbe').css('background-image', 'url(img/farbe1.jpg)');
            });

            $(".farbe2").click(function () {
                $('.mainFarbe').css('background-image', 'url(img/farbe2.jpg)');
            });

            $(".farbe3").click(function () {
                $('.mainFarbe').css('background-image', 'url(img/farbe3.jpg)');
            });

            $(".farbe4").click(function () {
                $('.mainFarbe').css('background-image', 'url(img/farbe4.jpg)');
            });

            $(".farbe5").click(function () {
                $('.mainFarbe').css('background-image', 'url(img/farbe5.jpg)');
            });

            $(".farbe6").click(function () {
                $('.mainFarbe').css('background-image', 'url(img/farbe6.jpg)');
            });

            $(".farbe7").click(function () {
                $('.mainFarbe').css('background-image', 'url(img/farbe7.jpg)');
            });

            $(".farbe8").click(function () {
                $('.mainFarbe').css('background-image', 'url(img/farbe8.jpg)');
            });
        }

        init();

}