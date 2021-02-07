var pagina = 1;
var costoTotal = 0;
var pag1cargada = false;
var del = false;
var mod = false;
var nombreOriginal = "";

function submitForm(n){
    document.getElementById(n).submit();
}

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

function pasar_pagina_mod(n){
    pagina += n;
    cargar_pagina_mod();
}

function cargar_pagina(){
    if(pagina == 1){
        if(pag1cargada){
            if(document.getElementById("nombreArtError").innerHTML == "" && document.getElementById("unidadArtError").innerHTML == ""){
                document.getElementById("siguiente-btn").disabled = false;
            }else{
                document.getElementById("siguiente-btn").disabled = true;
            }
            
        }else{
            pag1cargada = true;
        }
        document.getElementById("siguiente-btn").hidden = false;
        document.getElementById("alta-btn").hidden = true;
        document.getElementById("bottomAltaModalText").innerHTML="Una vez completados los datos, presione el botón \"Siguiente\".";
        $("#secondary-btn").show();
        $("#atras-btn").hide();
        $("#subheader-pag-1").fadeIn(400);
        $("#subheader-pag-2").hide();
        $("#subheader-pag-3").hide();
        $("#row-pag-1-1").fadeIn(400);
        $("#row-pag-1-2").fadeIn(400);
        $("#row-pag-2-1").hide();
        $("#row-pag-2-2").hide();
        $("#row-pag-3-1").hide();
    }
    else if(pagina == 2){
        document.getElementById("siguiente-btn").hidden = false;
        document.getElementById("alta-btn").hidden = true;
        document.getElementById("bottomAltaModalText").innerHTML="Costo Total: ARS $"+String(costoTotal);
        $("#secondary-btn").hide();
        $("#atras-btn").show();
        $("#subheader-pag-1").hide();
        $("#subheader-pag-2").fadeIn(400);
        $("#subheader-pag-3").hide();
        $("#row-pag-1-1").hide();
        $("#row-pag-1-2").hide();
        $("#row-pag-2-1").fadeIn(400);
        $("#row-pag-2-2").fadeIn(400);
        $("#row-pag-3-1").hide();
        calcularCosto("");
    }
    else if(pagina == 3){
        document.getElementById("siguiente-btn").hidden = true;
        document.getElementById("alta-btn").hidden = false;
        document.getElementById("bottomAltaModalText").innerHTML="Una vez completados los datos, presione el botón \"Crear Artículo\".";
        $("#secondary-btn").hide();
        $("#atras-btn").show();
        $("#subheader-pag-1").hide();
        $("#subheader-pag-2").hide();
        $("#subheader-pag-3").fadeIn(400);
        $("#row-pag-1-1").hide();
        $("#row-pag-1-2").hide();
        $("#row-pag-2-1").hide();
        $("#row-pag-2-2").hide();
        $("#row-pag-3-1").fadeIn(400);
    }
}


function validaNuevoNombre(nombres){
    var n = document.getElementById("nombreInput").value;
    if(document.getElementById("nombreInput").value && document.getElementById("unidadInput").value){
        document.getElementById("siguiente-btn").disabled = false;
    }
    if(nombres.includes(n)){
        //Se comprueba regla RN17
        document.getElementById("nombreArtError").innerHTML = "* Ese nombre ya ha sido registrado.";
        document.getElementById("siguiente-btn").disabled = true;
    }
    else if (!n){
        //Se comprueba regla RN18
        document.getElementById("nombreArtError").innerHTML = "* Este campo debe ser completado.";
        document.getElementById("siguiente-btn").disabled = true;
    }
    else{
        document.getElementById("nombreArtError").innerHTML = "";
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
        document.getElementById("siguiente-btn").disabled = true;
    }else{
        document.getElementById("siguiente-btn").disabled = false;
    }
    costoTotal = costoProd + costoIns + otrosCostos;
    document.getElementById("bottomAltaModalText").innerHTML="Costo Total: ARS $"+String(costoTotal);
}

