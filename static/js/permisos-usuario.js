var idModulos = [];
var idTipoUsuario = false;
var tipoUsuario = false;
var tiposUsuarioNames = [];

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