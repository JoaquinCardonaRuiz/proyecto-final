function validarCodigo(){
    nextMsg();
    $("#table-container").hide();
    $("#heading-container").hide();
    $(".lds-ring").fadeIn();
    $("#loading-text-codigo").fadeIn();
    codigo = "";
    for (i = 0; i < 18; i++) {
        codigo += $("#" + String(i)).val();
    }
    $.getJSON("/codigo/" + codigo,function (result){
        //devuelve la cantidad EP acreditados
        //si es -1, el codigo es incorrecto o ya fue utilizado
        $(".loading-content").fadeOut();
        $("#loading-text-codigo").fadeOut();
        $("#loading-text-codigo").remove();
        if (result >= 0){
            alert("Se han acreditado " + result + " EcoPuntos.");
        }
        else{
            alert("Código inválido.");
        }
    });
}



jQuery("input[type=text]").on('input',function () {
    if(jQuery(this).val().length == jQuery(this).attr('maxlength')) {
        id = parseInt(this.id) + 1;
        jQuery("#" + String(id)).focus();
    }
    valida_enable_disable();
});

jQuery('input[type=text]').on('keydown', function(e) {
    if( (e.which == 8 || e.which == 46) && jQuery(this).val() == ""){
        jQuery(this).val("");
        id = parseInt(this.id) - 1;
        jQuery("#" + String(id)).focus();
    }
    else if (jQuery(this).val() != "" && (e.which != 8 && e.which != 46)){
        id = parseInt(this.id) + 1;
        jQuery("#" + String(id)).focus();
    }
    valida_enable_disable();
});

function valida_enable_disable(){
    codigo = true;
    i = 0;
    while(codigo == true && i <= 17){
        if($("#" + String(i)).val() == ""){
            codigo = false;
        }
        i+=1;
    }
    if (codigo){
        $("#ecoasistente-btn-code").prop('disabled',false);
        $("#ecoasistente-btn-code").css({"background-color":"#95C22B"});
    }
    else{
        $("#ecoasistente-btn-code").prop('disabled',true);
        $("#ecoasistente-btn-code").css({"background-color":"#c8c9d1"});
    }
}


function nextMsg() {
    if (messages.length == 1) {
        $('#loading-text-codigo').html(messages.pop()).fadeIn(500);

    } else {
        $('#loading-text-codigo').html(messages.pop()).fadeIn(500).delay(5000).fadeOut(500, nextMsg);
    }
};

var messages = [
    "Estamos validando tu código",
    "Si inventaste un código, lamentamos decirte que no funcionará..",
    "¡Casi listo! Últimos retoques"
].reverse();
















