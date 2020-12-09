//Variables globales
var descuento = true;
var minEP = true;
var maxEP = true;
var nivel = true;
var del = false;
var mod = false;
var numeroModificarModal = false;
var minDescuentoMod = false;
var maxDescuentoMod = false;

//Efecto CSS el botón del extremo derecho de los botones principales del modulo.
$("#option-right").hover(function(){
    $(this).css("border", "2px solid #95C22B");
    }, function(){
    if (del == false){
        $(this).css("border", "2px solid transparent");
    }
  });

//Efecto CSS el botón del medio de los botones principales del modulo.
$("#option-middle").hover(function(){
    $(this).css("border", "2px solid #95C22B");
    }, function(){
    if (mod == false){
        $(this).css("border", "2px solid transparent");
    }
  });

//Valida el estado de los input mediante sus variables globales, y habilita o deshabilita el boton para guardar las modificaciones o dar de alta un nivel.
function enable_disable(){
    if (minEP == true && maxEP == true && nivel == true && descuento == true){
        $('#primary-btn').prop('disabled', false);
        $('#primary-btn-mod').prop('disabled', false);
    }
    else{
        $('#primary-btn').prop('disabled', true);
        $('#primary-btn-mod').prop('disabled', true);
    } 
}

//Setea los valores iniciales del Modal del alta.
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

