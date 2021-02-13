var costosCompletoProd = false;
var costosCompletoMat = false;
var costosCompletoOtros = false;
var nombreCompleto = false;
var unidadCompleto = false;
var colorCompleto = false;
var costosCompletoProdMod = false;
var costosCompletoMatMod = false;
var costosCompletoOtrosMod = false;
var nombreCompletoMod = false;
var unidadCompletoMod = false;
var colorCompletoMod = false;
var nombreOriginal = "";
var del = false;
var mod = false;
var pagina = 1;
var menuShown = false;
var selectedOptions = [];

function pasar_pagina(n){
    pagina += n;
    cargar_pagina(pagina);
}

function cargar_pagina(n){
    if(n==1){
        $("#row-to-hide-1").show().fadeIn(500);
        $("#row-to-hide-2").show().fadeIn(500);
        $("#row-to-hide-3").show().fadeIn(500);
        $("#row-to-hide-4").hide();
        $('#alta-btn').show();
        $('#secondary-btn').show();
        $('#bottomAltaModalText').show();
        $('#anterior-btn').hide();
        $('#ci-btn').hide();
    }else if(n==2){
        $("#row-to-hide-1").hide();
        $("#row-to-hide-2").hide();
        $("#row-to-hide-3").hide();
        $("#row-to-hide-4").show().fadeIn(500);
        $('#alta-btn').hide();
        $('#secondary-btn').hide();
        $('#bottomAltaModalText').hide();
        $('#anterior-btn').show();
        $('#ci-btn').show()
    }
}

function openLoadingRing(){
    document.getElementById("open-loading-modal").click();
    $(".lds-ring").hide();
    $(".lds-ring div").css("border-color", "#95C22B transparent transparent transparent");
    $(".lds-ring").show();
    $("#loadingRow").show();
}

function closeLoadingRing(){
    document.getElementById("open-loading-modal").click();
    $(".lds-ring").hide();
    $("#loadingRow").hide();
}


function openAltaModal(){
    jQuery.noConflict();
    $("#colorInput").val("#" + (Math.random().toString(16) + "000000").slice(2, 8))
    $(".lds-ring").hide();
    $('#altaModal').modal('show');
    checkColorAlta();
    calcularCosto("");
    cargar_pagina(pagina);
}

function randomColorAlta(){
    $("#colorInput").val("#" + (Math.random().toString(16) + "000000").slice(2, 8));
    checkColorAlta();
}

