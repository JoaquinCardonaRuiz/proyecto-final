//Variables globales
var del = false;
var mod = false;
var nombres = false;
var alta_form_page = 1;
var provincia = true;
var pais = true;
var ciudad = true;
var altura = false;
var calle = false;
var menuShown = false;
var selectedOptions = [];

//Cambios
var cambios_nombre = false;
var cambio_estado = false;
var cambio_provincia = false;
var cambio_calle = false;
var cambio_altura = false;
var cambio_ciudad = false;
var cambio_pais = false;
var cambio_horarios = [false, false, false, false, false, false, false];

//Valores originales
var nombre_ant = false;
var estado_ant;
var provincia_ant;
var calle_ant = false;
var altura_ant = false;
var ciudad_ant = false;
var provincia_ant = false;
var pais_ant = false;
var horarios_mod = false;
var estado_horario_ant = [true,true,true,true,true,true,true];
var estado_horario = [true,true,true,true,true,true,true];
 


//Asteriscos de error
var error_nombre = false;
var error_provincia = false;
var error_calle = false;
var error_altura = false;
var error_pais = false;
var error_ciudad = false;
var error_horarios = [false, false, false, false, false, false, false];


//Funciones específicas que manejan el dropdwon.
function headingOptionHover(){
    $(".chevron").css({cursor: 'pointer', transform: 'rotate(180deg)'});
}

function headingOptionLeave(){
    $(".chevron").css({transform: 'rotate(0deg)'});
}

//Manejo del tooltip.
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})

function openMenu() {
    $("#menu-option-box-1").fadeIn();
    $(".dropdown-box").css("border","1px solid #95C22B");
    $('#cards-row-materiales').css({"transform":"translateY(200px)"});
    $("#bottomAltaModalTextAltaPD").css({"transform":"translateY(200px)"});
    $(".margin-row").show();
    $(".margin-row").css({"transform":"translateY(200px)"});
    $("#bottomAltaModalTextAltaPD").css({"margin-bottom":"25px"});
};


function closeMenu() {
    $("#menu-option-box-1").hide();
    $(".dropdown-box").css("border","1px solid rgb(184, 184, 184)");
    $('#cards-row-materiales').css({"transform":"translateY(0px)"});
    $("#bottomAltaModalTextAltaPD").css({"transform":"translateY(0px)"});
    $("#bottomAltaModalTextAltaPD").css({"margin-bottom":""});
    $(".margin-row").css({"transform":"translateY(0px)"});
    $(".margin-row").hide();
};

function dropdownOptionSelect(idOption, nameOption, color){
    if (selectedOptions.includes(idOption)){
        const index = selectedOptions.indexOf(idOption);
        if (index > -1) {
            selectedOptions.splice(index, 1);
        }
        $("#" + String(nameOption) + "-check").fadeOut();
        $("#" + String(nameOption) + "-card").fadeOut();
    }
    else{
        selectedOptions.push(idOption);
        $("#" + String(nameOption) + "-check").fadeIn();
        setColor(nameOption,color);
        $("#" + String(nameOption) + "-card").fadeIn();
    }
    labelShowHide();
    $("#materiales-altaPD").val("[" + selectedOptions + "]");  
     
}

//Manejo de carteles en la seleccion de materiales del dropdown.
function labelShowHide(){
    if (selectedOptions.length == 0){
        $(".indicator-label-2").hide();
        $("#warning-label-altaPD").fadeIn(1000);
    }
    else{
        $(".indicator-label-2").show();
        $("#warning-label-altaPD").hide();
    }
}

//Setea el color de las tarjetas de materiales.
function setColor(nombre,color){
    $("#"+String(nombre)+"-img").css("background-color", String(color));
}

//Cierra el dropdown al clickear fuera de el y su
$(document).on('click', function (e) {
    if ($(e.target).closest("#dropdown-altaPD").length === 0) {
        if (menuShown == true){
            closeMenu();
            headingOptionLeave();
            menuShown=false;
        }
    }
});

//Funcion principal de manejo del compartamiento el dropdown.
function dropdownManager(){
    if (menuShown == false){
        openMenu();
        headingOptionHover();
        menuShown = true
    }
    else{
        closeMenu();
        headingOptionLeave();
        menuShown=false;
    }

}

$.getJSON("/gestion-puntos-deposito/nombres-pd/",function (result){
    nombres = result;
});

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

