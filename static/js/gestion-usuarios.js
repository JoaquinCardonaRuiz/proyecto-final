//Variables globales
var del = false;
var mod = false;
var nombres = false;
var alta_form_page = 1;
var provincia = true;
var pais = true;
var ciudad = true;
var altura = false;
var calle = false;
var nombre = false;
var email = false;
var apellido = false;
var documento = false;
var tipo_doc = false;
var tipo_usuario = false;

//Cambios
var cambio_nombre = false;
var cambio_apellido = false;

var cambio_estado = false;
var cambio_provincia = false;
var cambio_calle = false;
var cambio_altura = false;
var cambio_ciudad = false;
var cambio_pais = false;

var cambio_email = false;
var cambio_tipo_doc = false;
var cambio_doc = false;
var cambio_tu = false;

//Valores originales
var email_ant = false;
var nombre_ant = false;
var apellido_ant = false;
var provincia_ant;
var calle_ant = false;
var altura_ant = false;
var ciudad_ant = false;
var provincia_ant = false;
var pais_ant = false;
var id_tipo_doc_ant = false;
var documento_ant = false;
var id_tipo_usuario_ant = false;


//Asteriscos de error
var error_nombre = false;
var error_apellido = false;
var error_doc = false;
var error_email = false;

var error_provincia = false;
var error_calle = false;
var error_altura = false;
var error_pais = false;
var error_ciudad = false;

//Lista de valores ya registrados
var emails = [];
var documentos = [];

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
        $("#" + String(idOption) + "-check").fadeOut();
        $("#" + String(idOption) + "-card").fadeOut();
    }
    else{
        selectedOptions.push(idOption);
        $("#" + String(idOption) + "-check").fadeIn();
        setColor(idOption,color);
        $("#" + String(idOption) + "-card").fadeIn();
    }
    labelShowHide();
    $("#materiales-altaPD").val("[" + selectedOptions + "]");  
     
}



//Efecto CSS el botón del extremo derecho de los botones principales del modulo.
$("#option-right").hover(function(){
    $(this).css("border", "2px solid #95C22B");
    }, function(){
    if (del == false){
        $(this).css("border", "2px solid transparent");
    }
  });

//Efecto CSS el botón del medio de los botones principales del modulo.
$("#option-middle").hover(function(){
    $(this).css("border", "2px solid #95C22B");
    }, function(){
    if (mod == false){
        $(this).css("border", "2px solid transparent");
    }
  });

