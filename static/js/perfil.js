var tab = 1;
var provincia = true;
var pais = true;
var ciudad = true;
var altura = true;
var calle = true;
var doc = true;
var email = true;
var password_ant = false;
var password = false;
var first_time = true;
var repeat_password = false;
var first_time2 = true;


var ant_provincia = true;
var ant_pais = true;
var ant_ciudad = true;
var ant_altura = true;
var ant_calle = true;
var antPassword = false;

var emails = [];
var documentos = [];



function tabHandler(option){
    if (option == 2){
        $("#home-tab").css({"border-bottom":"transparent"});
        $("#security-tab").css({"border-bottom":"transparent"});
        $("#profile-tab").css({"border-bottom":"2px solid #95C22B"});
        tab = 2;
    }
    else if (option == 1){
        $("#profile-tab").css({"border-bottom":"transparent"});
        $("#security-tab").css({"border-bottom":"transparent"});
        $("#home-tab").css({"border-bottom":"2px solid #95C22B"});
        
        tab = 1;
    }
    else{
        $("#profile-tab").css({"border-bottom":"transparent"});
        $("#home-tab").css({"border-bottom":"transparent"});
        $("#security-tab").css({"border-bottom":"2px solid #95C22B"});
        
        tab = 3;
    }

}

function openModal(modal){
    if (modal == "dir"){
        jQuery.noConflict();
        $("#callePD").val(ant_calle);
        $("#alturaPD").val(ant_altura);
        $("#provinciaPD").val(ant_provincia);
        $("#paisPD").val(ant_pais);
        $("#ciudadPD").val(ant_ciudad);
        validaDireccion('general', false);
        $("#direccionModal").modal("show");
    }
    else if (modal == "doc"){
        jQuery.noConflict();
        $("#documentoInput").val(ant_doc);
        $("#tipoDocSelect").val(ant_tipo_doc);
        validaDoc( $("#documentoInput").val());
        $("#documentoModal").modal("show");
    }
    else if (modal == "email"){
        jQuery.noConflict();
        $("#emailInput").val(ant_email);
        validateEmail( $("#emailInput").val());
        $("#emailModal").modal("show");
    }
    else if (modal == "passwd"){
        jQuery.noConflict();
        $("#oldPasswdInput").val("");
        $("#newPassword1").val("");
        $("#newPassword2").val("");
        password = false;
        password_ant = false;
        repeat_password = false;
        enable_disable_passwd(true);
        $("#passwordModal").modal("show");
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
    }
    else if (modal_type == 'general'){
                provincia = true;
                $("#error-provincia").hide();
                ciudad = true; 
                $("#error-ciudad").hide();
                pais = true; 
                $("#error-pais").hide();
                altura = true;
                $("#error-altura").hide();
                calle = true;
                $("#error-calle").hide();
    }
    if (provincia == true && ciudad == true && pais == true && calle == true && altura == true){
        if ($("#provinciaPD").val() != ant_provincia || $("#ciudadPD").val() != ant_ciudad || $("#paisPD").val() != ant_pais || ant_altura != $("#alturaPD").val() || ant_calle != $("#callePD").val()){
            $('#primary-btn-dir').prop('disabled', false);
            $('#primary-btn-dir').text('Guardar cambios');
        }
        else{
            $('#primary-btn-dir').text('No hay cambios');
            $('#primary-btn-dir').prop('disabled', true);
        }

    }
    else{
        $('#primary-btn-dir').prop('disabled', true);
        $('#primary-btn-dir').text('Guardar cambios');
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

function updateMap(modal_type){
    if (modal_type == 'alta'){
        direccion = encodeURI(String($("#callePD").val()) + String($("#alturaPD").val()) + String($("#ciudadPD").val()) + String($("#provinciaPD").val()) + String($("#paisPD").val()))
        src_value = "https://maps.google.com/maps?q=" + direccion + "&t=&z=15&ie=UTF8&iwloc=&output=embed";
        $("#gmap_canvas").attr("src",src_value);
    }
}

updateMap('alta');
ant_provincia = $("#provinciaPD").val();
ant_ciudad = $("#ciudadPD").val();
ant_pais = $("#paisPD").val();
ant_altura = $("#alturaPD").val();
ant_calle = $("#callePD").val();
ant_doc = $("#documentoInput").val();
ant_tipo_doc = $("#tipoDocSelect").val();
ant_email = $("#emailInput").val();

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

function enable_disable_doc(){
    if (doc){
        if (ant_doc == $("#documentoInput").val() && ant_tipo_doc == $("#tipoDocSelect").val()){
            $("#primary-btn-doc").text('No hay cambios');
            $("#primary-btn-doc").prop('disabled',true);
        }
        else{
            $("#primary-btn-doc").prop('disabled',false);
            $("#primary-btn-doc").text('Guardar cambios');
        }

    }
    else{
        $("#primary-btn-doc").prop('disabled',true);
        $("#primary-btn-doc").text('Guardar cambios');
    }
    
}

function validateEmail(elementValue){
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (emails.includes(String(elementValue))){
        email = false;
        $("#email-error").text("* El email ya se encuentra registrado.")
        $("#email-error").show();
    }      
    else if (elementValue == ""){
        email = false;
        $("#email-error").text("* El email no puede quedar vacío.")
        $("#email-error").show();
    }
    else if (emailPattern.test(elementValue)){
        email = true;
        $("#email-error").hide();
    }
    else{
        email = false;
        $("#email-error").text("* Formato email inválido")
        $("#email-error").show();
    }
    enable_disable_email();
}

function enable_disable_email(){
    if (email){
        if (ant_email == $("#emailInput").val()){
            $("#primary-btn-email").text('No hay cambios');
            $("#primary-btn-email").prop('disabled',true);
        }
        else{
            $("#primary-btn-email").prop('disabled',false);
            $("#primary-btn-email").text('Guardar cambios');
        }
    }
    else{
        $("#primary-btn-email").prop('disabled',true);
        $("#primary-btn-email").text('Guardar cambios');
    }    
}

function checkOldPassword(value){
    if (value == antPassword){
        $("#newPassword1").prop('disabled',false);
        $("#newPassword2").prop('disabled',false);
        password_ant = true;
        $("#new-pass-container").fadeIn();
    }
    else{
        $("#newPassword1").prop('disabled',true);
        $("#newPassword2").prop('disabled',true);
        password_ant = false;
    }
    enable_disable_passwd();
}


function checkPassword(str){
    if (first_time){
        first_time = false;
    }
    var re = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&? "])[a-zA-Z0-9!#$%&?]{8,20}$/;
    
    if(re.test(str)){
        password = true;
    }
    else{
        password = false;
    }
    validaPassRep();
    enable_disable_passwd();
}

function validaPassRep(){
    if (first_time2 == false){
        if ($("#newPassword2").val() == $("#newPassword1").val()){
            repeat_password = true;
            $("#password-2-error").hide();
        }
        else{
            repeat_password = false;
            $("#password-2-error").show();
        }
        enable_disable_passwd();
    }
    
}

function enable_disable_passwd(reset = false){
    if (reset){
        $("#primary-btn-passwd").prop('disabled',true);
        $("#password-1-error").hide();
        $("#pass-reqs-row").fadeOut();
        $("#newPassword1").prop('disabled',true);
        $("#newPassword2").prop('disabled',true);
        $("#password-2-error").hide();
        $("#new-pass-container").hide();
        first_time = true;
        first_time2 = true;
    }
    else if (password && password_ant){
        if (antPassword == $("#newPassword1").val()){
            $("#primary-btn-passwd").text('No hay cambios');
            $("#primary-btn-passwd").prop('disabled',true);
            $("#pass-reqs-row").fadeOut();
            $("#password-1-error").text("* La contraseña debe ser distinta.");
            $("#password-1-error").show();
        }
        else{
            if(repeat_password == true){
                $("#primary-btn-passwd").prop('disabled',false);
            }
            $("#primary-btn-passwd").text('Guardar cambios');
            $("#pass-reqs-row").fadeOut();
            $("#password-1-error").hide();
        }
    }
    else if(password == false && password_ant && first_time == false && $('#newPassword1').val() == ""){
        $("#password-1-error").text("* La contraseña no puede ser vacía.");
        $("#password-1-error").show();
        $("#pass-reqs-row").fadeIn();
        $("#primary-btn-passwd").prop('disabled',true);
    }
    else if(password == false && password_ant && first_time == false){
        $("#password-1-error").text("* No cumple los requisitos.");
        $("#primary-btn-passwd").prop('disabled',true);
        $("#password-1-error").show();
        $("#pass-reqs-row").fadeIn();
    }
    else if (password_ant == false && password){
        $("#newPassword1").prop('disabled',true);
        $("#newPassword2").prop('disabled',true);
        $("#primary-btn-passwd").prop('disabled',true);
        password_ant = false; 
    }   
    else{
        $("#primary-btn-passwd").prop('disabled',true);
        $("#primary-btn-passwd").text('Guardar cambios');
        $("#password-1-error").hide();
    }   
}

function showReqs(){
    $("#pass-reqs-row").fadeIn();
}

function setPsswd(pass){
    antPassword = pass;
}

function noFirstTimeRep(){
    first_time2 = false;
}

function ocultaReqs(){
    if (password){
        $("#pass-reqs-row").fadeOut();
    }
}

function submitForm(modal){
    if(modal=='dir'){
        $("#dirForm").hide();
        $(".subheader-row").hide();
        $("#bottomAltaModalTextAltaPD").hide();  
        $("#bottomAltaModalTextDir").fadeIn(500);
        $(".lds-ring div").css("border-color", "#95C22B transparent transparent transparent");
        $(".lds-ring").show().fadeIn(500);
        $('#primary-btn-dir').prop('disabled', true);
        $('.secondary-btn').prop('disabled', true);
        $( "#dirForm").submit();
        nextMsgDir();
    }
    else if(modal=='email'){
        $("#emailForm").hide();
        $(".subheader-row").hide();
        $(".label-bottom").hide();  
        $("#bottomAltaModalTextEmail").fadeIn(500);
        $(".lds-ring div").css("border-color", "#95C22B transparent transparent transparent");
        $(".lds-ring").show().fadeIn(500);
        $('#primary-btn-email').prop('disabled', true);
        $('.secondary-btn').prop('disabled', true);
        $( "#emailForm").submit();
        nextMsgEmail();
    }
    else if (modal == 'doc'){
        $("#docForm").hide();
        $(".subheader-row").hide();
        $(".label-bottom").hide();  
        $("#bottomAltaModalTextDoc").fadeIn(500);
        $(".lds-ring div").css("border-color", "#95C22B transparent transparent transparent");
        $(".lds-ring").show().fadeIn(500);
        $('#primary-btn-doc').prop('disabled', true);
        $('.secondary-btn').prop('disabled', true);
        $( "#docForm").submit();
        nextMsgDoc();
    }
    else if (modal == 'pass'){
        $("#passForm").hide();
        $(".subheader-row").hide();
        $(".label-bottom").hide();  
        $("#bottomAltaModalTextPass").fadeIn(500);
        $(".lds-ring div").css("border-color", "#95C22B transparent transparent transparent");
        $(".lds-ring").show().fadeIn(500);
        $('#primary-btn-passwd').prop('disabled', true);
        $('.secondary-btn').prop('disabled', true);
        $( "#passForm").submit();
        nextMsgPass();
    }
}

function nextMsgDir() {
    if (messages.length == 1) {
        $('#bottomAltaModalTextDir').html(messages.pop()).fadeIn(500);

    } else {
        $('#bottomAltaModalTextDir').html(messages.pop()).fadeIn(500).delay(10000).fadeOut(500, nextMsgDir);

    }
};

function nextMsgEmail() {
    if (messages.length == 1) {
        $('#bottomAltaModalTextEmail').html(messages.pop()).fadeIn(500);

    } else {
        $('#bottomAltaModalTextEmail').html(messages.pop()).fadeIn(500).delay(10000).fadeOut(500, nextMsgEmail);

    }
};

function nextMsgDoc() {
    if (messages.length == 1) {
        $('#bottomAltaModalTextDoc').html(messages.pop()).fadeIn(500);

    } else {
        $('#bottomAltaModalTextDoc').html(messages.pop()).fadeIn(500).delay(10000).fadeOut(500, nextMsgDoc);

    }
};

function nextMsgPass() {
    if (messages.length == 1) {
        $('#bottomAltaModalTextPass').html(messages.pop()).fadeIn(500);

    } else {
        $('#bottomAltaModalTextPass').html(messages.pop()).fadeIn(500).delay(10000).fadeOut(500, nextMsgPass);

    }
};

// Lista de mensajes para la carga del Modal de modifcar nivel.
var messages = [
    "Estamos aplicando las modificaciones...",
    "Ajustando algunos detalles",
    "¡Casi listo! Últimos retoques"
].reverse();


$('#documentoInput').on('keypress', function (event) {
    var regex = new RegExp("^[a-zA-Z0-9]+$");
    var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (!regex.test(key)) {
       event.preventDefault();
       return false;
    }
});

$.getJSON("/perfil/get-list/emails",function (result){
    for (var i in result){
        emails.push(result[i]);
    }
});

$.getJSON("/perfil/get-list/documentos",function (result){
    for (var j in result){
        documentos.push(result[j]);
    }
});

$(".oldPassCheck").click(function() {

    if ($("#oldPasswdInput").attr("type") == "password") {
        $("#oldPasswdInput").attr("type", "text");
    } else {
        $("#oldPasswdInput").attr("type", "password");
    }
});

$(".inputPass1").click(function() {

    if ($("#newPassword1").attr("type") == "password") {
        $("#newPassword1").attr("type", "text");
    } else {
        $("#newPassword1").attr("type", "password");
    }
});

$(".inputPass2").click(function() {

    if ($("#newPassword2").attr("type") == "password") {
        $("#newPassword2").attr("type", "text");
    } else {
        $("#newPassword2").attr("type", "password");
    }
});

$(".emp-profile").fadeIn();
  

function upload_img(){
    $("#profileForm").submit();
}