function openModalHorarios(id, nombre, estado){
    $.getJSON("/gestion-puntos-deposito/horarios/"+String(id),function (result){
        
        // Borro contenido anterior
        document.getElementById("modalTableBody"). innerHTML="";
        document.getElementById("headerRow").innerHTML ="";

        // Establezco título
        document.getElementById("headingModalHorarios").innerHTML = "Horarios de " + nombre;

        if(result.length > 0){
            // Creo títulos de columnas
            var headings = ["Día","Horarios"];
            for (i=0; i < headings.length; i++){
                t = document.createElement("th");
                t.scope = "col";
                t.class = "table-heading";
                t.innerHTML = headings[i];
                document.getElementById("headerRow").appendChild(t);
            }

            // Creo contenido
            for(i=0; i < result.length - 5; i++){
                // Creo celda de día
                headCell = document.createElement("th");
                headCell.scope = "row";
                headCell.innerHTML = result[i]["dia"];
    
                // Creo celda de horarios
                bodyCell1 = document.createElement("td");
                if(result[i]["horaDesde"] == false || result[i]["horaHasta"] == false){
                    bodyCell1.innerHTML = "No abre este día";
                }
                else{
                    bodyCell1.innerHTML = "Desde las " + result[i]["horaDesde"] + " hasta las " + result[i]["horaHasta"];
                }

    
                // Creo fila
                row = document.createElement("tr");
    
                // Agrego celdas a fila
                row.appendChild(headCell); 
                row.appendChild(bodyCell1);

                // Agrego fila a tabla
                document.getElementById("modalTableBody").appendChild(row);
            }
        }
        document.getElementById("open-loading-modal").click();
        document.getElementById("open-modal").click();
    
    pd_abierto = result[7]
    cant_horas_cierre = result[8]
    fines_semana = result[9]
    toda_semana = result[10]
    horario_apertura = result[11]
    
    //Setea el estado.
    if (estado == "False"){
        $("#estado-apertura-pos").hide()
        $("#cant-horas-cierre-pos").hide();
        $("#estado-apertura-neg").hide()
        $("#cant-horas-cierre-neg").hide();
        $("#open-img").hide();
        $("#close-img").hide();

        $("#estado-apertura-inac").show()
        $("#cant-horas-cierre-neg").show();
        $("#inactive-img").show();
    }
    else if (pd_abierto == true){
        $("#estado-apertura-neg").hide()
        $("#cant-horas-cierre-neg").hide();
        $("#estado-apertura-inac").hide()
        $("#close-img").hide();
        $("#inactive-img").hide();

        $("#estado-apertura-pos").show()
        $("#cant-horas-cierre-pos").text(cant_horas_cierre);
        $("#cant-horas-cierre-pos").show();
        $("#open-img").show();
    }
    else {
        $("#estado-apertura-pos").hide()
        $("#cant-horas-cierre-pos").hide();
        $("#estado-apertura-inac").hide()
        $("#open-img").hide();
        $("#inactive-img").hide();


        $("#estado-apertura-neg").show()
        $("#cant-horas-cierre-neg").show();
        $("#close-img").show();
    }

    //Setea si abre o no los fines de semana.
    if (fines_semana == true){
        $("#fines-semana-pos").show();
        $("#fines-semana-neg").hide();
    }
    else{
        $("#fines-semana-pos").hide();
        $("#fines-semana-neg").show();
    }

    //Setea si abre o no de lunes a viernes.
    if (toda_semana == true){
        $("#toda-semana-pos").show();
        $("#toda-semana-neg").hide();
    }
    else{
        $("#toda-semana-pos").hide();
        $("#toda-semana-neg").show();
    }

    //Setea el horario de apertura.
    if (horario_apertura == false){
        $("#horarios-apertura").text('No abre el día de hoy');
    }
    else if (estado == "False"){
        $("#horarios-apertura").text('No abre mientras esté inactivo');
        }
        else if (pd_abierto == true){
        $("#horarios-apertura").text('Hoy abre ' + horario_apertura[0] + "hs y cierra " + horario_apertura[1] + "hs");
        }
        else{
            $("#horarios-apertura").text('Hoy abrió  ' + horario_apertura[0] + "hs y cerró " + horario_apertura[1] + "hs");
        }
    })
}

function openModalMateriales(id, nombre){
    $.getJSON("/gestion-puntos-deposito/materiales/"+String(id),function (result){
        
        card = $("#material-card").clone();
        $("#materiales-modal-body").children("#material-card").remove();
        // Borro contenido anterior
        document.getElementById("modalTableBody"). innerHTML="";
        document.getElementById("headerRow").innerHTML ="";

        // Establezco título
        document.getElementById("headingModalMat").innerHTML = "Materiales aceptados por " + nombre;
        document.getElementById("open-loading-modal").click();
        document.getElementById("open-modal-mat").click();

        row = document.getElementById("material-card");
        for(i=0; i < result.length ; i++){
            clone = card.clone();
            clone.find("#nombre-material").text(result[i]["nombre"]);
            clone.find("#unidad-medida").text(result[i]["unidadMedida"]);
            clone.find("#material-img").css('background-color',result[i]["color"]);
            clone.find("#material-img").text(result[i]["nombre"][0]);
            clone.find("#id-material").text(result[i]["id"]);
            clone.appendTo("#materiales-modal-body");

        }
    
    })
}

function cierraModal(idModal){
    jQuery.noConflict();
    $('#loadingModal').modal('hide');
}