//Hace aparecer y desaprecer los iconos para eliminar al lado de cada elemento de la lista.
function removerPunto(){
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

//Hace aparecer y desaprecer los iconos para modificar al lado de cada elemento de la lista.
function modificarPunto(){
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




function cierraModal(idModal){
    jQuery.noConflict();
    $('#loadingModal').modal('hide');
}

function openLoadingRing(){
    document.getElementById("open-loading-modal").click();
    $(".lds-ring").hide();
    $(".lds-ring div").css("border-color", "#95C22B transparent transparent transparent");
    $(".lds-ring").show();
    $("#loadingRow").show();
}






//Valida que ningún campo de la dirección tenga un valor.
function validaDireccion(modal_type, campoValidacion){
    if (modal_type == 'alta'){
        if (campoValidacion == 'provincia'){
            if ($("#provinciaPD").val() == ""){
                provincia = false;
                $("#error-provincia").show();
            }
            else{
                provincia = true;
                $("#error-provincia").hide(); 
            }
        }
        else if (campoValidacion == 'ciudad'){
            if ($("#ciudadPD").val() == ""){
                ciudad = false;
                $("#error-ciudad").show();
            }
            else{
                ciudad = true; 
                $("#error-ciudad").hide();
            }
        }
        else if (campoValidacion == 'pais'){
            if ($("#paisPD").val() == ""){
                pais = false;
                $("#error-pais").show();
            }
            else{
                pais = true; 
                $("#error-pais").hide();
            }
        }
        else if (campoValidacion == 'altura'){
            if ($("#alturaPD").val() == ""){
                altura = false;
                $("#error-altura").show();
            }
            else{
                altura = true;
                $("#error-altura").hide(); 
            }
        }
        else if (campoValidacion == 'calle'){
            if ($("#callePD").val() == ""){
                calle = false;
                $("#error-calle").show(); 
            }
            else{
                calle = true;
                $("#error-calle").hide();  
            }
        }
        if (provincia == true && ciudad == true && pais == true && calle == true && altura == true){
            $('#primary-btn-alta').prop('disabled', false);
        }
        else{
            $('#primary-btn-alta').prop('disabled', true);
        }
    }
    else if (modal_type == 'mod'){
        if (campoValidacion == 'provincia'){
            if ($("#provinciaPDMod").val() == ""){
                cambio_provincia = true;
                error_provincia = true;
                $("#error-provincia-mod").show();
            }
            else if ($("#provinciaPDMod").val() == provincia_ant){
                cambio_provincia = false;
                error_provincia = false;
                $("#error-provincia-mod").hide(); 
            }
            else{
                cambio_provincia = true;
                error_provincia = false;
                $("#error-provincia-mod").hide(); 
            }
        }
        else if (campoValidacion == 'calle'){
            if ($("#callePDMod").val() == ""){
                cambio_calle = true;
                error_calle = true;
                $("#error-calle-mod").show();
            }
            else if ($("#callePDMod").val() == calle_ant){
                cambio_calle = false;
                error_calle = false;
                $("#error-calle-mod").hide(); 
            }
            else{
                cambio_calle = true;
                error_calle = false;
                $("#error-calle-mod").hide(); 
            }
        }
        else if (campoValidacion == 'altura'){
            if ($("#alturaPDMod").val() == ""){
                cambio_altura = true;
                error_altura = true;
                $("#error-altura-mod").show();
            }
            else if ($("#alturaPDMod").val() == altura_ant){
                cambio_altura = false;
                error_altura = false;
                $("#error-altura-mod").hide(); 
            }
            else{
                cambio_altura = true;
                error_altura = false;
                $("#error-altura-mod").hide(); 
            }
        }
        else if (campoValidacion == 'ciudad'){
            if ($("#ciudadPDMod").val() == ""){
                cambio_ciudad = true;
                error_ciudad = true;
                $("#error-ciudad-mod").show();
            }
            else if ($("#ciudadPDMod").val() == ciudad_ant){
                cambio_ciudad = false;
                error_ciudad = false;
                $("#error-ciudad-mod").hide(); 
            }
            else{
                cambio_ciudad = true;
                error_ciudad = false;
                $("#error-ciudad-mod").hide(); 
            }
        }
        else if (campoValidacion == 'pais'){
            if ($("#paisPDMod").val() == ""){
                cambio_pais = true;
                error_pais = true;
                $("#error-pais-mod").show();
            }
            else if ($("#paisPDMod").val() == pais_ant){
                cambio_pais = false;
                error_pais = false;
                $("#error-pais-mod").hide(); 
            }
            else{
                cambio_ciudad = true;
                error_ciudad = false;
                $("#error-ciudad-mod").hide(); 
            }
        }
        error_direccion();
        calc_cant_cambios();

    }
    
}


//Calcula la cantidad total de cambios en el Modal de Modificar.
function calc_cant_cambios(){
    cant_cambios = 0;

    //Datos Personales
    if (cambio_nombre == true){
        cant_cambios +=1;
    }
    if (cambio_apellido == true){
        cant_cambios += 1;
    }
    if (cambio_email == true){
        cant_cambios += 1;
    }

    //Direccion
    if (cambio_provincia == true){
        cant_cambios += 1;
    }
    if (cambio_calle == true){
        cant_cambios += 1;
    }
    if (cambio_altura == true){
        cant_cambios += 1;
    }
    if (cambio_ciudad == true){
        cant_cambios += 1;
    }
    if (cambio_pais == true){
        cant_cambios += 1;
    }

    //Documento
    if (cambio_tipo_doc == true){
        cant_cambios += 1;
    }
    if (cambio_doc == true){
        cant_cambios += 1;
    }
    
    //Tipo Usuario
    if (cambio_tu == true){
        cant_cambios += 1;
    }

    $("#primary-btn-mod").text("Confirmar " + String(cant_cambios) + " cambios");

    if (cant_cambios > 0){
        if (error_datos_personales() == true || error_direccion() == true || error_documento() == true){
            $('#primary-btn-mod').prop('disabled', true);
        }
        else{
            $('#primary-btn-mod').prop('disabled', false);
        }
    }
    else{
        $('#primary-btn-mod').prop('disabled', true);
    }
}

function error_datos_personales(){
    if (error_nombre == true || error_apellido == true || error_email == true){
        $("#db-error-tab").show();
        return true;
    }
    else{
        $("#db-error-tab").hide();
        return false;
    }
}

function error_direccion(){
    if (error_provincia == true || error_calle == true || error_altura == true || error_ciudad == true || error_pais == true){
        $("#dir-error-tab").show();
        return true;
    }
    else{
        $("#dir-error-tab").hide();
        return false;
    }
}

function error_documento(){
    if (error_doc == true){
        $("#doc-error-tab").show();
        return true;
    }
    else{
        $("#doc-error-tab").hide();
        return false;
    }
}

//Valida e impide que los input sean caracteres distintos de numeros.
function isNumberKey(txt, evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)){
        return false;
    }
    else{
        return true;
    }
  }


