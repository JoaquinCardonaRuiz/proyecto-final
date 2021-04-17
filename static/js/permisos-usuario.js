var idModulos = [];
var idTipoUsuario = false;
var tipoUsuario = false;
var tiposUsuarioNames = [];
var page = 1;

function setUserLabel(val){
    $("#tipo-usuario-sel").text(val);
}

function getModulos(id){
    idTipoUsuario = id;
    $("#table-permisos-title").hide();
    $("#permisos-table-disabled").hide();
    $("#permisos-table").hide();
    $("#loading-row-permisos").fadeIn();
    $("#loading-text-permisos").fadeIn();
    if (id == 1){
        $("#loading-row-permisos").hide();
        $("#loading-text-permisos").hide();
        $("#permisos-table").hide();
        $("#table-permisos-title").fadeIn();
        $("#permisos-table-disabled").fadeIn();
    }
    else{
        $.getJSON("/permisos-acceso/modulos/" + String(id),function (modulos){
            for (var i in idModulos){
                if (modulos.includes(idModulos[i])){
                    $("#acceso-" + String(idModulos[i])).prop("checked", true);
                }
                else{
                    $("#acceso-" + String(idModulos[i])).prop("checked", false);
                }
                
            }
            $("#loading-row-permisos").hide();
            $("#loading-text-permisos").hide();
            $("#permisos-table-disabled").hide();
            $("#permisos-table").fadeIn();
            $("#table-permisos-title").fadeIn();

        });
    }   
}

$.getJSON("/permisos-acceso/modulos/all",function (result){
    idModulos = result;
});

$.getJSON("/gestion-usuarios/tipos-usuario/",function (result){
    tiposUsuarioNames = result;
});


function cambiaSwitch(idModulo){
    if ($("#acceso-" + String(idModulo)).is(":checked") == true){
        $.getJSON("/permisos-acceso/add/" + String(idModulo) +"/"+ String(idTipoUsuario),function (result){
            if (result == false){
                $("#acceso-" + String(idModulo)).prop("checked", false);
            }
        });
    }
    else{
        $.getJSON("/permisos-acceso/remove/" + String(idModulo) +"/"+ String(idTipoUsuario),function (result){
            if (result == false){
                $("#acceso-" + String(idModulo)).prop("checked", true);
            }
        });
    }
}

function openAltaModal(){
    jQuery.noConflict();
    $("#tuModal").modal('show');
}

function openBajaModal(){
    jQuery.noConflict();
    $("#tuModalBaja").modal('show');
    $("#tu-reemplazo").val(-1);
}

function validateTU(val){
    if (val == ""){
        $("#tu-error").text("* El nombre no puede quedar vacío.");
        $("#tu-error").fadeIn();
        tipoUsuario = false;
    }
    else if (tiposUsuarioNames.includes(val)){
        $("#tu-error").text("* El nombre ya se encuentra registrado.");
        $("#tu-error").fadeIn();
        tipoUsuario = false;
    }
    else{
        $("#tu-error").fadeOut();
        tipoUsuario = true;
    }
    enable_disable_tu()
}

function enable_disable_tu(){
    if (tipoUsuario){
        $("#primary-btn-tu").prop('disabled',false);
    }
    else{
        $("#primary-btn-tu").prop('disabled',true);
    }
}

function submitForm(){
    $("#tuForm").hide();
    $(".subheader-row").hide();
    $(".label-bottom").hide();  
    $(".lds-ring div").css("border-color", "#95C22B transparent transparent transparent");
    $(".lds-ring").fadeIn(500);
    $("#loadingRow").fadeIn(500);
    $("#bottomAltaModalTextEmail").fadeIn(500);
    $('#primary-btn-tu').prop('disabled', true);
    $('.secondary-btn').prop('disabled', true);
    $( "#tuForm").submit();
    nextMsgEmail();
}

function nextMsgEmail() {
    if (messages.length == 1) {
        $('#bottomAltaModalTextEmail').html(messages.pop()).fadeIn(500);

    } else {
        $('#bottomAltaModalTextEmail').html(messages.pop()).fadeIn(500).delay(10000).fadeOut(500, nextMsgEmail);
    }
};

