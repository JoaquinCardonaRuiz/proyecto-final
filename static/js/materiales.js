var costoCompleto = false;
var nombreCompleto = false;
var unidadCompleto = false;
var colorCompleto = false;
var del = false;
var mod = false;

function openAltaModal(){
    jQuery.noConflict();
    $("#colorInput").val("#" + (Math.random().toString(16) + "000000").slice(2, 8))
    $(".lds-ring").hide();
    $('#altaModal').modal('show');
    checkColorAlta();
}


function randomColorAlta(){
    $("#colorInput").val("#" + (Math.random().toString(16) + "000000").slice(2, 8));
    checkColorAlta();
}


function permiteAlta(){
    console.log(String(costoCompleto) + ", " + String(nombreCompleto) + ", " + String(unidadCompleto) + ", " + String(colorCompleto));
    if(costoCompleto && nombreCompleto && unidadCompleto && colorCompleto){
        document.getElementById("alta-btn").disabled = false;
    }else{
        document.getElementById("alta-btn").disabled = true;
    }
}

function submitForm(n){
    document.getElementById(n).submit();
}

function checkColorAlta(){
    var c = document.getElementById("colorInput").value;
    if(!c){
        document.getElementById("colorError").innerHTML = "Este campo debe ser completado";
        colorCompleto = false;
    }
    else if(c[0] != "#"){
        document.getElementById("colorError").innerHTML = "Formato Erróneo";
        colorCompleto = false;
    }
    else if(c.length != 7){
        document.getElementById("colorError").innerHTML = "Formato Erróneo";
        colorCompleto = false;
    }
    else{
        document.getElementById("colorError").innerHTML = "";
        document.getElementById("color-marker").style.color = c;
        colorCompleto = true;
    }
    permiteAlta();
}

function validaNuevoNombre(nombres){
    var n = document.getElementById("nombreInput").value;
    if(nombres.includes(n)){
        //Se comprueba regla RN21
        document.getElementById("nombreMatError").innerHTML = "* Ese nombre ya ha sido registrado.";
        nombreCompleto = false;
    }
    else if (!n){
        //Se comprueba regla RN22
        document.getElementById("nombreMatError").innerHTML = "* Este campo debe ser completado.";
        nombreCompleto = false;
    }
    else{
        nombreCompleto = true;
        document.getElementById("nombreMatError").innerHTML = "";
    }
    permiteAlta();
}



function validaUnidad(){
    var u = document.getElementById("unidadInput").value;
    if (!u){
        document.getElementById("unidadMatError").innerHTML = "* Este campo debe ser completado.";
        unidadCompleto = false;
    }
    else {
        document.getElementById("unidadMatError").innerHTML = "";
        unidadCompleto = true;
    }
    permiteAlta();
}


function calcularCosto(){
    var costoRec = Number(document.getElementById("crInput").value);
    if(costoRec==0 || isNaN(costoRec)){
        costoRec = 0;
        document.getElementById("costoRMatError").innerHTML = "El costo debe ser un número mayor a 0.";
        costoCompleto = false;
    }else{
        document.getElementById("costoRMatError").innerHTML = "";
        costoCompleto = true;
    }
    permiteAlta();
}


function alta_material(){
    $(".lds-ring div").css("border-color", "#95C22B transparent transparent transparent");
    $(".lds-ring").show().fadeIn(500);
    $("#row-to-hide-1").hide();
    $("#row-to-hide-2").hide();
    $('#alta-btn').prop('disabled', true);
    $('#secondary-btn').prop('disabled', true);
    submitForm('altaMaterialForm');
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
    "Estamos añadiendo el material...",
    "¡Casi listo! Últimos retoques"
].reverse();

var messagesEdit = [
    "Estamos actualizando el material...",
    "¡Casi listo! Últimos retoques"
].reverse();

var messagesBaja = [
    "Estamos eliminando el material...",
    "¡Casi listo! Últimos retoques"
].reverse();