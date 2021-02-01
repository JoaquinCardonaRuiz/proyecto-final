var pagina = 1;
var costoTotal = 0;
var pag1cargada = false;

function openAltaModal(){
    pagina = 1;
    jQuery.noConflict();
    document.getElementById("nombreArtError").innerHTML = "";
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
        if(pag1cargada){
            document.getElementById("primary-btn").disabled = false;
        }else{
            pag1cargada = true;
        }
        document.getElementById("primary-btn").innerHTML="Siguiente";
        document.getElementById("bottomAltaModalText").innerHTML="Una vez completados los datos, presione el botón \"Siguiente\".";
        $("#secondary-btn").show();
        $("#atras-btn").hide();
        $("#subheader-pag-1").fadeIn(400);
        $("#subheader-pag-2").hide();
        $("#row-pag-1-1").fadeIn(400);
        $("#row-pag-1-2").fadeIn(400);
        $("#row-pag-2-1").hide();
        $("#row-pag-2-2").hide();
        $("#row-pag-3-1").hide();
    }
    else if(pagina == 2){
        document.getElementById("primary-btn").innerHTML="Siguiente";
        document.getElementById("bottomAltaModalText").innerHTML="Costo Total: ARS $"+String(costoTotal);
        $("#secondary-btn").hide();
        $("#atras-btn").show();
        $("#subheader-pag-1").hide();
        $("#subheader-pag-2").fadeIn(400);
        $("#row-pag-1-1").hide();
        $("#row-pag-1-2").hide();
        $("#row-pag-2-1").fadeIn(400);
        $("#row-pag-2-2").fadeIn(400);
        $("#row-pag-3-1").hide();
        calcularCosto("");
    }
    else if(pagina == 3){
        document.getElementById("primary-btn").innerHTML="Crear Artículo";
        document.getElementById("bottomAltaModalText").innerHTML="Una vez completados los datos, presione el botón \"Crear Artículo\".";
        $("#secondary-btn").hide();
        $("#atras-btn").show();
        $("#subheader-pag-1").hide();
        $("#subheader-pag-2").fadeIn(400);
        $("#row-pag-1-1").hide();
        $("#row-pag-1-2").hide();
        $("#row-pag-2-1").hide();
        $("#row-pag-2-2").hide();
        $("#row-pag-3-1").fadeIn(400);
    }
}


function validaNuevoNombre(nombres){
    var n = document.getElementById("nombreInput").value;
    if(nombres.includes(n)){
        //Se comprueba regla RN17
        document.getElementById("nombreArtError").innerHTML = "* Ese nombre ya ha sido registrado.";
        document.getElementById("primary-btn").disabled = true;
    }
    else if (!n){
        //Se comprueba regla RN18
        document.getElementById("nombreArtError").innerHTML = "* Este campo debe ser completado.";
        document.getElementById("primary-btn").disabled = true;
    }
    else if(document.getElementById("nombreInput").value && document.getElementById("unidadInput").value){
        document.getElementById("unidadArtError").innerHTML = "";
        document.getElementById("nombreArtError").innerHTML = "";
        document.getElementById("primary-btn").disabled = false;
    }
}


function calcularCosto(input){
    var costoProd = Number(document.getElementById("cpInput").value);
    var costoIns = Number(document.getElementById("ciInput").value);
    var otrosCostos = Number(document.getElementById("ocInput").value);
    var costoAlt = Number(document.getElementById("coaInput").value);
    if(input=='prod'){
        if(costoProd==0 || isNaN(costoProd)){
            costoProd = 0;
            document.getElementById("costoPArtError").innerHTML = "El costo debe ser un número mayor a 0.";
        }else{
            document.getElementById("costoPArtError").innerHTML = "";
        }
    }
    if(input=='ins'){
        if(costoIns==0 || isNaN(costoIns)){
            costoIns = 0;
            document.getElementById("costoIArtError").innerHTML = "El costo debe ser un número mayor a 0.";
        }else{
            document.getElementById("costoIArtError").innerHTML = "";
        }
    }
    if(input=='otros'){
        if(otrosCostos==0 || isNaN(otrosCostos)){
            otrosCostos = 0;
            document.getElementById("costoOArtError").innerHTML = "El costo debe ser un número mayor a 0.";
        }else{
            document.getElementById("costoOArtError").innerHTML = "";
        }
    }
    if(input=='alt'){
        if(costoAlt==0 || isNaN(costoAlt)){
            costoAlt = 0;
            document.getElementById("costoOAArtError").innerHTML = "El costo debe ser un número mayor a 0.";
        }else{
            document.getElementById("costoOAArtError").innerHTML = "";
        }
    }
    // La logica de esto es una mierda porque esto lo chequée arriba ya, pero arriba solo lo chequée si es el caso correcto,
    // pero tengo que seguir haciendo eso para que no salten mensajes de error en todos apenas entras, porque estan todos vacíos, y devuelven 0
    if(isNaN(costoProd)){costoProd = 0;document.getElementById("costoPArtError").innerHTML = "El costo debe ser un número mayor a 0.";}
    if(isNaN(costoIns)){costoIns = 0;document.getElementById("costoIArtError").innerHTML = "El costo debe ser un número mayor a 0.";}
    if(isNaN(otrosCostos)){otrosCostos = 0;document.getElementById("costoOArtError").innerHTML = "El costo debe ser un número mayor a 0.";}
    if(isNaN(costoAlt)){costoAlt = 0;document.getElementById("costoOAArtError").innerHTML = "El costo debe ser un número mayor a 0.";}


    if(costoProd == 0 || costoIns == 0 || otrosCostos == 0 || costoAlt == 0){
        document.getElementById("primary-btn").disabled = true;
    }else{
        document.getElementById("primary-btn").disabled = false;
    }
    costoTotal = costoProd + costoIns + otrosCostos;
    document.getElementById("bottomAltaModalText").innerHTML="Costo Total: ARS $"+String(costoTotal);
}

function calcularValor(){
    var margen = Number(document.getElementById("margenInput").value);
    if(isNaN(margen) || margen==0){
        margen=0;
        document.getElementById("margenArtError").innerHTML = "El margen debe ser un número mayor a 0.";
        document.getElementById("primary-btn").disabled = true;
    }else{
        document.getElementById("primary-btn").disabled = false;
        document.getElementById("margenArtError").innerHTML = "";
    }
    document.getElementById("valorInput").value =  (costoTotal * (1+(margen/100))).toFixed(2);;
}

function validaUnidad(){
    var u = document.getElementById("unidadInput").value;
    if (!u){
        document.getElementById("unidadArtError").innerHTML = "* Este campo debe ser completado.";
        document.getElementById("primary-btn").disabled = true;
    }
    else if(document.getElementById("nombreInput").value && document.getElementById("unidadInput").value){
        document.getElementById("unidadArtError").innerHTML = "";
        document.getElementById("nombreArtError").innerHTML = "";
        document.getElementById("primary-btn").disabled = false;
    }
}