//Hace el submit de un form de modifiar PD.
function submitFormMod(){

    //Manejo de elementos de carga y ocultamientos
    $("#bottomAltaModalTextModPD").hide();      
    $("#bottomModModalText").show();
    $("#modal-mod-p1").show();
    $("#loadingRowMod").show();
    $(".lds-ring div").css("border-color", "#95C22B transparent transparent transparent");
    $(".lds-ring").show().fadeIn(500);
    $("#modPdForm").hide();
    $('#primary-btn-mod').prop('disabled', true);
    $('#secondary-btn-mod').prop('disabled', true);

    //Manejo de datos
    $( "#modPdForm" ).submit();

    //Funcion que va cambiando los mensajes de carga.
    nextMsgMod();

}



//Traslada el scroll al tope de la pagina en el form de alta de un PD.
function goToTopOfPage(){
    $('#modalAltaPDBody').scrollTop(0);    
}

//Traslada el scroll al tope de la pagina en el form de alta de un PD.
function goToTopOfPageMod(){
    $('#modalModPDBody').scrollTop(0);    
}

//Funcion para el manejo de los mensajes durante la carga.
function nextMsgMod() {
    if (messagesMod.length == 1) {
        $('#bottomModModalText').html(messagesMod.pop()).fadeIn(500);

    } else {
        $('#bottomModModalText').html(messagesMod.pop()).fadeIn(500).delay(7500).fadeOut(500, nextMsgMod);

    }
};


function nextMsgBaja() {
    if (messagesBaja.length == 1) {
        $('#bottomBajaModalText').html(messagesBaja.pop()).fadeIn(500);

    } else {
        $('#bottomBajaModalText').html(messagesBaja.pop()).fadeIn(500).delay(7500).fadeOut(500, nextMsgBaja);
    }
};

function select(){
    document.getElementById("first-button").click;
}

// Lista de mensajes para la carga del Modal de modifcar nivel.
var messagesMod = [
    "Estamos aplicando las modificaciones...",
    "Ajustando algunos detalles",
    "¡Casi listo! Últimos retoques"
].reverse();


// Lista de mensajes para la carga del Modal de baja nivel.
var messagesBaja = [
    "Estamos eliminando el Usuario...",
    "¡Casi listo! Últimos retoques"
].reverse();

function updateMap(modal_type){
    if (modal_type == 'alta'){
        direccion = encodeURI(String($("#callePD").val()) + String($("#alturaPD").val()) + String($("#ciudadPD").val()) + String($("#provinciaPD").val()) + String($("#paisPD").val()))
        src_value = "https://maps.google.com/maps?q=" + direccion + "&t=&z=15&ie=UTF8&iwloc=&output=embed";
        $("#gmap_canvas").attr("src",src_value);
    }
    else if (modal_type == 'mod'){
        direccion = encodeURI(String($("#callePDMod").val()) + String($("#alturaPDMod").val()) + String($("#ciudadPDMod").val()) + String($("#provinciaPDMod").val()) + String($("#paisPDMod").val()))
        src_value = "https://maps.google.com/maps?q=" + direccion + "&t=&z=15&ie=UTF8&iwloc=&output=embed";
        $("#gmap_canvas_mod").attr("src",src_value);
    }
    
}



