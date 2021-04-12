var cantidad = false;
var descripcion = false;
var fecha = true;

var cantidadSM = false;
var descripcionSM = false;
var fechaSM = true;

var cantidadSE = false;
var descripcionSE = false;
var fechaSE = true;

var stock_disp = false;

var valida_cant_sm = false;
var valida_cant_se = false;

var pantalla = 1;

var tipo_salida = false;

var valor_unitario = false;
var valor_original = false;

var valorUnidad = false;
var valorTotal = false;

const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];



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

    //Manejo de ocultamiento de lementos y botones.
    $("#unidadMedidaInput").val("-");
    $(".modalErrorMessage").hide();
    $("#primary-btn-re").prop('disabled',true);
    $("cantError").hide();
    $("#fechaError").hide();
    $("#descError").hide();
    $("#mat-select-picker-re").val(-1);

    //Seteo de valores iniciales
    document.getElementById('dateInput').valueAsDate = new Date();
    $("#stockDisponible").val("");
    $("#descEnt").val("");
    $("#cantidadInput").val("");
    cantidad = false;
    descripcion = false;
    fecha = true;

    $("#entradaModal").modal('show');
}

function openSalidadaModal(){
    jQuery.noConflict();

    //Manejo de ocultamiento de elementos y botones.
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
    $("cantErrorSM").hide();
    $("cantErrorSE").hide();
    $("#fechaErrorSM").hide();
    $("#fechaErrorSE").hide();
    $("#descErrorSM").hide();
    $("#descErrorSE").hide();
    $("#valorTotalErrorSE").hide();
    $("#valorUnitarioErrorSE").hide();
    
    //Seteo de valores iniciales.
    $("#art-select-picker-sm").val(-1);
    $("#art-select-picker-sed").val(-1);
    $('#ent-select-picker-sm').val(-1);
    $('#ent-select-picker-sed').val(-1);
    document.getElementById('dateInputSM').valueAsDate = new Date();
    document.getElementById('dateInputSE').valueAsDate = new Date();
    $("#stockDisponibleSM").val("");
    $("#stockDisponibleSE").val("");
    $("#descSM").val("");
    $("#descSE").val("");
    $("#cantidadInputSM").val("");
    $("#cantidadInputSE").val("");
    $("#unitValSE").val("");
    $("#totalValSE").val("");
    
    cantidadSM = false;
    descripcionSM = false;
    fechaSM = true;
    cantidadSE = false;
    descripcionSE = false;
    fechaSE = true;
    stock_disp = false;
    valida_cant_sm = false;
    valida_cant_se = false;
    pantalla = 1;
    tipo_salida = false;
    valor_unitario = false;
    valor_original = false;
    valorUnidad = false;
    valorTotal = false;

    $("#salidaModal").modal('show');
}

function completeUnidadMedida(um){
    var array = um.split(",");
    $("#unidadMedidaInput").val(array[0].replace("%", " "));
    $("#idMat").val(array[1]);
    enable_disable();
}

function completeUnidadMedidaSM(um){
    var array = um.split(",");
    $("#idArtSM").val(array[1]);
    unidadMedida = array[0].replace("%", " ");
    stock_disp = parseFloat(array[2]);
    $("#stockDisponibleSM").val(stock_disp + " " + array[0] + " disponibles en stock");
    validaCantSM($("#cantidadInputSM").val());
    enable_disable_sm();
}

function completeUnidadMedidaSE(um){
    var array = um.split(",");
    unidadMedida = array[0].replace("%", " ");
    stock_disp = parseFloat(array[2]);
    valor_unitario = parseFloat(array[3]);
    valor_original = parseFloat(array[3]);
    
    $("#idArtSE").val(array[1]);
    $("#stockDisponibleSE").val(stock_disp + " " + array[0] + " disponibles en stock");
    
    $("#unitValSE").val(valor_unitario);
    
    validaCantSE($("#cantidadInputSE").val());
    enable_disable_se();
}


