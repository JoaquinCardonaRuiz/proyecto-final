var pagina = 1;

function openAltaModal(){
    pagina = 1;
    jQuery.noConflict();
    $(".lds-ring").hide();
    $('#altaModal').modal('show');
    cargar_pagina();
}

function pasar_pagina(n){
    pagina += n;
    cargar_pagina();
}

function cargar_pagina(){
    if(pagina == 1){
        document.getElementById("primary-btn").innerHTML="Siguiente";
        
        $("#secondary-btn").show();
        $("#atras-btn").hide();
        $("nombreArtError").innerHTML="";
        $("unidadArtError").innerHTML="";
        $("#subheader-pag-1").fadeIn(400);
        $("#subheader-pag-2").hide();
        $("#row-pag-1-1").fadeIn(400);
        $("#row-pag-1-2").fadeIn(400);
        $("#row-pag-2-1").hide();
        $("#row-pag-2-2").hide();
    }
    else if(pagina == 2){
        document.getElementById("primary-btn").innerHTML="Crear Artículo";
        $("#secondary-btn").hide();
        $("#atras-btn").show();
        document.getElementById("nombreArtError").innerHTML="";
        document.getElementById("unidadArtError").innerHTML="";
        $("#subheader-pag-1").hide();
        $("#subheader-pag-2").fadeIn(400);
        $("#row-pag-1-1").hide();
        $("#row-pag-1-2").hide();
        $("#row-pag-2-1").fadeIn(400);
        $("#row-pag-2-2").fadeIn(400);
    }
    else if(pagina == 3){

    }
}