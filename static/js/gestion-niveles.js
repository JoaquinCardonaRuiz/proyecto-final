

$('#numeroNivelError').hide()
$('#descuentoNivelError').hide()
$('#minEPNivelError').hide()
$('#maxEPNivelError').hide()



function setModalValues(maxLevel){
    maxLevel = parseInt(maxLevel);
    $('#numeroNivel').val(maxLevel + 1);
}


function validaNumero(maxLevel){
    maxLevel = parseInt(maxLevel);
    if (parseInt($('#numeroNivel').val()) != (maxLevel + 1)){
        $('#numeroNivelError').show()
    }
    else{
        $('#numeroNivelError').hide()
    }
}

function strReplace(idInput){
    var idInput = String(idInput);
    parseInt(event.keyCode)
    if (event.keyCode == 188){
        val = $('#' + idInput).val();
        $('#' + idInput).val(val + ".");
    }
}

function strRemove(idInput, idErrorMessage){
    var idInput = String(idInput);
    var idErrorMessage = String(idErrorMessage);
    if ((parseInt(event.keyCode) >= 48 && parseInt(event.keyCode) <= 57) || parseInt(event.keyCode) == 190 || parseInt(event.keyCode) == 180){
        val = $('#' + idInput).val().slice(0, -1);
        if ($('#' + idInput).val().slice(-1) == ","){
            $('#' + idInput).val(val);
        }
    }
    else if(parseInt(event.keyCode) == 8){
    
    }
    else{
        val = $('#' + idInput).val().slice(0, -1);
        $('#' + idInput).val(val);
    }
    var cant = $('#' + idInput).val().match(/\./g).length;
    if (cant > 1){
        $('#' + idErrorMessage).show();
    }
    else{
        $('#' + idErrorMessage).hide();

    }

}

function submitForm(idForm){
    idForm = String(idForm);
    $( "#" + idForm ).submit();
}