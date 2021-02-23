$( window ).resize(function() {
    cambia_ancho_tarjetas();
    //alert($( window ).width());
});

function cambia_ancho_tarjetas(){
    if ($( window ).width() > 1440){
        $(".card-column").css({"max-width":"25%"});
    }
    else if (($( window ).width() > 578)){
        $(".card-column").css({"max-width":"33.33%"});
    }
    else{
        $(".card-column").css({"max-width":"100%"});
    }
}

function redirect(url){
    window.location.href = url;
}

cambia_ancho_tarjetas();