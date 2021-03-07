function validarCodigo(){
    nextMsg();
    $("#table-container").hide();
    $("#heading-container").hide();
    $("#loadingRowCodigo").fadeIn();
    $(".lds-ring").fadeIn();
    $("#loading-text-codigo").fadeIn();
    codigo = "";
    for (i = 0; i < 16; i++) {
        codigo += $("#" + String(i)).val();
    }
    $.getJSON("/codigo/" + codigo,function (result){
        //devuelve la cantidad EP acreditados
        //si es -1, el codigo es incorrecto o ya fue utilizado
        $(".lds-ring").hide();
        $("#loadingRowCodigo").hide();
        $("#loading-text-codigo").hide();
        $("#loading-text-codigo").remove();
        if (result > 0){
            $("#table-container2").fadeIn();
            $("#cantEPdep").text(result);
            $("#successful-row").fadeIn();
        }
        else if (result < 0){
            $("#table-container2").fadeIn();
            $("#code-1").text(codigo);
            $("#repeated-row").fadeIn();
        }
        else{
            $("#table-container2").fadeIn();
            $("#code").text(codigo);
            $("#invalid-row").fadeIn();
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

function redirect(link){
    window.location.href = link;
}

jQuery('input[type=text]').on('paste', function(e) {
    const text = (e.originalEvent || e).clipboardData.getData('text/plain');
    current_position = parseInt(this.id);
    j = 0;
    if (text.length >= 16){
        for (i = current_position; i < 16; i++) {
            $("#" + i).val(text[j]);
            j++;
        }
    }
    else{
        for (i = current_position; i < parseInt(text.length) + current_position; i++) {
            $("#" + i).val(text[j]);
            j++;
        }
    }
    jQuery("#" + String(i-1)).focus();


});
















