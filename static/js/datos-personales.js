var img_hide = false;
var apellido = false;
var nombre = false;
var provincia = true;
var pais = true;
var ciudad = true;
var altura = false;
var calle = false;
var documento = false;
var tipo_doc = false;
var documentos = [];


$.getJSON("/perfil/get-list/documentos_no_filter",function (result){
    for (var j in result){
        documentos.push(result[j]);
    }
});

$( window ).resize(function() {
    reduceWindow();
});

$(".content-container").fadeIn();
$(".content-container").css({"transform":"translateX(7rem)"});

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
        enable_disable_button();
    }
}

function validaDoc(val){
    if (documentos.includes(String(val))){
        $("#error-doc").text("* El documento ya se encuentra registrado.");
        $("#error-doc").show();
        documento = false;
    }
    else if (val == ""){
        $("#error-doc").text("* El documento no puede quedar vacío.");
        $("#error-doc").show();
        documento = false;
    }
    else{
        $("#error-doc").hide();
        documento = true;
    }
}

function reduceWindow(){
    if($( window ).width() < 1050 && $( window ).width() > 800){
        $(".content-container").css({"transform":"translateX(4rem)"});
    }
    if ($( window ).width() < 800){
        if (img_hide == false){
            $(".img-login").fadeOut();
            $(".content-container").css({"transform":"translateX(-57%)"});
            $("#register-label").css({"width":"130%"});
            $("#register-label").css({"transform":"translateX(-57%)"});
            img_hide = true;
        }
    }
    else if ($( window ).width() > 800){
        if (img_hide == true){
            $(".img-login").fadeIn(1000);
            $(".content-container").css({"transform":"translateX(7rem)"});
            $("#register-label").css({"width":"96%"});
            $("#register-label").css({"transform":"translateX(0%)"});


            img_hide = false;
        }
    } 
}

function redirectBlank(){
    link = "https://" + domain;
    window.open(
        link,
        '_blank' // <- This is what makes it open in a new window.
    );
    }

function validaNombre(value){
    if (value == ""){
        $("#name-error").fadeIn();
        nombre = false;
    }
    else{
        $("#name-error").fadeOut();
        nombre = true;
    }
    enable_disable_button();
}

function validaApellido(value){
    if (value == ""){
        $("#apellido-error").fadeIn();
        apellido = false;
    }
    else{
        $("#apellido-error").fadeOut();
        apellido = true;
    }
    enable_disable_button();
}

function validaTipoDoc(value){
    if (value != -1){
        tipo_doc = true;
    }
    else{
        tipo_doc = false;
    }
    enable_disable_button();
}

function enable_disable_button(){
    if (nombre && apellido && documento && tipo_doc && calle && altura && ciudad && provincia && pais){
        $("#start-button").css({"background-color":"#95C22B"});
        $("#start-button").css({"border":"1px solid #95C22B"});
    }
    else{
        $("#start-button").css({"background-color":"#d8d9e2"});
        $("#start-button").css({"border":"1px solid #d8d9e2"});
    }
}


function validaPassRep(user_call=true){
    if (first_time2 & user_call){
        first_time2 = false;
    }
    if (first_time2==false){
        if ($("#repeat-password-input").val() == $("#password-input").val()){
            repeat_password = true;
            $("#repeat-password-error").hide();
        }
        else{
            repeat_password = false;
            $("#repeat-password-error").show();
        }
        enable_disable_button();
    }    
}

$("#start-button").css({"background-color":"#d8d9e2"});
$("#start-button").css({"border":"1px solid #d8d9e2"});

function activa_cuenta(){
    $("#register-form").fadeOut();
    $("#loadingRowLogin").fadeIn();
    $("#loading-text-login").fadeIn();
    $("#error-msg-login").hide();

    $("#register-form").submit();
}

var pos_check = document.getElementById("exampleCheck1").offsetLeft;
$("#check-label").css({left: pos_check + 10, position:'absolute'});


