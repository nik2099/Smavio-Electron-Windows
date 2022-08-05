function Reset (data) {
    var me = this;

    var resetIntervall, countIntervall;
    var currentResetNr = 0;
    var nrCount = 0;

    var init = function() {
        nrCounter();
        resetFunction();
        checkInteraction();
    }

    // Setzt den Zähler zurück, wenn es eine Interaktion gab
    var checkInteraction = function() {
        $(document).on('click touchstart', function() {
            currentResetNr = 0;
        })
    }

    //Kösst nach 3 Minuten des Reset des Views aus
    var resetFunction = function() {
        resetIntervall = setInterval(function(){
            nrCount = currentResetNr;
            if (nrCount==180){
                data.app.nav.resetView();
                currentResetNr = 0;
            }
        }, 1000);}

    // Zählt jede Sekunde die Zählvaribale hoch
    var nrCounter = function() {
        countIntervall = setInterval(function() {
            currentResetNr = currentResetNr + 1;
        },1000);
    }

    init();
}