function calcularValor(){
    var margen = Number(document.getElementById("margenInput").value);
    if(isNaN(margen) || margen==0){
        margen=0;
        document.getElementById("margenArtError").innerHTML = "El margen debe ser un número mayor a 0.";
        document.getElementById("alta-btn").disabled = true;
    }else{
        document.getElementById("alta-btn").disabled = false;
        document.getElementById("margenArtError").innerHTML = "";
    }
    document.getElementById("valorInput").value =  (costoTotal * (1+(margen/100))).toFixed(2);;
}

function validaUnidad(){
    var u = document.getElementById("unidadInput").value;
    if(document.getElementById("nombreInput").value && document.getElementById("unidadInput").value){
        document.getElementById("siguiente-btn").disabled = false;
    }
    if (!u){
        document.getElementById("unidadArtError").innerHTML = "* Este campo debe ser completado.";
        document.getElementById("siguiente-btn").disabled = true;
    }
    else {
        document.getElementById("unidadArtError").innerHTML = "";
    }
}

function alta_articulo(){
    $(".lds-ring div").css("border-color", "#95C22B transparent transparent transparent");
    $(".lds-ring").show().fadeIn(500);
    $("#row-pag-3-1").hide();
    $("#subheader-pag-3").hide();
    $('#alta-btn').prop('disabled', true);
    $('#atras-btn').prop('disabled', true);
    submitForm('altaArticuloForm');
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
    "Estamos añadiendo el artículo...",
    "¡Casi listo! Últimos retoques"
].reverse();

var messagesEdit = [
    "Estamos actualizando el artículo...",
    "¡Casi listo! Últimos retoques"
].reverse();

var messagesBaja = [
    "Estamos eliminando el artículo...",
    "¡Casi listo! Últimos retoques"
].reverse();

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





//Abre el Modal de baja. 
function openBajaModal(idArticulo,nombreArticulo){
    //Manejo de elementos de carga
    $("#fieldsRowBaja").show();
    $(".lds-ring").hide();
    $('#bottomBajaModalText').hide();
    $('#primary-btn-alert').prop('disabled', false);
    $('#secondary-btn-baja').prop('disabled', false);
    document.getElementById("baja-custom-text").innerHTML = "¿Está seguro que desea eliminar el artículo " + nombreArticulo + "? Una vez eliminado, este no se podrá recuperar.";

    //Manejo de carteles
    jQuery.noConflict();
    $('#primary-btn-alert').prop('disabled', false); 
    $('#idArticulo').val(String(idArticulo));
    $('#bajaArticulodModal').modal('show');
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
    id = $('#idArticulo').val();
    window.location.href='/articulos/baja/' + String(id)

    //Funcion que va cambiando los mensajes de carga.
    nextMsgBaja()
}



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

function openEditModal(id,nombre,costoProduccion,costoInsumos,costoTotalA,valor,margenGanancia,unidadMedida,costoObtencionAlternativa,otrosCostos,imagen,ventaUsuario){
    jQuery.noConflict();
    pagina = 1;
    cargar_pagina_mod();
    $(".lds-ring").hide();
    document.getElementById('nombreArtError-mod').innerHTML="";
    document.getElementById('unidadArtError-mod').innerHTML="";
    document.getElementById('imgArtError-mod').innerHTML="";
    document.getElementById('costoIArtError-mod').innerHTML="";
    document.getElementById('costoPArtError-mod').innerHTML="";
    document.getElementById('costoOArtError-mod').innerHTML="";
    document.getElementById('costoOAArtError-mod').innerHTML="";
    document.getElementById('margenArtError-mod').innerHTML="";
    $('#idArticuloMod').val(String(id))
    $('#nombreInput-mod').val(String(nombre));
    $('#cpInput-mod').val(String(costoProduccion))
    $('#ciInput-mod').val(String(costoInsumos));
    $('#valorInput-mod').val(String(valor));
    $('#margenInput-mod').val(String(Number(margenGanancia)*100));
    $('#unidadInput-mod').val(String(unidadMedida));
    $('#coaInput-mod').val(String(costoObtencionAlternativa));
    $('#ocInput-mod').val(String(otrosCostos));
    $('#imagenInput-mod').val(String(imagen));
    nombreOriginal = String(nombre);
    document.getElementById("usuariosCheck-mod").checked = Boolean(Number(ventaUsuario));
    $('#editModal').modal('show');
    $('.nav-tabs a:first').tab('show');
}




