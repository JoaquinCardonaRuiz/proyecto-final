var tab = 1;
var provincia = true;
var pais = true;
var ciudad = true;
var altura = true;
var calle = true;
var doc = true;
var email = true;


var ant_provincia = true;
var ant_pais = true;
var ant_ciudad = true;
var ant_altura = true;
var ant_calle = true;

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
        $("#direccionModal").modal("show");
    }
    else if (modal == "doc"){
        jQuery.noConflict();
        $("#documentoModal").modal("show");
    }
    else if (modal == "email"){
        jQuery.noConflict();
        $("#emailModal").modal("show");
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
    if (val == ""){
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
    if (elementValue == ""){
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


