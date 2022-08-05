function App(data){
    var me = this;

    var particle_status = data.particle;


    me.welcomeView;
    me.infoView;
    me.eigenschaftenView;
    me.galerieView;
    me.helpMeView;

    me.nav;
    me.farben;
    me.gallery;
    me.help_carousel;
    me.reset;

    var init = function(){
        initViews();
        initUI();
        rechteMausSperren()
    }

    var rechteMausSperren = function () {
        function taste (t) {
            if (!t)
                t = window.event;
            if ((t.type && t.type == "contextmenu") || (t.button && t.button == 2) || (t.which && t.which == 3)) {
                if (window.opera)
                    window.alert("Speichern nicht erlaubt.");
                return false;
            }
        }
        if (document.layers)
            document.captureEvents(Event.MOUSEDOWN);
            document.onmousedown = taste;
            document.oncontextmenu = taste;
    }

    var initUI = function () {
        me.nav = new Nav({app:me});
        me.farben = new Farben();
        me.gallery = new Gallery();
        me.help_carousel = new HelpCarousel({app:me});
        me.reset = new Reset({app:me});
    }

    var initViews = function(){
        $("#welcome-view").show();
        $("#informationen-view").hide();
        $("#eigenschaften-view").hide();
        $("#galerie-view").hide();
        $("#help-view").hide();
        // Schaltet Particle System an oder aus
        if (particle_status !== "on"){
            $(".particle_system").css("display", "none");
        }

        me.welcomeView = new WillkommenView({
            app: me,
            name:'welcome'
        });

        me.infoView = new InformationenView({
            app: me,
            name:'info'
        });

        me.eigenschaftenView = new EigenschaftenView({
            app: me,
            name:'eigenschaften'
        });

        me.galerieView = new GalerieView({
            app: me,
            name:'galerie'
        });

        me.helpMeView = new HelpMeView({
            app: me,
            name:'helpMe'
        });
    }

    init();

}