function openModModal(nombre, estado, calle, altura, ciudad, provincia, pais, id_direccion, apellido, email, nro_doc,id_doc, id_tu,id_usuario){
    jQuery.noConflict();
    
    //Consultas a endpoints
    $.getJSON("/gestion-usuarios/get-list/emails",function (result){
        console.log(result);
        for (var i in result){
            emails.push(result[i]);
        }
    });

    $.getJSON("/gestion-usuarios/get-list/documentos",function (result){
        console.log(result);
        for (var j in result){
            documentos.push(result[j]);
        }
    });
    

    //Define que se debe mostrar y que se oculta.
    
    $("#db-error-tab").hide();
    $("#dir-error-tab").hide();
    $("#doc-error-tab").hide();
    $("#mat-error-tab").hide();
    $("#error-provincia-mod").hide();
    $("#error-ciudad-mod").hide();
    $("#error-calle-mod").hide();
    $("#error-altura-mod").hide();
    $("#error-pais-mod").hide(); 
    $("#name-error").hide();
    $("#apellido-error").hide();
    $("#email-error").hide();
    $("#loadingRowMod").hide();
    $(".lds-ring").hide();

    //Seteo de valores iniciales en inputs.
    $("#idUsuario").val(id_usuario);
    $("#name-input").val(nombre);
    $("#emailInput").val(email);
    $("#provinciaPDMod").val(provincia);
    $("#ciudadPDMod").val(ciudad);
    $("#callePDMod").val(calle);
    $("#alturaPDMod").val(altura);
    $("#paisPDMod").val(pais);
    $("#idDireccionUser").val(id_direccion);
    $("#apellido-input").val(apellido);
    $("#documentoInput").val(nro_doc);
    $("#tipoDocSelect").val(parseInt(id_doc));
    $("#tipo-usuario").val(parseInt(id_tu))

    updateMap('mod');

    $("#primary-btn-mod").text("Confirmar 0 cambios");
    $('#primary-btn-mod').prop('disabled', true);

    //Seteo de variables iniciales
    email_ant = email;
    nombre_ant = nombre;
    apellido_ant = apellido;
    estado_ant = estado;
    calle_ant = calle;
    altura_ant = altura;
    ciudad_ant = ciudad;
    provincia_ant = provincia;
    pais_ant = pais;
    id_tipo_doc_ant = parseInt(id_doc);
    id_tipo_usuario_ant = parseInt(id_tu);
    documento_ant = nro_doc;
    error_nombre = false;
    error_calle = false;
    error_provincia = false;
    error_altura = false;
    error_provincia = false;
    error_pais = false;
    error_email = false;
    error_apellido = false;
    error_doc = false;
    document.getElementById("db-tab").click();
    selectedOptionsMod = [];
    

    //TODO: Ver si los errores suman al conteo de cambios o no.
    $("#modPDModal").modal("show");
    
}

function validateEmail(elementValue){
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (elementValue == email_ant){
        email = false;
        error_email = false;
        cambio_email = false;
        $("#email-error").fadeOut();
    }      
    else if (emails.includes(String(elementValue))){
        email = false;
        error_email = true;
        cambio_email = true;
        $("#email-error").text("* El email ya se encuentra registrado.");
        $("#email-error").fadeIn();
    }      
    else if (elementValue == ""){
        email = false;
        error_email = true;
        cambio_email = true;
        $("#email-error").text("* El email no puede quedar vacío.");
        $("#email-error").fadeIn();
    }
    else if (emailPattern.test(elementValue)){
        email = true;
        cambio_email = true;
        error_email = false;
        $("#email-error").fadeOut();
    }
    else{
        email = false;
        error_email = true;
        cambio_email = true;
        $("#email-error").text("* Formato email inválido");
        $("#email-error").fadeIn();
    }
    error_datos_personales();
    calc_cant_cambios();
}

function validaNombre(value){
    if (value == nombre_ant){
        $("#name-error").fadeOut();
        cambio_nombre = false;
        error_nombre = false;
        nombre = false;
    }
    else if (value == ""){
        $("#name-error").fadeIn();
        error_nombre = true;
        nombre = false;
        cambio_nombre = true;
    }
    else{
        $("#name-error").fadeOut();
        error_nombre = false;
        nombre = true;
        cambio_nombre = true;
    }
    error_datos_personales();
    calc_cant_cambios();  
}

function validaApellido(value){
    if (value == apellido_ant){
        $("#name-error").fadeOut();
        apellido = false;
        cambio_apellido = false;
        error_apellido = false;
    }
    else if (value == ""){
        $("#apellido-error").fadeIn();
        apellido = false;
        cambio_apellido = true;
        error_apellido = true;
    }
    else{
        $("#apellido-error").fadeOut();
        apellido = true;
        cambio_apellido = true;
        error_apellido = false;
    }
    error_datos_personales();
    calc_cant_cambios();
}

function validaTipoDoc(value){
    if (parseInt(value) != parseInt(id_tipo_doc_ant)){
        tipo_doc = true;
        cambio_tipo_doc = true;
    }
    else{
        tipo_doc = false;
        cambio_tipo_doc = false;
    }
    calc_cant_cambios();
}

function validaTU(value){
    if (value != id_tipo_usuario_ant){
        tipo_usuario = true;
        cambio_tu = true;
    }
    else{
        tipo_usuario = false;
        cambio_tu = false;
    }
    calc_cant_cambios();
}

