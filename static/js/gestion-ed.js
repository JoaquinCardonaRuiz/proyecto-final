var del = false;
var mod = false;

function openLoadingRing(){
    document.getElementById("open-loading-modal").click();
    $(".lds-ring").hide();
    $(".lds-ring div").css("border-color", "#95C22B transparent transparent transparent");
    $(".lds-ring").show();
}


function getTablaSalidas(id, nombre){
    $.getJSON("/gestion-ed/salidas/"+String(id),function (result){

        // Borro contenido anterior
        document.getElementById("modalTableBody"). innerHTML="";
        document.getElementById("headerRow").innerHTML ="";
        document.getElementById("msj-empty").hidden = true;

        // Establezco título
        document.getElementById("headingModal").innerHTML = "Salidas de " + nombre;

        if(result.length > 0){
            // Creo títulos de columnas
            var headings = ["Artículo","Cantidad","Unidad","Fecha"];
            for (i=0; i < headings.length; i++){
                t = document.createElement("th");
                t.scope = "col";
                t.class = "table-heading";
                t.innerHTML = headings[i];
                document.getElementById("headerRow").appendChild(t);
            }

            // Creo contenido
            for(i=0; i < result.length; i++){
                // Creo celda de nombre
                headCell = document.createElement("th");
                headCell.scope = "row";
                headCell.innerHTML = result[i]["nombre"];
    
                // Creo celda de cantidad
                bodyCell1 = document.createElement("td");
                bodyCell1.innerHTML = result[i]["cantidad"];
    
                // Creo celda de fecha
                bodyCell2 = document.createElement("td");
                bodyCell2.innerHTML = result[i]["unidadmedida"];

                // Creo celda de unidad
                bodyCell3 = document.createElement("td");
                bodyCell3.innerHTML = result[i]["fecha"];
    
                // Creo fila
                row = document.createElement("tr");
    
                // Agrego celdas a fila
                row.appendChild(headCell); 
                row.appendChild(bodyCell1);
                row.appendChild(bodyCell2);
                row.appendChild(bodyCell3);
    
                // Agrego fila a tabla
                document.getElementById("modalTableBody").appendChild(row);
            }
        }
        else{
            document.getElementById("empty-content").innerHTML = "No hay salidas"
            document.getElementById("msj-empty").hidden = false;
        }
        console.log("Done loading")
        document.getElementById("open-loading-modal").click();
        document.getElementById("open-modal").click();
        
    })
}


function validaNuevoNombre(nombres){
    var n = document.getElementById("nombreInput").value;
    if(nombres.includes(n)){
        //Se comprueba regla RN11
        document.getElementById("nombreEntidadError").innerHTML = "* Ese nombre ya ha sido registrado como una entidad de destino.";
        document.getElementsByName("add-btn")[0].disabled = true;
    }
    else if (!n){
        //Se comprueba regla RN12
        document.getElementById("nombreEntidadError").innerHTML = "* Este campo debe ser completado para crear la entidad.";
        document.getElementsByName("add-btn")[0].disabled = true;
    }
    else{
        document.getElementById("nombreEntidadError").innerHTML = "";
        document.getElementsByName("add-btn")[0].disabled = false;
    }
}

function submitForm(n){
    document.getElementById(n).submit();
}

