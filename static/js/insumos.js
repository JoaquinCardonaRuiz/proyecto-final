var costosCompleto = false;
var nombreCompleto = false;
var unidadCompleto = false;

function openAltaModal(){
    jQuery.noConflict();
    $(".lds-ring").hide();
    $('#altaModal').modal('show');
}

function submitForm(n){
    document.getElementById(n).submit();
}


function permiteAlta(){
    if(costosCompleto && nombreCompleto && unidadCompleto){
        document.getElementById("alta-btn").disabled = false;
    }else{
        document.getElementById("alta-btn").disabled = true;
    }
}

function validaNuevoNombre(nombres){
    var n = document.getElementById("nombreInput").value;
    if(nombres.includes(n)){
        //Se comprueba regla RN19
        document.getElementById("nombreInsError").innerHTML = "* Ese nombre ya ha sido registrado.";
        nombreCompleto = false;
    }
    else if (!n){
        //Se comprueba regla RN20
        document.getElementById("nombreInsError").innerHTML = "* Este campo debe ser completado.";
        nombreCompleto = false;
    }
    else{
        nombreCompleto = true;
        document.getElementById("nombreInsError").innerHTML = "";
    }
    permiteAlta();
}


function validaUnidad(){
    var u = document.getElementById("unidadInput").value;
    if(document.getElementById("nombreInput").value && document.getElementById("unidadInput").value){
        unidadCompleto = true;
    }
    if (!u){
        document.getElementById("unidadInsError").innerHTML = "* Este campo debe ser completado.";
        unidadCompleto = false;
    }
    else {
        document.getElementById("unidadInsError").innerHTML = "";
    }
    permiteAlta();
}


function calcularCosto(input){
    var costoProd = Number(document.getElementById("cpInput").value);
    var costoMat = Number(document.getElementById("cmInput").value);
    var otrosCostos = Number(document.getElementById("ocInput").value);
    if(input=='prod'){
        if(costoProd==0 || isNaN(costoProd)){
            costoProd = 0;
            document.getElementById("costoPInsError").innerHTML = "El costo debe ser un número mayor a 0.";
        }else{
            document.getElementById("costoPInsError").innerHTML = "";
        }
    }
    if(input=='mat'){
        if(costoMat==0 || isNaN(costoMat)){
            costoMat = 0;
            document.getElementById("costoMInsError").innerHTML = "El costo debe ser un número mayor a 0.";
        }else{
            document.getElementById("costoMInsError").innerHTML = "";
        }
    }
    if(input=='otros'){
        if(otrosCostos==0 || isNaN(otrosCostos)){
            otrosCostos = 0;
            document.getElementById("costoOInsError").innerHTML = "El costo debe ser un número mayor a 0.";
        }else{
            document.getElementById("costoOInsError").innerHTML = "";
        }
    }

    // La logica de esto es una mierda porque esto lo chequée arriba ya, pero arriba solo lo chequée si es el caso correcto,
    // pero tengo que seguir haciendo eso para que no salten mensajes de error en todos apenas entras, porque estan todos vacíos, y devuelven 0
    if(isNaN(costoProd)){costoProd = 0;document.getElementById("costoPArtError").innerHTML = "El costo debe ser un número mayor a 0.";}
    if(isNaN(costoMat)){costoMat = 0;document.getElementById("costoMInsError").innerHTML = "El costo debe ser un número mayor a 0.";}
    if(isNaN(otrosCostos)){otrosCostos = 0;document.getElementById("costoOInsError").innerHTML = "El costo debe ser un número mayor a 0.";}


    if(costoProd == 0 || costoMat == 0 || otrosCostos == 0){
        costosCompleto = false;
    }else{
        costosCompleto = true;
    }
    var costoTotal = costoProd + costoMat + otrosCostos;
    document.getElementById("cTotalLabel").innerHTML="Costo Total: ARS $"+String(costoTotal);
    permiteAlta();
}


function alta_insumo(){
    $(".lds-ring div").css("border-color", "#95C22B transparent transparent transparent");
    $(".lds-ring").show().fadeIn(500);
    $("#row-to-hide-1").hide();
    $("#row-to-hide-2").hide();
    $("#row-to-hide-3").hide();
    $('#alta-btn').prop('disabled', true);
    $('#secondary-btn').prop('disabled', true);
    submitForm('altaInsumoForm');
    nextMsgAlta();
}

function nextMsgAlta() {
    if (messagesAlta.length == 1) {
        $('#bottomAltaModalText').html(messagesAlta.pop()).fadeIn(500);

    } else {
        $('#bottomAltaModalText').html(messagesAlta.pop()).fadeIn(500).delay(10000).fadeOut(500, nextMsgAlta);

    }
}

function nextMsgEdit() {
    if (messagesEdit.length == 1) {
        $('#bottomAltaModalText').html(messagesEdit.pop()).fadeIn(500);

    } else {
        $('#bottomAltaModalText').html(messagesEdit.pop()).fadeIn(500).delay(10000).fadeOut(500, nextMsgEdit);

    }
}

function nextMsgBaja() {
    if (messagesBaja.length == 1) {
        $('#bottomBajaModalText').html(messagesBaja.pop()).fadeIn(500);

    } else {
        $('#bottomBajaModalText').html(messagesBaja.pop()).fadeIn(500).delay(10000).fadeOut(500, nextMsgBaja);
    }
};

var messagesAlta = [
    "Estamos añadiendo el insumo...",
    "¡Casi listo! Últimos retoques"
].reverse();

var messagesEdit = [
    "Estamos actualizando el insumo...",
    "¡Casi listo! Últimos retoques"
].reverse();

var messagesBaja = [
    "Estamos eliminando el insumo...",
    "¡Casi listo! Últimos retoques"
].reverse();