function validaDoc(val){
    if (val == documento_ant){
        $("#error-doc").fadeOut();
        documento = false;
        cambio_doc = false;
        error_doc = false;
    }
    else if (documentos.includes(String(val))){
        $("#error-doc").text("* El documento ya se encuentra registrado.");
        $("#error-doc").fadeIn();
        documento = false;
        cambio_doc = true;
        error_doc = true;
    }
    else if (val == ""){
        $("#error-doc").text("* El documento no puede quedar vacío.");
        $("#error-doc").fadeIn();
        documento = false;
        cambio_doc = true;
        error_doc = true;
    }
    else{
        $("#error-doc").fadeOut();
        documento = true;
        cambio_doc = true;
        error_doc = false;
    }
    error_documento();
    calc_cant_cambios();
}

function closeModModal(){
    $("#modPDModal").modal("hide");
}

function configureModalTab(mod_form_page){
    if (mod_form_page == 1){
        $("#modal-mod-p3").hide();
        $("#modal-mod-p2").hide();
        $("#modal-mod-p4").hide();
        $("#modal-mod-p1").show();
        $("#bottomAltaModalTextModPD").css({"transform":"translateY(-30px)"});
        $("#subheader-mod").text("Datos Personales");
        goToTopOfPageMod();
     }
     else if (mod_form_page == 2){
        $("#modal-mod-p1").hide();
        $("#modal-mod-p3").hide();
        $("#modal-mod-p4").hide();
        $("#modal-mod-p2").show();
        $("#bottomAltaModalTextModPD").css({"transform":"translateY(-30px)"});
        $("#subheader-mod").text("Dirección");
        goToTopOfPageMod();
     }
     else if (mod_form_page == 3){
        $("#modal-mod-p1").hide();
        $("#modal-mod-p2").hide();
        $("#modal-mod-p4").hide();
        $("#modal-mod-p3").show();
        $("#subheader-mod").text("Documento");
        $(".margin-row").hide();
        $("#bottomAltaModalTextModPD").css({"transform":"translateY(-30px)"});
        goToTopOfPageMod();
     } 
     else{
        $("#modal-mod-p1").hide();
        $("#modal-mod-p2").hide();
        $("#modal-mod-p3").hide();
        $("#modal-mod-p4").show();
        $("#subheader-mod").text("Tipo de Usuario");
        goToTopOfPageMod();
     }
}



//Abre el modal de baja.
function openBajaModal(nombre, id){
    jQuery.noConflict();
    $(".lds-ring").hide();

    $("#bajaPDModal").modal("show");
    $("#baja-question").text("¿Está seguro que desea eliminar al usuario " + String(nombre) + "?");
    $("#idPuntoBaja").val(String(id));
    

}

//Hace el submit del form de baja de un punto de Depósito.
function baja_PD(){

    //Manejo de interfaz
    $("#fieldsRowBaja").hide();
    $(".lds-ring div").css("border-color", "#cf4545 transparent transparent transparent");
    $(".lds-ring").show().fadeIn(500);
    $('#bottomBajaModalText').show();
    $('#bottomBajaModalText').css({"margin-top":"-2%"});
    $('#primary-btn-alert').prop('disabled', true);
    $('#secondary-btn-baja').prop('disabled', true);

    //Manejo de datos
    $( "#bajaPDform" ).submit();

    //Funcion que va cambiando los mensajes de carga.
    nextMsgBaja();
}


function openInfoModal(id, nombre, apellido,tu, estado,documento,email){
    $("#headingModalInfo").text("Información del Usuario " + String(id));
    $("#nombreModal").val(nombre + " " + apellido);
    $("#tipoUsuarioModal").val(tu);
    $(".circle-color-modal").hide();
    if (estado == 'habilitado'){
        $("#estado-activo-modal").show();
        $("#estadoModal").text("Habilitado");
    }
    else if (estado == 'no-activo'){
        $("#estado-semi-inactivo-modal").show();
        $("#estadoModal").text("No Activo");
    }
    else{
        $("#estado-inactivo-modal").show();
        $("#estadoModal").text("Sin Verificar");
    }
    $("#documentoModal").val(documento);
    $("#emailModal").val(email);

    jQuery.noConflict();
    $("#infoModal").modal('show');
}


function set_ep_logo_pos(cant_ep){
    left_factor = 12 * String(num).length;
    var top_input = document.getElementById("EPModal").offsetTop;
    var left_input = document.getElementById("EPModal").offsetLeft;
    $("#ep-logo-modal-info").css({top: top_input + 11, position:'absolute'});
    $("#ep-logo-modal-info").css({left: left_input + left_factor, position:'absolute'});
}
