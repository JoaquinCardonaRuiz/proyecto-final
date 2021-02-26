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
labelPosition();

function openAltaModal(){
    jQuery.noConflict();
    $("#colorInput").val("#" + (Math.random().toString(16) + "000000").slice(2, 8))
    $(".lds-ring").hide();
    $('#altaModal').modal('show');
    $("#customSwitch1").prop("checked", true);
    $("#pdInactivo").fadeOut();    
    $("#pdActivo").fadeIn();
    $("#switch-value").val("habilitado");
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
    var costoRec = document.getElementById("crInput").value;
    if(isNaN(Number(costoRec)) || !costoRec){
        document.getElementById("costoRMatError").innerHTML = "El costo debe ser un número mayor o igual a 0.";
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
    $("#row-to-hide-3").hide();
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


function openEditModal(id,nombre,costoRecoleccion,unidadMedida,color,estado){
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
    if(estado=="habilitado"){
        $("#customSwitch2").prop("checked", true);
        $("#pdInactivoMod").fadeOut();    
        $("#pdActivoMod").fadeIn();
        $("#switch-value-mod").val("habilitado");
    }else{
        $("#customSwitch2").prop("checked", false);
        $("#pdActivoMod").fadeOut(); 
        $("#pdInactivoMod").fadeIn();
        $("#switch-value-mod").val("suspendido");
    }
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
    var costoRec = document.getElementById("crInputMod").value;
    if(isNaN(Number(costoRec)) || !costoRec){
        document.getElementById("costoRMatErrorMod").innerHTML = "El costo debe ser un número o igual a 0.";
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
    $("#row-to-hide-3-mod").hide();
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

function resetBaja(){
    $("#fieldsRowBaja").hide();
    $('#primary-btn-alert').prop('disabled', true);
    document.getElementById("baja-custom-text").innerHTML = "";
    document.getElementById("bottomBajaModalText").innerHTML = "";
}


function openBajaModal(idMat,nombreMat){
    //Manejo de elementos de carga
    $("#fieldsRowBaja").show();
    $(".lds-ring").hide();
    $('#bottomBajaModalText').show();
    $.getJSON("/gestion-materiales/val_delete/"+String(idMat),function (result){
        console.log(result);
        if(result.length == 0){
            $('#primary-btn-alert').prop('disabled', false);
            $('#secondary-btn-baja').prop('disabled', false);
            document.getElementById("baja-custom-text").innerHTML = "¿Está seguro que desea eliminar el material " + nombreMat + "?";        
            document.getElementById("bottomBajaModalText").innerHTML = "Una vez eliminado, este no se podrá recuperar."
        }else{
            $('#primary-btn-alert').prop('disabled', true);
            $('#secondary-btn-baja').prop('disabled', false);
            document.getElementById("bottomBajaModalText").innerHTML = "Por favor primero elimine el material de sus composiciones para continuar."
            var s = "El material " + nombreMat + " no puede ser eliminado debido a que es parte de la composición de los siguientes insumos: ";
            for(var i in result){
                s += result[i];
                s += ", "
            }
            s = s.slice(0, -2); 
            document.getElementById("baja-custom-text").innerHTML = s;
        }
    });
    

    //Manejo de carteles
    jQuery.noConflict();
    $('#idMaterial').val(String(idMat));
    $('#bajaInsumodModal').modal('show');
}



function baja_entidad(){

    //Manejo de elementos para la carga
    $(".b-modal-text-baja").hide();
    $(".lds-ring div").css("border-color", "#cf4545 transparent transparent transparent");
    $(".lds-ring").show().fadeIn(500);
    $('#bottomBajaModalText').show();
    $('#baja-custom-text').hide()
    $('#delete-img').hide()
    $('#primary-btn-alert').prop('disabled', true);
    $('#secondary-btn-baja').prop('disabled', true);

    //Manejo de datos
    id = $('#idMaterial').val();
    window.location.href='/materiales/baja/' + String(id)

    //Funcion que va cambiando los mensajes de carga.
    nextMsgBaja()
}


$("#customSwitch1").click(function() {
    if($("#customSwitch1").is(":checked") == true){
        $("#pdInactivo").fadeOut();    
        $("#pdActivo").fadeIn();
        $("#switch-value").val("habilitado");
    }
    else{
        $("#pdActivo").fadeOut(); 
        $("#pdInactivo").fadeIn();
        $("#switch-value").val("suspendido");
    }
});


$("#customSwitch2").click(function() {
    if($("#customSwitch2").is(":checked") == true){
        $("#pdInactivoMod").fadeOut();    
        $("#pdActivoMod").fadeIn();
        $("#switch-value-mod").val("habilitado");
    }
    else{
        $("#pdActivoMod").fadeOut(); 
        $("#pdInactivoMod").fadeIn();
        $("#switch-value-mod").val("suspendido");
    }
});

function labelPosition(){
    var pos_switch = document.getElementById("customSwitch1").offsetTop;
    var pos_switch_left = document.getElementById("customSwitch1").offsetLeft;
    $("#pdActivo").css({top: 0, position:'absolute'});
    $("#pdActivo").css({left: pos_switch_left + 140, position:'absolute'});
    $("#pdInactivo").css({top: 0, position:'absolute'});
    $("#pdInactivo").css({left: pos_switch_left + 140, position:'absolute'});

    var pos_switch = document.getElementById("customSwitch2").offsetTop;
    var pos_switch_left = document.getElementById("customSwitch2").offsetLeft;
    $("#pdActivoMod").css({top: 0, position:'absolute'});
    $("#pdActivoMod").css({left: pos_switch_left + 140, position:'absolute'});

    $("#pdInactivoMod").css({top: 0, position:'absolute'});
    $("#pdInactivoMod").css({left: pos_switch_left + 140, position:'absolute'});
}