function modifyEntidad(){
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

function removeEntidad(){
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

function openAltaModal(){
    jQuery.noConflict();
    $(".lds-ring").hide();
    $('#altaModal').modal('show');
    document.getElementById("nombreEntidadError").innerHTML="";
}

//Abre el Modal de baja. 
function openBajaModal(idEntidad,nombreEntidad){
    //Manejo de elementos de carga
    $("#fieldsRowBaja").show();
    $(".lds-ring").hide();
    $('#bottomBajaModalText').hide();
    $('#primary-btn-alert').prop('disabled', false);
    $('#secondary-btn-baja').prop('disabled', false);
    document.getElementById("baja-custom-text").innerHTML = "¿Está seguro que desea eliminar la entidad de destino " + nombreEntidad + "? Una vez eliminada, esta no se podrá recuperar.";

    //Manejo de carteles
    jQuery.noConflict();
    $('#primary-btn-alert').prop('disabled', false); 
    $('#idEntidad').val(String(idEntidad));
    $('#bajaEntidadModal').modal('show');
}

function baja_entidad(){

    //Manejo de elementos para la carga
    $(".b-modal-text-baja").hide();
    $(".lds-ring div").css("border-color", "#cf4545 transparent transparent transparent");
    $(".lds-ring").show().fadeIn(500);
    $('#bottomBajaModalText').show();
    $('#primary-btn-alert').prop('disabled', true);
    $('#secondary-btn-baja').prop('disabled', true);

    //Manejo de datos
    id = $('#idEntidad').val();
    window.location.href='/gestion-ed/baja/' + String(id)

    //Funcion que va cambiando los mensajes de carga.
    nextMsgBaja()
}

function alta_entidad(){
    $(".lds-ring div").css("border-color", "#95C22B transparent transparent transparent");
    $(".lds-ring").show().fadeIn(500);
    document.getElementById("row-to-hide-alta").hidden=true;
    $('#primary-btn').prop('disabled', true);
    $('#secondary-btn').prop('disabled', true);
    submitForm('altaEntidadForm');
    nextMsgAlta();
}

function mod_entidad(){
    $(".lds-ring div").css("border-color", "#95C22B transparent transparent transparent");
    $(".lds-ring").show().fadeIn(500);
    document.getElementById("row-to-hide-mod").hidden=true;
    $('#mod-name-btn').prop('disabled', true);
    $('#secondary-btn-baja').prop('disabled', true);
    submitForm('modEntidadForm');
    nextMsgMod();
}




function nextMsgBaja() {
    if (messagesBaja.length == 1) {
        $('#bottomBajaModalText').html(messagesBaja.pop()).fadeIn(500);

    } else {
        $('#bottomBajaModalText').html(messagesBaja.pop()).fadeIn(500).delay(10000).fadeOut(500, nextMsgBaja);
    }
};

function nextMsgAlta() {
    if (messagesAlta.length == 1) {
        $('#bottomAltaModalText').html(messagesAlta.pop()).fadeIn(500);

    } else {
        $('#bottomAltaModalText').html(messagesAlta.pop()).fadeIn(500).delay(10000).fadeOut(500, nextMsgAlta);

    }
};

function nextMsgMod() {
    if (messagesMod.length == 1) {
        $('#bottomModModalText').html(messagesMod.pop()).fadeIn(500);

    } else {
        $('#bottomModModalText').html(messagesMod.pop()).fadeIn(500).delay(10000).fadeOut(500, nextMsgMod);

    }
};


var messagesBaja = [
    "Estamos eliminando la entidad de destino...",
    "¡Casi listo! Últimos retoques"
].reverse();

var messagesAlta = [
    "Estamos añadiendo la entidad de destino...",
    "¡Casi listo! Últimos retoques"
].reverse();

var messagesMod = [
    "Estamos modificando la entidad de destino...",
    "¡Casi listo! Últimos retoques"
].reverse();



function openEditModal(idEntidad,nombreEntidad){
    jQuery.noConflict();
    $(".lds-ring").hide();
    document.getElementById('modNombreEntidadError').innerHTML="";
    $('#idEntidad').val(String(idEntidad))
    $('#nombreEntidad').val(String(nombreEntidad));
    document.getElementById("EntNombreInput").value = nombreEntidad;
    document.getElementById("idEntidadInput").value = document.getElementById("idEntidad").value;
    $('#editEntidadModal').modal('show');
    $('.nav-tabs a:first').tab('show');
    document.getElementById("mod-name-btn").disabled = true;
    document.getElementById("idEntInput").value = document.getElementById("idEntidad").value;
    document.getElementById("mod-name-btn").hidden = false;
    document.getElementById("del-dem-btn").hidden = true;
    document.getElementById("add-dem-btn").hidden = true;
}


function validaModNombre(nombres){
    var n = document.getElementById("EntNombreInput").value;
    var nombreA = document.getElementById("nombreEntidad").value;
    if(n == nombreA){
        document.getElementById("modNombreEntidadError").innerHTML = "* El nombre de la entidad debe ser distinto a su nombre anterior.";
        document.getElementById("mod-name-btn").disabled = true;
    }
    else if(nombres.includes(n)){
        //Se comprueba regla RN11
        document.getElementById("modNombreEntidadError").innerHTML = "* Ese nombre ya ha sido registrado como una entidad de destino.";
        document.getElementById("mod-name-btn").disabled = true;
    }
    else if (!n){
        //Se comprueba regla RN12
        document.getElementById("modNombreEntidadError").innerHTML = "* Este campo debe ser completado para modificar la entidad.";
        document.getElementById("mod-name-btn").disabled = true;
    }
    else{
        document.getElementById("modNombreEntidadError").innerHTML = "";
        document.getElementById("mod-name-btn").disabled = false;
    }
}




function openModalDesc(id,nom,desc){
    document.getElementById("headingModalDesc").innerHTML = "Descripción de " + nom;
    document.getElementById("idDescInput").value = id;
    $("#desc-row").show();
    $("#edit-row").hide();
    $("#edit-btn-desc").show();
    $("#listo-desc-btn").show();
    if(desc != ""){
        document.getElementById("desc-label").style.color = "#000";
        document.getElementById("desc-label").innerHTML = desc;
    }else{
        document.getElementById("desc-label").style.color = "#666";
        document.getElementById("desc-label").innerHTML = "Esta entidad de destino no tiene descripción.";
    }
    
    document.getElementById("open-modal-desc").click();
}




function edit_desc(){
    $("#desc-row").hide();
    $("#edit-row").show();
    document.getElementById("descEditInput").value = document.getElementById("desc-label").innerHTML;
    $("#edit-btn-desc").hide();
    $("#listo-desc-btn").hide();
    $("#cancel-btn").show();
    $("#confirm-btn").show();
}

function cancel_edit_desc(){
    $("#desc-row").show();
    $("#edit-row").hide();
    document.getElementById("descEditInput").value = "";

    $("#edit-btn-desc").show();
    $("#listo-desc-btn").show();
    $("#cancel-btn").hide();
    $("#confirm-btn").hide();
}

function confirmar_desc_load(){
    jQuery.noConflict();
    $("#cancel-btn").attr("disabled", true);
    $("#confirm-btn").attr("disabled", true);
    $("#edit-row").hide();
    $(".lds-ring").hide();
    $(".lds-ring div").css("border-color", "#95C22B transparent transparent transparent");
    $(".lds-ring").show();
    $("#loadingRow").show();
}

function confirmar_desc(){
    document.getElementById("desc-modal-body").submit();
}