function openLoadingRing(){
    document.getElementById("open-loading-modal").click();
    $(".lds-ring").hide();
    $(".lds-ring div").css("border-color", "#95C22B transparent transparent transparent");
    $(".lds-ring").show();
    $("#loadingRow").show();
}

function openAltaModal(){
    var dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
    jQuery.noConflict();

    //Define que se debe mostrar y que se oculta.
    $("#bottomAltaModalText").hide();
    $("#nombrePDError").hide();
    $(".lds-ring").hide();
    $("#loadingRow").hide();
    $("#altaPDModal").modal("show");
    $("#nombrePD").val("");
    $("#customSwitch1").val(true);
    $('#primary-btn-alta').prop('disabled', true);
    $(".card-altaPD").hide();
    $(".dropdown-option-check").hide();

    //Seteo de valores iniciales.
    for (var i in dias){
        dia = dias[i];
        $("#" + String(dia) + "-horaDesde").val("08:00");
        $("#" + String(dia) + "-horaHasta").val("20:00");
    }
    $("#callePD").val("");
    $("#alturaPD").val("");
    $("#ciudadPD").val("Rosario");
    $("#provinciaPD").val("Santa Fe");
    $("#paisPD").val("Argentina");
    selectedOptions = [];
    $("#switch-value").val("true");

}

//Valida que el campo Nombre PD no esté repetido ni vacío.
function validaNombrePD(tipo){
    if (tipo == "alta"){
        if ((String($("#nombrePD").val()).trim()) == ""){
            $("#nombrePDError").text("* El nombre no puede quedar vacío.");
            $("#nombrePDError").show();
            $('#primary-btn-alta').prop('disabled', true);
        }
        else if (nombres.includes(($("#nombrePD").val()).trim())){
            $("#nombrePDError").text("* Este nombre ya ha sido utilizado en otro Punto de Depósito.");
            $("#nombrePDError").show();
            $('#primary-btn-alta').prop('disabled', true);
        }
        else{
            $("#nombrePDError").hide();
            $('#primary-btn-alta').prop('disabled', false);
        }
    }

    else if (tipo == "mod"){
        if ((String($("#nombrePDMod").val()).trim()) == nombre_ant){
            $("#nombrePDErrorMod").hide();
            cambios_nombre = false;
            error_nombre = false;
        }
        else if ((String($("#nombrePDMod").val()).trim()) == ""){
            $("#nombrePDErrorMod").text("* El nombre no puede quedar vacío.");
            $("#nombrePDErrorMod").show();
            cambios_nombre = true;
            error_nombre = true;
        }
        else if (nombres.includes(($("#nombrePDMod").val()).trim())){
            $("#nombrePDErrorMod").text("* Este nombre ya ha sido utilizado en otro Punto de Depósito.");
            $("#nombrePDErrorMod").show();
            cambios_nombre = true;
            error_nombre = true;
        }
        else{
            $("#nombrePDErrorMod").hide();
            cambios_nombre = true;
            error_nombre = false;
        }
        calc_cant_cambios();
        error_datos_basicos();
    }
    
}

function error_datos_basicos(){
    if (error_nombre == true){
        $("#db-error-tab").show();
    }
    else{
        $("#db-error-tab").hide();
    }
}
//Valida que ningún campo de horario tenga un valor incorrecto.
function validaHorarioPD(){
  var dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  desactiva = false;
  activa = false;
  pre_desactiva = false;
  while(desactiva == false && activa == false){
    for (var i in dias){
        dia = dias[i];
        horaHasta = $("#" + String(dia) + "-horaHasta").val();
        horaDesde = $("#" + String(dia) + "-horaDesde").val();
        if ( ( horaHasta== "" ||  horaDesde == "") && $("#" + String(dia) + "-switch").is(":checked") == true){
            pre_desactiva = true;
            if (horaHasta == ""){
                $("#" + String(dia) + "-error-horaHasta").show();
            }
            else{
                $("#" + String(dia) + "-error-horaHasta").hide();
            }

            if (horaDesde == ""){
                $("#" + String(dia) + "-error-horaDesde").show();
            }
            else{
                $("#" + String(dia) + "-error-horaDesde").hide();
            }
            $("#" + String(dia) + "-error").hide();
        }
        else if ((horaDesde) >= (horaHasta) && $("#" + String(dia) + "-switch").is(":checked") == true){
            pre_desactiva = true;
            $("#" + String(dia) + "-error-horaDesde").hide();
            $("#" + String(dia) + "-error-horaHasta").hide();
            $("#" + String(dia) + "-error").show();

        }
        else{
            pre_desactiva = true;
            $("#" + String(dia) + "-error-horaDesde").hide();
            $("#" + String(dia) + "-error-horaHasta").hide();
            $("#" + String(dia) + "-error").hide();
        }
        
      }
    if (pre_desactiva == true)
        desactiva = true;
    else{
        activa = true;
    }
  }
  if (desactiva == true){
    $('#primary-btn-alta').prop('disabled', true);
  }
  else{
    $('#primary-btn-alta').prop('disabled', false);
  }
  
  
}