function validaCant(val){
    if (val == ""){
        $("#cantError").text("* Completar.")
        $("#cantError").fadeIn();
        cantidad = false;
    }
    else if (parseFloat(val) <= 0){
        $("#cantError").text("* Debe ser mayor a 0.")
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
            else if (parseFloat(val) <= 0){
                $("#cantErrorSM").text("* Debe ser mayor a 0.")
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
        else if (parseFloat(val) <= 0){
            $("#cantErrorSM").text("* Debe ser mayor a 0.")
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

function validaCantSE(val){
    if (valida_cant_se){
        if (stock_disp != false){
            if (val == ""){
                $("#cantErrorSE").text("* Completar.")
                $("#cantErrorSE").fadeIn();
                cantidadSE = false;
            }
            else if (parseFloat(val) <= 0){
                $("#cantErrorSE").text("* Debe ser mayor a 0.")
                $("#cantErrorSE").fadeIn();
                cantidadSE = false;
            }
            else if (val > stock_disp){
                $("#cantErrorSE").text("* No hay stock.")
                $("#cantErrorSE").fadeIn();
                cantidadSE = false;
                if ($("#unitValSE").val() == ""){
                    $("#unitValSE").val(valor_original);
                    valor_unitario = valor_original;
                }
                $("#totalValSE").val(parseFloat(val) * valor_unitario);
                $("#valorTotalErrorSE").fadeOut();
                $("#valorUnitarioErrorSE").fadeOut();
                valorTotal= true;
                valorUnidad = true;
            }
            else{
                $("#cantErrorSE").fadeOut();
                cantidadSE = true;
                if ($("#unitValSE").val() == ""){
                    $("#unitValSE").val(valor_original);
                    valor_unitario = valor_original;
                }
                $("#totalValSE").val(parseFloat(val) * valor_unitario);
                $("#valorTotalErrorSE").fadeOut();
                $("#valorUnitarioErrorSE").fadeOut();
                valorTotal= true;
                valorUnidad = true;
            }
        }
        else if (val == ""){
            $("#cantErrorSE").text("* Completar.")
            $("#cantErrorSE").fadeIn();
            cantidadSE = false;
        }
        else if (parseFloat(val) <= 0){
            $("#cantErrorSE").text("* Debe ser mayor a 0.")
            $("#cantErrorSE").fadeIn();
            cantidadSE = false;
        }
        else{
            $("#cantErrorSE").fadeOut();
            cantidadSE = true;

            if ($("#unitValSE").val() == ""){
                $("#unitValSE").val(valor_original);
                valor_unitario = valor_original;
            }
            $("#totalValSE").val(parseFloat(val) * valor_unitario);
            $("#valorTotalErrorSE").fadeOut();
            $("#valorUnitarioErrorSE").fadeOut();
            valorTotal= true;
            valorUnidad = true;
        }
        enable_disable_se();
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

function validaFechaSE(val){
    if (val != ''){
        fechaSE = true;
        $("#fechaErrorSE").fadeOut();
    }
    else{
        fechaSM = false;
        $("#fechaErrorSE").fadeIn();
    }
    enable_disable_se();
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

function validaDescSE(val){
    if (val == ""){
        $("#descErrorSE").text("* La descripción no puede quedar vacía.")
        $("#descErrorSE").fadeIn();
        descripcionSE = false;
    }
    else if (val.length > 200){
        $("#descErrorSE").text("* La descripción no puede tener más de 200 caracteres.");
        $("#descErrorSE").fadeIn();
        descripcionSE = false;
    }
    else if (val.length < 5){
        $("#descErrorSE").text("* La descripción no puede tener menos de 5 caracteres.");
        $("#descErrorSE").fadeIn();
        descripcionSE = false;
    }
    else{
        $("#descErrorSE").fadeOut();
        descripcionSE = true;
    }
    enable_disable_se();
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

function enable_disable_se(){
    if (cantidadSE && descripcionSE && fechaSE && valorUnidad && valorTotal && $("#art-select-picker-sed").val() != null){
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
            $('#primary-btn-sal').prop('disabled', true);
            $("#primary-btn-sal").text("Registrar salida");
            $("#secondary-btn-sal").text("Anterior");
            enable_disable_se();
            pantalla = 2;
        }
        else if (pantalla == 2){
            $("#modal-form-sed").hide();
            $(".lds-ring div").css("border-color", "#95C22B transparent transparent transparent");
            $(".lds-ring").show().fadeIn(500);
            $('#primary-btn-sal').prop('disabled', true);
            $('#secondary-btn-sal').prop('disabled', true);
            $( "#modal-form-sed").submit();

            nextMsgAltSM();
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

function activate_validations_se(){
    valida_cant_se = true;
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
        $("#primary-btn-sal").text("Siguiente");
        $("#secondary-btn-sal").text("Cancelar");
        validaEntidad($("#ent-select-picker-sm").val());
        pantalla = 1;
    }
    else{
        $("#salidaModal").modal('hide');
    }
}

function inputUnitVal(val){
    if (val == ""){
        $("#valorUnitarioErrorSE").fadeIn();
        valorUnidad = false;
    }
    else{
        valor_unitario = val;
        valorUnidad = true;
        $("#valorUnitarioErrorSE").fadeOut();
        $("#totalValSE").val($("#cantidadInputSE").val() * val);
        valorTotal = true;
        $("#valorTotalErrorSE").fadeOut();
    }
    enable_disable_se();
    
}

function inputTotalVal(val){
    if (val == ""){
        $("#valorTotalErrorSE").fadeIn();
        valorTotal = false;
    }
    else{
        valor_unitario = val/$("#cantidadInputSE").val();
        valorTotal = true;
        $("#valorTotalErrorSE").fadeOut();
        $("#unitValSE").val(valor_unitario);
        valorUnidad = true;
        $("#valorUnitarioErrorSE").fadeOut();
    }
    enable_disable_se();
    
}

function getDataMat(id){
    $("#chart-row-mat").hide();
    $("#loading-row-mat").fadeIn();
    $("#loading-text-mat").fadeIn();
    $.getJSON("/gestion-depositos/chat-data-mat/"+String(id),function (result){
        const d = new Date();
        var months = []
        //TODO: Corregir, no funciona bien.
        for (i = parseInt(d.getMonth())+1; i <12; i++){
            months.push(monthNames[i] + " " + String(d.getFullYear()-1));
        } 
        for (i = 0; i <= parseInt(d.getMonth()); i++){
            months.push(monthNames[i] + " " + String(d.getFullYear()));
        }
        $("#loading-row-mat").hide();
        $("#loading-text-mat").hide();
        $("#chart-row-mat").fadeIn();
        var chart = new CanvasJS.Chart("chartContainer", {
            animationEnabled: true,
            theme: "light2",
            title:{
              text: ""
            },
            axisY: {
              gridThickness: 0,
              stripLines: [
                {
                  value: 0,
                  showOnTop: true,
                  color: "gray",
                  thickness: 2
                }
              ]
            },
            data: [{        
              type: "line",
              lineColor: "#95C22B",
              color:"#95C22B", 
              indexLabelFontSize: 16,
              dataPoints: [
                {x:1, y: result[0],label:months[0]},
                {x:2, y: result[1],label:months[1]},
                {x:3, y: result[2],label:months[2]},
                {x:4, y: result[3],label:months[3]},
                {x:5, y: result[4],label:months[4]},
                {x:6, y: result[5],label:months[5]},
                {x:7, y: result[6],label:months[6]},
                {x:8, y: result[7],label:months[7]},
                {x:9, y: result[8],label:months[8]},
                {x:10, y: result[9],label:months[9]},
                {x:11, y: result[10],label:months[10]},
                {x:12, y: result[11],label:months[11]}
              ]
            }]
          });
          chart.render(); 
    });

}

function getDataIns(id){
    $("#chart-row-ins").hide();
    $("#loading-row-ins").fadeIn();
    $("#loading-text-ins").fadeIn();
    $.getJSON("/gestion-depositos/chat-data-ins/"+String(id),function (result){
        const d = new Date();
        var months = []
        //TODO: Corregir, no funciona bien.
        for (i = parseInt(d.getMonth())+1; i <12; i++){
            months.push(monthNames[i] + " " + String(d.getFullYear()-1));
        } 
        for (i = 0; i <= parseInt(d.getMonth()); i++){
            months.push(monthNames[i] + " " + String(d.getFullYear()));
        }
        $("#loading-row-ins").hide();
        $("#loading-text-ins").hide();
        $("#chart-row-ins").fadeIn();
        var chart = new CanvasJS.Chart("chartContainer2", {
            animationEnabled: true,
            theme: "light2",
            title:{
              text: ""
            },
            axisY: {
              gridThickness: 0,
              stripLines: [
                {
                  value: 0,
                  showOnTop: true,
                  color: "gray",
                  thickness: 2
                }
              ]
            },
            data: [{        
              type: "line",
              lineColor: "#95C22B",
              color:"#95C22B", 
              indexLabelFontSize: 16,
              dataPoints: [
                {x:1, y: result[0],label:months[0]},
                {x:2, y: result[1],label:months[1]},
                {x:3, y: result[2],label:months[2]},
                {x:4, y: result[3],label:months[3]},
                {x:5, y: result[4],label:months[4]},
                {x:6, y: result[5],label:months[5]},
                {x:7, y: result[6],label:months[6]},
                {x:8, y: result[7],label:months[7]},
                {x:9, y: result[8],label:months[8]},
                {x:10, y: result[9],label:months[9]},
                {x:11, y: result[10],label:months[10]},
                {x:12, y: result[11],label:months[11]}
              ]
            }]
          });
          chart.render(); 
    });

}

function getDataArt(id){
    $("#chart-row-art").hide();
    $("#loading-row-art").fadeIn();
    $("#loading-text-art").fadeIn();
    $.getJSON("/gestion-depositos/chat-data-art/"+String(id),function (result){
        const d = new Date();
        var months = []
        //TODO: Corregir, no funciona bien.
        for (i = parseInt(d.getMonth())+1; i <12; i++){
            months.push(monthNames[i] + " " + String(d.getFullYear()-1));
        } 
        for (i = 0; i <= parseInt(d.getMonth()); i++){
            months.push(monthNames[i] + " " + String(d.getFullYear()));
        }
        $("#loading-row-art").hide();
        $("#loading-text-art").hide();
        $("#chart-row-art").fadeIn();
        var chart = new CanvasJS.Chart("chartContainer3", {
            animationEnabled: true,
            theme: "light2",
            title:{
              text: ""
            },
            axisY: {
              gridThickness: 0,
              stripLines: [
                {
                  value: 0,
                  showOnTop: true,
                  color: "gray",
                  thickness: 2
                }
              ]
            },
            data: [{        
              type: "line",
              lineColor: "#95C22B",
              color:"#95C22B", 
              indexLabelFontSize: 16,
              dataPoints: [
                {x:1, y: result[0],label:months[0]},
                {x:2, y: result[1],label:months[1]},
                {x:3, y: result[2],label:months[2]},
                {x:4, y: result[3],label:months[3]},
                {x:5, y: result[4],label:months[4]},
                {x:6, y: result[5],label:months[5]},
                {x:7, y: result[6],label:months[6]},
                {x:8, y: result[7],label:months[7]},
                {x:9, y: result[8],label:months[8]},
                {x:10, y: result[9],label:months[9]},
                {x:11, y: result[10],label:months[10]},
                {x:12, y: result[11],label:months[11]}
              ]
            }]
          });
          chart.render(); 
    });

}


getDataMat($("#chart-mat-sp").val());
getDataIns($("#chart-ins-sp").val());
getDataArt($("#chart-art-sp").val());