//Valida el contenido del input numero cada vez que se modifica, en caso de no cumplir una de las validaciones, muestra
//su respectivo cartel de error y cambia el valor de la variable global numero, para indicar que no se pueden guardar los cambios.
function validaNumero(maxLevel, modalType){
    if (modalType == 'alta'){
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
    else if(modalType=='mod'){
        level = parseInt(numeroModificarModal);
        if (parseInt($('#numeroNivelMod').val()) != (level)){
            $('#numeroNivelErrorMod').show();
            nivel = false;
            enable_disable();
        }
        else{
            $('#numeroNivelErrorMod').hide();
            nivel = true;
            enable_disable();
        }
    }   
}

//Valida el contenido del input Minimo EcoPuntos cada vez que se modifica, en caso de no cumplir una de las validaciones, muestra
//su respectivo cartel de error y cambia el valor de la variable global minEP, para indicar que no se pueden guardar los cambios.
function validaMinEP(maxLevel, modalType){
    if (modalType=='alta'){
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
    else if(modalType == 'mod'){
        maxEPMod = parseInt($('#maxEcoPuntosMod').val())
        if (parseInt($('#minEcoPuntosMod').val()) >= maxEPMod){
            $('#minEPNivelErrorMod').text('* El min. de EcoPuntos debe ser menor a ' + String(maxEPMod) + " .");
            $('#minEPNivelErrorMod').show();
            minEP = false;
            enable_disable();
        }
        else if (isNaN(parseInt($('#minEcoPuntosMod').val()))){
            $('#minEPNivelErrorMod').text('* El mínimo de EcoPuntos no puede quedar vacío.');
            $('#minEPNivelErrorMod').show();
            minEP = false;
            enable_disable();
        }
        else{
            $('#minEPNivelErrorMod').hide();
            minEP = true;
            enable_disable();
        }
        minEPMod = parseInt($('#minEcoPuntosMod').val())
        if (parseInt($('#maxEcoPuntosMod').val()) > minEPMod){
            $('#maxEPNivelErrorMod').hide();
            maxEP = true;
            enable_disable();
        }
    }  
}

//Valida el contenido del input Maximo EcoPuntos cada vez que se modifica, en caso de no cumplir una de las validaciones, muestra
//su respectivo cartel de error y cambia el valor de la variable global maxEP, para indicar que no se pueden guardar los cambios.
function validaMaxEP(maxLevel, modalType){
    if (modalType == 'alta'){
        maxLevel = parseInt(maxLevel) + 2;
        if (parseInt($('#maxEcoPuntos').val()) < maxLevel){
            $('#maxEPNivelError').text('* El máx. de EcoPuntos debe ser mayor a ' + String(maxLevel - 1) + " .");
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
    else if (modalType == 'mod'){
        minEPMod = parseInt($('#minEcoPuntosMod').val())
        if (parseInt($('#maxEcoPuntosMod').val()) == 0){
            $('#maxEPNivelErrorMod').text('* El máximo de EcoPuntos no puede ser 0.');
            $('#maxEPNivelErrorMod').show();
            maxEP = false;
            enable_disable();
        }
        else if (parseInt($('#maxEcoPuntosMod').val()) <= minEPMod){
            $('#maxEPNivelErrorMod').text('* El máx. de EcoPuntos ser debe mayor a ' + String(minEPMod) + " .");
            $('#maxEPNivelErrorMod').show();
            maxEP = false;
            enable_disable();
        }
        else if (isNaN(parseInt($('#maxEcoPuntosMod').val()))){
            $('#maxEPNivelErrorMod').text('* El máximo de EcoPuntos no puede quedar vacío.');
            $('#maxEPNivelErrorMod').show();
            maxEP = false;
            enable_disable();
        }
        else{
            $('#maxEPNivelErrorMod').hide();
            maxEP = true;
            enable_disable();
        }
        maxEPMod = parseInt($('#maxEcoPuntosMod').val())
        if (parseInt($('#minEcoPuntosMod').val()) < maxEPMod){
            $('#minEPNivelErrorMod').hide();
            minEP = true;
            enable_disable();
        }
    }
}

//Valida el contenido del input Descuento cada vez que se modifica, en caso de no cumplir una de las validaciones, muestra
//su respectivo cartel de error y cambia el valor de la variable global descuento, para indicar que no se pueden guardar los cambios.
function validaDescuento(maxDescuento, modalType){
    if (modalType == 'alta'){
        val = parseFloat($('#descuento').val());
        maxDescuento = parseFloat(maxDescuento.replace(',','.'));
        
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
    else{
        val = parseFloat($('#descuentoMod').val());
        maxDescuento = parseFloat(maxDescuentoMod);
        minDescuento = parseFloat(minDescuentoMod);
        if (val > 100){
            $('#descuentoNivelErrorMod').text('* El descuento no puede ser mayor al 100%.');
            $('#descuentoNivelErrorMod').show();
            descuento = false;
            enable_disable();
        }
        else if (val <= minDescuento){
            $('#descuentoNivelErrorMod').text('* El descuento debe ser mayor a ' + String(minDescuento) + '%.');
            $('#descuentoNivelErrorMod').show();
            descuento = false;
            enable_disable();
        }

        else if (val >= maxDescuento){
            $('#descuentoNivelErrorMod').text('* El descuento debe ser menor a ' + String(maxDescuento) + '%.');
            $('#descuentoNivelErrorMod').show();
            descuento = false;
            enable_disable();
        }

        else if (isNaN(val)){
            $('#descuentoNivelErrorMod').text('* El descuento no puede quedar vacío.');
            $('#descuentoNivelErrorMod').show();
            descuento = false;
            enable_disable();
        }
        else{
            $('#descuentoNivelErrorMod').hide();
            descuento = true;
            enable_disable();
        }
    }   
}

//Hace el submit de un form, recibiendo su ID como parametro.
function submitForm(idForm){
    idForm = String(idForm);
    $( "#" + idForm ).submit();
}

//Valida e impide que los input sean caracteres distintos de numeros.
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

//Hace aparecer y desaprecer los iconos para eliminar al lado de cada elemento de la lista.
function removeLevel(){
    if (del == false){
        $('.modify-row').hide()
        $('.modify-th').hide()
        $('.delete-row').fadeIn()
        $('.delete-th').fadeIn()
        del = true;
        mod = false;
        $('#option-middle').css('border', '2px solid transparent');
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

//Hace aparecer y desaprecer los iconos para modificar al lado de cada elemento de la lista.
function modifyLevel(){
    if (mod == false){
        $('.delete-row').hide()
        $('.delete-th').hide()
        $('.modify-row').fadeIn()
        $('.modify-th').fadeIn()
        mod = true;
        del = false;
        $('#option-right').css('border', '2px solid transparent');
        $('#option-middle').css('border', '2px solid #95C22B');
        var y = window.scrollY + document.querySelector('#table-container').getBoundingClientRect().top; // Y
        var x = window.scrollX + document.querySelector('#table-container').getBoundingClientRect().left; // X
        window.scrollTo(x, y);
        
    }
    else{
        $('.modify-row').fadeOut()
        $('.modify-th').fadeOut()
        mod = false;
        $('#option-middle').css('border', '2px solid transparent');
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }
}

//Abre el Modal de baja. 
function openBajaModal(numero, cant_niveles, minEPnivel, maxEPnivel, idNivel){
    cant_niveles = parseInt(cant_niveles);
    numero = parseInt(numero);
    maxEPnivel = parseInt(maxEPnivel); 
    minEPnivel = parseInt(minEPnivel); 
    factor_mod = (maxEPnivel - minEPnivel + 1)/2;
    nuevo_max = minEPnivel - 1 + factor_mod;
    nuevo_min = maxEPnivel + 1 - factor_mod;
    jQuery.noConflict();
    $('#primary-btn-alert').prop('disabled', false); 
    $('#modalBajaMod1').show();
    $('#numNivel').val(String(idNivel));
    $('#bajaNivelModal').modal('show');
    $('#modalBajaMod1').show();
    $('#modalBajaMod2').show();
    $('#modalBajaMod3').show();
    $('.top-modal-text-baja').text('Si elimina el nivel ' + numero + ' se producirán las siguientes modificaciones:');
    if (numero != 1){
        if(numero == 2 && numero == cant_niveles){
            $('#modalBajaMod1').text('- El nivel ' + String(parseInt(numero)-1) + ' será ahora el único nivel.');
            $('#modalBajaMod2').hide();
        }
        else{
            $('#modalBajaMod1').text('- El nivel ' + String(parseInt(numero)-1) + ' será ahora hasta los ' + String(parseInt(nuevo_max)) + ' EcoPuntos.');
        }
    }
    else{
        $('#modalBajaMod1').hide();
    }
    if (numero == cant_niveles){
        if (numero == 1){
            $('.bottom-modal-text-baja').text('Lo sentimos, no se puede eliminar el nivel 1 si no existen otros niveles.')
            $('.top-modal-text-baja').hide();
            $('#modalBajaMod2').hide();
            $('#modalBajaMod3').hide();
            $('#primary-btn-alert').prop('disabled', true);
        }
        else{
            $('#modalBajaMod1').text('- El nivel ' + String(parseInt(numero)-1) + ' será ahora el último nivel, y todos los usuarios nivel ' + String(parseInt(numero))+ ' pasarán a ser nivel ' + String(parseInt(numero)-1) + '.');
            $('#modalBajaMod2').hide();
            $('#modalBajaMod3').hide();
        }
    }
    else{
        if(numero == 1 && numero != cant_niveles){
            $('#modalBajaMod2').text('- El nivel ' + String(parseInt(numero)+1) + ' será ahora el nivel ' + String(parseInt(numero)) + ', y será desde los 0 EcoPuntos.');
        }
        else{
            $('#modalBajaMod2').text('- El nivel ' + String(parseInt(numero)+1) + ' será ahora el nivel ' + String(parseInt(numero)) + ', y será desde los ' + String(parseInt(nuevo_min)) + ' EcoPuntos.');
        }
        $('#modalBajaMod3').text('- Todos los niveles posteriores disminuirán su número en 1 unidad.');
    }

}

//Setea los valores del Modal de modificacion.
function setModifyModalValues(numero, cant_niveles, minEPnivel, maxEPnivel, descuento){
    numero = parseInt(numero);
    numeroModificarModal = numero;
    //Se setean los valores de los input
    $('#numeroNivelMod').val(numero);
    $('#descuentoMod').val(parseFloat(descuento.replace(',','.')));
    $('#minEcoPuntosMod').val(minEPnivel);
    $('#maxEcoPuntosMod').val(maxEPnivel);
    //Se esconden los carteles de error de cada input
    $('#numeroNivelErrorMod').hide();
    $('#descuentoNivelErrorMod').hide();
    $('#minEPNivelErrorMod').hide();
    $('#maxEPNivelErrorMod').hide();
    //Se hace un request para pedir al backend los datos del descuento de los niveles anteriores y posteriores, para utilizar en las validaciones.
    $.getJSON("/gestion-niveles/modificacion/"+String(numero),function (result){
        minDescuentoMod = result['anterior'];
        maxDescuentoMod = result['posterior'];
    });
}

//Abre el Modal de modifiaciones.
function openModificarModal(numero, cant_niveles, minEPnivel, maxEPnivel, idNivel, descuento){
    jQuery.noConflict();
    setModifyModalValues(numero, cant_niveles, minEPnivel, maxEPnivel, descuento);
    $('#primary-btn-mod').prop('disabled', false);
    $('#modificarNivelModal').modal('show');
    $('#headingModalMod').text('Modificar el nivel ' + String(parseInt(numero)));
}

//Envía el id del nivel a dar de baja al backend.
function baja_nivel(){
    id = $('#numNivel').val();
    window.location.href='/gestion-niveles/baja/' + String(id)
}

function mod_nivel(){
    id = $('#numeroNivelMod').val();
    desc = $('#descuentoMod').val();
    min = $('#minEcoPuntosMod').val();
    max = $('#maxEcoPuntosMod').val();
    window.location.href='/gestion-niveles/mod/' + String(id) + '/' + String(desc) + '/' + String(min) + '/' +  String(max)
}