function validaHorarioPDMod(){
    var dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
    desactivaMod = false;
    activaMod = false;
    pre_desactivaMod = false;
    while(desactivaMod == false && activaMod == false){
      for (var i in dias){
          dia = dias[i];
          horaHasta = $("#" + String(dia) + "-horaHasta-mod").val();
          horaDesde = $("#" + String(dia) + "-horaDesde-mod").val();
          if ( ( horaHasta== "" ||  horaDesde == "") && $("#" + String(dia) + "-switch-mod").is(":checked") == true){
              pre_desactivaMod = true;
              if (horaHasta == ""){
                  $("#" + String(dia) + "-error-horaHasta-mod").show();
                  error_horarios[i] = true;
              }
              else{
                  $("#" + String(dia) + "-error-horaHasta-mod").hide();
                  error_horarios[i] = false;
              }
  
              if (horaDesde == ""){
                  $("#" + String(dia) + "-error-horaDesde-mod").show();
                  error_horarios[i] = true;
              }
              else{
                  $("#" + String(dia) + "-error-horaDesde-mod").hide();
                  error_horarios[i] = false;
              }
              
              $("#" + String(dia) + "-error-mod").hide();
          }
          else if ((horaDesde) >= (horaHasta) && $("#" + String(dia) + "-switch-mod").is(":checked") == true){
              pre_desactivaMod = true;
              $("#" + String(dia) + "-error-horaDesde-mod").hide();
              $("#" + String(dia) + "-error-horaHasta-mod").hide();
              $("#" + String(dia) + "-error-mod").show();
              error_horarios[i] = true;
          }
          else{
              pre_desactivaMod = true;
              $("#" + String(dia) + "-error-horaDesde-mod").hide();
              $("#" + String(dia) + "-error-horaHasta-mod").hide();
              $("#" + String(dia) + "-error-mod").hide();
              error_horarios[i] = false;
          }
      }
      if (pre_desactivaMod == true)
          desactivaMod = true;
      else{
          activaMod = true;
      }
    }
    if (desactivaMod == true){
      //Botón
    }
    else{
      //Botón
    }
    error_horario();
    calc_cant_cambios();
}



function error_horario(){
    if (error_horarios.includes(true)){
        $("#hor-error-tab").show();
    }
    else{
        $("#hor-error-tab").hide();
    }
}

//Valida que ningún campo de la dirección tenga un valor.
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
        if (provincia == true && ciudad == true && pais == true && calle == true && altura == true){
            $('#primary-btn-alta').prop('disabled', false);
        }
        else{
            $('#primary-btn-alta').prop('disabled', true);
        }
    }
    else if (modal_type == 'mod'){
        if (campoValidacion == 'provincia'){
            if ($("#provinciaPDMod").val() == ""){
                cambio_provincia = true;
                error_provincia = true;
                $("#error-provincia-mod").show();
            }
            else if ($("#provinciaPDMod").val() == provincia_ant){
                cambio_provincia = false;
                error_provincia = false;
                $("#error-provincia-mod").hide(); 
            }
            else{
                cambio_provincia = true;
                error_provincia = false;
                $("#error-provincia-mod").hide(); 
            }
        }
        else if (campoValidacion == 'calle'){
            if ($("#callePDMod").val() == ""){
                cambio_calle = true;
                error_calle = true;
                $("#error-calle-mod").show();
            }
            else if ($("#callePDMod").val() == calle_ant){
                cambio_calle = false;
                error_calle = false;
                $("#error-calle-mod").hide(); 
            }
            else{
                cambio_calle = true;
                error_calle = false;
                $("#error-calle-mod").hide(); 
            }
        }
        else if (campoValidacion == 'altura'){
            if ($("#alturaPDMod").val() == ""){
                cambio_altura = true;
                error_altura = true;
                $("#error-altura-mod").show();
            }
            else if ($("#alturaPDMod").val() == altura_ant){
                cambio_altura = false;
                error_altura = false;
                $("#error-altura-mod").hide(); 
            }
            else{
                cambio_altura = true;
                error_altura = false;
                $("#error-altura-mod").hide(); 
            }
        }
        else if (campoValidacion == 'ciudad'){
            if ($("#ciudadPDMod").val() == ""){
                cambio_ciudad = true;
                error_ciudad = true;
                $("#error-ciudad-mod").show();
            }
            else if ($("#ciudadPDMod").val() == ciudad_ant){
                cambio_ciudad = false;
                error_ciudad = false;
                $("#error-ciudad-mod").hide(); 
            }
            else{
                cambio_ciudad = true;
                error_ciudad = false;
                $("#error-ciudad-mod").hide(); 
            }
        }
        else if (campoValidacion == 'pais'){
            if ($("#paisPDMod").val() == ""){
                cambio_pais = true;
                error_pais = true;
                $("#error-pais-mod").show();
            }
            else if ($("#paisPDMod").val() == pais_ant){
                cambio_pais = false;
                error_pais = false;
                $("#error-pais-mod").hide(); 
            }
            else{
                cambio_ciudad = true;
                error_ciudad = false;
                $("#error-ciudad-mod").hide(); 
            }
        }
        error_direccion();
        calc_cant_cambios();

    }
    
}

