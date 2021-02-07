var costoCompleto = false;
var nombreCompleto = false;
var unidadCompleto = false;
var colorCompleto = false;
var costoCompletoMod = false;
var nombreCompletoMod = false;
var unidadCompletoMod = false;
var colorCompletoMod = false;
var nombreOriginal = "";
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

function randomColorMod(){
    $("#colorInputMod").val("#" + (Math.random().toString(16) + "000000").slice(2, 8));
    checkColorMod();
}


function permiteAlta(){
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
        $('#bottomEditModalText').html(messagesEdit.pop()).fadeIn(500);

    } else {
        $('#bottomEditModalText').html(messagesEdit.pop()).fadeIn(500).delay(10000).fadeOut(500, nextMsgEdit);

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


function openEditModal(id,nombre,costoRecoleccion,unidadMedida,color,){
    jQuery.noConflict();
    $(".lds-ring").hide();
    document.getElementById('nombreMatErrorMod').innerHTML="";
    document.getElementById('unidadMatErrorMod').innerHTML="";
    document.getElementById('costoRMatErrorMod').innerHTML="";
    document.getElementById('colorErrorMod').innerHTML="";
    $('#idInputMod').val(String(id))
    $('#nombreInputMod').val(String(nombre));
    $('#crInputMod').val(String(costoRecoleccion));
    $('#unidadInputMod').val(String(unidadMedida));
    $('#colorInputMod').val(String(color));
    $('#editModal').modal('show');
    $('.nav-tabs a:first').tab('show');
    nombreOriginal = String(nombre);
    costoCompletoMod = true;
    nombreCompletoMod = true;
    unidadCompletoMod = true;
    colorCompletoMod = true;
    permiteEdit();
    checkColorMod();
}



function permiteEdit(){
    if(costoCompletoMod && nombreCompletoMod && unidadCompletoMod && colorCompletoMod){
        document.getElementById("edit-btn").disabled = false;
    }else{
        document.getElementById("edit-btn").disabled = true;
    }
}



function checkColorMod(){
    var c = document.getElementById("colorInputMod").value;
    if(!c){
        document.getElementById("colorErrorMod").innerHTML = "Este campo debe ser completado";
        colorCompletoMod = false;
    }
    else if(c[0] != "#"){
        document.getElementById("colorErrorMod").innerHTML = "Formato Erróneo";
        colorCompletoMod = false;
    }
    else if(c.length != 7){
        document.getElementById("colorErrorMod").innerHTML = "Formato Erróneo";
        colorCompletoMod = false;
    }
    else{
        document.getElementById("colorErrorMod").innerHTML = "";
        document.getElementById("color-markerMod").style.color = c;
        colorCompletoMod = true;
    }
    permiteEdit();
}

function validaNuevoNombreMod(nombres){
    var n = document.getElementById("nombreInputMod").value;
    if(nombres.includes(n) && n != nombreOriginal){
        //Se comprueba regla RN21
        document.getElementById("nombreMatErrorMod").innerHTML = "* Ese nombre ya ha sido registrado.";
        nombreCompletoMod = false;
    }
    else if (!n){
        //Se comprueba regla RN22
        document.getElementById("nombreMatErrorMod").innerHTML = "* Este campo debe ser completado.";
        nombreCompletoMod = false;
    }
    else{
        nombreCompletoMod = true;
        document.getElementById("nombreMatErrorMod").innerHTML = "";
    }
    permiteEdit();
}



function validaUnidadMod(){
    var u = document.getElementById("unidadInputMod").value;
    if (!u){
        document.getElementById("unidadMatErrorMod").innerHTML = "* Este campo debe ser completado.";
        unidadCompletoMod = false;
    }
    else {
        document.getElementById("unidadMatErrorMod").innerHTML = "";
        unidadCompletoMod = true;
    }
    permiteEdit();
}


function calcularCostoMod(){
    var costoRec = Number(document.getElementById("crInputMod").value);
    if(costoRec==0 || isNaN(costoRec)){
        costoRec = 0;
        document.getElementById("costoRMatErrorMod").innerHTML = "El costo debe ser un número mayor a 0.";
        costoCompletoMod = false;
    }else{
        document.getElementById("costoRMatErrorMod").innerHTML = "";
        costoCompletoMod = true;
    }
    permiteEdit();
}


function edit_material(){
    $(".lds-ring div").css("border-color", "#95C22B transparent transparent transparent");
    $(".lds-ring").show().fadeIn(500);
    $("#row-to-hide-1-mod").hide();
    $("#row-to-hide-2-mod").hide();
    $('#edit-btn').prop('disabled', true);
    $('#secondary-btn-mod').prop('disabled', true);
    submitForm('editMaterialForm');
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




function openBajaModal(idMat,nombreMat){
    //Manejo de elementos de carga
    $("#fieldsRowBaja").show();
    $(".lds-ring").hide();
    $('#bottomBajaModalText').hide();
    $('#primary-btn-alert').prop('disabled', false);
    $('#secondary-btn-baja').prop('disabled', false);
    document.getElementById("baja-custom-text").innerHTML = "¿Está seguro que desea eliminar el material " + nombreMat + "? Una vez eliminado, este no se podrá recuperar.";

    //Manejo de carteles
    jQuery.noConflict();
    $('#primary-btn-alert').prop('disabled', false); 
    $('#idMaterial').val(String(idMat));
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
    id = $('#idMaterial').val();
    window.location.href='/materiales/baja/' + String(id)

    //Funcion que va cambiando los mensajes de carga.
    nextMsgBaja()
}