function randomColorMod(){
    $("#colorInputMod").val("#" + (Math.random().toString(16) + "000000").slice(2, 8));
    checkColorMod();
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
    console.log(colorCompleto);
    permiteAlta();
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


function submitForm(n){
    document.getElementById(n).submit();
}


function permiteAlta(){
    if(costosCompletoProd && costosCompletoMat && costosCompletoOtros && nombreCompleto && unidadCompleto && colorCompleto){
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
    var costoProd = document.getElementById("cpInput").value;
    var costoMat = document.getElementById("cmInput").value;
    var otrosCostos = document.getElementById("ocInput").value;
    if(input=='prod'){
        if(isNaN(Number(costoProd)) || !costoProd){
            costosCompletoProd = false;
            document.getElementById("costoPInsError").innerHTML = "El costo debe ser un número mayor o igual a 0.";
        }else{
            costosCompletoProd = true;
            document.getElementById("costoPInsError").innerHTML = "";
        }
    }
    if(input=='mat'){
        if(isNaN(Number(costoMat)) || !costoMat){
            costosCompletoMat = false;
            document.getElementById("costoMInsError").innerHTML = "El costo debe ser un número mayor o igual a 0.";
        }else{
            costosCompletoMat = true;
            document.getElementById("costoMInsError").innerHTML = "";
        }
    }
    if(input=='otros'){
        if(isNaN(Number(otrosCostos)) || !otrosCostos){
            costosCompletoOtros = false;
            document.getElementById("costoOInsError").innerHTML = "El costo debe ser un número mayor o igual a 0.";
        }else{
            costosCompletoOtros = true;
            document.getElementById("costoOInsError").innerHTML = "";
        }
    }
    var costoTotal = Number(costoProd) + Number(costoMat) + Number(otrosCostos);
    document.getElementById("bottomAltaModalText").innerHTML="Costo Total: ARS $"+(costoTotal);
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
        $('#bottomAltaModalTextMod').html(messagesEdit.pop()).fadeIn(500);

    } else {
        $('#bottomAltaModalTextMod').html(messagesEdit.pop()).fadeIn(500).delay(10000).fadeOut(500, nextMsgEdit);

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


function openEditModal(id,nombre,costoProduccion,costoMaterial,unidadMedida,otrosCostos,color){
    jQuery.noConflict();
    $(".lds-ring").hide();
    document.getElementById('nombreInsErrorMod').innerHTML="";
    document.getElementById('unidadInsErrorMod').innerHTML="";
    document.getElementById('costoMInsErrorMod').innerHTML="";
    document.getElementById('costoPInsErrorMod').innerHTML="";
    document.getElementById('costoOInsErrorMod').innerHTML="";
    document.getElementById('colorErrorMod').innerHTML="";
    $('#idInputMod').val(String(id))
    $('#nombreInputMod').val(String(nombre));
    $('#cpInputMod').val(String(costoProduccion))
    $('#cmInputMod').val(String(costoMaterial));
    $('#unidadInputMod').val(String(unidadMedida));
    $('#ocInputMod').val(String(otrosCostos));
    $('#colorInputMod').val(String(color));
    $('#editModal').modal('show');
    $('.nav-tabs a:first').tab('show');
    nombreOriginal = String(nombre);
    costosCompletoProdMod = true;
    costosCompletoMatMod = true;
    costosCompletoOtrosMod = true;
    colorCompletoMod = true;
    nombreCompletoMod = true;
    unidadCompletoMod = true;
    calcularCostoMod("");
    checkColorMod();
    permiteEdit();
}


function calcularCostoMod(input){
    var costoProd = document.getElementById("cpInputMod").value;
    var costoMat = document.getElementById("cmInputMod").value;
    var otrosCostos = document.getElementById("ocInputMod").value;
    if(input=='prod'){
        if(isNaN(Number(costoProd)) || !costoProd){
            costosCompletoProdMod = false;
            document.getElementById("costoPInsErrorMod").innerHTML = "El costo debe ser un número mayor o igual a 0.";
        }else{
            costosCompletoProdMod = true;
            document.getElementById("costoPInsErrorMod").innerHTML = "";
        }
    }
    if(input=='mat'){
        if(isNaN(Number(costoMat)) || !costoMat){
            costosCompletoMatMod = false;
            document.getElementById("costoMInsErrorMod").innerHTML = "El costo debe ser un número mayor o igual a 0.";
        }else{
            costosCompletoMatMod = true;
            document.getElementById("costoMInsErrorMod").innerHTML = "";
        }
    }
    if(input=='otros'){
        if(isNaN(Number(otrosCostos)) || !otrosCostos){
            costosCompletoOtrosMod = false;
            document.getElementById("costoOInsErrorMod").innerHTML = "El costo debe ser un número mayor o igual a 0.";
        }else{
            costosCompletoOtrosMod = true;
            document.getElementById("costoOInsErrorMod").innerHTML = "";
        }
    }
    var costoTotal = Number(costoProd) + Number(costoMat) + Number(otrosCostos);
    document.getElementById("bottomAltaModalTextMod").innerHTML="Costo Total: ARS $"+(costoTotal);
    permiteEdit();
}


function permiteEdit(){
    if(costosCompletoProdMod && costosCompletoMatMod && costosCompletoOtrosMod && nombreCompletoMod && unidadCompletoMod && colorCompletoMod){
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


function openModalMateriales(nombre, materiales,cantidades){
    cantidades = cantidades.substring(1, cantidades.length-1).split(',');
    console.log(cantidades);
    $.getJSON("/insumos/materiales/"+materiales,function (result){
        if(result.length > 0){
            console.log(result);
            card = $("#material-card").clone();
            $("#materiales-modal-body").children("#material-card").remove();
            // Borro contenido anterior
            //document.getElementById("modalTableBody"). innerHTML="";
            //document.getElementById("headerRow").innerHTML ="";

            // Establezco título
            document.getElementById("headingModalMat").innerHTML = "Materiales aceptados por " + nombre;
            document.getElementById("open-loading-modal").click();
            document.getElementById("open-modal-mat").click();

            row = document.getElementById("material-card");
            for(i=0; i < result.length ; i++){
                clone = card.clone();
                clone.find("#nombre-material").text(result[i]["nombre"]);
                clone.find("#unidad-medida").text(result[i]["unidadmedida"]);
                clone.find("#material-img").css('background-color',result[i]["color"]);
                clone.find("#material-img").text(result[i]["nombre"][0]);
                clone.find("#cantidad").text(cantidades[i]);
                clone.appendTo("#materiales-modal-body");
        
            }
        }else{
            document.getElementById("open-loading-modal").click();
            document.getElementById("open-mat-vacio").click();
        }
    })
}


//Funciones específicas que manejan el dropdwon.
function headingOptionHover(){
    $(".chevron").css({cursor: 'pointer', transform: 'rotate(180deg)'});
}

function headingOptionLeave(){
    $(".chevron").css({transform: 'rotate(0deg)'});
}

//Manejo del tooltip.
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})

function openMenu() {
    $("#menu-option-box-1").fadeIn();
    $(".dropdown-box").css("border","1px solid #95C22B");
    $('#cards-row-materiales').css({"transform":"translateY(200px)"});
    $("#bottomAltaModalTextAltaPD").css({"transform":"translateY(200px)"});
    $(".margin-row").show();
    $(".margin-row").css({"transform":"translateY(200px)"});
    $("#bottomAltaModalTextAltaPD").css({"margin-bottom":"25px"});
};


function closeMenu() {
    $("#menu-option-box-1").hide();
    $(".dropdown-box").css("border","1px solid rgb(184, 184, 184)");
    $('#cards-row-materiales').css({"transform":"translateY(0px)"});
    $("#bottomAltaModalTextAltaPD").css({"transform":"translateY(0px)"});
    $("#bottomAltaModalTextAltaPD").css({"margin-bottom":""});
    $(".margin-row").css({"transform":"translateY(0px)"});
    $(".margin-row").hide();
};

function dropdownOptionSelect(idOption, nameOption, color){
    if (selectedOptions.includes(idOption)){
        const index = selectedOptions.indexOf(idOption);
        if (index > -1) {
            selectedOptions.splice(index, 1);
        }
        $("#" + String(nameOption) + "-check").fadeOut();
        $("#" + String(nameOption) + "-card").fadeOut();
    }
    else{
        selectedOptions.push(idOption);
        $("#" + String(nameOption) + "-check").fadeIn();
        setColor(nameOption,color);
        $("#" + String(nameOption) + "-card").fadeIn();
    }
    labelShowHide();
    $("#materiales-altaPD").val("[" + selectedOptions + "]");  
     
}

//Manejo de carteles en la seleccion de materiales del dropdown.
function labelShowHide(){
    if (selectedOptions.length == 0){
        $(".indicator-label-2").hide();
        $("#warning-label-altaPD").fadeIn(1000);
    }
    else{
        $(".indicator-label-2").show();
        $("#warning-label-altaPD").hide();
    }
}

//Setea el color de las tarjetas de materiales.
function setColor(nombre,color){
    $("#"+String(nombre)+"-img").css("background-color", String(color));
}

//Cierra el dropdown al clickear fuera de el y su
$(document).on('click', function (e) {
    if ($(e.target).closest("#dropdown-altaPD").length === 0) {
        if (menuShown == true){
            closeMenu();
            headingOptionLeave();
            menuShown=false;
        }
    }
});

//Funcion principal de manejo del compartamiento el dropdown.
function dropdownManager(){
    if (menuShown == false){
        openMenu();
        headingOptionHover();
        menuShown = true
    }
    else{
        closeMenu();
        headingOptionLeave();
        menuShown=false;
    }

}

$.getJSON("/gestion-puntos-deposito/nombres-pd/",function (result){
    nombres = result;
});