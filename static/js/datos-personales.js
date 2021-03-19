var img_hide = false;
var apellido = false;
var nombre = false;
var provincia = true;
var pais = true;
var ciudad = true;
var altura = false;
var calle = false;
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
    }
}

function validaDoc(val){
    if (documentos.includes(String(val))){
        $("#error-doc").text("* El documento ya se encuentra registrado.");
        $("#error-doc").show();
        doc = false;
    }
    else if (val == ""){
        $("#error-doc").text("* El documento no puede quedar vacío.");
        $("#error-doc").show();
        doc = false;
    }
    else{
        $("#error-doc").hide();
        doc = true;
    }
    enable_disable_doc();
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

function submitLogin(){
    if (email && password){
        email_val = $("#email-input").val();
        password_val = $("#password-input").val();
        $("#error-msg-login").hide();

        $("#loadingRowLogin").fadeIn();
        $("#loading-text-login").fadeIn();
        $("#olvido-password").hide();
        $("#start-button").hide();
        $("#email-input-group").hide();
        $("#password-input-group").hide();
        $("#pass-reqs-row").hide();
        $("#repeat-password-input-group").hide();
        $(".form-check").hide();
        $.getJSON("/register/alta-usuario/"+String(email_val)+"/"+String(password_val),function (result){
            if(result){
                domain = "";
                add = false;
                for (var i in String(email_val)){
                    if (add){
                        domain += email_val[i];
                    }
                    else if (email_val[i] == "@"){
                        add = true;
                    }
                }
                $("#email-button").text("Ir a " + domain);
                $(".register-form").fadeOut();
                $("#email-container").fadeIn();
                $("#email-direction-label").text(email_val);
            }
            else if (result == "Email"){
                $(".error-msg-text").text("¡Ups! Hay un problema con tu dirección de email")
                $("#loadingRowLogin").hide();
                $("#loading-text-login").hide();
                $("#error-msg-login").fadeIn();
                $("#olvido-password").fadeIn();
                $("#start-button").fadeIn();
                $("#email-input-group").fadeIn();
                $("#password-input-group").fadeIn();
                $("#pass-reqs-row").fadeIn();
                $("#repeat-password-input-group").fadeIn();
                $(".form-check").fadeIn();
            }
            else if (result == "Password"){
                $(".error-msg-text").text("¡Ups! Hay un problema con tu dirección de contraseña")
                $("#loadingRowLogin").hide();
                $("#loading-text-login").hide();
                $("#error-msg-login").fadeIn();
                $("#olvido-password").fadeIn();
                $("#start-button").fadeIn();
                $("#email-input-group").fadeIn();
                $("#password-input-group").fadeIn();
                $("#pass-reqs-row").fadeIn();
                $("#repeat-password-input-group").fadeIn();
                $(".form-check").fadeIn();
            }
            else{
                $(".error-msg-text").text("¡Ups! Algo salió mal al crear tu cuenta")
                $("#loadingRowLogin").hide();
                $("#loading-text-login").hide();
                $("#error-msg-login").fadeIn();
                $("#olvido-password").fadeIn();
                $("#start-button").fadeIn();
                $("#email-input-group").fadeIn();
                $("#password-input-group").fadeIn();
                $("#pass-reqs-row").fadeIn();
                $("#repeat-password-input-group").fadeIn();
                $(".form-check").fadeIn();
            }
        });
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
}

function enable_disable_button(){
    terms_and_conditions = $("#exampleCheck1").is(":checked");
    if (password && email && repeat_password && terms_and_conditions){
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

var pos_check = document.getElementById("exampleCheck1").offsetLeft;
$("#check-label").css({left: pos_check + 10, position:'absolute'});


