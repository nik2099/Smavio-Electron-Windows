function Nav(data) {

    var me = this;

    var currentView, oldView;

    currentView = 'willkommen';

    var init = function () {
        initMenu();

    }

    // re-aktiviert die Maus-Interaktion
    me.enableNav = function () {
        $('.nav_bottom').css('pointer-events','');
    }

    // Reset zurück zu Willkommen-View
    me.resetView = function() {
        //Wenn bereits der Willkommen-View geöffnet ist, passiert nichts
        if(currentView =='willkommen'){

            // wenn gerade der HelpMeView offen ist
        }else if(currentView =='helpMe') {
            // Deaktiviert das Klicken der Navi
            $('.nav_bottom').css('pointer-events','none');

            // HelpView und die View darunter schließen
            me.closeView();
            me.closeView();

            currentView = 'willkommen';

            var tlWait = new TimelineMax();
            tlWait.delay(1);
            tlWait.call(startView);

            //Balken Reset
            var $this = jQuery('#willkommen'),
                offset = $this.offset(),

                offsetBody = jQuery('#nav').offset();

            TweenMax.to(jQuery('.nav_bottom .slide-line'), 0.45, {
                css:{
                    width: $this.outerWidth()/ document.documentElement.clientWidth *100 +'vw',
                    left: ((offset.left-offsetBody.left)/ document.documentElement.clientWidth *100)+'vw'
                },
                ease:Power2.easeInOut
            });

            //Farbe aktueller Menüpunkt - Reset
            $('#nav ul li a ').parent().parent().find( 'a.active' ).removeClass( 'active' );
            $('#willkommen' ).addClass( 'active' );
            var a =  $(".active").text();
            $(".current_Nav").text(a);


            // Wenn einer der anderen Views offen ist
        } else {
            // Deaktiviert das Klicken der Navi
            $('.nav_bottom').css('pointer-events','none');

            me.closeView();

            currentView = 'willkommen';

            var tlWait = new TimelineMax();
            tlWait.delay(1);
            tlWait.call(startView);

            //Balken Reset
            var $this = jQuery('#willkommen'),
                offset = $this.offset(),

                offsetBody = jQuery('#nav').offset();

            TweenMax.to(jQuery('.nav_bottom .slide-line'), 0.45, {
                css:{
                    width: $this.outerWidth()/ document.documentElement.clientWidth *100 +'vw',
                    left: ((offset.left-offsetBody.left)/ document.documentElement.clientWidth *100)+'vw'
                },
                ease:Power2.easeInOut
            });

            //Farbe aktueller Menüpunkt - Reset
                $('#nav ul li a ').parent().parent().find( 'a.active' ).removeClass( 'active' );
                $('#willkommen' ).addClass( 'active' );
                var a =  $(".active").text();
                $(".current_Nav").text(a);
        }
    }

    var initMenu = function () {
        // Sliding Line unter dem aktuellen Menü-Punkt
        jQuery('.nav_bottom').append('<li class="slide-line"></li>');
        jQuery('.nav_bottom .slide-line').css({left:31.971 + 'vw', width:6.90104 + 'vw'});

        // on click bewegt sie sich zum aktiven Menü-Punkt
        jQuery(document).on('click', '.nav_bottom li a', function () {

            var $this = jQuery(this),
                offset = $this.offset(),

                //find the offset of the wrapping div
                offsetBody = jQuery('#nav').offset();

            // GSAP animate to clicked menu item
            TweenMax.to(jQuery('.nav_bottom .slide-line'), 0.45, {
                css:{
                    width: $this.outerWidth()/ document.documentElement.clientWidth *100 +'vw',
                    left: ((offset.left-offsetBody.left)/ document.documentElement.clientWidth *100)+'vw'
                },
                ease:Power2.easeInOut
            });

            return false;
        });

        // Färbt aktuellen Nav Punkt ein
        $(function() {
            $( '#nav ul li a' ).on( 'click', function() {
                $( this ).parent().parent().find( 'a.active' ).removeClass( 'active' );
                $( this ).addClass( 'active' );
                var a =  $(".active").text();
                $(".current_Nav").text(a);
            });
        });

        // Click Events für Menu
        $("#willkommen").bind("click", function () {
            if(currentView =='willkommen'){

            } else {
                // Deaktiviert das Klicken der Navi
                $('.nav_bottom').css('pointer-events','none');

                me.closeView();

                currentView = 'willkommen';

                var tlWait = new TimelineMax();
                tlWait.delay(1);
                tlWait.call(startView);
            }
        });

        $("#informationen").bind("click", function () {
            if(currentView =='informationen'){

            } else {
                // Deaktiviert das Klicken der Navi
                $('.nav_bottom').css('pointer-events','none');

                me.closeView();

                currentView = 'informationen';

                var tlWait = new TimelineMax();
                tlWait.delay(1);
                tlWait.call(startView);
            }
        });

        $("#eigenschaften").bind("click", function () {
            if(currentView =='eigenschaften'){

            } else {
                // Deaktiviert das Klicken der Navi
                $('.nav_bottom').css('pointer-events','none');

                me.closeView();

                currentView = 'eigenschaften';

                var tlWait = new TimelineMax();
                tlWait.delay(1);
                tlWait.call(startView);
            }
        });

        $("#galerie").bind("click", function () {
            if(currentView =='galerie'){

            } else {
                // Deaktiviert das Klicken der Navi
                $('.nav_bottom').css('pointer-events','none');

                me.closeView();

                currentView = 'galerie';

                var tlWait = new TimelineMax();
                tlWait.delay(1);
                tlWait.call(startView);
            }
        });

        //Event Listener und Animation für eingeklappten EventListener
        $(".helpMeButton").bind("click", function () {
            //$(".helpMeButton").css({display:'none'});
            $('.helpMeButton').css('pointer-events','none');
            $(".helpMeButton2").css({display:'block'});

            TweenMax.set(".helpMeButton2", {
                scaleX:0.31,
                transformOrigin:"100% 100%"         // make transform origin be center for x and y axis
            });

            // Animation zum ausklappen der zweiten Button Variante
            var tl = new TimelineMax({onComplete:resetButtons});
            tl.to(".helpMeButton2",0.1,{scaleX:0.31})
            tl.set(".helpMeButton",{opacity:0})
            tl.set(".helpMeButton2",{opacity:1})
            tl.fromTo(".helpMeButton2",0.5,{scaleX:0.31},{scaleX:1})
              .to(".help_click1",1,{opacity:1})
              .to(".help_click1",1,{opacity:0})
              .to(".help_click2",1,{opacity:1})
              .to(".help_click2",1,{opacity:0})
              .to(".help_click1",1,{opacity:1})
              .to(".help_click1",1,{opacity:0})
              .fromTo(".helpMeButton2",0.5,{scaleX:1},{scaleX:0.31})
            tl.set(".helpMeButton2",{opacity:0})
            tl.set(".helpMeButton",{opacity:1});

        });

        // nach 3 Sukunden wird der HelpButton wieder zum ?
        var resetButtons = function() {
            $('.helpMeButton').css('pointer-events','');
            $(".helpMeButton2").css({
                opacity: '',
                transform: '',
                transformOrigin:''
            });
            $(".helpMeButton2").css({display:'none'});
        }

        // EventListener für ausgeklappten HelpButton
        $(".helpMeButton2").bind("click", function () {
            if(currentView == 'helpMe'){

            } else {
                $('.helpMeButton2').css('pointer-events','none');
                // Deaktiviert das Klicken der Navi
                $('.nav_bottom').css('pointer-events','none');


                data.app.helpMeView.startHelpMeView();
                oldView = currentView;
                // merke die View unter der HelpMeView
                currentView = 'helpMe';
            }
        });

    }

    // Hilfsfunktion zum öffnen des HelpView aus InfoView
    me.changeToHelp = function() {
        oldView = currentView;
        currentView = 'helpMe';
    }

    // startet die entsprechende View
    var startView = function () {
        if(currentView=='willkommen'){
            data.app.welcomeView.startWillkommenView();
        }
        if(currentView=='informationen') {
            data.app.infoView.startInformationenView();
        }
        if(currentView=='eigenschaften'){
            data.app.eigenschaftenView.startEigenschaftenView();
        }
        if(currentView=='galerie'){
            data.app.galerieView.startGalerieView();
        }
        if(currentView=='helpMe'){
            data.app.helpMeView.startHelpMeView();
        }
    }

    // schließt die entsprechende View
    me.closeView = function () {
        if(currentView=='willkommen'){
            data.app.welcomeView.closeWillkommenView();
        }
        if(currentView=='informationen') {
            data.app.infoView.closeInformationenView()
        }
        if(currentView=='eigenschaften'){
            data.app.eigenschaftenView.closeEigenschaftenView()
        }
        if(currentView=='galerie'){
            data.app.galerieView.closeGalerieView();
        }
        if(currentView=='helpMe'){
            data.app.helpMeView.closeHelpMeView();
            currentView = oldView;
        }
    }

    init();
}

