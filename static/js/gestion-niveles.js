

$('#numeroNivelError').hide()
$('#descuentoNivelError').hide()
$('#minEPNivelError').hide()
$('#maxEPNivelError').hide()



function setModalValues(maxLevel, maxEP){
    maxLevel = parseInt(maxLevel);
    maxEP = parseInt(maxEP);
    $('#numeroNivel').val(maxLevel + 1);
    $('#minEcoPuntos').val(maxEP + 1);
    $('#maxEcoPuntos').val(maxEP + 1000);
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

function validaMinEP(maxLevel){
    maxLevel = parseInt(maxLevel);
    if (parseInt($('#minEcoPuntos').val()) != (maxLevel + 1)){
        $('#minEPNivelError').show()
    }
    else{
        $('#minEPNivelError').hide()
    }
}

function validaMaxEP(maxLevel){
    maxLevel = parseInt(maxLevel) + 2;
    if (parseInt($('#maxEcoPuntos').val()) < maxLevel){
        $('#maxEPNivelError').show()
    }
    else{
        $('#maxEPNivelError').hide()
    }
}

function validaDescuento(){
    val = parseFloat($('#descuento').val());
    if (val > 100){
        $('#descuentoNivelError').show();
    }
    else{
        $('#descuentoNivelError').hide();
    }
}

function submitForm(idForm){
    idForm = String(idForm);
    $( "#" + idForm ).submit();
}



function isNumberKey(txt, evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode == 46) {
      //Check if the text already contains the . character
      if (txt.value.indexOf('.') === -1) {
        return true;
      } else {
        return false;
      }
    } else {
      if (charCode > 31 &&
        (charCode < 48 || charCode > 57))
        return false;
    }
    return true;
  }