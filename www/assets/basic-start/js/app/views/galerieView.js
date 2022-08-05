function GalerieView(data){
    var me = this;

    var myName = data.name;

    var init  = function(){
    }

    // lässt die Galerie-View einfliegen bzw. starten
    me.startGalerieView = function(){
        $("#galerie-view").show();

        var imageGallery = $('.imagesGallery');
        var mainImage = $('.mainImage');
        var leftMenu = $('.left_menu');
        var rightMenu = $('.right_menu');

        var tl = new TimelineMax();
        tl.add(TweenMax.fromTo(imageGallery,0.5, {marginBottom:'-10vw'},{marginBottom:0, ease: Sine.easeInOut}));
        tl.add(TweenMax.fromTo(mainImage,0.5, {marginTop:'-85vh'},{marginTop:0, ease: Sine.easeInOut}));
        tl.add(TweenMax.fromTo(leftMenu,1, {alpha:0},{alpha:1, ease: Sine.easeInOut}));
        tl.add(TweenMax.fromTo(rightMenu,1, {alpha:0},{alpha:1, ease: Sine.easeInOut,onComplete:data.app.nav.enableNav}),1);
    }

    // lässt die Willkommen-View ausfliegen bzw. beendet die Animationen
    me.closeGalerieView = function () {
        var imageGallery = $('.imagesGallery');
        var mainImage = $('.mainImage');

        var tl2 = new TimelineMax();
        tl2.add(TweenMax.fromTo(imageGallery,0.5, {marginBottom:0},{marginBottom:'-10vw', ease: Sine.easeInOut}));
        tl2.add(TweenMax.fromTo(mainImage,0.5, {marginTop:0},{marginTop:'-85vh', ease: Sine.easeInOut, onComplete:hideGalerieView}),0);

    }

    // blendet die Galerie-View aus
    var hideGalerieView = function () {
        $('#galerie-view').hide();
        TweenMax.killChildTweensOf( document.getElementById("galerie-view"));
    }

    init();
}