function error_direccion(){
    if (error_provincia == true || error_calle == true || error_altura == true || error_ciudad == true || error_pais == true){
        $("#dir-error-tab").show();
    }
    else{
        $("#dir-error-tab").hide();
    }
}

//Calcula la cantidad total de cambios en el Modal de Modificar.
function calc_cant_cambios(){
    cant_cambios = 0;
    if (cambios_nombre == true){
        cant_cambios +=1;
    }
    if (cambio_estado == true){
        cant_cambios += 1;
    }
    if (cambio_provincia == true){
        cant_cambios += 1;
    }
    if (cambio_calle == true){
        cant_cambios += 1;
    }
    if (cambio_altura == true){
        cant_cambios += 1;
    }
    if (cambio_ciudad == true){
        cant_cambios += 1;
    }
    if (cambio_pais == true){
        cant_cambios += 1;
    }
    cant_cambios += cambio_horarios.reduce(function(n, val) {
        return n + (val === true);
    }, 0);
    
    
    $("#primary-btn-mod").text("Confirmar " + String(cant_cambios) + " cambios");
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

$("#customSwitch1").click(function() {
    if($("#customSwitch1").is(":checked") == true){
        $("#pdInactivo").fadeOut();    
        $("#pdActivo").fadeIn();
        $("#switch-value").val("true");
    }
    else{
        $("#pdActivo").fadeOut(); 
        $("#pdInactivo").fadeIn();
        $("#switch-value").val("false");
    }
});

//Setea la posición del label para el witch de la página 1 del modal de alta.
function labelPosition(){
    var pos_switch = document.getElementById("customSwitch1").offsetTop;
    var pos_switch_left = document.getElementById("customSwitch1").offsetLeft;
    $("#pdActivo").css({top: pos_switch - 24, position:'absolute'});
    $("#pdActivo").css({left: pos_switch_left + 140, position:'absolute'});

    $("#pdInactivo").css({top: pos_switch - 24, position:'absolute'});
    $("#pdInactivo").css({left: pos_switch_left + 140, position:'absolute'});

    var pos_switch = document.getElementById("customSwitch2").offsetTop;
    var pos_switch_left = document.getElementById("customSwitch2").offsetLeft;
    $("#pdActivoMod").css({top: pos_switch - 24, position:'absolute'});
    $("#pdActivoMod").css({left: pos_switch_left + 140, position:'absolute'});

    $("#pdInactivoMod").css({top: pos_switch - 24, position:'absolute'});
    $("#pdInactivoMod").css({left: pos_switch_left + 140, position:'absolute'});
}

//Habilita y deshabilita los horarios para un día determinado.
function habilitaHorario(dia){
    
    if ($("#" + String(dia) + "-switch").is(":checked") == true){

        $("#" + String(dia) + "-horaDesde").val("08:00");
        $("#" + String(dia) + "-horaHasta").val("20:00");
        $("#" + String(dia) + "-horaDesde").prop( "readonly", false );
        $("#" + String(dia) + "-horaHasta").prop( "readonly", false );
        $("#" + String(dia) + "-horaDesde").removeClass("data-show-input");
        $("#" + String(dia) + "-horaHasta").removeClass("data-show-input");
        $("#" + String(dia) + "-span-horaDesde").show();
        $("#" + String(dia) + "-bar-horaDesde").show();
        $("#" + String(dia) + "-span-horaHasta").show();
        $("#" + String(dia) + "-bar-horaHasta").show();
        validaHorarioPD();
    }
    else{
        $("#" + String(dia) + "-horaDesde").val("");
        $("#" + String(dia) + "-horaHasta").val("");
        $("#" + String(dia) + "-horaDesde").prop('readonly', true);
        $("#" + String(dia) + "-horaDesde").addClass("data-show-input");
        $("#" + String(dia) + "-horaHasta").prop('readonly', true);
        $("#" + String(dia) + "-horaHasta").addClass("data-show-input");
        $("#" + String(dia) + "-span-horaDesde").hide();
        $("#" + String(dia) + "-bar-horaDesde").hide();
        $("#" + String(dia) + "-span-horaHasta").hide();
        $("#" + String(dia) + "-bar-horaHasta").hide();
        validaHorarioPD()
        
    }
}

//Habilita y deshabilita los horarios para un día determinado.
function habilitaHorarioMod(dia){
    if ($("#" + String(dia) + "-switch-mod").is(":checked") == true){

        $("#" + String(dia) + "-horaDesde-mod").val("08:00");
        $("#" + String(dia) + "-horaHasta-mod").val("20:00");
        $("#" + String(dia) + "-horaDesde-mod").prop( "readonly", false );
        $("#" + String(dia) + "-horaHasta-mod").prop( "readonly", false );
        $("#" + String(dia) + "-horaDesde-mod").removeClass("data-show-input");
        $("#" + String(dia) + "-horaHasta-mod").removeClass("data-show-input");
        $("#" + String(dia) + "-span-horaDesde-mod").show();
        $("#" + String(dia) + "-bar-horaDesde-mod").show();
        $("#" + String(dia) + "-span-horaHasta-mod").show();
        $("#" + String(dia) + "-bar-horaHasta-mod").show();
        validaHorarioPDMod();
    }
    else{
        $("#" + String(dia) + "-horaDesde-mod").val("");
        $("#" + String(dia) + "-horaHasta-mod").val("");
        $("#" + String(dia) + "-horaDesde-mod").prop('readonly', true);
        $("#" + String(dia) + "-horaDesde-mod").addClass("data-show-input");
        $("#" + String(dia) + "-horaHasta-mod").prop('readonly', true);
        $("#" + String(dia) + "-horaHasta-mod").addClass("data-show-input");
        $("#" + String(dia) + "-span-horaDesde-mod").hide();
        $("#" + String(dia) + "-bar-horaDesde-mod").hide();
        $("#" + String(dia) + "-span-horaHasta-mod").hide();
        $("#" + String(dia) + "-bar-horaHasta-mod").hide();
        validaHorarioPDMod();
        
    }
}

//Hace el submit de un form, recibiendo su ID como parametro.
function submitForm(idForm){
    
    //Seteo de pagina
    alta_form_page = 1;
    display_page();

    
    //Manejo de elementos de carga y ocultamientos
    $("#modal-alta-p1").show();
    $("#bottomAltaModalTextAltaPD").hide();  
    $("#altaPdForm").hide();
  
    $("#bottomAltaModalText").show();
    $(".lds-ring div").css("border-color", "#95C22B transparent transparent transparent");
    $(".lds-ring").show().fadeIn(500);
    $('#primary-btn').prop('disabled', true);
    $('#secondary-btn').prop('disabled', true);

    //Manejo de datos
    idForm = String(idForm);
    $( "#" + idForm ).submit();

    //Funcion que va cambiando los mensajes de carga.
    nextMsgAlta();

}

//Gestiona el avance de páginas del modal de alta.
function next_page(){
    if (alta_form_page == 1){
        alta_form_page = 2;
        validaDireccion('');
    }
    else if (alta_form_page == 2){
        alta_form_page = 3;
        validaHorarioPD();
    }
    else if (alta_form_page == 3){
        alta_form_page = 4;
    }
    else{
        submitForm('altaPdForm');
    }
    display_page();
}

//Gestiona el retroceso de páginas del modal de alta.
function previous_page(){
    if (alta_form_page == 1){
       $("#altaPDModal").modal("hide");
    }
    else if (alta_form_page == 2){
        alta_form_page = 1;
        validaNombrePD();
    }
    else if (alta_form_page == 3){
        alta_form_page = 2;
        validaDireccion('');
    }
    else{
        alta_form_page = 3;
        validaHorarioPD();
    }
    display_page();
}

//Gestiona lo que debe mostrarse en cada página del modal de alta.
function display_page(){
    if (alta_form_page == 1){
        $("#modal-alta-p3").hide();
        $("#modal-alta-p2").hide();
        $("#modal-alta-p4").hide();
        $("#modal-alta-p1").fadeIn();
        $("#secondary-btn").text("Cancelar");
        $("#primary-btn-alta").text("Siguiente");
        $("#subheader-alta").text("Datos Básicos");
        $("#bottomAltaModalTextAltaPD").text('Una vez completados todos los datos, presione el botón "Siguiente".');
        goToTopOfPage();
     }
     else if (alta_form_page == 2){
        $("#modal-alta-p1").hide();
        $("#modal-alta-p3").hide();
        $("#modal-alta-p4").hide();
        $("#modal-alta-p2").fadeIn();
        $("#secondary-btn").text("Anterior");
        $("#primary-btn-alta").text("Siguiente");
        $("#subheader-alta").text("Dirección");
        $("#bottomAltaModalTextAltaPD").text('Una vez completada la dirección, presione el botón "Siguiente".');
        goToTopOfPage();
     }
     else if (alta_form_page == 3){
        $("#modal-alta-p1").hide();
        $("#modal-alta-p2").hide();
        $("#modal-alta-p4").hide();
        $("#modal-alta-p3").fadeIn();
        $("#secondary-btn").text("Anterior");
        $("#primary-btn-alta").text("Siguiente");
        $("#subheader-alta").text("Horarios");
        $("#bottomAltaModalTextAltaPD").css({"transform":"translateY(0px)"});
        $(".margin-row").hide();
        $("#bottomAltaModalTextAltaPD").text('Una vez elegidos los horarios, presione el botón "Siguiente".');
        goToTopOfPage();
     } 
     else{
        closeMenu();
        labelShowHide();
        $("#modal-alta-p1").hide();
        $("#modal-alta-p2").hide();
        $("#modal-alta-p3").hide();
        $("#modal-alta-p4").fadeIn();
        $("#secondary-btn").text("Anterior");
        $("#primary-btn-alta").text("Crear Punto de  Depósito");
        $("#subheader-alta").text("Materiales");
        $("#bottomAltaModalTextAltaPD").text('Una vez elegidos los materiales, presione "Crear Punto de  Depósito" para añadir el nuevo Punto.');
        goToTopOfPage();
     }
}

//Traslada el scroll al tope de la pagina en el form de alta de un PD.
function goToTopOfPage(){
    $('#modalAltaPDBody').scrollTop(0);    
}

//Funcion para el manejo de los mensajes durante la carga.
function nextMsgMod() {
    if (messagesMod.length == 1) {
        $('#bottomModModalText').html(messagesMod.pop()).fadeIn(500);

    } else {
        $('#bottomModModalText').html(messagesMod.pop()).fadeIn(500).delay(7500).fadeOut(500, nextMsgMod);

    }
};

function nextMsgAlta() {
    if (messagesAlta.length == 1) {
        $('#bottomAltaModalText').html(messagesAlta.pop()).fadeIn(500);

    } else {
        $('#bottomAltaModalText').html(messagesAlta.pop()).fadeIn(500).delay(7500).fadeOut(500, nextMsgAlta);

    }
};

function nextMsgBaja() {
    if (messagesBaja.length == 1) {
        $('#bottomBajaModalText').html(messagesBaja.pop()).fadeIn(500);

    } else {
        $('#bottomBajaModalText').html(messagesBaja.pop()).fadeIn(500).delay(7500).fadeOut(500, nextMsgBaja);
    }
};

function select(){
    document.getElementById("first-button").click;
}

// Lista de mensajes para la carga del Modal de modifcar nivel.
var messagesMod = [
    "Estamos aplicando las modificaciones...",
    "Ajustando algunos detalles",
    "¡Casi listo! Últimos retoques"
].reverse();

// Lista de mensajes para la carga del Modal de alta nivel.
var messagesAlta = [
    "Estamos añadiendo el Punto de Depósito...",
    "¡Casi listo! Últimos retoques"
].reverse();

// Lista de mensajes para la carga del Modal de baja nivel.
var messagesBaja = [
    "Estamos eliminando el nivel...",
    "¡Casi listo! Últimos retoques"
].reverse();

function updateMap(modal_type){
    if (modal_type == 'alta'){
        direccion = encodeURI(String($("#callePD").val()) + String($("#alturaPD").val()) + String($("#ciudadPD").val()) + String($("#provinciaPD").val()) + String($("#paisPD").val()))
        src_value = "https://maps.google.com/maps?q=" + direccion + "&t=&z=15&ie=UTF8&iwloc=&output=embed";
        $("#gmap_canvas").attr("src",src_value);
    }
    else if (modal_type == 'mod'){
        direccion = encodeURI(String($("#callePDMod").val()) + String($("#alturaPDMod").val()) + String($("#ciudadPDMod").val()) + String($("#provinciaPDMod").val()) + String($("#paisPDMod").val()))
        src_value = "https://maps.google.com/maps?q=" + direccion + "&t=&z=15&ie=UTF8&iwloc=&output=embed";
        $("#gmap_canvas_mod").attr("src",src_value);
    }
    
}

function setEstadoMod(estado){
    if (estado == "True"){
        $("#customSwitch2").prop("checked", true);
        $("#pdActivoMod").show();
    }
    else{
        $("#customSwitch2").prop("checked", false);
        $("#pdInactivoMod").show();
    }
}

function openModModal(nombre, estado, calle, altura, ciudad, provincia, pais, id_punto){
    jQuery.noConflict();
    
    //Define que se debe mostrar y que se oculta.
    $("#db-error-tab").hide();
    $("#dir-error-tab").hide();
    $("#hor-error-tab").hide();
    $("#mat-error-tab").hide();
    $("#error-provincia-mod").hide();
    $("#error-ciudad-mod").hide();
    $("#error-calle-mod").hide();
    $("#error-altura-mod").hide();
    $("#error-pais-mod").hide(); 
    $("#nombrePDErrorMod").hide();
    $("#pdInactivoMod").hide();
    $("#pdActivoMod").hide();

    //Seteo de valores iniciales.
    $("#nombrePDMod").val(nombre);
    $("#provinciaPDMod").val(provincia);
    $("#ciudadPDMod").val(ciudad);
    $("#callePDMod").val(calle);
    $("#alturaPDMod").val(altura);
    $("#paisPDMod").val(pais);
    updateMap('mod');
    setHorariosModValues(id_punto);

    $("#primary-btn-mod").text("Confirmar 0 cambios");
    nombre_ant = nombre;
    estado_ant = estado;
    calle_ant = calle;
    altura_ant = altura;
    ciudad_ant = ciudad;
    provincia_ant = provincia;
    pais_ant = pais;
    setEstadoMod(estado);

    //TODO: Ver si los errores suman al conteo de cambios o no.
    $("#modPDModal").modal("show");
}

function closeModModal(){
    $("#modPDModal").modal("hide");
}

function configureModalTab(mod_form_page){
    if (mod_form_page == 1){
        $("#modal-mod-p3").hide();
        $("#modal-mod-p2").hide();
        $("#modal-mod-p4").hide();
        $("#modal-mod-p1").show();
        $("#subheader-mod").text("Datos Básicos");
        goToTopOfPage();
     }
     else if (mod_form_page == 2){
        $("#modal-mod-p1").hide();
        $("#modal-mod-p3").hide();
        $("#modal-mod-p4").hide();
        $("#modal-mod-p2").show();
        $("#subheader-mod").text("Dirección");
        goToTopOfPage();
     }
     else if (mod_form_page == 3){
        $("#modal-mod-p1").hide();
        $("#modal-mod-p2").hide();
        $("#modal-mod-p4").hide();
        $("#modal-mod-p3").show();
        $("#subheader-mod").text("Horarios");
        $(".margin-row").hide();
        $("#bottomAltaModalTextAltaPD").text('Una vez elegidos los horarios, presione el botón "Siguiente".');
        goToTopOfPage();
     } 
     else{
        closeMenu();
        labelShowHide();
        $("#modal-mod-p1").hide();
        $("#modal-mod-p2").hide();
        $("#modal-mod-p3").hide();
        $("#modal-mod-p4").show();
        $("#primary-btn-alta").text("Crear Punto de  Depósito");
        $("#subheader-alta").text("Materiales");
        $("#bottomAltaModalTextAltaPD").text('Una vez elegidos los materiales, presione "Crear Punto de  Depósito" para añadir el nuevo Punto.');
        goToTopOfPage();
     }
}

$("#customSwitch2").click(function() {
    if($("#customSwitch2").is(":checked") == true){
        $("#pdInactivoMod").fadeOut();    
        $("#pdActivoMod").fadeIn();
        $("#switch-value-mod").val("true");
        if (estado_ant == "True"){
            cambio_estado = false;
        }
        else{
            cambio_estado = true;
        }
        
        calc_cant_cambios();
    }
    else{
        $("#pdActivoMod").fadeOut(); 
        $("#pdInactivoMod").fadeIn();
        $("#switch-value-mod").val("false");
        if (estado_ant == "False"){
            cambio_estado = false;
        }
        else{
            cambio_estado = true;
        }
        calc_cant_cambios();
    }
});

function setHorariosModValues(id){
    $.getJSON("/gestion-puntos-deposito/horarios/"+String(id),function (result){
        var dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
        horarios_mod = result; 
        for (i=0; i < dias.length; i++){
            dia = result[i]["dia"];
            horaDesde = result[i]["horaDesde"];
            horaHasta = result[i]["horaHasta"];
            if (horaDesde == false || horaDesde == false){
                $("#" + String(dia) + "-horaDesde-mod").val("");
                $("#" + String(dia) + "-horaHasta-mod").val("");
                $("#" + String(dia) + "-horaDesde-mod").prop('readonly', true);
                $("#" + String(dia) + "-horaDesde-mod").addClass("data-show-input");
                $("#" + String(dia) + "-horaHasta-mod").prop('readonly', true);
                $("#" + String(dia) + "-horaHasta-mod").addClass("data-show-input");
                $("#" + String(dia) + "-span-horaDesde-mod").hide();
                $("#" + String(dia) + "-bar-horaDesde-mod").hide();
                $("#" + String(dia) + "-span-horaHasta-mod").hide();
                $("#" + String(dia) + "-bar-horaHasta-mod").hide();
                $("#" + String(dia) + "-switch-mod").prop("checked", false);
                
            }
            else {
                $("#" + String(dia) + "-horaDesde-mod").val("08:00");
                $("#" + String(dia) + "-horaHasta-mod").val("20:00");
                $("#" + String(dia) + "-horaDesde-mod").prop( "readonly", false );
                $("#" + String(dia) + "-horaHasta-mod").prop( "readonly", false );
                $("#" + String(dia) + "-horaDesde-mod").removeClass("data-show-input");
                $("#" + String(dia) + "-horaHasta-mod").removeClass("data-show-input");
                $("#" + String(dia) + "-span-horaDesde-mod").show();
                $("#" + String(dia) + "-bar-horaDesde-mod").show();
                $("#" + String(dia) + "-span-horaHasta-mod").show();
                $("#" + String(dia) + "-bar-horaHasta-mod").show();
                $("#" + String(dia) + "-switch-mod").prop("checked", true);
                
            }
        }
    });
}



labelPosition();