var messages = [
    "Estamos añadiendo el Tipo de Usuario...",
    "Ajustando algunos detalles",
    "¡Casi listo! Últimos retoques"
].reverse();

function changeTrashColor(id){
    $("#trash-" + String(id)).css("color","#ffffff"); 
}

function changeTrashColorBack(id){
    $("#trash-" + String(id)).css("color","#f14e4eef"); 
} 


$('.list-group-item-del').click(function() {
    nombreBaja = jQuery(this).find( ".my-0" ).text();
    $("#nombreTUbaja").text(String(nombreBaja));
    $("#nombreTUbaja2").text(String(nombreBaja));
    $("#list-group-baja").hide();
    $("#selectReemplazoRow").fadeIn();
    $("#secondary-btn-baja").text('Anterior');
    $("#idTuBaja").val(jQuery(this).find( ".my-1" ).text())
    $("#subheader-alta-tu").text("¿Qué Tipo de Usuario desea asignar a los " + String(nombreBaja) + "?");
    $("#tu-reemplazo").val(-1);
    enable_disable_tu_baja($("#tu-reemplazo").val());
    hideSelectedOption(parseInt(jQuery(this).find( ".my-1" ).text()));
    page = 2;
});

function pageHandler(){
    if (page == 1){
        jQuery.noConflict();
        $("#tuModalBaja").modal('hide');
    }
    else if (page == 2){
        $("#selectReemplazoRow").hide();
        $("#bajaRow").hide();
        $("#list-group-baja").fadeIn();
        $("#subheader-baja").fadeIn();
        $("#primary-btn-alert").prop('disabled',true);
        $("#secondary-btn-baja").text('Cancelar');
        page = 1;
    }
    else{
        $("#bajaRow").hide();
        $("#subheader-baja").fadeIn();
        $("#selectReemplazoRow").fadeIn();
        $("#primary-btn-alert").text('Siguiente');
        page = 2;
    }
}

function submitFormBaja(){
    if (page == 2){
        $("#subheader-baja").hide();
        $("#selectReemplazoRow").hide();
        $("#bajaRow").fadeIn();
        $("#primary-btn-alert").text('Eliminar Tipo de Usuario');
        page = 3;
    }
    else if (page == 3){
        $("#bajaTUform").hide();
        $(".lds-ring div").css("border-color", "#cf4545 transparent transparent transparent");
        $(".lds-ring").fadeIn(500);
        $("#loadingRow").fadeIn(500);
        $("#bottomBajaModalText").fadeIn(500);
        $("#primary-btn-alert").prop('disabled',true);
        $("#secondary-btn-baja").prop('disabled',true);
        $( "#bajaTUform").submit();
        nextMsgBaja();
    }
    
    
}

function nextMsgBaja() {
    if (messagesBaja.length == 1) {
        $('#bottomBajaModalText').html(messagesBaja.pop()).fadeIn(500);

    } else {
        $('#bottomBajaModalText').html(messagesBaja.pop()).fadeIn(500).delay(10000).fadeOut(500, nextMsgBaja);
    }
};

var messagesBaja = [
    "Estamos eliminando el Tipo de Usuario...",
    "Quitando permisos...",
    "¡Casi listo! Últimos retoques"
].reverse();

function enable_disable_tu_baja(val){
    if (val != null){
        $("#primary-btn-alert").prop('disabled',false);
        $("#nuevoNombre").text(val.split(",")[1]);
        $("#idTuBajaRemplazo").val(val.split(",")[0]);
    }
    else{
        $("#primary-btn-alert").prop('disabled',true);
    }
}

function hideSelectedOption(id){
    var myOpts = document.getElementById('tu-reemplazo').options;
    for (var i = 0; i < myOpts.length; i++){
        if (myOpts[i].value != -1){
            valOpt = parseInt(myOpts[i].value.split(",")[0]);
        }
        else{
            valOpt = -1;
        }
        
        if (valOpt == id){
            myOpts[i].setAttribute("disabled", "disabled");
        }
        else if (valOpt != -1){
            myOpts[i].removeAttribute("disabled");
        }
    }
}