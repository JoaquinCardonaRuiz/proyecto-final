var cantidad = false;
var descripcion = false;
var fecha = true;

var cantidadSM = false;
var descripcionSM = false;
var fechaSM = true;

var stock_disp = false;
var valida_cant_sm = false;
var pantalla = 1;

var tipo_salida = false;

//Efecto CSS el botón del medio de los botones principales del modulo.
$("#option-middle").hover(function(){
    $(this).css("border", "2px solid #95C22B");
    }, function(){
    if (mod == false){
        $(this).css("border", "2px solid transparent");
    }
  });

//Hace aparecer y desaprecer los iconos para eliminar al lado de cada elemento de la lista.
function removerPunto(){
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
function modificarPunto(){
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

function redirectStock(link, type){
    if (type == 'ns'){
        $("#heading-container").hide();
        $("#main-content").hide();
        $(".lds-ring").fadeIn();
        $('#loading-text').fadeIn();
        nextMsgNiveles();
    }
    else if (type == 'ms'){
        $("#heading-container").hide();
        $("#main-content").hide();
        $(".lds-ring").fadeIn();
        $('#loading-text').fadeIn();
        nextMsgHistorial();
    }
    window.location.href = link;
}
  
  //Redirige al url que recibe como parámetro en una nueva pestaña.
  function redirectBlank(link,type){
    window.open(
        link,
        '_blank' // <- This is what makes it open in a new window.
    );
  }


  function nextMsgNiveles() {
    if (messagesNiveles.length == 1) {
        $('#loading-text').html(messagesNiveles.pop()).fadeIn(500);

    } else {
        $('#loading-text').html(messagesNiveles.pop()).fadeIn(500).delay(5000).fadeOut(500, nextMsgNiveles);
    }
};

function nextMsgHistorial() {
    if (messagesHistorial.length == 1) {
        $('#loading-text').html(messagesHistorial.pop()).fadeIn(500);

    } else {
        $('#loading-text').html(messagesHistorial.pop()).fadeIn(500).delay(5000).fadeOut(500, nextMsgHistorial);
    }
};

var messagesNiveles = [
    "Estamos cargando los Niveles de Stock",
    "¡Casi listo! Últimos retoques"
].reverse();

var messagesHistorial = [
    "Estamos cargando todos los Movimientos",
    "Ten paciencia, no es una tarea fácil",
    "¡Casi listo! Últimos retoques"
].reverse();

function openEntradaModal(){
    jQuery.noConflict();
    $("#unidadMedidaInput").val("-");
    $(".modalErrorMessage").hide();
    $("#primary-btn-re").prop('disabled',true);
    document.getElementById('dateInput').valueAsDate = new Date();
    $("#entradaModal").modal('show');
}

function openSalidadaModal(){
    jQuery.noConflict();
    $("#primary-btn-sal").text('Registrar salida');
    $("#submenu-modal").show();
    $("#primary-btn-sal").hide();
    $("#modal-form-sm").hide();
    $("#modal-form-sed").hide();
    $("#pantalla-1").hide();
    $("#pantalla-2").hide();
    $(".modalErrorMessage").hide();
    $("#primary-btn-sal").prop('disabled',true);
    $("#secondary-btn-sal").text("Cancelar");
    $('#ent-select-picker-sm').val(-1);

    document.getElementById('dateInputSM').valueAsDate = new Date();
    pantalla = 1;
    $("#salidaModal").modal('show');
}

function completeUnidadMedida(um){
    var array = um.split(",");
    $("#unidadMedidaInput").val(array[0]);
    $("#idMat").val(array[1]);
    enable_disable();
}

function completeUnidadMedidaSM(um){
    var array = um.split(",");
    $("#idArtSM").val(array[1]);
    unidadMedida = array[0];
    stock_disp = parseFloat(array[2]);
    $("#stockDisponibleSM").val(stock_disp + " " + array[0] + " disponibles en stock.");
    validaCantSM($("#cantidadInputSM").val());
    enable_disable_sm();
}


function validaCant(val){
    if (val == ""){
        $("#cantError").fadeIn();
        cantidad = false;
    }
    else{
        $("#cantError").fadeOut();
        cantidad = true;
    }
    enable_disable();
}

function validaCantSM(val){
    if (valida_cant_sm){
        if (stock_disp != false){
            if (val == ""){
                $("#cantErrorSM").text("* Completar.")
                $("#cantErrorSM").fadeIn();
                cantidadSM = false;
            }
            else if (val > stock_disp){
                $("#cantErrorSM").text("* No hay stock.")
                $("#cantErrorSM").fadeIn();
                cantidadSM = false;
            }
            else{
                $("#cantErrorSM").fadeOut();
                cantidadSM = true;
            }
        }
        else if (val == ""){
            $("#cantErrorSM").text("* Completar.")
            $("#cantErrorSM").fadeIn();
            cantidadSM = false;
        }
        else{
            $("#cantErrorSM").fadeOut();
            cantidadSM = true;
        }
        enable_disable_sm();
    }
    
}

function validaFecha(val){
    if (val != ''){
        fecha = true;
        $("#fechaError").fadeOut();
    }
    else{
        fecha = false;
        $("#fechaError").fadeIn();
    }
    enable_disable();
}

function validaFechaSM(val){
    if (val != ''){
        fechaSM = true;
        $("#fechaErrorSM").fadeOut();
    }
    else{
        fechaSM = false;
        $("#fechaErrorSM").fadeIn();
    }
    enable_disable_sm();
}

function validaDesc(val){
    if (val == ""){
        $("#descError").text("* La descripción no puede quedar vacía.")
        $("#descError").fadeIn();
        descripcion = false;
    }
    else if (val.length > 200){
        $("#descError").text("* La descripción no puede tener más de 200 caracteres.");
        $("#descError").fadeIn();
        descripcion = false;
    }
    else if (val.length < 5){
        $("#descError").text("* La descripción no puede tener menos de 5 caracteres.");
        $("#descError").fadeIn();
        descripcion = false;
    }
    else{
        $("#descError").fadeOut();
        descripcion = true;
    }
    enable_disable();
}

function validaDescSM(val){
    if (val == ""){
        $("#descErrorSM").text("* La descripción no puede quedar vacía.")
        $("#descErrorSM").fadeIn();
        descripcionSM = false;
    }
    else if (val.length > 200){
        $("#descErrorSM").text("* La descripción no puede tener más de 200 caracteres.");
        $("#descErrorSM").fadeIn();
        descripcionSM = false;
    }
    else if (val.length < 5){
        $("#descErrorSM").text("* La descripción no puede tener menos de 5 caracteres.");
        $("#descErrorSM").fadeIn();
        descripcionSM = false;
    }
    else{
        $("#descErrorSM").fadeOut();
        descripcionSM = true;
    }
    enable_disable_sm();
}

function enable_disable(){
    if (cantidad && descripcion && fecha && $("#mat-select-picker-re").val() != null){
        $("#primary-btn-re").prop('disabled',false);
    }
    else{
        $("#primary-btn-re").prop('disabled',true);
    }
}

function enable_disable_sm(){
    if (cantidadSM && descripcionSM && fechaSM && $("#art-select-picker-sm").val() != null){
        $("#primary-btn-sal").prop('disabled',false);
    }
    else{
        $("#primary-btn-sal").prop('disabled',true);
    }
}

function submitForm(idForm){
    //Manejo de elementos de carga
    $("#modal-form-er").hide();
    $(".lds-ring div").css("border-color", "#95C22B transparent transparent transparent");
    $(".lds-ring").show().fadeIn(500);
    $('#primary-btn-re').prop('disabled', true);
    $('#secondary-btn-re').prop('disabled', true);

    //Manejo de datos
    $( "#altaEntradaExternaForm").submit();

    //Funcion que va cambiando los mensajes de carga.
    nextMsgAlta();
}

function submitFormSM(type){
    if (tipo_salida == 'sm'){
        //Manejo de elementos de carga
        $("#modal-form-sm").hide();
        $(".lds-ring div").css("border-color", "#95C22B transparent transparent transparent");
        $(".lds-ring").show().fadeIn(500);
        $('#primary-btn-sal').prop('disabled', true);
        $('#secondary-btn-sal').prop('disabled', true);

        //Manejo de datos
        $( "#modal-form-sm").submit();

        //Funcion que va cambiando los mensajes de carga.
        nextMsgAltSM();
    }
    else if(tipo_salida == 'sed'){
        if(pantalla == 1){
            $("#pantalla-1").hide();
            $("#pantalla-2").fadeIn();
            $("#secondary-btn-sal").text("Anterior");
            pantalla = 2;
        }
        
    }
    
}

function nextMsgAltSM() {
    if (messagesAltaSM.length == 1) {
        $('#loading-row-text-sm').html(messagesAltaSM.pop()).fadeIn(500);

    } else {
        $('#loading-row-text-sm').html(messagesAltaSM.pop()).fadeIn(500).delay(10000).fadeOut(500, nextMsgAltSM);
    }
};

var messagesAltaSM = [
    "Estamos registrando la salida...",
    "¡Casi listo! Últimos retoques"
].reverse();

function nextMsgAlta() {
    if (messagesAlta.length == 1) {
        $('#loading-row-text').html(messagesAlta.pop()).fadeIn(500);

    } else {
        $('#loading-row-text').html(messagesAlta.pop()).fadeIn(500).delay(10000).fadeOut(500, nextMsgAlta);
    }
};

var messagesAlta = [
    "Estamos registrando la entrada...",
    "¡Casi listo! Últimos retoques"
].reverse();

function changeForm(val){
    if (val == 'sm'){
        $("#submenu-modal").hide();
        $("#primary-btn-sal").fadeIn();
        $("#modal-form-sm").fadeIn();
        tipo_salida = val;
    }
    else if (val=='sed'){
        $("#submenu-modal").hide();
        $("#primary-btn-sal").text('Siguiente');
        $("#primary-btn-sal").fadeIn();
        $("#modal-form-sed").fadeIn();
        $("#pantalla-1").fadeIn();
        tipo_salida = val;
    }
}

function activate_validations(){
    valida_cant_sm = true;
}

function validaEntidad(val){
    if (val != null){
        $("#primary-btn-sal").prop('disabled',false);  
        pantalla = 1;    
    }
}

function cierraModal(){
    if (pantalla == 2){
        $("#pantalla-2").hide();
        $("#pantalla-1").fadeIn();
        $("#secondary-btn-sal").text("Cancelar");
        validaEntidad($("#ent-select-picker-sm").val());
        pantalla = 1;
    }
    else{
        $("#salidaModal").modal('hide');
    }
}