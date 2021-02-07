var costosCompleto = false;
var nombreCompleto = false;
var unidadCompleto = false;
var costosCompletoMod = false;
var nombreCompletoMod = false;
var unidadCompletoMod = false;
var nombreOriginal = "";
var del = false;
var mod = false;

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
    if (!u){
        document.getElementById("unidadInsError").innerHTML = "* Este campo debe ser completado.";
        unidadCompleto = false;
    }
    else {
        document.getElementById("unidadInsError").innerHTML = "";
        unidadCompleto = true;
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


function modifyEntidad(){
    if (mod == false){
        $('.delete-row').hide()
        $('.delete-th').hide()
        $('.modify-row').fadeIn()
        $('.modify-th').fadeIn()
        mod = true;
        del = false;
        $('#option-right').css('border', '2px solid transparent');
        $('#option-middle').css('border', '2px solid #95C22B');
        var y = window.scrollY + document.querySelector('#table-container').getBoundingClientRect().top; // Y
        var x = window.scrollX + document.querySelector('#table-container').getBoundingClientRect().left; // X
        window.scrollTo(x, y);
        
    }
    else{
        $('.modify-row').fadeOut()
        $('.modify-th').fadeOut()
        mod = false;
        $('#option-middle').css('border', '2px solid transparent');
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }
}


function openEditModal(id,nombre,costoProduccion,costoMaterial,unidadMedida,otrosCostos){
    jQuery.noConflict();
    $(".lds-ring").hide();
    document.getElementById('nombreInsErrorMod').innerHTML="";
    document.getElementById('unidadInsErrorMod').innerHTML="";
    document.getElementById('costoMInsErrorMod').innerHTML="";
    document.getElementById('costoPInsErrorMod').innerHTML="";
    document.getElementById('costoOInsErrorMod').innerHTML="";
    $('#idInputMod').val(String(id))
    $('#nombreInputMod').val(String(nombre));
    $('#cpInputMod').val(String(costoProduccion))
    $('#cmInputMod').val(String(costoMaterial));
    $('#unidadInputMod').val(String(unidadMedida));
    $('#ocInputMod').val(String(otrosCostos));
    $('#editModal').modal('show');
    $('.nav-tabs a:first').tab('show');
    nombreOriginal = String(nombre);
    costosCompletoMod = true;
    nombreCompletoMod = true;
    unidadCompletoMod = true;
    calcularCostoMod("");
    permiteEdit();
}


function calcularCostoMod(input){
    var costoProd = Number(document.getElementById("cpInputMod").value);
    var costoMat = Number(document.getElementById("cmInputMod").value);
    var otrosCostos = Number(document.getElementById("ocInputMod").value);
    if(input=='prod'){
        if(costoProd==0 || isNaN(costoProd)){
            costoProd = 0;
            document.getElementById("costoPInsErrorMod").innerHTML = "El costo debe ser un número mayor a 0.";
        }else{
            document.getElementById("costoPInsErrorMod").innerHTML = "";
        }
    }
    if(input=='mat'){
        if(costoMat==0 || isNaN(costoMat)){
            costoMat = 0;
            document.getElementById("costoMInsErrorMod").innerHTML = "El costo debe ser un número mayor a 0.";
        }else{
            document.getElementById("costoMInsErrorMod").innerHTML = "";
        }
    }
    if(input=='otros'){
        if(otrosCostos==0 || isNaN(otrosCostos)){
            otrosCostos = 0;
            document.getElementById("costoOInsErrorMod").innerHTML = "El costo debe ser un número mayor a 0.";
        }else{
            document.getElementById("costoOInsErrorMod").innerHTML = "";
        }
    }

    // La logica de esto es una mierda porque esto lo chequée arriba ya, pero arriba solo lo chequée si es el caso correcto,
    // pero tengo que seguir haciendo eso para que no salten mensajes de error en todos apenas entras, porque estan todos vacíos, y devuelven 0
    if(isNaN(costoProd)){costoProd = 0;document.getElementById("costoPArtErrorMod").innerHTML = "El costo debe ser un número mayor a 0.";}
    if(isNaN(costoMat)){costoMat = 0;document.getElementById("costoMInsErrorMod").innerHTML = "El costo debe ser un número mayor a 0.";}
    if(isNaN(otrosCostos)){otrosCostos = 0;document.getElementById("costoOInsErrorMod").innerHTML = "El costo debe ser un número mayor a 0.";}


    if(costoProd == 0 || costoMat == 0 || otrosCostos == 0){
        costosCompletoMod = false;
    }else{
        costosCompletoMod = true;
    }
    var costoTotal = costoProd + costoMat + otrosCostos;
    document.getElementById("cTotalLabelMod").innerHTML="Costo Total: ARS $"+String(costoTotal);
    permiteEdit();
}


function permiteEdit(){
    if(costosCompletoMod && nombreCompletoMod && unidadCompletoMod){
        document.getElementById("alta-btn-mod").disabled = false;
    }else{
        document.getElementById("alta-btn-mod").disabled = true;
    }
}

function validaNuevoNombreMod(nombres){
    var n = document.getElementById("nombreInputMod").value;
    if(nombres.includes(n) && n != nombreOriginal){
        //Se comprueba regla RN19
        document.getElementById("nombreInsErrorMod").innerHTML = "* Ese nombre ya ha sido registrado.";
        nombreCompletoMod = false;
    }
    else if (!n){
        //Se comprueba regla RN20
        document.getElementById("nombreInsErrorMod").innerHTML = "* Este campo debe ser completado.";
        nombreCompletoMod = false;
    }
    else{
        nombreCompletoMod = true;
        document.getElementById("nombreInsErrorMod").innerHTML = "";
    }
    permiteEdit();
}


function validaUnidadMod(){
    var u = document.getElementById("unidadInputMod").value;
    if (!u){
        document.getElementById("unidadInsErrorMod").innerHTML = "* Este campo debe ser completado.";
        unidadCompletoMod = false;
    }
    else {
        document.getElementById("unidadInsErrorMod").innerHTML = "";
        unidadCompletoMod = true;
    }
    permiteEdit();
}

function edit_insumo(){
    $(".lds-ring div").css("border-color", "#95C22B transparent transparent transparent");
    $(".lds-ring").show().fadeIn(500);
    $("#row-to-hide-1-mod").hide();
    $("#row-to-hide-2-mod").hide();
    $("#row-to-hide-3-mod").hide();
    $('#alta-btn-mod').prop('disabled', true);
    $('#secondary-btn-mod').prop('disabled', true);
    submitForm('editInsumoForm');
    nextMsgEdit();
}


function removeEntidad(){
    if (del == false){
        $('.modify-row').hide()
        $('.modify-th').hide()
        $('.delete-row').fadeIn()
        $('.delete-th').fadeIn()
        del = true;
        mod = false;
        $('#option-middle').css('border', '2px solid transparent');
        $('#option-right').css('border', '2px solid #95C22B');
        var y = window.scrollY + document.querySelector('#table-container').getBoundingClientRect().top; // Y
        var x = window.scrollX + document.querySelector('#table-container').getBoundingClientRect().left; // X
        window.scrollTo(x, y);
        
    }
    else{
        $('.delete-row').fadeOut()
        $('.delete-th').fadeOut()
        del = false;
        $('#option-right').css('border', '2px solid transparent');
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }
}


function openBajaModal(idInsumo,nombreInsumo){
    //Manejo de elementos de carga
    $("#fieldsRowBaja").show();
    $(".lds-ring").hide();
    $('#bottomBajaModalText').hide();
    $('#primary-btn-alert').prop('disabled', false);
    $('#secondary-btn-baja').prop('disabled', false);
    document.getElementById("baja-custom-text").innerHTML = "¿Está seguro que desea eliminar el insumo " + nombreInsumo + "? Una vez eliminado, este no se podrá recuperar.";

    //Manejo de carteles
    jQuery.noConflict();
    $('#primary-btn-alert').prop('disabled', false); 
    $('#idInsumo').val(String(idInsumo));
    $('#bajaInsumodModal').modal('show');
}


function baja_entidad(){

    //Manejo de elementos para la carga
    $(".b-modal-text-baja").hide();
    $(".lds-ring div").css("border-color", "#cf4545 transparent transparent transparent");
    $(".lds-ring").show().fadeIn(500);
    $('#bottomBajaModalText').show();
    $('#primary-btn-alert').prop('disabled', true);
    $('#secondary-btn-baja').prop('disabled', true);

    //Manejo de datos
    id = $('#idInsumo').val();
    window.location.href='/insumos/baja/' + String(id)

    //Funcion que va cambiando los mensajes de carga.
    nextMsgBaja()
}