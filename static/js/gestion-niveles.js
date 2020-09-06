

var descuento = true;
var minEP = true;
var maxEP = true;
var nivel = true;
var del = false;

$("#option-right").hover(function(){
    $(this).css("border", "2px solid #95C22B");
    }, function(){
    if (del == false){
        $(this).css("border", "2px solid transparent");
    }
  });

function enable_disable(){
    if (minEP == true && maxEP == true && nivel == true && descuento == true){
        $('#primary-btn').prop('disabled', false);
    }
    else{
        $('#primary-btn').prop('disabled', true);
    } 

}

function setModalValues(maxLevel, maxEP, maxDescuento){
    maxLevel = parseInt(maxLevel);
    maxEP = parseInt(maxEP);
    maxDescuento = parseFloat(maxDescuento.replace(',','.'))
    $('#numeroNivel').val(maxLevel + 1);
    $('#minEcoPuntos').val(maxEP + 1);
    $('#maxEcoPuntos').val(maxEP + 1000);
    $('#descuento').val(maxDescuento + 2.5);
    $('#numeroNivelError').hide();
    $('#descuentoNivelError').hide();
    $('#minEPNivelError').hide();
    $('#maxEPNivelError').hide();
    $('#primary-btn').prop('disabled', false);
}


function validaNumero(maxLevel){
    maxLevel = parseInt(maxLevel);
    if (parseInt($('#numeroNivel').val()) != (maxLevel + 1)){
        $('#numeroNivelError').show();
        nivel = false;
        enable_disable();
    }
    else{
        $('#numeroNivelError').hide();
        nivel = true;
        enable_disable();
    }
}

function validaMinEP(maxLevel){
    maxLevel = parseInt(maxLevel);
    if (parseInt($('#minEcoPuntos').val()) != (maxLevel + 1)){
        $('#minEPNivelError').show();
        minEP = false;
        enable_disable();
    }
    else{
        $('#minEPNivelError').hide();
        minEP = true;
        enable_disable();

    }
}

function validaMaxEP(maxLevel){
    maxLevel = parseInt(maxLevel) + 2;
    if (parseInt($('#maxEcoPuntos').val()) < maxLevel){
        $('#maxEPNivelError').text('* El máx. de EcoPuntos debe mayor a ' + String(maxLevel - 1) + " .");
        $('#maxEPNivelError').show();
        maxEP = false;
        enable_disable();
    }
    else if (isNaN(parseInt($('#maxEcoPuntos').val()))){
        $('#maxEPNivelError').text('* El máximo de EcoPuntos no puede quedar vacío.');
        $('#maxEPNivelError').show();
        maxEP = false;
        enable_disable();
    }
    else{
        $('#maxEPNivelError').hide();
        maxEP = true;
        enable_disable();
    }
}

function validaDescuento(maxDescuento){
    val = parseFloat($('#descuento').val());
    maxDescuento = parseFloat(maxDescuento.replace(',','.'))
    if (val > 100){
        $('#descuentoNivelError').text('* El descuento no puede ser mayor al 100%.');
        $('#descuentoNivelError').show();
        descuento = false;
        enable_disable();
    }
    else if (val <= maxDescuento){
        $('#descuentoNivelError').text('* El descuento debe ser mayor a ' + String(maxDescuento) + '%.');
        $('#descuentoNivelError').show();
        descuento = false;
        enable_disable();
    }
    else if (isNaN(val)){
        $('#descuentoNivelError').text('* El descuento no puede quedar vacío.');
        $('#descuentoNivelError').show();
        descuento = false;
        enable_disable();
    }
    else{
        $('#descuentoNivelError').hide();
        descuento = true;
        enable_disable();
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

function removeLevel(){
    if (del == false){
        $('.delete-row').fadeIn()
        $('.delete-th').fadeIn()
        del = true;
        $('#option-right').css('border', '2px solid #95C22B');
        var y = window.scrollY + document.querySelector('#table-container').getBoundingClientRect().top; // Y
        var x = window.scrollX + document.querySelector('#table-container').getBoundingClientRect().left; // X
        window.scrollTo(x, y);
        
    }
    else{
        $('.delete-row').fadeOut()
        $('.delete-th').fadeOut()
        del = false;
        $('#option-right').css('border', '2px solid transparent');
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }
}

function openModal(){
    jQuery.noConflict(); 
    $('#bajaNivelModal').modal('show');
}