function cargar_pagina_mod(){
    if(pagina == 1){
        document.getElementById("siguiente-btn-mod").disabled = false;
        document.getElementById("siguiente-btn-mod").hidden = false;
        document.getElementById("alta-btn-mod").hidden = true;
        document.getElementById("bottomAltaModalText-mod").innerHTML="Una vez completados los datos, presione el botón \"Siguiente\".";
        $("#secondary-btn-mod").show();
        $("#atras-btn-mod").hide();
        $("#subheader-pag-1-mod").fadeIn(400);
        $("#subheader-pag-2-mod").hide();
        $("#subheader-pag-3-mod").hide();
        $("#row-pag-1-1-mod").fadeIn(400);
        $("#row-pag-1-2-mod").fadeIn(400);
        $("#row-pag-2-1-mod").hide();
        $("#row-pag-2-2-mod").hide();
        $("#row-pag-3-1-mod").hide();
    }
    else if(pagina == 2){
        document.getElementById("siguiente-btn-mod").hidden = false;
        document.getElementById("alta-btn-mod").hidden = true;
        document.getElementById("bottomAltaModalText-mod").innerHTML="Costo Total: ARS $"+String(costoTotal);
        $("#secondary-btn-mod").hide();
        $("#atras-btn-mod").show();
        $("#subheader-pag-1-mod").hide();
        $("#subheader-pag-2-mod").fadeIn(400);
        $("#subheader-pag-3-mod").hide();
        $("#row-pag-1-1-mod").hide();
        $("#row-pag-1-2-mod").hide();
        $("#row-pag-2-1-mod").fadeIn(400);
        $("#row-pag-2-2-mod").fadeIn(400);
        $("#row-pag-3-1-mod").hide();
        calcularCostoMod("");
    }
    else if(pagina == 3){
        document.getElementById("siguiente-btn-mod").hidden = true;
        document.getElementById("alta-btn-mod").hidden = false;
        document.getElementById("bottomAltaModalText-mod").innerHTML="Una vez completados los datos, presione el botón \"Actualizar Artículo\".";
        $("#secondary-btn-mod").hide();
        $("#atras-btn-mod").show();
        $("#subheader-pag-1-mod").hide();
        $("#subheader-pag-2-mod").hide();
        $("#subheader-pag-3-mod").fadeIn(400);
        $("#row-pag-1-1-mod").hide();
        $("#row-pag-1-2-mod").hide();
        $("#row-pag-2-1-mod").hide();
        $("#row-pag-2-2-mod").hide();
        $("#row-pag-3-1-mod").fadeIn(400);
        calcularValorMod();
    }
}


function validaNuevoNombreMod(nombres){
    var n = document.getElementById("nombreInput-mod").value;
    if(document.getElementById("nombreInput-mod").value && document.getElementById("unidadInput").value){
        document.getElementById("siguiente-btn-mod").disabled = false;
    }
    if(nombres.includes(n) && n != nombreOriginal){
        //Se comprueba regla RN17
        document.getElementById("nombreArtError-mod").innerHTML = "* Ese nombre ya ha sido registrado.";
        document.getElementById("siguiente-btn-mod").disabled = true;
    }
    else if (!n){
        //Se comprueba regla RN18
        document.getElementById("nombreArtError-mod").innerHTML = "* Este campo debe ser completado.";
        document.getElementById("siguiente-btn-mod").disabled = true;
    }
    else{
        document.getElementById("nombreArtError-mod").innerHTML = "";
    }
}


