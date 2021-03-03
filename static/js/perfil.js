var tab = 1;
var provincia = true;
var pais = true;
var ciudad = true;
var altura = true;
var calle = true;

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
