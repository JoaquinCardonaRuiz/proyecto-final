var pagina = 1;
var costoTotal = 0;
var pag1cargada = false;
var del = false;
var mod = false;
var nombreOriginal = "";
var costoProdCompleto = false;
var otrosCostosCompleto = false;
var costoAltCompleto = false;
vars_or = [0,0,0,0,0,0,0,0];
var mod_vars = [0,0,0,0,0,0,0,0];
var menuShown = false;
var selectedOptions = [];
var menuShownMod = false;
var selectedOptionsMod = [];
var cantidades_originales = [];
var cantidades_mod = [];



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
        $("#fieldsRow1Alta1").hide();
        $("#cards-row-materiales").hide();
        $("#subheader-pag-1").fadeIn(400);
        $("#subheader-pag-2").hide();
        $("#subheader-pag-3").hide();
        $("#subheader-pag-4").hide();
        $("#row-pag-1-1").fadeIn(400);
        $("#row-pag-1-2").fadeIn(400);
        $("#row-pag-1-3").fadeIn(400);
        $("#row-pag-2-1").hide();
        $("#row-pag-2-2").hide();
        $("#row-pag-3-1").hide();
    }else if(pagina == 2){
        document.getElementById("siguiente-btn").hidden = false;
        document.getElementById("alta-btn").hidden = true;
        //document.getElementById("bottomAltaModalText").innerHTML="Costo Total: ARS $"+String(costoTotal);
        $("#fieldsRow1Alta1").fadeIn(400);
        $("#cards-row-materiales").fadeIn(400);
        $("#secondary-btn").hide();
        $("#atras-btn").show();
        $("#subheader-pag-1").hide();
        $("#subheader-pag-2").fadeIn(400);
        $("#subheader-pag-3").hide();
        $("#subheader-pag-4").hide();
        $("#row-pag-1-1").hide();
        $("#row-pag-1-2").hide();
        $("#row-pag-1-3").hide();
        $("#row-pag-2-1").hide();
        $("#row-pag-2-2").hide();
        $("#row-pag-3-1").hide();
        document.getElementById('bottomAltaModalText').innerHTML=" ";
        verificar_cantidades();
    }
    else if(pagina == 3){
        document.getElementById("siguiente-btn").hidden = false;
        document.getElementById("alta-btn").hidden = true;
        document.getElementById("bottomAltaModalText").innerHTML="Costo Total: ARS $"+String(costoTotal);
        $("#fieldsRow1Alta1").hide();
        $("#cards-row-materiales").hide();
        $("#secondary-btn").hide();
        $("#atras-btn").show();
        $("#subheader-pag-1").hide();
        $("#subheader-pag-2").hide();
        $("#subheader-pag-3").fadeIn(400);
        $("#subheader-pag-4").hide();
        $("#row-pag-1-1").hide();
        $("#row-pag-1-2").hide();
        $("#row-pag-1-3").hide();
        $("#row-pag-2-1").fadeIn(400);
        $("#row-pag-2-2").fadeIn(400);
        $("#row-pag-3-1").hide();
        calcularCosto("");
    }
    else if(pagina == 4){
        document.getElementById("siguiente-btn").hidden = true;
        document.getElementById("alta-btn").hidden = false;
        document.getElementById("bottomAltaModalText").innerHTML="Una vez completados los datos, presione el botón \"Crear Artículo\".";
        $("#secondary-btn").hide();
        $("#atras-btn").show();
        $("#fieldsRow1Alta1").hide();
        $("#cards-row-materiales").hide();
        $("#subheader-pag-1").hide();
        $("#subheader-pag-2").hide();
        $("#subheader-pag-3").hide();
        $("#subheader-pag-4").fadeIn(400);
        $("#row-pag-1-1").hide();
        $("#row-pag-1-2").hide();
        $("#row-pag-1-3").hide();
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

function permitirCostos(){
    if(costoProdCompleto && otrosCostosCompleto && costoAltCompleto){
        document.getElementById("siguiente-btn").disabled = false;
    }else{
        document.getElementById("siguiente-btn").disabled = true;
    }
}

function calcularCosto(input){
    var costoProd = document.getElementById("cpInput").value;
    var costoIns = document.getElementById("ciInput").value;
    var otrosCostos = document.getElementById("ocInput").value;
    var costoAlt = document.getElementById("coaInput").value;
    if(input=='prod'){
        if(isNaN(Number(costoProd)) || !costoProd){
            document.getElementById("costoPArtError").innerHTML = "El costo debe ser un número mayor o igual a 0.";
            costoProdCompleto = false;
        }else{
            costoProdCompleto = true;
            document.getElementById("costoPArtError").innerHTML = "";
        }
    }
    if(input=='ins'){
        if(isNaN(Number(costoIns)) || !costoIns){
            document.getElementById("costoIArtError").innerHTML = "El costo debe ser un número mayor o igual a 0.";
        }else{
            document.getElementById("costoIArtError").innerHTML = "";
        }
    }
    if(input=='otros'){
        if(isNaN(Number(otrosCostos)) || !otrosCostos){
            document.getElementById("costoOArtError").innerHTML = "El costo debe ser un número mayor o igual a 0.";
            otrosCostosCompleto = false;
        }else{
            otrosCostosCompleto = true;
            document.getElementById("costoOArtError").innerHTML = "";
        }
    }
    if(input=='alt'){
        if(isNaN(Number(costoAlt)) || !costoAlt){
            document.getElementById("costoOAArtError").innerHTML = "El costo debe ser un número mayor o igual a 0.";
            costoAltCompleto = false;
        }else{
            costoAltCompleto = true;
            document.getElementById("costoOAArtError").innerHTML = "";
        }
    }

    costoTotal = Number(costoProd) + Number(costoIns) + Number(otrosCostos);
    document.getElementById("bottomAltaModalText").innerHTML="Costo Total: ARS $"+String(costoTotal);
    permitirCostos();
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
    $("#subheader-pag-4").hide();
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
        $('#bottomAltaModalText-mod').html(messagesEdit.pop()).fadeIn(500);

    } else {
        $('#bottomAltaModalText-mod').html(messagesEdit.pop()).fadeIn(500).delay(10000).fadeOut(500, nextMsgEdit);

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

function openEditModal(id,nombre,costoProduccion,costoInsumos,costoTotalA,valor,margenGanancia,unidadMedida,costoObtencionAlternativa,otrosCostos,imagen,ventaUsuario,ids,cantidades,cantidades_totales){
    jQuery.noConflict();
    pagina = 1;
    $(".lds-ring").hide();
    mod_vars = [0,0,0,0,0,0,0,0,0];
    vars_or = [String(nombre),String(unidadMedida),String(imagen),Boolean(Number(ventaUsuario)),
               String(costoProduccion),String(otrosCostos),String(costoObtencionAlternativa),
               String(margenGanancia)];
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
    $('#imagenInput-mod').val('');
    nombreOriginal = String(nombre);
    document.getElementById("usuariosCheck-mod").checked = Boolean(Number(ventaUsuario));
    $('#editModal').modal('show');
    $('.nav-tabs a:first').tab('show');
    cantidades_originales = [...cantidades_totales];
    cantidades_mod = [...cantidades_totales];
    //como la funcion dropdownOptionSelect lo que hace es mostrar una carta si NO está en selectedOptions y
    //ocultarla si SI está, entonces creo un arreglo que es el arreglo de materiales que tengo que mostrar, concatenado con
    //selectedOptions, y mando todos a dropdownOptionSelect. Va a ocultar los que están mostrados, y mostrar los nuevos.
    var arr = [...ids,...selectedOptionsMod];
    for(var i = 0; i < arr.length; i++){
        var cant = 0;
        if(i<cantidades.length){
            cant = cantidades[i];
        }
        console.log(cant);
        dropdownOptionSelectMod(arr[i],cant);
    }
    calcularCostoMod();
    check_edit();
}






function validaNuevoNombreMod(nombres){
    var n = document.getElementById("nombreInput-mod").value;
    if(nombres.includes(n) && n != vars_or[0]){
        //Se comprueba regla RN17
        document.getElementById("nombreArtError-mod").innerHTML = "* Ese nombre ya ha sido registrado.";
        mod_vars[0] = NaN;
    }
    else if (!n){
        //Se comprueba regla RN18
        document.getElementById("nombreArtError-mod").innerHTML = "* Este campo debe ser completado.";
        mod_vars[0] = NaN;
    }
    else if(n == vars_or[0]){
        mod_vars[0] = 0;
        document.getElementById("nombreArtError-mod").innerHTML = "";
    }else{
        mod_vars[0] = 1;
        document.getElementById("nombreArtError-mod").innerHTML = "";
    }
    check_edit();
}


function calcularCostoMod(input){
    var costoProd = document.getElementById("cpInput-mod").value;
    var costoIns = document.getElementById("ciInput-mod").value;
    var otrosCostos = document.getElementById("ocInput-mod").value;
    var costoAlt = document.getElementById("coaInput-mod").value;
    if(input=='prod'){
        if(isNaN(Number(costoProd)) || !costoProd){
            document.getElementById("costoPArtError-mod").innerHTML = "El costo debe ser un número mayor o igual a 0.";
            mod_vars[4] = NaN;
        }else if(Number(costoProd) == Number(vars_or[4])){
            mod_vars[4] = 0;
            document.getElementById("costoPArtError-mod").innerHTML = "";
        }else{
            mod_vars[4] = 1;
            document.getElementById("costoPArtError-mod").innerHTML = "";
        }
    }
    if(input=='otros'){
        if(isNaN(Number(otrosCostos)) || !otrosCostos){
            document.getElementById("costoOArtError-mod").innerHTML = "El costo debe ser un número mayor o igual a 0.";
            mod_vars[5] = NaN;
        }else if(Number(otrosCostos) == Number(vars_or[5])){
            mod_vars[5] = 0;
            document.getElementById("costoOArtError-mod").innerHTML = "";
        }else{
            mod_vars[5] = 1;
            document.getElementById("costoOArtError-mod").innerHTML = "";
        }
    }
    if(input=='alt'){
        if(isNaN(Number(costoAlt)) || !costoAlt){
            document.getElementById("costoOAArtError-mod").innerHTML = "El costo debe ser un número mayor o igual a 0.";
            mod_vars[6] = NaN;
        }else if(Number(costoAlt) == Number(vars_or[6])){
            mod_vars[6] = 0;
            document.getElementById("costoOAArtError-mod").innerHTML = "";
        }else{
            mod_vars[6] = 1;
            document.getElementById("costoOAArtError-mod").innerHTML = "";
        }
    }

    costoTotal = Number(costoProd) + Number(costoIns) + Number(otrosCostos);
    document.getElementById("bottomMatText3").innerHTML="Costo Total: ARS $"+String(costoTotal);
    check_edit();
}



function calcularValorMod(){
    var margen = Number(document.getElementById("margenInput-mod").value);
    if(isNaN(margen) || margen==0){
        margen=0;
        document.getElementById("margenArtError-mod").innerHTML = "El margen debe ser un número mayor a 0.";
        mod_vars[7] = NaN;
    }else if(margen/100 == Number(vars_or[7])){
        mod_vars[7] = 0;
        document.getElementById("margenArtError-mod").innerHTML = "";
    }else{
        mod_vars[7] = 1;
        document.getElementById("margenArtError-mod").innerHTML = "";
    }
    document.getElementById("valorInput-mod").value =  (costoTotal * (1+(margen/100))).toFixed(2);
    check_edit();
}

function validaUnidadMod(){
    var u = document.getElementById("unidadInput-mod").value;
    if (!u){
        document.getElementById("unidadArtError-mod").innerHTML = "* Este campo debe ser completado.";
        mod_vars[1] = NaN;
    }
    else if(u == vars_or[1]){
        mod_vars[1] = 0;
        document.getElementById("unidadArtError-mod").innerHTML = "";
    }else{
        mod_vars[1] = 1;
        document.getElementById("unidadArtError-mod").innerHTML = "";
    }
    check_edit();
}


function edit_articulo(){
    $(".lds-ring div").css("border-color", "#95C22B transparent transparent transparent");
    $(".lds-ring").show().fadeIn(500);
    $("#datos-basicos").hide();
    $("#insumos").hide();
    $("#costos").hide();
    $("#precio").hide();
    $('#edit-btn').prop('disabled', true);
    $('#secondary-btn-mod').prop('disabled', true);
    submitForm('editArticuloForm');
    nextMsgEdit();
}


function check_edit(){
    sum = mod_vars.reduce((a, b) => a + b, 0);
    for(var i in cantidades_originales){
        if(cantidades_originales[i] != cantidades_mod[i]){
            sum += 1;
        }
    }
    if(isNaN(sum)){
        document.getElementById("edit-btn").innerHTML = "Se han encontrado errores"
        document.getElementById("edit-btn").disabled = true;
        if(isNaN(mod_vars[0])||isNaN(mod_vars[1])||isNaN(mod_vars[2])||isNaN(mod_vars[3])){
            document.getElementById("error-mark-db").hidden = false;
        }
        if(isNaN(mod_vars[4])||isNaN(mod_vars[5])||isNaN(mod_vars[6])){
            document.getElementById("error-mark-c").hidden = false;
        }
        if(isNaN(mod_vars[7])){
            document.getElementById("error-mark-p").hidden = false;
        }
        
    }else if(sum == 0){
        document.getElementById("edit-btn").innerHTML = "Confirmar 0 cambios."
        document.getElementById("edit-btn").disabled = true;
        document.getElementById("error-mark-db").hidden = true;
        document.getElementById("error-mark-c").hidden = true;
        document.getElementById("error-mark-p").hidden = true;
    }else{
        document.getElementById("edit-btn").innerHTML = "Confirmar " + String(sum)+ " cambios."
        document.getElementById("edit-btn").disabled = false;
        document.getElementById("error-mark-db").hidden = true;
        document.getElementById("error-mark-c").hidden = true;
        document.getElementById("error-mark-p").hidden = true;
    }
}


function check_venta_u(){
    valor = document.getElementById("usuariosCheck-mod").checked;
    if(valor == vars_or[3]){
        mod_vars[3] = 0;
    }else{
        mod_vars[3] = 1;
    }
    check_edit();
}

function check_imagen(){
    mod_vars[2] = 1;
    check_edit();
}









//Funciones específicas que manejan el dropdwon.
function headingOptionHover(){
    $(".chevron").css({cursor: 'pointer', transform: 'rotate(180deg)'});
}

function headingOptionLeave(){
    $(".chevron").css({transform: 'rotate(0deg)'});
}

function openMenu() {
    $("#menu-option-box-1").fadeIn();
    $(".dropdown-box").css("border","1px solid #95C22B");
    $('#cards-row-materiales').css({"transform":"translateY(200px)"});
    $("#bottomAltaModalText").css({"transform":"translateY(200px)"});
    $(".margin-row").show();
    $(".margin-row").css({"transform":"translateY(200px)"});
    $("#bottomAltaModalText").css({"margin-bottom":"25px"});
};


function closeMenu() {
    $("#menu-option-box-1").hide();
    $(".dropdown-box").css("border","1px solid rgb(184, 184, 184)");
    $('#cards-row-materiales').css({"transform":"translateY(0px)"});
    $("#bottomAltaModalText").css({"transform":"translateY(0px)"});
    $("#bottomAltaModalText").css({"margin-bottom":""});
    $(".margin-row").css({"transform":"translateY(0px)"});
    $(".margin-row").hide();
};

function dropdownOptionSelect(idOption, nameOption, color){
    if (selectedOptions.includes(idOption)){
        const index = selectedOptions.indexOf(idOption);
        if (index > -1) {
            selectedOptions.splice(index, 1);
        }
        $("#" + String(idOption) + "-check").hide();
        $("#" + String(idOption) + "-card").hide();
        document.getElementById("cantidad-"+idOption).value = 0;
    }
    else{
        selectedOptions.push(idOption);
        $("#" + String(idOption) + "-check").show();
        setColor(idOption,color);
        $("#" + String(idOption) + "-card").show();
        document.getElementById("cantidad-"+idOption).value = 1;
    }
    labelShowHide();
    $("#materiales-altaPD").val("[" + selectedOptions + "]");
    verificar_cantidades();
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
function setColor(idOption,color){
    $("#"+String(idOption)+"-img").css("background-color", String(color));
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


function verificar_cantidad(id){
    var val = document.getElementById("cantidad-"+id).value;
    if(Number(val) == NaN || Number(val) <= 0){
        document.getElementById("alta-btn").disabled = true;
        document.getElementById("error-"+id).innerHTML = "* Error";
    }else{
        document.getElementById("error-"+id).innerHTML = "";
    }
    verificar_cantidades();
}


function verificar_cantidades(){
    var inputs = document.getElementsByClassName("cant-input");
    var costos = document.getElementsByClassName("cost-input");
    var cards = document.getElementsByClassName("card-altaPD");
    var sum = 0;
    var sum_cantidades = 0;
    var hayerror = false;
    var val;
    for(i=0;i<inputs.length;i++){
        if(cards[i].style.display != "none"){
            val = inputs[i].value;
            if(Number(val) == NaN || Number(val) <= 0){
                document.getElementById("siguiente-btn").disabled = true;
                hayerror = true;
            }else{
                sum+=Number(val)*Number(costos[i].value);
                sum_cantidades += Number(val);
            }
        }
    }
    if(!hayerror){
        document.getElementById("ciInput").value = String(sum);
        document.getElementById('bottomAltaModalText').innerHTML="Costo de Insumos: ARS $"+String(sum);
        document.getElementById("siguiente-btn").disabled = false;
        if(sum_cantidades <= 0){
            document.getElementById("siguiente-btn").disabled = true;
            $("#warning-label-altaPD").show()
            document.getElementById("se-req-msj").hidden = true;
            document.getElementById('bottomAltaModalText').hidden = true;
        }else{
            $("#warning-label-altaPD").hide()
            document.getElementById("se-req-msj").hidden = false;
            document.getElementById('bottomAltaModalText').hidden = false;
        }
    }
}


function openModalInsumos(nombre, insumos,cantidades){
    if(insumos.length == 0){
        insumos = [-1];
    }
    $.getJSON("/articulos/insumos/"+insumos,function (result){
            if(result){
                $("#no-mats").hide();
                card = $("#material-card").clone();
                $("#materiales-modal-body").children("#material-card").remove();
                // Borro contenido anterior
                //document.getElementById("modalTableBody"). innerHTML="";
                //document.getElementById("headerRow").innerHTML ="";

                // Establezco título
                document.getElementById("headingModalMat").innerHTML = "Insumos que componen a " + nombre;
                document.getElementById("open-loading-modal").click();
                document.getElementById("open-modal-mat").click();

                row = document.getElementById("material-card");
                for(i=0; i < result.length ; i++){
                    clone = card.clone();
                    clone.find("#nombre-material").text(result[i]["nombre"]);
                    var size;
                    if(result[i]["nombre"].length < 15){
                        size = "20px";
                    }
                    else if(result[i]["nombre"].length < 20){
                        size = "17px";
                    }else if(result[i]["nombre"].length < 25){
                        size = "15px";
                    }
                    else{
                        size = "13px";
                    }
                    clone.find("#nombre-material").css("text-align","center");
                    clone.find("#nombre-material").css("font-size",size);
                    clone.find("#unidad-medida").text(result[i]["unidadmedida"]);
                    clone.find("#material-img").css('background-color',result[i]["color"]);
                    clone.find("#material-img").text(result[i]["nombre"][0]);
                    clone.find("#cantidad").text(cantidades[i]);
                    clone.show();
                    clone.appendTo("#materiales-modal-body");
            
                }
            }
            else{
                document.getElementById("headingModalMat").innerHTML = "Insumos que componen a " + nombre;
                document.getElementById("open-loading-modal").click();
                document.getElementById("open-modal-mat").click();
                $("#no-mats").show();
            }
    })
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





function openMenuMod() {
    $("#menu-option-box-2").fadeIn();
    $(".dropdown-box").css("border","1px solid #95C22B");
    $('#cards-row-materiales-mod').css({"transform":"translateY(200px)"});
    $("#bottomMatText").css({"transform":"translateY(200px)"});
    $("#bottomMatText").css({"margin-bottom":"25px"});
    $("#bottomAltaModalText-mod").css({"transform":"translateY(200px)"});
    $("#bottomAltaModalText-mod").css({"margin-bottom":"25px"});
    $("#bottom-row").css({"transform":"translateY(200px)"});
    $(".margin-row").show();
    $(".margin-row").css({"transform":"translateY(200px)"});
    $("#bottom-row").css({"margin-bottom":"25px"});
};


function closeMenuMod() {
    $("#menu-option-box-2").hide();
    $(".dropdown-box").css("border","1px solid rgb(184, 184, 184)");
    $('#cards-row-materiales-mod').css({"transform":"translateY(0px)"});
    $("#bottomMatText").css({"transform":"translateY(0px)"});
    $("#bottomMatText").css({"margin-bottom":""});
    $("#bottomAltaModalText-mod").css({"transform":"translateY(0px)"});
    $("#bottomAltaModalText-mod").css({"margin-bottom":""});
    $("#bottom-row").css({"transform":"translateY(0px)"});
    $("#bottom-row").css({"margin-bottom":""});
    $(".margin-row").css({"transform":"translateY(0px)"});
    $(".margin-row").hide();
};

function  dropdownOptionSelectMod(idOption, cantidad){
    if (selectedOptionsMod.includes(idOption)){
        const index = selectedOptionsMod.indexOf(idOption);
        if (index > -1) {
            selectedOptionsMod.splice(index, 1);
        }
        $("#" + String(idOption) + "-check-mod").hide();
        $("#" + String(idOption) + "-card-mod").hide();
        document.getElementById("cantidad-mod-"+idOption).value = 0;
    }
    else{
        selectedOptionsMod.push(idOption);
        $("#" + String(idOption) + "-check-mod").show();
        $("#" + String(idOption) + "-card-mod").show();
        document.getElementById("cantidad-mod-"+idOption).value = cantidad;
    }
    verificar_cantidades_mod();
    labelShowHideMod();
}

//Manejo de carteles en la seleccion de materiales del dropdown.
function labelShowHideMod(){
    if (selectedOptionsMod.length == 0){
        $(".indicator-label-2").hide();
        $(".bottom-modal-text").hide();
        $("#warning-label-mod").fadeIn(1000);
        document.getElementById("edit-btn").disabled = true;
    }
    else{
        $(".bottom-modal-text").fadeIn(400);
        $(".indicator-label-2").show();
        $("#warning-label-mod").hide();
        document.getElementById("edit-btn").disabled = false;
    }
}

//Cierra el dropdown al clickear fuera de el y su
$(document).on('click', function (e) {
    if ($(e.target).closest("#dropdown-mod").length === 0) {
        if (menuShownMod == true){
            closeMenuMod();
            headingOptionLeave();
            menuShownMod=false;
        }
    }
});




//Funcion principal de manejo del compartamiento el dropdown.
function dropdownManagerMod(){
    if (menuShownMod == false){
        openMenuMod();
        headingOptionHover();
        menuShownMod = true
    }
    else{
        closeMenuMod();
        headingOptionLeave();
        menuShownMod=false;
    }

}


function verificar_cantidad_mod(id){
    var val = document.getElementById("cantidad-mod-"+id).value;
    if(Number(val) == NaN || Number(val) <= 0){
        document.getElementById("edit-btn").disabled = true;
        document.getElementById("error-mod-"+id).innerHTML = "* Error";
    }else{
        document.getElementById("error-mod-"+id).innerHTML = "";
    }
    verificar_cantidades_mod();
}


function verificar_cantidades_mod(){
    var inputs = document.getElementsByClassName("cant-input-mod");
    var costos = document.getElementsByClassName("cost-input-mod");
    var cards = document.getElementsByClassName("card-mod");
    var sum = 0;
    var hayerror = false;
    var val;
    for(i=0;i<inputs.length;i++){
        cantidades_mod[i] = Number(inputs[i].value);
        if(cards[i].style.display != "none"){
            val = inputs[i].value;
            if(Number(val) == NaN || Number(val) <= 0){
                document.getElementById("edit-btn").disabled = true;
                hayerror = true;
            }else{
                sum+=Number(val)*Number(costos[i].value);
            }
        }
    }
    console.log(sum);
    if(!hayerror){
        document.getElementById("ciInput-mod").value = String(sum);
        document.getElementById('bottomMatText').innerHTML="Costo de Insumos: ARS $"+String(sum);
        document.getElementById("edit-btn").disabled = false;
    }
    check_edit();
}


function truncateString(str, num) {
    // If the length of str is less than or equal to num
    // just return str--don't truncate it.
    if (str.length <= num) {
      return str
    }
    // Return str truncated with '...' concatenated to the end of str.
    return str.slice(0, num) + '...'
  }


function openModalDesc(id,nom,desc){
    document.getElementById("headingModalDesc").innerHTML = "Descripción de " + nom;
    document.getElementById("idDescInput").value = id;
    $("#desc-row").show();
    $("#edit-row").hide();
    $("#edit-btn").show();
    $("#listo-desc-btn").show();
    if(desc != ""){
        document.getElementById("desc-label").style.color = "#000";
        document.getElementById("desc-label").innerHTML = desc;
    }else{
        document.getElementById("desc-label").style.color = "#666";
        document.getElementById("desc-label").innerHTML = "Este artículo no tiene descripción.";
    }
    
    document.getElementById("open-modal-desc").click();
}


function edit_desc(){
    $("#desc-row").hide();
    $("#edit-row").show();
    document.getElementById("descEditInput").value = document.getElementById("desc-label").innerHTML;
    $("#edit-btn").hide();
    $("#listo-desc-btn").hide();
    $("#cancel-btn").show();
    $("#confirm-btn").show();
}

function cancel_edit_desc(){
    $("#desc-row").show();
    $("#edit-row").hide();
    document.getElementById("descEditInput").value = "";

    $("#edit-btn").show();
    $("#listo-desc-btn").show();
    $("#cancel-btn").hide();
    $("#confirm-btn").hide();
}

function confirmar_desc_load(){
    jQuery.noConflict();
    $("#cancel-btn").attr("disabled", true);
    $("#confirm-btn").attr("disabled", true);
    $("#edit-row").hide();
    $(".lds-ring").hide();
    $(".lds-ring div").css("border-color", "#95C22B transparent transparent transparent");
    $(".lds-ring").show();
    $("#loadingRow").show();
}

function confirmar_desc(){
    document.getElementById("desc-modal-body").submit();
}