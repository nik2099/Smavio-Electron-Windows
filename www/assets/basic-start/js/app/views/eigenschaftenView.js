function EigenschaftenView(data){
    var me = this;

    var myName = data.name;

    var stage, dragZoneLeft, dragZoneLeftStroke, dragZoneRight, dragZoneRightStroke, dragBubbleLeft, draggerLeft,
        dragBubbleRight, draggerRight, textRight, textLeft, mainBubble, plusLeft, plusRight, miniBubbleLeft, miniBubbleRight;

    var waveLeft, waveLeft2, waveRight, waveRight1, waveRight2, waveRight3, aniLeft, aniRight, aniRightMini,aniLeftMini, timelineLeft, timelineRight,growLeft,
        growRight, shrinkLeft, shrinkRight, moveLeft,moveRight;

    var startX, currentScrollPosition, paragraphLength;

    var aniBubbleTimeout,navLockTimeout;

    var touchInterval;

    var dragRight = false;
    var dragLeft = false;

    var startAnimations = false;

    var bigBubble = false;

    var radius=0.08*innerWidth;

    var init = function () {
        initView();
    }

    var initView = function () {
        // Erstellen des Canvas und seiner Elemente
        var canvas = document.querySelector('canvas');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        stage = new createjs.Stage("CanvasScreen");
        createjs.Touch.enable(stage);

        // DragZoneLeft
        dragZoneLeft = new createjs.Shape();
        dragZoneLeft.graphics.beginStroke("#000000").drawCircle(0, 0, radius/4);
        dragZoneLeft.x = innerWidth/10;
        dragZoneLeft.y = innerHeight/2;
        dragZoneLeft.scale = 0;
        stage.addChild(dragZoneLeft);

        // Plus in der linken Dragzone
        plusLeft = new createjs.Bitmap("img/plus2.png");
        plusLeft.scale = innerWidth/3250;
        plusLeft.x = innerWidth/10 -((58)*(innerWidth/3250)/2);
        plusLeft.y = innerHeight/2 -((58)*(innerWidth/3250)/2);
        plusLeft.alpha = 0;
        stage.addChild(plusLeft);

        // WaveCircleLeft
        dragZoneLeftStroke = new createjs.Shape();
        dragZoneLeftStroke.graphics.beginStroke("#000000").drawCircle(0, 0, radius/4);
        dragZoneLeftStroke.x = dragZoneLeft.x;
        dragZoneLeftStroke.y = dragZoneLeft.y;
        dragZoneLeftStroke.alpha = 0;
        stage.addChild(dragZoneLeftStroke);

        // MiniBubbleLeft
        miniBubbleLeft = new createjs.Shape();
        miniBubbleLeft.graphics.beginFill("#000000").drawCircle(0, 0, radius/2);
        miniBubbleLeft.x = dragZoneLeft.x;
        miniBubbleLeft.y = dragZoneLeft.y
        miniBubbleLeft.scale = 0.2;
        miniBubbleLeft.visible = false;
        stage.addChild(miniBubbleLeft);

        // DragZoneRight
        dragZoneRight = new createjs.Shape();
        dragZoneRight.graphics.beginStroke("#000000").drawCircle(0, 0, radius/4);
        dragZoneRight.x = innerWidth-innerWidth/10;
        dragZoneRight.y = innerHeight/2;
        dragZoneRight.scale = 0;
        stage.addChild(dragZoneRight);

        // Plus in der rechten Dragzone
        plusRight = new createjs.Bitmap("img/plus2.png");
        plusRight.scale = innerWidth/3250;
        plusRight.x = innerWidth-innerWidth/10 -((58)*(innerWidth/3250)/2);
        plusRight.y = innerHeight/2 -((58)*(innerWidth/3250)/2);
        plusRight.alpha = 0;
        stage.addChild(plusRight);

        // WaveCircleRight
        dragZoneRightStroke = new createjs.Shape();
        dragZoneRightStroke.graphics.beginStroke("#000000").drawCircle(0, 0, radius/4);
        dragZoneRightStroke.x = dragZoneRight.x;
        dragZoneRightStroke.y = dragZoneRight.y;
        dragZoneRightStroke.alpha = 0;
        stage.addChild(dragZoneRightStroke);

        // MiniBubbleRight
        miniBubbleRight = new createjs.Shape();
        miniBubbleRight.graphics.beginFill("#000000").drawCircle(0, 0, radius/2);
        miniBubbleRight.x = dragZoneRight.x;
        miniBubbleRight.y = dragZoneRight.y
        miniBubbleRight.scale = 0.2;
        miniBubbleRight.visible = false;
        stage.addChild(miniBubbleRight);

        // DragBubbleLeft
        dragBubbleLeft = new createjs.Shape();
        dragBubbleLeft.graphics.beginFill("#000000").drawCircle(0, 0, radius/4);
        dragBubbleLeft.x = innerWidth/2.2; //innerWidth/2.2;
        dragBubbleLeft.y = 0-radius; //innerHeight/2.5;

        // Drag Container Left
        draggerLeft = new createjs.Container();
        draggerLeft.addChild(dragBubbleLeft);
        stage.addChild(draggerLeft);

        // DragBubbleRight
        dragBubbleRight = new createjs.Shape();
        dragBubbleRight.graphics.beginFill("#000000").drawCircle(0, 0, radius/4);
        dragBubbleRight.x =  innerWidth/1.8; //innerWidth/1.8;
        dragBubbleRight.y = innerHeight+radius; //innerHeight/1.5;

        // Drag Container Right
        draggerRight = new createjs.Container();
        draggerRight.addChild(dragBubbleRight);
        stage.addChild(draggerRight);

        // Text Links
        textLeft = new createjs.DOMElement('leftText');
        textLeft.x = innerWidth/2.5;
        textLeft.y = innerHeight/4.2;
        textLeft.alpha = 0;
        stage.addChild(textLeft);

        // Text Rechts
        textRight = new createjs.DOMElement('rightText');
        textRight.x = innerWidth/2;
        textRight.y = innerHeight/1.4;
        textRight.alpha = 0;
        stage.addChild(textRight);

        //MainBubble
        mainBubble = new createjs.DOMElement('mainBubble');
        var bubWidth = $('#mainBubble').width();
        mainBubble.x = innerWidth/2 - (bubWidth/2); //innerWidth/3.3;
        mainBubble.y = innerHeight/2 - (bubWidth/2);    //innerHeight/11;
        stage.addChild(mainBubble);

        // Drag Events Left
        draggerLeft.on("pressmove", function(evt) {
            stage.setChildIndex(draggerLeft,10);

            // Interaktionen erst möglich, wenn die Animationen gestartet wurden
            if(startAnimations == true){
                if (dragRight == false) {
                    dragLeft = true;
                    // Bubble hört während Drag mit Animation auf und folgt dem Cursor
                     aniLeft.paused = true;
                     // createjs.Tween.removeTweens(dragBubbleLeft);

                    // shapeW - Breite der Kugel, hitW - Breite der Hitzone
                    var shapeW = radius, hitW = (radius/4)/2+radius;

                    evt.target.x = evt.stageX;
                    evt.target.y = evt.stageY;

                    // Text blendet sich während Drag aus
                    $('#leftText').fadeOut('fast');
                    $('#rightText').fadeOut('fast');
                }
            }
        });

        draggerLeft.on("click", function(evt) {
            if(startAnimations == true){
                // wird der Drag nich über der Dragzone abgeschlossen, wird die Dragzone wieder
                // schwarz-weiß und die Bubble springt zurück an ihren Platz
                dragZoneLeft.graphics.clear().beginStroke("#000000").drawCircle(0, 0, radius/4);


                evt.target.x = evt.stageX;
                evt.target.y = evt.stageY;

                // shapeW - Breite der Kugel, hitW - Breite der Hitzone
                var shapeW = radius, hitW = (radius/4)/2+radius;

                // wenn der Drag über der Dragzone beendet wird passiert folgendes:
                if (evt.target.x >= dragZoneLeft.x-shapeW && evt.target.x <= dragZoneLeft.x+hitW
                    && evt.target.y >= dragZoneLeft.y-shapeW && evt.target.y <= dragZoneLeft.y+hitW) {

                    // Stoppt die Ani der rechtebBubbles
                    createjs.Tween.removeTweens(dragBubbleRight);

                    createjs.Tween.removeTweens(dragBubbleLeft);

                    // stoppt die rechte Wave Animation
                    timelineRight.removeTween(waveRight);
                    timelineRight.removeTween(waveRight2);

                    // Snap für die linke Bubble
                    evt.target.x = dragZoneLeft.x;
                    evt.target.y = dragZoneLeft.y;
                    evt.target.scaleX = 0.3;
                    evt.target.scaleY = 0.3;

                    //blendet das linke Plus aus
                    plusLeft.visible = false;

                    // blendet die linke Dragzone aus
                    dragZoneRight.visible = false;
                    dragZoneRightStroke.visible = false;
                    plusRight.visible = false;

                    // blendet die linke Bubble aus
                    dragBubbleLeft.visible = false;

                    // startet die Animation der Mini Bubble in der Dragzone
                    loopLeftMini();

                    // mittlere Bubble in die Mitte und groß
                    growBubbleRight();


                } else {
                    // Snap zurück zur Startposition
                    createjs.Tween.get(evt.target)
                        .to({x:innerWidth/2.2, y:innerHeight/2.3}, 300, createjs.Ease.bounceOut);

                    // Animation der linken Bubble wieder starten
                    aniLeft.paused = false;

                    //Text wieder einblenden
                    $('#leftText').fadeIn('fast');
                    $('#rightText').fadeIn('fast');

                    dragLeft = false;
                }
            }
        });

        // Drag Events Right
        draggerRight.on("pressmove", function(evt) {
            stage.setChildIndex(draggerLeft,8);
            if(startAnimations == true){
                if(dragLeft == false){
                    dragRight = true;
                    // Bubble hört während Drag mit Animation auf und folgt dem Cursor
                     aniRight.paused = true;
                   // createjs.Tween.removeTweens(dragBubbleRight);

                    // shapeW - Breite der Kugel, hitW - Breite der Hitzone
                    var shapeW = radius, hitW = (radius/4)/2+radius;

                    evt.target.x = evt.stageX;
                    evt.target.y = evt.stageY;

                    // Text blendet sich während Drag aus
                    $('#leftText').fadeOut('fast');
                    $('#rightText').fadeOut('fast');
                }

            }
        });


        draggerRight.on("click", function(evt) {
            if(startAnimations ==true){
                // wird der Drag nich über der Dragzone abgeschlossen, wird die Dragzone wieder
                // schwarz-weiß und die Bubble springt zurück an ihren Platz
                dragZoneRight.graphics.clear().beginStroke("#000000").drawCircle(0, 0, radius/4);

                evt.target.x = evt.stageX;
                evt.target.y = evt.stageY;

                // shapeW - Breite der Kugel, hitW - Breite der Hitzone
                var shapeW = radius, hitW = (radius/4)/2+radius;

                // wenn der Drag über der Dragzone beendet wird passiert folgendes:
                if (evt.target.x >= dragZoneRight.x-shapeW && evt.target.x <= dragZoneRight.x+hitW
                    && evt.target.y >= dragZoneRight.y-shapeW && evt.target.y <= dragZoneRight.y+hitW) {

                    // Stoppt die Ani der rechtebBubbles
                    createjs.Tween.removeTweens(dragBubbleRight);
                    // Stoppt die Ani der linken Bubbles
                    createjs.Tween.removeTweens(dragBubbleLeft);

                    // stoppt die linke Wave Animation
                    timelineLeft.removeTween(waveLeft);
                    timelineLeft.removeTween(waveLeft2);

                    // Snap für die rechte Bubble
                    evt.target.x = dragZoneRight.x;
                    evt.target.y = dragZoneRight.y;
                    evt.target.scaleX = 0.2;
                    evt.target.scaleY = 0.2;

                    //blendet das rechte Plus aus
                    plusRight.visible = false;

                    // blendet die linke Dragzone aus
                    dragZoneLeft.visible = false;
                    dragZoneLeftStroke.visible = false;
                    plusLeft.visible = false;

                    // blendet die  DragBubbles aus
                    dragBubbleRight.visible = false;

                    // startet die Animation der Mini Bubble in der Dragzone
                    loopRightMini();

                    // mittlere Bubble in die Mitte und groß
                    growBubbleLeft();

                } else {
                    // Snap zurück zur Startposition
                    createjs.Tween.get(evt.target)
                        .to({x:innerWidth/1.8, y:innerHeight/1.7}, 300, createjs.Ease.bounceOut);

                    // Start der Bubble Animation
                    aniRight.paused = false;

                    //Text wieder einblenden
                    $('#leftText').fadeIn('fast');
                    $('#rightText').fadeIn('fast');

                    dragRight = false;
                }
            }
        });

        //Action Listener für den Close Button
        $(".eigenschaften_bubble_close").bind('click', function () {
            // Deaktiviert das Klicken der Navi
            $('.nav_bottom').css('pointer-events','none');

            // Text-Bubble ausblenden
            $(".eigenschaften_bubble_main").css({
                display: "none"
            });
            $(".eigenschaften_bubble_close").fadeOut("slow").css({
                display: "none"
            });
            $(".eigenschaften_text").fadeOut("slow").css({
                display: "none"
            });


            // Wenn die rechte Bubble gedragt wurde
            if (dragRight == true) {
                // Dragzone einblenden
                dragBubbleLeft.visible = true;
                dragZoneLeft.visible = true;
                dragZoneLeftStroke.visible = true;
                plusLeft.visible = true;

                //blendet das rechte Plus ein
                plusRight.visible = true;

                //Animationen wieder starten
                timelineLeft.addTween(waveLeft, waveLeft2);

                // blendet die rechte Bubble ein
                dragBubbleRight.visible = true;

                // Animation der kleinen Bubble in der Dragzone deaktivieren
                miniBubbleRight.visible = false;
                aniRightMini.paused = true;

                // Texte wieder einblenden
                $('#leftText').fadeIn('fast');
                $('#rightText').fadeIn('fast');

                // Text Bubble ausblenden
                shrinkBubbleLeft();

                // geSnapte Bubble wieder an Startposition
                moveRightBubbleBack();

                //Interval stoppen
                clearInterval(touchInterval);
            }
            // Wenn die linke Bubble gedragt wurde
            if(dragLeft == true) {
                // Dragzone einblenden
                dragBubbleRight.visible = true;
                dragZoneRight.visible = true;
                dragZoneRightStroke.visible = true;
                plusRight.visible = true;

                //blendet das linke Plus ein
                plusLeft.visible = true;

                // schaltet die Wave Animation wieder ein
                timelineRight.addTween(waveRight, waveRight2);

                // blendet die linke Bubble ein
                dragBubbleLeft.visible = true;

                // Animation der kleinen Bubble in der Dragzone deaktivieren
                miniBubbleLeft.visible = false;
                aniLeftMini.paused = true;

                // Texte wieder einblenden
                $('#leftText').fadeIn('fast');
                $('#rightText').fadeIn('fast');

                // Text Bubble ausblenden
                shrinkBubbleRight();

                // geSnapte Bubble wieder an Startposition
                moveLeftBubbleBack();

                //Interval stoppen
                clearInterval(touchInterval);
            }

            dragRight = false;
            dragLeft = false;
            bigBubble = false;
        })

        createjs.Ticker.on("tick", stage);
        createjs.Ticker.framerate = 60;
    }

    var startWaveAnimations = function() {
        // DragZoneAnimationen
        // Left Wave
        waveLeftZone();
        //Right Wave
        waveRightZone();
    }

    var waveRightZone = function () {
        dragZoneRightStroke.alpha = 1; //0
        dragZoneRightStroke.scale = 1; //0.25

        // WaveRight
        timelineRight = new createjs.Timeline({loop:-1}); //create the Timeline
        timelineRight.addTween(waveRight = createjs.Tween.get(dragZoneRightStroke)
            .to({scaleX: 1.75, scaleY: 1.75}, 1000));
        timelineRight.addTween(waveRight2 = createjs.Tween.get(dragZoneRightStroke)
            .to({alpha:0},  2500, createjs.Ease.quintOut));
        timelineRight.addTween(createjs.Tween.get(dragZoneRightStroke).wait(4000));
    }

    var waveLeftZone = function () {
        dragZoneLeftStroke.alpha = 1;
        dragZoneLeftStroke.scale = 1;

        // WaveLeft
        timelineLeft = new createjs.Timeline({loop:-1}); //create the Timeline
        timelineLeft.addTween(waveLeft = createjs.Tween.get(dragZoneLeftStroke)
            .to({scaleX: 1.75, scaleY: 1.75}, 1000));
        timelineLeft.addTween(waveLeft2 = createjs.Tween.get(dragZoneLeftStroke)
            .to({alpha: 0}, 2500, createjs.Ease.quintOut));
        timelineLeft.addTween(createjs.Tween.get(dragZoneLeftStroke).wait(4000));
    }

    // DragBubbleAnimationen
    var startBubbleAnimation = function() {
        // Animation Left
        aniBubbleLeft();
        // Animation Right
        aniBubbleTimeout = setTimeout(function () {
            aniBubbleRight();
            startAnimations = true;
        },1500)
    }

    var aniBubbleLeft = function () {
        $('#eigenschaften-view').css('pointer-events','');
        dragBubbleLeft.scale = 1;
        aniLeft = createjs.Tween.get(dragBubbleLeft,{override:true})
            .to({scaleX: 3, scaleY: 3}, 1500, createjs.Ease.quintOut)
            .to({scaleX: 1, scaleY: 1}, 1500, createjs.Ease.quintOut)
            .call(aniBubbleLeft);
    }

    var aniBubbleRight = function () {
        $('#eigenschaften-view').css('pointer-events','');
        dragBubbleRight.scale = 1;
        aniRight = createjs.Tween.get(dragBubbleRight,{override:true})
            .to({scaleX: 3, scaleY: 3}, 1500, createjs.Ease.quintOut)
            .to({scaleX: 1, scaleY: 1}, 1500, createjs.Ease.quintOut)
            .call(aniBubbleRight);
    }

    // loop-Schleife für rechte MiniBubble in Dragzone
    var loopRightMini = function() {
        miniBubbleRight.visible = true;
        aniRightMini = createjs.Tween.get(miniBubbleRight) //dragBubbleRight?
            .wait(1000)
            .to({scaleX: 0.3, scaleY: 0.3}, 1000, createjs.Ease.quintOut)
            .wait(1000)
            .to({scaleX: 0.2, scaleY: 0.2}, 1000, createjs.Ease.quintOut)
            .wait(1000)
            .call(loopRightMini);
    }

    // loop-Schleife für linke MiniBubble in Dragzone
    var loopLeftMini = function() {
        miniBubbleLeft.visible = true;
        aniLeftMini = createjs.Tween.get(miniBubbleLeft)
            .wait(1000)
            .to({scaleX: 0.3, scaleY: 0.3}, 1000, createjs.Ease.quintOut)
            .wait(1000)
            .to({scaleX: 0.2, scaleY: 0.2}, 1000, createjs.Ease.quintOut)
            .wait(1000)
            .call(loopLeftMini);
    }

    // lässt die linke Bubble zur MainBubble werden
    var growBubbleLeft = function () {
        $('#eigenschaften-view').css('pointer-events','none');
        //Variable für das Close Verhalten
        bigBubble = true;

        // NiceScroll aktivieren
        $(".eigenschaften_text").niceScroll().hide();

        growLeft = createjs.Tween.get(dragBubbleLeft)
            .to({x: innerWidth/2, y: innerHeight/2}, 500, createjs.Ease.quintOut)
            .to({scaleX:10.5, scaleY: 10.5}, 500, createjs.Ease.quintOut)
            .call(function () {
                $(".eigenschaften_bubble_main").css({
                    display: "block"
                });
                $(".eigenschaften_bubble_close").fadeIn("slow").css({
                    display: "block"
                });
                $(".eigenschaften_text").fadeIn("slow").css({
                    display: "block"
                });

                dragBubbleLeft.visible = false;

                BigBubbleView();

                var scroll;

                if($(".eigenschaften_text").height() > paragraphLength) {
                    scroll = false;
                } else{
                    scroll = true;
                }

                if(scroll==true){
                    // langer Text, Scrollbar wird automatisch geladen
                } else {
                    // kurzer Text, daher keine Scrollbar erforderlich
                    $(".eig_scroll_down").css({display:'none'});
                    $(".eig_scroll_up").css({display:'none'});
                    $('.eigenschaften_text').css({cursor:'default'});
                }

                // Text an den Anfang scrollen
                $(".eigenschaften_text").getNiceScroll(0).doScrollTop(0);

                $('#eigenschaften-view').css('pointer-events','');

            });
    }

    // lässt die rechte Bubble zur MainBubble werden
    var growBubbleRight = function () {
        $('#eigenschaften-view').css('pointer-events','none');

        //Variable für das Close Verhalten
        bigBubble = true;

        // NiceScroll aktivieren
        $(".eigenschaften_text").niceScroll().hide();

        growRight = createjs.Tween.get(dragBubbleRight)
            .to({x: innerWidth/2, y: innerHeight/2}, 500, createjs.Ease.quintOut)
            .to({scaleX: 10.5, scaleY: 10.5}, 500, createjs.Ease.quintOut)
            .call(function () {
                $(".eigenschaften_bubble_main").css({
                    display: "block"
                });
                $(".eigenschaften_bubble_close").fadeIn("slow").css({
                    display: "block"
                });
                $(".eigenschaften_text").fadeIn("slow").css({
                    display: "block"
                });
                dragBubbleRight.visible = false;

                BigBubbleView();

                var scroll;

                if($(".eigenschaften_text").height() > paragraphLength) {
                    scroll = false;
                } else{
                    scroll = true;
                }

                if(scroll==true){
                    // langer Text, Scrollbar wird automatisch geladen
                } else {
                    // kurzer Text, daher keine Scrollbar erforderlich
                    $(".eig_scroll_down").css({display:'none'});
                    $(".eig_scroll_up").css({display:'none'});
                    $('.eigenschaften_text').css({cursor:'default'});
                }

                // Text an den Anfang scrollen
                $(".eigenschaften_text").getNiceScroll(0).doScrollTop(0);

                $('#eigenschaften-view').css('pointer-events','');
            });
    }

    // View für die große TextBubble
    var BigBubbleView = function () {
        startX = 0;
        var maxX = 1;
        var anzahlParagraph =  $(".eigenschaften_text").children(0).children().length;

        paragraphLength = 0;

        for (var i = 1; i<=anzahlParagraph; i++){
            paragraphLength = paragraphLength +  $(".paragraph"+[i]).outerHeight(true);

        }

        // 'Down' kann geklickt werden, bis man am Ende des Textes angekommen ist
        $(".eig_scroll_down").bind("click", function () {
            if(startX<maxX) {
                startX = startX + 50;

                $(".eigenschaften_text").animate({scrollTop:(startX)},'500');

                var divHeight = ($('.eigenschaften_text').height());
                maxX = paragraphLength-divHeight/2;

            }

        });

        // 'Up' kann geklickt werden, bis man am Anfang des Textes angekommen ist
        $(".eig_scroll_up").bind("click", function () {
            if (startX>0) {
                startX = startX - 50;
                $(".eigenschaften_text").animate({scrollTop:(startX)},'500');
            }
        });

        touchInterval = setInterval(function(){
            currentScrollPosition = $(".eigenschaften_text").scrollTop();
            startX = currentScrollPosition;
        }, 500);
    }

    // lässt die linke MainBubble wieder schrumpfen
    var shrinkBubbleLeft = function () {
        shrinkLeft = createjs.Tween.get(dragBubbleLeft)
            .to({scaleX: 1, scaleY: 1}, 500, createjs.Ease.quintOut)
            .to({x: innerWidth/2.2, y: innerHeight/2.3}, 500, createjs.Ease.quintOut)
            .call(aniBubbleLeft);

        navLockTimeout = setTimeout(function() {
            data.app.nav.enableNav();
        },3500);
    }

    // lässt die rechte MainBubble wieder schrumpfen
    var shrinkBubbleRight = function () {
        shrinkRight = createjs.Tween.get(dragBubbleRight)
            .to({scaleX: 1, scaleY: 1}, 500, createjs.Ease.quintOut)
            .to({x: innerWidth/1.8, y: innerHeight/1.7}, 500, createjs.Ease.quintOut)
            .call(aniBubbleRight);

        navLockTimeout = setTimeout(function() {
            data.app.nav.enableNav();
        },3500);

    }

    // bewegt die rechte geSnapte Bubble wieder zum Startpunkt
    var moveRightBubbleBack = function () {
        $('#eigenschaften-view').css('pointer-events','none');
        moveRight = createjs.Tween.get(dragBubbleRight)
            .to({scaleX: 1, scaleY: 1}, 500, createjs.Ease.quintOut)
            .to({x: innerWidth/1.8, y: innerHeight/1.7}, 500, createjs.Ease.quintOut)
            .wait(1500)
            .call(aniBubbleRight);
    }

    // bewegt die rechte geSnapte Bubble wieder zum Startpunkt
    var moveLeftBubbleBack  = function () {
        $('#eigenschaften-view').css('pointer-events','none');
        moveLeft = createjs.Tween.get(dragBubbleLeft)
            .to({scaleX: 1, scaleY: 1}, 500, createjs.Ease.quintOut)
            .to({x: innerWidth/2.2, y: innerHeight/2.3}, 500, createjs.Ease.quintOut)
            .wait(1500)
            .call(aniBubbleLeft);
    }

    // lässt die Eigenschaften-View einfliegen bzw. starten
    me.startEigenschaftenView = function() {

        $("#eigenschaften-view").show();

        dragZoneLeft.scale = 0;
        dragZoneLeft.visible = true;
        dragZoneLeft.x = innerWidth/10;
        dragZoneLeft.y = innerHeight/2;

        plusLeft.alpha = 0;
        plusLeft.visible = true;

        dragZoneLeftStroke.alpha = 0;
        dragZoneLeftStroke.visible = true;
        dragZoneLeftStroke.x = dragZoneLeft.x;
        dragZoneLeftStroke.y = dragZoneLeft.y;
        dragZoneLeftStroke.scale = 1;

        miniBubbleLeft.x = dragZoneLeft.x;
        miniBubbleLeft.y = dragZoneLeft.y;
        miniBubbleLeft.visible = false;

        dragBubbleLeft.x = innerWidth/2.2;
        dragBubbleLeft.y = 0-radius;
        dragBubbleLeft.scale = 1;
        dragBubbleLeft.visible = true;

        dragZoneRight.scale = 0;
        dragZoneRight.visible = true;
        dragZoneRight.x = innerWidth-innerWidth/10;
        dragZoneRight.y = innerHeight/2;

        plusRight.alpha = 0;
        plusRight.visible = true;

        dragZoneRightStroke.alpha = 0;
        dragZoneRightStroke.visible = true;
        dragZoneRightStroke.x = dragZoneRight.x;
        dragZoneRightStroke.y = dragZoneRight.y;
        dragZoneRightStroke.scale = 1;

        miniBubbleRight.x = dragZoneRight.x;
        miniBubbleRight.y = dragZoneRight.y;
        miniBubbleRight.visible = false;

        dragBubbleRight.x =  innerWidth/1.8;
        dragBubbleRight.y = innerHeight+radius;
        dragBubbleRight.scale = 1;
        dragBubbleRight.visible = true;

        $('#leftText').css({display: 'block'});
        $('#rightText').css({display: 'block'});

        startBubbleAnimation();

        // startView Animation
        var startTimeline = new createjs.Timeline();
        startTimeline.addTween(createjs.Tween.get(dragBubbleLeft).to({x:innerWidth/2.2, y:innerHeight/2.3}, 300));
        startTimeline.addTween(createjs.Tween.get(dragBubbleRight).wait(250).to({x:innerWidth/1.8, y: innerHeight/1.7}, 300));
        startTimeline.addTween(createjs.Tween.get(dragZoneLeft).wait(500).to({scale:1}, 750, createjs.Ease.bounceOut));
        startTimeline.addTween(createjs.Tween.get(dragZoneRight).wait(500).to({scale:1}, 750, createjs.Ease.bounceOut).wait(500).call(startWaveAnimations));
        startTimeline.addTween(createjs.Tween.get(textLeft).wait(1000).to({alpha:1}, 750));
        startTimeline.addTween(createjs.Tween.get(textRight).wait(1000).to({alpha:1}, 750));
        startTimeline.addTween(createjs.Tween.get(plusLeft).wait(1000).to({alpha:1}, 750));
        startTimeline.addTween(createjs.Tween.get(plusRight).wait(1000).to({alpha:1}, 750).call(data.app.nav.enableNav));
    }

    // lässt die Eigenschaften-View ausfliegen bzw. beendet die Animationen
    me.closeEigenschaftenView = function() {
        // wenn die Große Bubble geschlossen ist
        if (bigBubble==false){
            $(".eigenschaften_bubble_main").css({
                display: "none"
            });

            textLeft.alpha = 0;
            textRight.alpha = 0;
            plusLeft.alpha =0;
            plusRight.alpha = 0;

            var stopTimeline = new createjs.Timeline();
            stopTimeline.addTween(createjs.Tween.get(dragBubbleLeft).to({y:0-radius}, 500));
            stopTimeline.addTween(createjs.Tween.get(dragBubbleRight).to({y: innerHeight+radius}, 500));
            stopTimeline.addTween(createjs.Tween.get(dragZoneLeft).to({scale:0}, 500, createjs.Ease.bounceOut));
            stopTimeline.addTween(createjs.Tween.get(dragZoneLeftStroke).to({scale:0}, 500, createjs.Ease.sineOut));
            stopTimeline.addTween(createjs.Tween.get(dragZoneRightStroke).to({scale:0}, 500, createjs.Ease.sineOut));
            stopTimeline.addTween(createjs.Tween.get(dragZoneRight).to({scale:0}, 500, createjs.Ease.bounceOut).wait(500).call(hideEigenschaftenView));
        }
        // wenn die Große Bubble geöffnet ist
        else if (bigBubble==true){
            // Text-Bubble ausblenden
            $(".eigenschaften_bubble_main").css({
                display: "none"
            });
            $(".eigenschaften_bubble_close").fadeOut("slow").css({
                display: "none"
            });
            $(".eigenschaften_text").fadeOut("slow").css({
                display: "none"
            });

            if(dragLeft==true){
                dragBubbleRight.visible = true;

                textLeft.alpha = 0;
                textRight.alpha = 0;
                plusLeft.alpha =0;
                plusRight.alpha = 0;


                createjs.Tween.get(dragBubbleRight)
                    .to({y:0-radius*3}, 500);

                createjs.Tween.get(dragZoneLeft)
                    .to({x:0-radius}, 500);

                createjs.Tween.get(dragZoneLeftStroke)
                    .to({x:0-radius}, 500);

                createjs.Tween.get(miniBubbleLeft)
                    .to({x:0-radius}, 500)
                    .call(hideEigenschaftenView);


            }else if (dragRight==true){
                dragBubbleLeft.visible = true;

                textLeft.alpha = 0;
                textRight.alpha = 0;
                plusLeft.alpha =0;
                plusRight.alpha = 0;

                createjs.Tween.get(dragBubbleLeft)
                    .to({y:0-radius*3}, 500);

                createjs.Tween.get(dragZoneRight)
                    .to({x:innerWidth+radius}, 500);

                createjs.Tween.get(dragZoneRightStroke)
                    .to({x:innerWidth+radius}, 500);

                createjs.Tween.get(miniBubbleRight)
                    .to({x:innerWidth+radius}, 500)
                    .call(hideEigenschaftenView);

            }
        }
    }

    // blendet die Eigenchaften-View aus
    var hideEigenschaftenView = function () {
        $('#eigenschaften-view').hide();
        stopEigenschaftenAnimations();
        clearTimeout(aniBubbleTimeout);
        clearTimeout(navLockTimeout);
        clearInterval(touchInterval);
        dragLeft = false;
        dragRight = false;
        bigBubble = false;
    }

    //beendet alle Tweens
    var stopEigenschaftenAnimations = function(){
        startAnimations = false;
        createjs.Tween.removeAllTweens();
        TweenMax.killChildTweensOf( document.getElementById("eigenschaften-view"));
    }


    init();
}