function calcularCostoMod(input){
    var costoProd = Number(document.getElementById("cpInput-mod").value);
    var costoIns = Number(document.getElementById("ciInput-mod").value);
    var otrosCostos = Number(document.getElementById("ocInput-mod").value);
    var costoAlt = Number(document.getElementById("coaInput-mod").value);
    if(input=='prod'){
        if(costoProd==0 || isNaN(costoProd)){
            costoProd = 0;
            document.getElementById("costoPArtError-mod").innerHTML = "El costo debe ser un número mayor a 0.";
        }else{
            document.getElementById("costoPArtError-mod").innerHTML = "";
        }
    }
    if(input=='ins'){
        if(costoIns==0 || isNaN(costoIns)){
            costoIns = 0;
            document.getElementById("costoIArtError-mod").innerHTML = "El costo debe ser un número mayor a 0.";
        }else{
            document.getElementById("costoIArtError-mod").innerHTML = "";
        }
    }
    if(input=='otros'){
        if(otrosCostos==0 || isNaN(otrosCostos)){
            otrosCostos = 0;
            document.getElementById("costoOArtError-mod").innerHTML = "El costo debe ser un número mayor a 0.";
        }else{
            document.getElementById("costoOArtError-mod").innerHTML = "";
        }
    }
    if(input=='alt'){
        if(costoAlt==0 || isNaN(costoAlt)){
            costoAlt = 0;
            document.getElementById("costoOAArtError-mod").innerHTML = "El costo debe ser un número mayor a 0.";
        }else{
            document.getElementById("costoOAArtError-mod").innerHTML = "";
        }
    }
    // La logica de esto es una mierda porque esto lo chequée arriba ya, pero arriba solo lo chequée si es el caso correcto,
    // pero tengo que seguir haciendo eso para que no salten mensajes de error en todos apenas entras, porque estan todos vacíos, y devuelven 0
    if(isNaN(costoProd)){costoProd = 0;document.getElementById("costoPArtError-mod").innerHTML = "El costo debe ser un número mayor a 0.";}
    if(isNaN(costoIns)){costoIns = 0;document.getElementById("costoIArtError-mod").innerHTML = "El costo debe ser un número mayor a 0.";}
    if(isNaN(otrosCostos)){otrosCostos = 0;document.getElementById("costoOArtError-mod").innerHTML = "El costo debe ser un número mayor a 0.";}
    if(isNaN(costoAlt)){costoAlt = 0;document.getElementById("costoOAArtError-mod").innerHTML = "El costo debe ser un número mayor a 0.";}


    if(costoProd == 0 || costoIns == 0 || otrosCostos == 0 || costoAlt == 0){
        document.getElementById("siguiente-btn-mod").disabled = true;
    }else{
        document.getElementById("siguiente-btn-mod").disabled = false;
    }
    costoTotal = costoProd + costoIns + otrosCostos;
    document.getElementById("bottomAltaModalText-mod").innerHTML="Costo Total: ARS $"+String(costoTotal);
}

function calcularValorMod(){
    var margen = Number(document.getElementById("margenInput-mod").value);
    if(isNaN(margen) || margen==0){
        margen=0;
        document.getElementById("margenArtError-mod").innerHTML = "El margen debe ser un número mayor a 0.";
        document.getElementById("alta-btn-mod").disabled = true;
    }else{
        document.getElementById("alta-btn-mod").disabled = false;
        document.getElementById("margenArtError-mod").innerHTML = "";
    }
    document.getElementById("valorInput-mod").value =  (costoTotal * (1+(margen/100))).toFixed(2);
}

function validaUnidadModMod(){
    var u = document.getElementById("unidadInput-mod").value;
    if(document.getElementById("nombreInput-mod").value && document.getElementById("unidadInput").value){
        document.getElementById("siguiente-btn-mod").disabled = false;
    }
    if (!u){
        document.getElementById("unidadArtError-mod").innerHTML = "* Este campo debe ser completado.";
        document.getElementById("siguiente-btn-mod").disabled = true;
    }
    else {
        document.getElementById("unidadArtError-mod").innerHTML = "";
    }
}


function edit_articulo(){
    $(".lds-ring div").css("border-color", "#95C22B transparent transparent transparent");
    $(".lds-ring").show().fadeIn(500);
    $("#row-pag-3-1-mod").hide();
    $("#subheader-pag-3-mod").hide();
    $('#alta-btn-mod').prop('disabled', true);
    $('#atras-btn-mod').prop('disabled', true);
    submitForm('editArticuloForm');
    nextMsgEdit();
}